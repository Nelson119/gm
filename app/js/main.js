'use strict';
/*eslint-disable new-cap, no-unused-vars */
/*global  $, blueimp */

$(function(){
	//kv
	if($('#kv').length){

		// blueimp.Gallery($('#kv .links'), {
		// 		container: '#blueimp-gallery-carousel',
		// 		clearSlides: false,
		// 		carousel: true,
		// 		indicatorOptions: {
		// 			// The tag name, Id, element or querySelector of the indicator container:
		// 			indicatorContainer: 'ol',
		// 			// The class for the active indicator:
		// 			activeIndicatorClass: 'active',
		// 			// Defines if the gallery indicators should display a thumbnail:
		// 			thumbnailIndicators: false,

		// 			stretchImages:false
		// 		}
		// 	}
		// );
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
        $('#menu ul:eq(0)').superfish({
            onShow: function(){
            	console.log(this);
            }
        });
    }
});
