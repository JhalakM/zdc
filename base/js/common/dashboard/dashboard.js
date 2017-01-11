/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/  
$(document).ready(function(){
	screenName = commonDashboard.moduleArray.list.pageKey;
	pageName = "";
	getFucnName = commonDashboard.moduleArray.list.functionName;
	
	frameworkInitReady("commonDashboard.generateModule")
});   
$(window).load(function(){
	frameworkInitLoad()
});

function frameworkInitReady(generateSuccessCallback){
	checkAuthentication();
	languagePlugin(current_lang);
	
	basePanel.generatePanelAjax(generateSuccessCallback);
	baseHeader.linkDropdown();
	baseHeader.searchSlide();
	basePanel.appActionBlock();
	resetData();
	basePanel.mobileScreenIcons();
}
function frameworkInitLoad(){
	startTime();
	dropdownScroll();
	basePanel.actionBtnHeight();
	if(isSet(accordionConfigs) && isSet(accordionConfigs.accordion) && accordionConfigs.accordion.length > 0){
		  baseFunctions.generateAccordionListMenu(accordionConfigs.accordion);
		  baseFunctions.accordion_action();
	}
	setTimeout(function(){
		baseFunctions.defaultOpenAccordion();	
		unblockUI("body");
	},1000);
}