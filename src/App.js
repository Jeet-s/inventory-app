import "./App.css";
import Inventory from "./components/Inventory";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Provider } from "react-redux";
import store from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Inventory />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
