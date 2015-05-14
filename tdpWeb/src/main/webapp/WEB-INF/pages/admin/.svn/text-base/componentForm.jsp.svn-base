<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="componentDetail.title"/></title>
    <meta name="heading" content="<fmt:message key='componentDetail.heading'/>"/>
    <meta name="menu" content="AdminMenu"/>
    <meta name="javascript" content="componentForm" />
    <meta name="usejQuery" content="true" />
    <script type="text/javascript" src="<c:url value='/scripts/selectbox.js'/>"></script>
    <style type="text/css">
    	div#main {
    		width: 80%;
    	}
    	form li fieldset {
			width:439px;
		}
		form .medium {
			width:349px;
		}
		table.pickList td select {
			width:175px;
		}
    </style>
</head>

<s:form id="componentForm" action="saveComponent" method="post">
	<s:hidden name="component.id" value="%{component.id}"></s:hidden>
	<s:hidden name="component.method" value="%{component.method}"></s:hidden>
	<s:hidden name="component.mandatory" value="%{component.mandatory}"></s:hidden>
	<s:hidden name="component.hasCriteria" value="%{component.hasCriteria}"></s:hidden>

    <s:textfield key="component.name" required="true" cssClass="text large"/>
    <s:textfield key="component.title" required="true" cssClass="text large"/>
    <s:textarea key="component.template" required="true" cssClass="text medium"/>

    <li class="buttonBar bottom">         
        <s:submit cssClass="button" method="saveComponent" key="button.saveComponent" theme="simple" />
        <c:if test="${not empty component.id && !componentOwned}"> 
            <s:submit cssClass="button" method="deleteComponent" key="button.deleteComponent" onclick="return confirmDelete('component')" theme="simple"/>
        </c:if>
        <s:submit cssClass="button" method="cancel" key="button.cancel" theme="simple"/>
    </li>
</s:form>

<script type="text/javascript">
	var $j = jQuery.noConflict();

    $j(document).ready(function($) {
    	ComponentForm.context = '<c:out value="${ctx}"/>';
    	ComponentForm.criteria = '<c:out value="${component.criteria}"/>';
    	ComponentForm.bindActions();
 	});

	Form.focusFirstElement(document.forms["componentForm"]);
</script>
