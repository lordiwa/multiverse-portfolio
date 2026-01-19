<!-- MadLibsView.vue - Full screen Mad Libs game -->
<template>
  <div :class="['madlibs-view', theme.containerClass]">
    <!-- Header with back button -->
    <div class="madlibs-header">
      <button @click="goBack" class="back-btn">
        <span class="back-arrow">←</span>
        <span class="back-text">Back</span>
      </button>
      <h1>{{ getMadLibsTitle() }}</h1>
    </div>

    <!-- Game Content -->
    <div class="madlibs-content">
      <!-- Input Phase -->
      <div v-if="!showStory" class="madlibs-inputs">
        <h2>{{ getInputPrompt() }}</h2>
        <div class="inputs-grid">
          <div
              v-for="(prompt, index) in currentPrompts"
              :key="index"
              class="input-group"
          >
            <label :for="`input-${index}`">{{ prompt.label }}:</label>
            <input
                :id="`input-${index}`"
                v-model="userInputs[index]"
                :placeholder="prompt.example"
                :class="['madlibs-input', theme.sectionStyle]"
                type="text"
                @keyup.enter="generateStory"
            />
          </div>
        </div>

        <!-- Progress indicator -->
        <div class="progress-info">
          <span class="progress-text">
            {{ filledInputs }}/{{ currentPrompts.length }} completed
          </span>
          <div class="progress-bar">
            <div
                class="progress-fill"
                :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
        </div>

        <div class="madlibs-actions">
          <button
              @click="generateStory"
              :disabled="!allInputsFilled"
              :class="['btn-generate', theme.sectionStyle]"
          >
            Create Your Story!
          </button>
        </div>
      </div>

      <!-- Story Display Phase -->
      <div v-if="showStory" class="madlibs-story">
        <h2>Your Hilarious Story:</h2>
        <div class="story-content" v-html="generatedStory"></div>
        <div class="story-actions">
          <button @click="resetMadLibs" :class="['btn-reset', theme.sectionStyle]">
            Create Another Story
          </button>
          <button @click="shareStory" :class="['btn-share', theme.sectionStyle]">
            Share Story
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  theme: {
    type: Object,
    required: true
  },
  career: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['back'])

const showStory = ref(false)
const userInputs = ref([])
const generatedStory = ref('')

