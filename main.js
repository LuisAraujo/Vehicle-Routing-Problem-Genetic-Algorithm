/* this script run when page is loaded*/
$(window).on("load",function(){
     //get canvas of html
     canvas = document.getElementById("view");
     //get context 2d of canvas
     ctx = canvas.getContext("2d");

    /* setting locals */
    //arrLocals is a array with all locals
    var arrLocals = [];
    //addeding new locals
    arrLocals.push( new Local("Central", 20, 70) );
    arrLocals.push( new Local("Buger King", 200, 30) );
    arrLocals.push( new Local("MC Donald's", 450, 150) );
    arrLocals.push( new Local("Subway", 300, 200) );
    arrLocals.push( new Local("Bob's", 100, 400) );
    arrLocals.push( new Local("Giraffa's", 300, 450) );

    for(var i = 0; i < arrLocals.length; i++){
        var arr = [];
        for(var j = 0; j < arrLocals.length; j++){
            if( i != j){
                arr.push(arrLocals[j]);
            }
            arrLocals[i].setRoutes(arr);
        }
    }

    //arrLocals is a array with all trucks
    var arrTruck = [];
    //addeding new truck
    arrTruck.push( new Vehicle("truck 1", 0, [arrLocals[0], arrLocals[1]]) );
    arrTruck.push( new Vehicle("truck 2", 0, [arrLocals[0], arrLocals[2], arrLocals[3]  ]));
    arrTruck.push( new Vehicle("truck 3", 0, [arrLocals[0], arrLocals[3], arrLocals[4]  ]));

    /*functios for draw in canvas*/
    //draw routes
    drawRoute(arrLocals);
    //draw locals (icon)
    drawLocals(arrLocals);
    //draw truck (icon)
    drawTruck(arrTruck);


    /** functiosn of interaction **/

    $("#view").click( function(evt){
        printDataTruck(evt, arrTruck);
    });

});




