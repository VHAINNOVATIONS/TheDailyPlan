<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="dateOverride.title"/></title>
    <meta name="heading" content="<fmt:message key='dateOverride.heading'/>"/>
    <meta name="menu" content="AdminMenu"/>
    <script type="text/javascript" src="<c:url value='/scripts/calendar/calendar.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/calendar/lang/calendar-en.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/scripts/calendar/calendar-setup.js'/>"></script>
</head>

<s:form name="dateOverrideForm" action="saveDateOverride" method="post" validate="true">
    <li class="buttonBar top">
        <c:set var="buttons">
            <s:submit key="button.save" method="save" onclick="onFormSubmit(this.form)"/>
        
            <s:submit key="button.cancel" method="cancel"/>
        </c:set>
    </li>
    <li class="info">
		<p><fmt:message key="dateOverride.message"/></p>
    </li>

	
	<li>
	    <div>
            <s:textfield key="dateHolder.currentOverride" id="date.currentOverride" theme="xhtml" cssClass="text medium"/>
            <img onmouseout="this.style.background=''" 
 					onmouseover="this.style.background='blue';" 
 					title="Date selector" 
 					style="cursor: pointer; border: 1px solid blue;" 
 					id="f_trigger_c" 
 					src=<c:url value='/images/calendar.gif'/>></img>
 		</div>
 	</li>

	<li>
		<div>
			<s:checkbox key="dateHolder.bypassTodayCheck" id="date.bypassTodayCheck" theme="simple"//>
            <label for="date.bypassTodayCheck" class="choice"><fmt:message key="dateHolder.bypassTodayCheck"/></label>
		</div>
	</li>
	
    <li class="buttonBar bottom">
        <c:out value="${buttons}" escapeXml="false"/>
    </li>
</s:form>

<script type="text/javascript">
    Form.focusFirstElement(document.forms["saveDateOverride"]);
    highlightFormElements();
    
 	Calendar.setup({
		inputField : "date.currentOverride", // id of the input field
		ifFormat : "%B %e, %Y", // format of the input field
		button : "f_trigger_c", // trigger for the calendar (button ID)
		singleClick : true
	}); 
</script>
