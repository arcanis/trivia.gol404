var GoL;

GoL.Board = function ( ) {
    this.entitiesMap = { };
    this.dirtyEntities = [ ];
};

GoL.Board.prototype.resize = function ( width, height ) {

    if ( width == this.width && height == this.height )
        return ;

    var oldWidth = this.width;

    this.entitiesMap = ( function ( entitiesMap ) {

        var migratedEntitiesMap = { };

        for ( var cellIndex in entitiesMap ) {

            var positionX = cellIndex % oldWidth;
            var positionY = Math.floor( cellIndex / oldWidth );

            if ( positionX < width && positionY < height ) {
                migratedEntitiesMap[ positionY * width + positionX ] = true;
            }

        }

        return migratedEntitiesMap;

    } ( this.entitiesMap ) );

    this.dirtyEntities = ( function ( dirtyEntities ) {

        var migratedDirtyEntities = [ ];

        for ( var t = 0, T = dirtyEntities.length; t < T; ++ t ) {

            var cellIndex = dirtyEntities[ t ];

            var positionX = cellIndex % oldWidth;
            var positionY = Math.floor( cellIndex / oldWidth );

            if ( positionX < width && positionY < height ) {
                migratedDirtyEntities.push( positionY * width + positionX );
            }
        }

        return migratedDirtyEntities;

    } ( this.dirtyEntities ) );

    this.width = width;
    this.height = height;

};

GoL.Board.prototype.has = function ( cellIndex ) {

    return typeof this.entitiesMap[ cellIndex ] !== 'undefined';

};

GoL.Board.prototype.apply = function ( board ) {
    for ( var cellIndex in board.entitiesMap ) {

    }
};

GoL.Board.prototype.on = function ( cellIndex, markAsDirty ) {

    if ( typeof markAsDirty === 'undefined' )
        markAsDirty = true;

    if ( typeof this.entitiesMap[ cellIndex ] === 'undefined' ) {
        this.entitiesMap[ cellIndex ] = true;
        markAsDirty && this.dirtyEntities.push( cellIndex );
    }

};

GoL.Board.prototype.off = function ( cellIndex, markAsDirty ) {

    if ( typeof markAsDirty === 'undefined' )
        markAsDirty = true;

    if ( typeof this.entitiesMap[ cellIndex ] !== 'undefined' ) {
        delete this.entitiesMap[ cellIndex ];
        markAsDirty && this.dirtyEntities.push( cellIndex );
    }

};
