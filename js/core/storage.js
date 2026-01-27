/**
 * Storage - Gestion de la persistance localStorage
 */
(function() {
    'use strict';

    var SAVE_KEY = 'kawaiPlantSave';

    KP.Core.Storage = {
        /**
         * Sauvegarde l'état du jeu dans localStorage
         */
        save: function() {
            try {
                var data = KP.State.toJSON();
                localStorage.setItem(SAVE_KEY, JSON.stringify(data));
                KP.emit('game:saved');
            } catch (e) {
                console.error('Erreur lors de la sauvegarde:', e);
            }
        },

        /**
         * Charge l'état du jeu depuis localStorage
         * @returns {boolean} true si une sauvegarde a été chargée
         */
        load: function() {
            try {
                var saveData = localStorage.getItem(SAVE_KEY);
                if (saveData) {
                    var data = JSON.parse(saveData);
                    KP.State.fromJSON(data);
                    KP.emit('game:loaded', data);
                    return true;
                }
            } catch (e) {
                console.error('Erreur lors du chargement:', e);
            }
            return false;
        },

        /**
         * Supprime la sauvegarde
         */
        clear: function() {
            try {
                localStorage.removeItem(SAVE_KEY);
                KP.emit('game:reset');
            } catch (e) {
                console.error('Erreur lors de la suppression:', e);
            }
        },

        /**
         * Vérifie si une sauvegarde existe
         * @returns {boolean}
         */
        exists: function() {
            return localStorage.getItem(SAVE_KEY) !== null;
        },

        /**
         * Exporte la sauvegarde dans un fichier JSON téléchargeable
         */
        exportToFile: function() {
            try {
                var data = KP.State.toJSON();
                data._exportDate = new Date().toISOString();
                data._version = '1.0';

                var json = JSON.stringify(data, null, 2);
                var blob = new Blob([json], { type: 'application/json' });
                var url = URL.createObjectURL(blob);

                var date = new Date();
                var dateStr = date.getFullYear() + '-' +
                    String(date.getMonth() + 1).padStart(2, '0') + '-' +
                    String(date.getDate()).padStart(2, '0');
                var filename = 'kawaii-plant-save-' + dateStr + '.json';

                var a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                KP.emit('game:exported');
                KP.UI.Notifications.show('Sauvegarde exportée !', 'success');
            } catch (e) {
                console.error('Erreur lors de l\'export:', e);
                KP.UI.Notifications.show('Erreur lors de l\'export', 'error');
            }
        },

        /**
         * Importe une sauvegarde depuis un fichier JSON
         */
        importFromFile: function() {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';

            input.onchange = function(e) {
                var file = e.target.files[0];
                if (!file) return;

                var reader = new FileReader();
                reader.onload = function(event) {
                    try {
                        var data = JSON.parse(event.target.result);

                        // Validation basique
                        if (typeof data.kawaiMoney === 'undefined' &&
                            typeof data.growthLevel === 'undefined') {
                            throw new Error('Fichier de sauvegarde invalide');
                        }

                        // Charger les données
                        KP.State.fromJSON(data);
                        KP.Core.Storage.save();

                        KP.emit('game:imported', data);
                        KP.UI.Notifications.show('Sauvegarde importée ! Rechargement...', 'success');

                        // Recharger la page pour appliquer les changements
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    } catch (err) {
                        console.error('Erreur lors de l\'import:', err);
                        KP.UI.Notifications.show('Fichier invalide !', 'error');
                    }
                };
                reader.readAsText(file);
            };

            input.click();
        }
    };

    // Alias pour accès rapide
    KP.save = KP.Core.Storage.save.bind(KP.Core.Storage);
    KP.load = KP.Core.Storage.load.bind(KP.Core.Storage);
    KP.exportSave = KP.Core.Storage.exportToFile.bind(KP.Core.Storage);
    KP.importSave = KP.Core.Storage.importFromFile.bind(KP.Core.Storage);
})();
