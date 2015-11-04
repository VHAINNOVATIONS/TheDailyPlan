<%@ include file="/common/taglibs.jsp"%>

<c:if test="${pageContext.request.locale.language != 'en'}">
    <div id="switchLocale"><a href="<c:url value='/?locale=en'/>"><fmt:message key="webapp.name"/> in English</a></div>
</c:if>

<div id="banner-wrapper">
		<!-- START: VA BANNER -->
		<div id="banner-image">
			<a title="United States Department of Veterans Affairs" href="http://www.va.gov/" linkindex="1"><img width="538" height="94" title="United States Department of Veterans Affairs" alt="United States Department of Veterans Affairs" src="<c:url value='/styles/va_files/images/inter-header-banner-va-seal.gif'/>"></a>
		</div>
		<!-- END: VA BANNER -->

		<!-- START: SEARCH FORM -->
		<div id="banner-area-search">
			<div id="search-area">
				<form style="margin: 0px; padding: 0px;" action="http://www.index.va.gov/search/va/va_search.jsp" method="GET" id="searchForm" name="searchForm">
					<script type="text/javascript" src="http://www.va.gov/va_files/2009/scripts/vaSearch.js" language="javascript"></script> 
					<input type="hidden" value="1" id="TThidden" name="TT">
					<!-- do not insert line breaks in the div tag below -->
					<div id="mainSearchForm"><label style="display: none;" for="searchtxt">Enter your search text</label><input type="text" value="" title="Enter your search text" size="5" id="searchtxt" name="QT"><label style="display: none;" for="searchbtn">Button to start search</label><input type="submit" value="Search" title="Button to start search" id="searchbtn" name="searchbtn"></div>
					<!-- do not insert line breaks in the div tag above -->
					<div id="moreLink">» <a title="Go to Advanced Search Page" style="color: rgb(255, 255, 255);" href="http://www.index.va.gov/search/va/va_adv_search.jsp" linkindex="2">Open Advanced Search</a></div>
				</form>
			</div>
		</div>
		<!-- END: SEARCH FORM -->
	</div>
	<div id="banner-area-menu">
		<!-- START: GLOBAL MEGA MENU LINKS -->
		<!-- <script type="text/javascript" language="javascript">createMenu();</script> -->
		<ul>
		<li class="">
			<a href="http://www.va.gov/" linkindex="3">Home</a>
		</li>
		<li>
			<a href="http://www.va.gov/landing2_vetsrv.htm" linkindex="4">Veteran Services</a>
			<div class="menu twoColumn">
				<div class="sub_nav">
					<h4>Inside Veteran Services</h4>
					<ul>
						<li><a href="http://www.va.gov/opa/newtova.asp" linkindex="5">New to VA</a></li>
						<li><a href="http://www.va.gov/opa/publications/benefits_book.asp" linkindex="6">Benefits Booklet</a></li>
					</ul>
					<h4>Benefits &amp; Services</h4>
					<ul>
						<li><a href="http://www.vba.va.gov/VBA/" linkindex="7">General Benefits Information</a></li>
						<li><a href="http://www.vba.va.gov/bln/21/compensation/" linkindex="8">Disability Compensation</a></li>
						<li><a href="http://www.vba.va.gov/bln/21/pension/" linkindex="9">Pension</a></li>
						<li><a href="http://www.gibill.va.gov/" linkindex="10">GI Bill</a></li>
						<li><a href="http://www.vba.va.gov/bln/vre/" linkindex="11">Vocational Rehabilitation &amp; Employment</a></li>
						<li><a href="http://vetsuccess.gov/" linkindex="12">Vet Success</a></li>
						<li><a href="http://www.gibill.va.gov/pamphlets/CH35/CH35_Pamphlet_General.htm" linkindex="13">Dependents' Educational Assistance</a></li>
						<li><a href="http://www.vba.va.gov/survivors/" linkindex="14">Survivor Benefits</a></li>
						<li><a href="http://www.homeloans.va.gov/" linkindex="15">Home Loans</a></li>
						<li><a href="http://www.insurance.va.gov/miscellaneous/" linkindex="16">Life Insurance</a></li>
						<li><a href="http://www.insurance.va.gov/sgliSite/TSGLI/TSGLI.htm" linkindex="17">Traumatic Injury Insurance</a></li>
					</ul>
				</div>
				<div class="sub_nav">
				<h4>Health &amp; Well-Being</h4>
				<ul>
					<li><a href="http://www.va.gov/health/" linkindex="18">Health Care Information</a></li>
					<li><a href="http://www.va.gov/health/topics/" linkindex="19">A-Z Health Topic Finder</a></li>
					<li><a href="http://www.myhealth.va.gov/" linkindex="20">My Health<span style="text-decoration: underline; font-style: italic;">e</span>Vet</a></li>
					<li><a href="https://www.myhealth.va.gov/mhv-portal-web/anonymous.portal?_nfpb=true&amp;_pageLabel=rxRefillHome" linkindex="21">Refill Prescriptions</a></li>
					<li><a href="http://www.mentalhealth.va.gov/suicide_prevention/" linkindex="22">Suicide Prevention</a></li>
					<li><a href="http://www.ptsd.va.gov/" linkindex="23">PTSD</a></li>
					<li><a href="http://www.publichealth.va.gov/" linkindex="24">Public Health</a></li>
				</ul>
				<h4>Burials &amp; Memorials</h4>
				<ul>
					<li><a href="http://www.cem.va.gov/" linkindex="25">Cemetery Services</a></li>
					<li><a href="http://www.cem.va.gov/bbene_burial.asp" linkindex="26">Burials</a></li>
					<li><a href="http://www.cem.va.gov/hm_hm.asp" linkindex="27">Headstones &amp; Markers</a></li>
					<li><a href="http://www.cem.va.gov/pmc.asp" linkindex="28">Presidential Memorial Certificates</a></li>
					<li><a href="http://www.cem.va.gov/cems/listcem.asp" linkindex="29">Cemeteries</a></li>
					<li><a href="http://gravelocator.cem.va.gov/" linkindex="30">Nationwide Gravesite Locator</a></li>
					<li><a href="http://www.cem.va.gov/bbene/bflags.asp" linkindex="31">Burial Flags</a></li>
					<li><a href="http://www.cem.va.gov/bbene/benvba.asp" linkindex="32">Burial Allowance</a></li>
				</ul>
			</div>
			<div class="clear"></div>
			</div>
			</li>
			<li>
				<a href="http://www.va.gov/landing2_business.htm" linkindex="33">Business</a>
				<div class="menu">
					<div class="sub_nav">
					<h4>Inside Business</h4>
					<ul>
						<li><a href="http://www.va.gov/osdbu/" linkindex="34">Small Business Opportunities</a></li>
						<li><a href="http://www.va.gov/osdbu/veteran/" linkindex="35">Starting a Business</a></li>
						<li><a href="http://www.vetbiz.gov/" linkindex="36">VetBiz.gov</a></li>
					</ul>
					<h4>Doing Business with VA</h4>
					<ul>
						<li><a href="http://www.va.gov/oamm/oa/dbwva/" linkindex="37">Acquisitions</a></li>
						<li><a href="http://www.cfm.va.gov/" linkindex="38">Construction</a></li>
						<li><a href="http://www.volunteer.va.gov/" linkindex="39">Volunteer</a></li>
					</ul>
				</div> 
				<div class="clear"></div>
				</div>
			</li>
			<li>
				<a href="http://www.va.gov/landing2_about.htm" linkindex="40">About VA</a>
				<div class="menu twoColumn">
					<div class="sub_nav">
						<h4>Inside the VA</h4>
						<ul>
							<li><a href="http://www.va.gov/opa/bios/secretary.asp" linkindex="41">Secretary of VA</a></li>
							<li><a href="http://www.va.gov/opa/bios/" linkindex="42">Executive Biographies</a></li>
							<li><a href="http://www.va.gov/landing_organizations.htm" linkindex="43">Organizations</a></li>
							<li><a href="http://www.va.gov/about_va/vahistory.asp" linkindex="44">History</a></li>
							<li><a href="http://www.va.gov/vetdata/" linkindex="45">Data and Statistics</a></li>
							<li><a href="http://www.va.gov/jobs/" linkindex="46">Jobs</a></li>
							<li><a href="http://www.va.gov/cfbnpartnerships/" linkindex="47">Faith-based &amp; Neighborhood Partnerships</a></li>
							<li><a href="http://www.va.gov/kids/" linkindex="48">VA for Kids</a></li>
						</ul>
						<h4>Congressional Affairs</h4>
						<ul>
							<li><a href="http://www.va.gov/oca/Vet_Legis.asp" linkindex="49">Legislation</a></li>
							<li><a href="http://www.va.gov/oca/testimony.asp" linkindex="50">Testimony</a></li>
						</ul>
						</div>
						<div class="sub_nav">
						<h4>Budget and Performance</h4>
						<ul>
							<li><a href="http://www.va.gov/performance/" linkindex="51">VA Plans, Budget, and Performance</a></li>
							<li><a href="http://www.va.gov/opa/T21/" linkindex="52">Transformation Initiative (T21)</a></li>
							<li><a href="http://www.va.gov/budget/report/" linkindex="53">Performance and Accountability Report</a></li>
							<li><a href="http://www.va.gov/budget/products.htm" linkindex="54">Budget Submission</a></li>
							<li><a href="http://www.va.gov/recovery/" linkindex="55">Recovery Act</a></li>
						</ul>
						<h4>Partners</h4>
						<ul>
							<li><a href="http://www.va.gov/statedva.htm" linkindex="56">State Veterans Affairs Offices</a></li>
							<li><a href="http://www.va.gov/vso/" linkindex="57">Veterans Service Organizations</a></li>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
			</li>
			<li>
				<a href="http://www.va.gov/landing2_media_room.htm" linkindex="58">Media Room</a>
				<div class="menu twoColumn">
					<div class="sub_nav">
						<h4>Inside the Media Room</h4>
						<ul>
							<li><a href="http://www.va.gov/opa/pressrel/" linkindex="59">News Releases</a></li>
							<li><a href="http://www.va.gov/opa/speeches/" linkindex="60">Speeches</a></li>
							<li><a href="http://www.va.gov/opa/videos/" linkindex="61">Videos</a></li>
							<li><a href="http://www.va.gov/opa/publications/" linkindex="62">Publications</a></li>
						</ul>
						<h4>National Observances</h4>
							<ul>
								<li><a href="http://www.va.gov/opa/vetsday/" linkindex="63">Veterans Day</a></li>
								<li><a href="http://www.va.gov/opa/speceven/memday/" linkindex="64">Memorial Day</a></li>
								<li><a href="http://www.va.gov/opa/publications/celebrate_americas_freedoms.asp" linkindex="65">Celebrating America's Freedoms</a></li>
							</ul>
						</div>
						<div class="sub_nav">
						<h4>Special Events</h4>
						<ul>
							<li><a href="http://www.creativeartsfestival.va.gov/" linkindex="66">Creative Arts Festival</a></li>
							<li><a href="http://www.veteransgoldenagegames.va.gov/" linkindex="67">Golden Age Games</a></li>
							<li><a href="http://www.summersportsclinic.va.gov/" linkindex="68">Summer Sports Clinic</a></li>
							<li><a href="http://www.tee.va.gov/" linkindex="69">Training&ndash;Exposure&ndash; Experience (TEE) Tournament</a></li>
							<li><a href="http://www.wheelchairgames.va.gov/" linkindex="70">Wheelchair Games</a></li>
							<li><a href="http://www.wintersportsclinic.va.gov/" linkindex="71">Winter Sports Clinic</a></li>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
			</li>
			<li>
				<a href="http://www.va.gov/landing2_locations.htm" linkindex="72">Locations</a>
				<div class="menu">
					<div class="sub_nav">
						<ul>
							<li><a href="http://www.va.gov/directory/guide/division_flsh.asp?dnum=1" linkindex="73">Hospitals and Clinics</a></li>
							<li><a href="http://www.va.gov/directory/guide/vetcenter_flsh.asp" linkindex="74">Vet Centers</a></li>
							<li><a href="http://www.va.gov/directory/guide/division_flsh.asp?dnum=3" linkindex="75">Regional Benefits Offices</a></li>
							<li><a href="http://homeloans.va.gov/rlcweb.htm" linkindex="76">Regional Loan Centers</a></li>
							<li><a href="http://www.va.gov/directory/guide/division_flsh.asp?dnum=4" linkindex="77">Cemetery Locations</a></li>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
			</li>
			<li>
				<a href="http://www.va.gov/landing2_contact.htm" linkindex="78">Contact Us</a>
				<div class="menu">
					<div class="sub_nav">
						<ul>
							<li><a href="https://iris.va.gov/scripts/iris.cfg/php.exe/enduser/std_alp.php" linkindex="79">FAQs</a></li>
							<li><a href="https://iris.va.gov/" linkindex="80">Ask a Question</a></li>
							<li><a href="https://iris.va.gov/scripts/iris.cfg/php.exe/enduser/cci/phonenbrs.php" linkindex="81">Toll Free Numbers</a></li>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
			</li>
		</ul>

		<noscript>
			&lt;!-- START: NOSCRIPT FOR GLOBAL MEGA MENU LINKS --&gt;
			&lt;ul&gt;
				&lt;li&gt;&lt;a href="http://www.va.gov/" title="main menu item Home"&gt;Home&lt;/a&gt;&lt;/li&gt;
				&lt;li&gt;&lt;a href="http://www.va.gov/landing2_vetsrv.htm" title="main menu item Veteran Services"&gt;Veteran Services&lt;/a&gt;&lt;/li&gt;
				&lt;li&gt;&lt;a href="http://www.va.gov/landing2_business.htm" title="main menu item Business"&gt;Business&lt;/a&gt;&lt;/li&gt;
				&lt;li&gt;&lt;a href="http://www.va.gov/landing2_about.htm" title="main menu item About VA"&gt;About VA&lt;/a&gt;&lt;/li&gt;
				&lt;li&gt;&lt;a href="http://www.va.gov/landing2_media_room.htm" title="main menu item Media Room"&gt;Media Room&lt;/a&gt;&lt;/li&gt;
				&lt;li&gt;&lt;a href="http://www.va.gov/landing2_locations.htm" title="main menu item Locations"&gt;Locations&lt;/a&gt;&lt;/li&gt;
				&lt;li&gt;&lt;a href="http://www.va.gov/landing2_contact.htm" title="main menu item Contact Us"&gt;Contact Us&lt;/a&gt;&lt;/li&gt;
			&lt;/ul&gt;
			&lt;!-- END: NOSCRIPT FOR GLOBAL MEGA MENU LINKS --&gt;
		</noscript>
		<!-- END: GLOBAL MEGA MENU LINKS -->

		<!-- START: LOCAL MEGA MENU (RELATED LINKS) -->
		<div class="relatedLinks">
			<!-- <script src="related-links.js" type="text/javascript" language="javascript"></script> -->
			<noscript>
				&lt;ul&gt;
					&lt;li&gt;&lt;a href="landing2_relatedlinks.htm" title="main menu item Related Links"&gt;Related Links&lt;/a&gt;&lt;/li&gt;
				&lt;/ul&gt;
			</noscript>
		</div>
		<!-- END: LOCAL MEGA MENU (RELATED LINKS) -->
	</div>
	<div id="branding"></div>
<hr />

<%-- Put constants into request scope --%>
<appfuse:constants scope="request"/>