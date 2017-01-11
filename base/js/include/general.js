/*
|@author : Intech Creative Services
|@desc   : Least common functions which are in use frequently or anywhere throughout system.
*/	

var cookieToken 										= getCookie('token');
var cookieLang  										= getCookie("lang");
if (cookieLang) {
	var current_lang = cookieLang;
} else {
	var current_lang = "en-us";
}
/* check authentication */
function checkAuthentication() {
	if (!cookieToken) {
		//window.location = "/"+pathValue+"/";
		//return false;
	}
}

/* set cookies */
function setCookie(cookieKey, cookieValue, cookieExpiry) {
	 if (cookieExpiry != -1) {
		 document.cookie = cookieKey + "=" + cookieValue + "; path=/";
	 } else {
	  document.cookie = cookieKey + "=" + cookieValue + "; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/";
	 }
}
function getCookie(cookieKey) {
	 var cookieName = cookieKey + "=";
	 var cookieArray = document.cookie.split(';');
	 
	 for (var i = 0; i < cookieArray.length; i++) {
		  var cookieValue = cookieArray[i];
		  while (cookieValue.charAt(0) == ' ')
		   cookieValue = cookieValue.substring(1);
		  if (cookieValue.indexOf(cookieName) == 0)
		   return cookieValue.substring(cookieName.length, cookieValue.length);
	 }
	 return "";
}

function deletCookie(cookieKey) {
 setCookie(cookieKey, "", -1);
}

/* functions for conver json into string or parse json*/
function jsonStringify(jStringData) {
	return JSON.stringify(jStringData);
}

function jsonParse(jParseData) {
	return jQuery.parseJSON(jParseData);
}

/* function to generate block UI element */
function generateBlockUI(wrapperId,flag) {
	checkAuthentication();
	if(flag != 1){
		$(wrapperId).prepend('<div id="mask" class="maskfixed"><div id="loader"> </div></div>').fadeIn();
	}else{
		$(wrapperId).addClass("block-head");
		$(wrapperId).prepend('<div class="content-mask" id="content-mask"><div id="loader"> </div></div>').fadeIn();
	}
}

/* function to unblock block UI element */
function unblockUI(wrapperId,flag) {
	 setTimeout(function() {
	 	if(flag != 1){
	 		$(wrapperId).find("#mask").fadeOut("slow").remove();
	 	}else{
	 		$(wrapperId).removeClass("block-head");
	 		$(wrapperId).find("#content-mask").fadeOut("slow").remove();
	 	}
	 }, 100);
}

/* function to get ajax response */
function ajaxCallBack(ajaxObject) {
	var flag = 0;
	ajax_url = (ajaxObject.ajaxURL != undefined) ? ajaxObject.ajaxURL : "";
	var method = (ajaxObject.method != undefined) ? ajaxObject.method : "POST";
	var success_callback = (ajaxObject.successCallback != undefined) ? ajaxObject.successCallback: "";
	var failure_callback = (ajaxObject.failureCallback != undefined) ? ajaxObject.failureCallback: "";
	var params = (ajaxObject.params != undefined) ? ajaxObject.params : "{}";
	var wrapper = (ajaxObject.wrapperId != undefined) ? ajaxObject.wrapperId : "";
	var loaderWrapper = (ajaxObject.loaderWrapper != undefined) ? ajaxObject.loaderWrapper:"",flag=1;
	var loader = (ajaxObject.loader == true) ? generateBlockUI(loaderWrapper,flag) : "";
	var aSync  = (ajaxObject.aSync != undefined) ? ajaxObject.aSync : true;
	if(jQuery.type(success_callback) ==  "string"){
		success_callback = success_callback.split('.');
	}
 	$.ajax({
		url : ajax_url,
		dataType : "json",
		type : method,
		data : params,
		cache : false,
		crossDomain : true,
		async : aSync,
		contentType : 'application/x-www-form-urlencoded',
		error : function(data, status, error) {
			(ajaxObject.loader == true) ? unblockUI(loaderWrapper) : "";
			failure_callback(error);
		},
		success : function(data) {
			var errorCode;
			
			
			if(isSet(data.responseDetail) && isSet(data.responseDetail.errorDetail) && data.responseDetail.errorDetail.length > 0 ){
				errorCode = data.responseDetail.errorDetail[0].code+": ";
			}
			
			if(getResultCode(data.resultCode) == CODE_SESSIONERROR) {
				var wrapperId = "session_error"
				getNormalSessionAlert(errorCode+data.responseDetail.errorDetail[0].message,wrapperId,data.returnObject);
				$.blockUI({ message: $('#alert-'+wrapperId), css: { width: '275px' } });
				
				deletCookie("token");
				deletCookie("userName");
				deletCookie("lang");
				
				//genLogout();
				return false;
			}else if(getResultCode(data.resultCode) == CODE_SYSTEM) {
				var wrapperId = "exceptions"
				getNormalAlert(errorCode+data.responseDetail.errorDetail[0].message,wrapperId,data.returnObject);
				$.blockUI({ message: $('#alert-'+wrapperId), css: { width: '275px' } });
				return false;
			}else if(getResultCode(data.resultCode) == CODE_SUCCESS) {
				if($(global_message_wrapper).find(".ui-alert").hasClass("ui-alert-error")){
					var timeOut = 0;
					setTimeout(function(){
						hideMessageWrapper();
					},timeOut);
				}
			}
			if(ajaxObject.loader == true){
				setTimeout(function() {
					if(flag != 1){
				 		$(loaderWrapper).find("#mask").fadeOut("slow").remove();
				 	}else{
				 		$(loaderWrapper).removeClass("block-head");
				 		$(loaderWrapper).find("#content-mask").fadeOut("slow").remove();
				 	}
				 	
				 	if(jQuery.type(success_callback) !=  "function"){
				 		window[success_callback[0]][success_callback[1]](data, wrapper);
				 	}else{
				 		success_callback(data, wrapper);
				 	}
				 	
				 }, 100);
			}else{
				unblockUI();
				if(jQuery.type(success_callback) !=  "function"){
			 		window[success_callback[0]][success_callback[1]](data, wrapper);
			 	}else{
			 		success_callback(data, wrapper);
			 	}
			}
		}
	});
}

/* function for translate string or params in selected language*/
function i18NCall(value,params) {
	if(params != undefined){
		return $.i18n.prop(value,params);
	}else{
		return $.i18n.prop(value);
	}
}

function resourceBundle() {
	return SetWebURL + 'base/bundle/' + current_lang + '/';
}

/* call plugin for i18n language translation library */
function languagePlugin(lang) {
	$.i18n.properties({
				name : [ 'constant', 'messages', 'error-messages' ],
				path : resourceBundle(),
				mode : 'both',
				language : lang,
				callback : function() {
					// We specified mode: 'both' so translated values will be
					// available as JS vars/functions and as a map
					getTemplateParams();
				}
			});
}

