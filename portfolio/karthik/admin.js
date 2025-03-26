// Initialize data structure in localStorage if it doesn't exist
if (!localStorage.getItem('portfolioData')) {
    localStorage.setItem('portfolioData', JSON.stringify({
        profile: {
            photo: 'https://placehold.co/400x400',
            dob: '',
            currentStatus: '',
            phone: '',
            email: ''
        },
        skills: [],
        experience: []
    }));
}

// Load existing data
let portfolioData = JSON.parse(localStorage.getItem('portfolioData'));

// Helper function to save data
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// Load existing data into forms
function loadExistingData() {
    // Load profile data
    document.getElementById('profile-photo').value = portfolioData.profile.photo;
    document.getElementById('dob').value = portfolioData.profile.dob;
    document.getElementById('current-status').value = portfolioData.profile.currentStatus;
    document.getElementById('phone').value = portfolioData.profile.phone;
    document.getElementById('email').value = portfolioData.profile.email;

    // Render skills and experience
    renderSkills();
    renderExperience();
}

// Profile Form Handler
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    portfolioData.profile = {
        ...portfolioData.profile,
        photo: document.getElementById('profile-photo').value,
        dob: document.getElementById('dob').value,
        currentStatus: document.getElementById('current-status').value
    };
    saveData();
    alert('Profile updated successfully!');
});

// Skills Form Handler
const skillForm = document.getElementById('skill-form');
skillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSkill = {
        id: Date.now(),
        title: document.getElementById('skill-title').value,
        level: document.getElementById('skill-level').value,
        icon: document.getElementById('skill-icon').value
    };
    portfolioData.skills.push(newSkill);
    saveData();
    skillForm.reset();
    renderSkills();
    alert('Skill added successfully!');
});

// Experience Form Handler
const experienceForm = document.getElementById('experience-form');
experienceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newExperience = {
        id: Date.now(),
        title: document.getElementById('experience-title').value,
        duration: document.getElementById('experience-duration').value,
        description: document.getElementById('experience-description').value
    };
    portfolioData.experience.push(newExperience);
    saveData();
    experienceForm.reset();
    renderExperience();
    alert('Experience added successfully!');
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    portfolioData.profile.phone = document.getElementById('phone').value;
    portfolioData.profile.email = document.getElementById('email').value;
    saveData();
    alert('Contact information updated successfully!');
});

// Render Skills
function renderSkills() {
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    portfolioData.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'item-card';
        skillCard.innerHTML = `
            <div class="item-content">
                <h3>${skill.title}</h3>
                <p>Level: ${skill.level}% | Icon: ${skill.icon}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editSkill(${skill.id})">Edit</button>
                <button class="delete-btn" onclick="deleteSkill(${skill.id})">Delete</button>
            </div>
        `;
        skillsList.appendChild(skillCard);
    });
}

// Render Experience
function renderExperience() {
    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = '';
    portfolioData.experience.forEach(exp => {
        const expCard = document.createElement('div');
        expCard.className = 'item-card';
        expCard.innerHTML = `
            <div class="item-content">
                <h3>${exp.title}</h3>
                <p>${exp.duration}</p>
                <p>${exp.description}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editExperience(${exp.id})">Edit</button>
                <button class="delete-btn" onclick="deleteExperience(${exp.id})">Delete</button>
            </div>
        `;
        experienceList.appendChild(expCard);
    });
}

// Edit Skill
function editSkill(id) {
    const skill = portfolioData.skills.find(s => s.id === id);
    if (skill) {
        document.getElementById('skill-title').value = skill.title;
        document.getElementById('skill-level').value = skill.level;
        document.getElementById('skill-icon').value = skill.icon;
        
        // Change form button to update mode
        const submitBtn = skillForm.querySelector('button');
        submitBtn.textContent = 'Update Skill';
        
        // Remove the old skill
        deleteSkill(id, false);
        
        // Scroll to form
        skillForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Delete Skill
function deleteSkill(id, showAlert = true) {
    portfolioData.skills = portfolioData.skills.filter(s => s.id !== id);
    saveData();
    renderSkills();
    if (showAlert) alert('Skill deleted successfully!');
}

// Edit Experience
function editExperience(id) {
    const exp = portfolioData.experience.find(e => e.id === id);
    if (exp) {
        document.getElementById('experience-title').value = exp.title;
        document.getElementById('experience-duration').value = exp.duration;
        document.getElementById('experience-description').value = exp.description;
        
        // Change form button to update mode
        const submitBtn = experienceForm.querySelector('button');
        submitBtn.textContent = 'Update Experience';
        
        // Remove the old experience
        deleteExperience(id, false);
        
        // Scroll to form
        experienceForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Delete Experience
function deleteExperience(id, showAlert = true) {
    portfolioData.experience = portfolioData.experience.filter(e => e.id !== id);
    saveData();
    renderExperience();
    if (showAlert) alert('Experience deleted successfully!');
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadExistingData);