let growthLevel = 0;
const maxLevel = 10;
const stem = document.getElementById('stem');
const leaves = document.getElementById('leaves');
const flowerHead = document.getElementById('flowerHead');
const levelDisplay = document.getElementById('level');
const wateringCan = document.getElementById('wateringCan');

function updatePlant() {
    // Hauteur de la tige
    const stemHeight = 20 + (growthLevel * 20);
    stem.style.height = stemHeight + 'px';

    // Supprimer les anciennes feuilles
    leaves.innerHTML = '';

    // Ajouter des feuilles selon le niveau
    const leafCount = Math.floor(growthLevel / 2);
    for (let i = 0; i < leafCount; i++) {
        const leftLeaf = document.createElement('div');
        leftLeaf.className = 'leaf left';
        leftLeaf.style.bottom = (30 + i * 40) + 'px';
        leftLeaf.style.width = (20 + growthLevel * 2) + 'px';
        leftLeaf.style.height = (15 + growthLevel) + 'px';
        leaves.appendChild(leftLeaf);

        const rightLeaf = document.createElement('div');
        rightLeaf.className = 'leaf right';
        rightLeaf.style.bottom = (50 + i * 40) + 'px';
        rightLeaf.style.width = (20 + growthLevel * 2) + 'px';
        rightLeaf.style.height = (15 + growthLevel) + 'px';
        leaves.appendChild(rightLeaf);
    }

    // Afficher la fleur à partir du niveau 7
    if (growthLevel >= 7) {
        const flowerScale = (growthLevel - 6) / 4;
        flowerHead.style.transform = `translateX(-50%) scale(${flowerScale})`;
        flowerHead.style.top = (-stemHeight - 20) + 'px';
    }

    levelDisplay.textContent = growthLevel;
}

function animateWatering() {
    wateringCan.classList.add('active');

    setTimeout(() => {
        wateringCan.classList.remove('active');
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
