const navLinks = document.querySelectorAll('.navbar-nav a');
const menuCollapse = document.querySelector('.navbar-collapse');


if (menuCollapse) {
const bsCollapse = new bootstrap.Collapse(menuCollapse, { toggle: false });
menuCollapse.addEventListener('show.bs.collapse', function () {
document.body.classList.add('menu-open');
});
menuCollapse.addEventListener('hide.bs.collapse', function () {
document.body.classList.remove('menu-open');
});
navLinks.forEach(function (link) {
link.addEventListener('click', function () {
if (menuCollapse.classList.contains('show')) {
bsCollapse.hide();
}
});
});
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motion = {
easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
heroDistance: 36,
heroDuration: 1600,
heroStagger: 260,
revealDistance: 24,
revealDuration: 1000,
cardRevealDuration: 1250,
revealStagger: 70,
revealStartScale: 0.98,
accordionDistance: 12,
accordionDuration: 760
};
if (!prefersReducedMotion) {
runPageAnimations();
}
function runPageAnimations() {
animateHero();
animateSectionsOnScroll();
animateAccordionOpen();
}
function animateHero() {
const heroText = document.querySelector('#header .header');
const heroImage = document.querySelector('#header img');
const heroElements = [heroText, heroImage].filter(Boolean);
heroElements.forEach(function (element, index) {
element.animate(
[
{ opacity: 0, transform: 'translateY(' + motion.heroDistance + 'px)' },
{ opacity: 1, transform: 'translateY(0)' }
],
{
duration: motion.heroDuration,
delay: index * motion.heroStagger,
easing: motion.easing,
fill: 'both'
}
);
});
}

function animateSectionsOnScroll() {
const revealTargets = document.querySelectorAll(
'.cards > #cards, .cards > #cards-dev, ' +
'.bc-about .about-container > *, ' +
'.bc-service > .aboutUs, .bc-service > .whoWeAre, .bc-service .cards > *, ' +
'.projects-section > .aboutUs, .projects-section > .whoWeAre, .projects-section .carousel, ' +
'.review-section > .aboutUs, .review-section > .whoWeAre, .review-section .cards > *, ' +
'#accordionFlushExample .accordion-item, ' +
'#contact > *, #contact .contact-layout > *, ' +
'#footer .footer-container > *, #footer .footer-right-received'
);
if (!revealTargets.length) return;
function revealElement(element) {
const staggerDelay = Number(element.dataset.revealDelay || '0');
const isCard = element.matches('#cards, #cards-dev');
const duration = isCard ? motion.cardRevealDuration : motion.revealDuration;
element.style.transition =
'opacity ' +
duration +
'ms ' +
motion.easing +
' ' +
staggerDelay +
'ms, transform ' +
duration +
'ms ' +
motion.easing +
' ' +
staggerDelay +
'ms';
element.style.opacity = '1';
element.style.transform = 'translateY(0) scale(1)';
setTimeout(function () {
element.style.willChange = 'auto';
}, duration + 100 + staggerDelay);
}
if (!('IntersectionObserver' in window)) {
revealTargets.forEach(function (element) {
element.style.opacity = '1';
element.style.transform = 'translateY(0)';
element.style.willChange = 'auto';
});
return;
}
revealTargets.forEach(function (element) {
element.style.opacity = '0';
element.style.transform =
'translateY(' + motion.revealDistance + 'px) scale(' + motion.revealStartScale + ')';
element.style.willChange = 'opacity, transform';
});
const observer = new IntersectionObserver(
function (entries, obs) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return;
const element = entry.target;
revealElement(element);
obs.unobserve(element);
});
},
{
threshold: 0.01,
rootMargin: '0px 0px -2% 0px'
}
);
revealTargets.forEach(function (element, index) {
element.dataset.revealDelay = String((index % 3) * motion.revealStagger);
observer.observe(element);
});
}
function animateAccordionOpen() {
const accordion = document.querySelector('#accordionFlushExample');
if (!accordion) return;
accordion.addEventListener('show.bs.collapse', function (event) {
const body = event.target.querySelector('.accordion-body');
if (!body) return;
body.animate(
[
{ opacity: 0, transform: 'translateY(-' + motion.accordionDistance + 'px)' },
{ opacity: 1, transform: 'translateY(0)' }
],
{
duration: motion.accordionDuration,
easing: motion.easing
}
);
});
}
