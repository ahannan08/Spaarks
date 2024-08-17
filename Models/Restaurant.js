import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String }, 
  address: {
    
    coord: { type: [Number], required: true } // Coordinates for geospatial queries [longitude, latitude]
  },
  grades: [
    {
      score: Number // Score given in the grades
    }
  ]
});

// Create a 2dsphere index  to support geospatial queries
restaurantSchema.index({ 'address.coord': '2dsphere' });

// Create aRestaurant model with the above schema
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
