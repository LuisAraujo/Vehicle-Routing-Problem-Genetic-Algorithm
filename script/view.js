/*This script have class and functions for view aplication*/

//this is only array of color for diversify color
color = ["#00a","#0a0", "#a00", "#a0a", "#aa0", "#0aa", "#0a1", "#01a"];

/*
 drawLocals (Function)
 This is a function of draw locals icon in map
 parameter
 arrLocals [array] - is a array of type Local
 */
function drawLocals(arrRoute){
    //this is size of image
    var width = 12;
    var height = 20;

    //turn all array
    for(var i = 0; i < arrRoute.route.length; i++){
        //set color of name
        ctx.fillStyle = "#000000";
        ctx.font="bold 12px Arial"
        //print name in x+10 and y - height
        var str = arrRoute.route[i][0].getName() +" ("+ arrRoute.route[i][0].getDemand()+")";

        //avoid name overflow in axis x
        if(arrRoute.route[i][0].getX(0) + ctx.measureText(str).width < 500)
            ctx.fillText (str, arrRoute.route[i][0].getX() + 10, arrRoute.route[i][0].getY() - height )
        else{
            ctx.fillText (str, arrRoute.route[i][0].getX() - ctx.measureText(str).width, arrRoute.route[i][0].getY() - height )
        }


        var icon = local_icon;

        //when is a diposit change icon
        if( arrRoute.route[i][0].getType() == "diposit")
            icon = local_icon2;

        //print image in x - (width/2) and y - height
        ctx.drawImage(icon, arrRoute.route[i][0].x - (width/2), arrRoute.route[i][0].y - height, width, height);

    }
}

/*
 drawTruck (Function)
 This is a function of draw truck icon in map  parameter, and print
 your route and total cost os all truck
 arrTruck [array] - is a array of type Vehicle
 */
function drawTruck(arrRoute){
    var totalCost = 0;
    var tempTrucks = [];


    for(var i = 0; i<arrRoute.trucks.length; i++){

        for(var j = 0; j< arrRoute.route.length; j++){

            if(arrRoute.route[j][1].getName() == arrRoute.trucks[i].getName()){

                if(tempTrucks[i] == undefined){
                    tempTrucks[i] = [];
                }
                tempTrucks[i].push(arrRoute.route[j]);
            }

        }
     };


    for(var i = 0; i < tempTrucks.length; i++){
        for(var j = 0; j < tempTrucks[i].length-1; j++){

             //start draw line process
             ctx.beginPath();
             //set color
             ctx.strokeStyle = color[i];
             ctx.lineWidth = 2;
             ctx.setLineDash([5, 15]);
             //start point

             ctx.moveTo(tempTrucks[i][j][0].getX(),tempTrucks[i][j][0].getY());
             //end point
             ctx.lineTo(tempTrucks[i][j+1][0].getX(),tempTrucks[i][j+1][0].getY());
             //finish him! [F-A-T-A-L-I-T-Y]
             ctx.stroke();

             ctx.setLineDash([0,0]);

            //have local in route (all truck have one local initial = central)
            var width = 20;
            var height = 20;

            //ctx.globalAlpha = 1;
            if(j > 0 && j < tempTrucks[i].length-2)
                ctx.drawImage(truck_icon[color[i]], tempTrucks[i][j][0].getX() - ((width/2)*0.7 ) ,tempTrucks[i][j][0].getY() - ((height/2)*0.7), width*0.7,height*0.7);
            else if(j > 0)
                ctx.drawImage(truck_icon[color[i]], tempTrucks[i][j][0].getX() - (width/2) , tempTrucks[i][j][0].getY() - (height/2), width,height);

        }

    }


    ctx.fillText ("Total cost: "+ arrRoute.getCost().toFixed(2),10, canvas.height - 10);

}

/*
 drawRoute (Function)
 This is a function of draw Routes lines in map
 parameter
 arrLocals [array] - is a array of type Locals
 */
