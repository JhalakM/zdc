/*
|@author : Intech Creative Services
|@desc   : Function need to use to create form elements.
*/
(function(baseFormElements, $, undefined) {
	
baseFormElements.generateGroups = function(jsonObject){
	
	if(isSet(jsonObject.formGroups)){
		var formGroups   = jsonObject.formGroups;
		var formName 	 = jsonObject.formName;
		var lightBoxFlag = jsonObject.lightBoxFlag;
		var formId 		 = "#"+formName;
		for(var fg = 0; fg < formGroups.length; fg++){
			formElement 	= formGroups[fg].formElements;
			var formObject = {
					"formElement" 	: formElement,
					"formName"   	: formName,
					"lightBoxFlag"	: lightBoxFlag
			};
			if(isSet(formGroups[fg].groupName) && !isEmpty(formGroups[fg].groupName)){
				
				var formWrapper = $(formId).find(scroll_wrapper);
				if(isSet(jsonObject.formWrapper)){
					formWrapper = $(jsonObject.formWrapper);
				}
				
				var groupRow = $(formWrapper).append(div_group_row);
				$(formWrapper).append(groupRow);
				
				baseFormElements.generateGroupLabel(formName,formGroups[fg].groupName);
				
				$(div_clearfix).addClass("separator").appendTo($(formId).find(scroll_wrapper+ " .group-row:last"));
				formObject = $.extend({"groupEleFlag" : 1,"formWrapper" : $(formId).find(".group-row:last")},formObject);
				baseFormElements.generateElements(formObject);
			}else{
				formObject = $.extend({"formWrapper" : $(formId).find(".form-row:last")},formObject);
				baseFormElements.generateElements($(formId).find(scroll_wrapper),formObject);
			}
		}
	}
}

/* function for generate sidebar in web layout */
baseFormElements.generateForm = function(parent, menu, level,inner_class,formRowObject) {
	baseFormElements.multiLevelForm(parent, menu, level,inner_class,formRowObject);
}

/* function for generate n-level menu */
baseFormElements.multiLevelForm = function(parent, formData , level,inner_class,formRowObject){
	 var formName = formRowObject.formName;
	 var formId   = "#"+formName;
	 var groupEleFlag = formRowObject.groupEleFlag;
	 var params = new Array();

	    for(var i = 0;i < formData.length; i++) {
	  
	  var col_md_class = "col-md-6";
	  if(formData[i].type == "manageColumnConfig"){
		   col_md_class = "col-md-12";
		   formRowObject.lightBoxFlag = true;
	  }

	 
	  var params = [formData[i].name];
	  var errorStatus = misConfigError(params,i18NCall("errormsg.config_error"));

	  if(!errorStatus) return false;
	 
	  var validate = "";
	  if(!isEmpty(formData[i].validation)){
		  validate = formData[i].validation;
	  }
	 
	  if(inner_class == "sub-element"){
	   submenu = parent;
	   mainWrapper = $(submenu);
	  }else{
	   var mainDiv = baseFormElements.generateFormRow(formRowObject,formData[i].name,formData[i].type);
	   submenu = parent.append(mainDiv).addClass(inner_class).find(".form-row[data-element="+formData[i].name+"]");
	   baseFormElements.generateLabel(formRowObject,formData[i].labelKey,validate);
	   mainWrapper = $(div_form_col_2).appendTo(submenu);
	   
	    if(formData[i].isNewLine == true){
			$(formId).find(scroll_wrapper).append(div_clearfix);
		}
	  }
	//  var mainDiv = generateFormRow(formRowObject,formData[i].name);
	//
	//  submenu = parent.append(mainDiv).addClass(inner_class).find(".form-row[data-element="+formData[i].name+"]");
	// 
	//  generateLabel(formRowObject,formData[i].labelKey,validate);
	// 
	//  mainWrapper = $(div_form_col_2).appendTo(submenu);
	   
	  functionCallback = "generate_"+formData[i].type;
	  if(formData[i].type == "radio" ){
	   if(formData[i].isSwitch == true){
	    baseFormElements.generate_switch(formId,formData[i]);
	   }else{
	    if(isSet(window["baseFormElements"][functionCallback])){
	     window["baseFormElements"][functionCallback](formId,formData[i]);
	    }
	   }
	  }else{
	   if(isSet(window["baseFormElements"][functionCallback])){
	    window["baseFormElements"][functionCallback](formId,formData[i]);
	   }
	  }
	  if(formData[i].isSetEmpty ==  true){
	   baseFormElements.generate_setEmptyCB(formId,formData[i].name);
	  }
	 
	     if(isSet(formData[i].multiLevel)){
	      //submenu = submenu.append('<div class="p-r-5"><div class="form-row '+col_md_class+' sub-form-Level-' + (level + 1) + '"></div></div>').find(".form-row");
	      submenu = submenu.find(".form-col-2").addClass("form-group-col-2");
	      baseFormElements.multiLevelForm(submenu, formData[i].multiLevel, level + 1,'sub-element',formRowObject);
	     }
	     /*if(i % 2 == 1){
	   if(groupEleFlag == 1){
	    $(formId).find(scroll_wrapper+" .group-row:last").append(div_clearfix);
	   }else{
	    if(isEmpty(inner_class)){
	     $(formId).find(scroll_wrapper).append(div_clearfix);
	    }
	   }
	  }*/
	    }
	 $(formId+" "+selector_p_r_5).addClass('right');
	 setTimeout(function(){
	  $(formId+" "+selector_form_row).find("[tabindex = 1]").focus();
	 },200);
	 /* function will be called when data has been changed*/
	 baseFunctions.updateFormDetails(formId);
	}

	/* function to generate form element */
baseFormElements.generateElements = function(jsonObject){
	var formElement   = jsonObject.formElement;
	var formName 	  = jsonObject.formName;
	var formId 		  = "#"+formName;
	var lightBoxFlag  = jsonObject.lightBoxFlag;
	var groupEleFlag  = jsonObject.groupEleFlag;
	
	var formWrapper = $(formId).find('.scroll-wrapper');
	if(isSet(jsonObject.formWrapper)){
		formWrapper = jsonObject.formWrapper;
	}
	
	var formRowObject = {
			"formName" 		: formName,
			"lightBoxFlag"	: lightBoxFlag,
			"groupEleFlag"  : groupEleFlag,
			"formWrapper"   : formWrapper
	};
	
	baseFormElements.generateForm($(formWrapper),formElement,0,'',formRowObject);
	baseFormElements.autoSuggestFields(formId);
}

/* function to generate multiple elements in single form row */
	baseFormElements.generate_multilevel = function(formId,multiLevel){
	for(var m = 0; m < multiLevel.length; m++){
		
		var multiAttr = multiLevel;
		
		var validate = "";
		if(!isEmpty(multiAttr[m].validation)){
			validate = multiAttr[m].validation;
		}else if(multiAttr[m].multiLevel != undefined && !isEmpty(multiAttr[m].multiLevel.validation)){
			validate = multiAttr[m].multiLevel.validation;
		}
		
		if(isSet(multiAttr[m].labelKey)){
			baseFormElements.generateLabel(formId,multiAttr[m].labelKey,validate,1);
		}
		
		params = [multiAttr[m].name];
		var errorStatus = misConfigError(params,i18NCall("errormsg.config_error"));

		if(!errorStatus) return false;

		functionCallback = "generate_"+multiAttr[m].type;
		if(typeof multiAttr[m].type != "undefined"){
			if(multiAttr[m].type == "radio" ){
				if(multiAttr[m].isSwitch == true){
					baseFormElements.generate_switch(formId,multiAttr[m],1);
				}else{
					if(typeof window["baseFormElements"][functionCallback] != "undefined"){
						window["baseFormElements"][functionCallback](formId,multiAttr[m],1);
					}
				}	
			}else{
				if(typeof window["baseFormElements"][functionCallback] != "undefined"){
					window["baseFormElements"][functionCallback](formId,multiAttr[m],1);
				}
			}
			if(multiAttr[m].isSetEmpty ==  true){
				baseFormElements.generate_setEmptyCB(formId,multiAttr[m].name);
			}
		}
	}
}

/* function to generate form caption */
	baseFormElements.generateCaption = function(jsonObject){
	var caption;
	
	var formId 			= jsonObject.formId;
	var formCaption 	= jsonObject.formCaption;
	var lightBoxFlag 	= jsonObject.lightBoxFlag;

	if($(formId).find(".upload-form").length == 0){
		var formHTML = $(formId).prepend(div_form_element);
		if(lightBoxFlag == true){
			caption = $(formId).siblings(".modal-header").find(".modal-title").text(formCaption);
		}else{
			caption = $(formId).find(selector_panel_title).text(formCaption);
		}
	}
}

/* function to generate form rows */
baseFormElements.generateFormRow = function (formRowObject,formElementName,formElementType){
	
	var formName 	  = formRowObject.formName;
	var formId 		  = "#"+formName;
	var lightBoxFlag  = formRowObject.lightBoxFlag;
	var groupEleFlag  = formRowObject.groupEleFlag;
	
	var formElementName = (isSet(formElementName)) ? formElementName : "";
	var column_wrapper = formElementType == "manageColumnConfig" ? $(div_lightbox_col_md_12) : $(div_col_md_6);
	$(column_wrapper).attr("data-element",formElementName);
	return $(column_wrapper).prop("outerHTML");
}

/* function to generate label of group */
	baseFormElements.generateGroupLabel = function(formId,labelKey){
	var labelHTML = $(ele_label).addClass("group-label").appendTo("#"+formId+" "+" .group-row:last").find(selector_label);
	labelHTML.html(i18NCall(labelKey)).addClass("label-bold");
}

/* function to generate label */
baseFormElements.generateLabel = function (formRowObject,labelKey,validate){
	if(isSet(labelKey)){
		var formId = "#"+formRowObject.formName;
		var formWrapper  	  =  $(formRowObject.formWrapper).find(".form-row[data-element]:last");
		var labelHTML  		  = $(ele_label).appendTo(formWrapper).find(selector_label);
		multipleValueLabel = (!multipleValueLabel)?"":multipleValueLabel;
		if(!isEmpty(validate) && validate.indexOf("required") >= 0){
			labelHTML.html(i18NCall(labelKey)+" "+multipleValueLabel).addClass("label-bold");
		}else{
			labelHTML.html(i18NCall(labelKey)+" "+multipleValueLabel);
		}
	}
}

/* function to generate text element */
baseFormElements.generate_text = function(formId,formElement,flag){
	var inputHTML  = "";
	add_class_value = (flag == 1)?additional_class:"";
	var sepratorClass = (isSet(formElement.isSeparator) && formElement.isSeparator == true)?"form-separator":""; 
	if(formElement.format != undefined){
		var format = formElement.format;
		var datePickerId = formElement.name+"-"+switchInc;
		var isReadonly = formElement.isReadonly;
		switch(format){
		case "date":
			var newDate = moment(new Date()).format("DD/MM/YYYY");
			formElement.defaultValue = formElement.defaultValue == ""?undefined:formElement.defaultValue;
			var dateValue = getValidFormat(formElement.defaultValue,"DD/MM/YYYY",formElement.dateFormat,formElement.isDateRange);
			inputHTML  =  $(ele_datepicker_input).appendTo(mainWrapper).find(selector_input).attr({
				"name"        : formElement.name,
				"tabindex"    : formElement.tabIndex,
				"type"        : formElement.type,
				"data-format" : formElement.dateFormat,
				"minDate" : formElement.minDate,
				"maxDate" : formElement.maxDate,
				"value" :  dateValue,
				"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
				"data-regEx" : (!isEmpty(formElement.regEx))?formElement.regEx:undefined,
				"data-error-msg" :(!isEmpty(formElement.errorMsg))?formElement.errorMsg:undefined,
				"data-type" : formElement.type,
				"id" : datePickerId,
				"disabled": formElement.isDisabled,
				"format" : formElement.format,
				"autocomplete" :"off",
				"data-init-value" : dateValue,
				"data-clubby" : formElement.clubBy,
				"data-valid-flag" : formElement.validFlag
			}).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
			setTimeout(function(){
				var addParams = {
						"singlePicker" : (formElement.isDateRange == true)?false:true,
 				};
				baseFunctions.datePicker("#"+datePickerId,addParams);
			},100);
			break;
		case "datetime":
			var newDate = moment(new Date()).format(formElement.dateFormat);
			formElement.defaultValue = formElement.defaultValue == ""?undefined:formElement.defaultValue;
			var dateValue = getValidFormat(formElement.defaultValue,formElement.dateFormat,formElement.dateFormat,formElement.isDateRange);
			
			inputHTML  =  $(ele_datepicker_input).appendTo(mainWrapper).find(selector_input).attr({
				"name"        : formElement.name,
				"tabindex"    : formElement.tabIndex,
				"type"        : formElement.type,
				"data-format" : formElement.dateFormat,
				"minDate" : formElement.minDate,
				"maxDate" : formElement.maxDate,
				"value" :  dateValue,
				"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
				"data-type" : formElement.type,
				"disabled": formElement.isDisabled,
				"id" : datePickerId,
				"format" : formElement.format,
				"autocomplete" :"off",
				"data-init-value" : dateValue,
				"data-clubby" : formElement.clubBy,
				"data-valid-flag" : formElement.validFlag,
			}).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
			setTimeout(function(){
				var addParams = {
						"singlePicker" : (formElement.isDateRange == true)?false:true,
						"timePicker" : true,
						"timePickerSeconds" : true,
						"timePicker24H" : true
 				};
				baseFunctions.datePicker("#"+datePickerId,addParams);
			},100);
			break;
		case "time":
			inputHTML  =  $(ele_timepicker_input).appendTo(mainWrapper).find(selector_input).attr({
				"name"        : formElement.name,
				"tabindex"    : formElement.tabIndex,
				"type"        : formElement.type,
				"value" : formElement.defaultValue,
				"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
				"data-type" : formElement.type,
				"format" : formElement.format,
				"disabled":formElement.isDisabled,
				"data-format" : formElement.timeFormat,
				"autocomplete" :"off",
				"data-init-value" : formElement.defaultValue,
				"data-clubby" : formElement.clubBy,
				"data-valid-flag" : formElement.validFlag
			}).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
			inputHTML.attr({
				"id" : datePickerId
			});
			setTimeout(function(){
				var hourFormat = false;
				if(formElement.timeFormat == "HH:mm:ss PP"){
					hourFormat = true;
				}
				baseFunctions.dateTimePicker("#"+datePickerId,hourFormat);
			},100);
			break;
		}
		var readClass = "";
		if(isReadonly == true){
			readClass = "readonly";
		}
		$(inputHTML).find(".datepicker-row").addClass(readClass)
		switchInc++;
	}else{
		var upperCaseClass = formElement.isUpperCase == true?"set-uppercase":"";
		var autoComplete   = formElement.isAutoSuggest == true?"off":"on";
		var disabledValue = (formElement.isDisabled == true)?true:false;
		var autoSuggestUrl = formElement.autoSuggestUrl;
		inputHTML  = $(ele_input).appendTo(mainWrapper).find(selector_input).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
			"type"    : formElement.type,
			"data-type" : formElement.type,
			"value"	  : formElement.defaultValue,
			"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
			"data-regEx" : (!isEmpty(formElement.regEx))?formElement.regEx:undefined,
			"data-error-msg" :(!isEmpty(formElement.errorMsg))?formElement.errorMsg:undefined,
			"readonly":formElement.isReadonly,
			"disabled":disabledValue,
			"maxlength": formElement.maxLength,
			"data-uppercase" :formElement.isUpperCase,
			"data-checkcode":formElement.checkCode,
			"data-suggestion" : formElement.isAutoSuggest,
			"autocomplete" :autoComplete,
			"data-suggestUrl":formElement.autoSuggestUrl?formElement.autoSuggestUrl:undefined,
			"data-init-value" : formElement.defaultValue,
			"data-clubby" : formElement.clubBy,
			"data-valid-flag" : formElement.validFlag
		}).addClass(upperCaseClass).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
	}
}

