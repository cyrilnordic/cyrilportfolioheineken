/*
  ALL the text and images of the portfolio live in this file.
  Edit it, save, refresh the browser. No build step.

  - Change the summary:      hero.summary
  - Remove the yellow box:   delete hero.summaryToUpdate
  - Add a section:           copy one object in `sections` and change it (see README.md)
  - Reorder sections:        move the object up or down in `sections`
  - Images:                  put the file in assets/images and write its path here
*/
window.SITE = {
  meta: {
    title: 'Cyril Forot Portfolio',
    description: 'Event Manager based in Denmark. Trade shows, conferences, product launches and company events across Europe.'
  },

  brand: 'Cyril Forot',
  cta: { label: 'Get in touch', href: 'https://www.linkedin.com/in/cyrilforot/' },

  hero: {
    eyebrow: 'Portfolio',
    name: 'Cyril Forot',
    tagline: 'Global Event Manager',
    summary: 'Senior Event Manager with 8 years of experience and 300+ events delivered, from large-scale, international B2B and corporate events to brand experiences across 10 European markets, with budgets of up to €700k, always putting people at the heart of every event. Brings a client-focused mindset from the client brief to the post-event evaluation. Now ready to raise the bar at HEINEKEN, aligning your events with the EverGreen strategy and bringing innovative technology and creativity to the HEINEKEN Experience and other events. Moving to the Netherlands for new career opportunities.',
    // To show the yellow "TO UPDATE" box again, add:  summaryToUpdate: 'your reminder',
    stats: [
      { label: 'Events', value: '300+' },
      { label: 'Markets', value: '10' },
      { label: 'Budgets up to', value: '€700K' }
    ],
    button: { label: 'See projects', href: '#projects' },
    photos: [
      { src: 'assets/images/smarter-e-booth.jpg', alt: 'Emaldo booth at The smarter E Europe', caption: 'Emaldo booth at The smarter E Europe' },
      { src: 'assets/images/trade-shows-team.jpg', alt: 'The Emaldo team on the booth', caption: 'The Emaldo team on the booth' },
      { src: 'assets/images/ceremonies.jpg', alt: 'Stars & Métiers award ceremony', caption: 'Stars & Métiers award ceremony' }
    ]
  },

  /* Sections appear on the page in this order. Types: cards, about, stories, quotes. */
  sections: [
    {
      id: 'projects', type: 'cards', nav: 'Experiences',
      title: 'Choose your experience',
      items: [
        { image: 'assets/images/smarter-e-booth.jpg', alt: 'Emaldo booth at The smarter E Europe', badge: 'Germany', title: 'The smarter E Europe', text: 'A large-scale trade show combining product launches, partner moments, executive speaking and coordinated on-site delivery.', link: { label: 'Read the case', href: 'project.html#the-smarter-e-europe' } },
        { image: 'assets/images/trade-shows-team.jpg', alt: 'The Emaldo team on the booth', badge: 'Exhibitions & trade fairs', title: 'Trade Shows across Europe', text: 'From choosing the right exhibitions to delivering the booth experience and turning conversations into measurable opportunities.', link: { label: 'Read the case', href: 'project.html#trade-shows-europe' } },
        { image: 'assets/images/speeches-overall.jpg', alt: 'Speech at The smarter E Europe', badge: 'Executive speakers', title: 'Speeches & Conferences', text: 'From securing speaking opportunities to preparing speakers and coordinating delivery on stage.', link: { label: 'Read the case', href: 'project.html#speeches-conferences' } },
        { image: 'assets/images/ceremonies.jpg', alt: 'Stars & Métiers award ceremony', badge: 'France / United Kingdom', title: 'Award ceremonies', text: 'Award programmes and submissions managed from candidate applications, jury coordination and strategic storytelling through to guest experience, sponsorship and live ceremony delivery.', link: { label: 'Read the case', href: 'project.html#award-submissions-ceremonies' } },
        { image: 'assets/images/launch-ci.jpg', alt: 'Product launch', badge: 'Czech Republic / Sweden / Germany', title: 'Product Launches', text: 'Product launches shaped through audience-focused storytelling, demonstrations, sales enablement, partner briefings and event delivery.', link: { label: 'Read the case', href: 'project.html#product-launches' } },
        { image: 'assets/images/digital-webinar.svg', alt: 'Digital events', badge: 'Denmark / France', title: 'Digital Events & Webinars', text: 'Digital launches and webinars built around clear content, prepared speakers, reliable production and audience follow-up.', link: { label: 'Read the case', href: 'project.html#digital-events-webinars' } },
        { image: 'assets/images/internal-events-dhl.jpg', alt: 'Internal team event', badge: 'Bringing colleagues together', title: 'Internal Events & Team Experiences', text: 'Internal events, workshops and team experiences delivered with thoughtful planning, supplier coordination and smooth on-site flow.', link: { label: 'Read the case', href: 'project.html#internal-events' } },
        { image: 'assets/images/activations.jpg', alt: 'Brand activation', badge: 'France', title: 'Brand Activations', text: 'A nationwide shopper-marketing programme combining product demonstrations, direct consumer engagement and consistent in-store brand experiences.', link: { label: 'Read the case', href: 'project.html#brand-activations' } },
        { image: 'assets/images/race.jpg', alt: 'Obstacle race participants', badge: 'France', title: 'Mass Participation Event', text: 'A travelling obstacle-race series transforming open public spaces into safe, high-energy experiences for thousands of participants.', link: { label: 'Read the case', href: 'project.html#mass-participation-event' } }
        // Optional on any card: link: { label: 'Read the case', href: 'https://...' }
      ]
    },

    {
      id: 'about', type: 'about', nav: 'About', tint: true,
      title: 'About me',
      image: 'assets/images/cyril.jpg', imageAlt: 'Cyril Forot',
      paragraphs: [
        "Hi, I'm Cyril, a Senior Event Manager based in Denmark and seeking opportunities in Europe. I lead events from concept to delivery: trade shows, conferences, product launches, award ceremonies and staff events across European markets.",
        'I take ownership of the whole event: planning, suppliers, budgets, logistics and on-site execution. My goal is simple. When the event starts, the team can focus on customers and partners, because everything around them is under control.',
        'I also connect events to marketing and sales goals through cross-functional collaboration, event playbooks, product storytelling, PR angles and social media.',
        'I have worked across the Netherlands, the Czech Republic, Germany, Poland, Sweden, Finland, France, the United Kingdom, Spain and Denmark.'
      ]
    },

    {
      id: 'beyond', type: 'stories', nav: 'Beyond the CV',
      title: "What I haven't mentioned in my CV",
      intro: 'The stories behind two lines that deserve more space.',
      items: [
        {
          kind: 'photo',                                   // big card with a photo on the left
          image: 'assets/images/award-trophy.jpg', alt: 'Cyril holding the Start-up of the Year trophy', imagePosition: '48% 36%',
          badge: 'Award winner',
          title: 'Start-up of the Year, London',
          paragraphs: [
            "At the Energy Storage Investment Awards in London, Emaldo won Start-up of the Year. I co-wrote the winning submission with the Product and Marketing Directors, then coordinated our presence as headline sponsor: the CEO's stage speech, travel and VIP partner hospitality."
          ]
        },
        {
          kind: 'highlight',                               // small green card
          badge: 'Recognition',
          title: 'Employee of the Month',
          paragraphs: ['I was named Employee of the Month, a recognition that is not on my CV. I am proud of it because of the hard work behind it: creating impactful events in a short period of time and building the event function from scratch. I built the structure and the trust, so the sales team could focus on their business objectives.']
          // Add  todo: 'text'  to show a yellow "TO UPDATE" note on any card
        }
      ]
    },

    {
      id: 'recommendations', type: 'quotes', nav: 'Recommendations',
      title: 'What my colleagues say about me',
      items: [
        { text: "I truly enjoyed working with Cyril as part of the marketing team at Emaldo. His coordination and planning skills are seriously impressive. Every detail is thought through and planned. Cyril played a big part in taking Emaldo's events and brand presence to the next level.", name: 'Sofie Berggren', role: 'Marketing Director' },
        { text: "I've had the pleasure of working closely with Cyril at several fairs. What has always stood out is how much ownership he takes. From a sales perspective, that makes a huge difference. At a fair, you want to focus on customers, and with Cyril you know everything around you is under control.", name: 'Henri Stendalen', role: 'Sales Manager C&I' },
        { text: "I've worked with Cyril for almost two years. He is extremely hardworking and very structured in the way he works. Even when there are many things happening at the same time, he manages to keep a clear overview and make sure everything is moving in the right direction.", name: 'Mads Klitgaard', role: 'Digital Solutions Lead' }
      ]
    }
  ],

  footer: {
    title: "Let's plan your next event",
    subtitle: 'Global Event Manager',
    button: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cyrilforot/' }
  }
};
