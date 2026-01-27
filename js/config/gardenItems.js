/**
 * GardenItems - Données de la jardinerie
 */
(function() {
    'use strict';

    // Graines disponibles
    KP.Config.Seeds = [
        {
            id: 'seed_sunflower',
            name: 'Graine de Tournesol',
            desc: 'Une fleur qui suit le soleil',
            icon: '🌻',
            price: 3000,
            plantType: 'sunflower'
        },
        {
            id: 'seed_cactus',
            name: 'Graine de Cactus',
            desc: 'Un petit cactus mignon et résistant',
            icon: '🌵',
            price: 5000,
            plantType: 'cactus'
        },
        {
            id: 'seed_bamboo',
            name: 'Graine de Bambou',
            desc: 'Un bambou chanceux qui pousse vite',
            icon: '🎋',
            price: 8000,
            plantType: 'bamboo'
        }
    ];

    // Pots de jardin (emplacements supplémentaires)
    KP.Config.GardenPots = [
        {
            id: 'garden_pot_1',
            name: 'Pot de Jardin Simple',
            desc: 'Un emplacement pour une nouvelle plante',
            icon: '🪴',
            price: 2000,
            slotIndex: 1
        },
        {
            id: 'garden_pot_2',
            name: 'Pot de Jardin Fleuri',
            desc: 'Un joli pot décoré',
            icon: '🌷',
            price: 6000,
            slotIndex: 2
        },
        {
            id: 'garden_pot_3',
            name: 'Pot de Jardin Royal',
            desc: 'Le plus beau pot du jardin',
            icon: '👑',
            price: 15000,
            slotIndex: 3
        }
    ];

    // Informations sur les types de plantes
    KP.Config.PlantTypes = {
        sunflower: { name: 'Tournesol', icon: '🌻' },
        cactus: { name: 'Cactus', icon: '🌵' },
        bamboo: { name: 'Bambou', icon: '🎋' }
    };

    /**
     * Récupère les infos d'un type de plante
     * @param {string} plantType - Type de la plante
     * @returns {Object} - Infos de la plante
     */
    KP.Config.getPlantInfo = function(plantType) {
        return KP.Config.PlantTypes[plantType] || { name: 'Plante', icon: '🌱' };
    };
})();
