/*
|@author : Intech Creative Services
|@desc   : Commonly used functions to call ajax, ajax success/failure callback, exceptions etc.
*/
(function(baseFunctions, $, undefined) {
	baseFunctions.hideMsgWrapper =  function(wrapper) {
		$(wrapper).find(".close").trigger("click");
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
		
	}
	
	baseFunctions.defaultOpenAccordion =  function() {
	    $(".openAccordionClass").each(function() {
	    	$(this).find(".accordion-panel h3").trigger("click");
	    });
	}
	
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
	}
	
	baseFunctions.dateTimePicker =  function(timePicId,hourFormat) {
		$(timePicId).datetimepicker({
	        pickDate: false,
	        pick12HourFormat: hourFormat
	  });
	}
	
})(window.baseFunctions = window.baseFunctions || {}, jQuery);