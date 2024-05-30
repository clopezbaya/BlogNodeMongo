const mongoose = require('mongoose');
const { connectDB } = require('../server/config/db'); // Importa la función connectDB desde tu archivo

jest.mock('mongoose'); // Mockea el módulo mongoose

describe('Prueba genérica para conectar a la base de datos MongoDB', () => {
  it('debería conectarse a la base de datos MongoDB', async () => {
    const mockConnection = {
      connection: { host: 'localhost' } // Simula la conexión exitosa
    };
    mongoose.connect.mockResolvedValue(mockConnection);

    // Mockea console.log
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    await connectDB();
    expect(mongoose.connect).toHaveBeenCalled(); // Verifica que se haya llamado a mongoose.connect
    expect(consoleLogMock).toHaveBeenCalledWith('Database Connected: localhost'); // Verifica que se haya impreso el mensaje de conexión exitosa

    // Restaura la implementación original de console.log después de la prueba
    consoleLogMock.mockRestore();
  });

  it('debería manejar errores al conectar a la base de datos MongoDB', async () => {
    const errorMessage = 'Error: Error al conectar a la base de datos';
    
    const originalUri = process.env.MONGODB_URI;
    process.env.MONGODB_URI = 'mongodb://invalid_uri';

    try {
      await connectDB();
    } catch (error) {
      expect(error.message).toContain('Error al conectar a la base de datos');
    } finally {
      process.env.MONGODB_URI = originalUri;
    }
  });
});