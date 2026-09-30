import React, { useMemo, useRef, useState } from "react";
import identity from "../../config/identity";
import portfolioContent from "../../content/portfolio";
import { getContentBundleStorageKey, resetContentBundle, saveContentBundle } from "../../content/runtime";

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

function StatCard({ label, value }) {
  return (
    <div className="rounded border border-white border-opacity-10 bg-black bg-opacity-20 px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.2em] text-gray-400">{label}</div>
      <div className="mt-1 text-sm text-gray-100">{value}</div>
    </div>
  );
}

const stringifyBundle = (bundle) => JSON.stringify(bundle, null, 2);

export function ContentManager() {
  const initialBundle = useMemo(() => ({ identity, portfolio: portfolioContent }), []);
  const [draft, setDraft] = useState(stringifyBundle(initialBundle));
  const [status, setStatus] = useState("Editing the live content bundle stored in this browser.");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const parsedDraft = useMemo(() => {
    try {
      const parsed = JSON.parse(draft);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
    } catch (parseError) {
      return null;
    }
  }, [draft]);

  const previewIdentity = parsedDraft?.identity || identity;
  const previewPortfolio = parsedDraft?.portfolio || portfolioContent;

  const handleSave = () => {
    if (!parsedDraft) {
      setError("The bundle is not valid JSON.");
      return;
    }

    const saved = saveContentBundle(parsedDraft);
    if (!saved) {
      setError("This browser blocked local storage writes.");
      return;
    }

    setError("");
    setStatus("Saved. Reloading Alex OS with the new content bundle...");
    window.setTimeout(() => window.location.reload(), 180);
  };

  const handleReset = () => {
    resetContentBundle();
    setStatus("Content reset to the source files. Reloading Alex OS...");
    setError("");
    window.setTimeout(() => window.location.reload(), 180);
  };

  const handleExport = () => {
    const bundleToExport = parsedDraft || initialBundle;
    const blob = new Blob([stringifyBundle(bundleToExport)], { type: "application/json;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "alex-os-content.json";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    setStatus("Exported a local copy of the current bundle.");
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImportFile = async (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Invalid bundle");
      }

      setDraft(stringifyBundle(parsed));
      setError("");
      setStatus(`Imported ${file.name}. Review the bundle and save when ready.`);
    } catch (importError) {
      setError("Import failed. The file must contain valid JSON.");
    }
  };

  const restoreCurrentContent = () => {
    setDraft(stringifyBundle(initialBundle));
    setError("");
    setStatus("Draft reset to the current content loaded in the app.");
  };

  return (
    <AppShell title="CONTENT MANAGER" subtitle="Local content bundle editor and persistence controls.">
      <div className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <Section title="Bundle status">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard label="Storage key" value={getContentBundleStorageKey()} />
              <StatCard label="Mode" value="Local-only, browser persisted" />
              <StatCard label="Identity" value={previewIdentity.name || "Unnamed profile"} />
              <StatCard label="Projects" value={`${previewPortfolio.projects?.length || 0} entries`} />
            </div>
            <p className="text-sm leading-7 text-gray-200">{status}</p>
            {error ? <p className="text-sm leading-7 text-red-300">{error}</p> : null}
          </Section>

          <Section title="Quick snapshot" compact>
            <div className="space-y-2 text-sm text-gray-200">
              <div className="text-lg font-semibold text-gray-100">{previewIdentity.name}</div>
              <div className="text-emerald-200">{previewIdentity.professionalTitle}</div>
              <div>{previewIdentity.shortDescription}</div>
              <div className="text-gray-400">{previewIdentity.email}</div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <StatCard label="Experience entries" value={`${previewPortfolio.experience?.length || 0}`} />
              <StatCard label="Writing entries" value={`${previewPortfolio.writing?.length || 0}`} />
            </div>
          </Section>

          <Section title="Actions" compact>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={handleSave} className="rounded border border-emerald-500 border-opacity-50 bg-emerald-900 bg-opacity-20 px-3 py-2 text-sm text-emerald-100 hover:bg-opacity-30">
                Save bundle
              </button>
              <button type="button" onClick={handleExport} className="rounded border border-white border-opacity-20 px-3 py-2 text-sm hover:bg-white hover:bg-opacity-10">
                Export JSON
              </button>
              <button type="button" onClick={handleImportClick} className="rounded border border-white border-opacity-20 px-3 py-2 text-sm hover:bg-white hover:bg-opacity-10">
                Import JSON
              </button>
              <button type="button" onClick={restoreCurrentContent} className="rounded border border-white border-opacity-20 px-3 py-2 text-sm hover:bg-white hover:bg-opacity-10">
                Restore draft
              </button>
              <button type="button" onClick={handleReset} className="rounded border border-red-500 border-opacity-40 px-3 py-2 text-sm text-red-200 hover:bg-red-500 hover:bg-opacity-10">
                Reset to source files
              </button>
            </div>
            <p className="text-xs leading-6 text-gray-400">Edits stay in this browser until you export or reset them. Saving writes the bundle to {getContentBundleStorageKey()} and reloads the OS so every app sees the new content.</p>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="JSON bundle editor">
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              spellCheck={false}
              className="min-h-[34rem] w-full rounded border border-white border-opacity-10 bg-black bg-opacity-40 px-3 py-3 font-mono text-xs leading-6 text-gray-100 outline-none focus:border-emerald-500"
              aria-label="Alex OS content JSON bundle editor"
            />
          </Section>

          <Section title="Preview" compact>
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-400">Identity</div>
                <div className="mt-2 space-y-1 text-sm text-gray-200">
                  <div className="font-medium text-gray-100">{previewIdentity.name}</div>
                  <div>{previewIdentity.legalName}</div>
                  <div>{previewIdentity.location}</div>
                  <div>{previewIdentity.github}</div>
                </div>
              </div>
              <div className="rounded border border-white border-opacity-10 bg-black bg-opacity-20 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-400">Portfolio</div>
                <div className="mt-2 space-y-1 text-sm text-gray-200">
                  <div className="font-medium text-gray-100">{previewPortfolio.profile?.title}</div>
                  <div>{previewPortfolio.focusAreas?.slice(0, 4).join(" · ")}</div>
                  <div>{previewPortfolio.skills?.engineering?.slice(0, 4).join(" · ")}</div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}

export const displayContentManager = () => <ContentManager />;

export default ContentManager;