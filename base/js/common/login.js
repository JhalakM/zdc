/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

var screenName = "login";
$(document).ready(function(){

	$('#frmLogin').submit(function (event)
	{
		event.preventDefault();
		var email=$("input[name='email']").val();
		var pass=$("input[name='password']").val();
		var lang=$("[name='lang']").val();
		var site=$("[name='site']").val();
		var captcha_val = $('#captcha_input').val();
		var messageKey = "";
		var flag=0;
		if(email=='' && pass ==''){
			flag=1;
			messageKey = "login_error";
		}else if(email==''){
			flag=1;
			messageKey = "missing_user";
		}else if(pass == ''){
			flag=1;
			messageKey = "missing_password";
		}else if(lang == ''){
			flag=1;
			messageKey = "select_langauge_error";
		}else if(captcha_val == ''){
			flag=1;
			messageKey = "captcha_error";
		}
		/*else if(site == ''){
			flag=1;
			messageKey = "select_siteurl_error";
		}*/
		if(flag==1){
			generateMsg(1,messageKey,global_message_wrapper);
		}
		var dateStr = getTimeZoneID(new Date());
		if(email!='' && pass!="" && lang != ''){
			$("#frmLogin").find("[type=submit]").html('Please wait<img src="base/img/login-loading.gif">');
			var form_wrapper = '#frmLogin';
			var captcha_text = $(form_wrapper).find('#canvas').attr('data-val');
			var captcha_val = $(form_wrapper).find('#captcha_input').val();
			if(captcha_val != captcha_text){
				flag=1;
				messageKey = "captcha_incorrect_error";
				if(flag==1){
					generateMsg(1,messageKey,global_message_wrapper);
					$("#frmLogin").captchaWord();
					$("#frmLogin").find('#captcha_input').val('');
				}
				$("#frmLogin").find("[type=submit]").html('Login');
			}else{
				var ajaxObject = {
						"ajaxURL" : SetWebURL+'security/login',
						"params" : {"userName":email,"password":pass,"lang":lang,'siteCode':site ,"timeZone" : dateStr },
						"successCallback" : generateMsgBlockSuccess,
						"failureCallback" : function(){
							$("#frmLogin").find("[type=submit]").text("Login");
						},
				};
				ajaxCallBack(ajaxObject);
			}
			
		}
		
	});
	languagePlugin(current_lang);
	getHelpMessage();
	forgotPassword();
});

