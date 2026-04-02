const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

const doc = {
  info: {
    title: 'Projektarbeit 295',
    description: 'Projektarbeit für das Modul 295'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Task: {
      id: '1',
      title: 'Beispiel Aufgabe',
      description: 'Beschreibung der Aufgabe',
      createdAt: '2026-04-02T12:00:00Z',
      dueDate: '2026-04-05T12:00:00Z',
      completedAt: null
    },
    UserCredentials: {
      username: 'admin',
      password: '1234'
    },
    AuthToken: {
      token: 'JWT_TOKEN_HIER'
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc);