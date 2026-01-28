/**
 * QuestController - Gestion des quêtes horaires
 * 3 quêtes différentes chaque heure, 100 diamants de récompense chacune
 */
(function() {
    'use strict';

    KP.Features.Quests = KP.Features.Quests || {};

    KP.Features.Quests.Controller = {
        checkInterval: null,
        hourCheckInterval: null,

        /**
         * Génère un seed basé sur l'heure actuelle
         */
        getHourSeed: function() {
            var now = new Date();
            return now.getFullYear() * 1000000 +
                   (now.getMonth() + 1) * 10000 +
                   now.getDate() * 100 +
                   now.getHours();
        },

        /**
         * Générateur pseudo-aléatoire déterministe
         */
        seededRandom: function(seed) {
            var x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        },

        /**
         * Sélectionne 3 quêtes uniques basées sur le seed horaire
         */
        selectHourlyQuests: function() {
            var seed = this.getHourSeed();
            var allQuests = KP.Config.Quests.slice();
            var selectedQuests = [];

            for (var i = 0; i < 3 && allQuests.length > 0; i++) {
                var randomIndex = Math.floor(this.seededRandom(seed + i) * allQuests.length);
                selectedQuests.push(allQuests[randomIndex]);
                allQuests.splice(randomIndex, 1);
            }

            return selectedQuests;
        },

        /**
         * Vérifie si les quêtes doivent être régénérées (nouvelle heure)
         */
        checkHourChange: function() {
            var currentSeed = this.getHourSeed();

            if (KP.State.questHourSeed !== currentSeed) {
                this.resetQuests(currentSeed);
            }
        },

        /**
         * Réinitialise les quêtes pour une nouvelle heure
         */
        resetQuests: function(newSeed) {
            KP.State.questHourSeed = newSeed;
            KP.State.activeQuests = this.selectHourlyQuests().map(function(quest) {
                return {
                    id: quest.id,
                    progress: 0,
                    completed: false,
                    claimed: false
                };
            });
            KP.State.questTracking = {
                waterCount: 0,
                meteorCount: 0,
                coinsEarned: 0,
                levelsGrown: 0,
                gardenWaterCount: 0,
                clickCount: 0,
                shopOpenCount: 0,
                sessionPlayTime: 0
            };
            KP.save();
        },

        /**
         * Initialise les quêtes si nécessaire
         */
        initQuests: function() {
            var currentSeed = this.getHourSeed();

            if (!KP.State.questHourSeed || KP.State.questHourSeed !== currentSeed) {
                this.resetQuests(currentSeed);
            }

            if (!KP.State.questTracking) {
                KP.State.questTracking = {
                    waterCount: 0,
                    meteorCount: 0,
                    coinsEarned: 0,
                    levelsGrown: 0,
                    gardenWaterCount: 0,
                    clickCount: 0,
                    shopOpenCount: 0,
                    sessionPlayTime: 0
                };
            }
        },

        /**
         * Met à jour le tracking d'une action
         */
        track: function(key, amount) {
            if (!KP.State.questTracking) return;

            amount = amount || 1;
            KP.State.questTracking[key] = (KP.State.questTracking[key] || 0) + amount;

            this.checkQuestProgress();
        },

        /**
         * Vérifie la progression de toutes les quêtes actives
         */
        checkQuestProgress: function() {
            var self = this;
            var hourlyQuests = this.selectHourlyQuests();
            var needSave = false;

            KP.State.activeQuests.forEach(function(activeQuest, index) {
                if (activeQuest.completed) return;

                var questDef = hourlyQuests.find(function(q) { return q.id === activeQuest.id; });
                if (!questDef) return;

                var currentProgress = KP.State.questTracking[questDef.trackKey] || 0;
                activeQuest.progress = Math.min(currentProgress, questDef.target);

                if (currentProgress >= questDef.target && !activeQuest.completed) {
                    activeQuest.completed = true;
                    needSave = true;
                    KP.UI.Notifications.show('Quête terminée: ' + questDef.name + ' !', 'success');
                }
            });

            if (needSave) {
                KP.save();
            }
        },

        /**
         * Récupère la récompense d'une quête
         */
        claimReward: function(questIndex) {
            var activeQuest = KP.State.activeQuests[questIndex];
            if (!activeQuest || !activeQuest.completed || activeQuest.claimed) {
                return false;
            }

            activeQuest.claimed = true;
            KP.State.crystals += KP.Config.QuestReward;
            KP.emit('crystals:changed', { amount: KP.State.crystals });
            KP.UI.Notifications.show('+' + KP.Config.QuestReward + ' 💎', 'reward');
            KP.save();
            this.render();

            return true;
        },

        /**
         * Ouvre la modale des quêtes
         */
        open: function(e) {
            if (e) e.stopPropagation();
            this.render();
            KP.UI.Modal.open('quests');
        },

        /**
         * Ferme la modale des quêtes
         */
        close: function(e) {
            if (e) e.stopPropagation();
            KP.UI.Modal.close('quests');
        },

        /**
         * Calcule le temps restant avant la prochaine heure
         */
        getTimeRemaining: function() {
            var now = new Date();
            var minutes = 59 - now.getMinutes();
            var seconds = 59 - now.getSeconds();
            return { minutes: minutes, seconds: seconds };
        },

        /**
         * Affiche la liste des quêtes
         */
        render: function() {
            var list = document.getElementById('questsList');
            var timerEl = document.getElementById('questTimer');

            if (!list) return;

            list.innerHTML = '';

            var hourlyQuests = this.selectHourlyQuests();
            var self = this;

            hourlyQuests.forEach(function(questDef, index) {
                var activeQuest = KP.State.activeQuests[index];
                if (!activeQuest) return;

                var progress = activeQuest.progress || 0;
                var isCompleted = activeQuest.completed;
                var isClaimed = activeQuest.claimed;
                var progressPercent = Math.min(100, (progress / questDef.target) * 100);

                var item = document.createElement('div');
                item.className = 'quest-item' + (isCompleted ? ' completed' : '') + (isClaimed ? ' claimed' : '');

                var buttonHtml = '';
                if (isClaimed) {
                    buttonHtml = '<div class="quest-claimed">Récupéré ✓</div>';
                } else if (isCompleted) {
                    buttonHtml = '<button class="quest-claim-btn" data-index="' + index + '">Récupérer 💎' + KP.Config.QuestReward + '</button>';
                } else {
                    buttonHtml = '<div class="quest-progress-text">' + progress + '/' + questDef.target + '</div>';
                }

                item.innerHTML = [
                    '<div class="quest-icon">' + questDef.icon + '</div>',
                    '<div class="quest-info">',
                    '    <div class="quest-name">' + questDef.name + '</div>',
                    '    <div class="quest-desc">' + questDef.desc + '</div>',
                    '    <div class="quest-progress-bar">',
                    '        <div class="quest-progress-fill" style="width: ' + progressPercent + '%"></div>',
                    '    </div>',
                    '</div>',
                    '<div class="quest-reward">',
                    buttonHtml,
                    '</div>'
                ].join('');

                list.appendChild(item);
            });

            // Ajouter les événements aux boutons
            var claimButtons = list.querySelectorAll('.quest-claim-btn');
            claimButtons.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var index = parseInt(btn.getAttribute('data-index'));
                    self.claimReward(index);
                });
            });

            // Mettre à jour le timer
            this.updateTimer();
        },

        /**
         * Met à jour le timer
         */
        updateTimer: function() {
            var timerEl = document.getElementById('questTimer');
            if (!timerEl) return;

            var remaining = this.getTimeRemaining();
            var minutes = remaining.minutes.toString().padStart(2, '0');
            var seconds = remaining.seconds.toString().padStart(2, '0');
            timerEl.textContent = minutes + ':' + seconds;
        },

        /**
         * Démarre les vérifications périodiques
         */
        startCheckers: function() {
            var self = this;

            // Vérifier le changement d'heure toutes les 30 secondes
            this.hourCheckInterval = setInterval(function() {
                self.checkHourChange();
            }, 30000);

            // Mettre à jour le timer toutes les secondes
            this.timerInterval = setInterval(function() {
                self.updateTimer();
                // Incrémenter le temps de jeu de la session
                self.track('sessionPlayTime', 1);
            }, 1000);
        },

        /**
         * Arrête les vérifications
         */
        stopCheckers: function() {
            if (this.hourCheckInterval) {
                clearInterval(this.hourCheckInterval);
                this.hourCheckInterval = null;
            }
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
        },

        /**
         * Configure les écouteurs d'événements pour le tracking
         */
        setupTracking: function() {
            var self = this;

            // Tracking des arrosages
            KP.on('plant:grew', function() {
                self.track('waterCount');
                self.track('levelsGrown');
            });

            // Tracking des météorites
            KP.on('meteor:collected', function() {
                self.track('meteorCount');
            });

            // Tracking des coins gagnés
            KP.on('money:earned', function(data) {
                if (data && data.amount) {
                    self.track('coinsEarned', data.amount);
                }
            });

            // Tracking arrosage jardin
            KP.on('garden:watered', function() {
                self.track('gardenWaterCount');
            });

            // Tracking ouverture shop
            KP.on('shop:opened', function() {
                self.track('shopOpenCount');
            });

            // Tracking des clics
            document.addEventListener('click', function() {
                self.track('clickCount');
            });
        },

        /**
         * Initialise le système de quêtes
         */
        init: function() {
            var self = this;

            this.initQuests();
            this.setupTracking();
            this.startCheckers();

            // Bouton Quêtes
            var questBtn = document.getElementById('questBtn');
            if (questBtn) {
                questBtn.addEventListener('click', function(e) {
                    self.open(e);
                });
            }

            // Touche Q pour ouvrir/fermer
            document.addEventListener('keydown', function(e) {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

                if (e.key === 'q' || e.key === 'Q') {
                    e.preventDefault();
                    if (KP.UI.Modal.isOpen('quests')) {
                        self.close();
                    } else {
                        self.open();
                    }
                }
            });
        }
    };

    // Alias
    KP.Features.Quests.open = KP.Features.Quests.Controller.open.bind(KP.Features.Quests.Controller);
    KP.Features.Quests.close = KP.Features.Quests.Controller.close.bind(KP.Features.Quests.Controller);
    KP.Features.Quests.track = KP.Features.Quests.Controller.track.bind(KP.Features.Quests.Controller);
})();
