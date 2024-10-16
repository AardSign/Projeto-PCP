import db from '../config/db.js';

// Função para criar uma nova build
export async function createBuild(req, res) {
    try {
        const { userId, buildName, cpuId, motherboardId, memoryId, internalHardDriveId, videoCardId, pcCaseId, powerSupplyId, osId, ...optionalComponents } = req.body;

        // Insere a build na tabela builds
        const [result] = await db.query(
            'INSERT INTO builds (user_id, build_name, cpu_id, motherboard_id, memory_id, internal_hard_drive_id, video_card_id, pc_case_id, power_supply_id, os_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, buildName, cpuId, motherboardId, memoryId, internalHardDriveId, videoCardId, pcCaseId, powerSupplyId, osId]
        );

        const buildId = result.insertId;

        // Inserir componentes opcionais na tabela correspondente
        for (const [componentType, componentId] of Object.entries(optionalComponents)) {
            await db.query(
                'INSERT INTO optional_components (build_id, component_type, component_id) VALUES (?, ?, ?)',
                [buildId, componentType, componentId]
            );
        }

        res.status(201).json({ message: 'Build created successfully', buildId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para obter todas as builds
export async function getAllBuilds(req, res) {
    try {
        const [builds] = await db.query('SELECT * FROM builds');
        res.json(builds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para obter todas as builds de um usuário
export async function getUserBuilds(req, res) {
    try {
        const { userId } = req.params; // Mudança: obtenha o userId dos parâmetros da requisição

        const [builds] = await db.query('SELECT * FROM builds WHERE user_id = ?', [userId]);

        if (builds.length === 0) return res.status(404).json({ message: 'No builds found for this user' });

        res.json(builds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para obter uma build específica pelo ID
export async function getBuildById(req, res) {
    try {
        const { id } = req.params; // Extraindo o ID dos parâmetros

        const [build] = await db.query('SELECT * FROM builds WHERE id = ?', [id]);

        if (build.length === 0) return res.status(404).json({ message: 'Build not found' });

        res.json(build[0]); // Retorna apenas a primeira build
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para deletar uma build
export async function deleteBuild(req, res) {
    try {
        const { id } = req.params; // Extraindo o ID dos parâmetros

        const result = await db.query('DELETE FROM builds WHERE id = ?', [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Build not found' });

        res.json({ message: 'Build deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
