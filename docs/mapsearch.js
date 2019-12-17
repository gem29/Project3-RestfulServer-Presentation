var app;
var auth_data = {};

function Init()
{
    app = new Vue({
        el: "#app",
        data: { 
        	crimes: [{case: '1', date: '2', time: '3', code: '4', incident: '5', grid: '6', neighborhood: '7', block: '8'}]
        }
    });
}

function search(event)
{
    
}