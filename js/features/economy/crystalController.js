/**
 * CrystalController - Gestion des cristaux/diamants
 */
(function() {
    'use strict';

    KP.Features.Economy = KP.Features.Economy || {};

    KP.Features.Economy.Crystals = {
        /**
         * Génère des diamants depuis les mines
         */
        generateFromMines: function() {
            if (KP.State.diamondMines > 0) {
                KP.State.crystals += KP.State.diamondMines;
                this.updateDisplay();
                KP.emit('crystals:changed', { amount: KP.State.crystals });
                KP.save();
            }
        },

        /**
         * Ajoute des cristaux
         * @param {number} amount - Montant à ajouter
         */
        add: function(amount) {
            KP.State.crystals += amount;
            this.updateDisplay();
            KP.emit('crystals:changed', { amount: KP.State.crystals });
        },

        /**
         * Dépense des cristaux
         * @param {number} amount - Montant à dépenser
         * @returns {boolean}
         */
        spend: function(amount) {
            if (KP.State.crystals < amount) return false;

            KP.State.crystals -= amount;
            this.updateDisplay();
            KP.emit('crystals:changed', { amount: KP.State.crystals });
            return true;
        },

        /**
         * Met à jour l'affichage des cristaux
         */
        updateDisplay: function() {
            var crystalAmount = document.getElementById('crystalAmount');
            var crystalRate = document.getElementById('crystalRate');

            if (crystalAmount) crystalAmount.textContent = KP.State.crystals;
            if (crystalRate) crystalRate.textContent = KP.State.diamondMines;
        },

        /**
         * Démarre la génération automatique depuis les mines
         */
        startGeneration: function() {
            var self = this;
            setInterval(function() {
                self.generateFromMines();
            }, KP.Constants.DIAMOND_GENERATION_INTERVAL);
        }
    };
})();
