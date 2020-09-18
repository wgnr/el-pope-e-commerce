// https://material-ui.com/components/badges/
import React from 'react';
// Material UI
import {
  Badge,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// Router
import { useHistory } from 'react-router-dom';
// Context
import { useCart } from '../../contexts/CartContext'

const StyledBadge = withStyles(theme => ({
  badge: {
    border: `2px solid white`,
    padding: '0 4px',
    right: -6,
  },
}))(Badge);

const CartIcon = ({ cartColor = "#000" }) => {
  const { totalItems } = useCart();
  const history = useHistory();

  const handlerGoToCart = () => history.push("/cart");

  return (
    <IconButton
      onClick={handlerGoToCart}
      aria-label="cart"
    >
      <StyledBadge
        badgeContent={totalItems}
        color="primary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ShoppingCartIcon htmlColor={cartColor} />
      </StyledBadge>
    </IconButton>
  );
};

export default CartIcon;