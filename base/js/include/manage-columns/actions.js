/*
|@author : Intech Creative Services
|@desc   : Function which are need to use on grid level.
*/

$(document).ready(function(){
		$(window).resize(baseGridActions.checkWidth);
});

(function(baseGridActions, $, undefined) {
	
	
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
	}
	
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