/* this script run when page is loaded*/

$(window).on("load",function(){
     //get canvas of html
     canvas = document.getElementById("view");
     //get context 2d of canvas
     ctx = canvas.getContext("2d");

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
    arrLocals.push( new Local("Giraffa's 3", 100, 200, "client", 100) );
/*
    arrLocals.push( new Local("Buger King 2", 20, 30, "client", 100) );
    arrLocals.push( new Local("MC Donald's 2", 120, 150, "client", 100) );
    arrLocals.push( new Local("Subway 2", 400, 200, "client", 100) );
    arrLocals.push( new Local("Bob's 2", 450, 450, "client", 100) );

    arrLocals.push( new Local("Buger King 3", 130, 120, "client", 100) );
    arrLocals.push( new Local("MC Donald's 3", 350, 150, "client", 100) );
    arrLocals.push( new Local("Subway 3", 260, 190, "client", 100) );
    arrLocals.push( new Local("Bob's 3", 50, 160, "client", 100) ); */




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
    arrTrucks.push( new Vehicle("truck 1", 200) );
    arrTrucks.push( new Vehicle("truck 2", 200) );
    arrTrucks.push( new Vehicle("truck 3", 200) );
    arrTrucks.push( new Vehicle("truck 4", 200) );
    arrTrucks.push( new Vehicle("truck 5", 200) );
   /* arrTrucks.push( new Vehicle("truck 5", 200) );
    arrTrucks.push( new Vehicle("truck 6", 200) );
    arrTrucks.push( new Vehicle("truck 7", 200) );
    arrTrucks.push( new Vehicle("truck 8", 200) );
    //arrTrucks.push( new Vehicle("truck 3", 200, 0) );
    //arrTrucks.push( new Vehicle("truck 4", 200, 0) );

    /*var arrRoute = [];
    var r = new Route();
    r.startRoute();

    r.setLocal(arrLocals[1].getName(), arrTrucks[0].getName());
    r.setLocal(arrLocals[2].getName(), arrTrucks[0].getName());

    r.setLocal(arrLocals[3].getName(), arrTrucks[1].getName());
    r.setLocal(arrLocals[4].getName(), arrTrucks[1].getName());

    r.endRoute();

    arrRoute.push(r);*/


    //var populationInitial = createPopulateInitial(arrLocals, arrTruck, 10);

    var p = new Population(arrLocals, arrTrucks, 10);
    p.generation(
        function(param){
            drawOnlyRoute(param[0].locals);
        });
    //p.showConsole();

    //draw first population by only teste
    //drawOnlyRoute(arrLocals, p.members[0].trucks);




    /** functiosn of interaction
    $("#view").click( function(evt){
        printDataTruck(evt,c.locals);
    });

    $("#bt-draw-route").click(function(evt){
        drawOnlyRoute(c.locals);
    });

    $("#bt-draw-all").click(function(evt){
        drawAll(c.locals);
    });
     **/
});

/* createPopulateInitial (method)
* this method create the population bay locals, trucks and size of population desired
* Prameter
* arrLocal [array] - array of locals
* arrTrucks [array] - array of trucks
* sizepopulation [interger] - number of your population

createPopulateInitial = function(arrLocals, arrTruck, sizepopulation){

    arrPopulation = [];
    //to complete population desired
    while(arrPopulation.length < sizepopulation){
            //make copy of arrays for not modify the data origial
            var locals = copyArray(arrLocals)
            var trucks = copyArray(arrTruck);
            //count
            qtdLocalCovered = 0;
        console.log("**********************************************************************");
           //while all locals not is covered
            while(qtdLocalCovered < locals.length-1){


                //sorted a number in array of locals range
                var indexRandom = parseInt( (Math.random() * (locals.length-1)), 0) + 1;


                console.log("tamanho do array "+locals.length+"  sorteado: "+indexRandom)

                //save the old value
                var oldqtdLocalCovered =qtdLocalCovered;

                //verifying if local is free (no one truck cover yet)
                if(verifyLocalIsFree( locals[indexRandom], trucks)){
                    console.log("Local is free: "+indexRandom)
                    //trun all trucks
                    for(var i =0; i<trucks.length; i++){
                        //verifying if the specific truck have capacity
                        if(trucks[i].verifyHaveCapacity(locals[indexRandom].getDemand())){
                            console.log("Truck "+trucks[i].getName()+" have  capacity C ("+trucks[i].getCapacity()+"), DC ("+trucks[i].getDemandCovered()+"), DA("+locals[indexRandom].getDemand()+")")
                            //addlocal in route of this truck
                            trucks[i].addLocal(locals[indexRandom]);
                            //yeah!!
                            qtdLocalCovered++;
                            break;
                        }else{
                            console.log("Truck "+trucks[i].getName()+" NO have capacity C ("+trucks[i].getCapacity()+"), DC ("+trucks[i].getDemandCovered()+"), DA("+locals[indexRandom].getDemand()+")")
                        }

                    }
                    //don't have truck for cover any local then it is a invalid route, restart...
                    if(oldqtdLocalCovered == qtdLocalCovered){
                        console.log(">>>>RESTART for imposible cover");
                        var locals = copyArray(arrLocals)
                        var trucks = copyArray(arrTruck);
                        //count
                        qtdLocalCovered = 0;
                    }
                }else{
                    console.log("Local is NOT free: "+indexRandom)
                }
            }
            //insert array truck gerated in array of population
            arrPopulation.push(trucks);
    }

    //return population
    return arrPopulation;

}*/

/*
 * verifyLocalIsFree [Method]
 * this method verify if local is free, this means if no one truck covered
 * local [Local] - a local who you wanna verify
 * arrtruck [Array] - array of Trucks
 */
verifyLocalIsFree = function(local, arrTruck ){

    for(var i = 0; i< arrTruck.length; i++){
        var route= arrTruck[i].getRoute();

        for(var j = 0; j< route.length; j++){
            //if 'j' local in rout of 'i' track is iqual local, local not is free :(
            if(route[j] == local)
                return false;
        }
    }

    return true;
}


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
