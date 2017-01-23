/*
|@author : Intech Creative Services
|@desc   : Commonly used functions to call ajax, ajax success/failure callback, exceptions etc.
*/
(function(baseFunctions, $, undefined) {
	
	
	baseFunctions.isValidJson =  function(str) {
		 try {
		        JSON.parse(str);
		    } catch (e) {
		        return false;
		}
		return true;
	},
	
	
	baseFunctions.hideMsgWrapper =  function(wrapper) {
		$(wrapper).find(".close").trigger("click");
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
	
})(window.baseFunctions = window.baseFunctions || {}, jQuery);