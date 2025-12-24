# Countdown Apps

A modern, responsive web application for creating and managing multiple countdown timers. Perfect for tracking events, deadlines, and special occasions.

## Features

- **Multiple Countdowns**: Create unlimited countdown timers for different events
- **Real-time Updates**: Live countdown display that updates every second
- **Color Themes**: Choose from 5 different color themes for each countdown
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Countdowns persist between browser sessions
- **Event Management**: Easy creation and deletion of countdown events
- **Intuitive Interface**: Clean, modern UI with smooth animations

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser to** `http://localhost:3000`

## Usage

1. **Create a Countdown:**
   - Enter an event name (e.g., "New Year 2025")
   - Select a target date and time
   - Choose a color theme
   - Click "Create Countdown"

2. **Manage Countdowns:**
   - View all active countdowns in a responsive grid
   - Each countdown shows days, hours, minutes, and seconds remaining
   - Delete countdowns using the × button
   - Expired events are automatically highlighted

## Build

```bash
npm run build
```

## Technologies Used

- **Vite** - Fast build tool and development server
- **Vanilla JavaScript** - Modern ES6+ features
- **CSS Grid & Flexbox** - Responsive layout design
- **LocalStorage API** - Client-side data persistence
- **CSS Custom Properties** - Theme management
