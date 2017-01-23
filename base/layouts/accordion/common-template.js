var global_lighbox_block = '<div class="global-lightbox-wrapper col-md-12"></div>';

var header_element 											= '<header>'+
															'<section class="header-top">'+
																'<div class="block-container clearfix">'+
																	'<div class="col-md-8 no-padding">'+
																		'<div class="header-left">'+
																			'<div class="header-date"></div>'+
																			'<div class="header-time"></div>'+
																		 '</div>'+
																	 '</div>'+
																   '<div class="col-md-4">'+
																	  '<div class="header-right">'+
																		 '<div class="top-bar-menu">'+
																			'<div class="user-profile">'+
																			   '<a href="javascript:void(0);" class="user-profile-link"><span class="user-text"></span> <span class="arrow"></span></a>'+
																			  ' <div style="display: none;" class="user-profile-menu">'+
																				  '<ul>'+
																					 '<li>'+
																						'<a onclick="genLogout();" href="javascript:void(0)">'+i18NCall("logout.label")+'</a>'+
																					 '</li>'+
																					 '<li>'+
																						'<a href="/'+pathValue+'/change-password">'+i18NCall("change.password.label")+'</a>'+
																					 '</li>'+
																				  '</ul>'+
																			   '</div>'+
																			'</div>'+
																			'<div class="user-name">'+
																					'<span class="user-text-mict">'+getCookie("siteName")+'</span>'+
																			'</div>'+
																			'<div class="fav-icon">'+
																				'<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"><img src="base/img/icons/star.svg"></a>'+
																				'<ul class="dropdown-menu top-menu ">'+
//																                   '<li><a href="#"><i><img src="base/img/icons/panel-functions-icon.svg" /></i> Functions Admin</a></li>'+
																                '</ul>'+
//																				'<div class="message"><a href="javascript:void(0)"><img src="base/img/icons/notification.svg"> <span class="badge badge-danger badge-xs circle">3</span></a></div>'+
																	            '<div class="settings"><a href="'+SetWebURL+'general-setting"><img src="base/img/icons/setting-icon.svg"></a></div>'+
																            '</div>'+
																			'<div class="language">'+
																			   '<div class="dropdown-list-menu">'+
																					'<select class="selectpicker">'+i18NCall("click_me")+'</select>'+
																			   '</div>'+
																			'</div>'+
																		 '</div>'+
																	 '</div>'+
																   '<div class="mobi-search  pull-right">'+
																		'<a href="#"><img src="base/img/icons/search.svg" alt="Search"></a>'+
																	'</div>'+
																 '</div>'+
															 '</div>'+
															'</section>'+
															'<section class="menu-part clearfix">'+
															'<div class="block-container">'+
															   '<nav class="navbar navbar-default">'+
																  '<div>'+
																	 '<div class="logo-fix-width">'+
																		'<a href="home"><img src="base/img/logo.png"></a>'+
																	 '</div>'+
																  '</div>'+
																  '<div id="navbar">'+
																	 '<nav class="navbar navbar-default navbar-static-top" role="navigation">'+
																		'<div class="navbar-header">'+
																		   '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">'+
																		   '<span class="sr-only">Toggle navigation</span>'+
																		   '<span class="icon-bar"></span>'+
																		   '<span class="icon-bar"></span>'+
																		   '<span class="icon-bar"></span>'+
																		   '</button>'+
																		'</div>'+
																		'<div class="collapse navbar-collapse" id="navbar-collapse-1">'+
																		   '<div class="menu clearfix">'+
																			   '<ul class="nav navbar-nav">'+
																						'<li class="active">'+
																							'<a href="home"> <span class="home icon">&nbsp;</span>'+i18NCall("home.label")+'</a>'+
																						'</li>'+
																						'<li>'+
																							'<a href="javascript:void(0);" class="about-us"> <span class="about-us icon">&nbsp;</span>'+i18NCall("about.zodiac.label")+'</a>'+
																						'</li>'+
																						'<li>'+
																							'<a href="javascript:void(0);" class="help-call"><span class="help icon">&nbsp;</span>'+i18NCall("help.label")+'</a>'+
																						'</li>'+
																						'<li>'+
																						'<a href="javascript:void(0);" class="support"><span class="support icon">&nbsp;</span>'+i18NCall("support.label")+'</a>'+
																					'</li>'+
																					'</ul>'+
																			  '<div class="search">'+
																				'<form class="search-details" id="search_details">'+
																					 '<input type="text" placeholder="'+i18NCall("search.label")+'" id="search_container_no" autocomplete="off" class="text-box search-container-no set-uppercase" data-uppercase="true" name="containerNumber" value="">'+
																					 '<button class="search-btn" type="submit"> </button>'+
																				 '</form>'+
																			  '</div>'+
																		   '</div>'+
																		   '<div class="bradcrum-menu">'+
																			  '<ul>'+
																				 '<li class="bred_pan"></li>'+
																			  '</ul>'+
																		   '</div>'+
																		'</div>'+
																	 '</nav>'+
																  '</div>'+
															   '</nav>'+
															'</div>'+
															'</section>'+
															'<div class="mobile-top-search">'+
																'<div class="search mobile-search" style="display:none;">'+
																	'<form class="search-details" id="search_details_mobi">'+
																		'<input type="text" placeholder="'+i18NCall("search.label")+'" id="search_container_no_mobi" autocomplete="off" class="text-box search-container-no set-uppercase" data-uppercase="true" name="containerNumber" value="">'+
																		'<button class="search-btn" type="submit"> </button>'+
																	'</form>'+
																'</div>'+
															'</div>'+
															'</header>';

