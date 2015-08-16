function getMediaList(app) {
        return app.createSessionObject({
			qInfo: {
				qId: 'mediaList',
				qType: 'MediaList'
			},
			qMediaListDef: {}
        }).then(function (list) {
                return list.getLayout().then(function (layout) {
					return layout.qMediaList.qItems.filter(function(d) {
						// This is dodgy...
						return d.qUrlDef.substring(0,7) === '/media/';
					});
                });
        });
};
module.exports = getMediaList;