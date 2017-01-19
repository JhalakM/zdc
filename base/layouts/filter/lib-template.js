var notification_msg_block									= '<div class="ui-alert alert fade in clearfix">'+
																'<div class="alert-icon"><img class="alert-msg-icon" alt="error icon" src="" /></div>'+
																'<div class="alert-text">'+
																	'<p class="alert-msg">&nbsp;</p>'+
																'</div>'+
																'<div class="close-icon">'+
																	'<a aria-label="close" data-dismiss="alert" class="close" href="#">&times;</a>'+
																'</div>'+
															 '</div>';

var global_lighbox_block = '<div class="global-lightbox-wrapper col-md-12"></div>';

var ajaxLoader 												= '<div id="mask" class="maskfixed">'+
																'<div id="loader"> </div>'+
															'</div>';
															
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
															
var accordionAction 									= '<div class="accordion-action"><a href="javascript:;" class="de-expand-all tooltip-top" style="display: none;">de-expand</a><a href="javascript:;" class="expand-all tooltip-top" style="display: block;">expand</a></div>';


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
//button elements variables
var btn_normal 												= '<button class="uie-btn uie-btn-primary">Generate Form</button>';
var btn_reset 												= '<button class="uie-btn uie-secondary-btn">Reset</button>';
var btn_cancel 												= '<button class="uie-btn uie-secondary-btn">Cancel</button>';
																'<span class="svg" data-svg="svg-filter" aria-hidden="true"></span>'+
															 '</button>';
var btn_filter 												= '<button class="uie-primary-button margin-5 uie-button uie-icon-btn" type="button">'+
																'<span class="btn-icon"><span class="svg" data-svg="svg-filter"></span></span>'+
																	'<div class="btn-value"></div>'+
															 '</button>';
														  
var apply_filter_button         							= '<button type="submit" class="uie-btn uie-primary-button uie-icon-btn filter-submit" > <span class="btn-icon"><img alt="Filter" src="base/img/icons/filter-white.svg"></span>'+
																'<div class="btn-value">'+i18NCall("filter_label_title")+' </div>'+
															 '</button>';
															 
															 
// form elements variables

var divClone = '<div></div>';
var div_col_md_6 = '<div class="form-row col-md-6 clearfix"></div>';
var div_form_col_2 = '<div class="form-col-2"></div>';
var div_col_md_12 = '<div class="center-btn col-md-12 clearfix"></div>';
var div_lightbox_col_md_12 = '<div class="form-row col-md-12 clearfix"></div>';
var div_clearfix = '<div class="clearfix"></div>';

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

//Filter variables
var filter_dropdown = '<div class="dropdown-list-menu">'
		+ '<select class="selectpicker"></select>' + '</div>';

var filter_presaved_block = '<div class="form-row clearfix">'
		+ '<div class="filter-label-title">'
		+ '<label class="label">'
		+ i18NCall("filter_label_title")
		+ '</label>'
		+ '</div>'
		+ '<div class="no-padding col-md-3 col-sm-10 col-xs-9 presaved-filters"></div>'
		+ '</div>';

var filter_elements_block = '<div class="form-row clearfix filter-element">'
		+ '<div class="filter-label">'
		+ '<label class="label">Type :</label>'
		+ '</div>'
		+ '<div class="no-padding margin-5 col-md-3 col-sm-5 col-xs-5 filter-operators"></div>'
		+ '<div class="no-padding margin-5 pull-left col-md-3 col-sm-3 col-xs-3 filter-searchvalue"></div>'
		+ '<div class="no-padding margin-5 pull-left filter-state">'
		+ '<div class="switch">'
		+ '<input type="radio" class="switch-input switch-input-on">'
		+ '<label class="switch-label switch-label-off">ON</label>'
		+ '<input type="radio" class="switch-input switch-input-off">'
		+ '<label class="switch-label switch-label-on">OFF</label>'
		+ '<span  class="switch-selection"></span>' + '</div>'
		+ '<div class="delete-filter-row">' + '<a href="javascript:void(0);">'
		+ i18NCall("deletes.records.link.label") + '</a>' + '</div>' + '</div>'
		+ '</div>';

