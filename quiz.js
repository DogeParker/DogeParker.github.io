const questions = [
  ["What type of tasks do you enjoy most?", "A) Solving problems or puzzles", "B) Helping and listening to others", "C) Building or fixing things", "D) Creating art, music, or writing", "E) Planning, organizing or managing"],
  ["Which environment sounds most appealing to you?", "A) A busy office with collaboration", "B) A quiet space for focus", "C) Outdoors or hands-on workshop", "D) A flexible creative studio", "E) Structured and rules-based workplace"],
  ["How do you prefer to work?", "A) In a team with interaction", "B) Alone with minimal distractions", "C) With tools or equipment", "D) In a frequently changing role", "E) Following a routine and checklist"],
  ["Which school subject did you enjoy the most?", "A) Math or science", "B) Literature or art", "C) Social studies or psychology", "D) Business or economics", "E) Tech or computer science"],
  ["What motivates you most in a job?", "A) Solving complex problems", "B) Helping others and making a difference", "C) Seeing physical results", "D) Expressing creativity", "E) Stability and structure"],
  ["How do you handle change?", "A) I adapt easily", "B) I prefer plans, but I adapt", "C) I prefer predictability", "D) I thrive in fast-paced change", "E) I need time but manage it"],
  ["What’s most important in your work-life balance?", "A) Flexibility and creativity", "B) Feeling valued", "C) Job security", "D) Growth opportunities", "E) Independence"],
  ["Which activity sounds most appealing?", "A) Designing or writing", "B) Fixing a mechanical issue", "C) Supporting others", "D) Finding patterns in data", "E) Leading a team"],
  ["What kind of impact do you want?", "A) Beautify or inspire", "B) Improve lives", "C) Build or maintain things", "D) Help businesses work better", "E) Solve intellectual problems"],
  ["What’s your biggest strength?", "A) Creativity", "B) Empathy", "C) Problem-solving", "D) Attention to detail", "E) Practical skills"]
];

let currentQuestion = 0;
const answers = new Array(questions.length).fill(null);

const questionText = document.getElementById("question-text");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");



function renderQuestion(index) {
  questionText.textContent = questions[index][0];

  const radios = document.querySelectorAll('input[name="option"]');
  radios.forEach(radio => {
    radio.checked = false;
  });

  document.getElementById("lab1").innerHTML = questions[currentQuestion][1]; 
  document.getElementById("lab2").innerHTML = questions[currentQuestion][2]; 
  document.getElementById("lab3").innerHTML = questions[currentQuestion][3]; 
  document.getElementById("lab4").innerHTML = questions[currentQuestion][4]; 
  document.getElementById("lab5").innerHTML = questions[currentQuestion][5]; 
  
  if(answers[index] > 0){
	  document.getElementById(`opt${answers[index]}`).checked = true;
  }

  backBtn.disabled = index === 0;
  nextBtn.textContent = index === questions.length - 1 ? "Finish" : "Next";
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    answers[currentQuestion] = selected.value;
  }
}

backBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
});

nextBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  } else {
    console.log(recommendJobs(answers));

    document.body.innerHTML = `
    <style>
      
    * {
	box-sizing: border-box;
}

body {
	display: flex;
	justify-content: center;
  	height: 100vh;
	padding: 0;
	margin: 0;
	background-color: #cbcbcb;
	line-height: 1;
	font-family: 'Roboto Mono', 'sans-serif;';
}
.alk {
	align-items: center;
}

header {
	background-color: #1e2533;
	padding: 30px;
    margin: 0px;
    width: 100%;
	text-align: left;
}
.navi {
	font-size: 28px;
	color:#A65D78;
}
.window {
	display: flex;
	justify-content: center;
	align-items: center;
	width: calc(100% - 20px);
	border-radius: 15px;
	margin: 10px;
	padding: 10px;
	height: 250px;
	background: #fff;
}
.windowd {
	display: flex;
	justify-content: center;
	align-items: center;
	width: calc(100% - 20px);
	border-radius: 15px;
	margin: 10px;
	padding: 10px;
	height: 50px;
	background: #fff;
}
input[type=text] {
	font-family: 'Roboto Mono';
	width: 115px;
	margin-top: 5px;
	padding: 3px;
	border-radius: 5px;
	border: inset;
}
h1 {
	font-size: 50px;
	color:#F27798;
}
.yks {
	font-size: 22;
}
.mainHeader {
	font-size: px;
	color:#333;
}
.mainHeader2 {
	font-size: 28px;
	color:#333;
}
div.a {
	font-size: 22px;
	color:#F2F0F0;
}
button {
	margin-top: 20px;
	font-family: 'Roboto Mono', sans-serif;
	padding: 10px 20px;
	font-size: 1rem;
	border-radius: 5px;
	border: none;
	background-color: #1e90ff;
	color: white;
	cursor: pointer;
  }
p {
	font-size: 22px;
	color:#F2F0F0;
}
h1 {
	font-size: 50px;
	color:#F27798;
}
h2 {
	font-size: 28px;
	color:#333;
}
div.a {
	font-size: 22px;
	color:#F2F0F0;
}
button {
	margin-top: 5px;
	margin-bottom: 5px;
	font-family: 'Roboto Mono';
}
.container {
	width: 100%;
 	display: flex;
	flex-direction: column;
  	align-items: center;
}

</style>
    
    </div><div class="container"> <div class="windowd">	<h2 class="mainHeader">Your Job is...</h2> </div>	<div class='window'>	<h2 class="mainHeader">
    
    
    ${Math.random()<0.2?"HOMELESS":recommendJobs(answers)[0]} <br>
    ${recommendJobs(answers)[1]} <br>
    ${recommendJobs(answers)[2]} <br>
    ${recommendJobs(answers)[3]} <br>
    ${recommendJobs(answers)[4]} <br>
    
    
    
    </h2>	</div></div>`;

    document.getElementById("styling").innerText = `
  
`
    
    
    
    
    
    
    
  }
});

