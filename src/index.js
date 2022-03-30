document.addEventListener('DOMContentLoaded', function() {
    fetchDogBreeds();
    fetchDogImages();
});


// # ######### Global variables for all API portions  ################
const dogImgsUrl = "https://dog.ceo/api/breeds/image/random/4"
const allBreedsUrl = 'https://dog.ceo/api/breeds/list/all' 


// # ######### Functions for image portion of API ################
function fetchDogImages() {
    fetch(dogImgsUrl)
        .then ( response => response.json() )
        .then ( json => {
            renderDogImages(json.message);
        })
}

function renderDogImages(dogImages) {
    const container = document.getElementById("dog-image-container")
    for (i=0; i<dogImages.length; i++) {
        let dogImg = document.createElement("img");
        dogImg.src = dogImages[i];
        dogImg.style.width = "400px"        
        container.appendChild(dogImg);
    }
}


// # ######### Functions for breed portion of API ################
function fetchDogBreeds() {    
    fetch(allBreedsUrl)
        .then ( response => response.json() )
        .then ( json => {
            renderDogBreeds(json.message);
            const allBreedLIs = document.querySelectorAll("#dog-breeds li");
            colorBreedItemOnClick(allBreedLIs);
            filterBreedOptions(allBreedLIs);
        })
}

function renderDogBreeds(dogBreeds) {
    const breedList = document.getElementById("dog-breeds");

    for (const key in dogBreeds) {		
        if (dogBreeds[key].length === 0) {
            let dogBreed = document.createElement("li");
            dogBreed.innerText = key;
            breedList.appendChild(dogBreed);
        } else {
            breeds = dogBreeds[key]
            for (const b of breeds) {
                let dogBreed = document.createElement("li");
                dogBreed.innerText = b + " " + key;
                breedList.appendChild(dogBreed);
            }
        }
    }
}

function colorBreedItemOnClick(allBreedLIs) {
    for (const b of allBreedLIs) {
        b.addEventListener("click", () => b.style.color = "red");
    }
}

function filterBreedOptions(allBreedLIs) {
    const dropDown = document.getElementsByName("select-breed")[0];
    dropDown.addEventListener("change", () => toggleShowBreeds(allBreedLIs, dropDown.value));
}

function toggleShowBreeds(allBreedLIs, startLetter) {
	for (const b of allBreedLIs) {
		if (startLetter === "" || b.innerText[0] === startLetter) {
			b.style.display = "block";
		} else {
			b.style.display = "none";
		}
	}
}

