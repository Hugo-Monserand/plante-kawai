/**
 * WateringSystem - Système d'arrosage
 */
(function() {
    'use strict';

    KP.Features.Plant = KP.Features.Plant || {};

    KP.Features.Plant.Watering = {
        /**
         * Anime l'arrosoir et les gouttes
         */
        animate: function() {
            var wateringCan = document.getElementById('wateringCan');
            var waterDrops = document.getElementById('waterDrops');

            if (wateringCan) wateringCan.classList.add('active');
            if (waterDrops) waterDrops.classList.add('active');

            setTimeout(function() {
                if (wateringCan) wateringCan.classList.remove('active');
                if (waterDrops) waterDrops.classList.remove('active');
            }, 1500);
        },

        /**
         * Tente d'arroser la plante
         * @param {Event} e - Événement de clic
         * @returns {boolean} - true si l'arrosage a réussi
         */
        water: function(e) {
            if (KP.State.growthLevel >= KP.State.maxLevel) return false;

            var cost = KP.Features.Economy.CostCalculator.getWateringCost();

            // Vérifier si l'utilisateur a assez d'argent
            if (KP.State.kawaiMoney < cost) {
                KP.UI.Notifications.showError(
                    'Pas assez de ✿ ! (' + cost + ' requis)',
                    e.clientX,
                    e.clientY
                );
                return false;
            }

            // Déduire le coût et augmenter le niveau
            KP.State.kawaiMoney -= cost;
            KP.State.growthLevel++;

            // Lancer l'animation
            this.animate();

            // Mettre à jour l'affichage après l'animation
            var self = this;
            setTimeout(function() {
                KP.Features.Plant.Renderer.update();
                KP.Features.Economy.Money.updateDisplay();
                KP.save();
                KP.emit('plant:grew', { level: KP.State.growthLevel });
            }, 800);

            return true;
        },

        /**
         * Initialise les événements d'arrosage
         */
        init: function() {
            var self = this;
            var mainPlant = document.querySelector('.main-plant');

            if (mainPlant) {
                mainPlant.addEventListener('click', function(e) {
                    e.stopPropagation();
                    self.water(e);
                });

                // Menu contextuel pour la récolte
                mainPlant.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    KP.UI.ContextMenu.showHarvestMenu(e.clientX, e.clientY);
                });
            }
        }
    };
})();
