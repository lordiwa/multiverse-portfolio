// Base theme configurations - only 6 distinct visual themes
const baseThemes = {
    tech: {
        containerClass: 'tech-container',
        cardClass: 'contact-card tech-card',
        skillBadgeClass: 'skill-badge tech-skill',
        techBadgeClass: 'tech-badge tech-tech',
        dotClass: 'tech-dot',
        linkCardClass: 'tech-link',
        selectClass: 'tech-select',
        experienceTitle: 'Professional Experience',
        linksTitle: 'Personal Links & Current Projects',
        linksSubtitle: 'Connect with me and check out my active projects',
        showProjects: true,
        sectionStyle: 'tech-section'
    },

    artist: {
        containerClass: 'tattoo-container', // Reusing tattoo styles
        cardClass: 'contact-card tattoo-card',
        skillBadgeClass: 'skill-badge tattoo-skill',
        techBadgeClass: 'tech-badge tattoo-tech',
        dotClass: 'tattoo-dot',
        linkCardClass: 'tattoo-link',
        selectClass: 'tattoo-select',
        experienceTitle: 'Artistic Journey',
        linksTitle: 'Portfolio & Creative Work',
        linksSubtitle: 'Visual storytelling across mediums',
        showProjects: true,
        sectionStyle: 'tattoo-section'
    },

    explorer: {
        containerClass: 'vet-container', // Reusing vet styles
        cardClass: 'contact-card vet-card',
        skillBadgeClass: 'skill-badge vet-skill',
        techBadgeClass: 'tech-badge vet-tech',
        dotClass: 'vet-dot',
        linkCardClass: 'vet-link',
        selectClass: 'vet-select',
        experienceTitle: 'Exploration & Discovery',
        linksTitle: 'Conservation & Research',
        linksSubtitle: 'Protecting and understanding life across ecosystems',
        showProjects: true,
        sectionStyle: 'vet-section'
    },

    performer: {
        containerClass: 'dance-container', // Reusing dance styles
        cardClass: 'contact-card dance-card',
        skillBadgeClass: 'skill-badge dance-skill',
        techBadgeClass: 'tech-badge dance-tech',
        dotClass: 'dance-dot',
        linkCardClass: 'dance-link',
        selectClass: 'dance-select',
        experienceTitle: 'Performance & Craft',
        linksTitle: 'Studios & Creative Spaces',
        linksSubtitle: 'Mastering physical artistry and expression',
        showProjects: true,
        sectionStyle: 'dance-section'
    },

    gamer: {
        containerClass: 'gamer-container',
        cardClass: 'contact-card gamer-card',
        skillBadgeClass: 'skill-badge gamer-skill',
        techBadgeClass: 'tech-badge gamer-tech',
        dotClass: 'gamer-dot',
        linkCardClass: 'gamer-link',
        selectClass: 'gamer-select',
        experienceTitle: 'Gaming Evolution',
        linksTitle: 'Esports & Gaming Innovation',
        linksSubtitle: 'Competitive gaming and content creation',
        showProjects: true,
        sectionStyle: 'gamer-section'
    },

    fantasy: {
        containerClass: 'wizard-container', // Reusing wizard styles
        cardClass: 'contact-card wizard-card',
        skillBadgeClass: 'skill-badge wizard-skill',
        techBadgeClass: 'tech-badge wizard-tech',
        dotClass: 'wizard-dot',
        linkCardClass: 'wizard-link',
        selectClass: 'wizard-select',
        experienceTitle: 'Legendary Adventures',
        linksTitle: 'Mystical Projects & Quests',
        linksSubtitle: 'Where magic and imagination become reality',
        showProjects: true,
        sectionStyle: 'wizard-section'
    }
}

// Theme groups - which careers belong to which visual theme
export const themeGroups = {
    tech: ['current'],
    artist: ['tattoo', 'artist'],
    explorer: ['vet', 'marine', 'astronaut'],
    performer: ['dance', 'chef'],
    gamer: ['gamer'],
    fantasy: ['wizard', 'dragonTamer', 'timeTraveler', 'superhero', 'aiOverlord']
}

// Map each career to its theme
export const themes = {
    // Tech group (1 career)
    current: baseThemes.tech,

    // Artist group (2 careers)
    tattoo: baseThemes.artist,
    artist: baseThemes.artist,

    // Explorer group (3 careers)
    vet: baseThemes.explorer,
    marine: baseThemes.explorer,
    astronaut: baseThemes.explorer,

    // Performer group (2 careers)
    dance: baseThemes.performer,
    chef: baseThemes.performer,

    // Gamer group (1 career)
    gamer: baseThemes.gamer,

    // Fantasy group (5 careers)
    wizard: baseThemes.fantasy,
    dragonTamer: baseThemes.fantasy,
    timeTraveler: baseThemes.fantasy,
    superhero: baseThemes.fantasy,
    aiOverlord: baseThemes.fantasy
}

// Helper: Get theme group name for a career ID
export function getThemeGroup(careerId) {
    for (const [groupName, careers] of Object.entries(themeGroups)) {
        if (careers.includes(careerId)) {
            return groupName
        }
    }
    return 'tech' // fallback
}

// Helper: Get all career IDs that belong to different theme groups
export function getCareersNotInGroups(excludedGroups, allCareerIds) {
    return allCareerIds.filter(careerId => {
        const group = getThemeGroup(careerId)
        return !excludedGroups.includes(group) && careerId !== 'current'
    })
}

// Helper: Get all careers in a specific theme group
export function getCareersInGroup(groupName) {
    return themeGroups[groupName] || []
}