import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import * as ACTIONS from "../actions/authActions.js";
import * as SEARCH_ACTIONS from "../actions/searchActions.js";

import FriendsList from "../container/friends/FriendsList.js";
import AuthContext from "../context/AuthContext.js";
import SnackBarMessages from "./message/SnackBarMessages.js";
import withContext from "../context/ContextHOC.js";
import ProfileDialog from "../container/user/ProfileDialog.js";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
}));

function MainLayout(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [search, setSearch] = React.useState({ search: null });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [state, setOpen] = useState({
    open: true,
    openProfile: false
  });
  const [image, setImage] = React.useState({
    image: ""
  });
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const LogOut = () => {
    setAnchorEl(null);
    ACTIONS.Logout(props.context.dispatch, props.message.messageDispatch);
    handleMobileMenuClose();
  };
  const handleOpenProfile = () => {
    setOpen({ ...state, openProfile: true });
  };
  const handleCloseProfile = () => {
    setOpen({ ...state, openProfile: false });
  };

  useEffect(() => {
    // props.context.user.id && props.context.user.id.length !== 0
    // ?
    if (props.context.user.id && props.context.user.id.length !== 0) {
      console.log(props.context.user.id);
      const data = {
        id: props.context.user.id
      };
      ACTIONS.get_User_Current_Detail(
        data,
        props.context.dispatch,
        props.message.messageDispatch
      );
    }

    // : "";
  }, [props.context.user.id && props.context.user.id.length !== 0]);
  useEffect(() => {
    setImage({
      image: props.context.userDetail.photoUrl
    });
  }, [!props.context.userDetail]);

  // Search  Action
  useEffect(() => {
    if (search.search !== null && search.search !== "") {
      console.log("hello Search");
      const data = {
        search: search.search
      };
      SEARCH_ACTIONS.Serach_User(data, props.searchDispatch);
    }
  }, [search.search]);
  useEffect(() => {
    // console.log(search.search);
  });
  const searchFriend = e => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };
  console.log(props);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
      state.openProfile === true ?{" "}
      <ProfileDialog
        open={state.openProfile}
        closeProfile={handleCloseProfile}
      />{" "}
      : null
      <MenuItem onClick={LogOut}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  if (props.context.loader == true) {
    return "Hello";
  }

  const drawer = (
    <div>
      <div
        className={classes.toolbar}
        style={{
          justifyContent: "flex-start",
          backgroundColor: "#3f51b5",
          color: "white",
          height: "20px"
          // minHeight: "80px"
        }}
      >
        <List>
          <ListItem
            button
            key={props.context.user._id ? props.context.user._id : "UnKnown"}
          >
            <ListItemIcon>
              <Avatar
                alt="Remy Sharp"
                src={image.image ? image.image : "/images/profileImage.png"}
                className={classes.avatar}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                props.context.userDetail.username
                  ? props.context.userDetail.username
                  : "UnKnown"
              }
            />
          </ListItem>
        </List>
      </div>

      <Divider />
      <FriendsList />
    </div>
  );

  return props.context.auth ? (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Friend"
                name="search"
                onChange={searchFriend}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12} style={{ backgroundColor: "black" }}>
              {props.children}
            </Grid>
          </Container>
        </main>
      </div>
      <SnackBarMessages />
    </React.Fragment>
  ) : (
    <React.Fragment>
      {props.children}
      <SnackBarMessages />
    </React.Fragment>
  );
}

MainLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default withContext(MainLayout);
