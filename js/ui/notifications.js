/**
 * Notifications - Système de notifications et popups
 */
(function() {
    'use strict';

    KP.UI.Notifications = {
        /**
         * Affiche un popup flottant temporaire
         * @param {string} text - Texte à afficher
         * @param {number} x - Position X
         * @param {number} y - Position Y
         * @param {Object} options - Options {color, duration, fontSize}
         */
        showPopup: function(text, x, y, options) {
            options = options || {};

            var popup = document.createElement('div');
            popup.className = 'crystal-popup';
            popup.textContent = text;
            popup.style.left = x + 'px';
            popup.style.top = y + 'px';

            if (options.color) popup.style.color = options.color;
            if (options.fontSize) popup.style.fontSize = options.fontSize;

            document.body.appendChild(popup);

            setTimeout(function() {
                popup.remove();
            }, options.duration || 1000);
        },

        /**
         * Affiche un popup centré sur l'écran
         * @param {string} text - Texte à afficher
         * @param {Object} options - Options
         */
        showCenteredPopup: function(text, options) {
            options = options || {};

            var popup = document.createElement('div');
            popup.className = 'crystal-popup';
            popup.textContent = text;
            popup.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; z-index: 9999;';

            if (options.color) popup.style.color = options.color;

            document.body.appendChild(popup);

            setTimeout(function() {
                popup.remove();
            }, options.duration || 2000);
        },

        /**
         * Affiche une notification de succès débloqué
         * @param {Object} achievement - Données du succès
         */
        showAchievement: function(achievement) {
            var popup = document.createElement('div');
            popup.className = 'achievement-popup';
            popup.innerHTML = [
                '<div class="achievement-popup-icon">' + achievement.icon + '</div>',
                '<div class="achievement-popup-text">',
                '    <div class="achievement-popup-title">Succès débloqué !</div>',
                '    <div class="achievement-popup-name">' + achievement.name + '</div>',
                '</div>'
            ].join('');

            popup.style.cursor = 'pointer';
            popup.addEventListener('click', function() {
                popup.classList.remove('show');
                setTimeout(function() {
                    popup.remove();
                }, 500);
                KP.Features.Achievements.open();
            });

            document.body.appendChild(popup);

            // Animation d'entrée
            setTimeout(function() {
                popup.classList.add('show');
            }, 100);

            // Animation de sortie
            setTimeout(function() {
                popup.classList.remove('show');
                setTimeout(function() {
                    popup.remove();
                }, 500);
            }, 3000);
        },

        /**
         * Affiche un message d'erreur (pas assez d'argent, etc.)
         * @param {string} message - Message
         * @param {number} x - Position X
         * @param {number} y - Position Y
         */
        showError: function(message, x, y) {
            this.showPopup(message, x, y, { color: '#ff5252' });
        },

        /**
         * Affiche un message de gain
         * @param {string} text - Texte (ex: "+100 💎")
         * @param {number} x - Position X
         * @param {number} y - Position Y
         */
        showGain: function(text, x, y) {
            this.showPopup(text, x, y, { color: '#7c4dff' });
        }
    };
})();
