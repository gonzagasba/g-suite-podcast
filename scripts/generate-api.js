const fs = require('fs');
const path = require('path');

function generateAPI() {
  console.log('Generating API endpoints...');
  
  // Sample episode data with AIDA writeups
  const episodes = [
    {
      id: 1,
      season: "ONE",
      guest: "Todd Finkle",
      episode: 1,
      duration: "52:30",
      date: "2023-09-01",
      link: "https://g-suite.castos.com/episodes/g-suite-episode-1-todd-finkle",
      themes: ["Entrepreneurship & Innovation", "Academic Excellence"],
      tags: ["WarrenBuffett", "Entrepreneurship", "Investing", "BusinessEducation"],
      location: {
        city: "Spokane",
        state: "WA",
        country: "USA",
        lat: 47.6587,
        lng: -117.4260
      },
      shortDesc: "Warren Buffett expert reveals entrepreneurial secrets that traditional investment books miss",
      featured: true,
      aidaWriteup: {
        attention: "What if the secret to wealth building isn't just studying Warren Buffett's investments, but understanding his entrepreneurial mindset?",
        interest: "Todd Finkle, Gonzaga's Pigott Professor of Entrepreneurship, brings 34 years of teaching experience and a personal relationship with the 'Oracle of Omaha.' His national award-winning book reveals entrepreneurial insights that traditional investment books completely miss.",
        desire: "Finkle's unique perspective comes from more than academic study—he's founded five successful companies himself and created entrepreneurship programs that rank among the top 37 nationally.",
        action: "Discover the entrepreneurial secrets that Warren Buffett doesn't share in his annual letters—insights that could reshape your approach to business, investing, and personal success."
      }
    },
    {
      id: 8,
      season: "ONE",
      guest: "Monica Marmolejo (BBA '11)",
      episode: 8,
      duration: "52:45",
      date: "2023-10-27",
      link: "https://g-suite.castos.com/episodes/episode-8-monica-marmolejo",
      themes: ["Finance & Accounting", "Sports & Entertainment"],
      tags: ["FirstGenerationCollege", "SportsFinance", "BaseballBusiness", "SeattleMariners"],
      location: {
        city: "Seattle",
        state: "WA",
        country: "USA",
        lat: 47.6062,
        lng: -122.3321
      },
      shortDesc: "First-generation college student becomes Seattle Mariners Controller",
      featured: true,
      aidaWriteup: {
        attention: "What does it take for a first-generation college student to become the Controller for a Major League Baseball team?",
        interest: "Monica Marmolejo's path from high school relocation to managing finances for the Seattle Mariners offers both inspiration and practical strategies for overcoming systemic barriers through education and determination.",
        desire: "Her experience in sports business operations reveals the financial complexities of professional athletics and the strategic thinking required to manage multi-million-dollar operations.",
        action: "Whether you're a first-generation student, working in sports business, or seeking inspiration about overcoming obstacles, this episode provides both motivation and actionable strategies for transformational success."
      }
    },
    {
      id: 7,
      season: "ONE",
      guest: "Julie Frye (BBA '03)",
      episode: 7,
      duration: "44:12",
      date: "2023-10-20",
      link: "https://g-suite.castos.com/episodes/episode-7-julie-frye",
      themes: ["Finance & Accounting", "Social Impact"],
      tags: ["ImpactInvesting", "GlobalFinance", "JesuitVolunteerCorps", "SocialImpact"],
      location: {
        city: "Seattle",
        state: "WA",
        country: "USA",
        lat: 47.6062,
        lng: -122.3321
      },
      shortDesc: "From Jesuit Volunteer Corps service to Gates Foundation strategic investments",
      featured: true,
      aidaWriteup: {
        attention: "How does someone transition from Jesuit Volunteer Corps service in Nicaragua to managing strategic investments that impact millions of lives worldwide?",
        interest: "Julie Frye's extraordinary journey demonstrates how purpose-driven experience can accelerate rather than derail financial career advancement.",
        desire: "Her work involves evaluating investments that must deliver both financial returns and measurable social impact—a skill set increasingly valuable as ESG investing becomes mainstream.",
        action: "Discover how mission-driven experience can enhance rather than compromise financial career advancement in today's purpose-driven investment landscape."
      }
    }
  ];

  // Create API directory
  const apiDir = path.join(__dirname, '../public/api');
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }

  // Write API files
  try {
    fs.writeFileSync(
      path.join(apiDir, 'episodes.json'),
      JSON.stringify({ 
        episodes, 
        meta: {
          total: episodes.length,
          lastUpdated: new Date().toISOString(),
          version: "1.0.0"
        }
      }, null, 2)
    );

    console.log(`✅ Generated episodes.json with ${episodes.length} episodes`);
    
  } catch (error) {
    console.error('❌ Error generating API files:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateAPI();
}

module.exports = { generateAPI };