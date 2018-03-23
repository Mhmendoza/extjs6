/**
 * -------------------------------------------
 * COPYRIGHT (c) 2017 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
var _this = this;
Ext.define('Csb.captacion.Viewport', {
	extend: 'Ext.container.Viewport',
	initComponent: function(){
		Ext.tip.QuickTipManager.init();
        Ext.apply(this, {
        	layout: 'border',
        	items: [{
        		region: 'center',
        		height: 570,
        	    xtype: 'formCaptacionApp'
        	}]
        });
		this.callParent(arguments);
	}
});