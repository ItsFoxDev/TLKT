function done(m) {
  let c = document.createElement("div");
  c.id = "check";
  c.innerHTML =
    '<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_lgibuoeb.json" background="transparent" speed="1" style="width:300px;height:300px;" autoplay></lottie-player><br><span id="sub">' +
    m +
    "</span>";
  document.body.appendChild(c);
  setTimeout(function () {
    c.style.opacity = 0;
  }, 1220);
  setTimeout(function () {
    c.remove();
  }, 1520);
}
/* IMAGE CONVERTER */
var icoe = "";
let imgInput = document.getElementById("iconv");
imgInput.addEventListener("change", function (e) {
  if (e.target.files) {
    let imageFile = e.target.files[0]; //here we get the image file
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = function (e) {
      var myImage = new Image(); // Creates image object
      myImage.src = e.target.result; // Assigns converted image to image object
      myImage.onload = function (ev) {
        var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
        var myContext = myCanvas.getContext("2d"); // Creates a contect object
        myCanvas.width = myImage.width; // Assigns image's width to canvas
        myCanvas.height = myImage.height; // Assigns image's height to canvas
        myContext.drawImage(myImage, 0, 0); // Draws the image on canvas
        let imgData = myCanvas.toDataURL("image/"+icoe, 0.75); // Assigns image base64 string in jpeg format to a variable
        const img = myCanvas.toDataURL("image/"+icoe);
        var a = document.createElement("a"); //Create <a>
        a.href = img; //Image Base64 Goes here
        var filename = document
          .getElementById("iconv")
          .files[0].name.replace(/\.[^/.]+$/, "");
        a.download = filename + "." + icoe; //File name Here
        a.click(); //Downloaded file
        done("Success!");
      };
    };
  }
});

/* DATAURL CONVERTER */
function b64() {
  console.log("Converting...");

  var fileInput = document.getElementById("b64in");

  // Get the selected file
  var file = fileInput.files[0];

  // Create a new FileReader object
  var reader = new FileReader();

  // Set the onload event handler for the reader
  reader.onload = function (event) {
    // Get the result of the read operation (the data URL)
    var dURL = event.target.result;
    done("Copied!");
    copy(dURL);
  };

  // Start reading the file as a data URL
  reader.readAsDataURL(file);
}

function copy(text) {
  var input = document.createElement("textarea");
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand("copy");
  document.body.removeChild(input);
  return result;
}

/* CORNER ROUNDER */
var bradius=0;
async function beginRound() {
  const {value:bradius} = await Swal.fire({
    title: 'Enter image radius',
    input: 'number',
    inputLabel:'Values over 40 may glitch',
    inputAutoFocus: true
  })
  document.getElementById("riradiusInput").value=Number(bradius);
  roundCorners();
  done('Success!');
}
function roundCorners() {
  var fileInput = document.getElementById("rifileInput");
  var preview = document.getElementById("ripreview");
  var previewContainer = document.getElementById("ripreview-container");
  var radiusInput = document.getElementById("riradiusInput");
  var downloadLink = document.getElementById("ridownloadLink");

  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    previewContainer.style.borderRadius = "0";
    downloadLink.style.display = "none";
    createRoundedImage(reader.result, radiusInput.value, function (roundedDataUrl) {
      preview.src = roundedDataUrl;
      previewContainer.style.borderRadius = radiusInput.value + "%";
      var filename = fileInput.files[0].name.replace(/\.[^/.]+$/, "");
      downloadLink.setAttribute("download", filename+".png");
      downloadLink.setAttribute("href", roundedDataUrl);
      downloadLink.style.display = "inline";
      downloadLink.click();
    });
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
    previewContainer.style.borderRadius = "0";
    downloadLink.removeAttribute("download");
    downloadLink.removeAttribute("href");
    downloadLink.style.display = "none";
  }
}
function createRoundedImage(imageUrl, radius, callback) {
  var image = new Image();

  image.onload = function () {
    var maxDimension = Math.max(image.width, image.height);
    var aspectRatio = image.width / image.height;
    var cornerRadius = (radius / 100) * maxDimension;

    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    context.globalCompositeOperation = "destination-in";
    context.beginPath();
    context.moveTo(cornerRadius, 0);
    context.lineTo(canvas.width - cornerRadius, 0);
    context.quadraticCurveTo(
      canvas.width,
      0,
      canvas.width,
      cornerRadius
    );
    context.lineTo(canvas.width, canvas.height - cornerRadius);
    context.quadraticCurveTo(
      canvas.width,
      canvas.height,
      canvas.width - cornerRadius,
      canvas.height
    );
    context.lineTo(cornerRadius, canvas.height);
    context.quadraticCurveTo(0, canvas.height, 0, canvas.height - cornerRadius);
    context.lineTo(0, cornerRadius);
    context.quadraticCurveTo(0, 0, cornerRadius, 0);
    context.closePath();
    context.fill();

    var roundedDataUrl = canvas.toDataURL("image/png");

    callback(roundedDataUrl);
  };

  image.src = imageUrl;
}

async function ue(){
  const {value:te} = await Swal.fire({
    title: 'Enter text to encode',
    input: 'text',
    inputAutoFocus: true
  })
  copy(encodeURI(te));
  done("Copied!");
}
async function de(){
  const {value:te} = await Swal.fire({
    title: 'Enter text to decode',
    input: 'text',
    inputAutoFocus: true
  }) 
  copy(decodeURI(te));
  done("Copied!");
}