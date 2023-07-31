document.addEventListener('DOMContentLoaded', function() {
    const applyButton = document.getElementById('applyButton');
    applyButton.addEventListener('click', function() {
      const tocInput = document.getElementById('tocInput').value;
      if (tocInput) {
        const tableOfContentsContainer = document.createElement('div');
        tableOfContentsContainer.id = 'table-of-contents';
        tableOfContentsContainer.innerHTML = tocInput;
  
        const firstHeader = document.querySelector('h1, h2, h3, h4, h5, h6');
        firstHeader.parentElement.insertBefore(tableOfContentsContainer, firstHeader);
  
        const tocLinks = tableOfContentsContainer.querySelectorAll('a[href^="#"]');
        tocLinks.forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      }
    });
  });
  