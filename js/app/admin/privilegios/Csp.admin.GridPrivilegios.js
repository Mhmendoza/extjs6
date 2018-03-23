/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define("Csp.admin.GridPrivilegios", {
	extend : 'Ext.grid.Panel',
	initComponent: function(){
	    this.storePrivilegios = Ext.create('Ext.data.Store', {
	        model: 'Csp.admin.ModelMenu',
	        remoteSort: true,
	        proxy: {
	            type: 'pagingmemory',
	            data: [],
	            reader: {
	                type: 'array'
	            }
	        },
	    	sorters: [{
	                 property : 'idMenu',
	                 direction: 'ASC'
	        },{
                property : 'id',
                direction: 'ASC'
	        }]
	    });    
	
		var checkBoxModel = new Ext.selection.CheckboxModel();		
		Ext.apply(this, {
				stripeRows: true,
				frame : true,
				monitorResize: true,
				autoscroll : true,
				height : 325,
				width : '100%',
				store: this.storePrivilegios,
				selModel: checkBoxModel,
				stateful: true,			
				columns: [{
						xtype : 'actioncolumn',
						width : 50,
						items : [{
									tooltip: 'Sell stock',
									handler: function(grid, rowIndex, colIndex) {
									}
								},{
									getClass: function(v, meta, rec, rowIndex) {
										if (rec.get('children')) {
											this.items[1].tooltip = 'Menu';
											return 'icon-submenu';
										} else {
											this.items[1].tooltip = 'Submenu';
											return 'icon-menu';
										}
									}
								}]
					},{
						text: 'Descripcion del Menu',
						sortable: true,
						dataIndex: 'text',
						width : 200
					},{
						xtype : 'actioncolumn',
						width : 50,
						items : [{
									tooltip: 'Estatus',
									handler: function(grid, rowIndex, colIndex) {
									}
								},{
									getClass: function(v, meta, rec, rowIndex) {
										if (rec.get('activo')) {
											this.items[1].tooltip = 'Acceso Permitido';
											return 'menu-activo';
										} else {
											this.items[1].tooltip = 'Acceso Negado';
											return 'menu-inactivo';
										}
									},
									handler: function(grid, rowIndex, colIndex) {
									}
								}]
					}]	
        });
		this.callParent(arguments);
	},
	loadStore: function(idUsuario) {
		CspMangerSystemApp.getMenuByIdUsuario(idUsuario, {
			callback : function(data) {
				this.storePrivilegios.proxy.data = data;
				this.storePrivilegios.load();
			},
			scope : this,
			async : false
		});	
	},
    renderEstatus : function(estatus) {
		if (estatus) {
			return '<span style="color:red;">' + estatus + '</span>';
		} else {
			return '<span style="color:green;">' + estatus + '</span>';
		}
        return estatus;
    }
});