module.exports = function (context, req) {
    var ratings = context.bindings.ratings;
    
    if (ratings) {        
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: ratings
        };
    }
    else {
        context.res = {
            status: 404
        };
    }
    context.done();
};