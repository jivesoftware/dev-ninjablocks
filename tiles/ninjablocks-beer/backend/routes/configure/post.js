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
var services = require("../../datapusher");

exports.route = function(req, res){

	/*
	 * { "G":"0101",
	 *   "V":0,
	 *   "D":31,
	 *   "DA":28.9,
	 *   "timestamp":1379624575501,
	 *   "node":"2113BB000699",
	 *   "GUID":"2113BB000699_0101_0_31",
	 *   "id":"bf170bac-fe48-11e2-bfe5-22000a9d2c4c"
	 *  }
	 */
	var temperature = req.body.DA;
	var timestamp = new Date();
	
	jive.logger.debug('POST /ninjablocks-beer/configure => [ temperature : '+temperature+', timestamp='+timestamp+' ]');	
	
	if (temperature) {		
		
        services.pushData(temperature,timestamp);
        
    	res.send(200, '[ temperature : '+temperature+', timestamp='+timestamp+' ]');
	} else {
		console.log('Invalid Temperature ['+temperature+']');		
		res.send(400, "Invalid Temperature: "+temperature);
	} // end if
};