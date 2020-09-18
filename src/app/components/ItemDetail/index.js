import React, { useState } from 'react';
// Matarial UI
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// Components
import ItemCount from '../ItemCount';
// Context
import { useCart } from '../../contexts/CartContext';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0, 2),
  },
  addToCart: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  cartIcon: {
    marginLeft: theme.spacing(1),
  },
  img: {
    width: '100%'
  },
}));

const ItemDetail = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();

  const classes = useStyles();

  const addToCartHandler = () => {
    setQuantity(0);
    addToCart({ ...item, quantity });
  };

  return (<>
    <Typography
      component="h2"
      variant="h4"
      color="textPrimary"
      gutterBottom
    >{item.title}
    </Typography>
    <Paper className={classes.paper} variant="outlined"   >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} md={4}>
          <img
            src={item.photo}
            className={classes.img}
            alt={item.title} />
        </Grid>
        <Grid container item sm
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h6"
              gutterBottom
            >Product Description
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
            >{item.description}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
            >{"Stock: " + item.stock}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
            >{"Price: $" + item.price}
            </Typography>
          </Grid>
          <Grid item xs
            container
            justify="center"
            alignItems="center"
          >
            <Box pt={1}>
              <ItemCount
                quantity={quantity}
                setQuantity={setQuantity}
                min={0}
                max={item.stock}
              />
              <Button
                variant="outlined"
                onClick={addToCartHandler}
                disabled={quantity <= 0}
                className={classes.addToCart}
              >ADD TO CART <AddShoppingCartIcon className={classes.cartIcon} />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </>
  );
};

export default ItemDetail;