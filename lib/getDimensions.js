var Promise = require('promise');

function getDimensions(app) {
        return app.createSessionObject({
                qDimensionListDef: {
                        qType: 'dimension',
                        qData: {
                                info: '/qDimInfos'
                        },
                        qMeta: {}
                },
                qInfo: { qId: "DimensionList", qType: "DimensionList" }
        }).then(function (list) {
                return list.getLayout().then(function (layout) {
                        return Promise.all(layout.qDimensionList.qItems.map(function (d) {
                                return app.getDimension(d.qInfo.qId).then(function (dimension) {
                                        return dimension.getProperties();
                                });
                        }));
                });
        });
};

module.exports = getDimensions;