import React from "react";
import { Card } from 'react-bootstrap';
import Job from "./Job";

const app_style = {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
    fontFamily: "Arial",
    margin: "10px"
}

export default function Candidate({ candidate }) {
    return (
        <Card style={app_style}>
            <Card.Body>
                <p>Hello {candidate.candidate_name},</p>
                <br/>
                { candidate.jobs.length > 0 ? candidate.jobs.map(job => {
                    return <Job key={job.job_id} job={job}/>
                    }) : return_job()
                }
            </Card.Body>
        </Card>
    )
}

function return_job() {
 return <p>No work experience</p>;
}