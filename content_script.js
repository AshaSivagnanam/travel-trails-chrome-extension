
//var myVar = setInterval(appendElement, 1000);
//chrome.storage.sync.clear();

var expensivebtn =  chrome.extension.getURL("/images/expensive.png");
var coolbtn =  chrome.extension.getURL("/images/cool.png");
var reasonablebtn =  chrome.extension.getURL("/images/reasonable.png");
var favouritebtn =  chrome.extension.getURL("/images/favourite.png");

/*var toAppend = '<div class="injected container-fluid full-width" style="padding:5px;z-index:10;height:30px;"><div class="row-fluid col-md-12">';
toAppend += '<input id="expensive" title="Expensive" class="emotion pull-right" type="image" src="' + expensivebtn + '" width="20" height="20">';
toAppend += '<input id="cool" title="Cool" class="emotion pull-right" type="image" src="' + coolbtn +'" width="20" height="20">';
toAppend += '<input id="reasonable" title="Worth the Cost" class="emotion pull-right" type="image" src="' + reasonablebtn + '" width="20" height="20">';
toAppend += '<input id="favourite" title="Favourite" class="emotion pull-right" type="image" src="' + favouritebtn + '" width="20" height="20">';
toAppend += '</div></div>';*/
var toAppend = '<div class="injected container-fluid full-width" style="padding:5px;z-index:10;height:30px;"><div class="row-fluid col-md-12">';
toAppend += '<input id="expensive" title="Expensive" class="emotion pull-right" style="margin:3px;" type="image" src="' + expensivebtn +'"  width="20" height="20"/>';
toAppend += '<input id="cool" title="Cool" class="emotion pull-right" style="margin:3px;" type="image" src="' + coolbtn +'" width="20" height="20">';
toAppend += '<input id="reasonable" title="Worth the Cost" class="emotion pull-right" style="margin:3px;" type="image" src="' + reasonablebtn + '" width="20" height="20">';
toAppend += '<input id="favourite" title="Favourite" class="emotion pull-right" style="margin:3px;" type="image" src="' + favouritebtn + '" width="20" height="20">';
toAppend += '</div></div>';
$('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');

var mmtURL = new RegExp("https://flights.makemytrip.com/makemytrip/search/*");
var mmtInternational = new RegExp("https://cheapfaresindia.makemytrip.com/international/*")
var hotelURL = new RegExp("https://blrl41524:8090/HotelSearch.html");
var carURL = new RegExp("https://blrl41524:8091/search.html");
var viatorURL = new RegExp("https://www.viator.com/*/*");
var goIbiboURL = new RegExp("https://www.goibibo.com/hotels/find-hotels*");
//var fbURL = new RegExp("https://www.facebook.com*");
var user = {};

var port = chrome.extension.connect({name: "knockknock"});
port.postMessage({query: "check"});
port.onMessage.addListener(function(msg) {
	//alert(msg.res);
	if(msg.res == "connected!") {
		port.postMessage({query: "getStatus"});
	}
	else if(msg.res !== null && msg.res !== undefined) {
		console.log(JSON.stringify(msg.res));
		//alert(JSON.stringify(msg.res));
		user['id'] = msg.res.id;
		user['name'] = msg.res.name;
		appendElement();
	}
	else {
		//alert("User not logged in to trails page");
		return;
	}
/*	  if (msg.res == "Who's there?") 
    port.postMessage({query: "Madame"});
  else if (msg.res == "Madame who?")
    port.postMessage({query: "Madame... Bovary"});*/
});

//appendElement();