var fav_li 													= '<li><a href="#"><i><img src=""/></i> </a></li>';

var footer_element 											= '<footer class="footer"><div class="pull-left">'+
																year+" "+i18NCall("copyright.label")+
																'</div><div class="pull-right"><span class="version"></span> | <span class="environment"></span></div></footer>';
var right_panel     										= '<aside class="right-panel">'+ 
																'<div class="panel-block">'+
																	'<div class="panel-block-head clearfix"></div>'+
																	'<div class="panel-block-content no-padding">'+
																		'<div class="global-message-wrapper col-md-12"></div>'+
																		'<div class="panel-block-head-content no-padding"></div>'+
																		'<div class="panel-grid-main"></div>'+
																		'<div class="panel-accordion-wrapper"></div>'+
																	'</div>'+
																'</div>'+
																'</aside>';

/* Panel UI */
var panel_heading_icon    									= '<div class="panel-block-icon"><span><img src="" width="16" height="16" alt="panel-icon"/> </span></div>';
var panel_heading_title   									= '<div class="panel-block-heading">Table Example</div>';
var panel_actions_group   									= '<div class="app-action-group app-action">'+
																'<a class="drop-btn-panel" href="javascript:void(0);"></a>'+
																'<div class="panel-block-actions"></div>'+
															 '</div>'; 

var panel_actions_group_mobile       						= '<div class="mobile-action-grp-btn" style="display:none;">'+
																'<div class="action-arrow open"><a href="#"><i class="fa fa-caret-down"></i></a></div>'+
																	'<div class="action-grp">'+
																		'<div class="grid-specific clearfix">'+
																			'<p></p>'+
																			'<div class="app-action-group "></div>'+
																	'</div>'+
																	'<div class="app-specific clearfix">'+
																		'<p></p>'+
																		'<div class="app-action-group "></div>'+
																	'</div>'+
																'</div>'+
															 '</div>';


var panel_icon_action_link	 	  							= '<a class="tooltip-panel tooltip-bottom" ></a>';

var panel_accordion_list_icon								= '<font class="list-dp-menu"> </font>';

var panel_accordion_list_menu_block							= '<div class="list-dropdown-menu accordion-list-dropdown">'+
																	'<div class="position-relative">'+
																	'<div class="auto-suggestion-input">'+
																		'<input type="text" id="searchData" class="text-box test">'+
																	'</div>'+
																	'<div class="accordion-list-scroll">'+
																		'<ul>'+
																			
																		'</ul>'+
																	'</div>'+
																'</div>'+
															'</div>';

