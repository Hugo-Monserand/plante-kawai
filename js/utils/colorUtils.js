/**
 * ColorUtils - Utilitaires pour la manipulation des couleurs
 */
(function() {
    'use strict';

    KP.Utils.Color = {
        /**
         * Éclaircit ou assombrit une couleur hex
         * @param {string} color - Couleur en format hex (#RRGGBB)
         * @param {number} amount - Valeur positive pour éclaircir, négative pour assombrir
         * @returns {string} - Nouvelle couleur en hex
         */
        adjust: function(color, amount) {
            var hex = color.replace('#', '');
            var r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
            var g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
            var b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
            return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
        },

        /**
         * Génère un gradient CSS à partir d'une couleur de base
         * @param {string} color - Couleur de base
         * @returns {string} - Gradient CSS
         */
        createPotGradient: function(color) {
            return 'linear-gradient(180deg, ' + color + ' 0%, ' + this.adjust(color, -20) + ' 30%, ' + this.adjust(color, -40) + ' 100%)';
        },

        /**
         * Récupère les couleurs pour un pot
         * @param {string} potId - ID du pot
         * @returns {Object} - Objet avec light, mid, dark
         */
        getPotColors: function(potId) {
            var defaultColor = { light: '#d4a574', mid: '#c49a6c', dark: '#a67c52' };

            if (!potId) return defaultColor;

            var pot = KP.Config.ShopItems.find(function(item) {
                return item.id === potId && item.type === 'pot';
            });

            if (!pot) return defaultColor;

            return {
                light: pot.color,
                mid: this.adjust(pot.color, -20),
                dark: this.adjust(pot.color, -40)
            };
        }
    };

    // Alias global pour compatibilité
    KP.adjustColor = KP.Utils.Color.adjust.bind(KP.Utils.Color);
})();
