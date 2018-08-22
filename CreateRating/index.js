var request = require('request');
var uuid = require('uuid');

module.exports = function (context, req) {

    var getProductsUrl = "http://serverlessohproduct.trafficmanager.net/api/GetProduct";
    var getUserUrl = "http://serverlessohuser.trafficmanager.net/api/GetUser";

    // Configure the request
    var options = {
        url: getProductsUrl,
        method: 'GET',
        qs: {
            'productId': req.body.productId
        }
    };

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var options = {
                url: getUserUrl,
                method: 'GET',
                qs: {
                    'userId': req.body.userId
                }
            };

            request(options, function (error1, response1, body1) {
                if (!error1 && response1.statusCode == 200) {

                    var rating = {
                        id: uuid.v4(),
                        userId: req.body.userId,
                        productId: req.body.productId,
                        timestamp: new Date(),
                        locationName: req.body.locationName,
                        rating: 5,
                        userNotes: req.body.userNotes
                    };

                    context.res = {
                        statusCode: 200,
                        body: rating
                    };

                    context.done();
                }
                else {
                    context.res = {
                        statusCode: response1.statusCode
                    };

                    context.done();
                }
            });

        }
        else {
            context.res = {
                statusCode: response.statusCode
            };

            context.done();
        }
    });
};