/**
 * @author Ing. Manuel Hernández Mendoza
 * @copyright (c) 2017 ConsuBanco S.A. DE C.V.
 * @version 1.0
 */
Ext.onReady(function() {
	Ext.application({
	    name: 'CSBIntegral',
	    extend: 'CSBIntegral.app.Application',
	    launch: function() {
	       Ext.create('Csp.system.ViewportIndex');
	       this.removeLoader();
	    }
	});
	window.onbeforeunload = function(e){
		window.location = CSP.utils.constants.LOGOUT_PATH;
	};
});