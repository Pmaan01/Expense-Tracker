document.getElementById('expense-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const paymentType = document.getElementById('payment').value;
    const timestamp = new Date().toLocaleString();

    // Create a new expense object
    const expense = {
        name,
        description,
        amount,
        category,
        paymentType,
        timestamp
    };

    try {
        // Send a POST request to save the expense
        const response = await fetch('/api/v1/expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });

        if (!response.ok) {
            console.log('Failed to create expense');
        }

        // If successful, add the expense to the history
        addExpenseToHistory(expense);

        // Clear the form after submission
        document.getElementById('expense-form').reset();
        recalculateTotal(); // Update total after adding a new expense

    } catch (error) {
        console.log('Error:', error);
        alert('Failed to create expense. Please try again.');
    }
});

window.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api/v1/expense');

        if (!response.ok) {
            console.log('Failed to fetch expenses');
        }

        const expenses = await response.json();
        expenses.forEach(expense => {
            addExpenseToHistory(expense);
        });
        recalculateTotal(); // Update total on page load

    } catch (error) {
        console.log('Error:', error);
        alert('Failed to load expenses. Please try again.');
    }
});

function addExpenseToHistory(expense) {
    const expenseHistory = document.getElementById('expense-history');

    // Create a new expense item
    const expenseItem = document.createElement('div');
    expenseItem.className = 'p-4 mb-4 rounded-lg cursor-pointer transition-colors duration-300';
    
    let sign = '';
    if (expense.paymentType === 'credit') {
        expenseItem.className += ' bg-green-100 hover:bg-green-200';
        sign = '+';
    } else {
        expenseItem.className += ' bg-red-100 hover:bg-red-200';
        sign = '-';
    }
    
    // Set inner HTML with basic info (name, amount, timestamp)
    const flexDiv = document.createElement('div');
    flexDiv.className = 'expense-history';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'font-semibold flex justify-between items-center';
    nameSpan.textContent = expense.name;

    const amountSpan = document.createElement('span');
    amountSpan.className = 'font-semibold flex justify-between items-center';
    amountSpan.textContent = `${sign}${expense.amount} CAD`;

    flexDiv.appendChild(nameSpan);
    flexDiv.appendChild(amountSpan);

    const timestampSmall = document.createElement('small');
    timestampSmall.className = 'text-gray-500';
    timestampSmall.textContent = expense.timestamp;

    expenseItem.appendChild(flexDiv);
    expenseItem.appendChild(timestampSmall);

    // Add hover effect to show more details
    expenseItem.addEventListener('mouseover', function() {
        this.innerHTML = '';
    
        const flexDiv = document.createElement('div');
        flexDiv.className = 'hover-effect';
    
        const nameSpan = document.createElement('span');
        nameSpan.className = 'font-semibold flex justify-between items-center';
        nameSpan.textContent = expense.name;
    
        const amountSpan = document.createElement('span');
        amountSpan.className = 'font-semibold flex justify-between items-center';
        amountSpan.textContent = `${sign}${expense.amount} CAD`;
    
        flexDiv.appendChild(nameSpan);
        flexDiv.appendChild(amountSpan);
    
        const descriptionP = document.createElement('p');
        descriptionP.className = 'text-gray-700 mt-2';
        descriptionP.textContent = expense.description;
    
        const categoryP = document.createElement('p');
        categoryP.className = 'text-gray-500';
        categoryP.textContent = `${expense.category} | ${expense.paymentType}`;
    
        const timestampSmall = document.createElement('small');
        timestampSmall.className = 'text-gray-500';
        timestampSmall.textContent = expense.timestamp;
    
        this.appendChild(flexDiv);
        this.appendChild(descriptionP);
        this.appendChild(categoryP);
        this.appendChild(timestampSmall);
    });
    
    expenseItem.addEventListener('mouseout', function() {
        this.innerHTML = '';
    
        const flexDiv = document.createElement('div');
        flexDiv.className = 'hover-out';
    
        const nameSpan = document.createElement('span');
        nameSpan.className = 'font-semibold flex justify-between items-center';
        nameSpan.textContent = expense.name;
    
        const amountSpan = document.createElement('span');
        amountSpan.className = 'font-semibold flex justify-between items-center';
        amountSpan.textContent = `${sign}${expense.amount} CAD`;
    
        flexDiv.appendChild(nameSpan);
        flexDiv.appendChild(amountSpan);
    
        const timestampSmall = document.createElement('small');
        timestampSmall.className = 'text-gray-500';
        timestampSmall.textContent = expense.timestamp;
    
        this.appendChild(flexDiv);
        this.appendChild(timestampSmall);
    });

    // Append the new item to the history
    expenseHistory.appendChild(expenseItem);
}

function recalculateTotal() {
    const expenseItems = document.querySelectorAll('#expense-history .font-semibold span:last-child');
    let total = 0;

    expenseItems.forEach(item => {
        // Extract amount and ensure it's a number
        const amount = parseFloat(item.textContent.replace(/[^\d.-]/g, ''));
        // Determine sign and update total
        if (item.textContent.startsWith('-')) {
            total -= amount;
        } else {
            total += amount;
        }
    });

    // Update total display
    document.getElementById('total').textContent = `Total: ${total.toFixed(2)} CAD`;
}
