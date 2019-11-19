var floodMap = ee.Image("users/LukeMenard/SentinelCombo_20180516_20180612")
var precipTable = ee.FeatureCollection("users/LukeMenard/Sri-Lanka_GSMaP_20180516_20180612")
var hospitals = ee.FeatureCollection("users/LukeMenard/sri-lanka_hospitals_osm")

// ## SET MAP CENTER ##

Map.setCenter(82.0, 8.0, 8)

// ## STYLE BASEMAP ##

var Black = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{color: '#444444'}]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{color: '#000000'}, {visibility: 'on'}]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{visibility: 'off'}]},
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [{saturation: -100}, {lightness: 45}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#ffffff'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#eaeaea'}]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{visibility: 'off'}]},
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#dedede'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [{visibility: 'simplified'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{visibility: 'off'}]},
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{color: '#434343'}, {visibility: 'on'}]
  }
];

var Dark = [
  {
    elementType: 'geometry',
    stylers: [{color: '#242f3e'}]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{color: '#242f3e'}]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}]
  }
];

Map.setOptions(
    'Dark', {Black: Black, Dark: Dark}
)

// ## IMPORT DATA ##

// Map.addLayer(hospitals,{color: 'ffff31', pointRadius: .5}, 'Hospitals')
var styleHospitals = hospitals.draw('ffff31', 1)
Map.addLayer(styleHospitals, {}, 'Hospitals')
console.log(styleHospitals)
var floodMap_masked = floodMap.updateMask(floodMap.gte(1))
Map.addLayer(floodMap_masked, {
    min: 0,
    max: 1,
    palette: ['FF3030']
}, 'Flood Map')


// ## PRECIPITATION TABLE ##

var precipTable = {
  cols: [
    {id: 'date', label: 'Date', type: 'string'},
    {id: 'precip', label: 'Precipitation', type: 'number'}
  ],
  rows: [
    {c: [{v: '5/16/18'}, {v: 13.134}]},
    {c: [{v: '5/17/18'}, {v: 10.288}]},
    {c: [{v: '5/18/18'}, {v: 13.572}]},
    {c: [{v: '5/19/18'}, {v: 4.253}]},
    {c: [{v: '5/20/18'}, {v: 28.387}]},
    {c: [{v: '5/21/18'}, {v: 8.604}]},
    {c: [{v: '5/22/18'}, {v: 19.838}]},
    {c: [{v: '5/23/18'}, {v: 20.144}]},
    {c: [{v: '5/24/18'}, {v: 23.229}]},
    {c: [{v: '5/25/18'}, {v: 11.871}]},
    {c: [{v: '5/26/18'}, {v: 4.194}]},
    {c: [{v: '5/27/18'}, {v: 6.011}]},
    {c: [{v: '5/28/18'}, {v: 3.517}]},
    {c: [{v: '5/29/18'}, {v: 0.554}]},
    {c: [{v: '5/30/18'}, {v: 0.283}]},
    {c: [{v: '5/31/18'}, {v: 1.033}]},
    {c: [{v: '6/1/18'}, {v: 2.296}]},
    {c: [{v: '6/2/18'}, {v: 5.251}]},
    {c: [{v: '6/3/18'}, {v: 3.108}]},
    {c: [{v: '6/4/18'}, {v: 3.338}]},
    {c: [{v: '6/5/18'}, {v: 1.056}]},
    {c: [{v: '6/6/18'}, {v: 4.519}]},
    {c: [{v: '6/7/18'}, {v: 6.207}]},
    {c: [{v: '6/8/18'}, {v: 1.843}]},
    {c: [{v: '6/9/18'}, {v: 3.364}]},
    {c: [{v: '6/10/18'}, {v: 1.791}]},
    {c: [{v: '6/11/18'}, {v: 0.729}]},
    {c: [{v: '6/12/18'}, {v: 0.465}]},
  ]
}

var precipOptions = {
  title: 'Precipitation Over Time',
  fontSize: 18,
  vAxis: {title: 'Precipitation'},
  hAxis: {title: 'Date'}
}

var chart = new ui.Chart(precipTable, 'LineChart', precipOptions)


var precipChart = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    width: '450px',
  }
});
precipChart.add(chart)
Map.add(precipChart)

// ## IMPACTS TABLE ##

var impactTable = {
  cols: [
    {id: 'began', label: 'Began', type: 'string'},
    {id: 'ended', label: 'Ended', type: 'string'},
    {id: 'Area_flooded_(km2)', label: 'Area Flooded (km2)', type: 'number'},
    {id: 'Pop_Exposed', label: 'Population Exposed', type: 'number'}
  ],
  rows: [
    {c: [{v: '11/22/08'}, {v: '12/4/08'}, {v: 11133.14}, {v: 129001}]},
  ]
}

var impactOptions = {
  title: 'Impact Estimates',
  fontSize: 18
}

var impactChart = new ui.Chart(impactTable, 'Table', impactOptions)

var impactPanel = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '15px 20px',
    width: '450px',
  }
})

var impactTitle = ui.Label({
  value: 'Impact Estimates',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
})
impactTitle.style().set('position', 'top-center')
impactPanel.add(impactTitle)

impactPanel.add(impactChart)

Map.add(impactPanel)

// ## LEGEND ##

var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    width: '450px',
  }
});

var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '10px 0px',
  }
});
legend.add(legendTitle);

var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  })

  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });

  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}

legend.add(makeRow('ffff31', 'Hospitals'))
legend.add(makeRow('FF3030', 'Flood Zones'))

Map.add(legend)

// ## ADD MAP TITLE ##

var title = ui.Label({
  value: 'Sri Lanka Flood Map',
  style: {
    position: 'bottom-right',
    fontWeight: 'bold',
    fontSize: '25px',
    margin: '0 0 4px 0',
    padding: '30px',
    width: '450px',
    textAlign: 'center',
    color: 'White',
    backgroundColor: 'gray'
  }
})
Map.add(title)