/**
 * @author Lukas Smirek
 * @Version 2.0.0_SNAPSHOT
 */
let openAPE_API = {
    tokenPath: "/token",
    userContextPath: "/api/user-contexts",
    taskContextPath: "/api/task-contexts",
    equipmentContextPath: "/api/equipment-contexts",
    environmentContextPath: "/api/environment-contexts",
    openApeServerUrl: "http://openape.gpii.eu",
    defaultContentType: "JSON"
};

var openAPE = {

    // FUNCTIONS FOR USER management

    /** createUser
     *
     * This function is used to create a new OpenAPE account with the given username, email and password.
     *
     * @param {string} username - The username of the user.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @param {string} [serverUrl="http://openape.gpii.eu"] - URL of the server to which the client connects.
     * @returns {boolean}
     */
    createUser: function (username, email, password, serverUrl = openAPE_API.openApeServerUrl) {
        var objUser = {};

        var arrRoles = [];
        arrRoles.push("user");
        objUser.roles = arrRoles;

        if (isPasswordCorrect(password) && isEmailCorrect(email) && isUsernameCorrect(username)) {

        }


    } // createUser
};

class Client {

    /**
     * constructor
     *
     * Creates a new client for the given login data.
     *
     * @param {string} username - The username used to login.
     * @param {string} password - The password used to login.
     * @param {string} [serverUrl="http://openape.gpii.eu"] - The URL of the server to connect to.
     * @param {string} [defaultContentType="JSON"] - The content type to be used a default. Can be "JSON" or "XML".
     */
    constructor(username, password, serverUrl = openAPE_API.openApeServerUrl, defaultContentType = openAPE_API.defaultContentType) {
        this.defaultContentType = "application/json";
        this.token = null;
        this.serverUrl = "/" ? window.location.protocol : serverUrl;
        this.defaultContentType = defaultContentType;

        console.log("Connection will be established with server: " + this.serverUrl);
        if (isPasswordCorrect(password) && isUsernameCorrect(username)) {
            var data = "grant_type=password&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
            var httpRequest = this.createHttpRequest("POST", openAPE_API.tokenPath,
                function (responseText) {
                    this.token = JSON.parse(responseText)["access_token"];
                    console.log("got token");
                }, null, "application/x-www-form-urlencoded");
            httpRequest.send(data);
        }


    }// constructor

    //// mark - create methods ////

    /**
     * createUserContext
     *
     * This function is used to upload a user context object to the OpenAPE server and to associate it with an ID.
     * This function relates to ISO/IEC 24752-8 7.2.2.
     *
     * @param {object} userContext - The user context that shall be uploaded.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with all status  information of the create process.
     */
    createUserContext(userContext, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.createContext(openAPE_API.userContextPath, userContext, successCallback, errorCallback, contentType);
    }

    /**
     * createTaskContext
     *
     * This function is used to upload a task context object to the OpenAPE server and to associate it with an ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {object} taskContext - The task context that shall be uploaded.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with all status information of the create process.
     */
    createTaskContext(taskContext, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.createContext(openAPE_API.taskContextPath, taskContext, successCallback, errorCallback, contentType);
    }

    /**
     * createEquipmentContext
     *
     * This function is used to upload an equipment context object to the OpenAPE server and to associate it with an ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {object} equipmentContext - The equipment context that shall be uploaded.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with all status information of the create process.
     */
    createEquipmentContext(equipmentContext, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.createContext(openAPE_API.equipmentContextPath, equipmentContext, successCallback, errorCallback, contentType);
    }

    /**
     * createEnvironmentContext
     *
     * This function is used to upload an environment context object to the OpenAPE server and to associate it with an ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {object} environmentContext - The environment context that shall be uploaded.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with all status information of the create process.
     */
    createEnvironmentContext(environmentContext, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.createContext(openAPE_API.environmentContextPath, environmentContext, successCallback, errorCallback, contentType);
    }

