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
            '인천국제공항 (Incheon Airport)',
            '김포국제공항 (Gimpo Airport)',
            'Paris Charles de Gaulle Airport',
            'Tokyo Narita Airport',
            'Bangkok Suvarnabhumi Airport',
            'Singapore Changi Airport'
        ],
        suggestions: [
            // 한국 국제공항
            '인천국제공항 (Incheon International Airport)',
            '김포국제공항 (Gimpo International Airport)',
            '김해국제공항 (Gimhae International Airport)',
            '제주국제공항 (Jeju International Airport)',
            '대구국제공항 (Daegu International Airport)',
            '청주국제공항 (Cheongju International Airport)',
            '무안국제공항 (Muan International Airport)',
            // 해외 공항 및 명소
            'Paris Charles de Gaulle Airport', 'Eiffel Tower Paris',
            'Tokyo Station', 'Tokyo Narita Airport', 'Shibuya Tokyo',
            'Times Square NYC', 'JFK Airport New York',
            'London Heathrow Airport', 'Big Ben London',
            'Bangkok Suvarnabhumi Airport', 'Grand Palace Bangkok',
            'Singapore Changi Airport', 'Marina Bay Singapore',
            'Dubai International Airport', 'Burj Khalifa Dubai',
            'Rome Fiumicino Airport', 'Colosseum Rome',
            'Barcelona Airport', 'Sagrada Familia Barcelona',
            'Sydney Airport', 'Sydney Opera House',
            'Hong Kong International Airport', 'Victoria Peak Hong Kong',
            'Taipei Taoyuan Airport', 'Taipei 101',
            'Shanghai Pudong Airport', 'The Bund Shanghai'
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

// Region-based Recommendation Data
const RegionRecommendations = {
    domestic: {
        '서울': {
            destinations: [
                { name: '남산타워', location: '서울', rating: 4.5, reviews: 1523, tags: ['관광', '야경', '데이트'], image: 'https://images.unsplash.com/photo-1601899197944-1b4a2d1c6976?w=800&h=600&fit=crop' },
                { name: '경복궁', location: '서울', rating: 4.6, reviews: 1876, tags: ['역사', '문화', '한복'], image: 'https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&h=600&fit=crop' },
                { name: '명동 거리', location: '서울', rating: 4.4, reviews: 3421, tags: ['쇼핑', '음식', '관광'], image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=600&fit=crop' },
                { name: '북촌 한옥마을', location: '서울', rating: 4.5, reviews: 2134, tags: ['전통', '한옥', '사진'], image: 'https://images.unsplash.com/photo-1578193661550-3d89c9a0c7e5?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: '광장시장', location: '서울', rating: 4.4, reviews: 987, tags: ['전통음식', '분식', '시장'], image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop' },
                { name: '명동 칼국수', location: '서울', rating: 4.3, reviews: 654, tags: ['칼국수', '만두', '현지맛집'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=600&fit=crop' },
                { name: '이태원 세계음식거리', location: '서울', rating: 4.5, reviews: 1234, tags: ['세계음식', '다양성', '분위기'], image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: '롯데호텔 서울', location: '서울', rating: 4.8, reviews: 3421, tags: ['럭셔리', '명동', '쇼핑'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' },
                { name: '신라호텔', location: '서울', rating: 4.7, reviews: 2876, tags: ['럭셔리', '한강뷰', '5성급'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
                { name: '호텔 시그니엘', location: '서울', rating: 4.9, reviews: 1987, tags: ['최고급', '롯데타워', '전망'], image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop' }
            ]
        },
        '부산': {
            destinations: [
                { name: '해운대 해수욕장', location: '부산', rating: 4.7, reviews: 2341, tags: ['해변', '수영', '가족'], image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop' },
                { name: '감천문화마을', location: '부산', rating: 4.6, reviews: 1876, tags: ['예술', '사진', '마을'], image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=600&fit=crop' },
                { name: '태종대', location: '부산', rating: 4.5, reviews: 1234, tags: ['자연', '절벽', '등대'], image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop' },
                { name: '광안대교', location: '부산', rating: 4.8, reviews: 2987, tags: ['야경', '다리', '데이트'], image: 'https://images.unsplash.com/photo-1601899197944-1b4a2d1c6976?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: '자갈치 시장', location: '부산', rating: 4.5, reviews: 1432, tags: ['해산물', '회', '시장'], image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&h=600&fit=crop' },
                { name: '밀면 본점', location: '부산', rating: 4.4, reviews: 876, tags: ['밀면', '부산음식', '냉면'], image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop' },
                { name: '동래파전', location: '부산', rating: 4.6, reviews: 654, tags: ['파전', '막걸리', '전통'], image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: '파라다이스 호텔 부산', location: '부산', rating: 4.7, reviews: 2156, tags: ['해변', '카지노', '리조트'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
                { name: '웨스틴 조선 부산', location: '부산', rating: 4.6, reviews: 1789, tags: ['럭셔리', '해운대', '5성급'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' },
                { name: '아난티 코브', location: '부산', rating: 4.8, reviews: 2543, tags: ['리조트', '오션뷰', '힐링'], image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop' }
            ]
        },
        '제주': {
            destinations: [
                { name: '성산일출봉', location: '제주', rating: 4.8, reviews: 3421, tags: ['자연', '등산', '일출'], image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop' },
                { name: '한라산', location: '제주', rating: 4.9, reviews: 2876, tags: ['등산', '국립공원', '자연'], image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=600&fit=crop' },
                { name: '우도', location: '제주', rating: 4.7, reviews: 1987, tags: ['섬', '자전거', '해변'], image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop' },
                { name: '중문 관광단지', location: '제주', rating: 4.5, reviews: 2134, tags: ['관광', '쇼핑', '리조트'], image: 'https://images.unsplash.com/photo-1578193661550-3d89c9a0c7e5?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: '흑돼지거리', location: '제주', rating: 4.6, reviews: 2134, tags: ['고기', '흑돼지', '현지음식'], image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop' },
                { name: '제주 해녀의 집', location: '제주', rating: 4.5, reviews: 876, tags: ['해산물', '해녀', '전통'], image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&h=600&fit=crop' },
                { name: '올레국수', location: '제주', rating: 4.4, reviews: 654, tags: ['국수', '고기국수', '현지맛집'], image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: '신라스테이 제주', location: '제주', rating: 4.6, reviews: 1789, tags: ['비즈니스', '공항근처', '편리'], image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop' },
                { name: '롯데호텔 제주', location: '제주', rating: 4.7, reviews: 2345, tags: ['럭셔리', '중문', '리조트'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
                { name: '메종 글래드 제주', location: '제주', rating: 4.8, reviews: 1543, tags: ['프리미엄', '디자인', '휴양'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' }
            ]
        },
        '강릉': {
            destinations: [
                { name: '경포대 해수욕장', location: '강릉', rating: 4.6, reviews: 1543, tags: ['해변', '일출', '가족'], image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop' },
                { name: '오죽헌', location: '강릉', rating: 4.4, reviews: 876, tags: ['역사', '문화', '유적지'], image: 'https://images.unsplash.com/photo-1578193661550-3d89c9a0c7e5?w=800&h=600&fit=crop' },
                { name: '정동진', location: '강릉', rating: 4.7, reviews: 2134, tags: ['일출', '해변', '기차역'], image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: '강릉 초당 순두부', location: '강릉', rating: 4.5, reviews: 987, tags: ['순두부', '전통', '건강식'], image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop' },
                { name: '강릉 커피거리', location: '강릉', rating: 4.6, reviews: 1234, tags: ['커피', '카페', '바다'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: '강릉 씨마크 호텔', location: '강릉', rating: 4.5, reviews: 1234, tags: ['오션뷰', '리조트', '가족'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
                { name: '세인트존스 호텔', location: '강릉', rating: 4.6, reviews: 987, tags: ['럭셔리', '경포대', '해변'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' }
            ]
        },
        '경주': {
            destinations: [
                { name: '불국사', location: '경주', rating: 4.7, reviews: 1234, tags: ['역사', '문화', '유네스코'], image: 'https://images.unsplash.com/photo-1578193661550-3d89c9a0c7e5?w=800&h=600&fit=crop' },
                { name: '석굴암', location: '경주', rating: 4.8, reviews: 1543, tags: ['유네스코', '문화재', '역사'], image: 'https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&h=600&fit=crop' },
                { name: '첨성대', location: '경주', rating: 4.5, reviews: 876, tags: ['천문대', '역사', '신라'], image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: '경주 황남빵', location: '경주', rating: 4.4, reviews: 654, tags: ['빵', '디저트', '특산물'], image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop' },
                { name: '경주 쌈밥', location: '경주', rating: 4.5, reviews: 543, tags: ['쌈밥', '한정식', '전통'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: '경주 힐튼', location: '경주', rating: 4.6, reviews: 987, tags: ['럭셔리', '리조트', '골프'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
                { name: '코모도 호텔', location: '경주', rating: 4.5, reviews: 765, tags: ['비즈니스', '편리', '시내'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' }
            ]
        },
        '전주': {
            destinations: [
                { name: '전주 한옥마을', location: '전주', rating: 4.8, reviews: 2876, tags: ['한옥', '전통', '문화'], image: 'https://images.unsplash.com/photo-1578193661550-3d89c9a0c7e5?w=800&h=600&fit=crop' },
                { name: '경기전', location: '전주', rating: 4.5, reviews: 987, tags: ['역사', '왕조', '문화재'], image: 'https://images.unsplash.com/photo-1555217851-6141535bd771?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: '전주 비빔밥', location: '전주', rating: 4.7, reviews: 1876, tags: ['비빔밥', '전통음식', '한정식'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=600&fit=crop' },
                { name: '남부시장 야시장', location: '전주', rating: 4.6, reviews: 1234, tags: ['야시장', '길거리음식', '분위기'], image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: '전주 한옥마을 한옥스테이', location: '전주', rating: 4.5, reviews: 876, tags: ['한옥', '전통', '체험'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
                { name: '라마다 호텔 전주', location: '전주', rating: 4.4, reviews: 654, tags: ['비즈니스', '편리', '시내'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' }
            ]
        }
    },
    international: {
        'Paris': {
            destinations: [
                { name: 'Eiffel Tower', location: 'Paris, France', rating: 4.8, reviews: 45234, tags: ['Landmark', 'Romantic', 'Photo'], image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=600&fit=crop' },
                { name: 'Louvre Museum', location: 'Paris, France', rating: 4.7, reviews: 38921, tags: ['Museum', 'Art', 'Culture'], image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop' },
                { name: 'Arc de Triomphe', location: 'Paris, France', rating: 4.6, reviews: 28765, tags: ['History', 'Monument', 'Photo'], image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: 'Le Jules Verne', location: 'Paris, France', rating: 4.7, reviews: 3421, tags: ['Fine Dining', 'French', 'Eiffel Tower'], image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop' },
                { name: 'L\'Ambroisie', location: 'Paris, France', rating: 4.9, reviews: 2134, tags: ['Michelin Star', 'French', 'Gourmet'], image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: 'The Ritz Paris', location: 'Paris, France', rating: 4.9, reviews: 8765, tags: ['Luxury', '5-Star', 'Historic'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
                { name: 'Le Meurice', location: 'Paris, France', rating: 4.8, reviews: 6543, tags: ['Luxury', 'Palace', 'Art'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' }
            ]
        },
        'Tokyo': {
            destinations: [
                { name: 'Tokyo Tower', location: 'Tokyo, Japan', rating: 4.6, reviews: 32156, tags: ['Landmark', 'City View', 'Night'], image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop' },
                { name: 'Senso-ji Temple', location: 'Tokyo, Japan', rating: 4.7, reviews: 28543, tags: ['Temple', 'Culture', 'History'], image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop' },
                { name: 'Shibuya Crossing', location: 'Tokyo, Japan', rating: 4.5, reviews: 35234, tags: ['Urban', 'Modern', 'Photo'], image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: 'Sukiyabashi Jiro', location: 'Tokyo, Japan', rating: 4.9, reviews: 2134, tags: ['Sushi', 'Michelin Star', 'Traditional'], image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop' },
                { name: 'Narisawa', location: 'Tokyo, Japan', rating: 4.8, reviews: 1876, tags: ['Fine Dining', 'Innovative', 'Michelin'], image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: 'Park Hyatt Tokyo', location: 'Tokyo, Japan', rating: 4.8, reviews: 6543, tags: ['Luxury', 'Modern', 'City View'], image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop' },
                { name: 'Aman Tokyo', location: 'Tokyo, Japan', rating: 4.9, reviews: 4321, tags: ['Luxury', 'Zen', 'Spa'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' }
            ]
        },
        'New York': {
            destinations: [
                { name: 'Statue of Liberty', location: 'New York, USA', rating: 4.7, reviews: 38921, tags: ['History', 'Monument', 'Culture'], image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop' },
                { name: 'Central Park', location: 'New York, USA', rating: 4.8, reviews: 45678, tags: ['Park', 'Nature', 'Recreation'], image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop' },
                { name: 'Times Square', location: 'New York, USA', rating: 4.5, reviews: 52341, tags: ['Urban', 'Shopping', 'Entertainment'], image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: 'Katz\'s Delicatessen', location: 'New York, USA', rating: 4.6, reviews: 5432, tags: ['Deli', 'American', 'Historic'], image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop' },
                { name: 'Le Bernardin', location: 'New York, USA', rating: 4.9, reviews: 3456, tags: ['Fine Dining', 'Seafood', 'Michelin'], image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: 'The Plaza Hotel', location: 'New York, USA', rating: 4.7, reviews: 9876, tags: ['Luxury', 'Historic', '5th Avenue'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' },
                { name: 'The St. Regis', location: 'New York, USA', rating: 4.8, reviews: 7654, tags: ['Luxury', 'Classic', 'Midtown'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' }
            ]
        },
        'London': {
            destinations: [
                { name: 'Big Ben', location: 'London, UK', rating: 4.5, reviews: 28765, tags: ['History', 'Architecture', 'Photo'], image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop' },
                { name: 'Tower Bridge', location: 'London, UK', rating: 4.7, reviews: 32156, tags: ['Landmark', 'Bridge', 'Thames'], image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop' },
                { name: 'British Museum', location: 'London, UK', rating: 4.8, reviews: 38921, tags: ['Museum', 'History', 'Culture'], image: 'https://images.unsplash.com/photo-1543074054-5d71e3593e3a?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: 'Dishoom', location: 'London, UK', rating: 4.5, reviews: 4123, tags: ['Indian', 'Breakfast', 'Trendy'], image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop' },
                { name: 'The Ledbury', location: 'London, UK', rating: 4.8, reviews: 3214, tags: ['Fine Dining', 'Michelin', 'Modern'], image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: 'The Savoy', location: 'London, UK', rating: 4.8, reviews: 7654, tags: ['Luxury', 'Thames View', 'Historic'], image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop' },
                { name: 'Claridge\'s', location: 'London, UK', rating: 4.9, reviews: 6543, tags: ['Luxury', 'Art Deco', 'Mayfair'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' }
            ]
        },
        'Bangkok': {
            destinations: [
                { name: 'Grand Palace', location: 'Bangkok, Thailand', rating: 4.9, reviews: 41234, tags: ['Temple', 'Culture', 'History'], image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop' },
                { name: 'Wat Pho', location: 'Bangkok, Thailand', rating: 4.7, reviews: 28543, tags: ['Temple', 'Buddha', 'Heritage'], image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop' },
                { name: 'Chatuchak Market', location: 'Bangkok, Thailand', rating: 4.6, reviews: 19876, tags: ['Shopping', 'Market', 'Local'], image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: 'Gaggan', location: 'Bangkok, Thailand', rating: 4.9, reviews: 4321, tags: ['Fine Dining', 'Indian', 'Innovative'], image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop' },
                { name: 'Jay Fai', location: 'Bangkok, Thailand', rating: 4.8, reviews: 3214, tags: ['Street Food', 'Michelin', 'Thai'], image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: 'Mandarin Oriental', location: 'Bangkok, Thailand', rating: 4.9, reviews: 8765, tags: ['Luxury', 'River View', 'Spa'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
                { name: 'The Peninsula', location: 'Bangkok, Thailand', rating: 4.8, reviews: 6543, tags: ['Luxury', 'River', 'Modern'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' }
            ]
        },
        'Singapore': {
            destinations: [
                { name: 'Marina Bay Sands', location: 'Singapore', rating: 4.8, reviews: 35678, tags: ['Modern', 'Skyline', 'Luxury'], image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop' },
                { name: 'Gardens by the Bay', location: 'Singapore', rating: 4.9, reviews: 42156, tags: ['Nature', 'Garden', 'Attraction'], image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop' },
                { name: 'Sentosa Island', location: 'Singapore', rating: 4.6, reviews: 28543, tags: ['Beach', 'Resort', 'Entertainment'], image: 'https://images.unsplash.com/photo-1551162804-d6e5ae3b3e96?w=800&h=600&fit=crop' }
            ],
            restaurants: [
                { name: 'Hawker Chan', location: 'Singapore', rating: 4.5, reviews: 5432, tags: ['Hawker', 'Michelin', 'Affordable'], image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop' },
                { name: 'Odette', location: 'Singapore', rating: 4.9, reviews: 3456, tags: ['Fine Dining', 'French', 'Michelin'], image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop' }
            ],
            hotels: [
                { name: 'Marina Bay Sands Hotel', location: 'Singapore', rating: 4.8, reviews: 12345, tags: ['Luxury', 'Rooftop Pool', 'Iconic'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop' },
                { name: 'Raffles Hotel', location: 'Singapore', rating: 4.9, reviews: 8765, tags: ['Luxury', 'Colonial', 'Historic'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop' }
            ]
        }
    }
};

// Transportation Route Mapping - 실제 존재하는 교통 경로
const TransportRoutes = {
    domestic: {
        '서울-부산': ['train', 'bus', 'flight', 'car'],
        '서울-제주': ['flight'],
        '서울-강릉': ['train', 'bus', 'car'],
        '서울-경주': ['train', 'bus', 'car'],
        '서울-전주': ['train', 'bus', 'car'],
        '부산-제주': ['flight'],
        '부산-서울': ['train', 'bus', 'flight', 'car'],
        '부산-강릉': ['bus', 'car'],
        '부산-경주': ['train', 'bus', 'car'],
        '제주-서울': ['flight'],
        '제주-부산': ['flight'],
        '강릉-서울': ['train', 'bus', 'car'],
        '강릉-부산': ['bus', 'car'],
        '경주-서울': ['train', 'bus', 'car'],
        '경주-부산': ['train', 'bus', 'car'],
        '전주-서울': ['train', 'bus', 'car'],
        '전주-부산': ['bus', 'car']
    },
    international: {
        // 한국 → 해외 (인천공항은 서울로 매핑됨)
        '서울-Paris': ['flight'],
        '서울-Tokyo': ['flight'],
        '서울-New York': ['flight'],
        '서울-London': ['flight'],
        '서울-Bangkok': ['flight'],
        '서울-Singapore': ['flight'],
        '부산-Tokyo': ['flight'],
        '부산-Osaka': ['flight'],
        '부산-Bangkok': ['flight'],
        '제주-Shanghai': ['flight'],
        '제주-Tokyo': ['flight'],
        // 해외 도시 간
        'Paris-London': ['train', 'flight'],
        'Paris-Tokyo': ['flight'],
        'Paris-New York': ['flight'],
        'Paris-Bangkok': ['flight'],
        'Paris-Singapore': ['flight'],
        'Tokyo-Osaka': ['train', 'bus', 'flight'],
        'Tokyo-Paris': ['flight'],
        'Tokyo-New York': ['flight'],
        'Tokyo-Bangkok': ['flight'],
        'Tokyo-Singapore': ['flight'],
        'Tokyo-London': ['flight'],
        'New York-Washington': ['train', 'bus', 'flight'],
        'New York-Paris': ['flight'],
        'New York-Tokyo': ['flight'],
        'New York-London': ['flight'],
        'London-Paris': ['train', 'flight'],
        'London-Tokyo': ['flight'],
        'London-New York': ['flight'],
        'London-Bangkok': ['flight'],
        'London-Singapore': ['flight'],
        'Bangkok-Singapore': ['flight', 'bus'],
        'Bangkok-Paris': ['flight'],
        'Bangkok-Tokyo': ['flight'],
        'Bangkok-London': ['flight'],
        'Bangkok-New York': ['flight'],
        'Singapore-Bangkok': ['flight', 'bus'],
        'Singapore-Paris': ['flight'],
        'Singapore-Tokyo': ['flight'],
        'Singapore-London': ['flight'],
        'Singapore-New York': ['flight']
    }
};

// Helper function to extract region from destination string
function extractRegion(destination) {
    if (!destination) return null;

    // 국내 도시 매핑
    const domesticCities = {
        '서울': ['서울', 'Seoul', '강남', '명동', '이태원', '홍대', '인천공항', '김포공항', '인천국제공항', '김포국제공항', 'Incheon', 'Gimpo', 'ICN', 'GMP'],
        '부산': ['부산', 'Busan', '해운대', '광안리', '김해국제공항', '김해공항', 'Gimhae', 'PUS'],
        '제주': ['제주', 'Jeju', '제주공항', '제주국제공항', 'CJU'],
        '강릉': ['강릉', 'Gangneung', '경포대', '정동진'],
        '경주': ['경주', 'Gyeongju', '불국사', '석굴암', '첨성대'],
        '전주': ['전주', 'Jeonju', '한옥마을', '경기전']
    };

    // 해외 도시 매핑
    const internationalCities = {
        'Paris': ['Paris', 'CDG', 'Charles de Gaulle', 'Eiffel'],
        'Tokyo': ['Tokyo', 'Narita', 'Haneda', 'Shibuya', 'Shinjuku'],
        'New York': ['New York', 'NYC', 'JFK', 'Manhattan', 'Times Square'],
        'London': ['London', 'Heathrow', 'Big Ben', 'Westminster'],
        'Bangkok': ['Bangkok', 'Suvarnabhumi', 'Grand Palace'],
        'Singapore': ['Singapore', 'Changi', 'Marina Bay']
    };

    const destLower = destination.toLowerCase();

    // Check domestic cities
    for (const [city, keywords] of Object.entries(domesticCities)) {
        if (keywords.some(keyword => destLower.includes(keyword.toLowerCase()))) {
            return { region: city, type: 'domestic' };
        }
    }

    // Check international cities
    for (const [city, keywords] of Object.entries(internationalCities)) {
        if (keywords.some(keyword => destLower.includes(keyword.toLowerCase()))) {
            return { region: city, type: 'international' };
        }
    }

    return null;
}

// Helper function to get available transport types for a route
function getAvailableTransport(departure, destination, travelType) {
    const routes = TransportRoutes[travelType];
    if (!routes) return ['flight']; // Default to flight if not found

    const depRegion = extractRegion(departure);
    const destRegion = extractRegion(destination);

    if (!depRegion || !destRegion) return ['flight'];

    const routeKey1 = `${depRegion.region}-${destRegion.region}`;
    const routeKey2 = `${destRegion.region}-${depRegion.region}`;

    return routes[routeKey1] || routes[routeKey2] || ['flight'];
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

    // Get available transport types based on actual route
    const availableTransportTypes = getAvailableTransport(
        AppState.departure,
        AppState.destination,
        AppState.travelType
    );

    const cards = [];

    availableTransportTypes.forEach(type => {
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
    const destRegionInfo = extractRegion(AppState.destination);

    if (!destRegionInfo) {
        // If region not found, show message
        ['destinations', 'restaurants', 'hotels'].forEach(category => {
            const container = document.getElementById(`${category}-rec`);
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #64748b;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
                    <div style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">
                        해당 지역의 추천 정보를 준비 중입니다
                    </div>
                    <div style="font-size: 0.875rem;">
                        주요 도시: 서울, 부산, 제주, 강릉, 경주, 전주 (국내) | Paris, Tokyo, New York, London, Bangkok, Singapore (해외)
                    </div>
                </div>
            `;
        });
        return;
    }

    const region = destRegionInfo.region;
    const type = destRegionInfo.type;

    const regionData = RegionRecommendations[type][region];

    if (!regionData) {
        console.warn(`No recommendations found for region: ${region}`);
        return;
    }

    displayRecommendationCards('destinations', regionData.destinations || []);
    displayRecommendationCards('restaurants', regionData.restaurants || []);
    displayRecommendationCards('hotels', regionData.hotels || []);
}

function displayRecommendationCards(category, items) {
    const container = document.getElementById(`${category}-rec`);

    container.innerHTML = items.slice(0, 6).map((item, index) => `
        <div class="rec-card">
            <img class="rec-card-image" src="${item.image}" alt="${item.name}" loading="lazy"
                 onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="rec-card-image-fallback" style="display: none; width: 100%; height: 180px; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-size: 3rem;">
                ${getPlaceholderEmoji(index)}
            </div>
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

function getPlaceholderEmoji(index) {
    const emojis = ['🏖️', '🏔️', '🏛️', '🌆', '🌉', '🗼', '🎡', '🎢', '🎪', '🎨'];
    return emojis[index % emojis.length];
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
        { name: '서울', country: '대한민국', image: 'https://images.unsplash.com/photo-1601899197944-1b4a2d1c6976?w=800&h=600&fit=crop' },
        { name: '부산', country: '대한민국', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop' },
        { name: '제주', country: '대한민국', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop' },
        { name: '강릉', country: '대한민국', image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&h=600&fit=crop' },
        { name: '경주', country: '대한민국', image: 'https://images.unsplash.com/photo-1578193661550-3d89c9a0c7e5?w=800&h=600&fit=crop' },
        { name: '전주', country: '대한민국', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=600&fit=crop' }
    ];

    const internationalData = [
        { name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=600&fit=crop' },
        { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop' },
        { name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop' },
        { name: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop' },
        { name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop' },
        { name: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop' }
    ];

    displayDestinationGrid('domestic-popular', domesticData);
    displayDestinationGrid('international-popular', internationalData);
}

function displayDestinationGrid(containerId, destinations) {
    const container = document.getElementById(containerId);

    container.innerHTML = destinations.map(dest => `
        <div class="destination-card">
            <img class="destination-image" src="${dest.image}" alt="${dest.name}" loading="lazy"
                 style="width: 100%; height: 100%; object-fit: cover;">
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
