/**
 * Quests - Définitions des quêtes disponibles
 * Chaque heure, 3 quêtes aléatoires sont sélectionnées
 */
(function() {
    'use strict';

    KP.Config.Quests = [
        {
            id: 'water_plant_5',
            name: 'Jardinier assidu',
            desc: 'Arrose ta plante 5 fois',
            icon: '💧',
            target: 5,
            trackKey: 'waterCount'
        },
        {
            id: 'water_plant_10',
            name: 'Maître arroseur',
            desc: 'Arrose ta plante 10 fois',
            icon: '🚿',
            target: 10,
            trackKey: 'waterCount'
        },
        {
            id: 'collect_meteors_3',
            name: 'Chasseur d\'étoiles',
            desc: 'Attrape 3 météorites',
            icon: '☄️',
            target: 3,
            trackKey: 'meteorCount'
        },
        {
            id: 'collect_meteors_5',
            name: 'Astronome amateur',
            desc: 'Attrape 5 météorites',
            icon: '🌠',
            target: 5,
            trackKey: 'meteorCount'
        },
        {
            id: 'collect_meteors_10',
            name: 'Maître des étoiles',
            desc: 'Attrape 10 météorites',
            icon: '⭐',
            target: 10,
            trackKey: 'meteorCount'
        },
        {
            id: 'earn_coins_500',
            name: 'Petit économe',
            desc: 'Gagne 500 pièces',
            icon: '💰',
            target: 500,
            trackKey: 'coinsEarned'
        },
        {
            id: 'earn_coins_1000',
            name: 'Banquier',
            desc: 'Gagne 1000 pièces',
            icon: '🏦',
            target: 1000,
            trackKey: 'coinsEarned'
        },
        {
            id: 'earn_coins_2500',
            name: 'Millionnaire en herbe',
            desc: 'Gagne 2500 pièces',
            icon: '💎',
            target: 2500,
            trackKey: 'coinsEarned'
        },
        {
            id: 'grow_levels_3',
            name: 'Pousse verte',
            desc: 'Fais grandir ta plante de 3 niveaux',
            icon: '🌱',
            target: 3,
            trackKey: 'levelsGrown'
        },
        {
            id: 'grow_levels_5',
            name: 'Croissance express',
            desc: 'Fais grandir ta plante de 5 niveaux',
            icon: '🌿',
            target: 5,
            trackKey: 'levelsGrown'
        },
        {
            id: 'water_garden_3',
            name: 'Ami des plantes',
            desc: 'Arrose 3 plantes du jardin',
            icon: '🪴',
            target: 3,
            trackKey: 'gardenWaterCount'
        },
        {
            id: 'click_anywhere_20',
            name: 'Cliqueur fou',
            desc: 'Clique 20 fois n\'importe où',
            icon: '👆',
            target: 20,
            trackKey: 'clickCount'
        },
        {
            id: 'click_anywhere_50',
            name: 'Doigts de feu',
            desc: 'Clique 50 fois n\'importe où',
            icon: '🔥',
            target: 50,
            trackKey: 'clickCount'
        },
        {
            id: 'open_shop',
            name: 'Lèche-vitrine',
            desc: 'Ouvre le magasin 3 fois',
            icon: '🛒',
            target: 3,
            trackKey: 'shopOpenCount'
        },
        {
            id: 'play_time_5',
            name: 'Joueur dévoué',
            desc: 'Joue pendant 5 minutes',
            icon: '⏰',
            target: 300,
            trackKey: 'sessionPlayTime'
        }
    ];

    // Récompense par quête complétée
    KP.Config.QuestReward = 100; // 100 diamants
})();
