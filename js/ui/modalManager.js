/**
 * ModalManager - Gestion centralisée des modales
 */
(function() {
    'use strict';

    KP.UI.Modal = {
        /**
         * Ouvre une modale
         * @param {string} name - Nom de la modale (shop, garden, deco, bg, decor, natureColor, achievements, reset)
         * @param {Function} onOpen - Callback à appeler à l'ouverture
         */
        open: function(name, onOpen) {
            var modal = this._getModal(name);
            if (!modal) return;

            modal.classList.add('active');
            if (onOpen) onOpen();
            KP.emit('modal:opened', { name: name });
        },

        /**
         * Ferme une modale
         * @param {string} name - Nom de la modale
         */
        close: function(name) {
            var modal = this._getModal(name);
            if (!modal) return;

            modal.classList.remove('active');
            KP.emit('modal:closed', { name: name });
        },

        /**
         * Vérifie si une modale est ouverte
         * @param {string} name - Nom de la modale
         * @returns {boolean}
         */
        isOpen: function(name) {
            var modal = this._getModal(name);
            return modal ? modal.classList.contains('active') : false;
        },

        /**
         * Configure le clic sur le backdrop pour fermer
         * @param {string} name - Nom de la modale
         */
        setupBackdropClose: function(name) {
            var self = this;
            var modal = this._getModal(name);
            if (!modal) return;

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    self.close(name);
                }
            });
        },

        /**
         * Configure le bouton de fermeture
         * @param {string} name - Nom de la modale
         * @param {string} closeButtonId - ID du bouton de fermeture
         */
        setupCloseButton: function(name, closeButtonId) {
            var self = this;
            var closeBtn = document.getElementById(closeButtonId);
            if (!closeBtn) return;

            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                self.close(name);
            });
        },

        /**
         * Initialise toutes les modales
         */
        init: function() {
            var modals = ['shop', 'garden', 'deco', 'bg', 'decor', 'natureColor', 'achievements', 'reset'];
            var self = this;

            modals.forEach(function(name) {
                self.setupBackdropClose(name);
            });

            // Boutons de fermeture
            this.setupCloseButton('shop', 'shopClose');
            this.setupCloseButton('garden', 'gardenClose');
            this.setupCloseButton('deco', 'decoClose');
            this.setupCloseButton('bg', 'bgClose');
            this.setupCloseButton('decor', 'decorClose');
            this.setupCloseButton('natureColor', 'natureColorClose');
            this.setupCloseButton('achievements', 'achievementsClose');
            this.setupCloseButton('reset', 'resetCancel');
        },

        /**
         * Récupère l'élément modale par son nom
         * @private
         */
        _getModal: function(name) {
            var modalIds = {
                shop: 'shopModal',
                garden: 'gardenModal',
                deco: 'decoModal',
                bg: 'bgModal',
                decor: 'decorModal',
                natureColor: 'natureColorModal',
                achievements: 'achievementsModal',
                reset: 'resetModal'
            };

            var id = modalIds[name];
            return id ? document.getElementById(id) : null;
        }
    };
})();
