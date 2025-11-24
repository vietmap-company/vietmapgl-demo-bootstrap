# Bootstrap 5 Demo Project

This is a simple web project using Bootstrap 5.

## Setup

1. Replace `YOUR_API_KEY_HERE` in `js/script.js` and `heatmap.html` with your actual Vietmap API key.
2. Make sure the `data/VN34City.geojson` files are present in the `data` directory.

## Structure

- `index.html`: Main HTML file
- `css/style.css`: Custom styles
- `js/script.js`: Custom scripts

## Usage

You can run this project in two ways:

1. **Using VS Code Task:**
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux).
   - Type "Run Task" and select it.
   - Choose "Run Server" to start the local server.
   - Choose "Open in Browser" to view the main map.
   - Choose "Open Heatmap in Browser" to view the heatmap.

## Features

- **Administrative Map**: Displays Vietnam's administrative boundaries with random colors and tooltips.
- **Heatmap**: Visualizes data density using a heatmap layer (see `heatmap.html`).

