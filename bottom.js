function time_whole_AQI(datalist, yearlist){
  const calendar = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var avg_list = []
  var label_list = []
  for (var k=0; k<datalist.length; k++){
    const year = yearlist[k];
    var yeardata = datalist[k];

    for (var i=0; i<calendar.length; i++) {
      var monthvalue = yeardata.filter(function(event){ return event.month==calendar[i] });
      var count = 0
      for (var j=0; j<monthvalue.length; j++) {
        count = count + monthvalue[i]['AQI'];
      }

      var value = count/monthvalue.length;
      avg_list.push(value);
      label_list.push(year);
    }
  }
  //console.log(label_list);

  const data = {
    labels: label_list,
    datasets: [{
        label: 'Avg',
        data: avg_list,
        pointStyle: 'line',
        borderColor: 'rgba(255, 205, 86, 0.5)',
        backgroundColor: 'rgba(255, 205, 86, 0.4)',
        tension: 0.5
      }
    ]
  };

  const ts = {
    type: 'line',
    markerType: "none",
    data: data,
    
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'none',
          //color: 'white'
        },title: {
          display: true,
          text: 'Annual Average AQI Volatility',
          color: 'white'
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          ticks: { color:'white' },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'AQI Value',
            color: 'white'
          },
          
          suggestedMin: 50,
          suggestedMax: 200
        }
      }
    }
  };

  return ts;
}

function time_year_AQI(data_eachyear, year){
  const calendar = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var countlist = [];
  for (var i=0; i<calendar.length; i++) {
    var filter = data_eachyear.filter(function(event){ return event.month==calendar[i]});
    var count = 0;
    for (var k=0; k<filter.length; k++) {
      count = count + filter[k]['AQI']
    }
    countlist.push(count/filter.length);
  }

  const data = {
    labels: calendar,
    datasets: [
      {
        data: countlist,
        borderColor: 'rgba(255, 232, 130, 0.5)',
        backgroundColor: 'rgba(255, 205, 86, 0.4)',
      }
    ]
  };

  const ts_year = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'none',
          //color: 'white'
        },
        title: {
          display: true,
          text: 'Monthly Average AQI Volatility in '+year,
          color: 'white'
        }
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'AQI Value',
              color: 'white'
            }
          },
          x: { ticks: { color:'white' } }
        }
    },
  };

  return ts_year;
}


function time_AQI(data2018, city, year){
  const calendar = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var city_list = [];
  for (var i=0; i<data2018.length; i++) {
    if (data2018[i].province==city){
      city_list.push(data2018[i])
    }
  }
  var AQI_data = [];
  //console.log(city_list);
  for (var i = 0; i<calendar.length; i++) {
    var filter = city_list.filter(function(event){ return event.month==calendar[i]});
    console.log(filter);
    AQI_data.push(filter[0]['AQI']);
  }
  console.log(AQI_data);

  const data = {
    labels: calendar,
    datasets: [
      {
        label: city,
        data: AQI_data,
        borderColor: 'rgba(255, 232, 130, 0.5)',
        backgroundColor: 'rgba(255, 205, 86, 0.4)',
      }
    ]
  };

  const timeseries = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'none',
          //color: 'white'
        },
        title: {
          display: true,
          text: city + ' Monthly AQI in '+year,
          color: 'white'
        }
      },
      scales: {
        y: {
              display: true,
              title: {
                display: true,
                text: 'AQI Value',
                color: 'white'
              },
              ticks: { color:'white' }
            },
        x: { ticks: { color:'white' } }
      }
    },
  };

  return timeseries;
}
