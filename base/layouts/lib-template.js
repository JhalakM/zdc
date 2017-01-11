// form elements variables

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

var ele_manage_column_list_box_for_view									= '<div class="columns-list-box">'+
'<div class="col-title">'+
	'<h3>'+i18NCall("all.assign.group.column.label")+': </h3>'+
'</div>'+
	'<div class="p-r-5 input-wrapper">'+
		'<ul class="columns-list-item scroll" data-scroll="true"></ul>'+
	'</div>'+
'</div>';	

// GRID TEMPLATE 

var grid_popup_block	 									= '<div id="grid-popup-block" class="modal fade grid-popup-block" role="dialog">'+
'<div class="modal-dialog">'+
	'<div class="modal-content terms-conditions-text">'+
		'<div class="modal-header">'+
			'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
			'<h4 class="modal-title">&nbsp;</h4>'+
		'</div>'+
		global_lighbox_block+
		'<div class="clearfix"></div>'+
		'<div id="modal-gridpopup-form-content" class="modal-gridpopup-form-content">'+
		'</div>'+
	'</div>'+
'</div>'+
'</div>';

var pagination_block		    							= '<div class="pagination-block top-pagination clearfix"></div><div class="clearfix"></div>';

var pagination_bottom_block	    							= '<div class="pagination-block bottom-pagination"></div><div class="clearfix"></div>';

var pagination_options 										= '<div class="dropdown-list-menu">'+
'<select class="form-control selectpicker"></select>'+
'</div>';

var grid_pagination_wrapper 								= '<div class="pages-info">'+
'<div class="page-options">'+
  '<span>{{pagination.page}}</span>'+ 
	  '<a href="javascript:void(0);" class="prev-page"><img alt="prvious" src="base/img/icons/arrow-left.svg"></a>'+
		   "@@pagination_option@@"+
		'<a href="javascript:void(0);" class="next-page"><img alt="prvious" src="base/img/icons/arrow-right.svg"></a>' + 
	'<span>{{pagination.page_of}} ##total_pages## </span>'+
'</div>' +
'<div class="page-record-options"><span>{{pagination.page_view}}</span>' +  												   
		"@@pagination_option_records@@"+
	'<span>{{pagination.page_records}}</span>'+
'</div>'+
'<div class="page-total-records">'+
	' {{pagination.page_records_found}}'+
'</div>'+
'</div>'+
'</div>';

var selected_records_block 									= '<div class="page-selected-records hidden"></div>';

var grid_actions_wrapper 									= '<div class="grid-action-group"></div>';

var pagination_sections 	    							= '@@pagination_option@@|@@pagination_option_records@@|##total_pages##|{{pagination.page}}|{{pagination.page_of}}|{{pagination.page_view}}|{{pagination.page_records}}|{{pagination.page_records_found}}|##total_records##';

var grid_block          									= '<div class="table-record"></div>';

var action_row_checkbox 									= '<td default-color="#FFFFFF"><div class="checkbox  setempty">'+
'<input  class="css-checkbox" type="checkbox" />'+
'<label class="css-label"></label>'+
'</div></td>';

var action_column_checkbox 									= '<th class="rep-action checkbox-col" width="55">'+
'<span class="checkbox">'+
  '<input type="checkbox" id="check-all" class="css-checkbox-all css-checkbox" />'+
  '<label  class="css-label" for="check-all"></label>'+
'</span>'+
'</th>';
var action_column_view_header 								= '<th class="rep-action checkbox-col" width="55">'+
'<div class="set-table-pos">'+
'<span class="table-title">'+i18NCall('view.label')+'</span>'+
'<div class="bo-bottm"></div>'+
'</div>'+
'</th>';

var action_column_view_icon									= '<td class="view-icon">'+
'<a href="javascript:void(0);"><img class="image" src="base/img/icons/view.svg" width="16"></a>'+
'</td>';

var table_grid 												= '<table class="table-grid fixed"><thead></thead><tbody></tbody></table>';

//Column Configuration
var serial_td_column  										= '<td></td>';
var serial_th_column  										= '<th></th>';
var expand_td_column  										= '<td class="more-field-show"><a href="javascript:void(0);" class="expand-data"><span class="expand-arrow"></span></a></td>';
var expand_th_column  										= '<th class="more-field-show" width="55"><span class="collapse-icon"><span class="up"></span><span class="down"></span></span></th>';
var th_column_holder  										= '<div class="set-table-pos"><span class="table-title"></span> <div class="bo-bottm"></div></div>';

//Sorting variables
var sorting_element               							= '<span class="sort-icon"></span>';
var sorting_order                       					= '<span class="sorting-order"></span>';
var asc_sortings_img                       					= '<img class="asc-img" src="base/img/icons/asc-icon.svg">';
var desc_sortings_img                       				= '<img class="desc-img" src="base/img/icons/desc-icon.svg">';
var null_sortings_img                       				= '<img class="desc-img" src="base/img/icons/sort-icon.svg">';

