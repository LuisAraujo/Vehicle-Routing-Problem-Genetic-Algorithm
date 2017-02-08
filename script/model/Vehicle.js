/*
 Vehicle (Class)
 This class is the vehicle
 attribute:
 name [string] - Is the nome of vehicle
 capacity [integer] - Is capacity of vehicle (tonne)
 routes [array] - Is a array of type Local for create the route of vehicle
*/
function Vehicle(name, capacity, route){

    this.name = name;
    this.capacity = capacity;
    //verify if route is valid
    this.route = this.setRoute(route);
    //calculating cost route
    this.cost = this.calcCostRoute();
}

/*
* getCostRoute (Method)
* This method return cost of route
*/
Vehicle.prototype.getCostRoute = function(){
    return this.cost;
}

/*
* setRoute(Method)
* This method set and verify routes
*/
Vehicle.prototype.setRoute = function(arrRoutes){
    //The total demand of all points in routes not should superate the caparity of truck
    var totalDemand = 0;

    for(var i=0; i< arrRoutes.length; i++){
      totalDemand += arrRoutes[i].getDemand();
     }

    if(this.capacity < totalDemand){
        throw {name : "Error 001", message : "This Demand is bigger who capacity of truck '"+this.name+"'! "+this.capacity+"/"+totalDemand};
    }else{
        return arrRoutes;
    }
}

/*
* calcCostRoute (Method)
* This method to calculate the cost of route
*/
Vehicle.prototype.calcCostRoute = function(){
    var cost = 0;
    //calculate cost of route
    for(var i=0; i<this.route.length-1; i++){
        cost += Math.sqrt( Math.pow( this.route[i].x -  this.route[i+1].x, 2)  + Math.pow(this.route[i].y -  this.route[i+1].y, 2) );
    }

    return cost;
}

/** getters **/

Vehicle.prototype.getCapacity = function(){
    return this.capacity;
}



Vehicle.prototype.getName = function(){
    return this.name;
}



Vehicle.prototype.getRoute = function(){
    return this.route;
}

Vehicle.prototype.getCost = function(){
    return this.cost;
}


Vehicle.prototype.addLocal = function(local){
    this.route.push(local);
    this.cost = this.calcCostRoute();
}


Vehicle.prototype.getDemandCovered = function(){
    var demand = 0;
    //get total value of demand in route this truck
    for(var i =0; i<this.route.length; i++){
        demand += this.route[i].getDemand();
    }

    return demand;

}


Vehicle.prototype.copy = function(){
    var newroute = [];
    for (var j=0; j< this.route.length; j++)
        newroute.push(this.route[j].copy());

    return new Vehicle(this.name, this.capacity, newroute);
}


/*
 * verifyHaveCapacity  [Method]
 * this method verify if truck have capacity for more one demand
 * truck [Vehicle] - a truck who you wanna verify
 * newDemand [integer] - the value of new demand
 */
Vehicle.prototype.verifyHaveCapacity = function(newDemand){

    //get total value of demand in route this truck
    var demand = this.getDemandCovered();

    //if have capacity for new demand

    if(this.getCapacity() >= demand + newDemand ){
        return true;
    }

    return false;
}

