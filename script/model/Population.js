var verbose = false;
function Population(arrLocals, arrTruck, sizepopulation) {
    //array of Gene
    this.members = [];
    this.generationNumber = 0;

    arrPopulation = [];
    //to complete population desired
    while(this.members.length < sizepopulation){
        //make copy of arrays for not modify the data origial
        var locals = copyArray(arrLocals);
        var trucks = copyArray(arrTruck);
        //count

        if(verbose)
        console.log("*****************************************************************");
        //while all locals not is covered
        var r = new Route(locals, trucks);
        r.startRoute();

        for(var i = 1; i < locals.length; i++){

            //sorted a number in array of locals range
            var indexRandom = parseInt( (Math.random() * (trucks.length)), 0);

            if(verbose)
                console.log("tamanho do array "+locals.length+"  sorteado: "+indexRandom)

            if(trucks[indexRandom].getCapacityCurrent() >= locals[i].getDemand()){

                r.setLocal(locals[i], trucks[indexRandom]);
                //r.setLocal(locals[i].getName(), trucks[indexRandom].getName());

            }else{

                //try again
                i = i-1;
                continue;
            }
        }


        r.endRoute();
        //insert array truck gerated in array of population
        var gene = new Gene(r);
        this.members.push(gene);
    }


    this.sort();

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

Population.prototype.generation = function(callback){

    console.log("Generation: "+this.generationNumber);
    //cross
    var childs = this.members[0].crossover(this.members[1]);

    this.members[this.members.length - 2] = childs[0];
    this.members[this.members.length - 1] = childs[1];


    //mutation
    mut1 = function(members, p){

        mut2 = function(members, h, p){
            var indexRandom = -1;

            for(var j= 0; j< members.length; j++){
               if(members[p].locals.route[h][0].getDemand() == members[p].locals.route[j][0].getDemand()
                  && members[p].locals.route[h][1].getName() != members[p].locals.route[j][1].getName()
                  && members[p].locals.route[h][0].getName()  != members[p].locals.route[j][0].getName()
                  && members[p].locals.route[h][0].getName() != "Central"
                ){
                   indexRandom = j;
                   break;
               }
            }


            if(indexRandom != -1){

               // console.log("Em "+p+" - MUTATION... by "+ members[p].locals.route[h][1].getName()+" for "+members[p].locals.route[indexRandom][1].getName());

                var localAux = members[p].locals.route[h][1];
                members[p].locals.route[h][1] = members[p].locals.route[indexRandom][1];
                members[p].locals.route[indexRandom][1] = localAux;
            }


            if(h < members[p].locals.route.length-1){
                members[p].calcFitness();
                setTimeout(mut2(members, ++h, p), 100);
            }

        }

        mut2(members, 0, p);

        if(p < members.length-1){
         setTimeout(mut1(members, ++p),100);
        }
    }

    mut1(this.members, 0);
    //end mutation


    //last generation
    if(this.generationNumber > 100){
        this.sort();
        this.members.forEach(function(item){
            console.log("fitness: "+item.fitness);
        });
        return callback(this.members);
    }


    var a = function(members, i){
        console.log("fitness: "+members[i].fitness);
        if(i < members.length-1)
            setTimeout(a(members, ++i), 100);
    }

    //a(this.members, 0);

    this.generationNumber++;

    callback(this.members);
    window.setTimeout(function(){ this.generation(callback); }.bind(this), 1000);




};


