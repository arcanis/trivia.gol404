var life_cells = function ( ) { };
life_cells.prototype.pos = null;
life_cells.prototype.bmp = null;

function life( thisArr, newArr, ctx ) {
    var thisPtr = 0, newPtr = 0;

    var prevL, thisL, nextL, prevR, thisR, nextR;
    var rear1, rear2, midd1, mdd2, fore1, fore2;
    var bmp, count1, count2, count4a, count4b;
    var prev, next;

    prevL = thisL = nextL = rear1 = rear2 = 0;
    prev = next = thisPtr; newArr[ newPtr ].pos = -1;
    for (;;) {
        if ( newPtr.pos > -1 ) ++ newPtr;
        if ( prevPtr == nextPtr ) {
            if ( next.pos == -1 ) return newPtr
    }
}