/* function to replace template keys with value */
function getTemplateParams() {

	$('[data-replace]').each(function() {
				// Find the pattern.
				var element = $(this);
				var replaceWith = $(this).data("replace");
				var replaceWithData = $(this).data("replace-with");
				switch (replaceWith) {
				case "meta":
					element.attr("content", element.attr("content").replace(/{{(.*)}}/g, function(match, contents, offset, s) {
								return $.i18n.prop(contents);
							}));
					break;
				default:
					if(replaceWithData) 
						element.text(replaceWithData.replace(/{{(.*)}}/g,function(match, contents, offset, s) {
								return $.i18n.prop(contents);
							}));
				}
			});
}

/* function to generate dynamic dropdwn for language and set language on dropdown change */
function languageDdAction(wrapper){
	if(wrapper == undefined)
		wrapper = "header .language";
	
	var languages = {
			"zh-cn" : i18NCall("lang_chinese_title"),
			"en-us" : i18NCall("lang_english_title")
			//"zh-tw" : "French"
	};
	selLang = (!cookieLang)?"en-us":cookieLang;
	$.each(languages,function(index,value){
		var liClone = document.createElement("option");
		var selectedValue = false;
		if(selLang == index){
			selectedValue = true;
		}
		$(liClone).attr({
			"value" : index,
			"selected" : selectedValue
		}).html(value);
		$(wrapper).find("select:first").prepend(liClone);
	});
	
	$(".language select").change(function(){
		setCookie("lang",$(this).val(),1);
		location.reload();
	});
}

/* function for generate error message */
function generateMsg(error_code,msg,messageWrapper,wrapperId,responseDetail) {
	
	var resultCode = parseInt(getResultCode(error_code));
	if(messageWrapper == global_message_wrapper){
		$('html, body').animate({scrollTop: 0}, 0);
	}
	
	var errorCode = "";
	if(isSet(responseDetail) && isSet(responseDetail.errorDetail) && responseDetail.errorDetail.length > 0){
		errorCode = responseDetail.errorDetail[0].code+": ";
	}
	
	var class_wrapper  = '';
	var wrapperId 	   = wrapperId != undefined ? wrapperId : "";
	switch (resultCode) {
		case CODE_SYSTEM:
			class_wrapper = "error";
			break;
		case CODE_BUSINESS:
			class_wrapper = "error";
			if(isSet(responseDetail) && isSet(responseDetail.errorDetail) && responseDetail.errorDetail.length > 0){
				msg = errorCode+responseDetail.errorDetail[0].message;
			}
			break;
		case CODE_SUCCESS:
			class_wrapper = "success";
			if(isSet(responseDetail) && isSet(responseDetail.successDetail)){
				msg = responseDetail.successDetail[0].code+": "+responseDetail.successDetail[0].message;
			}
			/*else if(isSet(responseDetail) && isSet(responseDetail.warningDetail)){
				msg = responseDetail.warningDetail[0].message;
				class_wrapper = "warning";
			}*/
			break;
		case CODE_DAO:
			class_wrapper = "error";
			if(isSet(responseDetail) && isSet(responseDetail.errorDetail) && responseDetail.errorDetail.length > 0){
				msg = errorCode+responseDetail.errorDetail[0].message;
			}
			break;
		case CODE_COMMUNICATION:
			class_wrapper = "error";
			if(isSet(responseDetail) && isSet(responseDetail.errorDetail) && responseDetail.errorDetail.length > 0){
				msg = errorCode+responseDetail.errorDetail[0].message;
			}
			break;
		case CODE_IO:
			class_wrapper  = "error";
			if(isSet(responseDetail) && isSet(responseDetail.errorDetail) && responseDetail.errorDetail.length > 0){
				msg = errorCode+responseDetail.errorDetail[0].message;
			}
			break;
		case CODE_WARNING:
			class_wrapper  = "warning";
			break;
		case CODE_BATCHEDIT:
			class_wrapper = "success";
			if(isSet(responseDetail) && isSet(responseDetail.successDetail)){
				msg = responseDetail.successDetail[0].code+": "+responseDetail.successDetail[0].message;
			}else if(isSet(responseDetail) && isSet(responseDetail.errorDetail) && responseDetail.errorDetail.length > 0){
				msg = errorCode+responseDetail.errorDetail[0].message;
				class_wrapper = "error";
			}
			break;
	}
	
	if(jQuery.type(msg) ===  "string"){
		var message        = i18NCall(msg);
	}else{
		var message        = i18NCall(msg.message,msg.params);
	}
	
	if(message != ""){
		var msg_block_html = $(notification_msg_block);
		msg_block_html.addClass("ui-alert-" + class_wrapper);
		msg_block_html.find('img.alert-msg-icon').attr({
			"src" : "base/img/icons/" + class_wrapper + ".svg"
		});
		msg_block_html.find('p.alert-msg').html(message);
		
		$(messageWrapper).html($(msg_block_html).prop("outerHTML"));
		$(messageWrapper).fadeIn();
	}

	if(resultCode == CODE_SUCCESS || resultCode == CODE_WARNING){
		setTimeout(function() {	
				$(messageWrapper).empty();
				$(messageWrapper).fadeOut();
				if(wrapperId != "")
				{	
					baseFunctions.resetFormData(wrapperId);
					if(!$(wrapperId).parent("div").hasClass("accordion-content") && screenName != "changepassword"){
					     $(wrapperId).fadeOut();
				     }else if(screenName == "changepassword"){
				    	 $(wrapperId).find("[type=reset]").trigger("click");
				     }
					$(".app-action-group a").removeClass("active");
				}	
		}, 5000);
	}
}
function addBorderClass(formId,fieldName){
	setTimeout(function() {
		$(formId + " [name = '" + fieldName + "']").closest(selector_p_r_5).find(".error-message").addClass("border-none");
	}, 250);
}
/* function for generate error message in :input fields */
function generateFieldMsg(error_code, className, msg, wrapperName, formId) {
	var class_wrapper = '';
	switch (error_code) {
	case 0:
		class_wrapper = "success";
		break;

	case 1:
		class_wrapper = "error";
		break;

	case 2:
		class_wrapper = "warning";
		break;

	case 3:
		class_wrapper = "normal";
		break;
	}
	var error_msg_block_html = $(validation_error_block);
	error_msg_block_html.addClass(class_wrapper + " " + className);
	error_msg_block_html.find("img").attr({
		"src" : "base/img/icons/" + class_wrapper + ".svg"
	});
	error_msg_block_html.find('span.error-msg').html(msg);
	setTimeout(function() {
		$(formId + " [name = '" + wrapperName + "']").closest(selector_p_r_5).append($(error_msg_block_html).prop("outerHTML"));
	}, 100);
	
	setTimeout(function (){
		$(formId).find("[type=submit]").attr("disabled",false);
	},2000);
}

