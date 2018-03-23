/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
_this = this; //Instancia global
Ext.define('Csp.system.ViewportIndex', {
	extend: 'Ext.container.Viewport',
	initComponent: function(){
		Ext.tip.QuickTipManager.init();

		/**
		 * Obtiene datos del menú de la base de datos
		 */
		//var dataUser = Csp.system.ChildrenMain.getUserDetails();
		var dataUser = Csp.system.ChildrenMain.validAuthentication();
		if ((dataUser === null) || (!dataUser.isAuthenticated)) {
			Ext.MessageBox.show({
				title:'CSBIntegral',
				msg: 'Internet Explorer ha expirado tu sesión con el sevidor,<BR> es necesario firmarse nuevamente al sistema.',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING,
				fn: function() {
					document.location = CSP.utils.constants.LOGOUT_PATH;
				}
			});
		}
		var dataChildrenMain = Csp.system.ChildrenMain.getRecoveryMenu();
		var arrayButtonsMain = Csp.system.ChildrenMain.getButtonsMain(dataChildrenMain);		
		//var userName = Csp.system.ChildrenMain.getUserName();
		//var fechaApp = Csp.system.ChildrenMain.getDateApp();

		/**
		 * Construye el menú principal de botones
		 */
		var panelMain = Ext.create('Ext.form.Panel', { 
			id: 'panelMain',
			title: '::', 
			region: 'center',
			layout: 'anchor',
			autoScroll: true,
			loadMask: true,
			defaults: { 
				anchor: '100%'
			},
			items: arrayButtonsMain
		});

		/**
		 * Construye el árbol del menú principal
		 */
		_this.treePanelMain = Ext.create('Csp.system.TreeMain', {			
	        id: 'treePanelMain',
	        title: 'Men&uacute Principal',
	        iconCls: 'icon-button-menu',
	        loadMask: true,
			listeners: {
				scope: this,
				itemclick : function(selModel, record) {
					if (record.get('leaf')) {
						this.addTabManager(record.get('id'), record.get('text'), record.get('url'));
					}
				}
			}		
	    });
		
	    /**
	     * Construye el manejador de tab panel´s
	     */
		this.tabManagerApp = Ext.create('Ext.tab.Panel', {
			id: 'tabManagerApp',
			activeItem: 0,
			border: false,
			height: '100%' //600
		});

		/**
		 * Construye viewport
		 */		
        Ext.apply(this, {
    		id: 'viewPortRecovery',
    		layout: 'border',
    		items: [{
    				xtype: 'container',
    				id: 'app-header',
    				region: 'north',
    				border : false,
    				height: 35,
    				items: [{
    					dockedItems: [{
    					    xtype: 'toolbar',
    					    dock: 'top',
    					    items: [/*{
    					    	xtype: 'label',
    					    	forId: 'lblRecorySystem',
    					    	margins: '0 0 0 5', 
    					    	html: '<img src="images/recovery-web-app.png" border="0" width="100%" height="100%"  style="margin-right:1px; margin-top:1px" align="center"/>'    					    	
    					    },*/'->','-','-', {
    					    	xtype: 'label',
    					    	forId: 'lblNombreUsuarioApp',
    					    	html: '<font color="blue"> ' + dataUser.nombreUsuario + ' </font>'    					    	
    					    },'-','-',{
    					    	xtype: 'label',
    					    	forId: 'lblDateApp',
    					    	html: '<font color="blue"> ' + dataUser.sysDate + ' </font>'    					    	
    					    },'-', '-', {
    							text: 'CERRAR SESION',	
    							cls:'x-btn-text-icon',
    							iconCls : 'icon-logout',
    							tooltip : 'CERRAR SESION', 
    							id: 'btnSalir',
    							handler: function(){
    								Ext.MessageBox.show({
    									   title:'CSBIntegral',
    									   msg: '¿Realmente desea salir del sistema?',
    									   icon: Ext.MessageBox.QUESTION,
    									   buttons: Ext.MessageBox.YESNO,
    									   scope: this,
    									   fn: function (btn){
    											if (btn === 'yes') {
    												exitApplication(true);
    											}
    									   }
    								 });
    							}
    						},'-','-']
    					}]
    				}]
    			},{
    				layout: 'border',
    				id: 'layout-browser',
    				region:'west',
    				border: false,
    				split:true,
    				margins: '2 0 2 5',
    				width: 190,
    				minSize: 100,
    				maxSize: 300,
    				collapsible: true,
    				items: [_this.treePanelMain, panelMain]
    			},{
    				region : 'center',
    				layout: 'anchor',
    				items: [this.tabManagerApp]
    			},{ 
    				region: 'south',
    				margins: '0 0 2 0',
    				border: false
    			}]
        });
		this.callParent(arguments);
		this.loadWorkSpace();
	},

	/**
	 * Carga Tab Panel de Default
	 */
	loadWorkSpace: function() {
		this.tabManagerApp.add({
			xtype: 'uxiframe',
			height: 600,
			id: 'defaultTabPanel',
			title: '::',
      		autoShow: true,
      		autoDestroy: false,
      		border: false,
      		autoRender: true,
      		iconCls: 'icon-tab'/*,
      		src: 'jsp/csbcaptacion/csbcaptaview.jsp'*/
		});	
	},

	/**
	 * Ext.aux.IFrame.Panel.js, Ext.iFrame.Panel.js
	 */
	addTabManager: function(idTabPanel, titleText, srcURL){
		if (Ext.getCmp(idTabPanel) === undefined) {
			var dataUser = Csp.system.ChildrenMain.validAuthentication();
			if ((dataUser != null) && (dataUser.isAuthenticated)) {
				this.tabManagerApp.add({
					xtype: 'uxiframe',
					height: 600,
					id: idTabPanel,
					title: titleText,
	          		closable: true,
	          		autoShow: true,
	          		autoDestroy: false,
	          		border: false,
	          		src: srcURL,
	          		iconCls: 'icon-tab'
				});
				this.tabManagerApp.setActiveTab(idTabPanel);
			} else {
				Ext.MessageBox.show({
					title:'CSBIntegral',
					msg: 'Tu sesión con el sevidor ha expirado, es necesario firmarse nuevamente al sistema.',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING,
					fn: function() {
						//window.document.location.href = CSP.utils.constants.LOGIN_PATH;
						window.location = CSP.utils.constants.LOGOUT_PATH;
					}
				});			
			}
		} else {
			this.tabManagerApp.setActiveTab(idTabPanel);
		}
	}
});

function exitApplication(exit) {	
	if (exit){
		window.location = CSP.utils.constants.LOGOUT_PATH;
	}
}

window.onbeforeunload = function(e){
	window.location = CSP.utils.constants.LOGOUT_PATH;
};