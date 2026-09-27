import React, { useState } from "react";
import identity from "../../config/identity";
import portfolioContent from "../../content/portfolio";

function AppShell({ title, subtitle, children }) {
  return (
    <div className="w-full h-full bg-ub-grey text-white overflow-y-auto windowMainScreen">
      <div className="sticky top-0 z-10 border-b border-white border-opacity-10 bg-black bg-opacity-30 backdrop-blur-sm px-4 py-3">
        <div className="text-xs uppercase tracking-[0.25em] text-gray-400">{identity.osName}</div>
        <div className="mt-1 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
            {subtitle ? <p className="text-sm text-gray-300">{subtitle}</p> : null}
          </div>
          <div className="text-xs text-gray-400">{identity.terminalPersona}</div>
        </div>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

function Section({ title, children, compact = false }) {
  return (
    <section className={(compact ? "space-y-2" : "space-y-3") + " rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-4"}>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">{title}</h3>
      {children}
    </section>
  );
}

function TagList({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded border border-emerald-700 border-opacity-60 bg-emerald-900 bg-opacity-20 px-2 py-1 text-xs text-emerald-100">
          {item}
        </span>
      ))}
    </div>
  );
}

function KeyValue({ label, value, href }) {
  if (!value) {
    return null;
  }

  return (
    <div className="text-sm text-gray-200">
      <span className="mr-2 text-gray-400">{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}

function AboutApp() {
  const { profile, focusAreas, skills, education, certifications, community, interests, socialLinks } = portfolioContent;

  return (
    <AppShell title="About" subtitle="You are exploring Alex Murimi's development workstation.">
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <Section title="About Alex Murimi">
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-semibold text-gray-100">{profile.name}</div>
                <div className="mt-1 text-sm text-emerald-200">{profile.title}</div>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-gray-200">{profile.summary}</p>
              <div className="grid gap-2 md:grid-cols-2">
                <KeyValue label="Location" value={profile.location} />
                <KeyValue label="Email" value={identity.email} href={`mailto:${identity.email}`} />
                <KeyValue label="Phone" value={identity.phone} />
                <KeyValue label="GitHub" value={identity.github.replace("https://", "")} href={identity.github} />
              </div>
            </div>
          </Section>

          <Section title="Focus">
            <TagList items={focusAreas} />
          </Section>

          <Section title="Core Technology Stack">
            <div className="grid gap-3 md:grid-cols-2">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group} className="rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-3">
                  <div className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-400">{group}</div>
                  <TagList items={items} />
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Education" compact>
            {education.map((entry) => (
              <div key={entry.institution} className="space-y-1 text-sm text-gray-200">
                <div className="font-medium text-gray-100">{entry.credential}</div>
                <div>{entry.institution}</div>
                {entry.period ? <div className="text-gray-400">{entry.period}</div> : null}
              </div>
            ))}
          </Section>

          <Section title="Certifications" compact>
            <ul className="space-y-2 text-sm text-gray-200">
              {certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </Section>

          <Section title="Community" compact>
            {community.map((entry) => (
              <div key={entry.name} className="space-y-1 text-sm text-gray-200">
                <div className="font-medium text-gray-100">{entry.name}</div>
                <div className="text-emerald-200">{entry.role}</div>
                <p className="leading-6 text-gray-300">{entry.summary}</p>
              </div>
            ))}
          </Section>

          <Section title="Interests" compact>
            <TagList items={interests} />
          </Section>

          <Section title="Links" compact>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <KeyValue key={link.label} label={link.label} value={link.url.replace("mailto:", "")} href={link.url} />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}

function ExperienceApp() {
  return (
    <AppShell title="Experience" subtitle="Production systems, backend performance, cloud platforms, and community engineering.">
      <div className="space-y-4">
        {portfolioContent.experience.map((entry) => (
          <Section key={`${entry.company}-${entry.role}`} title={entry.company}>
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-lg font-semibold text-gray-100">{entry.role}</div>
                <div className="text-sm text-emerald-200">{entry.company}</div>
              </div>
              <div className="text-sm text-gray-400">{entry.period}</div>
            </div>
            {entry.summary ? <p className="text-sm leading-7 text-gray-200">{entry.summary}</p> : null}
            {entry.highlights && entry.highlights.length > 0 ? (
              <ul className="space-y-2 pl-5 text-sm leading-7 text-gray-200 list-disc marker:text-emerald-300">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">Additional detail was not provided in the resume.</p>
            )}
            <TagList items={entry.technologies} />
          </Section>
        ))}
      </div>
    </AppShell>
  );
}

function ProjectDetails({ project }) {
  return (
    <div className="space-y-4 rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-4">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-gray-400">Project</div>
        <div className="mt-1 text-xl font-semibold text-gray-100">{project.name}</div>
      </div>

      <Section title="Overview" compact>
        <p className="text-sm leading-7 text-gray-200">{project.overview}</p>
      </Section>

      {project.problem ? (
        <Section title="Problem" compact>
          <p className="text-sm leading-7 text-gray-200">{project.problem}</p>
        </Section>
      ) : null}

      {project.solution ? (
        <Section title="What I Built" compact>
          <p className="text-sm leading-7 text-gray-200">{project.solution}</p>
        </Section>
      ) : null}

      {project.architecture ? (
        <Section title="Architecture / Technical Approach" compact>
          <p className="text-sm leading-7 text-gray-200">{project.architecture}</p>
        </Section>
      ) : null}

      {project.technologies && project.technologies.length > 0 ? (
        <Section title="Technologies" compact>
          <TagList items={project.technologies} />
        </Section>
      ) : null}

      {project.impact ? (
        <Section title="Impact" compact>
          <p className="text-sm leading-7 text-gray-200">{project.impact}</p>
        </Section>
      ) : null}

      <Section title="Links" compact>
        {project.links && project.links.length > 0 ? (
          <div className="space-y-2 text-sm text-gray-200">
            {project.links.map((link) => (
              <div key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No public links were provided for this project.</p>
        )}
      </Section>
    </div>
  );
}

function ProjectsApp() {
  const [selectedProjectId, setSelectedProjectId] = useState(portfolioContent.projects[0]?.id || null);
  const selectedProject = portfolioContent.projects.find((project) => project.id === selectedProjectId) || portfolioContent.projects[0];

  return (
    <AppShell title="Projects" subtitle="Selected systems and products built across backend, cloud, AI, and IoT work.">
      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
        <div className="rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-3">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-400">Project Index</div>
          <div className="space-y-2">
            {portfolioContent.projects.map((project) => {
              const isActive = project.id === selectedProject?.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className={(isActive ? "border-emerald-500 bg-emerald-900 bg-opacity-20 text-white" : "border-white border-opacity-10 bg-black bg-opacity-20 text-gray-300 hover:border-emerald-800 hover:text-white") + " w-full rounded border px-3 py-3 text-left transition"}
                >
                  <div className="text-sm font-medium">{project.name}</div>
                  <div className="mt-1 text-xs text-gray-400">{project.technologies.slice(0, 3).join(" • ")}</div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedProject ? <ProjectDetails project={selectedProject} /> : null}
      </div>
    </AppShell>
  );
}

function WritingApp() {
  return (
    <AppShell title="Writing" subtitle="Technical notes, ideas, and long-form thinking.">
      <Section title="Writing">
        <p className="text-sm leading-7 text-gray-200">{portfolioContent.writingNote}</p>
      </Section>
    </AppShell>
  );
}

function ResumeApp() {
  return (
    <AppShell title="Resume" subtitle="Current resume for Alex Murimi.">
      <div className="space-y-4">
        <Section title="Document" compact>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-200">{identity.resumePath}</div>
            <a href={identity.resumePath} target="_blank" rel="noreferrer noopener" className="text-sm underline underline-offset-2 text-emerald-200">
              Open resume
            </a>
          </div>
        </Section>
        <div className="h-[70vh] overflow-hidden rounded border border-white border-opacity-10 bg-black bg-opacity-20">
          <iframe title="Alex Murimi Resume" src={identity.resumePath} className="h-full w-full" frameBorder="0"></iframe>
        </div>
      </div>
    </AppShell>
  );
}

export const displayAbout = () => <AboutApp />;
export const displayProjects = () => <ProjectsApp />;
export const displayExperience = () => <ExperienceApp />;
export const displayWriting = () => <WritingApp />;
export const displayResume = () => <ResumeApp />;
