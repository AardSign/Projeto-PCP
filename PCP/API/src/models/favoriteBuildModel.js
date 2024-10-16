import db from '../config/db.js';

export const FavoriteBuildModel = {
    addFavoriteBuild: async (userId, buildId) => {
        await db.query('INSERT INTO favorite_builds (user_id, build_id) VALUES (?, ?)', [userId, buildId]);
    },

    getFavoriteBuildsByUserId: async (userId) => {
        const [favoriteBuilds] = await db.query(
            'SELECT builds.* FROM favorite_builds JOIN builds ON favorite_builds.build_id = builds.id WHERE favorite_builds.user_id = ?',
            [userId]
        );
        return favoriteBuilds;
    },

    removeFavoriteBuild: async (userId, buildId) => {
        await db.query('DELETE FROM favorite_builds WHERE user_id = ? AND build_id = ?', [userId, buildId]);
    },

};
