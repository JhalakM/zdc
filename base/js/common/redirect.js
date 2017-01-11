/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/


$(document).ready(function(){

		$("body").prepend('<div id="mask" class="maskfixed"><div id="loader"> </div></div>').fadeIn();
		var searchParams = window.location.search;
		var email=get('userName') ? get('userName') : "";
		var token=get('token') ? get('token') : "" ;
		var lang=get('lang') ? get('lang') : "";
		var flag = 0;
		
		if(email=="" || token == "" || lang== ""){
			flag=1;
			messageKey = "login_error";
		}
		if(flag == 1) { 
			window.location = "auth";
		}
		var dateStr = getTimeZoneID(new Date());
		if(email!='' && token!="" && lang != ''){
			
			var ajaxObject = {
					"ajaxURL" : SetWebURL+'security/auth-user',
					"aSync": true,
					"params" : {"userName":email,"token":token,"lang":lang, "timeZone" : dateStr  },
					"successCallback" : generateMsgBlockSuccess,
					"failureCallback" : function(){
						
					},
			};
			ajaxCallBack(ajaxObject);
		}
		
});

/** generate msg block success**/
function generateMsgBlockSuccess(json_data,status,xhr){
	
	var jsonString = jsonStringify(json_data);
	var obj = jsonParse(jsonString);
	//alert(jsonString);
	if(getResultCode(obj.resultCode) == CODE_SUCCESS){
		if(obj.returnObject.token != undefined && obj.returnObject.userName != undefined && obj.returnObject.lang != undefined){
			setCookie("token",obj.returnObject.token,1);
			setCookie("userName",obj.returnObject.userName,1);
			setCookie("lang",obj.returnObject.lang,1);	
			setCookie("gridMaxWidth",obj.returnObject.gridMaxWidth,1);	
		}
		if(getResultCode(obj.resultCode) != undefined && getResultCode(obj.resultCode)== CODE_SUCCESS){
			$(document).ajaxSend(function(event, jqXHR, ajaxOptions) {
				var myArray = {"token": getCookie("token"), "userName": getCookie("userName"), "lang" : getCookie("lang"), "gridMaxWidth" : getCookie("gridMaxWidth") };
			    jqXHR.setRequestHeader('Cookie', myArray);
			});
			window.location = SetWebURL+obj.returnObject.redirect;
		}
	}else{
		$("#mask").remove();
		getNormalAlert(obj.messageKey,"authenticate-error");
		$.blockUI({ message: $('#alert-authenticate-error'), css: { width: '275px' } });
		 $('#alert-authenticate-error').find("#ok").on("click",function(){
			 window.location = SetWebURL+obj.returnObject;
	    });
		
	}
}
