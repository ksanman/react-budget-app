import { ThemeProvider } from '@mui/system';
import './App.css';
import Main from './Components/Main';
import { darkTheme } from './themes/themes';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