/* failure call back for internal server error */
function generateFailure() {

}
/* function to permorm various operations when user click on reset button within form */
function resetData(){
	$(document).delegate("[type=reset]", "click",function(e){
		var openUrl = $(this).attr("data-url");
		var pageKey = $(this).attr("data-pagekey");
		var pagetype = $(this).attr("data-pagetype");
		var isModel 	= $(this).parents(".modal-content").length;
		var lbFlag		= false;
		var loaderClass = "body";
		if(isSet(isModel) && isModel == 1){
			var lbFlag = true;
			loaderClass = "#modal-batchupdate-form-content";
		}
		if(!isSet(pageKey)){
			pageKey = screenName
		}
		
		if(isSet(openUrl) && openUrl != ''){
			var apiURL	  	= openUrl;
			var formId = $(this).parents("form").attr("id");
			if(openUrl == 'add-form'){
				var pageName = "ADD";
			}else{
				var pageName = "EDIT";
			}
			
			if(isSet(pagetype)){
				pageName = pagetype;
			}
			
			var accordionKey = isSet($(this).parents(".app-action-form").attr("data-accordionkey"))?$(this).parents(".app-action-form").attr("data-accordionkey"):'';
			hiddenPeraArray = [];
			var ajaxObject = {
					"ajaxURL" : SetWebApiURL+openUrl,
					"params" : {"pageKey"  : pageKey,"pageId" : current_moduleId,"accordionKey": accordionKey,"pageName":pageName},
					"successCallback" : function(obj){
						if(getResultCode(obj.resultCode) == CODE_SUCCESS){
							if(accordionKey == ''){
								$('.global-lightbox-wrapper').html('');
								$('#app-action-form-editmore').remove();
								$('#app-action-form-addmore').remove();
							}else{
								var wrapper = $("#"+accordionKey).find(".accordion-content-wrapper:first");
								var wrapperId = $(wrapper).find(".accordion-form-wrapper");
								$(wrapper).find(".accordion-form-wrapper").html("");
							}
							if(openUrl == 'add-form'){
								baseFunctions.appendAddFormHTML();
								var wrapperId = "app-action-form-addmore";
								baseFunctions.generateAddmoreFormSuccess(obj,wrapperId,lbFlag)
							}else{
								if(accordionKey == ''){
									if(lbFlag == true){
										var recordId= accordionConfigs.contextParams.recordId?accordionConfigs.contextParams.recordId:"";
										var code= accordionConfigs.contextParams.code?accordionConfigs.contextParams.code:"";
										var version= accordionConfigs.contextParams.version?accordionConfigs.contextParams.version:"";
										var parentRecordCode= accordionConfigs.contextParams.parentRecordCode?accordionConfigs.contextParams.parentRecordCode:"";
										var pageContextParams = [{ "recordId" : recordId , "code" : code, "version": version,"parentRecordCode":parentRecordCode }];

										var wrapperId = "modal-batchupdate-form-content";
										if(pageName == "ADD"){
											$("#"+wrapperId).dynamicForm({
												formObject : obj.returnObject,
												lightBoxFlag   : true,
												callback : function(msg,dataArray){
													console.log(dataArray);
													$("#"+wrapperId).validate({
														validation : dataArray.isValidation,
														optionalObj	: dataArray.optionalWarningObj,
														hiddenParams: pageContextParams,
														alert	   		: true,
														editMode        : true,//dataArray.editMode,
														callback : function(){
														}
													});
												}
											});
											return true;
										}
									}else{
										baseFunctions.appendEditFormHTML(lbFlag);
										var wrapperId = "app-action-form-editmore";
									}
									baseFunctions.generateBatchupdateFormSuccss(obj,wrapperId,lbFlag);
								}else{
									var wrapper = $("#"+accordionKey).find(".accordion-content-wrapper:first");
									var wrapperId = $(wrapper).find(".accordion-form-wrapper");
									baseFunctions.editAccordionSuccess(obj,wrapperId);
								}
							}
						}
					},
					"failureCallback" : generateFailure,
					"loader" : true,
					"loaderWrapper" : loaderClass//+$("body").attr("class")
			};
			ajaxCallBack(ajaxObject);
			/*==============*/
		}else{
				var modalFlag = 0;
				if($(this).parents().hasClass("modal")){
					var wrapperId = "#"+$(this).parents(".modal").attr("id");
					modalFlag = 1;
				}else{
					var wrapperId = "#"+$(this).parents("form").attr("id");
				}
				if (typeof $(wrapperId)[0].reset == "function") {
				    $(wrapperId)[0].reset();
				}
				
				$(this).parents("form").find("[data-type=file]").each(function(){
					$(this).val("");
					$(this).removeAttr("title");
					$(this).text(i18NCall('no_file_selected'));
					$(this).parent().find("[type=hidden]").remove();
				});
				/* code to reset dropdown value */
				setTimeout(function(){
					$(wrapperId).find('select').selectpicker('render');
					$(wrapperId).find(".error-input-box").removeClass("error-input-box");
					$(wrapperId).find(".error-message").remove();	
					
					/* code to remove dependent fields validation */
					var possibleValueNames = "";
					$.each($(wrapperId).find(":input[isDependent=true]"),function(){
						possibleValueNames += $(this).attr("name")+",";
					});
					removePossibleFieldsValidation(possibleValueNames,wrapperId);
					
					addPossibleFieldsDisabled(possibleValueNames,wrapperId);
					resetSetEmptyFields(wrapperId);
					if(modalFlag == 1){
						$(wrapperId).find('form select').trigger("change");
					}
				},100);
				getAutoFocus(wrapperId);
				hideMessageWrapper();
		}
	});
}

/* function to get formatted date on header menu */
function getFormattedDate() {
    var timeFormat = "";
    
    var days = [];
    $.each(totalDays,function(index,value){
    	days.push(i18NCall(value));
    });
    
    var months = [];
    $.each(totalMonths,function(index,values){
    	months.push(i18NCall(values));
    });
    currentDate = days[date.getDay()] + ", " + date.getDate() + " " +  months[date.getMonth()] + " " + year;
    $("header .header-date").text(currentDate);
}

