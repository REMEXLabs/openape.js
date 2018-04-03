let iso_24752_examples = {
    getSimple: () => {
        return {
            "default": {
                "name": "",
                preferences: {}
            }
        };
    },

    getSimpleAsPublic: () => {
        let context = this.getSimple();
        context["implementation-parameters"] = {"public": true};
        return context;
    },


    getExample1: () => {
        return {
            "default": {
                "preferences": {
                    "http://terms.gpii.net/speech-output": "true"
                }
            }
        };
    },


    getExample1asPublic: () => {
        let context = this.getExample1();
        context["implementation-parameters"] = {"public": true};
        return context;
    },
    getXml: () => {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                  <user-context>
                    <option id="default">
                      <preference key="http://terms.gpii.net/speech-output" value="true" />
                    </option>
                  </user-context>`;
    }
};


let openape_examples = {
    getXmlPublicExample: () => {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                  <user-context>
                    <implementation-parameters public="true" />
                      <option id="default">
                        <name>Default preferences</name>
                        <preference key="http://registry.gpii.net/common/magnifierEnabled" value="false" />
                        <preference	key="http://registry.gpii.net/applications/org.chrome.cloud4chrome/invertColours" value="false" />
                      </option>
                  </user-context>`;
    }
};