import db from '../config/db.js';

export const FavoriteComponentModel = {
    addFavoriteComponent: async (userId, componentId, componentType) => {
        await db.query('INSERT INTO favorite_components (user_id, component_id, component_type) VALUES (?, ?, ?)', [userId, componentId, componentType]);
    },

    getFavoriteComponentsByUserId: async (userId) => {
        const [favoriteComponents] = await db.query('SELECT * FROM favorite_components WHERE user_id = ?', [userId]);
        return favoriteComponents;
    },

    removeFavoriteComponent: async (userId, componentId, componentType) => {
        await db.query('DELETE FROM favorite_components WHERE user_id = ? AND component_id = ? AND component_type = ?', [userId, componentId, componentType]);
    },

};