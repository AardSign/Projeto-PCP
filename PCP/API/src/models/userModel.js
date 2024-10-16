import db from '../config/db.js';

export const UserModel = {
    getUserById: async (id) => {
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return user.length > 0 ? user[0] : null;
    },

    createUser: async (userData) => {
        const { username, email, password, avatar } = userData;
        const [result] = await db.query('INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)', [username, email, password, avatar]);
        return result.insertId;
    },

    updateUser: async (id, userData) => {
      const { username, email, password, avatar } = userData;
      await db.query('UPDATE users SET username = ?, email = ?, password = ?, avatar = ? WHERE id = ?', [username, email, password, avatar, id]);
    },

  deleteUser: async (id) => {
      await db.query('DELETE FROM users WHERE id = ?', [id]);
    },   
    
};