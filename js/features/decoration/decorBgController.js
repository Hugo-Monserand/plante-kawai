/**
 * DecorBgController - Contrôleur des décors d'arrière-plan
 */
(function() {
    'use strict';

    KP.Features.Decoration = KP.Features.Decoration || {};

    KP.Features.Decoration.DecorBg = {
        /**
         * Ouvre la boutique décors
         */
        open: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.open('decor', function() {
                KP.Features.Decoration.DecorBg.renderShop();
            });
        },

        /**
         * Affiche la boutique décors
         */
        renderShop: function() {
            var container = document.getElementById('decorItems');
            var balance = document.getElementById('decorBalance');

            if (balance) balance.textContent = Math.floor(KP.State.kawaiMoney);
            if (!container) return;

            container.innerHTML = '';

            KP.Config.DecorBgItems.forEach(function(item) {
                var canAfford = KP.State.kawaiMoney >= item.price;

                var itemEl = document.createElement('div');
                itemEl.className = 'shop-item' + (!canAfford ? ' locked' : '');

                itemEl.innerHTML = [
                    '<div class="item-icon">' + item.emoji + '</div>',
                    '<div class="item-info">',
                    '    <div class="item-name">' + item.name + '</div>',
                    '    <div class="item-desc">Décor d\'arrière-plan</div>',
                    '</div>',
                    '<button class="item-price"' + (!canAfford ? ' disabled' : '') + '>✿ ' + item.price + '</button>'
                ].join('');

                if (canAfford) {
                    itemEl.querySelector('button').onclick = function(e) {
                        e.stopPropagation();
                        KP.Features.Decoration.DecorBg.buy(item);
                    };
                }

                container.appendChild(itemEl);
            });
        },

        /**
         * Achète un décor d'arrière-plan
         * @param {Object} item - Item à acheter
         */
        buy: function(item) {
            if (!KP.Features.Economy.Money.spend(item.price)) return;

            KP.State.placedDecorBgItems.push({
                type: item.id,
                x: window.innerWidth / 2 - 40,
                y: window.innerHeight / 2 - 40
            });

            this.renderShop();
            this.renderDecorBgItems();
            KP.save();
        },

        /**
         * Affiche les décors sur l'écran
         */
        renderDecorBgItems: function() {
            document.querySelectorAll('.decor-bg-item').forEach(function(el) {
                el.remove();
            });

            KP.State.placedDecorBgItems.forEach(function(placed, index) {
                var item = KP.Config.DecorBgItems.find(function(i) {
                    return i.id === placed.type;
                });
                if (!item) return;

                var decorEl = document.createElement('div');
                decorEl.className = 'decor-bg-item';
                decorEl.style.left = placed.x + 'px';
                decorEl.style.top = placed.y + 'px';

                // Appliquer rotation et scale
                var rotation = placed.rotation || 0;
                var scale = placed.scale || 1;
                decorEl.style.transform = 'rotate(' + rotation + 'deg) scale(' + scale + ')';

                decorEl.innerHTML = '<span class="decor-bg-emoji">' + item.emoji + '</span>';

                // Menu contextuel (clic droit)
                decorEl.oncontextmenu = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    KP.UI.ContextMenu.showDecoMenu(e.clientX, e.clientY, index, 'placedDecorBgItems');
                };

                // Drag and drop
                KP.UI.DragDrop.makeDecoDraggable(decorEl, index, 'placedDecorBgItems');

                document.body.appendChild(decorEl);
            });
        },

        /**
         * Initialise les décors d'arrière-plan
         */
        init: function() {
            var self = this;
            var decorBtn = document.getElementById('decorBtn');

            if (decorBtn) {
                decorBtn.addEventListener('click', function(e) {
                    self.open(e);
                });
            }

            this.renderDecorBgItems();
        }
    };

    // Alias pour accès depuis contextMenu
    KP.Features.Decoration.renderDecorBgItems = KP.Features.Decoration.DecorBg.renderDecorBgItems.bind(KP.Features.Decoration.DecorBg);
})();
