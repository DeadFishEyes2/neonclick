let upgrade = [];
upgrade[1] = [
    {
    "baseUpgradeCost": 20
    },
    {
        "name": "Advanced Blast Furnace Technology",
        "owned": false
    },
    {
        "name": "Virtual Reality Steel Production Line Management",
        "owned": false
    }
];

const shop = document.getElementById("shop-grid-column");

function buyUpgrade(i, j){
    console.log(i + ' ' + j)
    console.log(upgrade[i][0].baseUpgradeCost*Math.pow(10,j));
    if (numPoints >= upgrade[i][0].baseUpgradeCost*Math.pow(10,j)){
        document.getElementById("upgrade" + i + ' ' + j).remove();
    }
}

function addUpgrade(i, j){
    const newUpgrade = document.createElement("button");
    newUpgrade.className = "upgradeButton";
    newUpgrade.id = "upgrade" + i + ' ' + j;
    newUpgrade.style.display = "block";
    shop.appendChild(newUpgrade);
    newUpgrade.addEventListener('click', () => buyUpgrade(i, j))
}


function getUpgradeInfo(i){
    let upgradeLevel = i%10;
}







