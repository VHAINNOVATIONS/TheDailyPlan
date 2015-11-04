<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ include file="/common/taglibs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
    <head>
        <%@ include file="/common/meta.jsp" %>
        <title><decorator:title/> | <fmt:message key="webapp.name"/></title>

        <link rel="stylesheet" type="text/css" media="all" href="<c:url value='/styles/${appConfig["csstheme"]}/theme.css'/>" />
        <link rel="stylesheet" type="text/css" media="print" href="<c:url value='/styles/${appConfig["csstheme"]}/print.css'/>" />
        <link rel="stylesheet" type="text/css" media="screen" href="<c:url value='/styles/va_files/styles/va-user-styles.css'/>" />
        <link rel="stylesheet" type="text/css" media="screen" href="<c:url value='/styles/va_files/styles/vaSearch.css'/>" />
        <link rel="stylesheet" type="text/css" media="screen" href="<c:url value='/styles/va_files/styles/jkmegamenu.css'/>" /> 
        <link rel="stylesheet" type="text/css" media="screen" href="<c:url value='/styles/va_files/styles/va-styles.css'/>" />
		<!--[if IE]>
        	<link rel="stylesheet" type="text/css" media="screen" href="<c:url value='/styles/ie.css'/>" />
		<![endif]-->

        <script type="text/javascript" src="<c:url value='/scripts/global.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/scripts/prototype.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/scripts/scriptaculous.js'/>"></script>
        <c:set var="usejQuery" scope="request"><decorator:getProperty property="meta.usejQuery"/></c:set>
        <c:if test="${usejQuery == 'true'}">
        	<script type="text/javascript" src="<c:url value='/scripts/jquery-1.4.2.min.js'/>"></script>
        	<script type="text/javascript" src="<c:url value='/scripts/jquery.simplemodal-1.3.5.min.js'/>"></script>
        	<script type="text/javascript" src="<c:url value='/scripts/jquery.tooltip.js'/>"></script>
        </c:if>
       	<c:set var="jsInclude" scope="request"><decorator:getProperty property="meta.javascript"/></c:set>
        <c:if test="${jsInclude != ''}">
        	<script type="text/javascript" src=<c:url value='/scripts/pages/${jsInclude}.js'/>></script>
        </c:if>
        <decorator:head/>
    </head>
<body<decorator:getProperty property="body.id" writeEntireProperty="true"/><decorator:getProperty property="body.class" writeEntireProperty="true"/>>

    <div id="page">
        <div id="header" class="clearfix">
            <jsp:include page="/common/header.jsp"/>
        </div>

        <div id="content" class="clearfix">
            <div id="main">
                <%@ include file="/common/messages.jsp" %>
                <h1><decorator:getProperty property="meta.heading"/></h1>
                <decorator:body/>
            </div>

            <div id="nav">
                <div class="wrapper">
                    <h2 class="accessibility">Navigation</h2>
                    <jsp:include page="/common/menu.jsp"/>
                </div>
                <c:if test="${pageContext.request.remoteUser != null}">
		        	<div class="right">${pageContext.request.userPrincipal.principal.message}</div>
		        </c:if>
                <hr/>
            </div><!-- end nav -->
        </div>

        <div id="footer" class="clearfix">
            <jsp:include page="/common/footer.jsp"/>
        </div>
    </div>
</body>
</html>
