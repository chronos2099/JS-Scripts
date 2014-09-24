// Plot band values at points in an image.
var landsat8Toa = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_RAW')
		.filterDate('2014-05-25','2014-06-02');



// Three known locations.
var points = ee.FeatureCollection([
    ee.Geometry.Point(-78.94569396972656, 48.837153333924455),
    ee.Geometry.Point(-79.03907775878906, 48.80528065117171),
    ee.Geometry.Point(-78.98723602294922, 48.7625258981357)]);


var mappoints = ee.Image(landsat8Toa.first()).clip(points.union());

// Select bands B1 to B7.
mappoints = mappoints.select(['B[1-7]']);

var bandDataTable = Chart.image.regions(
    mappoints, points,null,30);


	
for (var i = 0; i < bandDataTable.rows.length; ++i){
  print(JSON.stringify(bandDataTable.rows[i],null , 1 ))
}


Map.addLayer(points);

Map.setCenter(-79.03907775878906, 48.80528065117171, 11);

//var aa =  JSON.stringify(bandDataTable.rows[1] )