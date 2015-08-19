/**
 * Node Modules
 */
var Promise = require('promise');

/**
 * Library modules
 */
var getList = require('./getlist');
var getDimensions = require('./getDimensions');
var getMeasures = require('./getMeasures');
var getBookmarks = require('./getBookmarks');
var getMediaList = require('./getMediaList');
var getSnapshots = require('./getSnapshots');
var getFields = require('./getFields');
var getConnections = require('./getDataConnections');

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
	var LISTS = ['sheet', 'story', 'masterobject'];
	
	// Property name mapping against methods
	var METHODS = {
		dimension: getDimensions,
		measure: getMeasures,
		bookmark: getBookmarks,
		embeddedmedia: getMediaList,
		snapshot: getSnapshots,
		field: getFields,
		dataconnection: getConnections
	};
	
	return Promise.resolve().then(function() {
		return app.getAppProperties().then(function (properties) { return appObj.properties = properties; })
		})
		.then(function () {
			return app.getScript().then(function (script) { return appObj.loadScript = script; })
		})
		.then(function () {
			return Promise.all(LISTS.map(function (d) {
				return getList(app, d)
			})).then(function (data) { return LISTS.forEach(function (d, i) { appObj[d] = data[i] }); });
		})
		.then(function () {	
			return Promise.all(Object.keys(METHODS).map(function(key, i) {
				return METHODS[key](app).then(function(data) { return appObj[key] = data });
			}));		
		})
		.then(function () {
			return appObj;
		});
		
};
module.exports = serializeApp;