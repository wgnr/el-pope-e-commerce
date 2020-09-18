import React, { useState } from 'react';
// Matarial UI
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// Router
import { Link } from 'react-router-dom';
// Components
import ItemCount from '../ItemCount';
// Context
import { useCart } from '../../contexts/CartContext';

const useStyles = makeStyles(theme => ({
  addToCart: {
    width: '100%'
  },
  cartIcon: {
    marginLeft: theme.spacing(1),
  },
  moreInfo: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'baseline',
    flexWrap: "wrap",
  },
  stock: {
    marginRight: theme.spacing(2),
  },
  tooltip: {
    fontSize: theme.typography.h6.fontSize,
  },
  // img: {
  //   // height:400,
  //   aspectRatio: 1
  //   // flex:1
  //   // paddingTop: '56.25%', // 16:9
  // }
}));

const Item = ({ initial = 0, min = 0, max = 10, price = 0, item }) => {
  const [quantity, setQuantity] = useState(initial);
  const { addToCart } = useCart();

  const { title, id, photo } = item;

  const classes = useStyles();

  const addToCartHandler = () => {
    setQuantity(0);
    addToCart({ ...item, quantity });
  };

  return (
    <Card variant="outlined">
      <Link to={`/items/${id}`}>
        <CardMedia
          image={photo}
          component="img"
          title={title}
          // className={classes.img}
        />
      </Link>
      <CardContent >
        <Tooltip title={title}
          enterDelay={700}
          classes={{ tooltip: classes.tooltip }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            gutterBottom
            noWrap
          >{title}
          </Typography>
        </Tooltip>
        <Box className={classes.moreInfo}>
          <Typography
            className={classes.stock}
            variant="subtitle2"
            color="textSecondary"
          >Stock: {max}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            gutterBottom
          >Price: {price}$
          </Typography>
        </Box>
        <ItemCount
          quantity={quantity}
          setQuantity={setQuantity}
          min={min}
          max={max}
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={addToCartHandler}
          disabled={quantity <= 0}
          className={classes.addToCart}
        >ADD TO CART
        <AddShoppingCartIcon className={classes.cartIcon} />
        </Button>
      </CardActions>
    </Card>
  );
}

export default Item;