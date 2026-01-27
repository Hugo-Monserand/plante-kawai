/**
 * FunnelController - Gestion de l'entonnoir magique
 */
(function() {
    'use strict';

    KP.Features.Meteors = KP.Features.Meteors || {};

    KP.Features.Meteors.Funnel = {
        /**
         * Affiche l'entonnoir sur l'écran
         */
        render: function() {
            // Supprimer l'ancien entonnoir
            var oldFunnel = document.querySelector('.magic-funnel');
            if (oldFunnel) oldFunnel.remove();

            if (!KP.State.hasFunnel) return;

            var funnel = document.createElement('div');
            funnel.className = 'magic-funnel';
            funnel.style.left = KP.State.funnelPosition.x + 'px';
            funnel.style.top = KP.State.funnelPosition.y + 'px';

            funnel.innerHTML = [
                '<div class="funnel-glow"></div>',
                '<div class="funnel-top">🔻</div>'
            ].join('');

            // Drag and drop
            this._makeDraggable(funnel);

            document.body.appendChild(funnel);
        },

        /**
         * Rend l'entonnoir draggable
         * @private
         */
        _makeDraggable: function(funnel) {
            var offsetX = 0;
            var offsetY = 0;

            funnel.addEventListener('mousedown', function(e) {
                e.preventDefault();
                offsetX = e.clientX - funnel.getBoundingClientRect().left;
                offsetY = e.clientY - funnel.getBoundingClientRect().top;

                funnel.classList.add('dragging');

                function onMouseMove(e) {
                    var newX = e.clientX - offsetX;
                    var newY = e.clientY - offsetY;

                    newX = Math.max(0, Math.min(newX, window.innerWidth - 80));
                    newY = Math.max(0, Math.min(newY, window.innerHeight - 80));

                    funnel.style.left = newX + 'px';
                    funnel.style.top = newY + 'px';
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    funnel.classList.remove('dragging');

                    // Sauvegarder la position
                    KP.State.funnelPosition = {
                        x: parseInt(funnel.style.left) || 0,
                        y: parseInt(funnel.style.top) || 0
                    };
                    KP.save();
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        },

        /**
         * Initialise l'entonnoir
         */
        init: function() {
            this.render();
        }
    };
})();
