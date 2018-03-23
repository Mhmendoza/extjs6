/**
 * -------------------------------------------
 * COPYRIGHT (c) 2017 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.namespace('Ext.utils.Generics');
Ext.utils.Generics = function(){
	return {
		typeOf : function(value) {
		    var s = typeof value;
		    if (s === 'object') {
		        if (value) {
		            if (typeof value.length === 'number' &&
		                    !(value.propertyIsEnumerable('length')) &&
		                    typeof value.splice === 'function') {
		                s = 'array';
		            }
		        } else {
		            s = 'null';
		        }
		    }
		    return s;
		},
		
		isEmpty : function(o) {
		    var i, v;
		    if (this.typeOf(o) === 'object') {
		        for (i in o) {
		            v = o[i];
		            if (v !== undefined && this.typeOf(v) !== 'function') {
		                return false;
		            }
		        }
		    }
		    return true;
		},
		
		mapFromData : function(data, map) {
			for (var i = 0; i < map.length; i++) {
				var acc = this.getAccessor(map[i].accessor);
				var fieldValue = acc(data);
				if (fieldValue) {
					map[i].data = fieldValue;
				} 
			}
		},
		
		getAccessor : function(){
		    var re = /[\[\.]/;
		    return function(expr){
		        try {
		            return (re.test(expr)) ? new Function('obj', 'return obj.' + expr) : function(obj){
		                return obj[expr];
		            };
		        } 
		        catch (e) {
		       	}
		        return Ext.emptyFn;
		    };
		}()
	};
}();

Ext.namespace('CSBIntegral.App');
CSBIntegral.App = function(){
	return {
	title: function(){
		return "CSBIntegral";
	}
};
}();

/**
 * @class CSP.utils.app
 * Funciones reusables para la aplicación 
 * @singleton
 */
