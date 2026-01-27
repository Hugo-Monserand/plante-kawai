let growthLevel = 0;
let maxLevel = 10;
const stem = document.getElementById('stem');
const leaves = document.getElementById('leaves');
const flowersContainer = document.getElementById('flowersContainer');
const levelDisplay = document.getElementById('level');
const wateringCan = document.getElementById('wateringCan');
const waterDrops = document.getElementById('waterDrops');
const potMouth = document.getElementById('potMouth');

// Système de monnaie
let kawaiMoney = 0;
let ownedItems = [];
const moneyAmountDisplay = document.getElementById('moneyAmount');
const moneyRateDisplay = document.getElementById('moneyRate');
const shopBtn = document.getElementById('shopBtn');
const shopModal = document.getElementById('shopModal');
const shopClose = document.getElementById('shopClose');
const shopBalance = document.getElementById('shopBalance');
const shopItemsContainer = document.getElementById('shopItems');

// Items du magasin
const shopItemsData = [
    {
        id: 'pot_blue',
        name: 'Pot Bleu Ciel',
        desc: 'Un joli pot couleur ciel d\'été',
        icon: '🪴',
        price: 100,
        type: 'pot',
        color: '#64b5f6'
    },
    {
        id: 'pot_pink',
        name: 'Pot Rose Bonbon',
        desc: 'Un pot rose tout mignon',
        icon: '🪴',
        price: 500,
        type: 'pot',
        color: '#f48fb1'
    },
    {
        id: 'pot_purple',
        name: 'Pot Violet Royal',
        desc: 'Un pot majestueux',
        icon: '🪴',
        price: 1000,
        type: 'pot',
        color: '#b39ddb'
    },
    {
        id: 'pot_gold',
        name: 'Pot Doré',
        desc: 'Le pot des champions !',
        icon: '🏆',
        price: 5000,
        type: 'pot',
        color: '#ffd54f'
    },
    {
        id: 'flower_blue',
        name: 'Fleurs Bleues',
        desc: 'De magnifiques pétales bleus',
        icon: '💙',
        price: 300,
        type: 'flower',
        color: '#64b5f6'
    },
    {
        id: 'flower_yellow',
        name: 'Fleurs Jaunes',
        desc: 'Des fleurs couleur soleil',
        icon: '💛',
        price: 300,
        type: 'flower',
        color: '#fff176'
    },
    {
        id: 'flower_purple',
        name: 'Fleurs Violettes',
        desc: 'Des pétales mystérieux',
        icon: '💜',
        price: 750,
        type: 'flower',
        color: '#ba68c8'
    },
    {
        id: 'flower_rainbow',
        name: 'Fleurs Arc-en-ciel',
        desc: 'Toutes les couleurs !',
        icon: '🌈',
        price: 2500,
        type: 'flower',
        color: 'rainbow'
    },
    {
        id: 'boost_x2',
        name: 'Boost x2',
        desc: 'Double la production pendant 30s',
        icon: '⚡',
        price: 200,
        type: 'boost',
        duration: 30
    },
    {
        id: 'funnel',
        name: 'Entonnoir Magique',
        desc: 'Collecte automatiquement les étoiles qui passent dessus !',
        icon: '🔻',
        price: 1000000,
        type: 'funnel'
    }
];

let activeBoost = null;

// Items équipés
let equippedPot = null;
let equippedFlower = null;

// === Système de Jardinerie ===

// Graines disponibles
const seedsData = [
    {
        id: 'seed_sunflower',
        name: 'Graine de Tournesol',
        desc: 'Une fleur qui suit le soleil',
        icon: '🌻',
        price: 3000,
        plantType: 'sunflower'
    },
    {
        id: 'seed_cactus',
        name: 'Graine de Cactus',
        desc: 'Un petit cactus mignon et résistant',
        icon: '🌵',
        price: 5000,
        plantType: 'cactus'
    },
    {
        id: 'seed_bamboo',
        name: 'Graine de Bambou',
        desc: 'Un bambou chanceux qui pousse vite',
        icon: '🎋',
        price: 8000,
        plantType: 'bamboo'
    }
];

// Pots de jardin (emplacements supplémentaires)
const gardenPotsData = [
    {
        id: 'garden_pot_1',
        name: 'Pot de Jardin Simple',
        desc: 'Un emplacement pour une nouvelle plante',
        icon: '🪴',
        price: 2000,
        slotIndex: 1
    },
    {
        id: 'garden_pot_2',
        name: 'Pot de Jardin Fleuri',
        desc: 'Un joli pot décoré',
        icon: '🌷',
        price: 6000,
        slotIndex: 2
    },
    {
        id: 'garden_pot_3',
        name: 'Pot de Jardin Royal',
        desc: 'Le plus beau pot du jardin',
        icon: '👑',
        price: 15000,
        slotIndex: 3
    }
];

// État du jardin
let gardenSlots = [
    { unlocked: true, plant: null, level: 0 }  // Premier emplacement gratuit
];
let ownedSeeds = [];

// === Système de Déco ===
const decoItemsData = [
    { id: 'deco_heart', name: 'Coeur', emoji: '💖', price: 500 },
    { id: 'deco_star', name: 'Étoile', emoji: '⭐', price: 500 },
    { id: 'deco_sparkle', name: 'Étincelle', emoji: '✨', price: 750 },
    { id: 'deco_butterfly', name: 'Papillon', emoji: '🦋', price: 1500 },
    { id: 'deco_ladybug', name: 'Coccinelle', emoji: '🐞', price: 1500 },
    { id: 'deco_bee', name: 'Abeille', emoji: '🐝', price: 1500 },
    { id: 'deco_snail', name: 'Escargot', emoji: '🐌', price: 1000 },
    { id: 'deco_mushroom', name: 'Champignon', emoji: '🍄', price: 2000 },
    { id: 'deco_clover', name: 'Trèfle', emoji: '🍀', price: 2500 },
    { id: 'deco_cherry', name: 'Cerises', emoji: '🍒', price: 1200 },
    { id: 'deco_strawberry', name: 'Fraise', emoji: '🍓', price: 1200 },
    { id: 'deco_rainbow', name: 'Arc-en-ciel', emoji: '🌈', price: 5000 },
    { id: 'deco_cloud', name: 'Nuage', emoji: '☁️', price: 1000 },
    { id: 'deco_sun', name: 'Soleil', emoji: '🌞', price: 3000 },
    { id: 'deco_moon', name: 'Lune', emoji: '🌙', price: 3000 },
    { id: 'deco_fairy', name: 'Grande Fée', emoji: '<img src="fairy.png" class="deco-img">', price: 100000, isImage: true },
    { id: 'deco_million', name: 'Item Légendaire', emoji: '<img src="million.png" class="deco-img">', price: 1000000, isImage: true },
    { id: 'deco_crystal', name: 'Cristal', emoji: '💎', price: 7500 },
    { id: 'deco_ribbon', name: 'Ruban', emoji: '🎀', price: 800 },
    { id: 'deco_balloon', name: 'Ballon', emoji: '🎈', price: 600 },
    { id: 'deco_gift', name: 'Cadeau', emoji: '🎁', price: 2000 }
];

// Items de déco placés sur la map
let placedDecoItems = [];

// === Système de Décors d'arrière-plan ===
const decorBgItemsData = [
    { id: 'decor_castle', name: 'Château', emoji: '🏰', price: 10000 },
    { id: 'decor_house', name: 'Maison', emoji: '🏠', price: 5000 },
    { id: 'decor_cabin', name: 'Chalet', emoji: '🏡', price: 6000 },
    { id: 'decor_temple', name: 'Temple', emoji: '⛩️', price: 15000 },
    { id: 'decor_church', name: 'Église', emoji: '⛪', price: 12000 },
    { id: 'decor_tower', name: 'Tour', emoji: '🗼', price: 20000 },
    { id: 'decor_windmill', name: 'Moulin', emoji: '🏗️', price: 8000 },
    { id: 'decor_tent', name: 'Tente', emoji: '⛺', price: 3000 },
    { id: 'decor_fountain', name: 'Fontaine', emoji: '⛲', price: 7000 },
    { id: 'decor_statue', name: 'Statue', emoji: '🗿', price: 9000 },
    { id: 'decor_bridge', name: 'Pont', emoji: '🌉', price: 11000 },
    { id: 'decor_ferris', name: 'Grande Roue', emoji: '🎡', price: 25000 },
    { id: 'decor_carousel', name: 'Carrousel', emoji: '🎠', price: 18000 },
    { id: 'decor_circus', name: 'Cirque', emoji: '🎪', price: 22000 },
    { id: 'decor_rocket', name: 'Fusée', emoji: '🚀', price: 50000 },
    { id: 'decor_ufo', name: 'OVNI', emoji: '🛸', price: 75000 },
    { id: 'decor_picnic', name: 'Aire de Pique-nique', emoji: '<img src="picnic.jpeg" class="decor-bg-img">', price: 50000, isImage: true }
];

// Décors placés sur la map (arrière-plan)
let placedDecorBgItems = [];

// === Système de Couleurs Nature ===
const groundColorsData = [
    { id: 'ground_green', name: 'Vert', colors: ['#81c784', '#66bb6a', '#4caf50'] },
    { id: 'ground_dark', name: 'Vert Foncé', colors: ['#558b2f', '#33691e', '#1b5e20'] },
    { id: 'ground_lime', name: 'Lime', colors: ['#c5e1a5', '#aed581', '#9ccc65'] },
    { id: 'ground_teal', name: 'Turquoise', colors: ['#80cbc4', '#4db6ac', '#26a69a'] },
    { id: 'ground_brown', name: 'Terre', colors: ['#a1887f', '#8d6e63', '#795548'] },
    { id: 'ground_sand', name: 'Sable', colors: ['#ffe082', '#ffd54f', '#ffca28'] },
    { id: 'ground_snow', name: 'Neige', colors: ['#ffffff', '#eceff1', '#cfd8dc'] },
    { id: 'ground_purple', name: 'Violet', colors: ['#ce93d8', '#ba68c8', '#ab47bc'] }
];

