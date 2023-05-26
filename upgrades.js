let upgrade = [];
function defineUpgrades(){
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
            "name": "Quantum Steel Market Analysis",
            "level": 75,
            "owned": false
        },
        {
            "name": "Holographic Steel Production Presentations",
            "level": 100,
            "owned": false
        },
        {
            "name": "Advanced Steel Quality Control System",
            "level": 200,
            "owned": false
        },
        {
            "name": "Covert Steel Stockpiling and Market Manipulation",
            "level": 300,
            "owned": false
        },
        {
            "name": "Quantum Steel Supply Chain Mapping",
            "level": 400,
            "owned": false
        },
        {
            "name": "Cybersecurity Measures for Industrial Espionage",
            "level": 500,
            "owned": false
        },
        {
            "name": "Personalized Steel Production Strategies",
            "level": 600,
            "owned": false
        },
        {
            "name": "Advanced Industrial Robot Integration",
            "level": 700,
            "owned": false
        }
    ];

    upgrade[2] = [
        {
            "baseUpgradeCost": 20
        },
        {
            "name": "Advanced Doll Manufacturing Technology",
            "level": 25,
            "owned": false
        },
        {
            "name": "Personalized Doll Customization Services",
            "level": 50,
            "owned": false
        },
        {
            "name": "Virtual Reality Doll House Services",
            "level": 75,
            "owned": false
        },
        {
            "name": "Advanced Doll Quality Control System",
            "level": 100,
            "owned": false
        },
        {
            "name": "Advanced Steel Quality Control System",
            "level": 200,
            "owned": false
        },
        {
            "name": "Covert Client Blackmailing System",
            "level": 300,
            "owned": false
        },
        {
            "name": "Personalized Clientele Management",
            "level": 400,
            "owned": false
        },
        {
            "name": "Virtual Reality Doll House Tours",
            "level": 500,
            "owned": false
        },
        {
            "name": "Advanced Doll Maintenance Services",
            "level": 600,
            "owned": false
        },
        {
            "name": "Cybernetic Enhancements for Dolls and Staff",
            "level": 700,
            "owned": false
        },
    ];

    upgrade[3] = [
        {
            "baseUpgradeCost": 20
        },
        {
            "name": "Advanced Gaming Software Development",
            "level": 25,
            "owned": false
        },
        {
            "name": "Cheating Detection Algorithm",
            "level": 50,
            "owned": false
        },
        {
            "name": "Quantum Gaming Market Analysis",
            "level": 75,
            "owned": false
        },
        {
            "name": "Cybernetic Enhancements for Dealers and Staff",
            "level": 100,
            "owned": false
        },
        {
            "name": "Holographic Casino Presentations",
            "level": 200,
            "owned": false
        },
        {
            "name": "Advanced Surveillance System",
            "level": 300,
            "owned": false
        },
        {
            "name": "Improved VIP Room Management",
            "level": 400,
            "owned": false
        },
        {
            "name": "Quantum Gaming Analytics",
            "level": 500,
            "owned": false
        },
        {
            "name": "Personalized High Roller Programs",
            "level": 600,
            "owned": false
        },
        {
            "name": "Virtual Reality Poker Tournaments",
            "level": 700,
            "owned": false
        }
    ];

    upgrade[4] = [
        {
            "baseUpgradeCost": 20
        },
        {
            "name": "Advanced Synthetic Material Manufacturing Technology",
            "level": 25,
            "owned": false
        },
        {
            "name": "Covert Intellectual Property Theft Operation",
            "level": 50,
            "owned": false
        },
        {
            "name": "Virtual Reality Synthetic Manufacturing Line Management",
            "level": 75,
            "owned": false
        },
        {
            "name": "Quantum Synthetic Material Market Analysis",
            "level": 100,
            "owned": false
        },
        {
            "name": "Cybernetic Enhancements for Engineers and Staff",
            "level": 200,
            "owned": false
        },
        {
            "name": "Holographic Synthetic Material Production Presentations",
            "level": 300,
            "owned": false
        },
        {
            "name": "Advanced Synthetic Material Quality Control System",
            "level": 400,
            "owned": false
        },
        {
            "name": "Synthetic Material Stockpiling and Market Manipulation",
            "level": 500,
            "owned": false
        },
        {
            "name": "Quantum Synthetic Material Supply Chain Mapping",
            "level": 600,
            "owned": false
        },
        {
            "name": "Countermeasures for Industrial Espionage",
            "level": 700,
            "owned": false
        }
    ];

    upgrade[5] = [
        {
            "baseUpgradeCost": 20
        },
        {
            "name": "Advanced High-Tech Manufacturing Technology",
            "level": 25,
            "owned": false
        },
        {
            "name": "Covert Intellectual Property Theft Operation",
            "level": 50,
            "owned": false
        },
        {
            "name": "High-Tech Product Quality Management",
            "level": 75,
            "owned": false
        },
        {
            "name": "Virtual Reality High-Tech Manufacturing Line Management",
            "level": 100,
            "owned": false
        },
        {
            "name": "Quantum High-Tech Market Analysis",
            "level": 200,
            "owned": false
        },
        {
            "name": "Cybernetic Enhancements for Engineers and Staff",
            "level": 300,
            "owned": false
        },
        {
            "name": "Advanced High-Tech Quality Control System",
            "level": 400,
            "owned": false
        },
        {
            "name": "High-Tech Product Stockpiling and Market Manipulation",
            "level": 500,
            "owned": false
        },
        {
            "name": "Quantum High-Tech Supply Chain Mapping",
            "level": 600,
            "owned": false
        },
        {
            "name": "High-Tech Research and Development",
            "level": 700,
            "owned": false
        }
    ];
}

const shop = document.getElementById("shop-grid-column");

function buyUpgrade(i, j){
    if (numPoints >= upgrade[i][0].baseUpgradeCost*Math.pow(10,j)){
        document.getElementById("upgrade" + i + ' ' + j).remove();
        document.getElementById("upgradeButtonToolTip" + i + ' ' + j).remove();
        upgrade[i][j].owned = true;
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







