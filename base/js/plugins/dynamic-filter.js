(function($) {

    // jQuery plugin definition
    $.fn.dfilters = function(options) {
	    var self = $(this);
	    
        var defaults = $.extend({
            context: 'filter',
            titleKey: 'filter_label_title',
            filterWrapper: '',
            gridContext: '',
            preSavedFilters: true,
            filterObject: {},
            gridConfig: [],
            setNamespace :"baseGridActions",
            applyFilterUrl: SetWebApiURL+"json/apply-filter-search.json",
    	    resetFilterUrl: SetWebApiURL+"json/reset-filter.json",
    	    createFilterUrl: SetWebApiURL+"json/create-filter.json",
    	    updateFilterUrl: SetWebApiURL+"json/update-filter.json",
    	    deleteFilterUrl: SetWebApiURL+"json/delete-filter.json",
    	    presavedFiltersUrl: SetWebApiURL+"json/presaved-filters.json",
    	    filterDetailsUrl: SetWebApiURL+"json/filter-details.json",
    	    autoCompleteValuesUrl: SetWebApiURL+"json/auto-complete-values.json",
    	    
            // if your plugin is event-driven, you may provide callback capabilities
            // for its events. execute these functions before or after events of your 
            // plugin, so that users may customize those particular events without 
            // changing the plugin's code
            callBack: function() {}
        }, options);
        
        var applyFilterUrl 			= defaults.applyFilterUrl;
	    var resetFilterUrl 			= defaults.resetFilterUrl;
	    var createFilterUrl 		= defaults.createFilterUrl;
	    var updateFilterUrl			= defaults.updateFilterUrl;
	    var deleteFilterUrl 		= defaults.deleteFilterUrl;
	    var presavedFiltersUrl  	= defaults.presavedFiltersUrl;
	    var filterDetailsUrl 		= defaults.filterDetailsUrl;
	    var autoCompleteValuesUrl 	= defaults.autoCompleteValuesUrl;
	    var setNamespace = defaults.setNamespace;
        
        var filterWrapper = defaults.filterWrapper != '' ? defaults.filterWrapper : $(this).attr("id");
        
        plugin = this;
      
        plugin.init = function() {
            if (isEmpty(defaults.filterObject)) return false;
            var filter_config = defaults.filterObject;
            __filterForm(filter_config);
            
        }
        __filterAction = function() {
        	 __applyFilter();
             __searchedCriteria();
             __filterAutoSuggest();
             __createFilter();
             __saveFilter();
             __deleteFilter();
             __allowDateRange();
             __trimInValue();
             __setDefaultFilter();
         	 $(self).find(".reset-filter").on("click",function(){
         		__resetFilterRow(this);
         		$(filtered_criteria_text).html("")
         	 });
        }

        var __filterForm = function(filter_config) {
        	
            // Append Filter Block into HTML
            var presaved_filter_local = $(filter_presaved_block);
            $(self).find(filter_presaved_wrapper).html($(presaved_filter_local).prop("outerHTML"));
            $(self).find(filter_label_wrapper).text(i18NCall(filter_config.titleKey));
            
            // Load Presaved Filters
            if (defaults.preSavedFilters == true) {
                __preSavedFilters();
            } 
            
            // generate filter form
            __generateFilterForm(filter_config);
            
            // generate filter buttons
            __filterButtons();
            
            __filterAction();
        }
        
        var __preSavedFilters = function() {
            var ajaxObjectFilter = {
                "ajaxURL": presavedFiltersUrl,
                "params": {
                    "pageId": current_moduleId,
                    "gridKey": defaults.gridConfig.gridKey
                },
                "aSync": false,
                "successCallback": function(data) {                	
                    // call ajax for presaved filters 
                    var presaved_filters_json = data;
                    var presaved_filters = presaved_filters_json.returnObject;

                    // generate & Replace dropdown for filters
                    var presaved_filter_dropdown = __generatePresavedOptions(presaved_filters.presavedFilters);
                    $(self).find(filter_dropdown_wrapper).html($(presaved_filter_dropdown).prop("outerHTML"));
                    __preSavedFiltersAction();
                    // return if there is no filter available
                    if (presaved_filters.presavedFilters.length == 0) {
                        $(self).find(".presaved-filters select").prop('disabled', true).selectpicker('refresh');
                    }
                },
                "failureCallback": function() {}
            };
            // Call Sorting API & Regenerate GRID
            ajaxCallBack(ajaxObjectFilter);
        }

        var __generatePresavedOptions = function(filter_columns) {
            var dropdownHTML = $(filter_dropdown);
            var optionClone;
            var optionValue;
            var optionId;
            var optionLoop;
            var selectedValue;
            var currentOptionId = "";
            optionLoop = filter_columns.length;
            dropdownHTML.find("select").attr({
                "title": i18NCall('select_filter_title')
            });

            filter_columns = sortString(filter_columns, "filterTitle", 0);

            for (var i = 0; i < optionLoop; i++) {
                selectedValue = false;
                optionValue = filter_columns[i].filterTitle;
                optionId = filter_columns[i].filterId;
                if (filter_columns[i].isSelected == true) {
                    selectedValue = true;
                    currentOptionId = optionId;
                }

                optionClone = document.createElement("option");
                $(optionClone).attr({
                    "value": optionId,
                    "selected": selectedValue
                });
                $(optionClone).html(optionValue);
                dropdownHTML.find("select").append(optionClone);
            }
            dropdownHTML.find("select").attr({
                "name": "presaved_filter"
            });
            __preSavedFiltersActionOnLoad();
            return dropdownHTML;
        }

        /* pre saved filter actions */
        var __preSavedFiltersAction = function() {
                $(filter_dropdown_wrapper).find("select").on("change", function() {
                    var liValue = $(this).val();
                    if (liValue != 0) {
                        $(self).find("button[data-onfilter=show]").removeClass("hidden");
                        $(self).find("button[data-onaddmore=show]").addClass("hidden");
                        var ajaxObjectFilter = {
                            "ajaxURL": SetWebApiURL+"json/filter-details-update.json",//filterDetailsUrl,
                            "params": {
                                "filterId": liValue,
                                "pageId": current_moduleId,
                                "gridKey": defaults.gridConfig.gridKey
                            },
                            "successCallback": function(filterDetails) {
                                var filter_config = filterDetails.returnObject;
                                if (filter_config) __generateFilterForm(filter_config);
                            },
                            "aSync": false,
                            "failureCallback": function() {}
                        };
                        // Call Sorting API & Regenerate GRID
                        ajaxCallBack(ajaxObjectFilter);
                    }
                });
        }

        /* pre saved filter actions */
        var __preSavedFiltersActionOnLoad = function() {
            setTimeout(function() {
            	var filterWrapperId = "#"+filterWrapper;
                var liValue = $(filter_dropdown_wrapper).find("select").val();
                liValue = liValue == "" || liValue == null ? 0 : liValue;
                if (liValue != 0) {
                    $(filterWrapperId).find("button[data-onfilter=show]").removeClass("hidden");
                    $(filterWrapperId).find("button[data-onaddmore=show]").addClass("hidden");
                }
                var ajaxObjectFilter = {
                    "ajaxURL": filterDetailsUrl,
                    "params": {
                        "filterId": liValue,
                        "pageId": current_moduleId,
                        "gridKey": defaults.gridConfig.gridKey
                    },
                    "successCallback": function(filterDetails) {
                        var filter_config = filterDetails.returnObject;
                        if (filter_config) __generateFilterForm(filter_config);
                    },
                    "aSync": false,
                    "failureCallback": function() {}
                };
                // Call Sorting API & Regenerate GRID
                ajaxCallBack(ajaxObjectFilter);
            }, 200);
        }

        /* generate filter form */
        var __generateFilterForm = function(filter_config) {
            var filter_columns = filter_config.columnValueObjects;
            var filter_elements_block_html = '';
            for (var i = 0; i < filter_columns.length; i++) {
                if (filter_columns[i].isShow == true)
                    filter_elements_block_html += __addFilterColumn(filter_columns, i);
            }

            $(self).find(filter_elements_wrapper).html(filter_elements_block_html);

            var filter_addmore_block_local = $(filter_addmore_block);

            filter_addmore_block_local.find(filter_elements_label).text(i18NCall('add_more_field_title'));

            var addmore_dropdown = __generateAddmoreOptions(filter_columns);

            filter_addmore_block_local.find(filter_addoption_wrapper).html($(addmore_dropdown).prop("outerHTML"));

            var filter_addmore_block_html = $(filter_addmore_block_local).prop("outerHTML");
            $(self).find(filter_addmore_wrapper).html(filter_addmore_block_html);
            $(self).find(".selectpicker").selectpicker();
            __filter_addmore_action(filter_columns);
            if ($(filter_presaved_wrapper).find("select[name=presaved_filter]").val() == 0) {
                if ($(self).find(filter_elements_wrapper).find(filter_element_wrapper).length > 0) {
                    $(self).find("button[data-onaddmore=show]").removeClass("hidden");
                }
            }
        }

        var __filterButtons = function() {
            var additional_btn = "";
            if (defaults.preSavedFilters == true) {
                additional_btn += apply_filter_button;

                var create_btn = $(btn_normal).attr({
                    "type": "button",
                    "data-onaddmore": "show"
                }).addClass("create-filter").text(i18NCall('create_button_title'));

                $(create_btn).addClass("hidden hidden-btn");
                additional_btn += $(create_btn).prop("outerHTML");

                var save_btn = $(btn_normal).attr({
                    "type": "button",
                    "data-onfilter": "show"
                }).addClass("save-filter").text(i18NCall('update_button_title'));
                $(save_btn).addClass("hidden hidden-btn");
                additional_btn += $(save_btn).prop("outerHTML");

                var delete_btn = $(btn_normal).attr({
                    "type": "button",
                    "data-onfilter": "show"
                }).addClass("delete-filter").text(i18NCall('delete_button_title'));
                $(delete_btn).addClass("hidden hidden-btn");
                additional_btn += $(delete_btn).prop("outerHTML");
            }
            var reset_btn = $(btn_normal).attr({
                "type": "reset",
                "class": "uie-btn uie-secondary-btn"
            }).addClass("reset-filter").text(i18NCall('reset_label_title'));

            additional_btn += $(reset_btn).prop("outerHTML");
            $(self).find(filter_submit_wrapper).append(additional_btn);
           
        }

        /* submit filter records */
        var __applyFilter = function() {
        	
        	
            var form_wrapper = $(self).find(".filter-form");
            var formId = "#" + $(self).find(".filter-form").attr("id");
           
            $(formId).unbind("submit");
            $(formId).submit(function(e) {
                e.preventDefault();
                if ($(self).find(filter_elements_wrapper).find(filter_element_wrapper).length > 0) {
                    var col = [];
                    var item = [];
                    var isValidDate = true;
                    var validFormat = "";
                    if (__validateFilterValues(formId) == 1) {
                        $(form_wrapper).find(filter_element_wrapper).each(function() {
                        	var value = getReturnValue(form_wrapper, $(this).find(filter_elements_input + " :input").not(":button"));
                            var format = $(this).find(filter_elements_input + " :input").attr("format");
                            var currFormat = $(this).find(filter_elements_input + " :input").data("format");
                            var dateRange = $(this).find(filter_elements_operators + " select").val();
                            var formatCompute = baseFunctions.formatComputation(format, dateRange, value, currFormat);
                            var checkCode = $(this).find(filter_elements_input + " :input").not(":button").data("checkcode");
                            if (formatCompute === false) isValidDate = false;

                            validFormat = currFormat;
                            
                            var fc = $(this).find(filter_elements_input + " :input:not(:button)").attr("name");
                            var fo = $(this).find(filter_elements_operators + " select").val();
                            var fv = formatCompute;
                            var fs = $(this).find(filter_state_wrapper + " input[type='radio']:checked").val();
                            var fcc = (checkCode != undefined) ? checkCode : "";
                            item = {
                                filterColumnName: fc,
                                filterOperator: fo,
                                filterValue: fv,
                                filterStatus: fs,
                                checkCode: fcc
                            };
                            col.push(item);
                        });
                       
                        if (isValidDate) {
                            var myString = JSON.stringify(col);
                            var presaved_filter_value = ($(filter_presaved_wrapper).find("select[name=presaved_filter]").val() == undefined) ? 0 : $(filter_presaved_wrapper).find("select[name=presaved_filter]").val();
                            var ajaxObject = {
                                "ajaxURL": applyFilterUrl,
                                "params": {
                                    "filterCriteria": myString,
                                    "pageId": current_moduleId,
                                    "filterId": presaved_filter_value,
                                    "gridKey" : defaults.gridConfig.gridKey,
                                    "gridName" : defaults.gridConfig.gridDispKey
                                },
                                "successCallback": window[setNamespace]["generateGridSuccess"],
                                "failureCallback": function() {},
                                "wrapperId":defaults.gridContext, //panel_grid_content_id,
                                "loader": true,
                                "loaderWrapper": "#"+defaults.gridContext //+panel_grid_wrapper
                            };
                            ajaxCallBack(ajaxObject);
                        } else {
                            var message = {
                                "message": 'validate.select.date.message',
                                "params": new Array(validFormat)
                            };
                            generateMsg(1, message, global_message_wrapper);
                        }
                    } else {
                        if (__validateFilterValues(formId) == 0) {
                            generateMsg(1, "validate.filter.value.message", global_message_wrapper);
                        } else {
                            generateMsg(1, "validate.atleast.one.filter.on", global_message_wrapper);
                        }

                    }
                } else {
                    generateMsg(1, "apply_filter_error", global_message_wrapper);
                }
                return false;
            });
        }

        var __searchedCriteria = function() {
        	$(filter_searched_criteria_bloack).insertAfter($(self));
        	$(filtered_criteria_wrapper).hide();
        	$(self).find(".accordion-header").click(function() {
                if($(self).find(".accordion-panel").hasClass("active")){
                	$(self).siblings(filtered_criteria_wrapper).hide();
                }else{
                	if(!isSet($(".searched-criteria-text").html()) || isEmpty($(".searched-criteria-text").html())){
                		return false;
                	}
                	$(self).siblings(filtered_criteria_wrapper).show();
                }
                return false;
            });
        }

        var __filterAutoSuggest = function() {
        	var filterWrapperId = "#"+filterWrapper;
        	  var searchValue = $(filterWrapperId+" .filter-searchvalue").find("[type=text][data-suggestion=true]");
              __getAutoSuggest(searchValue);
              
            $(document).delegate(filterWrapperId+" .filter-operators select", "change", function() {
                var searchValue = $(this).parents(".filter-operators").siblings(".filter-searchvalue").find("[data-suggestion=true]");
                __getAutoSuggest(searchValue);
            });
        }

        /* function for apply auto suggestion */
        var __getAutoSuggest = function(typehead_element) {
            $(self).find(".filter-element .typeahead").remove();
            typehead_element.typeahead('destroy');
            var fc = typehead_element.attr("name");
            var auto = typehead_element.attr("data-suggestion");
            var fo = "LIKE";
            var operator_selected = typehead_element.parents(".filter-searchvalue").siblings(".filter-operators").find("select").val();
            if(auto == "true"){
            typehead_element.typeahead({
            	displayField: "value",
                valueField: "key",
                scrollBar: true,
                matcher: function(item) {
                    var tquery = extractor(this.query);
                    if (!tquery) return false;
                    return ~item.toLowerCase().indexOf(tquery.toLowerCase())
                },
                highlighter: function(item) {

                    var query = extractor(this.query).replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
                    return item.replace(new RegExp('(' + query + ')', 'ig'), function($1, match) {
                        return '<strong>' + match + '</strong>'
                    })
                },
                ajax: {
                    url: autoCompleteValuesUrl,
                    method: "POST",
                    triggerLength: 2,
                    preDispatch: function(query) {
                        var InString = query.split(",");
                        var lastEl = InString[InString.length - 1];
                        lastEl = operator_selected == "IN" ? lastEl : query;
                        return {
                            pageId: 1,
                            filterColumnName: fc,
                            filterOperator: fo,
                            filterValue: lastEl.toUpperCase(),
                            gridKey: defaults.gridConfig.gridKey,
                            gridName:defaults.gridConfig.gridDispKey
                        }
                    },
                    preProcess: function(obj) {
                    	
                        if (getResultCode(obj.resultCode) == CODE_SUCCESS) {
                            return obj.returnObject;
                        } else if (getResultCode(obj.resultCode) == 4) {
                            var wrapperId = "session_error"
                            getNormalSessionAlert(obj.messageKey, wrapperId, obj.returnObject);
                            $.blockUI({
                                message: $('#alert-' + wrapperId),
                                css: {
                                    width: '275px'
                                }
                            });

                            deletCookie("token");
                            deletCookie("userName");
                            deletCookie("lang");
                            return false;
                        }
                    }
                }
            });
            } 
        }

        /* generate add more options */
        var __generateAddmoreOptions = function(filter_columns) {
            var dropdownHTML = $(filter_dropdown);
            var optionClone;
            var optionValue;
            var optionLoop;
            var optionValueShow;

            optionLoop = filter_columns.length;

            dropdownHTML.find("select").attr({
                "title": i18NCall('add_columns_title')
            });

            filter_columns = sortString(filter_columns, "labelKey", 1);
            var hiddenClass = "";
            for (var i = 0; i < optionLoop; i++) {
                hiddenClass = "";
                if (filter_columns[i].isShow == true) {
                    hiddenClass = "hidden";
                }
                optionValue = filter_columns[i].name;
                optionValueShow = i18NCall(filter_columns[i].labelKey);

                optionClone = document.createElement("option");

                $(optionClone).attr({
                    "value": i,
                    "name": filter_columns[i].name
                }).addClass(hiddenClass);
                $(optionClone).html(optionValueShow);

                var optionCloneHTML = $(optionClone);
                dropdownHTML.find("select").append(optionCloneHTML);

            }
            dropdownHTML.find("select").attr({
                "name": "addmoreinput"
            });
            return dropdownHTML;
        }

        /* filter add more actions */
        var __filter_addmore_action = function(filter_columns) {
            $(self).find(filter_addmore_wrapper).find("select").on("change", function() {
                hideMessageWrapper();
                filter_addmore_block_html = __addFilterColumn(filter_columns, $(this).val());
                var addedFilterField = $(filter_addmore_block_html).find(".filter-searchvalue input").attr("name");
                if (filter_addmore_block_html) {

                    var presaved_filter_value = $(filter_presaved_wrapper).find("select[name=presaved_filter]").val();
                    if (presaved_filter_value > 0) {
                        $(self).find("[data-onfilter=show]").removeClass("hidden");
                    } else {
                        $(self).find("[data-onaddmore=show]").removeClass("hidden");
                    }
                    $(self).find(filter_elements_wrapper).append(filter_addmore_block_html);

                    var currentIndex = $(this).find("option:selected").index() - 1;
                    $(this).find("option:selected").addClass("hidden").removeAttr("selected");
                    $(this).siblings(".dropdown-menu").find("ul.dropdown-menu li:eq(" + currentIndex + ")").hide();

                    $(this).siblings(".dropdown-toggle").find(".filter-option").text(i18NCall('add_columns_title'));
                    $(this).siblings(".dropdown-toggle").attr("title", i18NCall('add_columns_title'));

                    setTimeout(function() {
                        $(".filter-operators").find(".selectpicker").selectpicker("refresh");
                        __getAutoSuggest($(self).find(filter_elements_wrapper + " .filter-searchvalue [name='" + addedFilterField + "']"));
                    }, 100);

                }
            });
        }
        
        /* add filter columns function */
        var __addFilterColumn = function(filter_columns,add_column){
        	
        	var filter_label      			= filter_columns[add_column].labelKey;
        	var filter_operators  			= filter_columns[add_column].operators;
        	var filter_columnname 			= filter_columns[add_column].name;
        	var filter_columnoperator		= filter_columnname+'_operator';
        	var filter_state	 			= filter_columns[add_column].isState;
        	var filter_state_on 			= filter_columnname+'_on'+"-"+switchInc;
        	var filter_state_off 			= filter_columnname+'_off'+"-"+switchInc;
        	var filter_type					= filter_columns[add_column].type;
        	var filter_format			    = filter_columns[add_column].format;
        	var filter_elements_block_html  = '';
        	var filter_elements_block_local = $(filter_elements_block);
        	
        	// Filter Label
        	filter_elements_block_local.find(filter_elements_label).text(i18NCall(filter_label));
        	
        	// Filter Operators
        	var dropdownHTML= __generateOperatorOptions(filter_operators,filter_columnoperator);
        	filter_elements_block_local.find(filter_elements_operators).html($(dropdownHTML).prop("outerHTML"));
        	// Filter Input
        	mainWrapper = $("<div class='sub-wrapper'></div>");
        	filter_elements_block_local.find(filter_elements_input).html(mainWrapper);
        	
        	if(filter_type == "dropdown"){
        		var dropDownHTML = baseFormElements.generate_dropdown_filter("",filter_columns[add_column]);
        		$(mainWrapper).append(dropDownHTML);
        		setTimeout(function(){
        			$(".filter-searchvalue").find('.selectpicker').selectpicker();
        		},100);
        	}else{
        		window["baseFormElements"]["generate_"+filter_type]('',filter_columns[add_column]);
        	}
        	 
        	// Filter ON/OFF state
        	filter_elements_block_local.find('.switch-input-on').attr({
        		"value":"1",
        		"name": filter_columnname,
        		"id": filter_state_on,
        		"checked": filter_state ? true : false
        	});
        	filter_elements_block_local.find('.switch-input-off').attr({
        		"value":"2",
        		"name": filter_columnname,
        		"id": filter_state_off,
        		"checked": filter_state ? false : true
        	});
        	filter_elements_block_local.find('.switch-label-off').attr({
        		"for": filter_state_on
        	});
        	filter_elements_block_local.find('.switch-label-on').attr({
        		"for": filter_state_off
        	});
        	
        	filter_elements_block_local.find(filter_delete_row_a_wrapper).attr({
        		"title"	  : i18NCall('delete_title'),
        		"data-rel": filter_columnname,
        	//	"onclick" : "deleteExistingRow(this)"
        	}).addClass("delete-filter").text(i18NCall('delete_title'));
        	
        	filter_elements_block_html = $(filter_elements_block_local).prop("outerHTML");
        	switchInc++;
        	
        	__deleteExistingRow();
        	
        	return filter_elements_block_html;
        }
        
        /* generate operators options */
        var __generateOperatorOptions = function(defaultOptions,nameOptions,filter_format){

        	var dropdownHTML  = $(filter_dropdown);
        	var optionClone;
        	var optionValue, optionKey;
        	var selectedValue;
        	var optionLoop    = defaultOptions.length;
        	for(var i=0; i<optionLoop; i++){
        		
        		selectedValue = false;
        		
        		optionValue = defaultOptions[i].value;
        		optionKey = defaultOptions[i].key;
        		if(defaultOptions[i].isSelected == true){
        			selectedValue = true;
        		}
        		optionClone = document.createElement("option");
        		$(optionClone).attr({
        			"value" : optionKey,
        			"selected" : selectedValue 
        		});
        		$(optionClone).html(optionValue);
        		dropdownHTML.find("select").append(optionClone);
        	}
         
        	dropdownHTML.find("select").attr({
        	   "name": nameOptions
        	});
        	return dropdownHTML;
        }
        /* function for create filter */
        var __createFilter = function(){
        	$(self).on("click",".create-filter",function(){
        		
            	var form_wrapper = $(this).parents("form");
            	
            	var form_wrapper_id = "#"+$(form_wrapper).attr("id");
            	var filter_create_block_html = $(filter_create_block);
            	$($(filter_create_block_html).prop("outerHTML")).appendTo(selector_content_section);
            	if($(form_wrapper).find(filter_elements_wrapper).find(filter_element_wrapper).length > 0){
            		if($(form_wrapper).find(filter_create_wrapper).length == 0){
            		
            			if(__validateFilterValues(form_wrapper_id) == 1){
            				
            				$(filter_create_wrapper).find("h4.modal-title").text(i18NCall("create_filter_title"));
            				
            				getModalPopUp(filter_create_wrapper);
            				getAutoFocus(filter_create_wrapper);
            				
            				$(filter_create_wrapper).find("form")[0].reset();
            				$(filter_create_wrapper).find("form").unbind("submit");
            				
            				$(filter_create_wrapper).find("form").submit(function(){
            					var create_input = $(filter_create_wrapper).find(selector_input).val();
            					
            					if(create_input != "" && !isEmpty(create_input)){
            						var col = [];
            						var item = [];
            						var isValidDate = true;
            						var validFormat = "";
            						$(form_wrapper).find(filter_element_wrapper).each(function() {
            							 
            							var value = getReturnValue(form_wrapper, $(this).find(filter_elements_input + " :input").not(":button"))
            							var format = $(this).find(filter_elements_input+" :input").attr("format");
            							var currFormat =  $(this).find(filter_elements_input+" :input").data("format");
            							var dateRange =  $(this).find(filter_elements_operators+" select").val();
            							var formatCompute = baseFunctions.formatComputation(format,dateRange,value,currFormat);
            							var checkCode = $(this).find(filter_elements_input + " :input").not(":button").data("checkcode");
            	
            							 if(formatCompute === false) isValidDate = false;
            							 validFormat = currFormat;
            							 
            							 var fc = $(this).find(filter_elements_input + " :input:not(:button)").attr("name");
            							 var fo = $(this).find(filter_elements_operators+" select").val();
            							 var fv = formatCompute;
            							 var fs = $(this).find(filter_state_wrapper+" input[type='radio']:checked").val();
            							  var fcc = (checkCode != undefined)?checkCode:"";
            							 item = {filterColumnName:fc, filterOperator:fo ,filterValue:fv , filterStatus:fs, checkCode : fcc };
            							 col.push(item);
            						});
            						if(isValidDate){
            							var myString = JSON.stringify(col);
            							var ajaxObject = {
            									"ajaxURL" : createFilterUrl,
            									"params" : {"pageId":current_moduleId,"filterData" : myString,"filterName":doTrim(create_input),"gridKey":defaults.gridConfig.gridKey,"gridName":defaults.gridConfig.gridDispKey},
            									"successCallback" : function(obj){
            										if(getResultCode(obj.resultCode) == CODE_SUCCESS){
            											generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
            											$(filter_create_wrapper).modal('hide');
            											$(form_wrapper).find("button[data-onaddmore=show]").addClass("hidden");
            											
            											__preSavedFilters();
            										}else{
            											generateMsg(obj.resultCode,obj.messageKey,global_lightbox_wrapper,"",obj.responseDetail);
            										}
            									},
            									"failureCallback" : function(){}
            							};
            							ajaxCallBack(ajaxObject);
            						}else{
            							$(filter_create_wrapper).modal("hide");
            							var message = {
            									"message" : 'validate.select.date.message',
            									"params"  : new Array(validFormat)
            								};
            							generateMsg(1,message,global_message_wrapper);
            						}
            					}else{
            						var validationObject = {
            							"errorCode" : 1,
            							"className" : "text",
            							"errorMsg"	: "create_filter_error",
            							"inputName" : $(filter_create_wrapper).find(selector_input).attr("name"),
            							"formId"	: filter_create_wrapper
             						};
            						setInlineValidation(validationObject);
            						
            					}
            					return false;
            				});
            			}else{
            				if(__validateFilterValues(form_wrapper_id) == 0){
            					generateMsg(1,'validate.filter.value.message',global_message_wrapper);
            				}else{
            					generateMsg(1,"validate.atleast.one.filter.on",global_message_wrapper);
            				}
            				
            			}
            		}
            	}
        	});
        }
        /* function for delete selected row from filter */
        var __deleteExistingRow = function(){
        	
        	$(self).on("click",".delete-filter",function(){
        		thisVal = this;
        		var getRel = $(thisVal).data("rel");
            	var filterWrapper = $(thisVal).parents(".app-action-form");
            	var addMoreBlock = $(thisVal).parents(".filter-elements-block").siblings(".filter-addmore-block");
            	var currentIndex = addMoreBlock.find("select option[name='"+getRel+"']").index() - 1;
            	addMoreBlock.find("select option[name='"+getRel+"']").removeClass("hidden");
            	addMoreBlock.find(".dropdown-menu").find("ul.dropdown-menu li:eq("+currentIndex+")").show();
            	addMoreBlock.find(".dropdown-menu").find("ul.dropdown-menu li:eq("+currentIndex+") a").removeClass("hidden");
            	$(thisVal).parents(".filter-element").remove();
            	$(".bootstrap-select").removeClass("open");
            	if($(filterWrapper).find(filter_element_wrapper).length == 0){
            		$(filterWrapper).find("button[data-onaddmore=show]").addClass("hidden");
            		$(filterWrapper).find("button[data-onfilter=show]").addClass("hidden");
            	}
        	});
        }
        
        /* function for validate filter values */
        var __validateFilterValues = function(wrapperId){
        	var flag = 1;
        	var onValues = 0;
        	$(wrapperId+ " .filter-searchvalue").each(function(){
        		var thisVal = $(this);
        		$(this).find(":input:visible").each(function(){
        			var selectedValue = $(thisVal).siblings(".filter-operators").find("select").val();
        			var inputValue = getReturnValue(wrapperId, $(this));
        			var filterState   = $(thisVal).siblings(".filter-state:visible").find("input[type=radio]:checked").val();
        			if(filterState == 1){
        				onValues++;
        			}
        			if(isSet(inputValue)){
        				if(filterState == 1 || filterState == undefined){
            				if(selectedValue != "ISNULL" && selectedValue != "ISNOTNULL"){
            					var regExSpace = /^\s+$/;
            					
            					if(isEmpty(inputValue) || regExSpace.test(inputValue) == true){
            						flag = 0;
            					}
            				}
            			}
        			}
        		});
        	});
        	if(onValues == 0){
        		flag = 2;
        	}
        	return flag;
        }
        /* function for save filter */
        var __saveFilter = function(){
        	
        	$(self).on("click",".save-filter",function(){
        		var form_wrapper = $(this).parents("form");
            	var form_wrapper_id = "#"+$(this).parents("form").attr("id");
            	var filterWrapper = "#"+$(self).attr("id");
            	var thisValue = $(filterWrapper+" select[name=presaved_filter]").val();
            	
            	if($(form_wrapper).find(filter_elements_wrapper).find(filter_element_wrapper).length > 0){
            		if(__validateFilterValues(form_wrapper_id) == 1 ){
            			var col = [];
            			var item = [];
            			var isValidDate = true;
            			var validFormat = "";
            			
            			$(form_wrapper).find(filter_element_wrapper).each(function() {
            				var value = getReturnValue(form_wrapper, $(this).find(filter_elements_input + " :input").not(":button"))
            				var format = $(this).find(filter_elements_input+" :input").attr("format");
            				var currFormat =  $(this).find(filter_elements_input+" :input").data("format");
            				var dateRange =  $(this).find(filter_elements_operators+" select").val();
            				var formatCompute = baseFunctions.formatComputation(format,dateRange,value,currFormat);
            				var checkCode = $(this).find(filter_elements_input + " :input").not(":button").data("checkcode");
             
            				 if(formatCompute === false) isValidDate = false;
            				 validFormat = currFormat;
            				 
            				 var fc = $(this).find(filter_elements_input + " :input:not(:button)").attr("name");
            				 var fo = $(this).find(filter_elements_operators+" select").val();
            				 var fv = formatCompute;
            				 var fs = $(this).find(filter_state_wrapper+" input[type='radio']:checked").val();
            			     var fcc = (checkCode != undefined)?checkCode:"";
            				 item = {filterColumnName:fc, filterOperator:fo ,filterValue:fv , filterStatus:fs, checkCode : fcc };
            				 col.push(item);
            			});
            			
            			if(isValidDate){
            				var myString = JSON.stringify(col);
            				var ajaxObject = {
            						"ajaxURL" : updateFilterUrl,
            						"params" : {"pageId":current_moduleId,"filterData" : myString,"filterId":thisValue,"gridKey":defaults.gridConfig.gridKey,"gridName":defaults.gridConfig.gridDispKey},
            						"successCallback" : function(obj){
            							generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
            						},
            						"failureCallback" : function(){}
            				};
            				ajaxCallBack(ajaxObject);
            			}else{
            				var message = {
            						"message" : 'validate.select.date.message',
            						"params"  : new Array(validFormat)
            					};
            				generateMsg(1,message,global_message_wrapper);
            			}
            		}else{
            			 if (__validateFilterValues(form_wrapper_id) == 0) {
                             generateMsg(1, "validate.filter.value.message", global_message_wrapper);
                         } else {
                             generateMsg(1, "validate.atleast.one.filter.on", global_message_wrapper);
                         }
            		}
            	}
        	});
        }
        
        /* function for delete filter */
        var __deleteFilter =  function(){
        	
        	$(self).find(".delete-filter").on("click",function(){
            	var thisValue = $(self).find("select[name=presaved_filter]").val();
            	if(thisValue > 0)
            	{
            		var ajaxObject = {
            				"ajaxURL" : deleteFilterUrl,
            				"params" : {"pageId":current_moduleId,"filterId":thisValue,"gridKey":defaults.gridConfig.gridKey,"gridName":defaults.gridConfig.gridDispKey},
            				"successCallback" : function(obj){
            					generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
            					__preSavedFilters();
            					__resetFilterRow(this,1);
            				},
            				"failureCallback" : function(){}
            		};
            		ajaxCallBack(ajaxObject);
            	}
        	});
        }
        
        /* function for reset filter */
        var __resetFilterRow =  function(thisVal,flag){
        	
        	__deleteFilterRow(thisVal,flag);
        	if($("#"+defaults.gridContext).length > 0)
        	{	
        		var ajaxObject = {
        				"ajaxURL" : resetFilterUrl,
        				"params" : {"pageId":current_moduleId,"gridKey":defaults.gridConfig.gridKey,"gridName":defaults.gridConfig.gridDispKey},
        				"successCallback" : window[setNamespace]["generateGridSuccess"],
        				"failureCallback" : generateFailure,
        				"wrapperId" 	  : defaults.gridContext,//panel_grid_content_id,
        				"loader" : true,
        				"loaderWrapper" : "#"+defaults.gridContext
        		};
        		ajaxCallBack(ajaxObject);
        	}
        	
        	var ajaxObjectFilter = {
        			"ajaxURL" : filterDetailsUrl,
        			"params"  :{"filterId" : 0, "pageId" : current_moduleId,"gridKey":defaults.gridConfig.gridKey,"gridName":defaults.gridConfig.gridDispKey},
        			"successCallback" : function(filterDetails){
        				if(getResultCode(filterDetails.resultCode) == CODE_SUCCESS){
        					var filter_config = filterDetails.returnObject;
        					if(filter_config) __generateFilterForm(filter_config,filterWrapper);
        				}else{
        					generateMsg(filterDetails.resultCode,filterDetails.messageKey,global_message_wrapper,"",filterDetails.responseDetail);
        				}
        			},
        			"aSync" : false,
        			"failureCallback" : function(){}
        	};
        	// Call Sorting API & Regenerate GRID
        	ajaxCallBack(ajaxObjectFilter);
        	$(".create-filter").addClass("hidden");
        }
      //delete filter row and add again into add more filter dropdown
        function __deleteFilterRow(thisVal,flag){
        	$(filter_dropdown_wrapper).find("select").prop('selectedIndex',-1);
        	$(filter_dropdown_wrapper).find("select").selectpicker("refresh");
        	
        	$(filter_element_wrapper).remove();
        	$(self).find("[data-onaddmore=show]").addClass("hidden");
        	$(self).find("[data-onfilter=show]").addClass("hidden");
        	
        	/*remove create / save filter button if no element block exists*/
        	if($(filter_element_wrapper).length == 0){
        		$(filter_submit_wrapper).find(".add-btn").html("").addClass("hidden");
        	}
        }
       
        /* function for allow to select range in date picker */
        var __allowDateRange = function(){
        	var filterWrapperId = "#"+filterWrapper;
        	$(document).undelegate(filterWrapperId +" .filter-operators select","change");
        	$(document).delegate(filterWrapperId +" .filter-operators select","change",function(){
        		var filterWrapper = "#"+$(this).parents(".app-action-form").attr("id");
        		var siblingDatePicker = $(this).parents(".filter-operators").siblings(".filter-searchvalue").find(".datepicker-row input").attr("id");
        		var siblingInput = $(this).parents(".filter-operators").siblings(".filter-searchvalue").find(":input");
        		var timePickerVal = false;
        		var timePickerSecondsVal = false;
        		var timePicker24HVal  = false;
        		if($("#"+siblingDatePicker).attr("format") == "datetime"){
        			timePickerVal = true;
        			timePickerSecondsVal = true;
        			timePicker24HVal  = true;
        		}
        		
        		if($(this).val() == "BETWEEN"){
        			var addParams = {
        					"singlePicker" : false,
        					"timePicker" : timePickerVal,
        					"timePickerSeconds" : timePickerSecondsVal,
        					"timePicker24H" : timePicker24HVal,
        					"dateRange":true
        				};
        		}else{
        			var addParams = {
        					"singlePicker" : true,
        					"timePicker" : timePickerVal,
        					"timePickerSeconds" : timePickerSecondsVal,
        					"timePicker24H" : timePicker24HVal
        				};	
        		}
        		if($(this).val() == "ISNULL" || $(this).val() == "ISNOTNULL"){
        			$(siblingInput).val("");
        			$(siblingInput).attr("disabled",true);
        		}else{
        			$(siblingInput).attr("disabled",false);
        		}
        		var datePicId = $(filterWrapper).find("#"+siblingDatePicker);
        		baseFunctions.datePicker(datePicId,addParams);
        	});
        }
        /* function for trim values in filter inputs */
        var __trimInValue = function(){
        	$(filterWrapper+" .filter-searchvalue [type=text]", "change", function() {
        		var selectedValue = $(this).parents(".filter-searchvalue").siblings(".filter-operators").find("select").val();
        		if(selectedValue == "IN"){
        			$(this).val(onChangeTrimInValue($(this).val()));
        		}
        	});
        }
        var __setDefaultFilter = function()
        {
        	setTimeout(function(){
        		$(".app-action-group a[data-rel="+filterWrapper+"]").addClass('active');
        	},100);
        }
        plugin.init();
        // allow jQuery chaining
        return;
    };
})(jQuery);

