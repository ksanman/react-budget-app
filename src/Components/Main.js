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
import EditBudget from './edit-budget';
import { useSelector } from 'react-redux';
import { selectBudgets } from '../slices/budget-slice';

const drawerWidth = 240;

export default function Main() {
  const createBudgetTab = 3;
  const budgets = useSelector(selectBudgets);
  const hasBudgets = budgets && budgets.length > 0;

  const [currentTab, setCurrentTab] = React.useState(hasBudgets ? 0 : createBudgetTab);
  const tabs = [{
      id: 0,
      name: 'Home',
      icon: <HomeIcon />
    },{
      id: 1,
      name: 'Budgets',
      icon: <MoneyIcon />
    },{
      id: 2,
      name: 'Transaction',
      icon: <CreditCardIcon />
  }];
 
  const updateTab = (event, value) => {
    if(!hasBudgets) {
      setCurrentTab(createBudgetTab);
    } else if(value) {
      setCurrentTab(value);
    } else {
      setCurrentTab(0);
    }
  };

  const getMainView = () => (
    <Box>
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
          onChange={updateTab}>
            {tabs.map((tab, index) => {
              return (
              <Tab key={index} value={tab.id} label={tab.name} />
              );
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

  const getNoBudgetsView = () => (
    <Box sx={{flexGrow: 1}}>
      <Toolbar />
      <EditBudget message="Welcome! To get started, create a budget."/>
    </Box>
  )

  const view = hasBudgets ? getMainView() : getNoBudgetsView();

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
      {view}
    </Box>
  );
}
