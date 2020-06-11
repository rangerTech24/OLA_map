// Nicholas Potyok | Start:[06/18/19]                               -->
//Comment Color Legend                                              -->
//* [Title]                                                         -->
//? [Explanation]                                                   -->
//TODO [Notes]                                                      -->
//Config [properties to alter]                                      -->
//   View comment colors with VS code exstension: 'better comments' -->


var map;
var infoWindow;

var rockMarkers = [];
var plantMarkers = [];
var treeMarkers = [];
var shrubMarkers = [];
var grassMarkers = [];
var infoMarkers = [];



function initMap(){
    //* [Map properties] ---------------------------------------------------------------------------------------------
    var mapOptions= { 
        center:new google.maps.LatLng(46.559389,-87.409198),            //Config    [(Lat, Lon) is center of map]
        restriction:{
            latLngBounds: MAP_BOUNDS,
            strictBounds : false,
        },
        zoom:18,                                                        //Config    [Desired zoom]
        mapTypeId: google.maps.MapTypeId.SATELLITE,                     //Config    [Map type, options: (ROADMAP, SATELLITE, HYBRID, TERRAIN)]
        streetViewControl: false,                                       //Config    [False removes the streetview control icon]
        mapTypeControl: false,                                          //Config    [False removes the maptype control icon]
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);      //? [creates new map]

    //* adding bounds to the map
    var MAP_BOUNDS = {
        north:46.561307,
        south:46.557422,
        east:-87.403815,
        west:-87.414469,
    };

    //* array of icon types -----------------------------------------------------------------------------------------
    var icons = {
        Rock: {    
            name: 'Rock',
            icon: 'icons/rockIcon.png'
        },
        Plant: {    
            name: 'Plant',
            icon: 'icons/plantIcon.png'
        },
        Tree: {    
            name: 'Tree',
            icon: 'icons/treeIcon.png'
        },
        Shrub: {    
            name: 'Shrub',
            icon: 'icons/shrubIcon.png'
        },
        Grass: {    
            name: 'Grass',
            icon: 'icons/grassIcon.png'
        },
        Info: {
            name: 'Info',
            icon: 'icons/infoIcon.png'
        }
    };

    //* [Geopark overlay properties] ------------------------------------------------------------------------------
    var geoParkCenter = new google.maps.LatLng(46.559252, -87.409189);
    var geoParkArea = new google.maps.Circle({
        center:geoParkCenter,                                           //Config    [central point of the circle]
        radius: 21,                                                     //Config    [Radius of the circle]
        strokeColor: "0000FF",                                          //Config    [border (color / opacity / thickness) values]
        strokeOpacity:0.8,                                              
        strokeWeight:2,
        fillColor:"#13a8bf",                                            //Config    [fill (color / opacity) values]
        fillOpacity:0.3
    });

    //* [NativePlantPark overlay properties] --------------------------------------------------------------------
    var npp = [
        new google.maps.LatLng(46.560570147130846, -87.40958642477705),
        new google.maps.LatLng(46.56063654019907, -87.40900706762983),
        new google.maps.LatLng(46.560676191576086, -87.40901109094335),
        new google.maps.LatLng(46.56071492080002, -87.40866508598043),
        new google.maps.LatLng(46.56064760570256, -87.40864899272634),
        new google.maps.LatLng(46.560624552567766, -87.4086597215624),
        new google.maps.LatLng(46.56060149942323, -87.40866374487592),
        new google.maps.LatLng(46.56058397902679, -87.40866642708494),
        new google.maps.LatLng(46.56056277011828, -87.40866508598043),
        new google.maps.LatLng(46.56053326205789, -87.40865435714437),
        new google.maps.LatLng(46.560506520364285, -87.40863826389028),
        new google.maps.LatLng(46.560480700785526, -87.40862217063619),
        new google.maps.LatLng(46.560454881194524, -87.40859803075506),
        new google.maps.LatLng(46.56043459436436, -87.40856718535139),
        new google.maps.LatLng(46.56041615178492, -87.4085148822756),
        new google.maps.LatLng(46.560400475587485, -87.40844514484121),
        new google.maps.LatLng(46.560391254292725, -87.40837540740682),
        new google.maps.LatLng(46.560389410033586, -87.4083003055544),
        new google.maps.LatLng(46.560331315838766, -87.4081742417307),
        new google.maps.LatLng(46.56029811912807, -87.40811120981886),
        new google.maps.LatLng(46.560258467474746, -87.40800258035375),
        new google.maps.LatLng(46.56021328299732, -87.40788992757513),
        new google.maps.LatLng(46.56015887714802, -87.4077960502596),
        new google.maps.LatLng(46.56008787282195, -87.40795161838247),
        new google.maps.LatLng(46.56001225772322, -87.40810986871435),
        new google.maps.LatLng(46.55990439212754, -87.40833245654358),
        new google.maps.LatLng(46.559770942788326, -87.40862884063972),
        new google.maps.LatLng(46.55975987710609, -87.40865566272987),
        new google.maps.LatLng(46.559734979312736, -87.40884609956993),
        new google.maps.LatLng(46.55975157784291, -87.40889169712318),
        new google.maps.LatLng(46.55981981619132, -87.40897752781166),
        new google.maps.LatLng(46.55989266514424, -87.40907006402267),
        new google.maps.LatLng(46.55992401782807, -87.40909018059028),
        new google.maps.LatLng(46.56017760504599, -87.40922697325004),
        new google.maps.LatLng(46.56027535107532, -87.40928598184837),
        new google.maps.LatLng(46.56039246165222, -87.40939595241798),
        new google.maps.LatLng(46.56048467452698, -87.40950055856956),
        new google.maps.LatLng(46.56056951023335, -87.40958504815353)
    ]

    var nativePlantPark = new google.maps.Polygon({ 
        path:npp,
        strokeColor: "0000FF",                                          //Config    [border (color / opacity / thickness) values]
        strokeOpacity:0.8,                                              
        strokeWeight:2,
        fillColor:"#397C37",                                            //Config    [fill (color / opacity) values]
        fillOpacity:0.3
    });

    //* [Ecopark overlay properties] --------------------------------------------------------------------
    var ecoPark = [
        new google.maps.LatLng(46.55850635400759, -87.40913643411955),
        new google.maps.LatLng(46.558375406904354, -87.40946098141035),
        new google.maps.LatLng(46.55829610075858, -87.40966482929548),
        new google.maps.LatLng(46.55813379944776, -87.40993305019697),
        new google.maps.LatLng(46.55826105847118, -87.41027100853285),
        new google.maps.LatLng(46.55829978941909, -87.41050167850813),
        new google.maps.LatLng(46.558318232717895, -87.41076453499159),
        new google.maps.LatLng(46.558709229177346, -87.41025759748777),
        new google.maps.LatLng(46.55872213938976, -87.40984990171751),
        new google.maps.LatLng(46.55872029507388, -87.40955217651685),
        new google.maps.LatLng(46.55872029507388, -87.40931077770551),
        new google.maps.LatLng(46.5585137312998, -87.40913375191053)
    ]

    var ecoPark = new google.maps.Polygon({ 
        path:ecoPark,
        strokeColor: "0000FF",                                          //Config    [border (color / opacity / thickness) values]
        strokeOpacity:0.8,                                              
        strokeWeight:2,
        fillColor:"#927646",                                           //Config    [fill (color / opacity) values]
        fillOpacity:0.3
    });

    //* [whitman woods overlay properties] --------------------------------------------------------------------
    var whitmanWoods = [
        new google.maps.LatLng(46.55870720572343, -87.41025710807355),
        new google.maps.LatLng(46.55914430693679, -87.4102651547006),
        new google.maps.LatLng(46.55914061833368, -87.41098398671659),
        new google.maps.LatLng(46.558315603606715, -87.41098106320578),
        new google.maps.LatLng(46.558317901592645, -87.4107617936528)
    ]

    var whitmanWoods = new google.maps.Polygon({ 
        path:whitmanWoods,
        strokeColor: "0000FF",                                          //Config    [border (color / opacity / thickness) values]
        strokeOpacity:0.8,                                              
        strokeWeight:2,
        fillColor:"#12b090",                                            //Config    [fill (color / opacity) values]
        fillOpacity:0.3
    });


    //* setting the area onto the map
    geoParkArea.setMap(map);
    ecoPark.setMap(map);
    nativePlantPark.setMap(map);
    whitmanWoods.setMap(map);


    //* Creates an info window object.
    infoWindow = new google.maps.InfoWindow({
        maxWidth: 305
    });



    // requesting all JSON files ----------------------------------------------------------


    //rock
    let requestRock = new Request("./JSONData/rockData.json");

    fetch(requestRock)

    .then(function(resp) {       
        return resp.json();
    })

    .then(function(data) {
        for(var i = 0;i < data.rockMarkers.length;i++){                             
            addMarker(data.rockMarkers[i]);
        }
    });

    
    //plant
    let requestPlant = new Request("./JSONData/plantData.json");

    fetch(requestPlant)

    .then(function(resp) {       
        return resp.json();
    })

    .then(function(data) {
        for(var i = 0;i < data.plantMarkers.length;i++){                             
            addMarker(data.plantMarkers[i]);
        }
    });


    //tree
    let requestTree = new Request("./JSONData/treeData.json");

    fetch(requestTree)

    .then(function(resp) {       
        return resp.json();
    })

    .then(function(data) {
        for(var i = 0;i < data.treeMarkers.length;i++){                             
            addMarker(data.treeMarkers[i]);
        }
    });

    
    //shrub
    let requestShrub = new Request("./JSONData/shrubData.json");

    fetch(requestShrub)

    .then(function(resp) {       
        return resp.json();
    })

    .then(function(data) {
        for(var i = 0;i < data.shrubMarkers.length;i++){                             
            addMarker(data.shrubMarkers[i]);
        }
    });


    //grass
    let requestGrass = new Request("./JSONData/grassData.json");

    fetch(requestGrass)

    .then(function(resp) {       
        return resp.json();
    })

    .then(function(data) {
        for(var i = 0;i < data.grassMarkers.length;i++){                             
            addMarker(data.grassMarkers[i]);
        }
    });


    //info
    let requestInfo = new Request("./JSONData/infoData.json");

    fetch(requestInfo)

    .then(function(resp) {       
        return resp.json();
    })

    .then(function(data) {
        for(var i = 0;i < data.infoMarkers.length;i++){                             
            addMarker(data.infoMarkers[i]);
        }
    });

    

    
    //* Legend Content -----------------------------------------------------
    var legend = document.getElementById('legend');

    for (var key in icons) {
        var type = icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        var check = document.createElement('div');
        

        //adds the image and name after the checkbox
        check.innerHTML = '<input type="checkbox" class="checkbox" checked = "checked" id="'+ icon +'" onclick="'+ name +'Checkbox()"><img src="' + icon + '"> ' + name;

        //adds them to the page
        legend.appendChild(div);
        legend.appendChild(check);

    }

    map.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById('legend'));

    var check = document.getElementsByTagName('input');

}

