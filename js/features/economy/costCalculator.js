/**
 * CostCalculator - Calculs des coûts et taux
 */
(function() {
    'use strict';

    KP.Features.Economy = KP.Features.Economy || {};

    KP.Features.Economy.CostCalculator = {
        /**
         * Calcule le coût d'arrosage actuel
         * @returns {number} - Coût en Kawai Monnaie
         */
        getWateringCost: function() {
            // Le premier niveau est gratuit
            if (KP.State.growthLevel === 0) return 0;

            // Arrosage gratuit permanent après la première récolte
            if (KP.State.freeWateringUnlocked) return 0;

            var cost = Math.floor(
                KP.Constants.BASE_WATERING_COST *
                Math.pow(KP.Constants.WATERING_COST_MULTIPLIER, KP.State.growthLevel - 1)
            );
            return Math.min(cost, KP.Constants.MAX_WATERING_COST);
        },

        /**
         * Calcule le taux de génération de monnaie par seconde
         * @returns {number} - Taux de monnaie/seconde
         */
        getMoneyRate: function() {
            var rate = KP.State.growthLevel;

            // Ajouter les revenus des plantes du jardin
            KP.State.gardenSlots.forEach(function(slot) {
                if (slot.plant) {
                    rate += slot.level * KP.Constants.GARDEN_PLANT_MONEY_MULTIPLIER;
                }
            });

            // Appliquer le multiplicateur de la fleur équipée
            if (KP.State.equippedFlower) {
                var flowerItem = KP.Config.ShopItems.find(function(item) {
                    return item.id === KP.State.equippedFlower;
                });
                if (flowerItem && flowerItem.multiplier) {
                    rate *= flowerItem.multiplier;
                }
            }

            // Boost actif
            if (KP.State.activeBoost) {
                rate *= KP.Constants.BOOST_MULTIPLIER;
            }

            return rate;
        },

        /**
         * Calcule le taux de génération de diamants par 10 secondes
         * @returns {number}
         */
        getDiamondRate: function() {
            return KP.State.diamondMines;
        }
    };

    // Alias pour accès global
    KP.getWateringCost = KP.Features.Economy.CostCalculator.getWateringCost.bind(KP.Features.Economy.CostCalculator);
    KP.getMoneyRate = KP.Features.Economy.CostCalculator.getMoneyRate.bind(KP.Features.Economy.CostCalculator);
})();
