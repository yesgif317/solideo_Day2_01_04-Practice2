// Global Travel Planner - Main JavaScript
// ==========================================

// Application State
const AppState = {
    travelType: 'domestic',
    departure: '',
    destination: '',
    departureDate: '',
    departureTime: '',
    duration: 4,
    travelers: 2,
    budget: 100,
    selectedTransport: null,
    recentSearches: {
        departures: [],
        destinations: []
    }
};

// Location Data
const LocationData = {
    domestic: {
        popular: [
            '서울역', '인천공항', '부산역', '제주공항',
            '강릉역', '경주역', '전주역', '여수엑스포역'
        ],
        suggestions: [
            '서울역', '인천공항', '김포공항', '부산역', '부산 해운대 그랜드 호텔',
            '제주공항', '제주 중문 관광단지', '강릉역', '강릉 경포대',
            '경주역', '경주 불국사', '전주역', '전주 한옥마을',
            '여수엑스포역', '여수 오동도', '속초 설악산', '대전역',
            '광주송정역', '목포역', '포항역', '안동역'
        ]
    },
    international: {
        popular: [
            'Paris Charles de Gaulle Airport',
            'Tokyo Station',
            'Times Square NYC',
            'London Heathrow Airport',
            'Bangkok Suvarnabhumi Airport',
            'Singapore Changi Airport'
        ],
        suggestions: [
            'Paris Charles de Gaulle Airport', 'Eiffel Tower Paris',
            'Tokyo Station', 'Tokyo Narita Airport', 'Shibuya Tokyo',
            'Times Square NYC', 'JFK Airport New York',
            'London Heathrow Airport', 'Big Ben London',
            'Bangkok Suvarnabhumi Airport', 'Grand Palace Bangkok',
            'Singapore Changi Airport', 'Marina Bay Singapore',
            'Dubai International Airport', 'Burj Khalifa Dubai',
            'Rome Fiumicino Airport', 'Colosseum Rome',
            'Barcelona Airport', 'Sagrada Familia Barcelona',
            'Sydney Airport', 'Sydney Opera House'
        ]
    }
};

// Transportation Data Generator
const TransportationData = {
    domestic: {
        train: [
            { type: 'KTX', icon: '🚄', name: 'KTX-101', class: '일반실' },
            { type: 'KTX', icon: '🚄', name: 'KTX-203', class: '특실' },
            { type: 'SRT', icon: '🚄', name: 'SRT-305', class: '일반실' },
            { type: 'ITX', icon: '🚆', name: 'ITX-청춘', class: '일반석' }
        ],
        bus: [
            { type: '고속버스', icon: '🚌', name: '프리미엄 고속', class: '우등석' },
            { type: '시외버스', icon: '🚌', name: '일반 시외', class: '일반석' }
        ],
        flight: [
            { type: '국내선', icon: '✈️', name: '대한항공', class: '일반석' },
            { type: '국내선', icon: '✈️', name: '아시아나', class: '비즈니스석' },
            { type: '국내선', icon: '✈️', name: '제주항공', class: '일반석' }
        ],
        car: [
            { type: '자동차', icon: '🚗', name: '자가용', class: '직행' }
        ]
    },
    international: {
        flight: [
            { type: '국제선', icon: '✈️', name: 'Korean Air', class: 'Economy' },
            { type: '국제선', icon: '✈️', name: 'Asiana Airlines', class: 'Business' },
            { type: '국제선', icon: '✈️', name: 'Emirates', class: 'First Class' },
            { type: '국제선', icon: '✈️', name: 'Singapore Airlines', class: 'Economy' }
        ],
        train: [
            { type: '해외 기차', icon: '🚄', name: 'Eurostar', class: 'Standard' },
            { type: '해외 기차', icon: '🚄', name: 'Shinkansen', class: 'Green Car' },
            { type: '해외 기차', icon: '🚆', name: 'Amtrak', class: 'Coach' }
        ],
        bus: [
            { type: '해외 버스', icon: '🚌', name: 'FlixBus', class: 'Standard' },
            { type: '해외 버스', icon: '🚌', name: 'Greyhound', class: 'Express' }
        ]
    }
};

