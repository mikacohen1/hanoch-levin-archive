/* ============================================================
   HANOCH LEVIN INDEX - ALPHABETICAL COLUMN BALANCING
   ============================================================ */

function distributeByHeight() {
    const source = document.getElementById('source-index');
    const allCols = [
        document.getElementById('c1'),
        document.getElementById('c2'),
        document.getElementById('c3'),
        document.getElementById('c4')
    ];

    // 1. COLLECT: Grab items from everywhere
    const allContainers = [source, ...allCols];
    let items = [];
    
    allContainers.forEach(container => {
        if (container) {
            const found = Array.from(container.querySelectorAll('.plays-index-list-item'));
            items = [...items, ...found];
        }
    });

    if (items.length === 0) return;

    // 2. SORT: This is the new part! 
    // It looks at the text inside your <h2> (the play title) 
    // and sorts the items alphabetically before placing them.
    items.sort((a, b) => {
        const titleA = a.querySelector('.plays-index-item-title').textContent.trim();
        const titleB = b.querySelector('.plays-index-item-title').textContent.trim();
        return titleA.localeCompare(titleB, 'he'); // 'he' ensures Hebrew alphabet rules
    });

    // 3. FILTER: Which columns are visible?
    const activeCols = allCols.filter(col => {
        return col && getComputedStyle(col).display !== 'none';
    });

    const n = activeCols.length;
    if (n === 0) return;
    
    // 4. RESET: Clear columns
    activeCols.forEach(col => col.innerHTML = '');

    // 5. DISTRIBUTE: Balanced by height
    const heights = new Array(n).fill(0);

    items.forEach(item => {
        let minIndex = 0;
        for (let i = 1; i < n; i++) {
            if (heights[i] < heights[minIndex]) minIndex = i;
        }

        activeCols[minIndex].appendChild(item);
        heights[minIndex] += item.offsetHeight;
    });
}

/* --- TRIGGERS --- */
window.addEventListener('load', distributeByHeight);

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(distributeByHeight, 100);
});