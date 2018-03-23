/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
var _this = this; //Instancia global
Ext.define('Csp.recovery.MenuViewport', {
	extend: 'Ext.container.Viewport',
	initComponent: function(){
		Ext.tip.QuickTipManager.init();

		/**
		 * Construye viewport
		 */
        Ext.apply(this, {
        	layout: 'border',
        	items: [{
        		region: 'center',
        		height: 570,
        	    xtype: 'formMenuApp'
        	}]
        });
		this.callParent(arguments);
	}
});