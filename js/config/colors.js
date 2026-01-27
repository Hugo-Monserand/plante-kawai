/**
 * Colors - Données des couleurs nature
 */
(function() {
    'use strict';

    // Couleurs du sol
    KP.Config.GroundColors = [
        { id: 'ground_green', name: 'Vert', colors: ['#81c784', '#66bb6a', '#4caf50'] },
        { id: 'ground_dark', name: 'Vert Foncé', colors: ['#558b2f', '#33691e', '#1b5e20'] },
        { id: 'ground_lime', name: 'Lime', colors: ['#c5e1a5', '#aed581', '#9ccc65'] },
        { id: 'ground_teal', name: 'Turquoise', colors: ['#80cbc4', '#4db6ac', '#26a69a'] },
        { id: 'ground_brown', name: 'Terre', colors: ['#a1887f', '#8d6e63', '#795548'] },
        { id: 'ground_sand', name: 'Sable', colors: ['#ffe082', '#ffd54f', '#ffca28'] },
        { id: 'ground_snow', name: 'Neige', colors: ['#ffffff', '#eceff1', '#cfd8dc'] },
        { id: 'ground_purple', name: 'Violet', colors: ['#ce93d8', '#ba68c8', '#ab47bc'] }
    ];

    // Couleurs des arbres
    KP.Config.TreeColors = [
        { id: 'tree_pink', name: 'Rose', colors: ['#ff8a9a', '#ffaab8'] },
        { id: 'tree_white', name: 'Blanc', colors: ['#ffffff', '#f5f5f5'] },
        { id: 'tree_red', name: 'Rouge', colors: ['#ef5350', '#e57373'] },
        { id: 'tree_orange', name: 'Orange', colors: ['#ff7043', '#ff8a65'] },
        { id: 'tree_yellow', name: 'Jaune', colors: ['#ffd54f', '#ffe082'] },
        { id: 'tree_green', name: 'Vert', colors: ['#81c784', '#a5d6a7'] },
        { id: 'tree_blue', name: 'Bleu', colors: ['#64b5f6', '#90caf9'] },
        { id: 'tree_purple', name: 'Violet', colors: ['#ba68c8', '#ce93d8'] }
    ];

    // Couleurs des montagnes
    KP.Config.MountainColors = [
        { id: 'mountain_green', name: 'Vert', colors: ['#7cb342', '#8bc34a', '#9ccc65'] },
        { id: 'mountain_blue', name: 'Bleu', colors: ['#5c6bc0', '#7986cb', '#9fa8da'] },
        { id: 'mountain_purple', name: 'Violet', colors: ['#7e57c2', '#9575cd', '#b39ddb'] },
        { id: 'mountain_brown', name: 'Marron', colors: ['#6d4c41', '#8d6e63', '#a1887f'] },
        { id: 'mountain_gray', name: 'Gris', colors: ['#546e7a', '#78909c', '#90a4ae'] },
        { id: 'mountain_pink', name: 'Rose', colors: ['#ec407a', '#f06292', '#f48fb1'] },
        { id: 'mountain_teal', name: 'Turquoise', colors: ['#00897b', '#26a69a', '#4db6ac'] },
        { id: 'mountain_snow', name: 'Neige', colors: ['#b0bec5', '#cfd8dc', '#eceff1'] }
    ];

    /**
     * Trouve une couleur de sol par ID
     */
    KP.Config.getGroundColor = function(id) {
        return KP.Config.GroundColors.find(function(c) { return c.id === id; });
    };

    /**
     * Trouve une couleur d'arbre par ID
     */
    KP.Config.getTreeColor = function(id) {
        return KP.Config.TreeColors.find(function(c) { return c.id === id; });
    };

    /**
     * Trouve une couleur de montagne par ID
     */
    KP.Config.getMountainColor = function(id) {
        return KP.Config.MountainColors.find(function(c) { return c.id === id; });
    };
})();
