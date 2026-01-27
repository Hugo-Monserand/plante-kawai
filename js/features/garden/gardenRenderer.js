/**
 * GardenRenderer - Affichage de la jardinerie
 */
(function() {
    'use strict';

    KP.Features.Garden = KP.Features.Garden || {};

    KP.Features.Garden.Renderer = {
        /**
         * Affiche tout le contenu de la jardinerie
         */
        render: function() {
            var gardenBalance = document.getElementById('gardenBalance');
            if (gardenBalance) gardenBalance.textContent = Math.floor(KP.State.kawaiMoney);

            this._renderVisibilityToggle();
            this._renderSeeds();
            this._renderGardenPots();
            this._renderGardenSlots();
        },

        /**
         * Affiche les plantes sur l'écran (mini plantes)
         */
        renderSidePlants: function() {
            // Supprimer les anciennes plantes
            document.querySelectorAll('.side-plant').forEach(function(el) {
                el.remove();
            });

            if (!KP.State.showSidePlants) return;

            var plantsWithPlant = KP.State.gardenSlots.filter(function(slot) {
                return slot.plant;
            });

            plantsWithPlant.forEach(function(slot, index) {
                var plantInfo = KP.Config.getPlantInfo(slot.plant);
                var slotIndex = KP.State.gardenSlots.indexOf(slot);

                var plantEl = document.createElement('div');
                plantEl.className = 'side-plant';
                plantEl.dataset.slotIndex = slotIndex;

                // Position par défaut ou sauvegardée
                var defaultX = index % 2 === 0 ? 50 + (index * 80) : window.innerWidth - 150 - (index * 80);
                var defaultY = window.innerHeight - 300;
                var savedPos = slot.position || { x: defaultX, y: defaultY };
                plantEl.style.left = savedPos.x + 'px';
                plantEl.style.top = savedPos.y + 'px';

                // Couleur du pot
                var potColor = KP.Utils.Color.getPotColors(slot.equippedPot);

                plantEl.innerHTML = this._createMiniPlantHTML(slot, plantInfo, potColor);

                // Menu contextuel
                plantEl.oncontextmenu = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    KP.UI.ContextMenu.showPotMenu(e.clientX, e.clientY, slotIndex, slot.equippedPot);
                };

                // Drag and drop
                KP.UI.DragDrop.makePlantDraggable(plantEl, slotIndex);

                document.body.appendChild(plantEl);
            }, this);
        },

        _createMiniPlantHTML: function(slot, plantInfo, potColor) {
            var stemHeight = 30 + slot.level * 10;
            var icons = { sunflower: '🌻', cactus: '🌵', bamboo: '🎋' };
            var icon = icons[slot.plant] || '🌱';

            return [
                '<div class="plant-level">' + plantInfo.icon + ' Niv.' + slot.level + '</div>',
                '<div class="mini-pot-container">',
                '    <div class="mini-plant">',
                '        <div class="mini-stem" style="height: ' + stemHeight + 'px; background: linear-gradient(90deg, #66bb6a, #43a047); width: 8px; border-radius: 4px; margin: 0 auto;"></div>',
                '        <div class="mini-flower" style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: ' + (30 + slot.level * 3) + 'px;">' + icon + '</div>',
                '    </div>',
                '    <div class="mini-pot" style="background: linear-gradient(180deg, ' + potColor.light + ' 0%, ' + potColor.mid + ' 30%, ' + potColor.dark + ' 100%);">',
                '        <div class="mini-soil"></div>',
                '    </div>',
                '</div>'
            ].join('');
        },

        _renderVisibilityToggle: function() {
            var oldToggle = document.getElementById('visibilityToggle');
            if (oldToggle) oldToggle.remove();

            var gardenModal = document.getElementById('gardenModal');
            var shopBalance = gardenModal ? gardenModal.querySelector('.shop-balance') : null;
            if (!shopBalance) return;

            var toggleContainer = document.createElement('div');
            toggleContainer.id = 'visibilityToggle';
            toggleContainer.className = 'visibility-toggle';
            toggleContainer.innerHTML = [
                '<span class="toggle-label">🌱 Afficher les plantes sur l\'écran</span>',
                '<button class="toggle-btn ' + (KP.State.showSidePlants ? 'active' : '') + '" id="togglePlantsBtn">',
                '    ' + (KP.State.showSidePlants ? '👁️ Visible' : '🙈 Masqué'),
                '</button>'
            ].join('');

            shopBalance.after(toggleContainer);

            var self = this;
            document.getElementById('togglePlantsBtn').onclick = function(e) {
                e.stopPropagation();
                KP.State.showSidePlants = !KP.State.showSidePlants;
                self.renderSidePlants();
                self._renderVisibilityToggle();
                KP.save();
            };
        },

        _renderSeeds: function() {
            var container = document.getElementById('seedItems');
            if (!container) return;

            container.innerHTML = '';

            KP.Config.Seeds.forEach(function(seed) {
                var owned = KP.State.ownedSeeds.includes(seed.id);
                var canAfford = KP.State.kawaiMoney >= seed.price;

                var itemEl = document.createElement('div');
                itemEl.className = 'shop-item' + (owned ? ' owned' : '') + (!canAfford && !owned ? ' locked' : '');

                var buttonText = owned ? '✓ Possédée' : '✿ ' + seed.price;
                var buttonClass = 'item-price' + (owned ? ' equipped-btn' : '');
                var buttonDisabled = owned || !canAfford;

                itemEl.innerHTML = [
                    '<div class="item-icon">' + seed.icon + '</div>',
                    '<div class="item-info">',
                    '    <div class="item-name">' + seed.name + '</div>',
                    '    <div class="item-desc">' + seed.desc + '</div>',
                    '</div>',
                    '<button class="' + buttonClass + '"' + (buttonDisabled ? ' disabled' : '') + '>' + buttonText + '</button>'
                ].join('');

                if (!owned && canAfford) {
                    itemEl.querySelector('button').onclick = function(e) {
                        e.stopPropagation();
                        KP.Features.Garden.buySeed(seed);
                    };
                }

                container.appendChild(itemEl);
            });
        },

        _renderGardenPots: function() {
            var container = document.getElementById('gardenPotItems');
            if (!container) return;

            container.innerHTML = '';

            KP.Config.GardenPots.forEach(function(pot) {
                var owned = KP.State.gardenSlots.length > pot.slotIndex;
                var canAfford = KP.State.kawaiMoney >= pot.price;

                var itemEl = document.createElement('div');
                itemEl.className = 'shop-item' + (owned ? ' owned' : '') + (!canAfford && !owned ? ' locked' : '');

                var buttonText = owned ? '✓ Acheté' : '✿ ' + pot.price;
                var buttonClass = 'item-price' + (owned ? ' equipped-btn' : '');
                var buttonDisabled = owned || !canAfford;

                itemEl.innerHTML = [
                    '<div class="item-icon">' + pot.icon + '</div>',
                    '<div class="item-info">',
                    '    <div class="item-name">' + pot.name + '</div>',
                    '    <div class="item-desc">' + pot.desc + '</div>',
                    '</div>',
                    '<button class="' + buttonClass + '"' + (buttonDisabled ? ' disabled' : '') + '>' + buttonText + '</button>'
                ].join('');

                if (!owned && canAfford) {
                    itemEl.querySelector('button').onclick = function(e) {
                        e.stopPropagation();
                        KP.Features.Garden.buyGardenPot(pot);
                    };
                }

                container.appendChild(itemEl);
            });
        },

        _renderGardenSlots: function() {
            var container = document.getElementById('gardenSlots');
            if (!container) return;

            container.innerHTML = '';

            KP.State.gardenSlots.forEach(function(slot, index) {
                var slotEl = document.createElement('div');
                slotEl.className = 'garden-slot' + (slot.plant ? ' has-plant' : ' empty');

                if (slot.plant) {
                    var plantInfo = KP.Config.getPlantInfo(slot.plant);
                    slotEl.innerHTML = [
                        '<div class="slot-icon">' + plantInfo.icon + '</div>',
                        '<div class="slot-label">' + plantInfo.name + '</div>',
                        '<div class="slot-level">Niv. ' + slot.level + '/10</div>',
                        slot.level < 10 ? '<button class="water-btn" data-slot="' + index + '">💧 Arroser</button>' : ''
                    ].join('');

                    var waterBtn = slotEl.querySelector('.water-btn');
                    if (waterBtn) {
                        waterBtn.onclick = function(e) {
                            e.stopPropagation();
                            KP.Features.Garden.waterPlant(index);
                        };
                    }
                } else {
                    var availableSeeds = KP.State.ownedSeeds.filter(function(seedId) {
                        var seed = KP.Config.Seeds.find(function(s) { return s.id === seedId; });
                        return seed && !KP.State.gardenSlots.some(function(s) { return s.plant === seed.plantType; });
                    });

                    if (availableSeeds.length > 0) {
                        var options = availableSeeds.map(function(seedId) {
                            var seed = KP.Config.Seeds.find(function(s) { return s.id === seedId; });
                            return '<option value="' + seed.plantType + '">' + seed.icon + ' ' + seed.name.replace('Graine de ', '') + '</option>';
                        }).join('');

                        slotEl.innerHTML = [
                            '<div class="slot-icon">🕳️</div>',
                            '<div class="slot-label">Planter</div>',
                            '<select class="plant-select" data-slot="' + index + '">',
                            '    <option value="">Choisir...</option>',
                            '    ' + options,
                            '</select>'
                        ].join('');

                        var select = slotEl.querySelector('.plant-select');
                        select.onclick = function(e) { e.stopPropagation(); };
                        select.onchange = function(e) {
                            e.stopPropagation();
                            if (e.target.value) {
                                KP.Features.Garden.plantSeed(index, e.target.value);
                            }
                        };
                    } else {
                        slotEl.innerHTML = [
                            '<div class="slot-icon">🕳️</div>',
                            '<div class="slot-label">Vide</div>',
                            '<div class="slot-level">Achète des graines !</div>'
                        ].join('');
                    }
                }

                container.appendChild(slotEl);
            });

            // Emplacement verrouillé
            if (KP.State.gardenSlots.length <= KP.Config.GardenPots.length) {
                var lockedSlot = document.createElement('div');
                lockedSlot.className = 'garden-slot locked';
                lockedSlot.innerHTML = [
                    '<div class="slot-icon">🔒</div>',
                    '<div class="slot-label">Verrouillé</div>',
                    '<div class="slot-level">Achète un pot !</div>'
                ].join('');
                container.appendChild(lockedSlot);
            }
        }
    };
})();
