import React, { useState, useEffect } from "react";
import Axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";

const Repos = ({ repos_url }) => {
 // ([]) bcz we get array of repos
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    //extracting 
    const { data } = await Axios.get(repos_url);
    // calling and setting data to states
    setRepos(data);
  };
  // as soon as i grab url fretch repos()  start hojyga which will fetch everything into my state and fill the repos
  useEffect(() => {
    fetchRepos(); 
  }, [repos_url]); //trigger point

  return (
    <ListGroup>
    //loop through repos list using map
      {repos.map((repo) => (
        <ListGroupItem key={repo.id}>
          <div className="text-secondary">{repo.name}</div>
          <div className="text-info">{repo.language}</div>
          <div className="text-dark">{repo.description}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
export default Repos;
