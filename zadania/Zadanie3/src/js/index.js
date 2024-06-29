import { Motion } from '@capacitor/motion';

async function updateAccelerometer() {
    // Sprawdzanie uprawnień dla iOS 13+
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission !== 'granted') {
        console.error('Brak pozwolenia na korzystanie z akcelerometru');
        return;
        }
    }

    const updateAcceleration = (acceleration) => {
        document.getElementById('acceleration-x').textContent = acceleration.x.toFixed(2);
        document.getElementById('acceleration-y').textContent = acceleration.y.toFixed(2);
        document.getElementById('acceleration-z').textContent = acceleration.z.toFixed(2);
    };

    const updateAccelerationWithGravity = (accelerationWithGravity) => {
        document.getElementById('acceleration-gravity-x').textContent = accelerationWithGravity.x.toFixed(2);
        document.getElementById('acceleration-gravity-y').textContent = accelerationWithGravity.y.toFixed(2);
        document.getElementById('acceleration-gravity-z').textContent = accelerationWithGravity.z.toFixed(2);
    };

    const updateRotation = (rotation) => {
        document.getElementById('rotation-alpha').textContent = rotation.alpha.toFixed(2);
        document.getElementById('rotation-beta').textContent = rotation.beta.toFixed(2);
        document.getElementById('rotation-gamma').textContent = rotation.gamma.toFixed(2);
    };

    Motion.addListener('accel', event => {
        updateAcceleration(event.acceleration);
        updateAccelerationWithGravity(event.accelerationIncludingGravity);
    });
    
    Motion.addListener('orientation', event => {
        updateRotation(event);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateAccelerometer();
});
