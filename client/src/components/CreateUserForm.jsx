import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import Cropper from "react-easy-crop";
import { createPortal } from "react-dom";

const CreateUserForm = ({ onCreate, message, error }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImg = async () => {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  const handleDoneCrop = async () => {
    const blob = await getCroppedImg();
    setCroppedImage(blob);
    setImageSrc(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    if (croppedImage) {
      formData.append("profilePic", croppedImage, "profile.jpg");
    }

    await onCreate(formData);


    setFullname("");
    setEmail("");
    setPassword("");
    setRole("user");
    setCroppedImage(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            // ✅ File size limit: 10MB
            if (file.size > 10 * 1024 * 1024) {
              toast.error("File must be under 10MB", { duration: 3000 });
              return;
            }

            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result);
            reader.readAsDataURL(file);
          }}
        />

        <br /><br />

        {croppedImage && (
          <img
            src={URL.createObjectURL(croppedImage)}
            alt="Preview"
            style={{ width: 120, height: 120 }}
          />
        )}

        <br /><br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <br /><br />

        <button type="submit">Create User</button>
      </form>

      {/* FULL SCREEN MODAL CROPPER */}
      {imageSrc &&
        createPortal(
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <div style={{ position: "relative", width: "100%", height: 400 }}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(e.target.value)}
                style={{ width: "100%", marginTop: 10 }}
              />

              <div style={{ marginTop: 15, display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => setImageSrc(null)}>Cancel</button>
                <button onClick={handleDoneCrop}>Done</button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
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

export default CreateUserForm;