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

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quoteGenerator = new QuoteGenerator();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            window.quoteGenerator.showRandomQuote();
        }
        if (e.key === 'Escape') {
            if (window.quoteGenerator.formVisible) {
                window.quoteGenerator.toggleAddQuoteForm();
            }
        }
    });
    
    console.log('Dynamic Quote Generator initialized!');
    console.log('Keyboard shortcuts:');
    console.log('- Ctrl + Enter: Show new quote');
    console.log('- Escape: Close form');
});