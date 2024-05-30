const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Post = require('../server/models/Post');

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

describe('Pruebas estáticas para el modelo Post', () => {
  it('debería crear un post correctamente', async () => {
    const postData = {
      title: 'Título del post',
      body: 'Contenido del post',
    };

    const newPost = await Post.create(postData);
    expect(newPost.title).toBe(postData.title);
    expect(newPost.body).toBe(postData.body);
  });

  it('debería rechazar la creación de un post sin título', async () => {
    const postData = {
      body: 'Contenido del post',
    };

    try {
      await Post.create(postData);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Path `title` is required');
    }
  });

  it('debería rechazar la creación de un post sin contenido', async () => {
    const postData = {
      title: 'Título del post',
    };

    try {
      await Post.create(postData);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Path `body` is required');
    }
  });
});