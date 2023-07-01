window.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const fileLabel = document.getElementById('file-label');
    const selectedCount = document.getElementById('selected-count');
    const startSlideshowBtn = document.getElementById('start-slideshow');
    const shuffleToggleBtn = document.getElementById('shuffle-toggle');
    const slideshowImage = document.getElementById('slideshow-image');
    
    let photos = [];
    let currentPhotoIndex = 0;
    let isShuffled = false;
    
    fileInput.addEventListener('change', function(event) {
      const fileList = event.target.files;
      
      // Convert the FileList to an array
      photos = Array.from(fileList);

      // Update the selected photo count
      selectedCount.textContent = photos.length + ' photo(s) selected';
    });
    
    startSlideshowBtn.addEventListener('click', function() {
      if (photos.length === 0) {
        alert('Please select photos to start the slideshow.');
        return;
      }
      
      // Shuffle the photos if the shuffle option is enabled
      if (isShuffled) {
        shuffleArray(photos);
      }
      
      startSlideshowBtn.disabled = true;
      fileInput.disabled = true;
      startSlideshow();
    });
    
    function startSlideshow() {
      if (currentPhotoIndex >= photos.length) {
        // Slideshow has ended
        startSlideshowBtn.disabled = false;
        fileInput.disabled = false;
        currentPhotoIndex = 0;
        return;
      }
      
      const photo = photos[currentPhotoIndex];
      const reader = new FileReader();
      
      reader.addEventListener('load', function() {
        slideshowImage.src = reader.result;
        slideshowImage.style.display = 'block';
        
        // Move to the next photo after 3 seconds
        setTimeout(function() {
          currentPhotoIndex++;
          slideshowImage.style.display = 'none';
          startSlideshow();
        }, 3000);
      });
      
      reader.readAsDataURL(photo);
    }
    
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffleToggleBtn.addEventListener('click', function() {
        isShuffled = !isShuffled;
        shuffleToggleBtn.classList.toggle('active', isShuffled);
      });

      
  });