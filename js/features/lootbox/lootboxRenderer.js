/**
 * LootboxRenderer - Affichage du magasin de lootbox
 */
(function() {
    'use strict';

    KP.Features.Lootbox = KP.Features.Lootbox || {};

    KP.Features.Lootbox.Renderer = {
        /**
         * Rendu complet du magasin
         */
        render: function() {
            var container = document.getElementById('lootboxItems');
            var balanceEl = document.getElementById('lootboxBalance');

            if (!container) return;

            // Mettre à jour le solde
            if (balanceEl) {
                balanceEl.textContent = KP.State.crystals;
            }

            // Vider le conteneur
            container.innerHTML = '';

            // Afficher chaque lootbox
            var self = this;
            KP.Config.LootboxItems.forEach(function(lootbox) {
                var canAfford = KP.State.crystals >= lootbox.price;
                var itemEl = self._createLootboxElement(lootbox, canAfford);
                container.appendChild(itemEl);
            });
        },

        /**
         * Crée l'élément DOM d'une lootbox
         * @private
         */
        _createLootboxElement: function(lootbox, canAfford) {
            var itemEl = document.createElement('div');
            itemEl.className = 'shop-item lootbox-item lootbox-' + lootbox.rarity;

            if (!canAfford) {
                itemEl.classList.add('locked');
            }

            // Construire le HTML
            itemEl.innerHTML = [
                '<div class="lootbox-glow" style="background: ' + lootbox.color + '"></div>',
                '<div class="item-icon lootbox-icon" style="color: ' + lootbox.color + '">' + lootbox.icon + '</div>',
                '<div class="item-info">',
                '    <div class="item-name">' + lootbox.name + '</div>',
                '    <div class="item-desc">' + lootbox.desc + '</div>',
                '    <div class="lootbox-rewards">',
                this._getRewardsPreview(lootbox),
                '    </div>',
                '</div>',
                '<button class="item-price lootbox-price"' + (!canAfford ? ' disabled' : '') + '>',
                '    💎 ' + this._formatPrice(lootbox.price),
                '</button>'
            ].join('');

            // Ajouter l'event listener si on peut acheter
            if (canAfford) {
                var buyBtn = itemEl.querySelector('button');
                buyBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    KP.Features.Lootbox.buy(lootbox);
                });
            }

            return itemEl;
        },

        /**
         * Génère l'aperçu des récompenses possibles
         * @private
         */
        _getRewardsPreview: function(lootbox) {
            var icons = [];
            var seen = {};

            lootbox.rewards.forEach(function(reward) {
                var icon = '';
                switch (reward.type) {
                    case 'money':
                    case 'jackpot_money':
                        icon = '✿';
                        break;
                    case 'crystals':
                        icon = '💎';
                        break;
                    case 'boost':
                        icon = '⚡';
                        break;
                    case 'diamond_mine':
                    case 'multi_diamond_mine':
                        icon = '⛏️';
                        break;
                }
                if (icon && !seen[icon]) {
                    icons.push(icon);
                    seen[icon] = true;
                }
            });

            return '<span class="reward-icons">' + icons.join(' ') + '</span>';
        },

        /**
         * Formate le prix avec des espaces
         * @private
         */
        _formatPrice: function(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }
    };
})();
