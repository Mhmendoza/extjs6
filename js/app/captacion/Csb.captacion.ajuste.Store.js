/**
 * -------------------------------------------
 * COPYRIGHT (c) 2017 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define('Csb.captacion.ajuste.Store', {
    extend: 'Ext.data.Store',
    alias: 'widget.storeAjusteCap',
    model: 'Csb.captacion.ajuste.Model',
    storeId: 'storeAjusteCap',
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