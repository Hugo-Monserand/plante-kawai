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
