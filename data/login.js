/**
* This is an example of a basic node.js script that performs
* the Client Credentials oAuth2 flow to authenticate against
* the Spotify Accounts.
*
* For more information, read
* https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
*/

var request = require('request'); // "Request" library

var client_id = 'f2d49cd45a84478a807b6a9b398a427c'; // Your client id
var client_secret = '19d00258459647698333b045affafd1c'; // Your secret

// your application requests authorization
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

const url = 'https://api.spotify.com/v1/audio-features?ids='

request.post(authOptions, function(error, response, body) {
   console.log(body)
});