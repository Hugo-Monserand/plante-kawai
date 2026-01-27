/**
 * PlantRenderer - Affichage de la plante
 */
(function() {
    'use strict';

    KP.Features.Plant = KP.Features.Plant || {};

    KP.Features.Plant.Renderer = {
        /**
         * Met à jour l'affichage complet de la plante
         */
        update: function() {
            this._updateStem();
            this._updateLeaves();
            this._updateFlowers();
            this._updatePotSmile();
            this._updateLevelDisplay();
            this._applyEquippedFlowerColor();
        },

        /**
         * Crée une fleur SVG
         * @param {string} className - Classe CSS (center, left, right)
         * @param {number} size - Taille de la fleur
         * @returns {HTMLElement}
         */
        createFlower: function(className, size) {
            size = size || 70;

            var flower = document.createElement('div');
            flower.className = 'flower ' + className;
            flower.style.width = size + 'px';
            flower.style.height = size + 'px';

            var petalWidth = size * 0.37;
            var petalHeight = size * 0.54;
            var petalOffset = size * 0.31;
            var centerSize = size * 0.48;

            var html = '';
            for (var i = 0; i < 5; i++) {
                var rotation = i * 72;
                html += '<div class="petal" style="width:' + petalWidth + 'px;height:' + petalHeight + 'px;' +
                    'margin-left:' + (-petalWidth/2) + 'px;margin-top:' + (-petalHeight/2) + 'px;' +
                    'transform:rotate(' + rotation + 'deg) translateY(' + (-petalOffset) + 'px)"></div>';
            }

            html += '<div class="flower-center" style="width:' + centerSize + 'px;height:' + centerSize + 'px">' +
                '<div class="flower-face">' +
                '<div class="flower-eyes">' +
                '<div class="flower-eye"></div>' +
                '<div class="flower-eye"></div>' +
                '</div>' +
                '<div class="flower-smile"></div>' +
                '</div>' +
                '</div>';

            flower.innerHTML = html;
            return flower;
        },

        /**
         * Applique une couleur aux fleurs
         * @param {string} color - Couleur hex ou 'rainbow'
         */
        applyFlowerColor: function(color) {
            document.documentElement.style.setProperty('--flower-color', color);

            var petals = document.querySelectorAll('.petal');
            petals.forEach(function(petal) {
                if (color === 'rainbow') {
                    petal.style.background = 'linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #9b59b6)';
                } else {
                    petal.style.background = 'linear-gradient(135deg, ' + color + ', ' + KP.adjustColor(color, -30) + ')';
                }
            });
        },

        /**
         * Applique une couleur au pot
         * @param {string} color - Couleur hex
         */
        applyPotColor: function(color) {
            var pot = document.querySelector('.pot');
            if (pot) {
                pot.style.background = KP.Utils.Color.createPotGradient(color);
            }
        },

        // === Méthodes privées ===

        _updateStem: function() {
            var stem = document.getElementById('stem');
            var plant = document.getElementById('plant');
            if (!stem || !plant) return;

            var leafPairs = Math.floor(KP.State.growthLevel / 2);
            var leafSpacing = 30;
            var baseHeight = 15;
            var stemHeight = baseHeight + (leafPairs * leafSpacing * 2) + (KP.State.growthLevel * 5);

            var maxAvailableHeight = window.innerHeight * 0.55;
            var plantScale = stemHeight > maxAvailableHeight ? maxAvailableHeight / stemHeight : 1;

            plant.style.transform = 'translateX(-50%) scale(' + plantScale + ')';
            plant.style.transformOrigin = 'bottom center';
            stem.style.height = stemHeight + 'px';
        },

        _updateLeaves: function() {
            var leaves = document.getElementById('leaves');
            if (!leaves) return;

            leaves.innerHTML = '';

            var leafPairs = Math.floor(KP.State.growthLevel / 2);
            var leafSpacing = 30;

            for (var i = 0; i < leafPairs; i++) {
                var leafWidth = 25 + KP.State.growthLevel * 2;
                var leafHeight = 15 + KP.State.growthLevel;

                // Feuille gauche
                var leftLeaf = document.createElement('div');
                leftLeaf.className = 'leaf left';
                leftLeaf.style.width = leafWidth + 'px';
                leftLeaf.style.height = leafHeight + 'px';
                leftLeaf.style.bottom = (15 + i * leafSpacing * 2) + 'px';
                leftLeaf.style.right = '0px';
                leaves.appendChild(leftLeaf);

                // Feuille droite
                var rightLeaf = document.createElement('div');
                rightLeaf.className = 'leaf right';
                rightLeaf.style.width = leafWidth + 'px';
                rightLeaf.style.height = leafHeight + 'px';
                rightLeaf.style.bottom = (15 + leafSpacing + i * leafSpacing * 2) + 'px';
                rightLeaf.style.left = '0px';
                leaves.appendChild(rightLeaf);
            }
        },

        _updateFlowers: function() {
            var flowersContainer = document.getElementById('flowersContainer');
            var stem = document.getElementById('stem');
            if (!flowersContainer || !stem) return;

            flowersContainer.innerHTML = '';
            flowersContainer.style.bottom = stem.style.height;

            var baseFlowerSize = 50;
            var flowerSize = baseFlowerSize + (KP.State.growthLevel * 3);

            if (KP.State.growthLevel >= 6) {
                var centerFlower = this.createFlower('center', flowerSize);
                flowersContainer.appendChild(centerFlower);
            }
        },

        _updatePotSmile: function() {
            var potMouth = document.getElementById('potMouth');
            if (!potMouth) return;

            var mouthWidth = 20;
            var curveHeight = KP.State.growthLevel * 1.5;

            potMouth.style.width = mouthWidth + 'px';
            potMouth.style.height = curveHeight + 'px';
            potMouth.style.border = 'none';
            potMouth.style.borderBottom = '3px solid #5d4037';

            if (curveHeight > 0) {
                potMouth.style.borderLeft = '3px solid #5d4037';
                potMouth.style.borderRight = '3px solid #5d4037';
                potMouth.style.borderRadius = '0 0 ' + mouthWidth + 'px ' + mouthWidth + 'px';
            } else {
                potMouth.style.borderRadius = '0';
            }
        },

        _updateLevelDisplay: function() {
            var levelDisplay = document.getElementById('level');
            var maxLevelDisplay = document.getElementById('maxLevel');

            if (levelDisplay) levelDisplay.textContent = KP.State.growthLevel;
            if (maxLevelDisplay) maxLevelDisplay.textContent = KP.State.maxLevel;
        },

        _applyEquippedFlowerColor: function() {
            if (KP.State.equippedFlower) {
                var flowerItem = KP.Config.ShopItems.find(function(i) {
                    return i.id === KP.State.equippedFlower;
                });
                if (flowerItem) {
                    var self = this;
                    setTimeout(function() {
                        self.applyFlowerColor(flowerItem.color);
                    }, 10);
                }
            }
        }
    };
})();
