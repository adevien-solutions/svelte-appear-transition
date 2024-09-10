export type TransitionStyling = string | Partial<CSSStyleDeclaration>;

export type TransitionThreshold = number | number[];

export type TransitionDirection = 'to' | 'from';

export type TransitionEventDirection = 'in' | 'out';

export type TransitionEventDetail = {
	element: HTMLElement;
	transition: TransitionSettings;
	direction: TransitionEventDirection;
};

export type TransitionEvent = CustomEvent<TransitionEventDetail>;

export type TransitionAttributes = {
	/** Fired by the `svelte-appear-transition` package right before a transition starts. */
	'on:transitionstart': (event: TransitionEvent) => void;
	/** Fired by the `svelte-appear-transition` package right after a transition ends. */
	'on:transitionend': (event: TransitionEvent) => void;
};

export type TransitionSettings = {
	/**
	 * A string of class names or a styling object to apply when the element is in view.
	 */
	to: TransitionStyling;
	/**
	 * Duration of the transition in milliseconds.
	 * @default 500
	 */
	duration?: number;
	/**
	 * Threshold at which the transition will be triggered.
	 * Either a single number or an array of numbers between 0.0 and 1.0.
	 * @default 0.5
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#threshold
	 */
	threshold?: TransitionThreshold;
} & (
	| {
			/**
			 * A string of class names or a styling object to apply by default.
			 */
			from?: TransitionStyling;
			/**
			 * Whether to apply the transition in both directions.
			 * @default false
			 */
			bothWays?: false;
	  }
	| {
			/**
			 * A string of class names or a styling object to apply by default.
			 */
			from: TransitionStyling;
			/**
			 * Whether to apply the transition in both directions.
			 * @default false
			 */
			bothWays?: true;
	  }
);
