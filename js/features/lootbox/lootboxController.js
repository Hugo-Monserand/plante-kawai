/**
 * LootboxController - Logique du magasin de lootbox
 */
(function() {
    'use strict';

    KP.Features.Lootbox = KP.Features.Lootbox || {};

    KP.Features.Lootbox.Controller = {
        /**
         * Ouvre le magasin de lootbox
         */
        open: function(e) {
            if (e) e.stopPropagation();
            var self = this;
            KP.UI.Modal.open('lootbox', function() {
                self.render();
            });
        },

        /**
         * Ferme le magasin de lootbox
         */
        close: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.close('lootbox');
        },

        /**
         * Rendu du magasin
         */
        render: function() {
            KP.Features.Lootbox.Renderer.render();
        },

        /**
         * Achète et ouvre une lootbox
         * @param {Object} lootbox - La lootbox à acheter
         */
        buy: function(lootbox) {
            // Vérifier et dépenser les cristaux
            if (!KP.Features.Economy.Crystals.spend(lootbox.price)) {
                return;
            }

            // Obtenir une récompense aléatoire
            var rewardDef = KP.Config.getRandomReward(lootbox);
            var reward = this._processReward(rewardDef);

            // Afficher l'animation et la récompense
            this._showRewardAnimation(lootbox, reward);

            // Mettre à jour l'affichage
            this.render();
            KP.save();

            // Émettre un événement
            KP.emit('lootbox:opened', {
                lootbox: lootbox,
                reward: reward
            });
        },

        /**
         * Traite une définition de récompense et l'applique
         * @private
         */
        _processReward: function(rewardDef) {
            var reward = {
                type: rewardDef.type,
                icon: '',
                text: '',
                value: 0
            };

            switch (rewardDef.type) {
                case 'money':
                    var moneyAmount = Math.floor(
                        Math.random() * (rewardDef.max - rewardDef.min + 1) + rewardDef.min
                    );
                    KP.Features.Economy.Money.add(moneyAmount);
                    reward.icon = '✿';
                    reward.text = '+' + moneyAmount + ' Kawai Coins';
                    reward.value = moneyAmount;
                    break;

                case 'crystals':
                    var crystalAmount = Math.floor(
                        Math.random() * (rewardDef.max - rewardDef.min + 1) + rewardDef.min
                    );
                    KP.Features.Economy.Crystals.add(crystalAmount);
                    reward.icon = '💎';
                    reward.text = '+' + crystalAmount + ' Diamants';
                    reward.value = crystalAmount;
                    break;

                case 'boost':
                    KP.Features.Plant.Controller.activateBoost(rewardDef.duration);
                    reward.icon = '⚡';
                    reward.text = 'Boost x2 pendant ' + rewardDef.duration + 's';
                    reward.value = rewardDef.duration;
                    break;

                case 'diamond_mine':
                    KP.State.diamondMines++;
                    KP.Features.Economy.Crystals.updateDisplay();
                    reward.icon = '⛏️';
                    reward.text = '+1 Mine à Diamant';
                    reward.value = 1;
                    break;

                case 'multi_diamond_mine':
                    KP.State.diamondMines += rewardDef.count;
                    KP.Features.Economy.Crystals.updateDisplay();
                    reward.icon = '⛏️';
                    reward.text = '+' + rewardDef.count + ' Mines à Diamant';
                    reward.value = rewardDef.count;
                    break;

                case 'jackpot_money':
                    KP.Features.Economy.Money.add(rewardDef.amount);
                    reward.icon = '🎰';
                    reward.text = 'JACKPOT! +' + rewardDef.amount + ' Kawai Coins';
                    reward.value = rewardDef.amount;
                    break;

                case 'secret_image':
                    KP.State.secretImageUnlocked = true;
                    reward.isImage = true;
                    reward.imageSrc = KP.Config.SecretImage;
                    reward.icon = '🐱';
                    reward.text = 'ULTRA RARE! Image débloquée dans Déco!';
                    reward.value = 1;
                    break;
            }

            return reward;
        },

        /**
         * Affiche l'animation de récompense
         * @private
         */
        _showRewardAnimation: function(lootbox, reward) {
            // Créer l'élément d'animation
            var overlay = document.createElement('div');
            overlay.className = 'lootbox-reward-overlay';

            // Afficher l'icône ou l'image selon le type de récompense
            var rewardIconHtml = reward.isImage
                ? '<img class="reward-secret-image" src="' + reward.imageSrc + '" alt="Secret!">'
                : '<span class="reward-icon">' + reward.icon + '</span>';

            overlay.innerHTML = [
                '<div class="lootbox-reward-content">',
                '    <div class="lootbox-opening" style="color: ' + lootbox.color + '">',
                '        <span class="lootbox-icon-big">' + lootbox.icon + '</span>',
                '    </div>',
                '    <div class="reward-reveal">',
                '        ' + rewardIconHtml,
                '        <span class="reward-text">' + reward.text + '</span>',
                '    </div>',
                '</div>'
            ].join('');

            document.body.appendChild(overlay);

            // Animation d'ouverture puis de récompense
            setTimeout(function() {
                overlay.classList.add('showing-reward');
            }, 500);

            // Fermer l'animation au clic ou après un délai
            var closeOverlay = function() {
                overlay.classList.add('closing');
                setTimeout(function() {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }, 300);
            };

            overlay.addEventListener('click', closeOverlay);
            setTimeout(closeOverlay, 3000);
        },

        /**
         * Initialise le controller
         */
        init: function() {
            var self = this;
            var lootboxBtn = document.getElementById('lootboxBtn');

            if (lootboxBtn) {
                lootboxBtn.addEventListener('click', function(e) {
                    self.open(e);
                });
            }
        }
    };

    // Alias pour accès rapide
    KP.Features.Lootbox.open = KP.Features.Lootbox.Controller.open.bind(KP.Features.Lootbox.Controller);
    KP.Features.Lootbox.buy = KP.Features.Lootbox.Controller.buy.bind(KP.Features.Lootbox.Controller);
    KP.Features.Lootbox.render = KP.Features.Lootbox.Controller.render.bind(KP.Features.Lootbox.Controller);
})();
