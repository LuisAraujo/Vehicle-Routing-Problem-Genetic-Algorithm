/*
 Local (Class)
 This class is the local
 attribute:
 name [string] - Is the nome of local
 x [integer] - Is coordinate axes x
 y [interger] - Is coordinate axes y
 type [string] - Is type of local (client or deposit)
 */
function Local(name, x, y, type, demand){
    this.name = name;
    this.x = x;
    this.y = y;
    if( demand == undefined)
        this.demand = 0;
    else
        this.demand = demand;

    this.type = type;
    this.route = [];
}

function Local(name, x, y, type, demand, route){
    this.name = name;
    this.x = x;
    this.y = y;
    if( demand == undefined)
        this.demand = 0;
    else
        this.demand = demand;

    this.type = type;
    this.route = route;
}
/*
 setRoute (Method)
 This is a method od Local
 parameter
 arrRoutes [array] - is a array of type Local
 */
Local.prototype.setRoute = function(arrRoutes){
    this.route = arrRoutes;
}

/*
* getDemand (Method)
* This is a method get Demand of local
*/
Local.prototype.getDemand = function(){
    return this.demand;
}

Local.prototype.getName = function(){
    return this.name;
}

Local.prototype.getX = function(){
    return this.x;
}

Local.prototype.getY = function(){
    return this.y;
}

Local.prototype.getType = function(){
    return this.type;
}


Local.prototype.getRoute = function(arrRoutes){
    return this.route;
}


Local.prototype.copy = function(arrRoutes){
    var newroute = [];
    for (var j=0; j< this.route.length; j++)
        newroute.push( new Local(this.route[j].name, this.route[j].x, this.route[j].y, this.route[j].type, this.route[j].demand));

    return new Local(this.name, this.x, this.y, this.type, this.demand, newroute)
}
