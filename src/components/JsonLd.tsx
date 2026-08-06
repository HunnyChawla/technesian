/**
 * Renders a schema.org graph as JSON-LD.
 *
 * `JSON.stringify` does not escape markup, so a `<` inside any string value
 * could close the script tag early. Escaping it as `<` is the sanitisation
 * Next's JSON-LD guide prescribes.
 *
 * This is a plain <script>, not next/script — the docs are explicit that
 * next/script is the wrong tool for structured data.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
