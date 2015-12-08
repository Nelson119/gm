'use strict';
/*eslint-disable new-cap, no-unused-vars, 
	no-use-before-define, no-trailing-spaces, 
	no-mixed-spaces-and-tabs, no-multi-spaces,
	key-spacing */
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
		$(document).ready(function($){
			//set animation timing
			var animationDelay = 2500,
				//loading bar effect
				barAnimationDelay = 3800,
				barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
				//letters effect
				lettersDelay = 50,
				//type effect
				typeLettersDelay = 150,
				selectionDuration = 500,
				typeAnimationDelay = selectionDuration + 800,
				//clip effect
				revealDuration = 600,
				revealAnimationDelay = 1500;


			function singleLetters($words) {
				$words.each(function(){
					var word = $(this),
						letters = word.text().split(''),
						selected = word.hasClass('is-visible');
					for (var i in letters) {
						if(word.parents('.rotate-2').length > 0){
							letters[i] = '<em>' + letters[i] + '</em>';
						}
						letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
					}
				    var newLetters = letters.join('');
				    word.html(newLetters).css('opacity', 1);
				});
			}

			function initHeadline() {
				//insert <i> element for each letter of a changing word
				singleLetters($('.cd-headline.letters').find('a'));
				//initialise headline animation
				animateHeadline($('.cd-headline'));
			}

			function hideWord($word) {
				var nextWord = takeNext($word);
				
				if($word.parents('.cd-headline').hasClass('type')) {
					var parentSpan = $word.parent('.cd-words-wrapper');
					parentSpan.addClass('selected').removeClass('waiting');	
					setTimeout(function(){ 
						parentSpan.removeClass('selected'); 
						$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
					}, selectionDuration);
					setTimeout(function(){ showWord(nextWord, typeLettersDelay); }, typeAnimationDelay);
				
				} else if($word.parents('.cd-headline').hasClass('letters')) {
					var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
					hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
					showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

				}  else if($word.parents('.cd-headline').hasClass('clip')) {
					$word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
						switchWord($word, nextWord);
						showWord(nextWord);
					});

				} else if ($word.parents('.cd-headline').hasClass('loading-bar')){
					$word.parents('.cd-words-wrapper').removeClass('is-loading');
					switchWord($word, nextWord);
					setTimeout(function(){ hideWord(nextWord); }, barAnimationDelay);
					setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading'); }, barWaiting);

				} else {
					switchWord($word, nextWord);
					setTimeout(function(){ hideWord(nextWord); }, animationDelay);
				}
			}

			function showWord($word, $duration) {
				if($word.parents('.cd-headline').hasClass('type')) {
					showLetter($word.find('i').eq(0), $word, false, $duration);
					$word.addClass('is-visible').removeClass('is-hidden');

				}  else if($word.parents('.cd-headline').hasClass('clip')) {
					$word.parents('.cd-words-wrapper').animate({ 'width': $word.width() + 10 }, revealDuration, function(){ 
						setTimeout(function(){ hideWord($word); }, revealAnimationDelay); 
					});
				}
			}

			function hideLetter($letter, $word, $bool, $duration) {
				$letter.removeClass('in').addClass('out');
				
				if(!$letter.is(':last-child')) {
				 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
				} else if($bool) { 
				 	setTimeout(function(){ hideWord(takeNext($word)); }, animationDelay);
				}

				if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
					var nextWord = takeNext($word);
					switchWord($word, nextWord);
				} 
			}

			function showLetter($letter, $word, $bool, $duration) {
				$letter.addClass('in').removeClass('out');
				
				if(!$letter.is(':last-child')) { 
					setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
				} else { 
					if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200); }
					if(!$bool) { setTimeout(function(){ hideWord($word); }, animationDelay); }
				}
			}

			function takeNext($word) {
				return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
			}

			function takePrev($word) {
				return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
			}

			function switchWord($oldWord, $newWord) {
				$oldWord.removeClass('is-visible').addClass('is-hidden');
				$newWord.removeClass('is-hidden').addClass('is-visible');
			}
			// var animationDelay = 8000;

			function animateHeadline($headlines) {
				$headlines.each(function(){
					var headline = $(this);
					//trigger animation
					setTimeout(function(){ hideWord(headline.find('.is-visible')); }, animationDelay);
				});
			}
			initHeadline();

			animateHeadline($('.cd-headline'));
		});
	}

	//floating layer
	if($('.floating-banner').length){
		(function(floating){
			floating.stickyfloat({duration: 750, delay: 0, stickToBottom: false, offsetY: 0, startOffset: 784, cssTransition: true});
		}($('.floating-banner')));
	}

	//vendors
	if($('.home .vendors').length){
		// var num = $('.home .vendors ul li').length;
		var s = $('.home .vendors ul').slick({
			// dots: true,
			infinite: true,
			slidesToShow: 9,
			slidesToScroll: 9,
			centerMode: true,
			variableWidth: true,
			// autoplay: true,
			autoplaySpeed: 0,
			arrows: false,
			// cssEase: 'linear',
			pauseOnHover: true,
			speed: 4000
		});
		// $('.home .vendors ul li a').eq(num / 2).trigger('click');
		// $('.home .vendors ul').on('hover', function(){
		// 	s.slickPause();
		// 	$('.slick-track').stop();
		// }, function(){
		// 	s.slickPlay();
		// });
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