const treeColorsData = [
    { id: 'tree_pink', name: 'Rose', colors: ['#ff8a9a', '#ffaab8'] },
    { id: 'tree_white', name: 'Blanc', colors: ['#ffffff', '#f5f5f5'] },
    { id: 'tree_red', name: 'Rouge', colors: ['#ef5350', '#e57373'] },
    { id: 'tree_orange', name: 'Orange', colors: ['#ff7043', '#ff8a65'] },
    { id: 'tree_yellow', name: 'Jaune', colors: ['#ffd54f', '#ffe082'] },
    { id: 'tree_green', name: 'Vert', colors: ['#81c784', '#a5d6a7'] },
    { id: 'tree_blue', name: 'Bleu', colors: ['#64b5f6', '#90caf9'] },
    { id: 'tree_purple', name: 'Violet', colors: ['#ba68c8', '#ce93d8'] }
];

const mountainColorsData = [
    { id: 'mountain_green', name: 'Vert', colors: ['#7cb342', '#8bc34a', '#9ccc65'] },
    { id: 'mountain_blue', name: 'Bleu', colors: ['#5c6bc0', '#7986cb', '#9fa8da'] },
    { id: 'mountain_purple', name: 'Violet', colors: ['#7e57c2', '#9575cd', '#b39ddb'] },
    { id: 'mountain_brown', name: 'Marron', colors: ['#6d4c41', '#8d6e63', '#a1887f'] },
    { id: 'mountain_gray', name: 'Gris', colors: ['#546e7a', '#78909c', '#90a4ae'] },
    { id: 'mountain_pink', name: 'Rose', colors: ['#ec407a', '#f06292', '#f48fb1'] },
    { id: 'mountain_teal', name: 'Turquoise', colors: ['#00897b', '#26a69a', '#4db6ac'] },
    { id: 'mountain_snow', name: 'Neige', colors: ['#b0bec5', '#cfd8dc', '#eceff1'] }
];

let selectedGroundColor = 'ground_green';
let selectedTreeColor = 'tree_pink';
let selectedMountainColor = 'mountain_green';

// Visibilité des mini plantes
let showSidePlants = true;

// === Système de Météorites et Cristaux ===
let crystals = 0;
const crystalAmountDisplay = document.getElementById('crystalAmount');
const meteorsContainer = document.getElementById('meteorsContainer');

const meteorEmojis = ['☄️', '🌠', '💫', '⭐', '🔮'];

// Entonnoir collecteur
let hasFunnel = false;
let funnelPosition = { x: window.innerWidth / 2 - 40, y: window.innerHeight - 250 };

// === Système d'arrière-plans ===
const backgroundsData = [
    {
        id: 'bg_default',
        name: 'Jardin Kawaii',
        desc: 'Le jardin original',
        icon: '🌸',
        price: 0,
        gradient: 'linear-gradient(180deg, #ffb7c5 0%, #ffc4d0 40%, #ffd8e0 55%, #fff5f7 70%, #c8e6c9 85%, #a5d6a7 100%)'
    },
    {
        id: 'bg_sunset',
        name: 'Coucher de Soleil',
        desc: 'Un ciel orangé magnifique',
        icon: '🌅',
        price: 50000,
        gradient: 'linear-gradient(180deg, #ff7043 0%, #ffab91 30%, #ffccbc 50%, #fff3e0 70%, #a5d6a7 85%, #81c784 100%)'
    },
    {
        id: 'bg_night',
        name: 'Nuit Étoilée',
        desc: 'Un ciel nocturne paisible',
        icon: '🌙',
        price: 75000,
        gradient: 'linear-gradient(180deg, #1a237e 0%, #283593 30%, #3949ab 50%, #5c6bc0 70%, #1b5e20 85%, #2e7d32 100%)'
    },
    {
        id: 'bg_ocean',
        name: 'Océan Tropical',
        desc: 'Une plage paradisiaque',
        icon: '🏝️',
        price: 100000,
        gradient: 'linear-gradient(180deg, #4fc3f7 0%, #81d4fa 30%, #b3e5fc 50%, #e1f5fe 70%, #fff59d 85%, #ffe082 100%)'
    },
    {
        id: 'bg_forest',
        name: 'Forêt Enchantée',
        desc: 'Une forêt magique',
        icon: '🌲',
        price: 150000,
        gradient: 'linear-gradient(180deg, #a5d6a7 0%, #81c784 30%, #66bb6a 50%, #4caf50 70%, #388e3c 85%, #2e7d32 100%)'
    },
    {
        id: 'bg_candy',
        name: 'Monde Bonbon',
        desc: 'Tout est sucré ici',
        icon: '🍭',
        price: 200000,
        gradient: 'linear-gradient(180deg, #f48fb1 0%, #f8bbd9 30%, #e1bee7 50%, #ce93d8 70%, #ba68c8 85%, #ab47bc 100%)'
    },
    {
        id: 'bg_aurora',
        name: 'Aurore Boréale',
        desc: 'Un spectacle magique',
        icon: '✨',
        price: 300000,
        gradient: 'linear-gradient(180deg, #0d47a1 0%, #1565c0 20%, #42a5f5 35%, #4db6ac 50%, #81c784 65%, #aed581 80%, #dce775 100%)'
    },
    {
        id: 'bg_sakura',
        name: 'Cerisiers en Fleurs',
        desc: 'Le printemps au Japon',
        icon: '🌸',
        price: 400000,
        gradient: 'linear-gradient(180deg, #fce4ec 0%, #f8bbd9 30%, #f48fb1 50%, #f06292 70%, #c8e6c9 85%, #a5d6a7 100%)'
    },
    {
        id: 'bg_rainbow',
        name: 'Arc-en-ciel',
        desc: 'Toutes les couleurs !',
        icon: '🌈',
        price: 750000,
        gradient: 'linear-gradient(180deg, #ef5350 0%, #ff7043 15%, #ffca28 30%, #66bb6a 45%, #42a5f5 60%, #5c6bc0 75%, #ab47bc 90%, #81c784 100%)'
    },
    {
        id: 'bg_galaxy',
        name: 'Galaxie',
        desc: 'Voyage dans l\'espace',
        icon: '🌌',
        price: 1500000,
        gradient: 'linear-gradient(180deg, #0d0221 0%, #1a0533 20%, #2d1b4e 35%, #4a1942 50%, #6b2d5c 65%, #1b5e20 85%, #2e7d32 100%)'
    }
];

let equippedBackground = 'bg_default';
let ownedBackgrounds = ['bg_default'];

// Éléments DOM jardinerie
const gardenBtn = document.getElementById('gardenBtn');
const gardenModal = document.getElementById('gardenModal');
const gardenClose = document.getElementById('gardenClose');
const gardenBalance = document.getElementById('gardenBalance');
const seedItemsContainer = document.getElementById('seedItems');
const gardenPotItemsContainer = document.getElementById('gardenPotItems');
const gardenSlotsContainer = document.getElementById('gardenSlots');
const leftPlantsContainer = document.getElementById('leftPlants');
const rightPlantsContainer = document.getElementById('rightPlants');

// Éléments DOM déco
const decoBtn = document.getElementById('decoBtn');
const decoModal = document.getElementById('decoModal');
const decoClose = document.getElementById('decoClose');
const decoBalance = document.getElementById('decoBalance');
const decoItemsContainer = document.getElementById('decoItems');

// Éléments DOM fonds
const bgBtn = document.getElementById('bgBtn');
const bgModal = document.getElementById('bgModal');
const bgClose = document.getElementById('bgClose');
const bgBalance = document.getElementById('bgBalance');
const bgItemsContainer = document.getElementById('bgItems');
const backgroundEl = document.querySelector('.background');

// Éléments DOM décors
const decorBtn = document.getElementById('decorBtn');
const decorModal = document.getElementById('decorModal');
const decorClose = document.getElementById('decorClose');
const decorBalance = document.getElementById('decorBalance');
const decorItemsContainer = document.getElementById('decorItems');

// Éléments DOM couleurs nature
const natureColorBtn = document.getElementById('natureColorBtn');
const natureColorModal = document.getElementById('natureColorModal');
const natureColorClose = document.getElementById('natureColorClose');
const groundColorsContainer = document.getElementById('groundColors');
const treeColorsContainer = document.getElementById('treeColors');
const mountainColorsContainer = document.getElementById('mountainColors');

function createFlower(className, size = 70) {
    const flower = document.createElement('div');
    flower.className = `flower ${className}`;
    flower.style.width = size + 'px';
    flower.style.height = size + 'px';

    // Taille des pétales proportionnelle
    const petalWidth = size * 0.37;
    const petalHeight = size * 0.54;
    const petalOffset = size * 0.31;

    // Taille du centre proportionnelle
    const centerSize = size * 0.48;

    flower.innerHTML = `
        <div class="petal" style="width:${petalWidth}px;height:${petalHeight}px;margin-left:${-petalWidth/2}px;margin-top:${-petalHeight/2}px;transform:rotate(0deg) translateY(${-petalOffset}px)"></div>
        <div class="petal" style="width:${petalWidth}px;height:${petalHeight}px;margin-left:${-petalWidth/2}px;margin-top:${-petalHeight/2}px;transform:rotate(72deg) translateY(${-petalOffset}px)"></div>
        <div class="petal" style="width:${petalWidth}px;height:${petalHeight}px;margin-left:${-petalWidth/2}px;margin-top:${-petalHeight/2}px;transform:rotate(144deg) translateY(${-petalOffset}px)"></div>
        <div class="petal" style="width:${petalWidth}px;height:${petalHeight}px;margin-left:${-petalWidth/2}px;margin-top:${-petalHeight/2}px;transform:rotate(216deg) translateY(${-petalOffset}px)"></div>
        <div class="petal" style="width:${petalWidth}px;height:${petalHeight}px;margin-left:${-petalWidth/2}px;margin-top:${-petalHeight/2}px;transform:rotate(288deg) translateY(${-petalOffset}px)"></div>
        <div class="flower-center" style="width:${centerSize}px;height:${centerSize}px">
            <div class="flower-face">
                <div class="flower-eyes">
                    <div class="flower-eye"></div>
                    <div class="flower-eye"></div>
                </div>
                <div class="flower-smile"></div>
            </div>
        </div>
    `;
    return flower;
}

