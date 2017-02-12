function Route(arrLocals, arrTrucks){
    this.locals = arrLocals;
    /*
    arrLocals.forEach(function(item){
        this.locals.push(item.copy());
    }, this);
    */
    this.trucks = arrTrucks;
    /*
    arrTrucks.forEach(function(item){
        this.trucks.push(item.copy());
    }, this);
    */

    this.route = [];
    this.cost = 0;
}

Route.prototype.setLocal = function(local_name, truck_name){
    var conflit = false;

    if(typeof truck_name == 'string')
        tempTruck = this.getTruckByName(truck_name);
    else{
        tempTruck = truck_name;
    }

    //TRUCKS
    if(typeof local_name == 'string')
        tempLocal = this.getLocalByName(local_name);
    else
        tempLocal = local_name;


    if((tempTruck!=null) && (tempLocal != null)){

        if(tempTruck.getCapacityCurrent() >= tempLocal.getDemand()){
            tempTruck.addDemand( tempLocal.getDemand());
            this.route.push( [tempLocal,  tempTruck] );
        }else{
            //console.log("error em "+local_name + " "+ truck_name+ " "+ ch );
            return true;
        }
    }else{
        console.log("truck or local is null "+local_name + " "+ truck_name );
    }


    return false;
}

Route.prototype.getTruckByName = function(truck_name){
    for(var i=0; i< this.trucks.length; i++){
        if(this.trucks[i].getName() == truck_name){
           return this.trucks[i];
        }
    };
}

Route.prototype.getLocalByName = function(local_name){
    for(var z=0; z< this.locals.length  ; z++){
        if(this.locals[z].getName() == local_name){
            return this.locals[z];
        }
    };
}

Route.prototype.startRoute = function(){
    for(var i=0; i< this.trucks.length; i++){
            this.setLocal( this.locals[0], this.trucks[i]);
            //this.setLocal("Central", this.trucks[i].getName());
    }
}

Route.prototype.endRoute = function(){
    for(var i=0; i< this.trucks.length; i++){
        //this.setLocal("Central", this.trucks[i].getName());
        this.setLocal(this.locals[0], this.trucks[i]);
    }
}


Route.prototype.getRoute = function(){
   return this.route;
}


Route.prototype.getCost = function(){

    this.cost = 0;
    var tempTrucks = [];


    for(var i = 0; i< this.trucks.length; i++){
        for(var j = 0; j< this.route.length; j++){
            if(this.route[j][1].getName() == this.trucks[i].getName()){
                if(tempTrucks[i] == undefined){
                    tempTrucks[i] = [];
                }
                tempTrucks[i].push(this.route[j]);
            }
        }
    };

    for(var i=0; i< tempTrucks.length; i++){

        for(var j=0; j< tempTrucks[i].length-1; j++){
           this.cost += Math.sqrt( Math.pow( tempTrucks[i][j][0].getX() -  tempTrucks[i][j+1][0].getX(), 2)  + Math.pow(tempTrucks[i][j][0].getY() -  tempTrucks[i][j+1][0].getY(), 2) );
        };
    }

    return this.cost;
}


Route.prototype.getLocals = function(){
    return this.locals;
}

Route.prototype.getTrucks = function(){
    return this.trucks;
}

Route.prototype.setRoute = function(arrRoutes){
    this.route = arrRoutes;
}


Route.prototype.getLocalNotCovered = function(){
      var locals = [];

      for(var i = 0; i< this.locals.length; i++){
          var flag = false;
          for(var j = 0; j< this.route.length; j++){
             if(this.locals[i].getName() == this.route[j][0].getName())
                 flag = true;
          }

          if(!flag){
              locals.push(this.locals[i].getName())
          }
      }

    return locals;

};



Route.prototype.getTrucksWithCapacity = function(){
    var trucks = [];

    for(var i = 0; i< this.trucks.length; i++){
        if(this.trucks[i].getCapacityCurrent() > 0){
            trucks.push(this.trucks[i].getName());
        }
    }

    return trucks;
};