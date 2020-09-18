import React from 'react';
// Material UI
import {
  IconButton,
  InputBase,
  Paper,
} from '@material-ui/core';
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  rootPaper: {
    padding: "2px 4px",
    display: "flex",
  },
  iconButton: {
    padding: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    textAlign: "center",
    align: "center",
    '& input': {
      textAlign: "center"
    },
    "Mui-disabled": {
      color: 'red'
    }
  },
}));

const ItemCount = ({ quantity, setQuantity, min, max }) => {
  const classes = useStyles();

  const modifyQuantity = value => {
    const newValue = quantity + value;
    if (newValue > max || newValue < min) return;

    setQuantity(newValue);
  };

  const addOne = () => modifyQuantity(1);

  const subtractOne = () => modifyQuantity(-1);

  return (
    <Paper
      className={classes.rootPaper}
      component="form"
      variant="outlined"
    >
      <IconButton
        className={classes.iconButton}
        aria-label="subtract one"
        onClick={subtractOne}
        disabled={quantity === min}
      >
        <ExposureNeg1Icon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Quantity..."
        type={"number"}
        value={quantity}
        disabled
        inputProps={{ "aria-label": "Select product quantity" }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="add one"
        onClick={addOne}
        disabled={quantity === max}
      >
        <PlusOneIcon />
      </IconButton>
    </Paper>
  );
};

export default ItemCount;