//get input values from page
//controller function
function getValues(){
    
    //get the user values from the page
    let loanAmount = document.getElementById("loanAmount").value;
    let loanPayment = document.getElementById("payments").value;
    let loanRate = document.getElementById("rate").value;

    //we need validate our input
    //parse into Integers 
    loanAmount = parseInt(loanAmount);
    loanPayment = parseInt(loanPayment);
    loanRate = parseInt(loanRate);

    //check that the numbers are integers and if the rate between 1 to 100
    if(Number.isInteger(loanAmount) && Number.isInteger(loanPayment) && Number.isInteger(loanRate) 
        && loanRate <= 100 && loanRate > 0){
        //pass the values to calculate
        let results = hasidaCalculator(loanAmount, loanPayment, loanRate);
        //display data
        displayResults(results, loanPayment);

    }else{
        alert("Rate need to be from 1 to 100%");
    }
}

//calculate the data (monthly payment, principcal, interest, cost)
//logic function
function hasidaCalculator(loanAmount, loanPayment, loanRate){

    //set up all the varibles that needed in an object
    let results = {
        monthlyPayment: "",
        preRemainingBalance: loanAmount,
        totalInterestCounter: 0,
        totalPrincipcal: 0,
        loanPayment: [0],
        interestPayment: [],
        principalPayment: [],
        totalInterest: [0],
        remainingBalance: [loanAmount],
    };

    //calculate the monthly payment
    results.monthlyPayment = (loanAmount) * (loanRate/1200) / (1 - (1 + loanRate/1200)**(-loanPayment));

    //calculate all the data and stores in the obj arrays
    for ( let i = 0 ; i < loanPayment ; i++){

        results.loanPayment[i] = i+1;
        results.interestPayment[i] = results.preRemainingBalance * loanRate/1200;
        results.principalPayment[i] = results.monthlyPayment - results.interestPayment[i];
        results.totalInterestCounter += results.interestPayment[i];
        results.totalInterest[i] = results.totalInterestCounter;
        results.remainingBalance[i] = results.preRemainingBalance - results.principalPayment[i];
        results.preRemainingBalance = results.remainingBalance[i];
        results.totalPrincipcal += results.principalPayment[i];
    }

    return results;

}

//display all the table data (row per month)
//display/view function
function displayResults(results, loanPayment){
    //gets the tbody element from the page
    let tableBody = document.getElementById("results");
    //gets the table template
    let templateRow = document.getElementById("resultsTemplate");
    ////clear table first
    tableBody.innerHTML = "";
    //display all the data
    for( let i = 0 ; i < loanPayment ; i++){

        let tableRow = document.importNode(templateRow.content , true);

        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = results.loanPayment[i];
        rowCols[1].textContent = results.monthlyPayment.toFixed(2);
        rowCols[2].textContent = results.principalPayment[i].toFixed(2);
        rowCols[3].textContent = results.interestPayment[i].toFixed(2);
        rowCols[4].textContent = results.totalInterest[i].toFixed(2);
        rowCols[5].textContent = '$'+Math.abs(results.remainingBalance[i].toFixed(2));

        tableBody.appendChild(tableRow);
    }

    document.getElementById("monthlyPayment").innerHTML = results.monthlyPayment.toFixed(2);
    document.getElementById("totalPrincipcal").innerHTML = results.totalPrincipcal.toFixed(2);
    document.getElementById("totalInterest").innerHTML = results.totalInterestCounter.toFixed(2);
    document.getElementById("totalCost").innerHTML = (results.totalPrincipcal + results.totalInterestCounter).toFixed(2);
    
}