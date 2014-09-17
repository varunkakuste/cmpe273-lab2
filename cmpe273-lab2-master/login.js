
/**
 * Login Class
 */
function Login() {
	// sessionId -> user map
	this.sessionMap = {
		99999 : { name: 'Foo', email: 'foo@bar.com' }
	};
}
/**
 * Say Hello {name} to the user
 */
Login.prototype.hello = function(sessionId) {
	return 'Hello ' + this.sessionMap[sessionId].name + '\n';
};

/**
 * Check whether the given session id is valid (is in sessionMap) or not.
 */
Login.prototype.isLoggedIn = function(sessionId) {
	return sessionId in this.sessionMap;
};

/**
 * Create a new session id for the given user.
 */
Login.prototype.login = function(_name, _email) {
   /*
	* Generate unique session id and set it into sessionMap like foo@bar.com
	*/
	var sessionId = new Date().getTime();
	this.sessionMap[sessionId] = { name: _name, email: _email } 
	
	console.log('new session id ' + sessionId + ' for login::' + _email);
	
	return sessionId;
};

/**
 * Logout from the server
 */ 
Login.prototype.logout = function(sessionId) {
	console.log('logout::' + sessionId);
	var resultReturn;
	if(this.sessionMap[sessionId]){
		console.log('Deleted ::' + sessionId)
		delete this.sessionMap[sessionId];
		resultReturn = 'Logged out from the server: ' + sessionId + '\n';
	} else {
		console.log('Invalid Session ID ::' + sessionId);
		resultReturn = 'Invalid Session ID :: ' + sessionId + '\n';
	}
	
	return resultReturn;
};

/**
 * Create a new session id for the given user.
 */
Login.prototype.getDetails = function(sessionId) {
	var arr = new Array();
	arr[0] = this.sessionMap[sessionId].name;
	arr[1] = this.sessionMap[sessionId].email; 
        return arr;
};

// Export the Login class
module.exports = new Login();
