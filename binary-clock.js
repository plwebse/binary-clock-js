/*
	Made By Peter Lindblom 2011
	http://www.plweb.se
	ver 1.002
*/

var se = {};
se.plweb = {};
se.plweb.binaryClock = function (inputSettings) {
	"use strict";
	
	var settings = {}, // settings used 
	defaultSettings = {
		color: { on: "rgb(255,0,0)", off: "rgb(51,51,51)", inactive: "transparent" },
		canvasId: "binaryClockCanvas"
	}, //  if a setting not defined use default
	height = 0 ,
	width = 0,
	colWidth = 0,
	colHeight = 0,
	
	changeCellColor = function (color, col, row) {
		var ctx = document.getElementById(settings.canvasId).getContext('2d');	
		ctx.fillStyle = color;
		ctx.fillRect ((col * colWidth), (row * colHeight), colWidth, colHeight);		
	},
	
	updateColumn = function (value, col) {
		if (value % 2 !== 0) {
			changeCellColor(settings.color.on, col, 3);
		} else {					
			changeCellColor(settings.color.off, col, 3);
		}

		if (value === 2 || value === 3 || value === 6 || value === 7) {
			changeCellColor(settings.color.on, col, 2);
		} else {					
			changeCellColor(settings.color.off, col, 2);
		}

		if (value === 4 || value === 5 || value === 6 || value === 7) {
			changeCellColor(settings.color.on, col, 1);
		} else if (col !== 0) {
			changeCellColor(settings.color.off, col, 1);
		}

		if (value === 8 || value === 9) {
			changeCellColor(settings.color.on, col, 0);
		} else if (col === 1 || col === 3 || col === 5) {
			changeCellColor(settings.color.off, col, 0);
		}
	},
	
	updateTime = function(){
		var now = new Date();		
		updateColumn(Math.floor(now.getHours() / 10), 0);
		updateColumn(now.getHours() % 10, 1); 
		updateColumn(Math.floor(now.getMinutes() / 10), 2);
		updateColumn(now.getMinutes() % 10, 3);				
		updateColumn(Math.floor(now.getSeconds() / 10), 4);				
		updateColumn(now.getSeconds() % 10, 5);
	},
	
	useDefaultSettings = function (inputSettings) {
		if (inputSettings === undefined) {
			settings = defaultSettings;
		} else {
			settings = inputSettings;
			if (inputSettings.color === undefined) {
				settings.color = defaultSettings.color;
			}
			if (inputSettings.color.on === undefined) {
				settings.color.on = defaultSettings.color.on;
			}
			if (inputSettings.color.off === undefined) {
				settings.color.off = defaultSettings.color.off;
			}
			if (inputSettings.color.inactive === undefined) {
				settings.color.inactive = defaultSettings.color.inactive;
			}
		}
	},
	
	start = function (inputSettings) {

		useDefaultSettings(inputSettings);
		var canvasElement = document.getElementById(settings.canvasId);
		
		if (canvasElement.getContext){
		
			width = canvasElement.width;
			height = canvasElement.height;		
			colWidth = width / 6;
			colHeight = height / 4;	
			
			changeCellColor(settings.color.inactive, 0, 0);
			changeCellColor(settings.color.inactive, 0, 1);
			changeCellColor(settings.color.inactive, 2, 0);
			changeCellColor(settings.color.inactive, 4, 0);

			window.setInterval(updateTime, 1000);
		}
	};
	start(inputSettings);
};
