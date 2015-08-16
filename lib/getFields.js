var Promise = require('promise');

function getFields(app) {

        return app.createSessionObject({
            qFieldListDef: { 
                    qShowSystem: true, 
                    qShowHidden: true, 
                    qShowSrcTables: true, 
                    qShowSemantic: true 
            },
            qInfo: { qId: 'FieldList', qType: 'FieldList' }
        }).then(function (fields) {
            return fields.getLayout().then(function (layout) {
                return layout.qFieldList.qItems;
            });
        });

};

module.exports = getFields;