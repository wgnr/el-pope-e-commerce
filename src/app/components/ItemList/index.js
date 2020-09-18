import React from 'react';
// Material UI
import {
  Grid,
} from '@material-ui/core'
// Components
import Item from '../Item';

const ItemList = ({ items, onAdd }) => {

  return (
    <Grid container item spacing={3} alignItems="baseline">
      {items.map(item =>
        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Item max={item.stock} price={item.price} onAdd={onAdd} item={item} />
        </Grid>
      )}
    </Grid>
  );
};

export default ItemList;