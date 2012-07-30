var startGoL = ( function ( ) {

    return function ( initialEntityCount, delay ) {

        var golEngine = new GoL.Engine( );
        var golDisplay = new GoL.Display( golEngine );

        var updateCanvasRatio = function ( ) {
            golDisplay.resize(
                window.innerWidth,
                window.innerHeight
            );
        };

        window.addEventListener( 'load', function ( ) {
            document.body.appendChild( golDisplay.domElement );
            golDisplay.domElement.id = 'gol';
            updateCanvasRatio( );
            golEngine.add( initialEntityCount );
        }, false );

        window.addEventListener( 'resize', function ( ) {
            updateCanvasRatio( );
        }, false );

        window.setInterval( function ( ) {
            golEngine.iterate( );
            golDisplay.print( );
        }, delay );

    };

} ( ) );