    //// mark - get methods ////

    /**
     * getUserContext
     *
     * This function can be used to retrieve a certain user context from the OpenAPE server with a given ID.
     * It relates to ISO/ICE 24752-8 7.2.3.
     *
     * @param {string} userContextId - The ID of the stored user context that shall be retrieved.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with the user context's information.
     */
    getUserContext(userContextId, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.getContext(openAPE_API.userContextPath, userContextId, successCallback, errorCallback, contentType);
    }

    /**
     * getTaskContext
     *
     * This function can be used to retrieve a certain task context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} taskContextId - The ID of the stored task context that shall be retrieved.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with the task context's information.
     */
    getTaskContext(taskContextId, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.getContext(openAPE_API.taskContextPath, taskContextId, successCallback, errorCallback, contentType);
    }

    /**
     * getEquipmentContext
     *
     * This function can be used to retrieve a certain equipment context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} equipmentContextId - The ID of the stored equipment context that shall be retrieved.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with the equipment context's information.
     */
    getEquipmentContext(equipmentContextId, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.getContext(openAPE_API.equipmentContextPath, equipmentContextId, successCallback, errorCallback, contentType);
    }

    /**
     * getEnvironmentContext
     *
     * This function can be used to retrieve a certain environment context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} environmentContextId - The ID of the stored environment context that shall be retrieved.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with the environment context's information.
     */
    getEnvironmentContext(environmentContextId, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.getContext(openAPE_API.environmentContextPath, environmentContextId, successCallback, errorCallback, contentType);
    }

    //// mark - update methods ////

    /**
     * updateUserContext
     *
     * This function can be used to update a certain user context from the OpenAPE server with a given ID.
     * It relates to ISO/ICE 24752-8 7.2.3.
     *
     * @param {string} userContextId - The ID of the stored user context that shall be updated.
     * @param {object} userContext - The user context that shall be uploaded.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with the user context's information.
     */
    updateUserContext(userContextId, userContext, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.updateContext(openAPE_API.userContextPath, userContextId, userContext, successCallback, errorCallback, contentType);
    }

    /**
     * updateTaskContext
     *
     * This function can be used to update a certain task context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} taskContextId - The ID of the stored task context that shall be updated.
     * @param {object} taskContext - The task context that shall be uploaded.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with the task context's information.
     */
    updateTaskContext(taskContextId, taskContext, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.updateContext(openAPE_API.taskContextPath, taskContextId, taskContext, successCallback, errorCallback, contentType);
    }

    /**
     * updateEquipmentContext
     *
     * This function can be used to update a certain equipment context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} equipmentContextId - The ID of the stored equipment context that shall be updated.
     * @param {object} equipmentContext - The equipment context that shall be uploaded.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with the equipment context's information.
     */
    updateEquipmentContext(equipmentContextId, equipmentContext, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.updateContext(openAPE_API.equipmentContextPath, equipmentContextId, equipmentContext, successCallback, errorCallback, contentType);
    }

    /**
     * updateEnvironmentContext
     *
     * This function can be used to update a certain environment context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} environmentContextId - The ID of the stored environment context that shall be updated.
     * @param {object} environmentContext - The environment context that shall be uploaded.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with the environment context's information.
     */
    updateEnvironmentContext(environmentContextId, environmentContext, successCallback, errorCallback, contentType = this.defaultContentType) {
        return this.updateContext(openAPE_API.environmentContextPath, environmentContextId, environmentContext, successCallback, errorCallback, contentType);
    }

    //// mark - delete methods ////

    /**
     * deleteUserContext
     *
     * This function can be used to delete a certain user context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} userContextId - The ID of the stored user context that shall be updated.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @returns {object} - A JavaScript object with the user context's information.
     */
    deleteUserContext(userContextId, successCallback, errorCallback) {
        return this.deleteContext(openAPE_API.userContextPath, userContextId, successCallback, errorCallback);
    }

