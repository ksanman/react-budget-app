import * as React from 'react';
import Box from '@mui/material/Box';

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'
import EditBudget from './edit-budget';
import { useSelector } from 'react-redux';
import { selectBudgets } from '../slices/budget-slice';
import TabView from './tab-view';


export default function Main() {
  const budgets = useSelector(selectBudgets);
  const hasBudgets = budgets && budgets.length > 0;

  const getMainView = () => (
      <TabView />
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
