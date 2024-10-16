import db from '../config/db.js';

export const BuildModel = {
    createBuild: async (buildData) => {
        const { userId, buildName, cpuId, motherboardId, memoryId, internalHardDriveId, videoCardId, pcCaseId, powerSupplyId, osId } = buildData;

        // Insere a build na tabela builds
        const [result] = await db.query(
            'INSERT INTO builds (user_id, build_name, cpu_id, motherboard_id, memory_id, internal_hard_drive_id, video_card_id, pc_case_id, power_supply_id, os_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, buildName, cpuId, motherboardId, memoryId, internalHardDriveId, videoCardId, pcCaseId, powerSupplyId, osId]
        );

        return result.insertId;
    },

    getAllBuilds: async () => {
        const [builds] = await db.query('SELECT * FROM builds');
        return builds;
    },

    getUserBuilds: async (userId) => {
        const [builds] = await db.query('SELECT * FROM builds WHERE user_id = ?', [userId]);
        return builds;
    },

    getBuildById: async (id) => {
        const [build] = await db.query('SELECT * FROM builds WHERE id = ?', [id]);
        return build.length > 0 ? build[0] : null;
    },

    updateBuild: async (id, buildData) => {
        const { buildName, cpuId, motherboardId, memoryId, internalHardDriveId, videoCardId, pcCaseId, powerSupplyId, osId } = buildData;

        await db.query(
            'UPDATE builds SET build_name = ?, cpu_id = ?, motherboard_id = ?, memory_id = ?, internal_hard_drive_id = ?, video_card_id = ?, pc_case_id = ?, power_supply_id = ?, os_id = ? WHERE id = ?',
            [buildName, cpuId, motherboardId, memoryId, internalHardDriveId, videoCardId, pcCaseId, powerSupplyId, osId, id]
        );
    },

    deleteBuild: async (id) => {
        await db.query('DELETE FROM builds WHERE id = ?', [id]);
    },
};
