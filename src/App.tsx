import Typography from "@mui/material/Typography";
import { Routes, Route, Outlet, NavLink, Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryView from "./components/CountryView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/:code" element={<CountryView />} />
      </Routes>
    </BrowserRouter>
  );
}
