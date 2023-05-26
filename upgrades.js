let upgrade = [];
upgrade[1] = [
    {
    "baseUpgradeCost": 20
    },
    {
        "name": "Advanced Blast Furnace Technology",
        "level": 25,
        "owned": false
    },
    {
        "name": "Virtual Reality Steel Production Line Management",
        "level": 50,
        "owned": false
    },
    {
        "name": "Virtual Reality Steel Production Line Management",
        "level": 75,
        "owned": false
    }
];

const shop = document.getElementById("shop-grid-column");

function buyUpgrade(i, j){
    if (numPoints >= upgrade[i][0].baseUpgradeCost*Math.pow(10,j)){
        document.getElementById("upgrade" + i + ' ' + j).remove();
        document.getElementById("upgradeButtonToolTip" + i + ' ' + j).remove();
    }
}

function addUpgrade(i, j){
    const newUpgrade = document.createElement("button");
    newUpgrade.className = "upgradeButton";
    newUpgrade.id = "upgrade" + i + ' ' + j;
    newUpgrade.style.display = "block";
    shop.appendChild(newUpgrade);

    const newToolTip = document.createElement("div");
    newToolTip.className = "upgradeButtonToolTip";
    newToolTip.id = "upgradeButtonToolTip" + i + ' ' + j;
    newToolTip.style.display = "none";
    let upgradeName = document.createTextNode(upgrade[i][j].name);
    newToolTip.appendChild(upgradeName);
    shop.appendChild(newToolTip);

    newUpgrade.addEventListener('click', () => buyUpgrade(i, j))
    
    newUpgrade.onmouseover = function(){
        newToolTip.style.display = "block";
    }

    newUpgrade.onmouseout = function(){
        newToolTip.style.display = "none";
    }
}

function tryToAddUpgrade(i){
    for(let j = 1; buildingLevel[i] >= upgrade[i][j].level; j++){
        if(document.getElementById("upgrade" + i + ' ' + j) == null && upgrade[i][j].owned == false){
            addUpgrade(i, j);
        }
    }
}

function getUpgradeInfo(i){
    let upgradeLevel = i%10;
}







