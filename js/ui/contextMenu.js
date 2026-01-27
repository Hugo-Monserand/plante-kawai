/**
 * ContextMenu - Gestion des menus contextuels
 */
(function() {
    'use strict';

    KP.UI.ContextMenu = {
        currentMenu: null,

        /**
         * Affiche un menu contextuel
         * @param {number} x - Position X
         * @param {number} y - Position Y
         * @param {Array} items - Items du menu [{label, icon, onClick, active, disabled, keepOpen}]
         */
        show: function(x, y, items) {
            // Fermer l'ancien menu s'il existe
            this.close();

            // Créer le menu
            var menu = document.createElement('div');
            menu.className = 'pot-context-menu';
            menu.style.left = x + 'px';
            menu.style.top = y + 'px';

            var self = this;

            items.forEach(function(item) {
                var menuItem = document.createElement('div');
                menuItem.className = 'pot-menu-item';

                if (item.active) menuItem.classList.add('active');
                if (item.disabled) menuItem.classList.add('disabled');

                menuItem.innerHTML = (item.icon ? item.icon + ' ' : '') + item.label;

                if (!item.disabled && item.onClick) {
                    menuItem.addEventListener('click', function(e) {
                        e.stopPropagation();
                        item.onClick();
                        // Ne fermer que si keepOpen n'est pas défini
                        if (!item.keepOpen) {
                            self.close();
                        }
                    });
                }

                menu.appendChild(menuItem);
            });

            document.body.appendChild(menu);
            this.currentMenu = menu;

            // Fermer au clic ailleurs
            var closeHandler = function(e) {
                // Ne pas fermer si on clique sur le menu lui-même
                if (menu.contains(e.target)) return;
                self.close();
                document.removeEventListener('click', closeHandler);
            };

            setTimeout(function() {
                document.addEventListener('click', closeHandler);
            }, 10);
        },

        /**
         * Ferme le menu contextuel actif
         */
        close: function() {
            if (this.currentMenu) {
                this.currentMenu.remove();
                this.currentMenu = null;
            }
        },

        /**
         * Affiche le menu de changement de pot pour une plante du jardin
         * @param {number} x - Position X
         * @param {number} y - Position Y
         * @param {number} slotIndex - Index du slot
         * @param {string} currentPot - ID du pot actuel
         */
        showPotMenu: function(x, y, slotIndex, currentPot) {
            var items = [];

            // Option par défaut
            items.push({
                icon: '🪴',
                label: 'Pot par défaut',
                active: !currentPot,
                onClick: function() {
                    KP.Features.Garden.changePlantPot(slotIndex, null);
                }
            });

            // Pots achetés
            var ownedPots = KP.State.ownedItems.filter(function(itemId) {
                var item = KP.Config.ShopItems.find(function(i) { return i.id === itemId; });
                return item && item.type === 'pot';
            });

            ownedPots.forEach(function(potId) {
                var pot = KP.Config.ShopItems.find(function(i) { return i.id === potId; });
                items.push({
                    icon: '<span style="color: ' + pot.color + '">●</span>',
                    label: pot.name,
                    active: currentPot === potId,
                    onClick: function() {
                        KP.Features.Garden.changePlantPot(slotIndex, potId);
                    }
                });
            });

            if (ownedPots.length === 0) {
                items.push({
                    label: 'Achète des pots dans le Shop !',
                    disabled: true
                });
            }

            this.show(x, y, items);
        },

        /**
         * Affiche le menu de récolte pour la plante principale
         * @param {number} x - Position X
         * @param {number} y - Position Y
         */
        showHarvestMenu: function(x, y) {
            var items = [];

            if (KP.State.growthLevel >= KP.State.maxLevel) {
                items.push({
                    icon: '✂️',
                    label: 'Couper la plante (+10💎)',
                    onClick: function() {
                        KP.Features.Plant.harvest();
                    }
                });
            } else {
                items.push({
                    icon: '🌱',
                    label: 'Plante pas assez grande',
                    disabled: true
                });
            }

            this.show(x, y, items);
        },

        /**
         * Affiche le menu pour gérer une déco (rotation, scale, suppression)
         * @param {number} x - Position X
         * @param {number} y - Position Y
         * @param {number} index - Index de la déco
         * @param {string} arrayName - 'placedDecoItems' ou 'placedDecorBgItems'
         */
        showDecoMenu: function(x, y, index, arrayName) {
            var placed = KP.State[arrayName][index];
            var items = [
                {
                    icon: '↻',
                    label: 'Tourner +45°',
                    keepOpen: true,
                    onClick: function() {
                        placed.rotation = (placed.rotation || 0) + 45;
                        KP.save();
                        if (arrayName === 'placedDecoItems') {
                            KP.Features.Decoration.renderDecoItems();
                        } else {
                            KP.Features.Decoration.renderDecorBgItems();
                        }
                    }
                },
                {
                    icon: '↺',
                    label: 'Tourner -45°',
                    keepOpen: true,
                    onClick: function() {
                        placed.rotation = (placed.rotation || 0) - 45;
                        KP.save();
                        if (arrayName === 'placedDecoItems') {
                            KP.Features.Decoration.renderDecoItems();
                        } else {
                            KP.Features.Decoration.renderDecorBgItems();
                        }
                    }
                },
                {
                    icon: '🔍+',
                    label: 'Agrandir',
                    keepOpen: true,
                    onClick: function() {
                        placed.scale = Math.min((placed.scale || 1) + 0.25, 3);
                        KP.save();
                        if (arrayName === 'placedDecoItems') {
                            KP.Features.Decoration.renderDecoItems();
                        } else {
                            KP.Features.Decoration.renderDecorBgItems();
                        }
                    }
                },
                {
                    icon: '🔍-',
                    label: 'Réduire',
                    keepOpen: true,
                    onClick: function() {
                        placed.scale = Math.max((placed.scale || 1) - 0.25, 0.25);
                        KP.save();
                        if (arrayName === 'placedDecoItems') {
                            KP.Features.Decoration.renderDecoItems();
                        } else {
                            KP.Features.Decoration.renderDecorBgItems();
                        }
                    }
                },
                {
                    icon: '🗑️',
                    label: 'Supprimer',
                    onClick: function() {
                        KP.State[arrayName].splice(index, 1);
                        KP.save();
                        if (arrayName === 'placedDecoItems') {
                            KP.Features.Decoration.renderDecoItems();
                        } else {
                            KP.Features.Decoration.renderDecorBgItems();
                        }
                    }
                }
            ];

            this.show(x, y, items);
        }
    };
})();