function updatePotSmile() {
    // Le sourire démarre plat et se recourbe progressivement
    const mouthWidth = 20;
    const curveHeight = growthLevel * 1.5; // 0 au début, 15 à la fin

    potMouth.style.width = mouthWidth + 'px';
    potMouth.style.height = curveHeight + 'px';
    potMouth.style.border = 'none';
    potMouth.style.borderBottom = '3px solid #5d4037';

    if (curveHeight > 0) {
        potMouth.style.borderLeft = '3px solid #5d4037';
        potMouth.style.borderRight = '3px solid #5d4037';
        potMouth.style.borderRadius = `0 0 ${mouthWidth}px ${mouthWidth}px`;
    } else {
        potMouth.style.borderRadius = '0';
    }
}

function updatePlant() {
    // Supprimer les anciennes feuilles
    leaves.innerHTML = '';

    // Calculer le nombre de paires de feuilles
    const leafPairs = Math.floor(growthLevel / 2);

    // Hauteur maximale disponible (écran - pot - marge)
    const maxAvailableHeight = window.innerHeight * 0.55;

    // Hauteur de la tige basée sur les feuilles (pour qu'elle soit synchronisée)
    const leafSpacing = 30;
    const baseHeight = 15;
    let stemHeight = baseHeight + (leafPairs * leafSpacing * 2) + (growthLevel * 5);

    // Calculer l'échelle si la plante dépasse
    const plantScale = stemHeight > maxAvailableHeight ? maxAvailableHeight / stemHeight : 1;

    // Appliquer l'échelle au conteneur de la plante
    const plant = document.getElementById('plant');
    plant.style.transform = `translateX(-50%) scale(${plantScale})`;
    plant.style.transformOrigin = 'bottom center';

    stem.style.height = stemHeight + 'px';

    // Ajouter des feuilles de part et d'autre (alternées)
    for (let i = 0; i < leafPairs; i++) {
        const leafWidth = 25 + growthLevel * 2;
        const leafHeight = 15 + growthLevel;

        // Feuille gauche
        const leftLeaf = document.createElement('div');
        leftLeaf.className = 'leaf left';
        leftLeaf.style.width = leafWidth + 'px';
        leftLeaf.style.height = leafHeight + 'px';
        leftLeaf.style.bottom = (15 + i * leafSpacing * 2) + 'px';
        leftLeaf.style.right = '0px';
        leaves.appendChild(leftLeaf);

        // Feuille droite (légèrement décalée en hauteur)
        const rightLeaf = document.createElement('div');
        rightLeaf.className = 'leaf right';
        rightLeaf.style.width = leafWidth + 'px';
        rightLeaf.style.height = leafHeight + 'px';
        rightLeaf.style.bottom = (15 + leafSpacing + i * leafSpacing * 2) + 'px';
        rightLeaf.style.left = '0px';
        leaves.appendChild(rightLeaf);
    }

    // Gérer les fleurs - positionnées au sommet de la tige
    flowersContainer.innerHTML = '';
    flowersContainer.style.bottom = stemHeight + 'px';

    // Taille des fleurs basée sur le niveau (grandit avec la plante)
    const baseFlowerSize = 50;
    const flowerSize = baseFlowerSize + (growthLevel * 3);

    if (growthLevel >= 6) {
        // Fleur centrale
        const centerFlower = createFlower('center', flowerSize);
        flowersContainer.appendChild(centerFlower);
    }

    // Mettre à jour le sourire du pot
    updatePotSmile();

    // Mettre à jour l'affichage du niveau
    updateLevelDisplay();

    // Appliquer la couleur de fleur personnalisée si elle existe
    const flowerColorItem = ownedItems.find(id => id.startsWith('flower_'));
    if (flowerColorItem) {
        const item = shopItemsData.find(i => i.id === flowerColorItem);
        if (item) {
            setTimeout(() => applyFlowerColor(item.color), 10);
        }
    }
}

function animateWatering() {
    wateringCan.classList.add('active');
    waterDrops.classList.add('active');

    setTimeout(() => {
        wateringCan.classList.remove('active');
        waterDrops.classList.remove('active');
    }, 1500);
}

document.addEventListener('click', (e) => {
    // Ne pas compter les clics sur les éléments UI
    if (e.target.closest('.shop-modal') || e.target.closest('.shop-btn') ||
        e.target.closest('.reload-btn') || e.target.closest('.reset-btn') ||
        e.target.closest('.reset-modal') || e.target.closest('.garden-btn') ||
        e.target.closest('#gardenModal') || e.target.closest('.side-plant') ||
        e.target.closest('.deco-btn') || e.target.closest('#decoModal') ||
        e.target.closest('.deco-item') || e.target.closest('.music-btn') ||
        e.target.closest('.bg-btn') || e.target.closest('#bgModal')) {
        return;
    }

    if (growthLevel < maxLevel) {
        growthLevel++;
        animateWatering();

        setTimeout(() => {
            updatePlant();
            updateMoneyDisplay(); // Mettre à jour le taux affiché
            saveGame(); // Sauvegarder la progression
        }, 800);
    }
});

// === Système de Kawai Monnaie ===

function getMoneyRate() {
    let rate = growthLevel;

    // Ajouter les revenus des plantes du jardin
    gardenSlots.forEach(slot => {
        if (slot.plant) {
            rate += slot.level * 2; // Chaque plante rapporte niveau * 2
        }
    });

    if (activeBoost) {
        rate *= 2;
    }
    return rate;
}

function updateMoneyDisplay() {
    moneyAmountDisplay.textContent = Math.floor(kawaiMoney);
    moneyRateDisplay.textContent = getMoneyRate();
    shopBalance.textContent = Math.floor(kawaiMoney);
}

function generateMoney() {
    kawaiMoney += getMoneyRate();
    updateMoneyDisplay();

    // Mettre à jour le shop si ouvert
    if (shopModal.classList.contains('active')) {
        renderShopItems();
    }

    // Mettre à jour seulement le solde de la jardinerie si ouverte
    if (gardenModal.classList.contains('active')) {
        gardenBalance.textContent = Math.floor(kawaiMoney);
    }

    saveGame();
}

// Générer la monnaie chaque seconde
setInterval(generateMoney, 1000);

// === Système de Magasin ===

function openShop(e) {
    e.stopPropagation();
    shopModal.classList.add('active');
    renderShopItems();
}

function closeShop(e) {
    if (e) e.stopPropagation();
    shopModal.classList.remove('active');
}

