import React, { useState } from "react";
import { Container } from "react-bootstrap";
import './App.css';
import useFetchCandidates from "./useFetchCandidates";
import Candidate from "./Candidate";


function App() {
    const [params, setParams] = useState({})
    const { candidates, loading, error } = useFetchCandidates(params);

  return (
   <Container>
       <h1>Candidate Analyzer</h1>
       <br/>
       {loading && <h1>Loading...</h1>}
       {error && <h1>Error, please try refreshing the page</h1>}
       {candidates.map(candidate => {
           return <Candidate key={candidate.candidate_id} candidate={candidate} />
       })}
   </Container>
  );
}

export default App;
