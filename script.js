/**
 * Salam Shaik - Personal Portfolio Website Script
 * Interactive logic, Three.js particle systems, and page behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // 1. App State & Elements
  const loader = document.getElementById('loader');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('portfolio-contact-form');
  const typingTextEl = document.getElementById('typing-text');
  
  // Theme state
  let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.body.className = currentTheme === 'light' ? 'light-theme' : '';

  // 2. Hide Loader on Window Load
  window.addEventListener('load', () => {
    if (loader) {
      loader.classList.add('fade-out');
    }
  });

  // Fallback for loader in case load event takes too long
  setTimeout(() => {
    if (loader && !loader.classList.contains('fade-out')) {
      loader.classList.add('fade-out');
    }
  }, 3000);

  // 3. Theme Toggle Implementation
  themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      currentTheme = 'dark';
    } else {
      document.body.classList.add('light-theme');
      currentTheme = 'light';
    }
    localStorage.setItem('portfolio-theme', currentTheme);
    
    // Update Three.js particle colors if particle system is initialized
    updateParticleColors();
  });

  // 4. Mobile Menu Navigation
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a nav link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // 5. Scroll Progress & Sticky Navigation Highlight
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Scroll progress bar width
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = (scrollY / docHeight) * 100;
      scrollIndicator.style.width = `${scrollPercent}%`;
    }

    // Toggle Back to Top button visibility
    if (scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Nav active link based on scroll position
    let currentActive = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentActive = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentActive}`) {
        item.classList.add('active');
      }
    });
  });

  // Back to top click behavior
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 6. Typwriter Effect
  const words = ['AI Engineer', 'Python Developer', 'Backend Developer'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 150;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 75; // Faster deletion
    } else {
      typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start the typing animation
  if (typingTextEl) {
    typeEffect();
  }

  // 7. Scroll Reveal & Skill Progress Animations
  const reveals = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  
  // Cache the targets and reset skill bars to animate on viewport entry
  skillBars.forEach(bar => {
    bar.dataset.targetWidth = bar.style.width;
    bar.style.width = '0%';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger skill bars animation if Skills card is revealed
        const cardBars = entry.target.querySelectorAll('.skill-bar-fill');
        if (cardBars.length > 0) {
          cardBars.forEach(bar => {
            bar.style.width = bar.dataset.targetWidth;
          });
        }
        
        // Stop observing once animated in
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // 8. Contact Form Client-Side Validation
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const phoneInput = document.getElementById('form-phone');
      const messageInput = document.getElementById('form-message');
      const statusMsg = document.getElementById('form-status');
      
      let isValid = true;
      
      // Reset errors
      document.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('invalid'));
      statusMsg.className = 'form-status-msg';
      statusMsg.textContent = '';
      
      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('invalid');
        isValid = false;
      }
      
      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        emailInput.closest('.form-group').classList.add('invalid');
        isValid = false;
      }

      // Validate Phone (Optional, but if filled must be simple digits/format)
      if (phoneInput.value.trim()) {
        const phoneRegex = /^[\d\s+\-()]{7,17}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
          phoneInput.closest('.form-group').classList.add('invalid');
          isValid = false;
        }
      }
      
      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('invalid');
        isValid = false;
      }
      
      if (isValid) {
        // Mock successful form submission
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <div class="spinner-ring" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-left:5px;border-width:2px;"></div>';
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message <i data-lucide="send"></i>';
          lucide.createIcons(); // Refresh icon
          
          statusMsg.classList.add('success');
          statusMsg.textContent = 'Thank you! Your message has been sent successfully.';
          
          // Clear inputs
          contactForm.reset();
        }, 1500);
      } else {
        statusMsg.classList.add('error');
        statusMsg.textContent = 'Please correct the errors in the form fields.';
      }
    });
  }

  // ==========================================================================
  // Three.js Interactive Particle Background
  // ==========================================================================
  let scene, camera, renderer, particlesGeometry, particleSystem;
  const canvasContainer = document.getElementById('canvas-container');
  const particleCount = 130;
  const particlePositions = [];
  const particleVelocities = [];
  
  // Track mouse coordinates in normalized device coordinates (-1 to 1)
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };

  function initThree() {
    if (!canvasContainer || !window.THREE) return;

    // Create Scene, Camera and WebGLRenderer
    scene = new THREE.Scene();
    
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // Create Particles Geometry
    particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Random position inside a bounding box
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 30;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Store initial positions and drift speed/direction velocities
      particlePositions.push({ x, y, z });
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Texture creation dynamically
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const particleTexture = new THREE.CanvasTexture(canvas);

    // Get color theme representation
    const pColor = getThemeParticleColor();

    // Material with round particle glow texture
    const particlesMaterial = new THREE.PointsMaterial({
      color: pColor,
      size: 0.9,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    // Create Points Cloud Object
    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Mouse Interaction event
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    // Start rendering frame loop
    animateThree();
  }

  function getThemeParticleColor() {
    // Select styling color hex based on light or dark body class
    const isLight = document.body.classList.contains('light-theme');
    return isLight ? new THREE.Color('#6D28D9') : new THREE.Color('#8B5CF6');
  }

  function updateParticleColors() {
    if (particleSystem && particleSystem.material) {
      particleSystem.material.color = getThemeParticleColor();
      particleSystem.material.needsUpdate = true;
    }
  }

  function onMouseMove(event) {
    // Convert to client proportions
    targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onWindowResize() {
    if (!camera || !renderer || !canvasContainer) return;
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animateThree() {
    requestAnimationFrame(animateThree);

    // Interpolate mouse movements smoothly
    mouse.x += (targetMouse.x - mouse.x) * 0.1;
    mouse.y += (targetMouse.y - mouse.y) * 0.1;

    const positions = particlesGeometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      // 1. Natural slow drifting drift movement
      particlePositions[i].x += particleVelocities[i].x;
      particlePositions[i].y += particleVelocities[i].y;
      particlePositions[i].z += particleVelocities[i].z;

      // Wrap-around bounds checks
      if (Math.abs(particlePositions[i].x) > 25) particleVelocities[i].x *= -1;
      if (Math.abs(particlePositions[i].y) > 25) particleVelocities[i].y *= -1;
      if (Math.abs(particlePositions[i].z) > 15) particleVelocities[i].z *= -1;

      // Base coordinates to load
      let targetX = particlePositions[i].x;
      let targetY = particlePositions[i].y;
      let targetZ = particlePositions[i].z;

      // 2. Mouse influence calculation (push particles away from cursor pointer)
      // Project mouse coordinates roughly to the scene plane (z ~ 0)
      const mouse3D = new THREE.Vector3(mouse.x * 25, mouse.y * 25, 0);
      const particlePos = new THREE.Vector3(targetX, targetY, targetZ);
      
      const distance = particlePos.distanceTo(mouse3D);
      const pushRadius = 9.0;
      
      if (distance < pushRadius) {
        const force = (pushRadius - distance) / pushRadius;
        const direction = new THREE.Vector3().subVectors(particlePos, mouse3D).normalize();
        
        // Displace position
        targetX += direction.x * force * 2.5;
        targetY += direction.y * force * 2.5;
      }

      // Update positions buffer array
      positions[i * 3] = targetX;
      positions[i * 3 + 1] = targetY;
      positions[i * 3 + 2] = targetZ;
    }

    // Mark geometry vertex buffers for rendering pipeline refresh
    particlesGeometry.attributes.position.needsUpdate = true;

    // Small ambient rotation of the entire particle system
    if (particleSystem) {
      particleSystem.rotation.y += 0.0006;
      particleSystem.rotation.x += 0.0003;
    }

    renderer.render(scene, camera);
  }

  // Initialize ThreeJS particle canvas
  initThree();
});
