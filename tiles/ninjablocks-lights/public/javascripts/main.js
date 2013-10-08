(function() {
    jive.tile.onOpen(function(config, options ) {
        gadgets.window.adjustHeight();

        if ( typeof config === "string" ) {
            config = JSON.parse(config);
        }

        var json = config || {
            "color": "0"
        };

        // pre-populate the sequence input dialog
        $("#color").val( json["color"]);

        $("#btn_submit").click( function() {
            config["color"] = $("#color").val();
            jive.tile.close(config, {} );
            gadgets.window.adjustHeight(300);
        });
    });

})();