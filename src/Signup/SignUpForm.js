import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  NativeSelect,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./signupform.css";
import logo from "./Abstraction.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Email_Auth/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [city, setCity] = React.useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    password: "",
    howDidYouHear: [],
    city: "Mumbai",
    state: "Gujarat",
  });

  const handleChange1 = (e) => {
    setCity(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          howDidYouHear: [...formData.howDidYouHear, value],
        });
      } else {
        setFormData({
          ...formData,
          howDidYouHear: formData.howDidYouHear.filter(
            (item) => item !== value
          ),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(" user :: ", user);
        setIsAuthenticated(true);
        await setDoc(doc(db, "users", user.uid), {
          ...formData,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log("error :: ", error);
        alert("enter correct input details"+error)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name.length &&
      formData.email &&
      formData.password &&
      formData.phone.length
    ) {
      signUp();
    } else {
      console.log("wrong inputs");
    }
  };

  return (

    <div className="main">
<div className="whole-data">

      <div className="first-div">
        <img style={{ width: "100%", height: "100%" }} src={logo} alt="img" />
      </div>

      <div className="form-container">

        <div
          className="in-form">
          <div style={{ color: "#FFFFFF", fontSize: "20px" }}> Registration Form </div>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ color: "white" }}>
                <TextField
                  id="standard-textarea"
                  label="Name"
                  variant="standard"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                    placeholderStyle: { color: "red" },
                  }}
                />
              </div>

              <div>
                <TextField
                  id="standard-textarea"
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                    placeholderStyle: { color: "red" },
                  }}
                  variant="standard"
                />
              </div>

              <div>
                <TextField
                  type="password"
                  id="standard-textarea"
                  label="Password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                    placeholderStyle: { color: "red" },
                  }}
                  variant="standard"
                />
              </div>

              <div>
                <TextField
                  id="standard-textarea"
                  label="Phone Number"
                  variant="standard"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                    placeholderStyle: { color: "red" },
                  }}
                  name="phone"
                />
              </div>
            </div>
            <div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <div>
                    <label>Gender :</label>
                    <label>Male</label>
                    <input type="radio" />
                    <label>Female</label>
                    <input type="radio" />
                    <label>Others</label>
                    <input type="radio" />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label>How did you hear about this?</label>
              <div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="howDidYouHear"
                      value="LinkedIn"
                      checked={formData.howDidYouHear.includes("LinkedIn")}
                      onChange={handleChange}
                    />
                    LinkedIn
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="howDidYouHear"
                      value="Friends"
                      checked={formData.howDidYouHear.includes("Friends")}
                      onChange={handleChange}
                    />
                    Friends
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="howDidYouHear"
                      value="Job Portal"
                      checked={formData.howDidYouHear.includes("Job Portal")}
                      onChange={handleChange}
                    />
                    Job Portal
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="howDidYouHear"
                      value="Others"
                      checked={formData.howDidYouHear.includes("Others")}
                      onChange={handleChange}
                    />
                    Others
                  </label>
                </div>
              </div>
            </div>

            <div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel
                    variant="standard"
                    htmlFor="uncontrolled-native"
                    sx={{
                      color: "white",
                      fontFamily: "bold",
                      fontSize: "25px",
                    }}
                  >
                    City
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: "city",
                      id: "uncontrolled-native",
                    }}
                  >
                    <option value={formData.city}>Mumbai</option>
                    <option value={formData.city}>Pune</option>
                    <option value={formData.city}>Ahmedabad</option>
                  </NativeSelect>
                </FormControl>
              </Box>
            </div>

            <div>
              <label>State:</label>
              <input
                style={{
                  borderRadius: "10px",
                  width: "50%",
                  height: "20px",
                  backgroundColor: "#0507A3",
                  color: "white",
                }}
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div>
              <Button
                onClick={handleSubmit}
                sx={{
                  border: "1px solid black",
                  color: "black",
                  width: "100%",
                  // background: "linear-gradient(to right, #3FC6D6, #1916D6)",
                  background: "#003465",
                  textTransform: "none",
                  color: "#FFFFFF",
                }}
              >
                Save
              </Button>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  fontSize: "13px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>Already have an account?</p>
                <Button
                  onClick={()=>navigate("/login")}
                  sx={{ textTransform: "none", color: "white" }}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignUpForm;
