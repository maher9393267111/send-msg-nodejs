var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var TeleSignSDK = require('telesignsdk');
//var request = require("request")



var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const httpport = 8000

// Setup Port to Use for Server Communication
server.listen(httpport);



// When displaying index.html, join path.  Basically, look for index.html under public_html/public.
app.use(express.static(path.join(__dirname + '/public')));

//app.use(app.router);



app.get('/', function (req, res) {
    return res.send('hellllpo');
   
});

app.post('/ip', function (req, res) {

    const customerId = "F7360CC9-11EC-40AA-A0AF-3AC4DB587040"; // Todo: find in portal.telesign.com
    const apiKey = "F7360CC9-11EC-40AA-A0AF-3AC4DB587040"; // Todo: find in portal.telesign.com
    const rest_endpoint = "https://rest-api.telesign.com"; // Todo: Enterprise customer, change this!
    const timeout = 10 * 1000; // 10 secs



    const client = new TeleSignSDK(customerId,
        apiKey,
        rest_endpoint,
        timeout // optional
        // userAgent
    );


    const phoneNumber = "905378272857";
    const message = 'hello maherrrrr';
    const messageType = "ARN";


    console.log("## MessagingClient.message ##");

    function messageCallback(error, responseBody) {
        if (error === null) {
            console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
                ` => code: ${responseBody['status']['code']}` +
                `, description: ${responseBody['status']['description']}`);
        } else {
            console.error("Unable to send message. " + error);
        }
    }

    client.sms.message(messageCallback, phoneNumber, message, messageType);
    return res.status(200).send("sms sent successfully");



   // return res.send('hellllpo');
});



//https://my.telesign.com/account/421259/product/sms