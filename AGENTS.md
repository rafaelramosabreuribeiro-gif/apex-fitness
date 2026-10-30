<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Single-page landing at `/` with in-page anchor nav; sections live in `src/components/apex/`, content/constants in `src/lib/apex-data.ts` — keeps copy editable in one place.
- Glass, neon edge, 3D tilt and scroll reveal are CSS utilities in `src/styles.css` driven by `TiltCard`/`Reveal` — reuse them instead of ad-hoc styles.
- Contact form has no backend: it validates client-side and opens WhatsApp with a pre-filled message.
- BMI math and categories live as pure functions in `src/lib/bmi.ts` (tested in `bmi.test.ts`); the calculator component only handles input and display.
