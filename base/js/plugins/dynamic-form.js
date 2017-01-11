/*
|@author : Intech Creative Services
|@desc   : Plugin to generate dynamic form.
|@param  : -
*/

$.fn.dynamicForm = function(options){
	var self = $(this);
	var caption;
	var formTag;
	var formCreate;
	var formElement;
	var formButtons;
	var formValidate;
	var editModeFlag;
	var optionalWarningObj  = {};
	var setEmpty = "";
	var defaults = $.extend({
		ajaxUrl 		: 	false,
		datatype		:	'json',
		method 			: 	'POST',
		lightBoxFlag 	: 	false,
		formObject		: 	[],
		formType		: "normal-form",
		callback		: function(){}
	},options);
	var methods = {
		generateForm : function(formData){
			$(self).find("form").remove();
			var params = new Array();
			formCreate  = document.createElement("form");
			$(self).append(formCreate).addClass("element-sec clearfix");
			$(div_scroll_wrapper).appendTo($(self).find("form"));
			
			$.each(formData, function(key, value) {
					if(isSet(formData[key].formTag)){
						formTag 	= formData[key].formTag;
						params = [formTag.name,formData[key]];
						//formTag.name = formTag.name+"-"+$(document).find("form").length;
						formTag.name = formTag.name+"-"+(Math.floor((Math.random() * 100) + 1));
						var errorStatus = misConfigError(params,i18NCall("errormsg.config_error"));
						if(errorStatus ==  true){
							$(formCreate).attr({
								"name" 	   : formTag.name,
								"id"	   : formTag.name,
								"method"   : formTag.method,
								"action"   : formTag.action,
								"class"    : defaults.formType,
								"data-switch-form" : formTag.switchFormUrl
							});
					}
					if(formData[key].formElements.length > 0 ){
						if(isSet(formData[key].formElements)){
							formElement 	= formData[key].formElements;
							var jsonObject = {
									"formElement" 	: formElement,
									"formName"   	: formTag.name,
									"lightBoxFlag"	: defaults.lightBoxFlag
							};
							$(formCreate).append(baseFormElements.generateElements(jsonObject));	
						}
					}	
						
					if(formData[key].formGroups.length > 0 ){
						if(isSet(formData[key].formGroups)){
							formGroups 		= formData[key].formGroups;
							
							var jsonObject = {
									"formGroups" 	: formGroups,
									"formName"   	: formTag.name,
									"lightBoxFlag"	: defaults.lightBoxFlag
							};
							$(formCreate).append(baseFormElements.generateGroups(jsonObject));
						}
						
					}
					
					if(isSet(formData[key].formButtons)){
						baseFormElements.generateButtons(formData[key].formButtons,formTag.name);
					}
					if(isSet(formData[key].caption) && !isEmpty(formData[key].caption)){
						var selfFormId = "#"+$(self).attr("id");
						var jsonObject = {
								"formId" 		: selfFormId,
								"formCaption"   : i18NCall(formData[key].caption),
								"lightBoxFlag"	: defaults.lightBoxFlag
						};
						formCaption 	= baseFormElements.generateCaption(jsonObject);
					}
					if(formData[key].isDependent !=  undefined && formData[key].isDependent == true){
						if(isSet(formData[key].dependencyObj)){
							formDependecies = formData[key].dependencyObj;
							baseFunctions.checkDependency(formTag.name,formData[key].dependencyObj);
							/* code for optional warning */
							if(isSet(formData[key].dependencyObj.optionalWarnings)){
								if(formData[key].dependencyObj.optionalWarnings.length > 0 ){
								
									optionalWarningObj = formData[key].dependencyObj.optionalWarnings;
								}
							}
							if(isSet(formData[key].dependencyObj.dependentControlObj)){
								if(formData[key].dependencyObj.dependentControlObj.length > 0 ){
									baseFunctions.checkDependentControl(formTag.name,formData[key].dependencyObj.dependentControlObj);
								}
							}
							
							if(isSet(formData[key].dependencyObj.toggleComponentObj)){
								baseFunctions.checkToggleDependency(formTag.name,formData[key].dependencyObj);
							}
						}
					}
					
					formValidate 	= formData[key].isValidation;
					editModeFlag    = (isSet(formData[key].editMode))?formData[key].editMode:false;
				}
			});
			$(div_clearfix).appendTo(formCreate);
			$(div_clearfix).appendTo($(self));
			var validationObj = {
					"isValidation" 			  : formValidate,
					"editMode"			  : editModeFlag,
					"optionalObj"		  : optionalWarningObj
			};
			var msg = ""; //need to recheck
			defaults.callback.call(this,msg,validationObj);
		},
		init : function(){
			methods.generateForm(defaults.formObject);
		}
	};
	return methods.init();
};