//end of initMap -------------------------------------------------------------------------------------------------




//  Marker functionality -----------------------------------------------

function addMarker(props){                                          //? takes the argument "props" which will hold the unique properties of each marker being created
    var marker = new google.maps.Marker({
        map: map,
        position: props.cords,
        image: props.markerImage,
        description: props.description,
        age: props.age,
        type: props.type,
        name: props.name,
        iconImage: props.iconImage,
        scientificName: props.scientificName,
        link: props.link,
        
    });
    //Checks for definition of custom icon
    if(props.iconImage){                                            //? checks to see if an image exists in the marker properties
        //set icon image
        marker.setIcon(props.iconImage);
    }


    //*  Info_window_functionality -----------------------------------------------

    var plant_content = '<div id="content">' +
    '<h1 id="title"> '+props.name+'</h1>' + 
    '<center><img id="markerImage" src="'+props.markerImage+'"></center>' +
    '<p id="property"><b>Scientific Name:</b> '+props.scientificName+'</p>' +
    '<p id="property"><b>Type:</b> '+props.type+'</p>' +
    '<p id="property"><b>Description:</b> '+props.description+'</p>' +
    '<a id="link" href='+props.link+' target="_blank">Learn More</a>';


    var rock_content = '<div id="content">' +
    '<h1 id="title"> '+props.name+'</h1>' + 
    '<center><img id="markerImage" src="'+props.markerImage+'"></center>' +
    '<p id="property"><b>Type:</b> '+props.type+'</p>' +
    '<p id="property"><b>Age:</b> '+props.age+'</p>' +
    '<p id="property"><b>Description:</b> '+props.description+'</p>' ;


    var info_content = '<div id="content">' +
    '<h1 id="title"> '+props.name+'</h1>' + 
    '<center><img id="markerImage" src="'+props.markerImage+'"></center>' +
    '<p id="property"><b>Description:</b> '+props.description+'</p>';



    google.maps.event.addListener(marker, 'click', function(){           //? event to listen for a click on a marker 

        //|||| "icons/plantIcon.png" || "icons/grassIcon.png"
        if(marker.iconImage == "icons/treeIcon.png" || marker.iconImage == "icons/shrubIcon.png" || marker.iconImage == "icons/plantIcon.png" || marker.iconImage == "icons/grassIcon.png"){
            infoWindow.setContent(plant_content);     
            

        } else if(marker.iconImage == "icons/rockIcon.png"){
            infoWindow.setContent(rock_content);
            
        
        } else if(marker.iconImage == "icons/infoIcon.png"){
            infoWindow.setContent(info_content);
        }

        infoWindow.open(map, marker);                           //? then open it
        console.log(marker.image);
        console.log(marker.iconImage);
    });

    if(marker.iconImage == "icons/rockIcon.png"){
        rockMarkers.push(marker);
    }else if(marker.iconImage == "icons/plantIcon.png"){
        plantMarkers.push(marker);
    }else if(marker.iconImage == "icons/treeIcon.png"){
        treeMarkers.push(marker);
    }else if(marker.iconImage == "icons/shrubIcon.png"){
        shrubMarkers.push(marker);
    }else if(marker.iconImage == "icons/grassIcon.png"){
        grassMarkers.push(marker);
    }else if(marker.iconImage == "icons/infoIcon.png"){
        infoMarkers.push(marker);
    }
}





