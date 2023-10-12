import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Email_Auth/FirebaseConfig";

const drawerWidth = 240;
const navItems = ["Home", "Shop", "Products", "Cart"];

function DrawerAppBar(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

   const signout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
      });
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center"}}>


    
      <Typography variant="h6" sx={{ my: 2 }}>
      <Avatar>
      <img src="https://img.freepik.com/free-vector/letter-k-logo-concept-your-royal-brand_1017-33266.jpg?w=2000" width="100%" alt='cha' />
       </Avatar>
      </Typography>

   

      <Divider />
      {/* <List id="items">
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
            
           
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
     
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    
    <Box>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ background: "linear-gradient(to left, #642EFE 0%, #042483 100%)",minWidth:"500px",width:"100%"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", cursor: "pointer" },
            }}
         
          >
            <Avatar>
              <img src="https://img.freepik.com/free-vector/letter-k-logo-concept-your-royal-brand_1017-33266.jpg?w=2000" width="100%" alt="chaa" />
            </Avatar>
           
          </Typography>
          {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
             {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
       
              >
              
              </Button>
            ))}
          </Box>
          */}
          <div style={{position:"fixed",right:"10px"}}>
       <IconButton onClick={() => signout()}>
       <LogoutIcon sx={{color:"white"}}/>
       </IconButton> 
     </div>
        </Toolbar>
        
      </AppBar>
      
      {/* <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
          
        </Drawer>
      </Box> */}
      <div style={{width:"120%",marginTop:60, height: "50px",background: "linear-gradient(to left, #33ccff 0%, #ff99cc 100%)" }}>
        </div>
        <div>
        {props.children}
        </div>
    </Box>
    
    
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
