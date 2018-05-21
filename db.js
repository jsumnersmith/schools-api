const level = require('level');
const db = level('./data/db');

module.exports = {
  addDistrict: (district, callback) => {
    let {leaId} = district;
    let key = 'district-' + String(leaId)
    return db.put(key, JSON.stringify(district), (err) => {
      if (err) return callback(err, null);
      return callback(null, null);
    })
  },

  addSchool: (school, callback) => {
    let {schoolId} = school;
    let key = 'school-' + String(schoolId)
    return db.put(key, JSON.stringify(school), (err) => {
      if (err) return callback(err, null);
      return callback(null, null);
    })
  },

  searchDistricts: (search, callback) => {
  let matches = [];
  db.createReadStream()
    .on('data', (data) =>{
      let district = JSON.parse(data.value);
      console.log(search)
      if (district.name.match(new RegExp(search, 'ig'))) {
        matches.push(district);
      }
    })
    .on('error', (err)=>{
      return callback(err, null);
    })
    .on('close', ()=>{
      console.log('DB read stream closed.');
    })
    .on('end', ()=>{
      console.log('DB read stream ended.');
      console.log(matches)
      return callback(null, matches);
    })
  },

  getAllDistricts: (callback) => {
    let matches = [];
    db.createReadStream()
      .on('data', (data) =>{
        if (data.key.match('district-')) {
          matches.push(JSON.parse(data.value));
        }
      })
      .on('error', (err)=>{
        return callback(err, null);
      })
      .on('close', ()=>{
        console.log('DB read stream closed.');
      })
      .on('end', ()=>{
        console.log('DB read stream ended.');
        return callback(null, matches);
      })
  },

  getDistrictsByState: (state, callback) => {
    let matches = [];
    db.createReadStream()
    .on('data', (data) =>{
      let value = JSON.parse(data.value);
      if (value.type === 'district' && value.state === state.toUpperCase()) {
        matches.push(value);
      }
    })
    .on('error', (err)=>{
      return callback(err, null);
    })
    .on('close', ()=>{
      console.log('DB read stream closed.');
    })
    .on('end', ()=>{
      console.log('DB read stream ended.');
      return callback(null, matches);
    })
  },

  getSchools: (districtId, callback) => {
    let matches = [];
    db.createReadStream()
      .on('data', (data) =>{
        let value = JSON.parse(data.value);
        if (value.type === 'school' && Number(value.districtId) === Number(districtId)) {
          matches.push(value);
        }
      })
      .on('error', (err)=>{
        return callback(err, null);
      })
      .on('close', ()=>{
        console.log('DB read stream closed.');
      })
      .on('end', ()=>{
        console.log('DB read stream ended.');
        return callback(null, matches);
      })
  },

  getAllSchools: (callback) => {
    let matches = [];
    db.createReadStream()
      .on('data', (data) =>{
        if (data.key.match('school-')) {
          matches.push(JSON.parse(data.value));
        }
      })
      .on('error', (err)=>{
        return callback(err, null);
      })
      .on('close', ()=>{
        console.log('DB read stream closed.');
      })
      .on('end', ()=>{
        console.log('DB read stream ended.');
        return callback(null, matches);
      })
  },

  emptyAll: (callback) => {
    let toDelete = []
    db.createReadStream()
    .on('data', (data) =>{
      toDelete.push({type: 'del', key: data.key});
    })
    .on('error', (err)=>{
      return callback(err, null);
    })
    .on('close', ()=>{
      console.log('DB read stream closed.');
    })
    .on('end', ()=>{
      console.log('DB read stream ended.');
      db.batch(toDelete, (err) => {
        if (err) return callback(err);
        return callback(null);
      })
    })
  }
}