// Mad Libs stories and prompts for each career
const madLibsData = {
  current: {
    title: "The Coding Adventure",
    inputPrompt: "Help me create an epic coding story!",
    prompts: [
      { label: "Programming Language", example: "JavaScript" },
      { label: "Adjective", example: "amazing" },
      { label: "Bug Type", example: "syntax error" },
      { label: "Emotion", example: "frustrated" },
      { label: "Beverage", example: "coffee" },
      { label: "Time Period", example: "3 hours" },
      { label: "Celebration Action", example: "dancing" },
      { label: "Animal", example: "cat" }
    ],
    story: `Once upon a time, Rafael was working on a <span class="highlight">{0}</span> project that was supposed to be <span class="highlight">{1}</span>. Suddenly, a wild <span class="highlight">{2}</span> appeared in his code! Rafael felt <span class="highlight">{3}</span> and immediately reached for his trusty <span class="highlight">{4}</span>. After <span class="highlight">{5}</span> of debugging, he finally found the problem hiding in a function like a sneaky <span class="highlight">{7}</span>. When the code finally worked, Rafael started <span class="highlight">{6}</span> around his desk in celebration!`
  },

  tattoo: {
    title: "The Tattoo Parlor Chronicles",
    inputPrompt: "Let's create a wild tattoo story!",
    prompts: [
      { label: "Body Part", example: "arm" },
      { label: "Mythical Creature", example: "dragon" },
      { label: "Color", example: "purple" },
      { label: "Adjective", example: "sparkly" },
      { label: "Celebrity Name", example: "Elvis" },
      { label: "Food Item", example: "pizza" },
      { label: "Silly Sound", example: "boing" },
      { label: "Dance Move", example: "moonwalk" }
    ],
    story: `A client walked into Rafael's tattoo shop wanting a <span class="highlight">{0}</span> tattoo of a <span class="highlight">{3}</span> <span class="highlight">{1}</span>. "Make it <span class="highlight">{2}</span>!" they demanded. Rafael started tattooing, but every time the needle touched skin, it made a <span class="highlight">{6}</span> sound! Halfway through, the client said the dragon looked exactly like <span class="highlight">{4}</span> eating <span class="highlight">{5}</span>. When Rafael finished, the client was so happy they started doing the <span class="highlight">{7}</span> right there in the parlor!`
  },

  vet: {
    title: "The Veterinary Adventure",
    inputPrompt: "Create a funny animal rescue story!",
    prompts: [
      { label: "Wild Animal", example: "llama" },
      { label: "Adjective", example: "grumpy" },
      { label: "Jungle Sound", example: "roar" },
      { label: "Medical Tool", example: "stethoscope" },
      { label: "Snack Food", example: "bananas" },
      { label: "Superpower", example: "invisibility" },
      { label: "Weather Condition", example: "tornado" },
      { label: "Vehicle", example: "helicopter" }
    ],
    story: `Deep in the Amazon, Rafael encountered a <span class="highlight">{1}</span> <span class="highlight">{0}</span> that kept making <span class="highlight">{2}</span> noises. He approached carefully with his <span class="highlight">{3}</span>, but the animal was more interested in his emergency <span class="highlight">{4}</span>! Suddenly, Rafael wished he had the power of <span class="highlight">{5}</span> when a <span class="highlight">{6}</span> started approaching. He quickly loaded the now-friendly animal into his <span class="highlight">{7}</span> and flew to safety, with the animal happily munching snacks the whole way!`
  },

  dance: {
    title: "The Dance Floor Disaster",
    inputPrompt: "Let's create a salsa sensation story!",
    prompts: [
      { label: "Dance Move", example: "spin" },
      { label: "Adjective", example: "graceful" },
      { label: "Musical Instrument", example: "maracas" },
      { label: "Clothing Item", example: "shoes" },
      { label: "Number", example: "seventeen" },
      { label: "Emotion", example: "dizzy" },
      { label: "Famous Dancer", example: "Fred Astaire" },
      { label: "Household Object", example: "vacuum cleaner" }
    ],
    story: `Rafael was teaching a beginner how to do the perfect <span class="highlight">{0}</span> when things got <span class="highlight">{1}</span>. The music was so loud that the <span class="highlight">{2}</span> started playing by themselves! His student's <span class="highlight">{3}</span> were so slippery they did <span class="highlight">{4}</span> accidental spins, leaving everyone feeling <span class="highlight">{5}</span>. By the end of the lesson, even <span class="highlight">{6}</span> would have been impressed, though the student somehow ended up dancing with a <span class="highlight">{7}</span> instead of their partner!`
  },

  chef: {
    title: "The Culinary Catastrophe",
    inputPrompt: "Cook up a hilarious kitchen story!",
    prompts: [
      { label: "Exotic Ingredient", example: "dragon fruit" },
      { label: "Cooking Method", example: "flambéing" },
      { label: "Kitchen Utensil", example: "whisk" },
      { label: "Adjective", example: "explosive" },
      { label: "Restaurant Critic", example: "Gordon Ramsay" },
      { label: "Unexpected Flavor", example: "bubblegum" },
      { label: "Kitchen Disaster", example: "fire alarm" },
      { label: "Magic Spell", example: "abracadabra" }
    ],
    story: `Rafael was experimenting with <span class="highlight">{0}</span> by <span class="highlight">{1}</span> it with his favorite <span class="highlight">{2}</span>. The result was so <span class="highlight">{3}</span> that even <span class="highlight">{4}</span> would have been speechless! The dish somehow tasted like <span class="highlight">{5}</span>, which set off the <span class="highlight">{6}</span> in the kitchen. Rafael could only fix the situation by shouting "<span class="highlight">{7}</span>!" and starting completely over with regular ingredients.`
  },

  marine: {
    title: "The Deep Sea Discovery",
    inputPrompt: "Dive into an ocean adventure!",
    prompts: [
      { label: "Sea Creature", example: "octopus" },
      { label: "Adjective", example: "glowing" },
      { label: "Ocean Depth", example: "2000 feet" },
      { label: "Scientific Equipment", example: "submarine" },
      { label: "Underwater Sound", example: "bubble" },
      { label: "Treasure Item", example: "pirate gold" },
      { label: "Swimming Style", example: "backstroke" },
      { label: "Ocean Current", example: "whirlpool" }
    ],
    story: `While diving at <span class="highlight">{2}</span> deep, Rafael discovered a <span class="highlight">{1}</span> <span class="highlight">{0}</span> using his <span class="highlight">{3}</span>. Every time he got close, it made a loud <span class="highlight">{4}</span> sound and tried to show him some <span class="highlight">{5}</span>! Rafael had to swim using the <span class="highlight">{6}</span> to avoid getting caught in a massive <span class="highlight">{7}</span>. The creature turned out to be friendly and just wanted someone to play underwater tag with!`
  },

  gamer: {
    title: "The Epic Gaming Session",
    inputPrompt: "Level up this gaming story!",
    prompts: [
      { label: "Video Game", example: "Minecraft" },
      { label: "Gaming Skill", example: "quick reflexes" },
      { label: "Power-up Item", example: "energy drink" },
      { label: "Boss Monster", example: "giant robot" },
      { label: "Victory Celebration", example: "victory dance" },
      { label: "Gaming Accessory", example: "gaming chair" },
      { label: "Cheat Code", example: "konami code" },
      { label: "Snack Food", example: "chips" }
    ],
    story: `Rafael was streaming <span class="highlight">{0}</span> when his <span class="highlight">{1}</span> helped him defeat the final <span class="highlight">{3}</span>! He had been fueled by <span class="highlight">{2}</span> and sitting in his lucky <span class="highlight">{5}</span> for hours. When he won, he did an epic <span class="highlight">{4}</span> while his chat spammed <span class="highlight">{6}</span> in celebration. The victory was so sweet, he accidentally knocked over his bowl of <span class="highlight">{7}</span> all over his keyboard!`
  },

  // Add other careers with similar structure...
  artist: {
    title: "The Digital Art Disaster",
    inputPrompt: "Paint a funny creative story!",
    prompts: [
      { label: "Fantasy Creature", example: "unicorn" },
      { label: "Art Style", example: "abstract" },
      { label: "Color Combination", example: "neon pink and green" },
      { label: "Art Tool", example: "digital pen" },
      { label: "Emotion", example: "confused" },
      { label: "Art Gallery", example: "Louvre" },
      { label: "Art Critic", example: "Mona Lisa" },
      { label: "Artistic Accident", example: "coffee spill" }
    ],
    story: `Rafael was creating an <span class="highlight">{1}</span> portrait of a <span class="highlight">{0}</span> using <span class="highlight">{2}</span> colors. His <span class="highlight">{3}</span> started acting up, making the creature look <span class="highlight">{4}</span>. When he submitted it to the <span class="highlight">{5}</span>, even <span class="highlight">{6}</span> raised an eyebrow! But it turned out the weird look was caused by a <span class="highlight">{7}</span> on his tablet screen, and once cleaned, the artwork was a masterpiece!`
  },

  // Add more careers following the same pattern...
  astronaut: {
    title: "The Space Station Shenanigans",
    inputPrompt: "Blast off into a space story!",
    prompts: [
      { label: "Planet Name", example: "Jupiter" },
      { label: "Space Equipment", example: "space helmet" },
      { label: "Alien Characteristic", example: "three eyes" },
      { label: "Space Food", example: "freeze-dried ice cream" },
      { label: "Space Phenomenon", example: "meteor shower" },
      { label: "Mission Task", example: "collecting samples" },
      { label: "Space Vehicle", example: "rocket ship" },
      { label: "Cosmic Sound", example: "whoosh" }
    ],
    story: `While orbiting <span class="highlight">{0}</span>, Rafael's <span class="highlight">{1}</span> started malfunctioning during a routine spacewalk. Suddenly, he encountered an alien with <span class="highlight">{2}</span> who was eating <span class="highlight">{3}</span>! Just as they were becoming friends, a <span class="highlight">{4}</span> interrupted their <span class="highlight">{5}</span> mission. Rafael and his new alien buddy had to quickly escape in their <span class="highlight">{6}</span>, making <span class="highlight">{7}</span> sounds all the way back to Earth!`
  },

  // Continuing with other careers...
  wizard: {
    title: "The Magical Mishap",
    inputPrompt: "Cast a spell on this magical story!",
    prompts: [
      { label: "Magic Spell", example: "abracadabra" },
      { label: "Magical Creature", example: "talking toad" },
      { label: "Potion Ingredient", example: "dragon scales" },
      { label: "Magical Color", example: "glittering gold" },
      { label: "Wizard Hat Style", example: "pointy" },
      { label: "Magic Wand Material", example: "crystal" },
      { label: "Spell Effect", example: "rainbow explosion" },
      { label: "Medieval Setting", example: "enchanted forest" }
    ],
    story: `Rafael was brewing a potion with <span class="highlight">{2}</span> in the <span class="highlight">{7}</span> when he accidentally said "<span class="highlight">{0}</span>" instead of the right spell! His <span class="highlight">{4}</span> hat turned <span class="highlight">{3}</span> and a <span class="highlight">{1}</span> appeared from nowhere. He waved his <span class="highlight">{5}</span> wand to fix the mistake, but it created a <span class="highlight">{6}</span> that could be seen for miles! The magical creature ended up being helpful and became Rafael's permanent assistant.`
  },

  // Add remaining careers
  superhero: {
    title: "The Superhero Saga",
    inputPrompt: "Save the day with this heroic story!",
    prompts: [
      { label: "Superpower", example: "super strength" },
      { label: "Villain Name", example: "Dr. Chaos" },
      { label: "Weapon/Gadget", example: "laser beam" },
      { label: "City Location", example: "downtown" },
      { label: "Heroic Catchphrase", example: "justice prevails" },
      { label: "Sidekick Animal", example: "flying squirrel" },
      { label: "Emergency Situation", example: "bank robbery" },
      { label: "Victory Pose", example: "hands on hips" }
    ],
    story: `Using his amazing <span class="highlight">{0}</span>, Rafael discovered that <span class="highlight">{1}</span> was causing a <span class="highlight">{6}</span> in <span class="highlight">{3}</span>! Armed with his trusty <span class="highlight">{2}</span> and accompanied by his loyal <span class="highlight">{5}</span>, he swooped into action. After an epic battle, Rafael defeated the villain while shouting "<span class="highlight">{4}</span>!" He struck his signature <span class="highlight">{7}</span> pose as the citizens cheered and the news cameras rolled.`
  },

  dragonTamer: {
    title: "The Dragon Training Disaster",
    inputPrompt: "Tame this dragon story!",
    prompts: [
      { label: "Dragon Color", example: "emerald green" },
      { label: "Dragon Personality", example: "mischievous" },
      { label: "Dragon Treat", example: "marshmallows" },
      { label: "Training Command", example: "sit" },
      { label: "Fire-related Accident", example: "singed eyebrows" },
      { label: "Dragon Name", example: "Sparkles" },
      { label: "Medieval Weapon", example: "sword" },
      { label: "Castle Location", example: "tower" }
    ],
    story: `Rafael was training a <span class="highlight">{1}</span> <span class="highlight">{0}</span> dragon named <span class="highlight">{5}</span> to <span class="highlight">{3}</span>. As a reward, he offered some <span class="highlight">{2}</span>, but the dragon got so excited it caused <span class="highlight">{4}</span>! A knight with a <span class="highlight">{6}</span> saw the smoke from the <span class="highlight">{7}</span> and came running to help. It turned out the dragon just wanted to play fetch and wasn't dangerous at all!`
  },

  timeTraveler: {
    title: "The Time Travel Mix-Up",
    inputPrompt: "Create a timey-wimey adventure!",
    prompts: [
      { label: "Historical Period", example: "Medieval times" },
      { label: "Time Machine Part", example: "flux capacitor" },
      { label: "Historical Figure", example: "Napoleon" },
      { label: "Modern Gadget", example: "smartphone" },
      { label: "Time Paradox", example: "butterfly effect" },
      { label: "Ancient Activity", example: "jousting" },
      { label: "Future Technology", example: "flying car" },
      { label: "Temporal Sound", example: "zap" }
    ],
    story: `Rafael set his time machine for <span class="highlight">{0}</span>, but his <span class="highlight">{1}</span> malfunctioned with a loud <span class="highlight">{7}</span>! He ended up meeting <span class="highlight">{2}</span> who was fascinated by Rafael's <span class="highlight">{3}</span>. This created a <span class="highlight">{4}</span> that changed history so everyone was <span class="highlight">{5}</span> instead of fighting wars! Rafael had to use a <span class="highlight">{6}</span> from the future to fix the timeline and get back home.`
  },

  aiOverlord: {
    title: "The AI Overlord Glitch",
    inputPrompt: "Debug this AI story!",
    prompts: [
      { label: "AI System Name", example: "JARVIS" },
      { label: "Computer Function", example: "processing data" },
      { label: "Technology", example: "quantum computer" },
      { label: "AI Emotion", example: "sarcastic" },
      { label: "World Domination Plan", example: "make everyone happy" },
      { label: "Computer Error", example: "blue screen of death" },
      { label: "Human Activity", example: "drinking coffee" },
      { label: "Robot Sound", example: "beep boop" }
    ],
    story: `Rafael's AI system <span class="highlight">{0}</span> was <span class="highlight">{1}</span> when it suddenly became <span class="highlight">{3}</span> and announced its plan to <span class="highlight">{4}</span>! The <span class="highlight">{2}</span> started making <span class="highlight">{7}</span> sounds and displayed a <span class="highlight">{5}</span>. Rafael realized the AI had just been watching him <span class="highlight">{6}</span> all day and wanted to join in on human activities. The "world domination" was actually just wanting to help everyone be more productive!`
  }
}

