var Promise = require('promise');

function getMeasures(app) {
        return app.createSessionObject({
                qMeasureListDef: {
                        qType: 'measure',
                        qData: {
                                info: '/qDimInfos'
                        },
                        qMeta: {}
                },
                qInfo: { qId: "MeasureList", qType: "MeasureList" }
        }).then(function (list) {
                return list.getLayout().then(function (layout) {
                        return Promise.all(layout.qMeasureList.qItems.map(function (d) {
                                return app.getMeasure(d.qInfo.qId).then(function (measure) {
                                        return measure.getProperties().then(function(properties) { return properties; });
                                });
                        }));
                });
        });
};
module.exports = getMeasures;