// Functions for checkbox functionality --------------------------------------------------------------------------

function RockCheckbox()
{
    function setMapOnAll(map)
    {
        for(var i=0; i<rockMarkers.length; i++)
        {
            rockMarkers[i].setMap(map);
        }
    }

    function clearMarkers()
    {
        setMapOnAll(null);
    }

    function showMarkers()
    {
        setMapOnAll(map);
    }


    //check if the rock checkbox is checked
    var rockCheckbox = document.getElementById("icons/rockIcon.png");

    if(rockCheckbox.checked == true)
    {
        text.style.display = "block";
        showMarkers();
        
    }
    else 
    {
        text.style.display = "none";
        clearMarkers();
    }
}


function PlantCheckbox()
{
    function setMapOnAll(map)
    {
        for(var i=0; i<plantMarkers.length; i++)
        {
            plantMarkers[i].setMap(map);
        }
    }

    function clearMarkers()
    {
        setMapOnAll(null);
    }

    function showMarkers()
    {
        setMapOnAll(map);
    }
    
    //check if the plant checkbox is checked
    var plantCheckbox = document.getElementById("icons/plantIcon.png");
    var text = document.getElementById("text1");

    if(plantCheckbox.checked == true)
    {
        text.style.display = "block";
        showMarkers();
    }
    else 
    {
        text.style.display = "none";
        clearMarkers();
    }
}