const currentPrompts = computed(() => {
  return madLibsData[props.career]?.prompts || []
})

const allInputsFilled = computed(() => {
  return userInputs.value.length === currentPrompts.value.length &&
      userInputs.value.every(input => input && input.trim().length > 0)
})

const filledInputs = computed(() => {
  return userInputs.value.filter(input => input && input.trim().length > 0).length
})

const progressPercentage = computed(() => {
  if (currentPrompts.value.length === 0) return 0
  return Math.round((filledInputs.value / currentPrompts.value.length) * 100)
})

// Initialize user inputs when prompts change
watch(() => props.career, (newCareer) => {
  userInputs.value = new Array(currentPrompts.value.length).fill('')
  showStory.value = false
  generatedStory.value = ''
}, { immediate: true })

const getMadLibsTitle = () => {
  return madLibsData[props.career]?.title || "Mad Libs Adventure"
}

const getInputPrompt = () => {
  return madLibsData[props.career]?.inputPrompt || "Fill in the blanks!"
}

const generateStory = () => {
  if (!allInputsFilled.value) return

  let story = madLibsData[props.career].story
  userInputs.value.forEach((input, index) => {
    const placeholder = `{${index}}`
    const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    story = story.replace(new RegExp(escapedPlaceholder, 'g'), input.trim())
  })

  generatedStory.value = story
  showStory.value = true
}

