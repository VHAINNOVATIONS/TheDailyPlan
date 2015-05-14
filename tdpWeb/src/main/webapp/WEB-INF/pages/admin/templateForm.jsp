<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="templateDetail.title"/></title>
    <meta name="heading" content="<fmt:message key='templateDetail.heading'/>"/>
    <meta name="menu" content="AdminMenu"/>
    <meta name="javascript" content="templateForm" />
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

<s:form id="templateForm" action="saveTemplate" method="post">
	<s:hidden name="template.id" value="%{template.id}"></s:hidden>
	<s:hidden name="componentId" value="%{componentId}"></s:hidden>

    <s:textfield key="template.name" required="true" cssClass="text large"/>
    <c:if test="${template.id != '1'}">
    	<s:select list="wards" key="template.ward" listKey="name" listValue="name" />
    </c:if>
    <s:textarea key="template.description" required="true" cssClass="text medium"/>
    <li>
        <fieldset>
            <legend><fmt:message key="templateDetail.assignComponents"/></legend>
            <table id="component_selector" class="pickList">
                <tr>
                    <th class="pickLabel">
                        <label class="required"><fmt:message key="templateDetail.availableComponents"/></label>
                    </th>
                    <td></td>
                    <th class="pickLabel">
                        <label class="required"><fmt:message key="templateDetail.components"/></label>
                    </th>
                </tr>
                <c:set var="leftList" value="${availableComponents}" scope="request"/>
                <s:set name="rightList" value="template.componentList" scope="request"/>
                <c:import url="/WEB-INF/pages/pickList.jsp">
                    <c:param name="listCount" value="1"/>
                    <c:param name="leftId" value="availableComponents"/>
                    <c:param name="rightId" value="components"/>
                </c:import>
            </table>
        </fieldset>
    </li>

    <li class="buttonBar bottom">         
        <s:submit cssClass="button" method="save" key="button.save" theme="simple"  onclick="selectAll('components');"/>
        <c:if test="${not empty template.id}"> 
            <s:submit cssClass="button" method="delete" key="button.delete" onclick="return confirmDelete('template')" theme="simple"/>
        </c:if>
        <s:submit cssClass="button" method="cancel" key="button.cancel" theme="simple"/>
        <s:submit cssClass="button" method="doComponent" key="button.newComponent" theme="simple"/>
        <s:submit cssClass="buttonHidden" method="doComponent" key="button.editComponent" theme="simple"/>
    </li>
</s:form>

<script type="text/javascript">
//	var $j = jQuery.noConflict();

    jQuery(document).ready(function($) {
    	TemplateForm.context = '<c:out value="${ctx}"/>';
    	TemplateForm.components = <s:property escape="false" value="jsonComponents"/>;
    	TemplateForm.bindActions();
	});
	
	Form.focusFirstElement(document.forms["templateForm"]);
</script>
