/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define('Csp.admin.ModelMenu', {
    extend: 'Ext.data.Model',
    fields: [
	           {name: 'id',			mapping: 'id'},
	           {name: 'text',		mapping: 'text'},
	           {name: 'expanded',	mapping : 'expanded'},
	           {name: 'children',	mapping: 'children'},
	           {name: 'leaf',		mapping : 'leaf'},
	           {name: 'iconCls',	mapping: 'iconCls'},
	           {name: 'idMenu',		mapping: 'idMenu'},
	           {name: 'activo',		mapping: 'activo'},
	           {name: 'idUsuario',	mapping: 'idUsuario'},
	           {name: 'nombre',		mapping: 'nombre'},
	           {name: 'url',		mapping: 'url'},
	           {name: 'fechaApp',		mapping: 'fechaApp'}	           
	        ] 
});
