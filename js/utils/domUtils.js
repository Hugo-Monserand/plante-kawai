/**
 * DomUtils - Utilitaires pour la manipulation du DOM
 */
(function() {
    'use strict';

    KP.Utils.Dom = {
        /**
         * Crée un élément avec des propriétés
         * @param {string} tag - Nom de la balise
         * @param {Object} props - Propriétés à appliquer
         * @param {Array|string} children - Enfants (éléments ou HTML)
         * @returns {HTMLElement}
         */
        create: function(tag, props, children) {
            var el = document.createElement(tag);

            if (props) {
                for (var key in props) {
                    if (key === 'className') {
                        el.className = props[key];
                    } else if (key === 'style' && typeof props[key] === 'object') {
                        for (var styleProp in props[key]) {
                            el.style[styleProp] = props[key][styleProp];
                        }
                    } else if (key.startsWith('on')) {
                        var eventName = key.substring(2).toLowerCase();
                        el.addEventListener(eventName, props[key]);
                    } else if (key === 'dataset') {
                        for (var dataKey in props[key]) {
                            el.dataset[dataKey] = props[key][dataKey];
                        }
                    } else {
                        el.setAttribute(key, props[key]);
                    }
                }
            }

            if (children) {
                if (typeof children === 'string') {
                    el.innerHTML = children;
                } else if (Array.isArray(children)) {
                    children.forEach(function(child) {
                        if (typeof child === 'string') {
                            el.appendChild(document.createTextNode(child));
                        } else if (child instanceof HTMLElement) {
                            el.appendChild(child);
                        }
                    });
                }
            }

            return el;
        },

        /**
         * Supprime un élément du DOM en toute sécurité
         * @param {HTMLElement|string} element - Élément ou sélecteur
         */
        remove: function(element) {
            var el = typeof element === 'string' ? document.querySelector(element) : element;
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        },

        /**
         * Supprime tous les éléments correspondant à un sélecteur
         * @param {string} selector - Sélecteur CSS
         */
        removeAll: function(selector) {
            document.querySelectorAll(selector).forEach(function(el) {
                el.remove();
            });
        },

        /**
         * Ajoute ou retire une classe selon une condition
         * @param {HTMLElement} element - Élément
         * @param {string} className - Nom de la classe
         * @param {boolean} condition - Ajouter si true, retirer si false
         */
        toggleClass: function(element, className, condition) {
            if (condition) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        },

        /**
         * Crée un popup flottant temporaire
         * @param {string} text - Texte à afficher
         * @param {number} x - Position X
         * @param {number} y - Position Y
         * @param {Object} options - Options (color, duration, className)
         */
        showPopup: function(text, x, y, options) {
            options = options || {};
            var popup = document.createElement('div');
            popup.className = options.className || 'crystal-popup';
            popup.textContent = text;
            popup.style.left = x + 'px';
            popup.style.top = y + 'px';
            if (options.color) {
                popup.style.color = options.color;
            }
            if (options.fontSize) {
                popup.style.fontSize = options.fontSize;
            }
            document.body.appendChild(popup);

            setTimeout(function() {
                popup.remove();
            }, options.duration || 1000);

            return popup;
        }
    };
})();
