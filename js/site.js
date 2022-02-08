//get input values from page
//controller function
function getValues(){
    
    let loanAmount = document.getElementById("loanAmount").value;
    let loanPayment = document.getElementById("payments").value;
    let loanRate = document.getElementById("rate").value;

    loanAmount = parseInt(loanAmount);
    loanPayment = parseInt(loanPayment);
    loanRate = parseInt(loanRate);

    if(Number.isInteger(loanAmount) && Number.isInteger(loanPayment) && Number.isInteger(loanRate) && loanRate <= 100){

        let results = hasidaCalculator(loanAmount, loanPayment, loanRate);

        displayResults(results, loanPayment);

    }else{
        alert("Rate cant be above 100%");
    }
}

//calculate the data (monthly payment, principcal, interest, cost)
//logic function
function hasidaCalculator(loanAmount, loanPayment, loanRate){

    let results = {
        monthlyPayment: "",
        preRemainingBalance: loanAmount,
        totalInterestCounter: 0,
        loanPayment: [0],
        interestPayment: [],
        principalPayment: [],
        totalInterest: [0],
        remainingBalance: [loanAmount],
    };

    results.monthlyPayment = (loanAmount) * (loanRate/1200) / (1 - (1 + loanRate/1200)**(-loanPayment));

    for ( let i = 0 ; i < loanPayment ; i++){

        results.loanPayment[i] = i+1;
        results.interestPayment[i] = results.preRemainingBalance * loanRate/1200;
        results.principalPayment[i] = results.monthlyPayment - results.interestPayment[i];
        results.totalInterestCounter += results.interestPayment[i];
        results.totalInterest[i] = results.totalInterestCounter;
        results.remainingBalance[i] = results.preRemainingBalance - results.principalPayment[i];
        results.preRemainingBalance = results.remainingBalance[i];
    }

    return results;

}

//display all the table data (row per month)
//display/view function
function displayResults(results, loanPayment){

    let tableBody = document.getElementById("results");

    let templateRow = document.getElementById("resultsTemplate");

    tableBody.innerHTML = "";

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

}