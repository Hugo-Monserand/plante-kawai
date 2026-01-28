/**
 * ShopController - Contrôleur du magasin
 */
(function() {
    'use strict';

    KP.Features.Shop = KP.Features.Shop || {};

    KP.Features.Shop.Controller = {
        /**
         * Ouvre le shop
         */
        open: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.open('shop', function() {
                KP.Features.Shop.render();
            });
            KP.emit('shop:opened');
        },

        /**
         * Ferme le shop
         */
        close: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.close('shop');
        },

        /**
         * Affiche les items
         */
        render: function() {
            KP.Features.Shop.Renderer.render();
        },

        /**
         * Achète un item
         * @param {Object} item - Item à acheter
         */
        buy: function(item) {
            var isDiamondItem = item.currency === 'diamond';

            // Vérifier et dépenser la monnaie
            if (isDiamondItem) {
                if (!KP.Features.Economy.Crystals.spend(item.price)) return;
            } else {
                if (!KP.Features.Economy.Money.spend(item.price)) return;
            }

            // Appliquer l'effet selon le type
            switch (item.type) {
                case 'boost':
                    KP.Features.Plant.Controller.activateBoost(item.duration);
                    break;

                case 'funnel':
                    KP.State.hasFunnel = true;
                    KP.State.ownedItems.push(item.id);
                    KP.Features.Meteors.Funnel.render();
                    break;

                case 'diamond_mine':
                    KP.State.diamondMines++;
                    KP.Features.Economy.Crystals.updateDisplay();
                    break;

                case 'pot':
                    KP.State.ownedItems.push(item.id);
                    KP.State.maxLevel += KP.Constants.LEVEL_INCREMENT_PER_POT;
                    KP.Features.Plant.Renderer._updateLevelDisplay();
                    this.equip(item);
                    break;

                default:
                    KP.State.ownedItems.push(item.id);
                    this.equip(item);
            }

            this.render();
            KP.save();
            KP.emit('item:purchased', { item: item });
        },

        /**
         * Équipe un item
         * @param {Object} item - Item à équiper
         */
        equip: function(item) {
            switch (item.type) {
                case 'pot':
                    KP.Features.Plant.Controller.equipPot(item.id);
                    break;

                case 'flower':
                    KP.Features.Plant.Controller.equipFlower(item.id);
                    break;
            }

            this.render();
            KP.save();
            KP.emit('item:equipped', { item: item });
        },

        /**
         * Initialise le shop
         */
        init: function() {
            var self = this;
            var shopBtn = document.getElementById('shopBtn');

            if (shopBtn) {
                shopBtn.addEventListener('click', function(e) {
                    self.open(e);
                });
            }
        }
    };

    // Alias pour accès simplifié
    KP.Features.Shop.open = KP.Features.Shop.Controller.open.bind(KP.Features.Shop.Controller);
    KP.Features.Shop.close = KP.Features.Shop.Controller.close.bind(KP.Features.Shop.Controller);
    KP.Features.Shop.render = KP.Features.Shop.Controller.render.bind(KP.Features.Shop.Controller);
    KP.Features.Shop.buy = KP.Features.Shop.Controller.buy.bind(KP.Features.Shop.Controller);
    KP.Features.Shop.equip = KP.Features.Shop.Controller.equip.bind(KP.Features.Shop.Controller);
})();
