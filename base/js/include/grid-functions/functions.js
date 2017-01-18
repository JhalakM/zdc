/*
|@author : Intech Creative Services
|@desc   : Commonly used functions to call ajax, ajax success/failure callback, exceptions etc.
*/
(function(baseFunctions, $, undefined) {

	baseFunctions.createGrid = function(listGridDetails){
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
	}
	
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
	}
	
	
	baseFunctions.resetFormData =  function(wrapperId) {
		var resetWrapper = $(wrapperId).find("form [type=reset]");
		resetWrapper.trigger("click");
	}
	
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
	}
	
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
	}
	
	
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
		
	}
	
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
	}
	
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
	
	baseFunctions.isValidJson =  function(str) {
		 try {
		        JSON.parse(str);
		    } catch (e) {
		        return false;
		}
		return true;
	}
	
	baseFunctions.hideMsgWrapper =  function(wrapper) {
		$(wrapper).find(".close").trigger("click");
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
	}
	
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

	
})(window.baseFunctions = window.baseFunctions || {}, jQuery);