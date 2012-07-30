var GoL;

GoL.Engine = function ( canvas ) {

    this.canvas = canvas;

    this.width = null;
    this.height = null;

    this.currentGeneration = new GoL.Board( );
    this.nextGeneration = new GoL.Board( );

};

GoL.Engine.prototype.resize = function ( width, height ) {

    if ( width == this.width && height == this.height )
        return ;

    this.width = width;
    this.height = height;

    this.currentGeneration.resize( width, height );
    this.nextGeneration.resize( width, height );

};

GoL.Engine.prototype.add = function ( count ) {

    var cellCount = this.width * this.height;

    for ( var t = 0, T = count; t < T; ++ t ) {

        var cellIndex = Math.floor( Math.random( ) * ( cellCount + 1 ) );

        this.currentGeneration.on( cellIndex );
        this.nextGeneration.on( cellIndex, false );

    }

};

GoL.Engine.prototype.neighbors = function ( cellIndex ) {

    var neighbors = [ ];

    var positionX = cellIndex % this.width;
    var positionY = Math.floor( cellIndex / this.width );

    if ( positionX - 1 >= 0 )
        neighbors.push( positionY * this.width + positionX - 1 );

    if ( positionY - 1 >= 0 )
        neighbors.push( ( positionY - 1 ) * this.width + positionX );

    if ( positionX + 1 < this.width )
        neighbors.push( positionY * this.width + positionX + 1 );

    if ( positionY + 1 < this.height )
        neighbors.push( ( positionY + 1 ) * this.width + positionX );

    if ( positionX - 1 >= 0 && positionY - 1 >= 0 )
        neighbors.push( ( positionY - 1 ) * this.width + positionX - 1 );

    if ( positionX + 1 < this.width && positionY + 1 < this.height )
        neighbors.push( ( positionY + 1 ) * this.width + positionX + 1 );

    if ( positionX - 1 >= 0 && positionY + 1 < this.height )
        neighbors.push( ( positionY - 1 ) * this.width + positionX + 1 );

    if ( positionX + 1 < this.width && positionY - 1 >= 0 )
        neighbors.push( ( positionY + 1 ) * this.width + positionX - 1 );

    return neighbors;

};

GoL.Engine.prototype.check = function ( cellIndex ) {

    var count = 0;

    var currentGeneration = this.currentGeneration;
    var nextGeneration = this.nextGeneration;

    var neighbors = this.neighbors( cellIndex );

    for ( var t = 0, T = neighbors.length; t < T && count < 4; ++ t )
        if ( currentGeneration.has( neighbors[ t ] ) )
            ++ count;

    if ( currentGeneration.has( cellIndex ) ) {
        if ( count < 2 || count > 3 ) {
            currentGeneration.off( cellIndex, false );
            nextGeneration.off( cellIndex );
        }
    } else {
        if ( count == 3 ) {
            currentGeneration.on( cellIndex, false );
            nextGeneration.on( cellIndex );
        }
    }


};

GoL.Engine.prototype.iterate = function ( ) {

    var dirtyEntities = this.currentGeneration.dirtyEntities;
    this.currentGeneration.dirtyEntities = [ ];

    for ( var t = 0, T = dirtyEntities.length; t < T; ++ t ) {

        var neighbors = this.neighbors( dirtyEntities[ t ] );
        for ( var u = 0, U = neighbors.length; u < U; ++ u ) {
            this.check( neighbors[ u ] );
        }

    }

    var nextGeneration = this.currentGeneration;
    this.currentGeneration = this.nextGeneration;
    this.nextGeneration = nextGeneration;

};
