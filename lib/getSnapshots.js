var Promise = require('promise');

function getSnapshots(app) {

        return app.createSessionObject({
                qBookmarkListDef: {
                        qType: 'snapshot',
                        qData: {
                                info: '/qDimInfos'
                        },
                        qMeta: {}
                },
                qInfo: { qId: "BookmarkList", qType: "BookmarkList" }
        }).then(function (list) {
                return list.getLayout().then(function (layout) {
                        return Promise.all(layout.qBookmarkList.qItems.map(function (d) {
                                return app.getBookmark(d.qInfo.qId).then(function (bookmark) {
                                        return bookmark.getProperties().then(function(properties) { return properties; });
                                });
                        }));
                });
        });

};

module.exports = getSnapshots;