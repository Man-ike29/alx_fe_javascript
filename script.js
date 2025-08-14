// Dynamic Quote Generator - Advanced DOM Manipulation
class QuoteGenerator {
    constructor() {
        // Initialize quotes array with sample data
        this.quotes = [
            { text: "The only way to do great work is to love what you do.", category: "Motivation" },
            { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
            { text: "Life is what happens to you while you're busy making other plans.", category: "Life" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
            { text: "It is during our darkest moments that we must focus to see the light.", category: "Inspiration" },
            { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
            { text: "The only impossible journey is the one you never begin.", category: "Journey" },
            { text: "In the middle of difficulty lies opportunity.", category: "Opportunity" },
            { text: "Believe you can and you're halfway there.", category: "Belief" },
            { text: "The best time to plant a tree was 20 years ago. The second best time is now.", category: "Action" }
        ];
        
        this.currentQuoteIndex = -1;
        this.formVisible = false;
        
        // Initialize the application
        this.init();
    }
    
    init() {
        // Get DOM elements
        this.quoteDisplay = document.getElementById('quoteDisplay');
        this.newQuoteBtn = document.getElementById('newQuote');
        this.toggleFormBtn = document.getElementById('toggleForm');
        this.addQuoteContainer = document.getElementById('addQuoteContainer');
        
        // Add event listeners
        this.newQuoteBtn.addEventListener('click', () => this.showRandomQuote());
        this.toggleFormBtn.addEventListener('click', () => this.toggleAddQuoteForm());
        
        // Display initial quote
        this.showRandomQuote();
    }
    
    // Advanced DOM manipulation: Create and display quote elements
    showRandomQuote() {
        // Get random quote that's different from current one
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.quotes.length);
        } while (randomIndex === this.currentQuoteIndex && this.quotes.length > 1);
        
        this.currentQuoteIndex = randomIndex;
        const quote = this.quotes[randomIndex];
        
        // Clear existing content
        this.quoteDisplay.innerHTML = '';
        
        // Create quote container with animation
        const quoteContainer = document.createElement('div');
        quoteContainer.className = 'quote-container';
        quoteContainer.style.opacity = '0';
        quoteContainer.style.transform = 'translateY(20px)';
        quoteContainer.style.transition = 'all 0.5s ease-in-out';
        
        // Create quote text element
        const quoteText = document.createElement('div');
        quoteText.className = 'quote-text';
        quoteText.textContent = `"${quote.text}"`;
        
        // Create quote category element
        const quoteCategory = document.createElement('div');
        quoteCategory.className = 'quote-category';
        quoteCategory.textContent = `Category: ${quote.category}`;
        
        // Create quote number indicator
        const quoteNumber = document.createElement('div');
        quoteNumber.style.fontSize = '0.8em';
        quoteNumber.style.color = '#888';
        quoteNumber.style.marginTop = '10px';
        quoteNumber.textContent = `Quote ${this.currentQuoteIndex + 1} of ${this.quotes.length}`;
        
        // Append elements to container
        quoteContainer.appendChild(quoteText);
        quoteContainer.appendChild(quoteCategory);
        quoteContainer.appendChild(quoteNumber);
        
        // Add container to display area
        this.quoteDisplay.appendChild(quoteContainer);
        
        // Animate in
        setTimeout(() => {
            quoteContainer.style.opacity = '1';
            quoteContainer.style.transform = 'translateY(0)';
        }, 50);
        
        // Add ripple effect to the quote display
        this.addRippleEffect(this.quoteDisplay);
    }
    
    // Advanced DOM manipulation: Create dynamic form
    createAddQuoteForm() {
        // Create form container
        const formContainer = document.createElement('div');
        formContainer.className = 'form-container';
        formContainer.id = 'quoteForm';
        
        // Create form title
        const formTitle = document.createElement('h3');
        formTitle.textContent = 'Add Your Own Quote';
        formTitle.style.marginTop = '0';
        formTitle.style.color = '#333';
        
        // Create quote text input
        const quoteInput = document.createElement('input');
        quoteInput.type = 'text';
        quoteInput.id = 'newQuoteText';
        quoteInput.placeholder = 'Enter a new quote';
        quoteInput.maxLength = 200;
        
        // Create category input with datalist for suggestions
        const categoryInput = document.createElement('input');
        categoryInput.type = 'text';
        categoryInput.id = 'newQuoteCategory';
        categoryInput.placeholder = 'Enter quote category';
        categoryInput.setAttribute('list', 'categories');
        
        // Create datalist for category suggestions
        const datalist = document.createElement('datalist');
        datalist.id = 'categories';
        
        // Get unique categories from existing quotes
        const uniqueCategories = [...new Set(this.quotes.map(quote => quote.category))];
        uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            datalist.appendChild(option);
        });
        
