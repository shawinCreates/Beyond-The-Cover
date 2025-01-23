// JavaScript to handle the sidebar toggle
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('main');
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
});


document.addEventListener('click',(e)=>{
  if(!sidebar.contains(e.target)&& !toggleBtn.contains(e.target)){
      if (!sidebar.classList.contains('hidden')) {
          sidebar.classList.add('hidden');
          mainContent.classList.remove('expanded');
      }
  }
});

// Prevent clicks inside the sidebar from closing it
sidebar.addEventListener('click', (e) => {
  e.stopPropagation();
});