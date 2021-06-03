$(document).ready(function() {
	$('.js-table-slider').each(function() {
		$(this).on('init', function () {
			$(this).closest('.table__slider').next().find('.js-table-slider-dots').empty();
			$(this).find('.slick-prev').prependTo($(this).closest('.table__slider').next().find('.js-table-slider-dots'));
			$(this).find('.slick-dots').appendTo($(this).closest('.table__slider').next().find('.js-table-slider-dots'));
			$(this).find('.slick-next').appendTo($(this).closest('.table__slider').next().find('.js-table-slider-dots'));
		});
		$(this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: true,
			fade: false,
			autoplay: false,
			swipe: false,
			speed: 300,
			touchThreshold: 100,
		});
	});
})