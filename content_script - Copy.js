
var myVar = setInterval(appendElement, 1000);
function appendElement(){ 
	console.log($("div.clearfix.listing_row").length);
	if($("div.clearfix.listing_row").length > 0){
		var toAppend = '<div class="container-fluid full-width"><div class="row-fluid btn-group col-md-12">';
		toAppend += '<button id="expensive" class="btn btn-danger col-md-3 emotion">Expensive</button>';
		toAppend += '<button id="cool" class="btn btn-primary col-md-3 emotion">Cool</button>';
		toAppend += '<button id="reasonable" class="btn btn-warning col-md-3 emotion">Value for Money</button>';
		toAppend += '<button id="favourite" class="btn btn-success col-md-3 emotion">Favourite</button>';
		toAppend += '</div></div></div>';
		$("div.clearfix.listing_row").after(toAppend);
		console.log("append done clearing interval");
		clearInterval(myVar);
		console.log("interval cleared");
	}
	console.log("after interval");
}


$(document).on("click", "button.emotion", function(){
	//alert("clicked - " + $(this).attr("id"));

	var feeling = $(this).attr("id");
	//console.log(feeling);

	var target = $(this).parent().parent().prev();
	//console.log(target);
	var airlineName = target.find(".airline_info_detls > span.logo_name").text();
	console.log("airline - " + airlineName);

	var departure = target.find("div.time_info_space");
	var departureData = departure.children();
	//console.log(departureData);
	var departureTime = departureData.first().text();
	//console.log("time - " + departureTime);
	var departFrom = departureData.first().next().text();
	//console.log("depart from - " + departFrom);

	var arrival = departure.next();
	var arrivalData = arrival.children();
	var arrivalTime = arrivalData.first().text();
	//console.log("arrival time - " + arrivalTime);
	var arrivalTo = arrivalData.first().next().text();
	//console.log("arrival to - " + arrivalTo);

	var durationData = arrival.next().children();
	var duration = durationData.first().text();
	var stopInfo = durationData.first().next().text();
	//console.log("duration - " + duration + ", stops - " + stopInfo);

	var price = target.find("div.price_sectn > p.price_info").text();
	//console.log("price - " + price);

	//Add data to storage and update in trails data
	var postData = {};
	postData["name"] = departFrom + ' to ' + arrivalTo;
	postData["departure"] = departFrom;
	postData["arrival"] = arrivalTo;
	postData["departuretime"] = departureTime;
	postData["arrivaltime"] = arrivalTime;
	postData["airline"] = airlineName;
	postData["duration"] = duration;
	postData["stops"] = stopInfo;
	postData["price"] = price;
	postData["feeling"] = feeling;
	//console.log(postData);

	chrome.storage.sync.get('trails', function (result) {
		if (result.trails === null || result.trails === undefined) {
			result.trails = [];
			console.log("initializing trails");
		}
		console.log("result length - " + result.trails.length);
		console.log(result.trails);

		//posting to loopback service
		var trailJSON = {};
		trailJSON["name"] = postData["name"] + " , " + stopInfo;
		trailJSON["departureCity"] = postData["departure"];
		trailJSON["arrivalCity"] = postData["arrival"];
		trailJSON["durationInDays"] = postData["duration"];
		trailJSON["numOfTravelers"] = 1;
		trailJSON["costPerPerson"] = price;
		trailJSON["totalcost"] = price;
		trailJSON["dayWisePlan"] = ["visit museum"];
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
		trailJSON["items"] = [{
			"type" : "air",
			"value" : airlineName,
			"datetime" : arrivalTime,
			"feeling" : feeling,
			"endpoint" : ""
		}];
		//console.log(trailJSON);
		$.ajax({
			type : "POST",
			url : "https://localhost:3001/api/Trails",
			data : trailJSON,
			success : function(response) {
				postData["id"] = response.id;
				console.log("post success - " + postData["id"]);
				result.trails.push(postData);
				console.log("Storage length after push - " + result.trails.length);
				console.log(postData);
				chrome.storage.sync.set({ 'trails' : result.trails }, function() {
				    if (chrome.runtime.error) {
				      	console.log("Runtime error.");
				    }
					/*chrome.storage.sync.get('trails', function(result) {
				      	console.log("final - ");
				      	console.log(result);
					});*/
				});
			},
			error : function(err) {
				console.log("post error");
			}
		});
	});
});
