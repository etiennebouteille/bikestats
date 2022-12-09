import { c as create_ssr_component } from "../../chunks/index.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-ugirtm_START --><link rel="${"preconnect"}" href="${"https://fonts.googleapis.com"}"><link rel="${"preconnect"}" href="${"https://fonts.gstatic.com"}" crossorigin><link href="${"https://fonts.googleapis.com/css2?family=Anton&family=Rubik:wght@300;400;600&display=swap"}" rel="${"stylesheet"}"><!-- HEAD_svelte-ugirtm_END -->`, ""}

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
