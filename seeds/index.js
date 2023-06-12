const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

main().catch(err => console.log("Connection error: ",err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log("Database connected")
}

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author : '6486e2082c3e2c64034bc762',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor magni, molestias beatae provident expedita quas exercitationem, maxime pariatur perferendis quod doloribus praesentium fugiat. Praesentium ipsam mollitia similique aspernatur accusamus nihil!',
            price,
            geometry: {
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000] .latitude
                ]
            },
            images : [
                {
                  url: 'https://res.cloudinary.com/doyuvkbt5/image/upload/v1686478720/YelpCamp/alex-fWD7KqlsCwE-unsplash_1_kd3az4.jpg',
                  filename: 'YelpCamp/alex-fWD7KqlsCwE-unsplash_1_kd3az4'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})