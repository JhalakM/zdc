
var global_lighbox_block = '<div class="global-lightbox-wrapper col-md-12"></div>';


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
				 
var grid_manage_columns_body 	= '<div class="" id="manage-columns" role="dialog"  tabindex="-1">'+
								'<div class="manage-columns">'+
									'<div class="modal-content">'+
										'<div class="modal-header">'+
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