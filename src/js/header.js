$(document).ready(function() {

	$('.js-finder-input').on('keyup', function() {

		if($(this).val().length >= 1) {
			$('.js-finder-input').val($(this).val());
			$(this).closest('.js-finder-wrap').addClass('open');
			$('.js-finder-body').slideDown(200, 'linear');

			/*if($('.js-finder-wrap').hasClass('js-finder-mob')) {
				$('.js-finder-body-mob').slideDown(200, 'linear');
			}
			else {
				$('.js-finder-body').slideDown(200, 'linear');
			}*/
		}
		else {
			$('.js-finder-body, .js-finder-body-mob').slideUp(200, 'linear');
			$('.js-finder-wrap').removeClass('open');
		}
	});


	$(document).mousedown(function(e){
		if(!$('.js-catalog-menu').is(e.target) && !$('.js-catalog-wrap').is(e.target)
			&& $('.js-catalog-menu').has(e.target).length === 0
			&& $('.js-catalog-wrap').has(e.target).length === 0) {
			close_catalog_menu();
			enableScroll();
		}
		if(!$('.js-finder-wrap').is(e.target) && !$('.js-finder-body').is(e.target)
			&& $('.js-finder-wrap').has(e.target).length === 0
			&& $('.js-finder-body').has(e.target).length === 0){
			close_finder_body();
		}
		e.stopPropagation();
	});










	$('.js-catalog-menu').on('click', function() {
		if($(this).hasClass('open')){
			close_catalog_menu();
		}
		else {
			$('.js-catalog-menu').addClass('open');
			// $('.js-catalog').slideDown(400);
			$('.js-catalog').removeClass('close').addClass('open');
		}

		if($(window).width() < 780) {
			if ($('.js-catalog-menu').hasClass('open')) {
				disableScroll();
			} else {
				enableScroll();
			}
		}
	})


	$('.js-country-btn').on('click', function() {
		$('.js-countries-list').removeClass('open');
		$('.js-countries-sublist').addClass('open');
	});
	$('.js-catalog-back').on('click', function() {
		$('.js-countries-list').addClass('open');
		$('.js-countries-sublist').removeClass('open');
	});
	$('.js-catalog-back-countries').on('click', function () {
		$('.js-countries-list, .js-countries-wrap').removeClass('open');
	});



	$('.js-continent-btn').on('click', function() {
		$('.js-continent-btn').removeClass('active');
		$(this).addClass('active');
		$('.js-countries-wrap').addClass('open');
		$('.js-countries-list').addClass('open');
		$('.js-countries-sublist').removeClass('open');
	});



	$('.js-finder-open-input').on('click', function() {
		$('.js-finder-animate-block').addClass('open');
		$('.mob .js-finder-wrap').addClass('js-finder-mob');
		$('body').addClass('overlay-open mob-finder-open');
		disableScroll();
	});
	$('.js-finder-animate-close').on('click', function () {
		enableScroll();
		close_finder_body();
		$('body').removeClass('overlay-open mob-finder-open');
	});



	function mob_control() {
		if($(window).width() >= 780) {
			$('.js-countries-list').addClass('open');
			$('.js-countries-sublist').removeClass('open');
			enableScroll();
		}
		else {
			if ($('.js-catalog-menu').hasClass('open')) {
				disableScroll();
			}
			$('.js-countries-list').removeClass('open');
		}
		if($(window).width() > 639 && $('.js-finder-animate-block').hasClass('open')) {
			$('.js-finder-animate-block').removeClass('open');
			$('body').removeClass('overlay-open mob-finder-open');
			enableScroll();
		}
	}
	mob_control();
	$( window ).resize(function() {
		mob_control();

	});


})
