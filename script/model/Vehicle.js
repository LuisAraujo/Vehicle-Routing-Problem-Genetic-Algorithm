/*
 Vehicle (Class)
 This class is the vehicle
 attribute:
 name [string] - Is the nome of vehicle
 capacity [integer] - Is capacity of vehicle (tonne)
 routes [array] - Is a array of type Local for create the route of vehicle
*/
function Vehicle(name, capacityTotal, capacityCurrent){

    this.name = name;
    this.capacityTotal = capacityTotal;

    if(capacityCurrent != undefined)
        this.capacityCurrent = capacityCurrent;
    else
        this.capacityCurrent = capacityTotal;

}

/** setters and getters **/

Vehicle.prototype.setCapacityTotal = function(capacityTotal){
    this.capacityTotal = capacityTotal;
}

Vehicle.prototype.setCapacityCurrent = function(capacityCurrent){
    this.capacityCurrent = capacityCurrent;
}


Vehicle.prototype.getCapacityTotal = function(){
    return this.capacityTotal;
}

Vehicle.prototype.getCapacityCurrent = function(){
    return this.capacityCurrent;
}


Vehicle.prototype.getName = function(){
    return this.name;
}

Vehicle.prototype.addDemand = function(demand){
    this.capacityCurrent -= demand;
}

Vehicle.prototype.getDemand = function(){
    var tempCapacityCurrente = 0;

    if(this.capacityCurrent < 0)
      tempCapacityCurrente = -this.capacityCurrent;
    else
      tempCapacityCurrente = this.capacityCurrent;

    return this.capacityTotal - tempCapacityCurrente;
}


Vehicle.prototype.copy = function(){
      return new Vehicle(this.name, this.capacityTotal, this.capacityCurrent);
}




