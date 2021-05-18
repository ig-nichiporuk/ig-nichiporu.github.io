$(document).ready(function() {
	if($('body').hasClass('touch')){
		check_device = true
	}
	else {
		check_device = false
	}
	$('.js-lot-zoom').lightGallery({
		speed: 200,
		preload: 3,
		swipeThreshold: 10,
		enableDrag:false,
		thumbnail: false,
		autoplayControls: false,
		hash: false,
		share: false,
		rotate:false,
		download: false,
		zoom: false,
		actualSize: false,

		controls: check_device ? false : true,
	});

	$('.js-coin-info-tab').on('click', function () {
		if(!$(this).hasClass('active')){
			$('.js-coin-info-block').addClass('hidden');
			$('.js-coin-info-tab').removeClass('active');
			$(this).addClass('active');
			$('.js-coin-info-content').find("div[data-block='" + $(this).attr('data-info') +"-block']").removeClass('hidden');
		}
	});
	$('.js-specification-title').on('click', function () {
		if($(this).hasClass('open')){
			$('.js-specification-title').removeClass('open');
			$('.js-specification-title').next().slideUp(200, 'linear');
		}
		else {
			$('.js-specification-title').removeClass('open');
			$('.js-specification-title').next().slideUp(200, 'linear');
			$(this).addClass('open');
			$(this).addClass('open').next().slideDown(200, 'linear');
		}
	});
	$(window).resize(function() {
		if($(window).width() > 1299) {
			$('.js-specification-title').removeClass('open');
			$('.js-specification-title').next().removeAttr('style');
		}
	});

})