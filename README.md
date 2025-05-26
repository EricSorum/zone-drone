# Zone Drone Chrome Extension

A helpful Chrome extension that reminds you to specify timezones when typing times in emails or forms.

## Features

- Automatically detects when you type a time without specifying a timezone
- Shows a cute animated drone with a friendly reminder
- Works on any website with text inputs or textareas
- Non-intrusive and helpful design

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the folder containing the extension files

## How it Works

The extension monitors text input fields and textareas for time patterns. When it detects a time without a timezone specification, a small drone will appear with a friendly reminder to add the timezone.

The extension looks for common timezone indicators like:
- "timezone"
- "time zone"
- "tz"
- "UTC"
- "GMT"

## Development

The extension consists of three main files:
- `manifest.json`: Extension configuration
- `content.js`: Main logic for time detection and drone animation
- `styles.css`: Styling for the drone and animations

## License

MIT License 