const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';
   const loading = document.querySelector(".form__overlay--loading");
   const success = document.querySelector(".form__overlay--success");
   const form = document.querySelector("#form");
   const formHeader = document.querySelector(".footer__header");
   loading.classList.add("form__overlay--visible");
   form.style.visibility = "hidden";
   formHeader.style.visibility = "hidden";
   const serviceID = 'default_service';
   const templateID = 'template_vz7ppw1';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      
      loading.classList.remove("form__overlay--visible");
      success.classList.add("form__overlay--visible");
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});
function closeContact() {
  const success = document.querySelector(".form__overlay--success");
  const form = document.getElementById("form");
  const formHeader = document.querySelector(".footer__header");
  success.classList.remove("form__overlay--visible");
  form.style.visibility = "visible";
  formHeader.style.visibility = "visible";
  form.reset();
}
window.onscroll = function () {
  const arrow = document.querySelector("#arrow-down");
  if (window.scrollY > 1100) {
    arrow.classList.add("arrow-down--hidden");
  } else if (window.scrollY <= 100) {
    arrow.classList.remove("arrow-down--hidden");
  }
};
let rellax = new Rellax('.rellax');
const observer = new IntersectionObserver((entries) => {
  entries.ForEach((entry) => {
      console.log(entry)
       if (entry.isIntersecting){
           entry.target.classlist.add("show");
       } else {
           entry.target.classList.remove("show");
        }
        });
      });
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 150 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};



document.querySelector("body").addEventListener('mousemove', eyeball);
function eyeball(){
  var eye = document.querySelectorAll('.eye');
  eye.forEach(function(eye){
    let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
    let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rot = (radian * (180 / Math.PI) * -1) + 270;
    eye.style.transform = "rotate("+ rot +"deg)";
  })
}