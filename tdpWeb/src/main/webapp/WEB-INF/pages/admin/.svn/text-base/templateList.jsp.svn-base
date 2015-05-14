<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="templateList.title"/></title>
    <meta name="heading" content="<fmt:message key='templateList.heading'/>"/>
    <meta name="menu" content="AdminMenu"/>
</head>

<c:set var="buttons">
    <input type="button" style="margin-right: 5px"
        onclick="location.href='<c:url value="/admin/editTemplate.html"/>'"
        value="<fmt:message key="button.add"/>"/>
    
    <input type="button" onclick="location.href='<c:url value="/mainMenu.html"/>'"
        value="<fmt:message key="button.done"/>"/>
</c:set>

<c:out value="${buttons}" escapeXml="false" />

<s:set name="templates" value="templates" scope="request"/>
<display:table name="templates" class="table" requestURI="" id="templateList" export="true" pagesize="25" defaultsort="2">
    <display:column property="id" title="" class="hidden" headerClass="hidden"
    	url="/admin/editTemplate.html" paramId="id" paramProperty="id"/>
    <display:column property="name" sortable="true" titleKey="template.name" class="large"/>
    <display:column property="description" sortable="true" titleKey="template.description"/>
    <display:column property="ward" sortable="true" titleKey="template.ward"/>
    <display:column property="componentCount" sortable="true" titleKey="template.components"/>

    <display:setProperty name="paging.banner.item_name" value="template"/>
    <display:setProperty name="paging.banner.items_name" value="templates"/>

    <display:setProperty name="export.excel.filename" value="Template List.xls"/>
    <display:setProperty name="export.csv.filename" value="Template List.csv"/>
    <display:setProperty name="export.pdf.filename" value="Template List.pdf"/>
</display:table>

<c:out value="${buttons}" escapeXml="false" />

<script type="text/javascript">
    highlightTableRows("templateList");
</script>