/* function to generate password element */
baseFormElements.generate_password = function (formId,formElement,flag){
	var inputHTML  = "";
	add_class_value = (flag == 1)?additional_class:"";
	var sepratorClass = (isSet(formElement.isSeparator) && formElement.isSeparator == true)?"form-separator":""; 
	inputHTML  = $(ele_input).appendTo(mainWrapper).find(selector_input).attr({
		"name"    : formElement.name,
		"tabindex": formElement.tabIndex,
		"type"    : formElement.type,
		"data-type" : formElement.type,
		"value"	  : formElement.defaultValue,
		"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
		"data-regEx" : (!isEmpty(formElement.regEx))?formElement.regEx:undefined,
		"data-error-msg" :(!isEmpty(formElement.errorMsg))?formElement.errorMsg:undefined,
		"readonly":formElement.isReadonly,
		"disabled":formElement.isDisabled,
		"maxlength": formElement.maxLength,
		"data-match":formElement.matchWith,
		"autocomplete" :"off",
		"data-init-value" : formElement.defaultValue,
		"data-clubby" : formElement.clubBy
	}).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
}

/* function to generate textarea element */
baseFormElements.generate_textarea = function(formId,formElement,flag){
	var upperCaseClass = formElement.isUpperCase == true?"set-uppercase":"";
	var readonlyValue = (formElement.isReadonly == true)?true:false;
	add_class_value = (flag == 1)?additional_class:"";
	var sepratorClass = (isSet(formElement.isSeparator) && formElement.isSeparator == true)?"form-separator":""; 
	var textareaHTML  =  $(ele_textarea).appendTo(mainWrapper).find(selector_textarea).attr({
		"name"    : formElement.name,
		"tabindex": formElement.tabIndex,
		"cols"	  : formElement.cols,
		"id"	  : formElement.name,
		"rows"	  : formElement.rows,
		"type"    : formElement.type,
		"data-type" : formElement.type,
		"disabled":formElement.isDisabled,
		"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
		"data-regEx" : (!isEmpty(formElement.regEx))?formElement.regEx:undefined,
		"data-error-msg" :(!isEmpty(formElement.errorMsg))?formElement.errorMsg:undefined,
		"maxlength": formElement.maxLength,
		"value"	  : formElement.defaultValue,
		"data-uppercase" :formElement.isUpperCase,
		"data-suggestion" : formElement.isAutoSuggest,
		"data-init-value" : formElement.defaultValue,
		"data-clubby" : formElement.clubBy,
		"readonly" : readonlyValue,
	}).addClass(upperCaseClass).text(formElement.defaultValue).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
}
	
