// 1. AOS ഇനിഷ്യലൈസേഷൻ
AOS.init({
    duration: 800, 
    once: true 
});

// 2. മൊബൈൽ മെനു ടോഗിൾ ഫംഗ്ഷൻ
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu-hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// മെനു ലിങ്കുകളിൽ ക്ലിക്ക് ചെയ്യുമ്പോൾ മെനു ഹൈഡ് ചെയ്യാൻ
document.querySelectorAll('#mobile-menu a').forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.add('mobile-menu-hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// section 2

// script.js

// document.addEventListener('DOMContentLoaded', () => {
//     // Get references to the View All elements
//     const viewAllButton = document.getElementById('viewAllButton');
//     const viewAllLink = document.getElementById('viewAllLink');
//     const firstbox = document.getElementById('first');
//     const secondbox = document.getElementById('second');
//     const backbtn = document.getElementById('backbtn');

//     // Function to handle the click event
//     const handleViewAllClick = (event) => {
//         // Prevent default link behavior (e.g., page reload if href="#")
//         event.preventDefault(); 
        
//         console.log("Navigating to the 'All Services' page...");
        
//         // --- Interactivity Example: Provide visual feedback ---
//         const originalText = viewAllLink.textContent;
        
//         // 1. Change text and disable clicks
//         viewAllLink.textContent = "Loading Services...";
//         viewAllLink.style.pointerEvents = 'none'; 

//         // 2. Simulate page navigation delay (1 second)
//         setTimeout(() => {
//             // Revert text and enable interaction
//             viewAllLink.textContent = originalText;
//             viewAllLink.style.pointerEvents = 'auto';
            
//             // In a real application, you would navigate here:
//             // window.location.href = '/all-services-page'; 
            
//             alert("View All Services functionality triggered!");
//         }, 1000);
//     };

//     // Attach the event handler to both the button and the link
//     if (viewAllButton) {
//         viewAllButton.addEventListener('click', handleViewAllClick);
//     }
//     if (viewAllLink) {
//         viewAllLink.addEventListener('click', handleViewAllClick);
//     }
// });

//     // Attach the event handler to both the button and the link
//     if (viewAllButton) {
//         viewAllButton.addEventListener('click', handleViewAllClick);
//     }
//     if (viewAllLink) {
//         viewAllLink.addEventListener('click', handleViewAllClick);
//     }
// ;

document.addEventListener('DOMContentLoaded', () => {
    // Get references to all relevant elements
    const viewAllButton = document.getElementById('viewAllButton');
    const viewAllLink = document.getElementById('viewAllLink');
    const firstbox = document.getElementById('first');     // The initial service summary section
    const secondbox = document.getElementById('second');   // The detailed services view section
    const backbtn = document.getElementById('backbtn');

    // 1. Initial Setup: Hide the second box
    if (secondbox) {
        // Use 'opacity-0' for fade-in/out and 'absolute' or similar utility
        // to take it out of flow, or simply use 'hidden' and manage opacity separately.
        // For simple switching, we'll start with 'hidden' and manage opacity/transition.
        secondbox.classList.add('hidden');
        secondbox.classList.add('opacity-0');
    }

    // Function to show the second box and hide the first box (View All click)
    const showSecondBox = (event) => {
        event.preventDefault();

        if (!firstbox || !secondbox) return;

        // --- Step 1: Fade out the first box ---
        firstbox.classList.add('opacity-0');

        // Disable clicks during transition
        viewAllLink.style.pointerEvents = 'none';
        viewAllButton.style.pointerEvents = 'none';

        // Wait for the fade-out transition (500ms)
        setTimeout(() => {
            // --- Step 2: Swap the display properties ---
            firstbox.classList.add('hidden');
            secondbox.classList.remove('hidden');

            // --- Step 3: Fade in the second box (use a micro-delay to ensure the browser registers the display change) ---
            setTimeout(() => {
                secondbox.classList.remove('opacity-0');
                secondbox.classList.add('opacity-100'); // Note: 'opacity-100' is default but ensures state
            }, 10); 
            
            // Re-enable clicks on the back button
            backbtn.style.pointerEvents = 'auto';

        }, 500); // Wait time matches a common transition duration
    };

    // Function to show the first box and hide the second box (Back button click)
    const showFirstBox = (event) => {
        event.preventDefault();

        if (!firstbox || !secondbox) return;

        // --- Step 1: Fade out the second box ---
        secondbox.classList.remove('opacity-100');
        secondbox.classList.add('opacity-0');

        // Disable clicks on the back button during transition
        backbtn.style.pointerEvents = 'none';

        // Wait for the fade-out transition (500ms)
        setTimeout(() => {
            // --- Step 2: Swap the display properties ---
            secondbox.classList.add('hidden');
            firstbox.classList.remove('hidden');

            // --- Step 3: Fade in the first box ---
            setTimeout(() => {
                firstbox.classList.remove('opacity-0');
                firstbox.classList.add('opacity-100'); // Note: 'opacity-100' is default but ensures state
            }, 10); 

            // Re-enable clicks on the view all button
            viewAllLink.style.pointerEvents = 'auto';
            viewAllButton.style.pointerEvents = 'auto';

        }, 500);
    };

    // Attach the event handlers
    if (viewAllButton) {
        viewAllButton.addEventListener('click', showSecondBox);
    }
    if (viewAllLink) {
        viewAllLink.addEventListener('click', showSecondBox);
    }
    if (backbtn) {
        backbtn.addEventListener('click', showFirstBox);
    }
});