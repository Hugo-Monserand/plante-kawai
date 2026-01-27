Interagis toujours en francais.

L'utilisateur s'appelle Gogo68c.

On va chercher a faire une application demo pour montrer ce qu'on arrive a faire avec claude code.

On souhaite faire une application html qui montre une plante en pot et quand on clique dessus elle grandit.

L'application ne doit pas utiliser de systeme de build pour fonctionner, on doit pouvoir ouvrir le fichier index.html avec le navigateur, on aura cependant besoin d'une doc utilisateur.

---

# Structure du Projet

## Vue d'ensemble

```
london/
├── index.html              # Point d'entree HTML
├── style.css               # Styles CSS
├── CLAUDE.md               # Documentation
│
├── assets/
│   ├── images/             # Images (fairy.jpg, fairy.png, million.png, picnic.jpeg)
│   └── audio/              # Audio (music.mp3)
│
└── js/
    ├── app.js              # Point d'entree, initialisation
    │
    ├── core/               # Modules fondamentaux
    │   ├── namespace.js    # Cree window.KP = {}
    │   ├── eventBus.js     # Systeme Publish/Subscribe
    │   ├── state.js        # Etat global du jeu
    │   ├── dom.js          # References DOM centralisees
    │   └── storage.js      # Sauvegarde/chargement localStorage
    │
    ├── config/             # Donnees de configuration
    │   ├── constants.js    # Constantes globales
    │   ├── shopItems.js    # Items du magasin
    │   ├── gardenItems.js  # Graines et pots de jardin
    │   ├── decorations.js  # Decorations et decors
    │   ├── backgrounds.js  # Arriere-plans
    │   ├── colors.js       # Couleurs nature (sol, arbres, montagnes)
    │   └── achievements.js # Definitions des succes
    │
    ├── utils/              # Utilitaires
    │   ├── colorUtils.js   # Manipulation des couleurs
    │   └── domUtils.js     # Helpers DOM
    │
    ├── ui/                 # Composants UI generiques
    │   ├── modalManager.js # Gestion des modales
    │   ├── dragDrop.js     # Drag and drop
    │   ├── contextMenu.js  # Menu contextuel
    │   ├── notifications.js# Notifications et popups
    │   └── musicPlayer.js  # Lecteur de musique
    │
    └── features/           # Fonctionnalites metier
        ├── plant/
        │   ├── plantController.js  # Logique de la plante
        │   ├── plantRenderer.js    # Rendu visuel
        │   └── wateringSystem.js   # Systeme d'arrosage
        ├── economy/
        │   ├── costCalculator.js   # Calculs de couts
        │   ├── moneyController.js  # Gestion de la monnaie
        │   └── crystalController.js# Gestion des cristaux
        ├── shop/
        │   ├── shopController.js   # Logique du magasin
        │   └── shopRenderer.js     # Rendu des items
        ├── garden/
        │   ├── gardenController.js # Logique de la jardinerie
        │   └── gardenRenderer.js   # Rendu du jardin
        ├── decoration/
        │   ├── decoController.js   # Decorations placables
        │   └── decorBgController.js# Decors de fond
        ├── background/
        │   ├── bgController.js     # Arriere-plans
        │   └── natureColors.js     # Couleurs nature
        ├── meteors/
        │   ├── meteorController.js # Meteorites
        │   └── funnelController.js # Entonnoir magique
        ├── achievements/
        │   └── achievementController.js # Succes
        └── secrets/
            └── secretCodes.js      # Codes secrets (Konami, etc.)
```

---

## Patterns Utilises

### 1. Namespace Global (IIFE)

Sans modules ES6 (car on ouvre index.html directement), on utilise un namespace global :

```javascript
// js/core/namespace.js
window.KP = {
    Core: {},
    Config: {},
    Features: {},
    UI: {},
    Utils: {}
};
```

Chaque module est une IIFE qui s'enregistre dans ce namespace :

```javascript
// js/features/shop/shopController.js
(function() {
    'use strict';

    KP.Features.Shop = KP.Features.Shop || {};

    KP.Features.Shop.Controller = {
        init: function() { /* ... */ },
        open: function() { /* ... */ }
    };
})();
```

### 2. Event Bus (Publish/Subscribe)

Communication decouplée entre modules :

