        const canvas2 = document.getElementById("canvas2");
		const ctx2 = canvas2.getContext("2d");
		const stockBuyPrice = document.getElementById("stock-buy-price");
		const stockSellPrice = document.getElementById("stock-sell-price");
		const Balance = document.getElementById("points");
		
		//let money = 1000;
		let curentPrice = Array.from({length: 20}, () => 0);
		let nrStocks = Array.from({length: 20}, () => 0);
		let start=false;

		//buy/sell
		const buyButton = document.getElementById("buy");
		const sellButton = document.getElementById("sell");
 
		function displayStock(){
			if(!start){
			start=true;

			document.getElementById("minigame2").style.display = "grid";

			let curentStock = 1;
			let stockMultiplier = Math.pow(4, (curentStock-1));

			if (buildingLevel[curentStock] == 0){
				document.getElementById("stock-cover").style.display = "block";
			} else { 
				document.getElementById("stock-cover").style.display = "none";
			}
			document.getElementById("number-of-stocks").innerHTML = nrStocks[curentStock];

		//setting the buy and sell buttons 


		buyButton.addEventListener("click", () => {
			if (numPoints > Math.floor(1.01*curentPrice[curentStock]*stockMultiplier) && buildingLevel[curentStock] != 0){
				numPoints -= Math.floor(1.01*curentPrice[curentStock]*stockMultiplier);
				nrStocks[curentStock]++;
				document.getElementById("number-of-stocks").innerHTML = nrStocks[curentStock];
				Balance.innerHTML = numPoints;
			}
		});

		sellButton.addEventListener("click", () => {
			if (nrStocks[curentStock] > 0){
				nrStocks[curentStock]--;
				numPoints += Math.floor(0.99*curentPrice[curentStock]*stockMultiplier);
				document.getElementById("number-of-stocks").innerHTML = nrStocks[curentStock];
				Balance.innerHTML = convert(numPoints);
			}
		});


		document.getElementById("prev-stock").addEventListener("click", ()=>{
			if (curentStock == 1){
				curentStock = 8;
			} else { 
				curentStock--;
			}
			document.getElementById("number-of-stocks").innerHTML = nrStocks[curentStock];
			if (buildingLevel[curentStock] == 0){
				document.getElementById("stock-cover").style.display = "block";
			} else { 
				document.getElementById("stock-cover").style.display = "none";
			}
		});

		document.getElementById("next-stock").addEventListener("click", ()=>{
			if (curentStock == 8){
				curentStock = 1;
			} else { 
				curentStock++;
			}
			document.getElementById("number-of-stocks").innerHTML = nrStocks[curentStock];
			if (buildingLevel[curentStock] == 0){
				document.getElementById("stock-cover").style.display = "block";
			} else { 
				document.getElementById("stock-cover").style.display = "none";
			}
		});

		
		// Set the canvas size
		canvas2.width = 400;
		canvas2.height = 300;

		//creating the stocks
			// Define the stock market simulation parameters
				const numStocks = 30; // Number of stocks to simulate

			// initiating the stock

				let stockPrices = [];
				for (let i = 0; i < 20; i++){
					stockPrices[i] = [];
				};

				for (let i = 0; i < 11; i++){
					stockPrices[i][0] = 150;
				}

				let stockTimes = [];
				for (let i = 0; i < 40; i++){
					stockTimes[i] = [];
				};

				for (let i = 0; i < 20; i++){
					stockTimes[i][0] = 0;
				}

				let newStockPrice;
				let volatility = 4; //less is more
				let luck = 0.5; // more is more

				for (let index = 1; index < 11; index++){
					for (let i = 1; i < numStocks; i++) {
						stockTimes[index].push(stockTimes[index][i-1] + Math.floor(Math.random() * 5)*10 + 15);

						if (Math.random() < luck){
							newStockPrice = (stockPrices[index][i-1] - (stockPrices[index][i-1] * Math.random()/volatility)) % 300;
				 		} else {
							newStockPrice = (stockPrices[index][i-1] + (stockPrices[index][i-1] * Math.random()/volatility)) % 300;
						}
						if (newStockPrice < 30)
							newStockPrice = 50;
						stockPrices[index].push(newStockPrice);
					}
				}

		//drawing the graph
		const getStockPrice = () => {
			let lastStock = 0;
			while (stockTimes[curentStock][lastStock+1] <= canvas2.width){
				lastStock++;
			}
			
				let X = stockTimes[curentStock][lastStock+1] - stockTimes[curentStock][lastStock];
			
			//console.log(y);
			if (stockPrices[curentStock][lastStock+1] > stockPrices[curentStock][lastStock]){
				let x = stockTimes[curentStock][lastStock+1] - canvas2.width;
				let Y = stockPrices[curentStock][lastStock+1] - stockPrices[curentStock][lastStock];
				let y = (Y*(X-x))/X;
				curentPrice[curentStock] = Math.floor(300 - (stockPrices[curentStock][lastStock] + y));
			} else { 
				let x = stockTimes[curentStock][lastStock+1] - canvas2.width;
				let Y = stockPrices[curentStock][lastStock+1] - stockPrices[curentStock][lastStock];
				let y = (Y*x)/X;
				curentPrice[curentStock] = Math.floor(300 - (stockPrices[curentStock][lastStock+1] - y));
			}
			stockBuyPrice.innerHTML = convert(Math.floor(1.01*curentPrice[curentStock]*stockMultiplier));
			stockSellPrice.innerHTML = convert(Math.floor(0.99*curentPrice[curentStock]*stockMultiplier));
			//console.log(lastStock);
		};

		const draw = () => {
			ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

			ctx2.fillStyle = '#141517';
  			ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

			  ctx2.beginPath();
			for(let index = 0; index < numStocks; index++){
				if(index == 0){
					ctx2.strokeStyle = "yellow";
					ctx2.moveTo(stockTimes[curentStock][index],stockPrices[curentStock][index]);
				} else {
					ctx2.lineTo(stockTimes[curentStock][index],stockPrices[curentStock][index]);
				}
			};
			ctx2.stroke();
			for (let index = 0; index < numStocks; index++){
				stockTimes[curentStock][index] -= 1;
			}

			//displaying scale on the graph


			stockMultiplier = Math.pow(4, (curentStock-1));

			ctx2.fillStyle = 'yellow';
			ctx2.font = "20px Arial";
			ctx2.fillText(document.getElementById("building"+curentStock+"-tooltip").childNodes[0].textContent,-120,50);
			ctx2.font = "10px Arial";
			ctx2.fillText(convert(250*stockMultiplier),350,50);
			ctx2.fillText(convert(200*stockMultiplier),350,100);
			ctx2.fillText(convert(150*stockMultiplier),350,150);
			ctx2.fillText(convert(100*stockMultiplier),350,200);
			ctx2.fillText(convert(50*stockMultiplier),350,250);
			//setting a new price for the stock
			if (stockTimes[curentStock][1] < 0){
				stockTimes[curentStock].shift();
				stockPrices[curentStock].shift();
				if (Math.random() < luck){
						newStockPrice = (stockPrices[curentStock][numStocks-2] - (stockPrices[curentStock][numStocks-2] * Math.random()/volatility) + 20) % 290;
				} else {
						newStockPrice = (stockPrices[curentStock][numStocks-2] + (stockPrices[curentStock][numStocks-2] * Math.random()/volatility) + 20) % 290;
				}
				if (newStockPrice < 30)
					newStockPrice = 50;
				stockTimes[curentStock].push(stockTimes[curentStock][numStocks-2] + Math.floor(Math.random() * 5)*10 + 10);
				stockPrices[curentStock].push(newStockPrice);
			}
			getStockPrice();
		};
		
		setInterval(draw, 50);
		} };

		document.addEventListener('buildingChanged', displayStock);
