// form elements variables
var global_lighbox_block = '<div class="global-lightbox-wrapper col-md-12"></div>';
var ajaxLoader 												= '<div id="mask" class="maskfixed">'+
																'<div id="loader"> </div>'+
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
var div_form_element 										= '<div class="upload-form">'+
																'<h2 class="panel-title"></h2>'+
															 '</div>'+
															 '<div id="batchupdate-success-records" class="hidden"></div>'+
															 '<div id="batchupdate-error-records" class="hidden"></div>';
var validation_error_block 									= '<div class="'+class_error_message+'" onclick="showError(this)">'+
																'<i class="error-info-icon" > <img width="16" src="" /> </i>'+
																'<span class="error-msg right-top" style="display: none;"> &nbsp; </span>'+
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
var modalDialogPopup 										= '<div class="modal-dialog alert-popup" style="display:none; cursor: default"><div class="normal-alert">'+
																	'<div class="modal-header">'+
																		'<div class="alert-icon-popup"><img src="base/img/icons/warning.svg" width="20">'+	
																			'<h4> &nbsp;</h4>'+ 
																		'</div>'+
																	'</div>'+
																	'<div class="alert-btn-popup">'+
																		'<div class="message-desc">&nbsp;</div>'+
																		'<input class="uie-btn uie-btn-primary" type="button" id="yes" value="Yes" />'+ 
																		'<input class="uie-btn uie-btn-primary" type="button" id="no" value="No" />'+ 
																	'</div>'+
															'</div>';
															 
var divClone = '<div></div>';
var div_col_md_6 = '<div class="form-row col-md-6 clearfix"></div>';
var div_form_col_2 = '<div class="form-col-2"></div>';
var div_col_md_12 = '<div class="center-btn col-md-12 clearfix"></div>';
var div_lightbox_col_md_12 = '<div class="form-row col-md-12 clearfix"></div>';
var div_clearfix = '<div class="clearfix"></div>';
var div_scroll_wrapper = '<div class="scroll-wrapper"></div>';
var div_group_row = '<div class="group-row"></div>'

var ele_ul = '<div>' + '<p></p>' + '<ul></ul>' + '</div>';

var ele_label = '<div class="form-col-1">' + '<label class="label"></label>'
		+ '</div>';

var ele_radio = '<div class="p-r-5 input-wrapper">'
		+ '<div class="radio-btn"></div>' + '</div>';

var ele_switch = '<div class="p-r-5 input-wrapper">'
		+ '<div class="switch"></div>' + '</div>';

var ele_datepicker_input = '<div class="p-r-5 input-wrapper">'
		+ '<div class="datepicker-row">' + '<input class="text-box" />'
		+ '</div>' + '</div>';

var ele_timepicker_input = '<div class="p-r-5 input-wrapper">'
		+ '<div class="input-append">'
		+ '<div class="text-box-icon datepicker-row">'
		+ '<input class="text-box add-on" />' + '<span class="add-on">'
		+ '<img src="base/img/icons/time-piker.svg"/>' + '</span>' + '</div>'
		+ '</div>' + '</div>';

var ele_input = '<div class="p-r-5 input-wrapper">'
		+ '<input class="text-box" />'+
		'</div>';

var ele_textarea = '<div class="p-r-5 input-wrapper">'
		+ '<textarea class="textarea-box"></textarea>' + '</div>';

var ele_file_upload = '<div class="p-r-5 input-wrapper">'
		+ '<div class="input-group ' + class_input_file + '" >'
		+ '<div class="form-control ' + class_selected_file + '">'
		+ i18NCall('no_file_selected') + '</div>'
		+ '<span class="input-group-addon">'
		+ '<a class="btn btn-primary" href="javascript:;" title="">'
		+ i18NCall('choose_file') + '<input title="" />' + '</a>' + '</span>'
		+ '</div>' + '</div>';

var ele_dropdown = '<div class="p-r-5 input-wrapper">'
		+ '<div class="dropdown-list-menu">'
		+ '<select class="selectpicker"></select>' + '</div>' + '</div>';

var ele_checkbox = '<div class="p-r-5 input-wrapper">'
		+ '<div class="checkbox"></div>' + '</div>';

var ele_label_form_row = '<div class="form-row col-md-12 clearfix no-padding">'
		+ '<div class="form-col-2">' + '<label class="label"></label>'
		+ '</div>' + '</div>';

var ele_set_empty_checkbox = '<div>'
		+ '<div class="checkbox">'
		+ '<input type="checkbox" data-type="checkbox" class="css-checkbox cb-set-empty" />'
		+ '<label class="css-label">Clear</label>' + '</div>' + '</div>';

var ele_view_label = '<div class="p-r-5">' + '<label class="label"></label>'
		+ '</div>';

var ele_manage_column = '<div>' + '<div class="column-content">'
		+ '<div class="column-body-content">' +

		'</div>' + '</div>' + '</div>';

var ele_manage_column_list_box = '<div class="columns-list-box">'
		+ '<div class="col-title">' + '<h3>'
		+ i18NCall("all.assign.group.column.label") + ': </h3>'
		+ '<a href="javascript:void(0);" class="clear-all clear-all-link">'
		+ i18NCall("clear.link.label") + '</a>' + '</div><div class="clearfix"></div>'
		+ '<div class="p-r-5 input-wrapper">'
		+ '<ul class="columns-list-item scroll" data-scroll="true"></ul>'
		+ '</div>' + '</div>';

var ele_manage_column_buttons = '<div class="columns-center-btn">'
		+ '<div class="columns-vertical-center">'
		+ '<div class="columns-icon-center">'
		+ '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'
		+ i18NCall("tooltip.move.all.right")
		+ '" href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'
		+ i18NCall("tooltip.move.right")
		+ '" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'
		+ i18NCall("tooltip.move.left")
		+ '" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'
		+ i18NCall("tooltip.move.all.left")
		+ '" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span>'
		+ '<span class="manage-action manage-user-group hidden"><a data-rel="create-assign-group" data-tooltip="'
		+ i18NCall("tooltip.create.assign.group")
		+ '" href="javascript:void(0);" class="create-assign-group"><img width="16" src="base/img/icons/create-new-role.svg" class="image"><img width="16" src="base/img/icons/create-new-role-hover.svg" class="image hover"></a></span>'
		+ '</div>' + '</div>' + '</div>' + '</div>';
var global_lighbox_block = '<div class="global-lightbox-wrapper col-md-12"></div>';
var search_input_box 								= "<div>"+
"<input type='text' class='text-box search-container-no' autocomplete='off' placeholder='"+i18NCall("search.label")+"' >"+
"</div>";


var ele_manage_column_list_box_for_view									= '<div class="columns-list-box">'+
'<div class="col-title">'+
	'<h3>'+i18NCall("all.assign.group.column.label")+': </h3>'+
'</div>'+
	'<div class="p-r-5 input-wrapper">'+
		'<ul class="columns-list-item scroll" data-scroll="true"></ul>'+
	'</div>'+
'</div>';	