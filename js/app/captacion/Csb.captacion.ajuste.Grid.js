/**
 * -------------------------------------------
 * COPYRIGHT (c) 2017 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define("Csb.captacion.ajuste.Grid", {
	extend : 'Ext.grid.Panel',
	alias: 'widget.gridAjusteCap',
	id: 'gridAjusteCap',
	initComponent: function(){
		var _this = this;
	    this.storeConcap = Ext.create('Csb.captacion.ajuste.Store');
	    this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
	    	clicksToEdit: 1,
            listeners: {
               'validateedit': function(editor, e) {
	               	switch(e.colIdx){
	            	case 4:
                        Ext.Msg.confirm('CSBIntegral', 'Realmente desea realizar una ajuste?', function(btn){
                            if (btn === 'yes') {               		
		                		var concentrado = {
		                				concentradoId: e.record.get('concentradoId'),
		                				periodo: "201704",
		                				producto: null,
		                				totalCaptacion: 0,
		                				montoAjuste: e.value
		                		};
		                		_this.setAjusteCaptacion(concentrado);
	                        } else {
	                        	e.record.data[e.field] = e.originalValue;
	                        }
	                		e.record.commit();
                        });	            		
	            		break;
	               	}
                }
              }
	    });
		/*var checkBoxModel = new Ext.selection.CheckboxModel();*/
	    //editor: {xtype: 'numberfield', focusCls: 'x-class-onfocus', allowBlank: false, minValue: 250, maxValue: 1000},
		Ext.apply(this, {
				stripeRows: true,
				//frame : true,
				monitorResize: true,
				autoscroll : true,
				height : 470,
				width : '100%',
				viewConfig : {
					forceFit : true
				},
		        viewConfig: {
		            stripeRows: true
		        },
		        /*plugins: [this.cellEditing],
				configPlugins: {
					registerStore: [{name : 'montoAjuste',	precision : 15, scale : 2, money : true}]
				},
		        plugins: [
		                  Ext.create('Ext.grid.plugin.CellEditing', {
		                      clicksToEdit: 1
		                  })
		              ],*/
				store: Ext.data.StoreManager.lookup('storeAjusteCap'),
				/*selModel: checkBoxModel,*/
				selType: 'cellmodel',
				stateful: true,
				/*tbar : ['-','-',{
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
				},'-','-'],*/
				columns: [
				          {text: 'Periodo',				dataIndex: 'periodo',			width: 150, sortable: false},
		                  {text: 'Cuenta Mayor',		dataIndex: 'cuentaMayor',		width: 150, sortable: false},
		                  {text: 'Descripción',			dataIndex: 'descripcion',		width: 150, sortable: false},
		                  {text: 'Saldo',				dataIndex: 'concentrado',		width: 100, sortable: false, renderer: Ext.util.Format.usMoney, summaryRenderer: Ext.util.Format.usMoney},
		                  {text: 'Interes Diario',		dataIndex: 'interesDiario',		width: 100, sortable: false, renderer: Ext.util.Format.usMoney, summaryRenderer: Ext.util.Format.usMoney},
		                  {text: 'ISR Diario',			dataIndex: 'isrDiario',			width: 150, sortable: false, renderer: Ext.util.Format.usMoney, summaryRenderer: Ext.util.Format.usMoney},
		                  {text: 'Balanza',				dataIndex: 'balanza',			width: 150, sortable: false, renderer: Ext.util.Format.usMoney, summaryRenderer: Ext.util.Format.usMoney},
		                  {text: 'Saldo Interes',		dataIndex: 'interes',			width: 150, sortable: false, renderer: Ext.util.Format.usMoney, summaryRenderer: Ext.util.Format.usMoney},
		                  {text: 'Saldo Total',			dataIndex: 'totalConcentrado',	width: 150, sortable: false, renderer: Ext.util.Format.usMoney, summaryRenderer: Ext.util.Format.usMoney},
		                  {text: 'Balanza Total',		dataIndex: 'totalBalanza',		width: 150, sortable: false, renderer: Ext.util.Format.usMoney, summaryRenderer: Ext.util.Format.usMoney},
		                  {text: 'SaldoT vs BalanzaT',	dataIndex: 'diferencia',		width: 150, sortable: false, renderer: Ext.util.Format.usMoney, summaryRenderer: Ext.util.Format.usMoney}
				          ],
			        bbar: Ext.create('Ext.PagingToolbar', {
			            pageSize: 50,
			            store: Ext.data.StoreManager.lookup('storeAjusteCap'),
			            displayInfo: true,
						emptyMsg: 'No existen registros'
			        })
        });
		this.callParent(arguments);
	},    
	loadStore: function(periodo) {
		this.storeConcap.proxy.data = [];
		this.storeConcap.load();
		Ext.MessageBox.show({
			   msg: 'Procesando solicitud, por favor espere...',
			   progressText: 'Procesando...',
			   width:300,
			   wait:true,
			   waitConfig: {interval:200},
			   icon:'message-box-wait'
		});
	    CsbCaptacionApp.getConcentradoCaptacion(periodo, {
			callback: function(data) {
				this.storeConcap.proxy.data = data;
				this.storeConcap.load();
				Ext.MessageBox.hide();
			},
			scope: this,
			async: false
		});	
	},
	setAjusteCaptacion: function(data){
		this.storeConcap.proxy.data = [];
		this.storeConcap.load();
		Ext.MessageBox.show({
			   msg: 'Procesando solicitud, por favor espere...',
			   progressText: 'Procesando...',
			   width:300,
			   wait:true,
			   waitConfig: {interval:200},
			   icon:'message-box-wait'
		});
		CsbCaptacionApp.updateAjusteCaptacion(data, {
			callback: function(data) {
				Ext.MessageBox.hide();
			    CsbCaptacionApp.getConcentradoCaptacion({
					callback: function(data) {
						this.storeConcap.proxy.data = data;
						this.storeConcap.load();
						Ext.MessageBox.hide();
					},
					scope: this,
					async: false
				});
			},
			scope: this,
			async: false
		});		
	}
});