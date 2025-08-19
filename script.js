// Dynamic Quote Generator - Advanced DOM Manipulation
class QuoteGenerator {
    constructor() {
        // Initialize data structures
        this.quotes = [];
        this.categories = [];
        this.currentCategory = null;
        this.currentQuoteIndex = 0;
        this.quotesViewed = 0;
        this.searchResults = [];
        
        // DOM element references
        this.elements = {
            categoryContainer: document.getElementById('categoryContainer'),
            quoteText: document.getElementById('quoteText'),
            quoteAuthor: document.getElementById('quoteAuthor'),
            quoteDisplay: document.getElementById('quoteDisplay'),
            generateQuoteBtn: document.getElementById('generateQuoteBtn'),
            addQuoteBtn: document.getElementById('addQuoteBtn'),
            addCategoryBtn: document.getElementById('addCategoryBtn'),
            searchInput: document.getElementById('searchInput'),
            searchBtn: document.getElementById('searchBtn'),
            clearSearchBtn: document.getElementById('clearSearchBtn'),
            searchResults: document.getElementById('searchResults'),
            categoryModal: document.getElementById('categoryModal'),
            quoteModal: document.getElementById('quoteModal'),
            categoryForm: document.getElementById('categoryForm'),
            quoteForm: document.getElementById('quoteForm'),
            quoteCategorySelect: document.getElementById('quoteCategorySelect'),
            totalQuotes: document.getElementById('totalQuotes'),
            totalCategories: document.getElementById('totalCategories'),
            quotesViewedStat: document.getElementById('quotesViewed'),
            loadingSpinner: document.getElementById('loadingSpinner'),
            toastContainer: document.getElementById('toastContainer')
        };
        
        // Initialize the application
        this.init();
    }
    
    // Initialize the application
    init() {
        this.loadInitialData();
        this.bindEvents();
        this.renderCategories();
        this.updateStatistics();
        this.showWelcomeMessage();
    }
    
