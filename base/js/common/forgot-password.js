/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

$(document).ready(function(){

	$('#frmForgot').submit(function (event)
	{
		event.preventDefault();
		var email		= $("input[name='email']").val();	
		var userId	= $("input[name='userId']").val();
		var captcha_val = $('#captcha_input').val();
		var messageKey = "";
		var flag=0;
		
		if(userId == '' && email == ''){
			
			flag=1;
			messageKey = "validate.user_email.message";
		}else if(userId == ''){
			flag=1;
			messageKey = "forgot_user_error";
		}else if(email==''){
			flag=1;
			messageKey = "forgot_email_error";
		}else if(email != "" && !isValidEmail(email) ){
			flag=1;
			messageKey = "validate.email.message";
		}else if(captcha_val == ''){
			flag=1;
			messageKey = "captcha_error";
		}
		if(flag==1){
			generateMsg(1,messageKey,global_message_wrapper);
		}
		var dateStr = getTimeZoneID(new Date());
		if(flag == 0){
			$("#frmForgot").find("[type=submit]").html('Please wait<img src="img/login-loading.gif">');
			var form_wrapper = '#frmForgot';
			var captcha_text = $(form_wrapper).find('#canvas').attr('data-val');
			var captcha_val = $(form_wrapper).find('#captcha_input').val();
			if(captcha_val != captcha_text){
				flag=1;
				messageKey = "captcha_incorrect_error";
				if(flag==1){
					$("#frmForgot").captchaWord();
					$("#frmForgot").find('#captcha_input').val('');
					generateMsg(1,messageKey,global_message_wrapper);
				}
				$("#frmForgot").find("[type=submit]").html('Submit');
			}else{
				var ajaxObject = {
						"ajaxURL" : SetWebURL+'security/reset-password',
						"params" : {"userId":userId,"email":email},
						"successCallback" : generateMsgBlockSuccess,
						"failureCallback" : function(){
							$("#frmForgot").find("[type=submit]").text("Submit");
						},
				};
				ajaxCallBack(ajaxObject);
			}
			
		}
		
	});
	$('body').on('click','[type=reset]',function(){
		resetData();
	});
});

/** generate msg block success**/
function generateMsgBlockSuccess(json_data,status,xhr){
	var jsonString = jsonStringify(json_data);
	var obj = jsonParse(jsonString);
	$(login_form_block_wrapper).find('.ui-alert').remove();
	$("#frmForgot").captchaWord();
	$("#frmForgot").find('#captcha_input').val('');
	generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
	if(getResultCode(obj.resultCode) == CODE_SUCCESS){
		$("#frmForgot")[0].reset();
	}
	$("#frmForgot").find("[type=submit]").text("Submit");
}

$("#frmForgot").captchaWord();
$(document).delegate('.refresh-captcha','click',function(){
	$("#frmForgot").captchaWord();
	$("#frmForgot").find('#captcha_input').val('');
});
$(window).load(function() {
	dropdownScroll();
});