        // Create character counter for quote input
        const charCounter = document.createElement('div');
        charCounter.style.fontSize = '0.8em';
        charCounter.style.color = '#666';
        charCounter.style.textAlign = 'right';
        charCounter.textContent = '0/200 characters';
        
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.textAlign = 'center';
        buttonContainer.style.marginTop = '15px';
        
        // Create add quote button
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add Quote';
        addBtn.type = 'button';
        
        // Create cancel button
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.type = 'button';
        cancelBtn.style.backgroundColor = '#6c757d';
        cancelBtn.addEventListener('mouseover', () => {
            cancelBtn.style.backgroundColor = '#545b62';
        });
        cancelBtn.addEventListener('mouseout', () => {
            cancelBtn.style.backgroundColor = '#6c757d';
        });
        
        // Add event listeners
        quoteInput.addEventListener('input', (e) => {
            const length = e.target.value.length;
            charCounter.textContent = `${length}/200 characters`;
            charCounter.style.color = length > 180 ? '#dc3545' : '#666';
        });
        
        addBtn.addEventListener('click', () => this.addQuote());
        cancelBtn.addEventListener('click', () => this.toggleAddQuoteForm());
        
        // Add real-time validation
        const validateForm = () => {
            const quoteText = quoteInput.value.trim();
            const category = categoryInput.value.trim();
            addBtn.disabled = !quoteText || !category;
            addBtn.style.opacity = addBtn.disabled ? '0.5' : '1';
        };
        
        quoteInput.addEventListener('input', validateForm);
        categoryInput.addEventListener('input', validateForm);
        
        // Assemble form
        buttonContainer.appendChild(addBtn);
        buttonContainer.appendChild(cancelBtn);
        
        formContainer.appendChild(formTitle);
        formContainer.appendChild(quoteInput);
        formContainer.appendChild(charCounter);
        formContainer.appendChild(categoryInput);
        formContainer.appendChild(datalist);
        formContainer.appendChild(buttonContainer);
        
        // Initial validation
        validateForm();
        
        return formContainer;
    }
    
    // Toggle form visibility with animation
    toggleAddQuoteForm() {
        if (!this.formVisible) {
            // Show form
            const form = this.createAddQuoteForm();
            form.style.opacity = '0';
            form.style.transform = 'translateY(-20px)';
            form.style.transition = 'all 0.3s ease-in-out';
            
            this.addQuoteContainer.appendChild(form);
            
            setTimeout(() => {
                form.style.opacity = '1';
                form.style.transform = 'translateY(0)';
            }, 50);
            
            this.toggleFormBtn.textContent = 'Cancel';
            this.formVisible = true;
            
            // Focus on first input
            setTimeout(() => {
                document.getElementById('newQuoteText').focus();
            }, 300);
        } else {
            // Hide form
            const form = document.getElementById('quoteForm');
            if (form) {
                form.style.opacity = '0';
                form.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    this.addQuoteContainer.removeChild(form);
                }, 300);
            }
            
            this.toggleFormBtn.textContent = 'Add New Quote';
            this.formVisible = false;
        }
    }
    
    // Add new quote with validation and DOM updates
    addQuote() {
        const quoteText = document.getElementById('newQuoteText').value.trim();
        const category = document.getElementById('newQuoteCategory').value.trim();
        
        // Validation
        if (!quoteText || !category) {
            this.showNotification('Please fill in both fields!', 'error');
            return;
        }
        
        if (quoteText.length > 200) {
            this.showNotification('Quote is too long! Maximum 200 characters.', 'error');
            return;
        }
        
        // Check for duplicate quotes
        const isDuplicate = this.quotes.some(quote => 
            quote.text.toLowerCase() === quoteText.toLowerCase()
        );
        
        if (isDuplicate) {
            this.showNotification('This quote already exists!', 'error');
            return;
        }
        
        // Add quote to array
        const newQuote = {
            text: quoteText,
            category: category
        };
        
        this.quotes.push(newQuote);
        
        // Update category datalist
        this.updateCategoryDatalist();
        
        // Show success notification
        this.showNotification(`Quote added successfully! Total quotes: ${this.quotes.length}`, 'success');
        
        // Hide form
        this.toggleAddQuoteForm();
        
        // Show the new quote
        this.currentQuoteIndex = this.quotes.length - 1;
        this.showRandomQuote();
    }
    
    // Update category datalist with new categories
    updateCategoryDatalist() {
        const datalist = document.getElementById('categories');
        if (datalist) {
            datalist.innerHTML = '';
            const uniqueCategories = [...new Set(this.quotes.map(quote => quote.category))];
            uniqueCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                datalist.appendChild(option);
            });
        }
    }
    
    // Show notification messages
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.color = 'white';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.3s ease-in-out';
        
        // Set color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#28a745';
                break;
            case 'error':
                notification.style.backgroundColor = '#dc3545';
                break;
            default:
                notification.style.backgroundColor = '#007bff';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 50);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add ripple effect to elements
    addRippleEffect(element) {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 123, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        element.appendChild(ripple);
        
        // Add CSS animation if not already added
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    // Get statistics about quotes
    getQuoteStats() {
        const categories = {};
        this.quotes.forEach(quote => {
            categories[quote.category] = (categories[quote.category] || 0) + 1;
        });
        
        return {
            totalQuotes: this.quotes.length,
            categories: categories,
            mostPopularCategory: Object.keys(categories).reduce((a, b) => 
                categories[a] > categories[b] ? a : b
            )
        };
    }
}

