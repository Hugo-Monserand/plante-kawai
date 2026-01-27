/**
 * AchievementController - Gestion des succès
 */
(function() {
    'use strict';

    KP.Features.Achievements = KP.Features.Achievements || {};

    KP.Features.Achievements.Controller = {
        checkInterval: null,

        /**
         * Ouvre la modale des succès
         */
        open: function(e) {
            if (e) e.stopPropagation();
            this.render();
            KP.UI.Modal.open('achievements');
        },

        /**
         * Ferme la modale des succès
         */
        close: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.close('achievements');
        },

        /**
         * Affiche la liste des succès
         */
        render: function() {
            var list = document.getElementById('achievementsList');
            var empty = document.querySelector('.achievements-empty');

            if (!list) return;

            list.innerHTML = '';

            KP.Config.Achievements.forEach(function(achievement) {
                var isUnlocked = KP.State.unlockedAchievements.includes(achievement.id);

                // Cacher les succès secrets non débloqués
                if (achievement.secret && !isUnlocked) return;

                var item = document.createElement('div');
                item.className = 'achievement-item ' + (isUnlocked ? 'unlocked' : 'locked');

                item.innerHTML = [
                    '<div class="achievement-icon">' + achievement.icon + '</div>',
                    '<div class="achievement-info">',
                    '    <div class="achievement-name">' + achievement.name + '</div>',
                    '    <div class="achievement-desc">' + achievement.desc + '</div>',
                    '</div>',
                    '<div class="achievement-badge ' + (isUnlocked ? 'unlocked' : 'locked') + '">',
                    '    ' + (isUnlocked ? 'Débloqué !' : 'Verrouillé'),
                    '</div>'
                ].join('');

                list.appendChild(item);
            });

            // Afficher/cacher le message vide
            if (empty) {
                empty.style.display = KP.State.unlockedAchievements.length === 0 ? 'block' : 'none';
            }
        },

        /**
         * Vérifie tous les succès
         */
        check: function() {
            var newUnlock = false;
            var self = this;

            KP.Config.Achievements.forEach(function(achievement) {
                if (!KP.State.unlockedAchievements.includes(achievement.id)) {
                    try {
                        if (achievement.check()) {
                            KP.State.unlockedAchievements.push(achievement.id);
                            newUnlock = true;
                            KP.UI.Notifications.showAchievement(achievement);
                            KP.emit('achievement:unlocked', { achievement: achievement });
                        }
                    } catch (e) {
                        // Ignorer les erreurs de vérification
                    }
                }
            });

            if (newUnlock) {
                KP.save();
            }
        },

        /**
         * Démarre la vérification périodique des succès
         */
        startChecker: function() {
            var self = this;
            this.checkInterval = setInterval(function() {
                self.check();
            }, KP.Constants.ACHIEVEMENT_CHECK_INTERVAL);
        },

        /**
         * Arrête la vérification
         */
        stopChecker: function() {
            if (this.checkInterval) {
                clearInterval(this.checkInterval);
                this.checkInterval = null;
            }
        },

        /**
         * Initialise les succès
         */
        init: function() {
            var self = this;

            // Touche S pour ouvrir/fermer
            document.addEventListener('keydown', function(e) {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

                if (e.key === 's' || e.key === 'S') {
                    e.preventDefault();
                    if (KP.UI.Modal.isOpen('achievements')) {
                        self.close();
                    } else {
                        self.open();
                    }
                }
            });

            this.startChecker();
        }
    };

    // Alias
    KP.Features.Achievements.open = KP.Features.Achievements.Controller.open.bind(KP.Features.Achievements.Controller);
    KP.Features.Achievements.close = KP.Features.Achievements.Controller.close.bind(KP.Features.Achievements.Controller);
    KP.Features.Achievements.check = KP.Features.Achievements.Controller.check.bind(KP.Features.Achievements.Controller);
})();