function TreeCheckbox()
{
    function setMapOnAll(map)
    {
        for(var i=0; i<treeMarkers.length; i++)
        {
            treeMarkers[i].setMap(map);
        }
    }

    function clearMarkers()
    {
        setMapOnAll(null);
    }

    function showMarkers()
    {
        setMapOnAll(map);
    }


    //check if the tree checkbox is checked
    var treeCheckbox = document.getElementById("icons/treeIcon.png");
    var text = document.getElementById("text2");

    if(treeCheckbox.checked == true)
    {
        text.style.display = "block";
        showMarkers()
    }
    else 
    {
        text.style.display = "none";
        clearMarkers()
    }
}


function ShrubCheckbox()
{
    function setMapOnAll(map)
    {
        for(var i=0; i<shrubMarkers.length; i++)
        {
            shrubMarkers[i].setMap(map);
        }
    }

    function clearMarkers()
    {
        setMapOnAll(null);
    }

    function showMarkers()
    {
        setMapOnAll(map);
    }
    
    //check if the shrub checkbox is checked
    var shrubCheckbox = document.getElementById("icons/shrubIcon.png");
    var text = document.getElementById("text3");

    if(shrubCheckbox.checked == true)
    {
        text.style.display = "block";
        showMarkers()
    }
    else 
    {
        text.style.display = "none";
        clearMarkers()
    }
}


function GrassCheckbox()
{
    function setMapOnAll(map)
    {
        for(var i=0; i<grassMarkers.length; i++)
        {
            grassMarkers[i].setMap(map);
        }
    }

    function clearMarkers()
    {
        setMapOnAll(null);
    }

    function showMarkers()
    {
        setMapOnAll(map);
    }
    
    //check if the grass checkbox is checked
    var grassCheckbox = document.getElementById("icons/grassIcon.png");
    var text = document.getElementById("text4");

    if(grassCheckbox.checked == true)
    {
        text.style.display = "block";
        showMarkers()
    }
    else 
    {
        text.style.display = "none";
        clearMarkers()
    }
}


function InfoCheckbox()
{
    function setMapOnAll(map)
    {
        for(var i=0; i<infoMarkers.length; i++)
        {
            infoMarkers[i].setMap(map);
        }
    }

    function clearMarkers()
    {
        setMapOnAll(null);
    }

    function showMarkers()
    {
        setMapOnAll(map);
    }
    
    //check if the info checkbox is checked
    var infoCheckbox = document.getElementById("icons/infoIcon.png");
    var text = document.getElementById("text5");

    if(infoCheckbox.checked == true)
    {
        text.style.display = "block";
        showMarkers()
    }
    else 
    {
        text.style.display = "none";
        clearMarkers()
    }
}