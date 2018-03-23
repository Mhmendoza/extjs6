/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define("Csp.admin.GridMenu", {
	extend : 'Ext.grid.Panel',
	initComponent: function(){
	    this.storeMenuPrincipal = Ext.create('Ext.data.Store', {
	        model: 'Csp.admin.ModelMenu',
	        remoteSort: true,
	        pageSize: 20,
	        proxy: {
	            type: 'pagingmemory',
	            data: [],
	            reader: {
	                type: 'array'
	            }
	        }
	    });
	    CspMangerSystemApp.getRecoveryMenu({
			callback: function(data) {
				this.storeMenuPrincipal.proxy.data = data;
				this.storeMenuPrincipal.load();
			},
			scope: this,
			async: false
		});
		var checkBoxModel = new Ext.selection.CheckboxModel();
		Ext.apply(this, {
				stripeRows: true,
				//frame : true,
				monitorResize: true,
				autoscroll : true,
				height : 400,
				width : '100%',
				store: this.storeMenuPrincipal,
				selModel: checkBoxModel,
				stateful: true,
				tbar : ['-','-',{
						text : 'Activar',
						cls: 'x-btn-text-icon',
						iconCls: 'icon-accept',						
						tooltip: 'Activar Menú',
						handler : function() {
							this.updateEstatusMenu(true);
						},
						scope : this
					},'-','-',{
						text : 'Desactivar',
						cls: 'x-btn-text-icon',
						iconCls: 'icon-delete',
						tooltip: 'Desactivar Menú',
						handler : function() {
							this.updateEstatusMenu(false);
						},
						scope : this
				},'-','-'],
				columns: [{
						text: 'Men&uacute Id',
						sortable: true,
						dataIndex: 'id',
						width : 50
					},{
						xtype : 'actioncolumn',
						width : 50,
						items : [{
									tooltip: 'Men&uacute',
									handler: function(grid, rowIndex, colIndex) {
									}
								},{
									getClass: function(v, meta, rec, rowIndex) {
										if (rec.get('children')) {
											this.items[1].tooltip = 'Sub Men&uacute';
											return 'icon-submenu';
										} else {
											this.items[1].tooltip = 'Men&uacute';
											return 'icon-menu';
										}
									}
								}]
					},{
						text: 'Descripci&oacuten del Men&uacute',
						sortable: true,
						dataIndex: 'text',
						width : 200
					},{
						text: 'URL',
						sortable: true,
						dataIndex: 'url',
						width : 250
					},{
						xtype : 'actioncolumn',
						width : 50,
						items : [{
									tooltip: 'Menú',
									handler: function(grid, rowIndex, colIndex) {
									}
								},{
									getClass: function(v, meta, rec, rowIndex) {
										if (rec.get('activo')) {
											this.items[1].tooltip = 'Activo';
											return 'menu-activo';
										} else {
											this.items[1].tooltip = 'Inactivo';
											return 'menu-inactivo';
										}
									},
									handler: function(grid, rowIndex, colIndex) {
									}
								}]
					}],
			        bbar: Ext.create('Ext.PagingToolbar', {
			            pageSize: 20,
			            store: this.storeMenuPrincipal,
			            displayInfo: true,
						emptyMsg: 'No existen registros'
			        })
        });
		this.callParent(arguments);
	},
	saveNuevoMenu: function(data){
		this.storeMenuPrincipal.proxy.data = [];
		this.storeMenuPrincipal.load();
		Ext.MessageBox.show({
			   msg: 'Procesando solicitud, por favor espere...',
			   progressText: 'Procesando...',
			   width:300,
			   wait:true,
			   waitConfig: {interval:200},
			   icon:'message-box-wait'
		});
		CspMangerSystemApp.saveNuevoMenu(data, {
			callback: function(data) {
				Ext.MessageBox.hide();
				if (data.success) {
				    Ext.MessageBox.show({
						title: 'Recovery',
						msg: data.messages,
						icon: Ext.MessageBox.INFO,
						buttons: Ext.MessageBox.OK,
						scope: this,
						fn: function() {
							this.storeMenuPrincipal.proxy.data = data.data;
							this.storeMenuPrincipal.load();
						}						
					});
				} else {
				    Ext.MessageBox.show({
						title: 'Recovery',
						msg: data.messages,
						icon: Ext.MessageBox.INFO,
						buttons: Ext.MessageBox.OK,
						animateTarget: 'btnBuscar'
					});
				}
			},
			scope: this,
			async: false
		});		
	},
	updateEstatusMenu : function(estatus) {
		var menuList = new Array();
		var records = Ext.getCmp('gridMenuPricipal').getSelectionModel().getSelection();
		for (var i = 0; i < records.length; i++) {
			var item = {
					id : records[i].get('id'),
					idMenu : records[i].get('idMenu'),
					text : records[i].get('text'),
					children: records[i].get('children'),
					activo: records[i].get('activo')
			};
			menuList.push(item);
		}		
		if (records.length > 0) {
			if (this.validarEstatusActual(records, estatus)) {
				var message = estatus ? 'ACTIVAR' : 'DESACTIVAR';
				Ext.MessageBox.show({
					   title:'Recovery',
					   msg: '¿Realmente desea ' + message + ' los menus seleccionados.?',
					   icon: Ext.MessageBox.QUESTION,
					   buttons: Ext.MessageBox.YESNO,
					   scope: this,
					   fn: function(btn) {
							if (btn === 'yes') {
								Ext.MessageBox.show({
									   msg: 'Procesando solicitud, por favor espere...',
									   progressText: 'Procesando...',
									   width: 300,
									   wait: true,
									   waitConfig: {interval:200},
									   icon: 'message-box-wait'
								});
								CspMangerSystemApp.updateRecoveryMenu(menuList, estatus, {
									callback: function(data) {
										Ext.MessageBox.hide();
										if (data.success) {
										    Ext.MessageBox.show({
												title: 'Recovery',
												msg: data.messages,
												icon: Ext.MessageBox.INFO,
												buttons: Ext.MessageBox.OK,
												scope: this,
												fn: function() {
													this.storeMenuPrincipal.proxy.data = data.data;
													this.storeMenuPrincipal.load();
												}
											});
										} else {
										    Ext.MessageBox.show({
												title: 'Recovery',
												msg: data.messages,
												icon: Ext.MessageBox.INFO,
												buttons: Ext.MessageBox.OK
											});
										}
									},
									scope: this,
									async: false
								});
							}
					   }
				 });				
			} else {
				Ext.MessageBox.show({
					title: 'Recovery',
					msg: 'Existen menus seleccionados con este ESTATUS.<BR> Los menus seleccionados deben contener ESTATUS de un s&oacutelo tipo.',
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
	validarEstatusActual : function(records, estatus) {
		var success = true;
		for (var i=0; i < records.length; i++) {
			if (records[i].get('activo') === estatus) {
				success = false;
			}
		}
		return success;
	}
});