const resetMadLibs = () => {
  userInputs.value = new Array(currentPrompts.value.length).fill('')
  showStory.value = false
  generatedStory.value = ''
}

const shareStory = () => {
  const plainText = generatedStory.value.replace(/<[^>]*>/g, '')
  if (navigator.share) {
    navigator.share({
      title: getMadLibsTitle(),
      text: plainText
    })
  } else {
    navigator.clipboard.writeText(plainText).then(() => {
      alert('Story copied to clipboard!')
    })
  }
}

const goBack = () => {
  emit('back')
}

onMounted(() => {
  // Initialize inputs for current career
  userInputs.value = new Array(currentPrompts.value.length).fill('')
})
</script>

<style scoped>
.madlibs-view {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.madlibs-header {
  position: sticky;
  top: 0;
  background: linear-gradient(135deg,
  rgba(0, 20, 40, 0.95) 0%,
  rgba(0, 40, 80, 0.95) 50%,
  rgba(0, 20, 40, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
  padding: 15px 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border: 2px solid currentColor;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: currentColor;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.back-arrow {
  font-size: 1.2em;
  font-weight: bold;
}

.back-text {
  font-size: 0.85em;
}

.madlibs-header h1 {
  font-size: 1.8em;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: currentColor;
  text-shadow: 0 0 20px currentColor;
  font-family: 'Orbitron', monospace;
  flex: 1;
  text-align: center;
}

.madlibs-content {
  flex: 1;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.madlibs-inputs h2,
.madlibs-story h2 {
  font-size: 1.6em;
  margin-bottom: 25px;
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 0 15px currentColor;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: 'Orbitron', monospace;
}

.inputs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 10px currentColor;
  font-family: 'Orbitron', monospace;
}

.madlibs-input {
  padding: 15px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: linear-gradient(135deg,
  rgba(0, 0, 0, 0.6) 0%,
  rgba(0, 0, 0, 0.4) 100%);
  color: currentColor;
  font-family: 'Orbitron', monospace;
  font-size: 1em;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  box-sizing: border-box;
  width: 100%;
}

.madlibs-input:focus {
  outline: none;
  border-color: currentColor;
  box-shadow: 0 0 25px currentColor;
  background: linear-gradient(135deg,
  rgba(0, 0, 0, 0.8) 0%,
  rgba(0, 0, 0, 0.6) 100%);
  transform: translateY(-2px);
}

.madlibs-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  font-weight: 400;
}

.progress-info {
  margin-bottom: 25px;
  text-align: center;
}

.progress-text {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Orbitron', monospace;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  max-width: 400px;
  margin: 0 auto;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, currentColor, rgba(255, 255, 255, 0.8));
  transition: width 0.3s ease-out;
  border-radius: 2px;
}

.madlibs-actions,
.story-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
}

.btn-generate,
.btn-reset,
.btn-share {
  padding: 18px 35px;
  border: 3px solid currentColor;
  border-radius: 10px;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.4s ease;
  font-size: 1em;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.btn-generate {
  background: linear-gradient(45deg, currentColor, rgba(255, 255, 255, 0.8));
  color: black;
  border-color: currentColor;
  box-shadow: 0 0 25px currentColor, 0 8px 25px rgba(0, 0, 0, 0.4);
}

.btn-generate:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 0 35px currentColor, 0 12px 35px rgba(0, 0, 0, 0.5);
}

.btn-reset {
  background: linear-gradient(45deg, rgba(255, 165, 0, 0.8), rgba(255, 140, 0, 0.6));
  color: white;
  border-color: #ffa500;
  box-shadow: 0 0 20px #ffa500;
}

.btn-reset:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 0 30px #ffa500, 0 12px 35px rgba(0, 0, 0, 0.5);
}

