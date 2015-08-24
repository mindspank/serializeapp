##serializeapp

serializeapp is a node utility module to serialize a Qlik Sense app into a JSON object.  
Pass it a [qsocks](https://github.com/mindspank/qsocks) app class and it returns the JSON representation of that app.

Returns a promise as standard but also accepts classical node style callbacks.  
Verified to work in the browser using browserify or webpack.  

##installing
```
npm install serializeapp
```

##examples

Connect to Qlik Sense Desktop, open a app and pass that into serializeapp.

```javascript
var qsocks = require('qsocks')
var serializeapp = require('serializeapp')

qsocks.Connect().then(function(global) {
	
	global.openApp('Executive Dashboard.qvf')
		.then(function(app) {
			return serializeapp(app);
		})
		.then(function(data) {
			console.log(data) // --> A JSON Object describing the app.
		})
	
})

```

##Returns
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
	fields: [], -> @Array of [FieldListDef](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/FieldListDef.htm)
	snapshots: [] -> @Array of Array of [GenericBookmarkLayout](https://help.qlik.com/sense/2.0/en-us/developer/Subsystems/EngineAPI/Content/Structs/GenericDimensionLayout.htm)
}
</pre></big> 
