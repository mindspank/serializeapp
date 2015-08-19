var Promise = require('promise');

function getDataConnections(app) {
	return app.getConnections()
	.then(function (connections) {
		return Promise.all(connections.map(function(d) {
			return app.getConnection(d.qId)
		}))
	});
};

module.exports = getDataConnections;