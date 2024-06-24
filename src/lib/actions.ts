import type { Action } from 'svelte/action';
import { CountedIntersectionObserver } from './observer.js';
import type { TransitionSettings, TransitionStyling, TransitionThreshold } from './types.js';

const DEFAULT_DURATION = 500 as const;
const DEFAULT_THRESHOLD = 0.25 as const;

const observerMap = new Map<TransitionThreshold, CountedIntersectionObserver>();
const transitionMap = new Map<HTMLElement, TransitionSettings>();

function onObserverChange(entries: IntersectionObserverEntry[]) {
	entries.forEach((entry) => {
		const node = entry.target as HTMLElement;
		const transition = transitionMap.get(node);
		if (!transition) return;

		if (entry.isIntersecting && transition.to) {
			startTransition(node, transition, 'to');
		} else if (transition.bothWays && transition.from) {
			startTransition(node, transition, 'from');
		}
	});
}

function startTransition(
	node: HTMLElement,
	transition: TransitionSettings,
	direction: 'from' | 'to'
) {
	const prevDurationStyle = getComputedStyle(node).transitionDuration;
	const prevDurationValue = parseFloat(prevDurationStyle.slice(0, -1)) * 1000;
	const currentDuration = (transition.duration || prevDurationValue) ?? DEFAULT_DURATION;
	if (!prevDurationValue) {
		node.style.transitionDuration = `${currentDuration}ms`;
	}

	addStyling(node, transition[direction]);

	setTimeout(() => {
		node.style.transitionDuration = prevDurationStyle;
	}, currentDuration);
}

function addStyling(node: HTMLElement, styling?: TransitionStyling) {
	if (!styling) return;

	if (typeof styling === 'string') {
		node.classList.add(...styling.split(' '));
	} else {
		Object.assign(node.style, styling);
	}
}

function getOrCreateObserver(threshold: number | number[]) {
	let observer = observerMap.get(threshold);
	if (!observer) {
		observer = new CountedIntersectionObserver(onObserverChange, { threshold });
		observerMap.set(threshold, observer);
	}
	return observer;
}

export const appear: Action<HTMLElement, TransitionSettings> = (
	node: HTMLElement,
	transition: TransitionSettings
) => {
	addStyling(node, transition.from);
	transitionMap.set(node, transition);
	let observer = getOrCreateObserver(transition.threshold ?? DEFAULT_THRESHOLD);
	observer.observe(node);

	return {
		update(newTransition: TransitionSettings) {
			transitionMap.set(node, newTransition);

			if (newTransition.threshold !== transition.threshold) {
				observer.unobserve(node);
				if (observer.isEmpty()) {
					observer.disconnect();
					observerMap.delete(transition.threshold ?? DEFAULT_THRESHOLD);
				}

				observer = getOrCreateObserver(newTransition.threshold ?? DEFAULT_THRESHOLD);
			}

			transition = { ...newTransition };
		},
		destroy() {
			observer.unobserve(node);

			if (observer.isEmpty()) {
				observer.disconnect();
				observerMap.delete(transition.threshold ?? DEFAULT_THRESHOLD);
			}

			transitionMap.delete(node);
		}
	};
};
