function Trait(id) {
    this.id = id;
    this.name = function() { return (traitList[this.id].name); };

    this.name=this.name();
}
Trait.prototype = {
    //returns what traits do as a string
    desc: function() {
        console.log(traitList[this.id].desc);
    },
    pushArray: function() {
        console.log("pushed");
    }
};

function Bee(id) {
    this.id = id;
    this.traits = [];
}
Bee.prototype = {
    //Lists off all the traits a certain object contains
    listTraits: function() {
        var string = "";

        for (var i = 0; i < this.traits.length; i++) {
            var trait = this.traits[i];
            string = string + trait.name + " ";


        }
        console.log(string);

    },
    //Creates new trait with id of the number of traits, replace this with a better system
    newTrait: function() {
        this.traits.push(new Trait(this.traits.length));
    },
};


var traitList = [
    { desc: "Active during the night", name: "Nocturnal" },
    { desc: "Active period reduced", name: "Sleepy" }
];





//Developer heck
window.n=[];
window.n[0] = new Bee(0);
window.n[1] = new Bee(1);
n[0].newTrait();
n[0].newTrait();
n[1].newTrait();
n[0].listTraits();
n[1].listTraits();