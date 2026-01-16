// Matrix Rain Effect
const canvas = document.getElementById("matrix-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/~"
const fontSize = 14
const columns = canvas.width / fontSize
const drops = Array(Math.floor(columns)).fill(1)

function drawMatrix() {
  ctx.fillStyle = "rgba(10, 14, 39, 0.05)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "#00ff88"
  ctx.font = fontSize + "px monospace"

  for (let i = 0; i < drops.length; i++) {
    const text = matrix.charAt(Math.floor(Math.random() * matrix.length))
    ctx.fillText(text, i * fontSize, drops[i] * fontSize)

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0
    }
    drops[i]++
  }
}

setInterval(drawMatrix, 50)

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Custom Cursor
const cursorFollower = document.getElementById("cursor-follower")

document.addEventListener("mousemove", (e) => {
  cursorFollower.style.left = e.clientX + "px"
  cursorFollower.style.top = e.clientY + "px"
})

document.querySelectorAll("button, a, .card").forEach((elem) => {
  elem.addEventListener("mouseenter", () => {
    cursorFollower.style.transform = "scale(2)"
    cursorFollower.style.borderColor = "#ff006e"
  })
  elem.addEventListener("mouseleave", () => {
    cursorFollower.style.transform = "scale(1)"
    cursorFollower.style.borderColor = "#00ff88"
  })
})

// Typewriter Effect
const phrases = [
  "Software Engineer // Systems Programmer",
  "C++ Enthusiast // Low-Level Wizard",
  "Blockchain Developer // Web3 Builder",
  "École 42 Graduate // Problem Solver",
  "Segmentation Fault Hunter 🐛",
]

let phraseIndex = 0
let charIndex = 0
let isDeleting = false
const typedTextElement = document.getElementById("typed-text")
const typeSpeed = 100
const deleteSpeed = 50
const pauseTime = 2000

function typeWriter() {
  const currentPhrase = phrases[phraseIndex]

  if (!isDeleting && charIndex <= currentPhrase.length) {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex)
    charIndex++
    setTimeout(typeWriter, typeSpeed)
  } else if (isDeleting && charIndex >= 0) {
    typedTextElement.textContent = currentPhrase.substring(0, charIndex)
    charIndex--
    setTimeout(typeWriter, deleteSpeed)
  } else if (!isDeleting && charIndex === currentPhrase.length + 1) {
    setTimeout(() => {
      isDeleting = true
      typeWriter()
    }, pauseTime)
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    setTimeout(typeWriter, 500)
  }
}

typeWriter()

// Smooth Scroll Navigation
document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const sectionId = button.getAttribute("data-section")
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })

      // Add flash effect
      button.style.background = "#00ff88"
      button.style.color = "#0a0e27"
      setTimeout(() => {
        button.style.background = ""
        button.style.color = ""
      }, 300)
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document.querySelectorAll(".card, .timeline-item").forEach((elem) => {
  elem.style.opacity = "0"
  elem.style.transform = "translateY(30px)"
  elem.style.transition = "all 0.6s ease"
  observer.observe(elem)
})

// Random Glitch Effect
function randomGlitch() {
  const glitchElements = document.querySelectorAll(".glitch, .glitch-tag")
  const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)]

  if (randomElement) {
    randomElement.style.animation = "none"
    setTimeout(() => {
      randomElement.style.animation = ""
    }, 10)
  }
}

setInterval(randomGlitch, 3000)

// Easter Egg: Konami Code
let konamiCode = []
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.key)
  konamiCode = konamiCode.slice(-10)

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    document.body.style.filter = "invert(1) hue-rotate(180deg)"
    setTimeout(() => {
      document.body.style.filter = ""
    }, 3000)
    alert("🎮 CHEAT CODE ACTIVATED! You found the secret!")
  }
})

// Rock Easter Egg: Press "R-O-C-K" to trigger
let rockCode = []
const rockSequence = ["r", "o", "c", "k"]

