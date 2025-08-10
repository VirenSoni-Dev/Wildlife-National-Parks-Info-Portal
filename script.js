document.addEventListener('DOMContentLoaded', () => {
   // --- DOM ELEMENTS ---
   const parksGrid = document.getElementById('parks-grid');
   const searchInput = document.getElementById('search-input');
   const stateFilter = document.getElementById('state-filter');
   const typeFilter = document.getElementById('type-filter');
   const noResultsDiv = document.getElementById('no-results');

   /**
    * Renders the park cards to the DOM based on a provided array of park objects.
    * @param {Array} parks - The array of park objects to display.
    */
   function renderParks(parks) {
      parksGrid.innerHTML = ''; // Clear existing cards
      if (parks.length === 0) {
         noResultsDiv.classList.remove('hidden');
      } else {
         noResultsDiv.classList.add('hidden');
      }
      parks.forEach(park => {
         const cardHTML = `
                        <div class="card">
                            <img src="${park.image}" alt="${park.name}" onerror="this.onerror=null;this.src='https://placehold.co/800x600/a0aec0/ffffff?text=Image+Not+Found';">
                            <div class="card-content">
                                <h3>${park.name}</h3>
                                <p class="state">${park.state}</p>
                                <span class="type-badge">${park.type}</span>
                                <p class="description">${park.description}</p>
                            </div>
                        </div>
                    `;
         parksGrid.insertAdjacentHTML('beforeend', cardHTML);
      });
   }

   /**
    * Populates the filter dropdowns (State and Type) dynamically from the parks data.
    */
   function populateFilters() {
      const states = [...new Set(parksData.map(p => p.state))].sort();
      const types = [...new Set(parksData.map(p => p.type))].sort();

      states.forEach(state => {
         const option = document.createElement('option');
         option.value = state;
         option.textContent = state;
         stateFilter.appendChild(option);
      });

      types.forEach(type => {
         const option = document.createElement('option');
         option.value = type;
         option.textContent = type;
         typeFilter.appendChild(option);
      });
   }

   /**
    * Filters the parks based on the current values of the search input and filter dropdowns.
    */
   function filterAndRender() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedState = stateFilter.value;
      const selectedType = typeFilter.value;

      let filteredParks = parksData.filter(park => {
         const nameMatch = park.name.toLowerCase().includes(searchTerm);
         const stateMatch = selectedState === 'all' || park.state === selectedState;
         const typeMatch = selectedType === 'all' || park.type === selectedType;
         return nameMatch && stateMatch && typeMatch;
      });

      renderParks(filteredParks);
   }

   // --- INITIALIZATION ---

   // Add event listeners to all filter controls
   searchInput.addEventListener('input', filterAndRender);
   stateFilter.addEventListener('change', filterAndRender);
   typeFilter.addEventListener('change', filterAndRender);

   // Initial setup
   populateFilters();
   renderParks(parksData);
});