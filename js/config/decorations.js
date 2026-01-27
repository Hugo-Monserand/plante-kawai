/**
 * Decorations - Données des décorations et décors
 */
(function() {
    'use strict';

    // Items de déco (petits objets déplaçables)
    KP.Config.DecoItems = [
        { id: 'deco_heart', name: 'Coeur', emoji: '💖', price: 500 },
        { id: 'deco_star', name: 'Étoile', emoji: '⭐', price: 500 },
        { id: 'deco_sparkle', name: 'Étincelle', emoji: '✨', price: 750 },
        { id: 'deco_butterfly', name: 'Papillon', emoji: '🦋', price: 1500 },
        { id: 'deco_ladybug', name: 'Coccinelle', emoji: '🐞', price: 1500 },
        { id: 'deco_bee', name: 'Abeille', emoji: '🐝', price: 1500 },
        { id: 'deco_snail', name: 'Escargot', emoji: '🐌', price: 1000 },
        { id: 'deco_mushroom', name: 'Champignon', emoji: '🍄', price: 2000 },
        { id: 'deco_clover', name: 'Trèfle', emoji: '🍀', price: 2500 },
        { id: 'deco_cherry', name: 'Cerises', emoji: '🍒', price: 1200 },
        { id: 'deco_strawberry', name: 'Fraise', emoji: '🍓', price: 1200 },
        { id: 'deco_rainbow', name: 'Arc-en-ciel', emoji: '🌈', price: 5000 },
        { id: 'deco_cloud', name: 'Nuage', emoji: '☁️', price: 1000 },
        { id: 'deco_sun', name: 'Soleil', emoji: '🌞', price: 3000 },
        { id: 'deco_moon', name: 'Lune', emoji: '🌙', price: 3000 },
        { id: 'deco_fairy', name: 'Grande Fée', emoji: '<img src="assets/images/fairy.png" class="deco-img">', price: 100000, isImage: true },
        { id: 'deco_million', name: 'Item Légendaire', emoji: '<img src="assets/images/million.png" class="deco-img">', price: 1000000, isImage: true },
        { id: 'deco_crystal', name: 'Cristal', emoji: '💎', price: 7500 },
        { id: 'deco_ribbon', name: 'Ruban', emoji: '🎀', price: 800 },
        { id: 'deco_balloon', name: 'Ballon', emoji: '🎈', price: 600 },
        { id: 'deco_gift', name: 'Cadeau', emoji: '🎁', price: 2000 },
        // Objets bleus
        { id: 'deco_droplet', name: 'Goutte d\'eau', emoji: '💧', price: 600 },
        { id: 'deco_dolphin', name: 'Dauphin', emoji: '🐬', price: 2500 },
        { id: 'deco_fish', name: 'Poisson', emoji: '🐟', price: 1000 },
        { id: 'deco_wave', name: 'Vague', emoji: '🌊', price: 1800 },
        { id: 'deco_snowflake', name: 'Flocon', emoji: '❄️', price: 1200 },
        { id: 'deco_bluediamond', name: 'Diamant bleu', emoji: '💠', price: 4000 },
        { id: 'deco_whale', name: 'Baleine', emoji: '🐋', price: 3500 },
        { id: 'deco_shell', name: 'Coquillage', emoji: '🐚', price: 900 },
        // Objets verts
        { id: 'deco_frog', name: 'Grenouille', emoji: '🐸', price: 1500 },
        { id: 'deco_turtle', name: 'Tortue', emoji: '🐢', price: 2000 },
        { id: 'deco_cactus', name: 'Cactus', emoji: '🌵', price: 1800 },
        { id: 'deco_leaf', name: 'Feuille', emoji: '🍃', price: 500 },
        { id: 'deco_herb', name: 'Herbe', emoji: '🌿', price: 600 },
        { id: 'deco_tree', name: 'Sapin', emoji: '🌲', price: 2200 },
        { id: 'deco_crocodile', name: 'Crocodile', emoji: '🐊', price: 3000 },
        { id: 'deco_cucumber', name: 'Concombre', emoji: '🥒', price: 800 },
        { id: 'deco_avocado', name: 'Avocat', emoji: '🥑', price: 1100 },
        { id: 'deco_dinosaur', name: 'Dinosaure', emoji: '🦖', price: 5000 }
    ];

    // Décors d'arrière-plan (grands objets)
    KP.Config.DecorBgItems = [
        { id: 'decor_castle', name: 'Château', emoji: '🏰', price: 10000 },
        { id: 'decor_house', name: 'Maison', emoji: '🏠', price: 5000 },
        { id: 'decor_cabin', name: 'Chalet', emoji: '🏡', price: 6000 },
        { id: 'decor_temple', name: 'Temple', emoji: '⛩️', price: 15000 },
        { id: 'decor_church', name: 'Église', emoji: '⛪', price: 12000 },
        { id: 'decor_tower', name: 'Tour', emoji: '🗼', price: 20000 },
        { id: 'decor_windmill', name: 'Moulin', emoji: '🏗️', price: 8000 },
        { id: 'decor_tent', name: 'Tente', emoji: '⛺', price: 3000 },
        { id: 'decor_fountain', name: 'Fontaine', emoji: '⛲', price: 7000 },
        { id: 'decor_statue', name: 'Statue', emoji: '🗿', price: 9000 },
        { id: 'decor_bridge', name: 'Pont', emoji: '🌉', price: 11000 },
        { id: 'decor_ferris', name: 'Grande Roue', emoji: '🎡', price: 25000 },
        { id: 'decor_carousel', name: 'Carrousel', emoji: '🎠', price: 18000 },
        { id: 'decor_circus', name: 'Cirque', emoji: '🎪', price: 22000 },
        { id: 'decor_rocket', name: 'Fusée', emoji: '🚀', price: 50000 },
        { id: 'decor_ufo', name: 'OVNI', emoji: '🛸', price: 75000 },
        { id: 'decor_picnic', name: 'Aire de Pique-nique', emoji: '<img src="assets/images/picnic.jpeg" class="decor-bg-img">', price: 50000, isImage: true },
        // Décors bleus
        { id: 'decor_aquarium', name: 'Aquarium', emoji: '🐠', price: 15000 },
        { id: 'decor_igloo', name: 'Igloo', emoji: '🏠', price: 12000 },
        { id: 'decor_sailboat', name: 'Voilier', emoji: '⛵', price: 18000 },
        { id: 'decor_lighthouse', name: 'Phare', emoji: '🗼', price: 20000 },
        // Décors verts
        { id: 'decor_park', name: 'Parc', emoji: '🏞️', price: 14000 },
        { id: 'decor_palmtree', name: 'Palmier', emoji: '🌴', price: 8000 },
        { id: 'decor_bamboo', name: 'Bambou', emoji: '🎋', price: 10000 },
        { id: 'decor_forest', name: 'Forêt', emoji: '🌳', price: 16000 }
    ];
})();
