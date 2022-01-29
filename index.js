const API_KEY = "d84cac5344msh33270a08a1f925dp1a6804jsnc0e11ff8cd25"

window.onload = function() {
    var initial_search = sessionStorage.getItem('search');
    //console.log(initial_search);
    var classes = [];
    var races = [];
    var duplicates = [];

    // Luam datele despre spatele cartilor

    var backs_data = fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
	    }
    })
    .then(response => {
	    return response.json();
    })
    .catch(err => {
	    console.error(err);
    });


    // Luam datele despre clase si rase

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

    // Daca am dat reload si avem valoare in sessionStorage, facem cautare

    if (initial_search){
        data.then(data => {
            classes = data.classes.map(name => name.toLowerCase());
            races = data.races.map(name => name.toLowerCase());

            const container = document.getElementById("image-container");

            // Daca ce cautam se afla in lista claselor, retragem cartile ce apartin clasei

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
                            if (!duplicates.includes(card.name)){
                                duplicates = [];
                                const image = document.createElement("img");
                                image.src = card.img;
                                image.height = 300;
                                image.id = card.cardId;

                                // Get a random card back
                                backs_data.then(card_backs => {
                                    var card_back = card_backs[Math.floor(Math.random() * card_backs.length)]
                                    
                                 })

                                container.appendChild(image);
                                duplicates.push(card.name);
                            }
                        }
                    })
                })
                .catch(err => {
                    console.error(err);
                });
                
            }

            // Daca ce cautam se afla in lista raselor, retragem cartile ce apartin rasei

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
                            if (!duplicates.includes(card.name)){
                                duplicates = [];
                                const image = document.createElement("img");
                                image.src = card.img;
                                image.height = 300;
                                image.id = card.cardId;
                                container.appendChild(image);
                                duplicates.push(card.name);
                            }
                        }
                    })
                })
                .catch(err => {
                    console.error(err);
                });

            }

            // Altfel, cautam o carte dupa numele ei

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
                    console.log(list);
                    list.forEach(card => {
                        if (card.img && card.type.toLowerCase() != "hero"){
                            if (!duplicates.includes(card.name)){
                                duplicates = [];
                                const image = document.createElement("img");
                                image.src = card.img;
                                image.height = 300;
                                image.id = card.cardId;
                                container.appendChild(image);
                                duplicates.push(card.name);
                            }
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