var grid_collapse_block         							= '<tr class="toggle-plus-div" role="row">'+
'<td colspan="6" class="addContent">@@expandable_columns@@</td>'+
'</tr>';

var grid_collapse_inner         							= '<div column-no="4" class="expand-contents">'+
'<label>Setting Type: </label>'+
'<span class="clickToEdit">SYSTEM</span>'+
'</div>';
//
var grid_manage_columns 									= '<div class="modal fade" id="manage-columns" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog  manage-columns">'+
	'<div class="modal-content">'+
		'<div class="modal-header">'+
			'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
			'<h4 class="modal-title">'+i18NCall("add.remove.column.label")+'</h4>'+
		'</div>'+
		global_lighbox_block+
		'<div class="modal-body-content">'+
			'<div class="columns-list-box">'+
				'<div class="col-title">'+
					'<h3>'+i18NCall("all.column.label")+': </h3>'+
					'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
				 '</div>'+
				 '<ul class="columns-list-item scroll" data-scroll="true" id="all-columns"></ul>'+
			'</div>'+
		'<div class="columns-center-btn">'+
			'<div class="columns-vertical-center">'+
				'<div class="columns-icon-center">'+
				'<div class="columns-icon-left">'+
					'<span class="manage-action">'+
						'<a href="javascript:void(0);" data-tooltip="'+i18NCall("tooltip.move.all.right")+'" data-rel="next-right">'+
							'<img class="image" src="base/img/icons/next-1.svg" width="16">'+
							'<img class="image hover" src="base/img/icons/next-1-hover.svg" width="16">'+
						'</a>'+
					'</span>'+
					'<span class="manage-action">'+
						'<a href="javascript:void(0);" data-tooltip="'+i18NCall("tooltip.move.right")+'"  data-rel="next-right-single">'+
							'<img class="image columns-icon-rotate" src="base/img/icons/arrow-right-1.svg" width="16" class="columns-icon-rotate">'+
							'<img class="image hover columns-icon-rotate" src="base/img/icons/arrow-right-1-hover.svg" width="16" class="columns-icon-rotate">'+
						'</a>'+
					'</span>'+
					'<span class="manage-action">'+
						'<a href="javascript:void(0);" data-tooltip="'+i18NCall("tooltip.move.left")+'" data-rel="next-left-single">'+
							'<img  class="image columns-icon-rotate" src="base/img/icons/arrow-left-1.svg" width="16" class="columns-icon-rotate">'+
							'<img  class="image hover columns-icon-rotate" src="base/img/icons/arrow-left-1-hover.svg" width="16" class="columns-icon-rotate">'+
						'</a>'+
					'</span>'+
					'<span class="manage-action">'+
						'<a href="javascript:void(0);" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" data-rel="next-left">'+
							'<img class="image" src="base/img/icons/next.svg" width="16">'+
							'<img class="image hover" src="base/img/icons/next-hover.svg" width="16">'+
						'</a>'+
					'</span>'+
				'</div>'+
			'</div>'+
		'</div>'+
    '</div>'+
    '<div class="columns-list-box">'+
		'<div class="col-title">'+
			'<h3>'+i18NCall("visible.column.label")+': </h3>'+
				'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
		'</div>'+
			'<ul class="columns-list-item scroll" data-scroll="true" id="visible-columns"></ul>'+
    '</div>'+
		'<div class="columns-center-btn right">'+
			'<div class="columns-vertical-center">'+
				'<div class="columns-icon-left">'+
				'<div class="columns-icon-right">'+
					'<span class="manage-action">'+
						'<a href="javascript:void(0);" data-tooltip="'+i18NCall("tooltip.move.top")+'"  data-rel="next-up">'+
							'<img  class="image" src="base/img/icons/up-selected.svg" width="16">'+
							'<img  class="image hover" src="base/img/icons/up-selected-hover.svg" width="16">'+
						'</a>'+
					'</span>'+
					'<span class="manage-action">'+
						'<a href="javascript:void(0);" data-tooltip="'+i18NCall("tooltip.move.up")+'"  data-rel="next-up-single">'+
							'<img class="image" src="base/img/icons/arrow-ful-up.svg" width="16">'+
							'<img class="image hover" src="base/img/icons/arrow-ful-up-hover.svg" width="16">'+
						'</a>'+
					'</span>'+
					'<span class="manage-action">'+
						'<a href="javascript:void(0);" data-tooltip="'+i18NCall("tooltip.move.down")+'"  data-rel="next-down-single">'+
							'<img class="image" src="base/img/icons/arrow-full-down.svg" width="16">'+
							'<img class="image hover" src="base/img/icons/arrow-full-down-hover.svg" width="16">'+
						'</a>'+
					'</span>'+
					'<span class="manage-action">'+
						'<a href="javascript:void(0);" data-tooltip="'+i18NCall("tooltip.move.bottom")+'"  data-rel="next-down">'+
							'<img class="image" src="base/img/icons/down-selected.svg" width="16">'+
							'<img class="image hover" src="base/img/icons/down-selected-hover.svg" width="16">'+
						'</a>'+
					'</span>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>'+
		'<div class="columns-apply">'+
			'<div class="center-btn col-md-12 clearfix">'+
				'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
			'</div>'+
		'</div>'+
	'</div>'+
