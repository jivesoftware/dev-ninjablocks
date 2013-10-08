(function() {
    jive.tile.onOpen(function(config, options ) {
        gadgets.window.adjustHeight();

        $("#btn_submit").click( function() {
            jive.tile.close(config, {} );
            gadgets.window.adjustHeight(300);
        });
    });

})();

