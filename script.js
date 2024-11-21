const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image and return a promise
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
    img.src = image.url;
  });
}

// Function to download all images in parallel
function downloadAllImages() {
  // Use Promise.all to download all images in parallel
  Promise.all(images.map(downloadImage))
    .then((loadedImages) => {
      // If all images are loaded, display them
      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // If any image fails to load, log the error
      console.error(error);
    });
}

// Attach an event listener to the button
btn.addEventListener("click", downloadAllImages);
