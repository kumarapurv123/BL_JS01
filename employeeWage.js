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


// c. Show Days when Full time wage of 160 was earned
let fullTimeDays = [...empDailyWageMap].filter(([day, wage]) => wage === FULL_TIME_HOURS * WAGE_PER_HOUR).map(([day]) => day);
console.log("Days with Full Time Wage of 160:", fullTimeDays);

// d. Find the first occurrence when Full Time Wage was earned
let firstFullTimeDay = [...empDailyWageMap].find(([day, wage]) => wage === FULL_TIME_HOURS * WAGE_PER_HOUR);
console.log("First Full Time Wage earned on Day:", firstFullTimeDay ? firstFullTimeDay[0] : "Never");

// e. Check if Every Element of Full Time Wage is truly holding Full time wage
let isAllFullTime = [...empDailyWageMap.values()].every(wage => wage === FULL_TIME_HOURS * WAGE_PER_HOUR);
console.log("Every Element is Full Time Wage:", isAllFullTime);

// f. Check if there is any Part Time Wage
let hasPartTimeWage = [...empDailyWageMap.values()].some(wage => wage === PART_TIME_HOURS * WAGE_PER_HOUR);
console.log("Is there any Part Time Wage?:", hasPartTimeWage);

// g. Find the number of days the Employee Worked (i.e., days with nonzero wage)
let daysWorked = [...empDailyWageMap.values()].filter(wage => wage > 0).length;
console.log("Number of Days Employee Worked:", daysWorked);