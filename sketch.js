
var accessToken;
var data;
var genre;
var slider;
var val = 0;

var api = 'https://api.spotify.com/v1/search?q='; // did this to help search by artist
var units = '&type=track';

var input;


function setup() {
  createCanvas(0, 0).parent("#canvas-holder");


  // Right when we set up the canvas, we fire off a request to get an access token
  getAccessToken(function(incoming) {
    // When it comes back (as the variable 'incoming'), we save it to our variable 'accessToken'.
    accessToken = incoming;
  });



  var button = select('#submit');
  button.mousePressed(searchArtist);

  input = select('#artist');

}


function searchArtist() {


  var url = api + input.value() + units;
  getAPIData(accessToken, url, function(searchResults) { // function is callback
    // When we get a response back, log it to the console...
    console.log(searchResults);
    // save it into `data`...
    data = searchResults;

    // and make an embed...
    select("#iframe-holder").html('<iframe src="https://open.spotify.com/embed/track/' + data.tracks.items[0].id + '' +
        '" width="600" height="380" frameborder="100" allowtransparency="true" allow="encrypted-media"></iframe>');
  });
}




function draw() {

  if (data) {
    //text(JSON.stringify(data), 10, 10);
    //
  }


}


// OAuth nonsense follows:

function getAPIData(accessToken, url, callback) {
  if (!accessToken) {
    print("Access Token :  " + accessToken);
    throw "Can't do an API call without an access token!";
  }
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Authorization", "Bearer " + accessToken);
  request.addEventListener("load", function() {
    callback(JSON.parse(this.responseText));
  });
  request.send();
}

// Access token is a temporary password we get, using our permanent password
function getAccessToken(callback) {
  var url = "https://accounts.spotify.com/api/token";
  // XMLHttpRequest is a way of doing a very customizable API call
  // You almost never need it
  var request = new XMLHttpRequest();
  request.open("POST", url, true);
  // The line below has our permanent password
  request.setRequestHeader("Authorization", "Basic OTliYWE2Y2Q0Y2M3NDAyNjk4ZGFiZmU3OGExZjIxZGI6YmMxMjNkYmI4Zjc3NGI4ZGE5ZjY3ODFkZDA5YzYyYmU=");
  request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  request.addEventListener("load", function() {
    callback(JSON.parse(this.responseText).access_token);
  });
  request.send("grant_type=client_credentials");
}