/**
 * Node Modules
 */
var Promise = require('promise');

/**
 * Library modules
 */
var getList = require('./getList');
var getDimensions = require('./getDimensions');
var getMeasures = require('./getMeasures');
var getBookmarks = require('./getBookmarks');
var getMediaList = require('./getMediaList');
var getSnapshots = require('./getSnapshots');
var getFields = require('./getFields');
var getConnections = require('./getDataConnections');
var getVariables = require('./getVariables');

/**
 * serializeApp
 * 
 * Accepts a qsocks app connection object and returns a promise.
 * Resolves a serialized app.
 */

function serializeApp(app, callback) {
	if(!app || typeof app.createSessionObject !== 'function') {
		throw new Error('Expects a valid qsocks app connection')
	};
		
	var appObj = {};
	
	// Generic Lists to be iterated over for qAppObjectListDef
	var LISTS = [{'sheets': 'sheet'}, {'stories': 'story'}, {'masterobjects': 'masterobject'}];
	
	// Property name mapping against methods
	var METHODS = {
		dimensions: getDimensions,
		measures: getMeasures,
		bookmarks: getBookmarks,
		embeddedmedia: getMediaList,
		snapshots: getSnapshots,
		fields: getFields,
		dataconnections: getConnections,
		variables: getVariables
	};
	
	return app.getAppProperties().then(function (properties) { 
			return appObj.properties = properties; 
		})
		.then(function () {
			return app.getScript().then(function (script) { return appObj.loadScript = script; })
		})
		.then(function () {
			return Promise.all(LISTS.map(function (d, i) {
				return getList(app, d[Object.keys(d)[0]])
			})).then(function (data) { return LISTS.forEach(function(d, y) { appObj[Object.keys(d)[0]] = data[y] }); });
		})
		.then(function () {	
			return Promise.all(Object.keys(METHODS).map(function(key, i) {
				return METHODS[key](app).then(function(data) { return appObj[key] = data });
			}));		
		})
		.then(function() {
			return appObj;
		})
		.nodeify(callback);
		
};
module.exports = serializeApp;