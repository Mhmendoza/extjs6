/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.namespace("Csp.system.ChildrenMain");
Csp.system.ChildrenMain = function(){
	return {
		dataMain: [],
		idMain: null,
		//userName: null,
		//dateApp: null,
		/**
		 * @Nota Obtiene los el menú de la base de datos
		 * @returns
		 */
		getRecoveryMenu: function() {
			var dataChildrenMain = new Array();
			CspMangerSystemApp.getMenuByIdUsuario(null, {
				callback: function(data) {
					for (var i=0; i<data.length; i++) {
						this.idMain = '_TreeMain' + data[0].idMenu;
						//this.userName = data[0].nombre;
						//this.dateApp = data[0].fechaApp;
						var menu = {
								id: data[i].id,
								text: data[i].text,
								expanded: data[i].expanded,
								children: data[i].children,
								leaf: data[i].leaf,
								idMenu: '_TreeMain' + data[i].idMenu,
								url: data[i].url
						};
						dataChildrenMain.push(menu);
					}
				},
				scope: this,
				async: false
			});
			this.dataMain = dataChildrenMain;
			return dataChildrenMain;
		},
		getUserDetails: function() {
			var dataUser = null;
			CspMangerSystemApp.getUserDetailsByIdUser({
				callback: function(data) {
					dataUser = data;
				},
				scope: this,
				async: false
			});
			return dataUser;
		},
		/**
		 * @Nota Obtiene el menú inicial
		 * @returns menu
		 */
		getInitChildrenMain: function() {
			return this.getChildrenMain(this.idMain);
		},
		/**
		 * @Nota Obtiene los nodos del menú
		 * @param initIdMain Int
		 * @returns menu
		 */
		getChildrenMain: function(initIdMain) {
			var dataChildrenMain = this.dataMain;
			var arrayChildren = new Array();
			for (var i = 0; i < dataChildrenMain.length; i++) {
				if (dataChildrenMain[i].idMenu === initIdMain) {
					var subItemChildrenMain = this.setChildrenMain(dataChildrenMain, dataChildrenMain[i].idMenu);
					if (!dataChildrenMain[i].children) {
						var itemChildrenMain = {
							id: "recoveryMenu"  + dataChildrenMain[i].id,
							text: dataChildrenMain[i].text,
							expanded: dataChildrenMain[i].expanded,
							iconCls: 'icon-tree-menu',
							children: subItemChildrenMain
						};
						arrayChildren.push(itemChildrenMain);
					}
				}
			}
			return arrayChildren;
		},
		/**
		 * @Nota Inserta submenus a cada menu
		 * @param dataChildrenMain
		 * @param dataChildrenMain menu, idMenu Int
		 * @returns submenu
		 */
		setChildrenMain: function(dataChildrenMain, idMenu) {
			var subItemChildren = new Array();
			for (var m = 0; m < dataChildrenMain.length; m++) {
				if ((dataChildrenMain[m].children) && (dataChildrenMain[m].idMenu === idMenu)) {
					var itemChildren = {
						id: "recoveryMenu" + dataChildrenMain[m].id,
						text: dataChildrenMain[m].text,
						leaf: true,
						iconCls: 'icon-tree-submenu',
						url: dataChildrenMain[m].url
						
					};
					subItemChildren.push(itemChildren);
				}
			}
			return subItemChildren;
		},
		/**
		 * @Nota Obtiene el menú principal de botones
		 * @param dataChildrenMain menu
		 * @returns buttonMenu
		 */
		getButtonsMain: function(dataChildrenMain) {
			var itemsButtonsMain = new Array();
			for (var i = 0; i < dataChildrenMain.length; i++) {
				if (!dataChildrenMain[i].children) {
					var itemButtonMain = {
						xtype: 'button',
						id: '_TreeMain' + dataChildrenMain[i].id,
						itemId: "btnRecoveryMenu"  + dataChildrenMain[i].id, 
						text: dataChildrenMain[i].text,
						width: '100%',
						cls: 'x-btn-text-icon',
						iconCls: 'icon-button-menu',
						tooltip: dataChildrenMain[i].text,
						scope: this,
						listeners: {
							click: function(thisButton, event, object) {
								_this.treePanelMain.loadStore(thisButton.getId());
							}
						}
					};
					itemsButtonsMain.push(itemButtonMain);
				}
			}
			return itemsButtonsMain;
		},
		getDateApp: function() {
			return this.dateApp;
		},
		getUserName: function() {
			return this.userName;
		},
		/**
		 * @author mhernández
		 * @returns userDetails
		 */
		validAuthentication: function() {
			var dataUser = null;
			CspMangerSystemApp.getUserDetailsByIdUser({
				callback: function(data) {
					dataUser = data;
				},
				scope: this,
				async: false
			});
			return dataUser;
		}
	};
}();