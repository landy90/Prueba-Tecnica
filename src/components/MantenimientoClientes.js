import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate, useParams } from 'react-router-dom';
import { clienteService, interesesService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout';

const MantenimientoClientes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    identificacion: '',
    telefonoCelular: '',
    otroTelefono: '',
    direccion: '',
    fNacimiento: '',
    fAfiliacion: '',
    sexo: 'M',
    resenaPersonal: '',
    imagen: '',
    interesFK: ''
  });

  const [intereses, setIntereses] = useState([]);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    cargarIntereses();
    if (isEditing) {
      cargarCliente();
    }
  }, [id]);

  const cargarIntereses = async () => {
    try {
      const data = await interesesService.listado();
      setIntereses(data);
    } catch (error) {
      mostrarMensaje('Error al cargar los intereses', 'error');
    }
  };

  const cargarCliente = async () => {
    try {
      const data = await clienteService.obtener(id);
      setFormData({
        nombre: data.nombre || '',
        apellidos: data.apellidos || '',
        identificacion: data.identificacion || '',
        telefonoCelular: data.telefonoCelular || '',
        otroTelefono: data.otroTelefono || '',
        direccion: data.direccion || '',
        fNacimiento: data.fNacimiento ? data.fNacimiento.split('T')[0] : '',
        fAfiliacion: data.fAfiliacion ? data.fAfiliacion.split('T')[0] : '',
        sexo: data.sexo || 'M',
        resenaPersonal: data.resenaPersonal || '',
        imagen: data.imagen || '',
        interesFK: data.interesesId || ''
      });
      if (data.imagen) {
        setImagePreview(`data:image/jpeg;base64,${data.imagen}`);
      }
    } catch (error) {
      mostrarMensaje('Error al cargar el cliente', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setFormData({
          ...formData,
          imagen: base64String
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre || formData.nombre.length > 50) {
      newErrors.nombre = 'El nombre es requerido (máximo 50 caracteres)';
    }
    if (!formData.apellidos || formData.apellidos.length > 100) {
      newErrors.apellidos = 'Los apellidos son requeridos (máximo 100 caracteres)';
    }
    if (!formData.identificacion || formData.identificacion.length > 20) {
      newErrors.identificacion = 'La identificación es requerida (máximo 20 caracteres)';
    }
    if (!formData.telefonoCelular || formData.telefonoCelular.length > 20) {
      newErrors.telefonoCelular = 'El teléfono celular es requerido (máximo 20 caracteres)';
    }
    if (!formData.otroTelefono || formData.otroTelefono.length > 20) {
      newErrors.otroTelefono = 'El otro teléfono es requerido (máximo 20 caracteres)';
    }
    if (!formData.direccion || formData.direccion.length > 200) {
      newErrors.direccion = 'La dirección es requerida (máximo 200 caracteres)';
    }
    if (!formData.fNacimiento) {
      newErrors.fNacimiento = 'La fecha de nacimiento es requerida';
    }
    if (!formData.fAfiliacion) {
      newErrors.fAfiliacion = 'La fecha de afiliación es requerida';
    }
    if (!formData.sexo) {
      newErrors.sexo = 'El sexo es requerido';
    }
    if (!formData.resenaPersonal || formData.resenaPersonal.length > 200) {
      newErrors.resenaPersonal = 'La reseña personal es requerida (máximo 200 caracteres)';
    }
    if (!formData.interesFK) {
      newErrors.interesFK = 'Los intereses son requeridos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing) {
        await clienteService.actualizar({
          id,
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          identificacion: formData.identificacion,
          celular: formData.telefonoCelular,
          otroTelefono: formData.otroTelefono,
          direccion: formData.direccion,
          fNacimiento: formData.fNacimiento,
          fAfiliacion: formData.fAfiliacion,
          sexo: formData.sexo,
          resennaPersonal: formData.resenaPersonal,
          imagen: formData.imagen,
          interesFK: formData.interesFK,
          usuarioId: user.userId
        });
        mostrarMensaje('Cliente actualizado correctamente', 'success');
      } else {
        await clienteService.crear({
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          identificacion: formData.identificacion,
          celular: formData.telefonoCelular,
          otroTelefono: formData.otroTelefono,
          direccion: formData.direccion,
          fNacimiento: formData.fNacimiento,
          fAfiliacion: formData.fAfiliacion,
          sexo: formData.sexo,
          resennaPersonal: formData.resenaPersonal,
          imagen: formData.imagen,
          interesFK: formData.interesFK,
          usuarioId: user.userId
        });
        mostrarMensaje('Cliente creado correctamente', 'success');
      }
      setTimeout(() => {
        navigate('/clientes');
      }, 1500);
    } catch (error) {
      mostrarMensaje('Hubo un inconveniente con la transacción', 'error');
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                <Avatar
                  src={imagePreview}
                  sx={{ width: 80, height: 80 }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: '#1976d2',
                      borderRadius: '50%',
                      p: 0.5,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: '#1565c0'
                      }
                    }}
                  >
                    <PhotoCameraIcon sx={{ color: 'white', fontSize: 20 }} />
                  </Box>
                </label>
              </Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
              </Typography>
            </Box>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Nombre *"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Apellidos *"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  error={!!errors.apellidos}
                  helperText={errors.apellidos}
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Identificación *"
                  name="identificacion"
                  value={formData.identificacion}
                  onChange={handleChange}
                  error={!!errors.identificacion}
                  helperText={errors.identificacion}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Teléfono Celular *"
                  name="telefonoCelular"
                  value={formData.telefonoCelular}
                  onChange={handleChange}
                  error={!!errors.telefonoCelular}
                  helperText={errors.telefonoCelular}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Otro Teléfono *"
                  name="otroTelefono"
                  value={formData.otroTelefono}
                  onChange={handleChange}
                  error={!!errors.otroTelefono}
                  helperText={errors.otroTelefono}
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Dirección *"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  error={!!errors.direccion}
                  helperText={errors.direccion}
                  inputProps={{ maxLength: 200 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Fecha de Nacimiento *"
                  name="fNacimiento"
                  type="date"
                  value={formData.fNacimiento}
                  onChange={handleChange}
                  error={!!errors.fNacimiento}
                  helperText={errors.fNacimiento}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Fecha de Afiliación *"
                  name="fAfiliacion"
                  type="date"
                  value={formData.fAfiliacion}
                  onChange={handleChange}
                  error={!!errors.fAfiliacion}
                  helperText={errors.fAfiliacion}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset" required error={!!errors.sexo}>
                  <FormLabel component="legend">Sexo *</FormLabel>
                  <RadioGroup
                    row
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                    <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors.interesFK}>
                  <InputLabel>Intereses *</InputLabel>
                  <Select
                    name="interesFK"
                    value={formData.interesFK}
                    onChange={handleChange}
                    label="Intereses *"
                  >
                    {intereses.map((interes) => (
                      <MenuItem key={interes.id} value={interes.id}>
                        {interes.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Reseña Personal *"
                  name="resenaPersonal"
                  value={formData.resenaPersonal}
                  onChange={handleChange}
                  error={!!errors.resenaPersonal}
                  helperText={errors.resenaPersonal}
                  inputProps={{ maxLength: 200 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/clientes')}
                  >
                    Regresar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{ bgcolor: '#1976d2' }}
                  >
                    Guardar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

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

export default MantenimientoClientes;
