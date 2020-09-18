import React, { useState, useEffect } from 'react';
// Material UI
import {
  Toolbar,
  Button,
  Box,
  Typography,
} from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
// Routing
import { NavLink, Link, useHistory } from 'react-router-dom';
// Components
import CartIcon from '../CartIcon';
// Utils
import { getCollection } from '../../utils/firebase';
// Other resources
import popeLogo from '../../assets/img/pope-logo.png';

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: 8,
    alignSelf: "flex-end",
  },
  homeLink: {
    textDecoration: "none",
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    flex: 1,
    justifyContent: "space-between",
    [theme.breakpoints.down(666)]: {
      flexDirection: "column",
      paddingTop: theme.spacing(1),
    },
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    overflowX: 'auto',
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.07),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.14),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    display: 'flex',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    display: 'flex',
    flex: 1,
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  link: {
    textDecoration: "none"
  },
  activeLink: {
    fontWeight: "bold",
  },
  orderBtn: {
    margin: theme.spacing(0, 1),
  }
}));

const Header = () => {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Load categories
    getCollection("categories")
      .then(catArr => {
        setCategories(catArr)
      })
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.homeLink}>
          <img
            src={popeLogo}
            alt="logo"
            style={{ width: 40, height: 40 }}
          />
          <Typography
            component="span"
            variant="h6"
            className={classes.title}
          >El Pope E-Commerce
          </Typography>
        </Link>
        {/* Future search box ...
        <Box className={classes.search}>
          <Box className={classes.searchIcon}>
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search product... (not implemented)"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          /> 
        </Box>*/}
        <Box component="nav">
          <Button
            variant="outlined"
            size="small"
            startIcon={<PersonIcon />}
          >Log In
          </Button>
          <Button
            className={classes.orderBtn}
            variant="outlined"
            size="small"
            startIcon={<ReceiptIcon />}
            onClick={() => history.push("/order")}
          >My Order
          </Button>
          <CartIcon />
        </Box>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {categories.map((section) => (
          <Typography
            color="inherit"
            noWrap
            variant="body2"
            component="span"
            key={section.key}
            className={classes.toolbarLink}
          >
            <NavLink
              to={`/categories/${section.key}`}
              className={classes.link}
              activeClassName={classes.activeLink}
            >{section.description}
            </NavLink>
          </Typography>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;