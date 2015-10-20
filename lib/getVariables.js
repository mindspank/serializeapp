var Promise = require('promise');

function getVariables(app) {

        return app.createSessionObject({
                qVariableListDef: {
                        qType: 'variable',
			qShowReserved: false,
			qShowConfig: false,
                        qData: {
                                info: '/qDimInfos'
                        },
                        qMeta: {}
                },
                qInfo: { qId: "VariableList", qType: "VariableList" }
        }).then(function (list) {
                return list.getLayout().then(function (layout) {
                        return Promise.all(layout.qVariableList.qItems.map(function (d) {
                                return app.getVariableByID(d.qInfo.qId).then(function (variable) {
                                        return variable.getProperties().then(function(properties) {
                                               return variable.getLayout().then(function(layout) {
                                                        properties.qData.qVariable = layout.qLayout;
                                                        return properties;
                                                });
                                                
                                        });
                                });
                        }));
                });
        });

};

module.exports = getVariables;