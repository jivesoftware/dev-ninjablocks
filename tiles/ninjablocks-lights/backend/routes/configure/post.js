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
var demo = require("../../../../../ninjablock-jw13");
var services = require("../../services");

exports.route = function(req, res){

	var color = req.param('color');
	if (color) {
		color = Number(color);
	} // end if
	
	jive.logger.debug('POST /ninjablocks-lights/configure => [ color : '+color+' ]');	
	
	if (color > -1 && color < 9) {		
	    jive.tiles.findByDefinitionName( 'ninjablocks-lights' ).then( function(instances) {
	        if ( instances ) {
	            instances.forEach( function( instance ) {
	                jive.logger.debug('running setting color for ', instance.name, 'instance', instance.id );

	                services.pushData(instance,color).then(
	                    function(success) {
	                    	console.log('Succesfully Updated Remote Tile ['+color+']');
	                    	instance.config.color = color;
	                    	jive.tiles.save(instance).then(function(success) {
	                    		console.log('Succesfully Saved Configuration ['+color+']');
	                    	});
	                    },
	                    function(error) {
	                    	console.log('Error Updating Config ['+color+'] - '+error);	                    	
	                    }
                    );	
	            });
	        }
	    });
	    res.send(200, demo.colors[color].label);
	} else {
		console.log('Invalid Color ['+color+']');		
		res.send(400, "Invalid Color: "+color);
	} // end if
};