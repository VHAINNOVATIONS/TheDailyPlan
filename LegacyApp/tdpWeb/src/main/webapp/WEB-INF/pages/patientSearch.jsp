<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="patientSearch.title"/></title>
	<link rel="stylesheet" type="text/css" media="screen" href="<c:url value='/styles/datatables/patient_table.css'/>" /> 
    <script type="text/javascript" src="<c:url value='/scripts/jquery.dataTables.min.js'/>"></script>
    <meta name="menu" content="MainMenu"/>
    <meta name="javascript" content="patientSearch" />
    <meta name="usejQuery" content="true" />
</head>

<div id="universe">
    <h1><fmt:message key='patientSearch.heading'/></h1>
	<div id="search">
	    
	    <c:set var="teamName" value="#{team.name}" scope="page"/>
	    <c:set var="selected" value="#{tabParam}" scope="page"/>
	    <c:if test="${ empty selected }">
	    	<c:set var="selected" value="#{pageContext.request.userPrincipal.principal.prefInitialSearch}" scope="page"/>
	    </c:if>

	    <div id="search_tab_row">
	    	
	        <!-- <div id="UNIT" class="search_tab"><a class="tab" href="#" rel="search_unit"><span>Unit</a></div> -->
	        <div id="WARD" class="search_tab"><a class="tab" href="#" rel="search_ward"><span>Ward</a></div>
	    	<c:if test="${ !empty teamName }">
		        <div id="TEAM" class="search_tab"><a class="tab" href="#" rel="search_team"><span>Team</span></a></div>
		    </c:if>
	        <div id="ALL" class="search_tab"><a class="tab" href="#" rel="search_match"><span>All</span></a></div>
	    
	    </div>
	    
<!--	    <div id="search_unit" class="tab_content">
	    	<div id="search_unit_list">
	    		<c:forEach items="${units}" var="unit">
	        		<h2><a id="${unit.id} }" href="#">${unit.name}</a></h2>
	    		</c:forEach>
	        </div>
	    </div> -->
	    
	    <div id="search_ward" class="tab_content">
	    	<div id="search_ward_list">
	    		<c:forEach items="${wards}" var="ward">
	        		<h2><a id="${ward.id}" href="#">${ward.name}</a></h2>
	    		</c:forEach>
	        </div>
	    </div>
	    
	    <c:if test="${ !empty teamName }">
		    <div id="search_team" class="tab_content">
		    	<div id="search_team_id" rel="${team.id}">
		        	<h2>Results for team ${team.name}</h2>
		        </div>
		    </div>
	    </c:if>
	    
	    	    
	    <div id="search_match" class="tab_content">
	    	<div id="search_criteria">
		    	<h2>Patient Name (Last, First or SSN)</h2>
		    	<div id="search_criteria_controls">
			    	<input id="name" type="text" size="40"/>
				    <input class="button" type="button" value="Search" />
				    <div id="spinner" style="display: none;" class="spinner"><div id="loading"></div></div>
		    	</div>
				<div id="search_match" class="collapsed">
	                <s:select name="fonts" list="fontList" listKey="value" listValue="display" value="defaultFont"/>
	                <s:hidden key="defaultTemplate"/>
	            </div>
	    	</div>
	    </div>
	    
	    <form name="printPreview" action="printPreviewDisplay.html" method="post">
		    <div id="search_results_group">
			    
			    <div id="search_results">
			    	<table id="patient_table" cellpadding="0" cellspacing="0" border="0">
			    	<colgroup>
			    		<col width="5%"/>
			    		<col width="10%"/>
			    		<col width="25%"/>
			    		<col width="15%"/>
			    		<col width="15%"/>
			    		<col width="10%"/>
			    		<col width="20%"/>
			    	</colgroup>
			    	<thead>
				        <tr>
				        	<th class="head"></th>
				            <th class="head">Font Size</th>
				            <th class="headleft">Name</th>
				            <th class="head">SSN</th>
				            <th class="head">DOB</th>
				            <th class="head">Gender</th>
				            <th class="head">Location</th>
				        	<th class="hidden"></th>
				        	<th class="hidden"></th>
				        </tr>
			    	</thead>
			    	<tbody id="patient_list">
			    	</tbody>
			     	</table>
			     </div>
			     
			     <div id="preview_pending" style="display: none;">
			     	<div id="preview_spinner" class="spinner" style="display: block; float: right;">
			     		<div id="loading"></div>
			     	</div>
			     </div>
			     
			     <div id="search_buttons">
			     	<input type="submit" class="button" name="preview" value="<fmt:message key='button.preview'/>" />
			     	<input type="submit" id="print_selected" class="button" name="print" value="<fmt:message key='button.print'/>"/>
			     </div>
		     </div>
	    </form>
	
	    <div id="search_results_empty">
	    	<h2>No Patients Found</h2>
		</div>
	
	</div>
</div>

<script type="text/javascript">
	(function($) {
			/* Create an array with the values of all the select options in a column */
			$.fn.dataTableExt.afnSortData['dom-select'] = function  ( oSettings, iColumn )
			{
				var aData = [];
				$( 'td:eq('+iColumn+') select', oSettings.oApi._fnGetTrNodes(oSettings) ).each( function () {
					aData.push( $(this).val() );
				} );
				return aData;
			};
			
		$.fn.dataTableExt.oSort['dom-select-asc']  = function(a,b) {
			var x = a ? a.split(':')[1] : 0;
			var y = b ? b.split(':')[1] : 0;
			return ((x < y) ? -1 : ((x > y) ?  1 : 0));
		};
		
		$.fn.dataTableExt.oSort['dom-select-desc'] = function(a,b) {
			var x = a ? a.split(':')[1] : 0;
			var y = b ? b.split(':')[1] : 0;
			return ((x < y) ?  1 : ((x > y) ? -1 : 0));
		};
			
		$.fn.dataTableExt.oSort['dom-checkbox-asc']  = function(a,b) {
			var x = a ? a : 0;
			var y = b ? b : 0;
			return ((x < y) ? -1 : ((x > y) ?  1 : 0));
		};
		
		$.fn.dataTableExt.oSort['dom-checkbox-desc'] = function(a,b) {
			var x = a ? a : 0;
			var y = b ? b : 0;
			return ((x < y) ?  1 : ((x > y) ? -1 : 0));
		};

		/* Create an array with the values of all the checkboxes in a column */
		$.fn.dataTableExt.afnSortData['dom-checkbox'] = function  ( oSettings, iColumn )
		{
			var aData = [];
			$( 'td:eq('+iColumn+') input', oSettings.oApi._fnGetTrNodes(oSettings) ).each( function () {
				aData.push( this.checked==true ? "1" : "0" );
			} );
			return aData;
		};
	})(jQuery);

	var $j = jQuery.noConflict();

    jQuery(document).ready(function($) {
    	PatientSearch.context = '<c:out value="${ctx}"/>';
    	PatientSearch.defaults.team = '<c:out value="${teamName}"/>';
     	PatientSearch.defaults.tab = '<c:out value="${selected}"/>';
	});
	
	$j(document).ready(PatientSearch.bindActions);
	
</script>