// Recommendation Data
const RecommendationData = {
    domestic: {
        destinations: [
            { name: '남산타워', location: '서울', rating: 4.5, reviews: 1523, tags: ['관광', '야경', '데이트'], image: '' },
            { name: '해운대 해수욕장', location: '부산', rating: 4.7, reviews: 2341, tags: ['해변', '수영', '가족'], image: '' },
            { name: '성산일출봉', location: '제주', rating: 4.8, reviews: 3421, tags: ['자연', '등산', '일출'], image: '' },
            { name: '경복궁', location: '서울', rating: 4.6, reviews: 1876, tags: ['역사', '문화', '한복'], image: '' },
            { name: '설악산', location: '강원', rating: 4.9, reviews: 2567, tags: ['등산', '자연', '단풍'], image: '' },
            { name: '불국사', location: '경주', rating: 4.7, reviews: 1234, tags: ['역사', '문화', '유네스코'], image: '' }
        ],
        restaurants: [
            { name: '광장시장', location: '서울', rating: 4.4, reviews: 987, tags: ['전통음식', '분식', '시장'], image: '' },
            { name: '자갈치 시장', location: '부산', rating: 4.5, reviews: 1432, tags: ['해산물', '회', '시장'], image: '' },
            { name: '흑돼지거리', location: '제주', rating: 4.6, reviews: 2134, tags: ['고기', '흑돼지', '현지음식'], image: '' },
            { name: '전주 한옥마을', location: '전주', rating: 4.5, reviews: 876, tags: ['한정식', '비빔밥', '전통'], image: '' }
        ],
        hotels: [
            { name: '롯데호텔 서울', location: '서울', rating: 4.8, reviews: 3421, tags: ['럭셔리', '명동', '쇼핑'], image: '' },
            { name: '파라다이스 호텔 부산', location: '부산', rating: 4.7, reviews: 2156, tags: ['해변', '카지노', '리조트'], image: '' },
            { name: '신라스테이 제주', location: '제주', rating: 4.6, reviews: 1789, tags: ['비즈니스', '공항근처', '편리'], image: '' }
        ]
    },
    international: {
        destinations: [
            { name: 'Eiffel Tower', location: 'Paris, France', rating: 4.8, reviews: 45234, tags: ['Landmark', 'Romantic', 'Photo'], image: '' },
            { name: 'Tokyo Tower', location: 'Tokyo, Japan', rating: 4.6, reviews: 32156, tags: ['Landmark', 'City View', 'Night'], image: '' },
            { name: 'Statue of Liberty', location: 'New York, USA', rating: 4.7, reviews: 38921, tags: ['History', 'Monument', 'Culture'], image: '' },
            { name: 'Big Ben', location: 'London, UK', rating: 4.5, reviews: 28765, tags: ['History', 'Architecture', 'Photo'], image: '' },
            { name: 'Grand Palace', location: 'Bangkok, Thailand', rating: 4.9, reviews: 41234, tags: ['Temple', 'Culture', 'History'], image: '' },
            { name: 'Marina Bay', location: 'Singapore', rating: 4.8, reviews: 35678, tags: ['Modern', 'Skyline', 'Luxury'], image: '' }
        ],
        restaurants: [
            { name: 'Le Jules Verne', location: 'Paris, France', rating: 4.7, reviews: 3421, tags: ['Fine Dining', 'French', 'Eiffel Tower'], image: '' },
            { name: 'Sukiyabashi Jiro', location: 'Tokyo, Japan', rating: 4.9, reviews: 2134, tags: ['Sushi', 'Michelin Star', 'Traditional'], image: '' },
            { name: 'Katz\'s Delicatessen', location: 'New York, USA', rating: 4.6, reviews: 5432, tags: ['Deli', 'American', 'Historic'], image: '' },
            { name: 'Dishoom', location: 'London, UK', rating: 4.5, reviews: 4123, tags: ['Indian', 'Breakfast', 'Trendy'], image: '' }
        ],
        hotels: [
            { name: 'The Ritz Paris', location: 'Paris, France', rating: 4.9, reviews: 8765, tags: ['Luxury', '5-Star', 'Historic'], image: '' },
            { name: 'Park Hyatt Tokyo', location: 'Tokyo, Japan', rating: 4.8, reviews: 6543, tags: ['Luxury', 'Modern', 'City View'], image: '' },
            { name: 'The Plaza Hotel', location: 'New York, USA', rating: 4.7, reviews: 9876, tags: ['Luxury', 'Historic', '5th Avenue'], image: '' },
            { name: 'The Savoy', location: 'London, UK', rating: 4.8, reviews: 7654, tags: ['Luxury', 'Thames View', 'Historic'], image: '' }
        ]
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadFromLocalStorage();
    setupEventListeners();
    populateTimeOptions();
    setMinDate();
    updatePresets();
    updateRecentSearches();
    displayPopularDestinations();
}

// Local Storage Management
function loadFromLocalStorage() {
    const saved = localStorage.getItem('travelPlannerState');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            AppState.recentSearches = data.recentSearches || { departures: [], destinations: [] };
        } catch (e) {
            console.error('Error loading from localStorage:', e);
        }
    }
}

