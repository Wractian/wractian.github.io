//Developer heck

//stupid code for a stupid website
function beeButton(button) {
    "use strict";
    if (button === 1) {
        data.bees.beeArray[0].addTrait(Math.round(Math.random()*4));
        data.bees.beeArray[0].removeDuplicateTraits();
        document.getElementById("result1").innerHTML = data.bees.beeArray[0].returnTraitNames();

    } else if (button === 2) {
        createBee(data.bees.beeArray[0], data.bees.beeArray[1]);
        data.bees.beeArray[data.bees.beeArray.length-1].removeDuplicateTraits();
        document.getElementById("result2").innerHTML = data.bees.beeArray[data.bees.beeArray.length-1].returnTraitNames();
        $(".basicBee").css("visibility","");
    } else {
        data.bees.beeArray[1].addTrait(Math.round(Math.random()*4));
        data.bees.beeArray[1].removeDuplicateTraits();
        document.getElementById("result3").innerHTML = data.bees.beeArray[1].returnTraitNames();
    }
}


//Test Developer function, used for creating a bee using two parents traits as a baseline
function createBee(parent1, parent2) {
    "use strict";
    var id;
    var i = 0;
    var traitPool = [];
    for (i = 0; i < parent1.traits.length; i += 1) {
        traitPool.push(parent1.traits[i]);
    }
    for (i = 0; i < parent2.traits.length; i += 1) {
        traitPool.push(parent2.traits[i]);
    }
    id=data.bees.newBee();
    for (i = 0; i < traitPool.length; i += 1) {
        data.bees.beeArray[id].addTrait(traitPool[i].id);
    }
}