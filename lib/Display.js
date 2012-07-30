var GoL;

GoL.Display = function ( gol ) {

    this.gol = gol;

    this.domElement = this.canvas = document.createElement( 'canvas' );

};

GoL.Display.prototype.SQUARE_SIZE = 20;
GoL.Display.prototype.PAD_SIZE = 10;

GoL.Display.prototype.resize = function ( width, height ) {

    var squareDim = this.SQUARE_SIZE + this.PAD_SIZE;

    this.gol.resize( Math.ceil( width / squareDim ), Math.ceil( height / squareDim ) );

    this.canvas.width = width;
    this.canvas.height = height;

};

GoL.Display.prototype.print = function ( ) {

    var context = this.canvas.getContext( '2d' );
    context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

    var squareDim = this.SQUARE_SIZE + this.PAD_SIZE;

    var currentGeneration = this.gol.currentGeneration;
    for ( var t in this.gol.currentGeneration.entitiesMap ) {

        var positionX = t % this.gol.width;
        var positionY = Math.floor( t / this.gol.width );

        context.fillStyle = "rgba( 0, 0, 0, .08 )";
        context.fillRect( this.PAD_SIZE + positionX * squareDim, positionY * squareDim, this.SQUARE_SIZE, this.SQUARE_SIZE );

    }

};
