// Get portfolio data from localStorage
function getPortfolioData() {
    return JSON.parse(localStorage.getItem('portfolioData')) || {
        profile: {
            photo: 'https://placehold.co/400x400',
            dob: '',
            currentStatus: '',
            phone: '',
            email: ''
        },
        skills: [],
        experience: []
    };
}

// Update portfolio content
function updatePortfolioContent() {
    const data = getPortfolioData();
    
    // Update profile photo
    const profilePhoto = document.querySelector('.profile-photo img');
    if (profilePhoto) {
        profilePhoto.src = data.profile.photo;
    }

    // Update personal info
    const dobElement = document.querySelector('.value:first-of-type');
    const statusElement = document.querySelector('.value:last-of-type');
    if (dobElement) dobElement.textContent = data.profile.dob || '[Your Date of Birth]';
    if (statusElement) statusElement.textContent = data.profile.currentStatus || '[Your Current Status]';

    // Update skills
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = data.skills.map(skill => `
            <div class="skill-card" data-skill="${skill.title}">
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-title">${skill.title}</div>
                <div class="skill-level">${skill.level}%</div>
            </div>
        `).join('');
    }

    // Update experience
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        timeline.innerHTML = data.experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3>${exp.title}</h3>
                    <p class="date">${exp.duration}</p>
                    <p>${exp.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Update contact info
    const phoneElement = document.querySelector('.phone-icon + p');
    const emailElement = document.querySelector('.email-icon + p');
    if (phoneElement) phoneElement.textContent = data.profile.phone || '[Your Phone Number]';
    if (emailElement) emailElement.textContent = data.profile.email || '[Your Email Address]';
}

// Update content when page loads
document.addEventListener('DOMContentLoaded', updatePortfolioContent);