import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import AdminPage from './pages/AdminPage';
import { useState } from 'react';

export default function App() {

  const [activAdmin, setActiveAdmin] = useState(null)

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setActiveAdmin={setActiveAdmin}/>} />
      <Route path="/admin" element={activAdmin ? <AdminPage /> : <Navigate to="/login" />} />
    </Routes>
  )
}
