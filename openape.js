/**

* @author Lukas Smirek
@Version 0.1
*/
var openAPE_API = {

		tokenPath : "/api/token",
		openApeServerUrl = "http://openape.gpii.eu"
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
	class client {
		constructor(userName, password, serverUrl) {
	        if(serverurl === undefined){
	            this.serverUrl = serverUrl;
	        } else if(serverurl === "/"){
	            this.serverUrl =  window.location.protocol;
	        } else {
	            this.serverUrl = serverurl;
	        }

	        if(isPasswordCorrect(password) && isUsernameCorrect(userName)){
	        	createHttpRequest("POST", openape.api.tokenPath, function(responseText){
	        		this.token =JSON.parse(responseText).access_token; 
	        		
	        	}); 
	        	}

	        
		}// constructor
		
		createHttpRequest(verb, path, successCallback, data) {
			var request = new XMLHttpRequest();
			request.open(verb, this.serverUrl + path);
		    xmlHttp.onreadystatechange = function() { 
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		            successCallback(xmlHttp.responseText);
		    }

			
			return request;
			
			}
	}// client
		

