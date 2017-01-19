/*
|@author : Intech Creative Services
|@desc   : Function which are need to use on grid level.
*/

$(document).ready(function(){
		checkAuthentication();
		$(filtered_criteria_wrapper).hide();
		$(filter_wrapper).hide();
		$(window).resize(baseGridActions.checkWidth);
});

(function(baseGridActions, $, undefined) {
	
	/* get pagination details */
	baseGridActions.getPageDetails =  function(ajaxParams) {
		var gridkey = $("#"+ajaxParams.wrapperId).attr("data-gridkey")?$("#"+ajaxParams.wrapperId).attr("data-gridkey"):listGridDetails.gridKey;
		var griddispkey = $("#"+ajaxParams.wrapperId).attr("data-griddispkey")?$("#"+ajaxParams.wrapperId).attr("data-griddispkey"):listGridDetails.gridDispKey;
		var gridContext = griddispkey+"-"+gridkey;
		var ajaxObjectPagination = {
				"ajaxURL" : ajaxParams.ajaxURL,
				"params" : {"pageNo" :ajaxParams.pageNo, "recordsPerPage" : ajaxParams.recordsPerPage, "currentPage" : ajaxParams.currentPage ,"pageId":current_moduleId,"gridKey":gridkey,"gridName" : griddispkey},
				"successCallback" : function(obj){
					baseGridActions.generateGridSuccess(obj,gridContext,current_zodiac+"GridActions");
				},
				"failureCallback" : generateFailure,
				"wrapperId" : ajaxParams.wrapperId,
				"loader" : true,
				"loaderWrapper" : panel_grid_wrapper
		};
		// Call Sorting API & Regenerate GRID
		ajaxCallBack(ajaxObjectPagination);
	},

	/* function for generate grid */
	baseGridActions.generateGridSuccess =  function(json_data,wrapperId,selectedNamespace) {
		if(getResultCode(json_data.resultCode) == CODE_SUCCESS) {
			if($("#"+wrapperId).length == 0){
				$(panel_grid_main_wrapper).attr({"id" : wrapperId});
			}
			var gridObject = json_data.returnObject;
			// Filtered data
			if(gridObject.filteredData != undefined)
			{
				var filteredData  = gridObject.filteredData;
				var filteredTitle = i18NCall(filteredData.filteredKey);
				var filteredDesc  = filteredData.filteredCriteria;
				var filteredParams  = filteredData.filterParams;
				if(filteredParams.length > 0 ){
					$.each(filteredParams,function( index, value ){
						filteredDesc = filteredDesc.replace(value,i18NCall(value));
					});
				}

				$("[data-filter-context = '"+wrapperId+"' ]").children(".accordion").find(".accordion-panel").removeClass("active");
				$("[data-filter-context = '"+wrapperId+"' ]").children(".accordion").find(".accordion-content").slideUp();
				$("[data-filter-context = '"+wrapperId+"' ]").siblings(filtered_criteria_wrapper).show();
			//	$("[data-filter-context = '"+wrapperId+"' ]").siblings(filtered_criteria_wrapper).find(filtered_criteria_label).text(filteredTitle);
				$("[data-filter-context = '"+wrapperId+"' ]").siblings(filtered_criteria_wrapper).find(filtered_criteria_text).html(filteredDesc);
			}
			$("#"+wrapperId).customGrid({
				gridRecords: gridObject,
				setNamespace : selectedNamespace
			});
		}else{
			generateMsg(json_data.resultCode,json_data.messageKey,global_message_wrapper,"",json_data.responseDetail);
		}
	},

	/* function for set html and callback for grid actions */
	baseGridActions.getGridActions =  function(gridActions,self,totalRecords,accordionGrid,selectedNamespace) {
		
		var elementId = $(self).attr("id");
		var getHTML = "";
		var actionReturnObj = baseGridActions.getCountOfAction(gridActions);
		var additionalParams = {
			"totalRecords" : totalRecords,
			"setElementId" : elementId,
			"actionReturnObj" : actionReturnObj,
			"selectedNamespace":selectedNamespace
		};
		if(isSet(gridActions.normalActions)){
			getHTML = baseGridActions.setGridActionAttr(gridActions.normalActions,additionalParams,"#"+elementId);
		}
		
		if(actionReturnObj.outputTotalActions > 0 || actionReturnObj.commandTotalActions > 0){
			var allActions = {
				      "actionName": "allAction",
				      "isState": true,
				      "openType": "popUp",
				      "tooltipKey" : "all.actions.link.label"
				    };
			var className = allActions.actionName.replace("Action", "-action");
			var grid_actions_group_link = $(grid_icon_action_link);
			
			grid_actions_group_link.attr({
				"data-openUrl"  :  allActions.openUrl,
				"data-openType" : allActions.openType,
				"data-tooltip"  : i18NCall(allActions.tooltipKey),
				"href" :"javascript:void(0);",		
				"data-gridKey" : elementId+"-action-popup"
			}).addClass(className.toLowerCase()).text(i18NCall(allActions.tooltipKey));
			
			getHTML +=  grid_actions_group_link.prop("outerHTML");
			
			baseGridActions.getSubGridActions(gridActions,additionalParams,"#"+elementId);
		}
		
		if(getHTML){
			
			getHTML = $(grid_actions_wrapper).append(getHTML);
			if(isSet(accordionGrid)){
				setTimeout(function(){
					$("#"+elementId).prepend($(getHTML).prop("outerHTML"));
				},10);
			}else{
				$("#"+elementId).find(pagination_top_wrapper).append($(getHTML).prop("outerHTML"));
				$(".mobile-action-grp-btn .app-specific").find(".app-action-group").html($(getHTML).prop("outerHTML"));
			}
		}
	},
	
	/* function to generate sub menu in all action in grid*/

	baseGridActions.getSubGridActions =  function(subMenuActions,additionalParams,elementId) {
		
		$(document).undelegate(".all-action","click touchend");
		$(document).delegate(".all-action","click touchend", function(){
			var dynamicPopUpId = $(this).attr("data-gridkey");
			
			if($("#"+dynamicPopUpId).length > 0){
				$("#"+dynamicPopUpId).remove();
			}
			
			var actionReturnObj = additionalParams.actionReturnObj;
			
			var subMenuHTML = "";
			var getMainHTML = $(grid_all_action_submenu_block);
			getMainHTML.attr("id",dynamicPopUpId);
			if(actionReturnObj.outputTotalActions > 0){
				var subMenuHTML_1 = $(grid_all_action_submenu_title_block);
				subMenuHTML_1.find(".action-title").html(i18NCall("action.output.label"));
				var subGridActionHTML_1 = baseGridActions.setSubGridActionAttr(subMenuActions.outputActions,additionalParams,elementId);
				subMenuHTML_1.find(".owl-carousel").append(subGridActionHTML_1);
				subMenuHTML += $(subMenuHTML_1).prop("outerHTML");
			}
			
			if(actionReturnObj.commandTotalActions > 0){
				var subMenuHTML_2 = $(grid_all_action_submenu_title_block);
				subMenuHTML_2.find(".action-title").text(i18NCall("action.command.label"));
				var subGridActionHTML_2 = baseGridActions.setSubGridActionAttr(subMenuActions.commandActions,additionalParams,elementId);
				subMenuHTML_2.find(".owl-carousel").append(subGridActionHTML_2);
				subMenuHTML += $(subMenuHTML_2).prop("outerHTML");
			}
			getMainHTML.find(".action-box").append(subMenuHTML);
			
			// for top of popup radio button 
			
			var wrapperId = additionalParams.setElementId;
			var gridkey = $("#"+wrapperId).attr("data-gridkey")?$("#"+wrapperId).attr("data-gridkey"):listGridDetails.gridKey;
			var griddispkey = $("#"+wrapperId).attr("data-griddispkey")?$("#"+wrapperId).attr("data-griddispkey"):listGridDetails.gridDispKey;

			var actionRadio = $(action_select_records);
			var filteringHTML = $("div[data-filter-context='"+griddispkey+"-"+gridkey+"']").siblings(".searched-criteria").find(".searched-criteria-text").html();
			$(actionRadio).find("#radio").attr("disabled",true);
			$(actionRadio).find("#radio1").attr("disabled",true);
			
			var countSelectedCheckbox = $("#"+wrapperId).find(".table-record .checkbox input[type='checkbox']:checked").not("#check-all").length;
			if(countSelectedCheckbox > 0){
				$(actionRadio).find("#radio1").prop("checked",true);
				$(actionRadio).find("#radio1").attr("disabled",false);
				
			}else if(countSelectedCheckbox == 0 && filteringHTML !=""){
				actionRadio.find(".searched-criteria-text-popup").html(filteringHTML);
				$(actionRadio).find("#radio").prop("checked",true);
				$(actionRadio).find("#radio").attr("disabled",false);
			}
			
			if(countSelectedCheckbox > 0 && filteringHTML !=""){	
				actionRadio.find(".searched-criteria-text-popup").html(filteringHTML).addClass("hide");
				$(actionRadio).find("#radio").attr("disabled",false);
				$(actionRadio).find("#radio1").attr("disabled",false);
			}
			getMainHTML.find(".action-box").prepend(actionRadio);
			//End for top of popup radio button
			
			getModalPopUp(getMainHTML);
			baseGridActions.closeActionPopUp(dynamicPopUpId);
			setTimeout(function(){
				baseGridActions.subGridCarouselMenu();
			},300);
			$('body').css("padding-right", "0px");
			
		});
		
		$(document).on("change","input[name='selectRecordAction']",function(){
		    $(".searched-criteria-text-show").addClass("hide");
			$(".searched-criteria-text-show").removeClass("show");
			if($(this).val() == 1){
			   if($(this).is(":checked") == true){
			     $(".searched-criteria-text-show").addClass("show");
				 $(".searched-criteria-text-show").removeClass("hide");
			   }
			}
		});
		
	},

	/* function to set parameter for grid action icons */

	baseGridActions.setGridActionAttr =  function(gridActions,additionalParams,elementId) {
		var grid_actions_group_link = "";
		var grid_actions_group_html = "";
		for(var  i = 0; i< gridActions.length; i++){
			var gridAction = gridActions[i];
			var className = gridAction.actionName.replace("Action", "-action");
			if(isSet(gridAction.actionName)){
				if(gridAction.isState){
					var activeClass = (isSet(gridAction.isActive) && gridAction.isActive == true)?"active":"";
					grid_actions_group_link = $(grid_icon_action_link);
					
					grid_actions_group_link.attr({
						"data-openUrl"  :  gridAction.openUrl,
						"data-openType" : gridAction.openType,
						"data-tooltip"  : i18NCall(gridAction.tooltipKey),
						"href" :"javascript:void(0);",	
						"data-max-records" : gridAction.maxRecords,

					}).addClass(className.toLowerCase()+" "+activeClass).text(i18NCall(gridAction.tooltipKey));
					
					var functionCallback = "perform_"+gridAction.actionName;
					if(moduleTypeJson.indexOf(gridAction.actionName) == -1){
						if(isSet(window[additionalParams.selectedNamespace][functionCallback])){
							window[additionalParams.selectedNamespace][functionCallback](additionalParams,gridAction,elementId);
						}
					}else{
						if(isSet(window["baseGridActions"][functionCallback])){
							window["baseGridActions"][functionCallback](additionalParams,gridAction,elementId);
						}
					}
					grid_actions_group_html += grid_actions_group_link.prop("outerHTML");
					
				}
			}
		}
		return grid_actions_group_html;
	},

	/* function to set parameter for grid sub action icons */

	baseGridActions.setSubGridActionAttr =  function(gridActions,additionalParams,elementId) {
		var grid_actions_group_link = "";
		var grid_actions_group_html = "";
		for(var  i = 0; i< gridActions.length; i++){
			var gridAction = gridActions[i];
			var className = gridAction.actionName.replace("Action", "-action");
			if(isSet(gridAction.actionName)){
				if(gridAction.isState){
					grid_actions_group_link = $(grid_all_action_submenu_content_block);
					
					grid_actions_group_link.find("a").attr({
						"data-openUrl"  :  gridAction.openUrl,
						"data-openType" : gridAction.openType,
						"data-max-records" : gridAction.maxRecords,
						"href" :"javascript:void(0);",
						"data-min-records" : gridAction.minRecords
					}).addClass(className.toLowerCase()+" action-popup-close");
					grid_actions_group_link.find("span.action-title").text(i18NCall(gridAction.tooltipKey));
					var functionCallback = "perform_"+gridAction.actionName;
					
					if(moduleTypeJson.indexOf(gridAction.actionName) == -1){
						if(isSet(window[additionalParams.selectedNamespace][functionCallback])){
							window[additionalParams.selectedNamespace][functionCallback](additionalParams,gridAction,elementId);
						}
					}else{
						if(isSet(window["baseGridActions"][functionCallback])){
							window["baseGridActions"][functionCallback](additionalParams,gridAction,elementId);
						}
					}
					grid_actions_group_html += grid_actions_group_link.prop("outerHTML");
				}
			}
		}
		return grid_actions_group_html;
	},
	
	/* function for range toggle operation */
	baseGridActions.perform_refreshAction =  function(additionalParams,gridAction,elementId) {
		
		var gridContext = listGridDetails.gridDispKey+"-"+listGridDetails.gridKey;
		
		 $(document).undelegate(".grid-action-group a.refresh-action","click touchend");
		 $(document).delegate(".grid-action-group a.refresh-action","click touchend",function(){
			 var gridContext = $(this).parents(".panel-grid-main").attr("id");
			 //call pagination api
			 var selectedRecords = $(page_records_selector).val();	 
			 var ajaxObject = {
					"ajaxURL" : SetWebApiURL+'json/page-details.json',
					"params" : {"pageNo" :1, "recordsPerPage" : selectedRecords, "currentPage" : 1,"pageId":current_moduleId,"gridKey":listGridDetails.gridKey,"gridName" : listGridDetails.gridDispKey },
					"successCallback" : function(obj){
						baseGridActions.generateGridSuccess(obj,gridContext,additionalParams.selectedNamespace);
					},
					"failureCallback" : generateFailure,
					"wrapperId" 	  : gridContext,
					"loader" : true,
					"aSync" : true,
					"loaderWrapper" :  "#"+gridContext
			 };
			 ajaxCallBack(ajaxObject);
		 });
	},

	/* function to generate batch edit form */
	baseGridActions.perform_batchEditAction =  function(additionalParams,gridAction,elementId) {
		$(document).undelegate(".grid-action-group a.batchedit-action","click touchend");
		$(document).delegate('.grid-action-group a.batchedit-action','click touchend',function(e){
			var accordionkey = $(this).parents(".app-action-form-block").attr("data-accordionkey")?$(this).parents(".app-action-form-block").attr("data-accordionkey"):'';
			var elementWrapperId = "#"+$(this).parents(".panel-grid-main").attr("id");
			e.preventDefault();
			var thisValue = $(this);
			var messageInfo = {
				"message" 	: "select.check.checkbox",
				"infoId" 	: "batch-update"
			};
			if(!baseFunctions.checkMaxSelectedRecords(elementWrapperId,thisValue.attr("data-max-records"))){
				return false;
			}
			if(baseFunctions.checkTotalCheckedCount(elementWrapperId,messageInfo)){
				
				var getReturnObject     = baseFunctions.setCommonAjaxConfig(elementWrapperId,additionalParams.totalRecords);
				var pkValues 			= getReturnObject.colObject;
				var selectedRecords 	= getReturnObject.selectedRecords;
				var checkSelectedAll 	= getReturnObject.checkSelectedAll;
				var recordCodes 		= getReturnObject.colObjectCode;
				var versions 			= getReturnObject.colObjectVersion;
				var pageContextParams 	= baseFunctions.setPageContextParams(elementWrapperId,additionalParams.totalRecords);
				
				var openType = thisValue.attr("data-openType");
				
				var screen = $(elementWrapperId).attr("data-screen");
				var pageID = $(elementWrapperId).attr("data-pageid");
				
				if(screen == undefined){
					screen = screenName;
				}
				
				var redirectConfig = {
					"recordId" : pkValues,
					"recordCodes": recordCodes,
					"openUrl"  : thisValue.attr("data-openUrl"),
					"openType" : openType,
					"pageType" : "EDIT",
					"version" : versions,
					"pageContextParams": pageContextParams,
					"pageKey"  : screen,
					"pageId"   : pageID
				};
				baseFunctions.setSelectedRecords(redirectConfig,"baseFunctions.setSelectedEditScreen");
			}
		});
	},
	
	/* generate grid rows delete */
	baseGridActions.perform_deleteAction =  function(additionalParams,gridAction,elementId) {
		$(document).undelegate(".grid-action-group a.delete-action","click touchend");
		$(document).delegate(".grid-action-group a.delete-action","click touchend",function(e){
			e.preventDefault();
			$('.grid-action-group a.delete-action').removeAttr("data-toggle data-target");
			var accordionkey = $(this).parents(".app-action-form-block").attr("data-accordionkey")?$(this).parents(".app-action-form-block").attr("data-accordionkey")+"/":'';
			ajaxUrl = SetWebApiURL+accordionkey+ "delete-records";
//			var elementWrapper = additionalParams.setElementId;
			var elementWrapper = $(this).parents(".panel-grid-main").attr("id");
			var elementWrapperId = "#"+elementWrapper;
			
			var thisValue = $(this);
			var messageInfo = {
				"message" 	: "select.check.checkbox",
				"infoId" 	: "delete-record"
			};
			if(!baseFunctions.checkMaxSelectedRecords(elementWrapperId,thisValue.attr("data-max-records"))){
				return false;
			}
			if(baseFunctions.checkTotalCheckedCount(elementWrapperId,messageInfo)){
				
				getConfirmationAlert("delete_confirmation",elementWrapper);
				
				$.blockUI({ message: $('#conf-'+elementWrapper), css: { width: '275px' } });
				
				$('#conf-'+elementWrapper).find("#yes").on("click",function(){
					$.unblockUI(); 
					var getReturnObject 	= baseFunctions.setCommonAjaxConfig(elementWrapperId,additionalParams.totalRecords);
					var pkValues 			= getReturnObject.colObject;
					var selectedRecords 	= getReturnObject.selectedRecords;
					var checkSelectedAll 	= getReturnObject.checkSelectedAll;
					var recordCodes 		= getReturnObject.colObjectCode;
					var pageContextParams 	= baseFunctions.setPageContextParams(elementWrapperId,additionalParams.totalRecords);
					var actionUrl = thisValue.attr("data-openUrl");
					if(actionUrl == undefined || actionUrl == " "){
						ajaxUrl = SetWebApiURL + "json/delete-records.json";
					}
					else{
						ajaxUrl = actionUrl;
					}
						var ajaxObject = {
								"ajaxURL" : ajaxUrl,
								"params" : {"pkValues" : pkValues,"recordCodes":recordCodes, "totalRecords" : selectedRecords , "selectedAll" : checkSelectedAll,"pageContextParams":pageContextParams },
								"successCallback" : function(obj){
									generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
									if(getResultCode(obj.resultCode) == CODE_SUCCESS){
										setTimeout(function(){
											var gridkey = $(elementWrapperId).attr("data-gridkey")?$(elementWrapperId).attr("data-gridkey"):listGridDetails.gridKey;
											var griddispkey = $(elementWrapperId).attr("data-griddispkey")?$(elementWrapperId).attr("data-griddispkey"):listGridDetails.gridDispKey;
											
											baseFunctions.createGrid({"gridKey":gridkey,"gridDispKey":griddispkey});
										},500);
									}
								},
								"loaderWrapper"	  : "."+$("body").attr("class"),
								"loader"		  : true,
								"failureCallback" : function(){}							
						};
						ajaxCallBack(ajaxObject);					
				});
				
				$('#conf-'+elementWrapper).find("#no").on("click",function(){
					 $.unblockUI(); 
			         return false; 
				});
			}
		});	
	},
	
	/* function for range toggle operation */
	baseGridActions.rangeToggle =  function() {
		$(document).undelegate(".grid-action-group a.range-action","click touchend");
		$(document).delegate(".grid-action-group a.range-action","click touchend",function(e){
			e.preventDefault();
			$('.grid-action-group a.range-action').removeAttr("data-toggle data-target");
			 $(this).toggleClass("active");
		});
	},


	baseGridActions.perform_rangeAction =  function(additionalParams) {
		var lastChecked = null;
		baseGridActions.rangeToggle();
		var elementWrapper = additionalParams.setElementId;
		var elementWrapperId = "#"+additionalParams.setElementId;
		var $chkboxes = $(elementWrapperId).find('.css-checkbox');
	    $chkboxes.bind('click',function(e) {
	    	
	    	if(!$(".grid-action-group a.range-action").hasClass("active")) return;
	        if(!lastChecked) {
	            lastChecked = this;
	            return;
	        }
	        	
	        var start = $chkboxes.index(this);
	        var end = $chkboxes.index(lastChecked);
	        $chkboxes.slice(Math.min(start,end), Math.max(start,end)+ 1).prop('checked', lastChecked.checked);
	        if($chkboxes.slice(Math.min(start,end), Math.max(start,end)+ 1).prop("checked") ==  false){
	        	$chkboxes.slice(Math.min(start,end), Math.max(start,end)+ 1).parents(".rowModels").removeClass("check-row");
	        }else{
	        	$chkboxes.slice(Math.min(start,end), Math.max(start,end)+ 1).parents(".rowModels").addClass("check-row");
	        }
	        $(".page-selected-records").removeClass("hidden");
				$(".page-selected-records span").html($(checkbox_rowmodel_checked_wrapper).length);
	        lastChecked = '';
	        if($(checkbox_rowmodel_wrapper).not(":checked").length == 0)
	        {
	        	$(checkbox_all_wrapper).prop("checked", true);
	        }
	        
	        if($(checkbox_rowmodel_checked_wrapper).length == 0){
	        	$(".page-selected-records").addClass("hidden");
	        }
	    });
	},
	
	/* function for multi sorting operation */
	baseGridActions.perform_multiSortAction =  function(additionalParams) {
		$(document).undelegate(".grid-action-group a.multisort-action","click touchend");
		$(document).delegate(".grid-action-group a.multisort-action","click touchend",function(e){
			e.preventDefault();
			$('.grid-action-group a.multisort-action').removeAttr("data-toggle data-target");
			 $(this).toggleClass("active");
		});
	},

	/* function for manage columns operation */
	baseGridActions.perform_manageColumnsAction =  function(additionalParams,gridAction,elementId) {
		$(document).undelegate(".grid-action-group a.managecolumns-action","click touchend");
		$(document).delegate(".grid-action-group a.managecolumns-action","click touchend",function(e){
			e.preventDefault();
			var elementWrapper = additionalParams.setElementId;
			var elementWrapperId = "#"+additionalParams.setElementId;
			
			if($(manage_columns_wrapper_id).length != 0){
				$(manage_columns_wrapper_id).remove();
			} 
			var componentObject = {
					"modalHTML" 		: grid_manage_columns,
					"blockWrapper"		: "manage-columns",
					"wrapperId"			: manage_columns_wrapper_id,
					"getURL"			: "json/all-columns.json",
					"setURL"			: "json/save-manage-columns.json"
			};
			baseGridActions.generateColumnComponent(componentObject);
		});
	},
	
	/* function for export to excel */
	baseGridActions.perform_exportAction = function(additionalParams,gridAction,elementId){
		$(document).undelegate(".popup-action a.export-action","click touchend");
		$(document).delegate(".popup-action a.export-action","click touchend",function(e){
			e.preventDefault();
			baseGridActions.exportData(additionalParams,"");
		});
	}

	/* function for export to json */
	baseGridActions.perform_exportJsonAction = function(additionalParams,gridAction,elementId){
		$(document).undelegate(".popup-action a.exportjson-action","click touchend");
		$(document).delegate(".popup-action a.exportjson-action","click touchend",function(e){
			e.preventDefault();
			baseGridActions.exportJsonData(additionalParams);
		});
	}
	/* function for export to excel */
	baseGridActions.perform_exportTemplateAction = function(additionalParams,gridAction,elementId){
		$(document).undelegate(".popup-action a.exporttemplate-action","click touchend");
		$(document).delegate(".popup-action a.exporttemplate-action","click touchend",function(e){
			e.preventDefault();
			baseGridActions.exportData(additionalParams,screenName);
		});
	}
	baseGridActions.exportData = function(additionalParams,getScreen){
		var elementWrapper = additionalParams.setElementId;
		var elementWrapperId = "#"+additionalParams.setElementId;
		var thisValue = $(this);
		var messageInfo = {
			"message" 	: "select.check.checkbox",
			"infoId" 	: "export-excel"
		};
		if(baseFunctions.conditionForSelectedRadin() == 2 && !baseFunctions.checkMaxSelectedRecords(elementWrapperId,thisValue.attr("data-max-records"))){
			return false;
		}
		
		if(baseFunctions.checkTotalCheckedCount(elementWrapperId,messageInfo)){
			var getReturnObject = baseFunctions.setCommonAjaxConfig(elementWrapperId,additionalParams.totalRecords);
			var pkValues 			= getReturnObject.colObject;
			var selectedRecords 	= getReturnObject.selectedRecords;
			var checkSelectedAll 	= getReturnObject.checkSelectedAll;
			var recordCodes 		= getReturnObject.colObjectCode;
			var pageContextParams   = getReturnObject.pageContextParams;

			
			var ajaxUrlOpen = SetWebApiURL+"export-to-excel?pageId="+current_moduleId+"&totalRecords="+selectedRecords+"&excelTemplate="+getScreen+"&gridKey="+listGridDetails.gridKey+"&gridName="+listGridDetails.gridDispKey;
			ajaxUrl = SetWebApiURL+"set-export-data";
			var ajaxObject = {
					"ajaxURL" : ajaxUrl,
					"params" : {"pageId" : current_moduleId, "exportData" : pkValues,"recordCodes":recordCodes,"allSelectRecord":selectRecordValue,"pageContextParams":pageContextParams},
					"successCallback" : function(){
						window.open(ajaxUrlOpen);
					},
					"failureCallback" : function(){}							
			};
			ajaxCallBack(ajaxObject);
		}
	}

	baseGridActions.exportJsonData = function(additionalParams,getScreen){
		var elementWrapper = additionalParams.setElementId;
		var elementWrapperId = "#"+additionalParams.setElementId;
		var thisValue = $(this);
		var messageInfo = {
			"message" 	: "select.check.checkbox",
			"infoId" 	: "export-excel"
		};
		if(baseFunctions.conditionForSelectedRadin() == 2 && !baseFunctions.checkMaxSelectedRecords(elementWrapperId,thisValue.attr("data-max-records"))){
			return false;
		}
		if(baseFunctions.checkTotalCheckedCount(elementWrapperId,messageInfo)){
			var getReturnObject = baseFunctions.setCommonAjaxConfig(elementWrapperId,additionalParams.totalRecords);
			var pkValues 			= getReturnObject.colObject;
			var selectedRecords 	= getReturnObject.selectedRecords;
			var checkSelectedAll 	= getReturnObject.checkSelectedAll;
			var pageContextParams   = getReturnObject.pageContextParams;
			
			var ajaxUrlOpen = SetWebApiURL+"export-to-json?pageId="+current_moduleId+"&totalRecords="+selectedRecords+"&gridKey="+listGridDetails.gridKey+"&gridName="+listGridDetails.gridDispKey;
			ajaxUrl = SetWebApiURL+"set-export-data";
			var ajaxObject = {
					"ajaxURL" : ajaxUrl,
					"params" : {"pageId" : current_moduleId, "exportData" : pkValues,"allSelectRecord":selectRecordValue,"pageContextParams":pageContextParams},
					"successCallback" : function(){
						window.open(ajaxUrlOpen);
					},
					"failureCallback" : function(){}							
			};
			ajaxCallBack(ajaxObject);
		}
	}
	
	
	baseGridActions.generateColumnComponent =  function(componentObject) {
		var modalHtml = componentObject.modalHTML;
		var blockWrapper = componentObject.blockWrapper;
		var wrapperId = componentObject.wrapperId;
		var getURL = componentObject.getURL;
		var setURL = componentObject.setURL;
		
		getModalPopUp(modalHtml);
		
		setTimeout(function(){
			ajaxUrl = SetWebApiURL+getURL;
			var ajaxObject = {
					"ajaxURL" : ajaxUrl,
					"params" : {"pageId" : current_moduleId,"gridKey":listGridDetails.gridKey},
					"successCallback" : function(obj){
							if(getResultCode(obj.resultCode) == CODE_SUCCESS){
								var manageColumnConfig = obj.returnObject.manageColumnsConfig;
								
								var manageColumnConfig_column1 = [];
								var manageColumnConfig_column2 = [];
								
								for(var i =0; i< manageColumnConfig.totalColumnCount; i++){
									var columnValueObject = manageColumnConfig.columnValueObjects;
									if(columnValueObject[i].isVisible == true){
										manageColumnConfig_column1.push(columnValueObject[i]);
									}else{	
										manageColumnConfig_column2.push(columnValueObject[i]);
									}
								}
								
								var obj = {
										'manageColumnConfig':manageColumnConfig_column1,
										'blockWrapper': blockWrapper,
										'listWrapper':"visible-columns",
										'search':0
									};
								
								baseGridActions.generateManageList(obj);
								
								var obj = {
										'manageColumnConfig':manageColumnConfig_column2,
										'blockWrapper': blockWrapper,
										'listWrapper':"all-columns",
										'search':0
									};
								baseGridActions.generateManageList(obj);
								
								baseFunctions.generateScrollbar(wrapperId+" ul");
								$(wrapperId).find("[data-type = submit]").click(function(){
									var output = {};
									var iColumnOrder = 1;
									if($(wrapperId).find("ul#visible-columns li").length == 0){
										generateMsg(1,'select.one.column',global_lightbox_wrapper);
										return false;
									}
									$(wrapperId).find("ul#visible-columns li").each(function() {
										 var ci = $(this).attr("value");
										 var co = $(this).data("order");
										 if(typeof output["columnValueObjects"] == "undefined"){
												output["columnValueObjects"] = [];
											}
											output["columnValueObjects"].push({
												"columnId" 	  : ci,
												"columnOrder" : iColumnOrder++		
											});
									});
									var myString = JSON.stringify(output);
									var gridContext = listGridDetails.gridDispKey+"-"+listGridDetails.gridKey;
									
									ajaxUrl = SetWebApiURL+setURL;
									var ajaxObject = {
											"ajaxURL" : ajaxUrl,
											"params" : {"manageColumnsJson" : myString ,"pageId" : current_moduleId,"gridKey":listGridDetails.gridKey},
											"successCallback" : function(data){
												if(getResultCode(data.resultCode) == CODE_SUCCESS)
												{
													$(wrapperId).modal('hide');
													selected_page_records = $(page_records_selector).val();
													var ajaxPaginationParams = {
															"ajaxURL" 			: SetWebApiURL+'json/page-details.json',
															"pageNo"  			: 1,
															"recordsPerPage"	: selected_page_records,
															"currentPage"		: 1,
															"wrapperId"			: gridContext,
															"loader" : true,
															"loaderWrapper" : "#"+gridContext
													};
													baseGridActions.getPageDetails(ajaxPaginationParams);
												}else{
													generateMsg(data.resultCode,data.messageKey,global_lightbox_wrapper,"",data.responseDetail);
												}
											} ,
											"failureCallback" : function(){},
											"wrapperId"       : panel_grid_content_id,
											"loader" : true,
											"loaderWrapper" : wrapperId+" .modal-content"
									};
									ajaxCallBack(ajaxObject);
								});
								baseGridActions.manageColumnsActions(wrapperId);
							}
					},
					"failureCallback" : function(){} ,
					"loader" : true,
					"loaderWrapper" : wrapperId+" ul"
			};
			ajaxCallBack(ajaxObject);
		},200);
	},
	
	baseGridActions.generateAssignColumnComponent =  function(additionalParams,componentObject) {
		var modalHtml 			= componentObject.modalHTML;
		var blockWrapper 		= componentObject.blockWrapper;
		var wrapperId 			= componentObject.wrapperId;
		var visibleColWrapper 	= componentObject.visibleColWrapper;
		var allColWrapper 		= componentObject.allColWrapper;
		var getURL 				= componentObject.getURL;
		var setURL 				= componentObject.setURL;
		var elementWrapper = additionalParams.setElementId;
		var elementWrapperId = "#"+additionalParams.setElementId;
		
		var messageInfo = {
			"message" 	: "select.check.checkbox",
			"infoId" 	: blockWrapper
		};
		
//		if(selectRecordValue == "true" || baseFunctions.checkTotalCheckedCount(elementWrapperId,messageInfo)){
		if(baseFunctions.checkTotalCheckedCount(elementWrapperId,messageInfo)){
			var getReturnObject 	= baseFunctions.setCommonAjaxConfig(elementWrapperId,additionalParams.totalRecords);
			var pkValues 			= getReturnObject.colObject;
			var selectedRecords 	= getReturnObject.selectedRecords;
			var checkSelectedAll 	= getReturnObject.checkSelectedAll;
			var recordCodes 		= getReturnObject.colObjectCode;
			var pageContextParams   = getReturnObject.pageContextParams;
			
			var griddispkey = $("#"+additionalParams.wrapperId).attr("data-griddispkey")?$("#"+additionalParams.wrapperId).attr("data-griddispkey"):listGridDetails.gridDispKey;
			var gridKey     = $("#"+additionalParams.wrapperId).attr("data-gridKey")?$("#"+additionalParams.wrapperId).attr("data-gridKey"):listGridDetails.gridKey;
			var gridContext = griddispkey+"-"+gridKey;
			
			getModalPopUp(modalHtml);
			baseGridActions.closeActionPopUp();
			var tagTypes =  $(elementWrapperId).find(grid_addon_tagTypes_wrapper).val();
			setTimeout(function(){
				ajaxUrl = SetWebApiURL+getURL;
				var ajaxObject = {
						"ajaxURL" : ajaxUrl,
						"params" : {"pageId" : current_moduleId, "pkValues" : pkValues,"recordCodes":recordCodes, "tagTypes" : tagTypes, "gridName" : griddispkey,"pageContextParams":pageContextParams,"allSelectRecord":selectRecordValue},
						"successCallback" : function(obj){
								if(getResultCode(obj.resultCode) == CODE_SUCCESS){
									var manageColumnConfig = obj.returnObject.manageColumnsConfig;								
									
									// set modal title label dynamically
									var assignTitle = i18NCall(obj.returnObject.manageColumnsConfig.title);	
									$(wrapperId).find(".modal-title").text(assignTitle?assignTitle:'');
									
									/*if(isSet(obj.isCreateAction) && obj.isCreateAction == false){
										$(wrapperId).find(".manage-action").addClass("hidden");
									}*/
									
									if(isSet(manageColumnConfig.isCreateAction) && manageColumnConfig.isCreateAction == false){
										$(wrapperId).find(".create-tag").addClass("hidden");
									}
									
									var manageColumnConfig_column1 = [];
									var manageColumnConfig_column2 = [];
									for(var i =0; i< manageColumnConfig.totalColumnCount; i++){
										var columnValueObject = manageColumnConfig.columnValueObjects;
										if(columnValueObject[i].isVisible == true){
											manageColumnConfig_column1.push(columnValueObject[i]);
										}else{	
											manageColumnConfig_column2.push(columnValueObject[i]);
										}
									}
									if(obj.returnObject.manageColumnsConfig.selectedRecords){
										var selectedValues = document.createElement(selector_div);
										$(selectedValues).addClass("selected-values");
										$(selectedValues).html(obj.returnObject.manageColumnsConfig.selectedRecords.join(', '));
										$('.modal-body-content').prepend(selectedValues);
									}
									
									if(isSet(visibleColWrapper)){
										var obj = {
												'manageColumnConfig':manageColumnConfig_column1,
												'blockWrapper': blockWrapper,
												'listWrapper':visibleColWrapper,
												'search':1
											};
										
										baseGridActions.generateList(obj);
									}
									if(isSet(allColWrapper)){
										var obj = {
												'manageColumnConfig':manageColumnConfig_column2,
												'blockWrapper': blockWrapper,
												'listWrapper':allColWrapper,
												'search':1
											};
										baseGridActions.generateList(obj);
									}
									
									baseFunctions.generateScrollbar(wrapperId+" ul");
									var dataMinRecords = manageColumnConfig.minRecords;
									var message = "";
									$(wrapperId).find("[data-type = submit]").click(function(){
										var output = {};
										var iColumnOrder = 1;
										if(dataMinRecords > 0){
										if($(wrapperId).find("ul#"+visibleColWrapper+" li").length == 0){
											
										    if(!isSet(dataMinRecords)){
										    	message = "select.one.column";
											}else{
												message = {
						                                "message": 'select.check.checkbox.minrecord',
						                                "params": [dataMinRecords]
						                       };
											}
											generateMsg(1,message,global_lightbox_wrapper);
											return false;
										}
									}
										$(wrapperId).find("ul#"+visibleColWrapper+" li").each(function() {
											 var ci = $(this).attr("rel");
											 var co = $(this).data("order");
											 if(typeof output["columnValueObjects"] == "undefined"){
													output["columnValueObjects"] = [];
												}
												output["columnValueObjects"].push({
													"columnId" 	  : ci,
													"columnOrder" : iColumnOrder++		
												});
										});
										var myString = JSON.stringify(output);
										ajaxUrl = SetWebApiURL+setURL;
										var ajaxObject = {
												"ajaxURL" : ajaxUrl,
												"params" : {"manageColumnsJson" : myString ,"pageId" : current_moduleId,"pkValues" : pkValues, "gridName" : griddispkey,"pageContextParams":pageContextParams,"allSelectRecord":selectRecordValue},
												"successCallback" : function(data){
													if(getResultCode(data.resultCode) == CODE_BUSINESS){
														generateMsg(data.resultCode,data.messageKey,global_lightbox_wrapper,"",data.responseDetail);
														}else{
														generateMsg(data.resultCode,data.messageKey,global_message_wrapper,"",data.responseDetail);
														}
													if(getResultCode(data.resultCode) == CODE_SUCCESS)
													{
														$(wrapperId).modal('hide');
														
														selected_page_records = $(page_records_selector).val();
														var ajaxPaginationParams = {
																"ajaxURL" 			: SetWebApiURL+'page-details',
																"pageNo"  			: 1,
																"recordsPerPage"	: selected_page_records,
																"currentPage"		: 1,
																"wrapperId"			: gridContext,
																"loader" : true,
																"loaderWrapper" : "#"+gridContext
														};
														baseGridActions.getPageDetails(ajaxPaginationParams);
													}
												} ,
												"failureCallback" : function(){},
												"wrapperId"       : panel_grid_content_id,
												"loader" : true,
												"loaderWrapper" : wrapperId+" .modal-content"
										};
										ajaxCallBack(ajaxObject);
									});
									baseGridActions.manageColumnsActions(wrapperId);
									/*Ul li list with textbox search enable */
									baseGridActions.manageListWithTextSearch(allColWrapper);
									baseGridActions.manageListWithTextSearch(visibleColWrapper);
									
									if(isSet(manageColumnConfig.allowToAddNewRecord)){
										var allowToAdd = manageColumnConfig.allowToAddNewRecord;
										if(allowToAdd.isState == true){
											
											var assignGroupListForm = $(grid_assign_group_list_form);
											
											assignGroupListForm.find("form").attr({
												"action" : allowToAdd.apiUrl
											});
											
											$($(assignGroupListForm).prop("outerHTML")).appendTo($(wrapperId).find(".set-form-data"));
											baseGridActions.addRecordInList(wrapperId,visibleColWrapper);
										}
									}
								}
						},
						"failureCallback" : function(){} ,
						"loader" : true,
						"loaderWrapper" : wrapperId+" ul"
				};
				ajaxCallBack(ajaxObject);
			},200);
		}
	},

	/* function for generate pagination option */
	baseGridActions.generatePaginationOptions =  function(defaultOptions,stepOption,nameOptions,currentOption) {
		var dropdownHTML  =  $(pagination_options);
		var optionClone;
		var optionValue;
		var optionLoop;
		currentOption = currentOption ? currentOption : 1;
		optionLoop    = stepOption == 1 ? defaultOptions.length : defaultOptions;
		for(var i=0; i<optionLoop; i++){
			optionValue = stepOption == 1 ? defaultOptions[i] : i+1;
			optionClone = document.createElement("option");
			$(optionClone).attr({
				"value" : optionValue,
				"selected": currentOption == optionValue ? true : false 
			});
			$(optionClone).html(optionValue);
			dropdownHTML.find("select").append(optionClone);
		}
	 
		dropdownHTML.find("select").attr({
		   "name": nameOptions
		});
		return dropdownHTML;
	},

	/* function for manage list with search box */
	baseGridActions.manageListWithTextSearch =  function(listId) {
		var txtSearchId='#'+'search-'+listId; 
		$(txtSearchId).on('keyup',function(){//keypress
			var liid = '#'+$(txtSearchId).attr('rel');//Get ul id 
			var searchText=$(txtSearchId).val().toLowerCase();//Search Text
			var list = $(liid);		
			list.find('li').each(function(){
			var currentLiText =$(this).text().toLowerCase();			
		        showCurrentLi = currentLiText.indexOf(searchText) !== -1;
				$(this).toggle(showCurrentLi);		
			});
		});
	},

	baseGridActions.generateList =  function(obj) {
		var manageColumnConfig=obj.manageColumnConfig;
		var divClass='search'+obj.listWrapper;
		var formId='form'+obj.listWrapper;
		var searchId='search-'+obj.listWrapper;
		var listWrapperId ="ul#"+obj.listWrapper;
		for(var i =0; i< manageColumnConfig.length; i++){
			var columnValueObject = manageColumnConfig[i];
			var liClone = document.createElement(selector_li);
			var blockWrapper="#"+obj.blockWrapper;
			var listWrapper="ul#"+obj.listWrapper;
			var columnId = columnValueObject.columnId;
			
			$(liClone).attr({
				"value" : columnId,
				"rel" : columnId,
				"data-order" : columnValueObject.columnOrder
			});
			$(liClone).text(columnValueObject.columnDispNameKey);
			$(blockWrapper).find(listWrapper).append(liClone);
		}

		if(obj.search == 1){	
			var searchInput = $(search_input_box);
			searchInput.addClass(divClass).find(selector_input).attr({
				"name" : searchId,
				"id"   : searchId,
				"rel"  : obj.listWrapper
			});
			$(searchInput.prop("outerHTML")).insertBefore( listWrapperId );
		}
	},
	
	/* function for generate manage list */
	baseGridActions.generateManageList =  function(obj) {
		var manageColumnConfig=obj.manageColumnConfig;
		var divClass='search'+obj.listWrapper;
		var formId='form'+obj.listWrapper;
		var searchId='search_all_'+obj.listWrapper;
		var listWrapper="ul#"+obj.listWrapper;
		for(var i =0; i< manageColumnConfig.length; i++){
			var columnValueObject = manageColumnConfig[i];
			var liClone = document.createElement(selector_li);
			var blockWrapper="#"+obj.blockWrapper;
			var listWrapper="ul#"+obj.listWrapper;
			
			$(liClone).attr({
				"value" : columnValueObject.columnId,
				"rel" : columnValueObject.columnName,
				"data-order" : columnValueObject.columnOrder
			});
			
			$(liClone).html(i18NCall(columnValueObject.columnDispNameKey));		
			$(blockWrapper).find(listWrapper).append(liClone);
		}

		if(obj.search == 1){
			var searchInput = $(search_input_box);
			searchInput.addClass(divClass).find(selector_input).attr({
				"name" : searchId,
				"id"   : searchId,
				"rel"  : obj.listWrapper
			});
			$(searchInput.prop("outerHTML")).insertBefore( listWrapper );
		}
	},

	baseGridActions.manageColumnsActions =  function(self) {
		var aColumnsId = $(self).find(".columns-list-item:first").attr("id");
		var vColumnsId = $(self).find(".columns-list-item:last").attr("id");
		$(self).find(".columns-list-item").on("click","li",function(){
			$(this).toggleClass("active");
		});
		
		$(self).find(".manage-action a").on("click",function(){
			
				hideMessageWrapper();
				
				var allColumnsItems = $(self).find("#"+aColumnsId+" li");
				var visibleColumnsItems = $(self).find("#"+vColumnsId+" li");
				var allColumnsActiveItems = $(self).find("#"+aColumnsId+" li.active");
				var visibleColumnsActiveItems = $(self).find("#"+vColumnsId+" li.active");
				
				var allColumnsLength =  $(self).find("#"+aColumnsId+" li").length;
				var visibleColumnsLength = $(self).find("#"+vColumnsId+" li").length;
				var allColumnsActiveLength =  $(self).find("#"+aColumnsId+" li.active").length;
				var visibleColumnsActiveLength = $(self).find("#"+vColumnsId+" li.active").length;
				var buttonClicked = $(this).data("rel");
				
				if(buttonClicked == "next-right"){
					
					if(allColumnsLength > 0){
						getConfirmationAlert("mng.columns.allToVisible.alert",'mgncolumns-right');
					    $.blockUI({ message: $('#conf-mgncolumns-right'), css: { width: '275px' } });
					    $('#conf-mgncolumns-right').find("#yes").on("click",function(){
					    	$.unblockUI();
					    	allColumnsItems.not(":hidden").each(function(){
								var this_rel = $(this).attr("rel");
								var outerHTML = $(this).removeClass("active").prop("outerHTML");
								$("#"+vColumnsId+" .jspPane").append(outerHTML);
								$("#"+aColumnsId+" li[rel='"+this_rel+"']").remove();
							});
					    	baseGridActions.mngColumnsScroll("#"+vColumnsId,$(self).find("#"+vColumnsId),$("#"+vColumnsId+" li:last"),500);
					    });
					    $('#conf-mgncolumns-right').find("#no").on("click",function(){
					    	 $.unblockUI();
					    });
					}
					else
					{
						getInformationAlert("mng.columns.allNoColumns.alert","visible-columns");
						$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
					}
				}
				if(buttonClicked == "next-left"){
					if(visibleColumnsLength > 0){
						getConfirmationAlert("mng.columns.visibleToAll.alert",'mgncolumns-left');
					    $.blockUI({ message: $('#conf-mgncolumns-left'), css: { width: '275px' } });
					    $('#conf-mgncolumns-left').find("#yes").on("click",function(){
					    	$.unblockUI();
					    	visibleColumnsItems.not(":hidden").each(function(){
								var this_rel = $(this).attr("rel");
								var outerHTML = $(this).removeClass("active").prop("outerHTML");
								$("#"+aColumnsId+" .jspPane").append(outerHTML);
								$("#"+vColumnsId+" li[rel='"+this_rel+"']").remove();
							});
					    	baseGridActions.mngColumnsScroll("#"+aColumnsId,$(self).find("#"+aColumnsId),$("#"+aColumnsId+" li:last"),500);
					    });
					    $('#conf-mgncolumns-left').find("#no").on("click",function(){
					    	 $.unblockUI();
					    });
					}
					else
					{
						getInformationAlert("mng.columns.visibleNoColumns.alert","visible-columns");
						$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
					}
				}
				if(buttonClicked == "next-up"){
					if(visibleColumnsLength > 0){	
						if(visibleColumnsActiveLength > 0){
							var liItem = $(self).find("#"+vColumnsId+" li.active");
							$(self).find("#"+vColumnsId+" .jspPane").prepend(liItem);
							baseGridActions.mngColumnsScroll("#"+vColumnsId,$(self).find("#"+vColumnsId),$("#"+vColumnsId+" li:first"),500);
						}else{
							getInformationAlert('multicolumn.select.atleast.column',"visible-columns");
							$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
						}
					}	
					else
					{
						getInformationAlert("mng.columns.visibleNoColumns.alert","visible-columns");
						$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
					}
				}
				if(buttonClicked == "next-down"){
					if(visibleColumnsLength > 0){	
						if(visibleColumnsActiveLength > 0){
							var liItem = $(self).find("#"+vColumnsId+" li.active");
							$(self).find("#"+vColumnsId+" .jspPane").append(liItem);
							baseGridActions.mngColumnsScroll("#"+vColumnsId,$(self).find("#"+vColumnsId),$("#"+vColumnsId+" li:last"),500);
						}else{
							getInformationAlert('multicolumn.select.atleast.column',"visible-columns");
							$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
						}
					}
					else
					{
						getInformationAlert("mng.columns.visibleNoColumns.alert","visible-columns");
						$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
					}
				}
				
				if(buttonClicked == "next-right-single"){
					if(allColumnsActiveLength == 0){
						
						getInformationAlert('multicolumn.select.atleast.column',"visible-columns");
						$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
					}
					else{
						baseGridActions.mngColumnsScroll("#"+vColumnsId,$(self).find("#"+vColumnsId),$("#"+vColumnsId+" li:last"),500);
						visibleColumnsItems.removeClass("active");
						
						allColumnsActiveItems.each(function(){
							var this_rel = $(this).attr("rel");
							var outerHTML = $(this).prop("outerHTML");
							$("#"+vColumnsId+" .jspPane").append(outerHTML);
							$("#"+aColumnsId+" li[rel='"+this_rel+"']").remove();
						});
					}	
				}
				if(buttonClicked == "next-left-single"){
					if(visibleColumnsActiveLength == 0){
						
						getInformationAlert('multicolumn.select.atleast.column',"visible-columns");
						$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
					}
					else{
						baseGridActions.mngColumnsScroll("#"+aColumnsId,$(self).find("#"+aColumnsId),$("#"+aColumnsId+" li:last"),500);
						allColumnsItems.removeClass("active");
						visibleColumnsActiveItems.each(function(){
							var this_rel  = $(this).attr("rel");
							var outerHTML = $(this).prop("outerHTML");
							$("#"+aColumnsId+" .jspPane").append(outerHTML);
							$("#"+vColumnsId+" li[rel='"+this_rel+"']").remove();
						});
					}
				}
				if(buttonClicked == "next-up-single"){
					if(visibleColumnsActiveLength == 1){
						  	var liItem = $(self).find("#"+vColumnsId+" li.active");
						    if (liItem.prev().is('li'))
						    {
						        liItem.insertBefore(liItem.prev())
						        	$(self).find("#"+vColumnsId).data('jsp').scrollToElement(liItem,false);
						    }
					}else{
						if(visibleColumnsActiveLength > 1){
							var liItem = $(self).find("#"+vColumnsId+" li.active:first");
							
						    if (liItem.prev().is('li'))
						    {
						        liItem.insertBefore(liItem.prev())
						        $(self).find("#"+vColumnsId).data('jsp').scrollToElement(liItem,false);
						    }
						    visibleColumnsItems.not(liItem).removeClass("active");
						    
						}else{
							getInformationAlert('multicolumn.select.atleast.column',"visible-columns");
							$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
						}
					}
				}
				if(buttonClicked == "next-down-single"){
					if(visibleColumnsActiveLength == 1){
						  	var liItem = $(self).find("#"+vColumnsId+" li.active");
						    if (liItem.next().is('li'))
						    {
						        liItem.insertAfter(liItem.next())
						        $(self).find("#"+vColumnsId).data('jsp').scrollToElement(liItem,false);
						    }
					}else{
						if(visibleColumnsActiveLength > 1){
							var liItem = $(self).find("#"+vColumnsId+" li.active:first");
							
						    if (liItem.prev().is('li'))
						    {
						        liItem.insertAfter(liItem.next())
						        $(self).find("#"+vColumnsId).data('jsp').scrollToElement(liItem,false);
						    }
						    visibleColumnsItems.not(liItem).removeClass("active");
						}else{
							getInformationAlert('multicolumn.select.atleast.column',"visible-columns");
							$.blockUI({ message: $('#alert-visible-columns'), css: { width: '275px' } });
						}
					}
				}
				
				if(buttonClicked == "create-assign-user-role"){				
					
					var records={};
					if($("#assign-userrole").length != 0){
						$("#assign-userrole").remove();
					}
					getModalPopUp(grid_assign_user_role_columns);
					setTimeout(function(){
						getAutoFocus("#assign-userrole");
						$("#form-assign-userrole").submit(function(){
							var output  = [];
							var roleName = $(this).find("[name=roleName]").val();
							var roleDesc = $(this).find("[name=roleDesc]").val();				
							if(!isEmpty(roleName)){
								output.push({"roleName":roleName,"roleDescription":roleDesc});						
								records["records"] = output;
								ajaxUrl = 'role/add-role';
								var ajaxObject = {
										"ajaxURL" : ajaxUrl,
										"params" : {"records" :JSON.stringify(records)},
										"successCallback" : function(obj){
											if(getResultCode(obj.resultCode) == CODE_SUCCESS){	
												var returnObjects = obj.returnObject;
												$("#assign-userrole").modal('hide');
												var liInput = document.createElement("li");
												if(returnObjects.isVisible == false){
													$(liInput).attr({
														"value" : returnObjects.columnId,
														"rel"   : returnObjects.columnId,
														"data-order" : 0,
														"class" : "active"
													}).text(returnObjects.columnDispNameKey);
													if($("#"+aColumnsId).find('li:last').length > 0){
														$($(liInput).prop("outerHTML")).insertAfter($("#"+aColumnsId).find('li:last'));
													}else{
														if($("#"+aColumnsId).find(".jspPane")){
															$($(liInput).prop("outerHTML")).appendTo($("#"+aColumnsId).find(".jspPane"));
														}else{
															$($(liInput).prop("outerHTML")).appendTo($("#"+aColumnsId));
														}
													}
													var scrollPane = $("#"+aColumnsId).jScrollPane().data('jsp');
													scrollPane.scrollToBottom();
												}else{
													$(liInput).attr({
														"value" : returnObjects.columnId,
														"rel"   : returnObjects.columnId,
														"data-order" : 0,
														"class" : "active"
													}).text(returnObjects.columnDispNameKey);
													if($("#"+vColumnsId).find('li:last').length > 0){
														$($(liInput).prop("outerHTML")).insertAfter($("#"+vColumnsId).find('li:last'));
													}else{
														if($("#"+vColumnsId).find(".jspPane")){
															$($(liInput).prop("outerHTML")).appendTo($("#"+vColumnsId).find(".jspPane"));
														}else{
															$($(liInput).prop("outerHTML")).appendTo($("#"+vColumnsId));
														}
													}
													
													var scrollPane = $("#"+vColumnsId).jScrollPane().data('jsp');
													scrollPane.scrollToBottom();
												}
											}else{
												var onfly_lightbox_wrapper = $("#assign-userrole").find(global_lightbox_wrapper);
												generateMsg(obj.resultCode, obj.messageKey,onfly_lightbox_wrapper,"",obj.responseDetail);
											}
										},
										"failureCallback" : function(){} ,
										"loader" : true,
										"loaderWrapper" : "#assign-userrole ul"
								   };
								   ajaxCallBack(ajaxObject);
							   }else{
									var validationObject = {
									        "errorCode" : 1,
									        "className" : "text",
									        "errorMsg" : "create_role_name_error",
									        "inputName" : "roleName",
									        "formId" : '#form-assign-userrole'
									};
									setInlineValidation(validationObject);
							   }
							   return false;
						});
					},1000);
				}		
				//create-assign-group
				if(buttonClicked == "create-assign-group"){				
					
					var records={};
					if($("#assign-usergroup").length != 0){
						$("#assign-usergroup").remove();
					}
					getModalPopUp(grid_assign_user_group_columns);
					setTimeout(function(){
						getAutoFocus(grid_assign_user_group_columns);
						$("#form-assign-usergroup").submit(function(){						
							var groupName = $(this).find("[name=groupName]").val();
							var groupDesc = $(this).find("[name=groupDesc]").val();				
							
							if(!isEmpty(groupName)){
								var output  = [];
								output.push({"groupName":groupName,"groupDescription":groupDesc});						
								records["records"] = output;
								ajaxUrl = 'role/add-role';
								
								var ajaxObject = {
										"ajaxURL" : ajaxUrl,
										"params" : {"records" :JSON.stringify(records)},
										"successCallback" : function(obj){
											if(getResultCode(obj.resultCode) == CODE_SUCCESS){	
												var returnObjects = obj.returnObject;
												$("#assign-usergroup").modal('hide');
												var liInput = document.createElement("li");
												if(returnObjects.isVisible == false){
													$(liInput).attr({
														"value" : returnObjects.columnId,
														"rel"   : returnObjects.columnId,
														"data-order" : 0,
														"class" : "active"
													}).text(returnObjects.columnDispNameKey);
													if($("#"+aColumnsId).find('li:last').length > 0){
														$($(liInput).prop("outerHTML")).insertAfter($("#"+aColumnsId).find('li:last'));
													}else{
														if($("#"+aColumnsId).find(".jspPane")){
															$($(liInput).prop("outerHTML")).appendTo($("#"+aColumnsId).find(".jspPane"));
														}else{
															$($(liInput).prop("outerHTML")).appendTo($("#"+aColumnsId));
														}
													}
												
													var scrollPane = $("#"+aColumnsId).jScrollPane().data('jsp');
													scrollPane.scrollToBottom();
												
												}else{
													$(liInput).attr({
															"value" : returnObjects.columnId,
															"rel"   : returnObjects.columnId,
															"data-order" : 0,
															"class" : "active"
														}).text(returnObjects.columnDispNameKey);
														if($("#"+vColumnsId).find('li:last').length > 0){
															$($(liInput).prop("outerHTML")).insertAfter($("#"+vColumnsId).find('li:last'));
														}else{
															if($("#"+vColumnsId).find(".jspPane")){
																$($(liInput).prop("outerHTML")).appendTo($("#"+vColumnsId).find(".jspPane"));
															}else{
																$($(liInput).prop("outerHTML")).appendTo($("#"+vColumnsId));
															}
														}
														
														var scrollPane = $("#"+vColumnsId).jScrollPane().data('jsp');
														scrollPane.scrollToBottom();
												}
												
											}else{
												var onfly_lightbox_wrapper = $("#assign-usergroup").find(global_lightbox_wrapper);
												generateMsg(obj.resultCode, obj.messageKey,onfly_lightbox_wrapper,"",obj.responseDetail);
											}
										},
										"failureCallback" : function(){} ,
										"loader" : true,
										"loaderWrapper" : "#assign-usergroup ul"
								   };
								   ajaxCallBack(ajaxObject);
							   }else{
									var validationObject = {
									        "errorCode" : 1,
									        "className" : "text",
									        "errorMsg" : "create_group_name_error",
									        "inputName" : "groupName",
									        "formId" : '#form-assign-usergroup'
									};
									setInlineValidation(validationObject);
									return false;
							   }
						});
					},500);
				}
				if(buttonClicked == "create-assign-tags"){				
					
					var records={};
					if($("#assign-usertags").length != 0){
						$("#assign-usertags").remove();
					}
					getModalPopUp(grid_assign_tags_columns);
					
					setTimeout(function(){
						getAutoFocus(grid_assign_tags_columns);
						$("#form-assign-tags").submit(function(){						
							var tagsName = $(this).find("[name=tagsName]").val();
							var tagsDesc = $(this).find("[name=tagsDesc]").val();				
							
							if(!isEmpty(tagsName)){
								var output  = [];
								output.push({"tagsName":tagsName,"tagsDescription":tagsDesc});						
								records["records"] = output;
								ajaxUrl = 'resource/add-tags';
								
								var ajaxObject = {
										"ajaxURL" : ajaxUrl,
										"params" : {"records" :JSON.stringify(records)},
										"successCallback" : function(obj){
											if(getResultCode(obj.resultCode) == CODE_SUCCESS){
												var returnObjects = obj.returnObject;
												$("#assign-usergroup").modal('hide');
												var liInput = document.createElement("li");
												if(returnObject.isVisible == false){
													$(liInput).attr({
														"value" : returnObjects.columnId,
														"rel"   : returnObjects.columnId,
														"data-order" : 0,
														"class" : "active"
													}).text(returnObjects.columnDispNameKey);
													if($("#"+aColumnsId).find('li:last').length > 0){
														$($(liInput).prop("outerHTML")).insertAfter($("#"+aColumnsId).find('li:last'));
													}else{
														if($("#"+aColumnsId).find(".jspPane")){
															$($(liInput).prop("outerHTML")).appendTo($("#"+aColumnsId).find(".jspPane"));
														}else{
															$($(liInput).prop("outerHTML")).appendTo($("#"+aColumnsId));
														}
													}
												
													var scrollPane = $("#"+aColumnsId).jScrollPane().data('jsp');
													scrollPane.scrollToBottom();
												
												}else{
													$(liInput).attr({
														"value" : returnObjects.columnId,
														"rel"   : returnObjects.columnId,
														"data-order" : 0,
														"class" : "active"
													}).text(returnObjects.columnDispNameKey);
													if($("#"+vColumnsId).find('li:last').length > 0){
														$($(liInput).prop("outerHTML")).insertAfter($("#"+vColumnsId).find('li:last'));
													}else{
														if($("#"+vColumnsId).find(".jspPane")){
															$($(liInput).prop("outerHTML")).appendTo($("#"+vColumnsId).find(".jspPane"));
														}else{
															$($(liInput).prop("outerHTML")).appendTo($("#"+vColumnsId));
														}
													}
													
													var scrollPane = $("#"+vColumnsId).jScrollPane().data('jsp');
													scrollPane.scrollToBottom();
												}
												
											}else{
												var onfly_lightbox_wrapper = $("#assign-usertags").find(global_lightbox_wrapper);
												generateMsg(obj.resultCode, obj.messageKey,onfly_lightbox_wrapper,"",obj.responseDetail);
											}
										},
										"failureCallback" : function(){} ,
										"loader" : true,
										"loaderWrapper" : "#assign-usertags ul"
								   };
								   ajaxCallBack(ajaxObject);
							   }else{
									var validationObject = {
									        "errorCode" : 1,
									        "className" : "text",
									        "errorMsg" : "create_tags_name_error",
									        "inputName" : "tagsName",
									        "formId" : '#form-assign-tags'
									};
									setInlineValidation(validationObject);
							   }
						});
					},1000);
				}
		});
		$(self).find("a.clear-all").on("click",function(){
			$(self).find("#"+aColumnsId+" li").removeClass("active");
		});
		$(self).find("a.clear-visibles").on("click",function(){
			
			$(self).find("#"+vColumnsId+" li").removeClass("active");
		});
	},
	
	/* function for manage column scrollbar */
	baseGridActions.mngColumnsScroll =  function($container,$selector,$element,$timeout) {
		  unblockUI($container,1);
		  generateBlockUI($container,1);
		  var containerLength = $($container).find("li").length;
		  setTimeout(function(){
		   unblockUI($container,1);
		   if($selector.has(".jsp") && containerLength > 1 ) { 
		    $selector.data('jsp').scrollToElement($element,true);
		   }
		  },$timeout);
	},
	
	/* function to generate batch edit form */
	baseGridActions.setViewForm =  function(viewActions,elementWrapperId) {
		$(elementWrapperId).undelegate(".view-page","click touchend");
		$(elementWrapperId).delegate(".view-page","click touchend",function(e){
			e.preventDefault();
			var thisValue = $(this);
			var openUrl = "";
			var ajaxReq = isSet(thisValue.attr("data-ajaxreq")) && thisValue.attr("data-ajaxreq") != ''?thisValue.attr("data-ajaxreq"):"";
			if(isSet(ajaxReq) && ajaxReq == "true"){
				var ajaxObject = {
						"ajaxURL" :  SetWebApiURL+viewActions.openUrl,
						"params" : {"recordId" : thisValue.attr("data-rel")},
						"successCallback" : function(obj){
							var pageContextParams = JSON.stringify([{"recordId" : thisValue.attr("data-rel") , "code" : thisValue.attr("data-row-code"), "version": thisValue.attr("data-row-version"),"parentRecordCode": thisValue.attr("data-row-parentrecordcode")}]);
							var redirectUrl = obj.returnObject.url;
							var redirectConfig = {
									"recordId" : thisValue.attr("data-rel"),
									"openUrl"  : redirectUrl,
									"openType" : "newPage",
									"pageType" : "VIEW",
									//"pageKey": thisValue.attr("data-screen")?thisValue.attr("data-screen"):screenName,
									"pageId": thisValue.attr("data-pageId")?thisValue.attr("data-pageId"):current_moduleId,
									"recordCodes" : thisValue.attr("data-row-code"),
									"pageContextParams":pageContextParams
							};
							baseFunctions.setSelectedRecords(redirectConfig);
						},
						"failureCallback" : generateFailure
				}
				ajaxCallBack(ajaxObject);
			}else{
				var pageContextParams = JSON.stringify([{"recordId" : thisValue.attr("data-rel") , "code" : thisValue.attr("data-row-code"), "version": thisValue.attr("data-row-version"),"parentRecordCode": thisValue.attr("data-row-parentrecordcode")}]);
				var redirectConfig = {
						"recordId" : thisValue.attr("data-rel"),
						"openUrl"  : viewActions.openUrl,
						"openType" : "newPage",
						"pageType" : "VIEW",
						//"pageKey": thisValue.attr("data-screen")?thisValue.attr("data-screen"):screenName,
						"pageId": thisValue.attr("data-pageId")?thisValue.attr("data-pageId"):current_moduleId,
						"recordCodes" : thisValue.attr("data-row-code"),
						"pageContextParams":pageContextParams
				};
				baseFunctions.setSelectedRecords(redirectConfig);
			}
		});
	},	

	/* grid action owl-carousel menu */
	baseGridActions.subGridCarouselMenu =  function() {
		$('.owl-carousel').owlCarousel({
		    loop:true,
		    margin:10,
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:2,
		            nav:true
		        },
		        600:{
		            items:3,
		            nav:true
		        },
		        1000:{
		            items:5,
		            nav:true,
		            loop:false
		        }
		    }
		});
		baseGridActions.checkWidth();
	},
	
	/* grid action owl-carousel menu remove next-prev icon*/
	baseGridActions.checkWidth =  function() {
		var $window = $(document);
	    var windowsize = $window.width();
	    if (windowsize > 600) {
	        $( ".owl-carousel" ).each(function() {
				if($(this).find('.owl-item').length <= 5){
					$(this).find('.owl-nav').hide();
				}
			});
	    }else{
			$('.owl-carousel').find('.owl-nav').show();
		}
	},

	baseGridActions.closeActionPopUp =  function() {
		$(document).undelegate(".action-popup-close","click");
		$(document).delegate(".action-popup-close","click",function(){
			$(this).parents("[role=dialog]").modal("hide");
		});
	}

	baseGridActions.getCountOfAction =  function(gridActions) {
		var outputTotalActions = 0;
		var commandTotalActions = 0;
		if(isSet(gridActions.outputActions)){
			
			for(var  i = 0; i< gridActions.outputActions.length; i++){
				var gridAction = gridActions.outputActions[i];
				if(gridAction.isState == true){
					outputTotalActions++;
				}
			}	
		}
		if(isSet(gridActions.commandActions)){
			
			for(var  i = 0; i< gridActions.commandActions.length; i++){
				var gridAction = gridActions.commandActions[i];
				if(gridAction.isState == true){
					commandTotalActions++;
				}
			}	
		}
		var actionReturns = {
				"outputTotalActions" : outputTotalActions,
				"commandTotalActions" : commandTotalActions
		};
		
		return actionReturns;
	}
	
	/* function for popup grid ajax */
	baseGridActions.callGridPopupAjax = function(ajaxURL){

		var queryStringPath = getQueryString(ajaxURL);
		var splitQueryString = queryStringPath.toString().split(",");
		var subGridcol = [];
		var subGriditem = {};
		var fc = splitQueryString[0];
		var fo = "EQ";
		var fv = splitQueryString[2];
		var fs = "1";
		subGriditem = {filterColumnName:fc, filterOperator:fo ,filterValue:fv,filterStatus:fs };
		subGridcol.push(subGriditem);
		subGridFilterData =  jsonStringify(subGridcol);
		var ajaxObject = {
				"ajaxURL" : ajaxURL.split("?")[0],
				"params" : {"pageId" : splitQueryString[1], "filterCriteria" : subGridFilterData},
				"successCallback" : function(obj){
					if(getResultCode(obj.resultCode) == CODE_SUCCESS){
						baseFunctions.tableGrid(obj);
					}else{
						generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
					}
				},
				"failureCallback" : function(){},
				"loader" : false
		};
		ajaxCallBack(ajaxObject);
	}

	baseGridActions.callSubGridAjax = function(ajaxURL){

		  var queryStringPath = getQueryString(ajaxURL);
		  var splitQueryString = queryStringPath.toString().split(",");
		  var subGridcol = [];
		  var subGriditem = {};
		  var fc = splitQueryString[0];
		  var fo = "EQ";
		  var fv = splitQueryString[2];
		  var fs = "1";
		  subGriditem = {filterColumnName:fc, filterOperator:fo ,filterValue:fv,filterStatus:fs };
		  subGridcol.push(subGriditem);
		  subGridFilterData =  jsonStringify(subGridcol);
		  var ajaxObject = {
			    "ajaxURL" : SetWebApiURL+"set-subgrid-filter-criteria",
			    "params" : {"pageId" : splitQueryString[1], "filterCriteria" : subGridFilterData},
			    "successCallback" : function(obj){
				     if(getResultCode(obj.resultCode) == CODE_SUCCESS){
				      window.location.href = ajaxURL.split("?")[0];
				     }else{
				    	 generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
				     }
			    },
			    "failureCallback" : function(){},
			    "loader" : false
		  };
		  ajaxCallBack(ajaxObject);
    }
	baseGridActions.callViewAjax = function (url,this_val){
	     var thisValue = $(this_val);
		 var ajaxUrl = SetWebApiURL + url;
		 var ajaxObject = {
			   "ajaxURL" : ajaxUrl,
			   "successCallback" : function(obj){
			    if(getResultCode(obj.resultCode) == CODE_SUCCESS){
				     if(isSet(obj.returnObject.url) && obj.returnObject.url !=""){
				    	   var pageContextParams = JSON.stringify([{"recordId" : thisValue.attr("data-rel") , "code" : thisValue.attr("data-row-code"), "version": thisValue.attr("data-row-version")}]);
				    	   var redirectConfig = {
					    	     "recordId" : thisValue.attr("rel"),
					    	     "openUrl"  : obj.returnObject.url,
					    	     "openType" : "newPage",
					    	     "pageType" : "VIEW",
					    	     //"pageKey": thisValue.attr("data-screen")?thisValue.attr("data-screen"):screenName,
					    	     "recordCodes" : thisValue.attr("data-row-code"),
					    	     "pageContextParams":pageContextParams
				    	   };
				    	   baseFunctions.setSelectedRecords(redirectConfig);
				     }
			    }else{
			    	generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
			    }
		   },
		   "failureCallback" : generateFailure,
		 };
		 ajaxCallBack(ajaxObject);
   }
   
   
   
   
	baseGridActions.generateManageColumn  =  function(componentObject) {
		var modalHtml = componentObject.modalHTML;
		var blockWrapper = componentObject.blockWrapper;
		var wrapperId = componentObject.wrapperId;
		var getURL = componentObject.getURL;
		var setURL = componentObject.setURL;
		
		$(".panel-grid-main").append(modalHtml);
		//getModalPopUp(modalHtml);
		
		setTimeout(function(){
			ajaxUrl = SetWebApiURL+getURL;
			var ajaxObject = {
					"ajaxURL" : ajaxUrl,
					"params" : {"pageId" : current_moduleId,"gridKey":listGridDetails.gridKey},
					"successCallback" : function(obj){
							if(getResultCode(obj.resultCode) == CODE_SUCCESS){
								var manageColumnConfig = obj.returnObject.manageColumnsConfig;
								
								var manageColumnConfig_column1 = [];
								var manageColumnConfig_column2 = [];
								
								for(var i =0; i< manageColumnConfig.totalColumnCount; i++){
									var columnValueObject = manageColumnConfig.columnValueObjects;
									if(columnValueObject[i].isVisible == true){
										manageColumnConfig_column1.push(columnValueObject[i]);
									}else{	
										manageColumnConfig_column2.push(columnValueObject[i]);
									}
								}
								
								var obj = {
										'manageColumnConfig':manageColumnConfig_column1,
										'blockWrapper': blockWrapper,
										'listWrapper':"visible-columns",
										'search':0
									};
								
								baseGridActions.generateManageList(obj);
								
								var obj = {
										'manageColumnConfig':manageColumnConfig_column2,
										'blockWrapper': blockWrapper,
										'listWrapper':"all-columns",
										'search':0
									};
								baseGridActions.generateManageList(obj);
								
								baseFunctions.generateScrollbar(wrapperId+" ul");
								$(wrapperId).find("[data-type = submit]").click(function(){
									var output = {};
									var iColumnOrder = 1;
									if($(wrapperId).find("ul#visible-columns li").length == 0){
										generateMsg(1,'select.one.column',global_lightbox_wrapper);
										return false;
									}
									$(wrapperId).find("ul#visible-columns li").each(function() {
										 var ci = $(this).attr("value");
										 var co = $(this).data("order");
										 if(typeof output["columnValueObjects"] == "undefined"){
												output["columnValueObjects"] = [];
											}
											output["columnValueObjects"].push({
												"columnId" 	  : ci,
												"columnOrder" : iColumnOrder++		
											});
									});
									var myString = JSON.stringify(output);
									var gridContext = listGridDetails.gridDispKey+"-"+listGridDetails.gridKey;
									
									ajaxUrl = SetWebApiURL+setURL;
									var ajaxObject = {
											"ajaxURL" : ajaxUrl,
											"params" : {"manageColumnsJson" : myString ,"pageId" : current_moduleId,"gridKey":listGridDetails.gridKey},
											"successCallback" : function(data){
												if(getResultCode(data.resultCode) == CODE_SUCCESS)
												{
													/*selected_page_records = $(page_records_selector).val();
													var ajaxPaginationParams = {
															"ajaxURL" 			: SetWebApiURL+'json/page-details.json',
															"pageNo"  			: 1,
															"recordsPerPage"	: selected_page_records,
															"currentPage"		: 1,
															"wrapperId"			: gridContext,
															"loader" : true,
															"loaderWrapper" : "#"+gridContext
													};
													baseGridActions.getPageDetails(ajaxPaginationParams);*/
												}else{
													generateMsg(data.resultCode,data.messageKey,global_lightbox_wrapper,"",data.responseDetail);
												}
											} ,
											"failureCallback" : function(){},
											"wrapperId"       : panel_grid_content_id,
											"loader" : true,
											"loaderWrapper" : wrapperId+" .modal-content"
									};
									ajaxCallBack(ajaxObject);
								});
								baseGridActions.manageColumnsActions(wrapperId);
							}
					},
					"failureCallback" : function(){} ,
					"loader" : true,
					"loaderWrapper" : wrapperId+" ul"
			};
			ajaxCallBack(ajaxObject);
		},200);
	}
})(window.baseGridActions = window.baseGridActions || {}, jQuery);