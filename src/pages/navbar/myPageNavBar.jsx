import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Link, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

function MyPageNavBar(props) {
  const { drawerWidth, content } = props;
  const location = useLocation();
  const curPath = location.pathname;

  const [open, setOpen] = React.useState(false);

  const changeOpenStatus = () => {
    setOpen(!open);
  };

  const myDrawer = (
    <Box sx={{ overflow: 'auto', padding: 'none' }}>
      <List>
        <ListItem disablePadding>
          <h2 style={{ justifyContent: 'center' }}>{props.data.title}</h2>
        </ListItem>
        {props.data.data.map((data, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton component={Link} to={data.path} selected={data.path === curPath}>
              <ListItemText primary={data.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        padding: { md: '1% 10% 0 10%' },
        display: { xs: 'block', md: 'flex' },
      }}
    >
      <Box sx={{ marginRight: { xs: '0', md: '1em' }, overflowX: 'hidden' }}>
        <IconButton
          color="inheret"
          onClick={changeOpenStatus}
          sx={{
            mr: 2,
            display: { md: 'none' },
            width: { xs: '100%' },
            justifyContent: { xs: 'right' },
            borderRadius: 0,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
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
            display: { xs: 'block', md: 'none' },
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
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {content}
      </Box>
    </Box>
  );
}

export default MyPageNavBar;