// Default quotes array
const defaultQuotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
    { text: "Life is what happens to you while you're busy making other plans.", category: "Life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "The only impossible journey is the one you never begin.", category: "Journey" },
    { text: "In the middle of difficulty lies opportunity.", category: "Opportunity" },
    { text: "Believe you can and you're halfway there.", category: "Belief" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", category: "Action" }
];

// Global quotes array - will be loaded from localStorage or defaultQuotes
let quotes = [];
let currentQuoteIndex = -1;
let currentFilter = 'all';
let filteredQuotes = [];

// Server synchronization variables
let serverQuotes = [];
let conflicts = [];
let autoSyncEnabled = false;
let autoSyncInterval = null;
let lastSyncTime = null;

// Web Storage Functions
function loadQuotes() {
    try {
        const storedQuotes = localStorage.getItem('dynamicQuoteGenerator_quotes');
        if (storedQuotes) {
            quotes = JSON.parse(storedQuotes);
            console.log(`Loaded ${quotes.length} quotes from localStorage`);
        } else {
            quotes = [...defaultQuotes];
            saveQuotes();
            console.log('Initialized with default quotes');
        }
    } catch (error) {
        console.error('Error loading quotes from localStorage:', error);
        quotes = [...defaultQuotes];
    }
    updateStorageInfo();
}

function saveQuotes() {
    try {
        localStorage.setItem('dynamicQuoteGenerator_quotes', JSON.stringify(quotes));
        console.log(`Saved ${quotes.length} quotes to localStorage`);
        updateStorageInfo();
    } catch (error) {
        console.error('Error saving quotes to localStorage:', error);
        showNotification('Error saving quotes to storage!', 'error');
    }
}

// Session Storage Functions
function saveLastViewedQuote(quoteIndex) {
    try {
        const quoteData = {
            index: quoteIndex,
            quote: quotes[quoteIndex],
            timestamp: new Date().toISOString()
        };
        sessionStorage.setItem('dynamicQuoteGenerator_lastQuote', JSON.stringify(quoteData));
    } catch (error) {
        console.error('Error saving last quote to sessionStorage:', error);
    }
}

function getLastViewedQuote() {
    try {
        const lastQuoteData = sessionStorage.getItem('dynamicQuoteGenerator_lastQuote');
        if (lastQuoteData) {
            return JSON.parse(lastQuoteData);
        }
    } catch (error) {
        console.error('Error loading last quote from sessionStorage:', error);
    }
    return null;
}

// Filter preference storage functions
function saveFilterPreference(filter) {
    try {
        localStorage.setItem('dynamicQuoteGenerator_filter', filter);
    } catch (error) {
        console.error('Error saving filter preference:', error);
    }
}

function getFilterPreference() {
    try {
        return localStorage.getItem('dynamicQuoteGenerator_filter') || 'all';
    } catch (error) {
        console.error('Error loading filter preference:', error);
        return 'all';
    }
}

// Update storage information display
function updateStorageInfo() {
    const storageStatusEl = document.getElementById('storageStatus');
    const totalQuotesEl = document.getElementById('totalQuotes');
    const lastSessionQuoteEl = document.getElementById('lastSessionQuote');
    
    if (storageStatusEl) {
        const storageSize = new Blob([JSON.stringify(quotes)]).size;
        storageStatusEl.textContent = `${quotes.length} quotes stored (${(storageSize / 1024).toFixed(2)} KB)`;
    }
    
    if (totalQuotesEl) {
        totalQuotesEl.textContent = quotes.length;
    }
    
    if (lastSessionQuoteEl) {
        const lastQuote = getLastViewedQuote();
        if (lastQuote) {
            lastSessionQuoteEl.textContent = `"${lastQuote.quote.text.substring(0, 50)}..." (${lastQuote.quote.category})`;
        } else {
            lastSessionQuoteEl.textContent = 'None';
        }
    }
}

// Function to populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    // Get unique categories from quotes
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))].sort();
    
    // Clear existing options except "All Categories"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    // Add category options
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    
    // Restore saved filter preference
    const savedFilter = getFilterPreference();
    categoryFilter.value = savedFilter;
    currentFilter = savedFilter;
    
    console.log(`Populated ${uniqueCategories.length} categories in filter dropdown`);
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    const selectedCategory = categoryFilter.value;
    currentFilter = selectedCategory;
    
    // Save filter preference
    saveFilterPreference(selectedCategory);
    
    // Filter quotes based on selection
    if (selectedCategory === 'all') {
        filteredQuotes = [...quotes];
    } else {
        filteredQuotes = quotes.filter(quote =>
            quote.category.toLowerCase() === selectedCategory
        );
    }
    
    // Update filtered count display
    const filteredCountEl = document.getElementById('filteredCount');
    if (filteredCountEl) {
        filteredCountEl.textContent = filteredQuotes.length;
    }
    
    // Update quote display
    if (filteredQuotes.length > 0) {
        // Reset current index and show a random quote from filtered results
        currentQuoteIndex = -1;
        showRandomQuoteFromFiltered();
    } else {
        // Show no quotes message
        displayNoQuotesMessage(selectedCategory);
    }
    
    console.log(`Filtered to ${filteredQuotes.length} quotes for category: ${selectedCategory}`);
}

