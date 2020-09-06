//ADD RANDOMLY GENERATED MODULES TO A GENERATOR
//Take inspiration from logistics pipes



/**
 * Unit classes
 */
class Vector2 {
    constructor(x, y) {
        this.x = x ? x : 0
        this.y = y ? y : this.x
    }
    add(v) {
        this.x += v.x
        this.y += v.y
    }
    subtract(v) {
        this.x -= v.x
        this.y -= v.y
    }
}

//Fluid Classes

/**
 * basic fluid, does nothing at base
 * viscosity is a number between 0 and infinity
 */
class Fluid {
    /**
     * @param {String} name Name of fluid
     */
    constructor(name) {
        this.name = name
        this.viscosity = 0
    }
}

fluids = {}
fluids.empty = new Fluid("Empty")
fluids.water = new Fluid("Water")
fluids.seawater = new Fluid("Sea Water")


class FluidTank {

    constructor(maxCapacity) {
        this.maxCapacity = maxCapacity ? maxCapacity : 0
        this.capacity = 0
        this.fluid = fluids.empty
    }
    changeFluid(fluid) {
        this.fluid = fluid
        this.capacity = 0
    }
    addFluid(fluid, amount) {
        if (this.fluid == fluid) {
            this.capacity += amount
        }
        return 0;
    }
    removeFluid(fluid, amount) {
        if (this.fluid == fluid) {
            this.capacity -= amount
        }
        return 0;
    }
    transferFluid(fluid,amount,target){
        if (this.fluid == fluid && target.fluid == fluid) {
            removeFluid(fluid,target.addFluid(fluid,amount))
        }
    }
}



/**
 * Grid classes
 */

class Grid {
    constructor(width, height) {
        this.width = width ? width : 0
        this.height = height ? height : this.width
        this.data = []
        for (let i = 0; i < this.width; i++) {
            this.data.push([])
            for (let j = 0; j < this.height; j++) {
                this.data[i].push(0)
            }

        }
    }
    setVal(x, y, val) {
        this.data[x][y] = val
    }
    consoleGrid() {
        console.dir(this.data)
    }
    tick(self){
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if(this.data[i][j].tick){
                    this.data[i][j].tick(this)
                }
            }  
        }
    }
}

class CustomGrid extends Grid {
    constructor(width, height, mask) {
        super(width, height)
        this.mask = mask ? mask : new Grid(width, height)

    }
    set mask(mask) {
        if (mask.height == this.height && mask.width == this.width) {
            this.gridMask = mask
            this.parseMask()
        }
    }

    parseMask() {
        for (let i = 0; i < this.gridMask.width; i++) {
            for (let j = 0; j < this.gridMask.height; j++) {
                if (this.gridMask.data[i][j] == 1) {
                    this.setVal(i, j, -1)
                }
            }
        }
    }
    setVal(x, y, val) {
        if (this.gridMask.data[x][y] == 0) {
            super.setVal(x, y, val)
        } else {
            super.setVal(x, y, -1)
        }
    }
    setMaskVal(x, y, val) {
        this.gridMask.setVal(x, y, val)
        this.parseMask()
    }

}

/**
 * Basic component used as a buildingblock for other components
 */

class Component {
    constructor(type) {
        this.type = type
    }
    tick(){
        console.log("Do nothing")
    }
}

class InputComponent extends Component {
    constructor(){
        super("Input Valve")
    }
}
class OutputComponent extends Component {
    constructor(){
        super("Output Valve")
    }
    
}

class TankComponent extends Component {
    constructor(maxCapacity) {
        super("Fluid Tank")
        this.tank = new FluidTank(maxCapacity)
    }

}


class Machine {
    constructor(name, width, height) {
        this.name = name
        this.width = width ? width : 0
        this.height = height ? height : this.width
        this.compGrid = new CustomGrid(this.width, this.height)
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                //Only toggles the edges and doesnt toggle the center tiles kind of like a +
                if((this.width-1)/2 != i && (this.height-1)/2 != j && (i==0||i==this.width-1||j==0||j==this.height-1)){
                    this.compGrid.setMaskVal(i,j,1)
                }
               
            }
        }
        
    }
    addComponent(x, y, comp) {
        this.compGrid.setVal(x, y, comp)
    }
    tick(){
        this.compGrid.tick(this)
    }
}


class InfiniteFluid extends Machine {
    constructor(fluid){
        super("Infinite Fluid", 3, 3)
        let comp = new TankComponent(Infinity)
        comp.tank.changeFluid(fluid)
        comp.tank.addFluid(fluid,Infinity)
        this.addComponent(1,1,comp)
        this.addComponent(2,1,new OutputComponent())
    }
    
    tick(){
        super.tick()
    }
    
}





class Pipe extends Machine {
    constructor(maxCapacity) {
        super("Pipe", 3, 3)
        this.addComponent(0,0,new FluidTank(maxCapacity))
    }
}





grid = new CustomGrid(10, 10)
grid.setMaskVal(4, 4, 1)
grid.setMaskVal(4, 5, 1)
grid.setMaskVal(5, 4, 1)
grid.setMaskVal(5, 5, 1)
m = new InfiniteFluid(fluids.water);

p1 = new Pipe(100)
p2 = new Pipe(100)
grid.setVal(1, 1, m)
grid.setVal(2, 1, p1)
grid.setVal(3, 1, p2)   

console.log("Done loading")