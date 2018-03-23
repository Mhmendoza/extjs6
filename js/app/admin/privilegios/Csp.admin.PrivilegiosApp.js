/**
 * @author Ing. Manuel Hernández Mendoza
 * @copyright (c) 2014 ConsuBanco S.A. DE C.V.
 * @version 1.0
 */
Ext.require([
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
	'Ext.ux.data.PagingMemoryProxy'
]);
Ext.onReady(function() {
	Ext.application({
	    name: 'CSPRecovery',
	    launch: function() {
	        Ext.create('Csp.recovery.PrivilegiosViewport');
	        Recovery.app.Application.removeLoader();
	    }
	});
});