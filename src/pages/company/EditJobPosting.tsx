import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LOCAL_STORAGE_KEY = "company_job_postings";

function getJobById(id) {
  const jobs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  return jobs.find(j => String(j.id) === String(id));
}

function updateJob(updatedJob) {
  const jobs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  const idx = jobs.findIndex(j => String(j.id) === String(updatedJob.id));
  if (idx !== -1) {
    jobs[idx] = updatedJob;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jobs));
    return true;
  }
  return false;
}

// Helper to safely get a field
const safe = (val, fallback) => val !== undefined && val !== null ? val : fallback;

const emptySalary = { min: "", max: "", period: "yearly", showSalary: true };

const EditJobPosting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = getJobById(id);

  const [form, setForm] = useState(job ? {
    title: safe(job.title, ""),
    location: safe(job.location, ""),
    type: safe(job.type, "full-time"),
    experience: safe(job.experience, safe(job.level, "mid-level")),
    salary: {
      min: safe(job.salary?.min, ""),
      max: safe(job.salary?.max, ""),
      period: safe(job.salary?.period, "yearly"),
      showSalary: job.salary?.showSalary !== undefined ? job.salary.showSalary : true,
    },
    skills: safe(Array.isArray(job.skills) ? job.skills.join(", ") : job.skills, ""),
    description: safe(job.description, ""),
    requirements: safe(job.requirements, ""),
    benefits: safe(job.benefits, ""),
    remote: job.remote === true || job.remote === "true",
    status: safe(job.status, "active"),
  } : null);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg px-8 py-10 max-w-xl w-full text-center">
          <Edit className="h-12 w-12 mx-auto text-red-600 mb-4" />
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

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("salary.")) {
      setForm(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          [name.slice(7)]: value
        }
      }));
    } else if (type === "checkbox") {
      setForm(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (value: string, fieldName: string) => {
    if (fieldName === "salary.period") {
      setForm(prev => ({
        ...prev,
        salary: { ...prev.salary, period: value }
      }));
    } else if (fieldName === "type" || fieldName === "experience") {
      setForm(prev => ({
        ...prev,
        [fieldName]: value
      }));
    }
  };

  const handleSalaryVisibilityChange = (checked: boolean) => {
    setForm(prev => ({
      ...prev,
      salary: { ...prev.salary, showSalary: checked }
    }));
  };

  const handleToggleChange = (checked: boolean) => {
    setForm(prev => ({
      ...prev,
      remote: checked
    }));
  };

  const handleStatusToggle = () => {
    setForm(f => ({
      ...f,
      status: f.status === "active" ? "closed" : "active"
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let formattedSkills = Array.isArray(form.skills)
      ? form.skills
      : form.skills
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);

    const updated = {
      ...job,
      ...form,
      skills: formattedSkills,
      status: form.status || "active",
    };
    const success = updateJob(updated);
    if (success) {
      toast({
        title: "Job Updated",
        description: "The job posting has been successfully updated.",
      });
      navigate(`/company/jobs/${job.id}`);
    } else {
      toast({
        title: "Error",
        description: "Failed to update job posting.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background pb-16">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg px-8 py-10 max-w-2xl w-full mt-16 text-left">
        <div className="flex items-center gap-2 mb-4">
          <Edit className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold">Edit Job Posting</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Basic Info */}
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Job Title*</Label>
              <Input name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="location">Location*</Label>
              <Input name="location" value={form.location} onChange={handleChange} required />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <Label htmlFor="type">Job Type*</Label>
                <Select value={form.type} onValueChange={v => handleSelectChange(v, "type")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label htmlFor="experience">Experience Level*</Label>
                <Select value={form.experience} onValueChange={v => handleSelectChange(v, "experience")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid-level">Mid-Level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead / Principal</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="remote">Remote Job</Label>
              <Switch checked={form.remote} onCheckedChange={handleToggleChange} />
              <span className="ml-2 text-sm text-muted-foreground">
                {form.remote ? "This job can be performed fully remotely" : "In-person or hybrid"}
              </span>
            </div>
          </div>
          {/* Salary */}
          <div className="grid gap-4 border-t pt-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="salary-visibility">Display Salary Range</Label>
              <Switch
                checked={form.salary.showSalary}
                onCheckedChange={handleSalaryVisibilityChange}
              />
            </div>
            {form.salary.showSalary && (
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full">
                  <Label htmlFor="salary.min">Minimum Salary</Label>
                  <Input
                    id="salary.min"
                    name="salary.min"
                    type="number"
                    value={form.salary.min}
                    onChange={handleChange}
                    placeholder="e.g. 80000"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="salary.max">Maximum Salary</Label>
                  <Input
                    id="salary.max"
                    name="salary.max"
                    type="number"
                    value={form.salary.max}
                    onChange={handleChange}
                    placeholder="e.g. 120000"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="salary.period">Period</Label>
                  <Select
                    value={form.salary.period}
                    onValueChange={v => handleSelectChange(v, "salary.period")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yearly">Per Year</SelectItem>
                      <SelectItem value="monthly">Per Month</SelectItem>
                      <SelectItem value="hourly">Per Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          {/* Skills and details */}
          <div className="grid gap-4 border-t pt-4">
            <div>
              <Label htmlFor="skills">Required Skills (comma separated)*</Label>
              <Input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                required
                placeholder="e.g. React, TypeScript, Node.js"
              />
            </div>
            <div>
              <Label htmlFor="description">Job Description*</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="min-h-32"
              />
            </div>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                className="min-h-24"
              />
            </div>
            <div>
              <Label htmlFor="benefits">Benefits & Perks</Label>
              <Textarea
                name="benefits"
                value={form.benefits}
                onChange={handleChange}
                className="min-h-24"
              />
            </div>
          </div>
          <div>
            <Label className="block mb-1 text-sm font-medium text-muted-foreground">Status</Label><br />
            <Button type="button"
              className={form.status === "active"
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
              onClick={handleStatusToggle}
            >
              {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
            </Button>
            <span className="ml-2 text-xs text-muted-foreground">(Click to toggle)</span>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button asChild variant="outline" type="button">
              <Link to={`/company/jobs/${job.id}`}>Cancel</Link>
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPosting;
