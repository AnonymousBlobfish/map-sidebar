const Faker = require('faker');
const fs = require('fs');

Faker.seed(123);

let genData = (id) => {
  let data = {};
  let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  data.id = id;
  data.name = Faker.company.companyName();
  data.formatted_address = `${Faker.address.streetAddress()}, ${Faker.address.city()}, ${Faker.address.stateAbbr()} ${Faker.address.zipCode()}, USA`;
  data.international_phone_number = Faker.phone.phoneNumberFormat(2);
  data.website = `http://www.${data.name.split(' ').join('').split(',').join('').split('\'').join('')}.com`;
  data.url = data.website;
  data.opening_hours = {};
  data.opening_hours.open_now = true;
  data.opening_hours.periods = [];
  data.opening_hours.weekday_text = [];
  for (let i = 0; i < 7; i++) {
    data.opening_hours.periods.push({
      open: {
        day: i,
        time: `${Math.floor(Math.random() * 10) + 1}00`
      },
      close: {
        day: i,
        time: `${Math.floor(Math.random() * 10) + 1}00`
      }
    });
    let openTime = parseInt(data.opening_hours.periods[i].open.time.substring(0, 1));
    let closeTime = parseInt(data.opening_hours.periods[i].close.time.substring(0, 1));
    data.opening_hours.weekday_text.push(`${weekdays[i]}: ${openTime}:00 AM - ${closeTime}:00 PM`);
  }
  data.geometry = {};
  data.geometry.location = {};
  data.geometry.location.lat = Faker.address.latitude();
  data.geometry.location.lng = Faker.address.longitude();
  var hours = data.opening_hours.periods[0].open.time +"^" + data.opening_hours.periods[0].close.time +"~" + data.opening_hours.periods[1].open.time +"^" + data.opening_hours.periods[1].close.time +"~" + data.opening_hours.periods[2].open.time +"^" + data.opening_hours.periods[2].close.time +"~" + data.opening_hours.periods[3].open.time +"^" + data.opening_hours.periods[3].close.time +"~" + data.opening_hours.periods[4].open.time +"^" + data.opening_hours.periods[4].close.time +"~" + data.opening_hours.periods[5].open.time +"^" + data.opening_hours.periods[5].close.time +"~" + data.opening_hours.periods[6].open.time +"^" + data.opening_hours.periods[6].close.time;
  return hours + ',' + data.geometry.location.lat + ',' + data.geometry.location.lng + '/n';
};

var writer = fs.createWriteStream('addressGeometry.csv');

let genBulkData = (n) => {
      var flag = true;
      console.log('N = ', n);
      while (n <= 10000000 && flag) {
        try {
            if (n === 1) {
              flag = writer.write(genData(n));
              n++;
            } else if (n === 10000000) {
              flag = writer.write(genData(n));
              writer.end();
              n++;
            } else {
              flag = writer.write(genData(n));
              n++;
            }
        } catch (err) {
          console.log('Error: ', err);
        }
      }
      writer.once('drain', () => {
        genBulkData(n);
      });
  };

genBulkData(1);