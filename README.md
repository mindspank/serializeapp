## serializeapp

serializeapp is a node utility module to serialize a Qlik Sense app into a JSON object.  
Pass it a [qsocks](https://github.com/mindspank/qsocks) or a [enigma.js](https://github.com/qlik-oss/enigma.js) app object and it returns a promise containing the JSON representation of that app.

Verified to work in the browser using browserify or webpack.  

## installing
```
npm install serializeapp
```
or
```
yarn add serializeapp
```

## examples

Connect to Qlik Sense Desktop, open a app and pass that into serializeapp.

```javascript
var qsocks = require('qsocks')
var serializeapp = require('serializeapp')

qsocks.Connect()
.then(global => global.openDoc('Executive Dashboard.qvf'))
.then(app => serializeapp(app))
.then(result => console.log(result))
```
```javascript
const serializeapp = require('serializeapp')
const enigma = require('enigma.js')
const WebSocket = require('ws')

enigma.getService('qix', {
    schema: require(`./node_modules/enigma.js/schemas/qix/3.2/schema.json`),
    session: {
        host: 'localhost',
        port: 4848,
        secure: false
    },
    createSocket: (url) => new WebSocket(url)
})
.then(qix => qix.global.openDoc('Executive Dashboard.qvf'))
.then(app => serializeapp(app))
.then(result => console.log(result))
```
## Returns
<big><pre>
{
	properties: {}, -> @Object [AppEntry](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/AppEntry.htm)
	loadscript: '', -> @String Loadscript
	sheets: [], -> @Array - Array of [GenericObjectEntry](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/GenericObjectEntry.htm) and its children
	stories: [], -> @Array - Array of [GenericObjectEntry](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/GenericObjectEntry.htm) and its children
	masterobjects: [], -> @Array - Array of [GenericObjectEntry](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/GenericObjectEntry.htm)
	dataconnections: [], -> @Array - Array of [Connection](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/Connection.htm)
	dimensions: [], -> @Array - Array of [GenericDimensionProperties](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/GenericDimensionProperties.htm)
	measures: [], -> @Array - Array of [GenericMeasureProperties](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/GenericMeasureProperties.htm)
	bookmarks: [], -> @Array - Array of[GenericBookmarkLayout](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/GenericDimensionLayout.htm)
	embeddedmedia: [], -> @Array of [MediaListItem](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/MediaListItem.htm)
	fields: [], -> @Array of [NxFieldDescription](https://help.qlik.com/en-US/sense-developer/2.0/Subsystems/EngineAPI/Content/Structs/NxFieldDescription.htm)
	snapshots: [] -> @Array of Array of [GenericBookmarkLayout](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/GenericDimensionLayout.htm)
}
</pre></big> 
