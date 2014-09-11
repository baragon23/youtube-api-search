// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .



// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    console.log("onYouTubeApiLoad called successfully");
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyCwxiOWzN5SQpc4_85EiSTpAZxJFfMe9uE');
    console.log("set api key");
    //search();
}

function search() {
    var query = $('#user-query').val();
    console.log(query);
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: query
    });
    console.log("request sent");
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var yData = response;
    var imageURL, title, link;

    var responseString = JSON.stringify(response, '', 2);
    console.log("json stringified");
    
    document.getElementById('data').innerHTML += responseString;

    
    for (var i = 0; i < yData.items.length; i++) {
    	imageURL = yData.items[i].snippet.thumbnails.default.url;
    	title = yData.items[i].snippet.title;
    	link = yData.items[i].id.videoId;

    	$('#images').append('<li><img src=' + imageURL + '><p><a href="http://www.youtube.com/watch?v=' + link + '">' + title + '</a></p></li>');
    }
}
















