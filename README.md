# Netrunner Tunnel Animation

A cyberpunk-inspired Single Page Application (SPA) featuring an interactive p5.js tunnel animation with real-time controls.

## Features

- **Interactive Tunnel Animation**: A 3D-style tunnel effect with perspective rendering
- **Real-time Controls**: Adjust colors, animation speed, tunnel size, and more
- **Wireframe Mode**: Toggle between solid and wireframe rendering
- **Cyberpunk Aesthetic**: Dark theme with neon green accents and glowing effects
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Shortcuts**: Quick controls for common actions

## Controls

### Visual Controls
- **Tunnel Color**: Change the color of the tunnel and effects
- **Background Color**: Modify the background color
- **Wireframe Mode**: Toggle between solid and wireframe rendering
- **Animation Speed**: Control how fast the tunnel moves (0.5x to 3.0x)
- **Tunnel Size**: Adjust the size of the tunnel (50 to 200)
- **Rotation Speed**: Control how fast the tunnel rotates (0 to 5.0)

### Keyboard Shortcuts
- **W**: Toggle wireframe mode
- **Space**: Pause/resume animation
- **R**: Reset all controls to defaults

## Getting Started

1. Open `index.html` in a web browser
2. Use the control panel on the right to adjust the animation
3. Try the keyboard shortcuts for quick control
4. Experiment with different color combinations for unique effects

## Technical Details

- **Framework**: Vanilla JavaScript with p5.js
- **Animation**: Real-time 3D-style tunnel with perspective projection
- **Effects**: Particle systems, data streams, and pulsing glow effects
- **Responsive**: CSS Grid layout that adapts to different screen sizes

## File Structure

```
netrunner/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── sketch.js           # p5.js animation logic
├── app.js              # Control panel interactions
└── README.md           # This file
```

## Browser Compatibility

- Modern browsers with ES6 support
- WebGL not required (uses 2D canvas)
- Responsive design works on mobile devices

## Customization

The animation can be easily customized by modifying the variables in `sketch.js`:
- `NUM_SEGMENTS`: Number of tunnel segments
- `SEGMENT_DISTANCE`: Distance between segments
- `BASE_RADIUS`: Base radius of the tunnel

Enjoy exploring the cyberpunk tunnel!
