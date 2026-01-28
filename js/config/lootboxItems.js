/**
 * LootboxItems - Configuration des boîtes de loot
 */
(function() {
    'use strict';

    KP.Config.LootboxItems = [
        {
            id: 'lootbox_rare',
            name: 'Coffre Rare',
            desc: 'Contient des récompenses sympas !',
            icon: '📦',
            price: 1000,
            rarity: 'rare',
            color: '#3498db',
            rewards: [
                { type: 'money', min: 500, max: 2000, chance: 39 },
                { type: 'crystals', min: 50, max: 200, chance: 30 },
                { type: 'boost', duration: 30, chance: 20 },
                { type: 'jackpot_money', amount: 10000, chance: 10 },
                { type: 'secret_image', chance: 1 }
            ]
        },
        {
            id: 'lootbox_epic',
            name: 'Coffre Épique',
            desc: 'Récompenses puissantes garanties !',
            icon: '🎁',
            price: 10000,
            rarity: 'epic',
            color: '#9b59b6',
            rewards: [
                { type: 'money', min: 5000, max: 20000, chance: 35 },
                { type: 'crystals', min: 500, max: 2000, chance: 30 },
                { type: 'boost', duration: 60, chance: 15 },
                { type: 'diamond_mine', chance: 10 },
                { type: 'jackpot_money', amount: 100000, chance: 10 }
            ]
        },
        {
            id: 'lootbox_legendary',
            name: 'Coffre Légendaire',
            desc: 'Les meilleures récompenses du jeu !',
            icon: '👑',
            price: 100000,
            rarity: 'legendary',
            color: '#f1c40f',
            rewards: [
                { type: 'money', min: 50000, max: 200000, chance: 30 },
                { type: 'crystals', min: 5000, max: 20000, chance: 25 },
                { type: 'boost', duration: 120, chance: 10 },
                { type: 'diamond_mine', chance: 15 },
                { type: 'multi_diamond_mine', count: 3, chance: 10 },
                { type: 'jackpot_money', amount: 1000000, chance: 10 }
            ]
        }
    ];

    /**
     * Utilitaire pour obtenir une récompense aléatoire d'une lootbox
     * @param {Object} lootbox - La lootbox ouverte
     * @returns {Object} La récompense obtenue
     */
    KP.Config.getRandomReward = function(lootbox) {
        var rewards = lootbox.rewards;
        var totalChance = rewards.reduce(function(sum, r) { return sum + r.chance; }, 0);
        var roll = Math.random() * totalChance;
        var cumulative = 0;

        for (var i = 0; i < rewards.length; i++) {
            cumulative += rewards[i].chance;
            if (roll <= cumulative) {
                return rewards[i];
            }
        }

        return rewards[rewards.length - 1];
    };

    // Image secrète ultra rare
    KP.Config.SecretImage = 'data:image/jpeg;base64,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';
})();
