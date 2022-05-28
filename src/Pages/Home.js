import React, { useState, useContext } from "react";
import Axios from "axios";

import {
  Row,
  Container,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

import UserCard from "../Components/UserCard";
import Repos from "../Components/Repos";
import { Redirect } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

const Home = () => {
  
  //conext batyega ki user allow hai to fetch this page or not
  const context = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

//method to make webrequest aur store kare all data in our states  
  const fetchDetails = async () => {
    
    // try catch to check whether ki username exists b karta hai kya ? 
    try {
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      setUser(data);
    } catch (error) {
      toast("Not able to locate user", { type: "error" });
    }
  };

  //put anypage behind login
  
  if (!context.user?.uid) {
    return <Redirect to="/Signin" />;
  }
  
  //agar contest ka pass user ka uid hai to return karodo nicha vala 
  return (
    <Container>
      <Row className=" mt-3">
        <Col md="5">
          <InputGroup>
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Please provide the GitHub username"
            />
            <InputGroupAddon addonType="append">
              <Button onClick={fetchDetails} color="dark">
                Fetch User
              </Button>
            </InputGroupAddon>
          </InputGroup>
          //if user is present fetch user and pass prop otherwise null
          {user ? <UserCard user={user} /> : null}
        </Col>
          //if user exists repos uthaloo 
        <Col md="7">{user ? <Repos repos_url={user.repos_url} /> : null}</Col>
      </Row>
    </Container>
  );
};
export default Home;
