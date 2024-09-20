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
    <Box sx={{ overflow: 'auto', padding: 'none' }}>
      <List>
        <ListItem disablePadding>
          <h2 style={{ justifyContent: 'center' }}>내 활동</h2>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/myCourse" selected={'/myCourse' === path}>
            <ListItemText primary={'나의 코스'} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/saveCourse"
            selected={'/saveCourse' === path}
          >
            <ListItemText primary={'저장한 코스'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        padding: { sm: '1% 10% 0 10%' },
        display: { xs: 'block', sm: 'flex' },
      }}
    >
      <IconButton
        color="inheret"
        onClick={changeOpenStatus}
        sx={{
          mr: 2,
          display: { sm: 'none' },
          width: { xs: '100%' },
          justifyContent: { xs: 'right' },
        }}
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
            paddingLeft: '1em !important',
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
        {content}
      </Box>
    </Box>
  );
}