// Function to display a random quote from filtered results
function showRandomQuoteFromFiltered() {
    if (filteredQuotes.length === 0) {
        displayNoQuotesMessage(currentFilter);
        return;
    }
    
    // Get random quote from filtered results
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    } while (randomIndex === currentQuoteIndex && filteredQuotes.length > 1);
    
    currentQuoteIndex = randomIndex;
    const quote = filteredQuotes[randomIndex];
    
    // Find original index for session storage
    const originalIndex = quotes.findIndex(q => q.text === quote.text && q.category === quote.category);
    saveLastViewedQuote(originalIndex);
    
    // Get quote display element
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Clear existing content
    quoteDisplay.innerHTML = '';
    
    // Create quote container with animation
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-container';
    if (currentFilter !== 'all') {
        quoteContainer.classList.add('filtered-quote-display');
    }
    quoteContainer.style.opacity = '0';
    quoteContainer.style.transform = 'translateY(20px)';
    quoteContainer.style.transition = 'all 0.5s ease-in-out';
    
    // Create quote text element
    const quoteText = document.createElement('div');
    quoteText.className = 'quote-text';
    quoteText.textContent = `"${quote.text}"`;
    
    // Create quote category element
    const quoteCategory = document.createElement('div');
    quoteCategory.className = 'quote-category';
    quoteCategory.textContent = `Category: ${quote.category}`;
    
    // Create quote number indicator
    const quoteNumber = document.createElement('div');
    quoteNumber.style.fontSize = '0.8em';
    quoteNumber.style.color = '#888';
    quoteNumber.style.marginTop = '10px';
    
    if (currentFilter === 'all') {
        quoteNumber.textContent = `Quote ${currentQuoteIndex + 1} of ${filteredQuotes.length}`;
    } else {
        quoteNumber.textContent = `Quote ${currentQuoteIndex + 1} of ${filteredQuotes.length} (${quote.category} category)`;
    }
    
    // Append elements to container
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(quoteCategory);
    quoteContainer.appendChild(quoteNumber);
    
    // Add container to display area
    quoteDisplay.appendChild(quoteContainer);
    
    // Animate in
    setTimeout(() => {
        quoteContainer.style.opacity = '1';
        quoteContainer.style.transform = 'translateY(0)';
    }, 50);
    
    // Update storage info
    updateStorageInfo();
}

// Function to display no quotes message
function displayNoQuotesMessage(category) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    
    const messageContainer = document.createElement('div');
    messageContainer.className = 'no-quotes-message';
    messageContainer.innerHTML = `
        <h3>No quotes found</h3>
        <p>There are no quotes in the "${category}" category.</p>
        <p>Try selecting a different category or add some quotes to this category.</p>
    `;
    
    quoteDisplay.appendChild(messageContainer);
}

// Function to display a random quote and update the DOM (updated for filtering)
function showRandomQuote() {
    if (quotes.length === 0) {
        showNotification('No quotes available!', 'error');
        return;
    }
    
    // Use filtered quotes if a filter is active
    showRandomQuoteFromFiltered();
}

// Alias function for displayRandomQuote (same functionality)
function displayRandomQuote() {
    showRandomQuote();
}

