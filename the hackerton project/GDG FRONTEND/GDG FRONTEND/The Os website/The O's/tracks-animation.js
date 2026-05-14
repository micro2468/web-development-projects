// Animate tracks on scroll
document.addEventListener('DOMContentLoaded', function() {
  const trackCards = document.querySelectorAll('.track-card');
  
  // Set initial state
  trackCards.forEach(card => {
    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
  });

  const animateTracks = () => {
    trackCards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (cardPosition < screenPosition) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transitionDelay = `${index * 0.1}s`;
      }
    });
  };

  // Trigger on load and scroll
  window.addEventListener('load', animateTracks);
  window.addEventListener('scroll', animateTracks);

  // Add hover effect to buttons
  const trackButtons = document.querySelectorAll('.btn-track');
  trackButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 5px 15px rgba(66, 133, 244, 0.3)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
    });
  });
});