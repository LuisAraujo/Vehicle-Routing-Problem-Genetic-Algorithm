var verbose = false;
function Population(arrLocals, arrTruck, sizepopulation) {
    //array of Gene
    this.members = [];
    this.generationNumber = 0;

    arrPopulation = [];
    //to complete population desired
    while(this.members.length < sizepopulation){
        //make copy of arrays for not modify the data origial
        var locals = copyArray(arrLocals)
        var trucks = copyArray(arrTruck);
        //count
        qtdLocalCovered = 0;
        if(verbose)
        console.log("**********************************************************************");
        //while all locals not is covered
        while(qtdLocalCovered < locals.length-1){


            //sorted a number in array of locals range
            var indexRandom = parseInt( (Math.random() * (locals.length-1)), 0) + 1;

            if(verbose)
            console.log("tamanho do array "+locals.length+"  sorteado: "+indexRandom)

            //save the old value
            var oldqtdLocalCovered =qtdLocalCovered;

            //verifying if local is free (no one truck cover yet)
            if(verifyLocalIsFree( locals[indexRandom], trucks)){
                if(verbose)
                console.log("Local is free: "+indexRandom)
                //trun all trucks
                for(var i =0; i<trucks.length; i++){
                    //verifying if the specific truck have capacity
                    if(trucks[i].verifyHaveCapacity(locals[indexRandom].getDemand())){
                        if(verbose)
                        console.log("Truck "+trucks[i].getName()+" have  capacity C ("+trucks[i].getCapacity()+"), DC ("+trucks[i].getDemandCovered()+"), DA("+locals[indexRandom].getDemand()+")")
                        //addlocal in route of this truck
                        trucks[i].addLocal(locals[indexRandom]);
                        //yeah!!
                        qtdLocalCovered++;
                        break;
                    }else{
                        if(verbose)
                        console.log("Truck "+trucks[i].getName()+" NO have capacity C ("+trucks[i].getCapacity()+"), DC ("+trucks[i].getDemandCovered()+"), DA("+locals[indexRandom].getDemand()+")")
                    }

                }
                //don't have truck for cover any local then it is a invalid route, restart...
                if(oldqtdLocalCovered == qtdLocalCovered){
                    if(verbose)
                    console.log(">>>>RESTART for imposible cover");
                    var locals = copyArray(arrLocals)
                    var trucks = copyArray(arrTruck);
                    //count
                    qtdLocalCovered = 0;
                }
            }else{
                if(verbose)
                console.log("Local is NOT free: "+indexRandom)
            }
        }
        //insert array truck gerated in array of population
        var gene = new Gene(trucks);
        this.members.push(gene);
    }

};


Population.prototype.sort = function() {
    this.members.sort(function(a, b) {
        return a.fitness - b.fitness;
    });
};

Population.prototype.showConsole = function() {
    for(var i = 0; i < this.members.length; i++)
      console.log(i+" - "+this.members[i].fitness.toFixed(2));
};

Population.prototype.generation = function(){
    this.sort();

    var childs = this.members[0].crossover(this.members[1]);

    console.log(childs);

    //cruzamento (Gene.prototype.crossover) dos melhores genes

    //for para relaizar a mutação (Gene.prototype.mutation)
        //revifica se tem solucao e retorna


    //this.generationNumber++

    //var scope = this;
    //setTimeout(function() {
    //    scope.generation();
    //}, 20);

};


