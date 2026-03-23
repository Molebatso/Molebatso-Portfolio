// Basic interactivity: smooth scroll, project modal, contact form helper
document.addEventListener('DOMContentLoaded', () => {
  // set current year
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1 && document.querySelector(href)){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // project cards open modal
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const title = card.dataset.title;
      const img = card.dataset.image;
      const desc = card.dataset.desc;
      const link = card.dataset.link || '#';
      openModal({title, img, desc, link});
    });
  });
});

function openModal({title, img, desc, link}){
  const modal = document.getElementById('project-modal');
  modal.setAttribute('aria-hidden','false');
  document.getElementById('modal-title').textContent = title;
  const mimg = document.getElementById('modal-image');
  mimg.src = img;
  mimg.alt = title;
  document.getElementById('modal-desc').textContent = desc;
  const ml = document.getElementById('modal-link');
  ml.href = link;
}

function closeModal(){
  const modal = document.getElementById('project-modal');
  modal.setAttribute('aria-hidden','true');
}

// Simple contact form fallback: opens mail client with fields
function submitForm(e){
  const form = e.target;
  const name = encodeURIComponent(form.name.value.trim());
  const email = encodeURIComponent(form.email.value.trim());
  const message = encodeURIComponent(form.message.value.trim());
  if(!name || !email || !message) return false;
  const subject = encodeURIComponent(`Contact from portfolio: ${name}`);
  const body = `${message}%0D%0A%0D%0AFrom: ${name} (${email})`;
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
  return false; // prevent default form submission
}