function drawRoute(arrRoute){
    //turn all array locals
    console.log(arrRoute)
    for(var i = 0; i < arrRoute.route.length; i++){
        //turn all array routs of any locals

        for(var j = 0; j < arrLocals.length; j++){
            //start draw line process
            ctx.beginPath();
            //border
            ctx.strokeStyle = "#888";
            ctx.lineCap = "round";
            ctx.lineWidth = 7;
            ctx.moveTo(arrRoute.route[i][0].getX(), arrRoute.route[i][0].getY());
            ctx.lineTo(arrLocals[j].getX(), arrLocals[j].getY());
            ctx.stroke();

            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 6;
            ctx.moveTo(arrRoute.route[i][0].getX(), arrRoute.route[i][0].getY());
            ctx.lineTo(arrLocals[j].getX(), arrLocals[j].getY());
            ctx.stroke();


        }
    }


    /** the second loop is for print name over lines **/
    //turn all array locals
    for(var i = 0; i < arrLocals.length; i++){
        //turn all array routs of any locals
        var route = arrLocals[i].getRoute();
        for(var j = 0; j < arrLocals[i].route.length; j++){
            //set color of name
            ctx.fillStyle = "#000";
            ctx.font="7px Arial"
            //print name in x+10 and y - height
            // raiz ( (Xa-Xb)² + (Ya-Yb)² )
            distance = Math.sqrt( Math.pow(arrLocals[i].getX() -  route[j].getX(), 2)  + Math.pow(arrLocals[i].getY() -  route[j].getY(), 2) );
            ctx.fillText (distance.toFixed(2)+" km", (arrLocals[i].getX() + route[j].getX()) / 2, (arrLocals[i].getY()+route[j].getY() )/2);
        }
    }
}


/*
 printDataTruck (Function)
 This is a function call by click action, this show info about route
 parameter
 evt [event] - is a event of mouse (click)
 arrTruck [array] - iis a array of type Vehicle
 */
function printDataTruck(evt, arrRoute){

    //get relative position mouse click
    var x = evt.pageX - $('#view').offset().left;
    var y = evt.pageY - $('#view').offset().top;
    var target = false;
    var totalDemand = 0;


    var tempTrucks = [];


    for(var i = 0; i<arrRoute.trucks.length; i++){
        for(var j = 0; j< arrRoute.route.length; j++){
            if(arrRoute.route[j][1].getName() == arrRoute.trucks[i].getName()){
                if(tempTrucks[i] == undefined){
                    tempTrucks[i] = [];
                }
                tempTrucks[i].push(arrRoute.route[j]);
            }
        }
    };


    for(var i = 0; i < tempTrucks.length; i++){

        //tempTrucks[tempTrucks.length-2]

        //Do not have route
        if( tempTrucks[i].length == 2)
            continue;


        if ( (x >=   tempTrucks[i][tempTrucks[i].length-2][0].getX() - 14) && (x <= tempTrucks[i][tempTrucks[i].length-2][0].getX() + 14 )
            &&  (y >=  tempTrucks[i][tempTrucks[i].length-2][0].getY() - 14) && (y <=  tempTrucks[i][tempTrucks[i].length-2][0].getY() + 14 ) ){

            //show div of info
            if(!$("#div-data").isDisabled)
                $("#div-data").show();

            //set position of div
            $("#div-data").css("top", evt.pageY);
            $("#div-data").css("left", evt.pageX);

            //set name of truck
            $("#truck-name").text(tempTrucks[i][tempTrucks.length-2][1].getName() +" ("+tempTrucks[i][tempTrucks.length-2][1].getCapacityTotal()+")");

            //convert routs in string
            strRouts = "";


            for(var j = 0;j< tempTrucks[i].length; j++){
                strRouts+= tempTrucks[i][j][0].getName()+" ("+tempTrucks[i][j][0].getDemand()+") | ";
                totalDemand +=tempTrucks[i][j][0].getDemand();
            }


            //set route name
            $("#truck-routes").text(strRouts);
            //set cost of route
            var cost = 0;
            for(var j = 0;j< tempTrucks[i].length-1; j++){
                cost += Math.sqrt( Math.pow( tempTrucks[i][j][0].getX() -  tempTrucks[i][j+1][0].getX(), 2)  + Math.pow(tempTrucks[i][j][0].getY() -  tempTrucks[i][j+1][0].getY(), 2) );
            };

            $("#truck-cost").text(cost);

            $("#route-demand").text(totalDemand);

            $("#header-div-data").css("backgroundColor", color[i]);
            target = true;
            break;
        }
    }


    if(!target){
        //if clik is off out truck icon
        if($("#div-data").css("display") == "block")
            $("#div-data").hide();
    }


}

function drawAll(arrRoute){

    cleanCnavas();

    /*functios for draw in canvas*/
    //draw routes
    drawRoute(arrRoute);
    //draw locals (icon)
    drawLocals(arrRoute);
    //draw truck (icon)
    drawTruck(arrRoute);

}

function drawOnlyRoute(arrRoute){
    cleanCnavas();

    //draw truck (icon)
    drawTruck(arrRoute);

    drawLocals(arrRoute);
}


function cleanCnavas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}