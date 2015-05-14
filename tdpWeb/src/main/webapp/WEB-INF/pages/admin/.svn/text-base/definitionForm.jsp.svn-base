<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="definitionDetail.title"/></title>
    <meta name="heading" content="<fmt:message key='definitionDetail.heading'/>"/>
    <meta name="menu" content="AdminMenu"/>
    <meta name="javascript" content="definitionForm" />
    <meta name="usejQuery" content="true" />
</head>

<s:form id="definitionForm" action="saveDefinition" method="post">
	<s:hidden name="definition.id" value="%{definition.id}"></s:hidden>
	<s:hidden name="definition.status" value="%{definition.status}"></s:hidden>
	<s:hidden name="definition.medlinePlusIndex" value="%{definition.medlinePlusIndex}"/>

    <s:textfield key="definition.abbreviation" required="true" cssClass="text small"/><div class="ajax-message"></div>
    <s:textarea key="definition.definition" required="true" cssClass="text large"/>

    <li class="buttonBar bottom">         
        <s:submit cssClass="button" method="save" key="button.save" theme="simple"/>
        <c:if test="${not empty definition.id}"> 
            <s:submit cssClass="button" method="delete" key="button.delete" onclick="return confirmDelete('definition')" theme="simple"/>
        </c:if>
        <s:submit cssClass="button" method="cancel" key="button.cancel" theme="simple"/>
        <s:submit id="lookupButton" cssClass="button" method="cancel" key="button.lookup" theme="simple"/>
    </li>
    <div id="originalDefinition" style="display: none;"></div>
</s:form>

<div id="modal-container" style="display:none">
	<div class="modal-top"></div>
	<div class="modal-content">
		<h1 class="modal-title">Matching Definitions</h1>
		<div class="modal-loading" style="display:none"></div>
		<div class="modal-message">Please select the most appropriate MedlinePlus Definition</div>
		<form action="#" style="display:none">
			<table>
				<colgroup>
					<col width="10%"/>
					<col width="90%"/>
				</colgroup>
				<thead>
					<tr>
						<th></th>
						<th>Definition</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
			<button type="submit" class="modal-send modal-button" tabindex="1006">Select</button>
			<button type="submit" class="modal-cancel modal-button simplemodal-close" tabindex="1007">Cancel</button>
		</form>
		<br/>
		<input type="hidden" name="token" value="' . smcf_token($to) . '"/>
	</div>
</div>

<script type="text/javascript">
	//jQuery.noConflict();

    jQuery(document).ready(function($) {
    	DefinitionForm.context = '<c:out value="${ctx}"/>';
    	DefinitionForm.bindActions();
	});
	
	Form.focusFirstElement(document.forms["definitionForm"]);
</script>
