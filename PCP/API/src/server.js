// src/server.js

import express from 'express';
import db from './config/db.js';

// Importações do userController
import {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    getUserProfile,
    addFavoriteBuild,
    removeFavoriteBuild,
    addFavoriteComponent,
    removeFavoriteComponent
} from './controllers/userController.js';

// Importações do buildController
import {
    deleteBuild,
    getUserBuilds,
    getBuildById
} from './controllers/buildController.js';

// Importações do componentController
import {
    getComponentsByType,
    getComponentById,
    searchComponent
} from './controllers/componentController.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Rotas de usuários
app.post('/users', registerUser);
app.post('/users/login', loginUser);
app.get('/users/:id', getUserById);
app.put('/users/:id', updateUser);
app.get('/users/profile/:id', getUserProfile);

// Rotas de builds
// Removemos a rota de createBuild
// app.post('/builds', createBuild);
app.delete('/builds/:id', deleteBuild);
app.get('/users/:id/builds', getUserBuilds);
app.get('/builds/:id', getBuildById);

// Rotas de componentes
app.get('/components/:type', getComponentsByType);
app.get('/components/:type/:id', getComponentById);
app.get('/components/search', searchComponent);

// Rotas de favoritos
app.post('/users/favorites/builds', addFavoriteBuild);
app.delete('/users/favorites/builds', removeFavoriteBuild);
app.post('/users/favorites/components', addFavoriteComponent);
app.delete('/users/favorites/components', removeFavoriteComponent);

// Conexão ao banco de dados
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error:', err));

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
