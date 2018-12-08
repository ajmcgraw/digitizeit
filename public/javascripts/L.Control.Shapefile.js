L.Control.Shapefile = L.Control.extend({

    onAdd: function(map) {
        var thisControl = this;

        var controlDiv = L.DomUtil.create('div', 'leaflet-control-command');

        // Create the leaflet control.
        var controlUI = L.DomUtil.create('div', 'leaflet-control-command-interior', controlDiv);

        // Create the form inside of the leaflet control.
        var form = L.DomUtil.create('form', 'leaflet-control-command-form', controlUI);
        form.action = '';
        form.method = 'post';
        form.enctype='multipart/form-data';

        // Create the input file element.
        var input = L.DomUtil.create('input', 'leaflet-control-command-form-input', form);
        input.id = 'file';
        input.type = 'file';
        input.name = 'uploadFile';
        input.style.display = 'none';

        L.DomEvent
            .addListener(form, 'click', function () {
                document.getElementById("file").click();
            })
            .addListener(input, 'change', function(){
                thisControl.fileToMap(this.files[0])
            });

        controlUI.title = 'Upload a zipped file with a .dbf, .shx and .shp';

        return controlDiv;
    },

    fileToMap: function(file) {
        var thisControl = this;

        var reader = new FileReader();

        reader.onload = function (e) {

            //console.log(e.target.result)
            thisControl.fileToShape(e.target.result)


        };

        reader.readAsArrayBuffer(file);

    },

    fileToShape: function(file) {
        var geoLayer = L.geoJson({features:[]}).addTo(map);
        var theShp = file;
        shp(theShp).then(function(data){

            //adding the layer to the map
            geoLayer.addData(data);

            //this zooms to the layer
            map.fitBounds(geoLayer.getBounds());
        })

    },

});

L.control.shapefile = function(opts) {
    return new L.Control.Shapefile(opts);
};