var panel_icon_range 	  									= '<a data-tooltip="'+i18NCall("range.link.label")+'"  class="tooltip-panel tooltip-bottom range" href="javascript:void(0);">'+i18NCall("range.link.label")+'</a>';
var panel_icon_filter 	  									= '<a data-tooltip="'+i18NCall("filter.link.label")+'" data-rel="app-action-form-filter" class="tooltip-panel tooltip-bottom filter" href="javascript:void(0);">'+i18NCall("filter.link.label")+'</a>';
var panel_icon_multisort  									= '<a data-tooltip="'+i18NCall("sorting.link.label")+'" class="tooltip-panel tooltip-bottom sort" href="javascript:void(0);">'+i18NCall("sorting.link.label")+'</a>';
var panel_icon_mngcolumns 									= '<a data-tooltip="'+i18NCall("manage.column.link.label")+'" class="tooltip-panel tooltip-bottom manage-col" href="javascript:void(0);">'+i18NCall("manage.column.link.label")+'</a>';
var panel_icon_add 	 	  									= '<a data-tooltip="'+i18NCall("add.link.label")+'" data-rel="app-action-form-addmore" class="tooltip-panel tooltip-bottom add-more" href="javascript:void(0);">'+i18NCall("add.link.label")+'</a>';


var desktop_sidebar 										= '<aside class="left-panel desktop-sidebar" >'+
																	'<div class="sidebar-nav"></div>'+
															  '</aside>';

var mobile_sidebar  										= '<aside class="left-panel mobile-sidebarmenu" >'+
																	'<div class="sidebar-nav"></div>'+
															 '</aside>';
var maintenance_message										= '<div class="maintenance_message">'+
																	'<div class="ui-alert alert fade in clearfix ui-alert-ui-alert-normal"><div class="alert-icon"><img class="alert-msg-icon" alt="error icon" src="base/img/icons/ui-alert-normal.svg"></div><div class="alert-text"><p class="alert-msg">This site is currently under maintenance</p></div><div class="close-icon"><a aria-label="close" data-dismiss="alert" class="close" href="#">&times;</a></div></div>'+
																'</div>';
																


var panel_grid_main_block									= '<div class="panel-grid-main"></div>';

var div_form_element 										= '<div class="upload-form">'+
																'<h2 class="panel-title"></h2>'+
															 '</div>'+
															 '<div id="batchupdate-success-records" class="hidden"></div>'+
															 '<div id="batchupdate-error-records" class="hidden"></div>';





var dashboard_main_block  									= '<div class="element-sec clearfix padding-bottom-none module-blocks"></div>';
var favorites_icon											= '<a href="javascript:void(0);" class="fav-selector"></a>';

var dashboard_module_block 									= '<div class="col-md-3">'+
																'<div class="element-block module-block">'+
																	'<a href="#">&nbsp;</a>'+
																	'<div class="module-block-icon">'+
																		'<img src="" class="image"/>'+
																		'<img src="" class="image hover"/>'+
																	'</div>'+
																	'<h3></h3>'+
																	'<p class="desc"></p>'+
																'</div>'+ 
															 '</div>';
/** content for generate error msg **/
var error_msg_block											= '<div class="ui-alert alert fade in clearfix">'+
																'<div class="alert-icon"><img class="alert-msg-icon" alt="error icon" src="" /></div>'+
																'<div class="alert-text">'+
																	'<p class="alert-msg">&nbsp;</p>'+
																'</div>'+
																'<div class="close-icon">'+
																	'<a aria-label="close" data-dismiss="alert" class="close" href="#">&times;</a>'+
																'</div>'+
															'</div>';

var notification_msg_block									= '<div class="ui-alert alert fade in clearfix">'+
																'<div class="alert-icon"><img class="alert-msg-icon" alt="error icon" src="" /></div>'+
																'<div class="alert-text">'+
																	'<p class="alert-msg">&nbsp;</p>'+
																'</div>'+
																'<div class="close-icon">'+
																	'<a aria-label="close" data-dismiss="alert" class="close" href="#">&times;</a>'+
																'</div>'+
															 '</div>';

var error_msg_block_popup 									= '<div class="error-popup">'+
																'<div class="border-box"></div>'+
																	'<div class="modal fade" id="error-popup" role="dialog"  tabindex="-1">'+
																		'<div class="modal-dialog  error-popup">'+
																			'<div class="modal-content">'+
																				'<div class="modal-header">'+
																					'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
																					'<h4 class="modal-title">'+
																						'<span class="icon">'+
																							'<img src="" width="30" class="alert-msg-icon"/>'+
																						'</span> '+
																					'<span class="error-message"></span></h4>'+
																				'</div>'+
																				global_lighbox_block+
																			'<div class="modal-body-file2 error-massage-popup"></div>'+
																			'<div class="button-text">'+
																				'<a href="#" data-dismiss="modal">'+i18NCall("ok.label")+'</a>'+
																				'<a href="#" data-dismiss="modal">'+i18NCall("cancel.label")+'</a>'+
																			'</div>'+
																		'</div>'+
																	'</div>'+
																'</div>'+
															'</div>';

