const db = require('../db.js');
const csv = require('csvtojson');

const districts = () => {
  csv({
    delimiter: "\t"
  })
  .fromFile('./data/districts.csv')
  .then((districts)=>{
      districts.forEach((district) =>
        db.addDistrict({
          type: 'district',
          name: district['LEA_NAME'],
          state: district['ST'],
          zip: district['MZIP'],
          leaId: district['LEAID']
        }, (err, empty) => {
          if(err) {console.log(err); } else {
            console.log('Successfully added', district['LEA_NAME']);
          }
        })
      );
  })
}

const schools = () => {
  csv({
    delimiter: "\t"
  })
  .fromFile('./data/schools.csv')
  .then((schools)=>{
    schools.forEach((school) => {
      db.addSchool({
        type: 'school',
        name: school['SCH_NAME'],
        state: school['ST'],
        zip: school['MZIP'],
        schoolId: school['SCHID'],
        districtId: school['LEAID']
      }, (err, empty) => {
        if(err) {console.log(err); } else {
          console.log('Successfully added', school['SCH_NAME']);
        }
      })
    })
  })
}

module.exports.empty = () => {
  db.emptyAll((err) => {
    if (err) console.error(err);
    console.log('Successfully Emptied DB.')
  })
}

module.exports.import = () => {
  districts();
  schools();
}

require('make-runnable');