function appendElement(){ 
	//check if user is logged in 

/*	chrome.cookies.getAll({"url":"https://www.facebook.com","name": "c_user"},function (cookie){
        console.log(cookie.length);
        if(cookie.length > 0) {
            //console.log(JSON.stringify(cookie[0]));
            console.log(JSON.stringify(cookie[0].name) + " - " + JSON.stringify(cookie[0].value));	
            //allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]) + " value - " + JSON.stringify(cookie[i].value);
            chrome.cookies.getAll({"url":"https://localhost:3001","name": "username"}, function (cookieUserName){
            	if(cookieUserName.length > 0) {
            		console.log(JSON.stringify(cookieUserName[0].name) + " - " + JSON.stringify(cookieUserName[0].value));
            		chrome.cookies.getAll({"url":"https://localhost:3001","name": "userid"},function (cookieUserId){
		            	if(cookieUserId.length > 0) {
		            		console.log(JSON.stringify(cookieUserId[0].name) + " - " + JSON.stringify(cookieUserId[0].value));
		            		user = {'name' : cookieUserName[0].value , 'id' : cookieUserId[0].value};
		            		//return true;
		            	}
		            	else {
		            		//load trails website to set cookie
				    		//loadTrailsPage();
				    		alert("user not logged in to trails web site");
				    		return;
		            	}
		            });
            	}
            	else {
            		//load trails website to set cookie
		    		//loadTrailsPage();
		    		alert("user not logged in to trails web site");
		    		return;
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
    		alert("user not logged in to trails web site");
    		return;
        }
    });	
*/
	if(mmtURL.test(document.location.href)) {
		console.log($("div.clearfix.listing_row").length);
		var checkForData = setInterval(updateView, 1000);
		function updateView() {
			if($("div.clearfix.listing_row").length > 0 && $("div.clearfix.listing_row:not(:has(>div.injected))").length > 0){
				//setTimeout(function(){},1000);
				$("div.clearfix.listing_row:not(:has(>div.injected))").append(toAppend);
				console.log("append done clearing interval");
				//clearInterval(checkForData);
				//console.log("interval cleared");
			}
		}
		//console.log("after interval");
	}
	else if(mmtInternational.test(document.location.href)) {
		//alert("mmt int");
		console.log("mmt international");
		var checkForData = setInterval(updateView, 1000);
		function updateView() {
			if($("div.clearfix.listing_top").length > 0 && $("div.clearfix.listing_top:not(:has(>div.injected))").length > 0){
				//setTimeout(function(){},1000);
				$("div.clearfix.listing_top:not(:has(>div.injected))").append(toAppend);
				console.log("append done clearing interval");
				//clearInterval(checkForData);
				//console.log("interval cleared");
			}
		}
	}
	else if(hotelURL.test(document.location.href)) {
		console.log($("#hotels-list tbody tr").length);
		var checkForData = setInterval(updateView, 1000);
		function updateView() {
			if($("#hotels-list tbody tr").length > 0 && $("#hotels-list tbody tr:not(:has(>td div.injected))").length > 0){
				//setTimeout(function(){},1000);
				$("#hotels-list tbody tr:not(:has(>td div.injected))").append("<td>" + toAppend + "</td>");
				console.log("append done clearing interval");
				//clearInterval(checkForData);
				//console.log("interval cleared");
			}
		}
		//console.log("after interval");
	}
	else if(goIbiboURL.test(document.location.href)) {
		console.log("go ibibo");
		var checkForData = setInterval(updateView, 1000);
		console.log($("section.srpCards"));
		function updateView() {
			if($("section.srpCards").length > 0 && $("section.srpCards:not(:has(>div.injected))").length > 0){
				//setTimeout(function(){},1000);
				$("section.srpCards:not(:has(>div.injected))").append(toAppend);
				console.log("append done clearing interval");
				//clearInterval(checkForData);
				//console.log("interval cleared");
			}
		}
	}
	else if(carURL.test(document.location.href)) {
		console.log($("#cars-list tbody tr").length);
		var checkForData = setInterval(updateView, 1000);
		function updateView() {
			if($("#cars-list tbody tr").length > 0 && $("#cars-list tbody tr:not(:has(>td div.injected))").length > 0){
				//setTimeout(function(){},1000);
				$("#cars-list tbody tr:not(:has(>td div.injected))").append("<td>" + toAppend + "</td>");
				console.log("append done clearing interval");
				//clearInterval(checkForData);
				//console.log("interval cleared");
			}
		}
		//console.log("after interval");
	}
	else if(viatorURL.test(document.location.href)) {
		console.log("in viator");
		console.log($("div.line.page-bg.mbl div.unit.size1of3").length);
		console.log($("#productList div.media.product-summary").length);
		var findLayoutTimer = setInterval(findLayout, 1000);
		function findLayout() {
			if($("div.line.page-bg.mbl div.unit.size1of3").length > 0) {
				console.log("3 boxes " + $("div.line.page-bg.mbl div.unit.size1of3").length);
				clearInterval(findLayout);
				var checkForData = setInterval(updateView, 1000);
				function updateView() {
					if($("div.line.page-bg.mbl div.unit.size1of3").length > 0 && $("div.line.page-bg.mbl div.unit.size1of3 div.pal div div.ttd-row-height:not(:has(>div.injected))").length > 0){
						//setTimeout(function(){},1000);
						$("div.line.page-bg.mbl div.unit.size1of3 div.pal div div.ttd-row-height:not(:has(>div.injected))").append(toAppend);
						console.log("append done clearing interval");
						//clearInterval(checkForData);
						//console.log("interval cleared");
					}
				}
			}
			else if($("#productList div.media.product-summary").length > 0) {
				console.log("1 by 1 " + $("#productList div.media.product-summary").length);
				clearInterval(findLayout);
				var checkForData = setInterval(updateView, 1000);
				function updateView() {
					if($("#productList div.media.product-summary div.bd div.size2of3").length > 0 && $("#productList div.media.product-summary div.bd div.size2of3:not(:has(>div.injected))").length > 0){
						//setTimeout(function(){},1000);
						$("#productList div.media.product-summary div.bd div.size2of3:not(:has(>div.injected))").append(toAppend);
						console.log("append done clearing interval");
						//clearInterval(checkForData);
						//console.log("interval cleared");
					}
				}
			}
			else
				console.log("layout not recognized");
		}
		
	}
	else if(expediaURL.test(document.location.href)) {
		console.log("expedia");
		console.log($("#resultsContainer section article").length);
		var checkForData = setInterval(updateView, 1000);
		function updateView() {
			if($("#resultsContainer section article").find('div.flex-area-primary').length > 0 && $("#resultsContainer section article").find('div.flex-area-primary:not(:has(>div.injected))').length > 0){
				//setTimeout(function(){},1000);
				$("#resultsContainer section article").find('div.flex-area-primary:not(:has(>div.injected))').append(toAppend);
				console.log("append done clearing interval");
				//clearInterval(checkForData);
				//console.log("interval cleared");
			}
		}		
	}
/*	else if(fbURL.test(document.location.href)) {
		console.log("fb");
		chrome.cookies.getAll({"url":"https://www.facebook.com","name": "c_user"},function (cookie){
			if(cookie.length == 0) {
				document.cookie = 'username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			}
		});
	}*/
	else {
		console.log("page not recognized");
	}	

}


