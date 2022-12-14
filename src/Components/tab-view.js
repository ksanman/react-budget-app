import { useDispatch, useSelector } from "react-redux";
import { selectTab, updateTab } from '../slices/tab-slice';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import MoneyIcon from '@mui/icons-material/Money';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Tab, Tabs } from '@mui/material';
import HomeView from './home-view';
import TabPanel from './tab-panel';
import Budgets from './budgets';
import Transactions from './transactions';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MainToolbar from "./main-toolbar";
import { useState } from "react";

const drawerWidth = 240;

export default function TabView() {
    const currentTab = useSelector(selectTab);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
   
    const onTabChange = (event, value) => {
      if(value) {
        dispatch(updateTab(parseInt(value)));
      } else {
        dispatch(updateTab(0));
      }

      handleExpandClicked();
    };

    const handleExpandClicked = () => {
      setIsMenuOpen(!isMenuOpen);
    }

    return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <MainToolbar title='Budgets' showExpand={true} onExpandClicked={handleExpandClicked}/>
      <Drawer
        variant="temporary"
        open={isMenuOpen}
        onClose={handleExpandClicked}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {xs: 'block', sm: 'none'},
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
          onChange={onTabChange}>
            {tabs.map((tab, index) => {
              return (
              <Tab key={index} value={tab.id} label={tab.name} />
              );
            })}
          </Tabs>
        </Box>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
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
          onChange={onTabChange}>
            {tabs.map((tab, index) => {
              return (
              <Tab key={index} value={tab.id} label={tab.name} />
              );
            })}
          </Tabs>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, maxWidth:  {
        xs: '100%',
        sm: '100%',
        md: '100%',
        lg: `calc(100% - ${drawerWidth})`,
        xl: `calc(100% - ${drawerWidth})`
      }}}>
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
    </Box>);
}