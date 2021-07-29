// Your code here
const cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
        // Earns 324
        updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
        updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
        // Earns 54
        updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
        updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
        // 324 + 54

const emp1 = {
  firstName: "Julius", 
  familyName: "Caesar", 
  title: "General", 
  payPerHour: 27, 
  timeInEvents: [
    {
    date: "0044-03-14",
    hour: 900,
    type: "TimeIn"
    }, 
    {
    date: "0044-03-15",
    hour: 900,
    type: "TimeIn"
    },
    {
    date: "0044-03-15",
    hour: 1300,
    type: "TimeIn"
    }
  ],
  timeOutEvents: [
    {
    date: "0044-03-14",
    hour: 2100,
    type: "TimeOut"
    },
    {
    type: "TimeOut", 
    date: "0044-03-15", 
    hour: 1100
    },
    {
    type: "TimeOut", 
    date: "0044-03-15", 
    hour: 2000
    }
  ]}

function createEmployeeRecord(timeCardArr){
  let employeeRecord = {
    firstName : timeCardArr[0],
    familyName : timeCardArr[1],
    title : timeCardArr[2],
    payPerHour : timeCardArr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord
}

function createEmployeeRecords(employeesArr){
  const employeesRecord = []
  employeesArr.forEach(employee => { 
    employeesRecord.push(createEmployeeRecord(employee))
  })
  return employeesRecord
}

function createTimeInEvent(employeeObj, timeStamp){
  const timeStampArr = timeStamp.split(' ')
  const timeStampObj = {
    type: "TimeIn",
    date: timeStampArr[0],
    hour: parseInt(timeStampArr[1])
  }
  employeeObj.timeInEvents.push(timeStampObj)
  return employeeObj
}

function createTimeOutEvent(employeeObj, timeStamp){
  const timeStampArr = timeStamp.split(' ')
  const timeStampObj = {
    type: "TimeOut",
    date: timeStampArr[0],
    hour: parseInt(timeStampArr[1])
  }
  employeeObj.timeOutEvents.push(timeStampObj)
  return employeeObj
}

function hoursWorkedOnDate(emp, dateInput){
  const timeOutArr = emp.timeOutEvents.filter(obj => obj.date === dateInput)
  // const timeOutArr2 = emp.timeOutEvents.find(obj => obj.date === dateInput)
  // console.log('filter', timeOutArr, 'find', timeOutArr2)
  const timeInArr = emp.timeInEvents.filter(obj => obj.date === dateInput)
  let hours = 0
  for(let i = 0; i < timeOutArr.length; i++){
    hours += timeOutArr[i].hour - timeInArr[i].hour
  }
  return hours/100
}

function wagesEarnedOnDate(emp, date){
  const wage = emp.payPerHour

  const hoursWorked = hoursWorkedOnDate(emp, date)
  return hoursWorked * wage
}

function allWagesFor(emp){
  const datesArr = emp.timeInEvents.map(event => event.date)
  // since there are multiple clock-ins on one date, remove those dates
  // for(let i = 0; i < datesArr.length - 1; i++){
  //   if (datesArr[i] === datesArr[i + 1]){
  //     datesArr.splice(i, 1) 
  //   } 
  // }
  let wages = 0
  //problem is date with double wages, total is being added
  datesArr.forEach(dateV => wages += wagesEarnedOnDate(emp, dateV))
  return wages
}

//Need help with .reduce()
function reduceWagesFor(emp){
  const datesArr = emp.timeInEvents.map(event => event.date)
  for(let i = 0; i < datesArr.length - 1; i++){
    if (datesArr[i] === datesArr[i + 1]){
      datesArr.splice(i, 1) 
    } 
  }
  return datesArr.reduce((total, date) => total + wagesEarnedOnDate(emp, date), 0 )
}

function calculatePayroll(empArr){
  const wagesArr = []
  empArr.forEach(emp => wagesArr.push(allWagesFor(emp)))
  return wagesArr.reduce((total, amount) => amount + total)
}
