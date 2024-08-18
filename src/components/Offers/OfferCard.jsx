import React from 'react'
import './offers.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function OfferCard({item}) {
    // console.log(item);
  return (
    <div className='offer-card'>
        <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={item.heroUrl}
          alt="green iguana"
        />
        <CardContent sx={{ width: 500 }}>
          <Typography gutterBottom variant="h6" component="div">
            {item.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.pTl}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {item.pTx}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {item.ctaText}
        </Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default OfferCard  