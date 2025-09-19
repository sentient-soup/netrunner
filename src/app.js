document.addEventListener('DOMContentLoaded', function() {
  const tunnelColorInput = document.getElementById('tunnel-color');
  const backgroundColorInput = document.getElementById('background-color');
  const wireframeToggle = document.getElementById('wireframe-toggle');
  const speedSlider = document.getElementById('speed-slider');
  const speedValue = document.getElementById('speed-value');
  const tunnelSizeSlider = document.getElementById('tunnel-size');
  const sizeValue = document.getElementById('size-value');
  const rotationSpeedSlider = document.getElementById('rotation-speed');
  const rotationValue = document.getElementById('rotation-value');

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  tunnelColorInput.addEventListener('input', function() {
    const rgb = hexToRgb(this.value);
    if (rgb && typeof updateTunnelColor === 'function') updateTunnelColor(rgb.r, rgb.g, rgb.b);
  });

  backgroundColorInput.addEventListener('input', function() {
    const rgb = hexToRgb(this.value);
    if (rgb && typeof updateBackgroundColor === 'function') updateBackgroundColor(rgb.r, rgb.g, rgb.b);
  });

  wireframeToggle.addEventListener('change', function() {
    if (typeof toggleWireframe === 'function') toggleWireframe(this.checked);
  });

  speedSlider.addEventListener('input', function() {
    const speed = parseFloat(this.value);
    speedValue.textContent = speed.toFixed(1) + 'x';
    if (typeof updateAnimationSpeed === 'function') updateAnimationSpeed(speed);
  });

  tunnelSizeSlider.addEventListener('input', function() {
    const size = parseInt(this.value);
    sizeValue.textContent = size;
    if (typeof updateTunnelSize === 'function') updateTunnelSize(size);
  });

  rotationSpeedSlider.addEventListener('input', function() {
    const speed = parseFloat(this.value);
    rotationValue.textContent = speed.toFixed(1);
    if (typeof updateRotationSpeed === 'function') updateRotationSpeed(speed);
  });

  const controlGroups = document.querySelectorAll('.control-group');
  controlGroups.forEach(group => {
    group.addEventListener('mouseenter', function() {
      this.style.borderColor = 'rgba(0, 255, 136, 0.6)';
      this.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.3)';
    });
    group.addEventListener('mouseleave', function() {
      this.style.borderColor = 'rgba(0, 255, 136, 0.3)';
      this.style.boxShadow = 'none';
    });
  });

  const title = document.querySelector('header h1');
  title.addEventListener('mouseenter', function() { this.classList.add('glitch'); });
  title.addEventListener('mouseleave', function() { this.classList.remove('glitch'); });

  speedValue.textContent = speedSlider.value + 'x';
  sizeValue.textContent = tunnelSizeSlider.value;
  rotationValue.textContent = rotationSpeedSlider.value;

  document.addEventListener('keydown', function(event) {
    switch(event.key) {
      case 'w':
      case 'W':
        wireframeToggle.checked = !wireframeToggle.checked;
        wireframeToggle.dispatchEvent(new Event('change'));
        break;
      case ' ':
        event.preventDefault();
        if (typeof updateAnimationSpeed === 'function') {
          const currentSpeed = parseFloat(speedSlider.value);
          if (currentSpeed > 0) {
            speedSlider.value = 0;
            updateAnimationSpeed(0);
            speedValue.textContent = '0.0x';
          } else {
            speedSlider.value = 1;
            updateAnimationSpeed(1);
            speedValue.textContent = '1.0x';
          }
        }
        break;
      case 'r':
      case 'R':
        tunnelColorInput.value = '#00ff88';
        backgroundColorInput.value = '#000011';
        wireframeToggle.checked = false;
        speedSlider.value = 1;
        tunnelSizeSlider.value = 100;
        rotationSpeedSlider.value = 1;
        tunnelColorInput.dispatchEvent(new Event('input'));
        backgroundColorInput.dispatchEvent(new Event('input'));
        wireframeToggle.dispatchEvent(new Event('change'));
        speedSlider.dispatchEvent(new Event('input'));
        tunnelSizeSlider.dispatchEvent(new Event('input'));
        rotationSpeedSlider.dispatchEvent(new Event('input'));
        break;
    }
  });
});