function renderShopItems() {
    shopItemsContainer.innerHTML = '';

    shopItemsData.forEach(item => {
        const isOwned = ownedItems.includes(item.id);
        const canAfford = kawaiMoney >= item.price;
        const isEquipped = (item.type === 'pot' && equippedPot === item.id) ||
                          (item.type === 'flower' && equippedFlower === item.id);

        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item' + (isOwned ? ' owned' : '') + (!canAfford && !isOwned ? ' locked' : '') + (isEquipped ? ' equipped' : '');

        let buttonText = `✿ ${item.price}`;
        let buttonClass = 'item-price';
        let buttonDisabled = false;

        if (isOwned && item.type !== 'boost') {
            if (isEquipped) {
                buttonText = '✓ Équipé';
                buttonClass += ' equipped-btn';
                buttonDisabled = true;
            } else {
                buttonText = 'Équiper';
                buttonClass += ' equip-btn';
            }
        } else if (!canAfford && !isOwned) {
            buttonDisabled = true;
        }

        itemEl.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-desc">${item.desc}</div>
            </div>
            <button class="${buttonClass}" ${buttonDisabled ? 'disabled' : ''}>
                ${buttonText}
            </button>
        `;

        const buyBtn = itemEl.querySelector('button');
        if (!buttonDisabled) {
            if (isOwned && item.type !== 'boost') {
                // Bouton Équiper
                buyBtn.onclick = (e) => {
                    e.stopPropagation();
                    equipItem(item);
                };
            } else if (canAfford) {
                // Bouton Acheter
                buyBtn.onclick = (e) => {
                    e.stopPropagation();
                    buyItem(item);
                };
            }
        }

        shopItemsContainer.appendChild(itemEl);
    });
}

function buyItem(item) {
    if (kawaiMoney < item.price) return;

    kawaiMoney -= item.price;

    if (item.type === 'boost') {
        applyItem(item);
    } else if (item.type === 'funnel') {
        hasFunnel = true;
        ownedItems.push(item.id);
        renderFunnel();
    } else {
        ownedItems.push(item.id);

        // Si c'est un pot, augmenter le niveau max de 10
        if (item.type === 'pot') {
            maxLevel += 10;
            updateLevelDisplay();
        }

        // Équiper automatiquement à l'achat
        equipItem(item);
    }

    updateMoneyDisplay();
    renderShopItems();
    saveGame();
}

function equipItem(item) {
    if (item.type === 'pot') {
        equippedPot = item.id;
        applyPotColor(item.color);
    } else if (item.type === 'flower') {
        equippedFlower = item.id;
        applyFlowerColor(item.color);
    }

    renderShopItems();
    saveGame();
}

function applyItem(item) {
    switch (item.type) {
        case 'pot':
            applyPotColor(item.color);
            break;
        case 'flower':
            applyFlowerColor(item.color);
            break;
        case 'boost':
            activateBoost(item.duration);
            break;
    }
}

function applyPotColor(color) {
    const pot = document.querySelector('.pot');
    pot.style.background = `linear-gradient(180deg, ${color} 0%, ${adjustColor(color, -20)} 30%, ${adjustColor(color, -40)} 100%)`;
}

function applyFlowerColor(color) {
    // Stocker la couleur actuelle pour les futures fleurs
    document.documentElement.style.setProperty('--flower-color', color);

    // Appliquer aux fleurs existantes
    const petals = document.querySelectorAll('.petal');
    petals.forEach(petal => {
        if (color === 'rainbow') {
            petal.style.background = 'linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #9b59b6)';
        } else {
            petal.style.background = `linear-gradient(135deg, ${color}, ${adjustColor(color, -30)})`;
        }
    });
}

function adjustColor(color, amount) {
    // Fonction simple pour éclaircir/assombrir une couleur
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function activateBoost(duration) {
    if (activeBoost) {
        clearTimeout(activeBoost);
    }

    document.body.classList.add('boost-active');
    updateMoneyDisplay();

    activeBoost = setTimeout(() => {
        activeBoost = null;
        document.body.classList.remove('boost-active');
        updateMoneyDisplay();
    }, duration * 1000);
}

// Event listeners du magasin
shopBtn.addEventListener('click', openShop);
shopClose.addEventListener('click', closeShop);
shopModal.addEventListener('click', (e) => {
    if (e.target === shopModal) {
        closeShop(e);
    }
});

// === Sauvegarde ===

function saveGame() {
    const saveData = {
        kawaiMoney: kawaiMoney,
        growthLevel: growthLevel,
        maxLevel: maxLevel,
        ownedItems: ownedItems,
        equippedPot: equippedPot,
        equippedFlower: equippedFlower,
        gardenSlots: gardenSlots,
        ownedSeeds: ownedSeeds,
        placedDecoItems: placedDecoItems,
        ownedBackgrounds: ownedBackgrounds,
        equippedBackground: equippedBackground,
        placedDecorBgItems: placedDecorBgItems,
        selectedGroundColor: selectedGroundColor,
        selectedTreeColor: selectedTreeColor,
        selectedMountainColor: selectedMountainColor,
        showSidePlants: showSidePlants,
        crystals: crystals,
        hasFunnel: hasFunnel,
        funnelPosition: funnelPosition
    };
    localStorage.setItem('kawaiPlantSave', JSON.stringify(saveData));
}

function loadGame() {
    const saveData = localStorage.getItem('kawaiPlantSave');
    if (saveData) {
        const data = JSON.parse(saveData);
        kawaiMoney = data.kawaiMoney || 0;
        growthLevel = data.growthLevel || 0;
        maxLevel = data.maxLevel || 10;
        ownedItems = data.ownedItems || [];
        equippedPot = data.equippedPot || null;
        equippedFlower = data.equippedFlower || null;
        gardenSlots = data.gardenSlots || [{ unlocked: true, plant: null, level: 0 }];
        ownedSeeds = data.ownedSeeds || [];
        placedDecoItems = data.placedDecoItems || [];
        ownedBackgrounds = data.ownedBackgrounds || ['bg_default'];
        equippedBackground = data.equippedBackground || 'bg_default';
        placedDecorBgItems = data.placedDecorBgItems || [];
        selectedGroundColor = data.selectedGroundColor || 'ground_green';
        selectedTreeColor = data.selectedTreeColor || 'tree_pink';
        selectedMountainColor = data.selectedMountainColor || 'mountain_green';
        showSidePlants = data.showSidePlants !== undefined ? data.showSidePlants : true;
        crystals = data.crystals || 0;
        hasFunnel = data.hasFunnel || false;
        funnelPosition = data.funnelPosition || { x: window.innerWidth / 2 - 40, y: window.innerHeight - 250 };

        // Réappliquer les items équipés
        if (equippedPot) {
            const potItem = shopItemsData.find(i => i.id === equippedPot);
            if (potItem) applyPotColor(potItem.color);
        }
        if (equippedFlower) {
            const flowerItem = shopItemsData.find(i => i.id === equippedFlower);
            if (flowerItem) applyFlowerColor(flowerItem.color);
        }

        // Réappliquer l'arrière-plan
        if (equippedBackground) {
            const bg = backgroundsData.find(b => b.id === equippedBackground);
            if (bg) {
                document.querySelector('.background').style.background = bg.gradient;
            }
        }
    }
}

function updateLevelDisplay() {
    levelDisplay.textContent = growthLevel;
    document.getElementById('maxLevel').textContent = maxLevel;
}

// === Fonctions Jardinerie ===

function openGarden(e) {
    e.stopPropagation();
    gardenModal.classList.add('active');
    renderGardenShop();
}

function closeGarden(e) {
    if (e) e.stopPropagation();
    gardenModal.classList.remove('active');
}

function renderGardenShop() {
    gardenBalance.textContent = Math.floor(kawaiMoney);
    renderVisibilityToggle();
    renderSeeds();
    renderGardenPots();
    renderGardenSlots();
}

function renderVisibilityToggle() {
    // Supprimer l'ancien toggle s'il existe
    const oldToggle = document.getElementById('visibilityToggle');
    if (oldToggle) oldToggle.remove();

    // Créer le conteneur du toggle
    const toggleContainer = document.createElement('div');
    toggleContainer.id = 'visibilityToggle';
    toggleContainer.className = 'visibility-toggle';
    toggleContainer.innerHTML = `
        <span class="toggle-label">🌱 Afficher les plantes sur l'écran</span>
        <button class="toggle-btn ${showSidePlants ? 'active' : ''}" id="togglePlantsBtn">
            ${showSidePlants ? '👁️ Visible' : '🙈 Masqué'}
        </button>
    `;

    // Insérer après le shop-balance
    const shopBalance = gardenModal.querySelector('.shop-balance');
    shopBalance.after(toggleContainer);

    // Event listener
    document.getElementById('togglePlantsBtn').onclick = (e) => {
        e.stopPropagation();
        toggleSidePlantsVisibility();
    };
}

function toggleSidePlantsVisibility() {
    showSidePlants = !showSidePlants;
    renderSidePlants();
    renderVisibilityToggle();
    saveGame();
}

function renderSeeds() {
    seedItemsContainer.innerHTML = '';

    seedsData.forEach(seed => {
        const owned = ownedSeeds.includes(seed.id);
        const canAfford = kawaiMoney >= seed.price;

        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item' + (owned ? ' owned' : '') + (!canAfford && !owned ? ' locked' : '');

        let buttonText = `✿ ${seed.price}`;
        let buttonClass = 'item-price';
        let buttonDisabled = !canAfford;

        if (owned) {
            buttonText = '✓ Possédée';
            buttonClass += ' equipped-btn';
            buttonDisabled = true;
        }

        itemEl.innerHTML = `
            <div class="item-icon">${seed.icon}</div>
            <div class="item-info">
                <div class="item-name">${seed.name}</div>
                <div class="item-desc">${seed.desc}</div>
            </div>
            <button class="${buttonClass}" ${buttonDisabled ? 'disabled' : ''}>
                ${buttonText}
            </button>
        `;

        if (!owned && canAfford) {
            itemEl.querySelector('button').onclick = (e) => {
                e.stopPropagation();
                buySeed(seed);
            };
        }

        seedItemsContainer.appendChild(itemEl);
    });
}

function renderGardenPots() {
    gardenPotItemsContainer.innerHTML = '';

    gardenPotsData.forEach(pot => {
        const owned = gardenSlots.length > pot.slotIndex;
        const canAfford = kawaiMoney >= pot.price;

        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item' + (owned ? ' owned' : '') + (!canAfford && !owned ? ' locked' : '');

        let buttonText = `✿ ${pot.price}`;
        let buttonClass = 'item-price';
        let buttonDisabled = !canAfford;

        if (owned) {
            buttonText = '✓ Acheté';
            buttonClass += ' equipped-btn';
            buttonDisabled = true;
        }

        itemEl.innerHTML = `
            <div class="item-icon">${pot.icon}</div>
            <div class="item-info">
                <div class="item-name">${pot.name}</div>
                <div class="item-desc">${pot.desc}</div>
            </div>
            <button class="${buttonClass}" ${buttonDisabled ? 'disabled' : ''}>
                ${buttonText}
            </button>
        `;

        if (!owned && canAfford) {
            itemEl.querySelector('button').onclick = (e) => {
                e.stopPropagation();
                buyGardenPot(pot);
            };
        }

        gardenPotItemsContainer.appendChild(itemEl);
    });
}

function renderGardenSlots() {
    gardenSlotsContainer.innerHTML = '';

    // Afficher les emplacements débloqués
    gardenSlots.forEach((slot, index) => {
        const slotEl = document.createElement('div');
        slotEl.className = 'garden-slot' + (slot.plant ? ' has-plant' : ' empty');

        if (slot.plant) {
            const plantInfo = getPlantInfo(slot.plant);
            slotEl.innerHTML = `
                <div class="slot-icon">${plantInfo.icon}</div>
                <div class="slot-label">${plantInfo.name}</div>
                <div class="slot-level">Niv. ${slot.level}/10</div>
                ${slot.level < 10 ? `<button class="water-btn" data-slot="${index}">💧 Arroser</button>` : ''}
            `;

            const waterBtn = slotEl.querySelector('.water-btn');
            if (waterBtn) {
                waterBtn.onclick = (e) => {
                    e.stopPropagation();
                    waterGardenPlant(index);
                };
            }
        } else {
            // Emplacement vide - peut planter
            const availableSeeds = ownedSeeds.filter(seedId => {
                // Vérifier si cette graine n'est pas déjà plantée
                return !gardenSlots.some(s => s.plant === seedsData.find(sd => sd.id === seedId)?.plantType);
            });

            if (availableSeeds.length > 0) {
                slotEl.innerHTML = `
                    <div class="slot-icon">🕳️</div>
                    <div class="slot-label">Planter</div>
                    <select class="plant-select" data-slot="${index}">
                        <option value="">Choisir...</option>
                        ${availableSeeds.map(seedId => {
                            const seed = seedsData.find(s => s.id === seedId);
                            return `<option value="${seed.plantType}">${seed.icon} ${seed.name.replace('Graine de ', '')}</option>`;
                        }).join('')}
                    </select>
                `;

                const select = slotEl.querySelector('.plant-select');
                select.onclick = (e) => e.stopPropagation();
                select.onchange = (e) => {
                    e.stopPropagation();
                    if (e.target.value) {
                        plantSeed(index, e.target.value);
                    }
                };
            } else {
                slotEl.innerHTML = `
                    <div class="slot-icon">🕳️</div>
                    <div class="slot-label">Vide</div>
                    <div class="slot-level">Achète des graines !</div>
                `;
            }
        }

        gardenSlotsContainer.appendChild(slotEl);
    });

    // Afficher un emplacement verrouillé si possible
    if (gardenSlots.length <= gardenPotsData.length) {
        const lockedSlot = document.createElement('div');
        lockedSlot.className = 'garden-slot locked';
        lockedSlot.innerHTML = `
            <div class="slot-icon">🔒</div>
            <div class="slot-label">Verrouillé</div>
            <div class="slot-level">Achète un pot !</div>
        `;
        gardenSlotsContainer.appendChild(lockedSlot);
    }
}

function getPlantInfo(plantType) {
    const plants = {
        sunflower: { name: 'Tournesol', icon: '🌻' },
        cactus: { name: 'Cactus', icon: '🌵' },
        bamboo: { name: 'Bambou', icon: '🎋' }
    };
    return plants[plantType] || { name: 'Plante', icon: '🌱' };
}

function buySeed(seed) {
    if (kawaiMoney < seed.price) return;

    kawaiMoney -= seed.price;
    ownedSeeds.push(seed.id);

    updateMoneyDisplay();
    renderGardenShop();
    saveGame();
}

function buyGardenPot(pot) {
    if (kawaiMoney < pot.price) return;

    kawaiMoney -= pot.price;
    gardenSlots.push({ unlocked: true, plant: null, level: 0 });

    updateMoneyDisplay();
    renderGardenShop();
    renderSidePlants();
    saveGame();
}

function plantSeed(slotIndex, plantType) {
    if (gardenSlots[slotIndex] && !gardenSlots[slotIndex].plant) {
        gardenSlots[slotIndex].plant = plantType;
        gardenSlots[slotIndex].level = 1;

        renderGardenShop();
        renderSidePlants();
        saveGame();
    }
}

function waterGardenPlant(slotIndex) {
    if (gardenSlots[slotIndex] && gardenSlots[slotIndex].plant && gardenSlots[slotIndex].level < 10) {
        gardenSlots[slotIndex].level++;

        renderGardenShop();
        renderSidePlants();
        saveGame();
    }
}

// Afficher les plantes du jardin sur l'écran
function renderSidePlants() {
    // Supprimer les anciennes plantes
    document.querySelectorAll('.side-plant').forEach(el => el.remove());

    // Ne pas afficher si masqué
    if (!showSidePlants) return;

    const plantsWithPlant = gardenSlots.filter(slot => slot.plant);

    plantsWithPlant.forEach((slot, index) => {
        const plantInfo = getPlantInfo(slot.plant);
        const slotIndex = gardenSlots.indexOf(slot);

        const plantEl = document.createElement('div');
        plantEl.className = 'side-plant';
        plantEl.dataset.slotIndex = slotIndex;

        // Récupérer la position sauvegardée ou définir une position par défaut
        const defaultX = index % 2 === 0 ? 50 + (index * 80) : window.innerWidth - 150 - (index * 80);
        const defaultY = window.innerHeight - 300;
        const savedPos = slot.position || { x: defaultX, y: defaultY };
        plantEl.style.left = savedPos.x + 'px';
        plantEl.style.top = savedPos.y + 'px';

        // Récupérer la couleur du pot équipé pour cette plante
        const potColor = getPotColor(slot.equippedPot);

        plantEl.innerHTML = `
            <div class="plant-level">${plantInfo.icon} Niv.${slot.level}</div>
            <div class="mini-pot-container">
                <div class="mini-plant">
                    ${createMiniPlant(slot.plant, slot.level)}
                </div>
                <div class="mini-pot" style="background: linear-gradient(180deg, ${potColor.light} 0%, ${potColor.mid} 30%, ${potColor.dark} 100%);">
                    <div class="mini-soil"></div>
                </div>
            </div>
        `;

        // Menu contextuel au clic droit
        plantEl.oncontextmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            showPotContextMenu(e.clientX, e.clientY, slotIndex, slot.equippedPot);
        };

        // Ajouter le drag and drop
        makeDraggable(plantEl, slotIndex);

        document.body.appendChild(plantEl);
    });
}

// Système de drag and drop pour les plantes
function makeDraggable(element, slotIndex) {
    let offsetX = 0;
    let offsetY = 0;

    element.onmousedown = function(e) {
        e.preventDefault();

        // Position de la souris au début
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        element.classList.add('dragging');

        document.onmousemove = function(e) {
            e.preventDefault();

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Limiter aux bords de l'écran
            newX = Math.max(0, Math.min(newX, window.innerWidth - 100));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 150));

            element.style.left = newX + 'px';
            element.style.top = newY + 'px';
        };

        document.onmouseup = function() {
            element.classList.remove('dragging');

            // Sauvegarder la position
            gardenSlots[slotIndex].position = {
                x: parseInt(element.style.left) || 0,
                y: parseInt(element.style.top) || 0
            };
            saveGame();

            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

function createMiniPlant(plantType, level) {
    const stemHeight = 30 + level * 10;
    const icons = {
        sunflower: '🌻',
        cactus: '🌵',
        bamboo: '🎋'
    };

    return `
        <div class="mini-stem" style="height: ${stemHeight}px; background: linear-gradient(90deg, #66bb6a, #43a047); width: 8px; border-radius: 4px; margin: 0 auto;"></div>
        <div class="mini-flower" style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: ${30 + level * 3}px;">${icons[plantType] || '🌱'}</div>
    `;
}

function getPotColor(potId) {
    // Couleurs par défaut
    const defaultColor = { light: '#d4a574', mid: '#c49a6c', dark: '#a67c52' };

    if (!potId) return defaultColor;

    const pot = shopItemsData.find(item => item.id === potId && item.type === 'pot');
    if (!pot) return defaultColor;

    return {
        light: pot.color,
        mid: adjustColor(pot.color, -20),
        dark: adjustColor(pot.color, -40)
    };
}

function getOwnedPotsOptions(currentPot) {
    const ownedPots = ownedItems.filter(itemId => {
        const item = shopItemsData.find(i => i.id === itemId);
        return item && item.type === 'pot';
    });

    return ownedPots.map(potId => {
        const pot = shopItemsData.find(i => i.id === potId);
        const selected = currentPot === potId ? 'selected' : '';
        return `<option value="${potId}" ${selected}>${pot.icon} ${pot.name}</option>`;
    }).join('');
}

function changeGardenPlantPot(slotIndex, potId) {
    gardenSlots[slotIndex].equippedPot = potId || null;
    saveGame();
    renderSidePlants();
}

function showPotContextMenu(x, y, slotIndex, currentPot) {
    // Supprimer l'ancien menu s'il existe
    const oldMenu = document.querySelector('.pot-context-menu');
    if (oldMenu) oldMenu.remove();

    // Créer le menu
    const menu = document.createElement('div');
    menu.className = 'pot-context-menu';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';

    // Option par défaut
    const defaultOption = document.createElement('div');
    defaultOption.className = 'pot-menu-item' + (!currentPot ? ' active' : '');
    defaultOption.innerHTML = '🪴 Pot par défaut';
    defaultOption.onclick = () => {
        changeGardenPlantPot(slotIndex, null);
        menu.remove();
    };
    menu.appendChild(defaultOption);

    // Pots achetés
    const ownedPots = ownedItems.filter(itemId => {
        const item = shopItemsData.find(i => i.id === itemId);
        return item && item.type === 'pot';
    });

    ownedPots.forEach(potId => {
        const pot = shopItemsData.find(i => i.id === potId);
        const option = document.createElement('div');
        option.className = 'pot-menu-item' + (currentPot === potId ? ' active' : '');
        option.innerHTML = `<span style="color: ${pot.color}">●</span> ${pot.name}`;
        option.onclick = () => {
            changeGardenPlantPot(slotIndex, potId);
            menu.remove();
        };
        menu.appendChild(option);
    });

    if (ownedPots.length === 0) {
        const noPotsMsg = document.createElement('div');
        noPotsMsg.className = 'pot-menu-item disabled';
        noPotsMsg.innerHTML = 'Achète des pots dans le Shop !';
        menu.appendChild(noPotsMsg);
    }

    document.body.appendChild(menu);

    // Fermer le menu au clic ailleurs
    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        });
    }, 10);
}

// Event listeners jardinerie
gardenBtn.addEventListener('click', openGarden);
gardenClose.addEventListener('click', closeGarden);
gardenModal.addEventListener('click', (e) => {
    if (e.target === gardenModal) {
        closeGarden(e);
    }
});

// === Fonctions Déco ===

function openDeco(e) {
    e.stopPropagation();
    decoModal.classList.add('active');
    renderDecoShop();
}

function closeDeco(e) {
    if (e) e.stopPropagation();
    decoModal.classList.remove('active');
}

function renderDecoShop() {
    decoBalance.textContent = Math.floor(kawaiMoney);
    decoItemsContainer.innerHTML = '';

    decoItemsData.forEach(item => {
        const canAfford = kawaiMoney >= item.price;

        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item' + (!canAfford ? ' locked' : '');

        itemEl.innerHTML = `
            <div class="item-icon">${item.emoji}</div>
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-desc">Déco kawaii déplaçable</div>
            </div>
            <button class="item-price" ${!canAfford ? 'disabled' : ''}>
                ✿ ${item.price}
            </button>
        `;

        if (canAfford) {
            itemEl.querySelector('button').onclick = (e) => {
                e.stopPropagation();
                buyDecoItem(item);
            };
        }

        decoItemsContainer.appendChild(itemEl);
    });
}

function buyDecoItem(item) {
    if (kawaiMoney < item.price) return;

    kawaiMoney -= item.price;

    // Ajouter l'item au centre de l'écran
    const newItem = {
        id: item.id + '_' + Date.now(),
        type: item.id,
        emoji: item.emoji,
        x: window.innerWidth / 2 - 20,
        y: window.innerHeight / 2 - 20
    };

    placedDecoItems.push(newItem);

    updateMoneyDisplay();
    renderDecoShop();
    renderDecoItems();
    saveGame();
}

function renderDecoItems() {
    // Supprimer les anciens items
    document.querySelectorAll('.deco-item').forEach(el => el.remove());

    placedDecoItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'deco-item';
        itemEl.dataset.index = index;
        itemEl.style.left = item.x + 'px';
        itemEl.style.top = item.y + 'px';

        const size = item.size || 1;
        const rotation = item.rotation || 0;
        itemEl.style.transform = `scale(${size}) rotate(${rotation}deg)`;

        itemEl.innerHTML = `<span class="deco-emoji">${item.emoji}</span>`;

        // Drag and drop
        makeDecoDraggable(itemEl, index);

        // Clic droit pour supprimer
        itemEl.oncontextmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            showDecoContextMenu(e.clientX, e.clientY, index);
        };

        document.body.appendChild(itemEl);
    });
}

function makeDecoDraggable(element, itemIndex) {
    let offsetX = 0;
    let offsetY = 0;

    element.onmousedown = function(e) {
        if (e.button !== 0) return; // Seulement clic gauche
        e.preventDefault();

        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        element.classList.add('dragging');

        document.onmousemove = function(e) {
            e.preventDefault();

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Limiter aux bords
            newX = Math.max(0, Math.min(newX, window.innerWidth - 50));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 50));

            element.style.left = newX + 'px';
            element.style.top = newY + 'px';
        };

        document.onmouseup = function() {
            element.classList.remove('dragging');

            // Sauvegarder la position
            placedDecoItems[itemIndex].x = parseInt(element.style.left) || 0;
            placedDecoItems[itemIndex].y = parseInt(element.style.top) || 0;
            saveGame();

            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

function showDecoContextMenu(x, y, itemIndex) {
    // Supprimer l'ancien menu
    const oldMenu = document.querySelector('.deco-context-menu');
    if (oldMenu) oldMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'pot-context-menu deco-context-menu';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';

    const currentSize = placedDecoItems[itemIndex].size || 1;
    const currentRotation = placedDecoItems[itemIndex].rotation || 0;

    // Option tourner droite
    const rotateRightOption = document.createElement('div');
    rotateRightOption.className = 'pot-menu-item';
    rotateRightOption.innerHTML = '↻ Tourner 90° →';
    rotateRightOption.onclick = () => {
        placedDecoItems[itemIndex].rotation = (currentRotation + 90) % 360;
        saveGame();
        renderDecoItems();
        menu.remove();
    };
    menu.appendChild(rotateRightOption);

    // Option tourner gauche
    const rotateLeftOption = document.createElement('div');
    rotateLeftOption.className = 'pot-menu-item';
    rotateLeftOption.innerHTML = '↺ Tourner 90° ←';
    rotateLeftOption.onclick = () => {
        placedDecoItems[itemIndex].rotation = (currentRotation - 90 + 360) % 360;
        saveGame();
        renderDecoItems();
        menu.remove();
    };
    menu.appendChild(rotateLeftOption);

    // Séparateur rotation/taille
    const separatorRotation = document.createElement('div');
    separatorRotation.style.borderTop = '1px dashed #ccc';
    separatorRotation.style.margin = '5px 0';
    menu.appendChild(separatorRotation);

    // Option agrandir
    const biggerOption = document.createElement('div');
    biggerOption.className = 'pot-menu-item';
    biggerOption.innerHTML = '🔍+ Agrandir';
    biggerOption.onclick = () => {
        placedDecoItems[itemIndex].size = Math.min((currentSize + 0.25), 3);
        saveGame();
        renderDecoItems();
        menu.remove();
    };
    menu.appendChild(biggerOption);

    // Option réduire
    const smallerOption = document.createElement('div');
    smallerOption.className = 'pot-menu-item';
    smallerOption.innerHTML = '🔍- Réduire';
    smallerOption.onclick = () => {
        placedDecoItems[itemIndex].size = Math.max((currentSize - 0.25), 0.25);
        saveGame();
        renderDecoItems();
        menu.remove();
    };
    menu.appendChild(smallerOption);

    // Option taille normale
    const resetOption = document.createElement('div');
    resetOption.className = 'pot-menu-item';
    resetOption.innerHTML = '↺ Taille normale';
    resetOption.onclick = () => {
        placedDecoItems[itemIndex].size = 1;
        saveGame();
        renderDecoItems();
        menu.remove();
    };
    menu.appendChild(resetOption);

    // Séparateur
    const separator = document.createElement('div');
    separator.style.borderTop = '1px dashed #ccc';
    separator.style.margin = '5px 0';
    menu.appendChild(separator);

    // Option supprimer
    const deleteOption = document.createElement('div');
    deleteOption.className = 'pot-menu-item';
    deleteOption.innerHTML = '🗑️ Supprimer';
    deleteOption.onclick = () => {
        placedDecoItems.splice(itemIndex, 1);
        saveGame();
        renderDecoItems();
        menu.remove();
    };
    menu.appendChild(deleteOption);

    document.body.appendChild(menu);

    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        });
    }, 10);
}

// Event listeners déco
decoBtn.addEventListener('click', openDeco);
decoClose.addEventListener('click', closeDeco);
decoModal.addEventListener('click', (e) => {
    if (e.target === decoModal) {
        closeDeco(e);
    }
});

// === Fonctions Fonds ===

function openBg(e) {
    e.stopPropagation();
    bgModal.classList.add('active');
    renderBgShop();
}

function closeBg(e) {
    if (e) e.stopPropagation();
    bgModal.classList.remove('active');
}

function renderBgShop() {
    bgBalance.textContent = Math.floor(kawaiMoney);
    bgItemsContainer.innerHTML = '';

    backgroundsData.forEach(bg => {
        const isOwned = ownedBackgrounds.includes(bg.id);
        const isEquipped = equippedBackground === bg.id;
        const canAfford = kawaiMoney >= bg.price;

        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item' + (isOwned ? ' owned' : '') + (!canAfford && !isOwned ? ' locked' : '') + (isEquipped ? ' equipped' : '');

        let buttonText = `✿ ${bg.price}`;
        let buttonClass = 'item-price';
        let buttonDisabled = false;

        if (isOwned) {
            if (isEquipped) {
                buttonText = '✓ Équipé';
                buttonClass += ' equipped-btn';
                buttonDisabled = true;
            } else {
                buttonText = 'Équiper';
                buttonClass += ' equip-btn';
            }
        } else if (!canAfford) {
            buttonDisabled = true;
        }

        itemEl.innerHTML = `
            <div class="item-icon">${bg.icon}</div>
            <div class="item-info">
                <div class="item-name">${bg.name}</div>
                <div class="item-desc">${bg.desc}</div>
            </div>
            <button class="${buttonClass}" ${buttonDisabled ? 'disabled' : ''}>
                ${buttonText}
            </button>
        `;

        if (!buttonDisabled) {
            itemEl.querySelector('button').onclick = (e) => {
                e.stopPropagation();
                if (isOwned) {
                    equipBackground(bg.id);
                } else {
                    buyBackground(bg);
                }
            };
        }

        bgItemsContainer.appendChild(itemEl);
    });
}

function buyBackground(bg) {
    if (kawaiMoney < bg.price) return;

    kawaiMoney -= bg.price;
    ownedBackgrounds.push(bg.id);
    equipBackground(bg.id);

    updateMoneyDisplay();
    renderBgShop();
    saveGame();
}

function equipBackground(bgId) {
    equippedBackground = bgId;
    const bg = backgroundsData.find(b => b.id === bgId);
    if (bg) {
        backgroundEl.style.background = bg.gradient;
    }
    renderBgShop();
    saveGame();
}

// Event listeners fonds
bgBtn.addEventListener('click', openBg);
bgClose.addEventListener('click', closeBg);
bgModal.addEventListener('click', (e) => {
    if (e.target === bgModal) {
        closeBg(e);
    }
});

// === Fonctions Décors d'arrière-plan ===

function openDecor(e) {
    e.stopPropagation();
    decorModal.classList.add('active');
    renderDecorShop();
}

function closeDecor(e) {
    if (e) e.stopPropagation();
    decorModal.classList.remove('active');
}

function renderDecorShop() {
    decorBalance.textContent = Math.floor(kawaiMoney);
    decorItemsContainer.innerHTML = '';

    decorBgItemsData.forEach(item => {
        const canAfford = kawaiMoney >= item.price;

        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item' + (!canAfford ? ' locked' : '');

        itemEl.innerHTML = `
            <div class="item-icon">${item.emoji}</div>
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-desc">Décor d'arrière-plan</div>
            </div>
            <button class="item-price" ${!canAfford ? 'disabled' : ''}>
                ✿ ${item.price}
            </button>
        `;

        if (canAfford) {
            itemEl.querySelector('button').onclick = (e) => {
                e.stopPropagation();
                buyDecorBgItem(item);
            };
        }

        decorItemsContainer.appendChild(itemEl);
    });
}

function buyDecorBgItem(item) {
    if (kawaiMoney < item.price) return;

    kawaiMoney -= item.price;

    const newItem = {
        id: item.id + '_' + Date.now(),
        type: item.id,
        emoji: item.emoji,
        x: window.innerWidth / 2 - 40,
        y: window.innerHeight * 0.4,
        size: 1,
        rotation: 0
    };

    placedDecorBgItems.push(newItem);

    updateMoneyDisplay();
    renderDecorShop();
    renderDecorBgItems();
    saveGame();
}

function renderDecorBgItems() {
    document.querySelectorAll('.decor-bg-item').forEach(el => el.remove());

    placedDecorBgItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'decor-bg-item';
        itemEl.dataset.index = index;
        itemEl.style.left = item.x + 'px';
        itemEl.style.top = item.y + 'px';

        const size = item.size || 1;
        const rotation = item.rotation || 0;
        itemEl.style.transform = `scale(${size}) rotate(${rotation}deg)`;

        itemEl.innerHTML = `<span class="decor-bg-emoji">${item.emoji}</span>`;

        makeDecorBgDraggable(itemEl, index);

        itemEl.oncontextmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            showDecorBgContextMenu(e.clientX, e.clientY, index);
        };

        document.body.appendChild(itemEl);
    });
}

function makeDecorBgDraggable(element, itemIndex) {
    let offsetX = 0;
    let offsetY = 0;

    element.onmousedown = function(e) {
        if (e.button !== 0) return;
        e.preventDefault();

        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        element.classList.add('dragging');

        document.onmousemove = function(e) {
            e.preventDefault();

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            newX = Math.max(0, Math.min(newX, window.innerWidth - 80));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 80));

            element.style.left = newX + 'px';
            element.style.top = newY + 'px';
        };

        document.onmouseup = function() {
            element.classList.remove('dragging');

            placedDecorBgItems[itemIndex].x = parseInt(element.style.left) || 0;
            placedDecorBgItems[itemIndex].y = parseInt(element.style.top) || 0;
            saveGame();

            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

function showDecorBgContextMenu(x, y, itemIndex) {
    const oldMenu = document.querySelector('.decor-bg-context-menu');
    if (oldMenu) oldMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'pot-context-menu decor-bg-context-menu';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';

    const currentSize = placedDecorBgItems[itemIndex].size || 1;
    const currentRotation = placedDecorBgItems[itemIndex].rotation || 0;

    // Tourner droite
    const rotateRightOption = document.createElement('div');
    rotateRightOption.className = 'pot-menu-item';
    rotateRightOption.innerHTML = '↻ Tourner 90° →';
    rotateRightOption.onclick = () => {
        placedDecorBgItems[itemIndex].rotation = (currentRotation + 90) % 360;
        saveGame();
        renderDecorBgItems();
        menu.remove();
    };
    menu.appendChild(rotateRightOption);

    // Tourner gauche
    const rotateLeftOption = document.createElement('div');
    rotateLeftOption.className = 'pot-menu-item';
    rotateLeftOption.innerHTML = '↺ Tourner 90° ←';
    rotateLeftOption.onclick = () => {
        placedDecorBgItems[itemIndex].rotation = (currentRotation - 90 + 360) % 360;
        saveGame();
        renderDecorBgItems();
        menu.remove();
    };
    menu.appendChild(rotateLeftOption);

    // Séparateur
    const sep1 = document.createElement('div');
    sep1.style.borderTop = '1px dashed #ccc';
    sep1.style.margin = '5px 0';
    menu.appendChild(sep1);

    // Agrandir
    const biggerOption = document.createElement('div');
    biggerOption.className = 'pot-menu-item';
    biggerOption.innerHTML = '🔍+ Agrandir';
    biggerOption.onclick = () => {
        placedDecorBgItems[itemIndex].size = Math.min((currentSize + 0.25), 3);
        saveGame();
        renderDecorBgItems();
        menu.remove();
    };
    menu.appendChild(biggerOption);

    // Réduire
    const smallerOption = document.createElement('div');
    smallerOption.className = 'pot-menu-item';
    smallerOption.innerHTML = '🔍- Réduire';
    smallerOption.onclick = () => {
        placedDecorBgItems[itemIndex].size = Math.max((currentSize - 0.25), 0.25);
        saveGame();
        renderDecorBgItems();
        menu.remove();
    };
    menu.appendChild(smallerOption);

    // Taille normale
    const resetOption = document.createElement('div');
    resetOption.className = 'pot-menu-item';
    resetOption.innerHTML = '↺ Taille normale';
    resetOption.onclick = () => {
        placedDecorBgItems[itemIndex].size = 1;
        placedDecorBgItems[itemIndex].rotation = 0;
        saveGame();
        renderDecorBgItems();
        menu.remove();
    };
    menu.appendChild(resetOption);

    // Séparateur
    const sep2 = document.createElement('div');
    sep2.style.borderTop = '1px dashed #ccc';
    sep2.style.margin = '5px 0';
    menu.appendChild(sep2);

    // Supprimer
    const deleteOption = document.createElement('div');
    deleteOption.className = 'pot-menu-item';
    deleteOption.innerHTML = '🗑️ Supprimer';
    deleteOption.onclick = () => {
        placedDecorBgItems.splice(itemIndex, 1);
        saveGame();
        renderDecorBgItems();
        menu.remove();
    };
    menu.appendChild(deleteOption);

    document.body.appendChild(menu);

    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        });
    }, 10);
}

// Event listeners décors
decorBtn.addEventListener('click', openDecor);
decorClose.addEventListener('click', closeDecor);
decorModal.addEventListener('click', (e) => {
    if (e.target === decorModal) {
        closeDecor(e);
    }
});

// === Fonctions Couleurs Nature ===

function openNatureColor(e) {
    e.stopPropagation();
    natureColorModal.classList.add('active');
    renderNatureColors();
}

function closeNatureColor(e) {
    if (e) e.stopPropagation();
    natureColorModal.classList.remove('active');
}

function renderNatureColors() {
    // Couleurs du sol
    groundColorsContainer.innerHTML = '';
    groundColorsData.forEach(color => {
        const colorEl = document.createElement('div');
        colorEl.className = 'color-option' + (selectedGroundColor === color.id ? ' selected' : '');
        colorEl.style.background = `linear-gradient(135deg, ${color.colors[0]}, ${color.colors[2]})`;
        colorEl.title = color.name;
        colorEl.onclick = (e) => {
            e.stopPropagation();
            selectGroundColor(color.id);
        };
        groundColorsContainer.appendChild(colorEl);
    });

    // Couleurs des arbres
    treeColorsContainer.innerHTML = '';
    treeColorsData.forEach(color => {
        const colorEl = document.createElement('div');
        colorEl.className = 'color-option' + (selectedTreeColor === color.id ? ' selected' : '');
        colorEl.style.background = `linear-gradient(135deg, ${color.colors[0]}, ${color.colors[1]})`;
        colorEl.title = color.name;
        colorEl.onclick = (e) => {
            e.stopPropagation();
            selectTreeColor(color.id);
        };
        treeColorsContainer.appendChild(colorEl);
    });

    // Couleurs des montagnes
    mountainColorsContainer.innerHTML = '';
    mountainColorsData.forEach(color => {
        const colorEl = document.createElement('div');
        colorEl.className = 'color-option' + (selectedMountainColor === color.id ? ' selected' : '');
        colorEl.style.background = `linear-gradient(135deg, ${color.colors[0]}, ${color.colors[2]})`;
        colorEl.title = color.name;
        colorEl.onclick = (e) => {
            e.stopPropagation();
            selectMountainColor(color.id);
        };
        mountainColorsContainer.appendChild(colorEl);
    });
}

function selectGroundColor(colorId) {
    selectedGroundColor = colorId;
    applyGroundColor();
    renderNatureColors();
    saveGame();
}

function selectTreeColor(colorId) {
    selectedTreeColor = colorId;
    applyTreeColor();
    renderNatureColors();
    saveGame();
}

function selectMountainColor(colorId) {
    selectedMountainColor = colorId;
    applyMountainColor();
    renderNatureColors();
    saveGame();
}

function applyGroundColor() {
    const colorData = groundColorsData.find(c => c.id === selectedGroundColor);
    if (!colorData) return;

    const ground = document.querySelector('.ground');
    if (ground) {
        ground.style.background = `linear-gradient(180deg, ${colorData.colors[0]} 0%, ${colorData.colors[1]} 50%, ${colorData.colors[2]} 100%)`;
    }
}

function applyTreeColor() {
    const colorData = treeColorsData.find(c => c.id === selectedTreeColor);
    if (!colorData) return;

    const treeTops = document.querySelectorAll('.tree-top');
    treeTops.forEach(treeTop => {
        treeTop.style.background = colorData.colors[0];
    });

    // Appliquer aussi au pseudo-élément via une classe CSS dynamique
    const styleId = 'tree-color-style';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
        .tree-top::before {
            background: ${colorData.colors[1]} !important;
        }
    `;
}

function applyMountainColor() {
    const colorData = mountainColorsData.find(c => c.id === selectedMountainColor);
    if (!colorData) return;

    const mountains = document.querySelectorAll('.mountain');
    mountains.forEach((mountain, index) => {
        // Alterner les couleurs pour plus de variété
        const colorIndex = index % colorData.colors.length;
        mountain.style.borderBottomColor = colorData.colors[colorIndex];
    });
}

function applyAllNatureColors() {
    applyGroundColor();
    applyTreeColor();
    applyMountainColor();
}

// Event listeners couleurs nature
natureColorBtn.addEventListener('click', openNatureColor);
natureColorClose.addEventListener('click', closeNatureColor);
natureColorModal.addEventListener('click', (e) => {
    if (e.target === natureColorModal) {
        closeNatureColor(e);
    }
});

// === Fonctions Météorites ===

function updateCrystalDisplay() {
    crystalAmountDisplay.textContent = crystals;
}

function spawnMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';

    // Emoji aléatoire
    const emoji = meteorEmojis[Math.floor(Math.random() * meteorEmojis.length)];
    meteor.textContent = emoji;

    // Position horizontale aléatoire
    const startX = Math.random() * (window.innerWidth - 50);
    meteor.style.left = startX + 'px';
    meteor.style.top = '-50px';

    // Durée de chute aléatoire (3-7 secondes)
    const fallDuration = 3 + Math.random() * 4;
    meteor.style.animationDuration = `${fallDuration}s, 0.3s`;

    // Valeur en cristaux (1-3)
    const value = Math.floor(Math.random() * 3) + 1;
    meteor.dataset.value = value;

    // Clic pour collecter
    meteor.onclick = (e) => {
        e.stopPropagation();
        collectMeteor(meteor, value);
    };

    meteorsContainer.appendChild(meteor);

    // Supprimer après l'animation
    setTimeout(() => {
        if (meteor.parentNode) {
            meteor.remove();
        }
    }, fallDuration * 1000);
}

function collectMeteor(meteor, value) {
    if (meteor.classList.contains('collected')) return;

    meteor.classList.add('collected');

    // Ajouter les cristaux
    crystals += value;
    updateCrystalDisplay();
    saveGame();

    // Animation popup +X
    const popup = document.createElement('div');
    popup.className = 'crystal-popup';
    popup.textContent = `+${value} 💎`;
    popup.style.left = meteor.style.left;
    popup.style.top = meteor.getBoundingClientRect().top + 'px';
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 1000);

    // Supprimer la météorite après l'animation
    setTimeout(() => {
        meteor.remove();
    }, 400);
}

