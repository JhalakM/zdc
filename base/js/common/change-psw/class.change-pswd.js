/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/  

(function(commonChangePsw, $, undefined) {
	 
	  commonChangePsw.moduleArray 	= {
			  	  "list": {
			  		 "pageKey": "change-password",
					 "pageName": "changepassword",
				  }
	  }
	  commonChangePsw.generateModule  = function(response_module)
	  {
			basePanel.commonBody(response_module);
			
			//execute right sidebar panel
			basePanel.generateRightPanel();
			
			var json_response		= jsonParse(jsonStringify(response_module));
			
			baseFunctions.generate_changePassword(json_response);
			
			//generate breadcrubs panel
		 	basePanel.generateBreadCrumb(json_response.returnObject);
		 	basePanel.generatePanel(json_response.returnObject);
	  }
})(window.commonChangePsw = window.commonChangePsw || {}, jQuery);