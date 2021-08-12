import logo from "./logo.svg";
import "./App.css";
import MainPage from "./MainPage/MainPage";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainPage />
      </div>
    </Provider>
  );
}

export default App;