// Spawner des météorites régulièrement (toutes les 15-30 secondes)
function scheduleMeteorSpawn() {
    const delay = 15000 + Math.random() * 15000;
    setTimeout(() => {
        spawnMeteor();
        scheduleMeteorSpawn();
    }, delay);
}

// Démarrer le spawn des météorites
scheduleMeteorSpawn();
// Spawner une première météorite après 10 secondes
setTimeout(spawnMeteor, 10000);

// === Fonctions Entonnoir ===

function renderFunnel() {
    // Supprimer l'ancien entonnoir s'il existe
    const oldFunnel = document.getElementById('magicFunnel');
    if (oldFunnel) oldFunnel.remove();

    if (!hasFunnel) return;

    const funnel = document.createElement('div');
    funnel.id = 'magicFunnel';
    funnel.className = 'magic-funnel';
    funnel.style.left = funnelPosition.x + 'px';
    funnel.style.top = funnelPosition.y + 'px';
    funnel.innerHTML = `
        <div class="funnel-top">🔻</div>
        <div class="funnel-glow"></div>
    `;

    // Drag and drop
    makeFunnelDraggable(funnel);

    document.body.appendChild(funnel);
}

function makeFunnelDraggable(element) {
    let offsetX = 0;
    let offsetY = 0;

    element.onmousedown = function(e) {
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();

        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        element.classList.add('dragging');

        document.onmousemove = function(e) {
            e.preventDefault();

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            newX = Math.max(0, Math.min(newX, window.innerWidth - 80));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 100));

            element.style.left = newX + 'px';
            element.style.top = newY + 'px';
        };

        document.onmouseup = function() {
            element.classList.remove('dragging');

            funnelPosition.x = parseInt(element.style.left) || 0;
            funnelPosition.y = parseInt(element.style.top) || 0;
            saveGame();

            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}

