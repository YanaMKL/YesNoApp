(function(){

    var ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = function() {
        
        if (ajax.readyState == 4) {
            
            var data = JSON.parse(ajax.responseText);
            
            document.getElementById("theImage").src = data.image;
        }
    };
    
    ajax.open('GET', '/api', true);
    ajax.send(null);

})()