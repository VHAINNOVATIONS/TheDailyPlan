<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="testimonialDetail.title"/></title>
    <meta name="heading" content="<fmt:message key='testimonialDetail.heading'/>"/>
    <meta name="menu" content="AdminMenu"/>
</head>

<s:form id="testimonialForm" action="saveTestimonial" enctype="multipart/form-data" method="post" validate="true">
	<s:hidden name="testimonial.id" value="%{testimonial.id}"></s:hidden>
	<s:hidden name="testimonial.imageLink" value="%{testimonial.imageLink}"></s:hidden>

    <s:textfield key="testimonial.title" required="true" cssClass="text medium"/>
    <s:textfield key="testimonial.quote" required="true" cssClass="text large"/>
    <s:textarea key="testimonial.testimonial" required="true" cssClass="text large"/>
    <img height="150px" src="${testimonial.imageLink}"/>
    <s:file name="file" label="%{getText('uploadForm.file')}" cssClass="text file"/>

    <li class="buttonBar bottom">         
        <s:submit cssClass="button" method="save" key="button.save" theme="simple"/>
        <c:if test="${not empty testimonial.id}"> 
            <s:submit cssClass="button" method="delete" key="button.delete" onclick="return confirmDelete('testimonial')" theme="simple"/>
        </c:if>
        <s:submit cssClass="button" method="cancel" key="button.cancel" theme="simple"/>
    </li>
</s:form>

<script type="text/javascript">
	Form.focusFirstElement(document.forms["testimonialForm"]);
</script>
