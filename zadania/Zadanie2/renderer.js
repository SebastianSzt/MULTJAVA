document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const hashButton = document.getElementById('hashButton');
    const hashedText = document.getElementById('hashedText');

    hashButton.addEventListener('click', () => {
        const text = inputText.value;
        window.api.send('hash-data', text);
    });

    window.api.receive('hash-data-response', (hash) => {
        hashedText.textContent = hash;
    });

    window.api.receive('keep-alive', (message) => {
        console.log(message);
    });
});
