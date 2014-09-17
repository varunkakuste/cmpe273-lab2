var connect = require('connect');
var login = require('./login');

var app = connect();

app.use(connect.json()); // Parse JSON request body into `request.body`
app.use(connect.urlencoded()); // Parse form in request body into `request.body`
app.use(connect.cookieParser()); // Parse cookies in the request headers into `request.cookies`
app.use(connect.query()); // Parse query string into `request.query`

app.use('/', main);

function main(request, response, next) {
	switch (request.method) {
		case 'GET': get(request, response); break;
		case 'POST': post(request, response); break;
		case 'DELETE': del(request, response); break;
		case 'PUT': put(request, response); break;
	}
};

function get(request, response) {
	var cookies = request.cookies;
	console.log(cookies);
	if ('session_id' in cookies) {
		var sid = cookies['session_id'];
		console.log("SID --->>> "+sid);
		if ( login.isLoggedIn(sid) ) {
			response.setHeader('Set-Cookie', 'session_id=' + sid);
			response.end(login.hello(sid));	
		} else {
			response.end("Invalid session_id! Please login again\n");
		}
	} else {
		response.end("Please login via HTTP POST\n");
	}
};

function post(request, response) {
	// TODO: read 'name and email from the request.body'
	// var newSessionId = login.login('xxx', 'xxx@gmail.com');
	// TODO: set new session id to the 'session_id' cookie in the response
	// replace "Logged In" response with response.end(login.hello(newSessionId));
	
	var body = request.body;
        console.log(body);
	if ('name' in body && 'email' in body) {
                var name = body.name;
	        var email = body.email;

                var newSessionId = login.login(name, email);
        	response.setHeader('Set-Cookie', 'session_id=' + newSessionId);	
		response.end("Logged In : "+login.hello(newSessionId));
        } else {
                response.end("Invalid/Missing Name or E-mail! Please login again\n");
	}
};

function del(request, response) {
	console.log("DELETE:: Logout from the server");
	
	var cookies = request.cookies;
	console.log(cookies);
	if ('session_id' in cookies) {
		var sid = cookies['session_id'];
		response.end(login.logout(sid));
	} else {
		response.end("Please login via HTTP POST\n");
	}
};

function put(request, response) {
	console.log("PUT:: Re-generate new seesion_id for the same user");
	// TODO: refresh session id; similar to the post() function
	var cookies = request.cookies;
        console.log(cookies);
        if ('session_id' in cookies) {
		var sid = cookies['session_id'];
		var arr = login.getDetails(sid);
		var name = arr[0];
		var email = arr[1];
		console.log("Name --->>> "+name);
		console.log("Email --->>> "+email);

               	var newSessionId = login.login(name, email);
               	response.setHeader('Set-Cookie', 'session_id=' + newSessionId);
               	response.end("Re-freshed session id "+sid+ " to : "+newSessionId +'\nUser with new new SessionId: ' +login.hello(newSessionId));
	} else {
		response.end("Please login via HTTP POST\n");		
	}
};

app.listen(8000);

console.log("Node.JS server running at 8000...");