function saveToLocalStorage() {
    try {
        localStorage.setItem('travelPlannerState', JSON.stringify({
            recentSearches: AppState.recentSearches
        }));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function addToRecentSearches(type, value) {
    if (!value || value.trim() === '') return;

    const searches = AppState.recentSearches[type];
    const index = searches.indexOf(value);

    if (index > -1) {
        searches.splice(index, 1);
    }

    searches.unshift(value);

    if (searches.length > 5) {
        searches.pop();
    }

    saveToLocalStorage();
    updateRecentSearches();
}

// Event Listeners Setup
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Travel type toggle
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTravelType(btn.dataset.type));
    });

    // Location inputs with autocomplete
    setupAutocomplete('departure');
    setupAutocomplete('destination');

    // Duration slider
    const durationSlider = document.getElementById('duration-slider');
    const durationValue = document.getElementById('duration-value');
    durationSlider.addEventListener('input', (e) => {
        durationValue.textContent = e.target.value;
        AppState.duration = parseInt(e.target.value);
    });

    // Duration presets
    document.querySelectorAll('.duration-presets .preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const days = parseInt(btn.dataset.days);
            durationSlider.value = days;
            durationValue.textContent = days;
            AppState.duration = days;

            // Update button states
            document.querySelectorAll('.duration-presets .preset-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Travelers counter
    document.getElementById('travelers-minus').addEventListener('click', () => {
        if (AppState.travelers > 1) {
            AppState.travelers--;
            document.getElementById('travelers-count').textContent = AppState.travelers;
        }
    });

    document.getElementById('travelers-plus').addEventListener('click', () => {
        if (AppState.travelers < 10) {
            AppState.travelers++;
            document.getElementById('travelers-count').textContent = AppState.travelers;
        }
    });

    // Budget slider and input
    const budgetSlider = document.getElementById('budget-slider');
    const budgetInput = document.getElementById('budget-input');

    budgetSlider.addEventListener('input', (e) => {
        AppState.budget = parseInt(e.target.value);
        budgetInput.value = AppState.budget;
    });

    budgetInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value) || 0;
        AppState.budget = value;
        budgetSlider.value = value;
    });

    // Search button
    document.getElementById('search-btn').addEventListener('click', performSearch);

    // View toggles
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleView(btn.dataset.view));
    });

    // Recommendation tabs
    document.querySelectorAll('.rec-tab').forEach(btn => {
        btn.addEventListener('click', () => switchRecommendationTab(btn.dataset.rec));
    });

    // Transport filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterTransportation(btn.dataset.filter));
    });
}

// Tab Switching
function switchTab(tabName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Travel Type Switching
function switchTravelType(type) {
    AppState.travelType = type;

    // Update buttons
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });

    // Update budget slider
    updateBudgetSlider();

    // Update presets
    updatePresets();

    // Clear autocomplete suggestions
    document.querySelectorAll('.autocomplete-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

function updateBudgetSlider() {
    const budgetSlider = document.getElementById('budget-slider');
    const budgetInput = document.getElementById('budget-input');
    const budgetCurrency = document.getElementById('budget-currency');
    const budgetMin = document.getElementById('budget-min');
    const budgetMax = document.getElementById('budget-max');

    if (AppState.travelType === 'domestic') {
        budgetSlider.min = 10;
        budgetSlider.max = 500;
        budgetSlider.value = 100;
        budgetSlider.step = 10;
        budgetInput.value = 100;
        budgetCurrency.textContent = '만원';
        budgetMin.textContent = '10만원';
        budgetMax.textContent = '500만원';
        AppState.budget = 100;
    } else {
        budgetSlider.min = 500;
        budgetSlider.max = 10000;
        budgetSlider.value = 2000;
        budgetSlider.step = 100;
        budgetInput.value = 2000;
        budgetCurrency.textContent = 'USD';
        budgetMin.textContent = '$500';
        budgetMax.textContent = '$10,000';
        AppState.budget = 2000;
    }
}

// Autocomplete Setup
function setupAutocomplete(inputId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(`${inputId}-dropdown`);

    input.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();

        if (value.length < 2) {
            dropdown.classList.remove('active');
            return;
        }

        const suggestions = LocationData[AppState.travelType].suggestions.filter(item =>
            item.toLowerCase().includes(value)
        );

        if (suggestions.length > 0) {
            displaySuggestions(dropdown, suggestions, input);
        } else {
            dropdown.classList.remove('active');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

function displaySuggestions(dropdown, suggestions, input) {
    dropdown.innerHTML = suggestions.slice(0, 8).map(suggestion => `
        <div class="autocomplete-item" data-value="${suggestion}">
            ${suggestion}
        </div>
    `).join('');

    dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
            input.value = item.dataset.value;
            dropdown.classList.remove('active');
        });
    });

    dropdown.classList.add('active');
}

