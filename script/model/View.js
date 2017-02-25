/**
 This class
 @constructor
 @param {canvas} canvas - is a reference to canvas of HTML
 @param {context} ctx - is a reference to context of canvas
 */
function View(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = [];
}

/**
  Draw locals icon in map
  @param {array} arrLocals - Is a array of type Local
 */
View.prototype.drawLocals  = function(arrRoute){
    //this is size of image
    var width = 12;
    var height = 20;

    //turn all array
    for(var i = 0; i < arrRoute.route.length; i++){
        //set color of name
        this.ctx.fillStyle = "#000000";
        this.ctx.font="bold 12px Arial";
        //print name in x+10 and y - height
        var str = arrRoute.route[i][0].getName() +" ("+ arrRoute.route[i][0].getDemand()+")";

        //avoid name overflow in axis x
        if(arrRoute.route[i][0].getX(0) + this.ctx.measureText(str).width < 500)
            this.ctx.fillText (str, arrRoute.route[i][0].getX() + 10, arrRoute.route[i][0].getY() - height )
        else{
            this.ctx.fillText (str, arrRoute.route[i][0].getX() - this.ctx.measureText(str).width, arrRoute.route[i][0].getY() - height )
        }


        var icon = local_icon;

        //when is a diposit change icon
        if( arrRoute.route[i][0].getType() == "diposit")
            icon = local_icon2;

        //print image in x - (width/2) and y - height
        this.ctx.drawImage(icon, arrRoute.route[i][0].x - (width/2), arrRoute.route[i][0].y - height, width, height);

    }
}

/**
 Draw truck icon in map  parameter, and print your route and total cost os all truck
 @param {array} arrTruck - Is a array of type Vehicle
 */
View.prototype.drawTruck  = function(arrRoute, mode){

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
            this.ctx.beginPath();
             //set color
            this.ctx.strokeStyle = this.color[i];
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 15]);
             //start point

            this.ctx.moveTo(tempTrucks[i][j][0].getX(),tempTrucks[i][j][0].getY());
             //end point
            this.ctx.lineTo(tempTrucks[i][j+1][0].getX(),tempTrucks[i][j+1][0].getY());
             //finish him! [F-A-T-A-L-I-T-Y]
            this.ctx.stroke();

            this.ctx.setLineDash([0,0]);

            //have local in route (all truck have one local initial = central)
            var width = 20;
            var height = 20;

            //ctx.globalAlpha = 1;
            if(j > 0 && j < tempTrucks[i].length-2){
                this.ctx.fillStyle = this.color[i];
                this.ctx.fill();
                this.ctx.fillRect(  tempTrucks[i][j][0].getX() - ((width/2)*0.7 ) , tempTrucks[i][j][0].getY() - (((height*0.7)/2)*0.7), ( ( width *0.7) *0.7) , ((height*0.7)*0.5) );
                this.ctx.drawImage(truck_icon[0], tempTrucks[i][j][0].getX() - ((width/2)*0.7 ) ,tempTrucks[i][j][0].getY() - ((height/2)*0.7), width*0.7,height*0.7);
            }else if(j > 0){
                //color[i]
                this. ctx.fillStyle = this.color[i];
                this.ctx.fill();
                this.ctx.fillRect(  tempTrucks[i][j][0].getX() - (width/2) , tempTrucks[i][j][0].getY() - (height *0.7/2), width *0.7,height*0.5);
                this.ctx.drawImage(truck_icon[0], tempTrucks[i][j][0].getX() - (width/2) , tempTrucks[i][j][0].getY() - (height/2), width,height);
            }
        }

    }
    this.ctx.fillStyle = "#000";
    this.ctx.fill();
    this.ctx.fillText ("Total cost: "+ arrRoute.getCost().toFixed(2),10, this.canvas.height - 10);

    if(mode==1){

        //functiosn of interaction
        $("#view").click( function(evt){
            view.printDataTruck(evt, arrRoute);
        });

        $("#bt-draw-route").click(function(evt){
            $("#view").show();
            $("#graphs").hide();
            $("#title-view").show();
            view.drawOnlyRoute(arrRoute);
        });

        $("#bt-draw-all").click(function(evt){
            $("#view").show();
            $("#graphs").hide();
            $("#title-view").show();
            view.drawAll(arrRoute);
        });


    }

}

