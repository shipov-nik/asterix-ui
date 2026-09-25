# AGENTS.md

Guidance for coding agents working in this repository.

## Project

`asterix-ui` is a React 19 component library (UIKit). Components live in `src/components`, shared hooks in `src/hooks`, and global styles in `styles/`.

The library build entry is `src/components/index.ts`. The package source entry is `src/index.ts`, which re-exports components and hooks. Consumers import from `asterix-ui` and load styles with `@use "asterix-ui/styles/styles"` and `@use "asterix-ui/styles/fonts"`. Apps must wrap the tree in `ThemeProvider` (`theme="light"` or `theme="dark"`).

## Commands

```shell
npm run dev              # Vite app
npm run storybook        # Storybook on port 6006
npm run lint             # ESLint
npm run build            # library build to dist/
npm run build-storybook  # static Storybook
```

## Components

Add a component as a folder under `src/components/<Name>/`:

- `<Name>.tsx` — component and its props type
- `<Name>.scss` — colocated styles
- `<Name>.stories.tsx` — Storybook stories
- `index.ts` — `export * from "./<Name>"`

Re-export the folder from `src/components/index.ts`. A component that is not listed there is not part of the public API.

Use function components. Extend the matching HTML attributes when the root is a native element (`React.ButtonHTMLAttributes<HTMLButtonElement> & { ... }`). Forward a ref when the component wraps a focusable element. Keep variant props as string unions (`size?: "s" | "m"`, `view?: "primary" | "secondary" | "ghost"`) with defaults in the destructuring.

Stories use CSF3 (`Meta` / `StoryObj` from `@storybook/react-vite`). Theme switching is already wired in `.storybook/preview.ts`; do not add a second theme toggle inside a story.

## Class names

Class names are BEM with the `st-` namespace. In TypeScript, build them with `cn` from `src/components/utils/cn.ts` (`@bem-react/classname`: element `__`, modifier `_`):

```tsx
import { cn } from "../utils/cn";

const block = cn("button");

block({ size, view }, className); // st-button st-button_size_m st-button_view_primary
block("text"); // st-button__text
```

Pass the consumer `className` as the second argument to `block(...)`. Do not hand-write `st-` class strings in TSX.

In SCSS, `variables` is injected globally (`$ns: "st-"`). Start a component stylesheet like this:

```scss
$block: ".#{variables.$ns}button";

#{$block} {
  &_size {
    &_m {
      padding: 0 16px;
    }
  }

  &__text {
    // element
  }
}
```

Stylelint extends `stylelint-config-standard-scss` and `stylelint-config-idiomatic-order`. Allowed units: `%`, `vh`, `px`, `s`, `ms`, `deg`.

## Themes

Theme tokens live in `styles/themes/` (`light`, `dark`, and `common`). `ThemeProvider` sets `st-root` plus `st-root_theme_light` or `st-root_theme_dark` on `document.body`. Prefer existing CSS variables (`--st-color-text-primary`, `--button-height`, and similar) over hardcoded colors. A visual change that depends on theme must work in both light and dark.

## TypeScript and formatting

`strict` is on, including `noUnusedLocals` and `noUnusedParameters`. Path aliases: `components` and `components/*`, `hooks` and `hooks/*`. Prettier: double quotes, semicolons, trailing commas, print width 100, 2-space indent.

## Generated output

Do not edit `dist/` or `storybook-static/`. They are build artifacts. Change the source under `src/` and `styles/` instead.
