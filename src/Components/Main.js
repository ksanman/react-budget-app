import * as React from 'react';
import Box from '@mui/material/Box';

import EditBudget from './edit-budget';
import { useSelector } from 'react-redux';
import { selectBudgets } from '../slices/budget-slice';
import TabView from './tab-view';
import MainToolbar from './main-toolbar';


export default function Main() {
  const budgets = useSelector(selectBudgets);
  const hasBudgets = budgets && budgets.length > 0;

  const getMainView = () => (
      <TabView />
  );

  const getNoBudgetsView = () => (
    <Box sx={{flexGrow: 1}}>
      <MainToolbar title='Budgets' />
      <EditBudget message="Welcome! To get started, create a budget."/>
    </Box>
  )

  const view = hasBudgets ? getMainView() : getNoBudgetsView();

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%'}}>
      {view}
    </Box>
  );
}
