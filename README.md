![Logo](./assets/icon.svg)

# Svelte Appear Transition

An easy to use Svelte action that transitions elements when they appear in the viewport.

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
