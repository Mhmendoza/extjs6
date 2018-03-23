/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define('Csp.system.TreeMain', {
	extend: 'Ext.tree.Panel',
	getMenu : function(){		
		var arrayChildrenMain = Csp.system.ChildrenMain.getChildrenMain();
		return arrayChildrenMain;
	},
	initComponent: function(){
		var dataMenu = Csp.system.ChildrenMain.getInitChildrenMain();
	    this.storeMain = Ext.create('Ext.data.TreeStore', {
	        model: 'Csp.admin.ModelMenu',
	        autoLoad: true,
	        proxy: {
	        	type: 'memory',
	            data: dataMenu,
	            reader: {
	                type: 'array'
	            }
	        },
	        root: { 
				expanded: true
			}
	    });		
        Ext.apply(this, {
        	autoShow: true,
        	autoSync: true,
			region:'north',
			split: true,
			height: '50%',
			minSize: 150,
			rootVisible: false,
			autoScroll: true,
			store: this.storeMain
        });
		this.callParent(arguments);
	},
	/**
	 * @Nota Carga store del menú al seleccionar un menú principal
	 * @param idMain int
	 */
	loadStore: function(idMain) {
		this.clearTree(_this.treePanelMain);
		var dataMenu = Csp.system.ChildrenMain.getChildrenMain(idMain);
		this.storeMain.proxy.data = dataMenu;
		this.storeMain.load();
	},
	clearTree: function(treePanel) {
        var delNode;
        while (delNode = treePanel.getRootNode().childNodes[0]) {
            treePanel.getRootNode().removeChild(delNode);
        }
    }
});