    // Load initial quote data
    loadInitialData() {
        // Initial categories
        this.categories = [
            { id: 1, name: 'Motivation', description: 'Inspiring quotes to motivate and energize' },
            { id: 2, name: 'Wisdom', description: 'Timeless wisdom from great minds' },
            { id: 3, name: 'Success', description: 'Quotes about achieving success' },
            { id: 4, name: 'Life', description: 'Reflections on life and living' },
            { id: 5, name: 'Love', description: 'Beautiful quotes about love and relationships' }
        ];
        
        // Initial quotes
        this.quotes = [
            // Motivation quotes
            { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", categoryId: 1 },
            { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", categoryId: 1 },
            { id: 3, text: "Your limitation—it's only your imagination.", author: "Unknown", categoryId: 1 },
            { id: 4, text: "Push yourself, because no one else is going to do it for you.", author: "Unknown", categoryId: 1 },
            
            // Wisdom quotes
            { id: 5, text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", categoryId: 2 },
            { id: 6, text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", categoryId: 2 },
            { id: 7, text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", categoryId: 2 },
            { id: 8, text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", categoryId: 2 },
            
            // Success quotes
            { id: 9, text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", categoryId: 3 },
            { id: 10, text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", categoryId: 3 },
            { id: 11, text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", categoryId: 3 },
            { id: 12, text: "If you really look closely, most overnight successes took a long time.", author: "Steve Jobs", categoryId: 3 },
            
            // Life quotes
            { id: 13, text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", categoryId: 4 },
            { id: 14, text: "The purpose of our lives is to be happy.", author: "Dalai Lama", categoryId: 4 },
            { id: 15, text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll", categoryId: 4 },
            { id: 16, text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr.", categoryId: 4 },
            
            // Love quotes
            { id: 17, text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu", categoryId: 5 },
            { id: 18, text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", categoryId: 5 },
            { id: 19, text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle", categoryId: 5 },
            { id: 20, text: "Where there is love there is life.", author: "Mahatma Gandhi", categoryId: 5 }
        ];
    }
    
    // Bind event listeners
    bindEvents() {
        // Quote generation
        this.elements.generateQuoteBtn.addEventListener('click', () => this.generateRandomQuote());
        
        // Modal controls
        this.elements.addCategoryBtn.addEventListener('click', () => this.showModal('category'));
        this.elements.addQuoteBtn.addEventListener('click', () => this.showModal('quote'));
        
        // Modal close events
        document.getElementById('closeCategoryModal').addEventListener('click', () => this.hideModal('category'));
        document.getElementById('closeQuoteModal').addEventListener('click', () => this.hideModal('quote'));
        document.getElementById('cancelCategoryBtn').addEventListener('click', () => this.hideModal('category'));
        document.getElementById('cancelQuoteBtn').addEventListener('click', () => this.hideModal('quote'));
        
        // Form submissions
        this.elements.categoryForm.addEventListener('submit', (e) => this.handleCategorySubmit(e));
        this.elements.quoteForm.addEventListener('submit', (e) => this.handleQuoteSubmit(e));
        
        // Search functionality
        this.elements.searchBtn.addEventListener('click', () => this.performSearch());
        this.elements.clearSearchBtn.addEventListener('click', () => this.clearSearch());
        this.elements.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        // Modal backdrop clicks
        this.elements.categoryModal.addEventListener('click', (e) => {
            if (e.target === this.elements.categoryModal) this.hideModal('category');
        });
        this.elements.quoteModal.addEventListener('click', (e) => {
            if (e.target === this.elements.quoteModal) this.hideModal('quote');
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }
    
    // Handle keyboard shortcuts
    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    this.generateRandomQuote();
                    break;
                case 'n':
                    e.preventDefault();
                    this.showModal('quote');
                    break;
                case 'k':
                    e.preventDefault();
                    this.elements.searchInput.focus();
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            this.hideModal('category');
            this.hideModal('quote');
        }
    }
    
    // Render categories dynamically
    renderCategories() {
        this.elements.categoryContainer.innerHTML = '';
        
        this.categories.forEach(category => {
            const categoryBtn = this.createElement('button', {
                className: 'category-btn',
                textContent: category.name,
                title: category.description,
                'data-category-id': category.id
            });
            
            categoryBtn.addEventListener('click', () => this.selectCategory(category.id));
            this.elements.categoryContainer.appendChild(categoryBtn);
        });
        
        // Update category select in quote form
        this.updateCategorySelect();
    }
    
    // Update category select dropdown
    updateCategorySelect() {
        this.elements.quoteCategorySelect.innerHTML = '<option value="">Select a category</option>';
        
        this.categories.forEach(category => {
            const option = this.createElement('option', {
                value: category.id,
                textContent: category.name
            });
            this.elements.quoteCategorySelect.appendChild(option);
        });
    }
    
    // Select a category
    selectCategory(categoryId) {
        this.currentCategory = categoryId;
        this.currentQuoteIndex = 0;
        
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-category-id="${categoryId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Generate first quote from selected category
        this.generateRandomQuote();
        this.showToast('Category selected!', 'success');
    }
    
    // Generate random quote from current category
    generateRandomQuote() {
        if (!this.currentCategory) {
            this.showToast('Please select a category first!', 'warning');
            return;
        }
        
        const categoryQuotes = this.quotes.filter(quote => quote.categoryId === this.currentCategory);
        
        if (categoryQuotes.length === 0) {
            this.displayQuote('No quotes available in this category.', 'Add some quotes to get started!');
            return;
        }
        
        // Get random quote from category
        const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
        const selectedQuote = categoryQuotes[randomIndex];
        
        this.displayQuote(selectedQuote.text, selectedQuote.author);
        this.quotesViewed++;
        this.updateStatistics();
    }
    
    // Display quote with animation
    displayQuote(text, author) {
        // Add loading effect
        this.showLoading();
        
        setTimeout(() => {
            // Remove existing animations
            this.elements.quoteText.classList.remove('fade-in');
            this.elements.quoteAuthor.classList.remove('slide-up');
            
            // Update content
            this.elements.quoteText.textContent = text;
            this.elements.quoteAuthor.textContent = author;
            
            // Add animations
            setTimeout(() => {
                this.elements.quoteText.classList.add('fade-in');
                this.elements.quoteAuthor.classList.add('slide-up');
            }, 50);
            
            this.hideLoading();
        }, 500);
    }
    
    // Show welcome message
    showWelcomeMessage() {
        this.displayQuote('Welcome to the Dynamic Quote Generator!', 'Select a category to begin exploring inspiring quotes');
    }
    
    // Show modal
    showModal(type) {
        const modal = type === 'category' ? this.elements.categoryModal : this.elements.quoteModal;
        modal.classList.add('show');
        
        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input, textarea');
            if (firstInput) firstInput.focus();
        }, 100);
    }
    
    // Hide modal
    hideModal(type) {
        const modal = type === 'category' ? this.elements.categoryModal : this.elements.quoteModal;
        modal.classList.remove('show');
        
        // Reset forms
        if (type === 'category') {
            this.elements.categoryForm.reset();
        } else {
            this.elements.quoteForm.reset();
        }
    }
    
    // Handle category form submission
    handleCategorySubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const categoryName = formData.get('categoryName').trim();
        const categoryDescription = formData.get('categoryDescription').trim();
        
        if (!categoryName) {
            this.showToast('Category name is required!', 'error');
            return;
        }
        
        // Check for duplicate category names
        if (this.categories.some(cat => cat.name.toLowerCase() === categoryName.toLowerCase())) {
            this.showToast('Category already exists!', 'error');
            return;
        }
        
        // Create new category
        const newCategory = {
            id: Date.now(),
            name: categoryName,
            description: categoryDescription || `Quotes about ${categoryName.toLowerCase()}`
        };
        
        this.categories.push(newCategory);
        this.renderCategories();
        this.updateStatistics();
        this.hideModal('category');
        this.showToast(`Category "${categoryName}" added successfully!`, 'success');
    }
    
    // Handle quote form submission
    handleQuoteSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const quoteText = formData.get('quoteText').trim();
        const quoteAuthor = formData.get('quoteAuthor').trim();
        const categoryId = parseInt(formData.get('quoteCategory'));
        
        if (!quoteText || !quoteAuthor || !categoryId) {
            this.showToast('All fields are required!', 'error');
            return;
        }
        
        // Create new quote
        const newQuote = {
            id: Date.now(),
            text: quoteText,
            author: quoteAuthor,
            categoryId: categoryId
        };
        
        this.quotes.push(newQuote);
        this.updateStatistics();
        this.hideModal('quote');
        
        const categoryName = this.categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
        this.showToast(`Quote added to "${categoryName}" category!`, 'success');
    }
    
    // Perform search
    performSearch() {
        const searchTerm = this.elements.searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            this.showToast('Please enter a search term!', 'warning');
            return;
        }
        
        this.searchResults = this.quotes.filter(quote => 
            quote.text.toLowerCase().includes(searchTerm) || 
            quote.author.toLowerCase().includes(searchTerm)
        );
        
        this.displaySearchResults();
    }
    
    // Display search results
    displaySearchResults() {
        this.elements.searchResults.innerHTML = '';
        
        if (this.searchResults.length === 0) {
            const noResults = this.createElement('div', {
                className: 'search-result-item',
                innerHTML: '<em>No quotes found matching your search.</em>'
            });
            this.elements.searchResults.appendChild(noResults);
            return;
        }
        
        this.searchResults.forEach(quote => {
            const resultItem = this.createElement('div', {
                className: 'search-result-item'
            });
            
            const quoteElement = this.createElement('div', {
                className: 'search-result-quote',
                textContent: `"${quote.text}"`
            });
            
            const authorElement = this.createElement('div', {
                className: 'search-result-author',
                textContent: `— ${quote.author}`
            });
            
            resultItem.appendChild(quoteElement);
            resultItem.appendChild(authorElement);
            
            // Add click handler to display quote
            resultItem.addEventListener('click', () => {
                this.displayQuote(quote.text, quote.author);
                this.quotesViewed++;
                this.updateStatistics();
                this.showToast('Quote displayed!', 'success');
            });
            
            this.elements.searchResults.appendChild(resultItem);
        });
        
        this.showToast(`Found ${this.searchResults.length} quote(s)!`, 'success');
    }
    
    // Clear search
    clearSearch() {
        this.elements.searchInput.value = '';
        this.elements.searchResults.innerHTML = '';
        this.searchResults = [];
    }
    
    // Update statistics
    updateStatistics() {
        this.elements.totalQuotes.textContent = this.quotes.length;
        this.elements.totalCategories.textContent = this.categories.length;
        this.elements.quotesViewedStat.textContent = this.quotesViewed;
        
        // Animate numbers
        this.animateNumber(this.elements.totalQuotes);
        this.animateNumber(this.elements.totalCategories);
        this.animateNumber(this.elements.quotesViewedStat);
    }
    
    // Animate number changes
    animateNumber(element) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#667eea';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 200);
    }
    
    // Show loading spinner
    showLoading() {
        this.elements.loadingSpinner.classList.add('show');
    }
    
    // Hide loading spinner
    hideLoading() {
        this.elements.loadingSpinner.classList.remove('show');
    }
    
    // Show toast notification
    showToast(message, type = 'info') {
        const toast = this.createElement('div', {
            className: `toast ${type}`,
            textContent: message
        });
        
        this.elements.toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideInRight 0.3s ease-in-out reverse';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }
        }, 3000);
    }
    
    // Utility method to create elements with properties
    createElement(tag, properties = {}) {
        const element = document.createElement(tag);
        
        Object.keys(properties).forEach(key => {
            if (key === 'textContent' || key === 'innerHTML') {
                element[key] = properties[key];
            } else if (key === 'className') {
                element.className = properties[key];
            } else {
                element.setAttribute(key, properties[key]);
            }
        });
        
        return element;
    }
    
    // Export data (for potential future use)
    exportData() {
        return {
            quotes: this.quotes,
            categories: this.categories,
            statistics: {
                totalQuotes: this.quotes.length,
                totalCategories: this.categories.length,
                quotesViewed: this.quotesViewed
            }
        };
    }
    
    // Import data (for potential future use)
    importData(data) {
        if (data.quotes) this.quotes = data.quotes;
        if (data.categories) this.categories = data.categories;
        if (data.statistics) this.quotesViewed = data.statistics.quotesViewed || 0;
        
        this.renderCategories();
        this.updateStatistics();
        this.showToast('Data imported successfully!', 'success');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.quoteGenerator = new QuoteGenerator();
    
    // Add some helpful console messages for developers
    console.log('🎯 Dynamic Quote Generator initialized!');
    console.log('💡 Keyboard shortcuts:');
    console.log('   Ctrl/Cmd + Enter: Generate new quote');
    console.log('   Ctrl/Cmd + N: Add new quote');
    console.log('   Ctrl/Cmd + K: Focus search');
    console.log('   Escape: Close modals');
    console.log('📊 Access the generator instance via: window.quoteGenerator');
});

// Add some advanced DOM manipulation demonstrations
class DOMManipulationDemo {
    static demonstrateAdvancedTechniques() {
        console.log('🚀 Advanced DOM Manipulation Techniques Demonstrated:');
        console.log('1. Dynamic element creation with createElement()');
        console.log('2. Event delegation and dynamic event binding');
        console.log('3. CSS class manipulation for animations');
        console.log('4. Form data handling with FormData API');
        console.log('5. Modal management with backdrop filtering');
        console.log('6. Search and filter functionality');
        console.log('7. Toast notifications with auto-removal');
        console.log('8. Keyboard event handling and shortcuts');
        console.log('9. Data persistence simulation');
        console.log('10. Responsive design with CSS Grid and Flexbox');
    }
}

// Expose demo for educational purposes
window.DOMManipulationDemo = DOMManipulationDemo;

// Step 2: Advanced DOM Manipulation Functions as specified in requirements
// Function to show a random quote from the quotes array
function showRandomQuote() {
    const quotes = window.quoteGenerator.quotes;
    
    if (quotes.length === 0) {
        console.log('No quotes available');
        return;
    }
    
    // Get random quote from all quotes
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    
    // Find the category name
    const category = window.quoteGenerator.categories.find(cat => cat.id === selectedQuote.categoryId);
    const categoryName = category ? category.name : 'Unknown';
    
    // Create or update quote display elements using DOM manipulation
    const quoteContainer = document.getElementById('quoteDisplay');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    // Advanced DOM manipulation: Update content with animation
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = selectedQuote.text;
        quoteAuthor.textContent = selectedQuote.author;
        
        // Add category information dynamically
        let categoryInfo = document.querySelector('.quote-category');
        if (!categoryInfo) {
            categoryInfo = document.createElement('div');
            categoryInfo.className = 'quote-category';
            categoryInfo.style.cssText = `
                font-size: 0.9rem;
                color: #667eea;
                margin-top: 10px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            `;
            quoteContainer.appendChild(categoryInfo);
        }
        categoryInfo.textContent = `Category: ${categoryName}`;
        
        // Animate back in
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
        categoryInfo.style.opacity = '1';
        
        // Update statistics
        window.quoteGenerator.quotesViewed++;
        window.quoteGenerator.updateStatistics();
        
        console.log(`Displayed quote: "${selectedQuote.text}" by ${selectedQuote.author} from ${categoryName} category`);
    }, 300);
}

// Function to create and display the add quote form using DOM manipulation
function createAddQuoteForm() {
    // Remove existing form if present
    const existingForm = document.getElementById('dynamicAddQuoteForm');
    if (existingForm) {
        existingForm.remove();
    }
    
    // Create form container using DOM manipulation
    const formContainer = document.createElement('div');
    formContainer.id = 'dynamicAddQuoteForm';
    formContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        width: 90%;
        max-width: 500px;
        animation: slideIn 0.3s ease-in-out;
    `;
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'formBackdrop';
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        z-index: 999;
    `;
    
    // Create form title
    const title = document.createElement('h3');
    title.textContent = 'Add New Quote (Dynamic Form)';
    title.style.cssText = `
        margin: 0 0 20px 0;
        color: #2d3748;
        font-size: 1.5rem;
    `;
    
    // Create quote text input
    const quoteLabel = document.createElement('label');
    quoteLabel.textContent = 'Quote Text:';
    quoteLabel.style.cssText = `
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #4a5568;
    `;
    
    const quoteTextarea = document.createElement('textarea');
    quoteTextarea.id = 'dynamicQuoteText';
    quoteTextarea.required = true;
    quoteTextarea.rows = 4;
    quoteTextarea.style.cssText = `
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        margin-bottom: 20px;
        resize: vertical;
        box-sizing: border-box;
    `;
    
    // Create author input
    const authorLabel = document.createElement('label');
    authorLabel.textContent = 'Author:';
    authorLabel.style.cssText = `
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #4a5568;
    `;
    
    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.id = 'dynamicQuoteAuthor';
    authorInput.required = true;
    authorInput.style.cssText = `
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        margin-bottom: 20px;
        box-sizing: border-box;
    `;
    
    // Create category select
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Category:';
    categoryLabel.style.cssText = `
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #4a5568;
    `;
    
    const categorySelect = document.createElement('select');
    categorySelect.id = 'dynamicQuoteCategory';
    categorySelect.required = true;
    categorySelect.style.cssText = `
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        margin-bottom: 20px;
        box-sizing: border-box;
    `;
    
    // Populate category options
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a category';
    categorySelect.appendChild(defaultOption);
    
    window.quoteGenerator.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
    
    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        margin-top: 30px;
    `;
    
    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add Quote';
    submitButton.type = 'button';
    submitButton.style.cssText = `
        padding: 12px 24px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: all 0.3s ease;
    `;
    
    // Create cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.type = 'button';
    cancelButton.style.cssText = `
        padding: 12px 24px;
        background: #e2e8f0;
        color: #4a5568;
        border: 2px solid #cbd5e0;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: all 0.3s ease;
    `;
    
    // Add event listeners using DOM manipulation
    submitButton.addEventListener('click', function() {
        const quoteText = quoteTextarea.value.trim();
        const author = authorInput.value.trim();
        const categoryId = parseInt(categorySelect.value);
        
        if (!quoteText || !author || !categoryId) {
            alert('All fields are required!');
            return;
        }
        
        // Create new quote object
        const newQuote = {
            id: Date.now(),
            text: quoteText,
            author: author,
            categoryId: categoryId
        };
        
        // Add to quotes array using DOM manipulation approach
        window.quoteGenerator.quotes.push(newQuote);
        window.quoteGenerator.updateStatistics();
        
        // Show success message
        const categoryName = window.quoteGenerator.categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
        window.quoteGenerator.showToast(`Quote added to "${categoryName}" category!`, 'success');
        
        // Close form
        document.body.removeChild(backdrop);
        document.body.removeChild(formContainer);
        
        console.log(`Added new quote: "${quoteText}" by ${author} to ${categoryName} category`);
    });
    
    cancelButton.addEventListener('click', function() {
        document.body.removeChild(backdrop);
        document.body.removeChild(formContainer);
    });
    
    backdrop.addEventListener('click', function() {
        document.body.removeChild(backdrop);
        document.body.removeChild(formContainer);
    });
    
    // Assemble the form using DOM manipulation
    formContainer.appendChild(title);
    formContainer.appendChild(quoteLabel);
    formContainer.appendChild(quoteTextarea);
    formContainer.appendChild(authorLabel);
    formContainer.appendChild(authorInput);
    formContainer.appendChild(categoryLabel);
    formContainer.appendChild(categorySelect);
    buttonsContainer.appendChild(submitButton);
    buttonsContainer.appendChild(cancelButton);
    formContainer.appendChild(buttonsContainer);
    
    // Add to document
    document.body.appendChild(backdrop);
    document.body.appendChild(formContainer);
    
    // Focus first input
    setTimeout(() => quoteTextarea.focus(), 100);
    
    console.log('Dynamic add quote form created and displayed');
}

// Expose the required functions globally for Step 2 requirements
window.showRandomQuote = showRandomQuote;
window.createAddQuoteForm = createAddQuoteForm;

// Step 3: Dynamic Quote Addition Enhancement
// Enhanced simple form interface for adding quotes dynamically
function createSimpleQuoteForm() {
    // Remove existing simple form if present
    const existingForm = document.getElementById('simpleQuoteForm');
    if (existingForm) {
        existingForm.remove();
    }
    
    // Find a good location to insert the form (after the quote display section)
    const quoteSection = document.querySelector('.quote-section');
    if (!quoteSection) {
        console.error('Quote section not found');
        return;
    }
    
    // Create simple form container
    const formContainer = document.createElement('div');
    formContainer.id = 'simpleQuoteForm';
    formContainer.className = 'simple-quote-form';
    formContainer.style.cssText = `
        background: rgba(255, 255, 255, 0.95);
        border-radius: 15px;
        padding: 25px;
        margin: 20px 0;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        border: 2px solid #e2e8f0;
        transition: all 0.3s ease;
    `;
    
    // Create form title
    const title = document.createElement('h3');
    title.textContent = 'Quick Add Quote';
    title.style.cssText = `
        color: #4a5568;
        margin-bottom: 20px;
        font-weight: 600;
        text-align: center;
    `;
    
    // Create form element
    const form = document.createElement('form');
    form.id = 'quickQuoteForm';
    form.style.cssText = `
        display: grid;
        gap: 15px;
    `;
    
    // Create quote input
    const quoteInput = document.createElement('textarea');
    quoteInput.id = 'quickQuoteText';
    quoteInput.placeholder = 'Enter your inspiring quote here...';
    quoteInput.required = true;
    quoteInput.rows = 3;
    quoteInput.style.cssText = `
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        resize: vertical;
        transition: border-color 0.3s ease;
        background: white;
    `;
    
    // Add focus effect
    quoteInput.addEventListener('focus', () => {
        quoteInput.style.borderColor = '#667eea';
        quoteInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
    });
    
    quoteInput.addEventListener('blur', () => {
        quoteInput.style.borderColor = '#e2e8f0';
        quoteInput.style.boxShadow = 'none';
    });
    
    // Create author input
    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.id = 'quickQuoteAuthor';
    authorInput.placeholder = 'Author name';
    authorInput.required = true;
    authorInput.style.cssText = `
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        transition: border-color 0.3s ease;
        background: white;
    `;
    
    // Add focus effect
    authorInput.addEventListener('focus', () => {
        authorInput.style.borderColor = '#667eea';
        authorInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
    });
    
    authorInput.addEventListener('blur', () => {
        authorInput.style.borderColor = '#e2e8f0';
        authorInput.style.boxShadow = 'none';
    });
    
    // Create category select
    const categorySelect = document.createElement('select');
    categorySelect.id = 'quickQuoteCategory';
    categorySelect.required = true;
    categorySelect.style.cssText = `
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        background: white;
        cursor: pointer;
    `;
    
    // Populate category options
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a category';
    categorySelect.appendChild(defaultOption);
    
    window.quoteGenerator.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
    
    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Quote Instantly';
    submitButton.style.cssText = `
        padding: 15px 25px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `;
    
    // Add hover effect
    submitButton.addEventListener('mouseenter', () => {
        submitButton.style.transform = 'translateY(-2px)';
        submitButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    
    submitButton.addEventListener('mouseleave', () => {
        submitButton.style.transform = 'translateY(0)';
        submitButton.style.boxShadow = 'none';
    });
    
    // Create toggle button to show/hide form
    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.textContent = 'Quick Add Quote ⚡';
    toggleButton.style.cssText = `
        padding: 12px 24px;
        background: #48bb78;
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 15px;
        transition: all 0.3s ease;
        display: block;
        margin-left: auto;
        margin-right: auto;
    `;
    
    // Initially hide the form
    form.style.display = 'none';
    
    // Toggle form visibility
    toggleButton.addEventListener('click', () => {
        if (form.style.display === 'none') {
            form.style.display = 'grid';
            toggleButton.textContent = 'Hide Form ✕';
            toggleButton.style.background = '#f56565';
            quoteInput.focus();
        } else {
            form.style.display = 'none';
            toggleButton.textContent = 'Quick Add Quote ⚡';
            toggleButton.style.background = '#48bb78';
        }
    });
    
    // Handle form submission with dynamic DOM updates
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const quoteText = quoteInput.value.trim();
        const author = authorInput.value.trim();
        const categoryId = parseInt(categorySelect.value);
        
        if (!quoteText || !author || !categoryId) {
            // Create error message
            showFormError('All fields are required!');
            return;
        }
        
        // Create new quote object
        const newQuote = {
            id: Date.now(),
            text: quoteText,
            author: author,
            categoryId: categoryId
        };
        
        // Add to quotes array - Step 3 requirement
        window.quoteGenerator.quotes.push(newQuote);
        
        // Update DOM dynamically - Step 3 requirement
        updateDOMAfterQuoteAddition(newQuote);
        
        // Reset form
        form.reset();
        
        // Hide form after successful submission
        form.style.display = 'none';
        toggleButton.textContent = 'Quick Add Quote ⚡';
        toggleButton.style.background = '#48bb78';
        
        // Show success animation
        showSuccessAnimation(newQuote);
        
        console.log(`Step 3: Quote added dynamically - "${quoteText}" by ${author}`);
    });
    
    // Assemble the form
    form.appendChild(quoteInput);
    form.appendChild(authorInput);
    form.appendChild(categorySelect);
    form.appendChild(submitButton);
    
    formContainer.appendChild(title);
    formContainer.appendChild(toggleButton);
    formContainer.appendChild(form);
    
    // Insert after quote section
    quoteSection.parentNode.insertBefore(formContainer, quoteSection.nextSibling);
    
    console.log('Step 3: Simple quote form interface created');
}

// Update DOM after quote addition - Step 3 requirement
function updateDOMAfterQuoteAddition(newQuote) {
    // Update statistics immediately
    window.quoteGenerator.updateStatistics();
    
    // Update category select dropdowns if they exist
    window.quoteGenerator.updateCategorySelect();
    
    // If the current category matches the new quote's category, we could show it
    if (window.quoteGenerator.currentCategory === newQuote.categoryId) {
        // Optionally display the new quote immediately
        window.quoteGenerator.displayQuote(newQuote.text, newQuote.author);
        window.quoteGenerator.quotesViewed++;
        window.quoteGenerator.updateStatistics();
    }
    
    // Update any search results if there's an active search
    if (window.quoteGenerator.elements.searchInput.value.trim()) {
        window.quoteGenerator.performSearch();
    }
    
    // Show toast notification
    const categoryName = window.quoteGenerator.categories.find(cat => cat.id === newQuote.categoryId)?.name || 'Unknown';
    window.quoteGenerator.showToast(`Quote added to "${categoryName}" category and DOM updated!`, 'success');
}

// Show form error message
function showFormError(message) {
    // Remove existing error if present
    const existingError = document.getElementById('formError');
    if (existingError) {
        existingError.remove();
    }
    
    const form = document.getElementById('quickQuoteForm');
    const errorDiv = document.createElement('div');
    errorDiv.id = 'formError';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #fed7d7;
        color: #c53030;
        padding: 10px 15px;
        border-radius: 8px;
        border: 1px solid #feb2b2;
        font-size: 0.9rem;
        margin-bottom: 10px;
        animation: shake 0.5s ease-in-out;
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 3000);
}

// Show success animation
function showSuccessAnimation(newQuote) {
    // Create success overlay
    const successOverlay = document.createElement('div');
    successOverlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #48bb78, #38a169);
        color: white;
        padding: 30px 40px;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(72, 187, 120, 0.3);
        z-index: 10000;
        text-align: center;
        animation: successPop 0.6s ease-in-out;
    `;
    
    const categoryName = window.quoteGenerator.categories.find(cat => cat.id === newQuote.categoryId)?.name || 'Unknown';
    
    successOverlay.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 10px;">✅</div>
        <div style="font-size: 1.2rem; font-weight: 600; margin-bottom: 5px;">Quote Added Successfully!</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">Added to ${categoryName} category</div>
    `;
    
    document.body.appendChild(successOverlay);
    
    // Remove after animation
    setTimeout(() => {
        if (successOverlay.parentNode) {
            successOverlay.remove();
        }
    }, 2000);
}

// Auto-initialize Step 3 form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the main app to initialize
    setTimeout(() => {
        createSimpleQuoteForm();
    }, 1000);
});

// Expose Step 3 function globally
window.createSimpleQuoteForm = createSimpleQuoteForm;

// Add CSS animations for Step 3
const step3Styles = document.createElement('style');
step3Styles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes successPop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    .simple-quote-form:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15) !important;
    }
`;
document.head.appendChild(step3Styles);

// Add console instructions for the required functions
console.log('📋 Step 2 Functions Available:');
console.log('   showRandomQuote() - Display a random quote from all categories');
console.log('   createAddQuoteForm() - Create and display dynamic add quote form');
console.log('📋 Step 3 Functions Available:');
console.log('   createSimpleQuoteForm() - Create simple form interface for dynamic quote addition');
console.log('💡 Try calling these functions from the browser console!');