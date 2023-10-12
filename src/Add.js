import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./Email_Auth/FirebaseConfig";

const Add = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });

  const handleUser = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUserHandler = async () => {
    console.log(" at add handler :: ",user.uid,)
    await addDoc(collection(db, "users", user.uid, "members"), {
      ...newUser,
    });
    navigate("/");
  };

  return (
    <div>
      
      <div style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:'center',flexWrap:"wrap",gap:10,border:"2px solid green"}}>
      <h2>Add New User</h2>
        <div>
          <TextField
            placeholder="name"
            name="name"
            value={newUser.name}
            onChange={handleUser}
          />
        </div>
        <div>
          <TextField
            placeholder="email"
            name="email"
            value={newUser.email}
            onChange={handleUser}
          />
        </div>
        <div>
          <TextField
            placeholder="phone"
            name="phone"
            value={newUser.phone}
            onChange={handleUser}
          />
        </div>
        <Button  variant="contained" onClick={addUserHandler}>
          Add User
        </Button>
      </div>
    </div>
  );
};

export default Add;