var validation_error_block 									= '<div class="'+class_error_message+'" onclick="showError(this)">'+
																'<i class="error-info-icon" > <img width="16" src="" /> </i>'+
																'<span class="error-msg right-top" style="display: none;"> &nbsp; </span>'+
															  '</div>';

/** grid page **/
var batchupdate_lightbox_block 								= '<div id="batchupdate-form-block" class="modal fade" role="dialog"  tabindex="-1">'+
																	'<div class="modal-dialog">'+
																		'<div class="modal-content terms-conditions-text">'+
																			'<div class="modal-header">'+
																				'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
																				'<h4 class="modal-title">&nbsp;</h4>'+
																			'</div>'+
																			global_lighbox_block+
																			'<div id="modal-batchupdate-form-content" class="modal-batchupdate-form-content">'+
																			'</div>'+
																		'</div>'+
																	'</div>'+
																'</div>';

var modal_back_overlay_block								= '<div class="modal-backdrop fade in">&nbsp;</div>';


var alert_lightbox_block 									= '<div id="alert-lightbox-block" class="modal fade" role="dialog"  tabindex="-1">'+
																	'<div class="modal-dialog genral-popup">'+
																		'<div class="modal-content terms-conditions-text">'+
																			'<div class="modal-header">'+
																				'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
																				'<h4 class="modal-title">&nbsp;</h4>'+
																			'</div>'+
																			global_lighbox_block+
																			'<div id="modal-inner-content" class="modal-inner-content"></div>'+
																		'</div>'+
																	'</div>'+
															'</div>';

var ajaxLoader 												= '<div id="mask" class="maskfixed">'+
																'<div id="loader"> </div>'+
															'</div>';

var modalNavigationPopup 										= '<div class="modal-dialog alert-popup" style="display:none; cursor: default"><div class="normal-alert">'+
																'<div class="modal-header">'+
																	'<div class="alert-icon-popup"><img src="base/img/icons/warning.svg" width="20">'+	
																		'<h4> &nbsp;</h4>'+ 
																	'</div>'+
																	'<button type="button" class="close" data-dismiss="modal" onclick="$.unblockUI();">&times;</button>'+
																'</div>'+
																'<div class="alert-btn-popup">'+
																	'<div class="message-desc">&nbsp;</div>'+
																	'<input class="uie-btn uie-btn-primary" type="button" id="yes" value="Stay In Page" />'+ 
																	'<input class="uie-btn uie-btn-primary" type="button" id="no" value="" />'+ 
																'</div>'+
																'</div> ';


var modalDialogPopup 										= '<div class="modal-dialog alert-popup" style="display:none; cursor: default"><div class="normal-alert">'+
																	'<div class="modal-header">'+
																		'<div class="alert-icon-popup"><img src="base/img/icons/warning.svg" width="20">'+	
																			'<h4> &nbsp;</h4>'+ 
																		'</div>'+
//																		'<button type="button" class="close" data-dismiss="modal" onclick="$.unblockUI();">&times;</button>'+
																	'</div>'+
																	'<div class="alert-btn-popup">'+
																		'<div class="message-desc">&nbsp;</div>'+
																		'<input class="uie-btn uie-btn-primary" type="button" id="yes" value="Yes" />'+ 
																		'<input class="uie-btn uie-btn-primary" type="button" id="no" value="No" />'+ 
																	'</div>'+
															'</div>';

var modalNavigationPopup 										='<div class="modal-dialog alert-popup" style="display:none; cursor: default"><div class="normal-alert">'+
																'<div class="modal-header">'+
																	'<div class="alert-icon-popup"><img src="base/img/icons/warning.svg" width="20">'+	
																		'<h4> &nbsp;</h4>'+ 
																	'</div>'+
