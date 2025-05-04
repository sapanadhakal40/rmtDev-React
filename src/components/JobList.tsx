import JobListItem from "./JobListItem";

export function JobList({ jobItems }) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <JobListItem />
      ))}
    </ul>
  );
}

export default JobList;
