/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Data for the service cards. This makes it easy to edit or add more cards.
const cardData = [
  {
    id: 1,
    icon: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.4776 16.0124C19.4001 14.3624 20.45 12.0624 20.45 9.75C20.45 5.5625 16.9125 2.05 12.65 2.05C10.9 2.05 9.2875 2.6125 7.975 3.5625C7.975 3.5625 7.975 3.5625 7.9625 3.575C7.975 3.575 7.975 3.575 7.975 3.575C7.975 3.575 9.175 4.3875 9.925 5.375C10.6625 6.35 10.95 7.375 10.95 8.1625C10.95 8.875 10.7125 9.4875 10.35 10.025C10.275 10.1375 10.1875 10.25 10.1 10.35C9.52503 11.1375 8.71253 11.6 7.97503 11.75C7.30003 11.8875 6.66253 11.7625 6.13753 11.45C5.40003 11.025 4.90003 10.2875 4.80003 9.425C4.78753 9.325 4.78753 9.225 4.78753 9.125C4.78753 9.025 4.78753 8.925 4.78753 8.825C5.16253 6.95 6.38753 5.4125 8.01253 4.5C9.28753 3.8 10.9125 3.425 12.65 3.425C16.125 3.425 19.0625 6.275 19.0625 9.75C19.0625 11.575 18.275 13.25 17.0125 14.4125L10.375 21.05C10.375 21.05 10.375 21.05 10.3625 21.05C10.3625 21.05 10.3625 21.05 10.3625 21.05C11.5375 21.875 13.525 21.9625 15.0125 20.475L17.4776 16.0124Z"/>
        <path d="M10.3625 21.05C8.875 22.5375 6.8875 22.625 5.7125 21.8C4.5375 20.975 4.45 18.9875 5.9375 17.5L12.575 10.8625C12.575 10.8625 12.575 10.8625 12.5875 10.8625C12.5875 10.8625 12.5875 10.8625 12.5875 10.8625L10.3625 21.05Z"/>
      </svg>
    `,
    title: 'Modern iOS apps',
    subtitle: 'Cruising from Swift to AppStore.',
  },
  {
    id: 2,
    icon: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.333 2H4.667C3.194 2 2 3.194 2 4.667V19.333C2 20.806 3.194 22 4.667 22H19.333C20.806 22 22 20.806 22 19.333V4.667C22 3.194 20.806 2 19.333 2ZM8.281 16.994H5.219V7H8.281V16.994ZM12.923 16.994H9.861V7H12.923C15.115 7 16.51 8.358 16.51 10.497C16.51 12.636 15.115 14.006 12.923 14.006V16.994ZM12.923 12.449H11.418V8.551H12.923C14.085 8.551 14.802 9.244 14.802 10.497C14.802 11.75 14.085 12.449 12.923 12.449Z"/>
      </svg>
    `,
    title: 'No-code websites',
    subtitle: 'Vibrant designs with Webflow.',
  },
  {
    id: 3,
    icon: `
      <svg viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12C8 14.2091 6.20914 16 4 16V8C6.20914 8 8 9.79086 8 12Z"/>
        <path d="M8 4C8 6.20914 6.20914 8 4 8V0C6.20914 0 8 1.79086 8 4Z" />
        <path d="M4 16C1.79086 16 0 17.7909 0 20C0 22.2091 1.79086 24 4 24V16Z" />
        <path d="M12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16V8Z" />
        <path d="M8 12C8 9.79086 9.79086 8 12 8V16C9.79086 16 8 14.2091 8 12Z"/>
      </svg>
    `,
    title: 'Delish UI',
    subtitle: 'Crafting products with Figma.',
  },
];

function App() {
  const container = document.getElementById('card-container');
  if (!container) return;

  // Create and append cards to the container
  cardData.forEach(data => {
    const card = document.createElement('div');
    card.className = `card card-${data.id}`;
    card.setAttribute('role', 'group');
    card.setAttribute('aria-label', `${data.title}: ${data.subtitle}`);

    card.innerHTML = `
      <div class="card-glow" aria-hidden="true"></div>
      <div class="card-content">
        <div class="card-icon" aria-hidden="true">${data.icon}</div>
        <div>
          <h2 class="card-title">${data.title}</h2>
          <p class="card-subtitle">${data.subtitle}</p>
        </div>
      </div>
    `;
    
    container.appendChild(card);
  });

  // Add mouse move event listener to all cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const htmlCard = card as HTMLElement;
      htmlCard.style.setProperty('--mouse-x', `${x}px`);
      htmlCard.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Run the App
App();
