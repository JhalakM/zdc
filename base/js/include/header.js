(function(baseHeader, $, undefined) {

	/* function to generate header */
	baseHeader.generateHeader = function(){
		$(header_element).insertBefore(selector_content_section);
		if(getCookie("userName")){
			$("header .user-text").text(getCookie("userName"));
		}
		//get formatted date on header menu
		getFormattedDate();
		//create language selection dropdown
		languageDdAction();
		
		//auto suggestion search on header menu
		baseHeader.searchDetails("#search_details","#search_container_no");	
		baseHeader.searchDetails("#search_details_mobi","#search_container_no_mobi");
	}
	
	/* do-menu action */
	baseHeader.linkDropdown = function() {
		$(".user-profile").click(function() {
			if ($(".user-profile-menu").css('display') == "none") {
				
				$(".user-profile-menu").show();
			} else {
				$(".user-profile-menu").hide();
			}
		});
		$(document).delegate(".header-top", "mouseleave", function() {
			$(document).find('.user-profile-menu').hide();
		});
	}
	
	/* do-menu action in mobile */
	baseHeader.linkDropdownMobile = function() {
		$(".action-arrow a").click(function() {
			$(".action-grp").slideToggle("slow");
		});
	}
	
	/* search Mobile view */
	baseHeader.searchSlide = function() {
		$(".mobi-search a").click(function() {
			$(".mobile-search").slideToggle("slow");
		});
	}
	
	/* auto suggestion search on header menu */
	baseHeader.searchDetails = function(searchWrapper, autoSugWrapper){
		$(searchWrapper).submit(function(){
			var col  = [];
			var item = [];
			if(!isEmpty($(this).find("input[type='text']").val())){
				var fc = "CONTAINER_NUMBER_AN";
				var fo = "LIKE";
				var fv = doTrim($(this).find("input[type='text']").val());
				var fs = "1";
				item = {filterColumnName:fc, filterOperator:fo ,filterValue:fv,filterStatus:fs };
				col.push(item);
				var myString =  jsonStringify(col);
				var ajaxURL = "";
				
				var ajaxObject = {
						"ajaxURL" : ajaxURL,
						"params" : {"filterCriteria" : myString},
						"successCallback" : function(obj){
							if(getResultCode(obj.resultCode) == CODE_SUCCESS){
								window.location.href = SetWebURL+"/"+pathValue+"/"+obj.returnObject;
							}else{
								generateMsg(obj.resultCode,obj.messageKey,global_message_wrapper,"",obj.responseDetail);
							}
						},
						"failureCallback" : function(){},
						"loader" : false
				};
				// Call Sorting API & Regenerate GRID
				ajaxCallBack(ajaxObject);
			}else{
				generateMsg(1,'validation.add.container.no.message',global_message_wrapper);
			}
			return false;
		});
		baseHeader.getSuggestionList(autoSugWrapper);
	}
	
	/* auto suggestion search on header menu */
	baseHeader.getSuggestionList = function(form_wrapper){
		
		var ajaxURL = SetWebURL+"cont/possible-values";
		$('.search-container-no').typeahead({
			 onSelect: function () {
				 setTimeout(function(){
					 $(form_wrapper).trigger("submit");
				 },100);
			 },
			 displayField: "value",
			 valueField: "columnNo",
			 scrollBar: true,
			ajax: { 
	            url: ajaxURL,
	            method : "POST",
	            triggerLength: 3,
	            preDispatch: function (query) {
	                return {
	                	containerNumber: query.toUpperCase()
	                }
	            },
	            preProcess : function (obj) {
	            	if(getResultCode(obj.resultCode) == CODE_SUCCESS){
	            		return obj.returnObject;
	            	}
	            }
	          }
		 });
	}

})(window.baseHeader = window.baseHeader || {}, jQuery);