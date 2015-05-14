<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="patientSearch.title"/></title>
    <meta name="menu" content="MainMenu"/>
    <meta name="javascript" content="dailyPlanPreview" />
    <meta name="usejQuery" content="true" />
</head>

<div id="universe">
<div id="report">
    
    <div id="report_buttons">
        <div id="report_print"><a class="graybutton" href="#" onclick="this.blur();"><span>Print All</span></a></div>
        <div id="report_font"><a class="graybutton" href="#" onclick="this.blur();"><span>Change <c:out value="${report.selectedFont.display}"/> Font Size</span></a></div>
    </div>
    
    <!-- BEGIN REPORT -->
    <div id="report_container">
    	
    	<table id="table_list" class="${ report.selectedFont.value }">
    		<thead>
    			<tr><th>
			    	<div id="report_bluetop">
			            <div id="report_dropdown_left">
			                <s:form id="selectPatientForm" name="patient_name" action="previewPatient">
								<s:hidden key="selected"/>
								<s:hidden key="fonts"/>
								<s:hidden key="defaultTemplates"/>
								<s:hidden key="report.template.id"/>
								<s:hidden key="selectedTab"/>
								<s:select id="selectPatient" name="selectedPatientId" list="reports" listKey="patient.localPid" listValue="patientDescription" />
							</s:form>
			            </div>
						<c:if test="${ showTemplates }">
							<div id="report_dropdown_right"> 
									<s:form name="template" action="changeTemplate">
										<s:hidden key="selected"/>
										<s:hidden key="fonts"/>
										<s:hidden key="defaultTemplates"/>
										<s:hidden key="selectedPatientId"/>
										<s:hidden key="selectedTab"/>
										<s:select name="selectedTemplateId" list="templates" listKey="name" listValue="name" />
									</s:form>
				        	</div>
			 			</c:if>
			        </div>
			        <!-- Tabs -->
			        <div id="patient_tab_row">	    	
				        <div class="patient_tab" id="LAYOUT"><a rel="report_layout" href="#" class="tab"><span>Layout</span></a></div>
				        <div class="patient_tab" id="PREVIEW"><a rel="report_preview" href="#" class="tab"><span>Preview</span></a></div>	    
	    			</div>
			    	
    			</th></tr>
    		</thead>
    		<tbody>
        		<tr id="report_preview"><td>
					<div id="pdfWrapper" class="content" style="display: none;">
						<iframe id="pdfDoc" width="100%" height="100%"
							src="${ctx}/PdfServlet?patient=${ report.patient.localPid }&font=${ report.selectedFont.value }&template=${ report.template.id}"></iframe>
					</div>
				
        		</td></tr>
        		
        		<tr id="report_layout"><td>
 					<div id="contentWrapper" class="content" style="display: none;">
        			<c:forEach varStatus="status" items="${report.expandedComponents}" var="component">
				        <div id="report_row">
				        	<div id="report_category"><c:out escapeXml="false" value="${component.title}"></c:out></div>
				            <c:out escapeXml="false" value="${component.template}"/>
				        </div>
					</c:forEach>
					</div>
        		
        		</td></tr>
				
    		</tbody>
    		<tfoot>
    			<tr><td><div id="report_logo">Printed on: <c:out value="${today}"/></div></td></tr>
    		</tfoot>
    	</table>
    </div>
    
</div>
</div>

<div id="tooltip" style="display: none; top: 835px; left: 320px; right: auto;" class="viewport-bottom">
	<h3>Note</h3>
	<div class="body" style="display: block;">Please note the custom positioning here!</div>
	<div class="url" style="display: none;"></div>
</div>

<div id="modal-container" style="display:none">
	<div class="modal-top"></div>
	<div class="modal-content">
		<h1 class="modal-title">Font Sizes</h1>
		<div class="modal-loading" style="display:none"></div>
		<div class="modal-message">Please select one of the following font sizes for the Patient Report</div>
		<form action="#" style="display:none">
			<ul>
				<li>
					<input name="font_select" id="Small" type="radio" value="SMALL"/> Small
				</li>
				<li>
					<input name="font_select" id="Medium" type="radio" value="MEDIUM"/> Medium
				</li>
				<li>
					<input name="font_select" id="Large" type="radio" value="LARGE"/> Large
				</li>
			</ul>
			<button type="submit" class="modal-send modal-button" tabindex="1006">Select</button>
			<button type="submit" class="modal-cancel modal-button simplemodal-close" tabindex="1007">Cancel</button>
		</form>
		<br/>
		<input type="hidden" name="token" value="' . smcf_token($to) . '"/>
	</div>
</div>

<script type="text/javascript">
	var $j = jQuery.noConflict();

    jQuery(document).ready(function($) {
    	DailyPlanPreview.context = '<c:out value="${ctx}"/>';
    	DailyPlanPreview.fontSize = '<c:out value="${report.selectedFont.display}"/>';
    	DailyPlanPreview.selected = '<c:out value="${selectedTab}"/>';
    	DailyPlanPreview.bindActions();
	});
</script>