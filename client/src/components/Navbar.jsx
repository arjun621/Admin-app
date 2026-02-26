import { useRef } from "react";
import api from "../services/api";

const Navbar = ({ user, setUser, onLogout, title }) => {
  const fileRef = useRef();

  const handleUpload = async (e) => {
  const formData = new FormData();
  formData.append("picture", e.target.files[0]);

  try {
    const res = await api.put("/auth/profile-picture", formData);
    setUser(res.data.user);
  } catch (err) {
    console.log(err);
  }
};

  const handleRemove = async () => {
    try {
      const res = await api.delete("/auth/profile-picture");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
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
          onChange={handleUpload}
          style={styles.hiddenInput}
        />

        <button style={styles.button} onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
