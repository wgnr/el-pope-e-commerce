import React, { useEffect, useState } from 'react';
// Material UI
import {
  Typography
} from '@material-ui/core';
// Components
import ItemList from '../../components/ItemList'
// Context
import { useLoading } from '../../contexts/LoadingContext'
// Routing
import { useParams } from 'react-router-dom';
// Utils
import {
  getCollection,
} from '../../utils/firebase';
// Queries
import {
  getItemsByCategory,
} from '../../queries'


const ItemListContainer = ({ onAdd }) => {
  const { id } = useParams();
  const [items, setItems] = useState(null);
  const [title, setTitle] = useState("Product List")
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);

    if (id) {
      getCollection("categories", {
        field: "key",
        comparator: "==",
        value: id
      })
        .then(response => {
          if (response.length === 1) setTitle(`${response[0].description} Products`);
        })
        .catch(err => {
          setTitle("Error");
          console.log(err);
        })
    }

    const searchItems = id ? getItemsByCategory(id) : getCollection("items")
    searchItems
      .then(itemsArr => {
        setItems(itemsArr)
      })
      .catch(e => {
        console.log(e);
        setItems([])
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [id]);

  let itemlist =
    items ?
      (
        items.length > 0 ?
          <ItemList items={items} onAdd={onAdd} /> :
          "There's no available prouduct in this category."
      )
      : "Loading list...";

  return <>
    <Typography
      component="h1"
      variant="h4"
      gutterBottom
    >{title}
    </Typography>
    {itemlist}
  </>
}

export default ItemListContainer;