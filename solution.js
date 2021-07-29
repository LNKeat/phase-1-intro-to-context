
let createEmployeeRecord = function(row){
  return {
      firstName: row[0],
      familyName: row[1],
      title: row[2],
      payPerHour: row[3],
      timeInEvents: [],
      timeOutEvents: []
  }
}

let createEmployeeRecords = function(employeeRowData) {
  return employeeRowData.map(function(row){
      return createEmployeeRecord(row)
  })
}

let createTimeInEvent = function(employee, dateStamp){
  let [date, hour] = dateStamp.split(' ')

  employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
  })

  return employee
}

let createTimeOutEvent = function(employee, dateStamp){
  let [date, hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
  })

  return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
  let inEvent = employee.timeInEvents.find(function(e){
      return e.date === soughtDate
  })

  let outEvent = employee.timeOutEvents.find(function(e){
      return e.date === soughtDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
  let rawWage = hoursWorkedOnDate(employee, dateSought)
      * employee.payPerHour
  return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
  let eligibleDates = employee.timeInEvents.map(function(e){
      return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
return srcArray.find(function(rec){
  return rec.firstName === firstName
})
}

let calculatePayroll = function(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, rec){
      return memo + allWagesFor(rec)
  }, 0)
}
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