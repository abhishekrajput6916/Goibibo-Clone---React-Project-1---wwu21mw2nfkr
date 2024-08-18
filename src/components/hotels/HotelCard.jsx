import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Star, Pool, Spa, LocalOffer, People, LocationOn } from '@mui/icons-material';
import './hotels.css';

// {
//   "childAndExtraBedPolicy": {
//       "extraBedProvidedForChild": false,
//       "extraBedForAdditionalGuest": false,
//       "extraBedCharge": 1579,
//       "additionalInfo": "Additional charges may apply"
//   },
//   "_id": "6527dc50de44dd75f5271d99",
//   "name": "Radisson Blu",
//   "location": "Mumbai, Maharashtra",
//   "rating": 3.5,
//   "amenities": [
//       "Swimming Pool",
//       "Free WiFi"
//   ],
//   "images": [
//       "https://unsplash.com/photos/Cj7a21nHLyo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NjZ8fGhvdGVsfGVufDB8fHx8MTY5NzA4ODA4NXww",
//       "https://unsplash.com/photos/UPv0s6izv2Y/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjUxfHxob3RlbHxlbnwwfHx8fDE2OTcwODExODV8MA",
//       "https://unsplash.com/photos/ej52Nm_-RUA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTE5fHxob3RlbHxlbnwwfHx8fDE2OTcwOTE0OTJ8MA",
//       "https://unsplash.com/photos/w1gguH6xRUc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjQwfHxob3RlbHxlbnwwfHx8fDE2OTcxMDMzMTN8MA"
//   ],
//   "rooms": [
//       {
//           "costDetails": {
//               "baseCost": 3836,
//               "taxesAndFees": 409,
//               "discount": 0
//           },
//           "roomNumber": 1,
//           "roomType": "Suite",
//           "costPerNight": 5156,
//           "roomSize": 350,
//           "bedDetail": "2 Twin Beds",
//           "price": 2734,
//           "cancellationPolicy": "Free Cancellation till 24 hrs before check in",
//           "meals": [],
//           "offers": [],
//           "_id": "6527dc50de44dd75f5271d9a"
//       },
//       {
//           "costDetails": {
//               "baseCost": 2143,
//               "taxesAndFees": 211,
//               "discount": 0
//           },
//           "roomNumber": 2,
//           "roomType": "Deluxe",
//           "costPerNight": 3474,
//           "roomSize": 300,
//           "bedDetail": "2 Twin Beds",
//           "price": 3112,
//           "cancellationPolicy": "Free Cancellation till 24 hrs before check in",
//           "meals": [],
//           "offers": [],
//           "_id": "6527dc50de44dd75f5271d9b"
//       },
//       {
//           "costDetails": {
//               "baseCost": 2226,
//               "taxesAndFees": 129,
//               "discount": 0
//           },
//           "roomNumber": 3,
//           "roomType": "Double",
//           "costPerNight": 2082,
//           "roomSize": 300,
//           "bedDetail": "1 Queen Bed",
//           "price": 7647,
//           "cancellationPolicy": "Free Cancellation till 24 hrs before check in",
//           "meals": [],
//           "offers": [],
//           "_id": "6527dc50de44dd75f5271d9c"
//       },
//       {
//           "costDetails": {
//               "baseCost": 3324,
//               "taxesAndFees": 116,
//               "discount": 0
//           },
//           "roomNumber": 4,
//           "roomType": "Single",
//           "costPerNight": 4450,
//           "roomSize": 300,
//           "bedDetail": "1 Queen Bed",
//           "price": 6629,
//           "cancellationPolicy": "Free Cancellation till 24 hrs before check in",
//           "meals": [],
//           "offers": [],
//           "_id": "6527dc50de44dd75f5271d9d"
//       },
//       {
//           "costDetails": {
//               "baseCost": 1972,
//               "taxesAndFees": 396,
//               "discount": 0
//           },
//           "roomNumber": 5,
//           "roomType": "Suite",
//           "costPerNight": 5542,
//           "roomSize": 300,
//           "bedDetail": "1 Queen Bed",
//           "price": 5208,
//           "cancellationPolicy": "Free Cancellation till 24 hrs before check in",
//           "meals": [],
//           "offers": [],
//           "_id": "6527dc50de44dd75f5271d9e"
//       },
//       {
//           "costDetails": {
//               "baseCost": 7771,
//               "taxesAndFees": 336,
//               "discount": 0
//           },
//           "roomNumber": 6,
//           "roomType": "Suite",
//           "costPerNight": 9819,
//           "roomSize": 250,
//           "bedDetail": "1 Queen Bed",
//           "price": 7846,
//           "cancellationPolicy": "Free Cancellation till 24 hrs before check in",
//           "meals": [],
//           "offers": [],
//           "_id": "6527dc50de44dd75f5271d9f"
//       },
//       {
//           "costDetails": {
//               "baseCost": 7009,
//               "taxesAndFees": 237,
//               "discount": 0
//           },
//           "roomNumber": 7,
//           "roomType": "Double",
//           "costPerNight": 3427,
//           "roomSize": 250,
//           "bedDetail": "2 Twin Beds",
//           "price": 5074,
//           "cancellationPolicy": "Free Cancellation till 24 hrs before check in",
//           "meals": [],
//           "offers": [],
//           "_id": "6527dc50de44dd75f5271da0"
//       },
//       {
//           "costDetails": {
//               "baseCost": 3640,
//               "taxesAndFees": 246,
//               "discount": 0
//           },
//           "roomNumber": 8,
//           "roomType": "Deluxe",
//           "costPerNight": 7878,
//           "roomSize": 250,
//           "bedDetail": "1 Queen Bed",
//           "price": 4199,
//           "cancellationPolicy": "Free Cancellation till 24 hrs before check in",
//           "meals": [],
//           "offers": [],
//           "_id": "6527dc50de44dd75f5271da1"
//       },
//       {
//           "costDetails": {
//               "baseCost": 1644,
//               "taxesAndFees": 291,
//               "discount": 0
//           },
//           "roomNumber": 9,
//           "roomType": "Single",
//           "costPerNight": 9878,
//           "roomSize": 350,
//           "bedDetail": "2 Twin Beds",
//           "price": 5295,
//           "cancellationPolicy": "Free Cancellation till 24 hrs before check in",
//           "meals": [],
//           "offers": [],
//           "_id": "6527dc50de44dd75f5271da2"
//       }
//   ],
//   "houseRules": {
//       "restrictions": {
//           "idProofsAccepted": [
//               "Passport",
//               "Aadhar"
//           ],
//           "petsAllowed": false,
//           "smokingAllowed": true
//       },
//       "guestProfile": {
//           "unmarriedCouplesAllowed": true
//       },
//       "idProofRelated": {
//           "idProofsAccepted": [
//               "Passport"
//           ],
//           "localIdsAllowed": false
//       },
//       "_id": "6527dc50de44dd75f5271da3"
//   },
//   "__v": 0,
//   "avgCostPerNight": 5745.111111111111
// }

