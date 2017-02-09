function Gene(trucks){
    this.trucks = trucks;

    //fitness?
    this.fitness = this.calcFitness();
}

Gene.prototype.calcFitness= function(){
    var fitness = 0;

    for(var i =0; i< this.trucks.length; i++)
        fitness += this.trucks[i].getCost();

    return fitness;

}


Gene.prototype.crossover = function(anotherGene){
    var tempRoute1 = [];
    var tempRoute2 = [];
    var qtdlocalTotal = 0;
    var qtdlocalTotalInChilds = 0;

    /**first child **/
    for(var i = 0; i< this.trucks.length; i++){
        qtdlocalTotal += this.trucks[i].getRoute().length*2;
        //if is pair
        if(i%2 == 0){
             //child 1
             if(!verifyConflitLocal(tempRoute1, this.trucks[i]) ){
                //verify it the route and the truck is e same route
                tempRoute1.push( this.trucks[i]);
                 qtdlocalTotalInChilds += this.trucks[i].getRoute().length;
                 console.log("NO Conflit with "+this.trucks[i].name)
             }else{
                 console.log("Conflit with "+this.trucks[i].name)
             }

            //child 2
            if(!verifyConflitLocal(tempRoute2, anotherGene.trucks[i]) ){
                //verifica se a rota e o caminhão já estão nessa rota
                tempRoute2.push(anotherGene.trucks[i]);
                qtdlocalTotalInChilds += anotherGene.trucks[i].getRoute().length;
                console.log("NO Conflit with "+this.trucks[i].name)
            }else{
                console.log("Conflit with "+this.trucks[i].name)
            }

        }else{
            //child 1
            if(!verifyConflitLocal(tempRoute2, this.trucks[i]) ){
                //verifica se a rota e o caminhão já estão nessa rota
                tempRoute2.push(this.trucks[i]);
                console.log("NO Conflit with "+this.trucks[i].name)
                qtdlocalTotalInChilds += this.trucks[i].getRoute().length;
            }else{
                console.log("Conflit with "+this.trucks[i].name)
            }

            //child 2
            if(!verifyConflitLocal(tempRoute1, anotherGene.trucks[i]) ){
                //verifica se a rota e o caminhão já estão nessa rota
                tempRoute1.push( anotherGene.trucks[i]);
                qtdlocalTotalInChilds += anotherGene.trucks[i].getRoute().length;
                console.log("NO Conflit with "+this.trucks[i].name)
            }else{
                console.log("Conflit with "+this.trucks[i].name)
            }
        }
    }

    /**secound child
    for(var i = 0; i< this.trucks.length; i++){
        qtdlocalTotal += this.trucks[i].getRoute().length;
        //invert location
        if(i%2 == 0){
            if(!verifyConflitLocal(tempRoute2, anotherGene.trucks[i]) ){
                //verifica se a rota e o caminhão já estão nessa rota
                tempRoute2.push(anotherGene.trucks[i]);
                qtdlocalTotalInChilds += anotherGene.trucks[i].getRoute().length;
                console.log("NO Conflit with "+this.trucks[i].name)
            }else{
                console.log("Conflit with "+this.trucks[i].name)
            }
        }else{
            if(!verifyConflitLocal(tempRoute1, anotherGene.trucks[i]) ){
                //verifica se a rota e o caminhão já estão nessa rota
                tempRoute1.push( anotherGene.trucks[i]);
                qtdlocalTotalInChilds += anotherGene.trucks[i].getRoute().length;
                console.log("NO Conflit with "+this.trucks[i].name)
            }else{
                console.log("Conflit with "+this.trucks[i].name)
            }
        }
    }
     **/

    console.log(qtdlocalTotal, qtdlocalTotalInChilds);

    return [new Gene(tempRoute1), new Gene(tempRoute2)];
}

Gene.prototype.mutation = function(){

}


verifyConflitLocal = function(arrTrucks, truck){
    var conflit = false;
    //get route of truck
    var routeOftruck  = truck.getRoute();
    for(var l = 0; l < arrTrucks.length; l++){
        //using same truck
        if(truck.name == arrTrucks[l].name){
            return true;
        }

        //pass same route
        var routes = arrTrucks[l].getRoute();
        for(var i = 0; i < routes.length; i++){
            for(var j = 0; j < routeOftruck.length; j++){
                //console.log(routes[i].name, routeOftruck[j].name)
                if((routes[i].name == routeOftruck[j].name) && (routes[i].name !="Central"))
                    return true;
            }
        }
    }
    return false;
}