function forgotPassword(){
		$('.forgot-pwd-link').on('click',function(){
			
			window.location = SetWebURL + 'forgot-password';
		});
}
/** generate msg block success**/
function generateMsgBlockSuccess(json_data,status,xhr){
	var jsonString = jsonStringify(json_data);
	var obj = jsonParse(jsonString);// alert(generateMsgBlockSuccess);
	var siteName = "Global";
	
	if(isSet(obj.returnObject)) {
		if(isSet(obj.returnObject.siteName)) {
			siteName = obj.returnObject.siteName;
		}	
	}
	$(login_form_block_wrapper).find('.ui-alert').remove();
	
	if( getResultCode(obj.resultCode)  == CODE_SUCCESS){
		var gridMaxWidth = (obj.returnObject.gridMaxWidth == undefined)?900:obj.returnObject.gridMaxWidth;
		if(obj.returnObject.token != undefined && obj.returnObject.userName != undefined && obj.returnObject.lang != undefined){
			
			setCookie("token",obj.returnObject.token,1);
			setCookie("userName",obj.returnObject.userName,1);
			setCookie("lang",obj.returnObject.lang,1);	
			setCookie("siteName",siteName,1);	
			setCookie("gridMaxWidth",gridMaxWidth,1);
			setCookie("environment",obj.returnObject.environment,1);
			setCookie("version",obj.returnObject.version,1);
			setCookie("version",obj.returnObject.version,1);
			serverImages = obj.returnObject.serverImages;
		}
		if(getResultCode(obj.resultCode) != undefined && getResultCode(obj.resultCode) == CODE_SUCCESS){
			$(document).ajaxSend(function(event, jqXHR, ajaxOptions) {
				var myArray = {"token": getCookie("token"), "userName": getCookie("userName"), "lang" : getCookie("lang"), "gridMaxWidth" : getCookie("gridMaxWidth"), "version" : getCookie("version"), "environment" : getCookie("environment") };
			    jqXHR.setRequestHeader('Cookie', myArray);
			});
			window.location = SetWebURL+obj.returnObject.redirect;
		}
	}else{
		if(obj.returnObject == true){
			$("#frmLogin").captchaWord();
			$("#frmLogin").find('#captcha_input').val('');
		}
		$("#frmLogin").find("[type=submit]").html("Login");
		generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
	}
}
$(window).load(function() {

	dropdownScroll();
	languageDdAction("#frmLogin");
	setSiteUrlDropDown();
	
});
var msg = '';
function getHelpMessage(){
	var helpMessageURL = SetWebURL+'system/message';
	var ajaxObject = {
			"ajaxURL" : helpMessageURL,
			"params" : {"screenName":"login" },
			"successCallback" : function(obj){
				if(getResultCode(obj.resultCode) == CODE_SUCCESS){
					msg = obj.returnObject.systemMsg;
					version = obj.returnObject.version?obj.returnObject.version:" - ";
					environment = obj.returnObject.environment?obj.returnObject.environment:" - ";
					captcha = obj.returnObject.captcha?obj.returnObject.captcha:false;
					if(captcha){
						$("#frmLogin").captchaWord();
					}
					var versionBlock = '<p class="version">'+version+' <span class="right-side-text-login">'+environment+'</span> </p>';
					$(".logo-header").append(versionBlock);
					
					if(isSet(msg)) {
						var anchor = document.createElement(selector_a);
						$(anchor).addClass('info-msg-link');
						$(anchor).html(msg);
						
						var maintenaneMsgHTML = $(maintenance_message);
						maintenaneMsgHTML.find("p.alert-msg").html(anchor);
						$('.login-form-block').prepend(maintenaneMsgHTML);
						informationPopUp();
						
					}
					var helpURL = obj.returnObject.helpUrl;
					callHeaderURL(helpURL,".reference-links a.home-help-call");	
				}
			},
			"failureCallback" : function(){
			},
	};
	ajaxCallBack(ajaxObject);
}

// Site url drop down in login page 
function setSiteUrlDropDown(){
	var ajaxObject = {
			"ajaxURL" : SetWebURL+'system/sites',
			"params" : {"screenName":"login" },
			"successCallback" : function(obj){
				if(getResultCode(obj.resultCode) == CODE_SUCCESS && obj.returnObject){
					var  site_val = obj.returnObject;
					for(var i=0; i<site_val.length;i++){
						var selectedValue = '';
						if(site_val[i].override == true ){
							selectedValue = true;
						}else{
							selectedValue = false;
						}
						var liClone = document.createElement("option");
						$(liClone).attr({
							"value" : site_val[i].siteCode,
							"selected" : selectedValue
						}).html(site_val[i].siteName);
						$('#site').append(liClone);
					}
					$('#site').selectpicker();
				}
			},
			"failureCallback" : function(){
			},
	};
	ajaxCallBack(ajaxObject);
}

function informationPopUp(){
	$('body').on("click",".info-msg-link",function(){
		$(batchupdate_form_block_selecter).remove();
		getModalPopUp(batchupdate_lightbox_block);
		setTimeout(function(){
			$(batchupdate_form_block_selecter).find(".modal-title").html(system_message);
			$(batchupdate_form_block_selecter).find('.modal-batchupdate-form-content').html(msg);
		},500);
	});
}


//$("#frmLogin").captchaWord();
$(document).delegate('.refresh-captcha','click',function(){
	$("#frmLogin").captchaWord();
	$("#frmLogin").find('#captcha_input').val('');
});

