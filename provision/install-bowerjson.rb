#!/usr/bin/ruby
# If you don't know the code, don't mess around below -BCIV
# Purpose: programatically install vista without parameters file which fails under
#          Vagrant using Windows 10 as the Host Operating System. 
# Written by: Will BC Collins IV {a.k.a., 'BCIV' follow me on GitHub ~ I'm super cool.}
# Email: william.collins@va.gov

require 'rubygems'
require 'pty'
require 'expect'
require 'json'

print "bower install...\r"

#file = File.read('config.local.json')
#config=JSON.parse(file)

fnames = [] # "csession cache -UVISTA '^ZU'"
#PTY.spawn(config['command']) do |r_f,w_f,pid|
PTY.spawn('bower install') do |r_f,w_f,pid|
   w_f.sync = true
   $expect_verbose = true

   r_f.expect(/Unable to find a suitable version for angular, please choose one by typing one of the numbers below:/) do
     w_f.print "6\r"
   end

   begin
     w_f.print "quit\n"
     print "fin\n";
   rescue
   end
end