export function initTabs() {
  const tabs = Array.from(document.querySelectorAll<HTMLElement>('.services-tab'));
  const panels = Array.from(document.querySelectorAll<HTMLElement>('.category-panel'));

  function activateTab(tab: HTMLElement) {
    const targetId = tab.getAttribute('aria-controls');
    tabs.forEach(t => {
      const selected = t === tab;
      t.classList.toggle('active', selected);
      t.setAttribute('aria-selected', String(selected));
      t.setAttribute('tabindex', selected ? '0' : '-1');
    });
    panels.forEach(panel => {
      panel.toggleAttribute('hidden', panel.id !== targetId);
    });
    tab.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const idx = tabs.indexOf(tab);
        const next = tabs[(idx + dir + tabs.length) % tabs.length];
        activateTab(next);
      }
    });
  });
}

export function initAccordions() {
  document.querySelectorAll('.accordion-group').forEach(group => {
    const accordions = Array.from(group.querySelectorAll<HTMLElement>('.accordion'));
    const closeAcc = (acc: HTMLElement) => {
      acc.classList.remove('open');
      const btn = acc.querySelector<HTMLElement>('.accordion-button');
      const content = acc.querySelector<HTMLElement>('.accordion-content');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (content) content.style.maxHeight = '0';
    };
    const openAcc = (acc: HTMLElement) => {
      acc.classList.add('open');
      const btn = acc.querySelector<HTMLElement>('.accordion-button');
      const content = acc.querySelector<HTMLElement>('.accordion-content');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (content) content.style.maxHeight = content.scrollHeight + 'px';
    };
    accordions.forEach(acc => {
      const btn = acc.querySelector<HTMLElement>('.accordion-button');
      const content = acc.querySelector<HTMLElement>('.accordion-content');
      if (acc.classList.contains('open') && content) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
      btn?.addEventListener('click', () => {
        const isOpen = acc.classList.contains('open');
        accordions.forEach(closeAcc);
        if (!isOpen) openAcc(acc);
      });
    });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll<HTMLElement>('.accordion.open .accordion-content').forEach(c => {
      c.style.maxHeight = c.scrollHeight + 'px';
    });
  });
}

export function initServicesPage() {
  initTabs();
  initAccordions();
}

if (typeof window !== 'undefined') {
  initServicesPage();
}
