// Function to generate a random mapping of characters from the base set
function generateRandomMapping(chars) {
    const shuffledChars = [...chars];  // Make a copy of the base character set

    // Shuffle the character set randomly
    //originall shuffledchars.length -1
    for (let i = 31; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledChars[i], shuffledChars[j]] = [shuffledChars[j], shuffledChars[i]];  // Swap elements
    }

    // Create a mapping of original characters to the shuffled characters
    const mapping = chars.map((original, index) => ({
        original: original,
        encoded: shuffledChars[index]
    }));
   return mapping;
}

// Function to encode a message using the randomized mapping
function encodeMessage(message, mapping) {
    let encodedMessage = "";

    // For each character in the message, replace it with its mapped encoded character
    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        
        // Find the matching pair from the mapping
        const pair = mapping.find(p => p.original === char.toUpperCase()); // Ensure case insensitivity

        if (pair) {
            encodedMessage += pair.encoded;  // Add the mapped encoded character
        } else {
            encodedMessage += char;  // If no mapping exists (e.g., for symbols), keep the original character
        }
    }

    return encodedMessage;
}

// Function to display the encoded message, table, and hide the input elements
function displayResults() {
    const phrase = document.getElementById('phraseInput').value; // Get the input message
    const output = document.getElementById('encodedMessage');
    const mappingTableBody = document.getElementById('characterMappingTable').getElementsByTagName('tbody')[0];
    const inputSection = document.getElementById('inputSection');
    const printButton = document.getElementById('printButton');

    // Check if the phrase length is valid (5 to 100 characters)
    if (phrase.length < 5 || phrase.length > 100) {
        alert("Please enter a phrase between 5 and 100 characters.");
        return;
    }

    // Define the character set (A-Z, 2-8)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split('');

    // Generate the random mapping of characters
    const randomMapping = generateRandomMapping(chars);


    // Clear the previous mapping table content (only clear <tbody>, not the header)
    mappingTableBody.innerHTML = "";  // Only clear the tbody, not the header

    // Populate the table with the mapping (Original -> Encoded)
    randomMapping.forEach(pair => {
        const row = mappingTableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = pair.encoded;
        cell2.textContent = pair.original;
    });

    // Encode the message
    const encodedMessage = encodeMessage(phrase, randomMapping);
    
    // Display the encoded message
    output.innerHTML = `${encodedMessage}`;
    

    // Hide the input box and button, and show the print button
    const enHeader = document.getElementById('encodeHeader');
    enHeader.style.display = 'block';
    const charTable = document.getElementById('characterMappingTable');
    charTable.style.display = 'table';
    inputSection.style.display = 'none';
    output.style.display = 'inline';
    //encodedMessage.style.display = 'block';
    printButton.style.display = 'block';
}

// Function to handle printing the page
function printPage() {
		printButton.style.display = 'none';
    window.print();
}

// Event listener for the encode button
document.getElementById('encodeButton').addEventListener('click', displayResults);

// Event listener for the print button
document.getElementById('printButton').addEventListener('click', printPage);
