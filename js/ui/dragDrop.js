/**
 * DragDrop - Système générique de drag & drop
 */
(function() {
    'use strict';

    KP.UI.DragDrop = {
        /**
         * Rend un élément déplaçable
         * @param {HTMLElement} element - Élément à rendre draggable
         * @param {Object} options - Options de configuration
         * @param {Function} options.onDragStart - Callback au début du drag
         * @param {Function} options.onDrag - Callback pendant le drag
         * @param {Function} options.onDragEnd - Callback à la fin du drag
         * @param {Object} options.bounds - Limites {left, top, right, bottom}
         * @param {HTMLElement} options.handle - Élément servant de poignée (optionnel)
         */
        make: function(element, options) {
            options = options || {};
            var handle = options.handle || element;
            var offsetX = 0;
            var offsetY = 0;

            // Fonction pour obtenir les bounds (dynamiques ou statiques)
            function getBounds() {
                if (typeof options.bounds === 'function') {
                    return options.bounds();
                }
                return options.bounds || {
                    left: 0,
                    top: 0,
                    right: window.innerWidth,
                    bottom: window.innerHeight
                };
            }

            handle.addEventListener('mousedown', function(e) {
                if (e.button !== 0) return; // Seulement clic gauche
                e.preventDefault();

                offsetX = e.clientX - element.getBoundingClientRect().left;
                offsetY = e.clientY - element.getBoundingClientRect().top;

                element.classList.add('dragging');

                if (options.onDragStart) {
                    options.onDragStart(e, element);
                }

                function onMouseMove(e) {
                    e.preventDefault();

                    var newX = e.clientX - offsetX;
                    var newY = e.clientY - offsetY;

                    // Recalculer les limites à chaque mouvement
                    var bounds = getBounds();
                    newX = Math.max(bounds.left, Math.min(newX, bounds.right - element.offsetWidth));
                    newY = Math.max(bounds.top, Math.min(newY, bounds.bottom - element.offsetHeight));

                    element.style.left = newX + 'px';
                    element.style.top = newY + 'px';

                    if (options.onDrag) {
                        options.onDrag({ x: newX, y: newY }, element);
                    }
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);

                    element.classList.remove('dragging');

                    if (options.onDragEnd) {
                        options.onDragEnd({
                            x: parseInt(element.style.left) || 0,
                            y: parseInt(element.style.top) || 0
                        }, element);
                    }
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        },

        /**
         * Configure le drag pour les plantes du jardin
         * @param {HTMLElement} element - Élément plante
         * @param {number} slotIndex - Index du slot de jardin
         */
        makePlantDraggable: function(element, slotIndex) {
            this.make(element, {
                bounds: function() {
                    return {
                        left: -50,
                        top: 0,
                        right: window.innerWidth + 50,
                        bottom: window.innerHeight + 50
                    };
                },
                onDragEnd: function(pos) {
                    KP.State.gardenSlots[slotIndex].position = pos;
                    KP.save();
                }
            });
        },

        /**
         * Configure le drag pour les décorations
         * @param {HTMLElement} element - Élément déco
         * @param {number} index - Index dans le tableau des décos placées
         * @param {string} arrayName - Nom du tableau ('placedDecoItems' ou 'placedDecorBgItems')
         */
        makeDecoDraggable: function(element, index, arrayName) {
            var self = this;
            this.make(element, {
                bounds: {
                    left: 0,
                    top: 0,
                    right: window.innerWidth,
                    bottom: window.innerHeight
                },
                onDragEnd: function(pos) {
                    KP.State[arrayName][index].x = pos.x;
                    KP.State[arrayName][index].y = pos.y;
                    KP.save();
                }
            });
        }
    };
})();