/**
 This is a function of draw Routes lines in map parameter
 @param {array} arrLocals - Is a array of type Locals
 */
View.prototype.drawRoute  = function(arrRoute){
    //turn all array locals
    console.log(arrRoute)
    for(var i = 0; i < arrRoute.route.length; i++){
        //turn all array routs of any locals

        for(var j = 0; j < arrLocals.length; j++){
            //start draw line process
            this.ctx.beginPath();
            //border
            this.ctx.strokeStyle = "#888";
            this.ctx.lineCap = "round";
            this.ctx.lineWidth = 7;
            this.ctx.moveTo(arrRoute.route[i][0].getX(), arrRoute.route[i][0].getY());
            this.ctx.lineTo(arrLocals[j].getX(), arrLocals[j].getY());
            this.ctx.stroke();

            this.ctx.strokeStyle = "#fff";
            this.ctx.lineWidth = 6;
            this.ctx.moveTo(arrRoute.route[i][0].getX(), arrRoute.route[i][0].getY());
            this.ctx.lineTo(arrLocals[j].getX(), arrLocals[j].getY());
            this.ctx.stroke();


        }
    }


    /** the second loop is for print name over lines **/
    //turn all array locals
    for(var i = 0; i < arrLocals.length; i++){
        //turn all array routs of any locals
        var route = arrLocals[i].getRoute();
        for(var j = 0; j < arrLocals[i].route.length; j++){
            //set color of name
            this.ctx.fillStyle = "#000";
            this.ctx.font="7px Arial"
            //print name in x+10 and y - height
            // raiz ( (Xa-Xb)² + (Ya-Yb)² )
            distance = Math.sqrt( Math.pow(arrLocals[i].getX() -  route[j].getX(), 2)  + Math.pow(arrLocals[i].getY() -  route[j].getY(), 2) );
            this.ctx.fillText (distance.toFixed(2)+" km", (arrLocals[i].getX() + route[j].getX()) / 2, (arrLocals[i].getY()+route[j].getY() )/2);
        }
    }
}


/**
 This is a function call by click action, this show info about route parameter
 @param {event} evt - Is a event of mouse (click)
 @param {array} arrTruck - Is a array of type Vehicle
*/
View.prototype.printDataTruck  = function(evt, arrRoute){

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
            console.log(tempTrucks[i][2], tempTrucks.length-2)
            $("#truck-name").text(tempTrucks[i][tempTrucks[i].length-2][1].getName() +" ("+tempTrucks[i][tempTrucks[i].length-2][1].getCapacityTotal()+")");

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

            $("#header-div-data").css("backgroundColor", this.color[i]);
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


/**
 Draw route, locals and trucks
 @param {array} arrRoute - Is a array of type Gene
*/
View.prototype.drawAll  = function(arrRoute){

    this.cleanCanvas();

    //gerating color randomize for leng of trucks
    if(this.color.length == 0)
        arrRoute.trucks.forEach(function(item){
           this.color.push(this.getRandomColor());
        }, this);


    /*functios for draw in canvas*/
    //draw routes
    this.drawRoute(arrRoute);
    //draw locals (icon)
    this.drawLocals(arrRoute);
    //draw truck (icon)
    this.drawTruck(arrRoute);

}


/**
 Draw locals and trucks
 @param {array} arrRoute - Is a array of type Gene
 */
View.prototype.drawOnlyRoute = function(arrRoute, mode){
    this.cleanCanvas();

    //gerating color randomize for leng of trucks
    if(this.color.length == 0)
        arrRoute.trucks.forEach(function(item){
            this.color.push(this.getRandomColor());
        }, this);

    //draw truck (icon)
    this.drawTruck(arrRoute, mode);

    this.drawLocals(arrRoute);


}


/**
 Clean canvas
 */
View.prototype.cleanCanvas = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}


/**
 To generate a random color
*/
View.prototype.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}