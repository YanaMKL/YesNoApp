(function(){


    if(api_url === 'xxx')
        api_url = '/api';    

    var ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = function() {
        
        if (ajax.readyState == 4) {
            
            var data = JSON.parse(ajax.responseText);
            
            document.getElementById("theImage").src = data.image;
        }
    };
    
    ajax.open('GET', api_url, true);
    ajax.send(null);

})()