'</div>'+
'</div>'+
'</div>';


var grid_assign_roles 									= '<div class="modal fade" id="assign-role" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog  manage-columns">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
'<h4 class="modal-title"></h4>'+
'</div>'+
global_lighbox_block+
'<div class="modal-body-content">'+
'<h3></h3>'+
'<br>'+
'<div class="columns-list-box">'+
	'<div class="col-title">'+
		'<h3>'+i18NCall("all.assign.role.column.label")+': </h3>'+
		'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
	 '</div>'+
	 '<ul class="columns-list-item scroll" data-scroll="true" id="role-all-columns"></ul>'+
'</div>'+																	
'<div class="columns-center-btn available-role">'+
'<div class="columns-vertical-center">'+
    '<div class="columns-icon-center">'+
        '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'"  href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span>'+
//        '<span class="manage-action"><a data-rel="create-assign-user-role" data-tooltip="'+i18NCall("tooltip.create.assign.user.role")+'" href="javascript:void(0);" class="create-assign-user-role"><img width="16" src="base/img/icons/create-new-role.svg" class="image"><img width="16" src="base/img/icons/create-new-role-hover.svg" class="image hover"></a></span>'+
        '</div>'+
    '</div>'+
'</div>'+
'</div>'+
'<div class="columns-list-box">'+
	'<div class="col-title">'+
		'<h3>'+i18NCall("visible.assign.role.column.label")+': </h3>'+
			'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
	'</div>'+
		'<ul class="columns-list-item scroll" data-scroll="true" id="role-visible-columns"></ul>'+
'</div>'+																
'<div class="columns-apply text-right">'+
	'<div class="center-btn col-md-12 clearfix">'+
		'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
	'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

var grid_assign_users									= '<div class="modal fade" id="assign-users" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog  manage-columns">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
	'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
	'<h4 class="modal-title"></h4>'+
'</div>'+
global_lighbox_block+
'<div class="modal-body-content">'+
'<h3></h3>'+
'<br>'+
'<div class="columns-list-box">'+
		'<div class="col-title">'+
			'<h3>'+i18NCall("all.assign.users.column.label")+': </h3>'+
			'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
		 '</div>'+
		 '<ul class="columns-list-item scroll" data-scroll="true" id="user-all-columns"></ul>'+
'</div>'+																		
'<div class="columns-center-btn available-role">'+
    '<div class="columns-vertical-center">'+
        '<div class="columns-icon-center">'+
            '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span></div>'+
        '</div>'+
    '</div>'+
'</div>'+
'<div class="columns-list-box">'+
		'<div class="col-title">'+
			'<h3>'+i18NCall("visible.assign.users.column.label")+': </h3>'+
				'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
		'</div>'+
			'<ul class="columns-list-item scroll" data-scroll="true" id="user-visible-columns"></ul>'+
'</div>'+
'<div class="columns-apply text-right">'+
	'<div class="center-btn col-md-12 clearfix">'+
		'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit"  data-type="submit">'+i18NCall("apply.label")+'</button>'+
	'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

var grid_assign_services								= '<div class="modal fade" id="assign-services" role="dialog"  tabindex="-1">'+
	'<div class="modal-dialog  manage-columns">'+
	'<div class="modal-content">'+
		'<div class="modal-header">'+
			'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
			'<h4 class="modal-title"></h4>'+
		'</div>'+
		global_lighbox_block+
		'<div class="modal-body-content">'+
		'<h3></h3>'+
		'<br>'+
			'<div class="columns-list-box">'+
				'<div class="col-title">'+
					'<h3>'+i18NCall("all.assign.services.column.label")+': </h3>'+
					'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
				 '</div>'+
				 '<ul class="columns-list-item scroll" data-scroll="true" id="service-all-columns"></ul>'+
			'</div>'+
			'<div class="columns-center-btn available-role">'+
		        '<div class="columns-vertical-center">'+
		            '<div class="columns-icon-center">'+
		                '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'"   href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span></div>'+
		            '</div>'+
		        '</div>'+
	        '</div>'+
			'<div class="columns-list-box">'+
				'<div class="col-title">'+
					'<h3>'+i18NCall("visible.assign.services.column.label")+': </h3>'+
						'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
				'</div>'+
					'<ul class="columns-list-item scroll" data-scroll="true" id="service-visible-columns"></ul>'+
			'</div>'+
			'<div class="columns-apply text-right">'+
				'<div class="center-btn col-md-12 clearfix">'+
					'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>'+
'</div>'+
'</div>';

