/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define("Csp.admin.WindowPrivilegios", {
	extend : 'Ext.window.Window',	
	initComponent: function(){
			this.gridPrivilegios = new Csp.admin.GridPrivilegios({
				id : 'gridPrivilegios',
				tbar : ['-','-',{
						id: 'btnActivarAcceso',
						text: 'Activar Acceso',
						cls: 'x-btn-text-icon',
						iconCls: 'icon-accept',
						tooltip: 'Activar Acceso',
						handler : function() {
							this.savePrivilegios(true);
						},
						scope : this
					},'-','-',{
						id: 'btnDesactivarAcceso',
						text : 'Desactivar Acceso',
						cls: 'x-btn-text-icon',
						iconCls: 'icon-delete',
						tooltip: 'Desactivar Acceso',
						handler : function() {
							this.savePrivilegios(false);
						},
						scope : this
				},'-','-']
			});
		    Ext.apply(this, {
			   id : 'winPrivilegios',
			   height : 400,
			   width : 500,
			   autoShow : true,
			   bodyPadding : 5,
			   resizable : false,
			   draggable : false,
			   items : [{
					xtype : 'form',
					border : false,
					items : [this.gridPrivilegios, {
						xtype : 'hidden',
						id : 'hiddenIdUsuario'
					},{
						xtype : 'hidden',
						id : 'hiddenNombreUsuario'
					}]
			   }],
			   buttons: [{
					text :'Cerrar',
					cls: 'x-btn-text-icon',
					iconCls: 'icon-delete',
					tooltip: 'Cerrar Ventana',
					handler: function(){
						Ext.getCmp('winPrivilegios').close();
					},
					scope : this
				}],
				listeners: {
					close: function() {
						//Click en icono de cerrar
					}
				}			
		    });
			this.callParent(arguments);
	},
	setUsuario: function(idUser, nombreUsuario) {
		Ext.getCmp('hiddenIdUsuario').setValue(idUser);
		Ext.getCmp('hiddenNombreUsuario').setValue(nombreUsuario);
	},
	setDataStore: function(idUsuario) {
		this.gridPrivilegios.loadStore(idUsuario);
	},
	loadPrivilegios: function() {
		var store = Ext.getCmp('gridPrivilegios').getStore();
		for (var i = 0; i < store.getCount(); i++) {
			if (store.getAt(i).get('activo')) {
				Ext.getCmp('gridPrivilegios').getSelectionModel().select(i, true);
			}
		}
	},	
	savePrivilegios: function(estatus) {
		var records = Ext.getCmp('gridPrivilegios').getSelectionModel().getSelection();
		if (records.length > 0) {
			if (this.validarEstatusActual(records, estatus)) {
				var privilegiosList = new Array();
				for (var i = 0; i < records.length; i++) {
					var menuVO = {
						id: records[i].get('id'),
						idMenu: records[i].get('idMenu'),
						children : records[i].get('children'),
						idUsuario: Ext.getCmp('hiddenIdUsuario').getValue(),
						activo: estatus
					};
					privilegiosList.push(menuVO);
				}
				var message = estatus ? 'ACTIVARA' : 'DESACTIVARA';
				Ext.MessageBox.show({
					   title:'Recovery',
					   msg: 'Se ' + message + ' el acceso a los menus seleccionados a </BR>' + Ext.getCmp('hiddenNombreUsuario').getValue() + '</BR> ¿Desea continuar?',
					   icon: Ext.MessageBox.QUESTION,
					   buttons: Ext.MessageBox.YESNO,
					   fn: function (btn){
							if (btn === 'yes') {
								Ext.MessageBox.show({
									   msg: 'Procesando solicitud, por favor espere...',
									   progressText: 'Procesando...',
									   width: 300,
									   wait: true,
									   waitConfig: {interval:200},
									   icon: 'message-box-wait'
								});
								CspMangerSystemApp.updatePrivilegiosByIdUsuario(privilegiosList, {
									callback: function(data) {
										Ext.MessageBox.hide();
										if (data.success) {
										    Ext.MessageBox.show({
												title: 'Recovery',
												msg: data.messages,
												icon: Ext.MessageBox.INFO,
												buttons: Ext.MessageBox.OK,
												//animateTarget: estatus ? 'btnActivarAcceso' : 'btnDesactivarAcceso',
												scope: this,
												fn: function() {
													this.gridPrivilegios.loadStore(Ext.getCmp('hiddenIdUsuario').getValue());
												}
											});
										} else {
										    Ext.MessageBox.show({
												title: 'Recovery',
												msg: data.messages,
												icon: Ext.MessageBox.INFO,
												buttons: Ext.MessageBox.OK
												//animateTarget: estatus ? 'btnActivarAcceso' : 'btnDesactivarAcceso'
											});
										}
									},
									scope: this,
									async: false
								});	
							}
					   },
					   scope: this
				 });
			} else {
				Ext.MessageBox.show({
					title: 'Recovery',
					msg: 'Existen menus seleccionados con este ESTATUS.<BR> Los menus seleccionados deben contener ESTATUS de un solo tipo.',
					icon: Ext.MessageBox.ERROR,
					buttons: Ext.MessageBox.OK
				});
			}
		} else {
			Ext.MessageBox.show({
				title: 'Recovery',
				msg: 'No existen menus seleccionados.',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});
		}
	},
	validarEstatusActual: function(records, estatus) {
		var success = true;
		for (var i=0; i < records.length; i++) {
			if (records[i].get('activo') === estatus) {
				success = false;
			}
		}
		return success;
	}
});