Ext.namespace('CSP.utils.app');
CSP.utils.app = function(){
	return {
		//private
		handleError : function(message, ex) {
			//TODO Refinar código si desea presentar un mensaje más completo
			//alert(Ext.encode(ex));
			//var stackTrace = ''; //unescape(ex.stack.replace('/\r/\n','<br>'));
			//var folio = ex.folio ? ex.folio : 'Desconocido';
			Ext.MessageBox.show({
				title:'CSBIntegral',
				msg: 'Ha ocurrido un error inesperado.<br> Por favor reportarlo con el administrador de sistemas.<br> Detalle del error:<br> ' + message,
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});			
		},
        //private
		getCurrentPath : function() {
			var currentLocation = "" + window.location;
			currentLocation = currentLocation.substring(0, currentLocation.lastIndexOf('/') + 1);
			return currentLocation;
		},

        /**
         * Carga el contexto inicial de Ext, las librerías, los módulos de DWR que usará la pantalla
         * y el JavaScript inicial.
         * @param {Object} config El objeto de configuración para la carga del contexto, las opciones disponibles son:
         * <ul>
         * <li><b>interfacesDWR</b> : String[]<div class="sub-desc">Arreglo con los nombre de los módulo de DWR que serán
         * cargados para la página.</div></li>
         * <li><b>libraries</b> : String[]<div class="sub-desc">Arreglo con los nombre de las librerias que serán
         * cargadas para la página.</div></li>
         * </ul>
         * Ejemplo de uso:
         * <pre><code>
			CSP.utils.app.loadLocalEnvironment({
				interfacesDWR: ['ModuleDWR1','ModuleDWR2',...],
				libraries:['library1','library2',...]
			});
		</code></pre>
         */
		buildAjaxDWR : function(config) {
			var _config = config || {};
			
			//Para la carga de modulos de DWR
			if (_config.interfacesDWR) {
				for (var i = 0; i < _config.interfacesDWR.length; i++) {
					//var loader = new CSP.dwr.Loader();
					this.loadModule(_config.interfacesDWR[i]);
				} 
            }
			
			//Para la carga de librerias genericas del CSP (JS)
			if (_config.libraries) {
				for (var i = 0; i < _config.libraries.length; i++) {
					//var loader = new CSP.dwr.Loader();
					this.loadLibrary(_config.libraries[i]);
				} 
            }			

			/* Manejo de Errores en DWR */
			dwr.engine.setErrorHandler(CSP.utils.app.handleError);
			/* Manejo de Session en DWR */
			dwr.engine.setTextHtmlHandler(function() {
				Ext.MessageBox.show({
					title:'CSP CSBIntegral System',
					msg: 'Tu sesión con el sevidor ha expirado, es necesario firmarse nuevamente al sistema.',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING,
					fn: function() {
						//document.execCommand("ClearAuthenticationCache");
						//document.location = CSP.utils.constants.URL_BASE_PATH;
						//window.location = CSP.utils.constants.LOGOUT_PATH;
						//top.location.href = CSP.utils.constants.URL_BASE_PATH;
						parent.document.location = CSP.utils.constants.URL_BASE_PATH;
					}
				});			
			});
			
			/* Timeout generico en DWR, por revisar */
			//dwr.engine.setTimeout(20000);
			/* Los pre y post hooks en la invocacion de los DWR's */
			dwr.engine.setPreHook(Ext.utils.Generics.dwrPreHook);
			dwr.engine.setPostHook(Ext.utils.Generics.dwrPostHook);		

		},
		
        /**
         * Realiza el render de un reporte, el reporte será mostrado en una ventana modal dentro del mismo contexto
         * donde fue invocado.
         * @param {Object} config El objeto de configuración, las opciones disponibles son:
         * <ul>
         * <li><b>title</b> : String<div class="sub-desc">Titulo de la ventana del reporte</div></li>
         * <li><b>report</b> : String<div class="sub-desc">URL del reporte a mostrar</div></li>
         * <li><b>params</b> : Object<div class="sub-desc">Un objeto que representa los parametros a ser enviados 
         * al reporte, de la forma "params:{param1:valor1, param2:valor2, ...}".</div></li>
         * </ul>
         */		
		renderReport : function(config) {
			if (!config || !config.report) {
				alert('No se han establecido los parámetros para la ejecución del reporte');
				return;
			}
			config.title = config.title || 'Vista Previa del Reporte';
			var urlReport = config.report;
			var urlReportParams = '';
			
	        var bp = config.baseParams;
	        var p = config.params;
	        if(p){
	            if(typeof p == "object"){
	                urlReportParams = Ext.urlEncode(Ext.applyIf(p, bp));
	            }else if(typeof p == 'string' && bp){
	                urlReportParams += '&' + Ext.urlEncode(bp);
	            }
	        } else if(bp){
	            urlReportParams = Ext.urlEncode(bp);
	        }
	        
			if (urlReportParams.length > 0) { //has params to add to the url
				if (urlReport.indexOf('?') == -1) { //has no previous params
					urlReport = urlReport + '?' + urlReportParams;
				} else { //has previous params use &
					urlReport = urlReport + '&' + urlReportParams;
				}
			}

			Ext.panel.iframePanel;
			var frameReport = Ext.widget('iframePanel', {
				width: 800,
				height: 480,
				layout: 'fit',
				src: urlReport,
				doSomething: function() {
					console.log(arguments);
				} 
			});			
			
	        var winReport = new Ext.Window({
	        	iconCls: 'icon-report-pdf',
	            title: config.title,
	            closable: true,
	            width: 800,
	            height: 550,
	            modal: true,
	            plain: true,
	            layout: 'fit',
	            maximizable: true,
	            items : [frameReport],
		        buttons: [{
		        	handler: function(){
						winReport.close();
		        	},
		        	scope: this,
		            text: 'Cerrar',
					cls: 'x-btn-text-icon',
					iconCls: 'icon-delete',
					tooltip: 'Cerrar Ventana'
		        }]          
	        });	        
			winReport.on('close', function(){config.closeFn?Ext.decode(config.closeFn):Ext.emptyFn}, this);			
	        winReport.show();	
		},
		
		/**
		 * Muestra un {@link Ext.MessageBox} con el mensaje dentro de las opciones de llamada
		 * @param {Object} config El objeto de configuración, las opciones disponibles son:
         * <ul>
         * <li><b>messages</b> : String/String[]<div class="sub-desc">Los mensaje a mostrar, puede ser un arreglo ['mensaje 1', 'mensaje 2', ...]</div></li>
         * <li><b>fn</b> : Function<div class="sub-desc">Función a ser ejecutada cuando se presiones el botón 'OK'</div></li>
         * <li><b>buttons</b> : Object<div class="sub-desc">Botones a mostrar, por defecto {@link Ext.MessageBox#OK}</div></li>
         * <li><b>icon</b> : Object<div class="sub-desc">Icono a mostra, por defecto {@link Ext.MessageBox#INFO} </div></li>
		 */
		renderMessages : function(options) {
			var messages = "";
			var trail = "";
			if (options.messages) { //Build messages string
				// TODO: Ext.isArray esta undefined en este punto!!!!!!
				// if (Ext.isArray(options.messages)){
				var v = options.messages;
				if (v && typeof v.length == 'number' && typeof v.splice == 'function') {
					for (var i = 0; i < options.messages.length; i ++) {
						messages = messages + options.messages[i] + trail;
						trail = "<br>";
					}
				} else {
					messages = options.messages;
				}
			}
			if (messages != "") {
				Ext.MessageBox.show({
					title: options.title ? options.title : 'Mensaje del sistema',
					msg: messages,
					buttons: options.buttons ? options.buttons : Ext.MessageBox.OK,
					icon: options.icon ? options.icon : Ext.MessageBox.INFO,
					fn: options.fn ? options.fn : Ext.emptyFn,
					scope: options.scope
				});
			} else { // No message but send a function, then executes! sending by default ok btn
				if (options.fn) {
					options.fn.apply('ok');
				}
			}
		},
		
		/**
		 * Muestra un {@link Ext.MessageBox} con la leyenda de 'Confirmar la acción.' y los botones de {@link Ext.MessageBox#YESNO}.
		 * @param {Object} config , El objeto de configuración, las opciones disponibles son:
         * <ul>
         * <li><b>message</b> : String<div class="sub-desc">En caso de querer cambiar la leyanda por defecto</div></li>
         * <li><b>fn</b> : Function<div class="sub-desc">Función a ser ejecutada cuando se presiones alguno de los botones</div></li>
         * <li><b>title</b> : Object<div class="sub-desc">El título de la ventana.</div></li>
		 */
		defaultConfirmMessage : function (options) {
			if (!options) options = {};
	        Ext.MessageBox.show({
	            title: options.title ? options.title : 'Mensaje del sistema',
	            msg: options.message ? options.message : 'Confirmar la acción.',
	            buttons: Ext.MessageBox.YESNO,
	            icon: Ext.MessageBox.QUESTION,
				fn: options.fn ? options.fn : Ext.emptyFn,
				scope: options.scope
	        });			
		},
		
		/**
		 * Muestra un {@link Ext.MessageBox} con la leyenda de 'La forma contiene errores, favor de verificar.' 
		 * y los botón de {@link Ext.MessageBox#OK} y el icono de {@link Ext.MessageBox#ERROR}.
		 * @param {Object} config , El objeto de configuración, las opciones disponibles son:
         * <ul>
         * <li><b>message</b> : String<div class="sub-desc">En caso de querer cambiar la leyanda por defecto</div></li>
         * <li><b>title</b> : Object<div class="sub-desc">El título de la ventana.</div></li>
		 */
	      defaultInvalidFormMessage : function (options) {                 
              if (!options) options = {};              
              if (options.form) {
                    Ext.each(options.form.items.items, function(object){
                         if (!object.isValid()) {                                   
                               var p = this.ownerCt;
                               while (true) {
                                     if(p != null && p.constructor.xtype === 'fieldset' && p.ownerCt.constructor.xtype === 'form'){                                                                                            
                                           return false;
                                     } else if (p != null && p.ownerCt.constructor.xtype === 'tabpanel') {                                          
                                           Ext.getCmp(p.ownerCt.id).setActiveTab(p.id);
                                           options.message = 'La forma contiene errores en tab ' +p.title+ ', favor de verificar.';                                             
                                           return false;
                                     } 
                                     p = p.ownerCt;
                               }                                  
                         }                            
                    });
              } 
              Ext.MessageBox.show({
                    title: options.title ? options.title : 'Mensaje del sistema',
                    msg: options.message ? options.message : 'La forma contiene errores, favor de verificar.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
              });
        },

		
		/**
		 * Muestra un {@link Ext.MessageBox} cuando una forma tiene un error ya sea en su carga o el submit 
		 * @param {Object} form La forma que fue cargada o procesada.
		 * @param {Object} action La acción que fue ejecutada (load/submit).
		 */			
        defaultActionFailed: function(form, action){
            CSP.utils.app.renderMessages({
                messages: action.result.messages,
                icon: Ext.MessageBox.ERROR
            });
        },
		
		/**
		 * Muestra un {@link Ext.MessageBox} cuando una forma fue cargada o procesada exitosamente.
		 * @param {Object} form La forma que fue cargada o procesada.
		 * @param {Object} action La acción que fue ejecutada (load/submit).
		 */		
        defaultActionComplete: function(form, action){
            CSP.utils.app.renderMessages({
                messages: action.result.messages,
                icon: Ext.MessageBox.INFO
            });
        },
        
		//private
        loadPage : function(options) {
        	var p = "";
        	var _url = "";
        	if (options.params) {
        		var params = options.params || {}; 
        		p = Ext.urlEncode(params);
        	}
        	
        	if (p !== ""){
        		//if (options.url.indexOf("?"))
        		var conector = "?";
        		_url = options.url + conector + p;
        	} else {
        		_url = options.url;
        	}
        	
        	if (window.hostMIF) {
        		window.hostMIF.setSrc(_url);
        	} else {
        		//document.location.href = _url;
        		parent.document.location.href = _url;
        	}
        },
    	doEval:true,
    	request:null, 
    	loaded:{},
    	continues: false,
        constructor: function (config) {
            this.mixins.observable.constructor.call(this, config);
        },
     	loadModule : function (module) {
    		var dwrModule = CSP.utils.constants.INTERFACES_ROOT + module + '.js';
    		this.load(dwrModule);
    	},
    	loadLibrary : function (library) {
    		var libraryModule = CSP.utils.constants.LIBS_ROOT + library + '.js';
    		this.load(libraryModule);	
    	},
    	loadEngine : function() {
    		var dwrModule = CSP.utils.constants.ENGINE_ROOT + 'engine.js';
    		this.loadjscssfile(dwrModule ,'js');
    	},
    	load:function() {
    		for (var i = 0, len = arguments.length; i < len; i++) {
    			var filename = arguments[i];
    			if (!this.loaded[filename]) {
    				if (!this.request) {
    					if (window.XMLHttpRequest) {
    						this.request = new XMLHttpRequest;
    					} else {
    						if (window.ActiveXObject) {
    							try {
    								this.request = new ActiveXObject("MSXML2.XMLHTTP");
    							}
    							catch (e) {
    								this.request = new ActiveXObject("Microsoft.XMLHTTP");
    							}
    						}
    					}
    				}
    				if (this.request) {
    					this.request.open("GET", filename, false); // synchronous request!
    					this.request.send(null);
    					if (this.request.status == 200) {
    						this.globalEval(this.request.responseText, this.doEval);
    						this.loaded[filename] = true;
    					}
    				}
    			}
    		}
    	},
    	globalEval:function (code, doEval) {
    		if (doEval) {
    			if (window.execScript) {
    				window.execScript(code, 'javascript');
    			} else {
    				//eval(code);
    				var script = document.createElement('script');
    				script.type = 'text/javascript';
    				script.innerHTML = code;
    				document.getElementsByTagName("head")[0].appendChild(script);
    			}
    		}
    	},
    	loadjscssfile : function(filename, filetype) {
    		var fileref = undefined;
    		if (filetype=="js"){ //if filename is a external JavaScript file
    			fileref = document.createElement('script');
    			fileref.setAttribute("type","text/javascript");
    			fileref.setAttribute("src", filename);
    		} else if (filetype=="css"){ //if filename is an external CSS file
    			fileref = document.createElement("link");
    			fileref.setAttribute("rel", "stylesheet");
    			fileref.setAttribute("type", "text/css");
    			fileref.setAttribute("href", filename);
    		}
    		if (typeof fileref!="undefined") {
    			document.getElementsByTagName("head")[0].appendChild(fileref);
    		}
    	},
    	loadjscssfileNoCache : function(filename, filetype) {
    	  var ms = new Date().getTime().toString();
    	  var seed = "?" + ms; 
    	  this.loadjscssfile(filename + seed, filetype);
    	}
	};
}();