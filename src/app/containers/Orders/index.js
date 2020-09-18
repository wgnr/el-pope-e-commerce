import React, { useEffect, useState } from 'react';
// Material UI
import {
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SearchIcon from '@material-ui/icons/Search';
// Components
import TableCart from '../../components/TableCart'
// Context
import { useLoading } from '../../contexts/LoadingContext'
// Routing
import { useParams } from 'react-router-dom';
// Utils
import { getDocument } from '../../utils/firebase';


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2)
  },
  avatarIcon: {
    fontSize: 60,
  },
  mainPaper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputPaper: {
    padding: theme.spacing(1),
    margin: theme.spacing(2, 0),
    width: 275,
    display: "flex",
    [theme.breakpoints.down(372)]: {
      width: 255,
    },
  },
  input: {
    flex: 1,
  },
}));

let orderSearched = "";

const Orders = () => {
  const [isSearchingOrder, setIsSearchingOrder] = useState(false);
  const [showOrderResult, setShowOrderResult] = useState(false);
  const { setIsLoading } = useLoading();
  const { id } = useParams();
  const [orderId, setOrderId] = useState(id || "");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) handleSubmit();
  }, [])

  const classes = useStyles();

  function handleInput(event) {
    setOrderId(event.target.value);
  }

  function handleOrderId(event) {
    if (event.key === "Enter") handleSubmit();
  }

  async function handleSubmit() {
    orderSearched = orderId;
    setIsLoading(true);
    setShowOrderResult(true)
    setIsSearchingOrder(true);

    const order = await getDocument("orders", orderId); // undefined if not found
    if (order) setOrder({
      items: order.items,
      footerMessage:
        `Your purchase was made on ${new Date(order.date.seconds * 1000).toLocaleString()}Hs.`,
      invoiceSubtotal: order.subtotal,
      taxRate: order.taxRate,
      invoiceTaxes: order.taxes,
      invoiceTotal: order.total,
    });

    setIsLoading(false);
    setIsSearchingOrder(false);
  }

  return <Grid container
    spacing={2}
    justify="center"
    className={classes.container}
    direction="column"
    alignItems="center"
  >
    <Grid item>
      <Paper className={classes.mainPaper} elevation={3}>
        <ReceiptIcon className={classes.avatarIcon} />
        <Typography
          component="h2"
          variant="h4"
        >MY ORDER
        </Typography>
        <Typography
          component="h3"
          variant="subtitle1"
          style={{textAlign:"center"}}
        >Search your order detail by entering your order ID given in your purchase!
        </Typography>
        <Paper variant="outlined" className={classes.inputPaper}>
          <InputBase
            autoFocus
            className={classes.input}
            placeholder="Insert your order ID"
            inputProps={{ 'aria-label': 'Insert your order ID' }}
            value={orderId}
            onInput={handleInput}
            onKeyPress={handleOrderId}
          />
          <IconButton
            onClick={handleSubmit}
            className={classes.iconButton}
            aria-label="search"
            disabled={orderId === ""}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Paper>
    </Grid>
    <Grid item>
      {showOrderResult
        ?
        isSearchingOrder
          ?
          "Loading ..."
          :
          order ?
            <TableCart
              disableActions={true}
              {...order}
            />
            :
            `Error: No order has been found with the ID ${orderSearched}`
        :
        null
      }
    </Grid>
  </Grid>

}

export default Orders;