// Function to create and display the add quote form
function createAddQuoteForm() {
    const addQuoteContainer = document.getElementById('addQuoteContainer');
    
    // Remove existing form if present
    const existingForm = document.getElementById('quoteForm');
    if (existingForm) {
        addQuoteContainer.removeChild(existingForm);
    }
    
    // Create form container
    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    formContainer.id = 'quoteForm';
    
    // Create form title
    const formTitle = document.createElement('h3');
    formTitle.textContent = 'Add Your Own Quote';
    formTitle.style.marginTop = '0';
    formTitle.style.color = '#333';
    
    // Create quote text input
    const quoteInput = document.createElement('input');
    quoteInput.type = 'text';
    quoteInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';
    quoteInput.maxLength = 200;
    
    // Create category input with datalist for suggestions
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category';
    categoryInput.setAttribute('list', 'categories');
    
    // Create datalist for category suggestions
    const datalist = document.createElement('datalist');
    datalist.id = 'categories';
    
    // Get unique categories from existing quotes
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        datalist.appendChild(option);
    });
    
    // Create character counter for quote input
    const charCounter = document.createElement('div');
    charCounter.style.fontSize = '0.8em';
    charCounter.style.color = '#666';
    charCounter.style.textAlign = 'right';
    charCounter.textContent = '0/200 characters';
    
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.textAlign = 'center';
    buttonContainer.style.marginTop = '15px';
    
    // Create add quote button
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Quote';
    addBtn.type = 'button';
    addBtn.onclick = addQuote;
    
    // Create cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.type = 'button';
    cancelBtn.style.backgroundColor = '#6c757d';
    cancelBtn.onclick = () => {
        addQuoteContainer.removeChild(formContainer);
        document.getElementById('toggleForm').textContent = 'Add New Quote';
    };
    
    // Add event listeners for validation
    quoteInput.addEventListener('input', (e) => {
        const length = e.target.value.length;
        charCounter.textContent = `${length}/200 characters`;
        charCounter.style.color = length > 180 ? '#dc3545' : '#666';
        validateForm();
    });
    
    categoryInput.addEventListener('input', validateForm);
    
    // Validation function
    function validateForm() {
        const quoteText = quoteInput.value.trim();
        const category = categoryInput.value.trim();
        addBtn.disabled = !quoteText || !category;
        addBtn.style.opacity = addBtn.disabled ? '0.5' : '1';
    }
    
    // Assemble form
    buttonContainer.appendChild(addBtn);
    buttonContainer.appendChild(cancelBtn);
    
    formContainer.appendChild(formTitle);
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(charCounter);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(datalist);
    formContainer.appendChild(buttonContainer);
    
    // Add form to container with animation
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(-20px)';
    formContainer.style.transition = 'all 0.3s ease-in-out';
    
    addQuoteContainer.appendChild(formContainer);
    
    setTimeout(() => {
        formContainer.style.opacity = '1';
        formContainer.style.transform = 'translateY(0)';
    }, 50);
    
    // Initial validation
    validateForm();
    
    // Focus on first input
    setTimeout(() => {
        if (quoteInput) {
            quoteInput.focus();
        }
    }, 300);
    
    // Update button text
    document.getElementById('toggleForm').textContent = 'Cancel';
}

// Function to add a new quote to the quotes array and update the DOM
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const category = document.getElementById('newQuoteCategory').value.trim();
    
    // Validation
    if (!quoteText || !category) {
        showNotification('Please fill in both fields!', 'error');
        return;
    }
    
    if (quoteText.length > 200) {
        showNotification('Quote is too long! Maximum 200 characters.', 'error');
        return;
    }
    
    // Check for duplicate quotes
    const isDuplicate = quotes.some(quote =>
        quote.text.toLowerCase() === quoteText.toLowerCase()
    );
    
    if (isDuplicate) {
        showNotification('This quote already exists!', 'error');
        return;
    }
    
    // Add quote to array
    const newQuote = {
        text: quoteText,
        category: category
    };
    
    quotes.push(newQuote);
    
    // Save to localStorage
    saveQuotes();
    
    // Update categories dropdown (in case new category was added)
    populateCategories();
    
    // Update filtered quotes if necessary
    filterQuotes();
    
    // Show success notification
    showNotification(`Quote added successfully! Total quotes: ${quotes.length}`, 'success');
    
    // Remove form
    const addQuoteContainer = document.getElementById('addQuoteContainer');
    const form = document.getElementById('quoteForm');
    if (form) {
        addQuoteContainer.removeChild(form);
    }
    
    // Reset button text
    document.getElementById('toggleForm').textContent = 'Add New Quote';
    
    // Show the new quote (will respect current filter)
    showRandomQuote();
}

// Function to show notification messages
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'all 0.3s ease-in-out';
    
    // Set color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#28a745';
            break;
        case 'error':
            notification.style.backgroundColor = '#dc3545';
            break;
        default:
            notification.style.backgroundColor = '#007bff';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 50);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// JSON Export Function
