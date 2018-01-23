//Global variable

(function() {
    "use strict";
    window.data = [];
    data.bees = {};
    data.bees.beeArray = [];
    data.bees.newBee = function() {
        var id = data.bees.beeArray.length;
        data.bees.beeArray.push(new Bee(id));
        return (id);
    };
    data.bees.deleteBee = function(id) {
        data.bees.beeArray.splice(id, 1);
        this.relistBees();
        console.log("deleted");
    };
    data.bees.relistBees = function() {
        var i;
        for (i = 0; i < data.bees.beeArray.length; i += 1) {
            data.bees.beeArray[i].id = i;
        }
    };
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

    //Lists off all the traits a certain object contains, delete this later, better as normal function
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
    removeDuplicateTraits: function() {
        "use strict";
        var i;
        var seen = {};
        var out = [];
        var len = this.traits.length;
        var j = 0;
        for (i = 0; i < len; i+=1) {
            var id = this.traits[i].id;
            if (seen[id] !== 1) {
                seen[id] = 1;
            }else{
                out[j++]=i;
            }

        }
        for (i = out.length-1; i > -1; i--) {
            this.traits.splice(out[i],1);
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