// Vérifier si une météorite touche l'entonnoir
function checkFunnelCollision(meteor) {
    if (!hasFunnel) return false;

    const funnel = document.getElementById('magicFunnel');
    if (!funnel) return false;

    const meteorRect = meteor.getBoundingClientRect();
    const funnelRect = funnel.getBoundingClientRect();

    // Zone de détection élargie pour l'entonnoir
    const funnelZone = {
        left: funnelRect.left - 20,
        right: funnelRect.right + 20,
        top: funnelRect.top - 30,
        bottom: funnelRect.bottom
    };

    const meteorCenter = {
        x: meteorRect.left + meteorRect.width / 2,
        y: meteorRect.top + meteorRect.height / 2
    };

    return meteorCenter.x >= funnelZone.left &&
           meteorCenter.x <= funnelZone.right &&
           meteorCenter.y >= funnelZone.top &&
           meteorCenter.y <= funnelZone.bottom;
}

// Vérifier les collisions régulièrement
function checkAllMeteorCollisions() {
    if (!hasFunnel) return;

    const meteors = document.querySelectorAll('.meteor:not(.collected)');
    meteors.forEach(meteor => {
        if (checkFunnelCollision(meteor)) {
            const value = parseInt(meteor.dataset.value) || 1;
            collectMeteorByFunnel(meteor, value);
        }
    });
}

