/**
 * Achievements - Définitions des succès
 */
(function() {
    'use strict';

    KP.Config.Achievements = [
        {
            id: 'premier_sou',
            name: 'Premier sou',
            desc: 'Débloque ton premier Kawai Money',
            icon: '🪙',
            check: function() { return KP.State.kawaiMoney >= 1; }
        },
        {
            id: 'gogo68c',
            name: 'gogo68c',
            desc: 'Débloque 68 Kawai Money',
            icon: '🎮',
            check: function() { return KP.State.kawaiMoney >= 68; }
        },
        {
            id: 'et_de_100',
            name: 'Et de 100',
            desc: 'Atteins 100 Kawai Money',
            icon: '💯',
            check: function() { return KP.State.kawaiMoney >= 100; }
        },
        {
            id: 'millenaire',
            name: 'Millénaire',
            desc: 'Atteins 1000 Kawai Money',
            icon: '🏛️',
            check: function() { return KP.State.kawaiMoney >= 1000; }
        },
        {
            id: 'ca_fait_beaucoup',
            name: 'Ça fait beaucoup là nn?',
            desc: 'Atteins 10000 Kawai Money',
            icon: '🤑',
            check: function() { return KP.State.kawaiMoney >= 10000; }
        },
        {
            id: 'richissime',
            name: 'Richissime',
            desc: 'Atteins 100000 Kawai Money',
            icon: '💎',
            check: function() { return KP.State.kawaiMoney >= 100000; }
        },
        {
            id: 'millionnaire_kawai',
            name: 'Millionnaire Kawai',
            desc: 'Atteins 1000000 Kawai Money',
            icon: '👑',
            check: function() { return KP.State.kawaiMoney >= 1000000; }
        },
        {
            id: 'dieu_des_kawaien',
            name: 'Dieu des Kawaien',
            desc: 'Atteins 10000000 Kawai Money',
            icon: '⚡',
            check: function() { return KP.State.kawaiMoney >= 10000000; }
        },
        {
            id: 'picsou_choque',
            name: 'Même Picsou il est choqué',
            desc: 'Atteins 100000000 Kawai Money',
            icon: '🦆',
            check: function() { return KP.State.kawaiMoney >= 100000000; }
        },
        {
            id: 'jardinier_dimanche',
            name: 'Jardinier du dimanche',
            desc: 'Atteins le niveau 10 avec ta plante',
            icon: '🌱',
            check: function() { return KP.State.growthLevel >= KP.State.maxLevel; }
        },
        {
            id: 'decoupage_debutant',
            name: 'Découpage débutant',
            desc: 'Coupe ta fleur pour la remettre à zéro',
            icon: '✂️',
            check: function() { return KP.State.freeWateringUnlocked; }
        },
        {
            id: 'decoupeur_pro',
            name: 'Découpeur pro',
            desc: 'Coupe ta plante 10 fois',
            icon: '🪚',
            check: function() { return KP.State.harvestCount >= 10; }
        },
        {
            id: 'decoupeur_fou',
            name: 'Découpeur fou',
            desc: 'Coupe ta plante 100 fois',
            icon: '🔪',
            check: function() { return KP.State.harvestCount >= 100; }
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
            id: 'picsou',
            name: 'Picsou',
            desc: 'Équipe le pot doré',
            icon: '💰',
            check: function() { return KP.State.equippedPot === 'pot_gold'; }
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
            id: 'tete_dans_ciel',
            name: 'La tête dans le ciel',
            desc: 'Fais grandir ta plante au-delà de l\'écran',
            icon: '☁️',
            check: function() {
                var leafPairs = Math.floor(KP.State.growthLevel / 2);
                var leafSpacing = 30;
                var baseHeight = 15;
                var stemHeight = baseHeight + (leafPairs * leafSpacing * 2) + (KP.State.growthLevel * 5);
                var maxAvailableHeight = window.innerHeight * 0.55;
                return stemHeight > maxAvailableHeight;
            }
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
            id: 'vie_en_rose',
            name: 'La vie en rose',
            desc: 'Mets tout en rose : pot, arbres, montagnes, déco et fond',
            icon: '🌷',
            check: function() {
                var pinkDecos = ['deco_heart', 'deco_ribbon', 'deco_cherry', 'deco_strawberry', 'deco_balloon'];
                var hasPinkDeco = KP.State.placedDecoItems.some(function(item) {
                    return pinkDecos.includes(item.type);
                });
                var pinkBgs = ['bg_candy', 'bg_sakura'];
                var hasPinkBg = pinkBgs.includes(KP.State.equippedBackground);
                return KP.State.equippedPot === 'pot_pink' &&
                       KP.State.selectedGroundColor === 'ground_purple' &&
                       KP.State.selectedTreeColor === 'tree_pink' &&
                       KP.State.selectedMountainColor === 'mountain_pink' &&
                       hasPinkDeco &&
                       hasPinkBg;
            }
        },
        {
            id: 'il_neige',
            name: 'Il neige!',
            desc: 'Mets le sol en blanc',
            icon: '❄️',
            check: function() { return KP.State.selectedGroundColor === 'ground_snow'; }
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
            id: 'premiere_boite',
            name: 'Première boîte',
            desc: 'Achète ton premier coffre',
            icon: '📦',
            check: function() { return KP.State.lootboxesBought >= 1; }
        },
        {
            id: 'boite_epic',
            name: 'Boîte Epic',
            desc: 'Achète ta première boîte épique',
            icon: '🎁',
            check: function() { return KP.State.epicLootboxesBought >= 1; }
        },
        {
            id: 'boite_legendary',
            name: 'Legendary',
            desc: 'Achète une boîte légendaire',
            icon: '👑',
            check: function() { return KP.State.legendaryLootboxesBought >= 1; }
        },
        {
            id: 'fou_des_mines',
            name: 'Fou des mines',
            desc: 'Achète 1000 mines',
            icon: '⛏️',
            check: function() { return KP.State.diamondMines >= 1000; }
        },
        {
            id: 'diamant_a_foison',
            name: 'Diamant à foison',
            desc: 'Débloque 1000 diamants',
            icon: '💎',
            check: function() { return KP.State.crystals >= 1000; }
        },
        {
            id: 'lune_sacree',
            name: 'Lune sacrée',
            desc: 'Débloque l\'image de la lune secrète',
            icon: '🌙',
            secret: true,
            check: function() { return KP.State.secretImageUnlocked; }
        },
        {
            id: 'fou_du_gambling',
            name: 'Fou du gambling',
            desc: 'Achète 100 coffres',
            icon: '🎰',
            check: function() { return KP.State.lootboxesBought >= 100; }
        },
        {
            id: 'etoile_fileur_pro',
            name: 'Étoile fileur pro',
            desc: 'Attrape 50 étoiles filantes',
            icon: '☄️',
            check: function() { return KP.State.meteorsCollected >= 50; }
        },
        {
            id: 'comment',
            name: 'Comment?',
            desc: 'Attrape 1000 étoiles filantes',
            icon: '🤯',
            secret: true,
            check: function() { return KP.State.meteorsCollected >= 1000; }
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
            id: 'technoblade_never_die',
            name: 'Technoblade never die',
            desc: 'Tape "technoblade" avec ton clavier',
            icon: '🐷',
            secret: true,
            check: function() { return KP.State.technobladeTyped; }
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
        },
        {
            id: 'tricheur',
            name: 'Tricheur',
            desc: 'Atteins 1000000000 Kawai Money',
            icon: '🃏',
            secret: true,
            check: function() { return KP.State.kawaiMoney >= 1000000000; }
        }
    ];
})();
