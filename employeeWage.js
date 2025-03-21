const FULL_TIME_HOURS = 8;
const PART_TIME_HOURS = 4;
const WAGE_PER_HOUR = 20;

class Employee {
    constructor(id, salary, gender, date, hoursWorkedArray) {
        try {
            this.setId(id);
            this.setSalary(salary);
            this.setGender(gender);
            this.setDate(date);
            this.hoursWorkedArray = hoursWorkedArray || []; // Assign default empty array if not provided
            this.calculateWages();
        } catch (error) {
            console.error(error.message);
        }
    }

    setId(id) {
        if (!/^\d+$/.test(id) || id <= 0) throw new Error("Invalid Employee ID: Must be a positive number.");
        this.id = id;
    }

    setSalary(salary) {
        if (!/^\d+$/.test(salary) || salary <= 0) throw new Error("Invalid Salary: Must be a positive number.");
        this.salary = salary;
    }

    setGender(gender) {
        if (!/^[MF]$/.test(gender)) throw new Error("Invalid Gender: Must be 'M' or 'F'.");
        this.gender = gender;
    }

    setDate(date) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Invalid Date Format: Use YYYY-MM-DD.");
        let inputDate = new Date(date);
        let currentDate = new Date();
        if (inputDate > currentDate) throw new Error("Invalid Date: Cannot be a future date.");
        this.date = date;
    }

    calcDailyWage(empHours) {
        return empHours * WAGE_PER_HOUR;
    }

    calculateWages() {
        // Map to store day-wise wages
        let empDailyWageMap = new Map();
        this.hoursWorkedArray.forEach((hours, day) => {
            empDailyWageMap.set(day + 1, this.calcDailyWage(hours));
        });

        // a. Calculate Total Wage
        this.totalWage = [...empDailyWageMap.values()].reduce((total, wage) => total + wage, 0);
        console.log(`Total Wage for Employee ${this.id}:`, this.totalWage);

        // b. Show Day along with Daily Wage
        console.log(`Day-wise Wages for Employee ${this.id}:`);
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

        // g. Find the number of days the Employee Worked
        let daysWorked = [...empDailyWageMap.values()].filter(wage => wage > 0).length;
        console.log("Number of Days Employee Worked:", daysWorked);
    }
}

// Test Cases
const emp1 = new Employee(101, 50000, 'M', '2023-05-10', [8, 4, 8, 8, 4, 8, 4, 0, 8, 8]); // ✅ Valid
const emp2 = new Employee(0, 50000, 'M', '2023-05-10', [8, 8, 4]);   // ❌ Invalid ID
const emp3 = new Employee(102, -1000, 'F', '2023-05-10', [4, 8, 4]); // ❌ Invalid Salary
const emp4 = new Employee(103, 30000, 'X', '2023-05-10', [8, 4, 8]); // ❌ Invalid Gender
const emp5 = new Employee(104, 40000, 'F', '2030-01-01', [8, 8, 4]); // ❌ Future Date