'use strict';
/*eslint-disable new-cap, no-unused-vars */
/*global  $, blueimp */

$(function(){
	if($('#kv').length){

		blueimp.Gallery($('#kv .links'), {
				container: '#blueimp-gallery-carousel',
				clearSlides: false,
				carousel: true,
				indicatorOptions: {
					// The tag name, Id, element or querySelector of the indicator container:
					indicatorContainer: 'ol',
					// The class for the active indicator:
					activeIndicatorClass: 'active',
					// Defines if the gallery indicators should display a thumbnail:
					thumbnailIndicators: false,

					stretchImages:false
				}
			}
		);
	}
});
