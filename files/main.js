// Check mobiles
function is_mobile() {return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));}

jQuery(function($) {
	
	// Mobile full-width
	if(is_mobile()) {
		$('html').css('width', window.innerWidth + 'px');
		$('.cre-animate').css({'visibility' : 'visible', 'top' : 0, 'left' : 0, 'transform': 'none', '-webkit-transform': 'none', '-moz-transform': 'none', '-ms-transform': 'none', '-o-transform': 'none', 'scale' : 1, 'opacity' : 1}).removeClass('.cre-animate');
	}else{
		$('.step-item, .step-arrow').fStepwise({el_delay : 100});
		$('.cert-item').fStepwise({el_delay : 200});
	}
	
	// Slider reviews
	$('.reviews-slider').owlCarousel({navigation:false, slideSpeed:300, singleItem:true});
	$('.extra-slider').owlCarousel({navigation:false, slideSpeed:300, items:3,itemsDesktop : false, itemsDesktopSmall : false, itemsTablet: false, itemsTabletSmall: false, itemsMobile : false });
	
	// Jump links
	$('.si-jump').click(function() {
	
		elementClick = $(this).attr("href");
		e_pos = elementClick.indexOf('#');
		elementClick = elementClick.substr(e_pos);
		destination = $(elementClick).offset().top;
		$("html, body").animate({scrollTop: destination}, 700);
		
		return false;
	
	})
	
	// Services logic
		
		// Expand extra
		$('.show-service-extra').click(function() {
			
			var $extra = $(this).next('.service-extra');
			
			if ($extra.is(':hidden')) {
				
				$extra.slideDown(500);
				$(this).text('- Базовые услуги');
				
			}else{
			
				$extra.slideUp(500);
				$(this).text('+ Базовые услуги');
			
			}
			
			return false;
			
		})
		
		
		// Services dropdown
		$('.service-collapse').click(function() {
			
			if ($(this).hasClass('disabled')) return false;
			
			var $text = $(this).prev('.service-text');
			
			if ($text.is(':hidden')) {
				
				$text.slideDown(500);
				$(this).removeClass('collapse');
				
			}else{
			
				$text.slideUp(500);
				$(this).addClass('collapse');
			
			}
		
			return false;
		
		})
		
	

	// Modal photos
	$('a[data-rel]').each(function() {$(this).attr('rel', $(this).data('rel'));});
	$('a[rel^=fancybox]').fancybox();
		
		
	// Mask phone
	$('.client-phone').mask('+9 (999) 999-99-99');
	
	
	// IE placeholders
	$('input[placeholder], textarea[placeholder]').placeholder();
	
	
	
	// Modals
	
		// Phone modal
		$('.open-phone-modal').click(function() {
			$('.si-overlay').css({'height': $(document).height(), 'width' : $(document).width()});
			$('.si-overlay, .phone-modal').fadeIn(700);
			$('.phone-modal .send-extra').val($(this).data('extra'));
			return false;
		})
			
		// Order modal
		$('.open-order-modal').click(function() {
			$('.si-overlay').css({'height': $(document).height(), 'width' : $(document).width()});
			$('.si-overlay, .order-modal').fadeIn(700);
			$('.order-modal .send-extra').val($(this).data('extra'));
			return false;
		})
					
		// Simple modal
		$('.open-simple-modal').click(function() {
			$('.si-overlay').css({'height': $(document).height(), 'width' : $(document).width()});
			$('.si-overlay, .simple-modal').fadeIn(700);
			return false;
		})
		
			
			// Modal controls
			
			$('.si-close').click(function() {
			
				$('.si-overlay').fadeOut(700);
				$('.si-modal').fadeOut(700);
				$('.si-success-modal').fadeOut(700);

				return false;
				
			})
				
			$('.si-overlay').click(function() {
			
				$('.si-overlay').fadeOut(700);
				$('.si-modal').fadeOut(700);
				$('.si-success-modal').fadeOut(700);
				
				return false;
				
			})
		
	
	// Form validate 
	$('.send-form').submit(function() {
		
		var name = $(this).find('.client-name');
		var mail = $(this).find('.client-mail');
		var phone = $(this).find('.client-phone');
		var mess = $(this).find('.client-message');
		
		send = 1;
		
		if (name.val() == '') {
			name.si_show_message('Укажите ваше имя');
			send = 0;
		}
				
		if (phone.size() > 0 && phone.val() == '') {
			phone.si_show_message('Укажите ваш телефон');
			send = 0;
		}
						
		if (mail.size() > 0 && mail.val() == '') {
			mail.si_show_message('Укажите ваш E-mail');
			send = 0;
		}
								
		if (mess.size() > 0 && mess.val() == '') {
			mail.si_show_message('Укажите ваше сообщение');
			send = 0;
		}
		
		if (send == 0) 
			return false;
		
		$.post($(this).prop('action'), $(this).serialize(), function(res) {
		
			if (res.success == 1) {
	
				$('.si-modal').fadeOut(500);
				$('.si-success-modal').fadeIn(500);
				$('.si-overlay').css({'height': $(document).height(), 'width' : $(document).width()}).fadeIn(500);
				
				name.val('');
				if (phone.size() > 0) phone.val('');
				if (mail.size() > 0) mail.val('');
				if (mess.size() > 0) mess.val('');
				
				/*
				
					yaCounter.reachGoal('target' + res.id);
					
					switch (res.id) {
					
						case 1: ga('send', 'event', '', ''); break;
					
					}
					
				*/
				
			}else{
				alert(res.text);
			}
		
		}, 'json');
		
		return false;
	
	})	
	
})

ymaps.ready(function(){
					
	myMap = new ymaps.Map("map", {
		center: [51.802146,55.155166],
		zoom: 15
	});
		
		myMap.controls.add('mapTools');
		myMap.controls.add('typeSelector');
		myMap.controls.add('zoomControl');
		
		var myPlacemark = new ymaps.Placemark(
			[51.802146,55.155166], {},
			{
				iconImageHref: '../../test.mgkub.ru/unikom/images/pin.png',
				iconImageSize: [24, 35],
				iconImageOffset: [-12,-17]
			}
		);
		
		myMap.geoObjects.add(myPlacemark);

})