function collectMeteorByFunnel(meteor, value) {
    if (meteor.classList.contains('collected')) return;

    meteor.classList.add('collected');

    // Ajouter les cristaux
    crystals += value;
    updateCrystalDisplay();
    saveGame();

    // Animation spéciale pour l'entonnoir
    const funnel = document.getElementById('magicFunnel');
    if (funnel) {
        funnel.classList.add('collecting');
        setTimeout(() => funnel.classList.remove('collecting'), 300);
    }

    // Animation popup
    const popup = document.createElement('div');
    popup.className = 'crystal-popup';
    popup.textContent = `+${value} 💎`;
    popup.style.left = funnelPosition.x + 40 + 'px';
    popup.style.top = funnelPosition.y + 'px';
    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 1000);
    setTimeout(() => meteor.remove(), 400);
}

// Vérifier les collisions toutes les 100ms
setInterval(checkAllMeteorCollisions, 100);

// === Couper la plante principale ===

const mainPlantContainer = document.querySelector('.main-plant');

// Clic droit sur le conteneur principal (toujours accessible)
mainPlantContainer.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (growthLevel < maxLevel) {
        // Message si pas au niveau max
        const popup = document.createElement('div');
        popup.className = 'crystal-popup';
        popup.textContent = `Niveau ${maxLevel} requis !`;
        popup.style.left = e.clientX + 'px';
        popup.style.top = e.clientY + 'px';
        popup.style.color = '#ff5252';
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1000);
        return;
    }

    showHarvestMenu(e.clientX, e.clientY);
});

