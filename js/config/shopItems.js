/**
 * ShopItems - Données des items du magasin principal
 */
(function() {
    'use strict';

    KP.Config.ShopItems = [
        {
            id: 'pot_blue',
            name: 'Pot Bleu Ciel',
            desc: 'Un joli pot couleur ciel d\'été',
            icon: '🪴',
            price: 100,
            type: 'pot',
            color: '#64b5f6'
        },
        {
            id: 'pot_pink',
            name: 'Pot Rose Bonbon',
            desc: 'Un pot rose tout mignon',
            icon: '🪴',
            price: 500,
            type: 'pot',
            color: '#f48fb1'
        },
        {
            id: 'pot_purple',
            name: 'Pot Violet Royal',
            desc: 'Un pot majestueux',
            icon: '🪴',
            price: 1000,
            type: 'pot',
            color: '#b39ddb'
        },
        {
            id: 'pot_gold',
            name: 'Pot Doré',
            desc: 'Le pot des champions !',
            icon: '🏆',
            price: 5000,
            type: 'pot',
            color: '#ffd54f'
        },
        {
            id: 'flower_blue',
            name: 'Fleurs Bleues',
            desc: 'Multiplie les gains par 2 !',
            icon: '💙',
            price: 300000,
            type: 'flower',
            color: '#64b5f6',
            multiplier: 2
        },
        {
            id: 'flower_yellow',
            name: 'Fleurs Jaunes',
            desc: 'Multiplie les gains par 3 !',
            icon: '💛',
            price: 300000,
            type: 'flower',
            color: '#fff176',
            multiplier: 3
        },
        {
            id: 'flower_purple',
            name: 'Fleurs Violettes',
            desc: 'Multiplie les gains par 4 !',
            icon: '💜',
            price: 750000,
            type: 'flower',
            color: '#ba68c8',
            multiplier: 4
        },
        {
            id: 'flower_rainbow',
            name: 'Fleurs Arc-en-ciel',
            desc: 'Multiplie les gains par 5 !',
            icon: '🌈',
            price: 2500000,
            type: 'flower',
            color: 'rainbow',
            multiplier: 5
        },
        {
            id: 'boost_x2',
            name: 'Boost x2',
            desc: 'Double la production pendant 30s',
            icon: '⚡',
            price: 200,
            type: 'boost',
            duration: 30
        },
        {
            id: 'funnel',
            name: 'Entonnoir Magique',
            desc: 'Collecte automatiquement les étoiles qui passent dessus !',
            icon: '🔻',
            price: 1000000,
            type: 'funnel'
        },
        {
            id: 'diamond_mine',
            name: 'Mine à Diamant',
            desc: 'Produit 1 diamant toutes les 10 secondes',
            icon: '⛏️',
            price: 100,
            type: 'diamond_mine',
            currency: 'diamond'
        }
    ];
})();
