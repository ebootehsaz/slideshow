window.addEventListener('DOMContentLoaded', function() {
    const delay = 3_000; 
    const transitionTime = 1000;
    const fileInput = document.getElementById('file-input');
    const selectedCount = document.getElementById('selected-count');
    const startSlideshowBtn = document.getElementById('start-slideshow');
    const shuffleToggleBtn = document.getElementById('shuffle-toggle');
    const loopToggleBtn = document.getElementById('loop-toggle');
    const slideshowImage = document.getElementById('slideshow-image');
    const slideshowContainer = document.getElementById('slideshow-container');
    
    let photos = [];
    let currentPhotoIndex = 0;
    let isShuffled = false;
    let isLooped = true;
    loopToggleBtn.classList.toggle('active', isLooped);

    fileInput.addEventListener('change', function(event) {
      const fileList = event.target.files;
      
      photos = Array.from(fileList);

      selectedCount.textContent = photos.length + ' photo(s) selected';
    });
    
    startSlideshowBtn.addEventListener('click', async function() {
      if (photos.length === 0) {
        alert('Please select photos to start the slideshow.');
        return;
      }
      
    //   startSlideshowBtn.disabled = true;
      fileInput.disabled = true;

      slideshowContainer.style.width = '99vw';
      slideshowContainer.style.height = '99vh';

      let x = 1; 

      do {
        startSlideshowBtn.disabled = true;
        console.log("(re)starting slideshow");
        if (isShuffled) {
            shuffleArray(photos);
        }
        do {
            x = await startSlideshow(); 
        } while (x === 0);
        startSlideshowBtn.disabled = false;
      } while (isLooped);

    });
    
    function startSlideshow() {
        return new Promise((resolve) => {
          if (currentPhotoIndex >= photos.length) {
            // Slideshow has ended
            currentPhotoIndex = 0;
            resolve(1); 
            return;
          }
        
          const photo = photos[currentPhotoIndex];
          const reader = new FileReader();
        
          reader.addEventListener('load', function() {
            slideshowImage.style.opacity = '0'; 
        
            // Wait for transition to complete
            setTimeout(function() {
              slideshowImage.src = reader.result;
              slideshowImage.style.opacity = '1'; // Fade in the new photo
            //   selectedCount.textContent = slideshowImage.src;
            }, transitionTime);
        
            // Move to the next photo after 3 seconds
            setTimeout(function() {
              currentPhotoIndex++;
              resolve(0); 
            }, delay);
          });
        
          reader.readAsDataURL(photo);
        });
      }
    
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffleToggleBtn.addEventListener('click', function() {
        isShuffled = !isShuffled;
        console.log(isShuffled);
        shuffleToggleBtn.classList.toggle('active', isShuffled);
    });

    loopToggleBtn.addEventListener('click', function() {
        isLooped = !isLooped;
        loopToggleBtn.classList.toggle('active', isLooped);
    });

      
  });