(function() {
    const ISPs = ['ACT', 'AIRTEL', 'CONNECT', 'JIO', 'MTNL', 'YOU'];
    let allData = [];
    let filteredData = [];
    let ispMatchMode = 'ANY';

    const CSV_URL = 'data/compiled_blocklist.csv';
    const RENDER_BATCH_SIZE = 100;

    const CATEGORY_DESCRIPTIONS = {
        'ALDR': 'Alcohol & Drugs: Sites devoted to the use, paraphernalia, and sale of drugs and alcohol irrespective of the local legality.',
        'REL': 'Religion: Sites devoted to discussion of religious issues, both supportive and critical, as well as discussion of minority religious groups.',
        'PORN': 'Pornography: Hard-core and soft-core pornography.',
        'PROV': 'Provocative Attire: Websites which show provocative attire and portray women in a sexual manner, wearing minimal clothing.',
        'POLR': 'Political criticism: Content that offers critical political viewpoints (includes critical authors and bloggers, oppositional political organizations, and pro-democracy and anti-corruption content).',
        'HUMR': 'Human Rights Issues: Sites dedicated to discussing human rights issues in various forms. Includes women\'s rights and rights of minority ethnic groups.',
        'ENV': 'Environment: Pollution, international environmental treaties, deforestation, environmental justice, disasters, etc.',
        'MILX': 'Terrorism and militants: Sites promoting terrorism, violent militant or separatist movements. Organizations officially banned by the Government of India are included in this list.',
        'HATE': 'Hate speech: Content that disparages particular groups or persons based on race, sex, sexuality, or other characteristics.',
        'NEWS': 'News Media: This category includes major news outlets (BBC, CNN, etc.) as well as regional news outlets and independent media.',
        'XED': 'Sex Education: Includes contraception, abstinence, STDs, healthy sexuality, teen pregnancy, rape prevention, abortion, sexual rights, and sexual health services.',
        'PUBH': 'Public Health: HIV, SARS, bird flu, centers for disease control, World Health Organization, etc.',
        'GMB': 'Gambling: Online gambling sites (includes casino games and sports betting).',
        'ANON': 'Anonymization and circumvention tools: Sites that provide tools used for anonymization, circumvention, proxy-services and encryption.',
        'DATE': 'Online Dating: Online dating services which can be used to meet people, post profiles, chat, etc.',
        'GRP': 'Social Networking: Social networking tools and platforms.',
        'LGBT': 'LGBT: A range of gay-lesbian-bisexual-transgender, and queer issues (excluding pornography).',
        'FILE': 'File sharing: Sites and tools used to share files, including cloud-based file storage, torrents and P2P file-sharing tools.',
        'HACK': 'Hacking tools: Sites dedicated to computer security, including news and tools. Includes malicious and non-malicious content.',
        'COMT': 'Communication tools: Sites and tools for individual and group communications, including webmail, VoIP, instant messaging, chat, and mobile messaging applications.',
        'MMED': 'Media sharing: Video, audio, or photo sharing platforms.',
        'HOST': 'Hosting and blogging platforms: Web hosting services, blogging, and other online publishing platforms.',
        'SRCH': 'Search Engines: Search engines and portals.',
        'GAME': 'Gaming: Online games and gaming platforms, excluding gambling sites.',
        'CULTR': 'Culture: Content relating to entertainment, history, literature, music, film, books, satire, and humor.',
        'ECON': 'Economics: General economic development and poverty related topics, agencies, and funding opportunities.',
        'GOVT': 'Government: Government-run websites, including military sites.',
        'COMM': 'E-commerce: Websites of commercial services and products.',
        'CTRL': 'Control content: Benign or innocuous content used as a control.',
        'IGO': 'Intergovernmental organizations: Websites of intergovernmental organizations such as the United Nations.',
        'MISC': 'Miscellaneous content: Sites that don\'t fit in any category.',
        'MAL': 'Malicious content: Websites designed to phish, defraud, or otherwise harm users, including C2 domains and websites used in malware campaigns. Enriched with sites found in public security lists, e.g., github.com/maltrail/trails/static (as of 22 Sep, 2025). There may be an overlap with websites in the IPTM category.',
        'IPTM': 'IP/trademark violations: Intellectual property violations, trademark, and copyright disputes, including brand impersonation sites. There may be an overlap with websites in the MAL category.',
        'COIN': 'Cryptocurrency: Cryptocurrency exchange websites and related cryptocurrency trading platforms.',
        'EDU': 'Education: Educational websites and platforms, including academic resources and educational institutions.',
        'MOV': 'Movies & TV: Piracy websites specifically dedicated to movies and TV shows, including streaming and download sites for video content.',
        'MUS': 'Music & audio: Piracy websites explicitly dedicated to music and audio files.',
        'VISA': 'Visa & immigration: Visa application and immigration-related websites (may be official government sites, unofficial service providers, or scam websites).',
        'BIZ': 'Business: Websites that appear to be related to commercial businesses and corporate entities.',
        'PASTE': 'Text Sharing: Text sharing websites and paste services used for sharing code snippets, documents, and other text-based content.',
        'LIVE': 'Live Streaming Piracy: Piracy websites providing livestreams of pay-per-view events such as football, cricket, MMA, and other sports or entertainment content.',
        'ESC': 'Escort services: Websites advertising escort services.',
        'ICAP': 'Invite-based child abuse pyramid: Child abuse material. Domains in this category have been reported to law enforcement and obscured in the data release.',
        'UNCAT': 'Uncategorized: Uncategorized domains, distinct from the MISC category. The compiled blocklist includes generic uncategorized domains as well as Numeric Domain Names (NDNs), Internationalized Domain Names (IDNs), and domains with the .yokohama TLD.'
    };

    const elements = {
        loadingState: document.getElementById('loadingState'),
        explorerContent: document.getElementById('explorerContent'),
        searchInput: document.getElementById('searchInput'),
        searchClear: document.getElementById('searchClear'),
        categoryFilter: document.getElementById('categoryFilter'),
        tldFilter: document.getElementById('tldFilter'),
        trancoSort: document.getElementById('trancoSort'),
        ispToggle: document.getElementById('ispToggle'),
        ispToggleText: document.getElementById('ispToggleText'),
        resetFilters: document.getElementById('resetFilters'),
        dataTableBody: document.getElementById('dataTableBody'),
        resultCounter: document.getElementById('resultCounter')
    };

    const ispCheckboxes = ISPs.map(isp => document.getElementById(`isp-${isp}`));

    function loadData() {
        Papa.parse(CSV_URL, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                allData = results.data;
                filteredData = [...allData];
                initializeFilters();
                applyFilters();
                elements.loadingState.style.display = 'none';
                elements.explorerContent.style.display = 'block';
            },
            error: function(error) {
                elements.loadingState.innerHTML = `
                    <p style="color: #dc2626; font-size: 1.1rem;">Error loading dataset: ${error.message}</p>
                    <button onclick="location.reload()" class="btn-primary" style="margin-top: 20px;">Retry</button>
                `;
            }
        });
    }

    function initializeFilters() {
        updateDynamicFilters(allData);
    }

    function updateDynamicFilters(data) {
        const currentCategory = elements.categoryFilter.value;
        const currentTld = elements.tldFilter.value;

        const categories = [...new Set(data.map(row => row.category))].filter(Boolean).sort();

        const tlds = [...new Set(data.map(row => {
            const match = row.domain.match(/\.([^.]+)$/);
            return match ? match[1] : null;
        }))].filter(Boolean).sort();

        elements.categoryFilter.innerHTML = `<option value="">All categories (${categories.length})</option>`;
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            if (cat === currentCategory) {
                option.selected = true;
            }
            elements.categoryFilter.appendChild(option);
        });

        if (currentCategory && !categories.includes(currentCategory)) {
            elements.categoryFilter.value = '';
        }

        elements.tldFilter.innerHTML = `<option value="">All TLDs (${tlds.length})</option>`;
        tlds.forEach(tld => {
            const option = document.createElement('option');
            option.value = tld;
            option.textContent = '.' + tld;
            if (tld === currentTld) {
                option.selected = true;
            }
            elements.tldFilter.appendChild(option);
        });

        if (currentTld && !tlds.includes(currentTld)) {
            elements.tldFilter.value = '';
        }
    }

    function getStatusBadge(value) {
        if (value === '1') {
            return '<span class="status-badge status-blocked">Blocked</span>';
        } else if (value === '0') {
            return '<span class="status-badge status-ok">OK</span>';
        } else if (value === 'TIMEOUT') {
            return '<span class="status-badge status-timeout">Timeout</span>';
        } else if (value === 'NXDOMAIN') {
            return '<span class="status-badge status-nxdomain">NXDomain</span>';
        } else if (value === 'SERVFAIL' || value === 'REFUSED' || value === 'ERROR') {
            return '<span class="status-badge status-error">' + value + '</span>';
        } else {
            return '<span class="status-nodata">—</span>';
        }
    }

    function isBlocked(row, isp) {
        return row[isp] === '1';
    }

    function updateToggleUI() {
        elements.ispToggle.classList.remove('active', 'active-only');
        if (ispMatchMode === 'ANY') {
            elements.ispToggleText.textContent = 'Blocked by ANY';
        } else if (ispMatchMode === 'ALL') {
            elements.ispToggleText.textContent = 'Blocked by ALL';
            elements.ispToggle.classList.add('active');
        } else if (ispMatchMode === 'ONLY') {
            elements.ispToggleText.textContent = 'Blocked exclusively by';
            elements.ispToggle.classList.add('active-only');
        }
        const isPressed = ispMatchMode !== 'ANY';
        elements.ispToggle.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
    }

    function applyFilters() {
        let data = [...allData];

        const searchTerm = elements.searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            data = data.filter(row => row.domain.toLowerCase().includes(searchTerm));
            elements.searchClear.classList.add('visible');
        } else {
            elements.searchClear.classList.remove('visible');
        }

        const selectedIsps = ispCheckboxes
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        if (selectedIsps.length === 1) {
            ispMatchMode = 'ONLY';
            elements.ispToggleText.textContent = 'Blocked exclusively by';
            elements.ispToggle.classList.remove('active');
            elements.ispToggle.classList.add('active-only');
            elements.ispToggle.disabled = true;
            elements.ispToggle.style.opacity = '0.6';
            elements.ispToggle.style.cursor = 'not-allowed';
        } else if (selectedIsps.length > 1) {
            elements.ispToggle.disabled = false;
            elements.ispToggle.style.opacity = '1';
            elements.ispToggle.style.cursor = 'pointer';
            updateToggleUI();
        } else {
            ispMatchMode = 'ANY';
            elements.ispToggleText.textContent = 'Blocked by ANY';
            elements.ispToggle.classList.remove('active', 'active-only');
            elements.ispToggle.disabled = true;
            elements.ispToggle.style.opacity = '0.6';
            elements.ispToggle.style.cursor = 'not-allowed';
        }

        if (selectedIsps.length > 0) {
            if (ispMatchMode === 'ANY') {
                data = data.filter(row =>
                    selectedIsps.some(isp => isBlocked(row, isp))
                );
            } else if (ispMatchMode === 'ALL') {
                data = data.filter(row =>
                    selectedIsps.every(isp => isBlocked(row, isp))
                );
            } else if (ispMatchMode === 'ONLY') {
                const unselectedIsps = ISPs.filter(isp => !selectedIsps.includes(isp));
                data = data.filter(row => {
                    const blockedBySelected = selectedIsps.every(isp => isBlocked(row, isp));
                    const notBlockedByOthers = unselectedIsps.every(isp => !isBlocked(row, isp));
                    return blockedBySelected && notBlockedByOthers;
                });
            }
        }

        updateDynamicFilters(data);

        const category = elements.categoryFilter.value;
        if (category) {
            data = data.filter(row => row.category === category);
        }

        const tld = elements.tldFilter.value;
        if (tld) {
            data = data.filter(row => row.domain.endsWith('.' + tld));
        }

        const sortOrder = elements.trancoSort.value;
        if (sortOrder) {
            data.sort((a, b) => {
                const rankA = parseInt(a.tranco_rank);
                const rankB = parseInt(b.tranco_rank);
                const validA = !isNaN(rankA);
                const validB = !isNaN(rankB);

                if (!validA && !validB) return 0;
                if (!validA) return 1;
                if (!validB) return -1;

                return sortOrder === 'asc' ? rankA - rankB : rankB - rankA;
            });
        }

        filteredData = data;

        const count = filteredData.length.toLocaleString();
        elements.resultCounter.textContent = `${count} domain${filteredData.length === 1 ? '' : 's'}`;

        renderTable();
    }

    function renderTable() {
        const tbody = elements.dataTableBody;
        tbody.innerHTML = '';

        const rowsToRender = filteredData.slice(0, RENDER_BATCH_SIZE);

        rowsToRender.forEach(row => {
            const tr = document.createElement('tr');
            const categoryTooltip = row.category && CATEGORY_DESCRIPTIONS[row.category]
                ? CATEGORY_DESCRIPTIONS[row.category]
                : '';
            tr.innerHTML = `
                <td class="domain-cell">${row.domain}</td>
                <td class="category-cell" title="${categoryTooltip}">${row.category || '—'}</td>
                <td class="rank-cell">${row.tranco_rank === '-' ? '—' : parseInt(row.tranco_rank).toLocaleString()}</td>
                <td>${getStatusBadge(row.ACT)}</td>
                <td>${getStatusBadge(row.AIRTEL)}</td>
                <td>${getStatusBadge(row.CONNECT)}</td>
                <td>${getStatusBadge(row.JIO)}</td>
                <td>${getStatusBadge(row.MTNL)}</td>
                <td>${getStatusBadge(row.YOU)}</td>
            `;
            tbody.appendChild(tr);
        });

        currentBatch = 1;
    }

    let currentBatch = 1;
    let isLoading = false;

    function loadMoreRows() {
        if (isLoading) return;

        const startIdx = currentBatch * RENDER_BATCH_SIZE;
        const endIdx = startIdx + RENDER_BATCH_SIZE;

        if (startIdx >= filteredData.length) return;

        isLoading = true;
        const tbody = elements.dataTableBody;
        const rowsToRender = filteredData.slice(startIdx, endIdx);

        rowsToRender.forEach(row => {
            const tr = document.createElement('tr');
            const categoryTooltip = row.category && CATEGORY_DESCRIPTIONS[row.category]
                ? CATEGORY_DESCRIPTIONS[row.category]
                : '';
            tr.innerHTML = `
                <td class="domain-cell">${row.domain}</td>
                <td class="category-cell" title="${categoryTooltip}">${row.category || '—'}</td>
                <td class="rank-cell">${row.tranco_rank === '-' ? '—' : parseInt(row.tranco_rank).toLocaleString()}</td>
                <td>${getStatusBadge(row.ACT)}</td>
                <td>${getStatusBadge(row.AIRTEL)}</td>
                <td>${getStatusBadge(row.CONNECT)}</td>
                <td>${getStatusBadge(row.JIO)}</td>
                <td>${getStatusBadge(row.MTNL)}</td>
                <td>${getStatusBadge(row.YOU)}</td>
            `;
            tbody.appendChild(tr);
        });

        currentBatch++;
        isLoading = false;
    }

    const tableWrapper = document.querySelector('.table-wrapper');
    tableWrapper.addEventListener('scroll', function() {
        const scrollTop = tableWrapper.scrollTop;
        const scrollHeight = tableWrapper.scrollHeight;
        const clientHeight = tableWrapper.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 200) {
            loadMoreRows();
        }
    });

    let searchTimeout;
    elements.searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentBatch = 1;
            applyFilters();
        }, 300);
    });

    elements.searchClear.addEventListener('click', function() {
        elements.searchInput.value = '';
        elements.searchClear.classList.remove('visible');
        currentBatch = 1;
        applyFilters();
    });

    ispCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            currentBatch = 1;
            applyFilters();
        });
    });

    elements.ispToggle.addEventListener('click', function() {
        if (elements.ispToggle.disabled) return;

        if (ispMatchMode === 'ANY') {
            ispMatchMode = 'ALL';
        } else if (ispMatchMode === 'ALL') {
            ispMatchMode = 'ONLY';
        } else {
            ispMatchMode = 'ANY';
        }

        updateToggleUI();
        currentBatch = 1;
        applyFilters();
    });

    elements.categoryFilter.addEventListener('change', () => {
        currentBatch = 1;
        applyFilters();
    });

    elements.tldFilter.addEventListener('change', () => {
        currentBatch = 1;
        applyFilters();
    });

    elements.trancoSort.addEventListener('change', () => {
        currentBatch = 1;
        applyFilters();
    });

    elements.resetFilters.addEventListener('click', function() {
        elements.searchInput.value = '';
        elements.searchClear.classList.remove('visible');
        ispCheckboxes.forEach(cb => cb.checked = false);
        elements.categoryFilter.value = '';
        elements.tldFilter.value = '';
        elements.trancoSort.value = '';
        ispMatchMode = 'ANY';
        updateToggleUI();
        currentBatch = 1;
        applyFilters();
    });

    loadData();
})();
