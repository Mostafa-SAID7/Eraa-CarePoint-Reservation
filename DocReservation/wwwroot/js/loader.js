
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('opacity-0');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 700); // match transition duration
    }
  });

