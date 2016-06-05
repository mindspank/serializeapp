var Promise = require('promise');

function getVariables(app) {

        return app.createSessionObject({
                qVariableListDef: {
                        qType: 'variable',
			qShowReserved: true,
			qShowConfig: true,
                        qData: {
                                info: '/qDimInfos'
                        },
                        qMeta: {}
                },
                qInfo: { qId: "VariableList", qType: "VariableList" }
        }).then(function (list) {
                return list.getLayout().then(function (layout) {
                        return Promise.all(layout.qVariableList.qItems.map(function (d) {
                                return app.getVariableById(d.qInfo.qId).then(function (variable) {
                                        return variable.getProperties().then(function(properties) {
                                                if (d.qIsScriptCreated) properties.qIsScriptCreated = d.qIsScriptCreated;
                                                if (d.qIsReserved) properties.qIsReserved = d.qIsReserved;
                                                if (d.qIsConfig) properties.qIsConfig = d.qIsConfig;
                                                
                                                return properties; 
                                        });
                                });
                        }));
                });
        });

};

module.exports = getVariables;