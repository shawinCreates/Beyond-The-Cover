            // JavaScript to handle the sidebar toggle
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('main');
            const toggleBtn = document.querySelector('.toggle-btn');

            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
                mainContent.classList.toggle('expanded');
            });