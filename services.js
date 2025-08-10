/*
 * Ventori Services page interactivity
 *
 * Handles tab switching between service categories and accordion behaviour
 * for the offerings. When a tab is clicked, the corresponding panel becomes
 * visible and other panels are hidden. When an offering header is clicked,
 * it smoothly expands its content and collapses any other open offering in
 * the same category.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Category tab switching
  const tabs = document.querySelectorAll('.services-tab');
  const panels = document.querySelectorAll('.category-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update tab states
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Show the selected panel, hide others
      panels.forEach((panel) => {
        if (panel.id === target) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // Offering cards: accordion logic
  const offeringHeaders = document.querySelectorAll('.offering-header');
  offeringHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const card = header.closest('.offering-card');
      const content = card.querySelector('.offering-content');
      const panel = card.closest('.category-panel');
      const isOpen = card.classList.contains('open');

      // Close any other open cards in this panel
      if (panel) {
        panel.querySelectorAll('.offering-card.open').forEach((openCard) => {
          if (openCard !== card) {
            const openContent = openCard.querySelector('.offering-content');
            if (openContent) {
              openContent.style.maxHeight = null;
            }
            openCard.classList.remove('open');
          }
        });
      }

      // Toggle the clicked card
      if (isOpen) {
        // Close current card
        content.style.maxHeight = null;
        card.classList.remove('open');
      } else {
        // Open current card smoothly
        content.style.maxHeight = content.scrollHeight + 'px';
        card.classList.add('open');
      }
    });
  });
});
