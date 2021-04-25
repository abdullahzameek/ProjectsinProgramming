import React from "react";
import SearchForm from "./SearchForm";
import { useHistory } from "react-router-dom";

//the landing page has three components - buttons leading to pages with all the named trees and unnamed trees
//as well the search form 
const Landing = () => {
  const history = useHistory();


  return (
    <div>
        <SearchForm />
    </div>
  );
};

export default Landing;