//																	'<button type="button" class="close" data-dismiss="modal" onclick="$.unblockUI();">&times;</button>'+
																'</div>'+
																'<div class="alert-btn-popup">'+
																	'<div class="message-desc">&nbsp;</div>'+
																	'<input class="uie-btn uie-btn-primary" type="button" id="stay" value="Stay on This Page" />'+ 
																	'<input class="uie-btn uie-btn-primary" type="button" id="leave" value="Leave without Saving" />'+ 
																'</div>'+
															'</div>';



var modalAlertDialogPopup 									= '<div class="modal-dialog alert-popup" style="display:none; cursor: default"><div class="normal-alert"">'+
																	'<div class="modal-header">'+
																		'<div class="alert-icon-popup"><img src="base/img/icons/error.svg" width="20">'+	
																			'<h4> &nbsp;</h4>'+ 
																		'</div>'+
																		//'<button type="button" class="close" data-dismiss="modal" onclick="$.unblockUI();">&times;</button>'+
																	'</div>'+
																	'<div class="alert-btn-popup">'+
																		'<p>&nbsp;</p>'+
																		'<input class="uie-btn uie-btn-primary" type="button" id="ok" value="'+i18NCall("ok.label")+'" />'+ 
																	'</div>'+
															'</div></div> ';
			
var modalInformationAlertDialogPopup 						= '<div class="modal-dialog alert-popup" style="display:none; cursor: default"><div class="normal-alert"">'+
																'<div class="modal-header">'+
																	'<div class="alert-icon-popup"><img src="base/img/icons/warning.svg" width="20">'+	
																		'<h4> &nbsp;</h4>'+ 
																	'</div>'+
																	//'<button type="button" class="close" data-dismiss="modal" onclick="$.unblockUI();">&times;</button>'+
																'</div>'+
																'<div class="alert-btn-popup">'+
																	'<p>&nbsp;</p>'+
																	'<input class="uie-btn uie-btn-primary" type="button" id="ok" value="'+i18NCall("ok.label")+'" />'+ 
																'</div>'+
															'</div></div> ';

var modalSessionDialogPopup 								= '<div class="modal-dialog alert-popup" style="display:none; cursor: default"><div class="normal-alert"">'+
																	'<div class="modal-header">'+
																		'<div class="alert-icon-popup"><img src="base/img/icons/warning-red.svg" width="20">'+	
																			'<h4> &nbsp;</h4>'+ 
																		'</div>'+
																	'</div>'+
																	'<div class="alert-btn-popup">'+
																		'<p>&nbsp;</p>'+
																		'<input class="uie-btn uie-btn-primary" type="button" id="ok" value="'+i18NCall("ok.label")+'" />'+ 
																	'</div>'+
															'</div></div> ';

var add_more_block    		  								= '<div id="app-action-form-addmore" class="app-action-form app-action-form-block">'+
																//'<div class="clearfix"></div>'+
																'</div>';

//app-action-form-block
var edit_more_block    		  								= '<div id="app-action-form-editmore" class="app-action-form">'+
																	'<div class="clearfix"></div>'+
																'</div>';


var view_more_block    		  								= '<div id="app-action-form-viewmore" class="app-action-form app-action-form-block view-details"></div>';


