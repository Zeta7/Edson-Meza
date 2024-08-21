import swaggerUi from 'swagger-ui-express';
import express, { Request, Response, NextFunction } from 'express';

import database from './prisma';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import orderRoutes from './src/routes/orderRoutes';
import swaggerSpec from './src/libs/swagger/swagger..config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

database.$connect()
  .then(() => {
    console.log('Conectado a la base de datos MongoDB');
  })
  .catch((err: any) => {
    console.error('Error al conectar a la base de datos:', err);
  });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/user', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/v1`);
  console.log(`Documentación Swagger: http://localhost:${PORT}/docs`);
});
