const City = require('../db/models/city');
const citiesList = require('../const/city');

(async () => {
  try {
    const listOfCities = []
    citiesList.forEach(el => {
      el.city.forEach(city => {
        listOfCities.push({state: el.state, city});
      });
    });

    await City.bulkCreate(listOfCities);
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
})();
