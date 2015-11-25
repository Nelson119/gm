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
		  variableWidth: true
		});
	}

	//nav
	if($('#menu').length){
		(function(header){
	        $('ul:eq(0)', header).superfish();

	        var kv = $('#kv');
	        var menu = $('>.fit', header);
			var tlheader = new TimelineMax({paused:true, onComplete:function(){}});

			var originTop = header.find('.logo').css('padding-top').replace(/px/ig,'') * 1;
			originTop = 666;
			var originBottom = header.find('.logo').css('padding-bottom').replace(/px/ig,'') * 1;
			

			for(var i = 0;i <= originTop;i++){
				var originScale = 2;
				var smallScale = 0.5;
				var scale = smallScale + (originTop - i) * (originScale - smallScale) / originTop;
				var opacity = 1 - i / originTop;
				var y = 300 / originTop * i;


				// tlheader.to(header.find('.logo'), 0.0000001, {paddingTop: (originTop - i )}, 'frame-' + i);
				tlheader.to(kv, 0.000000001, {height: (originTop - i) }, 'frame-' + i);
				// tlheader.to(kv, 1, {opacity: opacity }, 'frame-' + i);
				// tlheader.to(header.find('.logo img'), 0.0000001, {scale: scale, y: -300 +y}, 'frame-' + i);
			}
	        $(window).on('scroll', function(){
	        	var scrollTop = $(window).scrollTop();

				if(scrollTop < 666){
					tlheader.tweenTo('frame-'+scrollTop);
				}
				if(scrollTop >= 666){
					tlheader.tweenTo('frame-666');
	        		menu.addClass('fixed');
	        	}else{
	        		menu.removeClass('fixed');
	        	}

	        });
			tlheader.tweenTo('frame-0');
			window.tlheader = tlheader;
		}($('header')));
    }
});
