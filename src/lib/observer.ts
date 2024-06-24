export class CountedIntersectionObserver extends IntersectionObserver {
	private observedElements: Set<Element>;
	get count() {
		return this.observedElements.size;
	}

	constructor(
		callback: IntersectionObserverCallback,
		options?: IntersectionObserverInit | undefined
	) {
		super(callback, options);
		this.observedElements = new Set();
	}

	public observe(target: Element) {
		super.observe(target);
		this.observedElements.add(target);
	}

	public unobserve(target: Element) {
		super.unobserve(target);
		this.observedElements.delete(target);
	}

	public disconnect() {
		super.disconnect();
		this.observedElements.clear();
	}

	public isEmpty() {
		return this.count === 0;
	}
}
