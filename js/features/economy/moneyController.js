/**
 * MoneyController - Gestion de la monnaie Kawai
 */
(function() {
    'use strict';

    KP.Features.Economy = KP.Features.Economy || {};

    KP.Features.Economy.Money = {
        /**
         * Génère la monnaie (appelé toutes les secondes)
         */
        generate: function() {
            var rate = KP.Features.Economy.CostCalculator.getMoneyRate();
            KP.State.kawaiMoney += rate;

            this.updateDisplay();
            KP.emit('money:changed', { amount: KP.State.kawaiMoney, rate: rate });
            KP.emit('money:earned', { amount: rate });
        },

        /**
         * Dépense de la monnaie
         * @param {number} amount - Montant à dépenser
         * @returns {boolean} - true si la transaction a réussi
         */
        spend: function(amount) {
            if (KP.State.kawaiMoney < amount) return false;

            KP.State.kawaiMoney -= amount;
            this.updateDisplay();
            KP.emit('money:changed', { amount: KP.State.kawaiMoney });
            return true;
        },

        /**
         * Ajoute de la monnaie
         * @param {number} amount - Montant à ajouter
         */
        add: function(amount) {
            KP.State.kawaiMoney += amount;
            this.updateDisplay();
            KP.emit('money:changed', { amount: KP.State.kawaiMoney });
        },

        /**
         * Met à jour l'affichage de la monnaie
         */
        updateDisplay: function() {
            var moneyAmount = document.getElementById('moneyAmount');
            var moneyRate = document.getElementById('moneyRate');
            var shopBalance = document.getElementById('shopBalance');
            var gardenBalance = document.getElementById('gardenBalance');
            var decoBalance = document.getElementById('decoBalance');
            var bgBalance = document.getElementById('bgBalance');
            var decorBalance = document.getElementById('decorBalance');

            var amount = Math.floor(KP.State.kawaiMoney);
            var rate = KP.Features.Economy.CostCalculator.getMoneyRate();

            if (moneyAmount) moneyAmount.textContent = amount;
            if (moneyRate) moneyRate.textContent = rate;
            if (shopBalance) shopBalance.textContent = amount;
            if (gardenBalance) gardenBalance.textContent = amount;
            if (decoBalance) decoBalance.textContent = amount;
            if (bgBalance) bgBalance.textContent = amount;
            if (decorBalance) decorBalance.textContent = amount;

            // Mettre à jour l'affichage du coût d'arrosage
            KP.Features.Economy.Money.updateWateringCostDisplay();
        },

        /**
         * Met à jour l'affichage du coût d'arrosage
         */
        updateWateringCostDisplay: function() {
            var display = document.getElementById('wateringCostDisplay');
            var amount = document.getElementById('wateringCostAmount');
            var cost = KP.Features.Economy.CostCalculator.getWateringCost();

            if (!display || !amount) return;

            // Masquer si niveau max atteint ou arrosage gratuit permanent débloqué
            if (KP.State.growthLevel >= KP.State.maxLevel || KP.State.freeWateringUnlocked) {
                display.style.display = 'none';
            } else {
                display.style.display = 'flex';
                amount.textContent = cost;

                if (KP.State.kawaiMoney < cost) {
                    display.classList.add('cannot-afford');
                } else {
                    display.classList.remove('cannot-afford');
                }
            }
        },

        /**
         * Démarre la génération automatique de monnaie
         */
        startGeneration: function() {
            var self = this;
            setInterval(function() {
                self.generate();
                KP.save();

                // Mettre à jour le shop si ouvert
                if (KP.UI.Modal.isOpen('shop')) {
                    KP.Features.Shop.render();
                }
            }, KP.Constants.MONEY_GENERATION_INTERVAL);
        }
    };
})();
