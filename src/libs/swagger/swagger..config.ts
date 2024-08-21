import swaggerJsdoc from 'swagger-jsdoc';

const URL_SWAGGER = process.env.URL;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',

    info: { title: 'XYZ-BOUTIQUE', version: '1.0.0' },

    servers: [{ url: URL_SWAGGER }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['./src/routes/**/**.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
