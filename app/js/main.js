'use strict';
/*eslint-disable new-cap, no-unused-vars */
/*global  $, TweenMax, TimelineMax */
var desktop = $('html.desktop').length === 1;
var mobile = $('html.mobile').length === 1;
var tablet = $('html.tablet').length === 1;

$(function(){
	/*
	* Replace all SVG images with inline SVG
	*/
	$('img.svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});


	//kv
	if($('#kv').length){
		$('#kv ul').slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 3000,
			easing: 'ease-out',
			pauseOnHover: true,
			speed: 750
		});

	}

	//nav
	if($('#menu').length){
		(function(header){

			if(desktop){

				$('ul:eq(0)', header).superfish();

				var kv = $('#kv');
				var menu = $('>.fit', header);
				var logo = $('.logo', header);
				var tlheader = new TimelineMax({paused: true, onStart: function(){
					var scrollTop = $(window).scrollTop();
					var h = menu.offset().top - scrollTop + 64;
					TweenMax.set(kv, {height: h});
				}});
				var distance = $('#kv').height();


				for(var i = 0; i <= distance; i++){
					var y = 0;
					var opacity = 0;
					if(i > 500){
						y = ((i - 500) / 116);
						opacity = (i - 500) / 116;
					}
					tlheader.to($('img', logo), 0.000000001, {y: y}, 'frame-' + i);
					tlheader.to(logo, 0.000000001, {opacity: opacity}, 'frame-' + i);
				}
				$(window).on('scroll', function(){
					var o = this;
					var scrollTop = $(window).scrollTop();

					if(scrollTop <= 616){
						tlheader.tweenTo('frame-' + scrollTop);
						var h = menu.offset().top - scrollTop + 50;
						TweenMax.set(kv, {height: h});
					}
					if(scrollTop >= 616){
						tlheader.tweenTo('frame-616');
						menu.addClass('fixed');
						kv.addClass('pinned');
						TweenMax.set(kv, {height: 50});
					}else{
						kv.removeClass('pinned');
						menu.removeClass('fixed');
					}
				}).trigger('scroll');
				tlheader.tweenTo('frame-0');
				window.tlheader = tlheader;

				$('li', menu).hover(function(){
					var o = this;
					$('li.active', menu).not(o).addClass('off');
				}, function(){
					$('li.active', menu).removeClass('off');
				});

			}else if(mobile || tablet){
				$('header #menu').mmenu({});
				var mmenu = $('.mm-menu').data( 'mmenu' );
				$('#mm').click(function(event) {
					event.preventDefault();
					mmenu.open();
				});
			}

		}($('header')));
	}

	//marquee
	if($('.marquee').length){
		(function(marquee){
			function nextMq(){
				var active = $('li.active', marquee);
				active = active.length > 0 ? active : $('li', marquee).first();
				if(active.hasClass('hold')){
					return;
				}
				if(active.next().length){
					active.next().siblings().removeClass('active');
					active.next().addClass('active');
				}else if(active.siblings().length){
					active.siblings().first().siblings().removeClass('active');
					active.siblings().first().addClass('active');
				}
			}
			if(!$('li.active', marquee).length){
				$('li', marquee).first().addClass('active');
			}
			$('li', marquee).hover(function(){
				$(this).addClass('hold');
			}, function(){
				$(this).removeClass('hold');
			});
			nextMq();
			var mqTick = setInterval(nextMq, 14000);
		}($('.marquee')));
	}

	//floating layer
	if($('.floating-banner').length){
		(function(floating){
			floating.stickyfloat({duration: 1800, delay: 0, stickToBottom: false, offsetY: 320, startOffset: 740, cssTransition: true});
		}($('.floating-banner')));
	}

	//clients
	if($('.clients').length){
		var num = $('.clients ul li').length;
		var s = $('.clients ul').slick({
			// dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			variableWidth: true,
			// autoplay: true,
			autoplaySpeed: 3000,
			easing: 'ease-out',
			pauseOnHover: true,
			speed: 750
		});

	}
});
