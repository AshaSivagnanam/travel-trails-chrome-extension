/* chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Received %o from %o, frame", request, sender.tab, sender.frameId);
    if(request.method == "getUser") {
    	
    	//sendResponse("before cookies");
    	var user = getUser(function(data) {
    		alert("inside callback");
    		//sendResponse(data);
    	});

    }
	else
		sendResponse("Gotcha!");
});

function getUser(callback) {
	var user = {};
    chrome.cookies.getAll({"url":"https://www.facebook.com","name": "c_user"},function (cookie){
        console.log(cookie.length);
        //sendResponse("JSON.stringify(user)");
        if(cookie.length > 0) {
            console.log(JSON.stringify(cookie[0]));
            console.log(JSON.stringify(cookie[0].name) + " - " + JSON.stringify(cookie[0].value));	
            //allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]) + " value - " + JSON.stringify(cookie[i].value);
            chrome.cookies.getAll({"url":"https://localhost:3001","name": "username"},function (cookieUserName){
            	if(cookieUserName.length > 0) {
            		console.log(JSON.stringify(cookieUserName[0].name) + " - " + JSON.stringify(cookieUserName[0].value));
            		chrome.cookies.getAll({"url":"https://localhost:3001","name": "userid"},function (cookieUserId){
		            	if(cookieUserId.length > 0) {
		            		console.log(JSON.stringify(cookieUserId[0].name) + " - " + JSON.stringify(cookieUserId[0].value));
		            		user = {'name' : cookieUserName[0].value , 'id' : cookieUserId[0].value};
		            		alert(JSON.stringify(user));
		            		//sendResponse("JSON.stringify(user)");
		            		sendResponse(JSON.stringify(user));
		            		callback(user);
		            	}
		            	else {
		            		//sendResponse(JSON.stringify(user));
		            		callback(user);
	            		}
		            });
            	}
            	else {
            		//sendResponse(JSON.stringify(user));
            		callback(user);
            	}
            });
        }
        else {
        	chrome.cookies.remove({"url":"https://localhost:3001","name": "username"}, function(abc){
        		console.log("username cookie removed");
        	});
        	chrome.cookies.remove({"url":"https://localhost:3001","name": "userid"}, function(abc){
        		console.log("userid cookie removed");
        	});
    		//load trails website to login to facebook and set cookie
    		//loadTrailsPage();
    		//return false;
    		//sendResponse(JSON.stringify(user));
    		callback(user);
        }
    });
}*/

chrome.extension.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
  	//alert(msg.query);
    if (msg.query == "check")
      port.postMessage({res: "connected!"});
    else if (msg.query == "getStatus") {
	//var user = {};
    chrome.cookies.getAll({"url":"https://www.facebook.com","name": "c_user"},function (cookie){
        console.log(cookie.length);
        //sendResponse("JSON.stringify(user)");
        if(cookie.length > 0) {
            console.log(JSON.stringify(cookie[0]));
            console.log(JSON.stringify(cookie[0].name) + " - " + JSON.stringify(cookie[0].value));	
            //allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]) + " value - " + JSON.stringify(cookie[i].value);
            chrome.cookies.getAll({"url":"https://localhost:3001","name": "username"},function (cookieUserName){
            	if(cookieUserName.length > 0) {
            		console.log(JSON.stringify(cookieUserName[0].name) + " - " + JSON.stringify(cookieUserName[0].value));
            		chrome.cookies.getAll({"url":"https://localhost:3001","name": "userid"},function (cookieUserId){
		            	if(cookieUserId.length > 0) {
		            		console.log(JSON.stringify(cookieUserId[0].name) + " - " + JSON.stringify(cookieUserId[0].value));
		            		user = {'name' : cookieUserName[0].value , 'id' : cookieUserId[0].value};
		            		//alert(JSON.stringify(user));
		            		//sendResponse("JSON.stringify(user)");
		            		//sendResponse(JSON.stringify(user));
		            		//callback(user);
		            		port.postMessage({res: user});
		            	}
		            	else {
		            		//sendResponse(JSON.stringify(user));
		            		//callback(user);
		            		port.postMessage({res: null});
	            		}
		            });
            	}
            	else {
            		//sendResponse(JSON.stringify(user));
            		//callback(user);
            		port.postMessage({res: null});
            	}
            });
        }
        else {
        	chrome.cookies.remove({"url":"https://localhost:3001","name": "username"}, function(abc){
        		console.log("username cookie removed");
        	});
        	chrome.cookies.remove({"url":"https://localhost:3001","name": "userid"}, function(abc){
        		console.log("userid cookie removed");
        	});
    		//load trails website to login to facebook and set cookie
    		//loadTrailsPage();
    		//return false;
    		//sendResponse(JSON.stringify(user));
    		//callback(user);
    		port.postMessage({res: null});
        }
    });    	
      //port.postMessage({res: "Madame who?"});
    }
    else if (msg.query == "Madame... Bovary")
      port.postMessage({question: "I don't get it."});
  });
});