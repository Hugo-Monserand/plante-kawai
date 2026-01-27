/**
 * Achievements - Définitions des succès
 */
(function() {
    'use strict';

    KP.Config.Achievements = [
        {
            id: 'jardinier_dimanche',
            name: 'Jardinier du dimanche',
            desc: 'Atteins le niveau 10 avec ta plante',
            icon: '🌱',
            check: function() { return KP.State.growthLevel >= KP.State.maxLevel; }
        },
        {
            id: 'fleuriste',
            name: 'Fleuriste',
            desc: 'Change la couleur de ta fleur',
            icon: '🌸',
            check: function() { return KP.State.equippedFlower !== null; }
        },
        {
            id: 'fleuriste_expert',
            name: 'Fleuriste expert',
            desc: 'Achète toutes les fleurs du jeu',
            icon: '💐',
            check: function() {
                var flowerItems = KP.Config.ShopItems.filter(function(item) { return item.type === 'flower'; });
                return flowerItems.every(function(item) { return KP.State.ownedItems.includes(item.id); });
            }
        },
        {
            id: 'martiens',
            name: 'Les martiens nous envahissent',
            desc: 'Achète une soucoupe volante',
            icon: '🛸',
            check: function() {
                return KP.State.placedDecorBgItems.some(function(item) { return item.type === 'decor_ufo'; });
            }
        },
        {
            id: 'macdo',
            name: 'Mac do meilleur que BK',
            desc: 'Achète l\'item légendaire',
            icon: '🍔',
            check: function() {
                return KP.State.placedDecoItems.some(function(item) { return item.type === 'deco_million'; });
            }
        },
        {
            id: 'paysagiste',
            name: 'Paysagiste',
            desc: 'Change le fond du paysage',
            icon: '🎨',
            check: function() {
                return KP.State.equippedBackground !== null && KP.State.equippedBackground !== 'bg_default';
            }
        },
        {
            id: 'paysagiste_ultime',
            name: 'Paysagiste ultime',
            desc: 'Achète tous les fonds',
            icon: '🖼️',
            check: function() {
                var bgItems = KP.Config.Backgrounds.filter(function(bg) { return bg.price > 0; });
                return bgItems.every(function(bg) { return KP.State.ownedBackgrounds.includes(bg.id); });
            }
        },
        {
            id: 'decorateur_tracteur',
            name: 'Décorateurs en tracteur',
            desc: 'Achète ta première décoration',
            icon: '🚜',
            check: function() { return KP.State.placedDecoItems.length > 0; }
        },
        {
            id: 'decorateur_ultime',
            name: 'Décorateur ultime',
            desc: 'Achète toutes les décorations',
            icon: '✨',
            check: function() {
                var decoIds = KP.Config.DecoItems.map(function(item) { return item.id; });
                return decoIds.every(function(id) {
                    return KP.State.placedDecoItems.some(function(placed) { return placed.type === id; });
                });
            }
        },
        {
            id: 'montagne_turquoise',
            name: 'Maman regarde une montagne turquoise',
            desc: 'Mets ta montagne en bleu',
            icon: '⛰️',
            check: function() { return KP.State.selectedMountainColor === 'mountain_blue'; }
        },
        {
            id: 'grainiste',
            name: 'Grainiste',
            desc: 'Achète 3 graines',
            icon: '🌾',
            check: function() { return KP.State.ownedSeeds.length >= 3; }
        },
        {
            id: 'potiste',
            name: 'Potiste',
            desc: 'Achète tous les pots de jardin',
            icon: '🪴',
            check: function() {
                return KP.State.gardenSlots.length >= 4 && KP.State.gardenSlots.slice(1, 4).every(function(slot) { return slot.unlocked; });
            }
        },
        {
            id: 'bebe_pot',
            name: 'Oh des bébé pot',
            desc: 'Débloque les trois petites plantes niveau max',
            icon: '👶',
            check: function() {
                var maxLevelPlants = KP.State.gardenSlots.filter(function(slot) {
                    return slot.unlocked && slot.plant && slot.level >= 10;
                });
                return maxLevelPlants.length >= 3;
            }
        },
        {
            id: 'flash',
            name: 'Flash',
            desc: 'Achète ton premier boost',
            icon: '⚡',
            check: function() { return KP.State.boostUsed; }
        },
        {
            id: 'commencons',
            name: 'Commençons',
            desc: 'Achète ton premier pot',
            icon: '🪴',
            check: function() {
                var potItems = KP.Config.ShopItems.filter(function(item) { return item.type === 'pot'; });
                return potItems.some(function(item) { return KP.State.ownedItems.includes(item.id); });
            }
        },
        {
            id: 'etoiles_jazz',
            name: 'Sous les étoiles du jazz',
            desc: 'Attrape ta première étoile filante',
            icon: '🌠',
            check: function() { return KP.State.crystals > 0; }
        },
        {
            id: 'pad_colibris',
            name: 'Pad colibris:quad',
            desc: 'Joue pendant 1 heure',
            icon: '⏰',
            check: function() { return KP.State.totalPlayTime >= 3600; }
        },
        {
            id: 'vie_en_vert',
            name: 'La vie en vert',
            desc: 'Mets le sol, les arbres et les montagnes en vert',
            icon: '🌿',
            check: function() {
                return KP.State.selectedGroundColor === 'ground_green' &&
                       KP.State.selectedTreeColor === 'tree_green' &&
                       KP.State.selectedMountainColor === 'mountain_green';
            }
        },
        {
            id: 'fou_chapeau',
            name: 'Le fou n\'a plus de chapeau',
            desc: 'Achète un entonnoir',
            icon: '🔻',
            check: function() { return KP.State.hasFunnel; }
        },
        {
            id: 'du_diamant',
            name: 'Du diamant',
            desc: 'Possède 1 ou plus de diamant',
            icon: '💎',
            check: function() { return KP.State.crystals >= 1; }
        },
        {
            id: 'nom_de_dieu',
            name: 'Nom de dieu',
            desc: 'Tape "hugo" avec ton clavier',
            icon: '😱',
            secret: true,
            check: function() { return KP.State.hugoTyped; }
        },
        {
            id: 'premier_client',
            name: 'Premier client',
            desc: 'Tape "tristan" avec ton clavier',
            icon: '🤝',
            secret: true,
            check: function() { return KP.State.tristanTyped; }
        },
        {
            id: 'konami_master',
            name: 'Konami Master',
            desc: 'Effectue le Konami Code',
            icon: '🎮',
            secret: true,
            check: function() { return KP.State.konamiUsed > 0; }
        },
        {
            id: 'arr_nn',
            name: 'Arr nn?',
            desc: 'Tape 3 fois le Konami Code',
            icon: '🏴‍☠️',
            secret: true,
            check: function() { return KP.State.konamiUsed >= 3; }
        }
    ];
})();
