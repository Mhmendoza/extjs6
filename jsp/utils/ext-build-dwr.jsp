<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
	String contextPath = request.getContextPath();
	String serverPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+contextPath+"/";
	String logoutPath = contextPath + "/j_spring_security_logout";
	String loading = serverPath + "images/blue-loading.gif";
	String version = "1.0";
%>
CSP = {};
CSP.utils = {};
CSP.utils.constants = function(){
	return {
		TIMESTAMP_FORMAT: 'd/m/Y H:i',
		DATE_FORMAT     : 'd/m/Y',
		URL_BASE_PATH   : '<%=serverPath%>',
		CONTEXT_PATH	: '<%=contextPath%>',
		LOGOUT_PATH		: '<%=logoutPath %>',
		LOADING			: '<%=loading%>',
		VERSION			: '<%=version%>',
		ENGINE_ROOT		: '<%=serverPath%>dwr/',
		INTERFACES_ROOT	: '<%=serverPath%>dwr/interface/',
		LIBS_ROOT		: '<%=serverPath%>js/app/utils/'
	};
}();
