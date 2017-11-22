// sample twitch data
var ids = [
	"ESL_SC2", 
	"OgamingSC2", 
	"cretetion", 
	"freecodecamp", 
	"storbeck", 
	"habathcx", 
	"RobotCaleb", 
	"noobs2ninjas"
];

for(var i = 0; i < ids.length; i++) {

	var streams = "https://wind-bow.gomix.me/twitch-api/streams/" + ids[i] + "?callback=?";
	var channels = "https://wind-bow.gomix.me/twitch-api/channels/" + ids[i] + "?callback=?"; 

	// make api request
	$.when(
		$.getJSON(streams),
		$.getJSON(channels)
	).done(function(json1, json2) {

		var status = json1[0];
		var data = json2[0];

		// console.log(status);
		// console.log(data);
		
		var offline = status.stream === null;

		var all = [];
		var onlineList = [];
		var offlineList = [];

		var off = '<a class="list-group-item list-group-item-action offline" href="' + 
			data.url + '"><img class="thumb" src="' + data.logo + '" alt="">' + data.display_name + '</a>';

		var on = '<a class="list-group-item list-group-item-action online" href="' + 
			data.url + '"><img class="thumb" src="' +
			data.logo + '" alt="">' + data.display_name + '</a>';
		
		if(offline) {

			all.push(off);
			offlineList.push(off);

		} else {

			all.push(on);
			onlineList.push(on);
		
		}
		
		$(function() {
			$("#nav-all .list-group").append(all);
			$("#nav-online .list-group").append(onlineList);
			$("#nav-offline .list-group").append(offlineList);
		});
	});
}
