/**
 * 
 */
var iso_24752_examples = {
		getSimple : function() {
			return '{"default": {}}';
		},
		getExample1 : function() {
			return JSON.parse('{  "default": {    "preferences":       { "http://terms.gpii.net/speech-output": "true" }  }}');
					},
					getXml: function() {
					return '<user-context>		<option id="default">				<preference key="http://terms.gpii.net/speech-output" value="true"/>			</option>			</user-context>			';
		
					}
}
	

var openape_examples = {
getXmlPublicExample: function() {
return ' <?xml version="1.0" encoding="UTF-8" standalone="yes"?><user-context>	<implementation-parameters public="true" />	<option id="default">		<name>Default preferences</name>		<preference key="http://registry.gpii.net/common/magnifierEnabled"			value="false" />		<preference			key="http://registry.gpii.net/applications/org.chrome.cloud4chrome/invertColours"			value="false" />	</option></user-context>';
}
}