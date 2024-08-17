import express from 'express';
import { getNearbyRestaurants, getRestaurantsByDistanceRange } from '../Controllers/restaurantController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { createRestaurant, getAllRestaurants, deleteRestaurant,updateRestaurant } from '../Controllers/crud.js';

const router = express.Router();

router.post('/restaurants/nearby', authMiddleware, getNearbyRestaurants);
router.post('/restaurants/distance', authMiddleware, getRestaurantsByDistanceRange);

router.post('/restaurants', authMiddleware, createRestaurant); 
router.put('/restaurants/:id', authMiddleware, updateRestaurant); 
router.get('/restaurants', authMiddleware, getAllRestaurants); 
router.delete('/restaurants/:id', authMiddleware, deleteRestaurant); 

export default router;
