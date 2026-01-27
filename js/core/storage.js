/**
 * Storage - Gestion de la persistance localStorage
 */
(function() {
    'use strict';

    var SAVE_KEY = 'kawaiPlantSave';

    KP.Core.Storage = {
        /**
         * Sauvegarde l'état du jeu dans localStorage
         */
        save: function() {
            try {
                var data = KP.State.toJSON();
                localStorage.setItem(SAVE_KEY, JSON.stringify(data));
                KP.emit('game:saved');
            } catch (e) {
                console.error('Erreur lors de la sauvegarde:', e);
            }
        },

        /**
         * Charge l'état du jeu depuis localStorage
         * @returns {boolean} true si une sauvegarde a été chargée
         */
        load: function() {
            try {
                var saveData = localStorage.getItem(SAVE_KEY);
                if (saveData) {
                    var data = JSON.parse(saveData);
                    KP.State.fromJSON(data);
                    KP.emit('game:loaded', data);
                    return true;
                }
            } catch (e) {
                console.error('Erreur lors du chargement:', e);
            }
            return false;
        },

        /**
         * Supprime la sauvegarde
         */
        clear: function() {
            try {
                localStorage.removeItem(SAVE_KEY);
                KP.emit('game:reset');
            } catch (e) {
                console.error('Erreur lors de la suppression:', e);
            }
        },

        /**
         * Vérifie si une sauvegarde existe
         * @returns {boolean}
         */
        exists: function() {
            return localStorage.getItem(SAVE_KEY) !== null;
        }
    };

    // Alias pour accès rapide
    KP.save = KP.Core.Storage.save.bind(KP.Core.Storage);
    KP.load = KP.Core.Storage.load.bind(KP.Core.Storage);
})();
