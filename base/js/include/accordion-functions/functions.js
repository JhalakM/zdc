/*
|@author : Intech Creative Services
|@desc   : Commonly used functions to call ajax, ajax success/failure callback, exceptions etc.
*/
(function(baseFunctions, $, undefined) {
	
	baseFunctions.appendAddFormHTML =  function() {
		// Append addmore html
		$(selector_panel_block_head_content).append(add_more_block);
	},
	
	baseFunctions.appendEditFormHTML =  function(lbFlag) {
		if(lbFlag == 1){
			if ($(selector_content_section).find(batchupdate_form_block_selecter).length){
				$(selector_content_section).find(batchupdate_form_block_selecter).remove();
			}
			var batch_update_lightbox_block_html = $(batchupdate_lightbox_block);
			$($(batch_update_lightbox_block_html).prop("outerHTML")).appendTo(selector_content_section);
		}else{
			// Append editmore html
			$(selector_panel_block_head_content).append(edit_more_block);
		}	
	},
	
	baseFunctions.appendViewFormHTML =  function(lbFlag) {
		// Append addmore html
		$(selector_panel_block_head_content).append(view_more_block);
	},
	
	baseFunctions.generateListRecords =  function() {
		$(document).delegate('.app-action-group  a[data-rel = app-action-form-listview]','click touchend',function(){
			var openType = $(this).attr("data-openType");
			if(openType == "newPage"){
				window.location = SetWebURL+$(this).attr("data-openUrl");
				return false;
			}
		});
	},
	
	/** generate add records **/
	baseFunctions.generateAddRecords =  function() {
		//baseFunctions.appendAddFormHTML();
		//$(app_action_form_block_wrapper).hide();
		$('.app-action-group > a').removeClass('active');
		$(document).undelegate('a[data-rel = app-action-form-addmore]','click touchend');
     	$(document).delegate('a[data-rel = app-action-form-addmore]','click touchend',function(){//.app-action-group
     		$("#batchupdate-form-block").remove();
     		var contextParams = accordionConfigs.contextParams?[accordionConfigs.contextParams]:[];
     		var openType = $(this).attr("data-openType");
     		var redirectConfig = {
					"openUrl"  : $(this).attr("data-openUrl"),
					"openType" : openType,
					"pageType" : "ADD",
					"pageKey"  : $(this).attr("data-pagekey"),
					"pageId"   : $(this).attr("data-pageid"),
					"pageContextParams": jsonStringify(contextParams),
			};
     		if(openType != "undefined")
     			baseFunctions.setSelectedRecords(redirectConfig,"baseFunctions.setSelectedAddScreen");
     	});
	},
	baseFunctions.generateDeatilAction = function(detailActions){
		$(document).undelegate(".detail-action","click touchend");
		$(document).delegate(".detail-action","click touchend", function(){
			var dynamicPopUpId = $(this).attr("data-gridkey");
			if($("#"+dynamicPopUpId).length > 0){
				$("#"+dynamicPopUpId).remove();
			}
			var subMenuHTML = "";
			var getMainHTML = $(grid_all_action_submenu_block);
			getMainHTML.attr("id",dynamicPopUpId);
			if(isSet(detailActions)){
				var subMenuHTML_1 = $(grid_all_action_submenu_title_block);
				var subGridActionHTML_1 = baseFunctions.setDtailActionAttr(detailActions);
				subMenuHTML_1.find(".owl-carousel").append(subGridActionHTML_1);
				subMenuHTML += $(subMenuHTML_1).prop("outerHTML");
			}
			getMainHTML.find(".action-box").append(subMenuHTML);
			getModalPopUp(getMainHTML);
			baseGridActions.closeActionPopUp(dynamicPopUpId);
			setTimeout(function(){
				baseGridActions.subGridCarouselMenu();
			},300);
			$('body').css("padding-right", "0px");
		});
	},
	baseFunctions.setDtailActionAttr =  function(detailActions) {
		var grid_actions_group_link = "";
		var grid_actions_group_html = "";
		for(var  i = 0; i< detailActions.length; i++){
			var fireAction = detailActions[i];
			var className = fireAction.actionName.replace("Action", "-action");
			if(isSet(fireAction.actionName)){
				if(fireAction.isState){
					grid_actions_group_link = $(grid_all_action_submenu_content_block);
					
					grid_actions_group_link.find("a").attr({
						"data-openUrl"  :  fireAction.openUrl,
						"data-openType" : fireAction.openType,
						"data-max-records" : fireAction.maxRecords,
						"href" :"javascript:void(0);",
						"data-min-records" : fireAction.minRecords
					}).addClass(className.toLowerCase()+" action-popup-close");
					grid_actions_group_link.find("span.action-title").text(i18NCall(fireAction.tooltipKey));
					var functionCallback = "details_"+fireAction.actionName;
					if(window[current_zodiac+"Functions"][functionCallback]){
						window[current_zodiac+"Functions"][functionCallback](fireAction);
					}
					grid_actions_group_html += grid_actions_group_link.prop("outerHTML");
				}
			}
		}
		return grid_actions_group_html;
	},
	baseFunctions.generateAddFetchForm =  function(elementWrapper,lbFlag,redirectConfig) {
		var elementId = "#"+elementWrapper;
		
		if(!isSet(redirectConfig)) redirectConfig = {};
		
		var openUrl = isSet(redirectConfig.openUrl)?redirectConfig.openUrl+"/":"";
		var pageIdAdd  = isSet(redirectConfig.pageId)?redirectConfig.pageId:current_moduleId;
		var screenNameAdd = isSet(redirectConfig.pageKey)?redirectConfig.pageKey:screenName;
		
		if($(elementId).find("form").length==0){
			var ajaxUrl = SetWebApiURL+openUrl+"add-form";
			var ajaxObject = {
					"ajaxURL" : ajaxUrl,
					"params" : {"pageId" :pageIdAdd, "pageName":"ADD", "pageKey" : screenNameAdd,"accordionKey":""},
					"successCallback" : function(object){
						baseFunctions.generateAddmoreFormSuccess(object,elementWrapper,lbFlag);
					},
					"failureCallback" : baseFunctions.generateFailure,
					"wrapperId" 	  : elementWrapper,
					"loaderWrapper"	  : "."+$("body").attr("class"),
					"loader"		  : true
			};
			ajaxCallBack(ajaxObject);
		}else{
			getAutoFocus("#"+$(elementId).find("form").attr("id"));
		}
	},
	
	/* function to call dynamic form plugin for success */
	/*baseFunctions.generateAddmoreFormSuccess =  function(json_data,wrapperId) {
		var wrapper = "#"+wrapperId;
		var formInfoData = json_data.returnObject.formInfo;
		if (getResultCode(json_data.resultCode) == CODE_SUCCESS) {
			var groupProperty = formInfoData.hasOwnProperty("formGroups");
			var elementProperty = formInfoData.hasOwnProperty("formElements");
			if(groupProperty == false || elementProperty == false ){
				return false;
			}
			$(wrapper).dynamicForm({
				formObject : json_data.returnObject,
				callback : function(msg,dataArray){
					$(wrapper).validate({
						validation : dataArray.isValidation,
						optionalObj	: dataArray.optionalWarningObj,
						callback : function(object){
							selected_page_records = $(page_records_selector).val();
							var ajaxPaginationParams = {
									"ajaxURL" 			: SetWebApiURL+'page-details',
									"pageNo"  			: 1,
									"recordsPerPage"	: selected_page_records,
									"currentPage"		: 1,
									"wrapperId"			: panel_grid_content_id,
									"loader" : true,
									"loaderWrapper" : panel_grid_wrapper
							};
							baseGridActions.getPageDetails(ajaxPaginationParams);
						}
					});
				}
			});
		}
	},*/
	
	baseFunctions.generateAddmoreFormSuccess = function(json_data,wrapperId,lbFlag){
    	var wrapperId = "#"+wrapperId;
    	var formInfoData = json_data.returnObject.formInfo;
    	if (getResultCode(json_data.resultCode) == CODE_SUCCESS) {
    		var groupProperty = formInfoData.hasOwnProperty("formGroups");
    		var elementProperty = formInfoData.hasOwnProperty("formElements");
    		if(groupProperty == false || elementProperty == false ){
    			return false;
    		}
    		
    		lightBox = false;
    		hiddenPeraArray = [];
    		if(lbFlag == 1){
    			if ($(selector_content_section).find(batchupdate_form_block_selecter).length != 0){
    				$(selector_content_section).find(batchupdate_form_block_selecter).remove();
    			}
    			
    			var batch_update_lightbox_block_html = $(batchupdate_lightbox_block);
    			$($(batch_update_lightbox_block_html).prop("outerHTML")).appendTo(selector_content_section);
    			
    			getModalPopUp(batchupdate_form_block_selecter);
    			getAutoFocus(batchupdate_form_block_selecter);
    			$(app_action_form_addmore_wrapper).hide();
    			$(".app-action-group a.add-more").removeClass('active');
    			var formHTML = $(div_form_element).appendTo(batchupdate_form_content_selecter);
    			$(formHTML).attr({"id" : wrapperId });
    			lightBox = true;
    			hiddenPeraArray = accordionConfigs.contextParams;
    		}
    		$(wrapperId).dynamicForm({
    			formObject : json_data.returnObject,
    			lightBoxFlag   : lightBox,
    			callback : function(msg,dataArray){
    				$(wrapperId).validate({
    					validation : dataArray.isValidation,
    					optionalObj	: dataArray.optionalWarningObj,
    					hiddenParams: hiddenPeraArray,
    					alert	   		: false,
    					editMode        : false,
    					callback : function(object){
    					}
    				});
    			}
    		});
    	}
    } 
	
	baseFunctions.generateBatchEditFetchForm =  function(wrapperId,lbFlag,redirectConfig) {
		
		if(!isSet(redirectConfig)) redirectConfig = {};
		
		var openUrl = isSet(redirectConfig.pageKey)?(redirectConfig.pageKey.toLowerCase())+"/":"";
		var pageIdAdd  = isSet(redirectConfig.pageId)?redirectConfig.pageId:current_moduleId;
		var screenNameAdd = isSet(redirectConfig.pageKey)?redirectConfig.pageKey:screenName;
		
		var ajaxUrl = SetWebApiURL + openUrl + "batch-edit-form";
		var ajaxObject = {
				"ajaxURL" : ajaxUrl,
				"params" : {"pageId" :pageIdAdd, "pageKey" : screenNameAdd,"pageName": "EDIT","accordionKey":""},
				"successCallback" : function(object){
					baseFunctions.generateBatchupdateFormSuccss(object,wrapperId,lbFlag);
				},
				"failureCallback" : generateFailure,
				"loaderWrapper"	  : "."+$("body").attr("class"),
				"loader"		  : true,
				"wrapperId" 	  : wrapperId
		};
		ajaxCallBack(ajaxObject);
	},
	baseFunctions.accordion = function(accordionDto,accordionWrapper,hasSub){
	  	  if(isSet(accordionDto)){
	  	 		for(var i=0; i<accordionDto.length; i++){
	  	 			var accordionId = accordionDto[i].accordionKey;
	  	 			var acordionTitle = accordionDto[i].title;
	  	 			var accordionFunction = accordionArray[accordionId];
	  	 			var getRecordId = accordionConfigs.contextParams.recordId;
	  				var isOpenOnLoad 			= accordionDto[i].isOpenOnLoad;
	  				var openAccordionClass 		= "";
	  				if(isSet(isOpenOnLoad) && isOpenOnLoad == true){
	  					openAccordionClass 		= "openAccordionClass"; 
	  				}
	  	 			if(isSet(accordionFunction)){
	  	 				var accordionCreate = {
   							"id"    	  : accordionId,
   							"className"   : "app-action-form app-action-form-block "+openAccordionClass+" ",
   							"title"       : i18NCall(acordionTitle),
   							"recordId"	  :getRecordId,
   							"allowFilter" : false,
   							"subContent":hasSub,
   							"parentId":accordionWrapper?accordionWrapper:"",
   							"accordion_key":accordionId
	   					}
	  	 				baseFunctions.generateAccordion(accordionCreate);
	  	 				
	  	 				if(accordionFunction.mode == "GENERIC_GRID"){
	  	 					baseFunctions.accordionGrid(accordionDto[i],accordionConfigs.contextParams,false);
		  	 				baseFunctions.accordionActions(accordionDto[i]);
						}else if(accordionFunction.mode == "GENERIC_FORM_SWITCHING"){
							var wrapperId = $("#"+accordionId).find(".accordion-content-wrapper");
							baseFunctions.isViewForm(accordionId,wrapperId);
							baseFunctions.accordionActions(accordionDto[i]);
							baseFunctions.editAccordionAction();
						}else{
							
							if(isSet(accordionDto[i].accordionConfig)){
								baseFunctions.accordion(accordionDto[i].accordionConfig,accordionId,true);
					    	}else{
					    		var callback = accordionFunction.functions.split('.');
								if(window[callback[0]][callback[1]]){
									window[callback[0]][callback[1]](accordionDto[i],accordionConfigs.contextParams);
			  	 				}
					    	}
							
						}
	  	 			}
	  	 		}
	  	  }
	}
	baseFunctions.accordionActions = function(configs){
		if(isSet(configs.actions) && configs.actions.length >0){
				var getRecordId = accordionConfigs.contextParams.recordId;
				var accordionId = configs.accordionKey;
				for(var a=0; a<configs.actions.length;a++){
					var actionName 	= configs.actions[a].actionName;
					var active 		= configs.actions[a].isActive;
					var isState 	= configs.actions[a].isState;
					var tooltipKey 	= configs.actions[a].tooltipKey;
					var openUrl 	= configs.actions[a].openUrl;
					var openType 	= configs.actions[a].openType;
					var pageId 		= configs.actions[a].pageId;
					var pageKey 	= configs.actions[a].pageKey;
					
					if(configs.actions[a].actionName == "addAction" && isState == true){
						var addBtn = '<a href="javascript:void(0);" class="plus-icon accordion-action-add tooltip-bottom '+accordionId+'-add" data-openType="'+openType+'"  data-openUrl="'+openUrl+'" data-pageid="'+pageId+'" data-pagekey="'+pageKey+'" data-rel="app-action-form-addmore" data-accordionKey="'+accordionId+'"   title="'+i18NCall(tooltipKey)+'"></a>';
						$("#"+accordionId).find(".accordion-header:first .accordion-actions").append(addBtn);
					}
					if(configs.actions[a].actionName == "editAction" && isState == true ){
						var editBtn = '<a href="javascript:void(0);" class="edit-icon tooltip-bottom is-view accordion-action-edit '+accordionId+'-edit" data-accordionKey="'+accordionId+'" data-pageid="'+pageId+'" data-pagekey="'+pageKey+'"  title="'+i18NCall(tooltipKey)+'"></a>'; 
 						$("#"+accordionId).find(".accordion-header:first .accordion-actions").append(editBtn);
					}
				}
				baseFunctions.generateAddRecords();
				baseFunctions.editAccordionAction();
		}
	}
	baseFunctions.generateAccordionBatchEditFetchForm =  function(wrapperId,lbFlag,pageContextParams) {
		var ajaxUrl = SetWebApiURL+"batch-edit-form";
		var ajaxObject = {
				"ajaxURL" : ajaxUrl,
				"params" : {"pageId" :current_moduleId, "pageKey" : screenName,"pageName": "EDIT","accordionKey":""},
				"successCallback" : function(object){
					baseFunctions.generateBatchupdateFormSuccss(object,wrapperId,lbFlag);
					 
				},
				"failureCallback" : generateFailure,
				"wrapperId" 	  : wrapperId
		};
		ajaxCallBack(ajaxObject);
	},
	
	/* function for batch update success */
	baseFunctions.generateBatchupdateFormSuccss =  function(json_data,wrapper,lbFlag) {
		var wrapperId = "#"+wrapper;
		var formWrapper = $(wrapperId).find("form").attr("id");
		if (getResultCode(json_data.resultCode) == CODE_SUCCESS) {
			var formInfoData = json_data.returnObject.formInfo;
			var groupProperty = formInfoData.hasOwnProperty("formGroups");
			var elementProperty = formInfoData.hasOwnProperty("formElements");
			if(groupProperty == false || elementProperty == false ){
				return false;
			}
	
			var lightBox = false;
			if(lbFlag == 1){
				getModalPopUp(batchupdate_form_block_selecter);
				getAutoFocus(batchupdate_form_block_selecter);
			//	$(app_action_form_addmore_wrapper).hide();
				$(".app-action-group a.add-more").removeClass('active');
				var formHTML = $(div_form_element).appendTo(batchupdate_form_content_selecter);
				$(formHTML).attr({"id" : wrapperId });
				lightBox = true;
			}
			
			var selectedRecords = json_data.returnObject.formInfo.selectedValues;
			
			$(document).find(".selected-records").remove();
			var seletedRecordBlock = $(selected_record_block);
			
			var accordionSelectedRecord = "accordionSelectedRecord-1";
			var accordionConfig = {
				"id"    	  : accordionSelectedRecord,
				"className"   : "app-action-form openAccordionClass",
				"title"       : i18NCall("selected_records_accordion_title"),
				"allowFilter" : false,
			}
			baseFunctions.generateAccordion(accordionConfig,$(seletedRecordBlock));
			
			$(seletedRecordBlock).find(".accordion-form-wrapper").append(ele_checkbox);
			
			var actionRadio = $(action_select_records);
			$(actionRadio).find("#radio1").attr("checked","checked");
			$(seletedRecordBlock).find(".accordion-form-wrapper").prepend(actionRadio);
			
			checkHTML =  $(wrapperId).prepend($(seletedRecordBlock).prop("outerHTML"));	
			baseFunctions.accordionLoad("#"+accordionSelectedRecord);
			
			for(var i = 0; i<selectedRecords.length;i++){
				inputClone = document.createElement(selector_input);
				labelClone = document.createElement(selector_label);
				$(inputClone).attr({
					"name"    : 'selectedRecords',
					"type"    : 'checkbox',
					"data-type" : 'checkbox',
					"value"	  : selectedRecords[i].value,
					"id"	  : "selectedRecords-"+i,
					"class"	  : class_css_checkbox+" is-edited",
					"checked" : 'checked',
					"data-init-value" : selectedRecords[i].value,
					"data-row-code":selectedRecords[i].recordCode,
					"data-row-version":selectedRecords[i].version,
					"data-row-parentrecordcode":selectedRecords[i].parentRecordCode
				});
				
				if($(checkHTML).find(selector_checkbox).length<=1){
					$(checkHTML).find(selector_checkbox).attr({
						"data-type"    : 'checkbox',
						"data-name"    : 'selectedRecords'
					});
					$(checkHTML).find(selector_checkbox).append(inputClone);
					$(labelClone).attr({
						"for"	  : "selectedRecords-"+i
					}).text(selectedRecords[i].labelKey);
					$(labelClone).addClass('css-label');
					$(checkHTML).find(selector_checkbox).append(labelClone);
					if(selectedRecords.length > 1 ){
						$(checkHTML).find(".selected-records").show();
					}else{
						$(checkHTML).find(".selected-records").hide();
					}
				}
			}
			var getReturnObject = baseFunctions.setCommonAjaxConfig(wrapperId);
			var getPkValues;
			var pageContextParams = [];
			if(selectedRecords.length > 0){
				var col = [];
				var colCode = [];
				
				$(wrapperId).find( ".selected-records .checkbox input[type='checkbox']:checked" ).each(function( index ) {
					if($(this).prop("checked")==true){
						var recordId 		= $(this).val();
						var recordCode	  	= $(this).attr("data-row-code");
						var recordVersion   = $(this).attr("data-row-version");												
						var parentrecordcode   = $(this).attr("data-row-parentrecordcode");
						pageContextParams.push({ "recordId" : recordId , "code" : recordCode, "version": recordVersion,"parentRecordCode":parentrecordcode });
					}
				});
				var myString = JSON.stringify(col);
				var recordCodes = JSON.stringify(colCode);
				getPkValues = myString;
			}else{			
				pageContextParams = getReturnObject.colObject;
			}
			var hiddenPeraArray = pageContextParams;
			var message = {
					"message" : "batch.update.alert.message",
					"params"  : selectedCheckboxLength
			};
			$(wrapperId).dynamicForm({
				formObject : json_data.returnObject,
				lightBoxFlag   : lightBox,
				callback : function(msg,dataArray){
					$(wrapperId).validate({
						validation : dataArray.isValidation,
						optionalObj	: dataArray.optionalWarningObj,
						hiddenParams: hiddenPeraArray,
						alert	   		: true,
						alertMessage	: message,
						editMode        : true,//dataArray.editMode,
						callback : function(){
						
						}
					});
				}
			});
			
			/*setTimeout(function(){
				if(lbFlag == 1 && $(wrapperId).find(scroll_wrapper+" :input").length >= 10 || $(window).width() <= 660){
					baseFunctions.generateScrollbar($(wrapperId).find(scroll_wrapper));
				}
			},250);*/
		}else{
			generateMsg(json_data.resultCode,json_data.messageKey,global_message_wrapper,"",json_data.responseDetail);
		}
	},
	
	baseFunctions.checkSelectedRecord =  function(formId) {
		if($(formId).find(".selected-records").length > 0){
			var checkedBox = $(formId).find(".selected-records :input[type=checkbox]:checked").length;
			var message = "select.check.checkbox";
			var infoId  = "select-record";
			if(checkedBox == 0){
				getInformationAlert(message,infoId);
				$.blockUI({ message: $('#alert-'+infoId), css: { width: '275px' } });
				return false;
			}
		}
		return true;
	},
	
	baseFunctions.generateViewFetchForm =  function(wrapperId) {
		var ajaxUrl = SetWebApiURL + "view-form";
		var ajaxObject = {
				"ajaxURL" : ajaxUrl,
				"params" : {"pageId" :current_moduleId,"pageName":"VIEW", "pageKey" : screenName, "accordionKey" : "" },
				"successCallback" : function(object){
					baseFunctions.generateViewFormSuccss(object,wrapperId);
				},
				"failureCallback" : generateFailure,
				"wrapperId" 	  : wrapperId
		};
		ajaxCallBack(ajaxObject);
	},
	
	baseFunctions.generateViewFormSuccss =  function(json_data,wrapperId) {
		var wrapper = "#"+wrapperId;
		if (getResultCode(json_data.resultCode) == CODE_SUCCESS) {
			var formInfoData = json_data.returnObject.formInfo;
			var groupProperty = formInfoData.hasOwnProperty("formGroups");
			var elementProperty = formInfoData.hasOwnProperty("formElements");
			if(groupProperty == false || elementProperty == false ){
				return false;
			}
	
			$(wrapper).dynamicForm({
				formObject : json_data.returnObject,
				formType   : "view-form"
			});
			
			if(isSet(json_data.returnObject.formInfo.selectedValues)){
				$(wrapper).find("form").attr({"data-version":json_data.returnObject.formInfo.selectedValues[0].version});
			}
			if(isSet(json_data.returnObject.gridDetails)){
				$(wrapper).attr({"data-gridKey":json_data.returnObject.gridDetails[0].gridKey,"data-gridDispKey":json_data.returnObject.gridDetails[0].gridDispKey})
			}
		}else{
			generateMsg(json_data.resultCode,json_data.messageKey,global_message_wrapper,"",json_data.responseDetail);
		}
},
	
/* function to generate date picker */
baseFunctions.datePicker =  function(datePicId,addParams) {
		var startDate = "";
		var endDate = "";
		$(datePicId).on("focus",function(){
			if(!isEmpty($(datePicId).val())){
				if(addParams.singlePicker == true){
					startDate = endDate = $(datePicId).val();
				}else{
					var splitDate = $(datePicId).val().split("TO");
					startDate = splitDate[0];
					endDate = splitDate[1];
				}
			}else if($(datePicId).attr("startDate") == undefined || isEmpty($(datePicId).attr("startDate"))){
				startDate = endDate = new Date();
			}else{
				if(addParams.singlePicker == true){
					startDate = endDate = $(datePicId).attr("startDate");
				}else{
					startDate = $(datePicId).attr("startDate");
					endDate = $(datePicId).attr("endDate");
				}
			}
	
			var parentELWrapper = ($(datePicId).parents(".modal").length != 0)?$(datePicId).parent():$("body");
		    $(datePicId).daterangepicker({
		    	parentEl: parentELWrapper,
		    	showDropdowns: true,
		    	autoUpdateInput: false,
		    	autoApply: true,
		    	startDateEl : false,
		    	endDateEl : false,
		    	startDate : startDate,
		    	endDate : endDate,
		    	singleDatePicker:addParams.singlePicker,
		    	timePicker:addParams.timePicker,
		    	timePickerSeconds: addParams.timePickerSeconds,
		    	timePicker24Hour:addParams.timePicker24H,
		    	minDate : ($(datePicId).attr("minDate") == undefined || $(datePicId).attr("minDate") == "")?false:$(datePicId).attr("minDate"),
		    	maxDate : ($(datePicId).attr("maxDate") == undefined || $(datePicId).attr("maxDate") == "")?false:$(datePicId).attr("maxDate"),
		    	locale: {
		           format: $(datePicId).data("format"),
		    	   separator: ' TO ',
		    	   cancelLabel: 'Clear'
		        }
		    });
		  
		    $(datePicId).on('apply.daterangepicker', function(ev, picker) {
		    	if(addParams.singlePicker == false || $(datePicId).attr("dateRange") == true){
		    		$(this).val(picker.startDate.format($(datePicId).data("format")) + ' TO ' + picker.endDate.format($(datePicId).data("format")));
		    	}else{
		    		$(this).val(picker.startDate.format($(datePicId).data("format")));
		    	}
		    	$(this).trigger("focus");
		    	picker.hide();
		    });
		  
		    $(datePicId).on('cancel.daterangepicker', function(ev, picker) {
		        $(this).val('');
		    });
		    if(isSet(addParams.dateRange) && addParams.dateRange == true){
				$(datePicId).attr("dateRange","true");
			}else{
				$(datePicId).removeAttr("dateRange");
			}
		    
	       var thisVal = $(this);
	       setTimeout(function(){
	    	   if(parentELWrapper.parents(".scroll-wrapper").hasClass("jspScrollable")){
	    	   		parentELWrapper.parents(".scroll-wrapper").data('jsp').scrollToBottom();
				}
	       },500);
		});
	},
	
	baseFunctions.dateTimePicker =  function(timePicId,hourFormat) {
		$(timePicId).datetimepicker({
	        pickDate: false,
	        pick12HourFormat: hourFormat
	  });
	},
	
	/** generate dashboard **/
	baseFunctions.generate_dashboard = function(response_object)
	{
	  	if(getResultCode(response_object.resultCode) == CODE_BUSINESS){
	  		genLogout();
	  		generateErrorMsg(response_object.resultCode,response_object.messageKey,login_form_block_wrapper)
	  	}
	  	if(getResultCode(response_object.resultCode) == CODE_SUCCESS){
	  		$(selector_content_section).append(right_panel);
	  		$(selector_panel_block_content).append(dashboard_main_block);
	  		var dashboard_module_block_html = $(dashboard_module_block);
	  		
	  		var dahsboardConfig = response_object.returnObject.homeConfig;
	  		
	  		if(dahsboardConfig.dashboardGroup ==  true){
	  			
	  			baseFunctions.newDashboard(dahsboardConfig.navigationConfig);
	  		}else{
	  			var sortMenuObj = dahsboardConfig.navigationConfig; 
	  			sortMenuObj = sortString(sortMenuObj,"title",1);
	  			
	  			$.each(sortMenuObj, function(key,value){
	  				dashboard_module_block_html.find('a').attr({
	  																"href": (value.isAjaxReq == true)?"javascript:void(0);":value.link,
	  																"data-ajaxReq" : value.isAjaxReq,
	  																"data-newWindow" : value.isNewWindow,
	  																"rel"  			: value.link
	  														   });
	  				dashboard_module_block_html.find('h3').html(i18NCall(value.title));
	  				var fav = $(favorites_icon);
		  			
		  			if(isSet(value.isFavourite) && value.isFavourite == true)
		  				$(fav).addClass("selected");
		  				
		  			$(fav).attr("data-favouriteId",(value.favouriteId?value.favouriteId:""));
	  				$(fav).insertAfter($(dashboard_module_block_html).find('h3'));
	  				
	  				var iconName=value.iconName;
	  				var iconName_text=iconName.replace(".svg","");
	  				var iconName_hover_text=iconName_text+"-hover";
	  				var iconName_hover=iconName.replace(iconName_text,iconName_hover_text);
	  				
	  				var icon = getImagePath("base/img/icons/"+iconName,"");
					var icon_hover = getImagePath("base/img/icons/"+iconName_hover,"hover");
	  				
	  				dashboard_module_block_html.find('img.image').attr("src",icon);
	  				dashboard_module_block_html.find('img.image.hover').attr("src",icon_hover);
	  		
	  				dashboard_module_block_html.find(module_block_wrapper).addClass("dash-"+value.className);
	  				$(module_blocks_wrapper).append($(dashboard_module_block_html).prop("outerHTML"));
	  			});
	  		}
	  		baseFunctions.setFavourite();
	  	}
	}
	baseFunctions.newDashboard = function(dahsboardConfig){
		
	  	var dashboardBlock = $(new_dashboard_block);
	  	$.each(dahsboardConfig, function(key,value){
	  		var dashboard_group = $(dashboard_group_block);
	  		var group_title = i18NCall(value.groupName);    
	  		var group_icon   = value.groupIcon;
	  		var group_config = value.groupConfig;
	  		var dashboard_module_block_html = "";
	  		$(dashboard_group).find(".dashboard-group-title .nav-title span").text(group_title);
	  		var panelIcon = getImagePath("base/img/icons/"+group_icon,"panel");
	  		$(dashboard_group).find(".dashboard-group-title .nav-title span").text(group_title);
//	  		$(dashboard_group).find(".dashboard-group-title .nav-title i img").attr("src","base/img/icons/"+group_icon);
	  		var counts = 1;
	  		$.each(group_config, function(key,value){
	  			dashboard_module_block_html = $(dashboard_box_block);
	  			var newWindow = "";
	  			if(value.isNewWindow == true){
	  				newWindow  = "_blank"
	  			}
	  			dashboard_module_block_html.find('a').attr({
	  															"href": (value.isAjaxReq == true)?"javascript:void(0);":value.link,
	  															"data-ajaxReq" : value.isAjaxReq,
	  															"data-newWindow" : value.isNewWindow,
	  															"rel"  			: value.link,
	  															"target":newWindow
	  													   });
	  			dashboard_module_block_html.find('h3').html(i18NCall(value.title));
	  			var fav = $(favorites_icon);
	  			
	  			if(isSet(value.isFavourite) && value.isFavourite == true)
	  				$(fav).addClass("selected");
	  				
	  			$(fav).attr("data-favouriteId",(value.favouriteId?value.favouriteId:""));
  				$(fav).insertAfter($(dashboard_module_block_html).find('h3'));
  				
	  			var iconName=value.iconName;
	  			var iconName_text=iconName.replace(".svg","");
	  			var iconName_hover_text=iconName_text+"-hover";
	  			var iconName_hover=iconName.replace(iconName_text,iconName_hover_text);
	  			
	  			var icon = getImagePath("base/img/icons/"+iconName,"");
				var icon_hover = getImagePath("base/img/icons/"+iconName_hover,"hover");
	  			dashboard_module_block_html.find('img.image').attr("src",icon);
	  			dashboard_module_block_html.find('img.image.hover').attr("src",icon_hover);
	  			
	  			/*dashboard_module_block_html.find('img.image').attr("src","base/img/icons/"+iconName);
	  			dashboard_module_block_html.find('img.image.hover').attr("src","base/img/icons/"+iconName_hover);*/
	  	
	  			dashboard_module_block_html.find(module_block_wrapper).addClass("dash-"+value.className);
	  			if(value.isMajor == true){
	  				dashboard_module_block_html.addClass("col-md-12");
	  			}
	  			else{
	  				dashboard_module_block_html.addClass("col-md-6");
	  				if((parseInt(counts) % 2) == 0){
	  					dashboard_module_block_html.addClass("last");
	  				}
	  				counts++;
	  			}
	  			$(dashboard_group).find(".dash-box").append($(dashboard_module_block_html).prop("outerHTML"));
	  		});
	  		$(dashboardBlock).find(".masonry-grid").append($(dashboard_group).prop("outerHTML"));
	  		
	  	});
	  	$(module_blocks_wrapper).append($(dashboardBlock).prop("outerHTML"));
	  	$('.masonry-grid').masonry({
	  	  itemSelector : '.dash-content'
	  	});
	}
	
	baseFunctions.setFavourite =  function() {
		var flag = 0;
		$(document).undelegate(".fav-selector","click");
		$(document).delegate(".fav-selector","click",function(){
			if(flag == 0){
				flag = 1;
				var this_val = $(this);
				var isCurrent = ($(this).hasClass("selected") == true)?false:true;
				var favouriteid = $(this).attr("data-favouriteid");
				var ajaxUrl = SetWebApiURL + "mark-favourite";
				var ajaxObject = {
						"ajaxURL" : ajaxUrl,
						"params" : { "isFavourite" : isCurrent,"moduleId":favouriteid },
						"successCallback" : function(object){
							if(getResultCode(object.resultCode) == CODE_SUCCESS){
								$(this_val).toggleClass('selected');
								basePanel.headerFavorites(object.returnObject);
								flag = 0;
							}
						},
						"failureCallback" : generateFailure,
						"wrapperId" 	  : "",
				};
				ajaxCallBack(ajaxObject);
			}
		});
	}
	baseFunctions.generate_changePassword =  function() {
		var setChangePassForm = $(set_password_html_block);
		setChangePassForm.appendTo(selector_panel_block_content);
		var formWrapper = "#frmSetpass";
		$(formWrapper).captchaWord();
		$(document).delegate('.refresh-captcha','click',function(){
			$(formWrapper).captchaWord();
			$(formWrapper).find('#captcha_input').val('');
		});
		
		$(formWrapper).validate({
			validation : true,
			redirectPage : true,
			redirectURL : "/dashboard"
		});
	},
	
	baseFunctions.resetFormData =  function(wrapperId) {
		var resetWrapper = $(wrapperId).find("form [type=reset]");
		resetWrapper.trigger("click");
	},
	
	baseFunctions.checkDependency = function(formId,jsonObj){
		var formWrapperId = "#"+formId;
		
		if(isSet(jsonObj.mandatoryObj)){
			var mandatoryObj = jsonObj.mandatoryObj;
			for(var i = 0; i < mandatoryObj.length; i++){
				if(mandatoryObj[i].name != undefined){
					var fieldName = mandatoryObj[i].name;
					var possibleFields = mandatoryObj[i].possibleFields;
					var possibleDependency = mandatoryObj[i].possibleDependencies;
					$(formWrapperId+" [name = '"+fieldName+"']").on("change",function(){
						removePossibleFieldsValidation(possibleFields,formWrapperId);
						var formValue = getReturnValue(formWrapperId,$(formWrapperId+" [name = '"+fieldName+"']"));
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
											$(formWrapperId+" :input[name = '"+explodeField[fIndex]+"']").prop('disabled', false).selectpicker('refresh');
										}
										$(formWrapperId+" :input[name = '"+explodeField[fIndex]+"'],[data-name = '"+explodeField[fIndex]+"']").removeAttr("disabled");
										$(formWrapperId+" [name = '"+explodeField[fIndex]+"'],[data-name = '"+explodeField[fIndex]+"']").parents(selector_p_r_5).removeClass("element-clear");
										$(formWrapperId+" [name = '"+setEmptyFields+"'],[data-name = '"+setEmptyFields+"']").attr("checked",false);
										$(formWrapperId+" [name = '"+setEmptyFields+"'],[data-name = '"+setEmptyFields+"']").parents(".checkbox").hide();
									}
								});
							}
						});
					});
					$(formWrapperId+" [name = '"+fieldName+"']").trigger("change");
				}
			}
		}
		
		if(isSet(jsonObj.disableObj)){
				var disableObj = jsonObj.disableObj;
				for(var i = 0; i < disableObj.length; i++){
					if(isSet(disableObj[i].name)){
						var fieldName = disableObj[i].name;
						var possibleFields = disableObj[i].possibleFields;
						var possibleDependency = disableObj[i].possibleDependencies;
						$(formWrapperId+" [name = '"+fieldName+"']").on("change",function(){
							addPossibleFieldsDisabled(possibleFields,formWrapperId);
							var formValue = getReturnValue(formWrapperId,$(formWrapperId+" [name = '"+fieldName+"']"));
							$.each(possibleDependency,function(index,value){
								if(formValue == value.fieldValue){
									var explodeField = value.fieldValidate.split(",");
									$.each(explodeField,function(fIndex){
										var removeDisabled = $(formWrapperId+" [name = '"+explodeField[fIndex]+"'],[data-name = '"+explodeField[fIndex]+"']");
										
										if($(formWrapperId+" :input[name = '"+explodeField[fIndex]+"']").data("type") == "select-one"){
											$(formWrapperId+" :input[name = '"+explodeField[fIndex]+"']").prop('disabled', false).selectpicker('refresh');
										}
										removeDisabled.removeAttr("disabled");
										removeDisabled.siblings(".error-message").css("display","block");
										
									});
								}
							});
						});
						$(formWrapperId+" [name = '"+fieldName+"']").trigger("change");
					}
				}
			}
	}

	baseFunctions.checkToggleDependency = function(formId,jsonObj){
		var formWrapperId = "#"+formId;
		
		if(isSet(jsonObj.toggleComponentObj)){
			var toggleComponentObj = jsonObj.toggleComponentObj;
			for(var i = 0; i < toggleComponentObj.length; i++){
				if(toggleComponentObj[i].name != undefined){
					var fieldName = toggleComponentObj[i].name;
					var possibleFields = toggleComponentObj[i].possibleFields;
					var possibleDependency = toggleComponentObj[i].possibleDependencies;
					$(formWrapperId+" [name = '"+fieldName+"']").on("change",function(e){
						removeToggleElements(possibleFields,formWrapperId); 
						var formValue = getReturnValue(formWrapperId,$(formWrapperId+" [name = '"+fieldName+"']"));
						$.each(possibleDependency,function(index,value){
							if(formValue == value.fieldValue){			
								var explodeField = value.fieldValidate.split(",");
								$.each(explodeField,function(fIndex){
									$(formWrapperId+" .form-row[data-element='"+explodeField[fIndex]+"']").removeClass("hidden");
								});
							}
						});
					});
					
				}
			}
			$(formWrapperId+" [name = '"+fieldName+"']").trigger("change");
		}
	}
	
	baseFunctions.checkDependentControl = function(formWrapper,jsonObj){
		var formId = "#"+formWrapper;
		for(var i = 0; i < jsonObj.length; i++){
				var fieldName = jsonObj[i].name;
				var dependentFieldNames = jsonObj[i].dependentFields?(jsonObj[i].dependentFields).split(","):"";
				var possibleFields = jsonObj[i].possibleFields?jsonObj[i].possibleFields.split(","):"";
				$(formId).find("[data-element='"+fieldName+"']").attr("data-api", jsonObj[i].apiUrl);
				var eventType = "change";
				if(isSet($(formId+" [name = '"+fieldName+"']").attr("data-format"))){
					eventType = "select";
				}
				$(document).delegate(formId+" :input[name='"+fieldName+"']",eventType,function(e){
					e.preventDefault();
					var dataFieldName = $(this).attr("name");
					var jsonObject = [];
					var dependentField = {};
					var pageContextParams = [];
					if(!isEmpty(dependentFieldNames)){
						$.each(dependentFieldNames,function(index,field){
							//var fieldValue = $(formId).find(":input[name='"+field+"']").val();
							var fieldValue = getReturnValue(formId,$(formId+" [name = '"+field+"']"));
							dependentField[field] = fieldValue;
						});
					}
					var myString = jsonStringify(dependentField);
					var getValue = getReturnValue(formId,$(formId+" :input[name = '"+dataFieldName+"']"));
					var getWrapper = "#"+$(formId).closest(".app-action-form").attr("id");
					$(getWrapper).find( ".selected-records .checkbox input[type='checkbox']:checked" ).each(function( index ) {
						if($(this).prop("checked")==true){
							var recordId 		= $(this).val();
							var recordCode	  	= $(this).attr("data-row-code");
							var recordVersion   = $(this).attr("data-row-version");
							
							pageContextParams.push({ "recordId" : recordId , "code" : recordCode, "version": recordVersion });
						}
					});
					var pageContextParamsObj = jsonStringify(pageContextParams);
					var ajaxObject = {
							"ajaxURL" : SetWebApiURL+ $(formId).find("[data-element='"+dataFieldName+"']").attr("data-api"),
							"params" : {"pageKey"  : screenName, "selectedValue"  : getValue, "dependentObjValues" : myString , "pageContextParams" : pageContextParamsObj},
							"successCallback" : function(obj){
								if(getResultCode(obj.resultCode) == CODE_SUCCESS){
									if(isSet(obj.returnObject) && isSet(obj.returnObject.formInfo) && isSet(obj.returnObject.formInfo.formElements)){
										var returnFormInfo = obj.returnObject.formInfo;
										var formElements = returnFormInfo.formElements;
										for(var j = 0; j < formElements.length; j++){
											
											if(isSet(jsonObj) && isSet(jsonObj[j]) && isSet(jsonObj[j].possibleFields)){
												possibleFields = jsonObj[j].possibleFields.split(",");
											}
											
											//var possibleFields = jsonObj[j].possibleFields.split(",");
											if($.inArray(formElements[j].name,possibleFields) > -1){
												if(formElements[j].isSwitch == true){
												    var functionCallback = "generate_switch";
												   }
												else{
													var functionCallback = "generate_"+formElements[j].type;
												}
												
												if(isSet(window["baseFormElements"][functionCallback])){
													
													mainWrapper = $(formId).find(".form-row[data-element = '"+formElements[j].name+"']").find(".form-col-2");
													window["baseFormElements"][functionCallback](formId,formElements[j]);
													$(formId).find(".form-row[data-element = '"+formElements[j].name+"']").find(".p-r-5:first").remove();
												}
											}
										}
									}
								}
							},
							"failureCallback" : generateFailure,
							"loader" : true,
							"loaderWrapper" : formWrapper
					};
					ajaxCallBack(ajaxObject);
					
				});
			//$(formId).find(":input[name='"+fieldName+"']").trigger("change");		
		}
	}
	
	baseFunctions.getOptionalWarningDetails =  function(formWrapper,optnWarnings) {
		var setMessage;
		var getAllMessage = [];
		if(optnWarnings.length > 0){
			for(var i = 0; i < optnWarnings.length; i++){
				var optnName 		 = optnWarnings[i].name;
				var optnLabelKey 	 = i18NCall(optnWarnings[i].labelKey);
				var optnWarningType  = optnWarnings[i].warningType;
				if($(formWrapper).find("[name = '"+optnName+"']").data("type") == "select-one"){
					var optnValue = $(formWrapper).find("select[name = '"+optnName+"'] option:selected").text();
				}else{
					var optnValue = $(formWrapper).find("[name = '"+optnName+"']").val();
				}
				
				if($(formWrapper).find("[name = '"+optnName+"']:visible").length > 0){
					if($(formWrapper).find("[name = '"+optnName+"']").attr("disabled") == undefined){
						switch(optnWarningType){
							case "BLANK" :
								if(isEmpty(optnValue)){
									var setMessage = {
											"message" : 'optional.warning.blank.message',
											"params"  : new Array(optnLabelKey)
										};
								}
								break;
							case "VALUE" :
								var setMessage = {
									"message" : 'optional.warning.value.message',
									"params"  : new Array(optnLabelKey,optnValue)
								};
								break;
						}
						if(setMessage != undefined){
							getAllMessage.push(setMessage);
						}
					}
				}
			}
			return getAllMessage;
		}
	},

	
	baseFunctions.setControlObject =  function(setControlObject) {
		var formWrapper = setControlObject.formWrapper;
		var formId = "#"+formWrapper;
		var fieldName = setControlObject.fieldName;
		var apiUrl = setControlObject.apiUrl;
		
		$(document).delegate(formId+" :input[name='"+fieldName+"']","change",function(){
			
			var getValue = $(this).val();
			
			var ajaxObject = {
					"ajaxURL" : SetWebApiURL+apiUrl,
					"params" : {"settingId" : getValue},
					"successCallback" : function(obj){
						if(getResultCode(obj.resultCode) == CODE_SUCCESS){
							
							$(formId).find("."+fieldName).empty();
							var formInfo = obj.returnObject.formInfo;
							var jsonObject = {
									"formName"   	: formWrapper,
									"lightBoxFlag"	: false,
									"formWrapper"   : $(formId).find("."+fieldName)
							};
	
							if(isSet(formInfo.formGroups)){
								if(formInfo.formGroups.length > 0 ){
									formGroups 		= formInfo.formGroups;
									jsonObject = $.extend({"formGroups" : formGroups},jsonObject);
									generateGroups(jsonObject);
								}
							}else{
								formElement 		= formInfo.formElements;
								jsonObject = $.extend({"formElement" : formElement},jsonObject);
								baseFormElements.generateElements(jsonObject);
							}						
						}
					},
					"failureCallback" : generateFailure,
					"loader" : true,
					"loaderWrapper" : formWrapper
			};
			ajaxCallBack(ajaxObject);
		});
	},
	
	baseFunctions.setEmptyAction =  function(formWrapper,attrWrapper) {
		var attrId = $(attrWrapper).attr("id");
		$("#"+attrId).click(function(){
			var parentSelector = $(this).parents(".enabled-set-empty");
			var inputAttrName = $(this).data("for");
			if($(this).prop("checked") == true){
				if(isSet(formDependecies)){
					var formDependeciesObj = isSet(formDependecies.mandatoryObj.length > 0)?formDependecies.mandatoryObj:formDependecies.dependentControlObj;
					for(var i = 0; i < formDependeciesObj.length; i++){
						var possibleDependency = formDependeciesObj[i].possibleDependencies
						$.each(possibleDependency,function(index){
							if(possibleDependency[index].fieldValue == $(formWrapper+" [name = '"+inputAttrName+"']").val())
							{
								var possibleValueNames = "";
								$.each($(formWrapper).find(":input[isDependent=true]"),function(){
									possibleValueNames += $(this).attr("name")+",";
								});
								removePossibleFieldsValidation(possibleValueNames,formWrapper);
								addPossibleFieldsDisabled(possibleValueNames,formWrapper);
							}	
						});
					}
				}
				
				parentSelector.find(":input:not([name^=set_empty_])").prop("disabled",true);
				parentSelector.find(":input:not([name^=set_empty_])").attr("data-set-empty",true);
				
				parentSelector.find(selector_p_r_5).addClass("element-clear");
			}else{
				parentSelector.find(":input:not([name^=set_empty_])").prop("disabled",false);
				parentSelector.find(":input:not([name^=set_empty_])").removeAttr("data-set-empty");
				parentSelector.find(selector_p_r_5).removeClass("element-clear");
				if(isSet(formDependecies)){
					var formDependeciesObj = formDependecies.mandatoryObj;
					for(var i = 0; i < formDependeciesObj.length; i++){
						var possibleDependency = formDependeciesObj[i].possibleDependencies
						$.each(possibleDependency,function(index){
							if(possibleDependency[index].fieldValue == $(formWrapper+" [name = '"+inputAttrName+"']").val())
							{
								$(formWrapper+" [name = '"+inputAttrName+"']").trigger("change");
							}	
						});
					}
				}
			}
		});
	},
	
	baseFunctions.updateFormDetails =  function(formWrapper) {
		$(formWrapper).find(" :input:not([id^=set_empty_])").change(function(){
			var currValue 		= getReturnValue(formWrapper,$(this)); 
			var dataInitValue 	= $(this).data("init-value");
			if(currValue != dataInitValue){
				$(this).addClass("is-edited");
			}else{
				$(this).removeClass("is-edited");
			}
		});
	},
	
	baseFunctions.addData =  function(formId) {
		var jsonObj = [];
		var output  = {};
		$(formId+" :input").not(':button, :disabled').each(function() {
			var key   	= $(this).attr("name");
			var value 	= getReturnValue(formId,$(this));
			var clubByAttr = $(this).attr("data-clubby");
			/*if($(this).hasClass("is-edited")){*/
				if(!isEmpty(value)){
					if(!isSet($(this).attr("data-clubby"))){
						if($(this).attr("type") != "file"){
							output[key] = value;
						}else{
							if(typeof output[key] == "undefined"){
								output[key] = [];
							}
							output[key].push({
								"name" 		: value,
								"imageData" : $(this).data("value")	
							});
						}
					}else{
						if(!isSet(output[clubByAttr])){
							output[clubByAttr] = [];
						}
						if($.inArray(value.labelKey,clubByArray) == "-1"){
							clubByArray.push(value.labelKey);
							output[clubByAttr].push(value);
						}
//						output[clubByAttr].push(value);
					}
				}
			/*}else{
				if($(this).attr("readonly")){
					output[key] = value;
				}
			}*/
			
		});
		
		
		$(formId+" ul").not(':button').each(function() {
			var key   	= $(this).attr("name");
			var checkValue = [];
			$(formId+" [name = '"+key+"']").find("li").each(function(){
				checkValue.push($(this).attr("rel"));			
			});
			
			var value 	= checkValue;
			if(!isEmpty(value)){
				output[key] = value;
			}
			
		});
		
		$(formId+" :input[type=hidden]").each(function() {
			var key   	= $(this).attr("name");
			var value 	= $(this).attr("value");
			if(!isEmpty(value)){
				output[key] = value;
			}
		});
		
		jsonObj.push(output);
		return jsonObj;
	},

	baseFunctions.updateData =  function(formId) {
		var jsonObj = [];
		var output  = {};
		
		$(formId+" :input:not([id^=set_empty_])").not(':button').each(function() {
			var editedFlag = 1;
			var checkValue = [];
			var key   	= $(this).attr("name");
			var value 	= getReturnValue(formId,$(this));
			var imgDataValue = $(this).data("value");
			
			var clubByAttr = $(this).attr("data-clubby");
			
			if($(this).attr("data-set-empty") ==  "true" )
			{
				value 		 = set_empty_value;
				imgDataValue = set_empty_value;
			}/*else if(!$(this).hasClass("is-edited")){
				editedFlag = 0;
			}*/
			if(editedFlag == 1){
				if(!isSet($(this).attr("data-clubby"))){
					if($(this).attr("type") != "file"){
						output[key] = value;
					}else{
						if(typeof output[key] == "undefined"){
							output[key] = [];
						}
						output[key].push({
							"name" 		: value,
							"imageData" : $(this).data("value")	
						});
					}
				}else{
					if(!isSet(output[clubByAttr])){
						output[clubByAttr] = [];
					}
					if($.inArray(value.labelKey,clubByArray) == "-1"){
						clubByArray.push(value.labelKey);
						output[clubByAttr].push(value);
					}
//					output[clubByAttr].push(value);
				}
			}
		});
		
		$(formId+" ul").not(':button').each(function() {
			var key   	= $(this).attr("name");
			
			var checkValue = [];
			$(formId+" [name = '"+key+"']").find("li").each(function(){
				checkValue.push($(this).attr("rel"));			
			});
			var value 	= checkValue;
			if(!isEmpty(value)){
				output[key] = value;
			}
		});
		
		$(formId+" :input[type=hidden]").each(function() {
			var key   	= $(this).attr("name");
			var value 	= $(this).attr("value");
			if(!isEmpty(value)){
				output[key] = value;
			}
		});
		jsonObj.push(output);
		return jsonObj;
	},
	
	baseFunctions.submitedDataOperation =  function(jsonObjData) {
		isErrorDto = [];
		var self 	= jsonObjData.selfObj;
		var formId	= jsonObjData.formId;
		var jsonObj = jsonObjData.jsonData;
		var editMode = jsonObjData.isEditMode;
		var redirectPage = jsonObjData.redirectPage;
		var block_msg_wrapperId = "#"+$(self).attr("id");
		var block_wrapper	= global_message_wrapper;
		var switchForm = undefined;
		if($(self).parents(".modal-dialog").length){	
			block_wrapper   = global_lightbox_wrapper;
		}
		$(self).find(".error-input-box").removeClass("error-input-box");
		
		if(getResultCode(jsonObj.resultCode) == CODE_SUCCESS){
			if(editMode == true){
				$(batchupdate_form_block_selecter).modal('hide');
			}
			$(".close").trigger("click");
			
			setTimeout(function(){
				//block_msg_wrapperId
				generateMsg(jsonObj.resultCode,"",global_message_wrapper,"",jsonObj.responseDetail); 
			},200);
			if(isSet($(formId).attr("data-switch-form")) && $(formId).attr("data-switch-form") == "view-form"){
				var accordionKey = $(formId).closest(".app-action-form").attr("data-accordionkey");
				var accordionId = "#"+accordionKey;
				switchForm = $(formId).attr("data-switch-form");
				var ajaxObject = {
						"ajaxURL" : SetWebApiURL + switchForm,
						"params" : {"pageId" :current_moduleId,"pageName":"VIEW", "pageKey" : screenName,"accordionKey":accordionKey},
						"successCallback" : function(object){
							if(getResultCode(object.resultCode) == CODE_SUCCESS){
								$(accordionId).find(".accordion-form-wrapper").html("");
								baseFunctions.viewAccordionSuccess(object,$(accordionId).find(".accordion-form-wrapper"));
								$(accordionId).find(".accordion-actions a").removeClass("is-edit").addClass("is-view");
							}
						},
						"failureCallback" : function(){},
						"wrapperId" 	  : $(accordionId).find(".accordion-form-wrapper"),
				};
				ajaxCallBack(ajaxObject);
				return false;
			}
			
			if(isSet($(formId).attr("data-switch-form")) && $(formId).attr("data-switch-form") == "berthing-view"){
				var accordionKey = $(formId).closest(".app-action-form").attr("data-accordionkey");
				var attachId = "#"+$(formId).closest(".app-action-form").attr("id");
				var accordionId = "#"+accordionKey;
				switchForm = $(formId).attr("data-switch-form");
				var ajaxObject = {
						"ajaxURL" : SetWebApiURL + switchForm,
						"params" : {"pageId" :current_moduleId, "pageKey" : screenName,"accordionKey":accordionKey,"callNumber":jsonObj.returnObject.callNumber},
						"successCallback" : function(object){
							if(getResultCode(object.resultCode) == CODE_SUCCESS){
								$(attachId).find(".accordion-form-wrapper").html("");
								$(attachId).find(".accordion-panel .accordion-actions").html("");
								
								var tooltipKey = i18NCall('vesselvisit.accordion.additionalBerthing.edit');
								var editBtn = '<a href="javascript:void(0);" class="edit-icon accordion-addBerthing-edit tooltip-bottom is-view" data-accordionKey="'+accordionKey+'"   title="'+tooltipKey+'"></a>'; 
								$(attachId).find(".accordion-header:first .accordion-actions").append(editBtn);
								$(attachId).find(".accordion-header:first .accordion-actions .accordion-addBerthing-edit").attr({
									"callNbr" : jsonObj.returnObject.callNumber
							});
								
								var deleteTooltipKey = i18NCall('vesselvisit.accordion.additionalBerthing.delete');
								var deleteBtn = '<a href="javascript:void(0);" class="delete-icon accordion-addBerthing-delete tooltip-bottom" data-accordionKey="'+accordionId+'"   title="'+deleteTooltipKey+'"></a>'; 
								if(!($(accordionId).find(".berthing:last .accordion-actions a").hasClass('accordion-addBerthing-delete'))){
									$(accordionId).find(".accordion-header:last .accordion-actions").append(deleteBtn);
									$(accordionId).find(".accordion-header:last .accordion-actions .accordion-addBerthing-delete").attr({
										"callNbr" : jsonObj.returnObject.callNumber
								});
							}
								
								
								coreVesselVisit.generateBerthingView(object,$(attachId).find(".accordion-form-wrapper"),accordionKey);
								$(attachId).find(".accordion-actions a").removeClass("is-edit").addClass("is-view");
							}
						},
						"failureCallback" : function(){},
						"wrapperId" 	  : $(attachId).find(".accordion-form-wrapper"),
				};
				ajaxCallBack(ajaxObject);
				return false;
			}
			var flag = false;
			var wrapperId = "";
			if(typeof jsonObj.responseDetail.infoDetail != "undefined" && jsonObj.responseDetail.infoDetail.length > 0){
				alertWrapperId = "informationAlert"; 
				var message = {
					"message" 	: jsonObj.responseDetail.infoDetail[0].code+": "+jsonObj.responseDetail.infoDetail[0].message,
					"params"	: jsonObj.responseParams?jsonObj.responseParams:[]
				}
				getInfoAlert(message,alertWrapperId);
				$.blockUI({ message: $('#'+alertWrapperId), css: { width: '275px' } });
				flag = true;
			}
			if(typeof jsonObj.responseDetail.warningDetail != "undefined" && jsonObj.responseDetail.warningDetail.length > 0){
				alertWrapperId = "warningAlert"; 
				$("#"+alertWrapperId).remove();
				var message = jsonObj.responseDetail.warningDetail[0].code+": "+i18NCall(jsonObj.responseDetail.warningDetail[0].message);
				var alertBlock = $(modalInformationAlertDialogPopup);
				$(alertBlock).attr({"id" : alertWrapperId}).find("h4").text(i18NCall("warning_message")); 
				$(alertBlock).attr({"id" : alertWrapperId}).find("p").text(message);
				$("body").append(alertBlock);
				$.blockUI({ message: $('#'+alertWrapperId), css: { width: '275px' } });
				flag = true;
			}
			if(flag == true){
				$('#'+alertWrapperId).find("#ok").on("click",function(){
					$.unblockUI();
					if(isSet(jsonObj.returnObject) && isSet(jsonObj.returnObject.redirectConfig)){
						var redirectConfig = jsonObj.returnObject.redirectConfig;
						redirectConfig = $.extend({"pageKey" : screenName , "switchForm" : switchForm },redirectConfig);
						baseFunctions.setSelectedRecords(redirectConfig);
					}
				});
				return true;
			}
			
			if(isSet(jsonObj.returnObject.gridKey) && jsonObj.returnObject.gridKey !=""){
			    var gridContext = jsonObj.returnObject.gridDispKey+"-"+ jsonObj.returnObject.gridKey;
			    basePanel.createGrid(jsonObj.returnObject);
			}
			navigationAlert = 1;
			if(isSet(jsonObj.returnObject) && isSet(jsonObj.returnObject.redirectConfig)){
				var redirectConfig = jsonObj.returnObject.redirectConfig;
				redirectConfig = $.extend({"pageKey" : screenName , "switchForm" : switchForm },redirectConfig);
				baseFunctions.setSelectedRecords(redirectConfig);
			}
			return true;
		}else if(getResultCode(jsonObj.resultCode) == CODE_BUSINESS){
			if(isSet(jsonObj.responseDetail) && isSet(jsonObj.responseDetail.errorDetail) && jsonObj.responseDetail.errorDetail.length > 0){
				setTimeout(function(){
				    generateMsg(jsonObj.resultCode,"",block_wrapper,"",jsonObj.responseDetail);
				},200);
			}
			if(isSet(jsonObj.responseDetail) && isSet(jsonObj.responseDetail.validationDetail)){
				var className = "error-input-box";
				baseFunctions.createErrorObject(jsonObj.responseDetail.validationDetail,jsonObj.resultCode,className,formId);
				baseFunctions.showAllError($(formId),isErrorDto);
			}
			if(typeof jsonObj.responseDetail.warningDetail != "undefined" && jsonObj.responseDetail.warningDetail.length > 0){
				  var wrapperId = "editWarning"; 
				  getConfirmationAlert(jsonObj.responseDetail.warningDetail[0].code+": "+jsonObj.responseDetail.warningDetail[0].message,wrapperId);
				  
				  $.blockUI({ message: $('#conf-'+wrapperId), css: { width: '275px' } });
				  
				  $('#conf-'+wrapperId).find("#yes").on("click",function(){
				    $.unblockUI();
				    $(formId).find("[type=submit]").trigger("click");
				  }); 
				  $('#conf-'+wrapperId).find("#no").on("click",function(){
					  $.unblockUI();
					  $(formId).find("[type=reset]").trigger("click");
				  });
			}
			
		}else if(getResultCode(jsonObj.resultCode) == CODE_BATCHEDIT){
			if(isSet(jsonObj.resultCode)){
				setTimeout(function(){
				    generateMsg(jsonObj.resultCode,"",block_wrapper,"",jsonObj.responseDetail);
				},200);
			}
			if(isSet(jsonObj.returnObject) && isSet(jsonObj.returnObject.errorRecords)){
				baseFunctions.errorAndSuccessRecordsInformation(jsonObj);
				return true;
			}
			navigationAlert = 1;
			if(isSet(jsonObj.returnObject) && isSet(jsonObj.returnObject.redirectConfig)){
				
				var redirectConfig = jsonObj.returnObject.redirectConfig;
				redirectConfig = $.extend({"pageKey" : screenName , "switchForm" : switchForm },redirectConfig);
				baseFunctions.setSelectedRecords(redirectConfig);
			}
		}else{
			if(isSet(jsonObj.resultCode)){
				setTimeout(function(){
				    generateMsg(jsonObj.resultCode,"",block_wrapper,"",jsonObj.responseDetail);
				},200);
			}
		}
		return false;
	},
	baseFunctions.errorAndSuccessRecordsInformation = function(obj){
//		obj = {"errorCode":1,"errorMessageKey":"error.n0","successMessageKey":"user.update.record.success","returnObject":{"successRecords":{"labelKey":"user.userId","values":["111","112","113"]},"errorRecords":{"rowConfig":[{"recordId":1000000272807,"recordCode":"User_Create","version":34,"record":[{"columnNo":1,"value":"User_Create"},{"columnNo":2,"value":"error.n1000018"}],"rowDisplayNm":0}],"columnConfig":{"totalColumnCount":0,"columnValueObjects":[{"columnNameKey":"user.userId","isPK":false,"sortOrder":0,"columnNo":1,"isSortable":false,"columnName":"CODE","colWidth":0,"columnId":0},{"columnNameKey":"error.reason","isPK":false,"sortOrder":0,"columnNo":2,"isSortable":false,"columnName":"REASON","colWidth":0,"columnId":0}]}}}};
		var successRecords = obj.returnObject.successRecords;
		var errorRecords = obj.returnObject.errorRecords;
		$("#batchupdate-success-records ,#batchupdate-error-records").html(" ");
		if(isSet(successRecords)){
			var accordionSuccessID = "accordionSuccessRecords";
			$("#"+accordionSuccessID).remove();
			var accordionConfig = {
				"id"    	  : accordionSuccessID,
				"className"   : "app-action-form ",
				"title"       : i18NCall("success_records_accordion_title"),
				"allowFilter" : false,
			}
			baseFunctions.generateAccordion(accordionConfig,"#batchupdate-success-records"); 
			succses_string_block = $(succses_string_block);	
			if(jQuery.type(successRecords.values) == "array"){
				successRecords.values = successRecords.values.join(", ");
			}
			succses_string_block.find("p").append(successRecords.values);
			succses_string_block.find("p").prepend("<span>"+(i18NCall(successRecords.labelKey))+" : </span>");
			$("#"+accordionSuccessID).find(".accordion-form-wrapper").append(succses_string_block);
		}
		if(isSet(errorRecords)){
			var accordionErrorID = "accordionErrorRecords";
			$("#"+accordionErrorID).remove();
			var accordionConfig = {
				"id"    	  : accordionErrorID,
				"className"   : "app-action-form openAccordionClass",
				"title"       : i18NCall("error_records_accordion_title"),
				"allowFilter" : false,
			}
			baseFunctions.generateAccordion(accordionConfig,"#batchupdate-error-records"); 
			baseFunctions.simpleTable(errorRecords,$("#"+accordionErrorID).find(".accordion-form-wrapper"));
		}
		$("#batchupdate-success-records, #batchupdate-error-records").removeClass("hidden");
		$(".selected-records").hide();
		baseFunctions.defaultOpenAccordion();
	}
	baseFunctions.createErrorObject =  function(jsonObject,errorCode,className,formId) {
		var returnErrorObj = {};
		$.each(jsonObject, function(key, value) {
			fieldName = value.fieldName;
			errorKeyName = value.message;
			$(formId).find("[name = "+fieldName+"],[data-name = "+fieldName+"]").addClass(className);
			if(typeof returnErrorObj[fieldName] == "undefined"){
				returnErrorObj[fieldName] = [];
			}
			
			var errorMesage = i18NCall(errorKeyName)+" <br/> ";
			generateFieldMsg(1,className,errorMesage,fieldName,formId);
			
			/*setTimeout(function() {
				console.log($(formId + " [name = '" + fieldName + "']").closest(selector_p_r_5).find(".error-message"));
				$(formId + " [name = '" + fieldName + "']").closest(selector_p_r_5).find(".error-message").addClass("border-none");
			}, 250);*/
			addBorderClass(formId,fieldName);
			
			var lableName = $(formId).find("[name = "+fieldName+"],[data-name = "+fieldName+"]").closest(".form-row").find("label").html();
			if(jQuery.inArray(lableName,isErrorDto) == -1 ){
				isErrorDto.push(lableName);
			}
			returnErrorObj[fieldName].push({
				"message" : errorKeyName,
			});
		});
		/*if(typeof fieldName != "undefined"){
			method.generateError(1,returnErrorObj);
		}*/
	},
	baseFunctions.createWarningObject =  function(jsonObject,className) {
		var returnWarningObj = {};
		$.each(jsonObject, function(keys, values) {
			fieldNames = values.fieldName;
			errorKeyNames = values.warningKeyName;
			$(formId+" [name = "+fieldNames+"],[data-name = "+fieldNames+"]").addClass(className);
			if(typeof returnWarningObj[fieldNames] == "undefined"){
				returnWarningObj[fieldNames] = [];
			}
			
			var errorMesage = i18NCall(errorKeyNames)+" <br/> ";
			generateFieldMsg(2,className,errorMesage,fieldNames,formId);
			
			setTimeout(function() {
				$(formId + " [name = '" + fieldName + "']").closest(selector_p_r_5).find(".error-message").addClass("border-none");
			}, 100);
			
			var lableName = $(formId).find("[name = "+fieldName+"],[data-name = "+fieldName+"]").closest(".form-row").find("label").html();
			
			if(jQuery.inArray(lableName,isErrorDto) == -1 ){
				isErrorDto.push(lableName);
			}
			
			returnWarningObj[fieldNames].push({
				"message" : errorKeyNames,
			});
		});
		/*if(typeof fieldNames != "undefined"){
			methods.generateError(2,returnWarningObj);
		}*/
	},
	
	baseFunctions.saveAndAssign =  function(formId) {
		$(document).delegate("button[name=btnSaveAssign]","click",function(){
			var wrapper = app_action_form_addmore_wrapper;
			
			var formAction = $(formId).attr("action");
			var jsonObj;
			var jsonObj_main = [];
			var output_main  = {};
			
			jsonObj = addData(formId);
			output_main["records"] = jsonObj;
			var ajaxObject = {
					"ajaxURL" : formAction,
					"params" : {"records" : JSON.stringify(output_main)},
					"successCallback" : function(obj){
						submitSaveandAssign(obj,wrapper);
					},
					"failureCallback" : generateFailure,
					"loader" : true,
					"loaderWrapper" : wrapper
			};
			ajaxCallBack(ajaxObject);
		});
	},

	baseFunctions.submitSaveandAssign =  function(obj,wrapper) {
		if(getResultCode(obj.resultCode) == CODE_SUCCESS){
			var redirectConfig = obj.returnObject.redirectConfig;
			var getPkValue = redirectConfig.pageContextParams[0].recordId;
	
			var additionalParams = {
					"setURL" 		: redirectConfig.assignUrls.setUrl,
					"getURL" 		: redirectConfig.assignUrls.getUrl,
					"setElementId"	: wrapper,
					"getPkValue"    : getPkValue,
					"returnObject"  : obj
			};
			baseFunctions.perform_saveAndAssignUserAction(additionalParams);
		}else{
			generateMsg(obj.resultCode, obj.messageKey,global_message_wrapper, wrapper,"",obj.responseDetail);
		}
	},
	
	/* function for save and assign user action */
	baseFunctions.perform_saveAndAssignUserAction =  function(additionalParams) {
		var setURL 				= additionalParams.setURL;
		var getURL 				= additionalParams.getURL;
		var modalHTML 			= grid_assign_users;
		var blockWrapper 		= "assign-users";
		var wrapperId 			= "#assign-users";
		var visibleColWrapper 	= model_ul_user_visible_block;
		var allColWrapper 		= model_ul_user_all_block;
		
		var returnObject 		= additionalParams.returnObject;
	
		var pkValues 			= valueToStringArray(additionalParams.getPkValue);
	
		if($(wrapperId).length != 0){
			$(wrapperId).remove();
		}
		getModalPopUp(modalHTML);
		
		setTimeout(function(){
			$(wrapperId).on("click",".close",function (e) {
				var redirectConfig = additionalParams.returnObject.returnObject.redirectConfig;
				redirectConfig = $.extend({"pageKey" : screenName},redirectConfig);
				baseFunctions.setSelectedRecords(redirectConfig);
			});
			generateMsg(returnObject.resultCode, returnObject.messageKey, global_lightbox_wrapper,"",returnObject.responseDetail);
			
			ajaxUrl = SetWebApiURL+getURL;
			var ajaxObject = {
					"ajaxURL" : ajaxUrl,
					"params" : {"pageId" : current_moduleId,"pkValues":pkValues},
					"successCallback" : function(obj){
							if(getResultCode(obj.resultCode) == CODE_SUCCESS){
								var manageColumnConfig = obj.returnObject.manageColumnsConfig;								
								// set modal title label dynamically
								var assignTitle = i18NCall(obj.returnObject.manageColumnsConfig.title);
								$(wrapperId).find(".modal-title").text(assignTitle);
								
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
								var obj = {
										'manageColumnConfig':manageColumnConfig_column1,
										'blockWrapper': blockWrapper,
										'listWrapper':visibleColWrapper,
										'search':1
									};
								
								baseGridActions.generateList(obj);
								
								var obj = {
										'manageColumnConfig':manageColumnConfig_column2,
										'blockWrapper': blockWrapper,
										'listWrapper':allColWrapper,
										'search':1
									};
								baseGridActions.generateList(obj);
								
								baseFunctions.generateScrollbar(wrapperId+" ul");
								
								$(wrapperId).find("[data-type = submit]").click(function(){
									var output = {};
									var iColumnOrder = 1;
									if($(wrapperId).find("ul#"+model_ul_user_visible_block+" li").length == 0){
										generateMsg(1,'select.one.column',global_lightbox_wrapper);
										return false;
									}
									$(wrapperId).find("ul#"+model_ul_user_visible_block +" li").each(function() {
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
									
									ajaxUrl = SetWebApiURL+setURL;
									var ajaxObject = {
											"ajaxURL" : ajaxUrl,
											"params" : {"manageColumnsJson" : myString ,"pageId" : current_moduleId,"pkValues":pkValues},
											"successCallback" : function(data){
												generateMsg(data.resultCode,data.messageKey,global_message_wrapper,wrapperId,"",data.responseDetail);
												if(getResultCode(data.resultCode) == CODE_SUCCESS)
												{
													$(wrapperId).modal('hide');
													
													if(additionalParams.returnObject !=undefined && isSet(additionalParams.returnObject.returnObject.redirectConfig)){
														var redirectConfig = additionalParams.returnObject.returnObject.redirectConfig;	
														redirectConfig = $.extend({"pageKey" : screenName},redirectConfig);
														baseFunctions.setSelectedRecords(redirectConfig);
													}
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
								baseGridActions.manageListWithTextSearch(model_ul_user_all_block);
								baseGridActions.manageListWithTextSearch(model_ul_user_visible_block);											
							}
					},
					"failureCallback" : function(){} ,
					"loader" : true,
					"loaderWrapper" : wrapperId+" ul"
			};
			ajaxCallBack(ajaxObject);
			
		},200);
	},
	
	baseFunctions.showAllError =  function(self,isErrorDto) {
		var message_wrapper =  global_message_wrapper;
		if($(self).parents(".modal-dialog").length > 0 || $(self).find(".modal-dialog").length > 0)
		{ 
		  var getAttrId;
		  if( $(self).find(".modal-dialog").length > 0){
		   getAttrId = "#"+$(self).attr("id");
		  }else{
		   getAttrId = "#"+$(self).parents(".modal").attr("id");
		  }
		  var lightBoxSelector = $(getAttrId).find(global_lightbox_wrapper);
		  message_wrapper   = lightBoxSelector.selector;
		} 
		if(isErrorDto.length > 0 && isErrorDto[0] != undefined){
			var msg = i18NCall("please.enter.valid.value")+"</br>";
			if(jQuery.type(isErrorDto) == "array"){
				for(var i=0; i<isErrorDto.length; i++){
					if(isSet(isErrorDto[i])){
						msg += "* "+isErrorDto[i]+" </br>";
					}
				}
			}
			generateMsg(1,msg,message_wrapper);
		}
	},
	
	baseFunctions.redirectDesktopZodiac =  function() {
		$(document).delegate("[data-ajaxReq = true]","click", function(){
			var getLink = $(this).attr("rel");
			var newWindow = $(this).attr("data-newWindow");
			var ajaxObject = {
					"ajaxURL" : getLink,
					"method"  : "GET",
					"aSync"  : false,
					"successCallback" : function(obj){
						if(getResultCode(obj.resultCode) == CODE_SUCCESS){
							if(newWindow){
								window.open(obj.returnObject);
							}else{
								location.href = obj.returnObject;
							}
						}else{
							generateMsg(obj.resultCode, obj.messageKey,global_message_wrapper,"",obj.responseDetail);
						}
					},
					"failureCallback" : generateFailure,
			};
			ajaxCallBack(ajaxObject);
			return false;
		});
	},
	
	baseFunctions.checkTotalCheckedCount =  function(elementWrapperId,messageInfo) {
		var totalCount = $(elementWrapperId).find(".table-record .checkbox input[type='checkbox']:checked").not(".css-checkbox-all").length;
		var message = messageInfo.message;
		var infoId  = messageInfo.infoId;
		if(totalCount == 0){
			getInformationAlert(message,infoId);
			$.blockUI({ message: $('#alert-'+infoId), css: { width: '275px' } });
		}else{
			return true;
		}
	},
	
	baseFunctions.checkMaxSelectedRecords =  function(elementWrapperId,maxRecords) {
		var messageInfo = {
				"message" 	: "select.check.checkbox.maxrecourd",
				"infoId" 	: "batch-update",
				"params"    : new Array(maxRecords)
		 	};
			
			var totalCount = $(elementWrapperId).find(".table-record .checkbox input[type='checkbox']:checked").not(".css-checkbox-all").length;
			var message = messageInfo;
			var infoId  = messageInfo.infoId;
			if(totalCount > maxRecords){
				getInformationAlert(message,infoId);
				$.blockUI({ message: $('#alert-'+infoId), css: { width: '275px' } });
			}else{
				return true;
			}
	},
	
	baseFunctions.setCommonAjaxConfig =  function(elementId,totalRecords) {
		var returnObject = {};
		
		var col = [];
		var colCode = [];
		var colVersion = [];
		var colId = [];
		var pageContextParams = [];
		
		$(elementId).find( ".table-record .checkbox input[type='checkbox']" ).not(".css-checkbox-all").each(function( index ) {
			if($(this).prop("checked")==true){
				col.push($(this).attr("data-row"));
				colCode.push($(this).attr("data-row-code")?$(this).attr("data-row-code"):"");
				colVersion.push($(this).attr("data-row-version")?$(this).attr("data-row-version"):"");
				
				var recordId 		= $(this).attr("data-row");
				var recordCode	  	= $(this).attr("data-row-code");
				var recordVersion   = $(this).attr("data-row-version");
				
				pageContextParams.push({ "recordId" : recordId , "code" : recordCode, "version": recordVersion });
			}
		});
		
		var selectedRecords = $(checkbox_all_wrapper).prop("readonly")?totalRecords:$(checkbox_rowmodel_checked_wrapper).length;
		var checkSelectedAll = $(checkbox_all_wrapper).prop("readonly")?true:false
		
		var myString = JSON.stringify(col);
		var myStringCode = JSON.stringify(colCode);
		var myStringVersion = JSON.stringify(colVersion);
		var pageContextParams= jsonStringify(pageContextParams);
		
		return returnObject = {
				"colObject" 		: myString,
				"colObjectCode"	    : myStringCode,
				"colObjectVersion"	: myStringVersion,
				"selectedRecords"	: selectedRecords,
				"checkSelectedAll"  : checkSelectedAll,
				"pageContextParams" : pageContextParams
		};
		
	},
	
	baseFunctions.setPageContextParams =  function(elementId,totalRecords) {
		var pageContextParams = [];
		$(elementId).find( ".table-record .checkbox input[type='checkbox']" ).not(".css-checkbox-all").each(function( index ) {
			if($(this).prop("checked")==true){
				var recordId 		= $(this).attr("data-row");
				var recordCode	  	= $(this).attr("data-row-code");
				var recordVersion   = $(this).attr("data-row-version");
				var parentRecordCode= $(this).attr("data-row-parentrecordcode");
				pageContextParams.push({ "recordId" : recordId , "code" : recordCode, "version": recordVersion, "parentRecordCode" : parentRecordCode });
			}
		});
		
		return jsonStringify(pageContextParams);
	},
	
	baseFunctions.setSelectedRecords =  function(redirectConfig,callbackfuncion) {
		var getRel = redirectConfig.recordId;
		var recordCodes = redirectConfig.recordCodes != undefined ? redirectConfig.recordCodes : "";
		var version = redirectConfig.version != undefined ? redirectConfig.version : "";
		var pageKey  = redirectConfig.pageKey?redirectConfig.pageKey:screenName;
		var pageName = redirectConfig.pageType != undefined ?redirectConfig.pageType:"";
		var actionName = (isSet(redirectConfig.actionName))?redirectConfig.actionName:"";
		var ajaxUrl = SetWebApiURL + "set-page-context";
		var target  = redirectConfig.target?redirectConfig.target:"";
		var pageContextParams = redirectConfig.pageContextParams != undefined ? redirectConfig.pageContextParams : [];
		var pageId = !isSet(redirectConfig.pageId) ? current_moduleId : redirectConfig.pageId;
		
			if(!baseFunctions.isValidJson(pageContextParams)) {
				pageContextParams = JSON.stringify(pageContextParams);
			}
			var ajaxObject = {
					"ajaxURL" : ajaxUrl,
					"params" : {"pageId" :pageId, "action" : actionName, "pageKey" : pageKey, "pageName": pageName,"pageContextParams":pageContextParams},
					"successCallback" : function(obj){
						if(isSet(redirectConfig.pageType)){
							var moduleTypeValue = moduleTypeJson[redirectConfig.pageType];
							var moduleCookie = {
								"pageId" : current_moduleId
							};
							setActionCookie(moduleCookie,moduleTypeValue,pageKey); 
						}
						
						if(getResultCode(obj.resultCode) == CODE_SUCCESS){
							$("#batchupdate-form-block").remove();
							if(redirectConfig.openType ==  "newPage"){
								setTimeout(function(){
									if(target == "_blank"){
										window.open(SetWebURL+redirectConfig.openUrl, "_blank");
									}else{
										window.location = SetWebURL+redirectConfig.openUrl;
									}
								},500);
								return false;
							}else{
								// remove error message and highlight error box
								$(app_action_form_addmore_wrapper).find(".error-message").remove();
								$(app_action_form_addmore_wrapper).find(".error-input-box").removeClass("error-input-box");
								
								//$(app_action_form_block_wrapper).not($(app_action_form_addmore_wrapper)).hide();
								$(".app-action-group a").not($(this)).removeClass('active');
								$(this).toggleClass('active');
								$(app_action_form_addmore_wrapper).toggle();
							}
							if(isSet(callbackfuncion)){
								setTimeout(function(){
									var callback = callbackfuncion.split('.');
									window[callback[0]][callback[1]](redirectConfig);
								},800);
							}
						}
					},
					"failureCallback" : generateFailure,
					"aSync" : false
			};
			ajaxCallBack(ajaxObject);
	},
	baseFunctions.setSelectedSummary =  function(redirectConfig) {
		var returnObject = [];
		var getRel 				= redirectConfig.getRel;
		var pageKey  			= $.urlParam(getRel,"pageKey");
		var pageName 			= $.urlParam(getRel,"pageName");
		var recodeId 			= $.urlParam(getRel,"recordId");
		var recodeCode 			= $.urlParam(getRel,"code");
		var version 			= $.urlParam(getRel,"version");

		var ajaxUrl 			= SetWebURL + "set-up-cache";
		var pageContextParams 	= JSON.stringify([{"recordId" : recodeId, "code" : recodeCode,"version":version}]);;
		var callbackfuncion 	= redirectConfig.callbackfuncion;
		
		var redirectConfig = $.extend({
			"pageContextParams":pageContextParams
		},redirectConfig);
		
		var ajaxObject = {
				"ajaxURL" : ajaxUrl,
				"params" : {"pageKey" : pageKey, "pageName": pageName,"code":recodeCode,"recordId":recodeId,"version":version,'pageContextParams':pageContextParams},
				"successCallback" : function(obj){
					if(getResultCode(obj.resultCode) == CODE_SUCCESS){
						returnObject  = obj.returnObject;
						if(isSet(callbackfuncion) && callbackfuncion != ""){
							setTimeout(function(){
								var callback = callbackfuncion.split('.');
								window[callback[0]][callback[1]](redirectConfig,obj.returnObject);
							},800);
						}
					}
				},
				"failureCallback" : generateFailure,
				"aSync":true,
		};
		ajaxCallBack(ajaxObject);
	},
	baseFunctions.setSelectedEditScreen = function(redirectConfig){
		if(redirectConfig.openType ==  "popUp"){
			baseFunctions.appendEditFormHTML(1);
			baseFunctions.generateBatchEditFetchForm("modal-batchupdate-form-content",1,redirectConfig);
			return false;
		}
	}
	baseFunctions.setSelectedAddScreen = function(redirectConfig){
		if(redirectConfig.openType ==  "popUp"){
			$("#batchupdate-form-block").remove();
			baseFunctions.generateAddFetchForm("modal-batchupdate-form-content",1,redirectConfig);
			return true;
		}
		baseFunctions.generateAddFetchForm("app-action-form-addmore");
	}
	
	baseFunctions.isValidJson =  function(str) {
		 try {
		        JSON.parse(str);
		    } catch (e) {
		        return false;
		}
		return true;
	},
	
	baseFunctions.perform_sendEditPage =  function(buttonConfig,formWrapper) {
		var buttonName = buttonConfig.keyName;
		var formId 	   = "#"+formWrapper;
		$(document).undelegate(formId+" :input[name='"+buttonName+"']","click");
		$(document).delegate(formId+" :input[name='"+buttonName+"']","click",function(){
			var getPKValue = $(formId).find("[name=recordId]").val();
			var getRecordCode = $(formId).find("[name=recordCode]").val();
			var version = $(formId).attr("data-version");
			var parentRecordCode = $(formId).attr("data-row-parentrecordcode");
			if(buttonConfig.buttonType.toUpperCase() != ""){
				var pageContextParams= JSON.stringify([{ "recordId" : getPKValue , "code" : getRecordCode, "version": version, "parentRecordCode": parentRecordCode }]);
				var redirectConfig = {
						"recordId" : valueToStringArray(getPKValue),
						"openUrl"  : buttonConfig.redirectUrl,
						"openType" : "newPage",
						"pageType" : buttonConfig.buttonType.toUpperCase(),
						"pageKey"  :  screenName,
						"recordCodes":getRecordCode,
						"pageContextParams":pageContextParams
				};
				baseFunctions.setSelectedRecords(redirectConfig);
			}
		});
	},

	baseFunctions.defaultOpenAccordion =  function() {
	    $(".openAccordionClass").each(function() {
	    	$(this).find(".accordion-panel h3").trigger("click");
	    });
	},
	baseFunctions.accordionLoad = function(accordionSelector) {
		$(accordionSelector).find(".accordion-content").hide();
		$(accordionSelector).find(".accordion-panel.active").children(".accordion-content").show();
	        $(accordionSelector).find(".accordion-header:first .accordion-title").click(function() {
	        	var $this = $(this).parents(".accordion-header");
	            if ($this.closest(".accordion-panel").hasClass("active")) {
	                $this.closest(".accordion-panel").addClass("accordion-close");
	                $this.closest(".accordion-panel").removeClass("active");
	                $this.siblings(".accordion-content").slideUp();
	            } else {
	                $(".accordion-panel").addClass("accordion-close");
	                $this.closest(".accordion-panel").removeClass("accordion-close");
	                $this.closest(".accordion-panel").addClass("active");
	                $this.siblings(".accordion-content").slideDown();
	            }
	            $(window).resize();
	    });
	        
	}
	
	baseFunctions.hideMsgWrapper =  function(wrapper) {
		$(wrapper).find(".close").trigger("click");
	},
	
	baseFunctions.generateAccordion =  function(accordionConfig,setAccordionWrapper) {
		
		var accordionId      	= accordionConfig.id;
		var accordionClass  	= accordionConfig.className;
		var accordionTitle   	= accordionConfig.title;
		var accordion_key		= accordionConfig.accordion_key?accordionConfig.accordion_key:"";
		var accordionWrapper 	= (!isSet(accordionConfig.id))?".accordion":"#"+accordionConfig.id+" .accordion:first";
		var recordId		 	= accordionConfig.recordId;
		var dataScreenAdd 	    = isSet(accordionConfig.dataScreenAdd)? accordionConfig.dataScreenAdd : "setting-template";
		
		var mainAccordion = $(accordion_main_block);
		
		mainAccordion.attr({"id" : accordionId, "recordId" : recordId, "data-screen-add": dataScreenAdd , "data-filter-context" : accordionConfig.filterContext,"data-accordionKey":accordion_key}).addClass(accordionClass);
		mainAccordion.find(".accordion").append($(accordion_panel).prop("outerHTML"));
		mainAccordion.find(".accordion-header h3").text(accordionTitle);
		mainAccordion.find(".accordion-content").append(accordion_content_panel);
		
		if(!isSet(accordionConfig.allowFilter)){
			mainAccordion.find(".accordion-filter-wrapper:first").append(filter_block);
		}
		if(!isSet(accordionConfig.subContent) || accordionConfig.subContent !=true ){
			if(setAccordionWrapper == undefined){
				setAccordionWrapper = panel_accordion_wrapper;
			}
			$(setAccordionWrapper).append(mainAccordion.prop("outerHTML"));
		}else{
			var parentAccordionId 	= "#"+accordionConfig.parentId;
			$(parentAccordionId).find(".accordion-content-wrapper:first").append(mainAccordion.prop("outerHTML"));
		}
		baseFunctions.accordionLoad(accordionWrapper);
		
	},
	
	/* function for convert date in given format or return non-date value as it is */
	baseFunctions.formatComputation =  function(format,dateRange,value,currFormat) {
		var validFormat = 0;
		if(format == "date"){
			if(dateRange == "BETWEEN"){
				var value_1 = value.split(" TO ");
				var newDateValue_1 = getValidFormat(value_1[0],currFormat,"DD/MM/YYYY");
				var newDateValue_2 = getValidFormat(value_1[1],currFormat,"DD/MM/YYYY");
				if(newDateValue_1 != undefined && newDateValue_2 != undefined){
					value = newDateValue_1+" TO "+newDateValue_2;
				}else{
					validFormat = 1;
				}
			}else if(dateRange == "ISNULL" || dateRange == "ISNOTNULL"){
				return "";
			}else{
				var newDateValue = getValidFormat(value,currFormat,"DD/MM/YYYY");
				if(newDateValue != undefined){
					value = newDateValue;
				}else{
					validFormat = 1;
				}
			}
		}
		if(format == "datetime"){
			if(dateRange == "BETWEEN"){
				var value_1 = value.split(" TO "); 
				var newDateValue_1 = getValidFormat(value_1[0],currFormat,"DD/MM/YYYY HH:mm:ss");
				var newDateValue_2 = getValidFormat(value_1[1],currFormat,"DD/MM/YYYY HH:mm:ss");
				if(newDateValue_1 != undefined && newDateValue_2 != undefined){
					value = newDateValue_1+" TO "+newDateValue_2;
				}else{
					validFormat = 1;
				}
			}else if(dateRange == "ISNULL" || dateRange == "ISNOTNULL"){
				return "";
			}else{
				var newDateValue = getValidFormat(value,currFormat,"DD/MM/YYYY HH:mm:ss");
				if(newDateValue != undefined){
					value = newDateValue;
				}else{
					validFormat = 1;
				}
			}
		}
		if(format == "time"){
			if(moment(value.toString(),[currFormat],true).isValid()){
				var newDateValue = getValidFormat(value,currFormat,"HH:mm:ss");
				value = newDateValue;
			}else if(dateRange == "ISNULL" || dateRange == "ISNOTNULL"){
				return "";
			}else{
				return false;
			}
		}
		if(validFormat == 0){
			return doTrim(value);
		}else{
			return false;
		}
	},
	
	baseFunctions.getGridValue = function(key) {
		if(isSet(gridDetails)){
			for(var i = 0; i<gridDetails.length; i++)
			{
				  if(gridDetails[i].gridDispKey == key){
				   return gridDetails[i];
				  } 
			}
		}
		return false;
	},
	
	baseFunctions.conditionForSelectedRadin = function(){
		var selectRecordAction = $("input[name='selectRecordAction']:checked").val();
		if(selectRecordAction == 1){
			selectRecordValue = "true"; 
		}else{
			selectRecordValue = "false";
		}
		
		if(selectRecordAction == 1){
			return true;
		}else if(selectRecordAction == 2){
			return 2;
		}else{
			selectRecordValue = "false";
			return false;
		}
	}
	
	/* function to call generate scrollbar */
	baseFunctions.generateScrollbar = function(selector,axisVal) {
		var scroll_selector = "";
		if (selector == undefined)
			scroll_selector = "[data-scroll]";
		else
			scroll_selector = selector;
		var axisVal = (axisVal != undefined)?axisVal:"y";
		
		var apiScroll = $(scroll_selector).jScrollPane({
			showArrows: true,
			autoReinitialise: true
		}).data('jsp');

		if(isSet(apiScroll) && isSet(apiScroll.reinitialise)){
			apiScroll.reinitialise();
		}
		
		var throttleTimeout;
		$(window).bind('resize',function(){
			if (!throttleTimeout) {
				throttleTimeout = setTimeout(function(){
					if(isSet(apiScroll) && isSet(apiScroll.reinitialise)){
						apiScroll.reinitialise();
					}

					throttleTimeout = null;
				},50);
			}
		});
	}
	
	/* function to remove scrollbar */
	baseFunctions.removeScrollBar = function(selector){
		$(selector).jScrollPane().data().jsp.destroy();
	}
	
	/*baseFunctions.addAccordionAction = function(actions,getRecordId){
		$(document).undelegate(".accordion-action-add","click touchend");
		$(document).delegate(".accordion-action-add","click touchend",function(){
			var thisPageKey = $(this).parents(".app-action-form").attr("data-screen-add") != "" ? $(this).parents(".app-action-form").attr("data-screen-add") : "setting-template";  
			var redirectConfig = {
					"recordId" : getRecordId,
					"openUrl"  : actions.openUrl,
					"openType" : actions.openType,
					"pageType" : "ADD",
					"pageKey"  : thisPageKey,
					"pageContextParams": JSON.stringify([{"recordId":getRecordId}])
			};
			baseFunctions.setSelectedRecords(redirectConfig);
		});
	}*/
	baseFunctions.editAccordionAction = function(){
		
		$(document).undelegate(".accordion-action-edit","click touchend");
		$(document).delegate(".accordion-action-edit","click touchend",function(){
			
			if($(this).closest('.accordion-panel').hasClass('active') == false)
				$(this).closest('.accordion-panel').find(".accordion-title h3").trigger('click');
			
			var this_val = $(this);
			var wrapperId = $(this_val).closest(".accordion-panel").find(".accordion-content-wrapper:first");
			var accordionKey = $(this_val).attr("data-accordionkey");
			var getThisContent = $(wrapperId).closest(".edit-content").children(".accordion-content");
			var otherAccordionContent = $(".accordion-content").not(getThisContent);
				
			if((wrapperId.find('.accordion-form-wrapper').children().length > 0) && $(this_val).hasClass("is-view")){
				if(accordionCallSaveAlert($(this)) == false){
					return false;
				}
				$(this_val).removeClass("is-view").addClass("is-edit");
				baseFunctions.isEditForm(accordionKey,wrapperId);
				otherAccordionContent.find(".hide-elements").show();
			}else if($(this_val).hasClass("is-edit")){
				$(this_val).removeClass("is-edit").addClass("is-view");
				baseFunctions.isViewForm(accordionKey,wrapperId);
				otherAccordionContent.find(".hide-elements").hide();
			}
		});
	}
	baseFunctions.getEditableContent = function(accordionPanel){
		 
/*		  if(accordionPanel.hasClass("active") == false){
		   accordionPanel.find(".accordion-content").slideDown();
		   accordionPanel.addClass("active");
		  }
		  
		  if(accordionPanel.hasClass("edit-content") == false){
//			   accordionPanel.addClass("edit-content");
			  
			 //  accordionPanel.find(".none-edittable-label").hide();
			 //  accordionPanel.find(".p-r-5").show();
			   accordionPanel.find(".hide-elements").show();
			 //  accordionPanel.find(".center-btn button").show();
			   
//			   $(accordionPanel).addClass("normal-form");
			   $(accordionPanel).removeClass("view-form");
			   $(accordionPanel).find(".view-only-form").hide();
			   $(accordionPanel).find(".edit-only-form").show();
			   
		  }else{
			  
//			   $(accordionPanel).addClass("view-form");
//			   $(accordionPanel).removeClass("normal-form");
			   
//			   accordionPanel.removeClass("edit-content");
			   $(accordionPanel).find(".view-only-form").show();
			   $(accordionPanel).find(".edit-only-form").hide();
			  // accordionPanel.find(".none-edittable-label").show();
			  // accordionPanel.find(".p-r-5").hide();
			   accordionPanel.find(".hide-elements").hide();
			  // accordionPanel.find(".center-btn button").hide();
			  }*/
			  datepickerLoad();
	}
	baseFunctions.isEditForm = function(accordionKey,wrapperId){
		
		var ajaxObject = {
				"ajaxURL" : SetWebApiURL+"batch-edit-form",
				"params" : {"pageId" :current_moduleId, "pageName":"EDIT","pageKey" : screenName,"accordionKey":accordionKey},
				"successCallback" : function(object){
					if(getResultCode(object.resultCode) == CODE_SUCCESS){
						$(wrapperId).find(".accordion-form-wrapper").html("");
						baseFunctions.editAccordionSuccess(object,$(wrapperId).find(".accordion-form-wrapper")); 
					}
				},
				"failureCallback" : function(){},
				"wrapperId" 	  : $(wrapperId).find(".accordion-form-wrapper"),
				"loaderWrapper"	  : "#"+$("#"+accordionKey).find("form").attr("id"),
				"loader"		  : true
		};
		ajaxCallBack(ajaxObject);
	}
	baseFunctions.isViewForm = function(accordionKey,wrapperId){
		var ajaxObject = {
				"ajaxURL" : SetWebApiURL+"view-form",
				"params" : {"pageId" :current_moduleId,"pageName":"VIEW", "pageKey" : screenName,"accordionKey":accordionKey},
				"successCallback" : function(object){
					if(getResultCode(object.resultCode) == CODE_SUCCESS){
						$(wrapperId).find(".accordion-form-wrapper").html("");
						baseFunctions.viewAccordionSuccess(object,$(wrapperId).find(".accordion-form-wrapper"));
					}
				},
				"failureCallback" : function(){},
				"wrapperId" 	  : $(wrapperId).find(".accordion-form-wrapper"),
				"loaderWrapper"	  : "#"+$("#"+accordionKey).find("form").attr("id"),//$("#"+accordionKey).find(".accordion-content")
				"loader"		  : true
		};
		ajaxCallBack(ajaxObject);
	}
	baseFunctions.viewAccordionSuccess = function(json_data,wrapper){
		wrapper = $(wrapper);
		
		var formInfoData = json_data.returnObject.formInfo;
		if (getResultCode(json_data.resultCode) == CODE_SUCCESS) {
			var groupProperty = formInfoData.hasOwnProperty("formGroups");
			var elementProperty = formInfoData.hasOwnProperty("formElements");
			if(groupProperty == false || elementProperty == false ){
				return false;
			}
			
			$(wrapper).dynamicForm({
				formObject : json_data.returnObject,
				formType:"view-form",
			});
			
			if(isSet(json_data.returnObject.formInfo.selectedValues)){
				$(wrapper).find("form").attr({"data-version":json_data.returnObject.formInfo.selectedValues[0].version});
			}
			if(isSet(json_data.returnObject.gridDetails)){
				$(wrapper).attr({"data-gridKey":json_data.returnObject.gridDetails[0].gridKey,"data-gridDispKey":json_data.returnObject.gridDetails[0].gridDispKey})
			}
		}
	}
	baseFunctions.editAccordionSuccess = function(json_data,wrapper){
		 var wrapperId = $(wrapper);
		 var formInfoData = json_data.returnObject.formInfo;
		 if (getResultCode(json_data.resultCode) == CODE_SUCCESS) {
	  
		  var groupProperty = formInfoData.hasOwnProperty("formGroups");
		  var elementProperty = formInfoData.hasOwnProperty("formElements");
		  if(groupProperty == false || elementProperty == false ){
		   return false;
		  }
		  var message = {
		    "message" : "batch.update.alert.message",
		  };
		  
		  var contextParams = [];
		  var selectedRecords = json_data.returnObject.formInfo.selectedValues;
		 
		  if(isSet(selectedRecords)){
			  
			  for(var i=0; i<selectedRecords.length; i++){
				  var recordId = selectedRecords[i].value;
				  var recordCode = selectedRecords[i].recordCode ? selectedRecords[i].recordCode : "";
				  var recordVersion = selectedRecords[i].version;
				  var parentRecordCode = selectedRecords[i].parentRecordCode ? selectedRecords[i].parentRecordCode :"";
				  
				  contextParams.push({ "recordId" : recordId , "code" : recordCode, "version": recordVersion, "parentRecordCode" : parentRecordCode });
			  }
		  }else{
			  contextParams = accordionConfigs.contextParams;
		  }
		  
		  $(wrapperId).dynamicForm({
		    formObject : json_data.returnObject,
		    callback : function(msg,dataArray){
			    $(wrapperId).find("form").validate({
				     validation : dataArray.isValidation,
				     hiddenParams : contextParams,
				     optionalObj : dataArray.optionalWarningObj, 
				     alert      : true,
				     editMode        : true,
				     callback : function(){}
			    });
		     }
		  });
		 }else{
			 generateMsg(json_data.resultCode,json_data.messageKey,global_message_wrapper,"",json_data.responseDetail);
		 }
	},
	baseFunctions.generateAccordionListMenu = function(accordionDetails){
		$(".list-dp-menu").remove();
		var accordionPanelIcon = $(panel_accordion_list_icon);
		$(accordionPanelIcon).insertAfter(".panel-block-heading");
		var accordionMenuHTML = $(panel_accordion_list_menu_block);
		$(accordionMenuHTML).insertAfter(".list-dp-menu");
			for(var i = 0; i < accordionDetails.length; i++){
				var liCloneMenu = document.createElement("li");
				var aCloneMenu  = document.createElement("a")
				$(aCloneMenu).attr({
					"href" : "javascript:void(0);",
					"rel" : accordionDetails[i].accordionKey
				}).text(i18NCall(accordionDetails[i].title));
				$(liCloneMenu).append($(aCloneMenu).prop("outerHTML"));
				$(".accordion-list-dropdown").find("ul").append($(liCloneMenu).prop("outerHTML"));
			}
		$(".list-dp-menu").click(function(){
			 $(".accordion-list-dropdown").toggleClass("show");
		});
		
		var txtSearchId='#'+"searchData"; 
		$(txtSearchId).on('keyup',function(){//keypress
			var liid = ".list-dropdown-menu"//'#'+$(txtSearchId).attr('rel');//Get ul id 
			var searchText= $(txtSearchId).val().toLowerCase();//Search Text
			var list = $(liid);		
			list.find('li').each(function(){
			var currentLiText =$(this).text().toLowerCase();	
				showCurrentLi = currentLiText.indexOf(searchText) !== -1;
				$(this).toggle(showCurrentLi);		
			});
		});
		
		$(".list-dropdown-menu").find("a").click(function(){
			var accordionId = "#"+$(this).attr("rel");
			if($(accordionId).find(".accordion-panel:first").hasClass("active") == false){
				$(accordionId).find(".accordion-header:first .accordion-title").trigger("click");
			}
			$(this).parents('.panel-block-head').find(".list-dp-menu").trigger('click');
			$('html, body').animate({
		        scrollTop: $(accordionId).offset().top
		    }, 2000);
		});
	}
	baseFunctions.setCustomFileData = function(fileId){
		var file_id 	= "#"+fileId;
		var formId = $(file_id).parents("form").attr("id");
		var path = $(file_id).val().match(/[^\/\\]+$/);
		var isError = 1;
		if(path != null){
			var pathString = path.toString();
			var sub_str	= pathString.substr(0,35)
			sub_str = (pathString.length > 35)?sub_str+"...": pathString;
		}
		var file = $(file_id)[0].files[0];
		$(file_id).parents(selector_input_file).find(selector_selected_file).removeClass("error-input-box");
		$(file_id).parents(selector_p_r_5).find(selector_error_message).remove();
		$(file_id).parents(selector_input_file).find(selector_selected_file).empty().removeAttr("title");
		$(file_id).parents(selector_input_file).find(selector_selected_file).html(i18NCall('no_file_selected'));
		
		if(file){
			var errorMesage = "";
			var fileSize = (file.size/1024)/1024;
			var expression = "\("+$(file_id).data('accept')+")$";
			var pattern = new RegExp(expression,"i");
		
			/* for generate error message */
			var errorHTML = $(validation_error_block);
			className = fileId +" "+ $(file_id).attr("type");
			var fileTitle = $(file_id).parents(selector_input_file).find(selector_selected_file).attr("title");
			if(fileSize > $(file_id).data('size')){
				$(".selected-file-name").addClass("error-input-box");
				errorMesage += i18NCall('validate.max.file.size.message',$(file_id).data('size'));
				generateFieldMsg(1,className,errorMesage,$(file_id).attr("id"),"#"+formId);
				return isError;
			}
			var allowedType = $(file_id).data('accept').replace(/\|/g,",").replace(/\\/g," ");
			if(!pattern.test($(file_id).val())){
				$(".selected-file-name").addClass("error-input-box");
				errorMesage += i18NCall('validate.allowed.file.type.message',allowedType);
				generateFieldMsg(1,className,errorMesage,fileId,"#"+formId);
				return isError;
			}
			if(fileSize < $(file_id).data('size') && pattern.test($(file_id).val())){
				isError = 0;
				$(file_id).parents(selector_input_file).find(selector_selected_file).html(sub_str).attr({
					"title" : pathString,
				});

				var oFReader = new FileReader();
				oFReader.readAsDataURL(file);
				oFReader.onload = function (oFREvent) {
					$(file_id).removeData("value");
					$(file_id).attr({
						"data-value" : oFREvent.target.result
					});
				};
			}
		}
		return isError;
	}
	baseFunctions.tableGrid = function(json_data,modalContent) {
		var gridObject = json_data.returnObject;
		var colModels = gridObject.columnConfig.columnValueObjects;
		var totalColumns = gridObject.columnConfig.totalColumnCount;
		var tableWrapper = document.createElement('table');
		var tr = document.createElement('tr');
		$(tableWrapper).append("<thead></thead>");
		$(tableWrapper).append("<tbody></tbody>");
		for(var c=0;c < colModels.length;c++)
		{
			var th = document.createElement('th');
			$(th).attr({
				"data-column-id"	 : colModels[c].columnNo, 
				"width"              : colModels[c].colWidth,
				"data-link-type"	 : colModels[c].linkType
			});
			
			$(th).text(i18NCall(colModels[c].columnNameKey));
			$(tr).append(th);
		}
		
		$(tableWrapper).find("thead").append(tr);
		$(tableWrapper).addClass("table-grid fixed grid-info");
		
		var RowModels = gridObject.rowConfig;
		if(RowModels != undefined){
			$.each(RowModels, function (index, records) {
				var tr = document.createElement('tr');
				$(tr).attr({
							"role":"row",
							"class":"rowModels"
						});
				var recordData = records.record;
				for(var r=0;r<recordData.length;r++)
				{
					var td = document.createElement('td');
					$(td).attr({
						"data-value": recordData[r].value,
						"data-column-no":recordData[r].columnNo,
						"data-row-id": records.recordId,
						"data-record-id":records.rowId
					});
					var vals = (recordData[r].value != undefined)? recordData[r].value:"";
					var aURL = "";
					//get link type from column no
					var link_type = $(self).find("th[data-column-id='"+recordData[r].columnNo+"']").attr("data-link-type");
					if(link_type != undefined){
						if(recordData[r].link != undefined){
							aURL = recordData[r].link;
						}
						if(link_type == "link"){
							$(td).html('<a href="'+aURL+'" title="'+vals+'">'+vals+'</a>');
						}else if(link_type == "popUp"){
							
						}else if(link_type == "subGrid"){
							aURL = "/"+pathValue+"/"+aURL+"&recordId="+records.recordId;
							var aClone = document.createElement("a"); 
							$(aClone).attr({
								"title" : vals,
								"onclick" : "callSubGridAjax(this.rel)",
								"rel" : aURL
							}).text(vals);
							$(td).html($(aClone).prop("outerHTML"));
						}
					}else{
						$(td).text(vals);
					}
											
					$(tr).append(td);
				}
				$(tableWrapper).find("tbody").append(tr);
			});
		}else{
			var tr = document.createElement('tr');
			$(tr).attr({
						"role":"row",
						"class":"rowModels"
					});
			var td = document.createElement('td');
			$(td).attr({
				"class"	  : "no-rows",
				"colspan" : totalColumns
			});
			$(td).text(i18NCall('no.records.found'));
			$(tr).append(td);
			$(tableWrapper).find("tbody").append(tr);
		}
		
		$(grid_popup_block_wrapper).remove();
		getModalPopUp(grid_popup_block);
		setTimeout(function(){
			var modalHeader  = (modalContent.headerLabel != undefined)?modalContent.headerLabel : "";
			$(grid_popup_block_wrapper).find(".modal-header h4").append(i18NCall(modalHeader));
			$(grid_popup_block_wrapper).find("#modal-gridpopup-form-content").append($(tableWrapper).prop("outerHTML"));
			baseFunctions.generateScrollbar("#modal-gridpopup-form-content");
			generateMsg(json_data.resultCode,json_data.messageKey,global_lightbox_wrapper,"",json_data.responseDetail);
		},150);	
	}
	
	baseFunctions.accordionGrid = function(accordions,contextParams,isFilter){
		   if(!isSet(accordions.gridDetail)){
			   return false;
		   }
		   var gridDispKey = accordions.gridDetail.gridDispKey;
		   var gridKey = accordions.gridDetail.gridKey;
		   var accordionKey = accordions.accordionKey;
		   var accordionTitle = accordions.accordionTitle;
		   var gridContext = gridDispKey+"-"+gridKey;
		   var dataScreenPageId  = isSet(accordions.gridDetail.pageId) ? accordions.gridDetail.pageId : 0;
		   var dataScreenPageKey  = isSet(accordions.gridDetail.pageDispKey) ? accordions.gridDetail.pageDispKey : screenName;
		   if(isFilter == true){
			   var ajaxObject = {
			     "ajaxURL" : SetWebApiURL+'json/filter-config.json',
			     "params" : {"pageId":current_moduleId, "gridKey": gridKey },
			     "successCallback" : function(data){
			      if(getResultCode(data.resultCode) == CODE_SUCCESS){
			    	  var accordionConfig_2 = {
		    	          "id"            : "accordion-"+accordionKey,
		    	          "className"     : "app-action-form app-action-form-block",
		    	          "title"         : i18NCall("filter.link.label"),
		    	          "subContent"    : true,
		    	          "parentId"      : accordionKey,
		    	          "filterContext" : gridContext
		    	       }
		    		   baseFunctions.generateAccordion(accordionConfig_2);
				       //function for generate filter functionality
				       if(data.returnObject) { 
				          $("#accordion-"+accordionKey).dfilters({
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
		   
		   var ajaxObject = {
   		           "ajaxURL" : SetWebApiURL+'json/page-details.json',
   		           "params" : {"pageNo" :1, "recordsPerPage" : 25, "currentPage" : 1,"pageId":current_moduleId, "gridName": gridDispKey , "gridKey": gridKey },
   		           "successCallback" : function(obj){
   			            var panelBlock = $(panel_grid_main_block).attr({"id" : gridContext,"data-screen":dataScreenPageKey,"data-gridDispKey":gridDispKey,"data-gridKey": gridKey,"data-pageId": dataScreenPageId});
   			            $("#"+accordionKey).find(".accordion-content:first").append($(panelBlock).prop("outerHTML"))
   			            baseGridActions.generateGridSuccess(obj,gridContext,current_zodiac+"GridActions");
   		           },
   		           "failureCallback" : generateFailure,
   		           "wrapperId"    : gridContext,
   		           "loader" : true,
   		           "aSync" : true,
   		           "loaderWrapper" : "#"+gridContext
   		 };
   		 ajaxCallBack(ajaxObject);
	}
	
	/* function for generate simple table grid*/
	baseFunctions.simpleTable = function(json_data,wrapper) {
		var colModels = json_data.columnConfig.columnValueObjects;
		var totalColumns = json_data.columnConfig.totalColumnCount;
		var tableWrapper = document.createElement('table');
		var tr = document.createElement('tr');
		$(tableWrapper).append("<thead></thead>");
		$(tableWrapper).append("<tbody></tbody>");
		$(tr).append(action_column_checkbox);
		$(tr).find("#check-all").attr({"data-total-records" : totalColumns });
		for(var c=0;c < colModels.length;c++)
		{
			var th = document.createElement('th');
			$(th).attr({
				"data-column-id"	 : colModels[c].columnNo, 
				"width"              : colModels[c].colWidth,
				"data-link-type"	 : colModels[c].linkType
			});
			
			$(th).text(i18NCall(colModels[c].columnNameKey));
			$(tr).append(th);
		}
		
		$(tableWrapper).find("thead").append(tr);
		$(tableWrapper).addClass("table-grid fixed grid-info");
		
		var RowModels = json_data.rowConfig;
		if(RowModels != undefined){
			$.each(RowModels, function (index, records) {
				var tr = document.createElement('tr');
				$(tr).attr({
							"role":"row",
							"class":"rowModels"
						});
				
				checkBox = $(action_row_checkbox);
				$(checkBox).find("input").attr({"data-row":records.recordId,"id":"box"+records.recordId,"data-row-string":records.rowId,"data-row-code":records.recordCode,"data-row-version":records.version,"data-row-parentrecordcode":records.parentRecordCode});
				$(checkBox).find("label").attr({"for":"box"+records.recordId});
				$(tr).append($(checkBox));
				
				var recordData = records.record;
				for(var r=0;r<recordData.length;r++)
				{
					var td = document.createElement('td');
					$(td).attr({
						"data-value": recordData[r].value,
						"data-column-no":recordData[r].columnNo,
						"data-row-id": records.recordId,
						"data-record-id":records.rowId
					});
					var vals = (recordData[r].value != undefined)? recordData[r].value:"";
					var aURL = "";
					//get link type from column no
					var link_type = $(self).find("th[data-column-id='"+recordData[r].columnNo+"']").attr("data-link-type");
					if(link_type != undefined){
						if(recordData[r].link != undefined){
							aURL = recordData[r].link;
						}
						if(link_type == "link"){
							$(td).html('<a href="'+aURL+'" title="'+vals+'">'+vals+'</a>');
						}else if(link_type == "popUp"){
							
						}else if(link_type == "subGrid"){
							aURL = "/"+pathValue+"/"+aURL+"&recordId="+records.recordId;
							var aClone = document.createElement("a"); 
							$(aClone).attr({
								"title" : vals,
								"onclick" : "callSubGridAjax(this.rel)",
								"rel" : aURL
							}).text(i18NCall(vals));
							$(td).html($(aClone).prop("outerHTML"));
						}
					}else{
						$(td).text(i18NCall(vals));
					}
											
					$(tr).append(td);
				}
				$(tableWrapper).find("tbody").append(tr);
			});
		}else{
			var tr = document.createElement('tr');
			$(tr).attr({
						"role":"row",
						"class":"rowModels"
					});
			var td = document.createElement('td');
			$(td).attr({
				"class"	  : "no-rows",
				"colspan" : totalColumns
			});
			$(td).text(i18NCall('no.records.found'));
			$(tr).append(td);
			$(tableWrapper).find("tbody").append(tr);
		}
		$(wrapper).append(tableWrapper);
	},
	baseFunctions.accordion_action = function(){
		//$(accordionAction).insertAfter('.content-section');
		$(accordionAction).insertBefore('.scrollup');
		$(".de-expand-all").hide();
	    $(".expand-all").click(function(){
			$(".accordion .accordion-content").each(function(){
				var accordionPanel = $(this).closest(".accordion-panel");
				accordionPanel.addClass("active");
				accordionPanel.removeClass("accordion-close");
				$(this).parents(".accordion-header").siblings(".accordion-content").slideDown();
				$(this).show();
			});
			$(window).trigger("resize");
			$(".de-expand-all").show();
			$(".expand-all").hide();
	    });
		$(".de-expand-all").click(function(){
			$(".accordion .accordion-content").each(function(){
				var accordionPanel = $(this).closest(".accordion-panel");
				$(this).parents(".accordion-header").siblings(".accordion-content").slideUp();
				accordionPanel.addClass("accordion-close");
				accordionPanel.removeClass("active");
				$(this).hide();
				
			});
			$(".de-expand-all").hide();
			$(".expand-all").show();
		});
	},
	baseFunctions.scroll_expand = function(){
		$(document).ready(function() {
			$(window).scroll(function () {
			    if ($(this).scrollTop() > 100) {
			        $('.scrollup').fadeIn();
			    } else {
			        $('.scrollup').fadeOut();
			    }
			});
			
			$('.scrollup').click(function () {
		        $("html, body").animate({
		            scrollTop: 0
		        }, 300);
		        return false;
		    });
		});
	}
	baseFunctions.detach = function(this_val) {
		var modalId = $(this_val).parents("[role=dialog]").attr('id');
		$("#"+modalId).modal("hide");
		$("#"+modalId).remove();
		$('.modal-backdrop').remove();
		var url = $(this_val).attr("rel");
	    // Fixes dual-screen position                         Most browsers      Firefox
	    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

	    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	    var left = ((width / 1.8) - (900 / 1.8)) + dualScreenLeft;
	    var top = ((height / 3) - (500 / 3)) + dualScreenTop;
	    var newWindow = window.open(url, 'xtf', 'scrollbars=yes, width=680px, height=650px, top=' + top + ', left=' + left );
		
	    // Puts focus on the newWindow
	    if (window.focus) {
	        newWindow.focus();
	    }
	}
	/* function to set file data of file input */
baseFunctions.setCustomMultiFileData = function(fileId)
{
		var file_id 	= "#"+$(fileId).attr("id");
		var formId 		= $(file_id).parents("form").attr("id");
		var setClubBy 	= $(fileId).attr("data-setclubby");
		var filedName 	= $(fileId).attr("name");
		var path 		= $(file_id).val().match(/[^\/\\]+$/);
		
		var isError 		= 1;
		if(path != null){
			var pathString 	= path.toString();
			var sub_str		= pathString.substr(0,35)
			sub_str			= (pathString.length > 35)?sub_str+"...": pathString;
		}
		var file = $(file_id)[0].files;
		if(!$.isEmptyObject(file)){
			var errorMesage 	= "";
			isError 			= 0;
			var totalSize 		= $(file_id).attr("data-size")?$(file_id).attr("data-size"):100;
			var expression 		= "\("+$(file_id).data('accept')+")$";
			var pattern 		= new RegExp(expression,"i");
		
			/* for generate error message */
			className = fileId +" "+ $(file_id).attr("type");
			var fileTitle = $(file_id).parents(selector_input_file).find(selector_selected_file).attr("title");
				/*$(file_id).parents(selector_input_file).find(selector_selected_file).html(sub_str).attr({
					"title" : pathString,
				});*/
				var allowedType = $(file_id).data('accept').replace(/\|/g,",").replace(/\\/g," ");
				for(var l=0; l<file.length; l++){
					var fileData = file[l];
					var fileType = fileData.name;
					if(!pattern.test(fileType)){
						isError = 2;
					}else{
						uploadedSize += file[l].size;
						var fileSize = (uploadedSize/1024)/1024;
						if(fileSize > totalSize){
							$(".selected-file-name").addClass("error-input-box");
							errorMesage += i18NCall('validate.max.file.size.message',totalSize);
							generateFieldMsg(1,className,errorMesage,filedName,"#"+formId);
							uploadedSize = (uploadedSize - file[l].size);
							return false;
						}
						
						(function(file) {
							var name = fileData.name;
							var oFReader = new FileReader();
							oFReader.readAsDataURL(file);
							oFReader.onload = function(oFREvent){
							   var files_element = $(file_attach_ele);
							   $(files_element).attr("id","file_"+l);
							   $(files_element).find(".left-file-name").text(name);
							   $(files_element).find(".delete-file").attr("data-size",file.size);
							   var input = document.createElement("input");
							   $(input).attr({
								   "name": filedName,
								   "data-clubby": setClubBy,
								   "type": "hidden",
								   "value" : oFREvent.target.result
							   });
							   $(files_element).find(".file-name").append($(input).prop("outerHTML"));
							   $(".filename_"+fileId.name).append(files_element);
							};
						 })(fileData);
						 isError = true;
					}
				}
				if(isError == 2){
					$(".selected-file-name").addClass("error-input-box");
					errorMesage += i18NCall('validate.allowed.file.type.message',allowedType);
					generateFieldMsg(1,className,errorMesage,filedName,"#"+formId);
				}
		}
		baseFunctions.removeMultiFileUploading();
		return isError;
	}
	baseFunctions.removeMultiFileUploading = function(obj)
	{
		 $(document).undelegate("form .delete-file","click");
		 $(document).delegate("form .delete-file","click",function(){
			 if(isSet($(this).attr("data-size")) && $(this).attr("data-size") != ""){
				 var lessSize = (parseInt($(this).attr("data-size")));
				 uploadedSize = (uploadedSize - lessSize);
				 var cons = $(this).closest('.multiple_upload').remove();
				 
//				 $(fileId).parents(".selected-file-name").removeClass("error-input-box");
//				 $(fileId).parents(selector_p_r_5).find(selector_error_message).remove();
			 }
		 });
	}
	
	
	baseFunctions.appendViewFormHTML();
		var wrapperId = 'view_visit_summary';
		var ajaxSummaryUrl = SetWebApiURL + "visit-summary";
		var ajaxObject = {
				"ajaxURL" : ajaxSummaryUrl,
				"params" : {"code" :accordionConfigs.contextParams.code},
				"successCallback" : function(object){
					coreVesselVisit.generateVesselVisitSummary(object,'view_visit_summary');
				},
				"failureCallback" : generateFailure,
				"wrapperId" 	  : wrapperId,
		};
		ajaxCallBack(ajaxObject);
		 setTimeout(function(){
			  baseFunctions.accordion(accordionConfigs.accordion,panel_accordion_wrapper,false);
			  coreVesselVisit.viewPageGeneralFunctionality();
		 },800);
	
	
	
})(window.baseFunctions = window.baseFunctions || {}, jQuery);