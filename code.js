
(() => {

    function constructImageURL (photoObj) {
        return "https://farm" + photoObj.farm +
                ".staticflickr.com/" + photoObj.server +
                "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }

   
    //const message = document.querySelector('#message');

    // check if the Geolocation API is supported
    if (!navigator.geolocation) {
        message.textContent = `Your browser doesn't support Geolocation`;
        message.classList.add('error');
        return;
    }

    // handle click event
    const btn = document.querySelector('#show');
    btn.addEventListener('click', function () {
        // get the current position
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });


    // handle success case
    function onSuccess(position) {
        const {
            latitude,
            longitude
        } = position.coords;

        message.classList.add('success');
        message.textContent = ` 🌎  (${latitude},${longitude})`;
    
 //flickr params

 const api_key = "156d806ad204a1eefa444170d0c0fed0"
 //const safe_search= 1;
 //const per_page = 5;
 const lat = latitude;
 const lon = longitude;
 const text = "deer";
 let currentImg = 0;

 
fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?
api_key=${api_key}&format=json&nojsoncallback=1&method=flickr.
photos.search&safe_search=1&per_page=5&lat=${lat}&lon=${lon}&text=${text}`)
.then(response => response.json())
.then(data => {
    let arrayPhotos = data.photos.photo;
    console.log (arrayPhotos)
    const img = document.querySelector("img")
    const imageUrl = constructImageURL(arrayPhotos[currentImg]);
    img.src = imageUrl;


    const btn = document.querySelector("#button");
   
    btn.addEventListener('click',  (event)  => {
        if (currentImg >= arrayPhotos.length - 1){
            currentImg = 0
            
        } else {
            currentImg ++;
                }
              img.src = constructImageURL(arrayPhotos[currentImg])

            })
    console.log (currentImg)      

})  
   
   
}


    // handle error case
    function onError() {
        message.classList.add('error');
        message.textContent = `Failed to get your location!`;
    }
    
})();