var grid_assign_tags									= '<div class="modal fade" id="assign-tags" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog  manage-columns">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
	'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
	'<h4 class="modal-title"></h4>'+
'</div>'+
global_lighbox_block+
'<div class="modal-body-content">'+
'<h3></h3>'+
'<br>'+
'<div class="columns-list-box">'+
	'<div class="col-title">'+
		'<h3>'+i18NCall("all.assign.tags.column.label")+': </h3>'+
			'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
	'</div>'+
		'<ul class="columns-list-item scroll" data-scroll="true" id="tags-all-columns"></ul>'+
'</div>'+
'<div class="columns-center-btn available-tags">'+
    '<div class="columns-vertical-center">'+
        '<div class="columns-icon-center">'+
            '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'"  href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span>'+
            '<span class="manage-action create-tag"><a data-rel="create-assign-tags" data-tooltip="'+i18NCall("tooltip.create.assign.tags")+'" href="javascript:void(0);" class="create-assign-tags"><img width="16" src="base/img/icons/create-new-role.svg" class="image"><img width="16" src="base/img/icons/create-new-role-hover.svg" class="image hover"></a></span>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>'+
'<div class="columns-list-box">'+
	'<div class="col-title">'+
		'<h3>'+i18NCall("visible.assign.tags.column.label")+': </h3>'+
			'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
	'</div>'+
		'<ul class="columns-list-item scroll" data-scroll="true" id="tags-visible-columns"></ul>'+
'</div>'+
	'<div class="columns-apply text-right">'+
		'<div class="center-btn col-md-12 clearfix">'+
			'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
		'</div>'+
	'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';


var grid_assign_functions								= '<div class="modal fade" id="assign-function" role="dialog" tabindex="-1">'+
'<div class="modal-dialog  manage-columns">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
	'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
	'<h4 class="modal-title"></h4>'+
'</div>'+
global_lighbox_block+
'<div class="modal-body-content">'+
'<h3></h3>'+
'<br>'+
	'<div class="columns-list-box">'+
		'<div class="col-title">'+
			'<h3>'+i18NCall("all.assign.function.column.label")+': </h3>'+
			'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
		 '</div>'+
		 '<ul class="columns-list-item scroll" data-scroll="true" id="function-all-columns"></ul>'+
	'</div>'+
	
	'<div class="columns-center-btn available-role">'+
    '<div class="columns-vertical-center">'+
        '<div class="columns-icon-center">'+
            '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span></div>'+
        '</div>'+
    '</div>'+
    '</div>'+
	'<div class="columns-list-box">'+
		'<div class="col-title">'+
			'<h3>'+i18NCall("visible.assign.function.column.label")+': </h3>'+
				'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
		'</div>'+
			'<ul class="columns-list-item scroll" data-scroll="true" id="function-visible-columns"></ul>'+
	'</div>'+													
'<div class="columns-apply text-right">'+
	'<div class="center-btn col-md-12 clearfix">'+
		'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
	'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

var grid_create_new_role_columns 			= '<div id="create-new-user" class="modal fade" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog">'+
'<div class="modal-content terms-conditions-text">'+
	'<div class="modal-header">'+
		'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
		'<h4 class="modal-title">'+i18NCall("create_role_title")+'</h4>'+
	'</div>'+
	global_lighbox_block+
	'<div id="modal-filter-create-form-content" class="modal-filter-create-form-content element-sec clearfix">'+
		'<form id="form-role-create" method="post">'+
		'<div class="form-row col-md-12 clearfix">'+
				'<div class="form-col-1">'+
					'<label class="label label-bold">'+i18NCall("role_name_label")+'</label>'+
				'</div>'+
				'<div class="form-col-2">'+
					'<div class="p-r-5 left">'+
					'<input type="text" class="text-box" name="roleName" id="rolename" tabindex="1" data-type="text" value="" data-validate="required" maxlength="20" autocomplete="on" autofocus />'+
					'</div>'+
				'</div>'+
			'</div>'+
			
			'<div class="form-row col-md-12 clearfix">'+
			'<div class="form-col-1">'+
				'<label class="label ">'+i18NCall("role_description_label")+'</label>'+
			'</div>'+
			'<div class="form-col-2">'+
				'<div class="p-r-5 left">'+
				'<textarea class="textarea-box" name="roleDesc" tabindex="2" id="roledescription" cols="5" rows="5" type="textarea" data-type="textarea" maxlength="254" value=""></textarea>'+
				'</div>'+
			'</div>'+
		'</div>'+
			
			'<div class="center-btn col-md-12 clearfix">'+
				'<button class="uie-btn uie-btn-primary" id="model-btn-role-save" name="btnSubmit"  data-type="submit">'+i18NCall("save.link.label")+'</button>'+
			'</div>'+
		'</form>'+
	'</div>'+
'</div>'+
'</div>'+
'</div>';

