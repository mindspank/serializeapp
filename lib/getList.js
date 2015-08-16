var Promise = require('promise');

function getList(app, objectType) {
	return app.createSessionObject({
		qAppObjectListDef: {
			qType: objectType,
			qData: {
				id: "/qInfo/qId"
			}
		},
		qInfo: {
			qId: objectType + 'List',
			qType: objectType + 'List'
		},
		qMetaDef: {},
		qExtendsId: ''
	}).then(function (list) {
		return list.getLayout().then(function (layout) {
			return Promise.all(layout.qAppObjectList.qItems.map(function(d) {
				return app.getObject(d.qInfo.qId).then(function (handle) {
					return handle.getFullPropertyTree();
				}); 
			}));
		});
	});

};

module.exports = getList;