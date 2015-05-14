<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="login.title"/></title>
    <!-- meta name="heading" content="<fmt:message key='login.heading'/>"/> -->
    <meta name="menu" content="Login"/>
   	<script type="text/javascript" src="<c:url value='/scripts/jquery-ui-1.8.6.custom.min.js'/>"></script>
   	<link rel="stylesheet" type="text/css" media="screen, projection" href="<c:url value='/styles/jquery/jquery-ui-1.8.6.custom.css'/>" />
    <link rel="stylesheet" type="text/css" media="all" href="<c:url value='/styles/${appConfig["csstheme"]}/layout-2col.css'/>" />
    <meta name="javascript" content="login" />
    <meta name="usejQuery" content="true" />
</head>
<body id="login">


<div id="home_universe">
<div id="home">
    
    <!-- LEFT COLUMN -->
	<div id="home_left_col">
    	
        <div id="home_login_box">
			<form method="post" id="loginForm" action="<c:url value='/j_spring_security_check'/>"
			    onsubmit="Login.saveUsername(this);">
			    
        	<h2>Member Login</h2>
			<fieldset style="padding-bottom: 0">
				<c:if test="${param.error != null}">
					<span class="error">
				        <img style="margin: 0 5px;" src="${ctx}/images/iconWarning.gif" alt="<fmt:message key='icon.warning'/>" class="icon"/>
				        <fmt:message key="errors.password.mismatch"/>
				    </span>
			        <%--${sessionScope.SPRING_SECURITY_LAST_EXCEPTION_KEY.message}--%>
				</c:if>
	        						
	            <div id="home_login_access">
			       <label for="j_username" class="required desc">
			            <fmt:message key="label.username"/> <span class="req">*</span>
			        </label>
			        <input type="text" class="text medium" name="j_username" id="j_username" tabindex="1" />

			        <label for="j_password" class="required desc">
			            <fmt:message key="label.password"/> <span class="req">*</span>
			        </label>
			        <input type="password" class="text medium" name="j_password" id="j_password" tabindex="2" />
	            </div>
				
				<c:if test="${appConfig['rememberMeEnabled']}">
			    <input type="checkbox" class="checkbox" name="_spring_security_remember_me" id="rememberMe" tabindex="3"/>
			        <label for="rememberMe" class="choice"><fmt:message key="login.rememberMe"/></label>
				</c:if>
	            
	            
	            <div id="home_login_button">
	 		        <input type="submit" class="button" name="login" value="<fmt:message key='button.login'/>" tabindex="4" />
	 		        <div style="display: none;" class="spinner"><img src="styles/simplicity/images/loading.gif"/></div>
	            </div>
			</fieldset>
			</form>

        </div>
        
        <div id="home_contact_box_head"><h1>Contact Information</h1>
        </div>
        
        <div id="home_contact_box"><p>Trouble Logging in? Contact your CAC<p>
        							<p><b>Nurse Coordinator for TDP</b><br />734-930-5849</p>
        							<p><b>  E-mail</b><br /><a href="mailto:cheryl.mitchell@va.gov">Cheryl Mitchell</a></p>

        </div>
        
        <div id="home_resources_box_head"><h1>Additional Resources</h1>
        </div>
        
        <div id="home_resources_box"><p><a href="resources/TdpDemo.ppt">How to learn more >></a></p>
        							<p><a href="resources/TdpDemo.ppt">View demo >></a></p>
        </div>
    
    
    </div>
	<!-- END LEFT COLUMN -->
    
    <!-- RIGHT COLUMN -->
    <div id="home_right_col">
    	
        <div id="home_intro"><img src="images/TDP-logo.gif" width="237" height="100" alt="The Daily Plan" />
        	<p><span class="lead">The Daily Plan<sup>&reg;</sup></span> was initiated to increase patient safety during hospitalization.  The patient is the only component of the health care delivery system that is always present and yet the least likely to be used as a resource.  Patients and their families want to help ensure safety yet there has been little professional attention on how best to actively involve patients or on how such involvement can affect patient safety.</p>  
			<div id="partial_text" class="expanded"><p>The purpose of the study was to determine if the patient&#39;s comfort in asking questions would be increased by receiving a written summary... <a class="toggle" href="#">Read more >></a></div></p>
			<div id="full_text" class="collapsed"><p>The purpose of the study was to determine if the patient&#39;s comfort in asking questions would be increased by receiving a written summary.  To determine if patient safety would be improved by telling patients what to anticipate daily so they would question if something seemed different then planned.</p>
			<p>Using the electronic medical record, a health summary was created by importing data from provider orders.  These patient-specific reports were one or two pages in length and reflected current orders such as diet, medications, laboratory, and x-rays, etc.</p> 
			<p>The Daily Plan<sup>&reg;</sup> was piloted for two weeks in five volunteer VA medical centers on medical-surgical units in the fall of 2007 and winter of 2008.  It was initiated as a quality improvement program.  Patients who agreed to participate in the pilot received guidance on safeguarding their medical information during their introduction to the program.  Patients were also provided The Daily Journal, a blank booklet where they or family members could make notes or list questions.</p>  
			<p>The nurse introduced The Daily Plan<sup>&reg;</sup> and reviewed it daily with each patient and/or family.  Previous Daily Plans were kept at the patient&#39;s bedside in an opaque folder and taken home by the patient at discharge.  If the patient elected not to retain The Daily Plan<sup>&reg;</sup>, it was disposed of on the unit.</p>
			<p>Close to 70% of the patients (101 evaluations) agreed or strongly agreed that having The Daily Plan<sup>&reg;</sup> made it easier for them to ask questions, increased their understanding and provided them with information that helped improve their care.<p>
			<p>Nurses were asked to reflect upon their assigned patients receiving The Daily Plan<sup>&reg;</sup> each shift and complete a single accumulated evaluation. (92 reports)</p>
			<p><ul class="bullets">
				<li>One or more error of omission was identified in 35% of the reports</li>
				<li>Prevention of other potential medical errors were identified in 21% of the reports</li>
			</ul></p>
			<p>The evaluations indicated patients felt more empowered to ask questions when they had written information available about their planned medical care each day and staff indicated that the process identified errors and prevented possible harm.  This program was able to prevent possible medical errors and we will use what was learned in this pilot to inform and guide further implementation.  Plans include making The Daily Plan<sup>&reg;</sup> more user friendly for both patients and staff and completing formal usability testing.<a class="toggle" href="#">Less >></a></p></div>
        </div>
        
        <div id="home_testimonial_head"><img src="images/TDP-icon.png" width="87" height="52" alt="TDP Testimonials" />
        	<h1>Testimonials</h1>
        </div>
        
        <div class="ajax-message"></div>
        <div id="home_testimonial_box">
        	<h2>Success story</h2>
            <h1>"It did exactly what I needed"</h1>
            <a class="image" href="#" target="new"><img src="images/testimonial-image_03.jpg" width="170" height="184" alt="Placeholder" /></a><p id="home_testimonial_text">Testomonial Text goes here</p>
            <!-- <p><a href="#">Read More >></a></p> -->
            <p><a id="show_all" href="#">View previous The Daily Plan&reg; successes >></a></p>
        </div>
        
    
    
    </div>



</div>
</div>

<!-- MODAL DIALOGS -->
<div id="testimonials-dialog" style="display:none;text-align:center;padding-top:35px;">
</div>


<script type="text/javascript">
	var $j = jQuery.noConflict();

    jQuery(document).ready(function($) {
    	Login.context = '<c:out value="${ctx}"/>';
    	Login.bindActions();
	});
</script>
