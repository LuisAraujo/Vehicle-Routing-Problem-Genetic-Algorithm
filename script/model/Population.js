function Population(arrLocals, arrTruck, sizepopulation) {
    //array of Cromossomo
    this.error = false;

    //Population type Cromossomo
    this.members = [];
    this.generationNumber = 0;
    this.statistic = new Statistic();
    this.selectionmode = MODE_SEL_ELITIST;
    this.variationmode = MODE_VAR_CHANGEROUTE;
    this.oldbest = Infinity;
    this.qtdGenerationWithoutBetter = 0;

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

        if(verbose)
            console.log("*****************************************************************");

        var r = new Gene(locals, trucks);
        r.startRoute();

        for(var i = 1; i < locals.length; i++){

            //sorted a number in array of locals range
            var indexRandom = parseInt( (Math.random() * (trucks.length)), 0);

            if(verbose)
                console.log("tamanho do array "+locals.length+"  sorteado: "+indexRandom);

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
        var cromo = new Cromossomo(r);
        this.members.push(cromo);
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

    $("#numgen").text("Generation "+(this.generationNumber+1));

    //if is the first time, calculate the fitness
    if(this.generationNumber == 0)
        this.members.forEach(function(item){
            item.calcFitness();
        });

    //elitist
    if(this.selectionmode == MODE_SEL_ELITIST){

        //get tow better
        //cross
        var arrChild = [];

        //get parent for 50% to 70%
        var s= parseInt(this.members.length*0.4);
        //get parent for 80% to 100%
        //for(var w= parseInt(this.members.length*0.7); w < this.members.length; w++){
        for(var w= 0; w < this.members.length; w+=2){
            //cross
            child = this.members[w].crossover(this.members[w+1]);
            arrChild.push(child[0]);
            arrChild.push(child[1]);
        }
        //mutate only childs
        this.mutate(arrChild, 0);

        arrChild.sort(function(a, b) {
            return a.fitness - b.fitness;
        });
        arrChild.sort();

        var indexChild =0;
        for(var v= parseInt(this.members.length*0.4); v < this.members.length; v++){
            this.members[v] = arrChild[indexChild++];
        }

        this.sort();

        //roleta
    }else  if(this.selectionmode == MODE_SEL_ROULETTE){

        console.log("fitness: "+this.members[0].fitness);
        //other method selection survival childs

        var arrChildsFather = [];
        //get half parents
        //create childs
        for(var w=0; w < this.members.length; w+=2){
            //cross
            child = this.members[w].crossover(this.members[w+1]);
            arrChildsFather.push(this.members[w]);
            arrChildsFather.push(this.members[w+1]);
            arrChildsFather.push(child[0]);
            arrChildsFather.push(child[1]);
            //arrChild.push(child[0]);
            //arrChild.push(child[1]);
        }

        arrChildsFather.sort(function(a, b) {
            return a.fitness - b.fitness;
        });

        arrChildsFather.sort();


        for(var w=0; w < this.members.length; w++){
            this.members[w] =  arrChildsFather[w];
        }

        this.mutate(this.members, 0);

        /*
         var memberNextGen = [];
         //Roleta
         var sumFitness = 0;

         var arrChild = [];
         for(var w=0; w < this.members.length; w++){
            sumFitness += this.members[w].fitness;
         }


         //choose n members, where n is 20% of population size.
        for(var s=0; s < parseInt(this.members.length*0.2); s++){
             var indexRolate = Math.random() * sumFitness;
             var sumFitnessTemp = 0;
             for(var w=0; w < this.members.length; w++){
                sumFitnessTemp += this.members[w].fitness;s
                if(sumFitnessTemp >= sumFitness){
                    memberNextGen.push(this.members[w]);
                }
             }
         }


         //get parent for 80% to 100%
         for(var w= 0; w < this.members.length; w+=2){
             //cross
             child = this.members[w].crossover(this.members[w+1]);
             arrChild.push(child[0]);
             arrChild.push(child[1]);
         }

         //mutate only childs
         this.mutate(arrChild, 0);

         arrChild.sort(function(a, b) {
            return a.fitness - b.fitness;
         });

        arrChild.sort();

         for(var v= 0; v < this.members.length; v++){
             if(v <  memberNextGen.length)
                this.members[v] = memberNextGen[v];
             else
                 this.members[v] = arrChild[v];
         }

*/

    }

    //this.mutate(this.members, 0);


    //last generation
    if ((this.generationNumber > numGeneration-2) || (this.qtdGenerationWithoutBetter > parseInt(numGeneration*0.3) )){
        this.sort();

        setTimeout(function(){
            this.statistic.addGeneration(this.members);
            var thebest = this.statistic.getTheBest();
            $("#container-pos").show();
            $("#numgen").text("The best fitness: "+thebest.fitness.toFixed(2)+" - Generation "+(thebest.index+1));
            callback(thebest.solution, 1);
        }.bind(this), 1000);

        //return callback(this.members, 1);
        callback(this.members, 1);

        return
    }

    if(verbose)
        var a = function(members, i){
            console.log("fitness: "+members[i].fitness);
            if(i < members.length-1)
                a(members, ++i);
            //setTimeout(a(members, ++i), 100);
        }

    this.generationNumber++;

    this.statistic.addGeneration(this.members);

    var newbest = this.statistic.getTheBest().fitness;
    if( newbest < this.oldbest ){
        this.qtdGenerationWithoutBetter = 0;
        this.oldbest = this.statistic.getTheBest().fitness;
    }else{
        this.qtdGenerationWithoutBetter++;
    }



    callback(this.members, 0);
    window.setTimeout(function(){ this.generation(callback, numGeneration); }.bind(this), 10);

};


Population.prototype.mutate = function(arrMembers, index){
    if(arrMembers.length == 0)
        return;

    //mutation
    mut1 = function(members, p){
        mut2 = function(members, h, p){
            var indexRandom = -1;

            if(Math.random() > 0.8){
                if(h < members[p].locals.route.length-1){
                    mut2(members, ++h, p);
                }
                return;
            }

            for(var j= 0; j< members[p].length; j++){

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
                mut2(members, ++h, p);
                //setTimeout( mut2(members, ++h, p), 1000);
            }

        }

        mut2(members, 0, p);

        if(p < members.length-1){
            mut1(members, ++p);
        }
    }



    //mutation for permutate with own route
    mut3 = function(members, p){
        mut4 = function(members, h, p){

            if(Math.random() > 0.8){
                if(h < members[p].locals.route.length-3){
                    mut4(members, ++h, p);
                }
                return;
            }

            if( (members[p].locals.route[h][0].getName() != "Central") && (members[p].locals.route[h+2][0].getName() != "Central") ){

                var localAux = members[p].locals.route[h];
                //var index = parseInt(Math.random() * members[p].locals.route);
                members[p].locals.route[h] = members[p].locals.route[h+2];
                members[p].locals.route[h+2] = localAux;

            }

            if(h < members[p].locals.route.length-3){
                members[p].calcFitness();
                mut4(members, ++h, p);
                //setTimeout( mut4(members, ++h, p), 1000);
            }
        }

        mut4(members, 0, p);

        if(p < members.length-1){
            members[p].calcFitness();
            mut3(members, ++p);
            //setTimeout( mut3(members, ++p),1000);
        }
    }


    if(this.variationmode == MODE_VAR_CHANGEROUTE)
        mut1(arrMembers, index);
    else if(this.variationmode == MODE_VAR_CHANGEORDERROUTE)
        mut3(arrMembers, index);

};


Population.prototype.setSeletionMode = function(selectionmode){
    this.selectionmode = selectionmode;
}

Population.prototype.setVariationMode = function(variationmode){
    this.variationmode = variationmode;
}

Population.prototype.restartStatistic = function(){
    this.statistic = new Statistic();
}