function exportToJsonFile() {
    try {
        const dataStr = JSON.stringify(quotes, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `quotes_export_${new Date().toISOString().split('T')[0]}.json`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        URL.revokeObjectURL(link.href);
        
        showNotification(`Successfully exported ${quotes.length} quotes to JSON file!`, 'success');
    } catch (error) {
        console.error('Error exporting quotes:', error);
        showNotification('Error exporting quotes to JSON file!', 'error');
    }
}

// JSON Import Function
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) {
        showNotification('Please select a file to import!', 'error');
        return;
    }
    
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        showNotification('Please select a valid JSON file!', 'error');
        return;
    }
    
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            
            // Validate imported data
            if (!Array.isArray(importedQuotes)) {
                throw new Error('Invalid format: Expected an array of quotes');
            }
            
            // Validate each quote object
            const validQuotes = importedQuotes.filter(quote => {
                return quote &&
                       typeof quote.text === 'string' &&
                       typeof quote.category === 'string' &&
                       quote.text.trim() !== '' &&
                       quote.category.trim() !== '';
            });
            
            if (validQuotes.length === 0) {
                throw new Error('No valid quotes found in the file');
            }
            
            // Check for duplicates and add only new quotes
            let addedCount = 0;
            validQuotes.forEach(importedQuote => {
                const isDuplicate = quotes.some(existingQuote =>
                    existingQuote.text.toLowerCase() === importedQuote.text.toLowerCase()
                );
                
                if (!isDuplicate) {
                    quotes.push({
                        text: importedQuote.text.trim(),
                        category: importedQuote.category.trim()
                    });
                    addedCount++;
                }
            });
            
            if (addedCount > 0) {
                saveQuotes();
                showNotification(`Successfully imported ${addedCount} new quotes! (${validQuotes.length - addedCount} duplicates skipped)`, 'success');
                
                // Show a random quote to refresh the display
                showRandomQuote();
            } else {
                showNotification('No new quotes imported - all quotes already exist!', 'info');
            }
            
        } catch (error) {
            console.error('Error importing quotes:', error);
            showNotification(`Error importing quotes: ${error.message}`, 'error');
        }
    };
    
    fileReader.onerror = function() {
        showNotification('Error reading the file!', 'error');
    };
    
    fileReader.readAsText(file);
}

// Clear all data function
function clearAllData() {
    if (confirm('Are you sure you want to clear all quotes and data? This action cannot be undone!')) {
        try {
            localStorage.removeItem('dynamicQuoteGenerator_quotes');
            sessionStorage.removeItem('dynamicQuoteGenerator_lastQuote');
            localStorage.removeItem('dynamicQuoteGenerator_filter');
            localStorage.removeItem('dynamicQuoteGenerator_autoSync');
            localStorage.removeItem('dynamicQuoteGenerator_lastSync');
            quotes = [...defaultQuotes];
            saveQuotes();
            showNotification('All data cleared! Reset to default quotes.', 'success');
            showRandomQuote();
            updateSyncStatus();
        } catch (error) {
            console.error('Error clearing data:', error);
            showNotification('Error clearing data!', 'error');
        }
    }
}

// Server Simulation and Synchronization Functions

