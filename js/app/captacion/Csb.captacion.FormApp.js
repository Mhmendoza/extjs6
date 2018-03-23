/**
 * -------------------------------------------
 * COPYRIGHT (c) 2013 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
_this = this;
Ext.define('Csb.captacion.FormApp', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formCaptacionApp',
	renderTo: document.body,
	initComponent: function(){
        Ext.apply(this, {
        		border: false,
                items: [{
                	xtype: 'tabpanel',
                	id: 'tpCaptacion',
                	frame: true,
                	height: 600,
                	items: [{
                		xtype: 'formLoadFileCap',
                		title: 'Carga de Archivos',
                		id: 'form1',
                		iconCls: 'icon-view-detail'
                	},{
                		xtype: 'formAjusteCap',
                		title: 'Captacion vs Balanza',
                		id: 'form2',
                		iconCls: 'icon-view-detail'
                	},{
                		xtype: 'formReportCap',
                		title: 'Generar Reporte',
                		id: 'form3',
                		iconCls: 'icon-view-detail'
                	}]
                }]
        });
		this.callParent(arguments);
	}
});