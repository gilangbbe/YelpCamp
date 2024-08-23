const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const { coordinates } = require('@maptiler/client');

mongoose.connect('mongodb+srv://gilangbbe:acnologia269@atlascluster.ppephx2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66c7f1ce8f5493447c363df5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: "https://res.cloudinary.com/dd9k2olgu/image/upload/v1724386855/YelpCamp/yxrtofdhreurabrds6za.jpg",
                    filename: "YelpCamp/yxrtofdhreurabrds6za"
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})