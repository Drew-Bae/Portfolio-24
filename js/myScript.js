document.addEventListener('DOMContentLoaded', () => {
  // Handle Email if contact-form exists
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const reason = document.getElementById('reason').value || Array.from(document.querySelectorAll('#reasonDesktop input[type="checkbox"]:checked')).map(el => el.nextElementSibling.textContent).join(', ');
      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const message = document.querySelector('input[name="message"]').value;

      const templateParams = {
        reason: reason,
        name: name,
        email: email,
        message: message,
        subject: `${reason} - ${name}`
      };

      console.log('Sending email with the following parameters:', templateParams);

      emailjs.send('service_qn9ctvl', 'template_ec3xpmo', templateParams, 'OpBuzvRetYEbSSanI')
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
          console.error('FAILED...', error);
        });
    });
  }

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
      }, 500);
    });
  });

  // Expand link functionality
  const expandLinkUx = document.querySelector('.expand-link.to-ux');
  const toUx = document.querySelector('.to-ux');

  if (expandLinkUx) {
    expandLinkUx.addEventListener('click', event => {
      event.preventDefault();
      toUx.classList.add('expand-width');

      setTimeout(() => {
        window.location.href = expandLinkUx.getAttribute('href');
      }, 1000);
    });
  }

  const expandLinkWeb = document.querySelector('.expand-link.to-web');
  const toWeb = document.querySelector('.to-web');

  if (expandLinkWeb) {
    expandLinkWeb.addEventListener('click', event => {
      event.preventDefault();
      toWeb.classList.add('expand-width');

      setTimeout(() => {
        window.location.href = expandLinkWeb.getAttribute('href');
      }, 1000);
    });
  }

  // Reason options selection
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

  // Contact container expansion
  const expandIcon = document.querySelector('.icon-function');
  const contactContainer = document.querySelector('.container-contact');

  if (expandIcon) {
    expandIcon.addEventListener('click', () => {
      contactContainer.classList.toggle('expanded');
      toggleSvgIcon(expandIcon);
    });
  }

  // Intersection Observer Handlers
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

  const observers = [
    new IntersectionObserverHandler('container', 'show'),
    new IntersectionObserverHandler('container-mission', 'show-mission'),
    new IntersectionObserverHandler('container-ability', 'show-ability'),
    new IntersectionObserverHandler('container-contact', 'show-contact'),
    new IntersectionObserverHandler('container-form', 'show-form'),
    new IntersectionObserverHandler('container-ux-toolkit', 'show-ux-toolkit'),
    new IntersectionObserverHandler('container-ux-work', 'show-ux-work'),
    new IntersectionObserverHandler('container-ux-goal', 'show-ux-goal'),
    new IntersectionObserverHandler('container-web-goal', 'show-web-goal'),
    new IntersectionObserverHandler('container-web-toolkit', 'show-web-toolkit'),
    new IntersectionObserverHandler('container-web-work', 'show-web-work')
  ];

  observers.forEach(observer => observer.observeElements());
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
