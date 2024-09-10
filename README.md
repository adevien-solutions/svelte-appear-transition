![Logo](https://raw.githubusercontent.com/adevien-solutions/svelte-appear-transition/a5559db2e2735cc799f85dfcd19c36e1ca191be3/assets/icon.svg)

# Svelte Appear Transition

An easy to use and SSR friendly Svelte action that transitions elements when they appear in the viewport.

## Installation

```bash
npm i -D svelte-appear-transition
```

## Examples

### Fade in

```svelte
<div
  use:appear={{
    from: {
      opacity: '0',
      transform: 'translateY(40px)',
      transitionTimingFunction: 'ease-out'
    },
    to: {
      opacity: '1',
      transform: 'translateY(0)'
    },
    duration: 500
  }}
>
  ...
</div>
```

Same transition, but using Tailwind to apply the default styles:

```svelte
<div
  class="opacity-0 translate-y-10 duration-500 ease-out"
  use:appear={{
    to: {
      opacity: '1',
      transform: 'translateY(0)'
    }
  }}
>
  ...
</div>
```

### Staggered slide up

```svelte
{#each items as item, i}
  <div
    use:appear={{
      from: {
        transform: 'translateY(40px)',
        transitionDelay: `${i * 100}ms`,
        transitionTimingFunction: 'ease-out'
      },
      to: {
        transform: 'translateY(0)'
      },
      duration: 500
    }}
  >
    {item}
  </div>
{/each}
```

## Usage

### Settings

| Name        | Optional | Default | Description                                                                                                             |
| ----------- | :------: | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `to`        |    x     | -       | A string of class names or a styling object to apply when the element is in view.                                       |
| `from`      |    ✓     | -       | A string of class names or a styling object to apply by default.                                                        |
| `duration`  |    ✓     | `500`   | Duration of the transition in milliseconds.                                                                             |
| `threshold` |    ✓     | `0.5`   | Threshold at which the transition will be triggered. Either a single number or an array of numbers between 0.0 and 1.0. |
| `bothWays`  |    ✓     | `false` | Whether to apply the transition in both directions. Can be `true` only if `from` is defined.                            |

### Events

| Name                   | Description                             | Example                                                             |
| ---------------------- | --------------------------------------- | ------------------------------------------------------------------- |
| `styletransitionstart` | Fired right before a transition starts. | `on:styletransitionstart={(event) => { event as TransitionEvent }}` |
| `styletransitionend`   | Fired right after a transition ends.    | `on:styletransitionend={(event) => { event as TransitionEvent }}`   |

The `detail` property of `TransitionEvent` has the following shape:

```typescript
{
  /** The element that triggered the transition. */
  element: HTMLElement;
  /** The settings that were passed to the action. */
  transition: TransitionSettings;
  /** The direction of the transition. */
  direction: 'in' | 'out';
}
```
