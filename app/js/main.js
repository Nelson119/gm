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
			var tlheader = new TimelineMax({paused:true, onComplete:function(){}});

			var originTop = header.find('.logo').css('padding-top').replace(/px/ig,'') * 1;
			originTop = isNaN(originTop) ? 666 : originTop;
			var originBottom = header.find('.logo').css('padding-bottom').replace(/px/ig,'') * 1;
			

			for(var i = 0;i <= originTop;i++){
				var originScale = 2;
				var smallScale = 0.5;
				var scale = smallScale + (originTop - i) * (originScale - smallScale) / originTop;
				var opacity = 1 - i / originTop;
				var y = 300 / originTop * i;


				tlheader.to(header.find('.logo'), 0.0000001, {paddingTop: (originTop - i )}, 'frame-' + i);
				tlheader.to(kv, 0.0000001, {opacity: opacity - 0.3}, 'frame-' + i);
				tlheader.to(header.find('.logo img'), 0.0000001, {scale: scale, y: -300 +y}, 'frame-' + i);
				tlheader.add('')
			}
	        $(window).on('scroll', function(){
	        	var to = $(window).scrollTop();
	        	to = (to > originTop ? originTop : to);
				tlheader.tweenTo('frame-' + to);

	        });
			tlheader.tweenTo('frame-0');
			window.tlheader = tlheader;
		}($('header')));
    }
});
