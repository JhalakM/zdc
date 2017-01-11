/* function to generate footer */
(function(baseFooter, $, undefined) {

	baseFooter.generateFooter = function(){
		$(footer_element).insertAfter(selector_content_section);
		if(getCookie("version")){
			$("footer .version").text(getCookie("version"));
		}
		if(getCookie("environment")){
			$("footer .environment").text(getCookie("environment"));
		}
	}

})(window.baseFooter = window.baseFooter || {}, jQuery);