/**

* @author Lukas Smirek
@Version 0.1
*/
var openAPE_API = {

		tokenPath : "/token",
userContextPath : "api/user-contexts",
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
	            this.serverUrl =openAPE_API.openapeServerUrl;
	        } else if(serverUrl === "/"){
	            this.serverUrl =  window.location.protocol;
	        } else {
	            this.serverUrl = serverUrl;
	        }

	        if(isPasswordCorrect(password) && isUsernameCorrect(username)){
	    		var data = "grant_type=password&username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password);
	    		
console.log("data: " +data);
	        	var httpRequest = this.createHttpRequest("POST", openAPE_API.tokenPath  , 
	        			function(responseText){
	        		this.token =JSON.parse(responseText).access_token; 
	        			        	}, undefined,   
	        			        	'application/x-www-form-urlencoded'
 );
	        	httpRequest.send(data);
	        	}

	        
		}// constructor

	
		
	   /* * getUserContextList
	    * 
	    * This function is used to retrieve a list of URIs to accessible
	    * user contexts This Function relates to ISO/IEC 24752-8 7.2.6
	    * 
	    * @param {string}
	    *            query - the query to filter the relevant contexts
	    * @param{string} contentType - the used content-type
	    * @return {object} - A javascript object with all status
	    *         information
	    */
	   getUserContextList (successCallback, errorCallback, query, contentType) {
		   return getContextList(openApe_API.userContextPath, successCallback, errorCallback, query, successCallback, errorCallbackcontentType);
	   	}

		createContext (path, context, successCallback, contentType) {
			   if(isTokenCorrect() && isContextCorrect(context)){	
	httpRequest = createHttpRequest("POST", 
	path, function(responseText){
	callback(responseText);
	}, context,
	contentType );
	httpRequest.send(null);
		   }
		}
		
		getContext (path, contextId, successCallback, undefined, contentType) {
				   if(isTokenCorrect() && isContextIdCorrect(contextId) ){
				   let httpRequest= createHttpRequest("GET", path + "/" + contextId, function(responseText) {
				   successCallback(parse(response));
				   }, contentType);
				   httpRequest.send(null);
				   }
			   } 
	
		updateContext (path, contextId, context, successCallback, contentType) {
			   if(isTokenCorrect() && isContextCorrect(context) && isContextIdCorrect(contextId) ){
	httpRequest= createHttpRequest("PUT", path+"/" +contextId, contentType); 
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

getContextList(path, successCallback, query, contentType){
			   httpRequest = createHttpRequest("GET",path, function(responseText){
				   
				successCallback(parse(responseText));   
			   }, contentType);
			   httpRequest.send(null);
		   }
		   
		   parse(responseText, contentType){
			   var result;
			   if (contentType == "application/json"){
				   result = JSON.parse(responseText);
			   }
			   return result;
		   }

		
		createHttpRequest(verb, path, successCallback, errorCallback, contentType) {
			let request = new XMLHttpRequest();
			let client = this;
			request.open(verb, this.serverUrl + path);
			console.log("Token: " + this.token )
			   if (this.token !== undefined) {
				   request.setRequestHeader("authorisation, this.token");
			   }
			   
			   if(contentType == "application/json"  || contentType == "application/x-www-form-urlencoded"){
			   console.log("contentType: " + contentType);
				   request.setRequestHeader("Content-type", contentType);
			   }else { 
console.log("standard contentType");
			   request.setRequestHeader("Content-type", this.defaultContentType);
			}
			   
			   request.onload = function () {
				   console.log(request.responseURL); // http://example.com/test
				 };

			   
			request.onreadystatechange = function() { 
		        if (request.readyState == 4 && request.status == 200){
		            successCallback.call(this, request.responseText);
		        	successCallback(request.responseText);
			} 
		        else if (request.status == 404) {
				console.log("Error: " + request.status );
			} else {
				console.log("readyState: " +request.readyState  );
				console.log("HTTP: " +request.status  );
				console.log("Error: " + request.responseText);
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


console.log("starting");
//var myClient = new Client("daniel","ich","http://localhost:4567");