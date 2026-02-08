import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Bienvenido al Sistema de Gestión de Clientes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Seleccione una opción para comenzar
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6
                }
              }}
            >
              <CardActionArea
                onClick={() => navigate('/clientes')}
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: '#1976d2',
                      color: 'white',
                      borderRadius: '50%',
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: 48 }} />
                  </Box>
                  <Typography variant="h5" component="div" align="center">
                    Gestión de Clientes
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Administre la información de sus clientes
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
