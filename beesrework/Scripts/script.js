function Trait(id) {
    this.id = id;
    this.name = "Nocturnal";
}
Trait.prototype = {
	//returns what traits do as a string
    description: function() {

    },
};

function Bee() {
	this.id = 
    this.traitnumber = 0;
}
Bee.prototype = {
	//Lists off all the traits a certain object contains
    listTraits: function() {
        var string = "";

        for (var i = 0; i < this.traitnumber; i++) {
            string = string + this["_trait" + i].name + " ";
        }
        console.log(string);

    },
    //Creates new trait with id of the number of traits, replace this with a better system
    newTrait: function() {
        this["_trait" + this.traitnumber] = new Trait(this.traitnumber);
        this.traitnumber++;
    },
};

//Developer heck
window.n=new Bee();
n.newTrait();
n.newTrait();
n.listTraits();