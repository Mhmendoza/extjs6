/**
 * @author Ing. Manuel Hernández Mendoza
 * @copyright (c) 2017 ConsuBanco S.A. DE C.V.
 * @version 1.0
 */
Ext.define('CSBIntegral.app.Application', {
    extend: 'Ext.app.Application',
    name: 'CSBIntegral',
    requires: [
	           	'Ext.form.Panel',
	        	'Ext.tab.Panel',
	        	'Ext.layout.container.Border',
	        	'Ext.form.Label',
	        	'Ext.form.FieldSet',
	        	'Ext.layout.container.Column',
	        	'Ext.form.RadioGroup',
	        	'Ext.toolbar.Toolbar',
	        	'Ext.tip.QuickTipManager',
	        	'Ext.util.Filter',
	        	'Ext.ux.data.PagingMemoryProxy',
	        	'Ext.ux.IFrame',
	        	'Ext.util.ComponentDragger',
	        	'Ext.util.Region',
	        	'Ext.EventManager',
	        	'Ext.window.Window',
	        	'Ext.grid.CellEditor',
	        	'Ext.util.DelayedTask'
	    ],
	    removeLoader: function(){
	        var elemento = document.getElementById('loading');
	        elemento.parentNode.removeChild(elemento);
	    }
});

