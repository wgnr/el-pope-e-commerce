import React, { useEffect, useState } from 'react';
// Components
import ItemDetail from '../../components/ItemDetail'
// Context
import { useLoading } from '../../contexts/LoadingContext'
// Routing
import { useParams } from 'react-router-dom';
// Utils
import { getDocument } from '../../utils/firebase';

const ItemDetailContainer = ({  onAdd }) => {
  const [isSearchingItem, setIsSearchingItem] = useState(true);
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);

    getDocument("items", id)
      .then(item => {
        setIsSearchingItem(false);
        setItem(item);
      })
      .catch(e => {
        console.log(e);
        setItem()
      })
      .finally(f => {
        setIsLoading(false);
      });
  }, []);

  let itemDetail = isSearchingItem
    ?
    "Loading..."
    :
    item
      ?
      <ItemDetail item={item} onAdd={onAdd} />
      :
      `Product ID ${id} doesn't exist.`

  return <>{itemDetail}</>
}

export default ItemDetailContainer;