$(document).on("click", "input.emotion", function(event){
	event.stopPropagation();
	//alert("clicked - " + $(this).attr("id"));
	if(mmtURL.test(document.location.href)) {
		var feeling = $(this).attr("id");
		console.log(feeling);

		var target = $(this).parents().eq(2);
		//console.log(target);
		var airlineName = target.find(".airline_info_detls > span.logo_name").first().text();
		airlineName += " " + target.find(".airline_info_detls > span.logo_name").last().text();
		console.log("airline - " + airlineName);

		var departure = target.find("div.time_info_space");
		var departureData = departure.children();
		console.log(departureData);
		var departureTime = departureData.first().text();
		console.log("time - " + departureTime);
		var departFrom = departureData.first().next().text();
		console.log("depart from - " + departFrom);

		var arrival = departure.next();
		var arrivalData = arrival.children();
		var arrivalTime = arrivalData.first().text();
		console.log("arrival time - " + arrivalTime);
		var arrivalTo = arrivalData.first().next().text();
		console.log("arrival to - " + arrivalTo);

		var durationData = arrival.next().children();
		var duration = durationData.first().text();
		var stopInfo = durationData.first().next().text();
		console.log("duration - " + duration + ", stops - " + stopInfo);

		var price = target.find("div.price_sectn > p.price_info").text();
		console.log("price - " + price);

		//Add data to storage and update in flights data
		var postData = {};
		postData["name"] = airlineName + " " + departFrom + " to " + arrivalTo;
		//postData["departure"] = departFrom;
		//postData["arrival"] = arrivalTo;
		postData["departuretime"] = departureTime;
		postData["arrivaltime"] = arrivalTime;
		//postData["airline"] = airlineName;
		postData["duration"] = duration + " " + stopInfo;
		//postData["stops"] = stopInfo;
		postData["price"] = price;
		postData["feeling"] = feeling;
		postData["endpoint"] = "mmt";
		console.log(postData);
		console.log("user - " + JSON.stringify(user));
		console.log("id-" + user['id']);
		var id = user['id'];
		chrome.storage.sync.get(id, function (result) {
			console.log("sync get user trail - " + JSON.stringify(result));
			if (result[id] === null || result[id] === undefined) {
				result[id] = {};
				console.log("initializing user trail");
			}
			console.log("result length - " + result[id].length);
			console.log(result[id]);
			result[id]['air'].push(postData);
			console.log("after adding air - " + JSON.stringify(result[id]));
			var data = {};
			data[user['id']] = result[id];
			chrome.storage.sync.set(data, function() {
			    if (chrome.runtime.error) {
			      	console.log("Runtime error.");
			    }
				chrome.storage.sync.get(user['id'], function(result) {
			      	console.log("final - ");
			      	console.log(JSON.stringify(result));
				});
			});

/*			//posting to loopback service
			var trailJSON = {};
			trailJSON["name"] = departFrom + "-" + arrivalTo + " " + postData["name"] + "  " + stopInfo;
			trailJSON["departureCity"] = postData["departure"];
			trailJSON["arrivalCity"] = postData["arrival"];
			trailJSON["durationInDays"] = postData["duration"];
			trailJSON["numOfTravelers"] = 1;
			trailJSON["costPerPerson"] = price;
			trailJSON["totalcost"] = price;
			trailJSON["dayWisePlan"] = ["Day Wise Plan"];
			var rating = 0;
			switch(feeling) {
				case "expensive" : rating = 2; break;
				case "cool" : rating = 3; break;
				case "reasonable" : rating = 4; break;
				case "favourite" : rating = 5; break;
				default : rating = 0; break;
			}
			trailJSON["rating"] = rating;
			trailJSON["status"] = "booked";
			trailJSON["useremail"] = "test2@amadeus.com";
			//trailJSON["items"] = [{
			var items = {
				"type" : "air",
				"value" : airlineName,
				"datetime" : new Date(),
				"feeling" : feeling,
				"endpoint" : "endpoint"
			};
			console.log(trailJSON);
			$.ajax({
				type : "POST",
				url : "https://blrl41524:3001/api/Trails",
				data : trailJSON,
				success : function(response) {
					postData["id"] = response.id;
					console.log("post success - " + postData["id"]);
					result.flights.push(postData);
					console.log("Storage length after push - " + result.flights.length);
					console.log(postData);
					items["trailId"] = response.id;
					$.ajax({
						type : "PUT",
						url : "https://blrl41524:3001/api/Items",
						data : items,
						success : function(item) {
							console.log("item id - " + item.id);
						},
						error : function(err) {
							console.log("posting item failed");
						}
					});
					chrome.storage.sync.set({ 'flights' : result.flights }, function() {
					    if (chrome.runtime.error) {
					      	console.log("Runtime error.");
					    }
						chrome.storage.sync.get('flights', function(result) {
					      	console.log("final - ");
					      	console.log(result);
						});
					});
				},
				error : function(err) {
					console.log("post error");
				}
			});*/
		});
	}
	else if(mmtInternational.test(document.location.href)) {
		console.log("mmt international");
		var feeling = $(this).attr("id");
		console.log(feeling);
		var target = $(this).parents().eq(3);
		console.log(target);
		var airlineName = target.find(".logo_section .logo_name").text();
		var elem = target.find(".intl_flightdetails p.city_names span:first");
		var departure = elem.text();
		//departure = $.trim(departure);
		//var arrival = target.find(".intl_flightdetails p.city_names:nth-child(3)").text();
		var arrival = elem.siblings().eq(1).text();
		//arrival = $.trim(arrival);
		var departureTime = target.find(".flight_timing_wrapper p.flight_timing span:eq(0) strong").text();
		var duration = target.find(".flight_timing_wrapper p.flight_timing span:eq(1)").text();
		var arrivalTime = target.find(".flight_timing_wrapper p.flight_timing span:eq(2)").text();
		var price = target.find("div:nth-child(4) p.price_info.RobotoRegular b:first").clone().children().remove().end().text();;
		//departure.replace(/[\n\t\r]+/g, '');
		//alert(arrival.replace(/[\n\t\r]+/g, ''));
		//arrival.replace(/[\n\t\r]+/g, '');
		console.log(airlineName);
		console.log(departure);
		console.log(arrival);
		console.log(departureTime);
		console.log(duration);
		console.log(arrivalTime);
		console.log(price);
		//Add data to storage and update in flights data
		var postData = {};
		postData["name"] = airlineName + " " + departure + " to " + arrival;
		//postData["departure"] = departFrom;
		//postData["arrival"] = arrivalTo;
		postData["departuretime"] = departureTime;
		postData["arrivaltime"] = arrivalTime;
		//postData["airline"] = airlineName;
		postData["duration"] = duration;
		//postData["stops"] = stopInfo;
		postData["price"] = price;
		postData["feeling"] = feeling;
		postData["endpoint"] = "mmt international";
		console.log(postData);
		console.log("user - " + JSON.stringify(user));
		console.log("id-" + user['id']);
		var id = user['id'];
		chrome.storage.sync.get(id, function (result) {
			console.log("sync get user trail - " + JSON.stringify(result));
			if (result[id] === null || result[id] === undefined) {
				result[id] = {};
				console.log("initializing user trail");
			}
			console.log("result length - " + result[id].length);
			console.log(result[id]);
			result[id]['air'].push(postData);
			console.log("after adding air - " + JSON.stringify(result[id]));
			var data = {};
			data[user['id']] = result[id];
			chrome.storage.sync.set(data, function() {
			    if (chrome.runtime.error) {
			      	console.log("Runtime error.");
			    }
				chrome.storage.sync.get(user['id'], function(result) {
			      	console.log("final - ");
			      	console.log(JSON.stringify(result));
				});
			});
		});
	}
	else if(hotelURL.test(document.location.href)) {
		console.log("hotel emoticon click");
		var feeling = $(this).attr("id");
		console.log(feeling);

		var target = $(this).parents().eq(3);
		console.log(target);
		var row = target.find("td").first();
		var hotelName = row.text();
		console.log(hotelName);
		var addr = row.next().text();
		console.log(addr);
		var price = row.nextAll().eq(1).text();
		console.log(price);
		var contact = row.nextAll().eq(2).text();
		console.log(contact);
	}
	else if(goIbiboURL.test(document.location.href)) {
		console.log("goibibo emoticon click");
		var feeling = $(this).attr("id");
		console.log(feeling);

		var target = $(this).parents().eq(2);
		console.log(target.prev());
		var name = target.find(".hotelinfoBlk").text();
		console.log(name);
		var price = target.find("p.greyDr.fb").text();
		console.log(price);
		var postData = {};
		postData["name"] = name;
		postData["price"] = price;
		postData["feeling"] = feeling;
		postData["endpoint"] = "go ibibo";
		console.log(postData);
		console.log("user - " + JSON.stringify(user));
		console.log("id-" + user['id']);
		var id = user['id'];
		chrome.storage.sync.get(id, function (result) {
			console.log("sync get user trail - " + JSON.stringify(result));
			if (result[id] === null || result[id] === undefined) {
				result[id] = {};
				console.log("initializing user trail");
			}
			console.log("result length - " + result[id].length);
			console.log(result[id]);
			result[id]['hotel'].push(postData);
			console.log("after adding attraction - " + JSON.stringify(result[id]));
			var data = {};
			data[user['id']] = result[id];
			chrome.storage.sync.set(data, function() {
			    if (chrome.runtime.error) {
			      	console.log("Runtime error.");
			    }
				chrome.storage.sync.get(user['id'], function(result) {
			      	console.log("final - ");
			      	console.log(JSON.stringify(result));
				});
			});
		});
	}
	else if(carURL.test(document.location.href)) {
		console.log("car emoticon click");
		var feeling = $(this).attr("id");
		console.log(feeling);

		var target = $(this).parents().eq(3);
		console.log(target);
		var row = target.find("td:nth-child(2)");
		var company = row.text();
		console.log(company);
		var category = row.next().text();
		console.log(category);
		var ac = row.nextAll().eq(1).text();
		console.log(ac);
		var price = row.nextAll().eq(2).text();
		console.log(price);
		var currency = row.nextAll().eq(3).text();
		console.log(currency);	
		var postData = {};
		if(ac === "true")
			postData["name"] = company + " " + category + " AC";
		else
			postData["name"] = company + " " + category + " Non-AC";
		postData["price"] = price;
		postData["feeling"] = feeling;
		postData["endpoint"] = "car";
		console.log(postData);
		console.log("user - " + JSON.stringify(user));
		console.log("id-" + user['id']);
		var id = user['id'];
		chrome.storage.sync.get(id, function (result) {
			console.log("sync get user trail - " + JSON.stringify(result));
			if (result[id] === null || result[id] === undefined) {
				result[id] = {};
				console.log("initializing user trail");
			}
			console.log("result length - " + result[id].length);
			console.log(result[id]);
			result[id]['car'].push(postData);
			console.log("after adding car - " + JSON.stringify(result[id]));
			var data = {};
			data[user['id']] = result[id];
			chrome.storage.sync.set(data, function() {
			    if (chrome.runtime.error) {
			      	console.log("Runtime error.");
			    }
				chrome.storage.sync.get(user['id'], function(result) {
			      	console.log("final - ");
			      	console.log(JSON.stringify(result));
				});
			});
		});
	}
	else if(viatorURL.test(document.location.href)) {
		if($("div.line.page-bg.mbl div.unit.size1of3").length > 0) {
			console.log("viator 3 boxes emoticon click");
			var feeling = $(this).attr("id");
			console.log(feeling);
			var target = $(this).parents().eq(2);
			console.log(target);
			var title = target.find('.product-title').text();
			console.log("title - " + title);
			var price = target.parent().find('.price-amount').text();
			console.log("price - " + price);

			var postData = {};
			postData["name"] = title;
			postData["price"] = price;
			postData["feeling"] = feeling;
			postData["endpoint"] = "viator";
			console.log(postData);
			console.log("user - " + JSON.stringify(user));
			console.log("id-" + user['id']);
			var id = user['id'];
			chrome.storage.sync.get(id, function (result) {
				console.log("sync get user trail - " + JSON.stringify(result));
				if (result[id] === null || result[id] === undefined) {
					result[id] = {};
					console.log("initializing user trail");
				}
				console.log("result length - " + result[id].length);
				console.log(result[id]);
				result[id]['attraction'].push(postData);
				console.log("after adding attraction - " + JSON.stringify(result[id]));
				var data = {};
				data[user['id']] = result[id];
				chrome.storage.sync.set(data, function() {
				    if (chrome.runtime.error) {
				      	console.log("Runtime error.");
				    }
					chrome.storage.sync.get(user['id'], function(result) {
				      	console.log("final - ");
				      	console.log(JSON.stringify(result));
					});
				});
			});
		}
		else if($("#productList div.media.product-summary").length > 0) {
			console.log("viator 1 by 1 emoticon click");
			var feeling = $(this).attr("id");
			console.log(feeling);
			var target = $(this).parents().eq(3);
			console.log(target);
			var title = target.find('.product-title').text();
			console.log("title - " + title);
			var price = target.find('.price-amount').text();
			console.log("price - " + price);

			var postData = {};
			postData["name"] = title;
			postData["price"] = price;
			postData["feeling"] = feeling;
			postData["endpoint"] = "viator";
			console.log(postData);
			console.log("user - " + JSON.stringify(user));
			console.log("id-" + user['id']);
			var id = user['id'];
			chrome.storage.sync.get(id, function (result) {
				console.log("sync get user trail - " + JSON.stringify(result));
				if (result[id] === null || result[id] === undefined) {
					result[id] = {};
					console.log("initializing user trail");
				}
				console.log("result length - " + result[id].length);
				console.log(result[id]);
				result[id]['attraction'].push(postData);
				console.log("after adding attraction - " + JSON.stringify(result[id]));
				var data = {};
				data[user['id']] = result[id];
				chrome.storage.sync.set(data, function() {
				    if (chrome.runtime.error) {
				      	console.log("Runtime error.");
				    }
					chrome.storage.sync.get(user['id'], function(result) {
				      	console.log("final - ");
				      	console.log(JSON.stringify(result));
					});
				});
			});

		}
	}

});
/*$(function(){ // this could be done faster with the livequery() plugin for jquery
	alert(1);
elt = document.createElement('iframe');
elt.id = 'facebook_load_frame';
elt.src = 'https://localhost:3001/iframe.html';
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
