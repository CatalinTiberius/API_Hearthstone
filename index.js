const API_KEY = "d84cac5344msh33270a08a1f925dp1a6804jsnc0e11ff8cd25"

window.onload = function() {
    var initial_search = sessionStorage.getItem('search');
    //console.log(initial_search);
    var classes = [];
    var races = [];

    var data = fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/info", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
		"x-rapidapi-key": API_KEY
	}
    })
    .then(response => {
        var data = response.json();
        return data;
    })
    .catch(err => {
        console.error(err);
    });

    if (initial_search){
        data.then(data => {
            classes = data.classes.map(name => name.toLowerCase());
            races = data.races.map(name => name.toLowerCase());

            const container = document.getElementById("image-container");

            if(classes.includes(initial_search.toLowerCase())){
                result = fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${initial_search}?collectible=1`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
                        "x-rapidapi-key": API_KEY
                    }
                })
                .then(response => {
                    return response.json();
                    
                })
                .then(list => {
                    list.forEach(card => {
                        if (card.img && card.type.toLowerCase() != "hero"){
                            const image = document.createElement("img");
                            image.src = card.img;
                            image.height = 300;
                            container.appendChild(image);
                        }
                    })
                })
                .catch(err => {
                    console.error(err);
                });
                
            }
            else if (races.includes(initial_search.toLowerCase())){
                result = fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/races/${initial_search}?collectible=1`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
                        "x-rapidapi-key": API_KEY
                    }
                })
                .then(response => {
                    return response.json();
                    
                })
                .then(list => {
                    list.forEach(card => {
                        if (card.img && card.type.toLowerCase() != "hero"){
                            const image = document.createElement("img");
                            image.src = card.img;
                            container.appendChild(image);
                        }
                    })
                })
                .catch(err => {
                    console.error(err);
                });

            }
            else {
                result = fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${initial_search}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
                    "x-rapidapi-key": API_KEY
                }
                })
                .then(response => {
                    return response.json();
                })
                .then(list => {
                    list.forEach(card => {
                        if (card.img && card.type.toLowerCase() != "hero"){
                            const image = document.createElement("img");
                            image.src = card.img;
                            container.appendChild(image);
                        }
                    })
                })
                .catch(err => {
                console.error(err);
                });

            }

        });

        sessionStorage.removeItem('search');
    }

    document.getElementById("search-button").addEventListener("click", function(event) {
        event.preventDefault();

        input = document.getElementById("card-search");
        search = input.value;
        sessionStorage.setItem('search', search);
        window.location.reload();
        
        
    }, false);


    


}
