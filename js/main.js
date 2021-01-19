/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // Hubo un error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Algo salió mal. Inténtalo de nuevo.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // altura en la que se mostrará el botón
	var fadeInTime = 400; // Que lento o rápido quiero que se muestre el botón
	var fadeOutTime = 400; // Que lento o rápido quiero que se oculte el botón
	var scrollSpeed = 300; // qué tan lento / rápido deseo que el botón se desplace hacia arriba. puede ser un valor, 'lento', 'normal' o 'rápido'

  // Mostrar u ocultar el botón de pie de página adhesivo
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

})(jQuery);


/*==========START ESTILOS DE TESTIMONIALS==========*/
/* ===================================================================
 * Flare 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */
(function($) {
    "use strict";
    const cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: '' // mailchimp url
    };
    const $WIN = $(window);
    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    // const doc = document.documentElement;
    // doc.setAttribute('data-useragent', navigator.userAgent);
    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function() {
        $("html").addClass('ss-preload');
        $WIN.on('load', function() {
            // force page scroll position to top at page refresh
            $('html, body').animate({
                scrollTop: 0
            }, 'normal');
            // will first fade out the loading animation
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            });
            // for hero content animations
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        });
    };
    /* pretty print
     * -------------------------------------------------- */
    const ssPrettyPrint = function() {
        $('pre').addClass('prettyprint');
        $(document).ready(function() {
            prettyPrint();
        });
    };
    /* move header
     * -------------------------------------------------- */
    const ssMoveHeader = function() {
        const $hero = $('.s-hero'),
            $hdr = $('.s-header'),
            triggerHeight = $hero.outerHeight() - 170;
        $WIN.on('scroll', function() {
            let loc = $WIN.scrollTop();
            if (loc > triggerHeight) {
                $hdr.addClass('sticky');
            } else {
                $hdr.removeClass('sticky');
            }
            if (loc > triggerHeight + 20) {
                $hdr.addClass('offset');
            } else {
                $hdr.removeClass('offset');
            }
            if (loc > triggerHeight + 150) {
                $hdr.addClass('scrolling');
            } else {
                $hdr.removeClass('scrolling');
            }
        });
    };
    /* mobile menu
     * ---------------------------------------------------- */
    const ssMobileMenu = function() {
        const $toggleButton = $('.s-header__menu-toggle');
        const $headerContent = $('.s-header__content');
        const $siteBody = $("body");
        $toggleButton.on('click', function(event) {
            event.preventDefault();
            $toggleButton.toggleClass('is-clicked');
            $siteBody.toggleClass('menu-is-open');
        });
        $headerContent.find('.s-header__nav a, .btn').on("click", function() {
            // at 900px and below
            if (window.matchMedia('(max-width: 900px)').matches) {
                $toggleButton.toggleClass('is-clicked');
                $siteBody.toggleClass('menu-is-open');
            }
        });
        $WIN.on('resize', function() {
            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if ($siteBody.hasClass("menu-is-open")) $siteBody.removeClass("menu-is-open");
                if ($toggleButton.hasClass("is-clicked")) $toggleButton.removeClass("is-clicked");
            }
        });
    };
    /* photoswipe
     * ----------------------------------------------------- */
    const ssPhotoswipe = function() {
        const items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.folio-item');
        // get items
        $folioItems.each(function(i) {
            let $folio = $(this),
                $thumbLink = $folio.find('.folio-item__thumb-link'),
                $title = $folio.find('.folio-item__title'),
                $caption = $folio.find('.folio-item__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width = $size[0],
                $height = $size[1];
            let item = {
                src: $href,
                w: $width,
                h: $height
            }
            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }
            items.push(item);
        });
        // bind click event
        $folioItems.each(function(i) {
            $(this).find('.folio-item__thumb-link').on('click', function(e) {
                e.preventDefault();
                let options = {
                    index: i,
                    showHideOpacity: true
                }
                // initialize PhotoSwipe
                let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });
        });
    };
    /* slick slider
     * ------------------------------------------------------ */
    const ssSlickSlider = function() {
        $('.clients').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1000,
            responsive: [{
                breakpoint: 1000,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        });
        $('.testimonial-slider').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [{
                breakpoint: 600,
                settings: {
                    arrows: false,
                    dots: true
                }
            }]
        });
    };
    /* animate on scroll
     * ------------------------------------------------------ */
    const ssAOS = function() {
        AOS.init({
            offset: 100,
            duration: 600,
            easing: 'ease-in-out',
            delay: 300,
            once: true,
            disable: 'mobile'
        });
    };
    /* alert boxes
     * ------------------------------------------------------ */
    const ssAlertBoxes = function() {
        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        });
    };
    /* smooth scrolling
     * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        $('.smoothscroll').on('click', function(e) {
            const target = this.hash;
            const $target = $(target);
            e.preventDefault();
            e.stopPropagation();
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function() {
                window.location.hash = target;
            });
        });
    };
    /* back to top
     * ------------------------------------------------------ */
    const ssBackToTop = function() {
        const pxShow = 800;
        const $goTopButton = $(".ss-go-top")
        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if (!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };
    /* initialize
     * ------------------------------------------------------ */
    (function ssInit() {
        ssPreloader();
        ssPrettyPrint();
        ssMoveHeader();
        ssMobileMenu();
        ssPhotoswipe();
        ssSlickSlider();
        ssAOS();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();
    })();
})(jQuery);
/*==========STOP ESTILOS DE TESTIMONIALS==========*/