import type { Action } from 'svelte/action';
import type { TransitionSettings, TransitionStyling } from './types.js';

let observer: IntersectionObserver;
const transitionMap = new Map<HTMLElement, TransitionSettings>();
const DEFAULT_DURATION = 500;

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
		styling && node.classList.add(...styling.split(' '));
	} else {
		Object.assign(node.style, styling);
	}
}

// function removeStyling(node: HTMLElement, styling?: TransitionStyling) {
// 	if (!styling) return;

// 	if (typeof styling === 'string') {
// 		node.classList.remove(...styling.split(' '));
// 	} else {
// 		Object.keys(styling).forEach((key) => {
// 			node.style.removeProperty(key);
// 		});
// 	}
// }

function getOrCreateObserver() {
	if (!observer) {
		observer = new IntersectionObserver(onObserverChange, {
			threshold: 0.25
		});
	}
	return observer;
}

export const appear: Action<HTMLElement, TransitionSettings> = (
	node: HTMLElement,
	transition: TransitionSettings
) => {
	addStyling(node, transition.from);
	transitionMap.set(node, transition);
	getOrCreateObserver().observe(node);

	return {
		update(newTransition: TransitionSettings) {
			transitionMap.set(node, newTransition);
		},
		destroy() {
			getOrCreateObserver().unobserve(node);
			transitionMap.delete(node);
		}
	};
};
