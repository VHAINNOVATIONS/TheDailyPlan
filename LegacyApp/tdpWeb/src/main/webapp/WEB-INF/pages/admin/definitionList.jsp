<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="definitionList.title"/></title>
    <meta name="heading" content="<fmt:message key='definitionList.heading'/>"/>
    <meta name="menu" content="AdminMenu"/>
</head>

<c:set var="buttons">
    <input type="button" style="margin-right: 5px"
        onclick="location.href='<c:url value="/admin/editDefinition.html"/>'"
        value="<fmt:message key="button.add"/>"/>
    
    <input type="button" onclick="location.href='<c:url value="/mainMenu.html"/>'"
        value="<fmt:message key="button.done"/>"/>
    
    <input type="button" onclick="location.href='<c:url value="/admin/reloadCommonDefs.html"/>'"
        value="<fmt:message key="button.reload"/>"/>
</c:set>

<c:out value="${buttons}" escapeXml="false" />

<s:set name="definitions" value="definitions" scope="request"/>
<display:table name="definitions" class="table" requestURI="" id="definitionList" export="true" pagesize="25" defaultsort="2">
    <display:column property="id" title="" class="hidden" headerClass="hidden"
    	url="/admin/editDefinition.html" paramId="id" paramProperty="id"/>
    <display:column property="abbreviation" sortable="true" titleKey="definition.abbreviation"/>
    <display:column property="definition" sortable="true" titleKey="definition.definition"/>
    <display:column  titleKey="definition.status">
    	<div  title="${definitionList.status.description}">
    		<img src="../images/status/${definitionList.status}.gif" width="120"/>
    	</div>
    </display:column>

    <display:setProperty name="paging.banner.item_name" value="definition"/>
    <display:setProperty name="paging.banner.items_name" value="definitions"/>

    <display:setProperty name="export.excel.filename" value="Definition List.xls"/>
    <display:setProperty name="export.csv.filename" value="Definition List.csv"/>
    <display:setProperty name="export.pdf.filename" value="Definition List.pdf"/>
</display:table>

<c:out value="${buttons}" escapeXml="false" />

<script type="text/javascript">
    highlightTableRows("definitionList");
</script>