//'+i18NCall("create_role_title")+'
var grid_assign_user_role_columns 					= '<div id="assign-userrole" class="modal fade" role="dialog" tabindex="-1">'+
	'<div class="modal-dialog">'+
		'<div class="modal-content terms-conditions-text">'+
			'<div class="modal-header">'+
				'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
				'<h4 class="modal-title">'+i18NCall("create_role_title")+'</h4>'+
			'</div>'+
			global_lighbox_block+
			'<div id="modal-filter-create-form-content" class="modal-filter-create-form-content element-sec clearfix">'+
				'<form id="form-assign-userrole" method="post">'+
				'<div class="form-row col-md-12 clearfix">'+
						'<div class="form-col-1">'+
							'<label class="label label-bold">'+i18NCall("role_name_label")+'</label>'+
						'</div>'+
						'<div class="form-col-2">'+
							'<div class="p-r-5 left">'+
							'<input type="text" class="text-box" name="roleName" id="rolename" tabindex="1" data-type="text" value="" data-validate="required" maxlength="20" autocomplete="on" autofocus/>'+
							'</div>'+
						'</div>'+
					'</div>'+
					
					'<div class="form-row col-md-12 clearfix">'+
					'<div class="form-col-1">'+
						'<label class="label">'+i18NCall("role_description_label")+'</label>'+
					'</div>'+
					'<div class="form-col-2">'+
						'<div class="p-r-5 left">'+
						'<textarea class="textarea-box" name="roleDesc" tabindex="2" id="roledescription" cols="5" rows="5" type="textarea" data-type="textarea" maxlength="254" value=""></textarea>'+
						'</div>'+
					'</div>'+
				'</div>'+																						
				'<div class="center-btn col-md-12 clearfix">'+
						'<button class="uie-btn uie-btn-primary" id="model-btn-role-save" name="btnSubmit"  data-type="submit" tabindex="3">'+i18NCall("save.link.label")+'</button>'+
				'</div>'+
				'</form>'+
			'</div>'+
		'</div>'+
	'</div>'+
'</div>';
//'+i18NCall("add.assign.group.label")+'
var grid_assign_group										= 	'<div class="modal fade" id="assign-group" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog  manage-columns">'+
'<div class="modal-content">'+
	'<div class="modal-header">'+
		'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
		'<h4 class="modal-title"></h4>'+
	'</div>'+
	global_lighbox_block+
	'<div class="modal-body-content">'+
	'<h3></h3>'+
	'<br>'+
		'<div class="columns-list-box">'+
			'<div class="col-title">'+
				'<h3>'+i18NCall("all.assign.group.column.label")+': </h3>'+
				'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
			 '</div>'+
			 '<ul class="columns-list-item scroll" data-scroll="true" id="group-all-columns"></ul>'+
		'</div>'+																	
		'<div class="columns-center-btn available-role">'+
        '<div class="columns-vertical-center">'+
            '<div class="columns-icon-center">'+
                '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span>'+
                '<span class="manage-action manage-user-group hidden"><a data-rel="create-assign-group" data-tooltip="'+i18NCall("tooltip.create.assign.group")+'" href="javascript:void(0);" class="create-assign-group"><img width="16" src="base/img/icons/create-new-role.svg" class="image"><img width="16" src="base/img/icons/create-new-role-hover.svg" class="image hover"></a></span>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '</div>'+
		'<div class="columns-list-box">'+
			'<div class="col-title">'+
				'<h3>'+i18NCall("visible.assign.group.column.label")+': </h3>'+
					'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
			'</div>'+
				'<ul class="columns-list-item scroll" data-scroll="true" id="group-visible-columns"></ul>'+
		'</div>'+																
		'<div class="columns-apply text-right">'+
			'<div class="center-btn col-md-12 clearfix">'+
				'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
			'</div>'+
		'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

var grid_assign_business_unit										= '<div class="modal fade" id="assign-business-unit" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog  manage-columns">'+
'<div class="modal-content">'+
	'<div class="modal-header">'+
		'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
		'<h4 class="modal-title"></h4>'+
	'</div>'+
	global_lighbox_block+
	'<div class="modal-body-content">'+
	'<h3></h3>'+
	'<br>'+
		'<div class="columns-list-box">'+
			'<div class="col-title">'+
				'<h3>'+i18NCall("all.assign.businessUnit.column.label")+': </h3>'+
				'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
			 '</div>'+
			 '<ul class="columns-list-item scroll" data-scroll="true" id="business-unit-all-columns"></ul>'+
		'</div>'+																	
		'<div class="columns-center-btn available-role">'+
        '<div class="columns-vertical-center">'+
            '<div class="columns-icon-center">'+
                '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '</div>'+
		'<div class="columns-list-box">'+
			'<div class="col-title">'+
				'<h3>'+i18NCall("visible.assign.businessUnit.column.label")+': </h3>'+
					'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
			'</div>'+
				'<ul class="columns-list-item scroll" data-scroll="true" id="business-unit-visible-columns"></ul>'+
		'</div>'+																
		'<div class="columns-apply text-right">'+
			'<div class="center-btn col-md-12 clearfix">'+
				'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
			'</div>'+
		'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

