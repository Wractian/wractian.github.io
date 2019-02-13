

Utils = {
    clamp(num,min,max){
        return Math.min(Math.max(num, min), max);
    },
    ping(message = "ping"){
        console.log(message);
    },
    sumArr(array){
        var sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum = sum + array[i];
        }
        return sum;
    }
}

