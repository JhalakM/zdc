 
(function(commonDashboard, $, undefined) {
 
  commonDashboard.moduleArray 	= {
  	  "list": {
  		 "pageKey": "home",
  		 "functionName" : "dashboard",
	  }
  };
  commonDashboard.generateModule  = function(response_module)
  {
		basePanel.commonBody(response_module);
	
		var json_response		= jsonParse(jsonStringify(response_module));
		
		if(typeof json_response.returnObject.homeConfig != "undefined"){
			baseFunctions.generate_dashboard(json_response);
			baseFunctions.redirectDesktopZodiac();
			if(json_response.returnObject.homeConfig.length == 0){
				generateMsg(1,"dashboard.empty",global_message_wrapper);
			}
		}
		
		//generate breadcrubs panel
	 	basePanel.generateBreadCrumb(json_response.returnObject);
	 	basePanel.generatePanel(json_response.returnObject);
  }
})(window.commonDashboard = window.commonDashboard || {}, jQuery);