import { useRef, useState, useCallback } from "react";
import api from "../services/api";
import Cropper from "react-easy-crop";
import { toast } from "react-hot-toast";

const Navbar = ({ user, setUser, onLogout, title }) => {
  const fileRef = useRef();

  // cropping state
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);

  // helper to get cropped image blob
  const getCroppedImg = useCallback(async () => {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => { image.onload = resolve; });

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");

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
  }, [croppedAreaPixels, imageSrc]);

  // handle selecting image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB", { duration: 3000 });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  // handle Done button on crop modal
  const handleDoneCrop = async () => {
    if (!croppedAreaPixels) {
      toast.error("Please select crop area first", { duration: 3000 });
      return;
    }

    const blob = await getCroppedImg();

    if (blob.size > 10 * 1024 * 1024) {
      toast.error("Cropped image exceeds 10MB", { duration: 3000 });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("picture", blob, "profile.jpg");

      const res = await api.put("/auth/profile-picture", formData);
      setUser(res.data.user);
      toast.success("Profile picture updated!", { duration: 3000 });
      setImageSrc(null); // close cropper
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile picture", { duration: 3000 });
    }
  };

  const handleRemove = async () => {
    try {
      const res = await api.delete("/auth/profile-picture");
      setUser(res.data.user);
      toast.success("Profile picture removed", { duration: 3000 });
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove profile picture", { duration: 3000 });
    }
  };

  const imageUrl = user?.picture
    ? user.picture.startsWith("http")
      ? user.picture
      : `http://localhost:5000${user.picture}`
    : `https://ui-avatars.com/api/?name=${user?.fullname}`;

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "40px"
    },
    profile: {
      display: "flex",
      alignItems: "center",
      gap: "15px"
    },
    avatar: {
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #333",
      cursor: "pointer"
    },
    name: {
      fontWeight: "600"
    },
    button: {
      padding: "8px 14px",
      background: "#222",
      border: "1px solid #333",
      borderRadius: "6px",
      color: "#fff",
      cursor: "pointer"
    },
    hiddenInput: {
      display: "none"
    },
    removeBtn: {
      fontSize: "12px",
      color: "#ff4d4d",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.header}>
      <h1>{title}</h1>

      <div style={styles.profile}>
        <img
          src={imageUrl}
          alt="profile"
          style={styles.avatar}
          onClick={() => fileRef.current.click()}
        />

        <div>
          <div style={styles.name}>{user?.fullname}</div>
          {user?.picture && (
            <div style={styles.removeBtn} onClick={handleRemove}>
              Remove Photo
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileRef}
          onChange={handleFileChange}
          style={styles.hiddenInput}
        />

        <button style={styles.button} onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Cropper Modal */}
      {imageSrc && (
        <div style={overlay}>
          <div style={modal}>
            <div style={{ position: "relative", width: "100%", height: 400 }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
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

            <div style={buttonRow}>
              <button type="button" onClick={() => setImageSrc(null)}>Cancel</button>
              <button type="button" onClick={handleDoneCrop}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

const overlay = {
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

const modal = {
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