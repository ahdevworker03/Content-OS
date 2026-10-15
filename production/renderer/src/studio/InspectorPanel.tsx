import type { ChangeEvent } from "react";
import type { EvidenceSlideData, SlideData } from "../types";
import type { ValidationWarning } from "./types";

type InspectorPanelProps = {
  slide: SlideData | null;
  slideIndex: number;
  warnings: ValidationWarning[];
  onUpdate: (index: number, patch: Partial<SlideData>) => void;
};

function Field({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  const id = `inspector-${label}`;
  return (
    <label className="studio-inspector__field" htmlFor={id}>
      <span className="studio-inspector__field-label">{label}</span>
      {rows ? (
        <textarea
          id={id}
          className="studio-inspector__input studio-inspector__input--area"
          value={value}
          rows={rows}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          className="studio-inspector__input"
          type="text"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function ItemsField({
  label,
  values,
  onEdit,
  rows,
  onAdd,
  onRemove,
}: {
  label: string;
  values: string[];
  onEdit: (values: string[]) => void;
  rows?: number;
  onAdd?: () => void;
  onRemove?: (index: number) => void;
}) {
  return (
    <div className="studio-inspector__field">
      <span className="studio-inspector__field-label">{label}</span>
      <div className="studio-inspector__items">
        {values.map((value, i) => (
          <div key={i} className="studio-inspector__item-row">
          {rows ? (
            <textarea
              className="studio-inspector__input studio-inspector__input--area"
              value={value}
              rows={rows}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                const next = [...values];
                next[i] = e.target.value;
                onEdit(next);
              }}
            />
          ) : (
            <input
              className="studio-inspector__input"
              type="text"
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const next = [...values];
                next[i] = e.target.value;
                onEdit(next);
              }}
            />
          )}
          {onRemove && <button type="button" onClick={() => onRemove(i)} aria-label={`Remove ${label} ${i + 1}`}>Remove</button>}
          </div>
        ))}
      </div>
      {onAdd && <button type="button" onClick={onAdd}>Add item</button>}
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="studio-inspector__field">
      <span className="studio-inspector__field-label">{label}</span>
      <select className="studio-inspector__input" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export default function InspectorPanel({
  slide,
  slideIndex,
  warnings,
  onUpdate,
}: InspectorPanelProps) {
  if (!slide) return null;

  const update = (patch: Partial<SlideData>) => onUpdate(slideIndex, patch);
  const updateCodeEvidence = (patch: Partial<Extract<EvidenceSlideData["evidence"], { kind: "code" }>>) => {
    if (slide.layout === "evidence" && slide.evidence.kind === "code") update({ evidence: { ...slide.evidence, ...patch } });
  };
  const updateFileEvidence = (patch: Partial<Extract<EvidenceSlideData["evidence"], { kind: "image" | "diagram" }>>) => {
    if (slide.layout === "evidence" && slide.evidence.kind !== "code") update({ evidence: { ...slide.evidence, ...patch } });
  };

  return (
    <aside className="studio-inspector">
      <div className="studio-inspector__header">
        <span className="studio-inspector__title">Inspector</span>
        <span className="studio-inspector__meta">
          Slide {slideIndex + 1} · {slide.layout.replace("-", " ")}
        </span>
      </div>

      <div className="studio-inspector__body">
        {warnings.length > 0 && (
          <div className="studio-inspector__warnings">
            {warnings.map((w, i) => (
              <div
                key={i}
                className={`studio-inspector__warning studio-inspector__warning--${w.severity}`}
              >
                {w.message}
              </div>
            ))}
          </div>
        )}

        {slide.layout === "cover" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Subtitle" value={slide.subtitle} onChange={(subtitle) => update({ subtitle })} rows={2} />
            <Field label="Context" value={slide.context ?? ""} onChange={(context) => update({ context })} rows={2} />
            <Field label="Lead-in" value={slide.leadIn ?? ""} onChange={(leadIn) => update({ leadIn })} />
          </>
        )}

        {slide.layout === "story" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Body" value={slide.body} onChange={(body) => update({ body })} rows={5} />
            <Field label="Emphasis" value={slide.emphasis ?? ""} onChange={(emphasis) => update({ emphasis })} rows={2} />
            <Field label="Lead-in" value={slide.leadIn ?? ""} onChange={(leadIn) => update({ leadIn })} />
          </>
        )}

        {slide.layout === "focus" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Statement" value={slide.statement} onChange={(statement) => update({ statement })} rows={3} />
            <Field label="Note" value={slide.note ?? ""} onChange={(note) => update({ note })} rows={2} />
            <Field label="Lead-in" value={slide.leadIn ?? ""} onChange={(leadIn) => update({ leadIn })} />
          </>
        )}

        {slide.layout === "sequence" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Lead-in" value={slide.leadIn ?? ""} onChange={(leadIn) => update({ leadIn })} />
            <ItemsField
              label="Sequence"
              values={slide.items}
              onEdit={(items) => update({ items })}
              onAdd={() => update({ items: [...slide.items, ""] })}
              onRemove={(index) => update({ items: slide.items.filter((_, i) => i !== index) })}
              rows={2}
            />
          </>
        )}

        {slide.layout === "comparison" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Lead-in" value={slide.leadIn ?? ""} onChange={(leadIn) => update({ leadIn })} />
            <Field label="Before label" value={slide.before.label} onChange={(label) => update({ before: { ...slide.before, label } })} />
            <Field label="Before" value={slide.before.text} onChange={(text) => update({ before: { ...slide.before, text } })} rows={3} />
            <Field label="After label" value={slide.after.label} onChange={(label) => update({ after: { ...slide.after, label } })} />
            <Field label="After" value={slide.after.text} onChange={(text) => update({ after: { ...slide.after, text } })} rows={3} />
          </>
        )}

        {slide.layout === "evidence" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Context" value={slide.context ?? ""} onChange={(context) => update({ context })} rows={2} />
            <Field label="Lead-in" value={slide.leadIn ?? ""} onChange={(leadIn) => update({ leadIn })} />
            <SelectField
              label="Evidence kind"
              value={slide.evidence.kind}
              options={["code", "image", "diagram"]}
              onChange={(kind) => update({ evidence: kind === "code"
                ? { kind: "code", code: "" }
                : { kind: kind as "image" | "diagram", src: "", alt: "", caption: kind === "diagram" ? "Conceptual diagram" : "" } })}
            />
            {slide.evidence.kind === "code" ? (
              <>
                <Field label="Supplied code" value={slide.evidence.code} onChange={(code) => updateCodeEvidence({ code })} rows={8} />
                <Field label="Language" value={slide.evidence.language ?? ""} onChange={(language) => updateCodeEvidence({ language })} />
              </>
            ) : (
              <>
                <Field label="Workspace asset path" value={slide.evidence.src.replace(/^\//, "")} onChange={(asset) => updateFileEvidence({ src: asset.startsWith("/") ? asset : `/${asset}` })} />
                <Field label="Alt text" value={slide.evidence.alt} onChange={(alt) => updateFileEvidence({ alt })} rows={2} />
              </>
            )}
            <Field label="Caption" value={slide.evidence.caption ?? ""} onChange={(caption) => slide.evidence.kind === "code" ? updateCodeEvidence({ caption }) : updateFileEvidence({ caption })} rows={2} />
          </>
        )}

        {slide.layout === "closing" && (
          <>
            <Field label="Question or closing thought" value={slide.question} onChange={(question) => update({ question })} rows={3} />
            <Field label="Sign-off" value={slide.signoff ?? ""} onChange={(signoff) => update({ signoff })} rows={2} />
            {slide.legacyQuestions && <ItemsField label="Legacy questions" values={slide.legacyQuestions} onEdit={(legacyQuestions) => update({ legacyQuestions })} onAdd={() => update({ legacyQuestions: [...(slide.legacyQuestions ?? []), ""] })} onRemove={(index) => update({ legacyQuestions: slide.legacyQuestions?.filter((_, i) => i !== index) })} rows={2} />}
            <Field label="Highlight" value={slide.highlight ?? ""} onChange={(highlight) => update({ highlight })} rows={2} />
            <Field label="CTA" value={slide.cta ?? ""} onChange={(cta) => update({ cta })} rows={2} />
          </>
        )}

        {slide.layout === "bullet-list" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Label" value={slide.label ?? ""} onChange={(label) => update({ label })} />
            <Field label="Summary" value={slide.summary ?? ""} onChange={(summary) => update({ summary })} />
            <ItemsField
              label="Items"
              values={slide.items.map((item) => item.text)}
              onEdit={(values) => update({ items: values.map((text, i) => ({ text, highlight: slide.items[i]?.highlight })) })}
              rows={2}
            />
          </>
        )}

        {slide.layout === "arrow-list" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Section tag" value={slide.sectionTag ?? ""} onChange={(sectionTag) => update({ sectionTag })} />
            <ItemsField
              label="Items"
              values={slide.items.map((item) => item.text)}
              onEdit={(values) => update({ items: values.map((text) => ({ text })) })}
              rows={2}
            />
          </>
        )}

        {slide.layout === "grid" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Section tag" value={slide.sectionTag ?? ""} onChange={(sectionTag) => update({ sectionTag })} />
            <ItemsField
              label="Values"
              values={slide.items.map((item) => item.value)}
              onEdit={(values) =>
                update({ items: values.map((value, i) => ({ label: slide.items[i]?.label ?? "", value })) })
              }
              rows={2}
            />
          </>
        )}

        {slide.layout === "box-list" && (
          <>
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Label" value={slide.label ?? ""} onChange={(label) => update({ label })} />
            <Field label="Section tag" value={slide.sectionTag ?? ""} onChange={(sectionTag) => update({ sectionTag })} />
            <ItemsField
              label="Headings"
              values={slide.items.map((item) => item.heading)}
              onEdit={(values) =>
                update({ items: values.map((heading, i) => ({ heading, description: slide.items[i]?.description ?? "" })) })
              }
              rows={2}
            />
          </>
        )}

        {slide.layout === "cta" && (
          <>
            <Field label="Badge" value={slide.badge} onChange={(badge) => update({ badge })} />
            <Field label="Title" value={slide.title} onChange={(title) => update({ title })} rows={2} />
            <Field label="Subtitle" value={slide.subtitle} onChange={(subtitle) => update({ subtitle })} rows={2} />
            <Field label="Label" value={slide.label ?? ""} onChange={(label) => update({ label })} />
            <Field label="Quote" value={slide.quote ?? ""} onChange={(quote) => update({ quote })} />
            <Field label="CTA" value={slide.cta ?? ""} onChange={(cta) => update({ cta })} />
            <Field label="Footer name" value={slide.footerName ?? ""} onChange={(footerName) => update({ footerName })} />
            <Field label="Footer handle" value={slide.footerHandle ?? ""} onChange={(footerHandle) => update({ footerHandle })} />
          </>
        )}

        {slide.layout === "__unsupported" && (
          <div className="studio-inspector__unsupported">
            Unsupported layout: {slide.originalLayout}
          </div>
        )}

        {slide.legacyFooter && (
          <div className="studio-inspector__legacy-footer">
            <span className="studio-inspector__field-label">Legacy footer data (retained)</span>
            {slide.legacyFooter.name && <Field label="Legacy name" value={slide.legacyFooter.name} onChange={(name) => update({ legacyFooter: { ...slide.legacyFooter, name } })} />}
            {slide.legacyFooter.role && <Field label="Legacy role" value={slide.legacyFooter.role} onChange={(role) => update({ legacyFooter: { ...slide.legacyFooter, role } })} />}
            {slide.legacyFooter.handle && <Field label="Legacy handle" value={slide.legacyFooter.handle} onChange={(handle) => update({ legacyFooter: { ...slide.legacyFooter, handle } })} />}
          </div>
        )}
      </div>
    </aside>
  );
}
