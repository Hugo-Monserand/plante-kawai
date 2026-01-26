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
        e.target.closest('.reset-modal')) {
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
        equippedFlower: equippedFlower
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
