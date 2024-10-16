// src/routes/routes.js
import express from 'express';
import {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    getUserProfile,
    addFavoriteBuild,
    removeFavoriteBuild,
    addFavoriteComponent,
    removeFavoriteComponent,
} from '../controllers/userController.js'; // Importações do userController

import {
    createBuild,
    deleteBuild,
    getUserBuilds,
    getBuildById,
} from '../controllers/buildController.js'; // Importações do buildController

import {
    getComponentsByType,
    getComponentById,
    searchComponent,
} from '../controllers/componentController.js'; // Certifique-se de que este arquivo exista

const router = express.Router();

// Rotas de usuários
router.post('/users', registerUser);              // Registrar novo usuário
router.post('/users/login', loginUser);            // Fazer login
router.get('/users/:id', getUserById);             // Obter usuário por ID
router.put('/users/:id', updateUser);              // Alterar dados da conta
router.get('/users/profile/:id', getUserProfile);  // Ver perfil do usuário

// Rotas de builds
router.post('/builds', createBuild);               // Criar e salvar nova build
router.delete('/builds/:id', deleteBuild);         // Remover build
router.get('/users/:id/builds', getUserBuilds);    // Obter todas as builds de um usuário
router.get('/builds/:id', getBuildById);           // Obter uma build específica

// Rotas de favoritos
router.post('/users/favorites/builds', addFavoriteBuild);         // Adicionar build aos favoritos
router.delete('/users/favorites/builds', removeFavoriteBuild);     // Remover build dos favoritos
router.post('/users/favorites/components', addFavoriteComponent);   // Adicionar componente aos favoritos
router.delete('/users/favorites/components', removeFavoriteComponent); // Remover componente dos favoritos

// Rotas de componentes
router.get('/components/type/:type', getComponentsByType); // Listar componentes por tipo
router.get('/components/:type/:id', getComponentById);     // Ver especificações de um componente
router.get('/components/search', searchComponent);          // Buscar componente específico

export default router;
