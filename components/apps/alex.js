import React from "react";
import identity from "../../config/identity";
import portfolioContent from "../../content/portfolio";

function PlaceholderList({ items, emptyText }) {
  if (!items || items.length === 0) {
    return <p className="text-gray-300">{emptyText}</p>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="border border-gray-700 rounded px-3 py-2">
          {typeof item === "string" ? (
            <span>{item}</span>
          ) : (
            <div className="space-y-1">
              {item.name ? <div className="font-medium">{item.name}</div> : null}
              {item.role ? <div className="font-medium">{item.role}</div> : null}
              {item.company ? <div className="text-sm text-gray-300">{item.company}</div> : null}
              {item.period ? <div className="text-sm text-gray-300">{item.period}</div> : null}
              {item.description ? <div>{item.description}</div> : null}
              {item.summary ? <div>{item.summary}</div> : null}
              {item.credential ? <div>{item.credential}</div> : null}
              {item.institution ? <div className="text-sm text-gray-300">{item.institution}</div> : null}
              {item.notes ? <div>{item.notes}</div> : null}
              {item.link && item.link !== "YOUR_PROJECT_URL" && item.link !== "YOUR_WRITING_URL" ? (
                <a href={item.link} target="_blank" rel="noreferrer noopener" className="underline text-blue-300">
                  Open link
                </a>
              ) : null}
              {item.highlights ? (
                <ul className="list-disc ml-5 text-sm text-gray-200">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
              {item.tags ? (
                <div className="text-xs text-gray-300">{item.tags.join(" | ")}</div>
              ) : null}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function AppShell({ title, children }) {
  return (
    <div className="w-full h-full p-4 text-white bg-ub-grey overflow-y-auto windowMainScreen">
      <div className="mb-4 border-b border-gray-700 pb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-300">{identity.osName}</p>
      </div>
      {children}
    </div>
  );
}

function AboutApp() {
  const { profile, socialLinks, skills, education } = portfolioContent;

  return (
    <AppShell title="About">
      <div className="space-y-4">
        <div>
          <p className="text-lg font-medium">{profile.name}</p>
          <p className="text-sm text-gray-300">{profile.title}</p>
          <p className="mt-2">{profile.summary}</p>
        </div>
        <div>
          <p className="font-medium mb-2">Skills</p>
          <PlaceholderList items={skills} emptyText="No skills listed yet." />
        </div>
        <div>
          <p className="font-medium mb-2">Education</p>
          <PlaceholderList items={education} emptyText="No education details listed yet." />
        </div>
        <div>
          <p className="font-medium mb-2">Social Links</p>
          <ul className="space-y-2">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <span className="text-gray-300 mr-2">{link.label}:</span>
                <span>{link.url}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}

function ProjectsApp() {
  return (
    <AppShell title="Projects">
      <PlaceholderList items={portfolioContent.projects} emptyText="No projects listed yet." />
    </AppShell>
  );
}

function ExperienceApp() {
  return (
    <AppShell title="Experience">
      <PlaceholderList items={portfolioContent.experience} emptyText="No experience listed yet." />
    </AppShell>
  );
}

function WritingApp() {
  return (
    <AppShell title="Writing">
      <PlaceholderList items={portfolioContent.writing} emptyText="No writing entries listed yet." />
    </AppShell>
  );
}

function ResumeApp() {
  return (
    <AppShell title="Resume">
      <p className="mb-2">Resume path:</p>
      <p className="text-gray-300">{identity.resumePath}</p>
      <p className="mt-4 text-sm text-gray-400">
        Replace the placeholder file with your final resume and update identity configuration if needed.
      </p>
    </AppShell>
  );
}

export const displayAbout = () => <AboutApp />;
export const displayProjects = () => <ProjectsApp />;
export const displayExperience = () => <ExperienceApp />;
export const displayWriting = () => <WritingApp />;
export const displayResume = () => <ResumeApp />;
