function Gene(route){
    this.locals = route;
    this.fitness = 0;
    this.calcFitness();
}

Gene.prototype.calcFitness= function(){

    var fitness = this.locals.getCost();
    this.fitness = fitness;

}


Gene.prototype.crossover = function(anotherGene){
    console.log("CROSSS")

    var tempRoute1 = new Route(copyArray(arrLocals), copyArray(arrTrucks) );
    tempRoute1.startRoute();
    var tempRoute2 = new Route(copyArray(arrLocals), copyArray(arrTrucks) );
    tempRoute2.startRoute();

    var conflit1 = false;
    var conflit2 = false;

   a = function(o, locals, anotherGene, callback){

        //if is pair
        if(o%2 == 0){
            if(locals.route[o][0].getName()!="Central"){
                 console.log(locals.route[o][0].getName(), anotherGene.locals.route[o][0].getName())
                c1 = tempRoute1.setLocal(locals.route[o][0].getName(), locals.route[o][1].getName());
                c2 = tempRoute2.setLocal(anotherGene.locals.route[o][0].getName(), anotherGene.locals.route[o][1].getName());

                if(c1)
                    conflit1 = true;
                if(c2)
                    conflit2 = true;
            }

         //no is pair
        }else{
            //console.log(o, locals.route[o]);
            if(locals.route[o][0].getName()!="Central"){

                console.log(locals.route[o][0].getName(), anotherGene.locals.route[o][0].getName())

                c1 = tempRoute1.setLocal(anotherGene.locals.route[o][0].getName(), anotherGene.locals.route[o][1].getName());
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
                //console.log("conf 1")
               callback(tempRoute1);
            }

            if(conflit2){
                //console.log("conf 2")
                callback(tempRoute2);
            }
        }

    };

    a(0, this.locals, anotherGene, this.repair);


    tempRoute1.endRoute();
    tempRoute2.endRoute();


    return [new Gene(tempRoute1), new Gene(tempRoute2)];

}

/*
Gene.prototype.mutation = function(){

   this.locals.route.forEach(function(item, index){
        var indexRandom = parseInt( (Math.random() * (this.locals.route.length)), 0);
        if (this.locals.route[indexRandom][0].getName() != "Central") {

            if(item[0].getDemand() == this.locals.route[indexRandom][0].getDemand()){

                var localAux = item[0];
                item[0] = this.locals.route[indexRandom][0];
                this.locals.route[indexRandom][0] = localAux;

                console.log("Mutando " + item[0].getName()+" por "+  this.locals.route[indexRandom][0].getName(), indexRandom);
          }
        }

   }, this);

    this.fitness = this.calcFitness();

}*/


Gene.prototype.repair = function(route){
    console.log("***REPARANDO***");
    var l = route.getLocalNotCovered();
    var locals = l[0];
    var t = route.getTrucksWithCapacity();
    var trucks = t[0];

    console.log("LOCAIS NÃO COBERTOS x COBERTOS");
    console.log(locals, l[1]);
    console.log("CAMINHÕES COM CAPACIDADE x CAPACIDADE");
    console.log(trucks, t[1]);

    while (locals.length != 0){
        for(var k = 0; k < trucks.length; k++){
            var conflit = route.setLocal(locals[0],  trucks[k]);
            if(!conflit){
                l = route.getLocalNotCovered();
                locals = l[0];
                t = route.getTrucksWithCapacity();
                trucks = t[0];
                console.log("LOCAIS NÃO COBERTOS x COBERTOS");
                console.log(locals, l[1]);
                console.log("CAMINHÕES COM CAPACIDADE x CAPACIDADE");
                console.log(trucks, t[1]);

                break;
            }
        }
    }

    /* //console.log("locias nao cobertos");
    //console.log(locals, locals.length);

    var aa = function(locals, trucks){
        //console.log("CARALHOOOO... "+locals.length);
        if(locals.length!=0){
            var b = function(j, trucks, locals){

                var conflit = route.setLocal(locals[0], trucks[j].getName(), true);

                if(!conflit){
                    indexLocal++;
                    locals = route.getLocalNotCovered();
                    console.log("locias nao cobertos");
                    console.log(locals, locals.length);
                }

                if((j < trucks.length-1) && (conflit)){
                    setTimeout(
                        function(){b(++j, trucks, locals)
                        },100);
                }
            }

            setTimeout( function(){ aa(locals, trucks) }, 100);
            b(0, trucks, locals);
       }
    }

    aa(locals, trucks);

*/

//this.calcFitness();

}

/*
* verifyConflitLocal [method]
* arrTruck [array] - Array of Trucks
* truck [Truck]
* return 1 if have conflit of truck and 2 for conflit of route
*/
verifyConflitLocal = function(arrTrucks, truck){

}



repairRoute = function (tempRoute1, trucks, conflit, i){

}


