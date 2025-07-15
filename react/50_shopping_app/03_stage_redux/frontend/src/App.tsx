import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";
import type { AppState } from './types/states';
import { useSelector } from "react-redux";

function App() {
  const selector = (state: AppState) => state.login.isLogged;
  const isLogged = useSelector(selector);

  if (isLogged) {
    return (
      <>
        <Navbar /><hr />
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/form" element={<ShoppingForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    )
  } else {
    return (
      <>
        <Navbar /><hr />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    )
  }
}

export default App
