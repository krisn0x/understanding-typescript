type Strategy = {
    initialAmount: number;
    annualContribution: number;
    expectedReturnPercent: number;
    years: number;
};

type StrategyResult = {
    total: number,
    totalInterestEarned: number,
    totalContributions: number;
    year: string;
}

let investmentData: Strategy = {
    initialAmount: 100000,
    annualContribution: 7000,
    expectedReturnPercent: 6.3,
    years: 3
}

let annualResults: StrategyResult[] = [];

function calculateInvestment(data: Strategy): StrategyResult[] {
    let total = data.initialAmount;
    let totalInterestEarned = 0;
    let totalContributions = 0;

    for (let i = 1; i <= data.years; i++) {
        total += data.annualContribution;
        total *= 1 + (data.expectedReturnPercent / 100)
        totalContributions += data.annualContribution
        totalInterestEarned = total - totalContributions - data.initialAmount;
        annualResults.push({
            total: total,
            totalInterestEarned: totalInterestEarned,
            totalContributions: totalContributions,
            year: `Year ${i}`
        });

    }
    return annualResults;
}

function printResults(results: StrategyResult[]) {
    for (let i = 0; i < results.length; i++) {
        console.log(results[i].year);
        console.log('Total: $' + results[i].total.toFixed(2));
        console.log('Total Conributions: $' + results[i].totalContributions.toFixed(2));
        console.log('Total Interest Earned: $' + results[i].totalInterestEarned.toFixed(2));
        console.log('-----------------------------------------');

    }
}

calculateInvestment(investmentData);
printResults(annualResults);