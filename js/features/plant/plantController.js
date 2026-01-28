/**
 * PlantController - Contrôleur principal de la plante
 */
(function() {
    'use strict';

    KP.Features.Plant = KP.Features.Plant || {};

    KP.Features.Plant.Controller = {
        /**
         * Initialise le module plante
         */
        init: function() {
            KP.Features.Plant.Watering.init();
            KP.Features.Plant.Renderer.update();
        },

        /**
         * Récolte la plante (coupe et récupère des diamants)
         * @returns {number} - Nombre de diamants récoltés, ou 0 si impossible
         */
        harvest: function() {
            if (KP.State.growthLevel < KP.State.maxLevel) return 0;

            var reward = 10; // diamants

            // Animation de récolte
            var plant = document.getElementById('plant');
            if (plant) {
                plant.classList.add('harvesting');
            }

            // Réinitialiser la plante et donner la récompense
            setTimeout(function() {
                KP.State.crystals += reward;
                KP.State.growthLevel = 0;

                // Débloquer l'arrosage gratuit permanent après la première récolte
                KP.State.freeWateringUnlocked = true;
                KP.State.harvestCount++;

                if (plant) {
                    plant.classList.remove('harvesting');
                }

                KP.Features.Plant.Renderer.update();
                KP.Features.Economy.Crystals.updateDisplay();
                KP.Features.Economy.Money.updateWateringCostDisplay();
                KP.save();

                KP.emit('plant:harvested', { reward: reward });
                KP.UI.Notifications.showCenteredPopup('+' + reward + ' 💎');
            }, 300);

            return reward;
        },

        /**
         * Équipe un pot
         * @param {string} potId - ID du pot
         */
        equipPot: function(potId) {
            var potItem = KP.Config.ShopItems.find(function(i) {
                return i.id === potId;
            });

            if (potItem && potItem.type === 'pot') {
                KP.State.equippedPot = potId;
                KP.Features.Plant.Renderer.applyPotColor(potItem.color);
                KP.save();
            }
        },

        /**
         * Équipe une fleur
         * @param {string} flowerId - ID de la fleur
         */
        equipFlower: function(flowerId) {
            var flowerItem = KP.Config.ShopItems.find(function(i) {
                return i.id === flowerId;
            });

            if (flowerItem && flowerItem.type === 'flower') {
                KP.State.equippedFlower = flowerId;
                KP.Features.Plant.Renderer.applyFlowerColor(flowerItem.color);
                KP.save();
            }
        },

        /**
         * Active un boost temporaire
         * @param {number} duration - Durée en secondes
         */
        activateBoost: function(duration) {
            if (KP.State.activeBoost) {
                clearTimeout(KP.State.activeBoost);
            }

            KP.State.boostUsed = true;
            document.body.classList.add('boost-active');
            KP.Features.Economy.Money.updateDisplay();
            KP.save();

            KP.State.activeBoost = setTimeout(function() {
                KP.State.activeBoost = null;
                document.body.classList.remove('boost-active');
                KP.Features.Economy.Money.updateDisplay();
            }, duration * 1000);
        }
    };

    // Alias pour accès global
    KP.Features.Plant.harvest = KP.Features.Plant.Controller.harvest.bind(KP.Features.Plant.Controller);
})();
