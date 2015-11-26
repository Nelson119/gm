'use strict';
/*eslint-disable new-cap, no-unused-vars */
/*global  $, blueimp */

$(function(){
	//kv
	if($('#kv').length){
		$('#kv ul').slick({
		  dots: true,
		  infinite: true,
		  speed: 300,
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
	        $('ul:eq(0)', header).superfish();

	        var kv = $('#kv');
	        var menu = $('>.fit', header);
	        var logo = $('.logo', header);
			var tlheader = new TimelineMax({paused:true, onStart:function(){
	        	var scrollTop = $(window).scrollTop();
				var h = menu.offset().top - scrollTop + 64;
				TweenMax.set(kv,{height: h});
			}});
			var distance = 616;
			

			for(var i = 0;i <= distance;i++){
				var y = 0;
				var opacity = 0;
				if(i > 500){
					y = ((i - 500) / 116) + 1;
					opacity = (i - 500) / 116;
				// var y = 300 / distance * i;

				}
				tlheader.to($('img', logo), 0.000000001, {y: y}, 'frame-' + i);
				tlheader.to(logo, 0.000000001, {opacity: opacity}, 'frame-' + i);
			}
	        $(window).on('scroll', function(){
	        	var o = this;
			    // clearTimeout($.data(o, 'scrollTimer'));
			    // $.data(o, 'scrollTimer', setTimeout(function() {
		        	var scrollTop = $(window).scrollTop();

					if(scrollTop <= 616){
						tlheader.tweenTo('frame-'+scrollTop);
						var h = menu.offset().top - scrollTop + 50;
						TweenMax.set(kv,{height: h});
					}
					if(scrollTop >= 616){
						tlheader.tweenTo('frame-616');
		        		menu.addClass('fixed');
		        		kv.addClass('pinned');
						TweenMax.set(kv,{height: 50});
		        	}else{
		        		kv.removeClass('pinned');
		        		menu.removeClass('fixed');
		        	}
			    // 	clearTimeout($.data(o, 'scrollTimer'));
			    // }, 1));

	        }).trigger('scroll');
			tlheader.tweenTo('frame-0');
			window.tlheader = tlheader;
		}($('header')));
    }
});
