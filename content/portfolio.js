import identity from "../config/identity";

const portfolioContent = {
  profile: {
    name: identity.name,
    title: identity.professionalTitle,
    summary: identity.shortDescription,
  },
  experience: [
    {
      company: "YOUR_COMPANY_OR_ORGANIZATION",
      role: "YOUR_ROLE",
      period: "YOUR_DATE_RANGE",
      highlights: ["ADD_EXPERIENCE_HIGHLIGHTS"],
    },
  ],
  projects: [
    {
      name: "YOUR_PROJECT_NAME",
      description: "ADD_PROJECT_DESCRIPTION",
      link: "YOUR_PROJECT_URL",
      tags: ["TAG_1", "TAG_2"],
    },
  ],
  skills: ["ADD_SKILL_1", "ADD_SKILL_2", "ADD_SKILL_3"],
  education: [
    {
      institution: "YOUR_INSTITUTION",
      credential: "YOUR_DEGREE_OR_PROGRAM",
      period: "YOUR_DATE_RANGE",
      notes: "ADD_EDUCATION_NOTES",
    },
  ],
  writing: [
    {
      title: "YOUR_ARTICLE_OR_POST_TITLE",
      link: "YOUR_WRITING_URL",
      summary: "ADD_WRITING_SUMMARY",
    },
  ],
  socialLinks: [
    { label: "GitHub", url: identity.github },
    { label: "LinkedIn", url: identity.linkedin },
  ],
};

export default portfolioContent;
