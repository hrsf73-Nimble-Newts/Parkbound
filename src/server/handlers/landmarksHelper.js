const XLSX = require('xlsx')

// converts an xlsx file and saves it in an array
let nationalMonuments = []

// uncomment to check total number of national monuments
// const numberOfMonuments = [];
let workbook = XLSX.readFile(__dirname + '/National_Natural_Landmark.xlsx');

const queryNationalLandmark = () => {
  let listOfStates = workbook.Props.SheetNames.splice(1)
  let counter = 0;

  // goes through each state sheet and creates a monument list for that state
  // example: {alabama: [array of monuments]}
  listOfStates.forEach(state => {
    let monumentsListForState = [state]
    let i = 2;
    while (workbook.Sheets[state]['B' + i]) {
      numberOfMonuments.push(workbook.Sheets[state]['B' + i].v)
      let monument = workbook.Sheets[state]['B' + i].v
      monumentsListForState.push(monument)
      i++;
    }
    nationalMonuments.push(monumentsListForState)
  })

  // uncomment to check total number of national monuments
  // numberOfMonuments.forEach(a => counter++);
}

module.exports = {
  queryNationalLandmark: queryNationalLandmark
}