/* function to generate dropdown element */
baseFormElements.generate_dropdown = function(formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	var ele_dropdown_html = $(ele_dropdown);
	if(isSet(formElement.labelKey)){
		var titleName = i18NCall("select_dropdown_text")+" "+i18NCall(formElement.labelKey);
		ele_dropdown_html.find("select").attr({"title":titleName});
	}
	var dropdownHTML = "";
	if(isSet(formElement.action) && formElement.action.length > 0 ){
		var dropDownAction = $(drodpdown_actions);
		dropDownAction.prepend(ele_dropdown_html);
		var dropdownHTML  = $(mainWrapper).append(dropDownAction);
		var addTooltipKey = formElement.action[0].addAction.tooltipKey;
		var refreshTooltipKey = formElement.action[0].refreshAction.tooltipKey;
		$(".input-group").find(".dropdown-add a").attr('data-tooltip',i18NCall(addTooltipKey));
		$(".input-group").find(".dropdown-refresh a").attr('data-tooltip',i18NCall(refreshTooltipKey));
		baseFormElements.dropdownAddAction(".dropdown-add",formElement.action[0].addAction);
		baseFormElements.dropdownRefreshAction(formElement.name,".dropdown-refresh",formElement.action[0].refreshAction);
	}else{
		dropdownHTML  = $(mainWrapper).append(ele_dropdown_html);
	}
	var optionClone;
	var inputText = "";
	var inputVal;
	var selectedValue = false;
	var disabledValue = (formElement.isDisabled == true)?true:false;
	var readonlyValue = (formElement.isReadonly == true)?true:false;
	var sepratorClass = (isSet(formElement.isSeparator) && formElement.isSeparator == true)?"form-separator":""; 
	
	if(isSet(formElement.isSort) && formElement.defaultValue != ""){ 
		if(formElement.isSort == true  ||  !isSet(formElement.isSort)){
			  formElement.defaultValue = sortString(formElement.defaultValue,"labelKey",0);
		}
	}
	for(var i=0; i<formElement.defaultValue.length; i++){
		selectedValue = false;
		if(formElement.defaultValue[i].isSelected != undefined){
			inputText 	  = formElement.defaultValue[i].labelKey;
			selectedValue = (formElement.defaultValue[i].isSelected == true )?true:false;
		}
		
		optionClone = document.createElement("option");
		$(optionClone).attr({
			"value" : formElement.defaultValue[i].value,
			"selected" : selectedValue,
		});
		$(optionClone).html(formElement.defaultValue[i].labelKey);
		dropdownHTML.find("select").append(optionClone);
		if(formElement.defaultValue[i].isSelected == true){
			inputVal = formElement.defaultValue[i].value;
		}
	}
	dropdownHTML.find(selector_dropdown_list).attr({
		"data-name"    	: formElement.name
	});
	
	if(isSet(titleName)){
		dropdownHTML.find("select").not("[name]").prepend('<option class="placeholder" value="">'+titleName+'</option>');
	}
	
	dropdownHTML.find("select").not("[name]").attr({
		"name"    		: formElement.name,
		"data-container": "body",
		"id"			: formElement.name,
		"data-type" 	: "select-one",
		"tabindex"		: formElement.tabIndex,
		"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
		"disabled" : disabledValue,
		"readonly" : readonlyValue,
		"data-clubby" : formElement.clubBy,
		"data-init-value" : (isSet(inputVal))?inputVal:undefined,
		"data-regEx" : (!isEmpty(formElement.regEx))?formElement.regEx:undefined,
		"data-error-msg" :(!isEmpty(formElement.errorMsg))?formElement.errorMsg:undefined,
		"multiple" : isSet(formElement.multiple) && formElement.multiple == true?formElement.multiple:undefined
	}).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
	$(dropdownHTML).find('.selectpicker').selectpicker({
	    dropupAuto: false
	});
	if(readonlyValue == true){
		$(dropdownHTML).find('.dropdown-toggle').attr("disabled", true);
	}
}

