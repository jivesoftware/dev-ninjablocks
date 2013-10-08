/*
 * Copyright 2013 Jive Software
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
var jive = require("jive-sdk");
var demo = require("../../../ninjablock-jw13");

module.exports = {
	eventHandlers : [
	                 {
	                     'event' : jive.constants.globalEventNames.INSTANCE_UPDATED,
	                     'handler' : processTileInstance
	                 },
	                 {
	                	 'event': jive.constants.globalEventNames.NEW_INSTANCE,
	                     'handler' : processTileInstance
	                 }
	                ],
     pushData : pushData
};

function processTileInstance(instance) {
	var color = Number(instance.config.color);

	jive.logger.debug('Pushing Tile Color ['+demo.colors[color].label+']');
	
	pushData(instance,color).then(
		function(success) {			
			jive.logger.debug('SUCCESS - Pushed Tile Color ['+demo.colors[color].label+']');
			demo.setLightColor(color).then(
				function(success) {	
					console.log('Successful Call to Ninja Blocks');
				},
				function(error) {
					console.log('Error in Call to Ninja Blocks');
				}
			);
		},
		function(error) {
		}
	);
	
} // end function

function pushData(instance,color) {
    var data = {
    	data : {
	    "message" : "NinjaBlocks Lights - " + demo.colors[color].label,
	    "sections" : demo.colors,
	    "activeIndex": color,
	    "status" : demo.colors[color].label
    	}
    };
       
    return jive.tiles.pushData( instance, data );	
} // end function