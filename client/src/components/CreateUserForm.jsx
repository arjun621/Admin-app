import { useState } from "react";
import { toast } from "react-hot-toast";
import Cropper from "react-easy-crop";
import { useCallback } from "react";

const CreateUserForm = ({ onCreate, message, error }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [profilePic, setProfilePic] = useState(null);

  //crop profile pic
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const getCroppedImg = async () => {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
      image.onload = resolve;
    });

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
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg();
      formData.append("profilePic", croppedImage, "profile.jpg");
    }

    onCreate(formData);

    if (message) toast.success(message, {
      duration: 3000,
    });
    if (error) toast.error(error, {
      duration: 3000,
    });

    // Reset fields
    setFullname("");
    setEmail("");
    setPassword("");
    setRole("user");
    setProfilePic(null);
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          maxLength={30}
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        // required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        // required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          maxLength={30}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        // required
        />
        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            if (file.size > 10 * 1024 * 1024) {
              alert("File must be under 10MB");
              return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              setImageSrc(reader.result);
            };
          }}
        />
        {imageSrc && (
          <div style={{ position: "relative", width: 300, height: 300 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1} // square
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedAreaPixels) => {
                setCroppedAreaPixels(croppedAreaPixels);
              }}
            />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(e.target.value)}
            />
          </div>
        )}
        <br /><br />

        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <br /><br />

        <button type="submit">Create User</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateUserForm;
