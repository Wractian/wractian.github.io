

/**
 * Unit classes
 */
class Vector2{
    constructor(x,y){
        this.x = x ? x : 0
        this.y = y ? y : this.x
    }
    add(v){
        this.x += v.x
        this.y += v.y
    }
    subtract(v){
        this.x -= v.x
        this.y -= v.y
    }
}

/**
 * fluid classes
 */

 /**
  * basic fluid, does nothing at base
  * viscosity is a number between 0 and infinity
  */
 class Fluid{
     constructor(name){
     this.name = name
     this.viscosity = 0
    }
 }




class FluidTank{

    constructor(maxCapacity){
        this.maxCapacity = maxCapacity ? maxCapacity : 0
        this.capacity = 0;
        this.fluid = null
    }
}



/**
 * Grid classes
 */

class Grid{
    constructor(width,height){
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
    setVal(x,y,val){
        this.data[x][y] = val
    }
    consoleGrid(){
        console.dir(this.data)
    }
}

class CustomGrid extends Grid{
    constructor(width,height,mask){
        super(width,height)
        this.mask = mask ? mask : new Grid(width,height)
        
    }
    set mask(mask){  
        if(mask.height == this.height && mask.width == this.width){
            this.gridMask = mask
            this.parseMask()
        }
    } 
    
    parseMask(){
        for (let i = 0; i < this.gridMask.width; i++) {
            for (let j = 0; j < this.gridMask.height; j++) {
                if(this.gridMask.data[i][j] == 1){
                    this.setVal(i,j,-1)
                }
           }  
        } 
    }
    setVal(x,y,val){
        if(this.gridMask.data[x][y] == 0){
            super.setVal(x,y,val)
        }else{
            super.setVal(x,y,-1)
        }
    }
    setMaskVal(x,y,val){
        this.gridMask.setVal(x,y,val)
        this.parseMask()
    }
    
}






grid = new CustomGrid(10,10) 
grid.setMaskVal(4,4,1)
grid.setMaskVal(4,5,1)
grid.setMaskVal(5,4,1)
grid.setMaskVal(5,5,1)