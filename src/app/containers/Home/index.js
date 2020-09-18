import React from 'react';
// Material UI
import {
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  greetingText: {
    textAlign: "center",
    backgroundColor: "#b2ff59bb",
    borderRadius: 4
  }
}));

const Home = ({ greeting }) => {
  const clases = useStyles();

  return (
    <>
      <Typography
        className={clases.greetingText}
        component="h1"
        variant="body1"
      >{greeting}
      </Typography>
    </>
  );
};

export default Home;