// Simulate server API using JSONPlaceholder-like structure
const SERVER_API = {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    
    // Simulate fetching quotes from server (using posts as quote analogy)
    async fetchQuotes() {
        try {
            const response = await fetch(`${this.baseUrl}/posts?_limit=5`);
            const posts = await response.json();
            
            // Transform posts into quote format
            return posts.map(post => ({
                id: post.id,
                text: post.title.charAt(0).toUpperCase() + post.title.slice(1) + '.',
                category: this.getRandomCategory(),
                source: 'server',
                timestamp: new Date().toISOString()
            }));
        } catch (error) {
            console.error('Error fetching from server:', error);
            throw new Error('Failed to connect to server');
        }
    },
    
    // Simulate posting quotes to server
    async postQuote(quote) {
        try {
            const response = await fetch(`${this.baseUrl}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: quote.text,
                    body: `Category: ${quote.category}`,
                    userId: 1
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to post to server');
            }
            
            const result = await response.json();
            return {
                ...quote,
                id: result.id,
                source: 'server',
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error posting to server:', error);
            throw new Error('Failed to sync with server');
        }
    },
    
    getRandomCategory() {
        const categories = ['Motivation', 'Inspiration', 'Success', 'Life', 'Wisdom', 'Innovation'];
        return categories[Math.floor(Math.random() * categories.length)];
    }
};

// Sync status management
function updateSyncStatus() {
    const syncStatusEl = document.getElementById('syncStatus');
    const lastSyncEl = document.getElementById('lastSync');
    const serverQuoteCountEl = document.getElementById('serverQuoteCount');
    const conflictCountEl = document.getElementById('conflictCount');
    
    if (syncStatusEl) {
        syncStatusEl.textContent = autoSyncEnabled ? 'Auto-sync enabled' : 'Manual sync';
        syncStatusEl.style.color = autoSyncEnabled ? '#28a745' : '#6c757d';
    }
    
    if (lastSyncEl) {
        lastSyncEl.textContent = lastSyncTime ?
            new Date(lastSyncTime).toLocaleString() : 'Never';
    }
    
    if (serverQuoteCountEl) {
        serverQuoteCountEl.textContent = serverQuotes.length;
    }
    
    if (conflictCountEl) {
        conflictCountEl.textContent = conflicts.length;
        conflictCountEl.style.color = conflicts.length > 0 ? '#dc3545' : '#28a745';
    }
    
    // Show/hide conflict resolution button
    const resolveBtn = document.getElementById('resolveConflictsBtn');
    if (resolveBtn) {
        resolveBtn.style.display = conflicts.length > 0 ? 'inline-block' : 'none';
    }
}

// Show sync notification
function showSyncNotification(message, type = 'info') {
    // Remove existing sync notification
    const existingNotification = document.querySelector('.sync-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `sync-notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 50);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Detect conflicts between local and server data
function detectConflicts(localQuotes, serverQuotes) {
    const conflicts = [];
    
    serverQuotes.forEach(serverQuote => {
        const localMatch = localQuotes.find(localQuote =>
            localQuote.text.toLowerCase().trim() === serverQuote.text.toLowerCase().trim()
        );
        
        if (localMatch) {
            // Check if there are differences
            if (localMatch.category !== serverQuote.category) {
                conflicts.push({
                    type: 'category_mismatch',
                    local: localMatch,
                    server: serverQuote,
                    description: `Quote "${serverQuote.text.substring(0, 50)}..." has different categories`
                });
            }
        }
    });
    
    return conflicts;
}

// Sync with server
async function syncWithServer() {
    try {
        showSyncNotification('Syncing with server...', 'info');
        
        // Fetch server quotes
        serverQuotes = await SERVER_API.fetchQuotes();
        
        // Detect conflicts
        conflicts = detectConflicts(quotes, serverQuotes);
        
        if (conflicts.length > 0) {
            showSyncNotification(`Sync completed with ${conflicts.length} conflicts detected`, 'warning');
        } else {
            // No conflicts - merge server quotes
            const newQuotes = serverQuotes.filter(serverQuote =>
                !quotes.some(localQuote =>
                    localQuote.text.toLowerCase().trim() === serverQuote.text.toLowerCase().trim()
                )
            );
            
            if (newQuotes.length > 0) {
                quotes.push(...newQuotes);
                saveQuotes();
                populateCategories();
                filterQuotes();
                showSyncNotification(`Sync completed! Added ${newQuotes.length} new quotes from server`, 'success');
            } else {
                showSyncNotification('Sync completed! No new quotes from server', 'success');
            }
        }
        
        lastSyncTime = new Date().toISOString();
        localStorage.setItem('dynamicQuoteGenerator_lastSync', lastSyncTime);
        updateSyncStatus();
        
    } catch (error) {
        console.error('Sync error:', error);
        showSyncNotification('Sync failed: ' + error.message, 'error');
    }
}

// Toggle auto-sync
function toggleAutoSync() {
    autoSyncEnabled = !autoSyncEnabled;
    localStorage.setItem('dynamicQuoteGenerator_autoSync', autoSyncEnabled.toString());
    
    const toggleBtn = document.getElementById('toggleAutoSync');
    if (toggleBtn) {
        toggleBtn.textContent = autoSyncEnabled ? 'Disable Auto-Sync' : 'Enable Auto-Sync';
        toggleBtn.classList.toggle('active', autoSyncEnabled);
    }
    
    if (autoSyncEnabled) {
        // Start auto-sync every 30 seconds
        autoSyncInterval = setInterval(syncWithServer, 30000);
        showSyncNotification('Auto-sync enabled (every 30 seconds)', 'success');
    } else {
        // Stop auto-sync
        if (autoSyncInterval) {
            clearInterval(autoSyncInterval);
            autoSyncInterval = null;
        }
        showSyncNotification('Auto-sync disabled', 'info');
    }
    
    updateSyncStatus();
}

// Resolve conflicts
function resolveConflicts() {
    if (conflicts.length === 0) {
        showSyncNotification('No conflicts to resolve', 'info');
        return;
    }
    
    const conflictResolution = document.getElementById('conflictResolution');
    const conflictList = document.getElementById('conflictList');
    
    if (!conflictResolution || !conflictList) return;
    
    conflictList.innerHTML = '';
    
    conflicts.forEach((conflict, index) => {
        const conflictItem = document.createElement('div');
        conflictItem.className = 'conflict-item';
        
        conflictItem.innerHTML = `
            <strong>Conflict ${index + 1}:</strong> ${conflict.description}
            <div class="quote-preview">Local: "${conflict.local.text}" (${conflict.local.category})</div>
            <div class="quote-preview">Server: "${conflict.server.text}" (${conflict.server.category})</div>
            <div class="conflict-actions">
                <button onclick="resolveConflict(${index}, 'local')" style="background-color: #007bff;">Keep Local</button>
                <button onclick="resolveConflict(${index}, 'server')" style="background-color: #28a745;">Use Server</button>
                <button onclick="resolveConflict(${index}, 'merge')" style="background-color: #17a2b8;">Create Both</button>
            </div>
        `;
        
        conflictList.appendChild(conflictItem);
    });
    
    conflictResolution.style.display = 'block';
}

// Resolve individual conflict
function resolveConflict(conflictIndex, resolution) {
    if (conflictIndex >= conflicts.length) return;
    
    const conflict = conflicts[conflictIndex];
    
    switch (resolution) {
        case 'local':
            // Keep local version, ignore server version
            break;
            
        case 'server':
            // Update local version with server data
            const localIndex = quotes.findIndex(q => q.text.toLowerCase().trim() === conflict.local.text.toLowerCase().trim());
            if (localIndex !== -1) {
                quotes[localIndex] = { ...conflict.server, source: 'server' };
            }
            break;
            
        case 'merge':
            // Keep both versions
            quotes.push({ ...conflict.server, source: 'server' });
            break;
    }
    
    // Remove resolved conflict
    conflicts.splice(conflictIndex, 1);
    
    // Update UI
    if (conflicts.length === 0) {
        document.getElementById('conflictResolution').style.display = 'none';
        showSyncNotification('All conflicts resolved!', 'success');
    } else {
        resolveConflicts(); // Refresh conflict list
    }
    
    // Save changes and update UI
    saveQuotes();
    populateCategories();
    filterQuotes();
    updateSyncStatus();
}

// Load sync preferences
function loadSyncPreferences() {
    try {
        const savedAutoSync = localStorage.getItem('dynamicQuoteGenerator_autoSync');
        autoSyncEnabled = savedAutoSync === 'true';
        
        const savedLastSync = localStorage.getItem('dynamicQuoteGenerator_lastSync');
        lastSyncTime = savedLastSync;
        
        const toggleBtn = document.getElementById('toggleAutoSync');
        if (toggleBtn) {
            toggleBtn.textContent = autoSyncEnabled ? 'Disable Auto-Sync' : 'Enable Auto-Sync';
            toggleBtn.classList.toggle('active', autoSyncEnabled);
        }
        
        if (autoSyncEnabled) {
            autoSyncInterval = setInterval(syncWithServer, 30000);
        }
        
        updateSyncStatus();
    } catch (error) {
        console.error('Error loading sync preferences:', error);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load quotes from localStorage first
    loadQuotes();
    
    // Initialize with class-based approach for advanced features
    window.quoteGenerator = new QuoteGenerator();
    
    // Add event listener to "Show New Quote" button
    const newQuoteBtn = document.getElementById('newQuote');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', showRandomQuote);
    }
    
    // Add event listener to "Add New Quote" button
    const toggleFormBtn = document.getElementById('toggleForm');
    if (toggleFormBtn) {
        toggleFormBtn.addEventListener('click', () => {
            const form = document.getElementById('quoteForm');
            if (form) {
                // Form is visible, hide it
                const addQuoteContainer = document.getElementById('addQuoteContainer');
                addQuoteContainer.removeChild(form);
                toggleFormBtn.textContent = 'Add New Quote';
            } else {
                // Form is not visible, show it
                createAddQuoteForm();
            }
        });
    }
    
    // Add event listeners for import/export functionality
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToJsonFile);
    }
    
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');
    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => {
            if (importFile.files.length > 0) {
                importFromJsonFile({ target: importFile });
            } else {
                showNotification('Please select a JSON file first!', 'error');
            }
        });
        
        // Also allow direct file selection to trigger import
        importFile.addEventListener('change', importFromJsonFile);
    }
    
    const clearStorageBtn = document.getElementById('clearStorageBtn');
    if (clearStorageBtn) {
        clearStorageBtn.addEventListener('click', clearAllData);
    }
    
    // Add event listener for category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterQuotes);
    }
    
    // Initialize filtering system
    populateCategories();
    filterQuotes();
    
    // Display initial quote
    showRandomQuote();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            showRandomQuote();
        }
        if (e.key === 'Escape') {
            const form = document.getElementById('quoteForm');
            if (form) {
                const addQuoteContainer = document.getElementById('addQuoteContainer');
                addQuoteContainer.removeChild(form);
                document.getElementById('toggleForm').textContent = 'Add New Quote';
            }
        }
    });
    
    // Add event listeners for server sync functionality
    const syncBtn = document.getElementById('syncBtn');
    if (syncBtn) {
        syncBtn.addEventListener('click', syncWithServer);
    }
    
    const toggleAutoSyncBtn = document.getElementById('toggleAutoSync');
    if (toggleAutoSyncBtn) {
        toggleAutoSyncBtn.addEventListener('click', toggleAutoSync);
    }
    
    const resolveConflictsBtn = document.getElementById('resolveConflictsBtn');
    if (resolveConflictsBtn) {
        resolveConflictsBtn.addEventListener('click', resolveConflicts);
    }
    
    // Initialize sync system
    loadSyncPreferences();
    
    console.log('Dynamic Quote Generator with Web Storage and Server Sync initialized!');
    console.log('Features: Local Storage, Session Storage, JSON Import/Export, Server Synchronization');
    console.log('Keyboard shortcuts:');
    console.log('- Ctrl + Enter: Show new quote');
    console.log('- Escape: Close form');
});