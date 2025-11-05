// main.js - polished interactions
document.addEventListener('DOMContentLoaded', ()=>{
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if(navToggle) navToggle.addEventListener('click', ()=> navMenu.classList.toggle('active'));

  // active nav highlight on multi-page: add 'active' class based on pathname
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link=>{
    try{
      const href = link.getAttribute('href');
      if(location.pathname.endsWith(href) || (href==='index.html' && (location.pathname==='/' || location.pathname.endsWith('index.html')))){
        link.classList.add('active');
      }
    }catch(e){}
  });

  // smooth behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // Formspree handler
  const contactForm = document.querySelector('form[data-form="contact"]');
  if(contactForm){
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const successEl = document.getElementById('successMessage');
    contactForm.addEventListener('submit', e=>{
      e.preventDefault();
      submitBtn.disabled = true; submitBtn.textContent = 'Sending...';
      const data = new FormData(contactForm);
      fetch(contactForm.action, {method:'POST', body: data, headers: {'Accept':'application/json'}})
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(()=>{
          submitBtn.disabled = false; submitBtn.textContent='Send Message';
          if(successEl){ successEl.classList.add('show'); successEl.textContent='✓ Thanks — your message has been sent.'; setTimeout(()=>successEl.classList.remove('show'),6000); }
          contactForm.reset();
        }).catch(()=>{
          submitBtn.disabled = false; submitBtn.textContent='Send Message';
          if(successEl){ successEl.classList.add('show'); successEl.textContent='Sorry — there was an error. Try again later.'; setTimeout(()=>successEl.classList.remove('show'),6000); }
        });
    });
  }
});