document.addEventListener("keydown", (e) => {
  rockCode.push(e.key.toLowerCase())
  rockCode = rockCode.slice(-4)

  if (rockCode.join("") === rockSequence.join("")) {
    // Create rock explosion effect
    document.body.style.animation = "shake 0.5s"
    setTimeout(() => {
      document.body.style.animation = ""
    }, 500)

    // Show rock message
    const rockMsg = document.createElement("div")
    rockMsg.textContent = "🤘 ROCK ON! 🤘"
    rockMsg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 4rem;
      color: #ff006e;
      font-weight: bold;
      z-index: 10000;
      text-shadow: 0 0 20px #ff006e, 0 0 40px #ff006e;
      animation: rockPop 2s ease-out forwards;
    `
    document.body.appendChild(rockMsg)
    setTimeout(() => rockMsg.remove(), 2000)

    console.log("%c🎸 ROCK MODE ACTIVATED! 🎸", "color: #ff006e; font-size: 20px; font-weight: bold;")
  }
})

// Add shake animation
const style = document.createElement("style")
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
  }
  @keyframes rockPop {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  }
`
document.head.appendChild(style)

// Guitar Chord Click Simulation
document.querySelectorAll(".chord").forEach((chord) => {
  chord.addEventListener("click", function () {
    // Visual feedback
    this.style.transform = "translateY(-10px) rotate(5deg)"
    setTimeout(() => {
      this.style.transform = ""
    }, 200)

    // Console log
    console.log(`%c♪ Playing ${this.textContent} chord ♪`, "color: #00ff88; font-size: 14px;")
  })
})

// Amp Knob Interaction
document.querySelectorAll(".knob").forEach((knob) => {
  let rotation = 0
  knob.addEventListener("click", function () {
    rotation += 45
    this.style.transform = `rotate(${rotation}deg)`
    console.log(`%c🎚️ ${this.textContent} adjusted`, "color: #ffd60a; font-size: 12px;")
  })
})

let youtubePlayer = null
let isYouTubeReady = false

// YouTube IFrame API ready callback
window.onYouTubeIframeAPIReady = function() {
  isYouTubeReady = true
  console.log("%c🎵 YouTube Player API Ready!", "color: #00ff88; font-size: 14px;")
}

document.querySelectorAll(".playlist-item").forEach((item) => {
  item.addEventListener("click", function () {
    const youtubeId = this.getAttribute("data-youtube")
    const playerContainer = document.getElementById("youtube-player-container")

    if (!youtubeId) {
      console.log("%c⚠️ No YouTube ID found", "color: #ffd60a; font-size: 12px;")
      return
    }

    document.querySelectorAll(".playlist-item").forEach((i) => i.classList.remove("playing"))
    this.classList.add("playing")

    const trackNum = this.querySelector(".track-number")
    const originalNumber = trackNum.textContent
    trackNum.textContent = "▶"

    playerContainer.style.display = "block"

    const trackName = this.querySelector(".track-name").textContent

    const initPlayer = () => {
      if (!youtubePlayer) {
        try {
          youtubePlayer = new window.YT.Player("youtube-player", {
            height: "315",
            width: "100%",
            videoId: youtubeId,
            playerVars: {
              autoplay: 1,
              controls: 1,
              origin: window.location.origin
            },
            events: {
              onReady: (event) => {
                console.log(`%c✅ Player ready for: ${trackName}`, "color: #00ff88; font-size: 12px;")
                event.target.playVideo()
              },
              onError: (event) => {
                console.error(`%c❌ YouTube Error Code: ${event.data}`, "color: #ff006e; font-size: 12px;")
                alert(`Video yüklenemedi. YouTube video ID: ${youtubeId}\nHata kodu: ${event.data}`)
                trackNum.textContent = originalNumber
              },
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  trackNum.textContent = originalNumber
                  document.querySelectorAll(".playlist-item").forEach((i) => i.classList.remove("playing"))
                }
              },
            },
          })
          console.log(`%c🎵 Now playing: ${trackName}`, "color: #ff006e; font-size: 14px;")
        } catch (error) {
          console.error("%c❌ Player creation failed:", "color: #ff006e; font-size: 12px;", error)
          alert("YouTube player oluşturulamadı. Lütfen sayfayı yenileyin.")
          trackNum.textContent = originalNumber
        }
      } else {
        youtubePlayer.loadVideoById(youtubeId)
        console.log(`%c🎵 Now playing: ${trackName}`, "color: #ff006e; font-size: 14px;")
      }
    }

    if (isYouTubeReady && window.YT && window.YT.Player) {
      initPlayer()
    } else {
      const checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          isYouTubeReady = true
          clearInterval(checkInterval)
          initPlayer()
        }
      }, 100)

      setTimeout(() => {
        if (!isYouTubeReady) {
          clearInterval(checkInterval)
          alert("YouTube Player yüklenemedi. Lütfen sayfayı yenileyin.")
        }
      }, 5000)
    }
  })
})

// Rock Buttons
document.querySelectorAll(".rock-button").forEach((button) => {
  button.addEventListener("click", () => {
    const messages = ["🎸 Welcome to the band!", "🤘 Let's jam!", "⚡ Rock and roll!", "🎵 Music is life!"]
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    alert(randomMsg)
    console.log(`%c${randomMsg}`, "color: #ff006e; font-size: 16px; font-weight: bold;")
  })
})

// Console Easter Egg
console.log("%c🚀 HALUK MERT ÖZDEMİR", "color: #00ff88; font-size: 24px; font-weight: bold;")
console.log("%c💻 Software Engineer | Systems Programmer", "color: #64ffda; font-size: 14px;")
console.log("%c📧 0halukozdemir@gmail.com", "color: #8892b0; font-size: 12px;")
console.log(
  "%c🔍 Checking the console? Nice! Here's a secret: Try the Konami Code!",
  "color: #ff006e; font-size: 12px;",
)
console.log("%c⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️ B A", "color: #ffd60a; font-size: 12px;")
console.log("%c🤘 Type 'R-O-C-K' to rock out!", "color: #ff006e; font-size: 12px;")