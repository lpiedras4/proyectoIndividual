document.querySelectorAll('.accordion-header').forEach(button =>{
  button.addEventListener('click', ()=>{
    const item = button.parentElement;
    const icon = button.querySelector('.icon');
    const isOpen = item.classList.toggle('open');
    icon.textContent = isOpen ? '∧' : '∨';
  });
  });