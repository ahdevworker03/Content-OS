import type { ChangeEvent } from "react";
import type { SlideData } from "../types";
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
}: {
  label: string;
  values: string[];
  onEdit: (values: string[]) => void;
  rows?: number;
}) {
  return (
    <div className="studio-inspector__field">
      <span className="studio-inspector__field-label">{label}</span>
      <div className="studio-inspector__items">
        {values.map((value, i) =>
          rows ? (
            <textarea
              key={i}
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
              key={i}
              className="studio-inspector__input"
              type="text"
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const next = [...values];
                next[i] = e.target.value;
                onEdit(next);
              }}
            />
          ),
        )}
      </div>
    </div>
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
            <Field label="Username" value={slide.username ?? ""} onChange={(username) => update({ username })} />
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
      </div>
    </aside>
  );
}
