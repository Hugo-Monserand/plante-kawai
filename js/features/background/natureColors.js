/**
 * NatureColors - Gestion des couleurs nature (sol, arbres, montagnes)
 */
(function() {
    'use strict';

    KP.Features.Background = KP.Features.Background || {};

    KP.Features.Background.NatureColors = {
        /**
         * Ouvre la modale des couleurs nature
         */
        open: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.open('natureColor', function() {
                KP.Features.Background.NatureColors.render();
            });
        },

        /**
         * Affiche les options de couleurs
         */
        render: function() {
            this._renderGroundColors();
            this._renderTreeColors();
            this._renderMountainColors();
        },

        /**
         * Applique toutes les couleurs nature sauvegardées
         */
        applyAll: function() {
            this._applyGroundColor(KP.State.selectedGroundColor);
            this._applyTreeColor(KP.State.selectedTreeColor);
            this._applyMountainColor(KP.State.selectedMountainColor);
        },

        _renderGroundColors: function() {
            var container = document.getElementById('groundColors');
            if (!container) return;

            container.innerHTML = '';
            var self = this;

            KP.Config.GroundColors.forEach(function(color) {
                var option = document.createElement('div');
                option.className = 'color-option' + (KP.State.selectedGroundColor === color.id ? ' selected' : '');
                option.style.background = 'linear-gradient(180deg, ' + color.colors[0] + ' 0%, ' + color.colors[1] + ' 50%, ' + color.colors[2] + ' 100%)';
                option.title = color.name;

                option.onclick = function() {
                    KP.State.selectedGroundColor = color.id;
                    self._applyGroundColor(color.id);
                    self._renderGroundColors();
                    KP.save();
                };

                container.appendChild(option);
            });
        },

        _renderTreeColors: function() {
            var container = document.getElementById('treeColors');
            if (!container) return;

            container.innerHTML = '';
            var self = this;

            KP.Config.TreeColors.forEach(function(color) {
                var option = document.createElement('div');
                option.className = 'color-option' + (KP.State.selectedTreeColor === color.id ? ' selected' : '');
                option.style.background = 'linear-gradient(180deg, ' + color.colors[0] + ' 0%, ' + color.colors[1] + ' 100%)';
                option.title = color.name;

                option.onclick = function() {
                    KP.State.selectedTreeColor = color.id;
                    self._applyTreeColor(color.id);
                    self._renderTreeColors();
                    KP.save();
                };

                container.appendChild(option);
            });
        },

        _renderMountainColors: function() {
            var container = document.getElementById('mountainColors');
            if (!container) return;

            container.innerHTML = '';
            var self = this;

            KP.Config.MountainColors.forEach(function(color) {
                var option = document.createElement('div');
                option.className = 'color-option' + (KP.State.selectedMountainColor === color.id ? ' selected' : '');
                option.style.background = 'linear-gradient(180deg, ' + color.colors[0] + ' 0%, ' + color.colors[1] + ' 50%, ' + color.colors[2] + ' 100%)';
                option.title = color.name;

                option.onclick = function() {
                    KP.State.selectedMountainColor = color.id;
                    self._applyMountainColor(color.id);
                    self._renderMountainColors();
                    KP.save();
                };

                container.appendChild(option);
            });
        },

        _applyGroundColor: function(colorId) {
            var color = KP.Config.getGroundColor(colorId);
            if (!color) return;

            var ground = document.querySelector('.ground');
            if (ground) {
                ground.style.background = 'linear-gradient(180deg, ' + color.colors[0] + ' 0%, ' + color.colors[1] + ' 50%, ' + color.colors[2] + ' 100%)';
            }
        },

        _applyTreeColor: function(colorId) {
            var color = KP.Config.getTreeColor(colorId);
            if (!color) return;

            document.querySelectorAll('.tree-top').forEach(function(el) {
                el.style.background = color.colors[0];
            });
            document.querySelectorAll('.tree-top::before').forEach(function(el) {
                el.style.background = color.colors[1];
            });

            // CSS ne peut pas cibler ::before directement, on utilise une variable CSS
            document.documentElement.style.setProperty('--tree-color-1', color.colors[0]);
            document.documentElement.style.setProperty('--tree-color-2', color.colors[1]);
        },

        _applyMountainColor: function(colorId) {
            var color = KP.Config.getMountainColor(colorId);
            if (!color) return;

            var mountains = document.querySelectorAll('.mountain');
            mountains.forEach(function(mountain, index) {
                mountain.style.borderBottomColor = color.colors[index % color.colors.length];
            });
        },

        /**
         * Initialise les couleurs nature
         */
        init: function() {
            var self = this;
            var natureColorBtn = document.getElementById('natureColorBtn');

            if (natureColorBtn) {
                natureColorBtn.addEventListener('click', function(e) {
                    self.open(e);
                });
            }

            this.applyAll();
        }
    };
})();
