import { getPageContent, onLinkNavigate } from './utils.js';

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);
  
  startViewTransition(() => {
    // This is a pretty heavy-handed way to update page content.
    // In production, you'd likely be modifying DOM elements directly,
    // or using a framework.
    // innerHTML is used here just to keep the DOM update super simple.
    document.body.innerHTML = content;  
  });
});


// A little helper function like this is really handy
// to handle progressive enhancement.
function startViewTransition(callback) {
  if (!document.startViewTransition) {
    callback();
    return;
  }
  
  document.startViewTransition(callback);
}
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