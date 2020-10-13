export interface Contributor {
  account_number: string;
  created_date: Date;
  display_name: string;
  github_username: string;
  modified_date: Date;
  pk: string;
  profile_image: string;
  slack_username: string;
}

export interface Opening {
  active: boolean;
  created_date: Date;
  description: string;
  eligible_for_task_points: boolean;
  modified_date: Date;
  pay_per_day: number;
  pk: string;
  reports_to: string[];
  responsibilities: string[];
  skills: string[];
  team: string;
  title: string;
}
