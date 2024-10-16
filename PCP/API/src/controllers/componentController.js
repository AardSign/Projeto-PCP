import { ComponentModel } from '../models/componentModel.js';

// Função para listar componentes por tipo
export async function getComponentsByType(req, res) {
    try {
        const { type } = req.params; // Obter o tipo de componente da URL
        const components = await ComponentModel.getComponentsByType(type);

        if (components.length === 0) return res.status(404).json({ message: 'No components found for this type' });

        res.json(components);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para obter um componente específico pelo ID
export async function getComponentById(req, res) {
    try {
        const { type, id } = req.params; // Obter o tipo e o ID da URL
        const component = await ComponentModel.getComponentById(type, id);

        if (!component) return res.status(404).json({ message: 'Component not found' });

        res.json(component);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para buscar um componente pelo nome
export async function searchComponent(req, res) {
    try {
        const { name } = req.query; // Obtendo o nome da query
        const components = await ComponentModel.searchComponentByName(name);
        
        if (components.length === 0) return res.status(404).json({ message: 'No components found' });

        res.json(components);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
