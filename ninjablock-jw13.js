var q = require('q');
var jive = require('jive-sdk');
var api = require('./ninjablock-api');

var DEVICE_CAMERA_ID = "test";
var PRIMARY_NODE_ID = "2113BB000699"; // ryan's NinjaBlock
var PRIMARY_BLOCK_ID = PRIMARY_NODE_ID;

exports.colors = [
  	{ "label": "Off",		"color": "#000000" },
  	{ "label": "Teal",		"color": "#5AC4CD" },
  	{ "label": "Pink",		"color": "#E9248E" },
  	{ "label": "Orange",	"color": "#F89829" },
  	{ "label": "Purple",	"color": "#C442B0" },
  	{ "label": "Green",		"color": "#5AB45C" },
  	{ "label": "Red",		"color": "#C44242" },
  	{ "label": "Blue",		"color": "#6896CE" }
]; // end export

exports.beerTemperatures = [
	{ "label": "Warm",		"color": "#ff0000" },
	{ "label": "Cool",		"color": "#dcdc00" },
	{ "label": "Cold",		"color": "#00bb00" }
]; // end export

exports.webhooks = {
		guid : "WEBHOOK_0_0_108",
		lights : [
		     { 	id  : "ZCBvb", secret: "GRiANKjJqvU7tktK7cqI6jPvwzUYe2xDr3MePWc0Foc" },  /** Off **/
		     { 	id  : "VLrpr", secret: "55tqyUUqNzpr32H4QqjOc327HQxNDM7F2JYiKmU" }, 	 /** Teal **/
		     { 	id  : "WLGTY", secret: "NdAzgVZma8vdpynBgdWlmMinWdM5YrclkscCMYoescE" },  /** Pink **/
		     { 	id  : "5Ilfp", secret: "sAGjPFGWoSSNxylMMkAS2fSzPvIK3FHxaBhyTcniQkc" },  /** Orange **/
		     { 	id  : "3Czuj", secret: "9UZoqFFl2YwUEfaKIkSfUCQ9VwTEOHIQO1AOi8OfxQ" },   /** Purple **/
		     { 	id  : "3OMQM", secret: "8viBvpK3B4l0IoY7XKR3GQrgdBbatAEbc5vGfYDiI" },	 /** Green **/
		     { 	id  : "Xp0hK", secret: "GiDUmoyx4F9KYp8OBM3r6QUm9GYDMl6QbukErb7DA" },	 /** Red **/
		     { 	id  : "ojKKn", secret: "J6ITvMnvyOA2ohlFOxU1zeOwB7u3iFB0zfbAIzGuzE" }	 /** Blue **/
		],
		cameras : [
		     { 	id  : "TODO", secret: "TODO" },  /** MAIN - TODO **/
		     { 	id  : "TODO", secret: "TODO" },  /** TODO **/
		     { 	id  : "TODO", secret: "TODO" },  /** TODO **/
		     { 	id  : "TODO", secret: "TODO" }  /** TODO **/
		],
		ninas : [
		     { 	id  : "TODO", secret: "TODO" },  /** Happy **/
		     { 	id  : "TODO", secret: "TODO" },  /** Mad **/
		     { 	id  : "TODO", secret: "TODO" },  /** Love **/
		     { 	id  : "TODO", secret: "TODO" },  /** Sad **/
		]
}; // end export

//TODO REGISTER ALL DEVICES IN DEMO AS EXPORT
exports.devices = {
		cameras : {
			isight : {	channel: '0',	vendorID: 0,	deviceID: 236	}
		},
		lights : {
			light1 : {	channel: '0',	vendorID: 0,	deviceID: 236	},
			light2 : {	channel: '0',	vendorID: 0,	deviceID: 5		},	
			light3 : {	channel: '0',	vendorID: 0,	deviceID: 11	},
			nina : 	 {	channel: '0',	vendorID: 0,	deviceID: 1007	}
		},
		buttons : {
			button1 : {	channel: '0',	vendorID: 0,	deviceID: 236	},
			button2 : {	channel: '0',	vendorID: 0,	deviceID: 5		},	
			button3 : {	channel: '0',	vendorID: 0,	deviceID: 11	}	
		},
		sensors : {
			temperature : 	{	channel: '0101',	vendorID: 0,	deviceID: 31	},
			humidity : 		{	channel: '0101',	vendorID: 0,	deviceID: 30	},
			magswitch : 	{	channel: '0',		vendorID: 0,	deviceID: 5		},	
			motion : 		{	channel: '0',		vendorID: 0,	deviceID: 11	}	
		}
}; // end export

exports.getCameraSnapshot = function() {
	return api.getImageSnapshot(DEVICE_CAMERA_ID);
}; // end function

exports.sendConfigEvent = function(device,value,callback) {
	return api.sendConfigEvent(PRIMARY_NODE_ID,assembleConfigEvent(device,value));
}; // end function

exports.sendDataEvent = function(device,value) {
	return api.sendDataEvent(PRIMARY_NODE_ID,assembleDeviceData(device,value));
}; // end function

exports.setLightColor = function(colorIndex) {
	return api.tickleWebHook(this.webhooks.guid,this.webhooks.lights[colorIndex]);
}; // end function

function assembleDeviceData(device,value) {
	return {
		G : device.channel,
		V : device.vendorID,
		D : device.deviceID,
		DA : value
	};
} // end function

function assembleConfigEvent(device,event) {
	return {
		G : device.channel,
		V : device.vendorID,
		D : device.deviceID,
		type : event
	};
} // end function