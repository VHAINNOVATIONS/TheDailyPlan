#!/bin/bash -xi

# set username
myusername=$USER
# set up base box through vagrant file with these commands
nexusUrl=http://nexus.vaftl.us:8081/nexus/service/local/repositories/ftl/content/
cacheInstallerPath=/vagrant/provision/cache
cacheInstaller=cache-2014.1.3.775.14809-lnxrhx64.tar.gz
cacheInstallerSource=$nexusUrl/$cacheInstaller
parametersIsc=parameters.isc 
cacheInstallTargetPath=/srv 
# configure selinux ###################
#
echo configuring ipv4 firewall
echo -----------------------
sudo service iptables stop
sudo cp /vagrant/provision/iptables /etc/sysconfig/
sudo service iptables start 

# install EPEL and REMI Repos ##################
#
echo installing epel-release and remi for CentOS/RHEL 6
echo --------------------------------------------------
sudo rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
sudo rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
rpm -Uvh http://dev.mysql.com/get/mysql-community-release-el6-5.noarch.rpm
# sed -i s'/enabled=1/enabled=0/' /etc/yum.repos.d/remi.repo
sudo cp /vagrant/provision/remi.repo /etc/yum.repos.d/
sudo yum update

# install Nodejs and Development Tools such as gcc & make
#
echo installing nodejs npm nginx and other tidbits
sudo yum -y install nodejs npm nginx parted vim zip unzip wget 
sudo yum -y groupinstall 'Development Tools'

# configure nginx for reverse proxy
#
sudo cp /vagrant/provision/virtual.conf /etc/nginx/conf.d/
sudo /etc/init.d/nginx start
sudo chkconfig nginx on 
sudo ifconfig eth0 | grep inet | awk '{ print $2 }'

# Install MySQL ######################
#
echo install mysql
echo -------------
cd
wget -nc --progress=bar:force http://repo.mysql.com/mysql-community-release-el6-5.noarch.rpm
sudo rpm -Uvh mysql-community-release-el6-5.noarch.rpm
sudo yum -y install dos2unix mysql mysql-server rsync ruby-devel
sudo rpm -qa | grep mysql
sudo chkconfig mysqld on
sudo service mysqld start
export DATABASE_PASS='thedailyplan1!'
mysqladmin -u root password "$DATABASE_PASS"
mysql -u root -p"$DATABASE_PASS" -e "UPDATE mysql.user SET Password=PASSWORD('$DATABASE_PASS') WHERE User='root'"
mysql -u root -p"$DATABASE_PASS" -e "DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1')"
mysql -u root -p"$DATABASE_PASS" -e "DELETE FROM mysql.user WHERE User=''"
mysql -u root -p"$DATABASE_PASS" -e "DELETE FROM mysql.db WHERE Db='test' OR Db='test\_%'"

# set up database for Drupal 7
mysql -u root -p"$DATABASE_PASS" -h localhost -e "create database tdpappdb;"
# add standard tables from a clean installation
#mysql -u root -p"$DATABASE_PASS" -h localhost raptor500 < /vagrant/provision/drupal.sql
# add tdp database user and assign access
mysql -u root -p"$DATABASE_PASS" -h localhost -e "create user tdpappuser@localhost identified by '$DATABASE_PASS';"
mysql -u root -p"$DATABASE_PASS" -h localhost -e "GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,INDEX,ALTER,CREATE TEMPORARY TABLES,LOCK TABLES ON tdp.* TO tdpappuser@localhost;"
mysql -u root -p"$DATABASE_PASS" -h localhost -e "FLUSH PRIVILEGES;"


# set permissions so $myusername has access to write
#sudo chown $myusername -R /var/www/html/RSite500
#sudo chmod a+rx /var/www/html/RSite500/sites/all/themes/omega/omega/libraries
#sudo chown -R apache /var/www/html/RSite500/sites/all/themes/omega/omega

# I'm sure ownership is borked from all the sudo commands...
#sudo chown -R apache:apache /var/www

# restart apache so all php modules are loaded...
#sudo service httpd restart

# cache specific installation steps

# get ruby deps for installing cache through ruby
sudo gem install -q json -v '1.8.3'
sudo gem install -q expect -v '0.0.13'

# add group to use for cache admins to start and stop
sudo groupadd cacheserver

# get cache installer
if [ -e "$cacheInstallerPath/$cacheInstaller" ]; then
  echo "Cache installer is already in present..."
else
  echo "downloading Cache installer..."
  #wget -P $cacheInstallerPath/ http://vaftl.us/vagrant/cache-2014.1.3.775.14809-lnxrhx64.tar.gz
  #wget -nc --progress=bar:force -P $cacheInstallerPath/ http://vaftl.us/vagrant/cache-2014.1.3.775.14809-lnxrhx64.tar.gz
  wget -nc --progress=bar:force -P $cacheInstallerPath/ $cacheInstallerSource
