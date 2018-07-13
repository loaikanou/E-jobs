const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const handlebars = require('express-handlebars');
const geoip = require('geoip-lite');
// const ip = require('ip');

app.engine('.hbs', handlebars({ extname: '.hbs' }));

app.set("PORT", PORT);

app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render("index", {title:"E-jobs Application"});
});

app.get('/search', function (req, res) {
    // console.log(req);
    queries = req.query;
//     var ipAddress = ip.address();
// console.log(ipAddress);

    var geo = geoip.lookup('46.152.124.22');
// console.log(geo);

    var url = `https://indreed.herokuapp.com`;
    if (geo.country)
        var url = `https://indreed.herokuapp.com/api/jobs?country=${geo.country}`;

    if (queries){
        axios.get(url, {
        params: queries
    })
    .then(function(response){
        res.render("search", { title: "E-jobs Application", jobs: response.data, countryCode: geo.country});

    })
    .catch(function(error) {
        console.log(error);
    });
    }
    else {
        res.render("search", {title: "E-jobs Application"})
    }

});

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT') + '; press Ctrl-C to terminate.');
});
