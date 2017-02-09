/*This script have class and functions for view aplication*/

//this is only array of color for diversify color
color = ["#00a","#0a0", "#a00", "#a0a", "#aa0", "#0aa"];

/*
 drawLocals (Function)
 This is a function of draw locals icon in map
 parameter
 arrLocals [array] - is a array of type Local
 */
function drawLocals(arrLocals){
    //this is size of image
    var width = 12;
    var height = 20;

    //turn all array
    for(var i = 0; i < arrLocals.length; i++){
        //set color of name
        ctx.fillStyle = "#000000";
        ctx.font="bold 12px Arial"
        //print name in x+10 and y - height
        var str = arrLocals[i].getName() +" ("+ arrLocals[i].getDemand()+")";

        //avoid name overflow in axis x
        if(arrLocals[i].getX(0) + ctx.measureText(str).width < 500)
            ctx.fillText (str, arrLocals[i].getX() + 10, arrLocals[i].getY() - height )
        else{
            ctx.fillText (str, arrLocals[i].getX() - ctx.measureText(str).width, arrLocals[i].getY() - height )
        }


        var icon = local_icon;

        //when is a diposit change icon
        if(arrLocals[i].getType() == "diposit")
            icon = local_icon2;

        //print image in x - (width/2) and y - height
        ctx.drawImage(icon, arrLocals[i].x - (width/2), arrLocals[i].y - height, width, height);

    }
}

/*
 drawTruck (Function)
 This is a function of draw truck icon in map  parameter, and print
 your route and total cost os all truck
 arrTruck [array] - is a array of type Vehicle
 */
function drawTruck(arrTuck){

    var totalCost = 0;

    //trun all array truck
    for(var i = 0; i < arrTuck.length; i++){
        //trun all array route of truck
        var route = arrTuck[i].getRoute();
        for(var j = 0; j < route.length -1 ; j++){

            //start draw line process
            ctx.beginPath();
            //set color
            ctx.strokeStyle = color[i];
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 15]);

            //start point
            ctx.moveTo(route[j].x, route[j].y);
            //end point
            ctx.lineTo(route[j+1].x, route[j+1].y );
            //finish him! [F-A-T-A-L-I-T-Y]
            ctx.stroke();
        }

        ctx.setLineDash([0,0]);

        /*
        //ok it is a way for print your vehicle with color overlay;
        var tintCanvas = document.createElement('canvas');
        tintCanvas.width = 500;
        tintCanvas.height = 500;

        var tintCtx = tintCanvas.getContext('2d');
        tintCtx.fillStyle = color[i];

        //print mask in x - width/2 and  y - height/2
        tintCtx.fillRect(arrTuck[i].route[ arrTuck[i].route.length -1 ].x - (width/2) , arrTuck[i].route[ arrTuck[i].route.length -1 ].y - (height/2), width,height);
        tintCtx.globalCompositeOperation = "destination-atop";
        //print truck in x - width/2 and  y - height/2
        tintCtx.drawImage(truck_icon, arrTuck[i].route[ arrTuck[i].route.length -1 ].x - (width/2), arrTuck[i].route[ arrTuck[i].route.length -1 ].y - (height/2),  width,height);
        //print in context relative position tintCtx ('cause 0 and 0 for position)
        ctx.drawImage(tintCanvas, 0,0);
        */
    }

    //trun all array truck
    for(var i = 0; i < arrTuck.length; i++){
        totalCost += arrTuck[i].getCostRoute();
        //sizes
        var width = 20;
        var height = 20;
        var route = arrTuck[i].route;

        //have local in route (all truck have one local initial = central)
        if(route.length > 1)
            ctx.drawImage(truck_icon[color[i]], route[ route.length -1 ].getX() - (width/2) , route[ route.length -1 ].getY() - (height/2), width,height);
    }


    //print cost total
    ctx.fillText ("Total cost: "+ totalCost.toFixed(2),10, canvas.height - 10);


}



/*
 drawRoute (Function)
 This is a function of draw Routes lines in map
 parameter
 arrLocals [array] - is a array of type Locals
 */
function drawRoute(arrLocals){
    //turn all array locals
    for(var i = 0; i < arrLocals.length; i++){
        //turn all array routs of any locals
        var route = arrLocals[i].getRoute();
        for(var j = 0; j < route.length; j++){
            //start draw line process
            ctx.beginPath();
            //border
            ctx.strokeStyle = "#888";
            ctx.lineCap = "round";
            ctx.lineWidth = 7;
            ctx.moveTo(arrLocals[i].getX(), arrLocals[i].getY());
            ctx.lineTo(route[j].getX(), route[j].getY());
            ctx.stroke();

            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 6;
            ctx.moveTo(arrLocals[i].getX(), arrLocals[i].getY());
            ctx.lineTo(route[j].getX() , route[j].getY());
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
function printDataTruck(evt, arrTruck){
    //get relative position mouse click
    var x = evt.pageX - $('#view').offset().left;
    var y = evt.pageY - $('#view').offset().top;
    var target = false;
    var totalDemand = 0;

    //turn all array or truck
    for(var i= 0; i< arrTruck.length; i++){
          // if click is about turck icon
          var route = arrTruck[i].getRoute();
          if ( (x >=  route[ route.length-1].getX() - 14) && (x <= route[route.length-1].getX() + 14 )
              &&  (y >= route[ route.length-1].getY() - 14) && (y <= route[ route.length-1].getY() + 14 ) ){

              //show div of info
              if(!$("#div-data").isDisabled)
                $("#div-data").show();

              //set position of div
              $("#div-data").css("top", evt.pageY);
              $("#div-data").css("left", evt.pageX);

              //set name of truck
              $("#truck-name").text(arrTruck[i].name +" ("+arrTruck[i].capacity+")");

              //convert routs in string
              strRouts = "";
              for(var j = 0; j< route.length; j++){
                  strRouts+= route[j].getName()+" ("+route[j].getDemand()+") | ";
                  totalDemand +=route[j].getDemand();

              }

              //set route name
              $("#truck-routes").text(strRouts);
              //set cost of route
              $("#truck-cost").text(arrTruck[i].getCostRoute().toFixed(2));

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


function drawAll(arrLocals, arrTruck){

    cleanCnavas();

    /*functios for draw in canvas*/
    //draw routes
    drawRoute(arrLocals);
    //draw locals (icon)
    drawLocals(arrLocals);
    //draw truck (icon)
    drawTruck(arrTruck);

}

function drawOnlyRoute(arrLocals, arrTruck){
    cleanCnavas();

    //draw locals (icon)
    drawLocals(arrLocals);
    //draw truck (icon)
    drawTruck(arrTruck);
}


function cleanCnavas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}