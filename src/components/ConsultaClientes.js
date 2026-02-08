import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { clienteService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout';

const ConsultaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [filtros, setFiltros] = useState({
    identificacion: '',
    nombre: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const data = await clienteService.listado(
        filtros.identificacion,
        filtros.nombre,
        user.userId
      );
      setClientes(data);
    } catch (error) {
      mostrarMensaje('Hubo un inconveniente al cargar los clientes', 'error');
    }
  };

  const handleBuscar = () => {
    cargarClientes();
  };

  const handleAgregar = () => {
    navigate('/clientes/nuevo');
  };

  const handleEditar = (id) => {
    navigate(`/clientes/editar/${id}`);
  };

  const handleEliminar = (cliente) => {
    setClienteToDelete(cliente);
    setOpenDialog(true);
  };

  const confirmarEliminar = async () => {
    try {
      await clienteService.eliminar(clienteToDelete.id);
      mostrarMensaje('Cliente eliminado correctamente', 'success');
      setOpenDialog(false);
      setClienteToDelete(null);
      cargarClientes();
    } catch (error) {
      console.log('Error al eliminar:', error);
      console.log('Error response:', error.response);
      const errorMessage = error.response?.data?.message || 'Hubo un inconveniente al eliminar el cliente';
      mostrarMensaje(errorMessage, 'error');
      setOpenDialog(false);
    }
  };

  const mostrarMensaje = (mensaje, severity) => {
    setSnackbarMessage(mensaje);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              Consulta de Clientes
            </Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/home')}
                sx={{ mr: 2 }}
              >
                Regresar
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAgregar}
                sx={{ bgcolor: '#1976d2' }}
              >
                Agregar
              </Button>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Identificación"
                value={filtros.identificacion}
                onChange={(e) => setFiltros({ ...filtros, identificacion: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Nombre"
                value={filtros.nombre}
                onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleBuscar}
                sx={{ height: '56px', bgcolor: '#1976d2' }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Identificación</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Apellidos</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No se encontraron clientes
                    </TableCell>
                  </TableRow>
                ) : (
                  clientes.map((cliente) => (
                    <TableRow key={cliente.id} hover>
                      <TableCell>{cliente.identificacion}</TableCell>
                      <TableCell>{cliente.nombre}</TableCell>
                      <TableCell>{cliente.apellidos}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditar(cliente.id)}
                          title="Editar"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleEliminar(cliente)}
                          title="Eliminar"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que desea eliminar el cliente {clienteToDelete?.nombre} {clienteToDelete?.apellidos}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={confirmarEliminar} color="error" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default ConsultaClientes;
