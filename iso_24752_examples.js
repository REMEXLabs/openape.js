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
	