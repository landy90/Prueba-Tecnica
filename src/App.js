import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ConsultaClientes from './components/ConsultaClientes';
import MantenimientoClientes from './components/MantenimientoClientes';
import NotFound from './components/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/clientes"
            element={
              <ProtectedRoute>
                <ConsultaClientes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/clientes/nuevo"
            element={
              <ProtectedRoute>
                <MantenimientoClientes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/clientes/editar/:id"
            element={
              <ProtectedRoute>
                <MantenimientoClientes />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
