import React, { useMemo, useState } from "react";
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

function emphasizeMetrics(text) {
  const parts = text.split(/(\d+[\d,.]*(?:\s?(?:queries|ms|s|seconds?))?\s*(?:to|→)\s*\d+[\d,.]*(?:\s?(?:queries|ms|s|seconds?))?)/gi);
  return parts.map((part, index) => {
    const isMetric = /(\d+[\d,.]*(?:\s?(?:queries|ms|s|seconds?))?\s*(?:to|→)\s*\d+[\d,.]*(?:\s?(?:queries|ms|s|seconds?))?)/i.test(part);
    if (!isMetric) return <span key={`${part}-${index}`}>{part}</span>;
    return (
      <span key={`${part}-${index}`} className="rounded bg-emerald-900 bg-opacity-30 px-1.5 py-0.5 text-emerald-200">
        {part}
      </span>
    );
  });
}

function AboutApp() {
  const { profile, focusAreas, education, certifications, interests } = portfolioContent;

  return (
    <AppShell title="System Information" subtitle="Alex's engineering profile and workstation context.">
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <Section title="Profile">
            <div className="space-y-3">
              <div className="text-2xl font-semibold text-gray-100">{profile.name}</div>
              <div className="text-emerald-200 text-sm">{profile.title}</div>
              <p className="max-w-3xl text-sm leading-7 text-gray-200">{profile.summary}</p>
            </div>
          </Section>

          <Section title="Focus Areas">
            <TagList items={focusAreas} />
          </Section>

          <Section title="Background">
            <p className="text-sm text-gray-200 leading-7">{identity.shortDescription}</p>
          </Section>

          <Section title="Interests" compact>
            <TagList items={interests} />
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="System">
            <div className="space-y-1 text-sm text-gray-200">
              <div>{identity.osName} v{identity.osVersion}</div>
              <div>User: {identity.userName}</div>
              <div>Machine: {identity.machineName}</div>
              <div>Built with: Next.js, React, Tailwind</div>
            </div>
          </Section>

          <Section title="Contact" compact>
            <div className="space-y-2">
              <KeyValue label="Email" value={identity.email} href={`mailto:${identity.email}`} />
              <KeyValue label="Phone" value={identity.phone} />
              <KeyValue label="Location" value={identity.location} />
              <KeyValue label="GitHub" value={identity.github.replace("https://", "")} href={identity.github} />
            </div>
          </Section>

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
        </div>
      </div>
    </AppShell>
  );
}

function ExperienceApp() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = portfolioContent.experience[selectedIndex] || portfolioContent.experience[0];

  return (
    <AppShell title="EXPERIENCE" subtitle="career.log">
      <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-3">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-400">Role Index</div>
          <div className="space-y-2">
            {portfolioContent.experience.map((entry, index) => {
              const active = index === selectedIndex;
              return (
                <button
                  key={`${entry.company}-${entry.role}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={(active ? "border-emerald-500 bg-emerald-900 bg-opacity-20" : "border-white border-opacity-10 hover:border-emerald-800") + " w-full rounded border px-3 py-2 text-left transition"}
                >
                  <div className="text-xs text-gray-400">{entry.period}</div>
                  <div className="text-sm text-white mt-0.5">{entry.company}</div>
                  <div className="text-xs text-emerald-200 mt-0.5">{entry.role}</div>
                </button>
              );
            })}
          </div>
        </div>

        {selected ? (
          <div className="experience-panel space-y-4 rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-4">
            <Section title="Role" compact>
              <div className="text-lg font-semibold text-gray-100">{selected.role}</div>
              <div className="text-sm text-emerald-200">{selected.company}</div>
              <div className="text-sm text-gray-400">{selected.period}</div>
            </Section>

            <Section title="Engineering Work" compact>
              <p className="text-sm leading-7 text-gray-200">{selected.summary || "No additional summary provided."}</p>
            </Section>

            <Section title="Impact" compact>
              {selected.highlights && selected.highlights.length > 0 ? (
                <ul className="space-y-2 text-sm leading-7 text-gray-200">
                  {selected.highlights.map((highlight) => (
                    <li key={highlight} className="rounded border border-white border-opacity-10 bg-black bg-opacity-20 px-3 py-2">
                      {emphasizeMetrics(highlight)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Additional detail was not provided in the resume.</p>
              )}
            </Section>

            <Section title="Technologies" compact>
              <TagList items={selected.technologies} />
            </Section>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}

function ProjectDetails({ project }) {
  const architectureParts = useMemo(() => {
    if (!project.architecture) return [];
    return project.architecture
      .split(/\.\s*/)
      .map((part) => (typeof part === "string" ? part.trim() : ""))
      .filter(Boolean);
  }, [project]);

  return (
    <div className="project-panel space-y-4 rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-4">
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
        <Section title="Solution" compact>
          <p className="text-sm leading-7 text-gray-200">{project.solution}</p>
        </Section>
      ) : null}

      {project.architecture ? (
        <Section title="Engineering" compact>
          <div className="space-y-2 text-sm text-gray-200">
            {architectureParts.length > 0
              ? architectureParts.map((item) => <div key={item}>{item}</div>)
              : <div>{project.architecture}</div>}
          </div>
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

  if (!portfolioContent.projects || portfolioContent.projects.length === 0) {
    return (
      <AppShell title="PROJECTS" subtitle="Project directory">
        <Section title="Projects">
          <p className="text-sm text-gray-300">No projects are available right now.</p>
        </Section>
      </AppShell>
    );
  }

  return (
    <AppShell title="PROJECTS" subtitle="Developer project directory">
      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-3">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-400">Index</div>
          <div className="space-y-2">
            {portfolioContent.projects.map((project) => {
              const isActive = project.id === selectedProject?.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className={(isActive ? "border-emerald-500 bg-emerald-900 bg-opacity-20 text-white" : "border-white border-opacity-10 bg-black bg-opacity-20 text-gray-300 hover:border-emerald-800 hover:text-white") + " w-full rounded border px-3 py-2 text-left transition"}
                >
                  <div className="text-xs text-gray-400">{isActive ? "└── selected" : "├── project"}</div>
                  <div className="text-sm font-medium">{project.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedProject ? <ProjectDetails key={selectedProject.id} project={selectedProject} /> : null}
      </div>
    </AppShell>
  );
}

function WritingApp() {
  return (
    <AppShell title="WRITING" subtitle="notes/">
      <Section title="Directory status">
        <p className="text-sm leading-7 text-gray-200">No published notes yet.</p>
        <p className="text-sm leading-7 text-gray-300">This directory is reserved for technical notes, engineering lessons, and ideas from real project work.</p>
      </Section>
    </AppShell>
  );
}

function ResumeApp() {
  return (
    <AppShell title="RESUME" subtitle="Native document viewer">
      <div className="rounded border border-white border-opacity-10 bg-black bg-opacity-30">
        <div className="flex flex-col gap-2 border-b border-white border-opacity-10 px-3 py-2 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-200">resume.pdf</div>
          <div className="flex gap-2 text-sm">
            <a href={identity.resumePath} target="_blank" rel="noreferrer noopener" className="rounded border border-white border-opacity-20 px-3 py-1 hover:bg-white hover:bg-opacity-10">
              Open
            </a>
            <a href={identity.resumePath} download className="rounded border border-white border-opacity-20 px-3 py-1 hover:bg-white hover:bg-opacity-10">
              Download
            </a>
          </div>
        </div>
        <div className="h-[70vh] overflow-hidden">
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
