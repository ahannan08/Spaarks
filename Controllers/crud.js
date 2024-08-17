// controllers/restaurantController.js
import Restaurant from '../Models/Restaurant.js';

// Create a new restaurant
export const createRestaurant = async (req, res) => {
  const { name, description, location, rating } = req.body;

  try {
    const restaurant = new Restaurant({
      name,
      description,
      address: {
        coord: [location.longitude, location.latitude]
      },
      grades: [{ score: rating }]
    });

    await restaurant.save();
    res.status(201).json({message: 'Restaurant is created'});
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: 'Error creating restaurant', error: error.message });
  }
};

// Update a restaurant
export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, description, location, rating } = req.body;

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
          address: {
           
            coord: [location.longitude, location.latitude]
          },
          grades: [{ score: rating }]
        }
      },
      { new: true } // Return the updated document
    );

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: 'Error updating restaurant', error: error.message });
  }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error('Error retrieving restaurants:', error);
    res.status(500).json({ message: 'Error retrieving restaurants', error: error.message });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: 'Error deleting restaurant', error: error.message });
  }
};
