/**
 * DecoController - Contrôleur des décorations
 */
(function() {
    'use strict';

    KP.Features.Decoration = KP.Features.Decoration || {};

    KP.Features.Decoration.Controller = {
        /**
         * Ouvre la boutique déco
         */
        open: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.open('deco', function() {
                KP.Features.Decoration.renderShop();
            });
        },

        /**
         * Affiche la boutique déco
         */
        renderShop: function() {
            var container = document.getElementById('decoItems');
            var balance = document.getElementById('decoBalance');
            var self = this;

            if (balance) balance.textContent = Math.floor(KP.State.kawaiMoney);
            if (!container) return;

            container.innerHTML = '';

            // Ajouter l'item secret si débloqué (en premier)
            if (KP.State.secretImageUnlocked) {
                var secretItem = {
                    id: 'secret_cat',
                    name: 'Chat Secret',
                    emoji: '<img class="deco-img" src="' + KP.Config.SecretImage + '" alt="Chat">',
                    price: 0,
                    isImage: true
                };

                var secretEl = document.createElement('div');
                secretEl.className = 'shop-item secret-item';

                secretEl.innerHTML = [
                    '<div class="item-icon">' + secretItem.emoji + '</div>',
                    '<div class="item-info">',
                    '    <div class="item-name secret-name">' + secretItem.name + '</div>',
                    '    <div class="item-desc">Ultra rare! Gratuit et illimité</div>',
                    '</div>',
                    '<button class="item-price secret-price">GRATUIT</button>'
                ].join('');

                secretEl.querySelector('button').onclick = function(e) {
                    e.stopPropagation();
                    self.buySecret(secretItem);
                };

                container.appendChild(secretEl);
            }

            KP.Config.DecoItems.forEach(function(item) {
                var canAfford = KP.State.kawaiMoney >= item.price;

                var itemEl = document.createElement('div');
                itemEl.className = 'shop-item' + (!canAfford ? ' locked' : '');

                itemEl.innerHTML = [
                    '<div class="item-icon">' + item.emoji + '</div>',
                    '<div class="item-info">',
                    '    <div class="item-name">' + item.name + '</div>',
                    '    <div class="item-desc">Déco déplaçable</div>',
                    '</div>',
                    '<button class="item-price"' + (!canAfford ? ' disabled' : '') + '>✿ ' + item.price + '</button>'
                ].join('');

                if (canAfford) {
                    itemEl.querySelector('button').onclick = function(e) {
                        e.stopPropagation();
                        KP.Features.Decoration.buy(item);
                    };
                }

                container.appendChild(itemEl);
            });
        },

        /**
         * Achète l'item secret (gratuit et illimité)
         */
        buySecret: function(item) {
            KP.State.placedDecoItems.push({
                type: item.id,
                x: window.innerWidth / 2 - 20,
                y: window.innerHeight / 2 - 20
            });

            this.renderDecoItems();
            KP.save();
        },

        /**
         * Achète une déco
         * @param {Object} item - Item à acheter
         */
        buy: function(item) {
            if (!KP.Features.Economy.Money.spend(item.price)) return;

            // Ajouter au milieu de l'écran
            KP.State.placedDecoItems.push({
                type: item.id,
                x: window.innerWidth / 2 - 20,
                y: window.innerHeight / 2 - 20
            });

            this.renderShop();
            this.renderDecoItems();
            KP.save();
        },

        /**
         * Affiche les décos sur l'écran
         */
        renderDecoItems: function() {
            // Supprimer les anciennes décos
            document.querySelectorAll('.deco-item').forEach(function(el) {
                el.remove();
            });

            KP.State.placedDecoItems.forEach(function(placed, index) {
                // Gérer l'item secret
                var item;
                var isSecretItem = placed.type === 'secret_cat';

                if (isSecretItem) {
                    item = {
                        id: 'secret_cat',
                        emoji: '<img class="deco-img secret-deco-img" src="' + KP.Config.SecretImage + '" alt="Chat">',
                        isImage: true
                    };
                } else {
                    item = KP.Config.DecoItems.find(function(i) {
                        return i.id === placed.type;
                    });
                }

                if (!item) return;

                var decoEl = document.createElement('div');
                decoEl.className = 'deco-item' + (isSecretItem ? ' secret-deco' : '');
                decoEl.style.left = placed.x + 'px';
                decoEl.style.top = placed.y + 'px';

                // Appliquer rotation et scale
                var rotation = placed.rotation || 0;
                var scale = placed.scale || 1;
                decoEl.style.transform = 'rotate(' + rotation + 'deg) scale(' + scale + ')';

                if (item.isImage) {
                    decoEl.innerHTML = item.emoji;
                } else {
                    decoEl.innerHTML = '<span class="deco-emoji">' + item.emoji + '</span>';
                }

                // Menu contextuel (clic droit)
                decoEl.oncontextmenu = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    KP.UI.ContextMenu.showDecoMenu(e.clientX, e.clientY, index, 'placedDecoItems');
                };

                // Drag and drop
                KP.UI.DragDrop.makeDecoDraggable(decoEl, index, 'placedDecoItems');

                document.body.appendChild(decoEl);
            });
        },

        /**
         * Initialise les décorations
         */
        init: function() {
            var self = this;
            var decoBtn = document.getElementById('decoBtn');

            if (decoBtn) {
                decoBtn.addEventListener('click', function(e) {
                    self.open(e);
                });
            }

            this.renderDecoItems();
        }
    };

    // Alias
    KP.Features.Decoration.open = KP.Features.Decoration.Controller.open.bind(KP.Features.Decoration.Controller);
    KP.Features.Decoration.renderShop = KP.Features.Decoration.Controller.renderShop.bind(KP.Features.Decoration.Controller);
    KP.Features.Decoration.buy = KP.Features.Decoration.Controller.buy.bind(KP.Features.Decoration.Controller);
    KP.Features.Decoration.renderDecoItems = KP.Features.Decoration.Controller.renderDecoItems.bind(KP.Features.Decoration.Controller);
})();