renderQuestion(currentQuestion);
//End of quiz html

// Categories:
// 1 - Technical
// 2 - Creative
// 3 - Social/Helping
// 4 - Business
// 5 - Hands-On

const jobs = [
  // Technical Jobs (Category 1)
  "Software Engineer", "Data Scientist", "Web Developer", "IT Specialist", "AI Researcher",
  "Network Administrator", "Cloud Engineer", "DevOps Engineer", "Game Developer", "Database Administrator",
  "Cybersecurity Analyst", "Computer Vision Engineer", "System Architect", "Machine Learning Engineer",
  "Mobile App Developer", "Computer Programmer", "Embedded Systems Engineer", "Bioinformatics Analyst",
  "IT Project Manager", "Technical Writer", "Hardware Engineer", "Robotics Engineer", "Penetration Tester",
  "Site Reliability Engineer", "Blockchain Developer", "Augmented Reality Developer", "Cloud Security Engineer",
  "VR Developer", "Search Engine Engineer", "E-commerce Developer", "Automation Engineer",
  "Software Tester", "Backend Developer", "Frontend Developer", "Data Engineer", "Cryptographer",
  "Game Tester", "Information Security Manager", "Digital Forensics Analyst", "QA Engineer",
  "AR/VR Product Manager", "AI Ethicist", "Computational Linguist", "Web3 Developer",
  "Technology Consultant", "Tech Support Engineer", "Firmware Developer", "3D Software Engineer",
  "Satellite Communications Engineer", "UX Developer", "Code Auditor", "IoT Developer",
  "HPC Engineer", "Network Security Engineer", "Platform Engineer", "Biotech Software Engineer",
  "Simulation Developer", "Quantum Software Developer", "System Integrator", "VR Content Engineer",
  "Software Localization Specialist", "Neural Network Specialist", "Data Privacy Officer", "Logistics Software Developer",
  "Automation Tester", "API Developer", "VR Audio Engineer", "Scientific Programmer", "Mobile Security Engineer",
  "Web Infrastructure Engineer", "Tech Product Manager", "Platform Architect", "Dev Tools Engineer",
  "CI/CD Engineer", "Digital Twin Developer", "SaaS Engineer", "Security Architect",
  "Speech Recognition Engineer", "Machine Vision Engineer", "Software Deployment Specialist",
  "Voice Interface Developer", "Big Data Architect", "AI Trainer", "Cloud Platform Consultant",
  "Multimedia Programmer", "Geospatial Software Engineer", "Bioengineering Programmer",
  "Edge Computing Developer", "Smart Device Developer", "Graphics Programmer", "Simulation Architect",
  "Chatbot Developer", "Ethical Hacker", "Sensor Software Engineer", "Control Systems Engineer",
  "Human-Computer Interaction Researcher", "Algorithm Engineer", "Compiler Developer",
  "Accessibility Software Engineer", "Code Security Analyst",

  // Creative Jobs (Category 2)
  "Graphic Designer", "UI/UX Designer", "Animator", "Illustrator", "Photographer",
  "Filmmaker", "Fashion Designer", "Interior Designer", "Music Producer", "Creative Director",
  "Copywriter", "Art Director", "Video Editor", "Sound Designer", "3D Artist",
  "Concept Artist", "Set Designer", "Scriptwriter", "Motion Graphics Designer", "Makeup Artist",
  "Voice Actor", "Web Designer", "Game Designer", "Fine Artist", "Painter",
  "Brand Strategist", "Content Creator", "YouTuber", "Twitch Streamer", "TikTok Influencer",
  "Stage Director", "Magazine Editor", "Book Illustrator", "Cartoonist", "Muralist",
  "Tattoo Artist", "Creative Technologist", "Virtual Stylist", "Lighting Designer", "Podcast Producer",
  "Social Media Content Designer", "Costume Designer", "Sound Mixer", "Sculptor", "Installation Artist",
  "Creative Marketer", "Blogger", "Digital Artist", "Visual Effects Artist", "Augmented Reality Artist",
  "Fashion Blogger", "Lifestyle Influencer", "Vlogger", "Cinematographer", "Journalist",
  "Art Therapist", "Voiceover Artist", "Typographer", "Music Composer", "Mobile App Designer",
  "Interactive Designer", "Multimedia Artist", "Editorial Illustrator", "Screenwriter",
  "Production Designer", "Game Storyboard Artist", "Stage Makeup Artist", "Fashion Stylist",
  "Hairstylist", "Calligrapher", "Visual Storyteller", "Cultural Curator", "Museum Exhibit Designer",
  "Narrative Designer", "Logo Designer", "Character Designer", "Creative Consultant",
  "AR Interface Designer", "VR Experience Designer", "Experience Designer", "Digital Journalist",
  "Content Strategist", "Design Researcher", "Brand Designer", "Environment Designer",
  "Industrial Designer", "Furniture Designer", "Creative Writer", "Film Critic", "Voice Narrator",
  "Design Lead", "Sketch Artist", "Social Media Designer", "Production Artist",
  "Gaming Animator", "Package Designer", "3D Visualizer", "Event Decor Designer",

  // Social/Helping Jobs (Category 3)
  "Teacher", "Nurse", "Social Worker", "Psychologist", "Counselor",
  "Therapist", "Career Coach", "Rehabilitation Specialist", "Community Organizer", "Humanitarian Aid Worker",
  "Childcare Worker", "Youth Mentor", "School Counselor", "Healthcare Assistant", "Marriage Counselor",
  "Guidance Counselor", "Life Coach", "Speech Therapist", "Mental Health Worker", "Geriatric Caregiver",
  "Special Education Teacher", "Nonprofit Program Manager", "Disability Advocate", "Foster Care Specialist",
  "Family Therapist", "Educational Consultant", "Substance Abuse Counselor", "Medical Social Worker",
  "Adoption Specialist", "Crisis Counselor", "Occupational Therapist", "Case Manager",
  "Child Advocate", "Victim Advocate", "Community Health Worker", "Bereavement Counselor",
  "Public Health Educator", "Cultural Liaison", "Hospital Chaplain", "Youth Program Director",
  "Prison Counselor", "Veteran Support Specialist", "Health Educator", "Support Group Facilitator",
  "Refugee Support Worker", "Charity Worker", "Disaster Response Coordinator", "School Psychologist",
  "Mental Wellness Coach", "Inclusion Specialist", "Domestic Violence Counselor", "Hospice Worker",
  "Peer Support Specialist", "Therapeutic Recreation Specialist", "Community Outreach Worker",
  "Immigration Case Worker", "Addiction Recovery Coach", "Human Services Worker",
  "Social Justice Educator", "Volunteer Coordinator", "Public Advocate", "Group Home Worker",
  "Sexual Health Educator", "Trauma Therapist", "Disability Services Coordinator", "Neighborhood Mediator",
  "Community Caseworker", "Community Services Director", "Policy Advocate", "Health Equity Officer",
  "Social Impact Analyst", "Educational Outreach Specialist", "Youth Case Manager",
  "Homeless Services Coordinator", "Elder Care Specialist", "At-Risk Youth Mentor",
  "Inclusive Education Coach", "Therapeutic Tutor", "Patient Navigator", "Grief Counselor",
  "Behavioral Health Specialist", "Child Protection Worker", "Faith-Based Counselor",
  "Domestic Program Advisor", "Psychiatric Aide", "Veteran Outreach Worker", "NGO Field Officer",
  "Developmental Therapist", "Rural Health Worker", "School Program Advisor", "Autism Specialist",
  "Anti-Bullying Specialist", "Community Program Leader", "Spiritual Advisor",
  "Student Wellness Counselor", "Home Healthcare Worker",

  // Business Jobs (Category 4)
  "Accountant", "Financial Analyst", "Marketing Manager", "Sales Manager", "Project Manager",
  "Business Analyst", "Operations Manager", "HR Manager", "Recruiter", "Entrepreneur",
  "Consultant", "Product Manager", "Investment Banker", "Actuary", "Economist",
  "Auditor", "Real Estate Agent", "Insurance Broker", "Business Developer", "Management Analyst",
  "E-commerce Manager", "Public Relations Officer", "Customer Success Manager", "Brand Manager",
  "Chief Executive Officer", "Chief Financial Officer", "Venture Capital Analyst", "Franchise Owner",
  "Corporate Trainer", "Procurement Manager", "Retail Manager", "Media Buyer",
  "Market Research Analyst", "Budget Analyst", "Talent Acquisition Specialist",
  "Sales Engineer", "Advertising Executive", "Merchandising Manager", "Event Planner",
  "Business Operations Analyst", "Digital Marketing Manager", "Growth Hacker", "Pricing Analyst",
  "Sustainability Officer", "Corporate Strategist", "Logistics Manager", "Supply Chain Analyst",
  "Retail Buyer", "Client Services Manager", "Account Executive", "B2B Sales Manager",
  "Startup Founder", "Chief Operations Officer", "Import/Export Specialist",
  "Procurement Specialist", "Financial Planner", "Credit Analyst", "Stockbroker",
  "Business Intelligence Analyst", "Lead Generator", "Revenue Manager", "Advertising Manager",
  "Promotions Coordinator", "Sales Trainer", "Real Estate Developer", "Operations Consultant",
  "Contract Negotiator", "B2C Manager", "Business Lawyer", "Corporate Communications Officer",
  "Product Marketer", "Change Manager", "Retail Analyst", "Startup Advisor",
  "Product Owner", "HR Specialist", "Policy Advisor", "Business Coach", "Digital Product Manager",
  "Event Marketing Specialist", "Insurance Underwriter", "Office Manager",
  "HR Generalist", "Payroll Specialist", "International Business Specialist",
  "Public Sector Consultant", "Fleet Manager", "E-commerce Strategist",
  "Customer Relations Officer", "Market Entry Strategist", "Media Strategist",
  "Financial Risk Analyst", "Performance Analyst", "Strategic Partnerships Manager",

  // Hands-On Jobs (Category 5)
  "Electrician", "Plumber", "Mechanic", "Carpenter", "Chef",
  "Construction Worker", "Welder", "HVAC Technician", "Truck Driver", "Farmer",
  "Machinist", "Heavy Equipment Operator", "Landscaper", "Barber", "Beautician",
  "Auto Detailer", "Painter (Building)", "Roofing Contractor", "Butcher", "Line Cook",
  "Forklift Operator", "Crane Operator", "Mason", "Cabinet Maker", "Blacksmith",
  "Textile Worker", "Maintenance Technician", "Drywall Installer", "Pest Control Technician",
  "Steelworker", "Boilermaker", "Millwright", "Glazier", "Fence Installer",
  "Seamstress", "Tile Setter", "Appliance Repair Technician", "Diesel Mechanic",
  "Bicycle Mechanic", "Gunsmith", "Boat Mechanic", "Motorcycle Mechanic",
  "Construction Foreman", "HVAC Installer", "Floor Installer", "Irrigation Technician",
  "Custom Woodworker", "Tree Surgeon", "Gravedigger", "Stone Carver", "Locksmith",
  "Stagehand", "Rigging Technician", "Scaffold Builder", "Furniture Restorer",
  "Wind Turbine Technician", "Solar Panel Installer", "Backhoe Operator", "Snow Plow Driver",
  "Power Plant Technician", "Gas Fitter", "Handyman", "Demolition Worker",
  "Waterproofing Technician", "Elevator Installer", "Maintenance Engineer",
  "Automotive Glass Installer", "Sandblaster", "Boat Builder", "Fabricator",
  "Railroad Worker", "Foundry Worker", "Sheet Metal Worker", "Pipeline Welder",
  "Tractor Operator", "Printing Press Operator", "Roofer", "Oil Rig Worker",
  "Mold Maker", "Insulation Installer", "Tool and Die Maker", "Paver",
  "CNC Machinist", "Tile Grout Specialist", "Window Installer", "Sawmill Operator",
  "Cemetery Groundskeeper", "Commercial Diver", "Aircraft Mechanic", "Warehouse Picker",
  "Masonry Restoration Specialist", "Mechanical Assembler", "Fireplace Installer",
  "HVAC Inspector", "Elevator Mechanic", "Structural Ironworker"
];

function getDominantCategory(answers) {
  const scores = [0, 0, 0, 0, 0];
  for (let ans of answers) {
    if (ans >= 1 && ans <= 5) scores[ans - 1]++;
  }
  const maxScore = Math.max(...scores);
  const bestIndex = scores.findIndex(score => score === maxScore);
  return bestIndex + 1; // Category 1 to 5
}

function recommendJobs(answers, topN = 10) {
  const category = getDominantCategory(answers);
  const startIndex = (category - 1) * 100;
  const jobsInCategory = jobs.slice(startIndex, startIndex + 100);
  // Shuffle
  for (let i = jobsInCategory.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [jobsInCategory[i], jobsInCategory[j]] = [jobsInCategory[j], jobsInCategory[i]];
  }
  return jobsInCategory.slice(0, topN);
}
