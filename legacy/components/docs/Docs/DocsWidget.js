(function() {
    
    $(window).load(function() {
        $('body').scrollspy('refresh');
    });
    
    $('body').scrollspy({
        target: '.docs',
        offset: 40
    });
    
    
    
    $("#docsNav").bind("activate", function() {
        var target = $(".toc li.active > A", document.getElementById("docsNav"));
        
        var targetY = target.position().top;
        var targetHeight = target.height();
        var scrollTop = $("#docsNav").scrollTop();
        var scrollHeight = $("#docsNav").innerHeight();
        
        if (targetY < 0) {
            $("#docsNav").scrollTo(".toc li.active", {
                axis: 'y'
            });    
        }
        else if (targetY + target.height() > scrollHeight) {
            $("#docsNav").scrollTo(".toc li.active", {
                axis: 'y',
                duration: 200
            });    
        }
        
    })
}());