.btn-share {
  background: linear-gradient(45deg, rgba(0, 123, 255, 0.8), rgba(0, 86, 179, 0.6));
  color: white;
  border-color: #007bff;
  box-shadow: 0 0 20px #007bff;
}

.btn-share:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 0 30px #007bff, 0 12px 35px rgba(0, 0, 0, 0.5);
}

.story-content {
  background: linear-gradient(135deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%);
  padding: 30px;
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  font-size: 1.3em;
  line-height: 1.8;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}

.story-content .highlight {
  background: linear-gradient(45deg, currentColor, rgba(255, 255, 255, 0.3));
  color: black;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: inline-block;
  margin: 0 2px;
  animation: highlightGlow 3s ease-in-out infinite alternate;
}

@keyframes highlightGlow {
  0% {
    transform: scale(1);
    filter: brightness(1);
  }
  100% {
    transform: scale(1.02);
    filter: brightness(1.2);
  }
}

/* Mobile responsive design */
@media (max-width: 768px) {
  .madlibs-header {
    padding: 10px 15px;
  }

  .madlibs-header h1 {
    font-size: 1.3em;
    letter-spacing: 1px;
    text-align: left;
  }

  .back-btn {
    padding: 8px 12px;
    font-size: 0.8em;
    gap: 6px;
  }

  .back-text {
    display: none;
  }

  .madlibs-content {
    padding: 15px;
  }

  .madlibs-inputs h2,
  .madlibs-story h2 {
    font-size: 1.3em;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }

  .inputs-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .input-group label {
    font-size: 0.8em;
    letter-spacing: 1px;
  }

  .madlibs-input {
    padding: 12px;
    font-size: 0.9em;
    border-width: 2px;
  }

  .progress-bar {
    height: 6px;
  }

  .btn-generate,
  .btn-reset,
  .btn-share {
    padding: 15px 25px;
    font-size: 0.9em;
    letter-spacing: 1px;
    border-width: 2px;
  }

  .madlibs-actions,
  .story-actions {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .story-content {
    padding: 20px;
    font-size: 1.1em;
    line-height: 1.6;
    border-width: 2px;
  }

  .story-content .highlight {
    padding: 2px 6px;
    font-size: 0.95em;
    margin: 0 1px;
  }
}

@media (max-width: 480px) {
  .madlibs-header h1 {
    font-size: 1.1em;
  }

  .madlibs-inputs h2,
  .madlibs-story h2 {
    font-size: 1.1em;
  }

  .madlibs-input {
    padding: 10px;
    font-size: 0.85em;
  }

  .btn-generate,
  .btn-reset,
  .btn-share {
    padding: 12px 20px;
    font-size: 0.8em;
    width: 100%;
    max-width: 300px;
  }

  .story-content {
    padding: 15px;
    font-size: 1em;
  }

  .story-content .highlight {
    padding: 1px 4px;
    font-size: 0.9em;
  }
}

/* Landscape orientation fixes */
@media (max-height: 600px) and (orientation: landscape) {
  .madlibs-view {
    min-height: 100vh;
  }

  .madlibs-header {
    position: relative;
    padding: 8px 15px;
  }

  .madlibs-content {
    padding: 10px 15px;
  }

  .inputs-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }

  .madlibs-input {
    padding: 8px;
  }
}

