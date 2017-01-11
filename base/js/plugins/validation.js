/*
|@author : Intech Creative Services
|@desc   : plugin for custom validations.
|@param  : 
 */
$.fn.validate = function(methodOrOptions) {
	var self = $(this);
	var value;
	var divClone = document.createElement("div");
	var inputElement;
	var inputType;
	var className;
	var successCall =  false;
	var formId;
	var submitLock = 0;
	var confAlertMessage;
	var isErrorDto = [];
	var finalErrorObject = {};
	var pageContextParams = [];
	var selectRecordValue;
	var attachParam = [];
	var defaults = $.extend({
			validation 		: false,
			hiddenParams 	: {},
			showAlert	 	: false,
			alertMsg	 	: false,
			optionalObj 	: {},
			editMode		: false,
			callback 		: function(){}
	},methodOrOptions);
	var beforeSubmit 	= defaults.beforeSubmit?defaults.beforeSubmit:"";
	
			var methods = {
			_required : function(element) {
				inputElement = ($(element).attr("name") == undefined)?$(element).data("name"):$(element).attr("name");
				inputType = $(element).data("type");
				value = $(formId+" [name = '" + inputElement + "']").val();
				switch (inputType) {
					case "radio":
						if($(formId+" input[name = '"+inputElement+"']:checked").length == 0){
							return 'validate.required.select.value.message';
						}
						break;
					case "checkbox":
						if($(formId+" input[name = '"+inputElement+"']:checked").length == 0){
							return 'validate.required.select.value.message';
						}
						break;
					case "file":
						var dataValue = $(formId+" [name = '" + inputElement + "']").attr("data-value");
						if (isEmpty(dataValue)) {
							return 'validate.required.message';
						}
						break;
					case "select-one":
						if (isEmpty($(formId+" [name = '" + inputElement + "']").val())) {
							return 'validate.required.message';
						}
						break;
					case "manageColumnConfig":
							var getLiLength = $(formId+" [name = '" + inputElement + "']").find("li").length;
							if(getLiLength == 0){
								return 'validate.required.message';
							}
						break;
					case "text":
					case "password":
					case "textarea":
					case "select-multiple":
					default:
						if (isEmpty(value)) {
							return 'validate.required.message';
						}
						break;
				}
			},
			_email : function(element) {
				inputElement = $(element).attr("name");
				value = $(formId+" [name = '" + inputElement + "']").val();
				var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (!isEmpty(value) && regEx.test(value) == false) {
					return 'validate.email.message';
				}
			},
			_multiemail : function(element) {
				var showValid = 0;
				inputElement = $(element).attr("name");
				value = $(formId+" [name = '" + inputElement + "']").val();
				var emails = value.split(/[;,]+/);
				var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				for(var i in emails){
					if (!isEmpty(emails[i]) && regEx.test([i]) == false) {
						showValid = 1;
					}
				}
				if(showValid == 1)
					return 'validate.email.message';
			},
			_number : function(element) {
				inputElement = $(element).attr("name");
				value = $(formId+" [name = '" + inputElement + "']").val();
				var regEx = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;
				if (!isEmpty(value) && regEx.test(value) == false) {
					return 'validate.number.only.message.decimal';
				}
			},
			_onlynumber : function(element) {
				inputElement = $(element).attr("name");
				value = $(formId+" [name = '" + inputElement + "']").val();
				var regEx = /^\d+$/;
				if (!isEmpty(value) && regEx.test(value) == false) {
					return 'validate.number.only.message';
				}
			},
			_alphaNumeric : function(element) {
				inputElement = $(element).attr("name");
				value = $(formId+" [name = '" + inputElement + "']").val();
				var regEx = /^[A-Za-z0-9_ ]+$/;
				if (!isEmpty(value) && regEx.test(value) == false) {
					return 'validate.alphaNumeric.only.message';
				}
			},
			_onlyLetters : function(element) {
				inputElement = $(element).attr("name");
				value = $(formId+" [name = '" + inputElement + "']").val();
				var regEx = /^[A-Za-z\s]+$/;
				if (!isEmpty(value) && regEx.test(value) == false) {
					return 'validate.onlyLetters.message';
				}
			},
			_mobileNumber : function(element) {
				inputElement = $(element).attr("name");
				value = ($(formId+" [name = '" + inputElement + "']").val()).toString();
				var regEx = /^(?=.*[0-9])[- +()0-9]+$/gm;
				if (!isEmpty(value) && value.match(regEx) == null) {
					return 'validate.mobile.number';
				}
			},
			_password : function(element) {
				inputElement = $(element).attr("name");
				value = $(formId+" [name = '" + inputElement + "']").val();
				var regEx = /(?=.*[a-z])(?=.*[A-Z]).{8,}/;
				if (!isEmpty(value) && regEx.test(value) == false) {
					return 'password.validation.message';
				}
			},
			_matchInput : function(element) {
				inputElement = $(element).attr("name");
				value = $(formId+" [name = '" + inputElement + "']").val();
				var matchInputEle = $(element).data("match");
				var matchInputValue = $(formId+" [name = '" + matchInputEle + "']").val();
				if (!isEmpty(value) && value != matchInputValue) {
					return 'password.not.match';
				}
			},
			_checkValidDate : function(element){
				var errorObject = {};
				inputElement = $(element).attr("name");
				value = $(formId+" [name = '" + inputElement + "']").val();
				if(!isEmpty(value)){
					
					if(!moment(value,[$(element).data("format")],true).isValid()){
						$(formId).find("[name = "+inputElement+"],[data-name = "+inputElement+"]").addClass("error-input-box");
						if(typeof errorObject[inputElement] == "undefined"){
							errorObject[inputElement] = [];
						}
						errorObject[inputElement].push({
							"message" : 'validate.select.date.message',
							"params"  : new Array($(element).data("format"))
						});
						methods.generateError(1,errorObject);
						return i18NCall('validate.select.date.message',new Array($(element).data("format")));
					}else{
						if(isSet($(element).attr("mindate"))){
							return methods._checkMinDate(element);
						}
					}
				}
			},
			_checkMinDate :  function(element){
				 var errorObject = {};
				 // Min Date Validation Start
				 inputElement = $(element).attr("name");
				 value = $(formId+" [name = '" + inputElement + "']").val();
			     
			      var active = moment.utc(moment(value,$(element).data("format")).format("YYYY/MM/DD H:mm:ss"), 'YYYY/MM/DD H:mm:ss');
			      var current = moment.utc(moment($(element).attr("mindate"),$(element).data("format")).format("YYYY/MM/DD H:mm:ss"), 'YYYY/MM/DD H:mm:ss');
			      
			      if(active.isAfter(current) != true && !active.isSame(current)){
			       $(formId).find("[name = "+inputElement+"],[data-name = "+inputElement+"]").addClass("error-input-box");
			       if(typeof errorObject[inputElement] == "undefined"){
			        errorObject[inputElement] = [];
			       }
			       errorObject[inputElement].push({
			        "message" : 'validate.select.date.mindate',
			       "params"  : new Array($(element).attr("mindate"))
			       });
			       methods.generateError(1,errorObject);
			       return i18NCall('validate.select.date.mindate',new Array($(element).data("mindate")));
			      }
			     // Min Date Validation End
			},
			_checkCustomExpression:function(element){
				var errorObject = {};
				inputElement = $(element).attr("name");
				costumExp = $(element).attr("data-regEx");
				errorMsg1 = $(element).attr("data-error-msg");
				value = $(formId+" [name = '" + inputElement + "']").val();
				var regEx = costumExp;
				if (!isEmpty(value) && value.match(regEx) == null) {
					if(!errorMsg1){
						errorMsg1 = "validate.format.unvalid";
					}
					
					if(typeof errorObject[inputElement] == "undefined"){
						errorObject[inputElement] = [];
					}
					errorObject[inputElement].push({
						"message" : errorMsg1
					});
					methods.generateError(1,errorObject);
					return i18NCall(errorMsg1);
				}
			},
			sendFormData : function(){
				var jsonObj;
				var jsonObj_main = [];
				var output_main  = {};
				var timeValue = "00:00:00";
				clubByArray = [];
				if(defaults.editMode){
					jsonObj = baseFunctions.updateData(formId);
				}else{
					jsonObj = baseFunctions.addData(formId);
				}
				var formURL = $(formId).attr("action");
				if(typeof formURL == "undefined"){
					formURL = $(formId).find("form").attr("action");
				}
				ajaxUrl = formURL;
				
				if(jQuery.type( defaults.hiddenParams ) != "array"){
					defaults.hiddenParams = new Array(defaults.hiddenParams);
				}
				
				if($.isEmptyObject(pageContextParams) == true){
					pageContextParams = defaults.hiddenParams;
				}
				jsonObj[0]["pageContextParams"] = pageContextParams;
				
				if(isSet(attachParam) && attachParam != []){
					$.extend(jsonObj[0],attachParam);
				}
				
				output_main["records"] = jsonObj;
				//$.extend( output_main, defaults.hiddenParams );
				
				var ajaxObject = {
						"ajaxURL" : ajaxUrl,
						"params" : {"records" : JSON.stringify(output_main),"selectRecords":selectRecordValue},
						"successCallback" : methods.submitFormSuccess,
						"failureCallback" : generateFailure,
						"loader" : true,
						"loaderWrapper" : "#"+$(self).attr("id")
				};
				ajaxCallBack(ajaxObject);
			},
			submitFormSuccess : function(jsonData){
				var objData = {
						"selfObj" 	: $(self),
						"formId"  	: formId,
						"jsonData"	: jsonData,
						"editMode"  : defaults.editMode
 				};
				var returnValue = baseFunctions.submitedDataOperation(objData);  
				if(returnValue == true){
					defaults.callback.call(this,objData);
				}
				setTimeout(function (){
					submitLock = 0;
					$(formId).find("[type=submit]").attr("disabled",false);
				},1000);
			},
			successCallback : function(){
				if(successCall == false) return false;
				if(successCall == true && submitLock == 0){
					submitLock = 1;
					methods.sendFormData(formId);
				}	
				
			},
			generateError : function(code,displayError) {
				$.each(displayError, function(inputName, message) {
					var errorMesage = "";
					var datePicClass = "";
					for(var i=0; i < message.length; i++){
						
						if($(formId+" [name = '" + inputName + "']").attr("format") == "date" || $(formId+" [name = '" + inputName + "']").attr("format") == "datetime"){
							datePicClass = "date-error";
						}
						className = inputName + " " + $("[name = '"+inputName+"']").data("type") + " "+ datePicClass;
						
						if(typeof message[i].params != "undefined"){
							errorMesage = i18NCall(message[i].message,message[i].params)+" <br/> ";
						}else{
							errorMesage = i18NCall(message[i].message)+" <br/> ";
						}
						$(formId).find("[name = "+inputName+"],[data-name = "+inputName+"]").addClass("error-input-box");
					}
					
					generateFieldMsg(code,className,errorMesage,inputName,formId);
					setTimeout(function(){
						$(formId+" [name = '"+inputName+"']").parents(selector_p_r_5).find(".error-message.textarea .error-msg").css("top",$(formId+" [name = '"+inputName+"']").outerHeight() + 5 +"px");
					},100);
					
					if(isSet($(formId).find("[name = "+inputName+"]").attr("data-valid-flag"))){
						var lableName = $(formId).find("[name = "+inputName+"]").attr("data-valid-flag");
					}else{
						var lableName = $(formId).find("[name = "+inputName+"],[data-name = "+inputName+"]").closest(".form-row").find("label").html();
					}
					
					if(jQuery.inArray(lableName,isErrorDto) == -1 ){
						isErrorDto.push(lableName);
					}
				});
				successCall = false;
				return false;
			},	
			validateType : function(nameObject) {
				var error = {};
				var errorObject = {};
				var dataValid = String($(nameObject).attr("data-validate")).split(",");
				var errorMesage = "";
				var isError = 0;
				var global_error = "";
				for (var i = 0; i < dataValid.length; i++) {
					var get_error = "";
					inputElement = (typeof $(nameObject).attr("name") == "undefined")?$(nameObject).data("name"):$(nameObject).attr("name");
					switch (dataValid[i]) {
						case "required":
							get_error = methods._required(nameObject);
							break;
						case "email":
							get_error = methods._email(nameObject);
							break;
						case "multiemail":
							get_error = methods._multiemail(nameObject);
							break;
						case "number":
							get_error = methods._number(nameObject);
							break;
						case "onlynumber":
							get_error = methods._onlynumber(nameObject);
							break;
						case "alphaNumeric":
							get_error = methods._alphaNumeric(nameObject);
							break;
						case "onlyLetters":
							get_error = methods._onlyLetters(nameObject);
							break;
						case "mobileNumber":
							get_error = methods._mobileNumber(nameObject);
							break;
						case "password":
							get_error =  methods._password(nameObject);
							break;
						case "matchInput":
							get_error =  methods._matchInput(nameObject);
							break;	
						case "verifyDate":
							get_error =  methods._checkValidDate(nameObject);
							break;
						case "customExpression":
							get_error =  methods._checkCustomExpression(nameObject);
							break;
					}
					
					if(get_error != undefined && get_error != ""){
						global_error += get_error;
						isError = 1;
					}
					/*else if(jQuery.type(get_error) == "object"){
						global_error += get_error;
						isError = 1;
					}*/
					
					if(errorObject[inputElement] == undefined){
						errorObject[inputElement] = [];
					}
					errorObject[inputElement].push({
						"message" : global_error,
					});
				}
				if(global_error != ""){
					methods.generateError(1,errorObject);
				}
				return isError;
			},
			validateNull : function(nameObject){
				var error = {};
				var errorObject = {};
				var errorMesage = "";
				var value = $(nameObject).val();
				var regExWS = /^\s+$/;
				var regExFLWS = /^(?=\S+)(?=[\w ]*$).*(?=\S).$/;
				if(regExWS.test(value) == true){
					inputElement = (typeof $(nameObject).attr("name") == "undefined")?$(nameObject).data("name"):$(nameObject).attr("name");
					$(formId).find("[name = "+inputElement+"],[data-name = "+inputElement+"]").addClass("error-input-box");
					if(typeof errorObject[inputElement] == "undefined"){
						errorObject[inputElement] = [];
					}
					errorObject[inputElement].push({
						"message" : 'validate.null.value.message'
					});
					methods.generateError(1,errorObject);
				}
			},
			removeValidation : function(thisValue){
				setTimeout(function(){					
					$(thisValue).removeClass("error-input-box");
					$(thisValue).parents(selector_p_r_5).find(selector_error_message).remove();
					isErrorDto = [];
				},100);
			},
			batchUpdateValidation:function(){
				pageContextParams = [];
				// # check selected records accordion or error record accordion is visible or not 
				if($(formId).find(".selected-records:visible").length > 0 || $(formId).find("#batchupdate-error-records:visible").length > 0){
					// # check selected records accordion is visible or not 
					if($(formId).find(".selected-records:visible").length > 0){
						// # condition for which radio button is check. 
						if($("input[name='selectRecordAction']") != undefined){
							if($("input[name='selectRecordAction']:checked").val() == 1){
								selectRecordValue = "true"; 
							}else{
								$(formId).find(".selected-records .checkbox input[type='checkbox']:checked" ).each(function( index ) {
									if($(this).prop("checked")==true){
										var recordId 		= $(this).val();
										var recordCode	  	= $(this).attr("data-row-code");
										var recordVersion   = $(this).attr("data-row-version");
										var parentrecordcode   = $(this).attr("data-row-parentrecordcode");
										
										pageContextParams.push({ "recordId" : recordId , "code" : recordCode, "version": recordVersion,"parentRecordCode":parentrecordcode });
									}
								});
								selectRecordValue = "false";
							}
						}
					}else{
						// # error record accordion is visible
						selectRecordValue = "false";
						$(formId).find("#batchupdate-error-records td input[type='checkbox']:checked" ).each(function( index ) {
							if($(this).prop("checked")==true){
								var recordId	  	= $(this).attr("data-row");
								var recordVersion   = $(this).attr("data-row-version");
								var recordCode   = $(this).attr("data-row-code");
								var parentrecordcode   = $(this).attr("data-row-parentrecordcode");
								
								pageContextParams.push({ "recordId" : recordId , "code" : recordCode, "version": recordVersion,"parentRecordCode":parentrecordcode  });
							}
						});
					}
					// # condition for warnings msg display if not select any error records in grid. 
					if(pageContextParams.length == 0 && selectRecordValue == "false"){
						var messageInfo = {
								"message" 	: "select.check.checkbox",
								"infoId" 	: "export-excel"
						};
						if(!baseFunctions.checkTotalCheckedCount("#batchupdate-error-records",messageInfo)){
							submitLock = 0;
							return false;
						}
					}
				}
				return true;
			},
			validateForm : function(){
				/* error will generate when click on submit / save button */
				$(formId).submit(function (event){
							successCall = true;
							event.preventDefault();
							var errorFlag = 0;
							var errorFocus = "";
							var isError = 0;
							var isFileError = 0;
							var checkSelRecordError = 0;
							$(formId).find(selector_error_message).remove();
					
								if(defaults.validation){
									$(formId).find("[data-validate]:visible").each(function() {
										if($(this).is(":disabled") != true){
											if($(this).data("accept") != undefined || $(this).data("size") != undefined){
												isFileError = baseFunctions.setCustomFileData($(this).attr("id"));
											}
											/* only for ul li method when manage column config type has been given */
											if($(this).data("type") == "manageColumnConfig"){
												var getLI = $(this).find("li");
												if(getLI.length > 0){
													methods.removeValidation($(this));
												}
											}
											/* only for ul li method when manage column config type has been given */
											isError = methods.validateType($(this));
											if(errorFlag == 0 && (isError == 1 || isFileError == 1)){
												errorFlag= 1;
												errorFocus = $(this).attr("name") != undefined ?  $(this) : $("input[name='"+$(this).data("name")+"']");
												successCall = false;
											}
										}
									});
									if(defaults.editMode){
										if($(formId).find(scroll_wrapper).hasClass("jspScrollable")){
											$(formId).find(scroll_wrapper).data('jsp').scrollToY(0);
										}
									}
									if(errorFlag == 1 && !jQuery.isEmptyObject(isErrorDto)){
										baseFunctions.showAllError($(self),isErrorDto);
										isErrorDto = [];
									}
								}
								/*$(formId).find("[type='text']:visible,[type='textarea']:visible").each(function(){
									methods.validateNull($(this));
								});*/
							
							if(errorFlag == 0) {
								successCall = methods.batchUpdateValidation();
								if(successCall==false) return false;
							}
							//code to set autofocus on error element
							if(errorFocus != "" || successCall == false) {
								if(errorFocus.data("type") == "select-one"){
									errorFocus.siblings(".dropdown-toggle").trigger("focus");
								}else{
									errorFocus.trigger("focus");
								}	
								setTimeout(function (){
									$(formId).find("[type=submit]").attr("disabled",false);
								},1000);
							}
							if(defaults.optionalObj.length > 0){
								defaults.alertMsg = baseFunctions.getOptionalWarningDetails(formId,defaults.optionalObj);
								if(defaults.alertMsg.length > 0 ){
									defaults.showAlert =  true;
								}else{
									defaults.showAlert =  false;
								}
							}
							if(defaults.showAlert == true && errorFlag == 0){
									if(jQuery.type(defaults.alertMsg) === "object"){
										confAlertMessage = defaults.alertMsg;
									}else if(jQuery.type(defaults.alertMsg) === "array"){
											var getLiHTML = "";
											$.each(defaults.alertMsg,function(index){
												var liClone = document.createElement("li");
												var message = i18NCall(defaults.alertMsg[index].message,defaults.alertMsg[index].params);
												getLiHTML += $(liClone).html(message).prop("outerHTML");
											});
											var UlHTML = $(ele_ul);
											UlHTML.find("p").html(i18NCall("save.alert.message"));
											UlHTML.find("ul").append(getLiHTML);
											var getULEle = new Array($(UlHTML).prop("outerHTML"));
											confAlertMessage = getULEle;
									}
									var wrapperId = $(formId).find("form").attr("id");
									getConfirmationAlert(confAlertMessage,wrapperId);
									$.blockUI({ message: $('#conf-'+wrapperId), css: { width: '275px' } });
									$('#conf-'+wrapperId).find("#yes").on("click",function(){
										$.unblockUI();
										methods.successCallback(formId);
									});
									$('#conf-'+wrapperId).find("#no").on("click",function(){
										$(formId).find("[type=submit]").attr("disabled",false);
										$.unblockUI();
									});
								return false;
							}else if(successCall == true){
								
								if(beforeSubmit != ""){
									var callBeforeSubmit = beforeSubmit.split('.');
									if(window[callBeforeSubmit[0]][callBeforeSubmit[1]]){
										var returnCall = window[callBeforeSubmit[0]][callBeforeSubmit[1]](formId);
										if(returnCall.successCall != true) return false;
										if(isSet(returnCall.attachParam) && returnCall.attachParam != {} ) attachParam = returnCall.attachParam;
				  	 				}
								}
								methods.successCallback(formId);
							}
							$(formId).find("[type=submit]").attr("disabled",true);
							return false;
				});
			},
			validateFormChange : function(){
				if(!defaults.validation) return false;
				/* error will generate on change event */
					$(document).delegate(formId+" [data-validate]:visible","focus",function() {
						methods.removeValidation($(this));
					});
					$(document).delegate(formId+" [data-validate]:visible","mouseleave",function() {
						$(".error-msg").hide();
					});	
					$(document).delegate(formId+" [data-validate]:visible","blur",function() {
						if($(this).find(":input").attr('disabled') != undefined){
							defaults.validation = false;
						}else{
							methods.validateType($(this));
						}
					});
					
					/*$(document).delegate(formId+" [type='text']:visible,[type='textarea']:visible","blur",function() {
						methods.validateNull($(this));
					});*/
						
				$(formId).find(".dropdown-list-menu").each(function(){
					var thisVal = $(this);

					$(this).find("select").on("change",function(){
						var thisSelect = $(this);
						if(!isEmpty($(this).val()) || $(this).val() != "" || $(this).attr("disabled")){
							methods.removeValidation(thisSelect);
							methods.removeValidation(thisVal);
						}else{
							methods.validateType(thisSelect);
						}
					});
					var thisSelect =  $(this).find("select");
					$(this).find("select").siblings(".dropdown-toggle").on("blur",function(){
						if(!isEmpty($(thisSelect).val()) || $(thisSelect).val() != "" || $(thisSelect).attr("disabled")){
							methods.removeValidation(thisSelect);
							methods.removeValidation(thisVal);
						}else{
							methods.validateType(thisSelect);
						}
					});
					$(this).find("select").siblings(".dropdown-toggle").on("focus",function(){
						methods.removeValidation(thisVal);
						methods.removeValidation(thisSelect);
					});
				});
			},
			init : function() {				
				if(!defaults.validation) successCall =  true;
				formId = "#" + $(self).attr("id");
				
				methods.validateForm(formId);
				setTimeout(function(){	
					methods.validateFormChange(formId);
				},500);
			}
	};
	return methods.init();
};