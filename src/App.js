import { ThemeProvider } from '@mui/system';
import './App.css';
import ResponsiveDrawer from './Components/Main';
import { darkTheme } from './themes/themes';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <ResponsiveDrawer />
      </div>
    </ThemeProvider>
  );
}

export default App;