baseFormElements.generate_dropdown_filter = function (formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	var ele_dropdown_html = $(ele_dropdown);
	var titleName = i18NCall("select_dropdown_text")+" "+i18NCall(formElement.labelKey);
	ele_dropdown_html.find("select").attr({"title":titleName});
	var dropdownHTML  =  $(ele_dropdown_html);//$(mainWrapper).append(ele_dropdown_html);
	var optionClone;
	var inputText = "";
	var inputVal;
	var selectedValue = false;
	var disabledValue = (formElement.isDisabled == true)?true:false;
	
	if((formElement.defaultValue != "") && (formElement.isSort == true  ||  !isSet(formElement.isSort))){
		  formElement.defaultValue = sortString(formElement.defaultValue,"labelKey",0);
	}
	for(var i=0; i<formElement.defaultValue.length; i++){
		if(formElement.defaultValue[i].isSelected != undefined){
			inputText 	  = formElement.defaultValue[i].labelKey;
			
			selectedValue = (formElement.defaultValue[i].isSelected == true )?true:false;
		}
		
		optionClone = document.createElement("option");
		$(optionClone).attr({
			"value" : formElement.defaultValue[i].value,
			"selected" : selectedValue,
		});
		$(optionClone).html(formElement.defaultValue[i].labelKey);
		dropdownHTML.find("select").append(optionClone);
		if(formElement.defaultValue[i].isSelected == true){
			inputVal = formElement.defaultValue[i].value;
		}
	}
	dropdownHTML.find(selector_dropdown_list).attr({
		"data-name"    	: formElement.name
	});
	dropdownHTML.find("select").prepend('<option class="placeholder" value="">'+titleName+'</option>');
	
	dropdownHTML.find("select").attr({
		"name"    		: formElement.name,
		"id"			: formElement.name,
		"data-type" 	: "select-one",
		"data-container": "body",
		"tabindex"		: formElement.tabIndex,
		"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
		"disabled" : disabledValue,
		"data-clubby" : formElement.clubBy,
		"data-init-value" : (isSet(inputVal))?inputVal:undefined,
		"data-regEx" : (!isEmpty(formElement.regEx))?formElement.regEx:undefined,
		"data-error-msg" :(!isEmpty(formElement.errorMsg))?formElement.errorMsg:undefined,
		"data-checkcode":formElement.checkCode
		//"multiple" : true
	}).parents(selector_p_r_5).addClass(add_class_value);
	
	return dropdownHTML.prop("outerHTML");
}

/* function to generate switch element */
baseFormElements.generate_switch = function (formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	switchHTML = $(ele_switch).appendTo(mainWrapper);
	var inputClone;
	var labelClone;
	var spanClone = document.createElement(selector_span);
	var add_class = "";
	var selectedValue = false;
	var inputVal;
	var sepratorClass = (isSet(formElement.isSeparator) && formElement.isSeparator == true)?"form-separator":""; 
	var readonlyValue = (formElement.isReadonly == true)?true:false;
	for(var i=0; i<formElement.defaultValue.length; i++){
		if(formElement.defaultValue[i].isSelected != undefined){
			selectedValue = (formElement.defaultValue[i].isSelected == true )?true:false;
		}else{
			selectedValue = (i == 0)?true:false;
		}
		
		add_class = (i==0)?class_switch_label_off:class_switch_label_on;
		inputClone = document.createElement(selector_input);
		labelClone = document.createElement(selector_label);
		
		inputVal 	  = (formElement.defaultValue[i].isSelected == true )?formElement.defaultValue[i].value:undefined;
		
		$(inputClone).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
			"type"    : formElement.type,
			"data-type" : formElement.type,
			"value"	  : formElement.defaultValue[i].value,
			"id"	  : formElement.name+"-"+i+"-"+switchInc,
			"class"	  : class_switch_input,
			"checked" : selectedValue,
			"data-init-value" : inputVal,
			"data-clubby" : formElement.clubBy,
			"readonly" : readonlyValue,
			"disabled": formElement.isDisabled
		});
		$(switchHTML).find(selector_switch).attr({
			"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
			"data-type"    : formElement.type,
			"data-name"    : formElement.name
		});
		$(switchHTML).find(selector_switch).append(inputClone);
		$(labelClone).text(i18NCall(formElement.defaultValue[i].labelKey));
		$(labelClone).attr({
			"for" 	: formElement.name+"-"+i+"-"+switchInc,
			"class" : class_switch_label+" "+ add_class
		});
		$(switchHTML).find(selector_switch).append(labelClone);
	}	
	$(spanClone).attr({
		"class" : class_switch_selection
	});
	
	var readClass = "";
	if(readonlyValue == true){
		readClass = "readonly";
	}
	$(switchHTML).find(selector_switch).addClass(readClass).append(spanClone).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
	switchInc++;
}

