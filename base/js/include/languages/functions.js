/*
|@author : Intech Creative Services
|@desc   : Commonly used functions to call ajax, ajax success/failure callback, exceptions etc.
*/
(function(baseFunctions, $, undefined) {
	/* function to generate dynamic dropdwn for language and set language on dropdown change */
	baseFunctions.languageDdAction = function(wrapper){
		if(wrapper == undefined)
			wrapper = ".language";
		
		var languages = {
				"zh-cn" : i18NCall("lang_chinese_title"),
				"en-us" : i18NCall("lang_english_title")
				//"zh-tw" : "French"
		};
		selLang = (!cookieLang)?"en-us":cookieLang;
		$.each(languages,function(index,value){
			var liClone = document.createElement("option");
			var selectedValue = false;
			if(selLang == index){
				selectedValue = true;
			}
			$(liClone).attr({
				"value" : index,
				"selected" : selectedValue
			}).html(value);
			$(wrapper).find("select:first").prepend(liClone);
		});
		
		$(".language select").change(function(){
			setCookie("lang",$(this).val(),1);
			location.reload();
		});
	}
	
})(window.baseFunctions = window.baseFunctions || {}, jQuery);