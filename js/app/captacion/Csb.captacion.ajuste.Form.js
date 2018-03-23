/**
 * ----------------------------------------------------
 * COPYRIGHT (c) 2017 CONSUBANCO S.A. BANCA MULTIPLE
 * ---------------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
_this = this;
Ext.define('Csb.captacion.ajuste.Form', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formAjusteCap',
	initComponent: function(){
		this.periodoComboBox1 =  Ext.create('Csb.sivalcap.periodo.ComboBox', {
			id: 'cbxPeriodoId1',
			fieldLabel: 'Periodo*',
			allowBlank: false,
			listeners: {
				scope: this,
				select: function(combo, records, object) {
				}
			}
		});
		this.periodoComboBox1.loadStore(true);
        Ext.apply(this, {
        		border: false,
                items: [{
					xtype : 'form',
					id : 'formAjusteCap',
					frame : true,
					items : [{
						xtype : 'fieldset',
						title : 'Captación vs Balanza',
						autoHeight : true,
						layout : 'column',
						items : [{ 
							xtype : 'container',
							layout : 'anchor',
							columnWidth: .5,
							border : false,
							items : [this.periodoComboBox1]
						}]
					}],
					buttons : [{
		    			text: 'Consultar',
		    			id: 'btnConsultar',
		    			iconCls: 'icon_user-find',
		    			scope: this,
		    			handler: function(){
		    				if (Ext.getCmp('cbxPeriodoId1').isValid()) {
		    					Ext.getCmp('gridAjusteCap').loadStore(Ext.getCmp('cbxPeriodoId1').getValue());
		    				} else {
							    Ext.MessageBox.show({
									title: 'CSBIntegral',
									msg: 'Seleccione un periodo.',
									icon: Ext.MessageBox.INFO,
									buttons: Ext.MessageBox.OK
								});
							    Ext.getCmp('cbxPeriodoId1').focus();
		    				}
		    			}
			    }]
				},{
                	xtype: 'gridAjusteCap',
                	id: 'gridAjusteCap',
        			region: 'north',
                    collapsible: true,
                    title: 'Captación vs Balanza',
                    autoscroll: true,
                    height: 470
                }]
        });
		this.callParent(arguments);
	}
});