/**
 * Application Kawaii Plant
 * Point d'entrée principal
 */
(function() {
    'use strict';

    /**
     * Initialise l'application
     */
    function init() {
        console.log('🌱 Initialisation de Kawaii Plant...');

        // 1. Initialiser les références DOM
        KP.DOM.init();

        // 2. Charger la sauvegarde
        KP.load();

        // 3. Initialiser les modules UI
        KP.UI.Modal.init();
        KP.UI.MusicPlayer.init();

        // 4. Initialiser les features
        KP.Features.Plant.Controller.init();
        KP.Features.Shop.Controller.init();
        KP.Features.Garden.Controller.init();
        KP.Features.Decoration.Controller.init();
        KP.Features.Decoration.DecorBg.init();
        KP.Features.Background.Controller.init();
        KP.Features.Background.NatureColors.init();
        KP.Features.Meteors.Controller.init();
        KP.Features.Meteors.Funnel.init();
        KP.Features.Achievements.Controller.init();
        KP.Features.Quests.Controller.init();
        KP.Features.Secrets.Codes.init();

        // 5. Démarrer les générateurs
        KP.Features.Economy.Money.startGeneration();
        KP.Features.Economy.Crystals.startGeneration();

        // 6. Démarrer le compteur de temps de jeu
        startPlayTimeCounter();

        // 7. Affichage initial
        KP.Features.Plant.Renderer.update();
        KP.Features.Economy.Money.updateDisplay();
        KP.Features.Economy.Crystals.updateDisplay();

        // 8. Appliquer les éléments équipés
        applyEquippedItems();

        // 9. Initialiser le reset
        initReset();

        // 10. Initialiser l'export/import
        initSaveButtons();

        console.log('✅ Kawaii Plant initialisé !');
    }

    /**
     * Applique les items équipés au chargement
     */
    function applyEquippedItems() {
        // Pot équipé
        if (KP.State.equippedPot) {
            var potItem = KP.Config.ShopItems.find(function(i) {
                return i.id === KP.State.equippedPot;
            });
            if (potItem) {
                KP.Features.Plant.Renderer.applyPotColor(potItem.color);
            }
        }

        // Fleur équipée
        if (KP.State.equippedFlower) {
            var flowerItem = KP.Config.ShopItems.find(function(i) {
                return i.id === KP.State.equippedFlower;
            });
            if (flowerItem) {
                KP.Features.Plant.Renderer.applyFlowerColor(flowerItem.color);
            }
        }
    }

    /**
     * Démarre le compteur de temps de jeu
     */
    function startPlayTimeCounter() {
        setInterval(function() {
            KP.State.totalPlayTime++;
            // Sauvegarder toutes les minutes
            if (KP.State.totalPlayTime % 60 === 0) {
                KP.save();
            }
        }, KP.Constants.PLAY_TIME_UPDATE_INTERVAL);
    }

    /**
     * Initialise le système de reset
     */
    function initReset() {
        var resetBtn = document.getElementById('resetBtn');
        var resetModal = document.getElementById('resetModal');
        var resetCancel = document.getElementById('resetCancel');
        var resetConfirm = document.getElementById('resetConfirm');

        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                KP.UI.Modal.open('reset');
            });
        }

        if (resetCancel) {
            resetCancel.addEventListener('click', function(e) {
                e.stopPropagation();
                KP.UI.Modal.close('reset');
            });
        }

        if (resetConfirm) {
            resetConfirm.addEventListener('click', function(e) {
                e.stopPropagation();
                resetGame();
            });
        }
    }

    /**
     * Réinitialise le jeu
     */
    function resetGame() {
        // Réinitialiser l'état
        KP.State.reset();

        // Effacer la sauvegarde
        KP.Core.Storage.clear();

        // Fermer la modale
        KP.UI.Modal.close('reset');

        // Recharger la page pour un état propre
        location.reload();
    }

    /**
     * Initialise les boutons d'export/import
     */
    function initSaveButtons() {
        var exportBtn = document.getElementById('exportBtn');
        var importBtn = document.getElementById('importBtn');

        if (exportBtn) {
            exportBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                KP.exportSave();
            });
        }

        if (importBtn) {
            importBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                KP.importSave();
            });
        }
    }

    // Lancer l'initialisation au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