/* function to generate radio button element */
baseFormElements.generate_radio = function(formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	radioHTML = $(ele_radio).appendTo(mainWrapper);
	var inputClone;
	var labelClone;
	var spanClone;
	var selectedValue = false;
	var inputVal;
	var readonlyValue = formElement.isReadonly;
	var sepratorClass = (isSet(formElement.isSeparator) && formElement.isSeparator == true)?"form-separator":"";
	for(var i=0; i<formElement.defaultValue.length; i++){
		if(formElement.defaultValue[i].isSelected != undefined){
			selectedValue = (formElement.defaultValue[i].isSelected == true )?true:false;
		}/*else{
			selectedValue = (i == 0)?true:false;
		}*/
		inputClone = document.createElement(selector_input);
		labelClone = document.createElement(selector_label);
		spanClone  = document.createElement(selector_span);
		
		inputVal 	  = (formElement.defaultValue[i].isSelected == true )?formElement.defaultValue[i].value:undefined;
		
		$(inputClone).attr({
			"name"    : formElement.name,
			"type"    : formElement.type,
			"data-type" : formElement.type,
			"value"	  : formElement.defaultValue[i].value,
			"id"	  : formElement.name+"-"+i+"-"+switchInc,
			"checked" : selectedValue,
			"data-init-value" : inputVal,
			"data-clubby" : formElement.clubBy,
			"readonly" : readonlyValue,
			"disabled": (formElement.isDisabled)?formElement.isDisabled:undefined
		});
		$(radioHTML).find(selector_radio_btn).attr({
			"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
			"data-regEx" : (!isEmpty(formElement.regEx))?formElement.regEx:undefined,
			"data-error-msg" :(!isEmpty(formElement.errorMsg))?formElement.errorMsg:undefined,
			"data-type"    : formElement.type,
			"data-name"    : formElement.name,
			"tabindex": formElement.tabIndex
		});
		$(radioHTML).find(selector_radio_btn).append(inputClone);
		$(labelClone).text(formElement.defaultValue[i].labelKey);
		$(labelClone).append(spanClone);
		$(labelClone).find(selector_span).html(document.createElement(selector_span));
		$(labelClone).attr({
			"for" : formElement.name+"-"+i+"-"+switchInc
		});
		
		var readClass = "";
		if(readonlyValue == true){
			readClass = "readonly";
		}
		$(radioHTML).find(selector_radio_btn).addClass(readClass).append(labelClone).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
		switchInc++;
	}	
}

/* function to generate checkbox element */
baseFormElements.generate_checkbox = function (formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	checkHTML = $(ele_checkbox).appendTo(mainWrapper);
	var inputClone;
	var labelClone;
	var spanClone;
	var selectedValue='';
	var inputVal;
	var readonlyValue = formElement.isReadonly;
	var sepratorClass = (isSet(formElement.isSeparator) && formElement.isSeparator == true)?"form-separator":""; 

	for(var i=0; i<formElement.defaultValue.length; i++){
		selectedValue = (formElement.defaultValue[i].isSelected == "true" || formElement.defaultValue[i].isSelected == true)?true:false;
		inputClone = document.createElement(selector_input);
		labelClone = document.createElement(selector_label);
		inputVal 	  = (formElement.defaultValue[i].isSelected == true )?formElement.defaultValue[i].value:undefined;
		$(inputClone).attr({
			"name"    : formElement.name,
			"type"    : formElement.type,
			"data-type" : formElement.type,
			"value"	  : formElement.defaultValue[i].value,
			"id"	  : formElement.name+"-"+i,
			"class"	  : class_css_checkbox,
			"checked" : selectedValue,
			"data-init-value" : inputVal,
			"data-clubby" : formElement.clubBy,
			"readonly" : readonlyValue,
			"disabled": (formElement.isDisabled)?formElement.isDisabled:undefined
		});
		$(checkHTML).find(selector_checkbox).attr({
			"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
			"data-type"    : formElement.type,
			"data-name"    : formElement.name,
			"tabindex": formElement.tabIndex
		});
		$(checkHTML).find(selector_checkbox).append(inputClone);
		$(labelClone).text(formElement.defaultValue[i].labelKey);
		$(labelClone).attr({
			"for" : formElement.name+"-"+i,
			"class"	  : class_css_label
		});
		var readClass = "";
		if(readonlyValue == true){
			readClass = "readonly";
		}
		$(checkHTML).find(selector_checkbox).addClass(readClass).append(labelClone).closest(selector_p_r_5).addClass(add_class_value+" "+sepratorClass);
	}	
}

/* function to generate file input element */
	baseFormElements.generate_file = function (formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";

	var fileUploadHTML  = $(ele_file_upload).appendTo(mainWrapper);

	$(fileUploadHTML).find(selector_input).attr({
		"name" 		: formElement.name,
		"type"    	: formElement.type,
		"data-type" : formElement.type,
		"id"    	: formElement.name,
		"multiple"  : formElement.multiple,
		"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
		"value"		: formElement.defaultValue,
		"data-value" : formElement.defaultValue,
		"onchange"  : "baseFunctions.setCustomFileData(this.id)",
		"data-init-value" : formElement.defaultValue,
		"data-clubby" : formElement.clubBy
	});
	
	$(fileUploadHTML).find(selector_selected_file).attr({
		"data-name"    	: formElement.name,
		"data-type"    	: formElement.type,
		"tabindex"		: formElement.tabIndex,
		"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
	}).text(formElement.defaultValue);
	
	if(typeof formElement.fileValidation != "undefined"){
		$(fileUploadHTML).find(selector_input).attr({
			"data-accept"	: formElement.fileValidation.accept,
			"data-size"		: formElement.fileValidation.size
		});
		if(typeof formElement.fileValidation.file != "undefined"){
			var fileElement = formElement.fileValidation.file;
			var imgClone = document.createElement("img");
			$(imgClone).attr({
				"src"    : fileElement.src,
				"alt"    : fileElement.alt,
				"height" : fileElement.height,
				"width"  : fileElement.width,
			});
			$(imgClone).appendTo(fileUploadHTML);
		}
	}
	//setMultiFilePlugin(formElement.name);
}
	
