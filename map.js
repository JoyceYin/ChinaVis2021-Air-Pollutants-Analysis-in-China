function map_make(datalist, match_list, wholename_list){

    var data_list = [];

    if (datalist.length == 6) {
        //for overview (2013-2018)
        for (var k=0; k<wholename_list.length; k++) {
            var countlist = [];
            var newjson = {};
            
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

            newjson["name"] = match_list[k];
            newjson["value"] = Math.round(aqi_avg);
            data_list.push(newjson);
        }
    }else{
        //if specific year
        for (var i=0; i<wholename_list.length; i++) {
            var cityvalue = datalist.filter(function(event){ return event.province==wholename_list[i]});
            var newjson = {};
            var count = 0;
            for (var k=0; k<cityvalue.length; k++) {    
              count = count + cityvalue[k]['AQI']
            }

            newjson["name"] = match_list[i];
            newjson["value"] = Math.round(count/cityvalue.length);
            data_list.push(newjson);
        }
    }


    var year_average = [];
    for (var a=0; a<data_list.length; a++)
    {
        year_average.push(data_list[a]['value']);
    }
    //console.log(year_average);

    function getMaximin(arr,maximin)
    {
        if(maximin=="max")
        {
            return Math.max.apply(Math,arr);
        }
        else if(maximin=="min")
        {
            return Math.min.apply(Math, arr);
        }
    }
    var max_year = getMaximin(year_average,"max");
    var min_year = getMaximin(year_average,"min")
    //console.log(max_year);
    //console.log(min_year);

    var piece_data = [];
    var gte1 = {};
    gte1["value"] = 0;
    gte1["label"] = "No value";
    gte1["color"] =  'white';

    piece_data.push(gte1);

    for (var b=0; b<5; b++) {
        var gte_piece = {};
        var r = Math.pow((max_year/min_year),0.25);
        var color = ["#B0E0E6", "#1E90FF", "#4169E1","#0000CD","#4682B4"];

        gte_piece["gte"] = min_year * Math.pow(r,b);
        gte_piece["lt"] = min_year * Math.pow(r,b+1);
        gte_piece["color"] = color[b];


        piece_data.push(gte_piece);
    }
    console.log(piece_data);


    //console.log(data_list);

      

    var map = {
        tooltip:
            {
                trigger: 'item',
                backgroundColor: 'white',
                formatter: 'Region:{b}<br/>AQI:{c}'
            },
        visualMap:
            {
                show:true,
                top: 'center',
                left: 'left',
                textStyle: {
                    color: '#fff',
                    fontSize: 15
                },
                pieces:piece_data,
            },
        series: [{
            type: 'map',
            mapType: 'china',
            roam: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle:
                            {color: "black"}
                    }
                },
                zoom: 1.5,
                emphasis: {
                    borderWidth: 2,
                    borderColor:'black',
                    areaColor: 'white',
                    label: {show: true}
                }
            },
            top: "3%",
            data: data_list
        }]
    };

    return map;
}