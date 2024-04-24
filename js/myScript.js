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
/*
// Usage
const containerObserver = new IntersectionObserverHandler('container', 'show');
containerObserver.observeElements();

const formObserver = new IntersectionObserverHandler('container_email', 'show_email');
formObserver.observeElements();

// Navigation Functionalitity
var originalContent = ""; // Variable to store original HTML content
var isChanged = false; // Variable to track the state of the content

window.onload = function () {
  // Store the original HTML content when the page loads
  originalContent = document.getElementById("dynamicNavContainer").innerHTML;
};

function toggleContent() {
  var container = document.getElementById("dynamicNavContainer");
  var icon = document.querySelector(".icon--functions use");

  if (!isChanged) {
    // Change icon to close
    icon.setAttribute("xlink:href", "images/sprite.svg#close");
    icon.style.fill = "black";

    // Container to fill the whole space
    var newContainer = document.createElement("section");
    newContainer.classList.add("open-nav");

    // Create a new list element
    var newList = document.createElement("ul");
    newList.classList.add("custom-list"); // Apply a custom class to the list

    var listItem1 = document.createElement("li");
    var link1 = document.createElement("a");
    link1.innerHTML = "HOME";
    link1.href = "#";
    link1.style.textDecoration = "underline 2px";
    link1.style.textUnderlineOffset = "5px";
    listItem1.appendChild(link1);
    var listItem2 = document.createElement("li");
    var link2 = document.createElement("a");
    link2.innerHTML = "ABOUT";
    link2.href = "#";
    listItem2.appendChild(link2);
    var listItem3 = document.createElement("li");
    var link3 = document.createElement("a");
    link3.innerHTML = "CONTACT";
    link3.href = "#";
    listItem3.appendChild(link3);
    var listItem4 = document.createElement("li");
    var link4 = document.createElement("a");
    link4.innerHTML = "UX DESIGN";
    link4.href = "#";
    listItem4.appendChild(link4);
    var listItem5 = document.createElement("li");
    var link5 = document.createElement("a");
    link5.innerHTML = "WEB <br/> DEVELOPMENT";
    link5.href = "#";
    listItem5.appendChild(link5);

    newList.appendChild(listItem1);
    newList.appendChild(listItem2);
    newList.appendChild(listItem3);
    newList.appendChild(listItem4);
    newList.appendChild(listItem5);

    // Putting everything inside the newContainer tag
    newContainer.appendChild(newList);


    // Replace the content inside the container
    container.innerHTML = ""; // Clear existing content
    container.appendChild(newContainer);

    // Update state
    isChanged = true;
  } else {
    // Change icon to hamburger menu
    icon.setAttribute("xlink:href", "images/sprite.svg#hamburger-menu");
    icon.style.fill = "white";

    // Restore the original HTML content
    container.innerHTML = originalContent;

    // Update state
    isChanged = false;
  }
}
*/