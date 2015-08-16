var Promise = require('promise');

function getSnapshots(app) {

        return app.createSessionObject({
                qBookmarkListDef: {
                        qType: 'snapshot',
                        qData: {
                                title: '/title',
								libraryTitle: '/qMetaDef/title',
                                description: '/qMetaDef/description',
								sourceObjectId: '/sourceObjectId',
								visualizationType: '/visualizationType',
								timestamp: '/timestamp',
								snapshotData: '/snapshotData',
								isClone: '/isClone'
                        }
                },
                qInfo: { qId: "SnapshotList", qType: "SnapshotList" }
        }).then(function (list) {
                return list.getLayout().then(function (layout) {
                        return Promise.all(layout.qBookmarkList.qItems.map(function (d) {
                                return app.getBookmark(d.qInfo.qId).then(function (bookmark) {
                                        return bookmark.getLayout().then(function (layout) { return layout; });
                                });
                        }));
                });
        });

};

module.exports = getSnapshots;