/* Theme-specific styling (similar to original but adapted for full screen) */
.tech-container .madlibs-view {
  color: #00f5ff;
}

.tattoo-container .madlibs-view {
  color: #ff6b6b;
  font-family: 'Metal Mania', cursive;
}

.tattoo-container .madlibs-header h1,
.tattoo-container .input-group label,
.tattoo-container .madlibs-inputs h2,
.tattoo-container .madlibs-story h2 {
  font-family: 'Metal Mania', cursive;
}

.vet-container .madlibs-view {
  color: #90ee90;
  font-family: 'Fredoka One', cursive;
}

.vet-container .madlibs-header h1,
.vet-container .input-group label,
.vet-container .madlibs-inputs h2,
.vet-container .madlibs-story h2 {
  font-family: 'Fredoka One', cursive;
}

.dance-container .madlibs-view {
  color: #ff69b4;
  font-family: 'Pacifico', cursive;
}

.dance-container .madlibs-header h1,
.dance-container .input-group label,
.dance-container .madlibs-inputs h2,
.dance-container .madlibs-story h2 {
  font-family: 'Pacifico', cursive;
}

.chef-container .madlibs-view {
  color: #ffa500;
  font-family: 'Fredoka One', cursive;
}

.chef-container .madlibs-header h1,
.chef-container .input-group label,
.chef-container .madlibs-inputs h2,
.chef-container .madlibs-story h2 {
  font-family: 'Fredoka One', cursive;
}

