let growthLevel = 0;
const maxLevel = 10;
const stem = document.getElementById('stem');
const leaves = document.getElementById('leaves');
const flowersContainer = document.getElementById('flowersContainer');
const levelDisplay = document.getElementById('level');
const wateringCan = document.getElementById('wateringCan');
const waterDrops = document.getElementById('waterDrops');
const potMouth = document.getElementById('potMouth');

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
    if (growthLevel < maxLevel) {
        growthLevel++;
        animateWatering();

        setTimeout(() => {
            updatePlant();
        }, 800);
    }
});

// Initialiser la plante
updatePlant();
