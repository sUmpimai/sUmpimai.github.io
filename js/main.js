 AOS.init({
  duration: 800,
  easing: 'slide-up',
  once: true
 });
(function($) {

	'use strict';

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

    /**
   * Easy event listener function
   */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }

  // loader
  var loader = function() {
    setTimeout(function() { 
      if($('#loader').length > 0) {
        $('#loader').removeClass('show');
      }
    }, 1);
  };
  loader();

  $(window).on("scroll", function() {
    if($(window).scrollTop()>700) {
      $("header").addClass("fixed-top bg-white border-bottom shadow-sm");
    } else {
      $("header").removeClass("fixed-top bg-white border-bottom shadow-sm");
    }
  });

  $('.work-thumb img').hover(function(){
    var $this = $(this);
		$this.css("opacity","1");
  }, function(){
    var $this = $(this);
		$this.css("opacity","0");
  });  
  
  $('.nonloop-block-11').owlCarousel({
      center: false,
      items: 1,
      loop: true,
      autoplay: true,
      stagePadding: 20,
      margin:50,
      nav: false,
      dots: true,
      smartSpeed: 1000,
      navText: ['<span class="ion-chevron-left">', '<span class="ion-chevron-right">'],
      responsive:{
        600:{
          stagePadding: 20,
          items:1
        },
        800:{
          stagePadding: 20,
          items:2
        },
        1000:{
          items:2
        }
      }
    });

  var siteStellar = function () {
    $(window).stellar({
      responsive: false,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: 'scroll'
    });
  };
  siteStellar();

	var contentWayPoint = function() {
		var i = 0;
		$('.element-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('element-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .element-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn element-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft element-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight element-animated');
							} else {
								el.addClass('fadeInUp element-animated');
							}
							el.removeClass('item-animate');
						},  k * 100);
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });
  
})(jQuery);