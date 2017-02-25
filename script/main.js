/* this script run when page is loaded*/
const  MODE_SEL_ELITIST = 0;
const  MODE_SEL_ROULETTE = 1;

const  MODE_VAR_CHANGEROUTE = 0;
const  MODE_VAR_CHANGEORDERROUTE = 1;

$(window).on("load",function(){
     //set seed
     Math.seedrandom('AAaBbCc');

     //get canvas of html
     var canvas = document.getElementById("view");
     //get context 2d of canvas
     var ctx = canvas.getContext("2d");

    window.view = new View(canvas, ctx);
    window.verbose = false;

    /* setting locals */
    //arrLocals is a array with all locals
    window.arrLocals = [];

    //arrLocals is a array with all trucks
    window.arrTrucks = [];

    window.p  = null;

    $("#bt-play").click( function(){
        var numgeneration = parseInt($("#text-generation").val());
        if(isNaN( numgeneration)){
            alert("Insira um número de gerações válido!");
            return;
        }

        var selc = $("#select-selection option:selected").val();
        var selc2 = $("#select-validation option:selected").val();

        if ((p == null) || (p.generationNumber < numgeneration)){
            //crate populaion
            numMemberInPopulation = 40;
            p = new Population(arrLocals, arrTrucks, numMemberInPopulation);
            //set selection mode
            if(selc == 0)
                p.setSeletionMode(MODE_SEL_ELITIST);
            else if(selc ==1)
                p.setSeletionMode(MODE_SEL_ROULETTE);
            //set variation mode
            if(selc2 ==0)
                p.setVariationMode(MODE_VAR_CHANGEROUTE);
            else if(selc2 == 1)
                p.setVariationMode(MODE_VAR_CHANGEORDERROUTE);

            //if not have a erro
            if(p.error != true){
                //call generation of population
                p.generation( function(param, mode){
                    view.drawOnlyRoute(param[0].locals, mode);
                }, numgeneration);
            }
        }
    });


    $("#bt-file-data").click(function(){
        $("#file-data").trigger("click");
    });

    $("#bt-draw-graphs").click(function(){
        $("#view").hide();
        $("#graphs").show();
        $("#title-view").hide();

        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            //click buttom prediction
            var arrdata = [  ['Generation', 'Best fitness', 'AVG fitness']  ];

            var avgfitness = p.statistic.getAVGFitnessByGeneration();
            var thebestfitness = p.statistic.getTheFitnessByGeneration();

             for(var i=0; i< avgfitness.length; i++){
                arrdata.push( [ i+1,  thebestfitness[i], avgfitness[i]] );
            };

            var options = {
                chart: {
                    title: 'Fitness over generation',
                    subtitle: 'in millions of dollars (USD)'
                },
                width: 900,
                height: 500

            };

            var data = google.visualization.arrayToDataTable(arrdata);
            var chart = new google.charts.Line(document.getElementById('graphs'));

            chart.draw(data, options);
        }

    });

    document.getElementById('file-data').onchange = function() {
        readFileByLine(this, function(data){
            window.arrLocals = [];
            setLocals(data)},
            function(data){
                window.arrTrucks = [];
                setTrucks(data)
            });
    };

});


/*
 * copyArray [Method]
 * this method copy array of Locals and Vehicles
 * newDemand [array] - array of Local or Vehicle
 */
copyArray = function(array){
    newarray = new Array();
    for(var i = 0; i< array.length; i++){
        newarray.push( array[i].copy() );
    }
    return newarray;
}



function readFileByLine(p, callback1, callback2){
    var file = p.files[0];
    var reader = new FileReader();
    var arrDatas = Object;
    arrDatas.locals = [];
    arrDatas.trucks = [];
    var mode = "";

    reader.onload = function(progressEvent){
        // By lines
        var lines = this.result.split('\n');

        for(var line = 0; line < lines.length; line++){
            var l = lines[line].replace(/(?:\r\n|\r|\n)/g, '');

            if(l == "LOCALS"){
              mode = "locals";
                continue;
            }else if(l == "TRUCKS"){
              mode = "trucks";
                continue;
            }

            if(mode == "locals"){
                arrDatas.locals.push(lines[line]);
            }else if(mode == "trucks"){
                arrDatas.trucks.push(lines[line]);
             }
        }

        console.log("Qtd Locais "+ arrDatas.locals.length);
        console.log("Qtd Caminhões "+ arrDatas.trucks.length);



        callback1(arrDatas.locals);
        callback2(arrDatas.trucks);
    };

    reader.readAsText(file);
};


function setLocals(arrLocalAsString){

    arrLocalAsString.forEach(function(item){
        var it = item.split("|");
        var l = new Local(it[0], parseInt(it[1]), parseInt(it[2]), it[3], parseInt(it[4]) );
        arrLocals.push(l);
    });

    //criate way for all locals (is possible go to any local from any local)
    for(var i = 0; i < arrLocals.length; i++){
        var arr = [];
        for(var j = 0; j < arrLocals.length; j++){
            if( i != j){
                arr.push(arrLocals[j]);
            }
            arrLocals[i].setRoute(arr);
        }
    }


    /*arrLocals.sort(function(a, b) {
        return a[a.length-1] - b[b.length-1];
    });

    arrLocals.sort();*/
}


function setTrucks(arrTrucksAsString){

    arrTrucksAsString.forEach(function(item){
        var it = item.split("|");
        var l = new Vehicle(it[0], parseInt(it[1]));
        arrTrucks.push(l);
    });


    arrTrucks.sort(function(a, b) {
        return  b.capacityCurrent -  a.capacityCurrent;
    });

    arrTrucks.sort();

    console.log(arrTrucks)

}