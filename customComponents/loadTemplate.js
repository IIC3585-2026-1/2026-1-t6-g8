export async function loadTemplate(path) {
  const response = await fetch(
    new URL(path, import.meta.url)
  );

  const html = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return doc.querySelector("template");
}