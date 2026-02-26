import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { createPortal } from "react-dom";

const ImageCropper = ({ image, onCropComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // store cropped area
  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = () => {
    if (!croppedAreaPixels) return;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        onCropComplete(blob); // send cropped blob back
      }, "image/jpeg");
    };
  };

  return createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{ position: "relative", width: "100%", height: 400 }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // square crop
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        <div style={buttonRow}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleDone}>Done</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  width: 500,
  maxWidth: "90%",
};

const buttonRow = {
  marginTop: 15,
  display: "flex",
  justifyContent: "space-between",
};

export default ImageCropper;