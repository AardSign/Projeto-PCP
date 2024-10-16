import db from '../config/db.js';
import { validateId, handleError} from '../utils/index.js';
import bcrypt from 'bcrypt';


export async function registerUser(req, res) {
    try {
        const { username, password } = req.body;
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user into the database
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Function to update user information
export async function updateUser(req, res) {
    try {
        const { id } = req.params; // Get user ID from request parameters
        const { username, password } = req.body; // Get new user data from request body

        // Validate the user ID
        if (!validateId(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Create an object to hold the updated data
        const updatedData = {};

        // Check if the username is provided
        if (username) {
            updatedData.username = username;
        }

        // Check if the password is provided
        if (password) {
            // Hash the new password
            updatedData.password = await bcrypt.hash(password, 10);
        }

        // If there's no data to update, return a 400 error
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({ message: 'No data provided for update' });
        }

        // Build the SQL query dynamically
        const updates = Object.keys(updatedData).map((key) => `${key} = ?`).join(', ');
        const values = Object.values(updatedData);

        // Execute the update query
        await db.query(`UPDATE users SET ${updates} WHERE id = ?`, [...values, id]);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        handleError(res, error);
    }
}


// Função para fazer login do usuário
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Verificar se o email foi fornecido
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Buscar o usuário pelo email
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Retornar os dados do usuário (ou um token de autenticação se estiver usando JWT)
        res.json({ message: 'Login successful', user: user[0] });
    } catch (error) {
        handleError(res, error);
    }
}


// Função para obter um usuário pelo ID
export async function getUserById(req, res) {
    try {
        const { id } = req.params;

        // Valida o ID do usuário
        if (!validateId(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (user.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(user[0]);
    } catch (error) {
        handleError(res, error);
    }
}

// Função para adicionar uma build aos favoritos
export async function addFavoriteBuild(req, res) {
    try {
        const { userId, buildId } = req.body;

        // Valida os dados
        if (!validateId(userId) || !validateId(buildId)) {
            return res.status(400).json({ message: 'Invalid user ID or build ID format' });
        }

        await db.query('INSERT INTO favorite_builds (user_id, build_id) VALUES (?, ?)', [userId, buildId]);
        res.status(201).json({ message: 'Build adicionada aos favoritos!' });
    } catch (error) {
        handleError(res, error);
    }
}

// Função para adicionar um componente aos favoritos
export async function addFavoriteComponent(req, res) {
    try {
        const { userId, componentId, componentType } = req.body;

        // Valida os dados
        if (!validateFavoriteComponent({ userId, componentId, componentType })) {
            return res.status(400).json({ message: 'Invalid favorite component data' });
        }

        await db.query(
            'INSERT INTO favorite_components (user_id, component_id, component_type) VALUES (?, ?, ?)',
            [userId, componentId, componentType]
        );

        res.status(201).json({ message: 'Peça adicionada aos favoritas!' });
    } catch (error) {
        handleError(res, error);
    }
}

// Função para remover uma build dos favoritos
export async function removeFavoriteBuild(req, res) {
    try {
        const { userId, buildId } = req.body;

        // Valida os dados
        if (!validateId(userId) || !validateId(buildId)) {
            return res.status(400).json({ message: 'Invalid user ID or build ID format' });
        }

        await db.query('DELETE FROM favorite_builds WHERE user_id = ? AND build_id = ?', [userId, buildId]);
        res.status(200).json({ message: 'Build removida dos favoritos!' });
    } catch (error) {
        handleError(res, error);
    }
}

// Função para remover um componente dos favoritos
export async function removeFavoriteComponent(req, res) {
    try {
        const { userId, componentId, componentType } = req.body;

        // Valida os dados
        if (!validateFavoriteComponent({ userId, componentId, componentType })) {
            return res.status(400).json({ message: 'Invalid favorite component data' });
        }

        await db.query('DELETE FROM favorite_components WHERE user_id = ? AND component_id = ? AND component_type = ?', [userId, componentId, componentType]);
        res.status(200).json({ message: 'Peça removida dos favoritos!' });
    } catch (error) {
        handleError(res, error);
    }
}

// Função para obter o perfil do usuário
export async function getUserProfile(req, res) {
    try {
        const { id } = req.params;

        // Valida o ID do usuário
        if (!validateId(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const [userInfo] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

        if (userInfo.length === 0) return res.status(404).json({ message: 'User not found' });

        // Buscar as builds favoritas do usuário
        const [favoriteBuilds] = await db.query(
            'SELECT builds.* FROM favorite_builds JOIN builds ON favorite_builds.build_id = builds.id WHERE favorite_builds.user_id = ?',
            [id]
        );

        // Buscar componentes favoritos do usuário
        const [favoriteComponents] = await db.query(
            'SELECT component_type, component_id FROM favorite_components WHERE user_id = ?',
            [id]
        );

        // Montar o perfil do usuário com dados e favoritos
        res.json({
            user: userInfo[0],
            favoriteBuilds,
            favoriteComponents,
        });
    } catch (error) {
        handleError(res, error);
    }
}
