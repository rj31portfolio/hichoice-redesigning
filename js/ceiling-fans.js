(() => {
  'use strict';
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.fan-card'));
  const search = document.getElementById('fan-search');
  const count = document.getElementById('fan-count');
  const empty = document.querySelector('.fan-empty');
  if (!search || !count || !empty) return;
  const initialCategory = location.hash.slice(1);
  let category = filters.some(button => button.dataset.filter === initialCategory) ? initialCategory : 'Ceiling';

  function updateCollection() {
    const term = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matches = (category === 'all' || card.dataset.category === category)
        && card.dataset.name.includes(term);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    count.textContent = `${visible} ${visible === 1 ? 'model' : 'models'}${term ? ' matching your search' : ' in this collection'}`;
    empty.hidden = visible !== 0;
  }

  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    updateCollection();
  }));
  search.addEventListener('input', updateCollection);
  document.getElementById('fan-reset').addEventListener('click', () => {
    category = 'all';
    search.value = '';
    updateCollection();
    search.focus();
  });
  updateCollection();
})();
