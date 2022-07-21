const dataParser = require('../dataParser');



const candidate_dummy_data = {
    "contact_info": {
        "name": {
            "formatted_name": "Aa Bb",
            "family_name": "Bb",
            "given_name": "Aa"
        },
        "experience": [],
    }
}
const candidate_dummy_data_result = {
    "candidate_id": 0,
    "candidate_name": "Aa Bb",
    "jobs": []
}

test('checks the creation of a minimal correct Candidate object',() => {
 expect(dataParser.get_users_basic_details(candidate_dummy_data)).toEqual(candidate_dummy_data_result)
});

/* End of test 1 */

const two_jobs_output = [
    {
        "job_id": 0,
        "job_title": "Ab Cd",
        "start_date": "Jan/01/2008",
        "end_date": "Dec/31/2008",
        "gap_in_days": 1
    },
    {
        "job_id": 1,
        "job_title": "Ef Gh",
        "start_date": "Jan/01/2009",
        "end_date": "Jan/01/2022",
        // 201 is for 21.7.22, need to increment manually if running later
        "gap_in_days": 201
    }
]

const two_jobs_input ={
    "experience": [
        {
            "current_job": false,
            "title": "Ab Cd",
            "start_date": "Jan/01/2008",
            "end_date": "Dec/31/2008",
        },
        {
            "current_job": false,
            "title": "Ef Gh",
            "start_date": "Jan/01/2009",
            "end_date": "Jan/01/2022",
        }
    ]
}

test('checks the creation of a correct Job object with two Jobs',() => {
    console.log(two_jobs_output[1]["gap_in_days"])
 expect(dataParser.analyze_work_experience(two_jobs_input)).toEqual(two_jobs_output)
});

/* End of test 2 */

