import React from 'react';
// Material UI
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 360,
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const TableCart = (props) => {
  const {
    disableActions = false, // true: show action button
    removeFromCart, // Handles action button onClick
    items,
    footerMessage,
    invoiceSubtotal,
    taxRate,
    invoiceTaxes,
    invoiceTotal,
  } = props;

  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={3} >
      <Table className={classes.table} aria-label="spanning table" size="small">
        <caption>{footerMessage}</caption>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={disableActions ? 3 : 4}>
              <Typography
                component="h2"
                variant="h6"
              >Item Deatil
              </Typography>
            </TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
          <TableRow>
            {disableActions ? null :
              <TableCell align="center" padding="checkbox">Remove</TableCell>}
            <TableCell>Title</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Sum &nbsp;$</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              {disableActions ? null :
                <TableCell align="center" component="th" scope="row">
                  <IconButton
                    onClick={() => removeFromCart(item.id)}
                    aria-label="remove item"
                    title="remove item"
                    size="small"
                  ><CancelIcon />
                  </IconButton>
                </TableCell>}
              <TableCell component="th" scope="row">{item.title}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="center">{ccyFormat(item.price)}</TableCell>
              <TableCell align="center">{ccyFormat(item.price * item.quantity)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            {disableActions ? null :
              <TableCell rowSpan={3} />}
            <TableCell rowSpan={3} />
            <TableCell align="center">Subtotal</TableCell>
            <TableCell />
            <TableCell align="center">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Tax</TableCell>
            <TableCell align="center">{`${(taxRate * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="center">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableCart;