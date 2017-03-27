'use strict';

//chrome.storage.sync.clear();

//var userExists = getCookieInfo();

//console.log("userExists - " + userExists);
var user = {};

var app = angular.module("myApp", []);

app.controller("myController", function($scope) {
//	alert(localStorage["trails"]);
	//$scope.flights = [];
	console.log("inside controller");
	$scope.page = 1;
	$scope.user = {};
	$scope.trail = {};
	$scope.trailName = "My Trip to Singapore";
	$scope.source = "Bangalore";
	$scope.destination = "Singapore";
	chrome.cookies.getAll({"url":"https://www.facebook.com","name": "c_user"},function (cookie){
        console.log(cookie.length);
        if(cookie.length > 0) {
            //console.log(JSON.stringify(cookie[0]));
            console.log(JSON.stringify(cookie[0].name) + " - " + JSON.stringify(cookie[0].value));	
            //allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]) + " value - " + JSON.stringify(cookie[i].value);
            chrome.cookies.getAll({"url":"https://localhost:3001","name": "username"},function (cookieUserName){
            	if(cookieUserName.length > 0) {
            		console.log(JSON.stringify(cookieUserName[0].name) + " - " + JSON.stringify(cookieUserName[0].value));
            		chrome.cookies.getAll({"url":"https://localhost:3001","name": "userid"},function (cookieUserId){
		            	if(cookieUserId.length > 0) {
		            		console.log(JSON.stringify(cookieUserId[0].name) + " - " + JSON.stringify(cookieUserId[0].value));
		            		user = {'name' : cookieUserName[0].value , 'id' : cookieUserId[0].value};
		            		//return true;
		            		$scope.page = 2;
		            		$scope.user['name'] = cookieUserName[0].value;
            				$scope.user['id'] = cookieUserId[0].value;
		            		//$scope.$apply(); 

		            		chrome.storage.sync.get(user['id'], function(userData) {
							    if (chrome.runtime.error) {
							      	console.log("Runtime error.");
							    }
/*							    if(userData[user['id']].length < 0)
							    	return;*/
							    console.log("getting userData - " + JSON.stringify(userData));
							    console.log("len - " + JSON.stringify(userData).length);
							    console.log("val - " + JSON.stringify(userData[user['id']]));
							    if(userData[user['id']] !== null && userData[user['id']] !== undefined) {
							    	console.log("trail data - " + JSON.stringify(userData[user['id']]));
							    	$scope.page = 3;
							    	$scope.trail = userData[user['id']];
							    	$scope.$apply();
							    }
							});
		            		$scope.$apply();
		            		console.log("scope page - " + $scope.page);
		            	}
		            	else {
		            		//load trails website to set cookie
				    		//loadTrailsPage();
		            	}
		            });
            	}
            	else {
            		//load trails website to set cookie
		    		//loadTrailsPage();
		    		//return false;
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
        }
    });	

	$scope.createTrail = function() {
		//alert("source - " + $scope.source + ", dest - " + $scope.destination);
		var trailJSON = {};
		trailJSON['name'] = $scope.trailName;
		trailJSON["departureCity"] = $scope.source;
		trailJSON["arrivalCity"] = $scope.destination;
		trailJSON["durationInDays"] = 1;
		trailJSON["numOfTravelers"] = 1;
		trailJSON["costPerPerson"] = "price";
		trailJSON["totalcost"] = "price";
		trailJSON["dayWisePlan"] = ["Day Wise Plan"];
		trailJSON["rating"] = Math.floor((Math.random() * 4) + 2);
		trailJSON["status"] = "booked";
		trailJSON["userfbid"] = $scope.user['id'];
		console.log("trail data - " + JSON.stringify(trailJSON));
		$.ajax({
			type : "POST",
			url : "https://localhost:3001/api/Trails",
			data : trailJSON,
			success : function(response) {
				console.log("response - " + response.id);
				// $.ajax({
				// 	type : "PUT",
				// 	url : "https://localhost:3001/api/Trails",
				// 	data : {}
				// });
				var userTrail = {'id' : response.id};
				userTrail["air"] = [];
				userTrail["attraction"] = [];
				userTrail["hotel"] = [];
				userTrail["car"] = [];
				//postData["id"] = response.id;
				//store trail in chrome storage
				console.log("scope user id - " + $scope.user['id']);
				var userid = $scope.user['id'];
				var userdata = {};
				userdata[userid] = userTrail;
				console.log("user id - " + JSON.stringify(userdata));
				chrome.storage.sync.set(userdata, function() {
					console.log("User trail created in cache - " + JSON.stringify(userTrail));
					$scope.trail = userTrail;
					$scope.page = 3;
					$scope.$apply();
					chrome.storage.sync.get(userid, function(res) {
						console.log("res - " + JSON.stringify(res));
					});
		    	});

			},
			error : function(er) {
				alert("error");
			}
		});
	};

	$scope.submitTrail = function() {
		//alert("submit");
		var postFailed = false;
		console.log("scope trail - " + JSON.stringify($scope.trail));
		for(var key in $scope.trail) {
			console.log("scope trail of key - " + key + " , - " + JSON.stringify($scope.trail[key]));
			if(key === 'id')
				continue;
			for(var i = 0; i < $scope.trail[key].length; i++) {
				var item = {};
				console.log("values from scope trail key name-" + $scope.trail[key][i]['name'] + " feel-" + $scope.trail[key][i]['feeling'] + ", endpoint-" + $scope.trail[key][i]['endpoint']);
				item['type'] = key;
				item['value'] = $scope.trail[key][i]['name'];
				item['feeling'] = $scope.trail[key][i]['feeling'];
				item['endpoint'] = $scope.trail[key][i]['endpoint'];
				item['datetime'] = new Date();
				item['price'] = $scope.trail[key][i]['price'];
				item['trailId'] = $scope.trail['id'];
				console.log("key - " + key + ", value - " + JSON.stringify(item));
				$.ajax({
					type : "PUT",
					url : "https://localhost:3001/api/Items",
					data : item,
					success : function(item) {
						console.log("item id - " + item.id);
					},
					error : function(err) {
						console.log("posting item failed");
						postFailed = true;
					}
				});
				if(postFailed)
					break;
			}
			if(postFailed)
				break;
		}
		if(!postFailed) {
			chrome.storage.sync.remove($scope.user['id'], function() {
				$scope.page = 2;
				$scope.trail = {};
				$scope.$apply();
				chrome.storage.sync.get($scope.user['id'], function(res) {
					console.log("Post submit res - " + JSON.stringify(res));
				});
			});
		}
	};

	$(document).on('click', "#list-items ul li a", function () {
		$(this).parents().eq(1).find('.active').removeClass('active');
		$(this).parents().eq(0).addClass('active');
	});
/*	    var newURL = "https://localhost:3001/index.html";
    chrome.tabs.create({ url: newURL });*/
	//alert(localStorage.getItem("user"));
/*	function getCookies(domain, name, callback) {
	    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
	        if(callback) {
	            callback(document.cookie.value);
	        }
	    });
	}

	//usage:
	getCookies("https://www.facebook.com", "c_user", function(c_user) {
	    alert(c_user);
	});*/
	$scope.loadTrailsPage = function() {
		//alert("loading webpage");
		var newURL = "https://localhost:3001/index.html";
		chrome.tabs.create({ url: newURL });
	};

	$scope.icon = chrome.extension.getURL("/images/baby-foot-mini.png");
	$scope.deletebtn =  chrome.extension.getURL("/images/delete.png");
	
	if(user !== undefined && user !== {}) {
		chrome.storage.sync.get(user.id, function (result) {
			console.log("inside get");
			if (result[user.id] === null || result[user.id] === undefined) {
				$scope.trail = [];
				console.log("trail empty");
				return;
			}
			$scope.trail = result[user.id];
			//as sync.get is asynchronous call we have force $scope.$apply to see data update
			$scope.$apply(); 
			console.log($scope.trail);
		});
	}
	else {
		console.log("User data not available");
	}
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (var key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
        //key = 'flights'
		chrome.storage.sync.get(key, function (result) {
			$scope.trail = result[key];
			$scope.$apply();
			console.log($scope.trail);
		});
    });


	$scope.removeTrail = function(index, item) {
		var itemToRemove = $scope.trail[item];
		//var id = $scope.trail[index].id;
		console.log("index-" + index + ", item-" + item);
/*	    //DELETE - https://localhost:3001/api/Trails/5810472453bc413318942b56
	    $.ajax({
	    	type : "DELETE",
	    	url : "https://blrl41524:3001/api/Trails/" + id,
	    	success : function(response) {
	    		console.log("DELETE success");
*/				$scope.trail[item].splice( index, 1 );
				var updatedData = {};
				updatedData[$scope.user['id']] = $scope.trail;
				chrome.storage.sync.set(updatedData, function() {
				    if (chrome.runtime.error) {
				      	console.log("Runtime error.");
				    }
					chrome.storage.sync.get($scope.user['id'], function(result) {
				      	//console.log("after removing - ");
				      	console.log(result);
					});
				});
				$scope.$apply();
/*	    	},
	    	error : function(err) {
	    		console.log("DELETE failed");
	    	}
	    });*/
	};
});
/*chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    for (var i = 0; i < details.responseHeaders.length; ++i) {
      if (details.responseHeaders[i].name.toLowerCase() == 'x-frame-options') {
        details.responseHeaders.splice(i, 1);
        return {
          responseHeaders: details.responseHeaders
        };
      }
    }
  }, {
    urls: ["<all_urls>"]
  }, ["blocking", "responseHeaders"]);
$(function(){ // this could be done faster with the livequery() plugin for jquery
	alert(1);

var elt = document.createElement('iframe');
elt.id = 'facebook_load_frame';
elt.src = 'iframe.html';
console.log(elt);
document.getElementsByTagName('body')[0].appendChild(elt);
});
// Message passing API from David Walsh at http://davidwalsh.name/window-iframe
// Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
// Listen to message from child window
eventer(messageEvent,function(e) {
 console.log("Connection status: "+e.data.connectStatus+"; UserID: "+e.data.userID+"; AccessToken: "+e.data.accessToken);
 //This is the data from the Facebook SDK
},false);*/



function getCookieInfo(){
    chrome.cookies.getAll({"url":"https://www.facebook.com","name": "c_user"},function (cookie){
        console.log(cookie.length);
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
		            		return true;
		            	}
		            	else {
		            		//load trails website to set cookie
				    		//loadTrailsPage();
		            	}
		            });
            	}
            	else {
            		//load trails website to set cookie
		    		//loadTrailsPage();
		    		return false;
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
    		return false;
        }
    });
}
//window.onload=getCookieInfo;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getStatus") {
    	console.log("getStatus msg received");
		sendResponse({status: localStorage['status']});
    }
    else {
    	console.log("other msg received");
		sendResponse({}); // snub them.
    }
});