// Update Presets
function updatePresets() {
    const departurePresets = document.getElementById('departure-presets');
    const destinationPresets = document.getElementById('destination-presets');

    const locations = LocationData[AppState.travelType].popular;

    const presetHTML = locations.map(location => `
        <button class="preset-btn" data-location="${location}">${location}</button>
    `).join('');

    departurePresets.innerHTML = presetHTML;
    destinationPresets.innerHTML = presetHTML;

    // Add click handlers
    document.querySelectorAll('#departure-presets .preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('departure').value = btn.dataset.location;
        });
    });

    document.querySelectorAll('#destination-presets .preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('destination').value = btn.dataset.location;
        });
    });
}

// Update Recent Searches
function updateRecentSearches() {
    updateRecentList('departures', 'recent-departures', 'departure');
    updateRecentList('destinations', 'recent-destinations', 'destination');
}

function updateRecentList(type, containerId, inputId) {
    const container = document.getElementById(containerId);
    const searches = AppState.recentSearches[type];

    if (searches.length === 0) {
        container.style.display = 'none';
        return;
    }

    const itemsContainer = container.querySelector('.recent-items');
    itemsContainer.innerHTML = searches.map(search => `
        <span class="recent-item" data-value="${search}">${search}</span>
    `).join('');

    itemsContainer.querySelectorAll('.recent-item').forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById(inputId).value = item.dataset.value;
        });
    });

    container.classList.add('visible');
}

// Time Options
function populateTimeOptions() {
    const timeSelect = document.getElementById('departure-time');

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const hourStr = hour.toString().padStart(2, '0');
            const minuteStr = minute.toString().padStart(2, '0');
            const timeValue = `${hourStr}:${minuteStr}`;
            const option = document.createElement('option');
            option.value = timeValue;
            option.textContent = timeValue;
            timeSelect.appendChild(option);
        }
    }
}

// Set Minimum Date
function setMinDate() {
    const dateInput = document.getElementById('departure-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
}

// Perform Search
async function performSearch() {
    // Validate inputs
    const departure = document.getElementById('departure').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const departureDate = document.getElementById('departure-date').value;
    const departureTime = document.getElementById('departure-time').value;

    if (!departure || !destination) {
        alert('출발지와 도착지를 입력해주세요.');
        return;
    }

    if (!departureDate || !departureTime) {
        alert('출발 날짜와 시간을 선택해주세요.');
        return;
    }

    // Update state
    AppState.departure = departure;
    AppState.destination = destination;
    AppState.departureDate = departureDate;
    AppState.departureTime = departureTime;

    // Add to recent searches
    addToRecentSearches('departures', departure);
    addToRecentSearches('destinations', destination);

    // Show loading
    showLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate results
    generateTransportationOptions();
    generateRecommendations();
    initializeMap();
    generateTimeline();

    // Hide loading and show results
    showLoading(false);
    document.getElementById('results-section').style.display = 'block';

    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

// Generate Transportation Options
function generateTransportationOptions() {
    const container = document.getElementById('transport-cards');
    const transportTypes = AppState.travelType === 'domestic'
        ? ['train', 'bus', 'flight', 'car']
        : ['flight', 'train', 'bus'];

    const cards = [];

    transportTypes.forEach(type => {
        const data = TransportationData[AppState.travelType][type];
        if (!data) return;

        data.forEach((transport, index) => {
            const departureTime = addMinutes(AppState.departureTime, index * 30);
            const duration = generateDuration(type);
            const arrivalTime = addMinutes(departureTime, duration);
            const price = generatePrice(type, transport.class);

            cards.push({
                type: type,
                ...transport,
                departureTime,
                arrivalTime,
                duration,
                price
            });
        });
    });

    // Sort by departure time
    cards.sort((a, b) => a.departureTime.localeCompare(b.departureTime));

    container.innerHTML = cards.map(card => createTransportCard(card)).join('');

    // Add click handlers
    container.querySelectorAll('.transport-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            container.querySelectorAll('.transport-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            AppState.selectedTransport = cards[index];
            generateTimeline();
        });
    });
}

