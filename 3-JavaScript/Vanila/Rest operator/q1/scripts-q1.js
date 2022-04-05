function turnIntoArray(...manyArgs) {
    return manyArgs.sort((a,b) => {
        if(a==b) return 0;
        if(a<b) return -1;
        if(a>b) return 1;
    });
}

console.log(turnIntoArray(1,12,32,2,74,3,7,4,5,6,7,8,9,0));