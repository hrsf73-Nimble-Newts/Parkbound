var XLSX = require('xlsx')

var queryNationalLandmark = function () {
  var workbook = XLSX.readFile(__dirname + '/National_Natural_Landmark.xlsx');
  var listOfStates = workbook.Props.SheetNames.splice(1)
  var nationalMonuments = []
  var numberOfMonuments = [];
  var counter = 0;

  listOfStates.forEach(function(state) {
    var monumentsListForState = [state]
    var i = 2;
    while (workbook.Sheets[state]['B' + i]) {
      numberOfMonuments.push(workbook.Sheets[state]['B' + i].v)
      var monument = workbook.Sheets[state]['B' + i].v
      monumentsListForState.push(monument)
      i++;
    }

    nationalMonuments.push(monumentsListForState)
  })

  nationalMonuments.forEach(function(stateObject) {
    console.log(stateObject[0], (stateObject.length - 1))
  })

  numberOfMonuments.forEach(function(a){counter++});

  console.log(counter, 'totalMonuments')
  console.log('nationalMonuments: ' + nationalMonuments)
  console.log('done!')
}

module.exports = {
  queryNationalLandmark: queryNationalLandmark
}