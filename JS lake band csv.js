//Lake bands
//Load Fusion Table with lake polygons
var Lake_polygons = ee.FeatureCollection('ft:1-vsUUt2y8rXRe8SfM-61B8FD4R8qVnZlipes745n');

//Get band data from landsat8 
var Landsat8band = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_RAW')// landsat8 image 8 day raw
	.filterDate('2013-09-22', '2013-09-30') // dates ('start','end')
	.mean()
	.clip(Lake_polygons) // clip image to polygon
	.select(['B[1-7]']);// select band


//Convert into feature collection corresponding to polygons
var fc_bandMin = Landsat8band.reduceRegions(Lake_polygons, ee.Reducer.min(),200);// minimum band
var fc_bandStd = Landsat8band.reduceRegions(Lake_polygons, ee.Reducer.stdDev(),200);//standard deviation of band
var fc_combind = ee.FeatureCollection(fc_bandMin.merge(fc_bandStd));// merge minimum band with std dev band

print(fc_bandMin.getDownloadURL('csv', ['name','B1','B2','B3','B4','B5','B6','B7'], 'Lake_bands_Min')); 
print(fc_bandStd.getDownloadURL('csv', ['name','B1','B2','B3','B4','B5','B6','B7'], 'Lake_bands_Std')); 
