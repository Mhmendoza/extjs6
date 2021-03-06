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
<meta name="author" content="Ing. Manuel Hen�ndez Mendoza"/>
<title>CSBIntegral</title>
<jsp:include page="/jsp/utils/ext-all.jsp"></jsp:include>
<script type="text/javascript">
CSP.utils.app.buildAjaxDWR({
	libraries:['Ext.Format.Pesos'],
	interfacesDWR: ['CspRecoveryApp', 'CspGenericReportApp','CspCierreMesApp']
});
</script>
<script type="text/javascript" src="<c:url value="/js/app/utils/Ext.ux.GMaps3.Panel.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/csprecovery/master/Csp.recovery.ModelMaster.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/csprecovery/master/Csp.recovery.FormParamsFind.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/csprecovery/default/Csp.recovery.GridMaster.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/csprecovery/default/Csp.recovery.FormDefaultApp.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/csprecovery/default/Csp.recovery.DefaultViewport.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/app/csprecovery/default/Csp.recovery.DefaultApp.js"/>"></script>

</head>
<body OnContextMenu="return false">
	<div id="loading"></div>
</body>
</html>