function Population(arrLocals, arrTruck, sizepopulation) {
    //array of Gene
    this.error = false;
    //type Gene
    this.members = [];
    this.generationNumber = 0;
    this.statistic = new Statistic();
    this.selectionmode = MODE_SEL_ELITIST;
    this.variationmode = MODE_VAR_CHANGEROUTE;

    var d = 0;
    var c = 0;
    arrLocals.forEach(function(iten){
       d += iten.getDemand();
    });

    arrTruck.forEach(function(iten){
        c += iten.getCapacityTotal();
    });

    if(c < d){
        alert("You need have a demand ("+d+") equals or bigger who capacity("+c+")");
        this.error = true;
        return;
    }


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


Population.prototype.generation = function(callback, numGeneration){

    var procedSelection = 2;

    console.log("Generation: "+this.generationNumber);
    //cross

    //elitist
    if(this.selectionmode == MODE_SEL_ELITIST){
        //get tow better
        var childs = this.members[0].crossover(this.members[1]);
        this.members[this.members.length - 2] = childs[0];
        this.members[this.members.length - 1] = childs[1];

    }else  if(this.selectionmode == MODE_SEL_SURVIVAL){

        //other method selection survival childs
        var arrChild = [];
        for(var s=0; s < this.members.length/2; s++){
            for(var w=this.members.length/2; w< this.members.length; w++){
                if(s != w){
                    child = this.members[w].crossover(this.members[s]);
                    arrChild.push(child[0]);
                    arrChild.push(child[1]);
                }
            }
        };

        arrChild.sort(function(a, b) {
            return a.fitness - b.fitness;
        });

        arrChild.sort();

        for(var j=0; j < this.members.length; j++){
             this.members[j] = arrChild[j];
        }

    }

    //mutate
    this.mutate(this.members, 0);

    //last generation
    if(this.generationNumber > numGeneration-2){
        this.sort();
        /*this.members.forEach(function(item){
            console.log("fitness: "+item.fitness);
        });*/
        this.statistic.addGeneration(this.members);
        this.statistic.showTheFitnessByGeneration();
        this.statistic.showTheBestFitnessByGeneration();

        return callback(this.members, 1);
    }

    if(verbose)
        var a = function(members, i){
            console.log("fitness: "+members[i].fitness);
            if(i < members.length-1)
                setTimeout(a(members, ++i), 100);
        }

    //a(this.members, 0);

    this.generationNumber++;

    this.statistic.addGeneration(this.members);

    callback(this.members, 0);
    window.setTimeout(function(){ this.generation(callback, numGeneration); }.bind(this), 1000);

};


Population.prototype.mutate = function(arrMembers, index){

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
                var localAux = members[p].locals.route[h][1];
                members[p].locals.route[h][1] = members[p].locals.route[indexRandom][1];
                members[p].locals.route[indexRandom][1] = localAux;
            }


            if(h < members[p].locals.route.length-1){
                members[p].calcFitness();
                setTimeout( mut2(members, ++h, p), 1000);
            }

        }

        mut2(members, 0, p);

        if(p < members.length-1){
            setTimeout( mut1(members, ++p),1000);
        }
    }



    //mutation for permutate with own route
    mut3 = function(members, p){
        mut4 = function(members, h, p){

          if( (members[p].locals.route[h][0].getName() != "Central") && (members[p].locals.route[h+2][0].getName() != "Central") ){

             var localAux = members[p].locals.route[h];
            members[p].locals.route[h] = members[p].locals.route[h+2];
            members[p].locals.route[h+2] = localAux;

          }

            if(h < members[p].locals.route.length-3){
                members[p].calcFitness();
                setTimeout( mut4(members, ++h, p), 1000);
            }
        }

        mut4(members, 0, p);

        if(p < members.length-1){
            setTimeout( mut3(members, ++p),1000);
        }
    }


    if(this.variationmode == MODE_VAR_CHANGEROUTE)
        mut1(arrMembers, index);
    else if(this.variationmode == MODE_VAR_CHANGEORDERROUTE)
        mut3(arrMembers, index);

    //end mutation

};


Population.prototype.setSeletionMode = function(selectionmode){
    this.selectionmode = selectionmode;
}

Population.prototype.setVariationMode = function(variationmode){
    this.variationmode = variationmode;
}