    /**
     * deleteTaskContext
     *
     * This function can be used to delete a certain task context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} taskContextId - The ID of the stored task context that shall be updated.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @returns {object} - A JavaScript object with the task context's information.
     */
    deleteTaskContext(taskContextId, successCallback, errorCallback) {
        return this.deleteContext(openAPE_API.taskContextPath, taskContextId, successCallback, errorCallback);
    }

    /**
     * deleteEquipmentContext
     *
     * This function can be used to delete a certain equipment context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} equipmentContextId - The ID of the stored equipment context that shall be updated.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @returns {object} - A JavaScript object with the equipment context's information.
     */
    deleteEquipmentContext(equipmentContextId, successCallback, errorCallback) {
        return this.deleteContext(openAPE_API.equipmentContextPath, equipmentContextId, successCallback, errorCallback);
    }

    /**
     * deleteEnvironmentContext
     *
     * This function can be used to delete a certain environment context from the OpenAPE server with a given ID.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {string} environmentContextId - The ID of the stored environment context that shall be updated.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @returns {object} - A JavaScript object with the environment context's information.
     */
    deleteEnvironmentContext(environmentContextId, successCallback, errorCallback) {
        return this.deleteContext(openAPE_API.environmentContextPath, environmentContextId, successCallback, errorCallback);
    }

    //// mark - getList methods ////

    /**
     * getUserContextList
     *
     * This function is used to retrieve a list of URIs to accessible user contexts.
     * This function relates to ISO/IEC 24752-8 7.2.6.
     *
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} query - The query to filter the relevant contexts.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with all user contexts information.
     */
    getUserContextList(successCallback, errorCallback, query, contentType = this.defaultContentType) {
        return this.getContextList(openAPE_API.userContextPath, successCallback, errorCallback, query, contentType);
    }

    /**
     * getTaskContextList
     *
     * This function is used to retrieve a list of URIs to accessible task contexts.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} query - The query to filter the relevant contexts.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with all task contexts information.
     */
    getTaskContextList(successCallback, errorCallback, query, contentType = this.defaultContentType) {
        return this.getContextList(openAPE_API.taskContextPath, successCallback, errorCallback, query, contentType);
    }

    /**
     * getEquipmentContextList
     *
     * This function is used to retrieve a list of URIs to accessible equipment contexts.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} query - The query to filter the relevant contexts.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with all equipment contexts information.
     */
    getEquipmentContextList(successCallback, errorCallback, query, contentType = this.defaultContentType) {
        return this.getContextList(openAPE_API.equipmentContextPath, successCallback, errorCallback, query, contentType);
    }

    /**
     * getEnvironmentContextList
     *
     * This function is used to retrieve a list of URIs to accessible environment contexts.
     * TODO: Is ISO/IEC reference applicable here?
     *
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} query - The query to filter the relevant contexts.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - A JavaScript object with all environment contexts information.
     */
    getEnvironmentContextList(successCallback, errorCallback, query, contentType = this.defaultContentType) {
        return this.getContextList(openAPE_API.environmentContextPath, successCallback, errorCallback, query, contentType);
    }

    //// mark - generic methods ////

    /**
     * createContext
     *
     * This function is used to create a new context at the given path.
     *
     * @param {string} path - The API path used to create the context.
     * @param {object} context - The context to be created.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     */
    createContext(path, context, successCallback, errorCallback, contentType = this.defaultContentType) {
        if (this.isTokenCorrect() && this.isContextCorrect(context)) {
            let httpRequest = this.createHttpRequest("POST",
                path, function (responseText) {
                    successCallback(responseText);
                }, errorCallback,
                contentType);
            if (contentType == "application/json") {
                context = JSON.stringify(context);
            }
            httpRequest.send(context);
        }
    }

