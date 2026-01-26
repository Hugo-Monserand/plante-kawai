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
    { id: 'deco_fairy', name: 'Grande Fée', emoji: '<img src="fairy.png" class="deco-img">', price: 10000, isImage: true },
    { id: 'deco_crystal', name: 'Cristal', emoji: '💎', price: 7500 },
    { id: 'deco_ribbon', name: 'Ruban', emoji: '🎀', price: 800 },
    { id: 'deco_balloon', name: 'Ballon', emoji: '🎈', price: 600 },
    { id: 'deco_gift', name: 'Cadeau', emoji: '🎁', price: 2000 }
];

// Items de déco placés sur la map
let placedDecoItems = [];

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
        e.target.closest('.deco-item')) {
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

    if (item.type !== 'boost') {
        ownedItems.push(item.id);

        // Si c'est un pot, augmenter le niveau max de 10
        if (item.type === 'pot') {
            maxLevel += 10;
            updateLevelDisplay();
        }

        // Équiper automatiquement à l'achat
        equipItem(item);
    } else {
        applyItem(item);
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
        placedDecoItems: placedDecoItems
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

        // Réappliquer les items équipés
        if (equippedPot) {
            const potItem = shopItemsData.find(i => i.id === equippedPot);
            if (potItem) applyPotColor(potItem.color);
        }
        if (equippedFlower) {
            const flowerItem = shopItemsData.find(i => i.id === equippedFlower);
            if (flowerItem) applyFlowerColor(flowerItem.color);
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
    renderSeeds();
    renderGardenPots();
    renderGardenSlots();
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
        itemEl.style.transform = `scale(${size})`;

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

musicBtn.addEventListener('click', toggleMusic);

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
