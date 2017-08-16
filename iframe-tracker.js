(function($){
    // Tracking handler manager
    window.iframeTracker = function(target, handler) {
        if (handler) {
            iframeTracker.track(target, handler);
        }
    };

    // Iframe tracker common object
    var iframeTracker = {
        handlersList: [],      // Store a list of every trakers (created by calling $(selector).iframeTracker...)

        // Init (called once on document ready)
        init: function() {
            // Listening window blur
            $(window).focus();
            $(window).blur(function(e){
                console.log('Window is losing focus');
                iframeTracker.windowLoseFocus(e);
            });
        },


        // Add tracker to target using handler (bind boundary listener + register handler)
        // target: Array of target elements (native DOM elements)
        // handler: User handler object
        track: function(target, handler) {
            // Adding target elements references into handler
            handler.target = target;

            // Storing the new handler into handler list
            iframeTracker.handlersList.push(handler);

            // Binding boundary listener
            $(target)
                .bind('mouseover', {handler: handler}, function(e){
                    console.log('mouseover on ', e.data.handler.target);
                    e.data.handler.over = true;
                })
                .bind('mouseout',  {handler: handler}, function(e){
                    console.log('mouseout on ', e.data.handler.target);
                    $(window).focus();
                    e.data.handler.over = false;
                });
        },

        // Calls blurCallback for every handler with over=true on window blur
        windowLoseFocus: function() {
            for (var i in this.handlersList) {
                if (this.handlersList[i].over) {
                    try {this.handlersList[i]();} catch(ex) {}
                }
            }
        }
    };

    // Init the iframeTracker on document ready
    $(document).ready(function(){
        iframeTracker.init();
    });
})(jQuery);
