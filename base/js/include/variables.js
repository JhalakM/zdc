var currentDate;
var currentTime;
var current_moduleId = 1;
if (!window.location.origin) {
	   window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

/* variables  for set baseurl path */
var SetWebURL 											    = window.location.origin + "/" + window.location.pathname.split( '/' )[1] + "/" + window.location.pathname.split( '/' )[2] + "/";

var SetWebApiURL 											= SetWebURL;

var pathValue 												= window.location.pathname.split( '/' )[1] + "/" + window.location.pathname.split( '/' )[2];

var current_theme 											= "blue";
var current_theme_css 										= SetWebURL + "assets/" + current_theme + "/style.css";

var accordionArray											= {};

var gridKeyConfig											= "";
var switchInc 												= 0;
var saveAlertFlag 											= 0;
var formDependecies											= undefined;
var gridDetails												= [];
var selectRecordValue 										= false;
var totalDays 												= {
		"day0" : "days.sunday.title",
		"day1" : "days.monday.title",
		"day2" : "days.tuesday.title",
		"day3" : "days.wednseday.title",
		"day4" : "days.thursday.title",
		"day5" : "days.friday.title",
		"day6" : "days.saturday.title",
};

var totalMonths 											= {
		"month0" : "months.january.title",
		"month1" : "months.february.title",
		"month2" : "months.march.title",
		"month3" : "months.april.title",
		"month4" : "months.may.title",
		"month5" : "months.june.title",
		"month6" : "months.july.title",
		"month7" : "months.august.title",
		"month8" : "months.september.title",
		"month9" : "months.october.title",
		"month10" : "months.november.title",
		"month11" : "months.december.title"
	};

var date 													= new Date();
var year 													= date.getFullYear();

/*var moduleTypeJson											= {
																"LIST" : "list",
																"ADD"  : "add",
																"EDIT" : "edit",
																"VIEW" : "view"
															};*/
var moduleTypeJson												= [
                  											   	"refreshAction",
                  											   	"batchEditAction",
                  											   	"deleteAction",
                  											   	"rangeAction",
                  											   	"multiSortAction",
                  											   	"manageColumnsAction",
                  											   	"addAction",
                  											   	"exportAction",
                  											   	"exportTemplateAction",
                  											   	"exportJsonAction"
                  											  ];

var additional_class 		 								= "col-md-6 no-padding";

var class_error_message 									= "error-message";
var class_sidebar_link 										= "sidebar-link";
var class_switch_input 	 	 								= "switch-input";
var class_switch_selection	 								= "switch-selection";
var class_switch_label		 								= "switch-label";
var class_switch_label_off 	 								= "switch-label-off";
var class_switch_label_on 	 								= "switch-label-on";
var class_css_checkbox		 								= "css-checkbox";
var class_css_label			 								= "css-label";
var class_input_file		 								= "input-file";
var class_multi_file		 								= "multi";
var class_selected_file	 	 								= "selected-file-name";

var filter_app_rel_data_wrapper								= "app-action-form-filter";

var model_ul_user_all_block									= "user-all-columns";
var model_ul_user_visible_block								= "user-visible-columns";
var model_ul_function_all_block								= "function-all-columns";
var model_ul_function_visible_block							= "function-visible-columns";
var model_ul_service_all_block								= "service-all-columns";
var model_ul_service_visible_block							= "service-visible-columns";
var model_ul_group_all_block								= "group-all-columns";
var model_ul_group_visible_block							= "group-visible-columns";
var model_ul_business_unit_visible_block				    = "business-unit-visible-columns"
var model_ul_business_unit_all_block						= "business-unit-all-columns";
var module_ul_group_list_column								= "group-list-columns";
var model_ul_resource_visible_block       				    = "resource-visible-columns";
var model_ul_resource_all_block        						= "resource-all-columns";


var model_ul_organization_visible_block						= "organization-visible-columns";
var model_ul_organization_all_block							= "organization-all-columns";

var model_ul_tag_all_block									= "tags-all-columns";
var model_ul_tag_visible_block								= "tags-visible-columns";
//service tag
var model_ul_tag_service_all_block							= "service-tags-all-columns";
var model_ul_tag_service_visible_block						= "service-tags-visible-columns";

var model_ul_role_all_block									= "role-all-columns";
var model_ul_role_visible_block							    = "role-visible-columns";

var panel_grid_content_id									= 'panel-grid-content'; 
var page_no_option             						 		= 'page_no_options';
var page_no_selector            							= '[name='+page_no_option+']';
var page_records_option         							= "page_records_option";
var page_records_selector       							= '[name='+page_records_option+']';
var page_action_wrapper 									= page_no_selector+","+page_records_selector;

var selector_div 		     								= "div";
var selector_a	 		     								= "a";
var selector_label 			 								= "label";
var selector_span 			 								= "span";
var selector_textarea 		 								= "textarea";
var selector_input 			 								= "input";
var selector_ul 			 								= "ul";
var selector_li 			 								= "li";
var selector_span			 								= "span";
var sorting_wrapper           								= 'th.sorting';
var system_message 											= 'System Message';
var th_column_wrapper 										= 'span';

//class variables

var app_action_form_block_wrapper   						= ".app-action-form-block";
var appsetting_wrapper 		   								= ".appsetting-wrapper";
var appestting_input_wrapper   								= ".appsetting-input";

var batchupdate_form_content_selecter						= ".batchupdate-form-content";

var checkbox_all_wrapper    								= ".css-checkbox-all";
var checkbox_single_wrapper 								= ".css-checkbox";
var checkbox_rowmodel_wrapper 								= '.rowModels input[type="checkbox"]';
var checkbox_rowmodel_checked_wrapper 						= '.rowModels input[type="checkbox"]:checked';
var checkbox_all_report    									= ".check-all-report";
var checkbox_report_checked_wrapper 						= '.rowModel input[type="checkbox"]';
var checkbox_first_config_wrapper 							= '.config-panel input[type="checkbox"]:first';
var checkbox_all_config_wrapper   							= '.config-panel input[type="checkbox"]';

var dropdown_selector										= ".dropdown-list-menu";

var filter_block_wrapper      								= ".filter-block";
var filter_presaved_wrapper    								= ".presaved-filters-block";
var filter_dropdown_wrapper    								= ".presaved-filters";
var filter_label_wrapper    								= ".filter-label-title label";
var filter_elements_wrapper    								= '.filter-elements-block';
var filter_elements_label    								= '.filter-label label';
var filter_elements_operators  								= '.filter-operators';
var filter_elements_input    								= '.filter-searchvalue';
var filter_element_wrapper    								= '.filter-element';
var filter_state_wrapper        							= '.filter-state';
var filter_addmore_wrapper     								= '.filter-addmore-block';
var filter_addoption_wrapper   								= '.addmore-options';
var filter_submit_wrapper     								= '.filter-submit-block .form-btn-group';
var filter_delete_block_wrapper 							= ".filter-addmore-block .addmore-options-block";
var filter_delete_row_a_wrapper								= ".delete-filter-row a";
var filter_submit_button_wrapper							= ".filter-submit";

var filter_wrapper											= ".filter-wrapper";
var filtered_criteria_wrapper								= ".searched-criteria";
var filtered_criteria_label								    = ".searched-criteria-label";
var filtered_criteria_text								    = ".searched-criteria-text";

var global_message_wrapper             						= ".global-message-wrapper";
var global_lightbox_wrapper             					= ".global-lightbox-wrapper";
var grid_block_wrapper  									= '.table-record';

var login_form_block_wrapper								= ".login-form-block";

var module_block_wrapper 									= ".module-block";
var module_blocks_wrapper 									= ".module-blocks";
var maintenance_message_wrapper								= ".maintenance_message";

var panel_head_wrapper 										= '.panel-block-head'; 
var panel_block_actions_wrapper								= ".panel-block-actions";
var pagination_block_wrapper 								= '.pagination-block';
var pagination_top_wrapper 									= '.pagination-block.top-pagination';
var page_prev_wrapper          	 							= '.prev-page';
var page_next_wrapper           							= '.next-page';
var panel_grid_main_wrapper									= ".panel-grid-main";
var panel_accordion_wrapper									= ".panel-accordion-wrapper";

var selector_left_panel   	 								= ".left-panel";
var selector_right_panel   	 								= ".right-panel";
var selector_sidebar_nav     								= ".sidebar-nav";
var selector_panel_block_content 							= ".panel-block-content";
var selector_panel_block_head_content   					= ".panel-block-head-content";
var selector_panel_block_head    							= ".panel-block-head";
var selector_element_section 								= ".element-sec";
var selector_error_message 									= ".error-message";
var selector_panel_title 	 								= ".panel-title";
var selector_form_row 		 								= ".form-row";
var selector_p_r_5 											= ".p-r-5";
var selector_dropdown_list   								= ".dropdown-list-menu";
var selector_select_listitem 								= ".selected-listitem";
var selector_switch			 								= ".switch";
var selector_radio_btn		 								= ".radio-btn";
var selector_checkbox		 								= ".checkbox";
var selector_file			 								= ".file";
var selector_input_file		 								= ".input-file";
var selector_app_error		 								= ".app-error";
var selector_selected_file	 								= ".selected-file-name";
var scroll_wrapper											= ".scroll-wrapper";
var sorting_element_wrapper   								= '.sort-icon';
var sorting_order_wrapper	  								= '.sorting-order';

var table_grid_wrapper  									= '.table-grid';
var table_thead_wrapper 									= '.table-grid thead';
var table_tbody_wrapper 									= '.table-grid tbody';

var selectedCheckboxLength									= $( ".table-record .checkbox input[type='checkbox']:checked" ).not("#check-all").length;

var selector_content_section 								= ".content-section";
var view_visit_summary_wrapper								= "#view_visit_summary";

var mainWrapper 											= "";
var add_class_value 										= "";
var multipleValueLabel 										= false;
var navigationAlert 										= 0;
var pageConfigrationObject 									= {};
var accordionConfigs										= [];
var serverImages											= [];
var isErrorDto												= [];
var uploadedSize 											= 0; 
var clubByArray												= [];

// Globle Error/Success Message Code 
var CODE_SYSTEM 											= 1;
var CODE_BUSINESS 											= 2;
var CODE_SUCCESS 											= 3;
var CODE_DAO 												= 4;
var CODE_COMMUNICATION 										= 5;
var CODE_IO 												= 6;
var CODE_WARNING 											= 7;
//var CODE_INFORMATION										= 8;
var CODE_BATCHEDIT											= 99;
var CODE_SESSIONERROR										= 4


