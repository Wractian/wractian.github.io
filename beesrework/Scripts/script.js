//Global variable
;(function () {
    window.data = [];
    data.bees = {};
    data.bees.beeArray = [];
}());




function Trait(id) {
    "use strict";
    this.id = id;
    this.name = traitList[this.id].name;
}
Trait.prototype = {
    //returns what traits do as a string
    desc: function() {
        "use strict";
        console.log(traitList[this.id].desc);
    },
    pushArray: function() {
        "use strict";
        console.log("pushed");
    }
};

function Bee(id) {
    "use strict";
    this.id = id;
    this.traits = [];
}
Bee.prototype = {
    //Lists off all the traits a certain object contains, delete this later
    returnTraitNames: function() {
        "use strict";
        var i;
        var trait;
        var string = "";

        for (i = 0; i < this.traits.length; i += 1) {
            trait = this.traits[i];
            if (string !== "") {
                string = string + ", ";
            }
            string = string + trait.name + "";
        }
        return (string);

    },
    //Creates new trait with id of the number of traits, replace this with a better system, errors will be sent to the console with the id
    addTrait: function(id) {
        "use strict";
        if ((id < traitList.length) && (id >= 0)) {
            this.traits.push(new Trait(id));
        } else {
            console.warn("Illegal trait id (" + id + ")");
        }
    },
};








//Micro-Database for storing files
var traitList = [
    { desc: "Active during the night", name: "Nocturnal" },
    { desc: "Active period reduced", name: "Sleepy" },
    { desc: "Productivity reduced, active period increased", name: "Insomnia" },
    { desc: "Minor increases to productivity and active period", name: "Hard-Worker" },
    { desc: "Productivity heavily reduced", name: "Sloth" },
];





//Developer heck


data.bees.beeArray[0] = new Bee(0);
data.bees.beeArray[1] = new Bee(1);
data.bees.beeArray[0].addTrait(0);
data.bees.beeArray[0].addTrait(3);
data.bees.beeArray[1].addTrait(4);



function beeButton(button) {
    "use strict";
    if (button === 1) {
        document.getElementById("result1").innerHTML = data.bees.beeArray[0].returnTraitNames();
    } else if (button === 2) {
        createBee(data.bees.beeArray[0], data.bees.beeArray[1]);
        document.getElementById("result2").innerHTML = data.bees.beeArray[2].returnTraitNames();
        $(".basicBee").css("visibility","");
    } else {
        document.getElementById("result3").innerHTML = data.bees.beeArray[1].returnTraitNames();
    }
}

function createBee(parent1, parent2) {
    "use strict";
    var i = 0;
    var traitPool = [];
    for (i = 0; i < parent1.traits.length; i += 1) {
        traitPool.push(parent1.traits[i]);
    }
    for (i = 0; i < parent2.traits.length; i += 1) {
        traitPool.push(parent2.traits[i]);
    }
    data.bees.beeArray[2] = new Bee(2);
    for (i = 0; i < traitPool.length; i += 1) {
        data.bees.beeArray[2].addTrait(traitPool[i].id);
    }
}