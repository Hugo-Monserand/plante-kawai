/**
 * SecretCodes - Gestion des codes secrets et Easter eggs
 */
(function() {
    'use strict';

    KP.Features.Secrets = KP.Features.Secrets || {};

    KP.Features.Secrets.Codes = {
        // État des séquences
        konamiIndex: 0,
        hugoIndex: 0,
        tristanIndex: 0,
        technobladeIndex: 0,

        // Séquences
        KONAMI_CODE: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
        HUGO_SEQUENCE: ['h', 'u', 'g', 'o'],
        TRISTAN_SEQUENCE: ['t', 'r', 'i', 's', 't', 'a', 'n'],
        TECHNOBLADE_SEQUENCE: ['t', 'e', 'c', 'h', 'n', 'o', 'b', 'l', 'a', 'd', 'e'],

        /**
         * Active la récompense du Konami Code
         */
        activateKonami: function() {
            if (KP.State.konamiUsed >= 3) return;

            KP.State.konamiUsed++;
            KP.State.crystals += 100;
            KP.Features.Economy.Crystals.updateDisplay();
            KP.Features.Achievements.check();
            KP.save();

            KP.UI.Notifications.showCenteredPopup('+100 💎');
            KP.emit('secret:konami');
        },

        /**
         * Active le secret "hugo"
         */
        activateHugo: function() {
            if (KP.State.hugoTyped) return;

            KP.State.hugoTyped = true;
            KP.Features.Achievements.check();
            KP.save();
            KP.emit('secret:hugo');
        },

        /**
         * Active le secret "tristan"
         */
        activateTristan: function() {
            if (KP.State.tristanTyped) return;

            KP.State.tristanTyped = true;
            KP.Features.Achievements.check();
            KP.save();
            KP.emit('secret:tristan');
        },

        /**
         * Active le secret "technoblade"
         */
        activateTechnoblade: function() {
            if (KP.State.technobladeTyped) return;

            KP.State.technobladeTyped = true;
            KP.Features.Achievements.check();
            KP.save();
            KP.emit('secret:technoblade');
        },

        /**
         * Gère le code secret via l'input
         */
        handleSecretInput: function() {
            var secretInput = document.getElementById('secretInput');
            var instructions = document.getElementById('instructions');
            if (!secretInput || !instructions) return;

            var originalInstruction = instructions.textContent;

            secretInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    if (secretInput.value === '42' && !KP.State.code42Used) {
                        KP.State.code42Used = true;
                        KP.State.kawaiMoney += 1000000;
                        KP.Features.Economy.Money.updateDisplay();
                        KP.save();
                        secretInput.value = '';
                        secretInput.blur();
                        instructions.textContent = originalInstruction;
                    } else {
                        secretInput.value = '';
                    }
                }
            });

            secretInput.addEventListener('click', function(e) {
                e.stopPropagation();
            });

            secretInput.addEventListener('focus', function() {
                instructions.textContent = 'Code à deux chiffres...';
            });

            secretInput.addEventListener('blur', function() {
                instructions.textContent = originalInstruction;
            });
        },

        /**
         * Gère les touches pour les codes secrets
         */
        handleKeydown: function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            var key = e.key.toLowerCase();

            // Konami Code
            if (KP.State.konamiUsed < 3) {
                if (e.key === this.KONAMI_CODE[this.konamiIndex]) {
                    this.konamiIndex++;
                    if (this.konamiIndex === this.KONAMI_CODE.length) {
                        this.activateKonami();
                        this.konamiIndex = 0;
                    }
                } else {
                    this.konamiIndex = 0;
                }
            }

            // Hugo
            if (key === this.HUGO_SEQUENCE[this.hugoIndex]) {
                this.hugoIndex++;
                if (this.hugoIndex === this.HUGO_SEQUENCE.length) {
                    this.activateHugo();
                    this.hugoIndex = 0;
                }
            } else {
                this.hugoIndex = 0;
                if (key === this.HUGO_SEQUENCE[0]) {
                    this.hugoIndex = 1;
                }
            }

            // Tristan
            if (key === this.TRISTAN_SEQUENCE[this.tristanIndex]) {
                this.tristanIndex++;
                if (this.tristanIndex === this.TRISTAN_SEQUENCE.length) {
                    this.activateTristan();
                    this.tristanIndex = 0;
                }
            } else {
                this.tristanIndex = 0;
                if (key === this.TRISTAN_SEQUENCE[0]) {
                    this.tristanIndex = 1;
                }
            }

            // Technoblade
            if (key === this.TECHNOBLADE_SEQUENCE[this.technobladeIndex]) {
                this.technobladeIndex++;
                if (this.technobladeIndex === this.TECHNOBLADE_SEQUENCE.length) {
                    this.activateTechnoblade();
                    this.technobladeIndex = 0;
                }
            } else {
                this.technobladeIndex = 0;
                if (key === this.TECHNOBLADE_SEQUENCE[0]) {
                    this.technobladeIndex = 1;
                }
            }
        },

        /**
         * Initialise les codes secrets
         */
        init: function() {
            var self = this;

            this.handleSecretInput();

            document.addEventListener('keydown', function(e) {
                self.handleKeydown(e);
            });
        }
    };
})();