fi

echo "Attempting to install Intersystems Caché..."
if [ -e "$cacheInstallerPath/$cacheInstaller" ]; then
  echo "Installing Cache from: $cacheInstaller"
  # install from tar.gz 
  sudo mkdir -p $cacheInstallTargetPath/tmp
  cd $cacheInstallTargetPath/tmp
  sudo cp $cacheInstallerPath/$cacheInstaller .
  sudo tar -xzvf $cacheInstaller   

  # spawn ruby cache installer
  #
  # If you need to change settings... 
  # ~see config.local.json under /vagrant/provision 
  #
  sudo mkdir /srv/mgr
  sudo cp /vagrant/provision/cache/cache.key /srv/mgr/
  cd /vagrant/provision
  dos2unix install-cache.rb
  sudo chmod u+x install-cache.rb
  echo "Running ruby installer for cache in lieu of using parameter file : Fix for deploying under Windows OS"
  sudo ruby ./install-cache.rb 
  echo "waiting..."
  sleep 60*3
else
  echo "You are missing: $cacheInstaller"
  echo "You cannot provision this system until you have downloaded Intersystems Cache"
  echo "in 64-bit tar.gz format and placed it under the provision/cache folder."
  exit
fi

# add vista and vagrant to cacheusr group
sudo usermod -a -G cacheusr vagrant

## add disk to store CACHE.DAT was sdb 
#parted /dev/sdb mklabel msdos
#parted /dev/sdb mkpart primary 0 100%
#mkfs.xfs /dev/sdb1
#mkdir /srv
#echo `blkid /dev/sdb1 | awk '{print$2}' | sed -e 's/"//g'` /srv   xfs   noatime,nobarrier   0   0 >> /etc/fstab
#mount /srv

# stop cache
sudo ccontrol stop cache quietly

if [ -e "$cacheInstallerPath/CACHE.DAT" ]; then
  echo "CACHE.DAT is already present... copying to /srv/mgr/"
  echo "This will take a while... Get some coffee or a cup of tea..."
  sudo mkdir -p $cacheInstallTargetPath/mgr/VISTA
  sudo cp -R $cacheInstallerPath/CACHE.DAT /srv/mgr/VISTA/
else
  echo "$cacheinstallerpath/CACHE.DAT not found... downloading..."
  sudo mkdir -p $cacheInstallTargetPath/mgr/VISTA 
  sudo chown -R $myusername:cacheusr $cacheInstallTargetPath/mgr/VISTA
  echo "This will take a while... Get some coffee or a cup of tea..."
  wget -nc --progress=bar:force -P $cacheInstallTargetPath/mgr/VISTA/ http://vaftl.us/vagrant/CACHE.DAT 
fi

echo "Setting permissions on database."
sudo chown -R vagrant:cacheusr /srv
sudo chmod g+wx /srv/bin
sudo chmod 775 /srv/mgr/VISTA 
sudo chmod 660 /srv/mgr/VISTA/CACHE.DAT
sudo chown -R vagrant:cacheusr /srv/mgr/VISTA 

# copy cache configuration
echo "Copying cache.cpf configuration file..."
sudo cp $cacheInstallerPath/cache.cpf $cacheInstallTargetPath/

# start cache 
sudo ccontrol start cache

# enable cache' os authentication and %Service_CallIn required by EWD.js 
csession CACHE -U%SYS <<EOE
vagrant
innovate
s rc=##class(Security.System).Get("SYSTEM",.SP),d=SP("AutheEnabled") f i=1:1:4 s d=d\2 i i=4 s r=+d#2
i 'r s NP("AutheEnabled")=SP("AutheEnabled")+16,rc=##class(Security.System).Modify("SYSTEM",.NP)

n p
s p("Enabled")=1
D ##class(Security.Services).Modify("%Service_CallIn",.p)

h
EOE

