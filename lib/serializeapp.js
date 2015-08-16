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

/**
 * TODO
 * 
 * Hantera connections, skriva till/output fran topp entry point istallet.
 * Inkludera data connections och fields mest for att?
 * 
 */
 
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
	var lists = ['sheet', 'story', 'masterobject'];
	
	return Promise.resolve().then(function() {
		return app.getAppProperties().then(function (properties) { return appObj.properties = properties; })
		})
		.then(function () {
			return app.getScript().then(function (script) { return appObj.loadScript = script; })
		})
		.then(function () {
			return Promise.all(lists.map(function (d) {
				return getList(app, d)
			})).then(function (data) { return lists.forEach(function (d, i) { appObj[d] = data[i] }); });
		})
		.then(function () {
			return getDimensions(app).then(function (dimensions) {
				return appObj.dimensions = dimensions.map(function (d) {
					return {
						qInfo: d.qInfo,
						qDim: d.qDim,
						qMetaDef: d.qMetaDef
					};
				});
			});
		})
		.then(function () {
			return getMeasures(app).then(function (measures) { return appObj.measures = measures; })
		})
		.then(function () {
			return getBookmarks(app).then(function (bookmarks) { return appObj.bookmarks = bookmarks; })
		})
		.then(function () {
			return getMediaList(app).then(function (media) { return appObj.embeddedMedia = media; });
		})
		.then(function() {
			return getSnapshots(app).then(function (snapshots) { return appObj.snapshots = snapshots });
		})
		.then(function () {
			return appObj;
		});
		
};

module.exports = serializeApp;