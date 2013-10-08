var q = require('q');
var jive = require('jive-sdk');

var accessToken = "Wn03rKYx4skrdgKvIxPAN44aJKEL3PWGtp4uGdtYhE";
var blockToken = "Cn8oGH0IKplQANipsX8yHrQPtvAAYA6bKCdgQsV5HU";  

function buildAPICall(uri) {
	var api = 'https://';
	if (uri.indexOf('/camera') === 0) {
		api += 'stream';
	} else {
		api += 'api';
	} // end if
	api += '.ninja.is/rest/v0';
	api += uri + "?user_access_token="+accessToken;
	return api;
}

function invoke(url, method, body, headers, opts) {
	
	if (!headers) { headers = {}; }
	
	var apiURL = buildAPICall(url);
	
	console.log(apiURL);
			
	return jive.util.buildRequest(apiURL, method, body, headers, opts).then( function (response) { return response.entity; }, function(err) { return err; });
}

/**** BLOCK - API CALLS ******/

exports.getBlocks = function() {
	return invoke('/block','GET',{},{},{});
};

exports.activateBlock = function(nodeid) {
	return invoke('/block/'+nodeid+'/activate','GET',{},{},{});
};

exports.getBlockByGUID = function(nodeId) {
	return invoke('/block/'+nodeId,'GET',{},{},{});
};

exports.getBlockCommands = function(nodeId) {
	return invoke('/block/'+nodeId+'/commands','GET',{},{ 'X-Ninja-Token' : blockToken },{});
};

exports.sendDataEvent = function(nodeId,event) {
	return invoke('/block/'+nodeId+'/data','POST',event,{ 'X-Ninja-Token' : blockToken },{});
};

exports.sendConfigEvent = function(nodeId,event) {
	return invoke('/block/'+nodeId+'/config','POST',event,{ 'X-Ninja-Token' : blockToken },{});
};

/**** DEVICE - API CALLS ******/
exports.getDevices = function() {
	return invoke('/devices','GET',{},{},{});
};

exports.getDeviceByGUID = function(guid) {
	return invoke('/device/'+guid,'GET',{},{},{});
};

exports.updateDevice = function(guid,device) {
	return invoke('/device/'+guid,'PUT',device,{},{});
};

exports.tickleWebHook = function(guid,webhook) {
	return invoke('/device/'+guid+'/subdevice/'+webhook.id+'/tickle/'+webhook.secret,'POST',{},{},{});
};

exports.getDeviceDataByGUID = function(guid) {
	return invoke('/device/'+guid+'/data','GET',{},{},{});
};

exports.getDeviceHeartbeatByGUID = function(guid) {
	return invoke('/device/'+guid+'/heartbeat','GET',{},{},{});
};

exports.getImageSnapshot = function(guid) {
	return invoke('/camera/'+guid+'/snapshot','GET',{},{ 'X-Ninja-Token' : blockToken },{});
};

/****** USER - API CALLS *******/

exports.getUser = function() {
	return invoke('/user','GET',{},{},{});
};

exports.getUserStream = function() {
	return invoke('/user/stream','GET',{},{},{});
};

exports.getUserPushChannelKey = function() {
	return invoke('/user/pusherchannel','GET',{},{},{});
};