const db = require('./db.js');

module.exports =  {
  districtsBySearch: (search, callback) => {
    return db.searchDistricts(search, callback);
  },
  allDistricts: (callback) => {
    return db.getAllDistricts(callback);
  },
  schoolsBySearch: (districtId, callback) => {
    return db.searchSchools(districtId, callback);
  },
  allSchools: (callback) => {
    return db.getAllSchools(callback);
  },
  districtsByState: (state, callback) => {
    return db.getDistrictsByState(state, callback);
  }
}
