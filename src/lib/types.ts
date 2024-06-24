export type TransitionStyling = string | Partial<CSSStyleDeclaration>;

export type TransitionThreshold = number | number[];

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
	 * @default 0.25
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