function createTransportCard(transport) {
    return `
        <div class="transport-card" data-type="${transport.type}">
            <div class="transport-icon">${transport.icon}</div>
            <div class="transport-info">
                <div class="transport-type">${transport.type}</div>
                <div class="transport-name">${transport.name}</div>
                <div class="transport-route">
                    <span class="transport-time">${transport.departureTime}</span>
                    <span class="transport-arrow">→</span>
                    <span class="transport-time">${transport.arrivalTime}</span>
                    <span class="transport-duration">(${formatDuration(transport.duration)})</span>
                </div>
            </div>
            <div class="transport-price">
                <div class="price-amount">${formatPrice(transport.price)}</div>
                <div class="price-class">${transport.class}</div>
            </div>
        </div>
    `;
}

// Helper Functions
function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
}

function generateDuration(type) {
    const ranges = {
        flight: [60, 120],
        train: [120, 240],
        bus: [180, 300],
        car: [150, 270]
    };

    const [min, max] = ranges[type] || [120, 240];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
}

function generatePrice(type, transportClass) {
    const basePrice = {
        flight: AppState.travelType === 'domestic' ? 50000 : 800000,
        train: 30000,
        bus: 20000,
        car: 15000
    };

    const classMultiplier = transportClass.includes('특실') || transportClass.includes('Business') ? 1.5 :
                           transportClass.includes('First') ? 2.5 : 1;

    const base = basePrice[type] || 30000;
    return Math.floor(base * classMultiplier * (0.9 + Math.random() * 0.3));
}

function formatPrice(price) {
    if (AppState.travelType === 'domestic') {
        return `${(price / 10000).toFixed(1)}만원`;
    } else {
        return `$${Math.floor(price / 1000)}`;
    }
}

// Filter Transportation
function filterTransportation(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    document.querySelectorAll('.transport-card').forEach(card => {
        if (filter === 'all') {
            card.style.display = 'grid';
        } else {
            card.style.display = card.dataset.type === filter ? 'grid' : 'none';
        }
    });
}

// Map Initialization
function initializeMap() {
    // Note: This requires a valid Google Maps API key
    const mapElement = document.getElementById('google-map');

    if (typeof google === 'undefined') {
        mapElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f1f5f9; color: #64748b;">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
                    <div style="font-size: 1.125rem; font-weight: 600;">지도 미리보기</div>
                    <div style="font-size: 0.875rem; margin-top: 0.5rem;">${AppState.departure} → ${AppState.destination}</div>
                    <div style="font-size: 0.75rem; margin-top: 1rem; color: #94a3b8;">Google Maps API 키를 설정하면 실제 지도가 표시됩니다</div>
                </div>
            </div>
        `;
        return;
    }

    // Initialize Google Maps (if API is available)
    const map = new google.maps.Map(mapElement, {
        zoom: 7,
        center: { lat: 37.5665, lng: 126.9780 } // Seoul
    });

    // Add markers and route (simplified)
    const departureMarker = new google.maps.Marker({
        position: { lat: 37.5665, lng: 126.9780 },
        map: map,
        title: AppState.departure
    });

    const destinationMarker = new google.maps.Marker({
        position: { lat: 35.1796, lng: 129.0756 }, // Busan
        map: map,
        title: AppState.destination
    });
}

// View Toggle
function toggleView(view) {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    if (view === 'map') {
        document.getElementById('map-view').style.display = 'block';
        document.getElementById('timeline-view').style.display = 'none';
    } else {
        document.getElementById('map-view').style.display = 'none';
        document.getElementById('timeline-view').style.display = 'block';
    }
}

// Generate Timeline
function generateTimeline() {
    const container = document.getElementById('timeline');

    if (!AppState.selectedTransport) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #64748b;">
                교통 수단을 선택하면 상세 타임라인이 표시됩니다
            </div>
        `;
        return;
    }

    const transport = AppState.selectedTransport;
    const items = [
        {
            icon: '🏁',
            time: `${AppState.departureDate} ${transport.departureTime}`,
            title: '출발',
            description: `${AppState.departure}에서 출발`
        },
        {
            icon: transport.icon,
            time: `${formatDuration(Math.floor(transport.duration / 2))} 경과`,
            title: '이동 중',
            description: `${transport.name} (${transport.class})`
        },
        {
            icon: '🎯',
            time: `${AppState.departureDate} ${transport.arrivalTime}`,
            title: '도착',
            description: `${AppState.destination}에 도착`
        }
    ];

    // Add accommodation if multi-day trip
    if (AppState.duration > 1) {
        items.push({
            icon: '🏨',
            time: `${AppState.departureDate} 저녁`,
            title: '숙소 체크인',
            description: '추천 숙소에서 휴식'
        });
    }

    container.innerHTML = items.map(item => `
        <div class="timeline-item">
            <div class="timeline-icon">${item.icon}</div>
            <div class="timeline-content">
                <div class="timeline-time">${item.time}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-description">${item.description}</div>
            </div>
        </div>
    `).join('');
}

