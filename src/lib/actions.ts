import type { ActionReturn } from 'svelte/action';
import { CountedIntersectionObserver } from './observer.js';
import type {
	TransitionAttributes,
	TransitionDirection,
	TransitionEvent,
	TransitionSettings,
	TransitionStyling,
	TransitionThreshold
} from './types.js';

const DEFAULT_DURATION = 500 as const;
const DEFAULT_THRESHOLD = 0.5 as const;

const observerMap = new Map<TransitionThreshold, CountedIntersectionObserver>();
const transitionMap = new Map<HTMLElement, TransitionSettings>();

function onObserverChange(entries: IntersectionObserverEntry[]) {
	entries.forEach((entry) => {
		const element = entry.target as HTMLElement;
		const transition = transitionMap.get(element);
		if (!transition) return;

		if (entry.isIntersecting && transition.to) {
			startTransition(element, transition, 'to');
		} else if (transition.bothWays && transition.from) {
			startTransition(element, transition, 'from');
		}
	});
}

function startTransition(
	element: HTMLElement,
	transition: TransitionSettings,
	direction: TransitionDirection
) {
	const prevDurationStyle = getComputedStyle(element).transitionDuration;
	const prevDurationValue = parseFloat(prevDurationStyle.slice(0, -1)) * 1000;
	const currentDuration = (transition.duration || prevDurationValue) ?? DEFAULT_DURATION;
	if (!prevDurationValue) {
		element.style.transitionDuration = `${currentDuration}ms`;
	}

	sendTransitionEvent('start', element, transition, direction);

	addStyling(element, transition[direction]);

	setTimeout(() => {
		element.style.transitionDuration = prevDurationStyle;
		sendTransitionEvent('end', element, transition, direction);
	}, currentDuration);
}

function sendTransitionEvent(
	phase: 'start' | 'end',
	element: HTMLElement,
	transition: TransitionSettings,
	direction: TransitionDirection
) {
	const event: TransitionEvent = new CustomEvent(`styletransition${phase}`, {
		detail: { element, transition, direction: direction === 'to' ? 'in' : 'out' }
	});
	element.dispatchEvent(event);
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

function removeObservedElement(
	observer: CountedIntersectionObserver,
	element: HTMLElement,
	threshold?: TransitionThreshold
) {
	observer.unobserve(element);
	if (observer.isEmpty()) {
		observer.disconnect();
		observerMap.delete(threshold ?? DEFAULT_THRESHOLD);
	}
}

export function appear(
	element: HTMLElement,
	transition: TransitionSettings
): ActionReturn<TransitionSettings, TransitionAttributes> {
	addStyling(element, transition.from);
	transitionMap.set(element, transition);
	let observer = getOrCreateObserver(transition.threshold ?? DEFAULT_THRESHOLD);
	observer.observe(element);

	return {
		update: (newTransition) => {
			transitionMap.set(element, newTransition);

			if (newTransition.threshold !== transition.threshold) {
				removeObservedElement(observer, element, transition.threshold);
				observer = getOrCreateObserver(newTransition.threshold ?? DEFAULT_THRESHOLD);
			}

			transition = { ...newTransition };
		},
		destroy: () => {
			removeObservedElement(observer, element, transition.threshold);
			transitionMap.delete(element);
		}
	};
}
