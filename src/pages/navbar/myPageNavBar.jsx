import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Link, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

export default function MyPageNavBar(props) {
  const { drawerWidth, content } = props;
  const location = useLocation();
  const path = location.pathname;

  const [open, setOpen] = React.useState(false);

  const changeOpenStatus = () => {
    setOpen(!open);
  };

  const myDrawer = (
    <div>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <h2 style={{ justifyContent: 'center' }}>내 활동</h2>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/myPage/myCourse"
              selected={'/myPage/myCourse' === path || '/myPage' === path}
            >
              <ListItemText primary={'나의 코스'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" selected={'/' === path}>
              <ListItemText primary={'저장한 코스'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', padding: { sm: '3em 20em 0 20em' } }}>
      <IconButton
        color="inheret"
        onClick={changeOpenStatus}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative',
            borderRight: 'none',
          },
          [`& .Mui-selected`]: {
            background: 'none',
            color: '#f6854f',
          },
        }}
      >
        {myDrawer}
      </Drawer>
      <Drawer
        anchor="top"
        variant="temporary"
        open={open}
        onClose={changeOpenStatus}
        sx={{
          display: { xs: 'block', sm: 'none' },
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          [`& .Mui-selected`]: {
            background: 'none',
            color: '#f6854f',
          },
        }}
      >
        {myDrawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Toolbar /> */}
        {content}
      </Box>
    </Box>
  );
}
