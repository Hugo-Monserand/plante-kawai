/**
 * ShopRenderer - Affichage du magasin
 */
(function() {
    'use strict';

    KP.Features.Shop = KP.Features.Shop || {};

    KP.Features.Shop.Renderer = {
        /**
         * Affiche tous les items du shop
         */
        render: function() {
            var container = document.getElementById('shopItems');
            if (!container) return;

            container.innerHTML = '';

            KP.Config.ShopItems.forEach(function(item) {
                var itemEl = this._createItemElement(item);
                container.appendChild(itemEl);
            }, this);
        },

        /**
         * Crée l'élément HTML d'un item
         * @private
         */
        _createItemElement: function(item) {
            var isOwned = KP.State.ownedItems.includes(item.id);
            var isDiamondItem = item.currency === 'diamond';
            var canAfford = isDiamondItem ? KP.State.crystals >= item.price : KP.State.kawaiMoney >= item.price;
            var isEquipped = (item.type === 'pot' && KP.State.equippedPot === item.id) ||
                            (item.type === 'flower' && KP.State.equippedFlower === item.id);
            var isStackable = item.type === 'diamond_mine';

            var itemEl = document.createElement('div');
            itemEl.className = 'shop-item';
            if (isOwned && !isStackable) itemEl.classList.add('owned');
            if (!canAfford && !isOwned) itemEl.classList.add('locked');
            if (isEquipped) itemEl.classList.add('equipped');

            var buttonText = isDiamondItem ? '💎 ' + item.price : '✿ ' + item.price;
            var buttonClass = 'item-price';
            var buttonDisabled = false;

            var itemNameSuffix = '';
            if (isStackable && KP.State.diamondMines > 0) {
                itemNameSuffix = ' (x' + KP.State.diamondMines + ')';
            }

            if (isOwned && item.type !== 'boost' && !isStackable) {
                if (isEquipped) {
                    buttonText = '✓ Équipé';
                    buttonClass += ' equipped-btn';
                    buttonDisabled = true;
                } else {
                    buttonText = 'Équiper';
                    buttonClass += ' equip-btn';
                }
            } else if (!canAfford && !isOwned && !isStackable) {
                buttonDisabled = true;
            } else if (isStackable && !canAfford) {
                buttonDisabled = true;
            }

            itemEl.innerHTML = [
                '<div class="item-icon">' + item.icon + '</div>',
                '<div class="item-info">',
                '    <div class="item-name">' + item.name + itemNameSuffix + '</div>',
                '    <div class="item-desc">' + item.desc + '</div>',
                '</div>',
                '<button class="' + buttonClass + '"' + (buttonDisabled ? ' disabled' : '') + '>',
                '    ' + buttonText,
                '</button>'
            ].join('');

            var buyBtn = itemEl.querySelector('button');
            var self = this;

            if (!buttonDisabled) {
                if (isOwned && item.type !== 'boost' && !isStackable) {
                    buyBtn.onclick = function(e) {
                        e.stopPropagation();
                        KP.Features.Shop.equip(item);
                    };
                } else if (canAfford) {
                    buyBtn.onclick = function(e) {
                        e.stopPropagation();
                        KP.Features.Shop.buy(item);
                    };
                }
            }

            return itemEl;
        }
    };
})();
