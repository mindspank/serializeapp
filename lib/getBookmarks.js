var Promise = require('promise');

function getBookmarks(app) {

        return app.createSessionObject({
                qBookmarkListDef: {
                        qType: 'bookmark',
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
                                        return bookmark.getProperties().then(function(properties) {
                                               return bookmark.getLayout().then(function(layout) {
                                                        properties.qData = properties.qData || {};
                                                        properties.qData.qBookMark = layout.qBookmark;
                                                        return properties;
                                                });
                                                
                                        });
                                });
                        }));
                });
        });

};

module.exports = getBookmarks;