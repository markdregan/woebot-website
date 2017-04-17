$(document).ready(function () {
	/*=========================================================================
		YTPlayer Plugin Initialization
	=========================================================================*/
	"use strict";
	
	$(".player").YTPlayer({
		containment: "#intro",
		showControls: false,
		quality: "hd720",
		autoPlay: true,
		loop : true,
		mute: true,
		startAt: 0,
		opacity: 1
	});
	
});