import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch,useSelector} from "react-redux";
import {AppBar,Container,Typography} from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {DrawerSlice} from "../Slices/Drawer";
import {useMediaQuery} from 'react-responsive';

export default function BottomAppBar() {
    const dispatch = useDispatch();
    const small = useMediaQuery({ query: "(max-width: 480px)" });
    const actions = DrawerSlice.actions;

    const showDrawer = () => {
      dispatch(actions.showDrawer());
      document.body.style.overflow = "hidden";
    };

    const closeDrawer = () => {
      dispatch(actions.hideDrawer());
      document.body.style.overflow = "visible";
    };

  return (
    <div className={small? "bottomNavbar":"bottonNavbarNone"}>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" style={{backgroundColor:"rgb(244,151,3)"}} sx={{ top: 'auto', bottom: 0 }} >
            <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={showDrawer}>
                <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
       
        </React.Fragment>
    </div>  
      );
}