// Generate Recommendations
function generateRecommendations() {
    const type = AppState.travelType;
    const data = RecommendationData[type];

    displayRecommendationCards('destinations', data.destinations);
    displayRecommendationCards('restaurants', data.restaurants);
    displayRecommendationCards('hotels', data.hotels);
}

function displayRecommendationCards(category, items) {
    const container = document.getElementById(`${category}-rec`);

    container.innerHTML = items.slice(0, 6).map(item => `
        <div class="rec-card">
            <div class="rec-card-image">${generatePlaceholderImage(item.name)}</div>
            <div class="rec-card-content">
                <div class="rec-card-title">${item.name}</div>
                <div class="rec-card-location">📍 ${item.location}</div>
                <div class="rec-card-rating">
                    <span class="rec-card-stars">${generateStars(item.rating)}</span>
                    <span class="rec-card-reviews">${item.rating} (${item.reviews.toLocaleString()})</span>
                </div>
                <div class="rec-card-tags">
                    ${item.tags.map(tag => `<span class="rec-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function generatePlaceholderImage(name) {
    const emojis = ['🏖️', '🏔️', '🏛️', '🌆', '🌉', '🗼', '🎡', '🎢', '🎪', '🎨'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    return `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-size: 3rem;">
            ${emoji}
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return '⭐'.repeat(fullStars) + (hasHalfStar ? '✨' : '') + '☆'.repeat(emptyStars);
}

// Switch Recommendation Tab
function switchRecommendationTab(tab) {
    document.querySelectorAll('.rec-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.rec === tab);
    });

    document.querySelectorAll('.rec-cards').forEach(cards => {
        cards.style.display = 'none';
    });
    document.getElementById(`${tab}-rec`).style.display = 'grid';
}

// Display Popular Destinations
function displayPopularDestinations() {
    const domesticData = [
        { name: '서울', country: '대한민국', emoji: '🏙️' },
        { name: '부산', country: '대한민국', emoji: '🏖️' },
        { name: '제주', country: '대한민국', emoji: '🌴' },
        { name: '강릉', country: '대한민국', emoji: '⛰️' },
        { name: '경주', country: '대한민국', emoji: '🏛️' },
        { name: '전주', country: '대한민국', emoji: '🏘️' }
    ];

    const internationalData = [
        { name: 'Paris', country: 'France', emoji: '🗼' },
        { name: 'Tokyo', country: 'Japan', emoji: '🗾' },
        { name: 'New York', country: 'USA', emoji: '🗽' },
        { name: 'London', country: 'UK', emoji: '🎡' },
        { name: 'Bangkok', country: 'Thailand', emoji: '🏯' },
        { name: 'Singapore', country: 'Singapore', emoji: '🌆' }
    ];

    displayDestinationGrid('domestic-popular', domesticData);
    displayDestinationGrid('international-popular', internationalData);
}

function displayDestinationGrid(containerId, destinations) {
    const container = document.getElementById(containerId);

    container.innerHTML = destinations.map(dest => `
        <div class="destination-card">
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-size: 4rem;">
                ${dest.emoji}
            </div>
            <div class="destination-overlay">
                <div class="destination-name">${dest.name}</div>
                <div class="destination-country">${dest.country}</div>
            </div>
        </div>
    `).join('');

    // Add click handlers
    container.querySelectorAll('.destination-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            document.getElementById('destination').value = destinations[index].name;
            switchTab('planner');
            document.getElementById('destination').focus();
        });
    });
}

// Loading Overlay
function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

// Console Welcome Message
console.log('%c🌏 Global Travel Planner', 'font-size: 24px; color: #2563eb; font-weight: bold;');
console.log('%cWelcome to your personalized travel planning experience!', 'font-size: 14px; color: #64748b;');
