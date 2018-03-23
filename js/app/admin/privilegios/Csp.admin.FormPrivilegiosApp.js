/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
var _this = this; //Instancia global
Ext.define('Csp.recovery.FormPrivilegiosApp', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formPrivilegiosApp',
	initComponent: function(){
		
		/**
		 * Construye grid de usuarios
		 */
		this.gridUsuariosList = new Csp.admin.GridUsuarios({
            region: 'north',
            collapsible: true,
            title: 'Lista de Usuarios',
			listeners : {
				itemdblclick : function(viewThis, record, htmlElementItem, index, eventObject, objectOOpts) {
					this.winPrivileges = new Csp.admin.WindowPrivilegios({
						title : 'Usuario: ' +record.get('nombre') + ' [' +record.get('idUsuario') + ']',
						modal : true
					});
					this.winPrivileges.setUsuario(record.get('idUsuario'), record.get('nombre'));
					this.winPrivileges.setDataStore(record.get('idUsuario'));
				}
			}
		});
	    
		/**
		 * Construye viewport
		 */
        Ext.apply(this, {
        	border: false,
            items: [this.gridUsuariosList]
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