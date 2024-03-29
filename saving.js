function saveData(){
    localStorage.setItem("numPoints", numPoints);
    localStorage.setItem("buildingLevel", JSON.stringify(buildingLevel));
    localStorage.setItem("buildingCost", JSON.stringify(buildingCost));
    localStorage.setItem("buildingIncome", JSON.stringify(buildingIncome));
    localStorage.setItem("fighterLevel", JSON.stringify(fighterLevel));
    localStorage.setItem("upgradeBool", JSON.stringify(upgradeBool));
    localStorage.setItem("numberOfStocks", JSON.stringify(nrStocks));
    localStorage.setItem("buildingTime", JSON.stringify(buildingTime));
    localStorage.setItem("buildingMult", JSON.stringify(buildingMult));
    localStorage.setItem("tutorial", JSON.stringify(tutorialBool));
    localStorage.setItem("upgrades",JSON.stringify(upgrade));
}

function loadGame(){ //a fost..... dificil sa scriu asta
    numPoints = parseFloat(localStorage.getItem("numPoints")) || 0; // stochez numarul de puncte aici
    buildingLevel = JSON.parse(localStorage.getItem("buildingLevel")) || Array(13).fill(0); // sunt un geniu si am transformat datele butoanelor in array-uri, astfel codul poate fi scris in loopuri ca sa-mi bat capul o singura data cu butoanele
    buildingCost = JSON.parse(localStorage.getItem("buildingCost")) || [0,7,11,115,257,780,1567,4123,9134,23456,61345,101233];
    buildingIncome = JSON.parse(localStorage.getItem("buildingIncome")) || Array(13).fill(0);
    buildingTime = JSON.parse(localStorage.getItem("buildingTime")) || [0,2,4,8,16,32,64,128,256,512,1024,2048];
    fighterLevel = JSON.parse(localStorage.getItem("fighterLevel")) || Array(13).fill(0);
    upgradeBool = JSON.parse(localStorage.getItem("upgradeBool")) || Array(13).fill(false);
    tutorialBool = JSON.parse(localStorage.getItem("tutorial")) || Array(13).fill(false);
    nrStocks = JSON.parse(localStorage.getItem("numberOfStocks")) || Array(13).fill(0);
    buildingMult = JSON.parse(localStorage.getItem("buildingMult")) || [0,1,1,1,1,1,1,1,1,1,1,1];
    upgrade = JSON.parse(localStorage.getItem("upgrades")) || defineUpgrades();
    document.getElementById("points").innerHTML = convert(numPoints) + " $";
    for (let i = 1; i <= 11; i++) {
        document.getElementById("building" + i + "-level").innerHTML = buildingLevel[i];
        document.getElementById("progress-bar-" + i).addEventListener("animationiteration", () =>{animationUpdate (i)});
        document.getElementById("building" + i + "-cost").innerHTML = convert(buildingCost[i]);
    }
    if (buildingLevel[3] > 0)
        displayStock();
    display();
    displayProgressBar();
    for (let i = 1; i <= 11; i++)
        tryToAddUpgrade(i);
    setInterval(saveData,5000);
}
