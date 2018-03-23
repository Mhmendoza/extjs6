/**
 * ----------------------------------------------------
 * COPYRIGHT (c) 2017 CONSUBANCO S.A. BANCA MULTIPLE
 * ---------------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
_this = this;
Ext.define('Csb.captacion.report.Form', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formReportCap',
	initComponent: function(){
		this.periodoComboBox =  Ext.create('Csb.sivalcap.periodo.ComboBox', {
			id: 'cbxPeriodoId',
			fieldLabel: 'Periodo*',
			allowBlank: false,
			disabled: true,
			listeners: {
				scope: this,
				select: function(combo, records, object) {
				}
			}
		});
		this.periodoComboBox.loadStore(false);
        Ext.apply(this, {
        		border: false,
                items: [{
					xtype : 'form',
					id : 'formReportCap',
					frame : true,
					items : [{
						xtype : 'fieldset',
						title : 'Opciones para generar reporte de captacion',
						autoHeight : true,
						layout : 'column',
						items : [{ 
							xtype : 'container',
							layout : 'anchor',
							columnWidth: .5,
							border : false,
							items : [{
								xtype : 'radiogroup',
								id : 'rgFileType1',
								columns: 1,
								items : [{
										boxLabel : 'Previo',
										id : 'rbxFileDay1',
										name : 'rbxFileType1',
										inputValue : 1,
										checked : true
								},{
										boxLabel : 'Definitivo Contable',
										id : 'rbxFileEnd1',
										name : 'rbxFileType1',
										inputValue : 2
								},{
									boxLabel : 'Definitivo Producto',
									id : 'rbxDefProd',
									name : 'rbxFileType1',
									inputValue : 3
							},{
								boxLabel : 'Captación vs Balanza',
								id : 'rbxCaptaBal',
								name : 'rbxFileType1',
								inputValue : 4
						}],
								listeners: {
									change: function(field, newValue, oldValue){
							            //var value = Ext.ComponentQuery.query('radiofield[name=rbxFileType1]');
							            //console.log(newValue['rbxFileType1']);
										Ext.getCmp('fechaArchivoRep').setValue(new Date());
										Ext.getCmp('cbxPeriodoId').reset();
							            switch (parseInt(newValue['rbxFileType1'])) {
							                case 1:
							                	Ext.getCmp('fechaArchivoRep').enable();
							                	Ext.getCmp('cbxPeriodoId').disable();
							                    break;
							                case 2:
							                	Ext.getCmp('cbxPeriodoId').enable();
							                	Ext.getCmp('fechaArchivoRep').disable();
							                    break;
							                case 3:
							                	Ext.getCmp('cbxPeriodoId').enable();
							                	Ext.getCmp('fechaArchivoRep').disable();
							                    break;
							                case 4:
							                	Ext.getCmp('cbxPeriodoId').enable();
							                	Ext.getCmp('fechaArchivoRep').disable();
							                    break;
							            }
									}
								}
							}]
						},{
							xtype : 'fieldcontainer',
							columnWidth : .5,
							border : false,
							items : [{
								xtype : 'datefield',
								id :'fechaArchivoRep',
								fieldLabel : 'Fecha Archivo*',
								labelWidth: 100,
								width : 280,
								allowBlank : false,
								maskRe:/[0-9]/,
								format: 'd/m/Y',
								value : new Date(),
								maxValue: new Date(),
								focusCls: 'x-class-onfocus'
							}, this.periodoComboBox]
						}]
					}],
					buttons : [{
		    			text: 'Generar Roperte',
		    			id: 'btnBuildReporte',
		    			iconCls: 'icon-report-xls',
		    			scope: this,
		    			handler: function(){
		    				var fileType = 0;
		    				if (Ext.getCmp('rbxFileDay1').getValue()){
		    					fileType = 1;
		    				}
		    				if (Ext.getCmp('rbxFileEnd1').getValue()) {
		    					fileType = 2;
		    				}
		    				if (Ext.getCmp('rbxDefProd').getValue()){
		    					fileType = 3;
		    				}
		    				if (Ext.getCmp('rbxCaptaBal').getValue()) {
		    					fileType = 4;
		    				}
		    				if (fileType == 1) {
		    					if (!Ext.getCmp('fechaArchivoRep').isValid()) {
								    Ext.MessageBox.show({
										title: 'CSBIntegral',
										msg: 'Seleccione una fecha.',
										icon: Ext.MessageBox.INFO,
										buttons: Ext.MessageBox.OK
									});
								    return;
		    					}
		    				} else {
		    					if (!Ext.getCmp('cbxPeriodoId').isValid()) {
								    Ext.MessageBox.show({
										title: 'CSBIntegral',
										msg: 'Seleccione un periodo.',
										icon: Ext.MessageBox.INFO,
										buttons: Ext.MessageBox.OK
									});
								    return;
		    					}
		    				}
							Ext.MessageBox.show({
								   msg: 'Procesando solicitud, por favor espere...',
								   progressText: 'Procesando...',
								   width:300,
								   wait:true,
								   waitConfig: {interval:200},
								   icon:'message-box-wait'
								});
							CsbCaptacionApp.getReporteCaptacion(fileType, Ext.getCmp('cbxPeriodoId').getValue(), Ext.getCmp('fechaArchivoRep').getValue(), {
								callback: function(success){
									Ext.MessageBox.hide();
									if(success){
										window.open(CSP.utils.constants.URL_BASE_PATH + 'downloadFile.do', "winReport", "width=400,height=180,scrollbars=NO");
									}else{
			    						Ext.MessageBox.show({
			    							title: 'CSBIntegral',
			    							msg: 'No existe informacion para generar reporte.',
			    							icon: Ext.MessageBox.INFO,
			    							buttons: Ext.MessageBox.OK
			    						});
									}
								},
								scope: this,
								async: true
							});
		    			}
			    }]
				}]
        });
		this.callParent(arguments);
	}
});