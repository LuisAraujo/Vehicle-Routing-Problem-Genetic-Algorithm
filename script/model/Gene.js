//gene
function Gene(arrLocals, arrTrucks, route, cost){
    this.locals = arrLocals;
    this.trucks = arrTrucks;

    this.route = [];

    if(route != undefined){
      this.route = route;
    }

    this.cost = 0;

    if(cost != undefined)
      this.cost = cost;
}

Gene.prototype.setLocal = function(local_name, truck_name){
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

Gene.prototype.getTruckByName = function(truck_name){
    for(var i=0; i< this.trucks.length; i++){
        if(this.trucks[i].getName() == truck_name){
           return this.trucks[i];
        }
    };
}

Gene.prototype.getLocalByName = function(local_name){
    for(var z=0; z< this.locals.length  ; z++){
        if(this.locals[z].getName() == local_name){
            return this.locals[z];
        }
    };
}

Gene.prototype.startRoute = function(){
    for(var i=0; i< this.trucks.length; i++){
            this.setLocal( this.locals[0], this.trucks[i]);
            //this.setLocal("Central", this.trucks[i].getName());
    }
}

Gene.prototype.endRoute = function(){
    for(var i=0; i< this.trucks.length; i++){
        //this.setLocal("Central", this.trucks[i].getName());
        this.setLocal(this.locals[0], this.trucks[i]);
    }
}


Gene.prototype.getRoute = function(){
   return this.route;
}


Gene.prototype.getCost = function(){

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


Gene.prototype.getLocals = function(){
    return this.locals;
}

Gene.prototype.getTrucks = function(){
    return this.trucks;
}

Gene.prototype.setRoute = function(arrRoutes){
    this.route = arrRoutes;
}


Gene.prototype.getLocalNotCovered = function(){
      var locals = [];
      var localsCov = [];

      for(var i = 1; i< this.locals.length; i++){
          var flag = false;
          for(var j = 0; j< this.route.length; j++){
             if(this.locals[i].getName() == this.route[j][0].getName()){
                 if(flag)
                   console.log("ATENDE MAIS DE UMA VEZ: "+this.route[j][0].getName())

                 flag = true;
                 //break;
             }
          }

          if(!flag){
              locals.push(this.locals[i].getName())
          }else{
              localsCov.push(this.locals[i].getName())
          }
      }

    return [locals, localsCov];

};



Gene.prototype.getTrucksWithCapacity = function(){
    var trucks = [];
    var trucksCap = [];

    for(var l = 0; l< this.trucks.length; l++){
        if(this.trucks[l].getCapacityCurrent() > 0){
            trucks.push(this.trucks[l].getName());
            trucksCap.push(this.trucks[l].getCapacityCurrent());
        }
    }

    return [trucks, trucksCap];
};