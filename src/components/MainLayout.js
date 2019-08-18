import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import AuthContext from "../context/AuthContext.js";
import SnackBarMessages from "./message/SnackBarMessages.js";
import withContext from "../context/ContextHOC.js";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ProfileDialog from "../container/user/ProfileDialog.js";
import * as ACTIONS from "../actions/authActions.js";
import Avatar from "@material-ui/core/Avatar";
import FriendsList from "../container/friends/FriendsList.js";
const drawerWidth = 360;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginRight: 36
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
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
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  avatar: {
    margin: -4,
    marginLeft: "10px"
  }
}));

const MainLayout = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [open, setOpenProifle] =
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [state, setOpen] = useState({
    open: true,
    openProfile: false
  });
  const [image, setImage] = React.useState({
    image: ""
  });
  // const [auth, setAuth] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen({ ...state, open: true });
  };

  const handleOpenProfile = () => {
    setOpen({ ...state, openProfile: true });
  };
  const handleCloseProfile = () => {
    setOpen({ ...state, openProfile: false });
  };
  const handleDrawerClose = () => {
    setOpen({ ...state, open: false });
  };
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const LogOut = () => {
    setAnchorEl(null);
    ACTIONS.Logout(props.context.dispatch, props.message.messageDispatch);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // useEffect(() => {
  //   const data = {
  //     id: props.context.user.id
  //   };
  //   ACTIONS.get_User_Current_Detail(
  //     data,
  //     props.context.dispatch,
  //     props.message.messageDispatch
  //   );
  // }, []);

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
  // console.log(AuthContext.Consumer);
  console.log(props.context);
  // state.auth ? (

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
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

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
  return (
    // <AuthContext.Consumer>
    //   {context =>
    props.context.auth ? (
      <React.Fragment>
        <div className={classes.root}>
          <CssBaseline />
          <div className={classes.grow}>
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: state.open
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={handleDrawerOpen}
                  aria-label="Open drawer"
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: state.open
                  })}
                >
                  <MenuIcon />
                </IconButton>

                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        image.image ? image.image : "/images/profileImage.png"
                      }
                      className={classes.avatar}
                    />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
          </div>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: state.open,
              [classes.drawerClose]: !state.open
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: state.open,
                [classes.drawerClose]: !state.open
              })
            }}
            open={state.open}
          >
            {/*Drawer Close Code Copay Paste From Bottom*/}
            <div
              className={classes.toolbar}
              style={{
                justifyContent: "flex-start",

                backgroundColor: "#3f51b5",
                color: "white"
                // minHeight: "80px"
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={image.image ? image.image : "/images/profileImage.png"}
                className={classes.avatar}
              />
              <Typography
                variant="h9"
                style={{ justifyContent: "flex-center", marginLeft: "10px" }}
              >
                {props.context.userDetail.username
                  ? props.context.userDetail.username
                  : "UnKnown"}
              </Typography>
            </div>
            <Divider />
            <FriendsList />

            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <div style={{ width: "100%" }}>
            <Box
              display="flex"
              flexWrap="wrap"
              alignContent="flex-start"
              p={1}
              m={1}
              bgcolor="background.paper"
              css={{ maxWidth: "100%", height: "100%" }}
            >
              {/* <Grid
               container
               direction="row"
               justify="flex-start"
               alignItems="flex-end"
             >*/}
              <main className={classes.content}>{props.children}</main>
              {/*</Grid>*/}
            </Box>
          </div>
        </div>
        <SnackBarMessages />
      </React.Fragment>
    ) : (
      <React.Fragment>
        {props.children}
        <SnackBarMessages />
      </React.Fragment>
    )
    //   }
    // </AuthContext.Consumer>
  );
};
// ) : (
//   <React.Fragment>{props.children}</React.Fragment>
// );

export default withContext(MainLayout);
// <div className={classes.toolbar} />

// <div className={classes.toolbar}>
//   // <IconButton onClick={handleDrawerClose}>
//   //   {theme.direction === "rtl" ? (
//   //     <ChevronRightIcon />
//   //   ) : (
//   //     <ChevronLeftIcon />
//   //   )}
//   // </IconButton>
// </div>
