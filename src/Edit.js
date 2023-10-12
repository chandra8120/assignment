import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Email_Auth/FirebaseConfig";

const Edit = () => {
  const { user, users } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [editUser, setEditUser] = useState(
    users.find((user) => user.id === userId)
  );

  const handleUser = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };




  const updateHandler = async () => {
    await setDoc(
      doc(db, "users", user.uid, "members", userId),
      {
        name: editUser.name,
        email: editUser.email,
        phone: editUser.phone,
      },
      { merge: true }
    );
    navigate("/");
  };

  return (
    <div style={{overflowX:"none",overflowY:"none"}}>
     
      <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:'center',textAlign:'center',gap:10}}>
      <h2>welcome to edit</h2>
        <div>
          <TextField
            placeholder="name"
            name="name"
            value={editUser.name}
            onChange={handleUser}
          />
        </div>
        <div>
          <TextField
            placeholder="email"
            name="email"
            value={editUser.email}
            onChange={handleUser}
          />
        </div>
        <div>
          <TextField
            placeholder="phone"
            name="phone"
            value={editUser.phone}
            onChange={handleUser}
          />
        </div>
        <Button sx={{width:"18%"}} variant="contained" onClick={updateHandler}>
          Save 
        </Button>
      </div>
    </div>
  );
};

export default Edit;
