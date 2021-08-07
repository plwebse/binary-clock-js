/*

	Sample use
		
	<canvas width="120" height="80" id="binaryClockCanvas"></canvas>
	<script type="module" defer src="binary-clock.js" type="text/javascript"></script>
	<script type="module" defer>
		import {binaryClock} from './binary-clock.js'
		binaryClock();
	</script>
 
	Copyright 2011 Peter Lindblom
	http://plweb.se	
	ver 1.003
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

export function binaryClock(inputSettings) {
	let settings = {}, // settings used 
		defaultSettings = {
			color: { on: "rgb(255,0,0)", off: "rgb(51,51,51)", inactive: "transparent" },
			canvasId: "binaryClockCanvas"
		}, //  if a setting not defined use default
		height = 0,
		width = 0,
		colWidth = 0,
		colHeight = 0,
		canvasElement = null,
		ctx = null,
		inactivePoints = [{ c: 0, r: 0 }, { c: 0, r: 1 }, { c: 2, r: 0 }, { c: 4, r: 0 }],
		changeCellColor = function (color, col, row) {
			ctx.fillStyle = color;
			ctx.fillRect((col * colWidth), (row * colHeight), colWidth, colHeight);
		},
		toggleCellColor = function (toggleOn, col, row) {
			if (isAnInactivePoint(col, row)) {
				return;
			}

			changeCellColor((toggleOn ? settings.color.on : settings.color.off), col, row);
		},
		isAnInactivePoint = function (col, row) {
			for (const inactivePoint of inactivePoints) {
				if (inactivePoint.c === col && inactivePoint.r === row) {
					return true;
				}
			}
		},
		updateColumn = function (value, col) {
			toggleCellColor((value % 2 !== 0), col, 3);
			toggleCellColor(isPresent(value, [2, 3, 6, 7]), col, 2);
			toggleCellColor(isPresent(value, [4, 5, 6, 7]), col, 1);
			toggleCellColor(isPresent(value, [8, 9]), col, 0);
		},
		isPresent = function (value, values) {
			return (values.indexOf(value) > -1);
		},
		updateTime = function () {
			const now = new Date();
			updateColumn(Math.floor(now.getHours() / 10), 0);
			updateColumn(now.getHours() % 10, 1);
			updateColumn(Math.floor(now.getMinutes() / 10), 2);
			updateColumn(now.getMinutes() % 10, 3);
			updateColumn(Math.floor(now.getSeconds() / 10), 4);
			updateColumn(now.getSeconds() % 10, 5);
		},
		useDefaultSettings = function (inputSettings) {
			if (isUndefined(inputSettings)) {
				settings = defaultSettings;
			} else {
				settings = inputSettings;
				if (isUndefined(inputSettings.color)) {
					settings.color = defaultSettings.color;
				}
				if (isUndefined(inputSettings.color.on)) {
					settings.color.on = defaultSettings.color.on;
				}
				if (isUndefined(inputSettings.color.off)) {
					settings.color.off = defaultSettings.color.off;
				}
				if (isUndefined(inputSettings.color.inactive)) {
					settings.color.inactive = defaultSettings.color.inactive;
				}
			}
		},
		isUndefined = function (obj) {
			return (obj === undefined);
		},
		start = function (inputSettings) {
			useDefaultSettings(inputSettings);
			canvasElement = document.getElementById(settings.canvasId);

			if (canvasElement.getContext) {
				ctx = canvasElement.getContext('2d')
				width = canvasElement.width;
				height = canvasElement.height;
				colWidth = width / 6;
				colHeight = height / 4;

				for (const inactivePoint of inactivePoints) {
					changeCellColor(settings.color.inactive, inactivePoint.c, inactivePoint.r);
				}

				window.setInterval(updateTime, 1000);
			}
		};
	start(inputSettings);
};
