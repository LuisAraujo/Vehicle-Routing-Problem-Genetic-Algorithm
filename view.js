/*This script have class and functions for view aplication*/


/*
Local (Class)
This class is the local
attribute:
name [string] - Is the nome of local
x [integer] - Is coordinate axes x
y [interger] - Is coordinate axes y
route [array] - Is a array of type Local
 */
function Local(name, x, y){
    this.name = name;
    this.x = x;
    this.y = y;
    this.route = [];
}
/*
setRoutes (Method)
This is a method od Local
parameter
arrRoutes [array] - is a array of type Local
*/
Local.prototype.setRoutes = function(arrRoutes){
    this.route = arrRoutes;
}


/*
 Vehicle (Class)
 This class is the vehicle
 attribute:
 name [string] - Is the nome of vehicle
 capacity [integer] - Is capacity of vehicle (tonne)
 routes [array] - Is a array of type Local for create the route of vehicle
 */
function Vehicle(name, capacity, routes){
    this.name = name;
    this.capacity = capacity;
    this.route = routes;
    this.cost = 0;
    //calculate cost of route
    for(var i=0; i<this.route.length-1; i++){
            this.cost += Math.sqrt( Math.pow( this.route[i].x -  this.route[i+1].x, 2)  + Math.pow(this.route[i].y -  this.route[i+1].y, 2) );
    };

    this.cost = this.cost.toFixed(2)
}



/*** FUNCTIONS ***/

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
        //print name in x+10 and y - height
        ctx.fillText (arrLocals[i].name, arrLocals[i].x + 10, arrLocals[i].y - height )
        //print image in x - (width/2) and y - height
        ctx.drawImage(local_icon, arrLocals[i].x - (width/2), arrLocals[i].y - height, width, height);

    }
}

/*
 drawTruck (Function)
 This is a function of draw truck icon in map
 parameter
 arrTruck [array] - is a array of type Vehicle
 */
function drawTruck(arrTuck){
    //this is only array of color for diversify color
    color = ["#00a","#0a0", "#a00", "#a0a", "#aa0", "#0aa"];

    //trun all array truck
    for(var i = 0; i < arrTuck.length; i++){
        //trun all array route of truck
        for(var j = 0; j < arrTuck[i].route.length -1 ; j++){
            //start draw line process
            ctx.beginPath();
            //set color
            ctx.strokeStyle = color[i];
            ctx.lineWidth = 1;
            //start point
            ctx.moveTo(arrTuck[i].route[j].x, arrTuck[i].route[j].y);
            //end point
            ctx.lineTo(arrTuck[i].route[j+1].x , arrTuck[i].route[j+1].y );
            //finish him! [F-A-T-A-L-I-T-Y]
            ctx.stroke();
        }

        //ok it is a way for print your vehicle with color overlay;
        var tintCanvas = document.createElement('canvas');
        tintCanvas.width = 500;
        tintCanvas.height = 500;
        var tintCtx = tintCanvas.getContext('2d');
        tintCtx.fillStyle = color[i];

        //sizes
        var width = 14;
        var height = 14;
        //print mask in x - width/2 and  y - height/2
        tintCtx.fillRect(arrTuck[i].route[ arrTuck[i].route.length -1 ].x - (width/2) , arrTuck[i].route[ arrTuck[i].route.length -1 ].y - (height/2), width,height);
        tintCtx.globalCompositeOperation = "destination-atop";
        //print truck in x - width/2 and  y - height/2
        tintCtx.drawImage(truck_icon, arrTuck[i].route[ arrTuck[i].route.length -1 ].x - (width/2), arrTuck[i].route[ arrTuck[i].route.length -1 ].y - (height/2),  width,height);
        //print in context relative position tintCtx ('cause 0 and 0 for position)
        ctx.drawImage(tintCanvas, 0,0);
    }
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
        for(var j = 0; j < arrLocals[i].route.length; j++){
            //start draw line process
            ctx.beginPath();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.moveTo(arrLocals[i].x, arrLocals[i].y);
            ctx.lineTo(arrLocals[i].route[j].x , arrLocals[i].route[j].y );
            ctx.stroke();
        }
    }


    /** the second loop is for print name over lines **/
    //turn all array locals
    for(var i = 0; i < arrLocals.length; i++){
        //turn all array routs of any locals
        for(var j = 0; j < arrLocals[i].route.length; j++){
            //set color of name
            ctx.fillStyle = "#666";
            ctx.font="7px Arial"
            //print name in x+10 and y - height
            // raiz ( (Xa-Xb)² + (Ya-Yb)² )
            distance = Math.sqrt( Math.pow(arrLocals[i].x -  arrLocals[i].route[j].x, 2)  + Math.pow(arrLocals[i].y -  arrLocals[i].route[j].y, 2) );
            ctx.fillText (distance.toFixed(2)+" km", (arrLocals[i].x + arrLocals[i].route[j].x) / 2, (arrLocals[i].y+arrLocals[i].route[j].y )/2);
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

    //turn all array or truck
    for(var i= 0; i< arrTruck.length; i++){
          // if click is about turck icon
          if ( (x >= arrTruck[i].route[ arrTruck[i].route.length-1].x - 14) && (x <= arrTruck[i].route[ arrTruck[i].route.length-1].x + 14 )
              &&  (y >= arrTruck[i].route[ arrTruck[i].route.length-1].y - 14) && (y <= arrTruck[i].route[ arrTruck[i].route.length-1].y + 14 ) ){

              //show div of info
              if(!$("#div-data").isDisabled)
                $("#div-data").show();

              //set position of div
              $("#div-data").css("top", evt.pageY);
              $("#div-data").css("left", evt.pageX);

              //set name of truck
              $("#truck-name").text(arrTruck[i].name);

              //convert routs in string
              strRouts = "";
              for(var j = 0; j< arrTruck[i].route.length; j++)
                  strRouts+= arrTruck[i].route[j].name+" | ";

              //set route name
              $("#truck-routes").text(strRouts);
              //set cost of route
              $("#truck-cost").text(arrTruck[i].cost);


          }else{
              //if clik is off out truck icon
              if($("#div-data").isDisabled)
                $("#div-data").hide();
          }
    }


}