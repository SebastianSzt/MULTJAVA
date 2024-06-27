document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const clickCount = document.getElementById('clickCount');

    let count = localStorage.getItem('clickCount') ? parseInt(localStorage.getItem('clickCount')) : 0;
    clickCount.textContent = count;

    clickButton.addEventListener('click', () => {
        count++;
        clickCount.textContent = count;
        localStorage.setItem('clickCount', count);
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./serviceWorker.js')
            .then(registration => {
                console.log('ServiceWorker zainstalowany:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker nie zainstalowany, zobacz co poszło nie tak: ', error);
            });
    }
});
