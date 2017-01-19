var gridDetailsConfig = [];
(function(filterActions, $, undefined) {
	filterActions.createFilter = function(listGridDetails,accordionConfig){
		var gridContext = listGridDetails.gridDispKey+"-"+listGridDetails.gridKey;
		var ajaxObject = {
				"ajaxURL" : SetWebApiURL+'json/filter-config.json',
				"params" : {"pageId":current_moduleId, "gridKey": listGridDetails.gridKey },
				"successCallback" : function(data){
					if(getResultCode(data.resultCode) == CODE_SUCCESS){
						//function for generate filter functionality
						if(data.returnObject) { 
							var accordionConfig = $.extend({
								"id"    	    : "FILTER-"+gridContext,
								"className"     : "app-action-form app-action-form-block",
								"title"         : i18NCall("filter.link.label"),
								"filterContext" : gridContext,
								"subContent":false
							},accordionConfig);
							
							baseFunctions.generateAccordion(accordionConfig,".panel-block-head-content");
							
							$('#'+"FILTER-"+gridContext).dfilters({
						    	"gridConfig" 	: listGridDetails,
						    	"filterObject" 	: data.returnObject,
						    	"gridContext"	: gridContext,
						    	"setNamespace"  :current_zodiac+"GridActions"
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
		   var gridDispKey = accordions.gridDetail.gridDispKey;
		   var gridKey = accordions.gridDetail.gridKey;
		   var accordionKey = accordions.accordionKey;
		   var accordionTitle = accordions.accordionTitle;
		   var gridContext = gridDispKey+"-"+gridKey;
		   
		   if(isFilter == true){
			   var ajaxObject = {
				     "ajaxURL" : SetWebApiURL+'json/filter-config.json',
				     "params" : {"pageId":current_moduleId, "gridKey": gridKey },
				     "successCallback" : function(data){
				    	 if(getResultCode(data.resultCode) == CODE_SUCCESS){
						       if(data.returnObject) { 
						         var accordionConfig_2 = {
						          "id"         	  : "FILTER-"+gridContext,
						          "className"     : "app-action-form app-action-form-block",
						          "title"         : i18NCall("filter.link.label"),
						          "subContent"    : true,
						          "parentId"      : accordionKey,
						          "filterContext" : gridContext
						         }
						         baseFunctions.generateAccordion(accordionConfig_2);
						         
						         $('#'+"FILTER-"+gridContext).dfilters({
						             "gridConfig" : accordions.gridDetail,
						             "filterObject" : data.returnObject,
						             "gridContext": gridContext
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
		   
	    //call pagination api
         var ajaxObject = {
           "ajaxURL" : SetWebApiURL+'page-details',
           "params" : {"pageNo" :1, "recordsPerPage" : 25, "currentPage" : 1,"pageId":current_moduleId, "gridName": gridDispKey , "gridKey": gridKey },
           "successCallback" : function(obj){
	            var panelBlock = $(panel_grid_main_block).attr({"id" : gridContext,"data-screen":dataScreen,"data-gridDispKey":gridDispKey,"data-gridKey": gridKey});
	            $("#"+accordionKey).find(".accordion-content:first").append($(panelBlock).prop("outerHTML"))
	            coreGridActions.generateGridSuccess(obj,gridContext);
           },
           "failureCallback" : generateFailure,
           "wrapperId"    : gridContext,
           "loader" : true,
           "aSync" : true,
           "loaderWrapper" : "#"+gridContext
         };
         ajaxCallBack(ajaxObject);
	}
	
})(window.filterActions = window.filterActions || {}, jQuery);