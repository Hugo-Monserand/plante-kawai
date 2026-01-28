/**
 * State - État global de l'application
 * Centralise toutes les données du jeu
 */
(function() {
    'use strict';

    KP.Core.State = {
        // === Plante principale ===
        growthLevel: 0,
        maxLevel: 10,

        // === Économie ===
        kawaiMoney: 0,
        crystals: 0,
        diamondMines: 0,

        // === Inventaire ===
        ownedItems: [],
        ownedSeeds: [],
        ownedBackgrounds: ['bg_default'],

        // === Équipement ===
        equippedPot: null,
        equippedFlower: null,
        equippedBackground: 'bg_default',

        // === Jardin ===
        gardenSlots: [{ unlocked: true, plant: null, level: 0 }],
        showSidePlants: true,

        // === Décorations ===
        placedDecoItems: [],
        placedDecorBgItems: [],

        // === Couleurs nature ===
        selectedGroundColor: 'ground_green',
        selectedTreeColor: 'tree_pink',
        selectedMountainColor: 'mountain_green',

        // === Entonnoir ===
        hasFunnel: false,
        funnelPosition: { x: 0, y: 0 },

        // === Succès et stats ===
        unlockedAchievements: [],
        totalPlayTime: 0,
        boostUsed: false,
        konamiUsed: 0,
        hugoTyped: false,
        tristanTyped: false,
        code42Used: false,
        freeWateringUnlocked: false,
        harvestCount: 0,

        // === Boost actif ===
        activeBoost: null,

        /**
         * Réinitialise l'état à ses valeurs par défaut
         */
        reset: function() {
            this.growthLevel = 0;
            this.maxLevel = 10;
            this.kawaiMoney = 0;
            this.crystals = 0;
            this.diamondMines = 0;
            this.ownedItems = [];
            this.ownedSeeds = [];
            this.ownedBackgrounds = ['bg_default'];
            this.equippedPot = null;
            this.equippedFlower = null;
            this.equippedBackground = 'bg_default';
            this.gardenSlots = [{ unlocked: true, plant: null, level: 0 }];
            this.showSidePlants = true;
            this.placedDecoItems = [];
            this.placedDecorBgItems = [];
            this.selectedGroundColor = 'ground_green';
            this.selectedTreeColor = 'tree_pink';
            this.selectedMountainColor = 'mountain_green';
            this.hasFunnel = false;
            this.funnelPosition = { x: window.innerWidth / 2 - 40, y: window.innerHeight - 250 };
            this.unlockedAchievements = [];
            this.totalPlayTime = 0;
            this.boostUsed = false;
            this.konamiUsed = 0;
            this.hugoTyped = false;
            this.tristanTyped = false;
            this.code42Used = false;
            this.freeWateringUnlocked = false;
            this.harvestCount = 0;
            this.activeBoost = null;
        },

        /**
         * Retourne un objet sérialisable pour la sauvegarde
         */
        toJSON: function() {
            return {
                kawaiMoney: this.kawaiMoney,
                growthLevel: this.growthLevel,
                maxLevel: this.maxLevel,
                ownedItems: this.ownedItems,
                equippedPot: this.equippedPot,
                equippedFlower: this.equippedFlower,
                gardenSlots: this.gardenSlots,
                ownedSeeds: this.ownedSeeds,
                placedDecoItems: this.placedDecoItems,
                ownedBackgrounds: this.ownedBackgrounds,
                equippedBackground: this.equippedBackground,
                placedDecorBgItems: this.placedDecorBgItems,
                selectedGroundColor: this.selectedGroundColor,
                selectedTreeColor: this.selectedTreeColor,
                selectedMountainColor: this.selectedMountainColor,
                showSidePlants: this.showSidePlants,
                crystals: this.crystals,
                diamondMines: this.diamondMines,
                konamiUsed: this.konamiUsed,
                hasFunnel: this.hasFunnel,
                funnelPosition: this.funnelPosition,
                unlockedAchievements: this.unlockedAchievements,
                boostUsed: this.boostUsed,
                totalPlayTime: this.totalPlayTime,
                hugoTyped: this.hugoTyped,
                tristanTyped: this.tristanTyped,
                code42Used: this.code42Used,
                freeWateringUnlocked: this.freeWateringUnlocked,
                harvestCount: this.harvestCount
            };
        },

        /**
         * Charge l'état depuis un objet de données
         */
        fromJSON: function(data) {
            if (!data) return;

            this.kawaiMoney = data.kawaiMoney || 0;
            this.growthLevel = data.growthLevel || 0;
            this.maxLevel = data.maxLevel || 10;
            this.ownedItems = data.ownedItems || [];
            this.equippedPot = data.equippedPot || null;
            this.equippedFlower = data.equippedFlower || null;
            this.gardenSlots = data.gardenSlots || [{ unlocked: true, plant: null, level: 0 }];
            this.ownedSeeds = data.ownedSeeds || [];
            this.placedDecoItems = data.placedDecoItems || [];
            this.ownedBackgrounds = data.ownedBackgrounds || ['bg_default'];
            this.equippedBackground = data.equippedBackground || 'bg_default';
            this.placedDecorBgItems = data.placedDecorBgItems || [];
            this.selectedGroundColor = data.selectedGroundColor || 'ground_green';
            this.selectedTreeColor = data.selectedTreeColor || 'tree_pink';
            this.selectedMountainColor = data.selectedMountainColor || 'mountain_green';
            this.showSidePlants = data.showSidePlants !== undefined ? data.showSidePlants : true;
            this.crystals = data.crystals || 0;
            this.diamondMines = data.diamondMines || 0;
            this.konamiUsed = data.konamiUsed || 0;
            this.hasFunnel = data.hasFunnel || false;
            this.funnelPosition = data.funnelPosition || { x: window.innerWidth / 2 - 40, y: window.innerHeight - 250 };
            this.unlockedAchievements = data.unlockedAchievements || [];
            this.boostUsed = data.boostUsed || false;
            this.totalPlayTime = data.totalPlayTime || 0;
            this.hugoTyped = data.hugoTyped || false;
            this.tristanTyped = data.tristanTyped || false;
            this.code42Used = data.code42Used || false;
            this.freeWateringUnlocked = data.freeWateringUnlocked || false;
            this.harvestCount = data.harvestCount || 0;
        }
    };

    // Alias pour accès rapide
    KP.State = KP.Core.State;
})();
