// dom-utils.js
export function getElement(id) {
    const el = document.getElementById(id);
    if (!el) console.error(`Element with id '${id}' not found`);
    return el;
}
