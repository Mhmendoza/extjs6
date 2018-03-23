<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
<link rel="shortcut icon" href="<c:url value="/favicon.ico"/>" type="image/vnd.microsoft.icon"></link> 
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="description" content="CSBIntegral">
<meta name="author" content="Ing. Manuel Henández Mendoza"/>
<title>SIVALCAP</title>
<jsp:include page="/jsp/utils/ext-all.jsp"></jsp:include>
<script type="text/javascript">
CSP.utils.app.buildAjaxDWR({
	interfacesDWR: ['CspMangerSystemApp']
});
</script>

<script type="text/javascript" src="<c:url value="/js/app/admin/menu/Csp.admin.ModelMenu.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/admin/menu/Csp.admin.GridMenu.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/admin/privilegios/Csp.admin.GridPrivilegios.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/admin/privilegios/Csp.admin.GridUsuarios.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/admin/privilegios/Csp.admin.WindowPrivilegios.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/admin/privilegios/Csp.admin.WindowUsuarios.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/admin/privilegios/Csp.admin.FormPrivilegiosApp.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/admin/privilegios/Csp.admin.PrivilegiosApp.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/admin/privilegios/Csp.admin.PrivilegiosViewport.js"/>"></script>

</head>
<body OnContextMenu="return false">
	<div id="loading"></div>
</body>
</html>