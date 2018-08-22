module.exports = function (context, req) {
    var rating = context.bindings.rating;

    if (rating) {
        var ratingSanitized = {
            id: rating.id,
            userId: rating.userId,
            productId: rating.productId,
            timestamp: rating.timestamp,
            locationName: rating.locationName,
            rating: rating.rating,
            userNotes: rating.userNotes
        };
        
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: ratingSanitized
        };
    }
    else {
        context.res = {
            status: 404
        };
    }
    context.done();
};