/* function to set current system time on header menu */
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('header .header-time').html(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

/* function to get time zone */
function getTimeZoneID(dateString){
    var re1='.*?'; // Non-greedy match on filler
    var re2='(?:[a-z][a-z]+)'; // Uninteresting: word
    var re3='.*?'; // Non-greedy match on filler
    var re4='(?:[a-z][a-z]+)'; // Uninteresting: word
    var re5='.*?'; // Non-greedy match on filler
    var re6='((?:[a-z][a-z]+))'; // Word 1
    var re7='([-+]\\d+)'; // Integer Number 1

    var p = new RegExp(re1+re2+re3+re4+re5+re6+re7,["i"]);
    var m = p.exec(dateString);
    if (m != null)
    {
  return m[1]+m[2];
    }
 return "";
}

/* function to get confirmation alert */
function getConfirmationAlert(msg,wrapperId){
	$("#conf-"+wrapperId).remove();
	var confirmBlock = $(modalDialogPopup);
	$(confirmBlock).attr({"id" : "conf-"+wrapperId}).find("h4").text(i18NCall("warning_message"));
	if(jQuery.type(msg) ===  "string"){
		var message        = i18NCall(msg);
	}else if(jQuery.type(msg) == "array"){
		var message        = msg[0];
	}else{
		var message        = i18NCall(msg.message,msg.params);
	}
	$(confirmBlock).attr({"id" : "conf-"+wrapperId}).find(".message-desc").html(message);
	$("body").append(confirmBlock);
}

/* function to get information alert */
function getInformationAlert(msg,wrapperId){
	$("#alert-"+wrapperId).remove();
	var alertBlock = $(modalInformationAlertDialogPopup);
	$(alertBlock).attr({"id" : "alert-"+wrapperId}).find("h4").text(i18NCall("warning_message")); 
	if(jQuery.type(msg) ===  "string"){
		var message        = i18NCall(msg);
	}else{
		var message        = i18NCall(msg.message,msg.params);
	}
	$(alertBlock).attr({"id" : "alert-"+wrapperId}).find("p").text(message);
	$("body").append(alertBlock);
	$('#alert-'+wrapperId).find("#ok").on("click",function(){
		$.unblockUI();
	});
}

/* function to get information alert */
function getInfoAlert(msg,wrapperId){
	$("#"+wrapperId).remove();
	var alertBlock = $(modalInformationAlertDialogPopup);
	$(alertBlock).attr({"id" : wrapperId}).find("h4").text(i18NCall("information_message"));
	if(jQuery.type(msg) ===  "string"){
		var message        = i18NCall(msg);
	}else{
		var message        = i18NCall(msg.message,msg.params);
	}
	$(alertBlock).attr({"id" : wrapperId}).find("p").text(message);
	$("body").append(alertBlock);
}

/* function to get normal alert */
function getNormalAlert(msg,wrapperId){
	$("#alert-"+wrapperId).remove();
	var alertBlock = $(modalAlertDialogPopup);
	$(alertBlock).attr({"id" : "alert-"+wrapperId}).find("h4").text(i18NCall("error_message"));
	if(jQuery.type(msg) ===  "string"){
		var message        = i18NCall(msg);
	}else{
		var message        = i18NCall(msg.message,msg.params);
	}
	$(alertBlock).attr({"id" : "alert-"+wrapperId}).find("p").text(message);
	$("body").append(alertBlock);
	$('#alert-'+wrapperId).find("#ok").on("click",function(){
		$.unblockUI();
	});
}

/* function to get normal alert on session timeout */
function getNormalSessionAlert(msg,wrapperId,redirectURL){
	$("#alert-"+wrapperId).remove();
	var alertBlock = $(modalSessionDialogPopup);
	$(alertBlock).attr({"id" : "alert-"+wrapperId}).find("h4").text(i18NCall("error_message"));
	if(jQuery.type(msg) ===  "string"){
		var message        = i18NCall(msg);
	}else{
		var message        = i18NCall(msg.message,msg.params);
	}
	$(alertBlock).attr({"id" : "alert-"+wrapperId}).find("p").text(message);
	$("body").append(alertBlock);
	$('#alert-'+wrapperId).find("#ok").on("click",function(){
		if(redirectURL != undefined){
			window.location = redirectURL;
		}
		$.unblockUI();
	});
}

/* function to get modal popup */
function getModalPopUp(modalWrapper){
	$(modalWrapper).modal({
	    backdrop: 'static',
	    keyboard: false
	});
	
	/*scroll of modal pop up (Prasad)*/
	$(document).on('show.bs.modal', function (event) {
	    if (!event.relatedTarget) {
	        $('.modal').not(event.target).modal('hide');
	    };
	    if ($(event.relatedTarget).parents('.modal').length > 0) {
	        $(event.relatedTarget).parents('.modal').modal('hide');
	    };
	});

	$(document).on('shown.bs.modal', function (event) {
	    if ($('body').hasClass('modal-open') == false) {
	        $('body').addClass('modal-open');
	    };
	});
	/* scroll based on height */
	 setTimeout(function(){
	  var scroll_wrapper = $(modalWrapper).find('.scroll-wrapper');
	  var mh = $(scroll_wrapper).height();
	  if(mh >= 400){
	   $(scroll_wrapper).addClass('scrollable-wrapper');
	  }
	 },250);
	
	$(document).delegate('.datepicker-row input','click',function(){
		 var parent_wrapper = $(this).parents('.modal');
		 if(parent_wrapper.length){
				  var scroll_wrapper = parent_wrapper.find('.scroll-wrapper');
				  var mh = $(scroll_wrapper).height();
				  if(mh >= 400){
				   $(scroll_wrapper).addClass('scrollable-wrapper');
				  }
		 }
	 });
}

/* function to set focus automatically on first input fields */
function getAutoFocus(wrapper){
	$(wrapper).on('shown.bs.modal', function () {
		$(wrapper).find('[autofocus]').trigger('focus');
		$(wrapper).find('[tabindex=1]').trigger('focus');
		hideMessageWrapper();
	});
	$(wrapper).find('[tabindex=1]').trigger('focus');
}

/* function to get inline validation message for manual popup inputs */
function setInlineValidation(validationObject){
	var code 		= validationObject.errorCode;
	var formId		= validationObject.formId;
	var inputName	= validationObject.inputName;
	var className 	= validationObject.className + " "+$(formId+" [name = '"+inputName+"']").data("type");
	var errorMsg 	= i18NCall(validationObject.errorMsg);
	
	$(formId+ " [name = "+inputName+"]").addClass("error-input-box");
	generateFieldMsg(code,className,errorMsg,inputName,formId);
	
	setTimeout(function(){
		if($(formId+" [name = '"+inputName+"']").attr("type") == "textarea"){
			$(formId+" [name = '"+inputName+"']").parents(selector_p_r_5).find(".error-message .error-msg").css("top",$(formId+" [name = '"+inputName+"']").outerHeight() + 5 +"px");
		}
	},100);
	
	$(formId+ " [name = "+inputName+"]").on("mouseleave",function(){
		$(".error-msg").hide();
	});
	
	var lableName = $(formId).find("[name = "+inputName+"],[data-name = "+inputName+"]").closest(".form-row").find("label").html();
	
	if(jQuery.inArray(lableName,isErrorDto) == -1 ){
		isErrorDto.push(lableName);
	}
	
	$(formId+ " [name = "+inputName+"]").on("focus",function(){
		$(formId+ " [name = "+inputName+"]").removeClass("error-input-box");
		$(".error-message ").remove();
	});
	baseFunctions.showAllError($(formId),isErrorDto);
}

function isValidEmail(email){
	var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var emails = email.split(/[;,]+/);
	for(var i in emails){
		if (!isEmpty(emails[i]) && regEx.test(emails[i]) == false) {
			return false;
		}
	}
	return true;
}

/* function to call header menu help or about us api */
function callHeaderURL(helpURL,linkClass){	
	var helpURL = encodeURI(helpURL);	
	$(linkClass).click(function(){
		$("#setURL").remove();
		$(this).append("<input type='hidden' id='setURL' />");		
		$( "#setURL" ).load( helpURL , function(response, status, xhr ) {
			if ( status == "error" ) {
				  var message = {
							"message" : "help.fail.response.error.message",
						  	"params"  : xhr.status + " " + xhr.statusText
						  };
				generateMsg(1,message,global_message_wrapper);
			  }else{
				 PopupCenter(response, "Help","900","500");
			  }
		});
	});
}

/* function to open new page in new window at center of page */
function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position Most browsers Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

/* function to get scrollbar in dropdown */
function dropdownScroll(){
	
	$(document).delegate(".dropdown-toggle","click",function(){
		   $(this).focus();
	});
	
	 $(document).delegate(".dropdown-toggle1","click",function(){
	  var thisVal = $(this);
	   setTimeout(function(){
	     var jDropdown = thisVal.siblings(".dropdown-menu").find("ul.dropdown-menu");
	     var thisSel   = thisVal.siblings("select"); 
			if(thisVal.parents().hasClass("addmore-options")){
				if(jDropdown.find("li:visible").length > 3 && !jDropdown.hasClass("jspScrollable")){
					generateScrollbar(jDropdown);
				}else if(jDropdown.find("li:visible").length < 4){
					thisSel.find("option.hidden").remove();
					thisSel.selectpicker("refresh");
				}
			}else{
				if(jDropdown.height() >= 170) {
			         if(!jDropdown.hasClass("jspScrollable")) {
			        	generateScrollbar(jDropdown);
			         }
		     	}
			}
			
	     }, 100);
	 });
	 
	 // Language Mouseleave
	 $(document).delegate(".header-top","mouseleave",function() {
	    if($(this).find(".bootstrap-select").hasClass("open")) {
	    	$(this).find(".dropdown-toggle").trigger("click");
	    }
	});	
}

function hideMessageWrapper(){
	$(global_message_wrapper).fadeOut();
 	$(global_lightbox_wrapper).fadeOut();
}

function showError(value){
	$(".error-msg").hide();
	$(value).find('.error-msg').show();
}

function replaceWithObject(regEx,string,mapObj){
	var regex = new RegExp(regEx,"gi");
	return string.replace(regex, function(matched){
		return mapObj[matched];
	});
}

/* function to check configuration error */
function misConfigError(params,message){
	for(var i=0; i<params.length; i++){
		if((params[i] == "") || (typeof params[i] == "undefined")){
			return false;
		}else{
			return true;
		}
	}
}

function getQueryString(ajaxURL)
{
	var vars = [];
    var queryString= [];
    var hash;
    var hashes = ajaxURL.slice(ajaxURL.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        queryString.push(hash[1]);
        vars[hash[0]] = hash[1];
    }
    return queryString;
}

/* function to trim values */
function doTrim(name)
{
	return $.trim(name);
}

/* function to check string is empty or not */
function isEmpty(name)
{
	if($.trim(name) != '') { return false; }
	return true;
}

/* function to check string is undefined or not */
function isSet(variableName)
{
	if($.type(variableName) === "undefined") 
		return false; 
	else
		return true;
	
}

function onChangeTrim(){
	 $(document).delegate("[type=text],[type=textarea]", "change", function() {
		 var value = $(this).val();
		 if($(this).data("comma-allow") == true){
			 value = onChangeTrimInValue(value);
		 }else{
			 value = doTrim(value);
		 }
		 $(this).val(value);
	 });
}

/* function for trim value on change */
function onChangeTrimInValue(value){
	var splitSpace = value.replace(/^[,\s]+|[,\s]+$/g, '');
	splitSpace = splitSpace.replace(/\s*,\s*/g, ",").trim();
	splitSpace = splitSpace.replace(/,+/g, ",").trim();
	var str_lead = splitSpace.replace(/^,/, "");
	var str = str_lead.replace(/,\s*$/, "");
	return doTrim(str);
}

/* function for sort data */
function sortInt(sortObj,sortBy){
	sortObj.sort(function(a, b) {
	    return parseInt(a[sortBy]) < parseInt(b[sortBy]) ? -1 : 1;
	});
	return sortObj;
}

/* function for sort data */
function sortString(sortObj,sortBy,language){
	sortObj.sort(function(a, b) {
		var texta = sortBy == ""? a : a[sortBy];
		var textb = sortBy == ""? b : b[sortBy];
		texta = language == 1 ? i18NCall(texta) : texta;
		textb = language == 1 ? i18NCall(textb) : textb;
	    return texta.toUpperCase() < textb.toUpperCase() ? -1 : 1;
	});
	return sortObj;
}

function get(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(name[1]);
}

/* function to set values in uppercase */
function setUpperCaseValue(){
	$(document).delegate("[data-uppercase = true]", "change", function() {
		var inputValue = $(this).val().toUpperCase();
		$(this).val(inputValue);
	});
}

/* function for check string is JSON or not */
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/* function for add possible values validations in dependency object */
function addPossibleFieldsValidation(mandatoryObj,formWrapperId){
	var possibleDependency = mandatoryObj.possibleDependencies;
	var fieldName = mandatoryObj.name;
	$(formWrapperId+" [name = '"+fieldName+"']").on("change",function(){
		var formValue = $(this).val();
		$.each(possibleDependency,function(index,value){
			if(formValue == value.fieldValue){
				var explodeField = value.fieldValidate.split(",");
				$.each(explodeField,function(fIndex){
					var addMandatory = $(formWrapperId+" [name = '"+explodeField[fIndex]+"'],[data-name = '"+explodeField[fIndex]+"']");
					var setEmptyFields = "set_empty_"+explodeField[fIndex];
					if(addMandatory.attr("data-validate") !=  undefined){
						addMandatory.attr("data-validate","required,"+$(addMandatory).attr("data-validate"));	
					}else{
						addMandatory.attr("data-validate","required");
					}
					addMandatory.attr("isDependent",true);
					addMandatory.parents(".form-row").find("label").attr("isDependent",true).addClass("label-bold");
					if(setEmptyFields != undefined){
						if($(formWrapperId+" :input[name = '"+explodeField[fIndex]+"']").data("type") == "select-one"){
							$(formWrapperId+" :input[name = '"+explodeField[fIndex]+"']").siblings(".dropdown-toggle").removeAttr("disabled");
						}
						$(formWrapperId+" :input[name = '"+explodeField[fIndex]+"'],[data-name = '"+explodeField[fIndex]+"']").removeAttr("disabled");
						$(formWrapperId+" [name = '"+explodeField[fIndex]+"'],[data-name = '"+explodeField[fIndex]+"']").parents(selector_p_r_5).removeClass("element-clear");
						$(formWrapperId+" [name = '"+setEmptyFields+"'],[data-name = '"+setEmptyFields+"']").attr("checked",false);
						$(formWrapperId+" [name = '"+setEmptyFields+"'],[data-name = '"+setEmptyFields+"']").parents(".checkbox").show();
					}
				});
			}
		});
	});
}

/* function for remove possible values validations in dependency object */
function removePossibleFieldsValidation(possibleFields,formWrapperId){
	var explodePossible = possibleFields.split(",");
	$.each(explodePossible,function(pfIndex){
		var removeMandatory = $(formWrapperId+" [name = '"+explodePossible[pfIndex]+"'],[data-name = '"+explodePossible[pfIndex]+"']");
		var setEmptyFields = "set_empty_"+explodePossible[pfIndex];
		if(removeMandatory.data("validate") != undefined){
			var dataValidate = $(removeMandatory).data("validate");
			var fieldParent  = removeMandatory.parents(".form-row");
			var removeRequired = dataValidate.replace(/[,]*required[,]*/gi,"");
			
			if(removeRequired != ""){
				removeMandatory.attr("data-validate",removeRequired);	
			}else{
				removeMandatory.removeAttr("data-validate");	
			}
			removeMandatory.removeAttr("isDependent");
			fieldParent.find("label").removeAttr("isDependent").removeClass("label-bold");
			fieldParent.find(".error-input-box").removeClass("error-input-box");
			fieldParent.find(".error-message").remove();			
		}
		
		if(setEmptyFields != undefined){
			if($(formWrapperId+" :input[name = '"+explodePossible[pfIndex]+"']").data("type") == "select-one"){
				$(formWrapperId+" :input[name = '"+explodePossible[pfIndex]+"']").prop('disabled', false).selectpicker('refresh');
			}
			$(formWrapperId+" :input[name = '"+explodePossible[pfIndex]+"'],[data-name = '"+explodePossible[pfIndex]+"']").removeAttr("disabled");
			$(formWrapperId+" [name = '"+explodePossible[pfIndex]+"'],[data-name = '"+explodePossible[pfIndex]+"']").parents(selector_p_r_5).removeClass("element-clear");
			//$(formWrapperId+" [name = '"+setEmptyFields+"'],[data-name = '"+setEmptyFields+"']").attr("checked",false);
			$(formWrapperId+" [name = '"+setEmptyFields+"'],[data-name = '"+setEmptyFields+"']").parents(".checkbox").show();
		}
	});
}

/* function for add possible values disabled attribute in dependency object */
function addPossibleFieldsDisabled(possibleFields,formWrapperId){
	var explodePossible = possibleFields.split(",");
	$.each(explodePossible,function(pfIndex){
		
		var addDisabled = $(formWrapperId+" [name = '"+explodePossible[pfIndex]+"'],[data-name = '"+explodePossible[pfIndex]+"']");
		if($(formWrapperId+" :input[name = '"+explodePossible[pfIndex]+"']").data("type") == "select-one"){
			$(formWrapperId+" :input[name = '"+explodePossible[pfIndex]+"']").prop('disabled', true).selectpicker('refresh');
		}
		addDisabled.attr("disabled",true).removeClass("is-edited");
		addDisabled.siblings(".error-message").css("display","none");
	});
}

/* function for remove possible values validations in dependency object */
function removeToggleElements(possibleFields,formWrapperId){
	var explodePossible = possibleFields.split(",");
	$.each(explodePossible,function(pfIndex){
		$(formWrapperId+" .form-row[data-element = '"+explodePossible[pfIndex]+"']").addClass("hidden");
	});
}


/* logout */
function genLogout() {
	if (cookieToken) {
		var ajaxObject = {
			"ajaxURL" : SetWebURL + 'security/logout',
			"successCallback" : function(data) {
				deletCookie("token");
				deletCookie("userName");
				deletCookie("lang");
				deletCookie("siteUrl");
				window.location = SetWebURL+data.returnObject;
			},
			"failureCallback" : function() {
			}
		};
		ajaxCallBack(ajaxObject);
	}
}

function extractor(query) {
    var result = /([^,]+)$/.exec(query);
    if(result && result[1])
        return result[1].trim();
    return '';
}

/* return values according to input type */
function getReturnValue(formId,thisVal){
	var getValue;
	var inputType  = thisVal.data("type");
	var inputValue = (!isEmpty(thisVal.val()))?doTrim(thisVal.val()):doTrim(thisVal.data("value"));
	inputValue	   = doTrim(inputValue);
	var inputName  = thisVal.attr("name");
	var clubByObj = {};
	switch(inputType){
		
		case "radio" :
				getValue =  $(formId+" input[name = '"+inputName+"']:checked").val();
			break;
			
		case "checkbox" :
			var checkValue = [];
			var isSingle = $(formId+" input[name = '"+inputName+"']:first").attr("data-single");
			if(isSet(isSingle) && isSingle == "true"){
				checkValue = $(formId+" input[name = '"+inputName+"']:checked").val();
				checkValue = checkValue?checkValue:"";
			}else{
				$(formId+" input[name = '"+inputName+"']:checked").each(function(){
					checkValue.push($(this).val());			
				});
			}
			getValue =  checkValue;
		break;
		
		case "select-one" :
			getValue = inputValue;
			break;
			
		case "file" :
			var path = inputValue.match(/[^\/\\]+$/);
			if(path != null)
				getValue = path.toString();
			break;
			
		case "textarea" :
			getValue = inputValue;
			break;
		case "password" :
			getValue = inputValue;
			break;
		case "text" :
			var format 	  = thisVal.attr("format");
			if(format != undefined){
				switch(format){
					case "date" : 
						getValue = getValidFormat(inputValue,thisVal.data("format"),"DD/MM/YYYY",thisVal.attr("dateRange"));
						break;
					case "datetime" : 
						getValue = getValidFormat(inputValue,thisVal.data("format"),"DD/MM/YYYY HH:mm:ss",thisVal.attr("dateRange"));
						break;
					case "time" : 
						getValue = getValidFormat(inputValue,$(this).data("format"),"HH:mm:ss");
						break;
				}
			}else{
				getValue = inputValue;
			}
		break;
	}
	if(!isSet($(thisVal).attr("data-clubby")))
	{
		return getValue;
	}else{
		clubByObj = {
			"labelKey" :  inputName,
			"value"    : inputValue//getValue
		};
		return clubByObj;
	}
}

function datePickerOnKeyUp(){
	$(document).delegate(".filter-searchvalue [type=text]", "keypress", function() {
		if($(this).attr("format") == "date" || $(this).attr("format") == "datetime"){
			$(".daterangepicker").hide();
		}		
	});
}

function checkValidDationForDate(thisValue){
	
	var format 		= thisValue.attr("format");
	var dateRange 	= thisValue.parents(filter_elements_input).siblings(filter_elements_operators).find("select").val();
	var value 		= thisValue.val();
	var currFormat 	= thisValue.attr("data-format");
//	var returnValue = formatComputation(format,dateRange,value,currFormat);
	var returnValue =  baseFunctions.formatComputation(format,dateRange,value,currFormat);
	return returnValue;
}

function checkValidNonDateFormat(dateValue){
	var split_by_space = dateValue.split(" ");
	var possibleMethods = ["d","D","m","M","y","Y","w","W","h","H","i","I","s","S"];
	var removedElement = ["h","H","i","I"];
	var newDateArray = {};
	for(var i=0;i<split_by_space.length;i++) {
		if(split_by_space[i] == "++") {
			delete newDateArray["h"];
			delete newDateArray["i"];
			delete newDateArray["decr"];
			newDateArray["incr"] = {
				"h" : 23,
				"i" : 59
			};
		}
		else if(split_by_space[i] == "--") {
			delete newDateArray["h"];
			delete newDateArray["i"];
			delete newDateArray["incr"];
			newDateArray["decr"] = {
				"h" : 00,
				"i" : 00
			};
		}
		else{
			var dateArray = {};
			for(var j=0;j< possibleMethods.length;j++) 
			{
				var regEx = "\^([+|-][0-9]+["+possibleMethods[j]+"])$";
				
				var pattern = new RegExp(regEx,"gmi");

				var found = split_by_space[i].match(pattern);
				if(found) {
					var dateChar 	= split_by_space[i].slice(split_by_space[i].length - 1).toLowerCase();
					var operator 	= split_by_space[i].slice(0, 1);
					var numericVal 	= split_by_space[i].slice(1, -1);
					if(dateChar == "h" || dateChar == "i"){
						delete newDateArray["incr"];
						delete newDateArray["decr"];
					}
					dateArray = {
							"op" 	: operator,
							"value" : numericVal
						};
					if(newDateArray[dateChar] ==  undefined){
						newDateArray[dateChar] = {};
					}
					newDateArray[dateChar] = dateArray;
					break;
				}
			}
		}	
	}
	return convertDate(newDateArray);
}

function convertDate(dateArray){
	if(!jQuery.isEmptyObject(dateArray)){
		var dateString = JSON.stringify(dateArray);
		var currentDate = new Date();
		var operators = {
				'+': function(a, b) { return parseInt(a) + parseInt(b) },
				'-': function(a, b) { return parseInt(a) - parseInt(b)},
			};
		$.each(dateArray, function(index,key){
			var opr = key.op;
			switch(index){
				case "d" : 
					currentDate.setDate(operators[opr](currentDate.getDate(), key.value));
					break;
				case "m" : 
					currentDate.setMonth(operators[opr](currentDate.getMonth() , key.value));
					break;
				case "y" : 
					currentDate.setYear(operators[opr](currentDate.getFullYear(), key.value));
					break;
				case "w" : 
					var weekDays = key.value * 7;
					currentDate.setDate(operators[opr](currentDate.getDate(), weekDays));
					break;
				case "h" : 
					currentDate.setHours(operators[opr](currentDate.getHours(), key.value));
					break;
				case "i" : 
					currentDate.setMinutes(operators[opr](currentDate.getMinutes(), key.value));
					break;
				case "s" : 
					currentDate.setSeconds(operators[opr](currentDate.getSeconds(), key.value));
					break;
				case "incr" : 
					currentDate.setHours(key.h);
					currentDate.setMinutes(key.i);
					break;
				case "decr" : 
					currentDate.setHours(key.h);
					currentDate.setMinutes(key.i);
					break;
			}
		});
		return currentDate;
	}
}

function setActionCookie(moduleCookie, keyType,setScreen){
	if(setScreen != ""){
		var cValue = setScreen+"-"+keyType;
	}else{
		var cValue = screenName+"-"+keyType;
	}
	//return setCookie(cValue, jsonStringify(moduleCookie));
}

function getActionCookie(keyType){
	var cValue = screenName+"-"+keyType;
	return getCookie(cValue);
}

function valueToStringArray(value){
	return jsonStringify($.makeArray(value.toString()));
}


/* function to get button icons */
function getButtonIcon(buttonType){
	var buttonConfig = {};
	switch(buttonType){
	case "edit" :
		buttonConfig = {
				 			"iconSrc" : "base/img/icons/" + buttonType+"-hover" + ".svg",
				 			"functionName" : "sendEditPage"
						};
		break;
	}
	return buttonConfig;
}

/*function callSaveAlert(){
if(saveAlertFlag == 1)
{
	/*getConfirmationAlert('Data you have entered may not be saved. Do you really want to continue?','conf-alert');
    $.blockUI({ message: $('#conf-alert'), css: { width: '275px' } });
    $('#conf-alert').find("#no").on("click",function(){
    	return false;
    });=========
	if(!confirm("Data you have entered may not be saved. Do you really want to continue?")){
		return false;
	}
}
}*/
function accordionCallSaveAlert(this_val){
	$("div[role=dialog]").remove();
	var editFormLength = $(document).find('.normal-form').length;
	if(editFormLength > 0){
		  var wrapperId = "accordionFormSaveAlert"; 
		  getConfirmationAlert("accordion_form_not_saved_alert_message",wrapperId);
		  
		  $.blockUI({ message: $('#conf-'+wrapperId), css: { width: '275px' } });
		  
		  $('#conf-'+wrapperId).find("#yes").on("click",function(){
			  $.unblockUI();
			  $(".normal-form").submit();
				  setTimeout(function(){
					  if(navigationAlert == 1){
						  $(this_val).trigger("click");
					  }
				  },1000);  
			  return true;
		  }); 
		  $('#conf-'+wrapperId).find("#no").on("click",function(){
			  $.unblockUI();
			  setTimeout(function(){
				  $(document).find('.normal-form').parents(".accordion-panel").find(".accordion-action-edit").trigger("click");
			  },1000);  
			  return false;
		  }); 
		  return false;
	} 
	return true;
}

function saveAlert(){
// On Input change set Flag to 1
$(document).delegate("input", "change", function() {
	//saveAlertFlag = 1;
});

// On click on any link - ask confirmation if Flag is changed 
$(document).delegate(".sidebar-link a,header nav a,header .user-profile-menu a,header .language a", "click",function(){
//	  return callSaveAlert($(this));
});

// On page refresh - ask confirmation if Flag is changed
/*window.onbeforeunload = function() {
	if(saveAlertFlag ==1)
		return "Data will be lost if you leave the page, are you sure?";
	
};*/
/*var myEvent = window.attachEvent || window.addEventListener;
var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compatable

myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
var confirmationMessage = '';  // a space
  (e || window.event).returnValue = confirmationMessage;
  return confirmationMessage;
});*/

}
function nearIndexTab(e){
	$(document).ready(function(){
		console.log($(e).html());
		console.log($(e).closest("*[tabindex]").val());
	});
}
function clearMessageWraper(){
	
	$(document).delegate("a[aria-label=close]", "click",function(){
		$(global_lightbox_wrapper).empty();
		$(global_lightbox_wrapper).fadeOut();  
	});
}

function resetSetEmptyFields(formWrapperId){
	$(formWrapperId).find(":input[id^=set_empty_]").each(function(){
		var elementName = $(this).attr("name").split("set_empty_")[1];
		if($(formWrapperId+" :input[name = '"+elementName+"']").data("type") == "select-one"){
			$(formWrapperId+" :input[name = '"+elementName+"']").prop('disabled', false).selectpicker('refresh');
		}
		$(formWrapperId+" :input[name = '"+elementName+"'],[data-name = '"+elementName+"']").removeAttr("disabled");
		$(formWrapperId+" [name = '"+elementName+"'],[data-name = '"+elementName+"']").parents(selector_p_r_5).removeClass("element-clear");
		//$(formWrapperId+" [name = '"+setEmptyFields+"'],[data-name = '"+setEmptyFields+"']").attr("checked",false);
		$(formWrapperId+" [name = '"+$(this).attr("name")+"'],[data-name = '"+$(this).attr("name")+"']").parents(".checkbox").show();
	});
}

function ucFirst(str){
	 var text = str.toLowerCase();
     var parts = text.split(' '),
         len = parts.length,
         i, words = [];
     for (i = 0; i < len; i++) {
         var part = parts[i];
         var first = part[0].toUpperCase();
         var rest = part.substring(1, part.length);
         var word = first + rest;
         words.push(word);

     }

     return words.join(' ');
}
function getValidFormat(dateString,curFormat,conFormat,isRange) {
	var value = "";
	if(dateString != undefined){
		if(isRange == "true" || isRange == true ){
			var value_1 = dateString.split(" TO ");
			if(moment(value_1[0],[curFormat],true).isValid() && moment(value_1[1],[curFormat],true).isValid()){
				var newDateValue_1 = getValidFormat(value_1[0],curFormat,conFormat);
				var newDateValue_2 = getValidFormat(value_1[1],curFormat,conFormat);
				value = newDateValue_1+" TO "+newDateValue_2;
			}
		}else{
			if(moment(dateString,[curFormat],true).isValid()){
				value =  moment(dateString,[curFormat]).format(conFormat);
			}
		}
		return value;
	}
}
/*function getValidFormat(dateString,curFormat,conFormat,isRange) {
	if(dateString != undefined){
		if(moment(dateString,[curFormat],true).isValid()){
			if(isRange == true){
				var value_1 = dateString.split(" TO ");
				var newDateValue_1 = getValidFormat(value_1[0],curFormat,conFormat);
				var newDateValue_2 = getValidFormat(value_1[1],curFormat,conFormat);
				var value = newDateValue_1+" TO "+newDateValue_2;
			}else{
				var value =  moment(dateString,[curFormat]).format(conFormat);
			}
			return value;
		}
	}
}*/
function datepickerLoad(){
	$('.datepicker-row input').daterangepicker({
		singleDatePicker: true,
		showDropdowns: true,
		timePicker: true,
		timePicker24Hour: true,
		//timePickerIncrement: 30,
		locale: {
			format: 'YYYY/MM/DD H:mm'
		}
	});
}
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function getImagePath(url,type)
{
	/*var noImage = type == "hover" ? "no-image-hover" : "no-image"; 
	if($.inArray(url,serverImages)  == -1 ){
		url = "base/img/icons/"+noImage+".svg";
	}*/
	return url;
}

$.urlParam = function(url,name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
    if (results==null){
       return null;
    }
    else{
       return decodeURIComponent(results[1]) || 0;
    }
}

function getResultCode(code){
//	code = code.toString();
	return code;//code.substr(0,1);
} 
function getSection(sectionObj,key){
	if(isSet(sectionObj)){
		for(var i = 0; i<sectionObj.length; i++)
		{
			  if(sectionObj[i].sectionKey == key){
				  return sectionObj[i];
			  } 
			  if(isSet(sectionObj[i].sectionConfig)){
				  getSection(sectionObj[i].sectionConfig,key);
			  } 
		}
	}
	return false;
}
function getEelement(sectionObj,key,flag){
	if(isSet(sectionObj)){
		for(var i = 0; i<sectionObj.length; i++)
		{
			
		  if(sectionObj[i].elementKey == key){
			  if(isSet(flag) && flag == 'multi'){
				  return sectionObj[i].defaultValue;
			  }else{
				  return sectionObj[i].defaultValue[0].value;
			  }
		  }
		}
	}
	return false;
}

function isIE(){
	
	 var ua = window.navigator.userAgent;
     var msie = ua.indexOf("MSIE ");
     if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) 
     {
        return true;
     }
     else  // If another browser, return 0
     {
         return false;
     }

}
function disableDoubleClick(){
	$(selector_right_panel).undelegate("a,button[type=submit],button[type=reset],input[type='submit'],input[type=button]","click");
	$(selector_right_panel).delegate("a,button[type=submit],button[type=reset],input[type='submit'],input[type=button]","click",function(){
		$("body").addClass("block-page");
		setTimeout(function(){
			$("body").removeClass("block-page");
		},850);
	});
	$(document).undelegate(".modal-dialog a,button[type=submit],button[type=reset],input[type='submit'],input[type=button]","click");
	$(document).delegate(".modal-dialog a,button[type=submit],button[type=reset],input[type='submit'],input[type=button]","click",function(){
		$("body").addClass("block-page");
		setTimeout(function(){
			$("body").removeClass("block-page");
		},850);
	});
}
languagePlugin(current_lang);

datePickerOnKeyUp();
clearMessageWraper();
//languagePlugin(current_lang);
onChangeTrim();
setUpperCaseValue();
saveAlert();