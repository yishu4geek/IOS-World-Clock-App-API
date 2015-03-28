module.exports = function (app, express) {

    var router = express.Router(),
        cities = require('./cities'),
        City = require('../models/city');
//        wines = require('./wines')(db),
//        users = require('./users')(db);

// Middleware Uses Using middleware like this can be very powerful.
// We can do validations to make sure that everything coming from a request is safe and sound.
// We can throw errors here in case something is wrong.
// We can do some extra logging for analytics or any statistics we’d like to keep. There are many possibilities here. Go wild.
// middleware to use for all requests
    router.use(function (req, res, next) {
        // do logging
        res.header("Access-Control-Allow-Origin", "*");
        //res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        next(); // make sure we go to the next routes and don't stop here
    });

    router.get('/', function (req, res) {
        res.jsonp({message: "Hellow, welcome to our api"});
    });

// City
//router.get('/cities',cities.findAll);'
    router.route('/cities')
        .get(function (req, res) {
            City.find(function (err, cities) {
                if (err) res.send(err);

                res.jsonp(cities);

            })
        })
        .post(function (req, res) {
            var city = new City();
            city.id = req.body.id;
            city.cityName = req.body.cityName;
            city.timezoneName = req.body.timezoneName;
            city.timezoneOffset = req.body.timezoneOffset;
            console.log(city.cityName);
            console.log(city.timezoneName);
            console.log(city.timezoneOffset);
            //check duplicate
            City.findOne({'id': city.id}, function (err, ct) {
                if (err) res.send(err)
                console.log("findcity!!!!: " + ct);
                if (ct) {
                    res.send("Duplicate City")

                } else {
                    console.log("save city")
                    city.save(function (err) {
                        if (err) res.send(err);

                        res.jsonp({message: 'City created!'});
                    })
                }
            })

        })
        .put(function (req, res) {
            console.log("delete id: " + req.body.id);
            City.remove({

                id: req.body.id
            }, function (err, city) {
                if (err)
                    res.send(err);

                res.jsonp({message: 'Successfully deleted'});
            })
        })



//++++++ add 'api' to the URL after hostname
    app.use('/api', router);
}

