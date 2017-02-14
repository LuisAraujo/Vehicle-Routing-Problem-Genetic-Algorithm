function Statistic(){
    this.generation = [];
}


Statistic.prototype.getTheBest = function(){
    lowFitnes = Infinity;
    theBest = [];
    for(var i=0; i<this.generation.length; i++){
        if(this.generation[i][0].route.fitness < lowFitnes){
            lowFitnes = this.generation[i][0].route.fitness;
            theBest = this.generation[i][0].route;
        }
    }

    return theBest;
}


Statistic.prototype.getTheFitnessByGeneration = function(callback){
    bestFitness = [];

    for(var i=0; i<this.generation.length; i++){
        var tempFitness = this.generation[i][0].fitness;
        bestFitness.push(tempFitness);

        if(callback!=undefined)
            callback(tempFitness, i);
    }

    return bestFitness;
}


Statistic.prototype.getAVGFitnessByGeneration = function(callback){
    var avgFitness = [];

    for(var i=0; i<this.generation.length; i++){
        var tempSum = 0;

        for(var j=0; j<this.generation[i].length; j++){
            tempSum += this.generation[i][j].fitness;
        }

        tempSum = tempSum/this.generation.length ;
        avgFitness.push(tempSum);

        if(callback!=undefined)
            callback(tempSum, i);
    }


    return avgFitness;
}


Statistic.prototype.addGeneration = function(generation){
    var temgen = []
    generation.forEach(function(item){
        temgen.push(item.copy());
    });

    this.generation.push(temgen);
}

Statistic.prototype.showTheFitnessByGeneration = function(){

    this.getAVGFitnessByGeneration(function(item, index){
        console.log("Generation "+index+" - avg: "+ item);
    })
}


Statistic.prototype.showTheBestFitnessByGeneration = function(){

    this.getTheFitnessByGeneration(function(item, index){
        console.log("The best of generation "+index+" : "+ item);
    })
}