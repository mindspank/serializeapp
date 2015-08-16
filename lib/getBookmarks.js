var Promise = require('promise');

function getBookmarks(app) {

        return app.createSessionObject({
                qBookmarkListDef: {
                        qType: 'bookmark',
                        qData: {
                                title: '/qMetaDef/title',
                                description: '/qMetaDef/description',
                                selectionFields: '/selectionFields',
                                creationDate: '/creationDate'
                        }
                },
                qInfo: { qId: "BookmarkList", qType: "BookmarkList" }
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

module.exports = getBookmarks;