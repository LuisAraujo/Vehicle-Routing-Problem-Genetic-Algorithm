function Gene(route){
    this.route = route;

    //fitness?
    this.fitness = this.calcFitness();
}

Gene.prototype.calcFitness= function(){
    var fitness = 0;

    for(var i =0; i< this.route.length; i++)
        fitness += this.route[i].getCost();

    return fitness;

}


Gene.prototype.crossover = function(){

}

Gene.prototype.mutation = function(){

}