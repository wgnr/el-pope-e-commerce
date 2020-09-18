import React from 'react';
// Router
import {
  Switch,
  Route,
} from 'react-router-dom';
// Containers
import Home from '../containers/Home'
import Cart from '../containers/Cart'
import Orders from '../containers/Orders'
// Components
import ItemListContainer from '../components/ItemListContainer';
import ItemDetailContainer from '../components/ItemDetailContainer';


function App() {

  return (
    <Switch>
      <Route path="/items/:id">
        <ItemDetailContainer />
      </Route>
      <Route path={["/categories/:id", "/categories", "/items"]}>
        <ItemListContainer />
      </Route>
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Route path={["/order/:id", "/order"]}>
        <Orders />
      </Route>
      <Route path="/">
        <Home greeting={`Welcome to "El Pope" E-Commerce!!`} />
        <ItemListContainer />
      </Route>
    </Switch>
  );
}

export default App;