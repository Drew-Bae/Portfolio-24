class IntersectionObserverHandler {
    constructor(className, showClass) {
        this.className = className;
        this.showClass = showClass;
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(this.showClass);
                } else {
                    entry.target.classList.remove(this.showClass);
                }
            });
        });
    }

    observeElements() {
        const elements = document.querySelectorAll(`.${this.className}`);
        elements.forEach(el => this.observer.observe(el));
    }
}

// Usage
const containerObserver = new IntersectionObserverHandler('container', 'show');
containerObserver.observeElements();

const formObserver = new IntersectionObserverHandler('container_email', 'show_email');
formObserver.observeElements();