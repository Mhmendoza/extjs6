/**
 * -------------------------------------------
 * COPYRIGHT (c) 2017 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
var _this = this; //Instancia global
Ext.define('Csp.recovery.FormMenuApp', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formMenuApp',
	initComponent: function(){

		/**
		 * Construye menú principal
		 */
		this.gridMenuPricipal = new Csp.admin.GridMenu({
			id : 'gridMenuPricipal',
			region: 'center',
            collapsible: true,
            title: 'Lista de Clientes'
		});

		/**
		 * Construye formulario aplicativo
		 */
        Ext.apply(this, {
        		border: false,
                items: [{
                        region: 'north',
                        collapsible: true,
                        split: true,
                        height: 165,
                        title: 'Menú Principal',
                        items: [{
        					xtype : 'form',
        					id : 'formMenuPrincipal',
        					frame : true,
        					items : [{
        						xtype : 'fieldset',
        						title : 'Agregar Men&uacute',
        						autoHeight : true,
        						layout : 'column',
        						items : [{ 
        							xtype : 'container',
        							layout : 'anchor',
        							columnWidth: .3,
        							border : false,
        							items : [{
        								xtype : 'radiogroup',
        								id : 'rgMenuPrincipal',
        								columns: 1,
        								items : [{
        										boxLabel : 'Nuevo Men&uacute',
        										id : 'rbxMenuPrincipal',
        										name : 'rbxMenu',
        										inputValue : 1,
        										checked : true
        								},{
        										boxLabel : 'Nuevo Submenu',
        										id : 'rbxSubmenu',
        										name : 'rbxMenu',
        										inputValue : 2
        								}]
        							}]
        						},{
        							xtype : 'fieldcontainer',
        							columnWidth : .7,
        							border : false,
        							items : [{
        								xtype : 'textfield',
        								fieldLabel : 'Descripci&oacuten',
        								width : 350,
        								id : 'descripcionMenu',
        								maskRe:/[a-z,A-Z, ' ',á,é,í,ó,ú,Á,É,Í,Ó,Ú]/,
        								allowBlank : false,
        								focusCls: 'x-class-onfocus'
        							},{
        								xtype : 'textfield',
        								fieldLabel : 'Direcci&oacuten URL',
        								width : 350,
        								id : 'srcUrl',
        								allowBlank : false,
        								focusCls: 'x-class-onfocus'
        							}]
        						}]
        					}],
        					buttons : [{
        								text : 'Agregar',
        								id : 'btnAgregar',
        								width : 120,
        								cls: 'x-btn-text-icon',
        								iconCls: 'icon-user-save',
        								handler : function() {
        									this.saveMenuPrincipal();
        								},
        								scope : this
        							}]
        				}]
                    }, this.gridMenuPricipal]
        });
		this.callParent(arguments);
	},
	saveMenuPrincipal: function() {
		var isMenu = Ext.getCmp('rbxMenuPrincipal').getValue();
		var message = '';
		var idMenu = null;		
		if (isMenu) {
			message = 'men&uacute';
		} else {
			message = 'submenu';
			var records = Ext.getCmp('gridMenuPricipal').getSelectionModel().getSelection();
			if (Ext.getCmp('gridMenuPricipal').getSelectionModel().getCount() != 1
				|| records[0].get('children')) {
					Ext.MessageBox.show({
						title: 'Recovery',
						msg: 'Seleccione un men&uacute correctamente.',
						icon: Ext.MessageBox.ERROR,
						buttons: Ext.MessageBox.OK
					});			
				return false;
			}
			idMenu = records[0].get('idMenu');
		}
		if (!Ext.getCmp('formMenuPrincipal').getForm().isValid()) {
			Ext.MessageBox.show({
				title: 'Recovery',
				msg: 'Teclee la descripci&oacuten del ' + message + '.',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});
			return;
		}		
		var menuVO = {
			text : Ext.getCmp('descripcionMenu').getValue(),
			expanded : isMenu ? true : false,
			children : isMenu ? false : true,
			leaf : isMenu ? false : true,
			idMenu : idMenu,
			activo : false,
			url: Ext.getCmp('srcUrl').getValue()
		};		
		Ext.MessageBox.show({
			   title:'Recovery',
			   msg: 'Se agregara un nuevo ' + message + '. ¿Desea continuar?',
			   icon: Ext.MessageBox.QUESTION,
			   buttons: Ext.MessageBox.YESNO,
			   scope: this,
			   fn: function (btn){
					if (btn === 'yes') {
						this.gridMenuPricipal.saveNuevoMenu(menuVO);
					}
			   }
		 });
	}
});