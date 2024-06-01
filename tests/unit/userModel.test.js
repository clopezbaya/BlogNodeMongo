const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const UserModel = require('../../server/models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Pruebas estáticas para el modelo User', () => {
  it('debería crear un usuario correctamente', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };
    const user = new UserModel(userData);
    await user.save();
    const savedUser = await UserModel.findOne({ username: 'testuser' });
    expect(savedUser).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.password).toBe(userData.password);
  });

  it('debería rechazar la creación de un usuario sin username', async () => {
    const userData = {
      password: 'testpassword',
    };
    const user = new UserModel(userData);
    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors['username']).toBeDefined();
  });
});