    /**
     * getContext
     *
     * This function is used to retrieve a context with a given ID.
     *
     * @param {string} path - The API path used to retrieved the context.
     * @param {string} contextId - The ID of the context to be retrieved.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     */
    getContext(path, contextId, successCallback, errorCallback, contentType = this.defaultContentType) {
        if (this.isTokenCorrect() && this.isContextIdCorrect(contextId)) {
            let httpRequest = this.createHttpRequest("GET", path + "/" + contextId, function (responseText) {
                successCallback(this.parse(responseText));
            }, errorCallback, contentType);
            httpRequest.send(null);
        }
    }

    /**
     * updateContext
     *
     * This function is used to update a context with a given ID.
     *
     * @param {string} path - The API path used to the context to be updated.
     * @param {string} contextId - The ID of the context to be updated.
     * @param {object} context - The context to be updated.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     */
    updateContext(path, contextId, context, successCallback, errorCallback, contentType = this.defaultContentType) {
        if (this.isTokenCorrect() && this.isContextCorrect(context) && this.isContextIdCorrect(contextId)) {
            let httpRequest = this.createHttpRequest("PUT", path + "/" + contextId, successCallback, errorCallback, contentType);

            if (contentType == "application/json") {
                context = JSON.stringify(context);
            }

            httpRequest.send(context);
        }
    }

    /**
     * deleteContext
     *
     * This function is used to delete a context with a given ID.
     *
     * @param {string} path - The API path used to the context to be deleted.
     * @param {string} contextId - The ID of the context to be deleted.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     */
    deleteContext(path, contextId, successCallback, errorCallback) {
        let httpRequest;
        if (this.isTokenCorrect() && this.isContextIdCorrect(contextId)) {
            httpRequest = this.createHttpRequest("DELETE", path + "/" + contextId, successCallback, errorCallback);
            httpRequest.send(null);
        }
    }

    /**
     * getContextList
     *
     * This function is used to get the context list.
     *
     * @param {string} path - The API path used to get the context list.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} query - The query to filter the relevant contexts.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     */
    getContextList(path, successCallback, errorCallback, query, contentType = this.defaultContentType) {
        let httpRequest = this.createHttpRequest("GET", path, (responseText) => {
            console.log("text: " + responseText);
            successCallback(this.parse(responseText, contentType));
        }, errorCallback);
        httpRequest.send(null);
    }

    //// mark - misc helper methods ////

    /**
     * parse
     *
     * This function is used to parse the response text.
     *
     * @param {string} responseText - The received response that should be parsed.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {object} - The parsed result.
     */
    parse(responseText, contentType = this.defaultContentType) {
        var result;

        if (contentType == "application/json") {
            result = JSON.parse(responseText);
        }

        return result;
    }