function getHarvestReward() {
    // Récompense fixe de 10 diamants quand niveau max
    return 10;
}

function showHarvestMenu(x, y) {
    // Supprimer l'ancien menu s'il existe
    const oldMenu = document.querySelector('.harvest-menu');
    if (oldMenu) oldMenu.remove();

    const reward = getHarvestReward();

    const menu = document.createElement('div');
    menu.className = 'pot-context-menu harvest-menu';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';

    const harvestOption = document.createElement('div');
    harvestOption.className = 'pot-menu-item';
    harvestOption.innerHTML = `✂️ Couper la plante (+${reward} 💎)`;
    harvestOption.onclick = () => {
        harvestMainPlant();
        menu.remove();
    };
    menu.appendChild(harvestOption);

    const cancelOption = document.createElement('div');
    cancelOption.className = 'pot-menu-item';
    cancelOption.innerHTML = '❌ Annuler';
    cancelOption.onclick = () => {
        menu.remove();
    };
    menu.appendChild(cancelOption);

    document.body.appendChild(menu);

    setTimeout(() => {
        document.addEventListener('click', function closeMenu() {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        });
    }, 10);
}

function harvestMainPlant() {
    if (growthLevel === 0) return;

    const reward = getHarvestReward();

    // Animation de coupe
    const plant = document.getElementById('plant');
    plant.classList.add('harvesting');

    setTimeout(() => {
        // Réinitialiser le niveau
        growthLevel = 0;

        // Donner les cristaux selon le niveau
        crystals += reward;
        updateCrystalDisplay();

        // Mettre à jour la plante
        updatePlant();
        updateMoneyDisplay();
        saveGame();

        plant.classList.remove('harvesting');

        // Animation popup
        const popup = document.createElement('div');
        popup.className = 'crystal-popup';
        popup.textContent = `+${reward} 💎`;
        popup.style.left = '50%';
        popup.style.top = '40%';
        popup.style.transform = 'translateX(-50%)';
        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 1000);
    }, 300);
}

// === Système de Reset ===

const resetBtn = document.getElementById('resetBtn');
const resetModal = document.getElementById('resetModal');
const resetCancel = document.getElementById('resetCancel');
const resetConfirm = document.getElementById('resetConfirm');

function openResetModal(e) {
    e.stopPropagation();
    resetModal.classList.add('active');
}

function closeResetModal(e) {
    if (e) e.stopPropagation();
    resetModal.classList.remove('active');
}

function resetGame() {
    // Supprimer la sauvegarde
    localStorage.removeItem('kawaiPlantSave');

    // Recharger la page
    location.reload();
}

resetBtn.addEventListener('click', openResetModal);
resetCancel.addEventListener('click', closeResetModal);
resetConfirm.addEventListener('click', resetGame);
resetModal.addEventListener('click', (e) => {
    if (e.target === resetModal) {
        closeResetModal(e);
    }
});

// === Système de Musique ===

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = musicBtn.querySelector('.music-icon');
let musicPlaying = false;

function toggleMusic(e) {
    if (e) e.stopPropagation();

    if (musicPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🔇';
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play();
        musicIcon.textContent = '🎵';
        musicBtn.classList.add('playing');
    }
    musicPlaying = !musicPlaying;
}

// Drag and drop pour le bouton musique
let musicBtnDragging = false;

musicBtn.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const rect = musicBtn.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    let hasMoved = false;

    function onMouseMove(e) {
        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);

        if (dx > 5 || dy > 5) {
            hasMoved = true;
            musicBtnDragging = true;
            musicBtn.classList.add('dragging');

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            newX = Math.max(0, Math.min(newX, window.innerWidth - 45));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 45));

            musicBtn.style.left = newX + 'px';
            musicBtn.style.top = newY + 'px';
            musicBtn.style.right = 'auto';
        }
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        musicBtn.classList.remove('dragging');

        if (!hasMoved) {
            toggleMusic();
        }

        setTimeout(() => {
            musicBtnDragging = false;
        }, 10);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// Lancer la musique au premier clic sur la page
document.addEventListener('click', () => {
    if (!musicPlaying) {
        bgMusic.play();
        musicIcon.textContent = '🎵';
        musicBtn.classList.add('playing');
        musicPlaying = true;
    }
}, { once: true });

// === Initialisation ===

// Charger la sauvegarde
loadGame();

// Initialiser la plante
updatePlant();

// Mettre à jour l'affichage de la monnaie
updateMoneyDisplay();

// Mettre à jour l'affichage du niveau max
updateLevelDisplay();

// Afficher les plantes du jardin
renderSidePlants();

// Afficher les décos
renderDecoItems();

// Afficher les décors d'arrière-plan
renderDecorBgItems();

// Appliquer les couleurs nature sauvegardées
applyAllNatureColors();

// Afficher les cristaux
updateCrystalDisplay();

// Afficher l'entonnoir si acheté
renderFunnel();

// Code secret
const secretInput = document.getElementById('secretInput');
const instructions = document.getElementById('instructions');
const originalInstruction = instructions.textContent;

secretInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (secretInput.value === '42') {
            kawaiMoney += 1000000;
            updateMoneyDisplay();
            saveGame();
            secretInput.value = '';
            secretInput.blur();
            instructions.textContent = originalInstruction;
        } else {
            secretInput.value = '';
        }
    }
});

secretInput.addEventListener('click', (e) => {
    e.stopPropagation();
});

secretInput.addEventListener('focus', () => {
    instructions.textContent = 'Code à deux chiffres...';
});

secretInput.addEventListener('blur', () => {
    instructions.textContent = originalInstruction;
});
