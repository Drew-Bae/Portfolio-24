import { getPageContent, onLinkNavigate } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
  const expandIcon = document.querySelector('.icon-function');
  const contactContainer = document.querySelector('.container-contact');

  expandIcon.addEventListener('click', function () {
    contactContainer.classList.toggle('expanded');
    toggleSvgIcon(expandIcon);
  });
});

function toggleSvgIcon(icon) {
  const useElement = icon.querySelector('use');
  const currentHref = useElement.getAttribute('xlink:href');

  if (currentHref === '../images/sprite.svg#expand-content') {
    useElement.setAttribute('xlink:href', '../images/sprite.svg#collapse-content');
  } else {
    useElement.setAttribute('xlink:href', '../images/sprite.svg#expand-content');
  }
}

onLinkNavigate(async ({ toPath }) => {
  const content = await getPageContent(toPath);
  
  startViewTransition(() => {
    document.body.innerHTML = content;  
    
    if (toPath.endsWith('about.html')) {
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  });
});

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

const containerObserver = new IntersectionObserverHandler('container', 'show');
containerObserver.observeElements();

const myMissionObserver = new IntersectionObserverHandler('container-mission', 'show-mission');
myMissionObserver.observeElements();

const myAbilityObserver = new IntersectionObserverHandler('container-ability', 'show-ability');
myAbilityObserver.observeElements();

const myContactObserver = new IntersectionObserverHandler('container-contact', 'show-contact');
myContactObserver.observeElements();