    /**
     * createHttpRequest
     *
     * This function is used to create a new HTTP request.
     *
     * @param {string} verb - The type of request to be used, e.g. POST or GET.
     * @param {string} path - The server path to be requested.
     * @param {function} successCallback - The function to be called on success.
     * @param {function} errorCallback - The function to be called on error.
     * @param {string} [contentType="JSON"] - The content type to be used if the default set in the client
     * should not be used. Can be "JSON" or "XML".
     * @returns {XMLHttpRequest} - The created request.
     */
    createHttpRequest(verb, path, successCallback, errorCallback, contentType = this.defaultContentType) {
        let request = new XMLHttpRequest();
        let client = this;
        console.log("Url: " + this.serverUrl + path);
        request.open(verb, this.serverUrl + path, false);

        if (this.token !== undefined) {
            request.setRequestHeader("Authorization", this.token);
        }

        if (contentType == "application/json" || contentType == "application/x-www-form-urlencoded" || contentType == "application/xml") {
//			   console.log("contentType: " + contentType);
            request.setRequestHeader("Content-Type", contentType);
        } else {
//console.log("standard contentType");
            request.setRequestHeader("Content-Type", this.defaultContentType);
        }

        request.onload = function () {
//				   console.log(request.responseURL); // http://example.com/test
        };


        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                console.log("http: " + request.status);
                if (request.status == 200 || request.status == 201) {
                    successCallback.call(client, request.responseText);
//		        	successCallback(request.responseText);
                }
                else if (request.status == 404) {
                    console.log("Error: " + request.status);
                } else if (request.status == 400) {
                    console.log("readyState: " + request.readyState);
                    console.log("HTTP: " + request.status);
                    console.log("Error:" + request.statusText);
                    console.log("Server message:" + request.responseText)
                }
            }
        };
        return request;

    }

    /**
     * isTokenCorrect
     *
     * This function checks the correctness of the given token.
     *
     * @returns {boolean} - Whether the token is correct or not.
     */
    isTokenCorrect() {
        let isTokenCorrect = true;
        if (this.token === undefined) {
            console.log("Please initialize the library");
            isTokenCorrect = false;
        }
        return isTokenCorrect;
    }

    /**
     * isContextIdCorrect
     *
     * This function checks the correctness of the given context ID.
     *
     * @param {string} contextId  - The context ID to be checked.
     * @returns {boolean} - Whether the context ID is correct or not.
     */
    isContextIdCorrect(contextId) {
        let isContextIdCorrect = true;
        if (contextId == "") {
            console.log("The contextId can not be empty");
            isContextIdCorrect = false;
        } else if (contextId === undefined) {
            console.log("Please enter a contextId");
            isContextIdCorrect = false;
        }

        return isContextIdCorrect;
    }

    /**
     * isContextCorrect
     *
     * This function checks the correctness of the given context.
     *
     * @param {Object} context - The context to be checked.
     * @returns {boolean} - Whether the context is correct or not.
     */
    isContextCorrect(context) {
        var isContextCorrect = true;
        if (context == "") {
            arrStatusText.push("The context can not be empty");
            isContextCorrect = false;
        } else if (context === undefined) {
            arrStatusText.push("Please enter a context");
            isContextCorrect = false;
        }
        return isContextCorrect;
    }


}// client

/**
 * isPasswordCorrect
 *
 * This function checks the correctness of the given password.
 *
 * @param {string} password - The password to be checked.
 * @returns {boolean} - Whether the password is correct or not.
 */
function isPasswordCorrect(password) {
    var isPasswordCorrect = true;
    if (password == "") {
        console.log("Password can not be empty");
        isPasswordCorrect = false;
    } else if (password === undefined) {
        console.log("Please enter a password");
        isPasswordCorrect = false;
    }
    return isPasswordCorrect;

}

/**
 * isUsernameCorrect
 *
 * This function checks the correctness of the given username.
 *
 * @param {string} username - The username to be checked.
 * @returns {boolean} - Whether the username is correct or not.
 */
function isUsernameCorrect(username) {
    var isUsernameCorrect = true;
    if (username == "") {
        arrStatusText.push("Username can not be empty");
        isUsernameCorrect = false;
    } else if (username === undefined) {
        console.log("Please enter a username");
        isUsernameCorrect = false;
    }
    return isUsernameCorrect

}

/**
 * isEmailCorrect
 *
 * This function checks the correctness of the given email address.
 *
 * @param {string} email - The email address to be checked.
 * @returns {boolean} - Whether the address is correct or not.
 */
function isEmailCorrect(email) {
    var isEmailCorrect = true;

    if (email == "") {
        arrStatusText.push("Email address can not be empty");
        isEmailCorrect = false;
    } else if (email === undefined) {
        console.log("Please enter an email address");
        isEmailCorrect = false;
    } else {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(String(email).toLowerCase())) {
            console.log("Please check the format of the email address");
            isEmailCorrect = false;
        }
    }


    return isEmailCorrect
}


class UserContext {
    constructor() {
        this.contexts = null;
    }
}