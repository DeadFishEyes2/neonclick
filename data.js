// data handling

let numPoints = 0;
let numPointsPerClick = 1;
let buildingLevel = Array.from({length: 10}, () => 0);
let fighterLevel = Array.from({length: 10}, () => 0);
let upgradeBool = Array.from({length: 10}, () => false);
let tutorialBool = Array.from({length: 10}, () => false);
let buildingCost = Array.from({lenght: 10}, () => 0);
let buildingIncome = Array.from({lenght: 10}, () => 0);
let buildingTimeLeft = Array.from({length: 10}, () => 0);
let buildingTime = Array.from({lenght: 10}, () => 0);
buildingCost[1] = 20;
buildingCost[2] = 100;
let index;
loadGame(); 
