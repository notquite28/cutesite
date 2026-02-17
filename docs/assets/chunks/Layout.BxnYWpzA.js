import { c as createComponent, f as createAstro, a as addAttribute, e as renderScript, b as renderTemplate, d as renderComponent, r as renderHead, g as renderSlot } from './astro/server.CRPVHD0V.js';
import 'kleur/colors';
import 'clsx';
/* empty css                               */

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/quiet/Workspace/cutesite/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/quiet/Workspace/cutesite/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "cutesite", description = "A cute and aesthetic personal website" } = Astro2.props;
  const base = "/";
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml"${addAttribute(`${base}favicon.svg`, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/brands.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/solid.min.css"><title>${title}</title>${renderScript($$result, "/home/quiet/Workspace/cutesite/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body${addAttribute(title !== "cutesite" ? "blog-post-page" : "", "class")} data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} <canvas id="trianglify-bg" class="fixed inset-0 w-full h-full pointer-events-none z-0" data-astro-cid-sckkx6r4></canvas> ${renderScript($$result, "/home/quiet/Workspace/cutesite/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts")} </body> </html>`;
}, "/home/quiet/Workspace/cutesite/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
