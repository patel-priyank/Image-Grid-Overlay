const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const uploadButton = document.getElementById('uploadButton');
const downloadButton = document.getElementById('downloadButton');
const imageUpload = document.getElementById('imageUpload');
const noImageDiv = document.getElementById('noImage');
let currentImage = null;

// Get all input elements
const inputs = document.querySelectorAll('select, input[type="color"]');

// Event Listeners
uploadButton.addEventListener('click', () => imageUpload.click());
imageUpload.addEventListener('change', handleImageUpload);
downloadButton.addEventListener('click', downloadImage);

// Add change event listener to all inputs
inputs.forEach((input) => {
  input.addEventListener('change', updateGrid);
});

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        currentImage = img;
        canvas.width = img.width;
        canvas.height = img.height;
        updateGrid();
        noImageDiv.style.display = 'none';
        canvas.style.display = 'block';
        downloadButton.disabled = false;
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function updateGrid() {
  if (!currentImage) return;

  // Clear canvas and redraw image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentImage, 0, 0);

  const rows = parseInt(document.getElementById('rows').value);
  const columns = parseInt(document.getElementById('columns').value);
  const gridColor = document.getElementById('gridColor').value;
  const lineWidth = parseInt(document.getElementById('lineWidth').value);

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = lineWidth;

  // Draw vertical lines
  const columnWidth = canvas.width / columns;
  for (let i = 1; i < columns; i++) {
    ctx.beginPath();
    ctx.moveTo(i * columnWidth, 0);
    ctx.lineTo(i * columnWidth, canvas.height);
    ctx.stroke();
  }

  // Draw horizontal lines
  const rowHeight = canvas.height / rows;
  for (let i = 1; i < rows; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * rowHeight);
    ctx.lineTo(canvas.width, i * rowHeight);
    ctx.stroke();
  }
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'grid-overlay.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Initialize
canvas.style.display = 'none';
