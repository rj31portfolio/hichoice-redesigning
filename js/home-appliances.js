(() => {
    'use strict';
    const search = document.getElementById('ap-search');
    const filters = [...document.querySelectorAll('[data-filter]')];
    const cards = [...document.querySelectorAll('.ap-card')];
    const count = document.getElementById('ap-count');
    const empty = document.querySelector('.ap-empty');
    let category = 'all';
    function update() {
        const query = search.value.trim().toLowerCase();
        let visible = 0;
        cards.forEach(card => {
            const matches = (category === 'all' || card.dataset.category === category) && card.dataset.name.includes(query);
            card.hidden = !matches;
            if (matches) visible++;
        });
        count.textContent = `Showing ${visible} appliance${visible === 1 ? '' : 's'}`;
        empty.hidden = visible > 0;
        filters.forEach(button => {
            const active = button.dataset.filter === category;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    }
    filters.forEach(button => button.addEventListener('click', () => {
        category = button.dataset.filter;
        update();
    }));
    search.addEventListener('input', update);
    document.getElementById('ap-reset').addEventListener('click', () => {
        category = 'all';
        search.value = '';
        update();
        search.focus();
    });
    function fromHash() {
        if (location.hash === '#Kitchen' || location.hash === '#Mixer') {
            category = location.hash === '#Kitchen' ? 'kitchen' : 'mixers';
            update();
        }
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
})();
