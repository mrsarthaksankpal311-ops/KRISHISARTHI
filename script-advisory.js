(function checkAuth() {
    // In a real app, this would check a secure cookie or token.
    // Here, we check the flag set by the login form in script-auth.js.
    if (localStorage.getItem('isAuthenticated') !== 'true') {
        // Redirect to login page and prevent further script execution
        window.location.replace('login-signup.html');
        return;
    }
})();

// ---------- CONFIG ----------
        // Replace this with your real OpenWeather API Key
       const API_KEY = '514874d76663b1ee7242d0637c0c9f7b';

        // Small crop database with ranges (temperature in °C, humidity in %)
       const cropRecommendations = [
    // --- CEREAL GRAINS & PSEUDOCEREALS ---
    { name: "Wheat", tempRange: [7, 25], humidityRange: [30, 80], season: "Rabi" },
    { name: "Rice", tempRange: [20, 35], humidityRange: [65, 95], season: "Kharif" },
    { name: "Maize", tempRange: [18, 32], humidityRange: [40, 75], season: "Kharif/Rabi" },
    { name: "Barley", tempRange: [10, 20], humidityRange: [40, 70], season: "Rabi" },
    { name: "Sorghum", tempRange: [22, 38], humidityRange: [20, 60], season: "Kharif" },
    { name: "Pearl Millet (Bajra)", tempRange: [25, 35], humidityRange: [20, 50], season: "Kharif (Dry)" },
    { name: "Oats", tempRange: [10, 25], humidityRange: [50, 80], season: "Cool Season" },
    { name: "Quinoa", tempRange: [15, 25], humidityRange: [50, 70], season: "Temperate/Cool" },
    // --- PULSES (DRY LEGUMES) ---
    { name: "Chickpea", tempRange: [10, 30], humidityRange: [30, 70], season: "Rabi" },
    { name: "Lentil", tempRange: [10, 25], humidityRange: [40, 75], season: "Rabi" },
    { name: "Pigeon Pea (Arhar/Tur)", tempRange: [25, 35], humidityRange: [50, 80], season: "Kharif" },
    { name: "Soybean", tempRange: [20, 30], humidityRange: [50, 85], season: "Kharif" },
    { name: "Mung Bean (Green Gram)", tempRange: [20, 30], humidityRange: [40, 75], season: "Kharif/Zaid" },
    { name: "Black Gram (Urad)", tempRange: [20, 30], humidityRange: [50, 80], season: "Kharif/Rabi" },
    { name: "Field Pea", tempRange: [13, 22], humidityRange: [40, 70], season: "Rabi" },
    // --- OILSEEDS & OIL CROPS ---
    { name: "Groundnut (Peanut)", tempRange: [22, 35], humidityRange: [50, 80], season: "Kharif/Rabi" },
    { name: "Sunflower", tempRange: [20, 30], humidityRange: [40, 70], season: "All Seasons" },
    { name: "Rapeseed/Mustard", tempRange: [10, 25], humidityRange: [40, 80], season: "Rabi" },
    { name: "Sesame (Til)", tempRange: [25, 35], humidityRange: [30, 70], season: "Kharif/Zaid" },
    { name: "Safflower", tempRange: [15, 25], humidityRange: [20, 60], season: "Rabi (Dry)" },
    { name: "Castor Bean", tempRange: [20, 35], humidityRange: [40, 75], season: "Warm/Tropical" },
    { name: "Coconut", tempRange: [25, 35], humidityRange: [70, 95], season: "Tropical" },
    // --- FIBER, SUGAR & STIMULANT CROPS ---
    { name: "Cotton", tempRange: [20, 38], humidityRange: [40, 80], season: "Kharif" },
    { name: "Sugarcane", tempRange: [21, 35], humidityRange: [60, 85], season: "All Seasons" },
    { name: "Jute", tempRange: [25, 35], humidityRange: [60, 90], season: "Kharif (Wet)" },
    { name: "Tea", tempRange: [18, 30], humidityRange: [70, 95], season: "Tropical/Hilly" },
    { name: "Coffee", tempRange: [15, 30], humidityRange: [65, 90], season: "Tropical Highlands" },
    // --- ROOT, TUBER & VEGETABLES ---
    { name: "Potato", tempRange: [10, 25], humidityRange: [50, 80], season: "Rabi" },
    { name: "Sweet Potato", tempRange: [20, 30], humidityRange: [60, 85], season: "Warm Season" },
    { name: "Carrot", tempRange: [15, 25], humidityRange: [50, 80], season: "Cool Season" },
    { name: "Onion", tempRange: [15, 30], humidityRange: [40, 75], season: "Rabi/Zaid" },
    { name: "Tomato", tempRange: [18, 30], humidityRange: [40, 80], season: "All Seasons (Varied)" },
    { name: "Cabbage", tempRange: [10, 25], humidityRange: [50, 80], season: "Cool Season" },
    { name: "Cauliflower", tempRange: [10, 25], humidityRange: [50, 80], season: "Cool Season" },
    { name: "Brinjal (Eggplant)", tempRange: [21, 35], humidityRange: [50, 85], season: "Warm Season" },
    { name: "Okra (Lady's Finger)", tempRange: [25, 35], humidityRange: [50, 80], season: "Warm Season" }
];

        // UI helpers
        function showMessage(message, isError = false) {
            const el = document.getElementById('messageBox');
            el.innerText = message;
            el.style.display = 'block';
            el.style.backgroundColor = isError ? '#ef4444' : '#10b981';
            setTimeout(() => el.style.display = 'none', 3500);
        }

        function capitalize(s) { return s && s[0].toUpperCase() + s.slice(1); }

        // Methodological advice generator (keeps original helpful tips)
        function generateMethodologicalAdvice() {
            const topics = [
                { title: "Irrigation Management (Water Use Efficiency)", points: [
                    "Adopt drip or sprinkler systems to save water and concentrate moisture at roots.",
                    "Irrigate during late evening or early morning to reduce evaporation.",
                    "Monitor soil moisture rather than following rigid schedules."
                ]},
                { title: "Nutrient Management (Soil Health)", points: [
                    "Use integrated nutrient management: combine organic, inorganic, and bio-fertilizers.",
                    "Apply split doses of fertilizers aligned with crop growth stages.",
                    "Perform soil testing every 2-3 years for tailored recommendations."
                ]},
                { title: "Integrated Pest Management (IPM)", points: [
                    "Routine field scouting for early pest detection.",
                    "Use biological controls and biopesticides before chemical options.",
                    "Spray only when pest population crosses economic thresholds."
                ]},
                { title: "Climate Resilience & Soil Structure", points: [
                    "Practice crop rotation to break pest cycles and improve soil fertility.",
                    "Retain crop residue for mulching to conserve moisture and improve structure."
                ]}
            ];

            let html = '';
            topics.forEach(t => {
                html += `<h5 class="font-semibold text-green-300 mt-3 mb-1">${t.title}</h5><ul class="list-disc ml-6 text-gray-300">`;
                t.points.forEach(p => html += `<li class="pb-1">${p}</li>`);
                html += `</ul>`;
            });
            return html;
        }

        // ---------- Core Logic ----------

        // Reverse geocode coords to nearest city using OpenWeather Geocoding API
        async function reverseGeocode(lat, lon) {
            try {
                const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
                const res = await fetch(url);
                const data = await res.json();
                if (!data || data.length === 0) return null;
                return data[0].name || (data[0].local_names && data[0].local_names.en) || null;
            } catch (e) {
                console.error("Reverse geocode failed", e);
                return null;
            }
        }

        // Detect user's location (browser)
        function detectLocation() {
            if (!navigator.geolocation) {
                showMessage("Geolocation not supported by your browser.", true);
                return;
            }
            showMessage("Attempting to detect your location...");
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const city = await reverseGeocode(latitude, longitude);
                if (city) {
                    document.getElementById('cityInput').value = city;
                    showMessage(`Detected location: ${city}`);
                } else {
                    showMessage("Unable to determine city from coordinates. Please enter city manually.", true);
                }
            }, (err) => {
                console.warn("Geolocation error", err);
                showMessage("Permission denied or unable to access location.", true);
            }, { enableHighAccuracy: false, timeout: 10000 });
        }

        // Fetch weather for a city name (OpenWeather Current Weather API)
        async function fetchWeatherByCity(city) {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
                const res = await fetch(url);
                const data = await res.json();
                if (data.cod && data.cod !== 200) throw new Error(data.message || 'API error');
                return data;
            } catch (e) {
                console.error("Weather fetch error", e);
                throw e;
            }
        }

        // Get short summary from Wikipedia REST API
        async function getWikiSummary(title) {
            try {
                const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
                const res = await fetch(url);
                const data = await res.json();
                if (data && data.extract) return data.extract;
                return "No summary available.";
            } catch (e) {
                console.warn("Wikipedia fetch failed for", title, e);
                return "Failed to fetch Wikipedia summary.";
            }
        }

        // Choose top N crops that fit the weather (temperature, humidity)
        function chooseCrops(temp, humidity, maxCount = 3) {
            // Score crops by how well temp/humidity fit ranges (distance from center)
            const scored = cropRecommendations.map(crop => {
                const tmin = crop.tempRange[0], tmax = crop.tempRange[1];
                const hmin = crop.humidityRange[0], hmax = crop.humidityRange[1];
                // If outside both ranges, give a large penalty
                const tempScore = (temp < tmin) ? (tmin - temp) : (temp > tmax) ? (temp - tmax) : 0;
                const humScore = (humidity < hmin) ? (hmin - humidity) : (humidity > hmax) ? (humidity - hmax) : 0;
                const score = tempScore * 1.2 + humScore; // weight temp slightly higher
                return { crop, score };
            });

            scored.sort((a,b) => a.score - b.score); // lower score = better fit
            // pick best ones; if all scores are high, still show first few as suggestions
            return scored.slice(0, maxCount).map(s => s.crop);
        }

        // Main advisory function
        async function getAdvisory() {
            const city = document.getElementById('cityInput').value.trim();
            if (!city) {
                showMessage('Please enter a city or use your location.', true);
                return;
            }

            const resultsSection = document.getElementById('resultsSection');
            const tempEl = document.getElementById('temp');
            const conditionEl = document.getElementById('condition');
            const humidityEl = document.getElementById('humidity');
            const windEl = document.getElementById('wind');
            const advisoryTitleEl = document.getElementById('advisoryTitle');
            const cropImageEl = document.getElementById('cropImage');
            const cropNameDisplayEl = document.getElementById('cropNameDisplay');
            const primaryAdviceEl = document.getElementById('primaryAdvice');
            const cropSuggestionsEl = document.getElementById('cropSuggestions');
            const secondaryAdviceEl = document.getElementById('secondaryAdvice');

            // Reset UI
            resultsSection.classList.add('hidden');
            tempEl.innerText = 'Fetching...';
            conditionEl.innerText = '--';
            humidityEl.innerText = '--';
            windEl.innerText = '--';
            primaryAdviceEl.innerText = 'Analyzing conditions...';
            cropSuggestionsEl.innerHTML = '<p class="text-sm text-gray-400">Fetching suggestions...</p>';
            secondaryAdviceEl.innerHTML = '<p class="text-sm text-gray-400">Preparing methodological advice...</p>';

            try {
                const data = await fetchWeatherByCity(city);
                const temp = data.main.temp;
                const condition = data.weather?.[0]?.description || 'Unknown';
                const humidity = data.main.humidity;
                const windSpeed = data.wind?.speed || 0;

                // display weather
                tempEl.innerText = `${temp.toFixed(1)}°C`;
                conditionEl.innerText = capitalize(condition);
                humidityEl.innerText = `${humidity}%`;
                windEl.innerText = `${windSpeed.toFixed(1)} m/s`;

                advisoryTitleEl.innerText = `Crop Advisory for ${city}`;

                // Primary advice based on extremes
                let primaryAdvice = '';
                if (temp >= 40) primaryAdvice += 'Extreme heat — consider temporary shading and increase irrigation frequency. ';
                else if (temp <= 5) primaryAdvice += 'Frost/very cold risk — protect seedlings and avoid transplanting. ';
                else primaryAdvice += 'Temperature is within a manageable range. Monitor crop stage-specific needs. ';

                if (humidity >= 85 && temp >= 15) primaryAdvice += 'High humidity — increased fungal disease risk; ensure good airflow and consider preventive biological fungicides. ';
                else if (humidity <= 25) primaryAdvice += 'Low humidity — increase irrigation frequency and reduce evaporation losses. ';

                if (windSpeed >= 10) primaryAdvice += 'Strong winds — secure taller plants and check windbreaks.';

                primaryAdviceEl.innerText = primaryAdvice.trim();

                // Choose crops
                const chosen = chooseCrops(temp, humidity, 3);
                cropNameDisplayEl.innerText = `Top ${chosen.length} Suggestions: ${chosen.map(c=>c.name).join(', ')}`;

                // Try to fetch image for first recommended crop (use Wikimedia or placeholder)
                const firstCropName = chosen[0]?.name || 'Crops';
                cropImageEl.src = `https://placehold.co/600x400/10b981/ffffff?text=${encodeURIComponent(firstCropName)}`;

                // Fetch Wikipedia summaries for each crop (concurrently)
                const summaries = await Promise.all(chosen.map(c => getWikiSummary(c.name)));

                // Build suggestions HTML with wikipedia links and short summaries
                let suggestionsHtml = '<div class="space-y-3">';
                for (let i = 0; i < chosen.length; i++) {
                    const c = chosen[i];
                    const sum = summaries[i] || '';
                    const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(c.name)}`;
                    suggestionsHtml += `
                        <div class="p-3 rounded-md bg-slate-800/40 border border-slate-700">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h5 class="text-green-300 font-semibold text-lg">${c.name} <span class="text-sm text-gray-400">• ${c.season}</span></h5>
                                    <p class="text-sm text-gray-300 mt-1">${sum}</p>
                                </div>
                                <div class="ml-4">
                                    <a href="${wikiUrl}" target="_blank" class="inline-block px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">Wikipedia</a>
                                </div>
                            </div>
                        </div>
                    `;
                }
                suggestionsHtml += '</div>';
                cropSuggestionsEl.innerHTML = suggestionsHtml;

                // Combine methodological advice with quick soil/season tips
                secondaryAdviceEl.innerHTML = `<div>${generateMethodologicalAdvice()}</div>`;

                resultsSection.classList.remove('hidden');

            } catch (err) {
                console.error(err);
                showMessage('Error: Could not fetch weather or advisory. Check city name or API key.', true);
                tempEl.innerText = '--';
                conditionEl.innerText = '--';
                humidityEl.innerText = '--';
                windEl.innerText = '--';
                cropSuggestionsEl.innerHTML = '<p class="text-sm text-gray-400">Unable to fetch suggestions.</p>';
            }
        }

        // Event listeners
        window.addEventListener('load', () => {
            document.getElementById('detectLocationBtn').addEventListener('click', detectLocation);
            document.getElementById('advisoryButton').addEventListener('click', getAdvisory);
            document.getElementById('contactForm').addEventListener('submit', (e) => {
                e.preventDefault();
                document.getElementById('emailInput').value = '';
                document.getElementById('messageInput').value = '';
                showMessage('Thank you for your message! We will get back to you soon.');
            });
        });