//'+i18NCall("add.assign.organization.label")+'
var grid_assign_organization										= 	'<div class="modal fade" id="assign-organization" role="dialog"  tabindex="-1">'+
		'<div class="modal-dialog  manage-columns">'+
		'<div class="modal-content">'+
			'<div class="modal-header">'+
				'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
				'<h4 class="modal-title"></h4>'+
			'</div>'+
			global_lighbox_block+
			'<div class="modal-body-content">'+
			'<h3></h3>'+
			'<br>'+
				'<div class="columns-list-box">'+
					'<div class="col-title">'+
						'<h3>'+i18NCall("all.assign.organization.column.label")+': </h3>'+
						'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
					 '</div>'+
					 '<ul class="columns-list-item scroll" data-scroll="true" id="organization-all-columns"></ul>'+
				'</div>'+																	
				'<div class="columns-center-btn available-role">'+
		        '<div class="columns-vertical-center">'+
		            '<div class="columns-icon-center">'+
		                '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span>'+
		                '</div>'+
		            '</div>'+
		        '</div>'+
		        '</div>'+
				'<div class="columns-list-box">'+
					'<div class="col-title">'+
						'<h3>'+i18NCall("visible.assign.organization.column.label")+': </h3>'+
							'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
					'</div>'+
						'<ul class="columns-list-item scroll" data-scroll="true" id="organization-visible-columns"></ul>'+
				'</div>'+																
				'<div class="columns-apply text-right">'+
					'<div class="center-btn col-md-12 clearfix">'+
						'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
					'</div>'+
				'</div>'+
		'</div>'+
		'</div>'+
	'</div>'+
'</div>';


//'+i18NCall("create_group_title")+'
var grid_assign_user_group_columns 					= '<div id="assign-usergroup" class="modal fade" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog">'+
'<div class="modal-content terms-conditions-text">'+
'<div class="modal-header">'+
'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
'<h4 class="modal-title">'+i18NCall("create_group_title")+'</h4>'+
'</div>'+
global_lighbox_block+
'<div id="modal-filter-create-form-content" class="modal-filter-create-form-content element-sec clearfix">'+
'<form id="form-assign-usergroup" method="post">'+
'<div class="form-row col-md-12 clearfix">'+
		'<div class="form-col-1">'+
			'<label class="label label-bold">'+i18NCall("group_name_label")+'</label>'+
		'</div>'+
		'<div class="form-col-2">'+
			'<div class="p-r-5 left">'+
			'<input type="text" class="text-box" name="groupName" id="groupname" tabindex="1" data-type="text" value="" data-validate="required" maxlength="20" autocomplete="on" autofocus/>'+
			'</div>'+
		'</div>'+
	'</div>'+
	
	'<div class="form-row col-md-12 clearfix">'+
	'<div class="form-col-1">'+
		'<label class="label">'+i18NCall("group_description_label")+'</label>'+
	'</div>'+
	'<div class="form-col-2">'+
		'<div class="p-r-5 left">'+
		'<textarea class="textarea-box" name="groupDesc" tabindex="2" id="groupdescription" cols="5" rows="5" type="textarea" data-type="textarea" maxlength="254" value=""></textarea>'+
		'</div>'+
	'</div>'+
'</div>'+																						
'<div class="center-btn col-md-12 clearfix">'+
		'<button class="uie-btn uie-btn-primary" id="model-btn-role-save" name="btnSubmit"  data-type="submit">'+i18NCall("save.link.label")+'</button>'+
'</div>'+
'</form>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';


//'+i18NCall("create_tags_title")+'
var grid_assign_tags_columns 					= '<div id="assign-usertags" class="modal fade" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog">'+
'<div class="modal-content terms-conditions-text">'+
'<div class="modal-header" >'+
'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
'<h4 class="modal-title">'+i18NCall("create_tags_title")+'</h4>'+
'</div>'+
global_lighbox_block+
'<div id="modal-filter-create-form-content" class="modal-filter-create-form-content element-sec clearfix">'+
'<form id="form-assign-tags" method="post">'+
'<div class="form-row col-md-12 clearfix">'+
		'<div class="form-col-1">'+
			'<label class="label label-bold">'+i18NCall("tags_name_label")+'</label>'+
		'</div>'+
		'<div class="form-col-2">'+
			'<div class="p-r-5 left">'+
			'<input type="text" class="text-box" name="tagsName" id="tagsname" tabindex="1" data-type="text" value="" data-validate="required" maxlength="20" autocomplete="on" autofocus/>'+
			'</div>'+
		'</div>'+
	'</div>'+
	
	'<div class="form-row col-md-12 clearfix">'+
	'<div class="form-col-1">'+
		'<label class="label">'+i18NCall("tags_description_label")+'</label>'+
	'</div>'+
	'<div class="form-col-2">'+
		'<div class="p-r-5 left">'+
		'<textarea class="textarea-box" name="tagsDesc" tabindex="2" id="tagsdescription" cols="5" rows="5" type="textarea" data-type="textarea" maxlength="254" value=""></textarea>'+
		'</div>'+
	'</div>'+
