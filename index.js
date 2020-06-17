var app = require('express')();
var srv = require('http').createServer(app);
var api = require('./api');

app.get('/api/districts', (req, res) => {
  if (req.query.search) {
    let search = req.query.search.replace('_', ' ');
    api.districtsBySearch(search, (err, districts) => err ? res.json(err) : res.json(districts));
  } else if (req.query.state) {
    let state = req.query.state;
    api.districtsByState(state, (err, districts) => err ? res.json(err) : res.json(districts));
  } else {
    api.allDistricts((err, districts) => err ? res.json(err) : res.json(districts));
  }
})

app.get('/api/schools', (req, res) => {
  if (!req.query.districtId) {
    api.allSchools((err, schools) => err ? res.json(err) : res.json(schools))
  } else {
    let {districtId} = req.query;
    api.schoolsBySearch(districtId, (err, schools) => err ? res.json(err) : res.json(schools));
  }
})

app.listen(3000, function () {
  console.log('Listening on 3000');
});