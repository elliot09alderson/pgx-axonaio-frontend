/*
Author       : Dreamguys
Template Name: Pythru
Version      : 1.0
*/

(function($) {
    "use strict";

    // Stick Sidebar
	
	if ($(window).width() > 767) {
		if($('.theiaStickySidebar').length > 0) {
			$('.theiaStickySidebar').theiaStickySidebar({
			  // Settings
			  additionalMarginTop: 70
			});
		}
	}
	
	// Variables declarations
	
	var $wrapper = $('.main-wrapper');
	var $pageWrapper = $('.page-wrapper');
	var $slimScrolls = $('.slimscroll');
	
	// Sidebar
	var Sidemenu = function () {
		this.$menuItem = $('#sidebar-menu a');
	};

	function init() {
		var $this = Sidemenu;
		$('#sidebar-menu a').on('click', function (e) {
			
			if ($(this).parent().hasClass('submenu')) {
				e.preventDefault();
			}
			if (!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
			} else if ($(this).hasClass('subdrop')) {
				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
			}
		});
		$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
		$('#sidebar-menu ul li.submenu ul li.submenu a.active').parents('li.submenu').children('a:first').addClass('supdrop').trigger('click');
	}
	
	// Sidebar Initiate
	
	init();
	
	// Mobile menu sidebar overlay

	$('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function () {
		$wrapper.toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		return false;
	});
	
	// Sidebar Overlay

	$(".sidebar-overlay").on("click", function () {
		$wrapper.removeClass('slide-nav');
		$(".sidebar-overlay").removeClass("opened");
		$('html').removeClass('menu-opened');
	});
	
	// Page Content Height

	if ($('.page-wrapper').length > 0) {
		var height = $(window).height();
		$(".page-wrapper").css("min-height", height);
	}
	
	// Page Content Height Resize

	$(window).resize(function () {
		if ($('.page-wrapper').length > 0) {
			var height = $(window).height();
			$(".page-wrapper").css("min-height", height);
		}
	});
	
	// Sidebar Slimscroll

	if ($slimScrolls.length > 0) {
		$slimScrolls.slimScroll({
			height: 'auto',
			width: '100%',
			position: 'right',
			size: '7px',
			color: '#ccc',
			allowPageScroll: false,
			wheelStep: 10,
			touchScrollStep: 100
		});
		var wHeight = $(window).height() - 80;
		$slimScrolls.height(wHeight);
		$('.sidebar .slimScrollDiv').height(wHeight);
		$(window).resize(function () {
			var rHeight = $(window).height() - 80;
			$slimScrolls.height(rHeight);
			$('.sidebar .slimScrollDiv').height(rHeight);
		});
	}
	
	// Small Sidebar

	$(document).on('click', '#toggle_btn', function () {
		if ($('body').hasClass('mini-sidebar')) {
			$('body').removeClass('mini-sidebar');
			$('.subdrop + ul').slideDown();
		} else {
			$('body').addClass('mini-sidebar');
			$('.subdrop + ul').slideUp();
		}
		return false;
	});
	
	$(document).on('mouseover', function (e) {
		e.stopPropagation();
		if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
			var targ = $(e.target).closest('.sidebar').length;
			if (targ) {
				$('body').addClass('expand-menu');
				$('.subdrop + ul').slideDown();
			} else {
				$('body').removeClass('expand-menu');
				$('.subdrop + ul').slideUp();
			}
			return false;
		}
	});
	
	// Filter 
	
	$(document).on('click', '#filter_search', function() {
		$('#filter_inputs').slideToggle("slow");
	});
	
	// Datatable 
	
	if ($('.datatable').length > 0) {
		$('.datatable').DataTable({
			retrieve: true,
				lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
			language: {
				search: ' ',
				searchPlaceholder: "Search",
				info:  "Showing _START_ - _END_ of _TOTAL_ entries",
				"lengthMenu": "Show Per Page _MENU_",
				paginate: {
				  next: '<i class="fas fa-angle-right"></i>',
				  previous: '<i class="fas fa-angle-left"></i>'  
				}
			},
			initComplete: (settings, json)=>{
                $('.dataTables_info').appendTo('#tableinfo');
                $('.dataTables_paginate').appendTo('#tablepage');
                $('.dataTables_length').appendTo('#tablelength');
                $('.dataTables_filter').appendTo('#tablefilter');
            },
		});
	} 
	
	// OTP 

	$('.digit-group').find('input').each(function() {
		$(this).attr('maxlength', 1);
		$(this).on('keyup', function(e) {
			var parent = $($(this).parent());
			
			if(e.keyCode === 8 || e.keyCode === 37) {
				var prev = parent.find('input#' + $(this).data('previous'));
				
				if(prev.length) {
					$(prev).select();
				}
			} else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
				var next = parent.find('input#' + $(this).data('next'));
				
				if(next.length) {
					$(next).select();
				} else {
					if(parent.data('autosubmit')) {
						parent.submit();
					}
				}
			}
		});
	});
	$('.digit-group input').on('keyup', function (ev) {
    	$(this).toggleClass('active', !!$(this).val().trim());
	});

	// Jqury Validate

	if($('#login-form').length > 0) {
	 	$('#login-form').validate({
	        rules: 
	        {
	          	item1: 
	          	{
	            	required: true
	          	},
		        item2: 
		        {
		            required: true
		        },
		        item3: 
		        {
		            required: true
		        },
	        }
	    });
 	}

 	// Checkbox Select
	
	$('.app-listing .selectBox').on("click", function() {
        $(this).parent().find('#checkBoxes').fadeToggle();
        $(this).parent().parent().siblings().find('#checkBoxes').fadeOut();
    });

    $('.invoices-main-form .selectBox').on("click", function() {
        $(this).parent().find('#checkBoxes-one').fadeToggle();
        $(this).parent().parent().siblings().find('#checkBoxes-one').fadeOut();
    });
	
	$('.app-listing .selectBox').on("click", function() {
        $(this).parent().find('.check-box').fadeToggle();
        $(this).parent().parent().siblings().find('.check-box').fadeOut();
    });
	
	 // Accordion
	 
	if($('.accordion').length > 0) {
		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		  acc[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
			  panel.style.maxHeight = null;
			} else {
			  panel.style.maxHeight = panel.scrollHeight + "px";
			} 
		  });
		}
	}

    // Date Range Picker
    
	if($('.bookingrange').length > 0) {
		var start = moment().subtract(6, 'days');
		var end = moment();

		function booking_range(start, end) {
			$('.bookingrange span').html(start.format('M/D/YYYY') + ' - ' + end.format('M/D/YYYY'));
		}

		$('.bookingrange').daterangepicker({
			startDate: start,
			endDate: end,
			ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			}
		}, booking_range);

		booking_range(start, end);
	}

	// Datetimepicker
	
	if($('.datetimepicker').length > 0 ){
		$('.datetimepicker').datetimepicker({
			format: 'DD-MM-YYYY',
			icons: {
				up: "fas fa-angle-up",
				down: "fas fa-angle-down",
				next: 'fas fa-angle-right',
				previous: 'fas fa-angle-left'
			}
		});
	}

	// Select 2

	if ($('.select').length > 0) {
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
	}
	
	// Business Type
	
	if ($('#business-type').length > 0) {
		$('#business-type').on("change", function() {
			if($('#business-type').val() == "Individual") {
				$('#individual').show();
				$('#llp').hide();
				$('#partnership').hide();
				$('#privateltd').hide();
				$('#publicltd').hide();
				$('#proprietorship').hide();
				$('#society').hide();
			}
			else if($('#business-type').val() == "LLP") {
				alert("wewe");
				$('#llp').show();
				$('#individual').hide();
				$('#partnership').hide();
				$('#privateltd').hide();
				$('#publicltd').hide();
				$('#proprietorship').hide();
				$('#society').hide();
			}
			else if($('#business-type').val() == "Partnership") {
				$('#partnership').show();
				$('#individual').hide();
				$('#llp').hide();
				$('#privateltd').hide();
				$('#publicltd').hide();
				$('#publicltd').hide();
				$('#proprietorship').hide();
				$('#society').hide();
			}
			else if($('#business-type').val() == "Private Limited") {
				$('#privateltd').show();
				$('#individual').hide();
				$('#llp').hide();
				$('#partnership').hide();
				$('#publicltd').hide();
				$('#proprietorship').hide();
				$('#society').hide();
			}
			else if($('#business-type').val() == "Public limited") {
				$('#publicltd').show();
				$('#individual').hide();
				$('#llp').hide();
				$('#partnership').hide();
				$('#privateltd').hide();
				$('#proprietorship').hide();
				$('#society').hide();
			}
			else if($('#business-type').val() == "Proprietership") {
				$('#proprietorship').show();
				$('#individual').hide();
				$('#llp').hide();
				$('#partnership').hide();
				$('#privateltd').hide();
				$('#publicltd').hide();
				$('#society').hide();
			}
			else if($('#business-type').val() == "Society/Trust/Club/NGO/Assoc") {
				$('#society').show();
				$('#individual').hide();
				$('#llp').hide();
				$('#partnership').hide();
				$('#privateltd').hide();
				$('#publicltd').hide();
				$('#proprietorship').hide();
			}
		});
	}
	
	// Pricing Options
	
	$('#payment_select input[name="payment_type"]').on('click', function() {
		if ($(this).val() == 'total_pay') {
			$('#view_payment').hide();
		}
		if ($(this).val() == 'view_pay') {
			$('#view_payment').show();
		}
		else {
		}
	});

	// Expiry Add More
	
	$(document).on('click','.skills-cont .delete-btn', function (m) {
		m.preventDefault();
		$(this).closest('.skills-cont').remove();
		return false;
		    });

		// Add Skills
		
		$(document).on('click', '.add-skill',function (s) {
		s.preventDefault();
		        var skillscontent = '<div class="row skills-cont align-items-center">' +
		'<div class="col-12 col-md-10">' +
		'<div class="form-group">' +
		'<select class="form-control select">' +
		'<option>1 day before expiry date</option>'+
		'<option>2 day before expiry date</option>'+
		'<option>3 day before expiry date</option>'+
		'<option>4 day before expiry date</option>'+
		'</select>'+
		'</div>' +
		'</div>' +
		'<div class="col-12 col-md-2">' +
		'<div class="form-group add-delete-btn">' +
		'<a href="#" class="delete-btn delete-btn-one"><i class="feather-trash-2"></i></a>' +
		'</div>' +
		'</div>' +
		'<div class="col-12 col-md-12">' +
		'<div class="add-delete-btn">'+
		'<a href="#" class="add-btn add-skill"><i class="feather-plus"></i> Add more reminder</a>' +
		'</div>'+
		'</div>' +
		'</div>';

		        $(".skills-info").append(skillscontent);

		setTimeout(function() {
		if($('.select').length > 0) {
		$('.select').select2({
		minimumResultsForSearch: -1,
		width: '100%'
		});
		}
		},100);
		       return false;
		    });

	// Invoices Table Add More
	
    $(".add-table-items").on('click','.remove-btn', function () {
		$(this).closest('.add-row').remove();
		return false;
    });

    $(document).on("click",".add-btn",function () {
		var experiencecontent = '<tr class="add-row">' +
			'<td>' +
				'<input type="text" class="form-control">' +
			'</td>' +
			'<td>' +
				'<input type="text" class="form-control">' +
			'</td>' +
			'<td>' +
				'<input type="text" class="form-control">' +
			'</td>' +
			'<td>' +
				'<input type="text" class="form-control">' +
			'</td>' +
			'<td class="add-remove text-end">' +
				'<a href="javascript:void(0);" class="add-btn me-2"><i class="fas fa-plus-circle"></i></a> ' +
				'<a href="javascript:void(0);" class="remove-btn"><i class="fas fa-minus-circle"></i></a>' +
			'</td>' +
		'</tr>';
		
        $(".add-table-items").append(experiencecontent);
        return false;
    });
	
})(jQuery);