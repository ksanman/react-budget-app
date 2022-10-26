import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import MoneyIcon from '@mui/icons-material/Money'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Tab, Tabs } from '@mui/material';
import HomeView from './home-view';
import TabPanel from './tab-panel';
import Budgets from './budgets';
import Transactions from './transactions';

const drawerWidth = 240;

export default function Main() {
  const [currentTab, setCurrentTab] = React.useState(0);
  const tabs = [{
      id: 0,
      name: 'Home',
      visible: true,
      icon: <HomeIcon />
    },{
      id: 1,
      name: 'Budgets',
      visible: true,
      icon: <MoneyIcon />
    },{
      id: 2,
      name: 'Transaction',
      visible: true,
      icon: <CreditCardIcon />
  }, {
    id: 3,
    name: 'Budget',
    visible: false,
    icon: ''
  }];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Budgets
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Tabs 
          orientation="vertical"
          variant="scrollable"
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}>
            {tabs.map((tab, index) => {
              if(tab.visible) {
                return (
                <Tab key={index} value={tab.id} label={tab.name} />
                );
              } else {
                return '';
              }
            })}
          </Tabs>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <TabPanel value={currentTab} index={0}>
          <HomeView />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Budgets />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Transactions />
        </TabPanel>
      </Box>
    </Box>
  );
}
