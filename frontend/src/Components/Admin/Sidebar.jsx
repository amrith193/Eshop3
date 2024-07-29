// Sidebar.jsx
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <List>
      <ListItem button component={Link} to="/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/users">
        <ListItemText primary="User" />
      </ListItem>
      <ListItem button component={Link} to="/products">
        <ListItemText primary="Product" />
      </ListItem>
      <ListItem button component={Link} to="/orders">
        <ListItemText primary="Order" />
      </ListItem>
      <ListItem button component={Link} to="/payments">
        <ListItemText primary="Payment" />
      </ListItem>
    </List>
  );
}

export default Sidebar;
