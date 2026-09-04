export type Application = {
  id: string;
  company: string;
  jobTitle: string;
  location: string | null;
  status: string;
  jobUrl: string | null;
  appliedDate: string | null;
  notes: string | null;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