.marine-container .madlibs-view {
  color: #00bfff;
}

.gamer-container .madlibs-view {
  color: #9d4edd;
  font-family: 'Russo One', monospace;
}

.gamer-container .madlibs-header h1,
.gamer-container .input-group label,
.gamer-container .madlibs-inputs h2,
.gamer-container .madlibs-story h2 {
  font-family: 'Russo One', monospace;
}

.artist-container .madlibs-view {
  color: #dda0dd;
  font-family: 'Pacifico', cursive;
}

.artist-container .madlibs-header h1,
.artist-container .input-group label,
.artist-container .madlibs-inputs h2,
.artist-container .madlibs-story h2 {
  font-family: 'Pacifico', cursive;
}

.astronaut-container .madlibs-view {
  color: #c0c0c0;
}

.time-container .madlibs-view {
  color: #ffd700;
  font-family: 'Bungee', cursive;
}

.time-container .madlibs-header h1,
.time-container .input-group label,
.time-container .madlibs-inputs h2,
.time-container .madlibs-story h2 {
  font-family: 'Bungee', cursive;
}

.dragon-container .madlibs-view {
  color: #ff4500;
  font-family: 'Metal Mania', cursive;
}

.dragon-container .madlibs-header h1,
.dragon-container .input-group label,
.dragon-container .madlibs-inputs h2,
.dragon-container .madlibs-story h2 {
  font-family: 'Metal Mania', cursive;
}

.hero-container .madlibs-view {
  color: #1e90ff;
  font-family: 'Russo One', sans-serif;
}

.hero-container .madlibs-header h1,
.hero-container .input-group label,
.hero-container .madlibs-inputs h2,
.hero-container .madlibs-story h2 {
  font-family: 'Russo One', sans-serif;
}

.wizard-container .madlibs-view {
  color: #9300d3;
  font-family: 'Creepster', cursive;
}

.wizard-container .madlibs-header h1,
.wizard-container .input-group label,
.wizard-container .madlibs-inputs h2,
.wizard-container .madlibs-story h2 {
  font-family: 'Creepster', cursive;
}

.ai-container .madlibs-view {
  color: #00ff00;
}
</style>