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
		$('#kv').clone().attr('id', 'kvm').removeAttr('class').insertAfter($('#kv'));
		var el = $('#kv ul').slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true,
			// autoplay: true,
			autoplaySpeed: 3000,
			easing: 'ease-out',
			pauseOnHover: true,
			speed: 750
		});
		$('#kvm ul').slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
			variableWidth: false,
			// autoplay: true,
			autoplaySpeed: 3000,
			easing: 'ease-out',
			pauseOnHover: true,
			speed: 750
		});

	}

	//nav
	if($('#menu').length){
		(function(header){

			$('#mm').on('click', function(ev){
				if($('.mmenu-head').hasClass('on')){
					$('.mmenu-head').removeClass('on');
					$('body').removeClass('menuon');
					$('.mmenu-head li').removeClass('on');
				}else if($('.mmenu-head').hasClass('onsearch')){
					$('.mmenu-head').removeClass('onsearch');
					$('body').removeClass('menuon');
					$('.mmenu-head li').removeClass('on');
				}else{
					TweenMax.set('html,body', {scrollTop: 0});
					$('.mmenu-head').addClass('on');
					$('body').addClass('menuon');
				}
			});
			$('.mmenu-head').append($('#menu ul:eq(0)').clone());
			$('.mmenu-head ul >li a').on('click', function(){
				if(!$(this).parent().hasClass('on')){
					$(this).parent().addClass('on').siblings().removeClass('on');
				}else{
					$(this).parent().removeClass('on');
				}
			});
			$('.mmenu-head .search').on('click', function(ev){
				TweenMax.set('html,body', {scrollTop: 0});
				$('.mmenu-head').addClass('onsearch');
				$('body').addClass('menuon');
			});

			$('ul:eq(0)', header).superfish();

			var menu = $('>.fit', header);

			if($('#kv').length){

				var kv = $('#kv');
				var logo = $('.logo', header);
				var tlheader = new TimelineMax({paused: true, onStart: function(){
					var scrollTop = $(window).scrollTop();
					var h = menu.offset().top - scrollTop + 64;
					TweenMax.set(kv, {height: h});
				}});
				var distance = 666;

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
				$(window).on('scroll resize', function(){
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
			}else{
				menu.addClass('fixed');
				$(window).on('scroll resize', function(){
					var o = this;
					var scrollTop = $(window).scrollTop();
					var distance1 = 140;
					var target = 78 + 50;
					var ratio = scrollTop / distance1;
					var dist = 60;
					var logoDist = 50;

					var h = 180 - target * ratio;
					var mg = 51 - 50 * ratio;
					var size = 60 - 10 * ratio;
					if(h < 50){
						$('header a.logo').height(50);
					}else{
						$('header a.logo').height(h);
						$('header #logo').css('margin-top', mg);
						$('header #logo').height(size);
					}

					if(mg < 1){
						$('header #logo').css('margin-top', 1);
					}else{
						$('header #logo').css('margin-top', mg);
					}

					if(size < 50){
						$('header #logo').height(50);
					}else{
						$('header #logo').height(size);
					}

				}).trigger('scroll');
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
			floating.stickyfloat({duration: 750, delay: 0, stickToBottom: false, offsetY: 0, startOffset: 784, cssTransition: true});
		}($('.floating-banner')));
	}

	//vendors
	if($('.home .vendors').length){
		var num = $('.home .vendors ul li').length;
		var s = $('.home .vendors ul').slick({
			// dots: true,
			infinite: true,
			slidesToShow: 9,
			slidesToScroll: 9,
			centerMode: true,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 0,
			// easing: 'linear',
			arrows: false,
			cssEase: 'linear',
			pauseOnHover: true,
			speed: 4000
		});
		$('.home .vendors ul li a').eq(num / 2).trigger('click');
	}

	//show go to top

	if($('.gotop').length){
		$(window).on('scroll', function(){
			var scrollTop = $(window).scrollTop() + $(window).height();
			if(scrollTop >= $('.footer').offset().top){
				$('.gotop').addClass('in');
			}
			else{
				$('.gotop').removeClass('in');
			}
			$('.gotop').unbind('click');
			$('.gotop').bind('click', function(){
				var tl = new TimelineMax();
				// tl.add(
				// 	TweenMax.to('html', 0.1, {
				// 		opacity: 0.15
				// 	})
				// );

				// tl.set('html,body', {
				// 	scrollTop: 690
				// });

				tl.add([
					TweenMax.to('html', 0.6, {
						opacity: 1
					}),
					TweenMax.to('html,body', 0.6, {
						scrollTop: 0
					})
				]);
			});
		}).trigger('resize');
	}

	// search result
	if($('input[name=search-term]').length){
		$('input[name=search-term]').keyup(function (e) {
			if (e.keyCode === 13) {
				location.href = 'search.html?s=' + this.value;
			}
		});


	}

	//
	if($('.page.vendors #gallery .slides').length){
		$('.page.vendors #gallery .slides').slick({
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			asNavFor: '.page.vendors #gallery .slide-thumb'
		});
		$('.page.vendors #gallery .slide-thumb').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			asNavFor: '.page.vendors #gallery .slides',
			focusOnSelect: true,
			centerMode: true
		});
	}
	if($('.page.vendors').length){

		$('#gallery .zoom').on('click', function(){
			var data = [];
			$('#gallery ul li').each(function(){
				data.push({
					src: $('figure img', this).attr('src'),
					type: 'image/jpeg',
					thumb: $('figure img', this).attr('src')
				});
			});
			$(this).lightGallery({
				dynamic: true,
				dynamicEl: data
			});
		});
	}
});
