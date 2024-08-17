import Restaurant from "../Models/Restaurant.js";

export const getNearbyRestaurants = async (req, res) => {
  // Extract latitude, longitude, and radius from the request body
  const { Latitude, Longitude, Radius } = req.body;

  try {
    // Query the database to find restaurants within the specified radius
    const restaurants = await Restaurant.aggregate([
      {
        // Use the $geoNear stage to find restaurants near the specified point
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [Longitude, Latitude] 
          },
          distanceField: "distance", 
          maxDistance: Radius, // Maximum distance (in meters) to search
          spherical: true 
        }
      },
      {
        // Use the $project stage to format the output
        $project: {
          _id: 0,
          name: 1, 
          description: 1, 
          location: {
            // Format the location field
            latitude: { $arrayElemAt: ['$address.coord', 1] }, // Extract latitude from the coordinates array
            longitude: { $arrayElemAt: ['$address.coord', 0] } // Extract longitude from the coordinates array
          },
          numberOfRatings: { $size: '$grades' }, // Count the number of ratings
          averageRating: { $avg: '$grades.score' } // Calculate the average rating from the scores
        }
      }
    ]);

   
    res.json(restaurants);
  } catch (error) {
    
    console.error('Error retrieving nearby restaurants:', error.message);
    res.status(500).json({ message: 'Error retrieving nearby restaurants', error: error.message });
  }
};


export const getRestaurantsByDistanceRange = async (req, res) => {
  // Extract latitude, longitude, minimum distance, and maximum distance from the request body
  const { Latitude, Longitude, minimumDistance, maximumDistance } = req.body;

  try {
    // Query the database to find restaurants within the specified distance range
    const restaurants = await Restaurant.aggregate([
      {
        // Use the $geoNear stage to find restaurants near the specified point
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [Longitude, Latitude] // Specify the point to search near
          },
          distanceField: "distance", // Field to store the distance from the point
          minDistance: minimumDistance, // Minimum distance (in meters) to start searching
          maxDistance: maximumDistance, // Maximum distance (in meters) to end searching
          spherical: true 
        }
      },
      {
        // Use the $project stage to format the output
        $project: {
          _id: 0, 
          name: 1,
          description: 1, 
          location: {
            // Format the location field
            latitude: { $arrayElemAt: ['$address.coord', 1] }, // Extract latitude from the coordinates array
            longitude: { $arrayElemAt: ['$address.coord', 0] } // Extract longitude from the coordinates array
          },
          averageRating: { $avg: '$grades.score' },
          numberOfRatings: { $size: '$grades' } 
        }
      }
    ]);

   
    res.json(restaurants);
  } catch (error) {
    // Log and send an error message if something goes wrong
    console.error('Error retrieving restaurants by distance range:', error);
    res.status(500).json({ message: 'Error retrieving restaurants by distance range', error });
  }
};
