
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const LOCAL_STORAGE_KEY = "company_job_postings";

function getJobById(id) {
  const jobs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  return jobs.find(j => String(j.id) === String(id));
}

const formatSalary = (salary) => {
  if (!salary?.showSalary) return "Hidden";
  let min = salary.min ? Number(salary.min).toLocaleString() : null;
  let max = salary.max ? Number(salary.max).toLocaleString() : null;
  let periodLabel = "";
  if (salary.period === "yearly") periodLabel = "per year";
  else if (salary.period === "monthly") periodLabel = "per month";
  else if (salary.period === "hourly") periodLabel = "per hour";

  if (!min && !max) return "Not specified";
  if (min && max) return `$${min} - $${max} ${periodLabel}`;
  if (min) return `$${min}+ ${periodLabel}`;
  return `$${max} ${periodLabel}`;
};

const ViewJobPosting = () => {
  const { id } = useParams();
  const job = getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg px-8 py-10 max-w-xl w-full text-center">
          <Eye className="h-12 w-12 mx-auto text-red-600 mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-red-500">Job Not Found</h1>
          <p className="text-muted-foreground mb-4">
            No job posting was found for ID: <span className="font-semibold text-red-600">{id}</span>
          </p>
          <Button asChild>
            <Link to="/company/jobs">Back to Job Postings</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Ensure all optional props for legacy jobs
  const skillsArray = job.skills
    ? Array.isArray(job.skills)
      ? job.skills
      : job.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];
  const requirements = job.requirements || "";
  const benefits = job.benefits || "";
  const description = job.description || "";
  const remote = job.remote === true || job.remote === "true";
  const experienceLevel = job.experience || job.level || "";
  const salary = job.salary || {};

  return (
    <div className="min-h-screen flex flex-col items-center bg-background pb-16">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg px-8 py-10 max-w-2xl w-full mt-16 text-left">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Eye className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">Job Details</h1>
          </div>
          <Button asChild variant="secondary" className="text-xs h-8 px-4">
            <Link to={`/company/jobs/${job.id}/edit`}>Edit</Link>
          </Button>
        </div>
        <div className="mb-6">
          <dl>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Job Title</dt>
              <dd className="font-semibold text-lg">{job.title}</dd>
            </div>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Location</dt>
              <dd className="font-medium">{job.location}</dd>
            </div>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Job Type</dt>
              <dd className="font-medium capitalize">{job.type || ""}</dd>
            </div>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Experience Level</dt>
              <dd className="font-medium capitalize">{experienceLevel}</dd>
            </div>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Remote?</dt>
              <dd className="font-medium">{remote ? "Yes" : "No"}</dd>
            </div>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Salary</dt>
              <dd className="font-medium">
                {formatSalary(salary)}
              </dd>
            </div>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Skills</dt>
              <dd>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.length === 0
                    ? <span className="text-muted-foreground text-sm">No skills listed</span>
                    : skillsArray.map((skill: string, idx: number) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{skill}</span>
                    ))}
                </div>
              </dd>
            </div>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Applications</dt>
              <dd className="font-medium">{job.applications}</dd>
            </div>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Status</dt>
              <dd>
                <span className={`px-2 py-1 rounded ${
                  job.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : ""}
                </span>
              </dd>
            </div>
            <div className="mb-2">
              <dt className="text-muted-foreground text-sm">Created</dt>
              <dd className="font-medium">{job.createdAt}</dd>
            </div>
          </dl>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Job Description</h2>
          <p className="text-base whitespace-pre-line">{description || "No description provided."}</p>
        </div>
        {requirements && (
          <div className="mb-4">
            <h2 className="font-semibold text-lg mb-2">Requirements</h2>
            <p className="whitespace-pre-line">{requirements}</p>
          </div>
        )}
        {benefits && (
          <div className="mb-4">
            <h2 className="font-semibold text-lg mb-2">Benefits & Perks</h2>
            <p className="whitespace-pre-line">{benefits}</p>
          </div>
        )}
        <Button asChild>
          <Link to="/company/jobs">Back to Job Postings</Link>
        </Button>
      </div>
    </div>
  );
};

export default ViewJobPosting;
