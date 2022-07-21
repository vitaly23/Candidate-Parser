const date = require('date-fns');

// Used as a simple unique id
let candidate_id_counter = 0;
let job_id_counter = 0;

// The main function
const exportData = async (candidate_data) => {
    const result_arr = [];
    for (const [key, candidate] of Object.entries(candidate_data)) {
        // Handles candidate details
        let user_object = get_users_basic_details(candidate);
        // Handles jobs
        if(key >= candidate_data.length -1){
            user_object['jobs'] = analyze_work_experience(candidate);
        }
        user_object['jobs'] = analyze_work_experience(candidate);
        result_arr.push(user_object);
    }
    return result_arr;
 }

function set_work_end_date(isCurrentJob, end_date){
    let new_end_date;
    if(!isCurrentJob) {
        new_end_date = end_date;
    } else {
        new_end_date =  date.format(new Date(),'MMM/dd/yyyy')
    }
    return new_end_date;
}

function get_users_basic_details(candidate) {
    const first_name = candidate['contact_info']['name']['given_name']
    const last_name = candidate['contact_info']['name']['family_name']
    return {
            "candidate_id": candidate_id_counter++,
            "candidate_name": `${first_name} ${last_name}`,
            jobs: []
        };
}

function analyze_work_experience(candidate) {
    let gap;
    let jobs = []

    // sort jobs by start date
    const sorted_jobs_asc = candidate['experience'].sort(function (first,second) {
        return new Date(first['start_date']) - new Date(second['start_date']);
    });

    const keys = Object.keys(sorted_jobs_asc);
    // for each job extract relevant details
    keys.forEach((_, index) => {
        const job_title = sorted_jobs_asc[index].title;
        const start_date = sorted_jobs_asc[index].start_date;
        const end_date = set_work_end_date(sorted_jobs_asc[index]['current_job'], sorted_jobs_asc[index]['end_date'])
        // If it's not his last job
        if(index < parseInt(candidate['experience'].length)-1) {
            const next_job_start = sorted_jobs_asc[index + 1]['start_date'];
            gap = date.differenceInDays(new Date(next_job_start), new Date(end_date));
        }
        // If it's his last job
        else {
                // If it is not his current job -> gap = (today - end date)
                if(!sorted_jobs_asc[index]['current_job']){
                    gap = date.differenceInDays(new Date(), new Date(end_date));
                }
                else {
                // If this is his current job
                    gap = 0;
                }
            }
            jobs.push(create_job_object(job_title, start_date, end_date, gap));
    });
    return jobs;
}
function create_job_object(job_title, start_date, end_date, gap){
    return {
        "job_id": job_id_counter++,
        "job_title": job_title,
        "start_date": start_date,
        "end_date": end_date,
        "gap_in_days": gap
    }
}

module.exports = { exportData, get_users_basic_details, analyze_work_experience, create_job_object, date };