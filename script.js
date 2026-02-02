// 1. Antes de que la página se cierre o refresque, guarda la posición actual
window.addEventListener('beforeunload', function() {
    localStorage.setItem('scrollPos', window.scrollY);
});

// 2. Cuando la página termine de cargar en la TV, regresa a esa posición
window.addEventListener('load', function() {
    const savedScroll = localStorage.getItem('scrollPos');
    if (savedScroll) {
        // El setTimeout da un pequeño respiro de 100ms para que las imágenes 
        // de los animales carguen antes de mover el scroll
        setTimeout(() => {
            window.scrollTo(0, parseInt(savedScroll));
        }, 100);
    }
});

