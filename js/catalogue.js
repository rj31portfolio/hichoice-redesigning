(() => {
    'use strict';
    const search = document.getElementById('cat-search');
    if (!search) return;
    const sort = document.getElementById('cat-sort');
    const groups = [...document.querySelectorAll('[data-group]')];
    const links = [...document.querySelectorAll('[data-category]')];
    const count = document.getElementById('cat-count');
    const clear = document.getElementById('cat-clear');
    const empty = document.querySelector('.ap-empty');
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    let category = 'all';
    function update() {
        const query = search.value.trim().toLowerCase();
        let visible = 0;
        let categories = 0;
        groups.forEach(group => {
            const items = [...group.querySelectorAll('[data-product]')];
            const groupMatches = category === 'all' || category === group.dataset.group;
            const categoryName = group.querySelector('.cat-group-heading h3').textContent.toLowerCase();
            let shown = 0;
            items.forEach(card => {
                const matches = groupMatches && (card.dataset.name.includes(query) || categoryName.includes(query));
                card.hidden = !matches;
                if (matches) shown++;
            });
            group.hidden = shown === 0;
            visible += shown;
            if (shown) categories++;
            group.querySelector('.cat-group-heading > span').textContent = `${shown} product${shown === 1 ? '' : 's'}`;
            items.sort((a,b) => sort.value === 'featured' ? Number(a.dataset.order)-Number(b.dataset.order) : (sort.value === 'za' ? -1 : 1)*collator.compare(a.dataset.name,b.dataset.name));
            const grid = group.querySelector('.ap-product-grid');
            items.forEach(item => grid.appendChild(item));
        });
        count.textContent = `${visible} product${visible === 1 ? '' : 's'} in ${categories} categor${categories === 1 ? 'y' : 'ies'}`;
        empty.hidden = visible > 0;
        clear.hidden = category === 'all' && !query;
        links.forEach(link => {
            const active = link.dataset.category === category;
            link.classList.toggle('is-active', active);
            if (active) link.setAttribute('aria-current','true');
            else link.removeAttribute('aria-current');
        });
    }
    function select(next, scroll = false) {
        category = groups.some(group => group.dataset.group === next) ? next : 'all';
        search.value = '';
        update();
        history.replaceState(null, '', category === 'all' ? '#catalogue' : '#' + category);
        if (scroll) document.getElementById('catalogue').scrollIntoView({ block: 'start' });
    }
    links.forEach(link => link.addEventListener('click', event => {
        event.preventDefault();
        select(link.dataset.category);
    }));
    document.querySelectorAll('[data-category-shortcut]').forEach(link => link.addEventListener('click', event => {
        event.preventDefault();
        select(link.dataset.categoryShortcut, true);
    }));
    search.addEventListener('input', update);
    sort.addEventListener('change', update);
    function reset() {
        sort.value = 'featured';
        select('all');
        search.focus({ preventScroll: true });
    }
    clear.addEventListener('click', reset);
    document.getElementById('cat-reset').addEventListener('click', reset);
    function fromHash() {
        const hash = location.hash.slice(1);
        category = groups.some(group => group.dataset.group === hash) ? hash : 'all';
        update();
        if (category !== 'all') document.getElementById('catalogue').scrollIntoView({ block: 'start' });
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
})();
