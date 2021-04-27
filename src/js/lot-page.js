$(document).ready(function() {
	if($('body').hasClass('touch')){
		check_device = true
	}
	else {
		check_device = false
	}
	$('.js-photoswipe').jqPhotoSwipe({
		closeEl:true,
		captionEl: true,
		fullscreenEl: true,
		zoomEl: false,
		shareEl: false,
		counterEl: true,
		arrowEl: true,
		preloaderEl: true,
		clickToCloseNonZoomable: true,
		tapToClose: true,
		tapToToggleControls: true,
		mainClass: 'product__gallery-watch',
		closeOnScroll: false,
		loop: true,
		// getDoubleTapZoom : false,
		// forceSingleGallery: true
	});
	$('.js-product__photo-for').on('init', function () {
		$('.slick-dots').wrap("<div class='slider__controls'></div>");
		$('.slick-prev').prependTo('.slider__controls');
		$('.slick-next').appendTo('.slider__controls');
	});
	$('.js-product__photo-for').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 2,
		slidesToScroll: 2,
		arrows: check_device ? false : true,
		dots: true,
		fade: false,
		// asNavFor: $(this).next('.js-product__photo-nav'),
		autoplay: false,
		swipe: check_device ? true : false,
		speed: 300,
		touchThreshold: 100,
	});
})