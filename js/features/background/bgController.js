/**
 * BgController - Contrôleur des arrière-plans
 */
(function() {
    'use strict';

    KP.Features.Background = KP.Features.Background || {};

    KP.Features.Background.Controller = {
        /**
         * Ouvre la boutique des fonds
         */
        open: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.open('bg', function() {
                KP.Features.Background.renderShop();
            });
        },

        /**
         * Affiche la boutique des fonds
         */
        renderShop: function() {
            var container = document.getElementById('bgItems');
            var balance = document.getElementById('bgBalance');

            if (balance) balance.textContent = Math.floor(KP.State.kawaiMoney);
            if (!container) return;

            container.innerHTML = '';

            KP.Config.Backgrounds.forEach(function(bg) {
                var isOwned = KP.State.ownedBackgrounds.includes(bg.id);
                var canAfford = KP.State.kawaiMoney >= bg.price;
                var isEquipped = KP.State.equippedBackground === bg.id;

                var itemEl = document.createElement('div');
                itemEl.className = 'shop-item' + (isOwned ? ' owned' : '') + (!canAfford && !isOwned ? ' locked' : '') + (isEquipped ? ' equipped' : '');

                var buttonText, buttonClass, buttonDisabled;

                if (isOwned) {
                    if (isEquipped) {
                        buttonText = '✓ Équipé';
                        buttonClass = 'item-price equipped-btn';
                        buttonDisabled = true;
                    } else {
                        buttonText = 'Équiper';
                        buttonClass = 'item-price equip-btn';
                        buttonDisabled = false;
                    }
                } else {
                    buttonText = bg.price === 0 ? 'Gratuit' : '✿ ' + bg.price;
                    buttonClass = 'item-price';
                    buttonDisabled = !canAfford;
                }

                itemEl.innerHTML = [
                    '<div class="item-icon">' + bg.icon + '</div>',
                    '<div class="item-info">',
                    '    <div class="item-name">' + bg.name + '</div>',
                    '    <div class="item-desc">' + bg.desc + '</div>',
                    '</div>',
                    '<button class="' + buttonClass + '"' + (buttonDisabled ? ' disabled' : '') + '>' + buttonText + '</button>'
                ].join('');

                if (!buttonDisabled) {
                    itemEl.querySelector('button').onclick = function(e) {
                        e.stopPropagation();
                        if (isOwned) {
                            KP.Features.Background.equip(bg);
                        } else {
                            KP.Features.Background.buy(bg);
                        }
                    };
                }

                container.appendChild(itemEl);
            });
        },

        /**
         * Achète un fond
         * @param {Object} bg - Fond à acheter
         */
        buy: function(bg) {
            if (bg.price > 0 && !KP.Features.Economy.Money.spend(bg.price)) return;

            KP.State.ownedBackgrounds.push(bg.id);
            this.equip(bg);
        },

        /**
         * Équipe un fond
         * @param {Object} bg - Fond à équiper
         */
        equip: function(bg) {
            KP.State.equippedBackground = bg.id;

            var backgroundEl = document.querySelector('.background');
            if (backgroundEl) {
                backgroundEl.style.background = bg.gradient;
            }

            this.renderShop();
            KP.save();
        },

        /**
         * Applique le fond équipé
         */
        applyEquipped: function() {
            var bg = KP.Config.getBackground(KP.State.equippedBackground);
            if (bg) {
                var backgroundEl = document.querySelector('.background');
                if (backgroundEl) {
                    backgroundEl.style.background = bg.gradient;
                }
            }
        },

        /**
         * Initialise les arrière-plans
         */
        init: function() {
            var self = this;
            var bgBtn = document.getElementById('bgBtn');

            if (bgBtn) {
                bgBtn.addEventListener('click', function(e) {
                    self.open(e);
                });
            }

            this.applyEquipped();
        }
    };

    // Alias
    KP.Features.Background.open = KP.Features.Background.Controller.open.bind(KP.Features.Background.Controller);
    KP.Features.Background.renderShop = KP.Features.Background.Controller.renderShop.bind(KP.Features.Background.Controller);
    KP.Features.Background.buy = KP.Features.Background.Controller.buy.bind(KP.Features.Background.Controller);
    KP.Features.Background.equip = KP.Features.Background.Controller.equip.bind(KP.Features.Background.Controller);
})();
