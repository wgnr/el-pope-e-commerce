import React, { useState } from 'react';
// Material UI
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Context
import { useCart } from '../../contexts/CartContext';
// Routing
import { Link } from 'react-router-dom';
// Utils
import { createNewOrder } from '../../utils/firebase';
// Form control and validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
// Components
import TableCart from '../../components/TableCart'

// Checkout form schema
const CheckoutSchema = yup.object().shape({
  firstname: yup.string()
    .required('First name is required!'),
  lastname: yup.string()
    .required('Last name is required!'),
  phone: yup.string()
    .required('Phone is required!'),
  email: yup.string()
    .required('Email is required!')
    .email("Valid email must be used!"),
  repeatEmail: yup.string()
    .required('You must repeat the email!')
    .oneOf([yup.ref('email'), null], 'Emails are different!'),
});

const TAX_RATE = 0.21;

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(1, 0, 2),
    padding: theme.spacing(1)
  },
  actionBtns: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    padding: theme.spacing(1),
  },
  link: {
    textDecoration: 'inherit'
  },
  rootForm: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
  form: {
  },
  results: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1)
  }
}));

function subtotal(items) {
  return items
    .map(item => item.quantity * item.price)
    .reduce((acc, curr) => acc + curr, 0);
}


const Cart = () => {
  const [purchaseResult, setPurchaseResult] = useState(false);
  const { items: cartItems, removeFromCart, totalItems, clearCart } = useCart();

  const divRef = React.useRef(null);

  // Form validation
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(CheckoutSchema),
  });

  const onSubmit = async (data) => {
    const newOrder = {
      buyer: {
        name: `${data.lastname} ${data.firstname}`,
        phone: data.phone,
        email: data.email,
      },
      date: undefined, // Later update in Firebase
      status: "Generated",
      subtotal: invoiceSubtotal,
      taxRate: TAX_RATE,
      taxes: invoiceTaxes,
      total: invoiceTotal,
      items: cartItems.map(item => (
        {
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        }
      ))
    };
    const response = await createNewOrder(newOrder);

    if (response.success) clearCart();
    setPurchaseResult(
      response.success
        ?
        `Your order has been completed! Order ID: ${response.message}`
        :
        `Ooops! We couldn't process your order by the following errors:
        ${response.message}`
    )

    divRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const classes = useStyles();

  const invoiceSubtotal = subtotal(cartItems);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <Container maxWidth="md">
      <Typography
        component="h2"
        variant="h6"
        align="center"
      >{totalItems ? "Cart" : "Your cart is empty! Add nice products, "}
        {!totalItems ? <Link to="/" className={classes.link}>click here to buy!</Link> : null}
      </Typography>
      {
        totalItems ?
          <>
            <TableCart
              removeFromCart={removeFromCart}
              items={cartItems}
              footerMessage={"Delivery might take two business days."}
              invoiceSubtotal={invoiceSubtotal}
              taxRate={TAX_RATE}
              invoiceTaxes={invoiceTaxes}
              invoiceTotal={invoiceTotal}
            />
            <Paper elevation={3} className={classes.paper}>
              <form
                className={classes.rootForm}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <Typography
                  // className={classes.}
                  component="h2"
                  variant="h6"
                >Customer info
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      autoComplete="given-name"
                      fullWidth
                      id="firstname"
                      label="Firstname"
                      margin="normal"
                      name="firstname"
                      required
                      variant="outlined"
                      inputRef={register}
                      error={!!errors.firstname}
                      helperText={errors.firstname && errors.firstname.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      autoComplete="family-name"
                      id="lastname"
                      fullWidth
                      label="Lastname"
                      margin="normal"
                      name="lastname"
                      required
                      variant="outlined"
                      inputRef={register}
                      error={!!errors.lastname}
                      helperText={errors.lastname && errors.lastname.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      autoComplete="tel"
                      id="phone"
                      label="Phone"
                      margin="normal"
                      fullWidth
                      name="phone"
                      required
                      variant="outlined"
                      inputRef={register}
                      error={!!errors.phone}
                      helperText={errors.phone && errors.phone.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField
                      autoComplete="email"
                      id="email"
                      label="Email"
                      margin="normal"
                      fullWidth
                      name="email"
                      required
                      variant="outlined"
                      inputRef={register}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message :
                        "Enter your email twice!"}
                    />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField
                      id="repeatEmail"
                      label="Enter Email again"
                      margin="normal"
                      name="repeatEmail"
                      required
                      fullWidth
                      variant="outlined"
                      inputRef={register}
                      error={!!errors.repeatEmail}
                      helperText={errors.repeatEmail && errors.repeatEmail.message}
                    />
                  </Grid>
                </Grid>
                <Box className={classes.actionBtns}>
                  <Button
                    disabled={!formState.isValid}
                    type="submit"
                    variant="contained"
                  >CHECKOUT
                  </Button>
                </Box>
              </form>
            </Paper>
          </> : null
      }
      {purchaseResult ?
        <Paper className={classes.paper} elevation={3}>
          <Typography
            component="h2"
            variant="h6"
            align="center"
            style={{whiteSpace: "pre-line"}}
            ref={divRef}
          >{purchaseResult}
          </Typography>
        </Paper>
        : null}
    </Container>
  );
}

export default Cart;