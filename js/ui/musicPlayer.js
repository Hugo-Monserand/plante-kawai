/**
 * MusicPlayer - Contrôle de la musique de fond
 */
(function() {
    'use strict';

    KP.UI.MusicPlayer = {
        isPlaying: false,
        audio: null,
        button: null,

        /**
         * Initialise le lecteur de musique
         */
        init: function() {
            this.audio = document.getElementById('bgMusic');
            this.button = document.getElementById('musicBtn');

            if (!this.audio || !this.button) return;

            var self = this;

            // Clic pour toggle
            this.button.addEventListener('click', function(e) {
                // Ignorer si on est en train de drag
                if (self.button.classList.contains('dragging')) return;
                self.toggle();
            });

            // Rendre le bouton draggable
            this._makeDraggable();

            // Mettre à jour l'icône initiale
            this._updateIcon();
        },

        /**
         * Toggle play/pause
         */
        toggle: function() {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        },

        /**
         * Lance la lecture
         */
        play: function() {
            if (this.audio) {
                this.audio.play().catch(function(e) {
                    console.log('Autoplay bloqué par le navigateur');
                });
                this.isPlaying = true;
                this._updateIcon();
            }
        },

        /**
         * Met en pause
         */
        pause: function() {
            if (this.audio) {
                this.audio.pause();
                this.isPlaying = false;
                this._updateIcon();
            }
        },

        /**
         * Met à jour l'icône du bouton
         * @private
         */
        _updateIcon: function() {
            if (!this.button) return;

            var icon = this.button.querySelector('.music-icon');
            if (icon) {
                icon.textContent = this.isPlaying ? '🔊' : '🔇';
            }

            if (this.isPlaying) {
                this.button.classList.add('playing');
            } else {
                this.button.classList.remove('playing');
            }
        },

        /**
         * Rend le bouton musique draggable
         * @private
         */
        _makeDraggable: function() {
            var self = this;
            var btn = this.button;
            var offsetX = 0;
            var offsetY = 0;
            var isDragging = false;

            btn.addEventListener('mousedown', function(e) {
                e.preventDefault();
                offsetX = e.clientX - btn.getBoundingClientRect().left;
                offsetY = e.clientY - btn.getBoundingClientRect().top;

                function onMouseMove(e) {
                    if (!isDragging) {
                        isDragging = true;
                        btn.classList.add('dragging');
                    }

                    var newX = e.clientX - offsetX;
                    var newY = e.clientY - offsetY;

                    newX = Math.max(0, Math.min(newX, window.innerWidth - 45));
                    newY = Math.max(0, Math.min(newY, window.innerHeight - 45));

                    btn.style.left = newX + 'px';
                    btn.style.top = newY + 'px';
                    btn.style.right = 'auto';
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);

                    if (isDragging) {
                        setTimeout(function() {
                            btn.classList.remove('dragging');
                            isDragging = false;
                        }, 10);
                    }
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        }
    };
})();
