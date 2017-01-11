/*!
* jQuery custom datagrid plugin
*/
(function ($) {
   
	$.fn.customGrid = function(options){
		var gridSelector = $(this);
		var gridWrapper = $(gridSelector).parents("div:visible");
		
		var elementWrapper   = $(gridSelector).attr("id");
		var elementWrapperId = "#"+elementWrapper;
		var gridKeyDetails = baseFunctions.getGridValue(gridKeyConfig);
		var gridKey = $(elementWrapperId).attr("data-gridKey")?$(elementWrapperId).attr("data-gridKey"):gridKeyDetails.gridKey;
		var gridDispKey = $(elementWrapperId).attr("data-griddispkey")?$(elementWrapperId).attr("data-griddispkey"):gridKeyDetails.gridDispKey;
		
		listGridDetails = {"gridKey":gridKey,"gridDispKey":gridDispKey};
		
		var checkBox;
		var viewBox;
		var sortClass = "";
		var gridWidth = 0;
		var lastChecked = null;
		var gridExpandStart = 1;
		var rangetoggle = 0;
		var multiSortFlag = 0;
		var columnWidth = [];
		var checkboxIncr = 0;

		//Inline Edit 
		var inlineEditObj;
		var editableFieldObj = {};
		var inlineEditRequestObj = {};

		var defaults = $.extend({
			paginationUrl:SetWebApiURL+'json/page-details.json',
			sortUrl:SetWebApiURL+'json/apply-sorting.json',
			gridRecords: [],
			paging: true,
			recordOption:[25,50,100],
			recordPerPage:25,
			totalPages:0,
			totalRecords:0,
			currentPage:1,
			setNamespace :"baseGridActions"
		},options);
		
		var selectedNamespace = defaults.setNamespace;
		var methods = {
			json_parse: function(data){
				var obj = jQuery.parseJSON(data);
				return obj;
			},
			addCheckBox: function(rowId,recordIdString,recordCode,recordVersion,parentRecordCode){
				checkBox = $(action_row_checkbox);
				$(checkBox).find("input").attr({"data-row":rowId,"id":"box"+rowId+checkboxIncr,"data-row-string":recordIdString,"data-row-code":recordCode,"data-row-version":recordVersion,"data-row-parentRecordCode":parentRecordCode});
				$(checkBox).find("label").attr({"for":"box"+rowId+checkboxIncr});
				checkboxIncr++;
				return $(checkBox);
			},
			addViewBox: function(rowId,recordIdString,recordCode,recordVersion,parentRecordCode,ajaxReq){
				viewBox = $(action_column_view_icon);
				$(viewBox).find("a").attr({
					"data-rel":rowId,
					"id":"box"+rowId,
					"class" : "view-page",
					"data-screen":$(elementWrapperId).attr("data-screen"),
					"data-pageId":$(elementWrapperId).attr("data-pageId"),
					"data-row-code":recordCode,
					"data-row-version":recordVersion,
					"data-row-parentRecordCode":parentRecordCode,
					"data-ajaxReq":ajaxReq
				});
				return $(viewBox);
			},
			buildColumns : function(colModels){
				var tr = document.createElement('tr');
				inlineEditObj = {};
				// Checkbox for actions
				
				if(defaults.gridActions && defaults.gridActions.isApplyAction){
					 var checkAllWrapperId = elementWrapper+"-check-all";
				     var action_column_checkbox_wrapper = $(action_column_checkbox);
				     $(action_column_checkbox_wrapper).find(".css-checkbox-all").attr({"id":checkAllWrapperId});
				     $(action_column_checkbox_wrapper).find("[for='check-all']").attr({"for":checkAllWrapperId});
				     $(tr).append(action_column_checkbox_wrapper);
				     $(tr).find("#"+checkAllWrapperId).attr({"data-total-records" : defaults.totalRecords });
				}
				
				if(defaults.gridActions && defaults.gridActions.viewAction){
					if(defaults.gridActions.viewAction.isState == true){
						$(tr).append(action_column_view_header);
						baseGridActions.setViewForm(defaults.gridActions.viewAction,elementWrapperId);
					}
				}		
				
				// Column for Expand columns on Mobile device				
				$(tr).append(expand_th_column);
				
				for(var c=0;c < colModels.length;c++)
				{
					columnWidth.push(colModels[c].colWidth);
					var th = document.createElement('th');
					inlineEditObj[colModels[c].columnNo] = colModels[c];
					$(th).attr({
						"data-column-id"	 : colModels[c].columnNo, 
						"data-column-name"   : colModels[c].columnName,
						"default-sort-order" : colModels[c].sortOrder,
						"data-sorting" 		 : colModels[c].sorting,
						"width"              : colModels[c].colWidth,
						"data-link-type"	 : colModels[c].linkType,
						"aria-controls"      : elementWrapper
					});
					$(th).append(th_column_holder);
					
					$(th).width(colModels[c].colWidth);
					
					$(th).find(th_column_wrapper).text(i18NCall(colModels[c].columnNameKey));
					if(colModels[c].isSortable == true && colModels[c].sorting != "" && colModels[c].sorting != undefined){
						  $(th).attr({"class":"sorting"});
						  $(th).find(th_column_wrapper).append(sorting_element);
						  if(colModels[c].sorting.toLowerCase() == 'asc'){
							  $(th).find(sorting_element_wrapper).append($(asc_sortings_img));
					      
					      }else if(colModels[c].sorting.toLowerCase() == 'desc'){
					    	  $(th).find(sorting_element_wrapper).append(desc_sortings_img);
					      }else{
					    	  $(th).find(sorting_element_wrapper).append(null_sortings_img);
					      }
					      
					      if(colModels[c].sortOrder > 0){
						       $(th).find(sorting_element_wrapper).append(sorting_order);
						       $(th).find(sorting_order_wrapper).text(colModels[c].sortOrder);
					      }
					      else
					      {
					    	  $(th).find(sorting_element_wrapper).addClass("sorting");
					      }
					}
					$(tr).append(th);
				}
				
				$(elementWrapperId).find(table_thead_wrapper).append(tr);
			},
			buildRows : function(RowModels){
				if(defaults.totalRecords < 1){
					methods.noRecordsFound();
					return false;
				}
				var container =  "";
				$.each(RowModels, function (index, records) {
					var tr = document.createElement('tr');
					$(tr).attr({
								"role":"row",
								"class":"rowModels"
							});
					
					checkBox = methods.addCheckBox(records.recordId,records.rowId,records.recordCode,records.version,records.parentRecordCode);
					if(defaults.gridActions && defaults.gridActions.isApplyAction)
							$(tr).append(checkBox);
					
					if(defaults.gridActions && defaults.gridActions.viewAction){
						if(defaults.gridActions.viewAction.isState == true){
				    	   var ajaxReqState = '';
					       if(isSet(defaults.gridActions.viewAction.ajaxReq)){
					    	   ajaxReqState = defaults.gridActions.viewAction.ajaxReq;
					       }
					       viewBox = methods.addViewBox(records.recordId,records.rowId,records.recordCode,records.version,records.parentRecordCode,ajaxReqState);
					       $(tr).append(viewBox);
				      	}
				    }
					
					$(tr).append(expand_td_column);
					
					var recordData = records.record;
					for(var r=0;r<recordData.length;r++)
					{
						var td = document.createElement('td');
						var editableClass = "";
						
						//check field is editable or not
						if(inlineEditObj[recordData[r].columnNo].isEditable == true){
							editableClass = "is-editable";
						}
						$(td).attr({
							"data-column-no"	 : recordData[r].columnNo,
							"data-column-name"   : recordData[r].columnName,
							"data-row-id"        : records.recordId,
							"data-record-id"     : records.rowId,
							"class"				 : isSet(recordData[r].greyOut) && recordData[r].greyOut == "true" ?"grey-bg":undefined,
						}).find(".parent-row-data").attr({
							"data-column-no"	 : recordData[r].columnNo
						}).addClass(editableClass).find(".row-details").attr({
							"data-value"     	 : recordData[r].value,
						});
						var vals = (recordData[r].value != undefined)? recordData[r].value:"";
						var aURL = "";
						
						//get link type from column no
						var link_type = $(elementWrapperId).find("th[data-column-id='"+recordData[r].columnNo+"']").attr("data-link-type");
						if(link_type != undefined){
							if(recordData[r].link != undefined){
								aURL = recordData[r].link;
							}
							if(link_type == "link"){
								$(td).html('<a href="'+aURL+'" title="'+vals+'">'+vals+'</a>');
							}else if(link_type == "popUp"){
								aURL = "/"+pathValue+"/"+aURL+"&recordId="+records.recordId;
								var aClone = document.createElement("a"); 
								$(aClone).attr({
									"title" : vals,
									"onclick" : "baseGridActions.callGridPopupAjax(this.rel)",
									"rel" : aURL
								}).text(vals);
								$(td).html($(aClone).prop("outerHTML"));
							}else if(link_type == "subGrid"){
								aURL = "/"+pathValue+"/"+aURL+"&recordId="+records.recordId;
								var aClone = document.createElement("a"); 
								$(aClone).attr({
									"title" : vals,
									"onclick" : "baseGridActions.callSubGridAjax(this.rel)",
									"rel" : aURL
								}).text(vals);
								$(td).html($(aClone).prop("outerHTML"));
							}else if(link_type == "VIEW"){
						        aURL = aURL+"?recordId="+records.recordId;
						        var aClone = document.createElement("a"); 
						        $(aClone).attr({
							        "title" : vals,
							        "onclick" : "baseGridActions.callViewAjax(this.rel,this)",
							        "rel" : aURL,
							        "data-rel":records.recordId,
									"id":"box"+records.recordId,
									"class" : "view-page",
									"data-screen":$(elementWrapperId).attr("data-screen"),
									"data-pageId":$(elementWrapperId).attr("data-pageId"),
									"data-row-code":records.recordCode,
									"data-row-version":records.version,
									"data-row-parentRecordCode":records.parentRecordCode
						        }).html('<img class="image" src="img/icons/view.svg" width="16">');
						        $(td).html($(aClone).prop("outerHTML"));
						    }else if(link_type == "special"){
								var aClone = document.createElement("a"); 
								$(aClone).attr({
									"title" : vals,
									"class":"special-click",
									"rel" : aURL
								}).text(vals);
								$(td).html($(aClone).prop("outerHTML"));
							}
						}else{
							$(td).text(vals);
						}
												
						$(tr).append(td);
					}
					container += $(tr).prop("outerHTML");
				});
				$(elementWrapperId).find(table_tbody_wrapper).append(container);
			},
			noRecordsFound : function(){
				var tr = document.createElement('tr');
				$(tr).attr({
							"role":"row",
							"class":"rowModels"
						});
				var td = document.createElement('td');
				$(td).attr({
					"class"	  : "no-rows"
				});
				$(td).text(i18NCall('no.records.found'));
				$(tr).append(td);
				$(elementWrapperId).find(table_tbody_wrapper).append(tr);
			},
			buildPagination : function(pageData){
				if(!defaults.paging) return false;
				
				var pagination_html = '';
				var getPage = baseGridActions.generatePaginationOptions(defaults.totalPages,0,page_no_option,defaults.currentPage);
				var getPageRecords = baseGridActions.generatePaginationOptions(defaults.recordOption,1,page_records_option,defaults.recordPerPage);
				
				var optionClone = document.createElement("option");
				$(optionClone).attr({
					"value" : defaults.totalRecords,
					"selected": defaults.recordPerPage == defaults.totalRecords ? true : false 
				});
				$(optionClone).html(i18NCall('pagination.select.all.label'));
				$(getPageRecords).find("select").append(optionClone);
				$(getPageRecords).find("select").attr("data-size",defaults.recordOption.length);
				
				var mapObj = {
					   "@@pagination_option@@"		       : $(getPage).prop("outerHTML"),
					   "@@pagination_option_records@@"     : $(getPageRecords).prop("outerHTML"),
					   "##total_pages##"			       : defaults.totalPages,
					   "{{pagination.page}}"		  	   : i18NCall("pagination.page"),
					   "{{pagination.page_of}}"  	  	   : i18NCall("pagination.page_of"),
					   "{{pagination.page_view}}"          : i18NCall("pagination.page_view"),
					   "{{pagination.page_records}}"       : i18NCall("pagination.page_records"),
					   "{{pagination.page_records_found}}" : i18NCall("pagination.page_records_found"),
					   "##total_records##"			       : defaults.totalRecords
				};
				pagination_html = replaceWithObject(pagination_sections,grid_pagination_wrapper,mapObj);
				pagination_html = replaceWithObject(pagination_sections,pagination_html,mapObj);
				$(elementWrapperId).find(pagination_block_wrapper).append(pagination_html);
				$(pagination_block_wrapper).find('.selectpicker').selectpicker();

			},
			buildActions: function(){
				if(!defaults.gridActions) return false;
				selectedNamespace = "baseGridActions";
				window[selectedNamespace].getGridActions(defaults.gridActions,gridSelector,defaults.totalRecords,'',selectedNamespace);
			},                                                                                                                                                     
			applyActions:function(){
				methods.checkAllCheckBox();
				methods.pageAction();
				methods.expandAction();
				methods.sortAction();
				methods.resetSortAction();
			  /*methods.isEditableAction();
			    methods.removeInlineEdit();*/
			},
			pageAction:function () {
				var selected_page,selected_page_records;
				var ajaxData = [];
				$(elementWrapperId).find(page_action_wrapper).change(function(){
					selected_page 		  = $(this).parents(pagination_block_wrapper).find(page_no_selector).val();
					selected_page_records = $(this).parents(pagination_block_wrapper).find(page_records_selector).val();
					if(defaults.recordPerPage != selected_page_records || selected_page == '' || selected_page == undefined){
						selected_page = 1;
					}
					defaults.recordPerPage = selected_page_records;
					defaults.currentPage  = selected_page;
					var ajaxPaginationParams = {
							"ajaxURL" 			: defaults.paginationUrl,
							"pageNo"  			: selected_page,
							"recordsPerPage"	: selected_page_records,
							"currentPage"		: defaults.currentPage,
							"wrapperId"			: $(gridSelector).attr("id")
					};
					baseGridActions.getPageDetails(ajaxPaginationParams);
				});
				$(elementWrapperId).find(page_prev_wrapper).click(function(){
					
					 if(defaults.currentPage > 1) {
						defaults.currentPage = parseInt(defaults.currentPage) - 1;
						$(this).siblings(dropdown_selector).find("[name=page_no_options]").val(defaults.currentPage);
					    $(this).siblings(dropdown_selector).find("[name=page_no_options]").trigger('change');
					 }
				});
				$(elementWrapperId).find(page_next_wrapper).click(function(){
					 if(defaults.totalPages > defaults.currentPage) {
					    defaults.currentPage = parseInt(defaults.currentPage) + 1;
					    $(this).siblings(dropdown_selector).find("[name=page_no_options]").val(defaults.currentPage);
					    $(this).siblings(dropdown_selector).find("[name=page_no_options]").trigger('change');
					 }
				});
			},
			
			expandAction: function(){
				$(elementWrapperId).find("a.expand-data").click(function(){
					var grid_collapse_html = "";
					var grid_collapse_inner_html_local = "";
				    var grid_collapse_html_block = $(grid_collapse_block);
				    var grid_collapse_inner_html_local = ""; 
				    var parent_tr = $(this).parents("tr");
				    var next_tr   = parent_tr.next("tr.toggle-plus-div");
				    //$(elementWrapperId).find(".expand-data span").removeClass("set-minus").text("+");
					$(elementWrapperId).find(".expand-data span").removeClass("expand-arrow-down");
			    	$(elementWrapperId).find(".expand-data span").addClass("expand-arrow");
			        if(parent_tr.hasClass("expanded"))
				    {
				    	$(elementWrapperId).find(".table-grid tr.toggle-plus-div").not(next_tr).hide();
				    	parent_tr.next(".toggle-plus-div").toggle();
				    	if(parent_tr.next(".toggle-plus-div").is(":visible") == true){
				    		//$(this).find("span").addClass("set-minus").text("-");
				    		$(this).find("span").removeClass("expand-arrow");
					    	$(this).find("span").addClass("expand-arrow-down");
				    	}else{
				    		//$(this).find("span").removeClass("set-minus").text("+");
				    		$(this).find("span").removeClass("expand-arrow-down");
				    		$(this).find("span").addClass("expand-arrow");
				    	}
				    }
				    else
				    {
				    	$(elementWrapperId).find(".table-grid tr.toggle-plus-div").hide();
				    	parent_tr.find("td:gt("+gridExpandStart+")").each(function(){
				    		var editableClass = "";
							var grid_collapse_inner_html   = $(grid_collapse_inner);
							var firstColumnName =  $(elementWrapperId +" th[data-column-id="+$(this).data("column-no")+"]").find("span.table-title:first").clone().children().remove().end().text()
							var column_name 	= firstColumnName;
							grid_collapse_inner_html.find("label").text(column_name);
							grid_collapse_inner_html.find("span").html($(this).html());
							grid_collapse_inner_html_local += $(grid_collapse_inner_html).prop("outerHTML");
						});
					    grid_collapse_html = $(grid_collapse_html_block).html().replace("@@expandable_columns@@",grid_collapse_inner_html_local);   
					    $(grid_collapse_html_block).html(grid_collapse_html).insertAfter(parent_tr);
					    parent_tr.addClass("expanded");
					    //$(this).find("span").addClass("set-minus").text("-");
					    $(this).find("span").removeClass("expand-arrow");
					    $(this).find("span").addClass("expand-arrow-down");
				    }
				    $(elementWrapperId+" .toggle-plus-div td.addContent").attr("colspan",$(this).parents('.table-grid').find("th:visible").length);
					
				});
			},
			adjustGrid : function(){
				var gridWidth   = 0; 
				var scrollMaxWidth = (!getCookie("gridMaxWidth"))?900:getCookie("gridMaxWidth");
				//var scrollMaxWidth = 1120;
				var expandWidth = 50;
				var checkboxWidth = 50;
				var viewActionWidth = 50;
				var gridExpandStart = -1;
				var gridExpandLess = 0;
				var column_configuration = defaults.gridRecords.columnConfig.columnValueObjects;
				gridWidth += checkboxWidth;
				
				if(defaults.gridActions && defaults.gridActions.viewAction){
					if(defaults.gridActions.viewAction.isState == true){
						gridWidth += viewActionWidth;
						gridExpandStart++;
					}
				}
				
				gridWidth += ($(window).width() < scrollMaxWidth) ? expandWidth : 0;
				
				if(defaults.gridActions && defaults.gridActions.isApplyAction)
					gridExpandStart++;
				if($(window).width() < scrollMaxWidth)
					gridExpandStart++;
				
				for(var c=0;c < column_configuration.length;c++)
				{
					//column_configuration[c].colWidth = 200;
					gridWidth += column_configuration[c].colWidth;
					if(parseFloat(gridWidth) < $(gridWrapper).width())
					{
						gridExpandStart++;
					}
				}
				if($(window).width() > scrollMaxWidth)
				{
					$(elementWrapperId).find(table_tbody_wrapper+" tr").find("td").show();
					$(elementWrapperId).find(table_thead_wrapper+" tr").find("th").show();
					$(elementWrapperId).find(table_thead_wrapper+" tr").find("th.more-field-show").hide();	
					$(elementWrapperId).find(table_tbody_wrapper+" tr").find("td.more-field-show").hide();
					baseFunctions.generateScrollbar($(elementWrapperId).find(".table-record"),"yx");
				}
				else
				{
					if(parseFloat(gridWidth) > $(gridWrapper).width())
					{
						gridExpandLess = gridExpandStart+1; 
						$(elementWrapperId).find(table_tbody_wrapper+" tr").find("td:lt("+gridExpandLess+")").show();
						$(elementWrapperId).find(table_thead_wrapper+" tr").find("th:lt("+gridExpandLess+")").show();	
						$(elementWrapperId).find(table_tbody_wrapper+" tr").find("td:gt("+gridExpandStart+")").hide();
						$(elementWrapperId).find(table_thead_wrapper+" tr").find("th:gt("+gridExpandStart+")").hide();
						$(elementWrapperId).find(table_thead_wrapper+" tr").find("th.more-field-show").show();	
						$(elementWrapperId).find(table_tbody_wrapper+" tr").find("td.more-field-show").show();
					}
					else
					{
						$(elementWrapperId).find(table_thead_wrapper+" tr").find("th.more-field-show").hide();	
						$(elementWrapperId).find(table_tbody_wrapper+" tr").find("td.more-field-show").hide();
					}
					$(elementWrapperId).find(".table-record").jScrollPane().data().jsp.destroy();
					
				}
				
				$(elementWrapperId).find(".toggle-plus-div").hide();
				//$(elementWrapperId).find(".expand-data span").removeClass("set-minus").text("+");
				//$(elementWrapperId).find(".expand-data span").removeClass("expand-arrow");
				$(elementWrapperId).find(".expand-data span").removeClass("expand-arrow-down");
		    	$(elementWrapperId).find(".expand-data span").addClass("expand-arrow");
		    	$(elementWrapperId).find(".toggle-plus-div td.addContent").attr("colspan",$("th:visible").length);

				if($(window).width() <= 568 && multiSortFlag == 0){
					multiSortFlag = 1;
					if($(elementWrapperId).find(".grid-action-group a.sort").hasClass("active")){
						$(elementWrapperId).find(".grid-action-group a.sort").trigger("click");
					}
				}
				if($(window).width() > 568){
					multiSortFlag = 0;
				}
				if($(window).width() <= 568){
					basePanel.mobileScreenIcons();
				}
				
					 var total_width = 0;
					 $(elementWrapperId).find("th:visible").each(function(){
					      if($(elementWrapperId).width() > total_width){
					    	  total_width += $(this).attr("width") ? parseInt($(this).attr("width")) : 0;
					      } 
				     });
				     var lastWidth = $(elementWrapperId).find("th:last:visible").width();
				     var finalLastWidth = $(elementWrapperId).width() - total_width;  
				     if(parseFloat(gridWidth) < $(elementWrapperId).width())
				     {
				    	 var gridWrapperWidth = $(elementWrapperId).width();
				    	 var countWidth = 100;
				    	 if(!$.isEmptyObject(columnWidth)){
				    		 for(var w=0; w<columnWidth.length; w++){
					    		 countWidth += columnWidth[w];
					    		 if(w == (columnWidth.length - 1)){
					    			 if(countWidth < gridWrapperWidth){
						    			 var lastWidth = (gridWrapperWidth - countWidth);
						    			 $(elementWrapperId).find("th:last:visible").width((columnWidth[w]+(lastWidth-50)));
						    		 }
					    		 }
					    	 }
					     }
				    	 $(elementWrapperId).find(".jspContainer").height($(elementWrapperId).find(".table-grid").height()+12);
				     } 
					 if(defaults.totalRecords < 1){
					     $(elementWrapperId).find("td.no-rows").attr({
					    	 "colspan" : $(elementWrapperId).find("th:visible").length
					     });
					 }
			},
			resizeGrid : function(){
				 $(window).resize(function(){
					methods.adjustGrid();
				 });
			},
			sortAction : function(){
				
				$(elementWrapperId).find(sorting_wrapper).click(function(){
					var this_th = $(this);
					var sortOrder_data  = $(this).attr("data-sorting");
					var column_name 	= $(this).attr("data-column-name");
					
					//var gridName  = $(this).attr("data-gridName");
					//var gridKey  = $(this).attr("data-gridKey");
					
					var newSortOrder;
					
					if(sortOrder_data.toLowerCase() == "null"){
						newSortOrder = "ASC";
					}
					else if(sortOrder_data.toLowerCase() == "asc"){
						newSortOrder = "DESC";
					}
					else if(sortOrder_data.toLowerCase() == "desc"){
						newSortOrder = "ASC";
					}
					$(this).attr("data-sorting",newSortOrder);
				 
					// This is for single column sorting
					if(!$(elementWrapperId).find(".grid-action-group a.multisort-action").hasClass("active"))
						$(elementWrapperId).find("th[data-column-name !="+column_name+"]").attr("data-sorting","Null");
					
					var multiSortObj = [];
					var multiSortNo = 0;
					if($(elementWrapperId).find(".grid-action-group a.multisort-action").hasClass("active"))
					{	
						$(elementWrapperId).find("th.sorting").not("th[data-column-name='"+column_name+"']").each(function(){
							var mSortColumnName    = $(this).data("column-name");
							var mSortNo   		   = $(this).find(".sorting-order").text();
							var mSortColumnOrder  =  isSet($(this).attr("data-sorting")) ? $(this).attr("data-sorting") : "Null";
							
							mSortNo            = mSortNo != '' ? parseInt(mSortNo): '';
								
							var mSortColumn = {"colName":mSortColumnName, "order":mSortColumnOrder,"sortNo":mSortNo };
							multiSortObj.push(mSortColumn);
							
							if(mSortNo != "" && mSortNo > multiSortNo)
							{
								multiSortNo = mSortNo;
							}
						});
					}
					multiSortNo++;
					var mSortNo  = $("th[data-column-name='"+column_name+"']").find(".sorting-order").text();
					if(mSortNo != ''  &&  $(elementWrapperId).find(".grid-action-group a.multisort-action").hasClass("active"))
					{
						multiSortNo = mSortNo; 
					}
					
					multiSortObj.push({"colName":column_name,"order":newSortOrder,"sortNo":multiSortNo});
					var ajaxObject = {
							"ajaxURL" : SetWebApiURL+'json/apply-sorting.json',
							"params" : {"pageId":current_moduleId, "sortColumns" : JSON.stringify(multiSortObj),"gridKey":gridKey,"gridName":gridDispKey},
							"successCallback" : window[selectedNamespace]["generateGridSuccess"],
							"failureCallback" : generateFailure,
							"wrapperId" : elementWrapper,
							"loader" : true,
							"loaderWrapper" : elementWrapperId
					};
					// Call Sorting API & Regenerate GRID
					ajaxCallBack(ajaxObject);
					
				});	
			},
			resetSortAction : function(){
				$(elementWrapperId).find(".grid-action-group a.multisort-action").unbind("click");
				$(elementWrapperId).find(".grid-action-group a.multisort-action").on("click",function(){
					 	$(this).toggleClass("active");
						if(!$(this).hasClass("active")){
						 var column_name = $(elementWrapperId).find("th.sorting[default-sort-order = 1]").attr("data-column-name");
						 var sortOrder_data  = $(elementWrapperId).find("th.sorting[default-sort-order = 1]").attr("data-sorting");
						 newSortOrder = "";
						 if(isSet(sortOrder_data)){
						 	if(sortOrder_data.toLowerCase() == "null"){
								newSortOrder = "ASC";
							}
							else if(sortOrder_data.toLowerCase() == "asc"){
								newSortOrder = "DESC";
							}
							else if(sortOrder_data.toLowerCase() == "desc"){
								newSortOrder = "ASC";
							}
						 }
						var multiSortObj = [];
						var multiSortNo = 0;
						var mSortNo  = $(elementWrapperId).find("th.sorting[default-sort-order = 1]").find(".sorting-order").text();
						if(mSortNo != '')
						{
							multiSortNo = mSortNo; 
						}
						 multiSortObj.push({"colName":column_name,"order":newSortOrder,"sortNo":multiSortNo});
						 var ajaxObject = {
									"ajaxURL" : SetWebApiURL+'json/apply-sorting.json',
									"params" : {"pageId":current_moduleId, "sortColumns" : JSON.stringify(multiSortObj),"gridKey":gridKey,"gridName":gridDispKey},
									"successCallback" : window[selectedNamespace]["generateGridSuccess"],
									"failureCallback" : generateFailure,
									"wrapperId" : elementWrapper,
									"loader" : true,
									"loaderWrapper" : elementWrapperId
							};
							// Call Sorting API & Regenerate GRID
							ajaxCallBack(ajaxObject);
					}
				 });
			},
			 checkAllCheckBox : function(){
					
				    $(elementWrapperId).find(".pages-info").append(selected_records_block); 
				    if(defaults.totalRecords == 0){
				    	$(elementWrapperId).find(checkbox_all_wrapper).prop("disabled",true);
				    }
				    // Check all checkbox on single click
				    if(defaults.totalRecords > 0){
					    $(elementWrapperId).find(checkbox_all_wrapper).click(function(){
					       
					        	$(elementWrapperId).find(checkbox_rowmodel_wrapper).prop( "checked", $(this).prop("checked") );
					        	if($(this).prop("checked") == false){
					        		$(elementWrapperId).find(checkbox_rowmodel_wrapper).parents(".rowModels").removeClass("check-row");
					        	}else{
					        		$(elementWrapperId).find(checkbox_rowmodel_wrapper).parents(".rowModels").addClass("check-row");
					        	}
					       
					    });
						
						// Remove global checkbox selection on any checkbox unchecked
						$(elementWrapperId).find(checkbox_single_wrapper).click(function(){
							if($(this).prop("checked") == false){
								$(this).parents(".rowModels").removeClass("check-row");
								$(elementWrapperId).find(checkbox_all_wrapper).removeAttr("checked");
							}else{
								$(this).parents(".rowModels").addClass("check-row");
							}
							 if($(elementWrapperId).find(checkbox_rowmodel_wrapper).not(":checked").length == 0)
						     {
						      $(elementWrapperId).find(checkbox_all_wrapper).prop("checked", true);
						     }
							 if($(elementWrapperId).find(checkbox_rowmodel_checked_wrapper).length != 0){
								 
								 $(elementWrapperId).find(".page-selected-records").removeClass("hidden");
							     $(elementWrapperId).find(".page-selected-records").html(i18NCall('pagination.total_selected_records')+': <span class="strong">'+$(elementWrapperId).find(checkbox_rowmodel_checked_wrapper).length+'</span> ');
							 }
							 else
							 {
								 $(elementWrapperId).find(".page-selected-records").addClass("hidden");
							 }
						});
				    }
				},  
			generateAddOnParams: function(colModels){
				if(isSet(colModels.addonParamsDto)){
					 var tagTypes = colModels.addonParamsDto.tagTypes;
					    $(elementWrapperId).find(pagination_block_wrapper).append(grid_addon_tagTypes);
					    $(grid_addon_tagTypes_wrapper).attr("value",tagTypes);
				}
			},
			
			isEditableAction: function (){
				var switchInc = 0;
				$(document).delegate(elementWrapperId+" .is-editable","click",function(){
					var columnNo = $(this).attr("data-column-no");
					var inputValue = $(this).find(".row-details").attr("data-value");
					var inputType = inlineEditObj[columnNo].inputType;
					var validation = inlineEditObj[columnNo].validation;
					var inputId = inlineEditObj[columnNo].columnName+"-"+switchInc;
					var dateFormat = inlineEditObj[columnNo].dateFormat;
					var isDateRange = inlineEditObj[columnNo].isDateRange;
					$(this).find(".row-details").hide();
					if($(this).find(selector_p_r_5).length == 0){
						switch(inputType){
							case "text" :
								inputHTML = $(ele_input).appendTo($(this));
								var inputFormat = inlineEditObj[columnNo].format;
								switch(inputFormat){
									case "date" : 
										
										var newDate = moment(new Date()).format("DD/MM/YYYY");
										inputValue = inputValue == ""?undefined:inputValue;
										inputValue = moment(inputValue,[dateFormat]).format("DD/MM/YYYY");
										var dateValue = getValidFormat(inputValue,"DD/MM/YYYY",dateFormat,isDateRange);
										inputHTML.find(selector_input).attr({
											"data-format" : inlineEditObj[columnNo].dateFormat,
											"minDate" : inlineEditObj[columnNo].minDate,
											"maxDate" : inlineEditObj[columnNo].maxDate,
											"id" : inputId,
											"format" : inputFormat,
											"value" : dateValue
										});
										var addParams = {
												"singlePicker" : (inlineEditObj[columnNo].isDateRange == true)?false:true,
						 				};
										datePicker("#"+inputId,addParams);
										$("#"+inputId).trigger("focus");
										break;
									case "datetime" : 
										
										var newDate = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
										inputValue = inputValue == ""?undefined:inputValue;
										inputValue = moment(inputValue,[dateFormat]).format("DD/MM/YYYY HH:mm:ss");
										var dateValue = getValidFormat(inputValue,"DD/MM/YYYY HH:mm:ss",dateFormat,isDateRange);
										
											inputHTML.find(selector_input).attr({
												"data-format" : inlineEditObj[columnNo].dateFormat,
												"minDate" : inlineEditObj[columnNo].minDate,
												"maxDate" : inlineEditObj[columnNo].maxDate,
												"id" : inputId,
												"format" : inputFormat,
												"value" : dateValue
											});
											var addParams = {
													"singlePicker" : (inlineEditObj[columnNo].isDateRange == true)?false:true,
													"timePicker" : true,
													"timePickerSeconds" : true,
													"timePicker24H" : true
							 				};
											datePicker("#"+inputId,addParams);
											$("#"+inputId).trigger("focus");
										break;
										default : 
											inputHTML.find(selector_input).attr({
												"value" : inputValue
											}).trigger("focus");
											break;
								}
								inputHTML.find(selector_input).attr({
									"type" : inputType,
									"data-type" : inputType,
									"tabIndex" : columnNo,
									"autocomplete" : "off",
									"name" : inlineEditObj[columnNo].columnName,
									"data-validate" : (!isEmpty(validation))?validation:undefined
								});
								break;
							case "textarea" : 
								inputHTML = $(ele_textarea).appendTo($(this));
								inputHTML.find(selector_textarea).attr({
									"type" : inputType,
									"data-type" : inputType,
									"tabIndex" : columnNo,
									"name" : inlineEditObj[columnNo].columnName,
									"data-validate" : (!isEmpty(validation))?validation:undefined
								}).text($(this).find(".row-details").attr("data-value")).trigger("focus");
								break;
							case "dropdown" :
								var optionClone;
								dropdownHTML 		= $(ele_dropdown).appendTo($(this));
								var possibleValue 	= inlineEditObj[columnNo].possibleValues;
								possibleValue 		= sortString(possibleValue,"labelKey",0);
								dropdownHTML.find("select").attr({
									"tabIndex" : columnNo,
									"data-type" : "select-one",
									"name" : inlineEditObj[columnNo].columnName,
									"data-validate" : (!isEmpty(validation))?validation:undefined,
									"id" : inputId,
								});
								for(var i = 0; i < possibleValue.length; i++){
									optionClone = document.createElement("option");
									selectedValue = (possibleValue[i].labelKey ==  $(this).find(".row-details").attr("data-value"))?true:false;
									$(optionClone).attr({
										"value" : possibleValue[i].value,
										"selected" : selectedValue,
									});
									$(optionClone).html(possibleValue[i].labelKey);
									dropdownHTML.find("select").append(optionClone);
									dropdownHTML.find(selector_dropdown_list).attr({
										"data-name"    	: inlineEditObj[columnNo].columnName
									});
								}
								$(dropdownHTML).find('.selectpicker').selectpicker();
								setTimeout(function(){
									$(dropdownHTML).find("[data-id='"+inputId+"']").trigger("click");	
								},1);
								break;
						}
					}else{
						$(this).find(selector_p_r_5).show();
						$(this).find(selector_p_r_5).find(":input").trigger("focus");
						setTimeout(function(){
							$(this).find(selector_p_r_5).find("[data-id='"+inputId+"']").trigger("click");	
						},1);
					}
					switchInc++;
				});
			},
			removeInlineEdit: function(){
				$(document).delegate(elementWrapperId+" :input:not(:button)","change",function(){
					var parentTr  =  $(this).parents(".rowModels");
					var getDataRow = parentTr.find(".css-checkbox").data("row");
					editableFieldObj = {};
					var inputAttrName  = $(this).attr("name");
					var inputAttrValue = $(this).val();
					if($(this).data("type") == "select-one"){
						inputAttrValue = $(this).find(":selected").text();
					}
					editableFieldObj[inputAttrName] = inputAttrValue;
				
					if(inlineEditRequestObj[getDataRow] == undefined) {
						inlineEditRequestObj[getDataRow] = editableFieldObj;
					}
					else{
						inlineEditRequestObj[getDataRow][inputAttrName] = inputAttrValue;
					}
					
					var parentVar =  $(this).parents(".parent-row-data");
					
					var checkedEdited = 0;
					$(parentTr).find(".parent-row-data :input:not(:button)").each(function(){
						var editedvalue = $(this).val();
						if($(this).data("type") == "select-one"){
							editedvalue = $(this).find(":selected").text();
						}
						if(editedvalue != $(this).parents(selector_p_r_5).siblings(".row-details").attr("data-value")){
							checkedEdited = 1;
						}
					});
					
					parentVar.removeClass("highlight-row");
					var value = $(this).val();
					if(parentVar.find("select").data("type") == "select-one"){
						value = parentVar.find("select :selected").text();
					}
					if(isEmpty(value) ||  value == parentVar.find(".row-details").attr("data-value")){
						parentVar.find(".row-details").show();
						parentVar.find(selector_p_r_5).remove();
					}else{
						$(this).attr("value",value);
						parentVar.addClass("highlight-row");
					}
					if(checkedEdited == 0){
						parentTr.removeClass("check-row");
						parentTr.find(".css-checkbox").prop("checked",false);
					}else{
						parentTr.addClass("check-row");
						parentTr.find(".css-checkbox").prop("checked",true);
					}
				});
				$(document).delegate(elementWrapperId+" .parent-row-data","mouseleave",function(){
					var parentVar =  $(this);
					var value = $(this).find(":input").val();
					if(parentVar.find("select").data("type") == "select-one"){
						value = parentVar.find("select :selected").text();
					}
					if(isEmpty(value) || value == parentVar.find(".row-details").attr("data-value")){
						parentVar.find(".row-details").show();
						parentVar.find(selector_p_r_5).remove();
					}
				});
			},
			loadDefaults: function(data){
				// Load defaults for pagination
				defaults.totalRecords  = data.pageConfig.totalRecords;
				defaults.totalPages    = data.pageConfig.totalPages;
				defaults.recordPerPage = data.pageConfig.recordsPerPage;
				defaults.currentPage   = data.pageConfig.currentPageNo;
				defaults.paging   	   = data.pageConfig.showPagination ? data.pageConfig.showPagination : defaults.paging;
				
				// Load defaults for grid actions
				defaults.gridActions   = data.gridActions ? data.gridActions : false;
				
				// Load default HTML
				$(gridSelector).html("");
				$(gridSelector).append(pagination_block);
				$(gridSelector).append(grid_block);
				$(gridSelector).find(grid_block_wrapper).append(table_grid);
				$(gridSelector).append(pagination_bottom_block);
			},
			
			generateGrid: function(data){
				methods.loadDefaults(data);
				methods.buildPagination();
				methods.buildColumns(data.columnConfig.columnValueObjects);
				methods.buildRows(data.rowConfig);
				methods.buildActions();
				methods.applyActions();
				methods.adjustGrid();
				methods.resizeGrid();
				methods.generateAddOnParams(data.columnConfig);
			},
			init : function(){
				methods.generateGrid(defaults.gridRecords);
			}
		};
		return methods.init();
	};
})(jQuery);