var set_password_html_block 								= '<div id="app-action-form-addmore" class="app-action-form app-action-form-block element-sec clearfix">'+
																'<div class="clearfix"></div>'+
																			'<div class="upload-form">'+
																				'<h2 class="panel-title">'+i18NCall("set.password.title")+'</h2>'+
																			'</div>'+
																		'<form name="frmSetpass" class="authenticate" id="frmSetpass" method="POST" action="./change-password/update-password">'+
																		   '<div class="scroll-wrapper col-md-6 no-padding">'+
																		      '<div class="form-row col-md-12 clearfix">'+
																		         '<div class="form-col-1"><label class="label label-bold">'+i18NCall("current.password.title")+'</label></div>'+
																		         '<div class="form-col-2">'+
																		            '<div class="p-r-5 left">'+
																		               '<input type="password" data-type="password" class="text-box" data-validate="required" tabindex="1" placeholder="'+i18NCall("current.password.title")+'" name="currentPassword" autofocus maxlength = "50">'+
																		            '</div>'+
																		         '</div>'+
																		      '</div>'+
																		      '<div class="form-row col-md-12 clearfix">'+
																		         '<div class="form-col-1"><label class="label label-bold">'+i18NCall("newpassword.title")+'</label></div>'+
																		         '<div class="form-col-2">'+
																		            '<div class="p-r-5 left"><input type="password" data-type="password" class="text-box" data-validate="required,password" name="newPassword" tabindex="2" placeholder="'+i18NCall("newpassword.title")+'" maxlength = "50">'+
																		            '</div>'+
																		         '</div>'+
																		      '</div>'+
																		      '<div class="form-row col-md-12 clearfix">'+
																		         '<div class="form-col-1"><label class="label label-bold">'+i18NCall("confirm.password.title")+'</label></div>'+
																		         '<div class="form-col-2">'+
																		            '<div class="p-r-5 left"><input type="password" data-type="password" class="text-box" data-validate="required,matchInput" data-match="newPassword" name="confirmPassword" tabindex="3" placeholder="'+i18NCall("confirm.password.title")+'" maxlength = "50">'+
																		            '</div>'+
																		         '</div>'+
																		      '</div>'+
																		      '<div class="form-row col-md-12 clearfix" id="captcha_generate">'+
															                    '</div>'+
																		      '<div class="clearfix"></div>'+
																		   '</div>'+
																		   '<div class="clearfix"></div>'+
																		   '<div class="center-btn col-md-6 clearfix">'+
																				'<button class="uie-btn uie-btn-primary" type="submit" name="btnSubmit" data-type="submit" tabindex="15">Set Password</button>'+
																				'<button class="uie-btn uie-secondary-btn" type="reset" name="btnReset" tabindex="16">Reset</button>'+ 
																			'</div>'+
																		'</form>'+
																'</div>';

var rest_password_ok_button_block							='<div class="center-btn col-md-12 clearfix padding-bottom">'+
																'<button class="uie-btn uie-btn-primary" id="ok" tabindex="106">'+i18NCall("ok.label")+'</button>'+
																'</div>';	

var selected_record_block									= '<div class="selected-records"></div>';


var hook_accordion_block									= '<div class="panel-grid-main"><div class="col-md-12 p-bottom-20">'+
																 '<div class="accordion col-md-12">'+
																 '</div>'+
																' </div></div>'+
																'<div class="clearfix"></div>';

var accordion_main_block 									= '<div>'+
																'<div class="accordion"></div>'+
																'</div>';

var accordion_panel											='<section class="accordion-panel clearfix">'+
																'<div class="accordion-header">'+
																'<div class="accordion-title"><h3></h3><span class="arrow-span"><i></i></span></div>'+
																'<div class="accordion-actions"></div>'+
																'</div>'+
																'<div class="accordion-content ">'+ //col-md-12
																'</div>'+
															'</section>';

var accordion_content_panel								    ='<section class="accordion-content-wrapper clearfix">'+
																	'<div class="accordion-form-wrapper"></div>'+
																	'<div class="accordion-filter-wrapper"></div>'+
																	'<div class="accordion-grid-wrapper"></div>'+
																	'<div class="accordion-section-wrapper"></div>'+
															'</section>';


var hook_table											    ='<div class="table-record">'+
																'<table class="table-grid fixed">'+
																	'<thead>'+
																	'<tr></tr>'+
																	'</thead>'+
																	'<tbody>'+
																	'</tbody>'+
																'</table>'+
																'</div>';
var table_th												= '<th><span class="table-title">Site</span></th>';
var table_td												= '<td>'+
																'<div class="row-details"></div>'+
																'</td>';
var version_envor											='<div class="col-md-12">'+
																'<div class="pull-right version-zara">'+
																'</div>'+
																'<div class="clearfix"></div>'+
																'</div>'+
															'<div class="clearfix"></div>';
var new_dashboard_block								   = '<section id="dashboard-panel"><div class="masonry-grid"></div></div>';
var dashboard_group_block 						       = '<div class="dash-content col-md-3 no-padding">'+
															'<div class="col-md-12 dashboard-group-title">'+
																'<div class="nav-title row">'+
																	'<span>Admin</span><i class="nav-icon"><img src="base/img/icons/panel-admin.svg" width="16px" height="16px" /></i>'+
																'</div>'+
															 '</div>'+
															 '<div class="dash-box"></div>'+
															'</div>';

