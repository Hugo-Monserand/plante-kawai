/**
 * Event Bus - Système Publish/Subscribe
 * Permet la communication découplée entre modules
 */
(function() {
    'use strict';

    const events = {};

    KP.Core.EventBus = {
        /**
         * S'abonner à un événement
         * @param {string} event - Nom de l'événement
         * @param {Function} callback - Fonction à appeler
         */
        on: function(event, callback) {
            if (!events[event]) {
                events[event] = [];
            }
            events[event].push(callback);
        },

        /**
         * Se désabonner d'un événement
         * @param {string} event - Nom de l'événement
         * @param {Function} callback - Fonction à retirer
         */
        off: function(event, callback) {
            if (!events[event]) return;
            events[event] = events[event].filter(function(cb) {
                return cb !== callback;
            });
        },

        /**
         * Émettre un événement
         * @param {string} event - Nom de l'événement
         * @param {*} data - Données à transmettre
         */
        emit: function(event, data) {
            if (!events[event]) return;
            events[event].forEach(function(callback) {
                try {
                    callback(data);
                } catch (e) {
                    console.error('EventBus error on event "' + event + '":', e);
                }
            });
        },

        /**
         * S'abonner à un événement une seule fois
         * @param {string} event - Nom de l'événement
         * @param {Function} callback - Fonction à appeler
         */
        once: function(event, callback) {
            var self = this;
            function wrapper(data) {
                self.off(event, wrapper);
                callback(data);
            }
            this.on(event, wrapper);
        }
    };

    // Alias pour faciliter l'accès
    KP.emit = KP.Core.EventBus.emit.bind(KP.Core.EventBus);
    KP.on = KP.Core.EventBus.on.bind(KP.Core.EventBus);
    KP.off = KP.Core.EventBus.off.bind(KP.Core.EventBus);
})();
