/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define("Csp.admin.WindowUsuarios", {
	extend : 'Ext.window.Window',
	initComponent: function(){
		this.gridUsuariosList = new Csp.admin.GridUsuarios({
			listeners : {
				itemdblclick : function(viewThis, record, htmlElementItem, index, eventObject, objectOOpts) {
					Ext.getCmp('windowUsuarios').hide();
					this.winPrivileges = new Csp.admin.WindowPrivilegios({
						title : 'Usuario: ' +record.get('nombre') + ' [' +record.get('idUsuario') + ']',
						modal : true
					});
					this.winPrivileges.setUsuario(record.get('idUsuario'), record.get('nombre'));
					this.winPrivileges.setDataStore(record.get('idUsuario'));
				}
			}
		});
        Ext.apply(this, {
			id : 'windowUsuarios',
			title : 'Lista de Usuarios',
			height : 440,
			width : 700,
			autoShow : true,
			bodyPadding : 5,
			resizable : false,
			draggable : false,
			closeble : false,
			items : [{
					xtype : 'form',
					id : 'formUsuarios',
					frame : true,
					border : false,
					items : [{
								xtype : 'fieldset',
								title : 'Par&aacutementro de B&uacutesqueda',
								autoHeight : true,
								layout: 'column',
								items : [{
									xtype : 'fieldcontainer',
									columnWidth : .6,
									border : false,
									items : [{
										xtype : 'textfield',
										fieldLabel : 'Nombre Usuario',
										width : 350,
										id : 'nombreUsuario',
										allowBlank : false,
										maskRe:/[a-z,A-Z, ' ']/,
										validationEvent : true,
										focusCls: 'x-class-onfocus',
			        					listeners : {
			        						scope: this,
			        						change : function(textField) {
			        							if (textField.getValue() != '') {
			        								var nombre = textField.getValue();
			        								textField.setValue(nombre.toUpperCase());
			        							}
			        						},
			        						specialkey : function(textField, e){
			        							if ((e.getKey() === 9) || (e.getKey() === 13)) {
			        								if (textField.getValue() != '') {
			        									this.findUsuariosByNombre();
			        								}
			        							}
			        						}
			        					}
									}]
								},{ 
									columnWidth: .4,
									border : false,
									buttons : [{
										text : 'Buscar',
										id : 'btnBuscarUsuarios',
										width : 120,
										align: 'rigth',
										cls: 'x-btn-text-icon',
										iconCls: 'icon_user-find',
										tooltip:'Buscar Usuarios',
										scope : this,
										handler :function(){
											this.findUsuariosByNombre();
										}
									}]
								}]
							}]
					},{
						xtype : 'form',
						border : false,
						items : [this.gridUsuariosList]
					}],
		   buttons : [{
				text :'Cerrar',
				cls: 'x-btn-text-icon',
				iconCls: 'icon-delete',
				tooltip: 'Cerrar Ventana',
				handler :function(){
					Ext.getCmp('windowUsuarios').close();
				},
				scope : this
			}],
			renderTo: Ext.getBody()
        });
		this.callParent(arguments);
	},
	findUsuariosByNombre : function() {
		if (!Ext.getCmp('formUsuarios').getForm().isValid()) {
			Ext.MessageBox.show({
				title: 'Recovery',
				msg: 'Teclee nombre de usuario.',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});
			return;
		}
		this.gridUsuariosList.loadStore(Ext.getCmp('nombreUsuario').getValue());
	}
});