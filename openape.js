/**

* @author Lukas Smirek
@Version 0.1
*/
var openAPE_API = {

		tokenPath : "/token",
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
			servrUrl = openAPE_API.openAPE.openApeServerUrl;
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
		constructor(userName, password, serverUrl) {
	        if(serverurl === undefined){
	            this.serverUrl = serverUrl;
	        } else if(serverurl === "/"){
	            this.serverUrl =  window.location.protocol;
	        } else {
	            this.serverUrl = serverurl;
	        }

	        if(isPasswordCorrect(password) && isUsernameCorrect(userName)){
	    		var data = "grant_type=password&username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password);

	        	var httpRequest = createHttpRequest("POST", openape.api.tokenPath, function(responseText){
	        		this.token =JSON.parse(responseText).access_token; 
	        			        	}, 'application/x-www-form-urlencoded'
 );
	        	httpRequest.send(data);
	        	}

	        
		}// constructor
		
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

		
		createHttpRequest(verb, path, successCallback, data, contentType) {
			var request = new XMLHttpRequest();
			request.open(verb, this.serverUrl + path);
			   if (this.token !== undefined) {
				   request.setRequestHeader("authorisation, this.token");
			   }
			
			
			xmlHttp.onreadystatechange = function() { 
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		            successCallback(xmlHttp.responseText);
		    }

			
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
		


console.log("starting");
var myClient = new Client("daniel","ich","http://localhost:4567");