/* function to generate multiple file input element */
baseFormElements.generate_multiplefile = function (formId,formElement,flag){
		add_class_value = (flag == 1)?additional_class:"";
		
		var fileUploadHTML  = $(ele_multiple_file_upload).appendTo(mainWrapper);
		$(fileUploadHTML).last("div").addClass("filename_"+formElement.name);
		
		$(fileUploadHTML).find(selector_input).attr({
			"name" 		: formElement.name,
			"type"    	: "file",
			"data-type" : formElement.type,
			"id"    	: formElement.name,
			"multiple"  : formElement.multiple,
			"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
			"value"		: formElement.defaultValue,
			"data-value" : formElement.defaultValue,
			"onchange"  : "baseFunctions.setCustomMultiFileData(this)",
			"data-init-value" : formElement.defaultValue,
			"data-clubby" : formElement.clubBy
		});
		
		$(fileUploadHTML).find(selector_selected_file).attr({
			"data-name"    	: formElement.name,
			"data-type"    	: formElement.type,
			"tabindex"		: formElement.tabIndex,
			"data-validate" : (!isEmpty(formElement.validation))?formElement.validation:undefined,
		}).text(formElement.defaultValue);
		if(typeof formElement.fileValidation != "undefined"){
			$(fileUploadHTML).find(selector_input).attr({
				"data-accept"	: formElement.fileValidation.accept,
				"data-size"		: formElement.fileValidation.size
			});
			if(typeof formElement.fileValidation.file != "undefined"){
				var fileElement = formElement.fileValidation.file;
				var imgClone = document.createElement("img");
				$(imgClone).attr({
					"src"    : fileElement.src,
					"alt"    : fileElement.alt,
					"height" : fileElement.height,
					"width"  : fileElement.width,
				});
				$(imgClone).appendTo(fileUploadHTML);
			}
		}

}

baseFormElements.returnObject = function (obj){
	return $('<div>').append(obj.clone()).html();
}

/* function to generate button element */
baseFormElements.generateButtons = function (formButtons,formId){
	var buttonHTML = $(div_col_md_12).appendTo("#"+formId);
	if(isSet(formButtons[0])){
		if(isSet(formButtons[0].submit)){
			var btnSubmit = $(btn_normal);
			$(btnSubmit).attr({
				"type" : "submit",
				"name" : formButtons[0].submit.keyName,
				"data-type" : "submit",
				"tabindex": formButtons[0].submit.tabIndex
			});
			$(btnSubmit).text(i18NCall(formButtons[0].submit.keyValue));
			buttonHTML.append(btnSubmit);  
		}
		if(isSet(formButtons[0].reset)){
			var btnReset = $(btn_reset);
			$(btnReset).attr({
				"type" : "reset",
				"name" : formButtons[0].reset.keyName,
				"tabindex": formButtons[0].reset.tabIndex,
				"data-url" : isSet(formButtons[0].reset.resetUrl)?formButtons[0].reset.resetUrl:'',
				"data-pagekey": isSet(formButtons[0].reset.pageKey)?formButtons[0].reset.pageKey:undefined,
				"data-pagetype":isSet(formButtons[0].reset.pageType)?formButtons[0].reset.pageType:undefined
			});
			$(btnReset).text(i18NCall(formButtons[0].reset.keyValue));
			buttonHTML.append(btnReset);
		}
		/*if(isSet(formButtons[0].cancel)){
			var btnCancel = $(btn_cancel);
			$(btnCancel).attr({
				"type" : "button",
				"data-url" : isSet(formButtons[0].cancel.resetUrl)?formButtons[0].cancel.resetUrl:'',
				"name" : formButtons[0].cancel.keyName,
				"data-type" : "button",
				"tabindex": formButtons[0].cancel.tabIndex
			});
			$(btnCancel).text(i18NCall(formButtons[0].cancel.keyValue));
			buttonHTML.append(btnCancel);
		}*/
		if(isSet(formButtons[0].button)){
			var buttonArray = formButtons[0].button;
			var buttonShow;
			var getAllButtons = "";
			for(var i=0; i < buttonArray.length; i++){
				
				var getDetails = getButtonIcon(buttonArray[i].buttonType);
				
				if(!isSet(buttonArray[i].buttonType)){
					buttonShow = $(btn_normal);
				}else{
					buttonShow = $(apply_filter_button);
				}
				 buttonShow.attr({
					"type" : "button",
					"name" : buttonArray[i].keyName,
					//"data-rel" : buttonArray[i].redirectUrl
				}).find(".btn-value").text(i18NCall(buttonArray[i].keyValue)).parents("button").find("img").attr({
					"src" : getDetails.iconSrc
				});
				getAllButtons += buttonShow.prop("outerHTML");
				
				if(isSet(getDetails.functionName)){
					var buttonFunction = getDetails.functionName;
					if(isSet(window["baseFunctions"]["perform_"+buttonFunction])){
						window["baseFunctions"]["perform_"+buttonFunction](buttonArray[i],formId);
					}
				}
			}
			buttonHTML = $($(getAllButtons).prop("outerHTML")).appendTo(buttonHTML);
			
		}
	}
	return buttonHTML;
}

/* function to generate hidden input element */
	baseFormElements.generateHiddenTag = function (obj,formId){
	var json_response		= jsonParse(jsonStringify(obj));
	var HTML_Cl="";
	$.each(json_response, function(index , value){
		HTML_Cl+='<input class="text-box" data-type="hidden" type="hidden" name="'+index+'" value="'+value+'" />';
	});
    $("#"+formId).append(HTML_Cl);
	return HTML_Cl;
}

