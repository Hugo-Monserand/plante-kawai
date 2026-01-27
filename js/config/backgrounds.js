/**
 * Backgrounds - Données des arrière-plans
 */
(function() {
    'use strict';

    KP.Config.Backgrounds = [
        {
            id: 'bg_default',
            name: 'Jardin Kawaii',
            desc: 'Le jardin original',
            icon: '🌸',
            price: 0,
            gradient: 'linear-gradient(180deg, #ffb7c5 0%, #ffc4d0 40%, #ffd8e0 55%, #fff5f7 70%, #c8e6c9 85%, #a5d6a7 100%)'
        },
        {
            id: 'bg_sunset',
            name: 'Coucher de Soleil',
            desc: 'Un ciel orangé magnifique',
            icon: '🌅',
            price: 50000,
            gradient: 'linear-gradient(180deg, #ff7043 0%, #ffab91 30%, #ffccbc 50%, #fff3e0 70%, #a5d6a7 85%, #81c784 100%)'
        },
        {
            id: 'bg_night',
            name: 'Nuit Étoilée',
            desc: 'Un ciel nocturne paisible',
            icon: '🌙',
            price: 75000,
            gradient: 'linear-gradient(180deg, #1a237e 0%, #283593 30%, #3949ab 50%, #5c6bc0 70%, #1b5e20 85%, #2e7d32 100%)'
        },
        {
            id: 'bg_ocean',
            name: 'Océan Tropical',
            desc: 'Une plage paradisiaque',
            icon: '🏝️',
            price: 100000,
            gradient: 'linear-gradient(180deg, #4fc3f7 0%, #81d4fa 30%, #b3e5fc 50%, #e1f5fe 70%, #fff59d 85%, #ffe082 100%)'
        },
        {
            id: 'bg_forest',
            name: 'Forêt Enchantée',
            desc: 'Une forêt magique',
            icon: '🌲',
            price: 150000,
            gradient: 'linear-gradient(180deg, #a5d6a7 0%, #81c784 30%, #66bb6a 50%, #4caf50 70%, #388e3c 85%, #2e7d32 100%)'
        },
        {
            id: 'bg_candy',
            name: 'Monde Bonbon',
            desc: 'Tout est sucré ici',
            icon: '🍭',
            price: 200000,
            gradient: 'linear-gradient(180deg, #f48fb1 0%, #f8bbd9 30%, #e1bee7 50%, #ce93d8 70%, #ba68c8 85%, #ab47bc 100%)'
        },
        {
            id: 'bg_aurora',
            name: 'Aurore Boréale',
            desc: 'Un spectacle magique',
            icon: '✨',
            price: 300000,
            gradient: 'linear-gradient(180deg, #0d47a1 0%, #1565c0 20%, #42a5f5 35%, #4db6ac 50%, #81c784 65%, #aed581 80%, #dce775 100%)'
        },
        {
            id: 'bg_sakura',
            name: 'Cerisiers en Fleurs',
            desc: 'Le printemps au Japon',
            icon: '🌸',
            price: 400000,
            gradient: 'linear-gradient(180deg, #fce4ec 0%, #f8bbd9 30%, #f48fb1 50%, #f06292 70%, #c8e6c9 85%, #a5d6a7 100%)'
        },
        {
            id: 'bg_rainbow',
            name: 'Arc-en-ciel',
            desc: 'Toutes les couleurs !',
            icon: '🌈',
            price: 750000,
            gradient: 'linear-gradient(180deg, #ef5350 0%, #ff7043 15%, #ffca28 30%, #66bb6a 45%, #42a5f5 60%, #5c6bc0 75%, #ab47bc 90%, #81c784 100%)'
        },
        {
            id: 'bg_galaxy',
            name: 'Galaxie',
            desc: 'Voyage dans l\'espace',
            icon: '🌌',
            price: 1500000,
            gradient: 'linear-gradient(180deg, #0d0221 0%, #1a0533 20%, #2d1b4e 35%, #4a1942 50%, #6b2d5c 65%, #1b5e20 85%, #2e7d32 100%)'
        }
    ];

    /**
     * Trouve un arrière-plan par son ID
     * @param {string} id - ID de l'arrière-plan
     * @returns {Object|null} - L'arrière-plan ou null
     */
    KP.Config.getBackground = function(id) {
        return KP.Config.Backgrounds.find(function(bg) {
            return bg.id === id;
        }) || null;
    };
})();
