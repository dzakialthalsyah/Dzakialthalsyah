(function($) {
	"use strict";
	// Subpage
	function subpages_resize() {
		var subpagesHeight = $('.pt-page-current').height();
		$(".subpages").height(subpagesHeight + 50);
	}

	// Portfolio subpage filters
	function portfolio_init() {
		var portfolio_grid = $('#portfolio_grid'),
		portfolio_filter = $('#portfolio_filters');

		if (portfolio_grid) {

			portfolio_grid.shuffle({
				speed: 450,
				itemSelector: 'figure'
			});

			$('.site-main-menu').on("click", "a", function (e) {
				portfolio_grid.shuffle('update');
			});


			portfolio_filter.on("click", ".filter", function (e) {
				portfolio_grid.shuffle('update');
				e.preventDefault();
				$('#portfolio_filters .filter').parent().removeClass('active');
				$(this).parent().addClass('active');
				portfolio_grid.shuffle('shuffle', $(this).attr('data-group') );
				setTimeout(function(){
					subpages_resize();
				}, 500);
			});

		}
	}
	// /Portfolio subpage filters

	$(function () {

		$('#contact-form').validator();

		$('#contact-form').on('submit', function (e) {
			if (!e.isDefaultPrevented()) {
				var url = "contact_form/contact_form.php";

				$.ajax({
					type: "POST",
					url: url,
					data: $(this).serialize(),
					success: function (data)
					{
						var messageAlert = 'alert-' + data.type;
						var messageText = data.message;

						var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
						if (messageAlert && messageText) {
							$('#contact-form').find('.messages').html(alertBox);
							$('#contact-form')[0].reset();
						}
					}
				});
				return false;
			}
		});
	});

	//Sembunyikan Mobile menu
	function mobileMenuHide() {
		var windowWidth = $(window).width();
		if (windowWidth < 1024) {
			$('#site_header').addClass('mobile-menu-hide');
		}
	}
	// /Sembunyikan Mobile menu

	//DI Window load & Resize
	$(window)
	.on('load', function() { //Load
	// Animation on Page Loading
	$(".preloader").fadeOut("slow");

	// Untuk page transition.
	var ptPage = $('.subpages');
	if (ptPage[0]) {
		PageTransitions.init({
			menu: 'ul.site-main-menu',
		});
	}
})
.on('resize', function() { //Resize
mobileMenuHide();

setTimeout(function(){
	subpages_resize();
}, 500);
})
.scroll(function () {
	if ($(window).scrollTop() < 20) {
		$('.header').removeClass('sticked');
	} else {
		$('.header').addClass('sticked');
	}
})
.scrollTop(0);


// Di Document Load
$(document).on('ready', function() {
	// Untuk Portfolio grid
	var $portfolio_container = $("#portfolio-grid");

	$portfolio_container.imagesLoaded(function () {
		setTimeout(function(){
			portfolio_init(this);
		}, 500);
	});

	// Portfolio hover efek init
	$(' #portfolio_grid > figure ').each( function() { $(this).hoverdir(); } );

	// Blog grid init
	setTimeout(function(){
		var $container = $(".blog-masonry");
		$container.masonry();
	}, 500);

	// Mobile menu
	$('.menu-toggle').on("click", function () {
		$('#site_header').toggleClass('mobile-menu-hide');
	});

	// Mobile menu disembunyikan di main menu item click
	$('.site-main-menu').on("click", "a", function (e) {
		mobileMenuHide();
	});

	// Sidebar toggle
	$('.sidebar-toggle').on("click", function () {
		$('#blog-sidebar').toggleClass('open');
	});

	$(".testimonials.owl-carousel").owlCarousel({
		nav: true, // Menampilkan Button Selanjutnya
		items: 3, // Berapa banyak item yang ingin kita lihat
		loop: false, // Infinity loop
		navText: false,
		margin: 25,
		responsive : {
			// breakpoint dari 0 ke atas
			0 : {
				items: 1,
			},
			// breakpoint dari 480 ke atas
			480 : {
				items: 1,
			},
			// breakpoint dari 768 ke atas
			768 : {
				items: 2,
			},
			1200 : {
				items: 2,
			}
		}
	});


	// Text rotasi
	$('.text-rotation').owlCarousel({
		loop: true,
		dots: false,
		nav: false,
		margin: 0,
		items: 1,
		autoplay: true,
		autoplayHoverPause: false,
		autoplayTimeout: 3800,
		animateOut: 'zoomOut',
		animateIn: 'zoomIn'
	});

	// Lightbox init
	$('body').magnificPopup({
		delegate: 'a.lightbox',
		type: 'image',
		removalDelay: 300,

		// Class untuk menggabungkan wrapper dan background
		mainClass: 'mfp-fade',
		image: {
			// options untuk tipe konten image
			titleSrc: 'title',
			gallery: {
				enabled: true
			},
		},

		iframe: {
			markup: '<div class="mfp-iframe-scaler">'+
			'<div class="mfp-close"></div>'+
			'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
			'<div class="mfp-title mfp-bottom-iframe-title"></div>'+
			'</div>', // HTML markup of popup, `mfp-close` akan digantikan dengan close button

			patterns: {
				youtube: {
					index: 'youtube.com/',

					id: null,

					src: '%id%?autoplay=1'
				},
				vimeo: {
					index: 'vimeo.com/',
					id: '/',
					src: '//player.vimeo.com/video/%id%?autoplay=1'
				},
				gmaps: {
					index: '//maps.google.',
					src: '%id%&output=embed'
				}
			},

			srcAction: 'iframe_src', // Templating object key. Part pertama mengidentifikasi CSS selector, attribute kedua. "iframe_src" berarti: find "iframe" dan set attribute "src".
		},

		callbacks: {
			markupParse: function(template, values, item) {
				values.title = item.el.attr('title');
			}
		},
	});

	$('.ajax-page-load-link').magnificPopup({
		type: 'ajax',
		removalDelay: 300,
		mainClass: 'mfp-fade',
		gallery: {
			enabled: true
		},
	});

	//Form Controls
	$('.form-control')
	.val('')
	.on("focusin", function(){
		$(this).parent('.form-group').addClass('form-group-focus');
	})
	.on("focusout", function(){
		if($(this).val().length === 0) {
			$(this).parent('.form-group').removeClass('form-group-focus');
		}
	});

	//Google Maps
	$("#map").googleMap();
	$("#map").addMarker({
		address: "Indonesia, bengkulu"
	});
});

})(jQuery);