var dashboard_box_block								   ='<div class="dash-icon-box no-padding">'+
															'<div class="content-box">'+
															'<a href="container.html"></a>'+
															'<div class="module-block-icon"><img src="base/img/icons/securityadmin.svg" class="image"><img src="base/img/icons/securityadmin-hover.svg" class="image hover"></div>'+
															'<h3>Detail page</h3>'+
															'</div>'+
														'</div>';

//button elements variables
var btn_normal 												= '<button class="uie-btn uie-btn-primary">Generate Form</button>';
var btn_reset 												= '<button class="uie-btn uie-secondary-btn">Reset</button>';
var btn_cancel 												= '<button class="uie-btn uie-secondary-btn">Cancel</button>';
var btn_disable 											= '<button class="uie-btn uie-primary-disable" type="button">Disable</button>';
var btn_error 												= '<button class="uie-btn uie-primary-error" type="button">Error</button>';
var btn_warning 											= '<button class="uie-btn uie-primary-warning" type="button">Warning</button>';
var btn_normal_large 										= '<button class="uie-btn uie-primary-large-button" type="button">'+
																'<span class="svg" data-svg="svg-filter" aria-hidden="true"></span>'+
															 '</button>';
var btn_filter 												= '<button class="uie-primary-button margin-5 uie-button uie-icon-btn" type="button">'+
																'<span class="btn-icon"><span class="svg" data-svg="svg-filter"></span></span>'+
																	'<div class="btn-value"></div>'+
															 '</button>';
														  
var apply_filter_button         							= '<button type="submit" class="uie-btn uie-primary-button uie-icon-btn filter-submit" > <span class="btn-icon"><img alt="Filter" src="base/img/icons/filter-white.svg"></span>'+
																'<div class="btn-value">'+i18NCall("filter_label_title")+' </div>'+
															 '</button>';

var action_select_records									= '<div class="select-record-status hide">'+
																'<p></p>'+
																'<div class="radio-btn">'+
																    '<input type="radio" id="radio" name="selectRecordAction" value="1" >'+
																    '<label for="radio" class="redio-btn-string"><span><span></span></span>All Records matched the filter Criteria</label>'+
																    '<div class="searched-criteria-text-popup searched-criteria-text-show"></div>'+
																'</div>'+	
																'<div class="clearfix"></div>'+
																	'<div class="radio-btn">'+
																        '<input type="radio" id="radio1" name="selectRecordAction" value="2">'+
																        '<label for="radio1"><span><span></span></span> Selected  Records on the Page </label>'+
																    '</div>'+
																'</div><div class="clearfix"></div>';

var succses_string_block 								= '<div class="succses-string m-t-15"><p></p><div>';

var accordionAction 									= '<div class="accordion-action"><a href="javascript:;" class="de-expand-all tooltip-top" style="display: none;">de-expand</a><a href="javascript:;" class="expand-all tooltip-top" style="display: block;">expand</a></div>';

var expand_accordion 			    					= '<a href="javascript:;" class="expand-all tooltip-top" style="display: block;">expand</a>';

var scroll			                                    = '<div class="scroll-actions"><a href="javascript:;" class="scrollup" style="display: none;">Scroll</a></div>';

var accordion_section_block    		  					= '<div class="col-md-6 section-block">'+
																'<div class="group-row no-padding-top">'+
																	'<div class="group-label">'+
																	'</div>'+
																	'<div class="clearfix separator">'+
																	'</div>'+
																	'<div class="col-md-12 text-align-left accordion-section"></div>'+
																		'<div style="display: none;" class="p-r-5 left">'+
																                 '<input class="text-box" name="visit" tabindex="1" data-type="text" type="text">'+
																             '</div>'+
																          '</div>'+
																     '</div>'+
																'</div>';

var accordion_section_content                          = '<div class="form-row col-md-12 section-content row clearfix "><div class="col-md-6 row content">'+
															'<label class="label">'+
															'</label>'+
															'</div>'+
															'<div class="col-md-6 row">'+
															'<div class="none-edittable-label">'+
															'<label class="label">'+
															'</label>'+
															'</div>'+
															'</div></div><div class="clearfix"></div>';
var div_row											= '<div class="row"></div>';

var grid_icon_action_link	 	  							= '<a class="tooltip-bottom" ></a>';
