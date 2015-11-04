<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="testimonialList.title"/></title>
    <meta name="heading" content="<fmt:message key='testimonialList.heading'/>"/>
    <meta name="menu" content="AdminMenu"/>
</head>

<c:set var="buttons">
    <input type="button" style="margin-right: 5px"
        onclick="location.href='<c:url value="/admin/editTestimonial.html"/>'"
        value="<fmt:message key="button.add"/>"/>
    
    <input type="button" onclick="location.href='<c:url value="/mainMenu.html"/>'"
        value="<fmt:message key="button.done"/>"/>
</c:set>

<c:out value="${buttons}" escapeXml="false" />

<s:set name="testimonials" value="testimonials" scope="request"/>
<display:table name="testimonials" class="table" requestURI="" id="testimonialList" export="true" pagesize="25">
    <display:column property="id" sortable="true" href="editTestimonial.html" 
        paramId="id" paramProperty="id" titleKey="testimonial.id"/>
    <display:column property="title" sortable="true" titleKey="testimonial.title"/>
    <display:column property="quote" sortable="true" titleKey="testimonial.quote"/>
    <display:column property="testimonial" sortable="true" titleKey="testimonial.testimonial"/>
    <display:column property="imageLink" sortable="true" titleKey="testimonial.imageLink"/>
    <display:column property="updatedBy" sortable="true" titleKey="testimonial.updatedBy"/>
    <display:column property="updateDate" sortable="true" titleKey="testimonial.updateDate"/>

    <display:setProperty name="paging.banner.item_name" value="testimonial"/>
    <display:setProperty name="paging.banner.items_name" value="testimonials"/>

    <display:setProperty name="export.excel.filename" value="Testimonial List.xls"/>
    <display:setProperty name="export.csv.filename" value="Testimonial List.csv"/>
    <display:setProperty name="export.pdf.filename" value="Testimonial List.pdf"/>
</display:table>

<c:out value="${buttons}" escapeXml="false" />

<script type="text/javascript">
    highlightTableRows("testimonialList");
</script>
