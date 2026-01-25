let growthLevel = 0;
const maxLevel = 10;
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
        price: 50,
        type: 'pot',
        color: '#64b5f6'
    },
    {
        id: 'pot_pink',
        name: 'Pot Rose Bonbon',
        desc: 'Un pot rose tout mignon',
        icon: '🪴',
        price: 50,
        type: 'pot',
        color: '#f48fb1'
    },
    {
        id: 'pot_purple',
        name: 'Pot Violet Royal',
        desc: 'Un pot majestueux',
        icon: '🪴',
        price: 75,
        type: 'pot',
        color: '#b39ddb'
    },
    {
        id: 'pot_gold',
        name: 'Pot Doré',
        desc: 'Le pot des champions !',
        icon: '🏆',
        price: 200,
        type: 'pot',
        color: '#ffd54f'
    },
    {
        id: 'flower_blue',
        name: 'Fleurs Bleues',
        desc: 'De magnifiques pétales bleus',
        icon: '💙',
        price: 100,
        type: 'flower',
        color: '#64b5f6'
    },
    {
        id: 'flower_yellow',
        name: 'Fleurs Jaunes',
        desc: 'Des fleurs couleur soleil',
        icon: '💛',
        price: 100,
        type: 'flower',
        color: '#fff176'
    },
    {
        id: 'flower_purple',
        name: 'Fleurs Violettes',
        desc: 'Des pétales mystérieux',
        icon: '💜',
        price: 100,
        type: 'flower',
        color: '#ba68c8'
    },
    {
        id: 'flower_rainbow',
        name: 'Fleurs Arc-en-ciel',
        desc: 'Toutes les couleurs !',
        icon: '🌈',
        price: 300,
        type: 'flower',
        color: 'rainbow'
    },
    {
        id: 'boost_x2',
        name: 'Boost x2',
        desc: 'Double la production pendant 30s',
        icon: '⚡',
        price: 150,
        type: 'boost',
        duration: 30
    }
];

let activeBoost = null;

function createFlower(className) {
    const flower = document.createElement('div');
    flower.className = `flower ${className}`;
    flower.innerHTML = `
        <div class="petal"></div>
        <div class="petal"></div>
        <div class="petal"></div>
        <div class="petal"></div>
        <div class="petal"></div>
        <div class="flower-center">
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

    // Hauteur de la tige basée sur les feuilles (pour qu'elle soit synchronisée)
    const leafSpacing = 30;
    const baseHeight = 15;
    const stemHeight = baseHeight + (leafPairs * leafSpacing * 2) + (growthLevel * 5);
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

    if (growthLevel >= 6) {
        // Fleur centrale
        const centerFlower = createFlower('center');
        flowersContainer.appendChild(centerFlower);
    }

    if (growthLevel >= 8) {
        // Fleur gauche
        const leftFlower = createFlower('left');
        flowersContainer.appendChild(leftFlower);
    }

    if (growthLevel >= 10) {
        // Fleur droite
        const rightFlower = createFlower('right');
        flowersContainer.appendChild(rightFlower);
    }

    // Mettre à jour le sourire du pot
    updatePotSmile();

    levelDisplay.textContent = growthLevel;

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
    // Ne pas compter les clics sur le magasin, le bouton shop ou le bouton reload
    if (e.target.closest('.shop-modal') || e.target.closest('.shop-btn') || e.target.closest('.reload-btn')) {
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

        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item' + (isOwned ? ' owned' : '') + (!canAfford && !isOwned ? ' locked' : '');

        let buttonText = `✿ ${item.price}`;
        let buttonClass = 'item-price';

        if (isOwned && item.type !== 'boost') {
            buttonText = '✓ Acheté';
            buttonClass += ' owned-btn';
        }

        itemEl.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-desc">${item.desc}</div>
            </div>
            <button class="${buttonClass}" ${!canAfford && !isOwned ? 'disabled' : ''} ${isOwned && item.type !== 'boost' ? 'disabled' : ''}>
                ${buttonText}
            </button>
        `;

        const buyBtn = itemEl.querySelector('button');
        if (canAfford && (!isOwned || item.type === 'boost')) {
            buyBtn.onclick = (e) => {
                e.stopPropagation();
                buyItem(item);
            };
        }

        shopItemsContainer.appendChild(itemEl);
    });
}

function buyItem(item) {
    if (kawaiMoney < item.price) return;

    kawaiMoney -= item.price;

    if (item.type !== 'boost') {
        ownedItems.push(item.id);
    }

    applyItem(item);
    updateMoneyDisplay();
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
        ownedItems: ownedItems
    };
    localStorage.setItem('kawaiPlantSave', JSON.stringify(saveData));
}

function loadGame() {
    const saveData = localStorage.getItem('kawaiPlantSave');
    if (saveData) {
        const data = JSON.parse(saveData);
        kawaiMoney = data.kawaiMoney || 0;
        growthLevel = data.growthLevel || 0;
        ownedItems = data.ownedItems || [];

        // Réappliquer les items achetés
        ownedItems.forEach(itemId => {
            const item = shopItemsData.find(i => i.id === itemId);
            if (item && item.type !== 'boost') {
                applyItem(item);
            }
        });
    }
}

// === Initialisation ===

// Charger la sauvegarde
loadGame();

// Initialiser la plante
updatePlant();

// Mettre à jour l'affichage de la monnaie
updateMoneyDisplay();
