/**
 * DOM - Références centralisées aux éléments du DOM
 */
(function() {
    'use strict';

    KP.Core.DOM = {
        // === Plante ===
        plant: null,
        stem: null,
        leaves: null,
        flowersContainer: null,
        potMouth: null,

        // === UI ===
        levelDisplay: null,
        maxLevelDisplay: null,
        moneyAmount: null,
        moneyRate: null,
        crystalAmount: null,
        crystalRate: null,
        wateringCostDisplay: null,
        wateringCostAmount: null,
        instructions: null,

        // === Arrosoir ===
        wateringCan: null,
        waterDrops: null,

        // === Modales ===
        shopModal: null,
        gardenModal: null,
        decoModal: null,
        bgModal: null,
        decorModal: null,
        natureColorModal: null,
        achievementsModal: null,
        resetModal: null,

        // === Conteneurs de modales ===
        shopItems: null,
        shopBalance: null,
        seedItems: null,
        gardenPotItems: null,
        gardenSlots: null,
        gardenBalance: null,
        decoItems: null,
        decoBalance: null,
        bgItems: null,
        bgBalance: null,
        decorItems: null,
        decorBalance: null,
        groundColors: null,
        treeColors: null,
        mountainColors: null,
        achievementsList: null,

        // === Conteneurs de plantes secondaires ===
        leftPlants: null,
        rightPlants: null,

        // === Background ===
        background: null,
        ground: null,
        trees: null,
        mountains: null,

        // === Météorites ===
        meteorsContainer: null,

        // === Audio ===
        bgMusic: null,
        musicBtn: null,

        // === Divers ===
        secretInput: null,

        /**
         * Initialise toutes les références DOM
         * À appeler au chargement de la page
         */
        init: function() {
            // Plante
            this.plant = document.getElementById('plant');
            this.stem = document.getElementById('stem');
            this.leaves = document.getElementById('leaves');
            this.flowersContainer = document.getElementById('flowersContainer');
            this.potMouth = document.getElementById('potMouth');

            // UI
            this.levelDisplay = document.getElementById('level');
            this.maxLevelDisplay = document.getElementById('maxLevel');
            this.moneyAmount = document.getElementById('moneyAmount');
            this.moneyRate = document.getElementById('moneyRate');
            this.crystalAmount = document.getElementById('crystalAmount');
            this.crystalRate = document.getElementById('crystalRate');
            this.wateringCostDisplay = document.getElementById('wateringCostDisplay');
            this.wateringCostAmount = document.getElementById('wateringCostAmount');
            this.instructions = document.getElementById('instructions');

            // Arrosoir
            this.wateringCan = document.getElementById('wateringCan');
            this.waterDrops = document.getElementById('waterDrops');

            // Modales
            this.shopModal = document.getElementById('shopModal');
            this.gardenModal = document.getElementById('gardenModal');
            this.decoModal = document.getElementById('decoModal');
            this.bgModal = document.getElementById('bgModal');
            this.decorModal = document.getElementById('decorModal');
            this.natureColorModal = document.getElementById('natureColorModal');
            this.achievementsModal = document.getElementById('achievementsModal');
            this.resetModal = document.getElementById('resetModal');

            // Conteneurs de modales
            this.shopItems = document.getElementById('shopItems');
            this.shopBalance = document.getElementById('shopBalance');
            this.seedItems = document.getElementById('seedItems');
            this.gardenPotItems = document.getElementById('gardenPotItems');
            this.gardenSlots = document.getElementById('gardenSlots');
            this.gardenBalance = document.getElementById('gardenBalance');
            this.decoItems = document.getElementById('decoItems');
            this.decoBalance = document.getElementById('decoBalance');
            this.bgItems = document.getElementById('bgItems');
            this.bgBalance = document.getElementById('bgBalance');
            this.decorItems = document.getElementById('decorItems');
            this.decorBalance = document.getElementById('decorBalance');
            this.groundColors = document.getElementById('groundColors');
            this.treeColors = document.getElementById('treeColors');
            this.mountainColors = document.getElementById('mountainColors');
            this.achievementsList = document.getElementById('achievementsList');

            // Conteneurs de plantes secondaires
            this.leftPlants = document.getElementById('leftPlants');
            this.rightPlants = document.getElementById('rightPlants');

            // Background
            this.background = document.querySelector('.background');
            this.ground = document.querySelector('.ground');
            this.trees = document.querySelectorAll('.tree');
            this.mountains = document.querySelectorAll('.mountain');

            // Météorites
            this.meteorsContainer = document.getElementById('meteorsContainer');

            // Audio
            this.bgMusic = document.getElementById('bgMusic');
            this.musicBtn = document.getElementById('musicBtn');

            // Divers
            this.secretInput = document.getElementById('secretInput');

            KP.emit('dom:ready');
        }
    };

    // Alias pour accès rapide
    KP.DOM = KP.Core.DOM;
})();