'</div>'+																						
'<div class="center-btn col-md-12 clearfix">'+
		'<button class="uie-btn uie-btn-primary" id="model-btn-tags-save" tabindex="3" name="btnSubmit"  data-type="submit">'+i18NCall("save.link.label")+'</button>'+
'</div>'+
'</form>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';
//Tag Service  
//'+i18NCall("add.assign.tag.label")+'
var grid_assign_tags_service							= '<div class="modal fade" id="assign-tags-service" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog  manage-columns">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
	'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
	'<h4 class="modal-title"></h4>'+
'</div>'+
global_lighbox_block+
'<div class="modal-body-content">'+
'<h3></h3>'+
'<br>'+
'<div class="columns-list-box">'+
	'<div class="col-title">'+
		'<h3>'+i18NCall("all.assign.tags.column.label")+': </h3>'+
			'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
	'</div>'+
		'<ul class="columns-list-item scroll" data-scroll="true" id="service-tags-all-columns"></ul>'+
'</div>'+
'<div class="columns-center-btn available-tags">'+
    '<div class="columns-vertical-center">'+
        '<div class="columns-icon-center">'+
            '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span>'+
            '<span class="manage-action hidden"><a data-rel="create-assign-tags" data-tooltip="'+i18NCall("tooltip.create.assign.tags")+'" href="javascript:void(0);" class="create-assign-tags"><img width="16" src="base/img/icons/create-new-role.svg" class="image"><img width="16" src="base/img/icons/create-new-role-hover.svg" class="image hover"></a></span>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>'+
'<div class="columns-list-box">'+
	'<div class="col-title">'+
		'<h3>'+i18NCall("visible.assign.tags.column.label")+': </h3>'+
			'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
	'</div>'+
		'<ul class="columns-list-item scroll" data-scroll="true" id="service-tags-visible-columns"></ul>'+
'</div>'+
'<div class="columns-apply text-right">'+
	'<div class="center-btn col-md-12 clearfix">'+
		'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
	'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';
//'+i18NCall("create_tags_title")+'
var grid_assign_tags_service_columns 				= '<div id="assign-usertagsservice" class="modal fade" role="dialog"  tabindex="-1">'+
'<div class="modal-dialog">'+
'<div class="modal-content terms-conditions-text">'+
'<div class="modal-header" >'+
'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
'<h4 class="modal-title"></h4>'+
'</div>'+
global_lighbox_block+
'<div id="modal-filter-create-form-content" class="modal-filter-create-form-content element-sec clearfix">'+
'<form id="form-assign-tags" method="post">'+
'<div class="form-row col-md-12 clearfix">'+
	'<div class="form-col-1">'+
		'<label class="label label-bold">'+i18NCall("tags_name_label")+'</label>'+
	'</div>'+
	'<div class="form-col-2">'+
		'<div class="p-r-5 left">'+
		'<input type="text" class="text-box" name="tagsName" id="tagsname" tabindex="1" data-type="text" value="" data-validate="required" maxlength="20" autocomplete="on"/>'+
		'</div>'+
	'</div>'+
'</div>'+

'<div class="form-row col-md-12 clearfix">'+
'<div class="form-col-1">'+
	'<label class="label">'+i18NCall("tags_description_label")+'</label>'+
'</div>'+
'<div class="form-col-2">'+
	'<div class="p-r-5 left">'+
	'<textarea class="textarea-box" name="tagsDesc" tabindex="2" id="tagsdescription" cols="5" rows="5" type="textarea" data-type="textarea" maxlength="254" value=""></textarea>'+
	'</div>'+
'</div>'+
'</div>'+																						
'<div class="center-btn col-md-12 clearfix">'+
	'<button class="uie-btn uie-btn-primary" id="model-btn-tags-save" tabindex="3" name="btnSubmit"  data-type="submit">'+i18NCall("save.link.label")+'</button>'+
'</div>'+
'</form>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

var grid_assign_resource						= '<div class="modal fade" id="assign-resource" role="dialog" tabindex="-1">'+
'<div class="modal-dialog  manage-columns">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
'<h4 class="modal-title"></h4>'+
'</div>'+
global_lighbox_block+
'<div class="modal-body-content">'+
'<h3></h3>'+
'<br>'+
'<div class="columns-list-box">'+
'<div class="col-title">'+
	'<h3>'+i18NCall("all.assign.resource.column.label")+': </h3>'+
	'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
 '</div>'+
 '<ul class="columns-list-item scroll" data-scroll="true" id="resource-all-columns"></ul>'+
