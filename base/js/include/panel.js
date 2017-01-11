(function(basePanel, $, undefined) {
	basePanel.moduleArray 	= {
		  	  "list": {
		  		 "pageKey": "user",
                 "pageName": "list",
                 "gridKey" : "USER-GRID"
			  }
	};
	basePanel.generatePanelAjax = function(generateSuccessCallback){
		
		screenName = basePanel.moduleArray.list.pageKey;
		pageName = basePanel.moduleArray.list.pageName;
		
		if(!generateSuccessCallback){
			generateSuccessCallback = "basePanel.generateModule";
		}
		if(isSet(pageConfigrationObject.url)){
			SetWebApiURL	= SetWebApiURL+pageConfigrationObject.url ;
		}else{
			SetWebApiURL	= SetWebApiURL;
		}
		
		var scrnName = get("screenname");
		//if(cookieToken){
			var ajaxObject = {
					"ajaxURL" : SetWebApiURL+'json/page-configuration.json',
					"params" : {"pageKey" :screenName,"pageName":pageName,"screenname" :scrnName},
					"aSync"  : false,
					"successCallback" : generateSuccessCallback,
					"failureCallback" : generateFailure,
			};
			ajaxCallBack(ajaxObject);
		//}
		
	}
	basePanel.generateRightPanel = function(){
		$(selector_right_panel).remove();
		$(selector_content_section).append(right_panel);
	},
	basePanel.generateBreadCrumb = function(response_object){
		
		if(response_object.breadcrumbs)
		{
			var breadcrumb_object = response_object.breadcrumbs;
			
			var breadcrumbs = breadcrumb_object.levels;
			var breadcrumb_html = '';
			
			if(breadcrumbs.length > 0)
			{
				for(var i=0;i<breadcrumbs.length;i++)
				{
					var breadcrumb = breadcrumbs[i];
					var labelKey   = i18NCall(breadcrumb.labelKey);
					
					var link   	   = breadcrumb.link;
					if(link != undefined && link != '')
					{
						breadcrumb_html += '<li class="bred_pan"><a href="'+link+'">'+labelKey+'</a></li>';
					}
					else
					{
						breadcrumb_html += '<li class="bred_pan">'+labelKey+'</a>';
					}
				}
			}
			$(".bradcrum-menu ul").html(breadcrumb_html);
		}		
	},
	basePanel.generatePanel = function(response_object)
	{ 
		var panel_config  = response_object.panelConfig;
		var panel_icon	  =	panel_config.icon;
		var panel_title   =	i18NCall(panel_config.title,panel_config.titleParams);
		var panel_actions = (isSet(panel_config.actions))?panel_config.actions:"";
		var favourites  	  = response_object.favourites;
		
		$("html").find("title").text(i18NCall('zodiac.lable')+" - "+panel_title);
		
		var icon = getImagePath("base/img/icons/"+panel_icon,"panel");
		// HTML generation for panel icon
//		panel_icon ? $(panel_heading_icon).appendTo(panel_head_wrapper).find('img').attr({"src":"base/img/icons/"+panel_icon}) : '';
		panel_icon ? $(panel_heading_icon).appendTo(panel_head_wrapper).find('img').attr({"src":icon}) : '';
		
		// HTML generation for panel title
		panel_title ? $(panel_heading_title).text(panel_title).appendTo(panel_head_wrapper) : '';
		
		$(panel_actions_group).appendTo(panel_head_wrapper);
		
		// HTML generation for panel actions
		var panel_actions_group_html = '';

		if(isSet(panel_actions.addRecord)){
			var panelAddRecords = panel_actions.addRecord;
			panelAddRecords = $.extend({
				"setClass" : "add-action",
				"setRel"   : "app-action-form-addmore",
				"setText"  : i18NCall("add.link.label")
			},panelAddRecords);
			panel_actions_group_html += basePanel.setPanelActionAttr(panelAddRecords);
			baseFunctions.generateAddRecords(); 
		}
		
		if(isSet(panel_actions.listRecords)){
			var panelListRecords = panel_actions.listRecords;
			panelListRecords = $.extend({
				"setClass" : "list-action",
				"setRel"   : "app-action-form-listview",
				"setText"  : i18NCall("list.link.label")
			},panelListRecords);
			panel_actions_group_html +=  basePanel.setPanelActionAttr(panelListRecords);
			baseFunctions.generateListRecords();
		}
		
		//generate apply-actions
	 	if(panel_actions.detailActions)
	 	{
			detail_actions_html = $(panel_icon_action_link);
			detail_actions_html.attr({
				"href" :"javascript:void(0);",		
			}).addClass("detail-action drop-btn-popup");
				
			panel_actions_group_html +=  detail_actions_html.prop("outerHTML");
			baseFunctions.generateDeatilAction(panel_actions.detailActions);
	 	}
		
		if(isSet(panel_actions_group_html)){
			$(panel_actions_group_html).appendTo(panel_block_actions_wrapper);
			
			$(panel_head_wrapper).append(panel_actions_group_mobile);
			$(".mobile-action-grp-btn .grid-specific").find(".app-action-group").html(panel_actions_group_html);
			$(".mobile-action-grp-btn .grid-specific").find("p").text(i18NCall('grid.specific.action.title'));
		}
		if(isSet(favourites) && favourites != []){
			basePanel.headerFavorites(favourites);
		}
	},
	basePanel.headerFavorites = function(favorites){
		var randerHtml = "";
		for(var f=0; f<favorites.length; f++){
			var favLi = $(fav_li);
			$(favLi).addClass(favorites[f].li_class);
			$(favLi).find("img").attr("src","base/img/icons/"+favorites[f].a_icon);
			$(favLi).find("a").attr({
				"calss" : favorites[f].a_class,
				"href"  : favorites[f].a_href,//"javascript:;",
				"data-url"  : favorites[f].a_href,
				"title" : favorites[f].a_tooltip,
				"data-order" : favorites[f].dispOrder,
				"data-isAjaxReq" : favorites[f].isAjaxReq,
				"data-isNewWindow" : favorites[f].isNewWindow
			}).append(i18NCall(favorites[f].a_tooltip));
			randerHtml += $(favLi).prop("outerHTML");
		}
		$(".fav-icon .dropdown-menu").html(randerHtml);
	},
	basePanel.appActionBlock = function() {
	     $(".drop-btn-panel").click(function() {
	         $(".mobile-action-grp-btn").slideToggle();
	     });
	     $(document).delegate(".mobile-action-grp-btn .action-grp", "mouseleave", function() {
	   $(document).find(".mobile-action-grp-btn").hide();
	  });
	     $(document).delegate(".mobile-action-grp-btn .app-action-group  a", "click touchend", function() {
	      $(document).find(".mobile-action-grp-btn .action-grp").trigger("mouseleave");
	     });
	 },
	/* function to set parameter for panel action icons */
	basePanel.setPanelActionAttr = function(panelActions){
		if(panelActions.isState){
			panel_actions_group_html = $(panel_icon_action_link);
			
			panel_actions_group_html.attr({
				"data-openUrl" :  panelActions.openUrl,
				"data-openType" : panelActions.openType,
				"data-rel" : panelActions.setRel,
				"data-tooltip" : (isSet(panelActions.tooltipKey))?i18NCall(panelActions.tooltipKey):panelActions.setText,
				"href" :"javascript:void(0);",		
			}).addClass(panelActions.setClass).text(panelActions.setText);
				
			return panel_actions_group_html.prop("outerHTML");
		}
	},
	basePanel.setSystemMessage = function(systemMessage){
		if(isSet(systemMessage)) {
			var maintenaneMsgHTML = $(maintenance_message);
			maintenaneMsgHTML.find("p.alert-msg").text(i18NCall(systemMessage));
			$(selector_content_section).find(".right-panel").prepend(maintenaneMsgHTML);
		}
	}
	
	basePanel.commonBody = function(response_module){
		  //generateBlockUI("body");
		  
		  var json_response  = jsonParse(jsonStringify(response_module));

		  //changed because changed json formate
		  var response_object="";
		  if(typeof json_response.returnObject != "undefined"){
		   response_object  = json_response;
		   
		   //add screen name as a class in body
		   $("body").addClass(screenName.toLowerCase());
		   
		  }else{
		   return false;
		  }
		  
		  if(response_object.returnObject.helpKey != undefined){
		   //execute help page functionality
		   var helpURL = response_object.returnObject.helpKey;
		   callHeaderURL(helpURL,".navbar-nav a.help-call");
		  }else{
		   $(".navbar-nav a.help-call").click(function(){
		    var wrapperId = "help_url"
		    getNormalAlert('no.help.found',wrapperId);
		    $.blockUI({ message: $('#alert-'+wrapperId), css: { width: '275px' } });
		   });
		  }
		  
		  if(response_object.returnObject.zodiacKey != undefined){
		   //execute about us page functionality
		   var helpURL = response_object.returnObject.zodiacKey;
		   callHeaderURL(helpURL,".navbar-nav a.about-us");
		  }else{
		   $(".navbar-nav a.about-us").click(function(){
		    var wrapperId = "help_url"
		    getNormalAlert('no.help.found',wrapperId);
		    $.blockUI({ message: $('#alert-'+wrapperId), css: { width: '275px' } });
		   });
		  }
		  
		  //generate system message function
		  var systemMessage = response_object.returnObject.systemMsg;
		  if(systemMessage != undefined || !isEmpty(systemMessage)){
		   basePanel.setSystemMessage(systemMessage);
		  }
		  //get default configuration settings
		  if(response_object.returnObject.appSettings != undefined){
		   defaultSettings = response_object.returnObject.appSettings;
		  }
		  
		   response_object  = json_response.returnObject;
		   current_moduleId = response_object.pageId;
		   gridDetails = response_object.gridDetails != undefined ? response_object.gridDetails : []; 
		 }
	
	basePanel.actionBtnHeight = function() {
		  if ($(window).width() >= 568) {

		   $(".app-action-group" + " a").css("height",
		     $(".panel-block-heading ").height() + 10 + "px"), $(window)
		     .resize(
		       function() {
		        $(".app-action-group a").css(
		          "height",
		          $(".panel-block-heading ").height() + 10
		            + "px")
		       });
		   $(".app-action-group a").css("line-height",
		     $(".panel-block-heading ").height() + 10 + "px"), $(window)
		     .resize(
		       function() {
		        $(".app-action-group a").css(
		          "line-height",
		          $(".panel-block-heading ").height() + 10
		            + "px")
		       });
		   $(".panel-block-head").css("height",
		     $(".panel-block-heading ").height() + 11 + "px"), $(window)
		     .resize(
		       function() {
		        $(".panel-block-head").css(
		          "height",
		          $(".panel-block-heading ").height() + 11
		            + "px")
		       });
		  }
		  if ($(window).width() <= 568) {

		   $(".action-arrow a").css("height",
		     $(".panel-block-heading ").height() + 10 + "px"), $(window)
		     .resize(
		       function() {
		        $(".action-arrow a").css(
		          "height",
		          $(".panel-block-heading ").height() + 10
		            + "px")
		       });
		   $(".action-arrow a").css("line-height",
		     $(".panel-block-heading ").height() + 10 + "px"), $(window)
		     .resize(
		       function() {
		        $(".action-arrow a").css(
		          "line-height",
		          $(".panel-block-heading ").height() + 10
		            + "px")
		       });
		   $(".action-grp").css("top",
		     $(".panel-block-heading ").height() + 10 + "px"), $(window)
		     .resize(
		       function() {
		        $(".action-grp").css(
		          "10",
		          $(".panel-block-heading ").height() + 10
		            + "px")
		       });
		  }
	}
	basePanel.mobileScreenIcons = function(){
		  $(".mobile-action-grp-btn .app-specific").find(".app-action-group .manage-col").remove();
		  $(".mobile-action-grp-btn .app-specific").hide();
		  var findLength = $(".mobile-action-grp-btn .app-specific").find(".app-action-group .grid-action-group a").length;
		  if(findLength > 0){
		   $(".mobile-action-grp-btn .app-specific").find("p").text(i18NCall('application.specific.action.title'));
		   $(".mobile-action-grp-btn .app-specific").show();
		  }
	}
	basePanel.createFilter = function(listGridDetails,accordionConfig){
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
	},
	basePanel.createGrid = function(listGridDetails){
		//call pagination api
		var gridContext = listGridDetails.gridDispKey+"-"+listGridDetails.gridKey;
		var ajaxObject = {
				"ajaxURL" : SetWebApiURL+'json/page-details.json',
				"params" : {"pageNo" :1, "recordsPerPage" : 25, "currentPage" : 1,"pageId":current_moduleId, "gridName": listGridDetails.gridDispKey , "gridKey": listGridDetails.gridKey },
				"successCallback" : function(obj){
					baseGridActions.generateGridSuccess(obj,gridContext,current_zodiac+"GridActions");
				},
				"failureCallback" : generateFailure,
				"wrapperId" 	  : gridContext,
				"loader" : true,
				"aSync" : true,
				"loaderWrapper" : "#"+gridContext
		};
		ajaxCallBack(ajaxObject);	
	}
	
	basePanel.generateModule = function(response_module){
		basePanel.commonBody(response_module);

		//execute right sidebar panel
		basePanel.generateRightPanel();
		//function will be execute screen wise
		var json_response		= jsonParse(jsonStringify(response_module));
		/*if(typeof window["coreFunctions"]["generate_"+getFucnName] != "undefined"){
			window["coreFunctions"]["generate_"+getFucnName](json_response);
		}*/
		
		if(isSet(json_response.returnObject.accordionConfigs)){
	 		// set accordionConfigs array is defined in variable.js 
	 		accordionConfigs = {
	 				"accordion":json_response.returnObject.accordionConfigs,
	 				"contextParams":json_response.returnObject.contextParams?json_response.returnObject.contextParams:[]
	 		};
	 	}
		
		//generate breadcrubs panel
	 	basePanel.generateBreadCrumb(json_response.returnObject);
	 	basePanel.generatePanel(json_response.returnObject);
		
		  gridKeyConfig = basePanel.moduleArray.list.gridKey;
		  var listGridDetails = baseFunctions.getGridValue(gridKeyConfig);
		  if(listGridDetails){
			  basePanel.createFilter(listGridDetails);
			  basePanel.createGrid(listGridDetails);
		  }
	}
	
	
})(window.basePanel = window.basePanel || {}, jQuery);