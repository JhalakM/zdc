var gridContext = "FILTER";
(function(filterActions, $, undefined) {
	filterActions.createFilter = function(accordionConfig){
		var ajaxObject = {
				"ajaxURL" : SetWebApiURL+'json/filter-config.json',
				"params" : {"pageId":current_moduleId},
				"successCallback" : function(data){
					if(getResultCode(data.resultCode) == CODE_SUCCESS){
						//function for generate filter functionality
						if(data.returnObject) { 
							var accordionConfig = $.extend({
								"id"    	    : "FILTER",
								"className"     : "app-action-form app-action-form-block",
								"title"         : i18NCall("filter.link.label"),
								"subContent":false
							},accordionConfig);
							
							baseFunctions.generateAccordion(accordionConfig,".panel-block-head-content");
							
							$('#'+"FILTER").dfilters({
						    	"gridConfig" 	: listGridDetails,
						    	"filterObject" 	: data.returnObject,
						    	"gridContext"	: gridContext
						    });
						}
					}
				},
				"failureCallback" : function(){},
				"wrapperId" 	  : gridContext,
				"loader" : true,
				"aSync" : true,
				"loaderWrapper" : "#"+gridContext
		};
		ajaxCallBack(ajaxObject);
	}
	filterActions.accordion_grid = function(accordions,contextParams,isFilter,dataScreen){
		   var accordionKey = accordions.accordionKey;
		   var accordionTitle = accordions.accordionTitle;
		   
		   if(isFilter == true){
			   var ajaxObject = {
				     "ajaxURL" : SetWebApiURL+'json/filter-config.json',
				     "params" : {"pageId":current_moduleId},
				     "successCallback" : function(data){
				    	 if(getResultCode(data.resultCode) == CODE_SUCCESS){
						       if(data.returnObject) { 
						         var accordionConfig_2 = {
						          "id"         	  : "FILTER",
						          "className"     : "app-action-form app-action-form-block",
						          "title"         : i18NCall("filter.link.label"),
						          "subContent"    : true,
						          "parentId"      : accordionKey
						         }
						         baseFunctions.generateAccordion(accordionConfig_2);
						         
						         $('#'+"FILTER").dfilters({
						             "gridConfig" : accordions.gridDetail,
						             "filterObject" : data.returnObject
						         });
					       }
					    }
				     },
				     "failureCallback" : function(){},
				     "wrapperId"    : gridContext,
				     "loader" : true,
				     "aSync" : true,
				     "loaderWrapper" : "#"+gridContext
				};
				ajaxCallBack(ajaxObject);
		   }
		}
	
})(window.filterActions = window.filterActions || {}, jQuery);