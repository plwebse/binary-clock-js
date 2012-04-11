# binary-clock-js
## a javascript widget that displays time in a binary format.

### Standard apperens

	<canvas width="120" height="80" id="binaryClockCanvas"> </canvas>
	<script src="binary-clock.js" type="text/javascript"></script>
	<script type="text/javascript">
	// <![CDATA[
		se.plweb.binaryClock();
	// ]]>
	</script>

### Changing the on color: 
	se.plweb.binaryClock( { color:{ on :"#FF0000" } } );
	
### Changing the off color
	se.plweb.binaryClock( { color:{ off :"#CCC" } } );

### Changing the inactive color
	se.plweb.binaryClock( { color:{ inactive :"#FF0000" } } );

### Changing all the colors
	se.plweb.binaryClock( {
		color: {
			on: "#FF0000",
			off: "transparent",
			inactive: "#CCC"
		}
	} );
 
### Changing all the parameters 
	se.plweb.binaryClock( {
		canvasId: "binaryClockCanvasId",
		color: { 
			on: "#FF0000",
			off: "transparent",
			inactive: "#CCC"
		}
	} );

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
