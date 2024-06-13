export type TransitionStyling = string | Partial<CSSStyleDeclaration>;

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
