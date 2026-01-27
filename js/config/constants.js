/**
 * Constants - Constantes globales de l'application
 */
(function() {
    'use strict';

    KP.Config.Constants = {
        // === Arrosage ===
        BASE_WATERING_COST: 10,
        WATERING_COST_MULTIPLIER: 2,
        MAX_WATERING_COST: 100000,

        // === Niveaux ===
        DEFAULT_MAX_LEVEL: 10,
        LEVEL_INCREMENT_PER_POT: 10,

        // === Sauvegarde ===
        SAVE_KEY: 'kawaiPlantSave',
        AUTO_SAVE_INTERVAL: 60000, // 1 minute

        // === Génération de monnaie ===
        MONEY_GENERATION_INTERVAL: 1000, // 1 seconde

        // === Météorites ===
        METEOR_EMOJIS: ['☄️', '🌠', '💫', '⭐', '🔮'],
        METEOR_SPAWN_INTERVAL_MIN: 8000,
        METEOR_SPAWN_INTERVAL_MAX: 15000,
        METEOR_FALL_DURATION_MIN: 3000,
        METEOR_FALL_DURATION_MAX: 7000,

        // === Diamants ===
        DIAMOND_GENERATION_INTERVAL: 10000, // 10 secondes

        // === Boost ===
        DEFAULT_BOOST_DURATION: 30, // secondes
        BOOST_MULTIPLIER: 2,

        // === Jardin ===
        GARDEN_PLANT_MONEY_MULTIPLIER: 2,
        GARDEN_PLANT_MAX_LEVEL: 10,

        // === Temps de jeu ===
        PLAY_TIME_UPDATE_INTERVAL: 1000,

        // === Succès ===
        ACHIEVEMENT_CHECK_INTERVAL: 2000,
        ACHIEVEMENT_POPUP_DURATION: 4000
    };

    // Alias pour accès rapide
    KP.Constants = KP.Config.Constants;
})();