```javascript
// Emettre un evenement
KP.emit('money:changed', { amount: 100 });

// Ecouter un evenement
KP.on('money:changed', function(data) {
    console.log('Nouvelle monnaie:', data.amount);
});
```

Evenements disponibles :
- `money:changed` - Changement de monnaie
- `crystals:changed` - Changement de cristaux
- `plant:grew` - La plante a grandi
- `plant:maxLevel` - Niveau max atteint
- `item:purchased` - Item achete
- `achievement:unlocked` - Succes debloque

### 3. Separation Controller/Renderer

- **Controller** : Logique metier pure
- **Renderer** : Manipulation DOM uniquement

Exemple :
```javascript
// Controller gere la logique
KP.Features.Plant.Controller.grow();

// Renderer met a jour l'affichage
KP.Features.Plant.Renderer.update();
```

### 4. State Management Central

Tout l'etat du jeu est dans `KP.State` :

```javascript
KP.State.money           // Monnaie actuelle
KP.State.crystals        // Cristaux
KP.State.plantLevel      // Niveau de la plante
KP.State.inventory       // Items possedes
KP.State.gardenPlants    // Plantes du jardin
// etc.
```

Methodes utiles :
- `KP.State.toJSON()` - Serialise l'etat pour sauvegarde
- `KP.State.fromJSON(data)` - Restaure l'etat
- `KP.State.reset()` - Reinitialise tout

---

## Ordre de Chargement des Scripts

L'ordre dans index.html est important :

1. **Core** - namespace, eventBus, state, dom, storage
2. **Utils** - colorUtils, domUtils
3. **Config** - constants, puis toutes les configs
4. **UI** - modalManager, dragDrop, etc.
5. **Features** - economy d'abord, puis plant, shop, etc.
6. **App** - app.js en dernier (initialisation)

---

## Conventions de Code

### Nommage
- `camelCase` pour les variables et fonctions
- `PascalCase` pour les "classes" (objets constructeurs)
- Prefixe `_` pour les methodes privees (`_checkCollision`)

### Structure d'un module

```javascript
(function() {
    'use strict';

    KP.Features.MonModule = KP.Features.MonModule || {};

    KP.Features.MonModule.Controller = {
        // Proprietes
        interval: null,

        // Methodes publiques
        init: function() { /* ... */ },

        // Methodes privees
        _helper: function() { /* ... */ }
    };
})();
```

---

## Sauvegarde

La sauvegarde utilise localStorage :

```javascript
// Sauvegarder
KP.save();

// Charger (automatique au demarrage)
KP.load();

// Effacer
KP.Core.Storage.clear();
```

Cle de sauvegarde : `kawaii_plant_save`

---

## Fonctionnalites

### Plante principale
- Arrosage avec cout exponentiel
- 10 niveaux de croissance
- Feuilles et fleurs qui apparaissent
- Couleurs personnalisables (pot, fleur)

### Economie
- Monnaie (Kawai Coins) - generation passive
- Cristaux (diamants) - collecte de meteorites
- Systeme d'arrosage payant

### Magasins
- **Shop** : Pots et fleurs cosmetiques
- **Jardinerie** : Graines et pots pour plantes secondaires
- **Deco** : Decorations placables (drag & drop)
- **Decors** : Arriere-plans decoratifs
- **Fonds** : Arriere-plans (couleurs, images)
- **Couleurs Nature** : Sol, arbres, montagnes

### Succes
- Ouverture avec touche `S`
- Verification periodique automatique
- Notification au deblocage

### Codes secrets
- Konami Code (haut haut bas bas gauche droite gauche droite B A) = +100 diamants
- Input secret cache dans l'interface

### Meteorites
- Apparition aleatoire
- Clic pour collecter (+1 cristal)
- Entonnoir magique (collecte automatique)

---

## Tests manuels

Apres modification, verifier :

1. Ouvrir `index.html` directement (pas de serveur)
2. Console sans erreurs
3. Arrosage fonctionne (cout deduit, plante grandit)
4. Magasins s'ouvrent et affichent les items
5. Achat d'item fonctionne
6. Sauvegarde persiste apres reload
7. Konami code donne les diamants
8. Touche S ouvre les succes
9. Meteorites apparaissent et sont cliquables
10. Decorations draggables
