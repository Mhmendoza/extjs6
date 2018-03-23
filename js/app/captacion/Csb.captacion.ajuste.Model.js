/**
 * -------------------------------------------
 * COPYRIGHT (c) 2017 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.define('Csb.captacion.ajuste.Model', {
    extend: 'Ext.data.Model',
    fields: [
	           {name: 'periodo',			mapping: 'periodo'},
	           {name: 'cuentaMayor',		mapping: 'cuentaMayor'},
	           {name: 'descripcion',		mapping : 'descripcion'},
	           {name: 'concentrado',		mapping: 'concentrado'},
	           {name: 'interesDiario',		mapping: 'interesDiario'},
	           {name: 'isrDiario',			mapping: 'isrDiario'},
	           {name: 'balanza',			mapping : 'balanza'},
	           {name: 'interes',			mapping: 'interes'},
	           {name: 'totalConcentrado',	mapping: 'totalConcentrado'},
	           {name: 'totalBalanza',		mapping: 'totalBalanza'},
	           {name: 'diferencia',			mapping: 'diferencia'}
	        ] 
});
