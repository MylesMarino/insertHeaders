function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/g).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
  
  function createHeaderLinks() {
    const existingTableOfContents = document.getElementById('table-of-contents');
    if (existingTableOfContents) return;
  
    const pageTitle = document.title;
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
    const tableOfContentsContainer = document.createElement('div');
    tableOfContentsContainer.id = 'table-of-contents';
    const computedStyles = getComputedStyle(document.body);
    Object.assign(tableOfContentsContainer.style, {
      background: computedStyles.backgroundColor,
      padding: '10px',
      marginTop: '10px',
      fontFamily: computedStyles.fontFamily,
    });
  
    const tableOfContentsHeader = document.createElement('h2');
    const articleText = document.body.innerText; // Extract text from the article
    const readingTime = calculateReadingTime(articleText);
    tableOfContentsHeader.textContent = `${pageTitle}, a ${readingTime} minute read`;
    tableOfContentsContainer.appendChild(tableOfContentsHeader);
  
    let lastLevel = 0;
    headers.forEach((header, index) => {
      const headerId = `header-${index}`;
      header.id = headerId;
  
      const headerLink = document.createElement('a');
      headerLink.textContent = header.textContent;
      headerLink.href = `#${headerId}`;
      const level = parseInt(header.tagName.charAt(1)); // Get header level (1 for h1, 2 for h2, etc.)
      const indentSize = (level - 2) * 15; // Adjust the indentation size as needed
  
      Object.assign(headerLink.style, {
        display: 'block',
        marginBottom: '5px',
        textDecoration: computedStyles.textDecoration,
        color: 'blue',
        fontSize: computedStyles.fontSize,
        transition: 'color 0.3s',
        marginLeft: `${indentSize}px`, // Apply the indentation
      });
  
      tableOfContentsContainer.appendChild(headerLink);
      tableOfContentsContainer.appendChild(document.createElement('br'));
  
      lastLevel = level;
    });
  
    const contentContainer = document.createElement('div');
    const firstHeader = document.querySelector('h1, h2, h3, h4, h5, h6');
    firstHeader.parentElement.insertBefore(tableOfContentsContainer, firstHeader);
  
    Array.from(document.body.children).forEach((child) => {
      contentContainer.appendChild(child);
    });
  
    document.body.appendChild(tableOfContentsContainer);
    document.body.appendChild(contentContainer);
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  
  createHeaderLinks();
  