// Regular expression to match time patterns (e.g., 2:30 PM, 14:30, etc.)
const timeRegex = /\b(1[0-2]|0?[1-9]):([0-5][0-9])\s*(AM|PM)?\b|\b([01]?[0-9]|2[0-3]):([0-5][0-9])\b/;

// Create drone element
function createDrone() {
    const drone = document.createElement('div');
    drone.className = 'zone-drone';
    drone.innerHTML = `
        <div class="drone-body">
            <div class="propeller propeller-1"></div>
            <div class="propeller propeller-2"></div>
            <div class="propeller propeller-3"></div>
            <div class="propeller propeller-4"></div>
        </div>
        <div class="speech-bubble">
            Don't forget to specify the timezone! 🕒
        </div>
    `;
    return drone;
}

// Show drone animation
function showDrone(inputElement) {
    const drone = createDrone();
    document.body.appendChild(drone);

    // Position drone above the input element
    const rect = inputElement.getBoundingClientRect();
    drone.style.left = `${rect.left + window.scrollX}px`;
    drone.style.top = `${rect.top + window.scrollY - 100}px`;

    // Animate drone
    setTimeout(() => {
        drone.style.transform = 'translateY(100px)';
    }, 100);

    // Remove drone after 3 seconds
    setTimeout(() => {
        drone.style.transform = 'translateY(-100px)';
        setTimeout(() => {
            drone.remove();
        }, 500);
    }, 3000);
}

// Check input for time without timezone
function checkForTimeWithoutTimezone(input) {
    const text = input.value || input.textContent;
    const match = text.match(timeRegex);
    
    if (match && !text.toLowerCase().includes('timezone') && 
        !text.toLowerCase().includes('time zone') && 
        !text.toLowerCase().includes('tz') && 
        !text.toLowerCase().includes('utc') && 
        !text.toLowerCase().includes('gmt')) {
        showDrone(input);
    }
}

// Add event listeners to all input and textarea elements
function addListeners() {
    // Handle regular inputs and textareas
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => checkForTimeWithoutTimezone(input));
    });

    // Handle Gmail compose editor
    const gmailCompose = document.querySelector('.Am.Al.editable');
    if (gmailCompose) {
        gmailCompose.addEventListener('input', () => checkForTimeWithoutTimezone(gmailCompose));
    }

    // Handle contenteditable elements (like Gmail's compose editor)
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(element => {
        element.addEventListener('input', () => checkForTimeWithoutTimezone(element));
    });
}

// Function to handle iframes
function handleIframes() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc) {
                // Add listeners to elements inside iframe
                const inputs = iframeDoc.querySelectorAll('input[type="text"], textarea, [contenteditable="true"]');
                inputs.forEach(input => {
                    input.addEventListener('input', () => checkForTimeWithoutTimezone(input));
                });
            }
        } catch (e) {
            // Skip iframes we can't access due to same-origin policy
            console.log('Could not access iframe:', e);
        }
    });
}

// Initial setup
addListeners();
handleIframes();

// Watch for dynamically added elements
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            addListeners();
            handleIframes();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
}); 