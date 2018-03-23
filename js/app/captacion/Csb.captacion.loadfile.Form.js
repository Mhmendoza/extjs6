/**
 * ----------------------------------------------------
 * COPYRIGHT (c) 2017 CONSUBANCO S.A. BANCA MULTIPLE
 * ---------------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
_this = this;
Ext.define('Csb.captacion.loadfile.Form', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formLoadFileCap',
	initComponent: function(){
		this.periodoComboBox2 =  Ext.create('Csb.sivalcap.periodo.ComboBox', {
			id: 'cbxPeriodoId2',
			fieldLabel: 'Periodo*',
			allowBlank: false,
			disabled: true,
			listeners: {
				scope: this,
				select: function(combo, records, object) {
				}
			}
		});
		this.periodoComboBox2.loadStore(true);
		var store = this.periodoComboBox2.getStore();
		var periodo = store.getAt(0).get('id');
		var mes = periodo.substring(4, 6);
		var anio = periodo.substring(0, 4);
		var fechaMax = new Date(anio, mes, 0);
		var fechaMin = new Date(fechaMax.getFullYear(), fechaMax.getMonth(), 1);
        Ext.apply(this, {
        		border: false,
                items: [{
					xtype: 'form',
					id: 'formLoadFileCap',
					frame: true,
					items: [{
						xtype: 'fieldset',
						title: 'Opciones para cargar archivos de captacion',
						autoHeight : true,
						layout: 'column',
						items: [{ 
							xtype: 'container',
							layout: 'anchor',
							columnWidth: .5,
							border: false,
							items: [{
								xtype: 'radiogroup',
								id: 'rgFileType0',
								columns: 1,
								items: [{
										boxLabel: 'Archivo Previo',
										id: 'rbxFileDay0',
										name: 'rbxFileType0',
										inputValue: 1,
										checked: true
								},{
										boxLabel: 'Archivo Definitivo',
										id: 'rbxFileEnd0',
										name: 'rbxFileType0',
										inputValue: 2
								},{
									boxLabel: 'Balanza',
									id: 'rbxBalanza0',
									name: 'rbxFileType0',
									inputValue: 3
							},{
								boxLabel: 'Ocimn',
								id: 'rbxOcimn0',
								name: 'rbxFileType0',
								inputValue: 4
						}],
							listeners: {
								change: function(field, newValue, oldValue){
						            //var value = Ext.ComponentQuery.query('radiofield[name=rbxFileType0]');
						            //console.log(newValue['rbxFileType0']);
									Ext.getCmp('fechaArchivo').setValue(fechaMin);
									Ext.getCmp('cbxPeriodoId2').reset();
						            switch (parseInt(newValue['rbxFileType0'])) {
						                case 1:
						                	Ext.getCmp('fechaArchivo').enable();
						                	Ext.getCmp('cbxPeriodoId2').disable();
						                	break;
						                case 2:
						                	Ext.getCmp('fechaArchivo').setValue(fechaMax);
						                	Ext.getCmp('fechaArchivo').disable();
						                	Ext.getCmp('cbxPeriodoId2').disable();
						                    break;
						                case 3:
						                	Ext.getCmp('fechaArchivo').disable();
						                	Ext.getCmp('cbxPeriodoId2').enable();
						                    break;
						                case 4:
						                	Ext.getCmp('fechaArchivo').setValue(fechaMax);
						                	Ext.getCmp('fechaArchivo').disable();
						                	Ext.getCmp('cbxPeriodoId2').disable();
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
								id :'fechaArchivo',
								fieldLabel : 'Fecha Archivo*',
								labelWidth: 100,
								width : 280,
								allowBlank : false,
								maskRe:/[0-9]/,
								format: 'd/m/Y',
								value : fechaMin,
								minValue: fechaMin,
								maxValue: fechaMax,
								focusCls: 'x-class-onfocus'
							}, this.periodoComboBox2]
						}]
					}],
					buttons: [{
		    			text: 'Cargar Archivo',
		    			id: 'btnLoadFile',
		    			iconCls: 'icon-folder',
		    			scope: this,
		    			handler: function(){
		    				_this = this;
		    				var fileType = 0;
		    				if (Ext.getCmp('rbxFileDay0').getValue()){
		    					fileType = 1;
		    				}
		    				if (Ext.getCmp('rbxFileEnd0').getValue()) {
		    					fileType = 2;
		    				}
		    				if (Ext.getCmp('rbxBalanza0').getValue()) {
		    					fileType = 3;
		    				}
		    				if (Ext.getCmp('rbxOcimn0').getValue()) {
		    					fileType = 4;
		    				}
		    				if (fileType == 3) {
		    					if (!Ext.getCmp('cbxPeriodoId2').isValid()) {
								    Ext.MessageBox.show({
										title: 'CSBIntegral',
										msg: 'Seleccione un periodo.',
										icon: Ext.MessageBox.INFO,
										buttons: Ext.MessageBox.OK
									});
								    return;
		    					}
		    				} else {
		    					if (!Ext.getCmp('fechaArchivo').isValid()) {
								    Ext.MessageBox.show({
										title: 'CSBIntegral',
										msg: 'Seleccione una fecha.',
										icon: Ext.MessageBox.INFO,
										buttons: Ext.MessageBox.OK
									});
								    return;
		    					}
		    				}
	    					if (!Ext.getCmp('fechaArchivo').isValid()) {
							    Ext.MessageBox.show({
									title: 'CSBIntegral',
									msg: 'Seleccione una fecha.',
									icon: Ext.MessageBox.INFO,
									buttons: Ext.MessageBox.OK
								});
	    					}
		    				Ext.create('Ext.window.Window', {
		    					id: 'windowUpladFile',
		    					iconCls: 'icon-attach',
		    				    title: 'Explorador de Archivos',
		    					resizable: false,
		    					draggable: false,
		    					closeble: false,
		    					modal: true,
		    					autoShow: true,
		    				    height: 160,
		    				    width: 680,
		    				    layout: 'fit',
		    					fileList: [],
		    					allowedFormats: ["TXT","txt", "CSV", "csv"],
		    				    items: [{
		    						xtype: 'form',
		    						id: 'formUploadFile',
		    						frame: true,
		    						border: false,
		    						 width: 680,
		    						items: [{
		    				            xtype: 'filefield',
		    				            name: 'file',
		    				            id: 'file',
		    				            fieldLabel: 'Archivo Txt',
		    				            labelWidth: 80,
		    				            msgTarget: 'side',
		    				            allowBlank: false,
		    				            anchor: '100%',
		    				            buttonText: 'Seleccionar Archivo...',
		    							iconCls: 'icon-folder',
		    							listeners: {
		    								scope: this,
		    		                        'change': function(fileField, fieldValue, fileObject){
		    		                        	if (!_this.isAllowedFormat(fieldValue)) {
		    		                    			Ext.Msg.alert('CSBIntegral', 'Formato de archivo no valido.');
		    		                    			this.clearFileUpload();
		    		                    		}
		    		                        }
		    		                     }
		    				        }],
		    				        buttons: [{
		    							text :'Procesar Archivo',
		    							cls: 'x-btn-text-icon',
		    							iconCls: 'icon-user-save',
		    							tooltip: 'Procesar Archivo',
		    							scope : this,
		    							handler: function() {
		    						        var form = Ext.getCmp('formUploadFile').getForm();
		    						        if(form.isValid()){
		    									Ext.MessageBox.show({
		    										   msg: 'Procesando solicitud, por favor espere...',
		    										   progressText: 'Procesando...',
		    										   width:300,
		    										   wait:true,
		    										   waitConfig: {interval:200},
		    										   icon:'message-box-wait'
		    									});
		    						            form.submit({
		    						            	method:'POST',
		    						                url: CSP.utils.constants.URL_BASE_PATH + 'upload.do',
		    						                scope: this,
		    						                success: function(form, action) {
		    						                	var responseData = Ext.JSON.decode(action.response.responseText);
		    						                	if (responseData.success) {
		    							    				var fileTypeCap = {
	    							    						tipoArchivo: fileType, 
	    							    						nombreArchivo: responseData.fileName,
	    							    						fechaArchivo: Ext.getCmp('fechaArchivo').getValue(),
	    							    						replaceFile: false,
	    							    						periodo: Ext.getCmp('cbxPeriodoId2').getValue()
		    							    				};	
		    							    				CsbCaptacionApp.loadFileCaptacion(fileTypeCap, {
		    							    					callback: function(data) {
		    							    						if (data.success) {
		    							    							Ext.MessageBox.hide();
			    							    						Ext.MessageBox.show({
			    							    							title: 'CSBIntegral',
			    							    							msg: data.messages,
			    							    							icon: Ext.MessageBox.INFO,
			    							    							buttons: Ext.MessageBox.OK
			    							    						});
			    							    						Ext.getCmp('windowUpladFile').close();
		    							    						} else {
		    							    							var successMessages = new String(data.messages);
		    							    							if (successMessages.indexOf("EXISTE") >= 0) {
			    							    	                        Ext.Msg.confirm(CSBIntegral.App.title(), data.messages, function(btn){
			    							    	                            if (btn === 'yes') {               		
			    				    							    				var fileTypeCap = {
			    				    							    						tipoArchivo: fileType, 
			    				    							    						nombreArchivo: responseData.fileName,
			    				    							    						fechaArchivo: Ext.getCmp('fechaArchivo').getValue(),
			    				    							    						replaceFile: true,
			    				    							    						periodo: Ext.getCmp('cbxPeriodoId2').getValue()
			    					    							    				};
			    							    			                		_this.procesarArchivoCaptacion(fileTypeCap);
			    							    		                        } else {
			    							    		                        	Ext.MessageBox.hide();
			    							    		                        	Ext.getCmp('windowUpladFile').close();
			    							    		                        }
			    							    	                        });
		    							    							} else {
		    							    								Ext.MessageBox.hide();
				    							    						Ext.MessageBox.show({
				    							    							title: 'CSBIntegral',
				    							    							msg: successMessages,
				    							    							icon: Ext.MessageBox.INFO,
				    							    							buttons: Ext.MessageBox.OK
				    							    						});
				    							    						Ext.getCmp('windowUpladFile').close();
		    							    							}
		    							    						}
		    							    					},
		    							    					scope: this,
		    							    					async: false
		    							    				});
		    						                	} else {
		    						                		Ext.MessageBox.hide();
    							    						Ext.MessageBox.show({
    							    							title: 'CSBIntegral',
    							    							msg: responseData.message,
    							    							icon: Ext.MessageBox.INFO,
    							    							buttons: Ext.MessageBox.OK
    							    						});
    							    						Ext.getCmp('windowUpladFile').close();
		    						                	}		                        	
		    						                },
		    						                failure: function(form, action){
		    						                	Ext.MessageBox.hide();
		    						                	var data = Ext.JSON.decode(action.response.responseText);
							    						Ext.MessageBox.show({
							    							title: 'CSBIntegral',
							    							msg: data.message,
							    							icon: Ext.MessageBox.INFO,
							    							buttons: Ext.MessageBox.OK
							    						});
		    						                	Ext.getCmp('windowUpladFile').close();
		    						                }
		    						            });
		    						        }
		    							}
		    						},{
		    							text :'Cerrar',
		    							cls: 'x-btn-text-icon',
		    							iconCls: 'icon-delete',
		    							tooltip: 'Cerrar Ventana',
		    							scope : this,
		    							handler: function(){
		    								Ext.getCmp('windowUpladFile').close();
		    							}
		    						}]
		    				    }]
		    				});
		    			}
					}]
				}]
        });
		this.callParent(arguments);
	},
	procesarArchivoCaptacion: function(fileTypeCap){
		CsbCaptacionApp.loadFileCaptacion(fileTypeCap, {
			callback: function(data) {
		    	Ext.MessageBox.hide();
				Ext.MessageBox.show({
					title: 'CSBIntegral',
					msg: data.messages,
					icon: Ext.MessageBox.INFO,
					buttons: Ext.MessageBox.OK
				});
		    	Ext.getCmp('windowUpladFile').close();
			},
			scope: this,
			async: false
		});
	},
	clearFileUpload: function(){
        fileField = document.getElementById('file');
        parentNod = fileField.parentNode;
        tmpForm = document.createElement("form");
        parentNod.replaceChild(tmpForm,fileField);
        tmpForm.appendChild(fileField);
        tmpForm.reset();
        parentNod.replaceChild(fileField,tmpForm);
    },
	getFileExtension: function(filename){
	    var result = null;
	    var parts = filename.split('.');
	    if (parts.length > 1) {
	      result = parts.pop();
	    }
	    return result;
	 },    
	 isAllowedFormat : function(filename){
	    var result = true;
	    var allowedFormats = this.allowedFormats;
	    if (this.allowedFormats.length > 0) {
	      result = allowedFormats.toString().indexOf(this.getFileExtension(filename)) != -1;
	    }
	    return result;
	 },
	getNombreArchivo: function(){
		return Ext.getCmp('hdnNombreArchivo').getValue();
	}
});
