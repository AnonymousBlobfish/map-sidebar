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
  data.opening_hours = JSON.stringify(data.opening_hours);
  data.geometry = {};
  data.geometry.location = {};
  data.geometry.location.lat = Faker.address.latitude();
  data.geometry.location.lng = Faker.address.longitude();
  data.geometry = JSON.stringify(data.geometry);
  return data;
};

let genBulkData = (startIdx) => {
  if (startIdx >= 10000000) {
    return;
  } else {
      var writer = fs.createWriteStream('addressData' + startIdx + '.json');
      var start = Date.now();
      for (let i = startIdx; i < startIdx + 1000000; i++) {
        try {
          console.log(i);
          if (i === startIdx) {
            writer.write('[' + JSON.stringify(genData(i)) + ',');
          } else if (i === startIdx + 999999) {
            var elapsed = Date.now() - start;
            console.log('seconds elapsed = ', Math.floor(elapsed/1000));
            writer.write(JSON.stringify(genData(i)) + ']', 'utf8', setTimeout(genBulkData.bind(this, startIdx + 1000000), 120000));
            writer.end();
          } else {
            writer.write(JSON.stringify(genData(i)) + ',');
          }
        } catch (err) {
          console.log('Error: ', err);
        }
      }
    }
};

genBulkData(1);



