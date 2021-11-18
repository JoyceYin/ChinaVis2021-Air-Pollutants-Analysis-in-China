function each_pollute(datalist, pollute_name, label_name, match_list, wholename_list){  //pollutant
  var value_data = [];

  if (datalist.length == 6) {
    //for overview (2013 - 2018)
    for (var k=0; k<wholename_list.length; k++) {
    var countlist = [];
    
    for (var i=0; i<datalist.length; i++) {
        var yeardata = datalist[i];
        var cityvalue = yeardata.filter(function(event){ return event.province==wholename_list[k]});
        for (var j=0; j<cityvalue.length; j++) {
            countlist.push(cityvalue[j]['AQI']);
        }
    }
    //console.log(countlist);
    var count = 0;
    for (var p=0; p<countlist.length; p++) {
        count = count + countlist[p];
    }
    var aqi_avg = count/countlist.length;
    value_data.push(aqi_avg);
    }

  }else{
    //if specific year
      for (var i=0; i<wholename_list.length; i++) {
        var cityvalue = datalist.filter(function(event){ return event.province==wholename_list[i]});
        var count = 0;
        for (var k=0; k<cityvalue.length; k++) {    
          count = count + cityvalue[k][pollute_name]
        }
        value_data.push(count/cityvalue.length);  //calulate the average
    }
  }

  var sortlist = []
  for (var i=0; i<value_data.length; i++) {
    var newjson = {};
    newjson['city'] = match_list[i];
    newjson['value'] = value_data[i];
    sortlist.push(newjson);
  }
  console.log(sortlist.sort(function(a, b){return b.value - a.value}));

  var valuelist = []
  var citylist = []
  for (var i=0; i<sortlist.length; i++) {
    valuelist.push(sortlist[i]['value'])
    citylist.push(sortlist[i]['city'])
  }


  const labelname = 'Average ' + label_name;
  const data = {
    labels: citylist,
    datasets: [
      {
        label: labelname,
        data: valuelist,
        backgroundColor: 'rgba(255, 205, 86, 0.4)'
      },
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {

      indexAxis: 'y',
      scales: {
         y:{
          display: true,
          position: 'left',
          reverse: false,
          labels: citylist,
          ticks: { color:'white' },
          
         },
         x:{
          display: true,
          reverse: false,
          ticks: { color:'white' },
         }
       },
      elements: {
        bar: {
          borderWidth: 2,
        }
      },

      responsive: true,
      plugins: {
        legend: {
          position: 'none',
        }
      }
    },
  };

  return config;
}