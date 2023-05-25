//data

let numPoints = 0;
let numPointsPerClick = 1;
let buildingLevel = Array.from({length: 12}, () => 0);
let fighterLevel = Array.from({length: 12}, () => 0);
let upgradeBool = Array.from({length: 12}, () => false);
let tutorialBool = Array.from({length: 10}, () => false);
let buildingCost = Array.from({lenght: 12}, () => 0);
let buildingIncome = Array.from({lenght: 12}, () => 0);
let buildingTime = Array.from({lenght: 12}, () => 0);
let buildingMult = Array.from({lenght: 12}, () => 0);
let baseIncome = [0, 2, 73, 100, 267, 512, 1065, 2043, 5347, 10876, 25256, 67895];
let baseMult = [0, 1, 7, 31, 247, 512, 1200, 3781, 8678, 21178, 70896, 150765];
let index;

loadGame(); 

// values 
    const upgradeBuilding = Array.from({length: 12}, () => NaN);
    const upgradeFighter = Array.from({length: 12}, () => NaN);
    const building_tooltip = Array.from({length: 12}, () => NaN);
    const fighter_tooltip = Array.from({length: 12}, () => NaN);
    const button = document.getElementById("image-button");
    const pointsPerClick = document.getElementById('points-per-click');
    const points = document.getElementById('points');
    for (let i = 1; i <= 11; i++){
        upgradeBuilding[i] = document.getElementById('building' + i);
        upgradeFighter[i] = document.getElementById('fighter' + i);
        building_tooltip[i] = document.getElementById('building' + i +'-tooltip');
        fighter_tooltip[i] = document.getElementById('fighter' + i + '-tooltip'); 
    }
// functions

    function display() {
        for(let i=1;i<=11;i++) {
            document.getElementById("building" + i + "-level").innerHTML = buildingLevel[i];
            document.getElementById("building" + i + "-cost").innerHTML = convert(buildingCost[i]);
        }
    }
    //number converter function
        function convert(numPoints) {
            var nr=numPoints;
            var k=0;
            const suffix=["","K","M","B","t","q","Q","s","S","o","n","d","U","D","T","Qt","Qd","Sd","St","O","N","v","c"];
            while(nr>=1000) {
                nr/=1000;
                k++;
            }
            nr=Math.floor(nr*100)/100;
            nr+=suffix[k];
            return nr;
        }

    //hide elements

        function hideElements(){
            document.getElementById("upgrade1").style.display = "";
            document.getElementById("upgrade2").style.display = "";
        }

//audio

    var audio = new Audio("clickSound.mp3");    

//button and points

    button.addEventListener('click', () => {
        audio.play();
        numPoints += numPointsPerClick;
        updateProgress();
        points.innerHTML = convert(numPoints);
    });

    button.addEventListener("mousedown", function() {
        button.classList.add("pressed");
    });
      
    button.addEventListener("mouseup", function() {
        button.classList.remove("pressed");
    });   
    
    updateProgress();
    

//fighters
    
    //fighter 1
        upgradeFighter[1].addEventListener('click', () => {
            if(numPoints >= 20*Math.pow(1.15,fighterLevel[1])){
                numPoints -= 20*Math.pow(1.15,fighterLevel[1]);
                fighterLevel[1]++;
                numPointsPerClick += 1;
                points.innerHTML = convert(numPoints);
            }
        });

        upgradeFighter[1].onmouseover = function(){
            fighter_tooltip[1].style.display = "block";
        }

        upgradeFighter[1].onmouseout = function(){
            fighter_tooltip[1].style.display = "none";
        }

    //fighter 2

//buildings

        for (let i = 1; i <= 11; i++) {
            upgradeBuilding[i].addEventListener('click', () =>{

                if(numPoints >= buildingCost[i]) {
                    numPoints -= buildingCost[i];
                    buildingLevel[i]++;
                    buildingCost[i]*=1.131;

                    updateProgress(); // provizoriu
                
                if (buildingLevel[i]-1 == 0)
                    buildingIncome[i] = baseIncome[i];
                else 
                    buildingIncome[i] += (baseMult[i] * buildingMult[i]);
                
                if ((buildingLevel[i] % 25 == 0 && buildingLevel[i] <= 75) || (buildingLevel[i] % 100 == 0) && buildingTime[i] > 1)
                    buildingTime[i] /= 2;
                points.innerHTML = convert(numPoints);
                document.getElementById("building" + i + "-level").innerHTML = buildingLevel[i];
                document.getElementById("building" + i + "-cost").innerHTML = convert(buildingCost[i]);
                document.dispatchEvent(new Event('buildingChanged'));
            }
            })

            upgradeBuilding[i].onmouseover = function(){
                building_tooltip[i].style.display = "block";
            }

            upgradeBuilding[i].onmouseout = function(){
                building_tooltip[i].style.display = "none";
            }
            
        }

    //progress bar function
    function animationUpdate (index) {
        numPoints += buildingIncome[index];
        points.innerHTML = convert(numPoints);
    }

    function displayProgressBar(){
        for (let i = 1; i <= 11; i++){
            if (buildingLevel[i] >= 1){
                document.getElementById("progress-bar-" + i).style.animation = 'glow';
                document.getElementById("progress-bar-" + i).style.animationTimingFunction = 'linear';
                document.getElementById("progress-bar-" + i).style.animationIterationCount = 'infinite';
                document.getElementById("progress-bar-" + i).style.animationPlayState = 'running';
                document.getElementById("progress-bar-" + i).style.animationDuration = buildingTime[i] + "s";
            } else {
                document.getElementById("progress-bar-" + i).style.animation = 'none';
            }
        }
    }


//reset
    const resetButton = document.getElementById("resetButton");

    resetButton.addEventListener('click', () =>{
        localStorage.clear();
        loadGame();
        location.reload();
    })

//shop
    //upgrades

        // upgrade functions
            function displayUpgrade(){ // daca vreti sa adaugati butoane puneti conditiile aici pebtru cand sa apara
                if (buildingLevel[1] >= 1 && upgradeBool[1] == false){
                    document.getElementById("upgrade1").style.display = "block";
                }
                if (buildingLevel[1] >= 2 && upgradeBool[2] == false){
                    document.getElementById("upgrade2").style.display = "block";
                    //document.getElementById("progress-bar-1").style.animationDurations = Math.pow(2,buildingLevel[1]/25) + 's';
                }
            }

        // event listeners

        document.addEventListener('buildingChanged', displayUpgrade);

        document.addEventListener('buildingChanged', displayProgressBar);

        document.getElementById("upgrade1").addEventListener('click', () => { // pentru buton adaugi aici conditiile de cumparare si in rest urmezi modelul
            //add functionality
            upgradeBool[1] = true;
            document.getElementById("upgrade1").style.display = "";
        })

        document.getElementById("upgrade2").addEventListener('click', () => {
            //add functionality
            upgradeBool[2] = true;
            document.getElementById("upgrade2").style.display = "";
        })

// dragging for the shop
    const ele = document.getElementById('shop-grid-column');
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
    
    //Alert when user tries to reload/leave the page
    window.addEventListener("beforeunload", function (event) {
		event.preventDefault();
		event.returnValue = "";
	});
    
