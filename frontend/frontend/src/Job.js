import React from "react";
import Gap from "./Gap";

export default function Job ({ job }) {
    return (
        <div>
            <p>Worked as: {job.job_title} from {job.start_date} to {job.end_date}</p>
            <Gap key={job.job_id} gap={job.gap_in_days}/>
        </div>
    )
}

















// "job_title": job_title,
//     "start_date": start_date,
//     "end_date": end_date,
//     "gap_in_days": gap