// function handleFileSelect(event, elementId) {
//     const fileInput = event.target;
//     const files = fileInput.files;

//     if (files.length > 0) {
//         const selectedImage = files[0];
//         displayImage(selectedImage, elementId);
//     }
// }

// function displayImage(imageFile, elementId) {
//     const imgElement = document.getElementById(elementId);

//     imgElement.src = URL.createObjectURL(imageFile);
// }

function handleFileSelect(event, elementId) {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length > 0) {
        const selectedImage = files[0];
        saveImageToLocalStorage(elementId, selectedImage, function() {
            displayImage(elementId);
        });
    }
}

function displayImage(elementId) {
    const imgElement = document.getElementById(elementId);

    // Retrieve image data from local storage
    const base64Image = localStorage.getItem(elementId);

    // Set the image source
    if (base64Image) {
        imgElement.src = base64Image;
    } else {
        imgElement.src = "https://via.placeholder.com/300/?text=placeholder";
    }
}

// function saveImageToLocalStorage(elementId, imageFile, callback) {
//     const reader = new FileReader();

//     reader.onload = function (e) {
//         const base64Image = e.target.result;
//         localStorage.setItem(elementId, base64Image);
//         callback(); // Call the callback after saving to local storage
//     };

//     reader.readAsDataURL(imageFile);
// }

function saveImageToLocalStorage(elementId, imageFile, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Image = e.target.result;

        // Check if the old image exists and remove it
        const oldImage = localStorage.getItem(elementId);
        if (oldImage) {
            localStorage.removeItem(elementId);
        }

        // Save the new image
        localStorage.setItem(elementId, base64Image);
        callback(); // Call the callback after saving to local storage
    };

    reader.readAsDataURL(imageFile);
}


function clearImage(elementId){
    // Set the image source to the placeholder
    const imgElement = document.getElementById(elementId);
    imgElement.src = "https://via.placeholder.com/300?text=placeholder";

    // Remove the image data from local storage
    localStorage.removeItem(elementId);
}

// Call the function to load images from local storage when the page loads
window.onload = function () {
    displayImage('image1');
    displayImage('image2');
};