const HotelCard = ({hotel}) => {
  return (
    <Box className="hotelCard">
      <div className="hotel-card-hotelImage">
        <img src={hotel.images[0]} alt="Hotel" className="hotelImage-main" />
        <div className='hotel-images' style={{ display: 'flex', marginTop: '8px', width:'fit-content' }}>
          {hotel.images.map((image)=>{
            return <img src={image} alt="Thumbnail" className="hotelImage-sub" />
          })}
          <Button variant="outlined" style={{ marginLeft: '8px' }}>VIEW ALL</Button>
        </div>
      </div>

      <div className="hotel-card-details">
        <div className="hotel-card-rating">
          <div className="hotel-card-ratingStars">
            
            <Star style={{ color: 'gold' }} />
            <Star style={{ color: 'gold' }} />
            <Star style={{ color: 'gold' }} />
            <Star style={{ color: 'gold' }} />
            <Star style={{ color: 'gold' }} />
          </div>
          <Typography variant="subtitle2">HOTEL</Typography>
          <Typography variant="subtitle2" style={{ marginLeft: '8px' }}>{hotel.rating }/5 (2372 Verified Ratings)</Typography>
        </div>
        <Typography variant="h6">Lemon Tree Premier, Mumbai International Airport, Mumbai</Typography>
        <div className="hotel-card-location">
          <LocationOn />
          <Typography variant="body2">Near Mumbai Airport</Typography>
          <Typography variant="body2" style={{ marginLeft: '8px' }}>2.3 Km Drive To T2 - Chhatrapati Shivaji International Airport</Typography>
        </div>
        <div className="hotel-card-amenities">
          <Pool />
          <Typography variant="body2">Swimming Pool</Typography>
          <Spa style={{ marginLeft: '8px' }} />
          <Typography variant="body2">Spa</Typography>
          <People style={{ marginLeft: '8px' }} />
          <Typography variant="body2">Couple Friendly</Typography>
        </div>
        <Button variant="contained" color="primary" style={{ marginTop: '8px' }}>ELITE PACKAGE</Button>
        <Typography variant="body2" style={{ marginTop: '8px' }}>Enjoy exclusive benefits at a discounted price</Typography>
      </div>

      <div className="hotel-card-priceSection">
        <Typography className="hotel-card-dealEnds">Free Cancellation Till 29 Jun'24</Typography>
        <Typography className="hotel-card-originalPrice">₹5000</Typography>
        <Typography className="hotel-card-price">₹2940</Typography>
        <Typography variant="body2">+ ₹1395 TAXES & FEES</Typography>
        <Typography variant="body2">1 room per night</Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '8px' }}>Book @ ₹0</Button>
        <Button variant="outlined" color="secondary" style={{ marginTop: '8px' }}>Daily Steal Deal</Button>
      </div>
    </Box>
  );
};

export default HotelCard;
