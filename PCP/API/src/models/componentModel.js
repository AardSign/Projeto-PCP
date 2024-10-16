import db from '../config/db.js';

export const ComponentModel = {
    // Função para obter componentes de uma tabela específica
    getComponentsByType: async (type) => {
        let tableName;

        // Mapeia os tipos para as tabelas correspondentes
        switch (type) {
            case 'cpu':
                tableName = 'cpu';
                break;
            case 'motherboard':
                tableName = 'motherboard';
                break;
            case 'memory':
                tableName = 'memory';
                break;
            case 'internal_hard_drive':
                tableName = 'internal_hard_drive';
                break;
            case 'video_card':
                tableName = 'video_card';
                break;
            case 'pc_case':
                tableName = 'pc_case';
                break;
            case 'power_supply':
                tableName = 'power_supply';
                break;
            case 'os':
                tableName = 'os';
                break;
            default:
                throw new Error('Invalid component type');
        }

        const [components] = await db.query(`SELECT * FROM ${tableName}`);
        return components;
    },

    // Função para obter um componente específico pelo ID de sua tabela
    getComponentById: async (type, id) => {
        let tableName;

        switch (type) {
            case 'cpu':
                tableName = 'cpu';
                break;
            case 'motherboard':
                tableName = 'motherboard';
                break;
            case 'memory':
                tableName = 'memory';
                break;
            case 'internal_hard_drive':
                tableName = 'internal_hard_drive';
                break;
            case 'video_card':
                tableName = 'video_card';
                break;
            case 'pc_case':
                tableName = 'pc_case';
                break;
            case 'power_supply':
                tableName = 'power_supply';
                break;
            case 'os':
                tableName = 'os';
                break;
            default:
                throw new Error('Invalid component type');
        }

        const [component] = await db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
        return component.length > 0 ? component[0] : null;
    },

    // Função para pesquisar componentes pelo nome
    searchComponentByName: async (name) => {
        const searchResults = [];
        
        const tables = ['cpu', 'motherboard', 'memory', 'internal_hard_drive', 'video_card', 'pc_case', 'power_supply', 'os'];

        for (const table of tables) {
            const [components] = await db.query(`SELECT * FROM ${table} WHERE name LIKE ?`, [`%${name}%`]);
            searchResults.push(...components);
        }

        return searchResults;
    },
};