var filter_create_block = '<div id="filter-create-form-block" class="modal fade" role="dialog"  tabindex="-1">'
		+ '<div class="modal-dialog">'
		+ '<div class="modal-content terms-conditions-text">'
		+ '<div class="modal-header">'
		+ '<button type="button" class="close" data-dismiss="modal">&times;</button>'
		+ '<h4 class="modal-title">'
		+ i18NCall("create_filter_title")
		+ '</h4>'
		+ '</div>'
		+ global_lighbox_block
		+ '<div id="modal-filter-create-form-content" class="modal-filter-create-form-content element-sec clearfix">'
		+ '<form>'
		+ '<div class="form-row col-md-12 clearfix">'
		+ '<div class="form-col-1">'
		+ '<label class="label label-bold">'
		+ i18NCall("generate_filter_label")
		+ '</label>'
		+ '</div>'
		+ '<div class="form-col-2">'
		+ '<div class="p-r-5 left">'
		+ '<input type="text" name="create_filter_name" class="text-box" maxlength="30" autofocus />'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="center-btn col-md-12 clearfix">'
		+ '<button class="uie-btn uie-btn-primary" type="submit" name="btnSubmit" data-type="submit">'
		+ i18NCall("save.link.label")
		+ '</button>'
		+ '</div>'
		+ '</form>'
		+ '</div>' + '</div>' + '</div>' + '</div>';

var filter_addmore_block = '<div class="form-row clearfix addmore-options-block">'
		+ '<div class="filter-label">'
		+ '<label class="label"> </label>'
		+ '</div>'
		+ '<div class="no-padding margin-5 pull-left col-md-3 col-sm-3 col-xs-3 addmore-options"></div>'
		+ '</div>';

var filter_searched_criteria_bloack = '<div class="searched-criteria col-md-12">'
		+
		//																'<div class="searched-criteria-label"></div>'+
		'<div class="searched-criteria-text">' + '</div>' + '</div>';

var filter_block = '<div class="clearfix filter-block">'
		+ '<div class="clearfix"></div>' + '<div class="filter-wrapper">'
		+ '<form>'
		+ '<div class="filter-select col-md-12 presaved-filters-block"></div>'
		+ '</form>' + '<div class="clearfix"></div>'
		+ '<div class="form-action-field clearfix col-md-12">'
		+ '<form class="col-md-9 filter-form" id="filter_form">'
		+ '<div class="filter-elements-block"></div>'
		+ '<div class="filter-addmore-block"></div>'
		+ '<div class="filter-submit-block">'
		+ '<div class="form-btn-group clearfix">' + '</div>' + '</div>'
		+ '</form>' + '</div>' + '</div>' + '</div>';

var ele_multiple_file_upload 	= '<div class="p-r-5 input-wrapper">'
									+ '<div class="input-group ' + class_input_file + '" >'
									+ '<div class="form-control ' + class_selected_file + '">'
									+ i18NCall('') + '</div>'
									+ '<span class="input-group-addon">'
									+ '<a class="btn btn-primary" href="javascript:;" title="">'
									+ i18NCall('choose_file') + '<input title="" />' + '</a>' + '</span>'
									+ '</div>' + '</div>'
									+'<div class="form-col-3 filename">'
								    +'</div>';

var file_attach_ele 		= '<div class="col-xm-4 multiple_upload" >'+
                                 '<div class="col-md-12 p-r-5 text-box b-b-n" style="border-bottom: 1px solid #d8d8d8">'+
                                     '<div class="file-name">'+
                                         '<div class="left-file-name"></div>'+
                                         '<a class="delete-file"><img width="16" height="16" alt="panel-icon" src="base/img/icons/delete.svg">'+
                                         '</a>'+
                                     '</div>'+
                                 '</div>'+
                             '</div>';