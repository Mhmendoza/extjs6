/*
 * -------------------------------------------
 * COPYRIGHT (c) 2011 CONSUPAGO S.A. DE C.V.
 * -------------------------------------------
 * @author Ing. Manuel Hernández Mendoza 
 */
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    var formPanel = Ext.widget('form', {
    	region: 'south',
        renderTo: Ext.getBody(),
        frame: true,
        bodyPadding: 10,
        bodyBorder: true,
        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            invalidCls: ''
        },
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) {
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },
        items: [{
            xtype: 'textfield',
            id: 'j_username',
            name: 'j_username',
            focusCls: 'x-class-onfocus',
            fieldLabel: '<b>Usuario</b>',
            allowBlank: false,
            minLength: 3,
            maxLength: 15,
			width: 150,
			listeners: {
				scope: this,
				specialkey : function(textField, e){
					if (e.getKey() === 13) {
						if (textField.getValue() != '') {
							onLogin();
						}
					}
				}
			}
        }, {
            xtype: 'textfield',
            id : 'j_password',
            name: 'j_password',
            focusCls: 'x-class-onfocus',
            fieldLabel: '<b>Password</b>',
            inputType: 'password',
            style: 'margin-top:15px',
            allowBlank: false,
            minLength: 3,
            maxLength: 35,
			midth : 150,
			listeners: {
				scope: this,
				specialkey : function(textField, e){
					if (e.getKey() === 13) {
						if (textField.getValue() != '') {
							onLogin();
						}
					}
				}
			}
        }],

        dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '25 25 15',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Campos validos',
                invalidText: 'Campos invalidos',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for="."><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Errores:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, {
                xtype: 'button',
                formBind: true,
                disabled: true,
                text: 'Accesar',
                width: 140,
				cls:'x-btn-text-icon',
				iconCls : 'icon-accept',
				tooltip : 'Accesar',
				scope: this,
                handler: function() {
                	onLogin();
                }
            }]
        }]
    });

    function onLogin() {
		if (Ext.getCmp('j_username').getValue() === '') {
		    Ext.MessageBox.show({
				title: 'CSBIntegral',
				msg: 'Usuario requerido.',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});
		    Ext.getCmp('j_username').focus();
		    return;
		}
		if (Ext.getCmp('j_password').getValue() === '') {
		    Ext.MessageBox.show({
				title: 'CSBIntegral',
				msg: 'Password requerido.',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});
		    Ext.getCmp('j_password').focus();
		    return;
		}    	
		Ext.MessageBox.show({
		   msg: 'Validando usuario, por favor espere...',
		   progressText: 'Procesando...',
		   width:300,
		   wait:true,
		   waitConfig: {interval:200},
		   icon:'message-box-wait'
		});
        formPanel.submit({
        	method:'POST',
            clientValidation: true,
            url: 'j_spring_security_check',
            success: function(form, action) {
        		Ext.MessageBox.hide();
        		winLogin.destroy();
        		window.location = CSP.utils.constants.CONTEXT_PATH;//'csp.do';
            },
            failure: function(form, action) {
                Ext.MessageBox.hide();
                var response = action.response.responseText;
                var errorMessage = "";
                if (typeof response === 'undefined') {
                	errorMessage = "Servidor Temporalmente Fuera de Servicio. ";
                } else if (response.lastIndexOf('Bad credentials') != -1) { 
                	errorMessage = "Usuario o Password Erroneo, Por Favor vuelva a intentarlo o ";
                } else if (response.lastIndexOf('null') != -1) {
                	errorMessage = "Credencial de Usuario Inexistente, Por Favor vuelva a intentarlo o ";
                } else {
                	errorMessage = "Servidor Fuera de Servicio. ";
                }
    			Ext.MessageBox.show({
    				title: 'CSBIntegral',
    				msg: '<b>ERROR AL INTETER AUTENTICAR CREDENCIAL: </b><br>' + errorMessage + '<br>Consulte al Administrador de Sistemas, Gracias.',
    				icon: Ext.MessageBox.ERROR,
    				buttons: Ext.MessageBox.OK
    			});                			
            }
        });
    }

	var	formLogo = Ext.create('Ext.panel.Panel', {
		id: 'formLogo',
		frame: true,
		height: 40,
		region: 'center',
		border: false,
		html: '<img src="images/csbsivalcap.png" border="0" width="100%" height="100%"  style="margin-right:1px; margin-top:1px" align="center"/>'
	});			
		
    var winLogin = Ext.create('Ext.window.Window', {
    	id : 'winLogin',
    	iconCls: 'icon-dataform',
    	title: 'LOGIN',
        width: 350,
        height: 240,
        minWidth: 350,
        minHeight: 200,
        layout: 'anchor',
        closable : false,
        modal : false,
        draggable : true,
        resizable : false,
        autoShow : true,
        items: [formLogo, formPanel]
    });
    Ext.getCmp('j_username').focus();
    CSBIntegral.app.Application.removeLoader();
});