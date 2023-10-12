import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Email_Auth/FirebaseConfig";
import "./home1.css";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {
  const navigate = useNavigate();
  const { users, setUsers, user, signOut } = useContext(AuthContext);
  const [selectedUserId, setSaelectedUserId] = useState();
  const [open, setOpen] = useState(false);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("A-Z");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    user?.uid && fetchUsers();
  }, [user?.uid]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "members")
    );

    setUsers(
      querySnapshot.docs.map((user) => {
        return {
          id: user.id,
          ...user.data(),
        };
      })
    );
  };

  useEffect(() => {
    filterAndSearchUsers();
  }, [users, filter, searchQuery]);

  const filterAndSearchUsers = () => {
    let filtered = [...users];

    if (filter === "A-Z") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === "Z-A") {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone.includes(searchQuery)
      );
    }

    setFilteredUsers(filtered);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDialogue = () => {
    setOpen(!open);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const deleteHandler = async () => {
    console.log(" delte handle r called", user, selectedUserId);
    await deleteDoc(doc(db, "users", user.uid, "members", selectedUserId));
    fetchUsers();
    handleDialogue();
  };

  return (
    <div className="main-container">
      <div
        style={{
          display: "flex",
          gap: "150px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            position: "fixed",
            right: "20px",
            bottom: "20px",
            background: "blue",
            border: "2px solid geen",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => navigate("/add")}>
            <AddIcon sx={{ color: "#fff" }} />
          </IconButton>
        </div>

        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", gap: 20 }}></div>

          <div
            style={{
              display: "flex",
              gap: 850,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div className="filter">
              <FormControl sx={{ m: 1, minWidth: 110 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Filter
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  label="Filter"
                >
                  <MenuItem value="A-z">A-Z</MenuItem>
                  <MenuItem value="Z-A">Z-A</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <TextField
                input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                id="outlined-basic"
                label="Search"
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        {filteredUsers.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>No data found !!</h2>
        ) : (
          <ul className="ul">
            {filteredUsers.map((user) => (
              <li className="li" key={user.id}>
                <Card sx={{ maxWidth: 345, width: "80%" }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://img.goodfon.com/wallpaper/big/f/e1/tsvet-forma-fon-230.jpg"
                    title="green iguana"
                  />

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "center" }}
                    >
                      <div>{user.name}</div>
                      <div>{user.email}</div>
                      <div>{user.phone}</div>
                      <div>
                        <Button
                          startIcon={<Edit />}
                          onClick={() => {
                            navigate(`/edit/${user.id}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            setSaelectedUserId(user.id);
                            handleDialogue();
                          }}
                          startIcon={<Delete />}
                        ></Button>
                      </div>
                    </Typography>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogue}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure want to  Delete User ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This Action can not be undo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogue}>No</Button>
          <Button onClick={deleteHandler}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
