import './style.css'

class CountdownApp {
  constructor() {
    this.countdowns = JSON.parse(localStorage.getItem('countdowns')) || [];
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderCountdowns();
    this.startUpdateLoop();
  }

  bindEvents() {
    const form = document.getElementById('countdown-form');
    form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('countdown-name').value;
    const date = document.getElementById('countdown-date').value;
    const color = document.getElementById('countdown-color').value;
    
    if (!name || !date) {
      alert('Please fill in all fields');
      return;
    }

    const targetDate = new Date(date);
    if (targetDate <= new Date()) {
      alert('Please select a future date');
      return;
    }

    const countdown = {
      id: Date.now(),
      name,
      targetDate: targetDate.toISOString(),
      color,
      created: new Date().toISOString()
    };

    this.countdowns.push(countdown);
    this.saveCountdowns();
    this.renderCountdowns();
    
    // Reset form
    e.target.reset();
  }

  deleteCountdown(id) {
    this.countdowns = this.countdowns.filter(countdown => countdown.id !== id);
    this.saveCountdowns();
    this.renderCountdowns();
  }

  saveCountdowns() {
    localStorage.setItem('countdowns', JSON.stringify(this.countdowns));
  }

  calculateTimeRemaining(targetDate) {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { expired: false, days, hours, minutes, seconds };
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  createCountdownCard(countdown) {
    const timeRemaining = this.calculateTimeRemaining(countdown.targetDate);
    const isExpired = timeRemaining.expired;
    
    return `
      <div class="countdown-card ${countdown.color} ${isExpired ? 'countdown-expired' : ''}" data-id="${countdown.id}">
        <div class="countdown-header">
          <div class="countdown-name">${countdown.name}</div>
          <button class="delete-btn" onclick="app.deleteCountdown(${countdown.id})" title="Delete countdown">×</button>
        </div>
        
        <div class="countdown-display">
          <div class="time-unit">
            <span class="time-value">${timeRemaining.days.toString().padStart(2, '0')}</span>
            <span class="time-label">Days</span>
          </div>
          <div class="time-unit">
            <span class="time-value">${timeRemaining.hours.toString().padStart(2, '0')}</span>
            <span class="time-label">Hours</span>
          </div>
          <div class="time-unit">
            <span class="time-value">${timeRemaining.minutes.toString().padStart(2, '0')}</span>
            <span class="time-label">Minutes</span>
          </div>
          <div class="time-unit">
            <span class="time-value">${timeRemaining.seconds.toString().padStart(2, '0')}</span>
            <span class="time-label">Seconds</span>
          </div>
        </div>
        
        <div class="countdown-target">
          Target: ${this.formatDate(countdown.targetDate)}
        </div>
      </div>
    `;
  }

  renderCountdowns() {
    const container = document.getElementById('countdowns-list');
    
    if (this.countdowns.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No countdowns yet</h3>
          <p>Create your first countdown above to get started!</p>
        </div>
      `;
      return;
    }

    // Sort countdowns by target date (soonest first)
    const sortedCountdowns = [...this.countdowns].sort((a, b) => 
      new Date(a.targetDate) - new Date(b.targetDate)
    );

    container.innerHTML = sortedCountdowns
      .map(countdown => this.createCountdownCard(countdown))
      .join('');
  }

  updateCountdowns() {
    if (this.countdowns.length > 0) {
      this.renderCountdowns();
    }
  }

  startUpdateLoop() {
    // Update every second
    setInterval(() => {
      this.updateCountdowns();
    }, 1000);
  }
}

// Initialize the app
const app = new CountdownApp();

// Make app globally accessible for event handlers
window.app = app;

// Set default datetime to 1 hour from now
const now = new Date();
now.setHours(now.getHours() + 1);
const defaultDateTime = now.toISOString().slice(0, 16);
document.getElementById('countdown-date').value = defaultDateTime;