/**
 * GardenController - Contrôleur de la jardinerie
 */
(function() {
    'use strict';

    KP.Features.Garden = KP.Features.Garden || {};

    KP.Features.Garden.Controller = {
        /**
         * Ouvre la jardinerie
         */
        open: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.open('garden', function() {
                KP.Features.Garden.render();
            });
        },

        /**
         * Ferme la jardinerie
         */
        close: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.close('garden');
        },

        /**
         * Affiche la jardinerie
         */
        render: function() {
            KP.Features.Garden.Renderer.render();
        },

        /**
         * Achète une graine
         * @param {Object} seed - Graine à acheter
         */
        buySeed: function(seed) {
            if (!KP.Features.Economy.Money.spend(seed.price)) return;

            KP.State.ownedSeeds.push(seed.id);
            this.render();
            KP.save();
        },

        /**
         * Achète un pot de jardin (nouvel emplacement)
         * @param {Object} pot - Pot à acheter
         */
        buyGardenPot: function(pot) {
            if (!KP.Features.Economy.Money.spend(pot.price)) return;

            KP.State.gardenSlots.push({ unlocked: true, plant: null, level: 0 });
            this.render();
            KP.Features.Garden.Renderer.renderSidePlants();
            KP.save();
        },

        /**
         * Plante une graine dans un emplacement
         * @param {number} slotIndex - Index de l'emplacement
         * @param {string} plantType - Type de plante
         */
        plantSeed: function(slotIndex, plantType) {
            if (KP.State.gardenSlots[slotIndex] && !KP.State.gardenSlots[slotIndex].plant) {
                KP.State.gardenSlots[slotIndex].plant = plantType;
                KP.State.gardenSlots[slotIndex].level = 1;

                this.render();
                KP.Features.Garden.Renderer.renderSidePlants();
                KP.save();
            }
        },

        /**
         * Arrose une plante du jardin
         * @param {number} slotIndex - Index de l'emplacement
         */
        waterPlant: function(slotIndex) {
            var slot = KP.State.gardenSlots[slotIndex];
            if (slot && slot.plant && slot.level < 10) {
                slot.level++;

                this.render();
                KP.Features.Garden.Renderer.renderSidePlants();
                KP.save();
                KP.emit('garden:watered');
            }
        },

        /**
         * Change le pot d'une plante du jardin
         * @param {number} slotIndex - Index de l'emplacement
         * @param {string|null} potId - ID du pot (ou null pour défaut)
         */
        changePlantPot: function(slotIndex, potId) {
            KP.State.gardenSlots[slotIndex].equippedPot = potId || null;
            KP.Features.Garden.Renderer.renderSidePlants();
            KP.save();
        },

        /**
         * Initialise la jardinerie
         */
        init: function() {
            var self = this;
            var gardenBtn = document.getElementById('gardenBtn');

            if (gardenBtn) {
                gardenBtn.addEventListener('click', function(e) {
                    self.open(e);
                });
            }

            // Afficher les plantes secondaires
            KP.Features.Garden.Renderer.renderSidePlants();
        }
    };

    // Alias pour accès simplifié
    KP.Features.Garden.open = KP.Features.Garden.Controller.open.bind(KP.Features.Garden.Controller);
    KP.Features.Garden.close = KP.Features.Garden.Controller.close.bind(KP.Features.Garden.Controller);
    KP.Features.Garden.render = KP.Features.Garden.Controller.render.bind(KP.Features.Garden.Controller);
    KP.Features.Garden.buySeed = KP.Features.Garden.Controller.buySeed.bind(KP.Features.Garden.Controller);
    KP.Features.Garden.buyGardenPot = KP.Features.Garden.Controller.buyGardenPot.bind(KP.Features.Garden.Controller);
    KP.Features.Garden.plantSeed = KP.Features.Garden.Controller.plantSeed.bind(KP.Features.Garden.Controller);
    KP.Features.Garden.waterPlant = KP.Features.Garden.Controller.waterPlant.bind(KP.Features.Garden.Controller);
    KP.Features.Garden.changePlantPot = KP.Features.Garden.Controller.changePlantPot.bind(KP.Features.Garden.Controller);
})();
