/**
 * MeteorController - Gestion des météorites
 */
(function() {
    'use strict';

    KP.Features.Meteors = KP.Features.Meteors || {};

    KP.Features.Meteors.Controller = {
        spawnerInterval: null,

        /**
         * Fait apparaître une météorite
         */
        spawn: function() {
            var container = document.getElementById('meteorsContainer');
            if (!container) return;

            var emojis = KP.Constants.METEOR_EMOJIS;
            var emoji = emojis[Math.floor(Math.random() * emojis.length)];

            var meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.textContent = emoji;

            // Position aléatoire horizontale
            var x = Math.random() * (window.innerWidth - 50);
            meteor.style.left = x + 'px';
            meteor.style.top = '-50px';

            // Durée de chute aléatoire
            var duration = KP.Constants.METEOR_FALL_DURATION_MIN +
                Math.random() * (KP.Constants.METEOR_FALL_DURATION_MAX - KP.Constants.METEOR_FALL_DURATION_MIN);
            meteor.style.animationDuration = duration + 'ms';

            var self = this;

            // Clic pour collecter
            meteor.onclick = function(e) {
                e.stopPropagation();
                self.collect(meteor, e.clientX, e.clientY);
            };

            container.appendChild(meteor);

            // Vérification de collision avec l'entonnoir
            if (KP.State.hasFunnel) {
                this._checkFunnelCollision(meteor, duration);
            }

            // Supprimer après l'animation
            setTimeout(function() {
                if (meteor.parentNode) {
                    meteor.remove();
                }
            }, duration);
        },

        /**
         * Collecte une météorite
         * @param {HTMLElement} meteor - Élément météorite
         * @param {number} x - Position X du clic
         * @param {number} y - Position Y du clic
         */
        collect: function(meteor, x, y) {
            if (meteor.classList.contains('collected')) return;

            meteor.classList.add('collected');
            KP.State.crystals++;
            KP.State.meteorsCollected++;
            KP.Features.Economy.Crystals.updateDisplay();
            KP.save();

            // Émettre l'événement pour les quêtes
            KP.emit('meteor:collected');

            // Popup +1
            KP.UI.Notifications.showGain('+1 💎', x, y);

            setTimeout(function() {
                meteor.remove();
            }, 400);
        },

        /**
         * Vérifie la collision avec l'entonnoir
         * @private
         */
        _checkFunnelCollision: function(meteor, duration) {
            var self = this;
            var checkInterval = setInterval(function() {
                if (!meteor.parentNode || meteor.classList.contains('collected')) {
                    clearInterval(checkInterval);
                    return;
                }

                var meteorRect = meteor.getBoundingClientRect();
                var funnel = document.querySelector('.magic-funnel');
                if (!funnel) {
                    clearInterval(checkInterval);
                    return;
                }

                var funnelRect = funnel.getBoundingClientRect();

                // Vérifier la collision
                if (meteorRect.left < funnelRect.right &&
                    meteorRect.right > funnelRect.left &&
                    meteorRect.top < funnelRect.bottom &&
                    meteorRect.bottom > funnelRect.top) {

                    clearInterval(checkInterval);
                    self.collect(meteor, funnelRect.left + funnelRect.width / 2, funnelRect.top);

                    // Animation de l'entonnoir
                    funnel.classList.add('collecting');
                    setTimeout(function() {
                        funnel.classList.remove('collecting');
                    }, 300);
                }
            }, 100);

            // Arrêter la vérification après la durée
            setTimeout(function() {
                clearInterval(checkInterval);
            }, duration);
        },

        /**
         * Démarre le spawner de météorites
         */
        startSpawner: function() {
            var self = this;

            function scheduleNextMeteor() {
                var delay = KP.Constants.METEOR_SPAWN_INTERVAL_MIN +
                    Math.random() * (KP.Constants.METEOR_SPAWN_INTERVAL_MAX - KP.Constants.METEOR_SPAWN_INTERVAL_MIN);

                self.spawnerInterval = setTimeout(function() {
                    self.spawn();
                    scheduleNextMeteor();
                }, delay);
            }

            scheduleNextMeteor();
        },

        /**
         * Arrête le spawner
         */
        stopSpawner: function() {
            if (this.spawnerInterval) {
                clearTimeout(this.spawnerInterval);
                this.spawnerInterval = null;
            }
        },

        /**
         * Initialise les météorites
         */
        init: function() {
            this.startSpawner();
        }
    };
})();
