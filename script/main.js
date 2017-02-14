/* this script run when page is loaded*/
const  MODE_SEL_ELITIST = 0;
const  MODE_SEL_SURVIVAL = 1;

const  MODE_VAR_CHANGEROUTE = 0;
const  MODE_VAR_CHANGEORDERROUTE = 1;

$(window).on("load",function(){
     //get canvas of html
     var canvas = document.getElementById("view");
     //get context 2d of canvas
     var ctx = canvas.getContext("2d");

    window.view = new View(canvas, ctx);
    window.verbose = false;

    /* setting locals */
    //arrLocals is a array with all locals
    window.arrLocals = [];
    //addeding new locals
    arrLocals.push( new Local("Central", 250, 250, "diposit") );
    arrLocals.push( new Local("Buger King", 20, 70, "client", 100) );
    arrLocals.push( new Local("MC Donald's", 450, 50, "client", 100) );
    arrLocals.push( new Local("Subway", 250, 120, "client", 100) );
    arrLocals.push( new Local("Bob's", 50, 450, "client", 100) );
    arrLocals.push( new Local("Giraffa's", 450, 450, "client", 100) );
    arrLocals.push( new Local("Giraffa's 2", 150, 430, "client", 100) );
    arrLocals.push( new Local("Giraffa's 3", 100, 300, "client", 100) );

    arrLocals.push( new Local("Buger King 2", 240, 370, "client", 100) );
    arrLocals.push( new Local("MC Donald's 2", 120, 150, "client", 100) );
    arrLocals.push( new Local("Subway 2", 400, 200, "client", 100) );
    arrLocals.push( new Local("Bob's 2", 450, 330, "client", 100) );

    arrLocals.push( new Local("Buger King 3", 200, 80, "client", 100) );
    arrLocals.push( new Local("MC Donald's 3", 350, 150, "client", 100) );
    arrLocals.push( new Local("Subway 3", 260, 190, "client", 100) );
    arrLocals.push( new Local("Bob's 3", 50, 200, "client", 100) );



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


    //arrLocals is a array with all trucks
    window.arrTrucks = [];
    //addeding new truck
    arrTrucks.push( new Vehicle("truck 1", 400) );
    arrTrucks.push( new Vehicle("truck 2", 300) );
    arrTrucks.push( new Vehicle("truck 3", 400) );
    arrTrucks.push( new Vehicle("truck 4", 300) );
    arrTrucks.push( new Vehicle("truck 5", 400) );


    //crate populaion
    numMemberInPopulation = 10;
    var p = new Population(arrLocals, arrTrucks, numMemberInPopulation);
    //set selection mode
    p.setSeletionMode(MODE_SEL_ELITIST);
    //set variation mode
    p.setVariationMode(MODE_VAR_CHANGE);

    //if not have a erro
    if(p.error != true){
        //call generation of population
        var numGeneration = 2;
        p.generation( function(param, mode){
             view.drawOnlyRoute(param[0].locals, mode);
        }, numGeneration);

    }

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
