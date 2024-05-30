document.addEventListener('DOMContentLoaded', () => {
  // Fade in animation when the page loads
  document.body.classList.add('fade-in');

  const links = document.querySelectorAll('.transition-link');

  links.forEach(link => {
      link.addEventListener('click', event => {
          event.preventDefault();
          const targetUrl = link.getAttribute('href');

          document.body.classList.add('fade-out');

          setTimeout(() => {
              window.location.href = targetUrl;
          }, 500); // Match the duration of the CSS transition
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const reasonOptions = document.querySelectorAll("#reasonDesktop label span");

  reasonOptions.forEach(option => {
      option.addEventListener("click", () => {
          if (option.classList.contains("selected")) {
              option.classList.remove("selected");
          } else {
              reasonOptions.forEach(o => o.classList.remove("selected"));
              option.classList.add("selected");
          }
      });
  });
});

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
    if (elements) {
      elements.forEach(el => this.observer.observe(el));
    }
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

const myFormObserver = new IntersectionObserverHandler('container-form', 'show-form');
myFormObserver.observeElements();

const myToolkitUXObserver = new IntersectionObserverHandler('container-ux-toolkit', 'show-ux-toolkit');
myToolkitUXObserver.observeElements();

const myUxObserver = new IntersectionObserverHandler('container-ux-work', 'show-ux-work');
myUxObserver.observeElements();

const myUxGoalObserver = new IntersectionObserverHandler('container-ux-goal', 'show-ux-goal');
myUxGoalObserver.observeElements();

const myWebDevGoalObserver = new IntersectionObserverHandler('container-web-goal', 'show-web-goal');
myWebDevGoalObserver.observeElements();

const myToolkitWEBObserver = new IntersectionObserverHandler('container-web-toolkit', 'show-web-toolkit');
myToolkitWEBObserver.observeElements();

const myWebObserver = new IntersectionObserverHandler('container-web', 'show-web');
myWebObserver.observeElements();