/* function to set file data of file input */
	baseFormElements.setCustomFileData = function(fileId){
	 var file_id  = "#"+fileId;
	 var formId = $(file_id).parents("form").attr("id");
	 var path = $(file_id).val().match(/[^\/\\]+$/);
	 var isError = 1;
	 if(path != null){
		 var pathString = path.toString();
		 var sub_str = pathString.substr(0,35)
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
		 if(file.size == 0){
			 $(".selected-file-name").addClass("error-input-box");
			 errorMesage += i18NCall('valiate.file.size.empty.message');
			 generateFieldMsg(1,className,errorMesage,$(file_id).attr("id"),"#"+formId);
			 return isError;
		 }
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

/* function to generate and perform operation on set empty */
	baseFormElements.generate_setEmptyCB = function (formWrapper,formEleObjName){

	var cbHTML = $(ele_set_empty_checkbox);
	var addToParent = $(formWrapper).find(":input[name = '"+formEleObjName+"']").parents(selector_p_r_5);
	addToParent.parents(".form-col-2").addClass("enabled-set-empty");
	var objAttrName = "set_empty_"+formEleObjName;
	var objAttrId   = objAttrName+"-"+switchInc;
	cbHTML.find(".cb-set-empty").attr({
		"name" : objAttrName,
		"id"   : objAttrId,
		"data-for" : formEleObjName
	});
	cbHTML.find("label").attr({
		"for"   : objAttrId
	});
	$(cbHTML).insertAfter(addToParent);
	
	$(formWrapper).find(selector_p_r_5).addClass("col-md-10");
	baseFunctions.setEmptyAction(formWrapper,$(formWrapper).find("#"+objAttrId));
	switchInc++;
}

/* function to generate hidden element */
	baseFormElements.generate_hidden = function (formId,formElement){
	var inputHTML  = "";
	inputHTML  = $(ele_input).appendTo(mainWrapper).find(selector_input).attr({
		"name"    : formElement.name,
		"type"    : formElement.type,
		"value"	  : formElement.defaultValue,
	});
}

/* function to generate hidden element */
	/*baseFormElements.generate_hidden = function (formId,formElement){
	var inputHTML  = "";
	inputHTML  = $(ele_input).appendTo(mainWrapper).find(selector_input).attr({
		"name"    : formElement.name,
		"type"    : formElement.type,
		"value"	  : formElement.defaultValue,
	});
}*/

/* function to generate labels */
   baseFormElements.generate_label = function (formId,formElement){
	
	var inputHTML  = "";
	switch(formElement.format){
		case "file" :
			var fileList = formElement.fileList;
			var setHTML;
			for(var i = 0;  i < fileList.length; i++ ){
				setHTML = document.createElement("a");
				$(setHTML).attr({
					"href" : (isSet(fileList[i].fileUrl))?fileList[i].fileUrl:"javascript:void(0);",
					"target" : "_blank"
				}).text(fileList[i].name);
				inputHTML += $(setHTML).prop("outerHTML");
			}			
		break;
		
		default : 
			if(jQuery.type(formElement.defaultValue) == "array"){
				inputHTML = formElement.defaultValue.join(', ');
			}else{
				inputHTML = formElement.defaultValue;
			}
		break;
	}
	var sepratorClass = (isSet(formElement.isSeparator) && formElement.isSeparator == true)?"form-separator":""; 
	var grayOut = (isSet(formElement.isGrayOut) && formElement.isGrayOut == true)?"gray-out":"";
	inputHTML  = $(ele_view_label).addClass("set-label-text "+sepratorClass+grayOut).appendTo(mainWrapper).find("label").attr({
						"for"    : formElement.name
					}).html(inputHTML);
	
}

baseFormElements.generate_manageColumnConfig = function (formId,formObject){
	// if manage column config getting for view page then call this method 
	if(formObject.isReadonly == true){
		baseFormElements.manageColumnConfigView(formId,formObject);
		return true;
	}
	
	var manageColumnHTML = $(ele_manage_column).appendTo(mainWrapper);
	var ulClass;
	manageColumnHTML.attr({
		"id" : formObject.name,
	});
	
	var blockWrapper	 	= formObject.name;
	var blockWrapperId      = "#"+blockWrapper;
	var visibleColWrapper 	= blockWrapper+"-visible-columns";
	var allColWrapper 		= blockWrapper+"-all-columns";
	
	var manageColumnConfig = formObject.manageColumnsConfig;
	var listBoxHTML = "";
	
	ulClass = "all-columns";
	var listBox = $(ele_manage_column_list_box);
	listBox.find(".col-title h3").text(i18NCall(manageColumnConfig.availableTitle)+" :");
	listBox.find(".columns-list-item").addClass(ulClass).attr({
		"id" : formObject.name+"-"+ulClass
	});
	listBoxHTML += $(listBox).prop("outerHTML");
	
	ulClass = "visible-columns";
	
	var listBox = $(ele_manage_column_list_box);
	listBox.find(".col-title h3").text(i18NCall(manageColumnConfig.assignedTitle)+" :");
	listBox.find(".clear-all-link").removeClass("clear-all").addClass("clear-visibles");
	listBox.find(".columns-list-item").addClass(ulClass).attr({
		"id" : formObject.name+"-"+ulClass
	});
	listBoxHTML += $(listBox).prop("outerHTML");
	
	
	manageColumnHTML.append(listBoxHTML);
	manageColumnHTML.find(".visible-columns").attr({
		"data-name" : formObject.name,
		"name" 		: formObject.name,
		"type"    	: formObject.type,
		"data-type" : formObject.type,
		"data-validate" : (!isEmpty(formObject.validation))?formObject.validation:undefined,
		"tabindex"	: formObject.tabIndex
	});	
	
	var manageColumnButtons  = $(ele_manage_column_buttons);
	$(manageColumnButtons).insertAfter(manageColumnHTML.find(".all-columns").parents(".columns-list-box"))

	
	
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
	
	baseFunctions.generateScrollbar(blockWrapperId+" ul");
	
	baseGridActions.manageColumnsActions(blockWrapperId);
	/*Ul li list with textbox search enable */
	baseGridActions.manageListWithTextSearch(allColWrapper);
	baseGridActions.manageListWithTextSearch(visibleColWrapper);	
}
	
baseFormElements.manageColumnConfigView = function (formId,formObject){
	var manageColumnHTML = $(ele_manage_column).appendTo(mainWrapper);
	var ulClass;
	manageColumnHTML.attr({
		"id" : formObject.name,
	});
	var blockWrapper	 	= formObject.name;
	var blockWrapperId      = "#"+blockWrapper;
	var visibleColWrapper 	= blockWrapper+"-visible-columns";
	
	var manageColumnConfig = formObject.manageColumnsConfig;
	var listBoxHTML = "";
	
	ulClass = "visible-columns";
	
	var listBox = $(ele_manage_column_list_box_for_view);
	listBox.find(".col-title h3").text(i18NCall(manageColumnConfig.assignedTitle)+" :");
	listBox.find(".columns-list-item").addClass(ulClass).attr({
		"id" : formObject.name+"-"+ulClass
	});
	listBoxHTML += $(listBox).prop("outerHTML");
	
	manageColumnHTML.append(listBoxHTML);
	manageColumnHTML.find(".visible-columns").attr({
		"data-name" : formObject.name,
		"name" 		: formObject.name,
		"type"    	: formObject.type,
		"data-type" : formObject.type,
		"data-validate" : (!isEmpty(formObject.validation))?formObject.validation:undefined,
		"tabindex"	: formObject.tabIndex
	});	
	var manageColumnConfig_column1 = [];
	
	/*var options = {"errorCode":0,"returnObject":{"manageColumnsConfig":{"totalColumnCount":10,"columnValueObjects":[{"columnName":"USER_ID","columnDispNameKey":"user.userId","columnId":23,"columnOrder":1,"isVisible":true},{"columnName":"FIRST_NM","columnDispNameKey":"user.firstName","columnId":17,"columnOrder":2,"isVisible":true},{"columnName":"LAST_NM","columnDispNameKey":"user.lastName","columnId":19,"columnOrder":3,"isVisible":true},{"columnName":"MIDDLE_NM","columnDispNameKey":"user.middleName","columnId":18,"columnOrder":4,"isVisible":true},{"columnName":"MOBILE_PHONE","columnDispNameKey":"user.mobilePhone","columnId":22,"columnOrder":5,"isVisible":true},{"columnName":"PRIMARY_PHONE","columnDispNameKey":"user.primaryPhone","columnId":21,"columnOrder":6,"isVisible":true},{"columnName":"USER_EMAIL","columnDispNameKey":"user.userEmail","columnId":20,"columnOrder":7,"isVisible":true},{"columnName":"USER_STATUS_CODE","columnDispNameKey":"user.userStatusCode","columnId":24,"columnOrder":8,"isVisible":true},{"columnName":"USER_STATUS_BRANCH","columnDispNameKey":"user.userBranchCode","columnId":25,"columnOrder":9,"isVisible":true},{"columnName":"USER_STATUS_COMCODE","columnDispNameKey":"user.userComCode","columnId":26,"columnOrder":10,"isVisible":true}]}}};
	var manageColumnConfig = options.returnObject.manageColumnsConfig; */
	
	for(var i =0; i< manageColumnConfig.totalColumnCount; i++){
		var columnValueObject = manageColumnConfig.columnValueObjects;
		if(columnValueObject[i].isVisible == true){
			manageColumnConfig_column1.push(columnValueObject[i]);
		}
	}
	var obj = {
		'manageColumnConfig':manageColumnConfig_column1,
		'blockWrapper': blockWrapper,
		'listWrapper':visibleColWrapper,
		'search':0
	};
	baseGridActions.generateList(obj);
	baseFunctions.generateScrollbar(blockWrapperId+" ul");
}

baseFormElements.autoSuggestFields = function (formId){
	
	$.each($(formId).find("input[data-suggesturl]").not("input[readonly=readonly]"),function(){
		$(this).find(".typeahead").remove();
        $(this).typeahead('destroy');
		var autoCompleteValuesUrl = $(this).attr("data-suggesturl");
		$(this).typeahead({
	        displayField: "value",
	        valueField: "key",
	        scrollBar: true,
	        matcher: function(item) {
	            var tquery = extractor(this.query);
	            if (!tquery) return false;
	            return ~item.toLowerCase().indexOf(tquery.toLowerCase())
	        },
	        highlighter: function(item) {
	            var query = "";//extractor(this.query).replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	            return item.replace(new RegExp('(' + query + ')', 'ig'), function($1, match) {
	                return '<strong>' + match + '</strong>'
	            })
	        },
	        ajax: {
	            url: SetWebApiURL+autoCompleteValuesUrl,
	            method: "POST",
	            triggerLength: 2,
	            preDispatch: function(query) {
	                var InString = query.split(",");
	                var lastEl = InString[InString.length - 1];
	                //lastEl = operator_selected == "IN" ? lastEl : query;
	                return {
	                    pageId: screenName,
	                    search: lastEl.toUpperCase(),
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
	           },
	        });
	});
}
baseFormElements.dropdownAddAction = function(elemWrapper,formElement){
	$(document).undelegate(elemWrapper,"click");
	$(document).delegate(elemWrapper,"click",function(){
		var redirectConfig = {
				"openUrl"  : formElement.openUrl,
				"openType" : 'newPage',
				"pageType" : "ADD",
				"target"   : "_blank",
				"pageKey"  : screenName,
		};
		baseFunctions.setSelectedRecords(redirectConfig);
	});
}
baseFormElements.dropdownRefreshAction = function(dataName,elemWrapper,formElement){
	$(document).undelegate(elemWrapper,"click");
	$(document).delegate(elemWrapper,"click",function(){
		var ajaxUrl = SetWebApiURL + formElement.openUrl;
		$.ajax({
			url : ajaxUrl,
			dataType : "json",
			type : "post",
			cache : false,
			crossDomain : true,
			async : true,
			contentType : 'application/x-www-form-urlencoded',
			success : function(obj) {
				var formElement = obj.returnObject;
				var dropDownAction = $('#'+dataName);
				document.getElementById(dataName).innerHTML = "";
				for(var i=0; i<formElement.length; i++){
					if(formElement[i].isSelected != undefined){
						inputText 	  = formElement[i].labelKey;
						
						selectedValue = (formElement[i].isSelected == true )?true:false;
					}
					optionClone = document.createElement("option");
					$(optionClone).attr({
						"value" : formElement[i].value,
						"selected" : selectedValue,
					});
					$(optionClone).html(formElement[i].labelKey);
					$('#'+dataName).append(optionClone);
					if(formElement[i].isSelected == true){
						inputVal = formElement[i].value;
					}
					dropDownAction.selectpicker('refresh');
				}
				return true;
			}
		});
	});
}

baseFormElements.generate_temp_label = function(divId,labelKey){
	var titleName = i18NCall(labelKey);
	var inputHTML  = titleName;
	
	inputHTML  = $(ele_view_label).appendTo(mainWrapper).find("label").attr({
						"for"    : labelKey
					}).text(inputHTML);
	
}

baseFormElements.generate_list = function(formId,formElement){
	var listValues = formElement.defaultValue;
	$(formElementList).appendTo(mainWrapper)
	for(i=0;i<listValues.length;i++){
		$(formId).find('ul.config-list').append('<li>'+ listValues[i].value +'</li>');
	}
}

})(window.baseFormElements = window.baseFormElements || {}, jQuery);