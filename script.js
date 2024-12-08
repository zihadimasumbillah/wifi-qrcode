// Get form elements
const ssidInput = document.getElementById("ssid");
const passwordInput = document.getElementById("password");
const hiddenInput = document.getElementById("hidden");
const generateButton = document.getElementById("generate");
const qrCodeContainer = document.getElementById("qrcode");
const downloadJpgButton = document.getElementById("download-jpg");
const downloadSvgButton = document.getElementById("download-svg");

// Initialize scan tracking data
let scanCount = 0;
let scanLocations = [];

// Function to generate QR code
function generateQRCode() {
  const ssid = ssidInput.value;
  const password = passwordInput.value;
  const encryption = document.querySelector(
    'input[name="encryption"]:checked'
  ).id;

  // Check if the 'hidden' checkbox is checked
  const hidden = hiddenInput.checked ? "true" : "false";

  // Create the WiFi string for the QR code
  let wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`;

  // Generate the QR code
  QRCode.toDataURL(
    wifiString,
    { errorCorrectionLevel: "H" },
    function (err, url) {
      if (err) throw err;
      qrCodeContainer.innerHTML = `<img src="${url}" alt="QR Code" />`;
    }
  );
}

// Event listeners for button clicks
generateButton.addEventListener("click", generateQRCode);

// Password visibility toggle
passwordInput.addEventListener("input", function () {
  const passwordType = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = passwordType;
});

// Download JPG
downloadJpgButton.addEventListener("click", function () {
  const qrImage = qrCodeContainer.querySelector("img");
  const url = qrImage.src;
  const link = document.createElement("a");
  link.href = url;
  link.download = "wifi-qr-code.jpg";
  link.click();
});

// Download SVG
downloadSvgButton.addEventListener("click", function () {
  const ssid = ssidInput.value;
  const password = passwordInput.value;
  const encryption = document.querySelector(
    'input[name="encryption"]:checked'
  ).id;
  const hidden = hiddenInput.checked ? "true" : "false";

  let wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`;

  QRCode.toString(
    wifiString,
    { type: "svg", errorCorrectionLevel: "H" },
    function (err, svg) {
      if (err) throw err;
      const link = document.createElement("a");
      const blob = new Blob([svg], { type: "image/svg+xml" });
      link.href = URL.createObjectURL(blob);
      link.download = "wifi-qr-code.svg";
      link.click();
    }
  );
});
