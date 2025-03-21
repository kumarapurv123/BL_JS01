const FULL_TIME_HOURS = 8;
const PART_TIME_HOURS = 4;
const WAGE_PER_HOUR = 20;

const EMPLOYEE_HOURS = [0, 4, 8, 8, 4, 8, 4, 0, 8, 8]; // Example data for 10 days

// Helper function to calculate daily wage
const calcDailyWage = (empHours) => empHours * WAGE_PER_HOUR;

// Map to store day-wise wages
let empDailyWageMap = new Map();
EMPLOYEE_HOURS.forEach((hours, day) => {
    empDailyWageMap.set(day + 1, calcDailyWage(hours));
});

// a. Calculate Total Wage
const totalWage = [...empDailyWageMap.values()].reduce((total, wage) => total + wage, 0);
console.log("Total Employee Wage:", totalWage);


// b. Show Day along with Daily Wage using Map helper function
console.log("Day-wise Daily Wages:");
empDailyWageMap.forEach((wage, day) => console.log(`Day ${day}: ${wage}`));