'</div>'+

'<div class="columns-center-btn available-role">'+
'<div class="columns-vertical-center">'+
'<div class="columns-icon-center">'+
    '<div class="columns-icon-left"><span class="manage-action"><a data-rel="next-right" data-tooltip="'+i18NCall("tooltip.move.all.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next-1.svg" class="image"><img width="16" src="base/img/icons/next-1-hover.svg" class="image hover"></a></span><span class="manage-action"><a data-rel="next-right-single" data-tooltip="'+i18NCall("tooltip.move.right")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-right-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-right-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left-single" data-tooltip="'+i18NCall("tooltip.move.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/arrow-left-1.svg" class="image columns-icon-rotate"><img width="16" src="base/img/icons/arrow-left-1-hover.svg" class="image hover columns-icon-rotate"></a></span><span class="manage-action"><a data-rel="next-left" data-tooltip="'+i18NCall("tooltip.move.all.left")+'" href="javascript:void(0);"><img width="16" src="base/img/icons/next.svg" class="image"><img width="16" src="base/img/icons/next-hover.svg" class="image hover"></a></span></div>'+
'</div>'+
'</div>'+
'</div>'+
'<div class="columns-list-box">'+
'<div class="col-title">'+
	'<h3>'+i18NCall("visible.assign.resource.column.label")+': </h3>'+
		'<a href="javascript:void(0);" class="clear-visibles">'+i18NCall("clear.label")+'</a>'+
'</div>'+
	'<ul class="columns-list-item scroll" data-scroll="true" id="resource-visible-columns"></ul>'+
'</div>'+													
'<div class="columns-apply text-right">'+
'<div class="center-btn col-md-12 clearfix">'+
'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

var search_input_box 								= "<div>"+
"<input type='text' class='text-box search-container-no' autocomplete='off' placeholder='"+i18NCall("search.label")+"' >"+
"</div>";


var grid_addon_tagTypes                             = "<input type='hidden' name='tagTypes'>";


var grid_all_action_submenu_block 					= '<div class="modal fade" id="action_popup" role="dialog">'+
'<div class="modal-dialog">'+
'<div class="modal-content popup-action">'+
'<div class="modal-header">'+
'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
'<h4 class="modal-title">Actions</h4>'+
'</div>'+
'<div class="action-box element-sec clearfix">'+

'</div>'+
'</div>'+
'</div>'+
'</div>';

var grid_all_action_submenu_title_block				= '<div>'+
'<h3 class="action-title"></h3>'+
'<div class="clearfix"></div>'+
'<div class="owl-carousel">'+

'</div>'+
'<div class="clearfix"></div>'+
'</div>';


var grid_all_action_submenu_content_block			= '<div class="item">'+
'<a href="javascript:void(0);">'+
'<span class="action-image"></span>'+
'<span class="action-title"></span>'+
'</a>'+
'</div>';



var grid_assign_group_list								= '<div class="modal fade" id="assign-group-list" role="dialog" tabindex="-1">'+
'<div class="modal-dialog manage-columns">'+
'<div class="modal-content">'+
'<div class="modal-header">'+
	'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
	'<h4 class="modal-title"></h4>'+
'</div>'+
global_lighbox_block+
'<div class="modal-body-content">'+
'<h3></h3>'+
'<br>'+
	'<div class="set-form-data"></div>'+
	'<div class="columns-list-box">'+
		'<div class="col-title">'+
			'<h3>'+i18NCall("all.assign.group.list.column.label")+': </h3>'+
			'<a href="javascript:void(0);" class="clear-all">'+i18NCall("clear.label")+'</a>'+
		 '</div>'+
		 '<ul class="columns-list-item scroll" data-scroll="true" id="group-list-columns"></ul>'+
	'</div>'+
	'<div class="columns-apply text-right">'+
		'<div class="center-btn col-md-12 clearfix">'+
			'<button class="uie-btn uie-btn-primary" type="button" name="btnSubmit" data-type="submit">'+i18NCall("apply.label")+'</button>'+
		'</div>'+
	'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

var grid_assign_group_list_form						= '<div class="inline-add-form">'+
'<form method="POST" name="frmAddGroup">'+
'<div class="scroll-wrapper">'+
'<div class="form-row col-md-12 clearfix">'+
'<div class="form-col-1"><label class="label">Add Group Name</label></div>'+
'<div class="form-col-2">'+
	'<div class="p-r-5 left col-md-6">'+
		'<input type="text" class="text-box" name="addNewItem" tabindex="1" data-type="text" value="" maxlength="20" autocomplete="on">'+
	'</div>'+
'</div>'+
'</div>'+
'</div>'+
'<div class="p-r-5 left col-md-6">'+
'<div class="col-md-2">'+
'<label class="label">Or</label>'+
'</div>'+
'<button class="uie-btn model-btn pull-right">Add New</button>'+
'</div>'+
'</form>'+
'</div>';
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