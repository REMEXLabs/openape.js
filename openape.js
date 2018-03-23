/**

* @author Lukas Smirek
@Version 2.0.0_SNAPSHOT
*/
let openAPE_API = {

		tokenPath : "/token",
userContextPath : "/api/user-contexts",
	     taskContextPath : "/api/task-contexts",
	     equipmentContextPath : "/api/equipment-contexts",
	     environmentContextPath : "/api/envronment-contexts",
	      		openApeServerUrl : "http://openape.gpii.eu"
};

var openAPE = {

    // FUNCTIONS FOR USER management

	    /** createUser
	     * 
	     * This function is used to create a new OpenAPE account with the given username, email and password
	     *
	     * @param  {String} - userName - The username of the user 
	     * @param  {string} email - The email address of the user 
	     * @param  {string} password - The password of the user 
	     *@param {string} [serverURL=http://openape.gpii.eu]- URL of the server to which the client connects.  
	     * @return {boolean}
	*/
	createUser : function (username, email, password, serverurl) {
console.log("sUrl: " + serverurl  );
		if(serverurl === undefined){
			servrUrl = openAPE_API.openApeServerUrl;
		} 

		var objUser = new Object();
		
		var arrRoles = [];
		arrRoles.push("user");
		objUser.roles = arrRoles;

		if(isPasswordCorrect(password) && isEmailCorrect(eMail) && isUsernameCorrect(userName)){
			
		}

		


	} // createUser
}
	class Client {
    	
	constructor(username, password, serverUrl) {
		this.	defaultContentType = "application/json";
		this.token;
		
		if(serverUrl === undefined){
	         
			this.serverUrl = openAPE_API.openApeServerUrl;
						
	        } else if(serverUrl === "/"){
	            this.serverUrl =  window.location.protocol;
	        } else {
	            this.serverUrl = serverUrl;
	        }
console.log("Connection will be established with server: " + this.serverUrl); 
	        if(isPasswordCorrect(password) && isUsernameCorrect(username)){
	    		var data = "grant_type=password&username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password);
    			        	var httpRequest = this.createHttpRequest("POST", openAPE_API.tokenPath  , 
	        			function(responseText){
					this.token =JSON.parse(responseText).access_token; 
												}, undefined,   
	        			        	'application/x-www-form-urlencoded'
 );
	        	httpRequest.send(data);
	        	}

	        
		}// constructor

	
    /**
     * createUserContext
		* 
		* This function is used to upload a user context object to the
		* OpenAPE server and to associate it with an Id. This Function
		* relates to ISO/IEC 24752-8 7.2.2
		* 
		* @param {UserContext}
		*            UserContext - The user context that shall be uploaded
		* @param{string} contentType - the used content-type
		* @return {object} - A javascript object with all status
		*         information of the create process
		*/	      
createUserContext (userContext, successCallback, errorCallback, contentType) {
		   return this.createContext(openAPE_API.userContextPath, userContext, successCallback, errorCallback, contentType);
	   }

/**
* getUserContext
* 
* This function can be used to retrieve a certain user context from
* the OpenAPE server with a given Id It relates to ISO/ICE 24752-8
* 7.2.3
* 
* @param {string}
*            userContextId - The Id of the stored UserContext that
*            shall be retrieved
* @param {String}
*            outputType - defines the dataformat of the received
*            user context object. Can either be JSON or XML
* @return {Object} - A javascript object with all user contexts
*         information
*/
getUserContext (userContextId, successCallback, errorCallback, contentType) {
	return this.getContext(openAPE_API.userContextPath, userContextId, successCallback, errorCallback, contentType);
}

updateUserContext(userContextId, userContext, successCallback, errorCallback, contentType){
	return this.updateContext(openAPE_API.userContextPath, userContextId, userContext, successCallback, errorCallback, contentType); 
}

deleteUserContext(userContextId){
	this.deleteContext(openAPE_API.userContextPath, userContextId, successCallback, errorCallback);
}


	   /* * getUserContextList
	    * 
	    * This function is used to retrieve a list of URIs to accessible
	    * user contexts This Function relates to ISO/IEC 24752-8 7.2.6
	    *@p aram {function successCallback
	    *@param {function} errorCallback
	    * @param {string}  query - the query to filter the relevant contexts
	    * @param{string} contentType - the used content-type
	    * @return {XmlHttpRequest} - A javascript object with all status
	    *         information
	    */
	   getUserContextList (successCallback, errorCallback, query, contentType) {
		   return this.getContextList(openAPE_API.userContextPath, successCallback, errorCallback, query, contentType);
	   	}

		createContext (path, context, successCallback, errorCallback, contentType) {
			   if(this.isTokenCorrect() && this.isContextCorrect(context)){	
	let httpRequest = this.createHttpRequest("POST", 
	path, function(responseText){
	successCallback(responseText);
	}, errorCallback,
	contentType );
//	console.log("context" + context)
	if (contentType == "application/json"){
		context = JSON.stringify( context); 
	}
	httpRequest.send(context);
		   }
		}
		
		getContext (path, contextId, successCallback, errorCallBack, contentType) {
				   if(this.isTokenCorrect() && this.isContextIdCorrect(contextId) ){
				   let httpRequest= this.createHttpRequest("GET", path + "/" + contextId, function(responseText) {
				   successCallback(this.parse(responseText));
				   }, contentType);
				   httpRequest.send(null);
				   }
			   } 
	
		updateContext (path, contextId, context, successCallback, contentType) {
			   if(this.isTokenCorrect() && this.isContextCorrect(context) && this.isContextIdCorrect(contextId) ){
let 	httpRequest= this.createHttpRequest("PUT", path+"/" +contextId, contentType); 
return httpRequest;
			   }
			   

		}
	
		   /*
		    * Function to delete all kind of contexts
		    * 
		    */
		   deleteContext (path, contextId, successCallback) {
			   
			    if(isTokenCorrect() && isContextIdCorrect(contextId) ){
			let httpRequest = createHttpRequest("DELETE", path + "/" + contextId);
			httpRequest.send(null);
			    }
		   }

getContextList(path, successCallback, errorCallback, query, contentType){
			   let httpRequest = this.createHttpRequest("GET",path, function(responseText){
				   console.log				("text: " + responseText);
				   successCallback(this.parse(responseText, contentType));   
			   });
			   httpRequest.send(null);
			   return httpRequest;
		   }
		   
		   parse(responseText, contentType){
			   var result;
			   if (contentType === undefined){
				   contentType = this.defaultContentType;
			   			   }
			   
//			   console.log("ct: " + contentType);
			   
			   if (contentType == "application/json"){
				   result = JSON.parse(responseText);
			   }
			   return result;
		   }

		
		createHttpRequest(verb, path, successCallback, errorCallback, contentType) {
			let request = new XMLHttpRequest();
			let client = this;
console.log ("Url: " + this.serverUrl + path );
			request.open(verb, this.serverUrl + path, false);
			
			   if (this.token !== undefined) {
				   request.setRequestHeader("Authorization", this.token);
			   }
			   
			   if(contentType == "application/json"  || contentType == "application/x-www-form-urlencoded" || contentType == "application/xml"){
//			   console.log("contentType: " + contentType);
				   request.setRequestHeader("Content-type", contentType);
			   }else { 
//console.log("standard contentType");
			   request.setRequestHeader("Content-type", this.defaultContentType);
			}
			   
			   request.onload = function () {
//				   console.log(request.responseURL); // http://example.com/test
				 };

			   
			request.onreadystatechange = function() {
				if ( request.readyState == 4 ){
		        console.log("http: " + request.status)
					if ( request.status == 200  || request.status == 201){
		            successCallback.call(client, request.responseText);
//		        	successCallback(request.responseText);
			} 
		        else if (request.status == 404) {
				console.log("Error: " + request.status );
			} else if (request.status == 400)  {
				console.log("readyState: " +request.readyState  );
				console.log("HTTP: " +request.status  );
				console.log("Error:" + request.statusText)
				console.log("Servermessage:" + request.responseText)
							} 
				}
			};
		   return request;
			
			}
		
		isTokenCorrect(){
			   let isTokenCorrect = true;
	if (this.token === undefined){
	console.log("Please initialize the library");
				   isTokenCorrect = false;
			   } 
			   return isTokenCorrect;
		   }	    	

	isContextIdCorrect(contextId){
			   let isContextIdCorrect = true;
			   if(contextId==""){
	console.log("The contextId can not be empty");
				   isContextIdCorrect = false;
			   } else if(contextId === undefined){
	console.log("Please enter a contextId");
				   isContextIdCorrect = false;
			   }
		    		    	
			   return isContextIdCorrect;
		   }
		    	
	isContextCorrect(context){
			   var isContextCorrect = true;
			   if(context==""){
				   arrStatusText.push("The context can not be empty");
				   isContextCorrect = false;
			   } else if(context === undefined){
				   arrStatusText.push("Please enter a context");
				   isContextCorrect = false;
			   }
			   return isContextCorrect;	    	
		   }

	
	}// client

function isPasswordCorrect(password) {
   	var isPasswordCorrect = true;
   	if(password==""){
   		console.log("Password can not be empty");
   		isPasswordCorrect = false;
   	} else if(password === undefined){
   		console.log("Please enter a password");
   		isPasswordCorrect = false;
   	}
return isPasswordCorrect;
   	
}
		
function isUsernameCorrect(username) {
   	var isUsernameCorrect = true;
   	if(username == ""){
   		arrStatusText.push("Username can not be empty");
   		isUsernameCorrect = false;
   	} else if(username === undefined){
   		console.log("Please enter a username");
   		isUsernameCorrect = false;
   	}
   	return isUsernameCorrect

}



//var myClient = new Client("daniel","ich","http://localhost:4567");
class UserContext {
	constructor() {
		this.contexts;
	}
}