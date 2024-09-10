export class CountedIntersectionObserver {
	private observer: IntersectionObserver;
	private observedElements: Set<Element>;

	get count() {
		return this.observedElements.size;
	}

	constructor(
		callback: IntersectionObserverCallback,
		options?: IntersectionObserverInit | undefined
	) {
		this.observer = new IntersectionObserver(callback, options);
		this.observedElements = new Set();
	}

	public observe(target: Element) {
		this.observer.observe(target);
		this.observedElements.add(target);
	}

	public unobserve(target: Element) {
		this.observer.unobserve(target);
		this.observedElements.delete(target);
	}

	public disconnect() {
		this.observer.disconnect();
		this.observedElements.clear();
	}

	public isEmpty() {
		return this.count === 0;
	}
}
