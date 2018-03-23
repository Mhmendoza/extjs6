/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define("Csp.admin.GridUsuarios", {
	extend : 'Ext.grid.Panel',
	initComponent: function(){
		var This = this;
	    this.storeUsuarios = Ext.create('Ext.data.Store', {
	        model: 'Csp.admin.ModelMenu',
	        remoteSort: true,
	        pageSize: 50,
	        proxy: {
	            type: 'pagingmemory',
	            data: [],
	            reader: {
	                type: 'array'
	            }
	        }
	    });		
		Ext.apply(this, {
				stripeRows: true,
				monitorResize: true,
				autoscroll : true,
				height : 570,
				width : '100%',
				store: this.storeUsuarios,
				dockedItems: [{
				    xtype: 'toolbar',
				    dock: 'top',
				    items: ['->','-','-', {
				        xtype: 'trigger',
						id: 'nombreUsuario',
						triggerBaseCls :'x-form-trigger',
						triggerCls:'x-form-search-trigger',
				        fieldLabel: 'Nombre de Usuario',
				        emptyText: 'Nombre de Usuario',
				        allowBlank : false,
				        minLength: 3,
						width: 350,
						maskRe: /[a-z,A-Z, ' ']/,
						focusCls: 'x-class-onfocus',
						listeners: {
							scope: this,
							specialkey : function(textField, e) {
								if (e.getKey() === 13) {
									if (textField.isValid()) {
										this.loadStore(null, textField.getValue());
									}
								}
							},
    						change : function(textField) {
    							if (textField.getValue() != '') {
    								var nombre = textField.getValue();
    								textField.setValue(nombre.toUpperCase());
    							}
    						}
						},
						scope: this,
						onTriggerClick: function() {
							if (this.isValid()) {
								This.loadStore(null, this.getValue());
							}
						}
				    }, '-', '-', {
				        xtype: 'trigger',
						id: 'idUsuario',
						triggerBaseCls :'x-form-trigger',
						triggerCls:'x-form-search-trigger',
				        fieldLabel: 'Id Usuario',
				        emptyText: 'Usuario',
				        allowBlank: false,
				        minLength: 3,
				        maxLength: 15,
						width: 220,
						maskRe: /[a-z,A-Z,0-9]/,
						focusCls: 'x-class-onfocus',
						listeners: {
							scope: this,
							specialkey : function(textField, e) {
								if (e.getKey() === 13) {
									if (textField.isValid()) {
										this.loadStore(textField.getValue(), null);
									}
								}
							}
						},
						scope: this,
						onTriggerClick: function() {
							if (this.isValid()) {
								This.loadStore(this.getValue(), null);
							}
						}
				    }, '-', '-']
				}],
				columns: [{
						text: 'Usuario',
						sortable: true,
						dataIndex: 'idUsuario',
						width : 100
					},{
						text: 'Nombre',
						sortable: true,
						dataIndex: 'nombre',
						width : 300
					}],
				bbar: Ext.create('Ext.PagingToolbar', {
					pageSize: 50,
					store: this.storeUsuarios,
					displayInfo: true,
					emptyMsg : 'No existen registros'
				})
        });
		this.callParent(arguments);
	},
	loadStore: function(idUsuario, nombre) {
		this.storeUsuarios.proxy.data = [];
		this.storeUsuarios.load();
		Ext.MessageBox.show({
			   msg: 'Procesando solicitud, por favor espere...',
			   progressText: 'Procesando...',
			   width:300,
			   wait:true,
			   waitConfig: {interval:200},
			   icon:'message-box-wait'
		});
		CspMangerSystemApp.findUsuariosByNombre(idUsuario, nombre, {
			callback: function(data) {
				if (data.success) {
					this.storeUsuarios.proxy.data = data.data;
					this.storeUsuarios.load();
					Ext.MessageBox.hide();
				} else {
					Ext.MessageBox.hide();
				    Ext.MessageBox.show({
						title: 'Recovery',
						msg: data.messages,
						icon: Ext.MessageBox.INFO,
						buttons: Ext.MessageBox.OK,
						animateTarget: 'nombreUsuario'
					});
				}
			},
			scope: this,
			async: false
		});
	}
});