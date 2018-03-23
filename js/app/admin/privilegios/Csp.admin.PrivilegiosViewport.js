/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
var _this = this; //Instancia global
Ext.define('Csp.recovery.PrivilegiosViewport', {
	extend: 'Ext.container.Viewport',
	initComponent: function(){
		Ext.tip.QuickTipManager.init();
	    
		/**
		 * Construye form aplicativo
		 */
        Ext.apply(this, {
        	layout: 'border',
        	items: [{
        		region: 'center',
        		height: 570,
        	    xtype: 'formPrivilegiosApp'
        	}]
        });
		this.callParent(arguments);
	}
});