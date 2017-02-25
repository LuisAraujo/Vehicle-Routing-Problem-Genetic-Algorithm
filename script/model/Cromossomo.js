//cromossomo
function Cromossomo(route, fitness){

    //Gene
    this.locals = route;

    if(fitness != undefined){
        this.fitness = 0;
        this.calcFitness();
    }else{
        this.fitness = fitness;
    }
}

Cromossomo.prototype.calcFitness= function(){

    var fitness = this.locals.getCost();
    //console.log(fitness)
    this.fitness = fitness;

}

Cromossomo.prototype.crossover = function(anotherGene){

    var tempRoute1 = new Gene(copyArray(arrLocals), copyArray(arrTrucks) );
    tempRoute1.startRoute();
    var tempRoute2 = new Gene(copyArray(arrLocals), copyArray(arrTrucks) );
    tempRoute2.startRoute();

    var conflit1 = false;
    var conflit2 = false;

   a = function(o, locals, anotherGene, callback){

        //if is pair
        if(o%2 == 0){
            if(locals.route[o][0].getName()!="Central"){

                 if(verbose)
                    console.log(locals.route[o][0].getName(), anotherGene.locals.route[o][0].getName())

                //get route of same name
                var selectedGene = null;
                for(var x = 0; x < anotherGene.locals.route.length; x++){
                   if(anotherGene.locals.route[x][0].getName() == locals.route[o][0].getName()){
                       if(verbose)
                         console.log("gene fouded");

                       selectedGene = anotherGene.locals.route[x];
                       break;
                   }
                }


                c1 = tempRoute1.setLocal(locals.route[o][0].getName(), locals.route[o][1].getName());
                //c2 = tempRoute2.setLocal(anotherGene.locals.route[o][0].getName(), anotherGene.locals.route[o][1].getName());
                c2 = tempRoute2.setLocal(selectedGene[0].getName(), selectedGene[1].getName());
                if(c1)
                    conflit1 = true;
                if(c2)
                    conflit2 = true;
            }

         //no is pair
        }else{
            //console.log(o, locals.route[o]);
            if(locals.route[o][0].getName()!="Central"){
                if(verbose)
                    console.log(locals.route[o][0].getName(), anotherGene.locals.route[o][0].getName())


                //get route of same name
                var selectedGene = null;
                anotherGene.locals.route.forEach(function(item){
                    if(item[0].getName() == locals.route[o][0].getName()){
                        if(verbose)
                            console.log("gene fouded");

                        selectedGene = item;
                    }
                });

                c1 = tempRoute1.setLocal(selectedGene[0].getName(), selectedGene[1].getName());
                c2 = tempRoute2.setLocal(locals.route[o][0].getName(), locals.route[o][1].getName());

                if(c1)
                    conflit1 = true;
                if(c2)
                    conflit2 = true;
            }

        }

        if(o < locals.route.length-1){
            a(++o, locals, anotherGene, callback);
        }else{
            if(conflit1){
               callback(tempRoute1);
            }

            if(conflit2){
                callback(tempRoute2);
            }
        }

    };

    a(0, this.locals, anotherGene, this.repair);


    tempRoute1.endRoute();
    tempRoute2.endRoute();


    return [new Cromossomo(tempRoute1), new Cromossomo(tempRoute2)];

}

/*
Cromossomo.prototype.mutation = function(){

}*/

var breakLoop = false;
Cromossomo.prototype.repair = function(route){
    if(verbose)
        console.log("***REPARANDO***");
    var l = route.getLocalNotCovered();
    var locals = l[0];
    var t = route.getTrucksWithCapacity();
    var trucks = t[0];

    if(verbose){
        console.log("LOCAIS NÃO COBERTOS x COBERTOS");
        console.log(locals, l[1]);
        console.log("CAMINHÕES COM CAPACIDADE x CAPACIDADE");
        console.log(trucks, t[1]);
    }



    while( (locals.length != 0) && (breakLoop == false) ){
        //var l = 0;
        for(var k = 0; k < trucks.length; k++){
            var conflit = route.setLocal(locals[0],  trucks[k]);
            if(!conflit){
                l = route.getLocalNotCovered();
                locals = l[0];
                t = route.getTrucksWithCapacity();
                trucks = t[0];
                if(verbose){
                    console.log("LOCAIS NÃO COBERTOS x COBERTOS ...");
                    console.log(locals, l[1]);
                    console.log("CAMINHÕES COM CAPACIDADE x CAPACIDADE ...");
                    console.log(trucks, t[1]);
                }

                break;
            }else{

                /*
                if(l < locals.length-1 ){
                    l++;
                    k = k-1;
                    continue;
                }else{
                    breakLoop = true;
                    break;
                }*/
            }

        }
    }

    if(breakLoop){
        alert("Não foi possivel reparar a rota!");
    }

}



Cromossomo.prototype.copy = function(){
    newlocal = new Gene(copyArray(this.locals.locals), copyArray(this.locals.trucks), this.locals.route, this.locals.cost);
    return new Cromossomo(newlocal, this.fitness);

}



