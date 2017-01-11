/*
|@author : Intech Creative Services
|@desc   : left sidebar panel related functions.
*/
(function(baseSidebar, $, undefined) {

	/* function for generate sidebar */
	baseSidebar.generateSidebar = function(obj){
		origHeight = $(document).height() + 100;
		var browserSidebar = $(selector_content_section).prepend(desktop_sidebar);
		var currentSidebarMode = 0;
		$(document).ready(function(){
			if($( window ).width() <= 768){
				currentSidebarMode = 1;
				baseSidebar.generateSidebarMobile(obj);
			}else{
				currentSidebarMode = 0;
				$(selector_sidebar_nav).html(' ');
				baseSidebar.generateSidebarDesktop($(selector_sidebar_nav),obj,0);
				if($(".scrollup").length != 0){
					$(".scrollup").remove();
				}
				$(scroll).insertAfter('.content-section');
				baseFunctions.scroll_expand();
			}
			baseSidebar.sidebarHeight();
		});
		$(window).bind('resize', function(e){
			if($( window ).width() <= 768){
				currentSidebarMode = 1;
				baseSidebar.generateSidebarMobile(obj);
			}else if($( window ).width() > 768 && currentSidebarMode == 1){
				currentSidebarMode = 0;
				$(selector_left_panel).remove();
				browserSidebar = $(selector_content_section).prepend(desktop_sidebar);
				baseSidebar.generateSidebarDesktop($(selector_sidebar_nav),obj,0);
				$(scroll).insertAfter('.desktop-sidebar');
				baseFunctions.scroll_expand();
			}
			baseSidebar.sidebarHeight();
		});
		/*$(window).bind('scroll', function(e){
			if($(".panel-block-content").height() > $(window).height()){
				var pHeight = $(".panel-block-content").outerHeight() + $(".right-panel").outerHeight() + 20; 
				baseSidebar.sidebarHeight(pHeight);
			}else{
				baseSidebar.sidebarHeight(origHeight);
			}
		});*/
		$(document).delegate(".app-action-group a","click touchend",function() {
			hideMessageWrapper();
			$(window).trigger("resize");
		});
	}
	
	/* function for generate sidebar in mobile screen */
	baseSidebar.generateSidebarMobile = function(obj){
		var divHTML  = "";
		//var browserSidebar = "";
		$(selector_left_panel).remove();
		browserSidebar = $(selector_content_section).prepend(mobile_sidebar);
		$.each(obj, function(index , value){
			var divClone = document.createElement(selector_div);
			var aClone  = document.createElement(selector_a); 
			var iconName=value.a_icon;
			var iconName_text=iconName.replace(".svg","");
			var iconName_hover_text=iconName_text+"-hover";
			var iconName_hover=iconName.replace(iconName_text,iconName_hover_text);
			var aimg_clone_html='<img class="image" src="base/img/icons/'+iconName+'" alt="'+iconName_text+'" />'+
							 '<img class="image hover" src="base/img/icons/'+iconName_hover+'" alt="'+iconName_hover_text+'" />'+
							 '<span class="module_title">'+i18NCall(value.a_tooltip)+'</span>';
			value.li_class = value.isActive == true? value.li_class + " active" : value.li_class; 
			 divHTML = $(divClone).attr({
				"class" : value.li_class
			}).append($(aClone).html(aimg_clone_html).attr({
				"class" 		: value.a_class,
				"data-tooltip"  : i18NCall(value.a_tooltip),
				"href" 			: (value.isAjaxReq == true)?"javascript:void(0);":value.a_href,
				"data-ajaxReq"  : value.isAjaxReq,
				"rel"  			: value.a_href,
				"data-newWindow" : value.isNewWindow
			})).addClass(class_sidebar_link);
			
			 $(browserSidebar).find(selector_sidebar_nav).append(divHTML);
		});
		
		baseSidebar.sidebarMobile();
	}
	
	/* function for generate sidebar in web layout */
	baseSidebar.generateSidebarDesktop = function(parent, menu, level,inner_class) {
		baseSidebar.sidebarMultiLevelMenu(parent, menu, level,inner_class);
	}
	
	/* function for generate n-level menu */
	baseSidebar.sidebarMultiLevelMenu = function(parent, menu, level,inner_class){
		
		if(inner_class == undefined || inner_class == ''){
			inner_class = 'side-bar-sub-menu sidebar-link';
		}
	    for(var i = 0;i < menu.length; i++) {
	    	
	    	var iconName=menu[i].a_icon;
			var iconName_text=iconName.replace(".svg","");
			var iconName_hover_text=iconName_text+"-hover";
			var iconName_hover=iconName.replace(iconName_text,iconName_hover_text);
			var imageUrl = "base/img/icons/"+iconName;
			var imageHoverUrl = "base/img/icons/"+iconName_hover;
			
			
			var icon = getImagePath("base/img/icons/"+iconName,"");
			var icon_hover = getImagePath("base/img/icons/"+iconName_hover,"hover");
			
			/*var aimg_clone_html='<img class="image" src="base/img/icons/'+iconName+'" alt="'+iconName_text+'" />'+
							 '<img class="image hover" src="base/img/icons/'+iconName_hover+'" alt="'+iconName_hover_text+'" />';*/
			
			var aimg_clone_html='<img class="image" src="'+icon+'" alt="'+iconName_text+'" />'+
			 '<img class="image hover" src="'+icon_hover+'" alt="'+iconName_hover_text+'" />';
			
			menu[i].li_class = menu[i].isActive == true? menu[i].li_class + " active" : menu[i].li_class; 
			menu[i].a_href = (menu[i].isAjaxReq == true)?"javascript:void(0);":menu[i].a_href;
	    	var submenu = parent.append("<div class='"+menu[i].li_class.toLowerCase()+" "+inner_class+"' data-level='"+level+"'>" +
	    			"<a class='"+menu[i].a_class+"' data-tooltip='"+i18NCall(menu[i].a_tooltip)+"' href='"+menu[i].a_href+"' rel='"+menu[i].a_href+"' data-ajaxReq='"+menu[i].isAjaxReq+"' data-newWindow = '"+menu[i].isNewWindow+"'>"+aimg_clone_html+"</a></div>").find("div:last");
	    	        
	    	if(menu[i].submenu != undefined && menu[i].submenu.length > 0) {
	        	$(submenu).addClass("sidebar-submenu");
	        	if(inner_class == 'side-bar-sub-menu sidebar-link'){
	        		swap_inner_class = "side-bar-sub-menu-link sidebar-link";
	        	}else{
	        		swap_inner_class = "side-bar-sub-menu sidebar-link";
	        	}
	        	submenu = submenu.append('<div class="sidebar-sublink submenuLevel-' + (level + 1) + '"></div>').find("div");
	        	baseSidebar.sidebarMultiLevelMenu(submenu, menu[i].submenu, level + 1,swap_inner_class);
	        }
	    }
	}
	
	/* function for set sidebar height */
	baseSidebar.sidebarHeight= function(origHeight) {
		/*if(screenName == "dashboard"){
			origHeight = $(".panel-block-content").height() + 100;
		}
		if ($(window).width() >= 180) {
			var sideHeight = (origHeight != undefined)?origHeight:($(document).height() - 140);
			$(".desktop-sidebar").css("min-height",sideHeight + "px");
		} else {
			var sideHeight = (origHeight != undefined)?origHeight:$(document).height();
			$(".desktop-sidebar").css("height", sideHeight + "px");
		}*/
	}
	
	/* function for configure sidebar navigation plugin in mobile screen */
	baseSidebar.sidebarMobile = function() {
		/*$(window).bind('resize', function(e){
			if($( window ).width() <= 768){
				if($(window).width() < ($(".sidebar-link").length * 100))
				 {
					console.log(":>"+$(".sidebar-nav").data('owlCarousel'));
				    $('.sidebar-nav').owlCarousel({
					   margin : 0,
					   loop : false,
					   autoWidth : true,
					   navigation : false,
					   responsive : true,
					   nav : true,
					   items : 5,
				    });
				 }else{
					 $(".sidebar-nav").find('.next').remove();
				   	 $(".sidebar-nav").find('.prev').remove();
				 }
			}
		});*/
		if($(window).width() < ($(".sidebar-link").length * 100))
		 {
		    $('.sidebar-nav').owlCarousel({
			   margin : 0,
			   loop : true,
			   autoWidth : true,
			   navigation : false,
			   responsive : true,
			   nav : true,
			   items : 5
		    });
		 }
		
	}
})(window.baseSidebar = window.baseSidebar || {}, jQuery);