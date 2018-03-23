/**
 * -------------------------------------------
 * COPYRIGHT (c) 2017 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define("Csb.sivalcap.periodo.ComboBox", {
	extend: 'Ext.form.ComboBox',
	initComponent: function(){
		this.storePeriodo = Ext.create('Ext.data.Store', {
			  fields: ['id', 'descripcion']
		});
        Ext.apply(this, {
			xtype: 'combo',
			labelWidth: 80,
			width: 250,
			store: this.storePeriodo,
			triggerAction: 'all',
			forceSelection: true,		
			queryMode: 'local',
			displayField: 'descripcion',
			valueField: 'id',
			emptyText: '--- SELECCIONE ---',
			focusCls: 'x-class-onfocus',
			editable: false
        });
		this.callParent(arguments);
	},
	loadStore: function(periodoAbierto) {
		CsbCatalogoApp.getPeriodoList(periodoAbierto, {
			callback: function(data) {
				if (data.length > 0) {
					this.storePeriodo.loadData(data);
				}					
			},
			scope: this,
			async: false
		});		
	}
});