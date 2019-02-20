'use strict';


let Utils;
export default Utils = {
    /**
     * 
     * @param {number} num 
     * @param {number} min 
     * @param {number} max 
     */
    clamp(num,min,max){
        return Math.min(Math.max(num, min), max);
    },
    /**
     * 
     * @param {*} message 
     */
    ping(message = "ping"){
        console.log(message);
    },
    /**
     * @param {number[]} array 
     */
    sumArr(array){
        var sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum = sum + array[i];
        }
        return sum;
    },
    /**
     * @param {number[]} array 
     */
    avgArr(array){
        return sumArr(array)/array.length;
    },
    boolxor(...args){
        var tester = false;
        for (let i = 0; i < args.length; i++) {
            if(args[i]==true){
                if(tester==true){
                    return false;
                }
                tester=true;
            }
        }
        return tester;
    }
    
}

