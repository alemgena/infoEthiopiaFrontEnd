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
   

  return (
        <div className="CopyRightContainer">
             <Container>      
              <Typography variant="body1" color="brown" style={{textAlign:"right",display:"inline"
                 }}>
               
                <div className="copyRight">
                © 2021 RCNDC. All rights reserved
                </div>   
                
              </Typography>
            
          </Container> 
        </div>
       
      );
}