# install TDP_1.0_1 ~TheDailyPlan Specific KIDS into VistA
# todo: this doesn't work because it doesn't see device(0) ~something with c-vt320? vt320 doesn't 
# work either...
cp /vagrant/backend/vistaroutines/* /srv/mgr/
cd /vagrant/provision/
dos2unix install-tdp.rb
sudo chmod u+x install-tdp.rb
sudo ./install-tdp.rb

#csession CACHE -UVISTA "^ZU" <<EOI
#cprs1234
#cprs4321$
#^^load a distribution
#/srv/mgr/VEFB_1_2.KID
#yes
#^^install package
#VEFB 1.2
#no
#no
#
#^
#^
#h
#EOI

# user notifications 
echo VistA is now installed with TDP KIDS routines.

# EWD.js and Federator installation ############################
#
sudo mkdir /var/log/tdp 
sudo touch /var/log/tdp/federatorCPM.log
sudo touch /var/log/tdp/ewdjs.log
sudo chown -R vagrant:vagrant /var/log/tdp

cd /vagrant/OtherComponents/EWDJSvistalayer
sudo cp -R ewdjs /opt/
sudo chown -R vagrant:vagrant /opt/ewdjs

cd /vagrant/provision
dos2unix install-ewd.rb
sudo chmod u+x install-ewd.rb
sudo ./install-ewd.rb

cd /opt/ewdjs
sudo npm install -g inherits@2.0.0
npm install globalsjs@0.31.0

# get database interface from cache version we are running
sudo cp /srv/bin/cache0100.node /opt/ewdjs/node_modules/cache.node

# start EWD and EWD Federator
cd /opt/ewdjs

# add ewdfederator access to EWD
node registerEWDFederator.js

sudo dos2unix startEverything.sh 
sudo chmod a+x startEverything.sh 
sudo dos2unix killEverything.sh 
sudo chmod a+x killEverything.sh

# copy TheDailyPlan TDP EWD Modules
cp /vagrant/backend/ewdmodules/*.js /opt/ewdjs/node_modules/

# start EWD and Federator 
sudo ./startEverything.sh 
ps aux | grep node
echo "you should see node related process IDs above..."

# TDP Application related tidbits #############################################################

# Install Python ####################
#
echo "install python dependencies..."
sudo yum install zlib-devel
sudo yum install bzip2-devel
sudo yum install openssl-devel
sudo yum install ncurses-devel
sudo yum install sqlite-devel
echo "install python..."
cd /opt
sudo wget --no-check-certificate https://www.python.org/ftp/python/2.7.6/Python-2.7.6.tar.xz
sudo tar xf Python-2.7.6.tar.xz
cd Python-2.7.6
sudo ./configure --prefix=/usr/local
sudo make && sudo make altinstall

cd /vagrant/tdpapp
sudo npm install -g bower 
npm install grunt

sudo su -c "gem install sass"

npm install

dos2unix install-bowerjson.rb
sudo chmod u+x install-bowerjson.rb
#bower install
# note needs to install 6
sudo ./install-bowerjson.rb

echo "initialize the database..."
sudo node server/db/syncAndLoad.js
# need to do a CTRL+C after running the above...

sudo grunt serve 

# start TDP EWD Interface?
# sudo node app.js 8082 127.0.0.1 (pilot location 1)
# sudo node app.js 8083 127.0.0.1 (pilot location 2)
# sudo node app.js 8084 127.0.0.1 (pilot location 3)
# sudo node app.js 8085 127.0.0.1 (pilot location 4)

########### TODO #####################################################################
#
# PM2 is a production ready process manager for Node.js applications with a built-in load balancer. 
# It allows you to keep applications alive forever, to reload them without downtime and to facilitate 
# common system admin tasks. 
#
# Follow the steps to install PM2 and start the application:
#
# $ npm install pm2 –g
# $ cd /vagrant/tdpApp/dist  
# $ pm2 start app
# $ cd /vagrant/backend/tdpewdrest
#
# Create a script file for each of the corresponding the eWD sites 
# $ vi Pilot1.sh
# Insert sudo node app.js 8082 XXX.XXX.XXX.XXX (Pilot Location 1)
# Save Pilot1.sh
# $vi Pilot2.sh
# Insert sudo node app.js 8083 XXX.XXX.XXX.XXX (Pilot Location 2)
# Save Pilot2.sh
# $vi Pilot3.sh
# Insert sudo node app.js 8083 XXX.XXX.XXX.XXX (Pilot Location 3)
# Save Pilot3.sh
# $vi Pilot4.sh
# Insert sudo node app.js 8083 XXX.XXX.XXX.XXX (Pilot Location 4)
# Save Pilot4.sh
# $pm2 start Pilot1.sh
# $pm2 start Pilot2.sh
# $pm2 start Pilot3.sh
# $pm2 start Pilot4.sh

echo CSP is here: http://192.168.33.11:57772/csp/sys/UtilHome.csp
echo username: cache password: innovate 
echo See Readme.md from root level of this repository... 
echo EWD Monitor: http://192.168.33.11:8082/ewd/ewdMonitor/index.html password: innovate 
echo EWD: http://192.168.33.11:8082/ewdjs/EWD.js ewdBootstrap3.js 
echo EWD Federator: http://192.168.33.11:8081/RaptorEwdVista/raptor/
echo EWD Test Login: http://192.168.33.11:8080/ewd/tdp/index.html 
echo password: innovate 
echo TheDailyPlan is now installed to a test instance
echo Browse to: http://192.168.33.11/ 
echo to kill EWD and Federator sudo sh /opt/ewdjs/killEverything.sh 
