/* ==========================================================================
   Tide&Seak — main.js
   Navbar scroll state, mobile drawer, scroll-reveal, FAQ accordion,
   subtle hero parallax. Vanilla JS, no dependencies.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Navbar scroll state ---- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var setNavState = function () {
      if (window.scrollY > 24) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    };
    setNavState();
    window.addEventListener('scroll', setNavState, { passive: true });
  }

  /* ---- Active nav link (based on body data attribute) ---- */
  var currentPage = document.body.getAttribute('data-page');
  if (currentPage) {
    document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(function (link) {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  /* ---- Mobile drawer ---- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.querySelector('.mobile-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var isOpen = drawer.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .flow-step');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- Subtle hero parallax (disabled under reduced motion) ---- */
  var heroBgImg = document.querySelector('.hero-bg img');
  if (heroBgImg && !reduceMotion) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var offset = Math.min(window.scrollY, 800);
          heroBgImg.style.transform = 'scale(1.08) translateY(' + (offset * 0.08) + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Real 3D Earth route model (homepage only) ---- */
  var globeCanvas = document.querySelector('#globeCanvas');
  if (globeCanvas && window.THREE && window.THREE.OrbitControls) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.25, 6.4);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    globeCanvas.appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 4.7;
    controls.maxDistance = 8;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.45;

    var globeGroup = new THREE.Group();
    globeGroup.rotation.set(0, 0, -0.08);
    scene.add(globeGroup);

    var textureLoader = new THREE.TextureLoader();
    var earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    var earthNormal = textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
    var earthSpecular = textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');

    var earth = new THREE.Mesh(
      new THREE.SphereGeometry(2.05, 96, 64),
      new THREE.MeshPhongMaterial({
        map: earthTexture,
        normalMap: earthNormal,
        normalScale: new THREE.Vector2(0.32, 0.32),
        specularMap: earthSpecular,
        specular: new THREE.Color(0x3dd6e8),
        shininess: 14
      })
    );
    globeGroup.add(earth);

    var atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.11, 64, 48),
      new THREE.MeshBasicMaterial({ color: 0x3dd6e8, transparent: true, opacity: 0.12, side: THREE.BackSide })
    );
    globeGroup.add(atmosphere);

    scene.add(new THREE.HemisphereLight(0x9edff0, 0x06131f, 1.1));
    var sun = new THREE.DirectionalLight(0xffffff, 2.1);
    sun.position.set(-4, 3, 5);
    scene.add(sun);

    var stars = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({ color: 0x8fd9e6, size: 0.018, transparent: true, opacity: 0.7 })
    );
    var starPositions = [];
    for (var starIndex = 0; starIndex < 420; starIndex += 1) {
      var starRadius = 7 + Math.random() * 5;
      var starTheta = Math.random() * Math.PI * 2;
      var starPhi = Math.acos(2 * Math.random() - 1);
      starPositions.push(
        starRadius * Math.sin(starPhi) * Math.cos(starTheta),
        starRadius * Math.cos(starPhi),
        starRadius * Math.sin(starPhi) * Math.sin(starTheta)
      );
    }
    stars.geometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    scene.add(stars);

    var routeMaterials = [
      new THREE.LineDashedMaterial({ color: 0x3dd6e8, transparent: true, opacity: 0.9, dashSize: 0.09, gapSize: 0.07 }),
      new THREE.LineDashedMaterial({ color: 0xe1a83d, transparent: true, opacity: 0.95, dashSize: 0.09, gapSize: 0.07 }),
      new THREE.LineDashedMaterial({ color: 0xf4f7fa, transparent: true, opacity: 0.75, dashSize: 0.09, gapSize: 0.07 })
    ];
    var routeVessels = [];
    var globePoints = [];
    var earthRadius = 2.075;

    var latLonToVector = function (latitude, longitude, radius) {
      var phi = (90 - latitude) * Math.PI / 180;
      var theta = (longitude + 180) * Math.PI / 180;
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    var addRoute = function (source, target, material, phase) {
      var sourcePoint = latLonToVector(source[0], source[1], earthRadius);
      var targetPoint = latLonToVector(target[0], target[1], earthRadius);
      var midPoint = sourcePoint.clone().add(targetPoint).normalize().multiplyScalar(earthRadius + 0.46);
      var curve = new THREE.QuadraticBezierCurve3(sourcePoint, midPoint, targetPoint);
      var routeGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(80));
      var routeLine = new THREE.Line(routeGeometry, material);
      routeLine.computeLineDistances();
      globeGroup.add(routeLine);

      var sourceNode = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 8),
        new THREE.MeshBasicMaterial({ color: material.color })
      );
      sourceNode.position.copy(sourcePoint);
      globeGroup.add(sourceNode);

      var vessel = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 16, 12),
        new THREE.MeshBasicMaterial({ color: material.color })
      );
      globeGroup.add(vessel);
      routeVessels.push({ curve: curve, mesh: vessel, progress: phase, material: material });
    };

    var indiaEast = [13.08, 80.27];
    var labelElements = document.querySelectorAll('[data-globe-point]');
    var pointCoordinates = {
      australia: [-33.86, 151.2],
      mozambique: [-25.97, 32.58],
      indonesia: [-6.2, 106.8],
      india: indiaEast
    };
    labelElements.forEach(function (labelElement) {
      var coordinates = pointCoordinates[labelElement.getAttribute('data-globe-point')];
      globePoints.push({ element: labelElement, position: latLonToVector(coordinates[0], coordinates[1], earthRadius + 0.1) });
    });
    addRoute([-33.86, 151.2], indiaEast, routeMaterials[0], 0.08);
    addRoute([-25.97, 32.58], indiaEast, routeMaterials[1], 0.44);
    addRoute([-6.2, 106.8], indiaEast, routeMaterials[2], 0.72);

    var targetNode = new THREE.Mesh(
      new THREE.SphereGeometry(0.095, 18, 12),
      new THREE.MeshBasicMaterial({ color: 0x3dd6e8 })
    );
    targetNode.position.copy(latLonToVector(indiaEast[0], indiaEast[1], earthRadius + 0.02));
    globeGroup.add(targetNode);

    var tooltip = document.querySelector('#globeTooltip');
    labelElements.forEach(function (labelElement) {
      labelElement.addEventListener('mouseenter', function () {
        tooltip.textContent = labelElement.getAttribute('data-name') + ' | ' + labelElement.getAttribute('data-coordinates');
        tooltip.classList.add('is-visible');
      });
      labelElement.addEventListener('mouseleave', function () {
        tooltip.classList.remove('is-visible');
      });
    });

    var resizeGlobe = function () {
      var width = globeCanvas.clientWidth;
      var height = globeCanvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resizeGlobe();
    window.addEventListener('resize', resizeGlobe);

    renderer.domElement.addEventListener('pointerdown', function () {
      controls.autoRotate = false;
    });
    var clock = new THREE.Clock();
    var animateGlobe = function () {
      var elapsed = clock.getElapsedTime();
      var delta = clock.getDelta();
      routeVessels.forEach(function (route) {
        route.progress = (route.progress + (0.055 * delta)) % 1;
        route.material.dashOffset = -elapsed * 0.16;
        route.mesh.position.copy(route.curve.getPointAt(route.progress));
      });
      targetNode.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.18);
      controls.update();
      var cameraPosition = camera.position.clone();
      var globeCenter = new THREE.Vector3();
      globeGroup.getWorldPosition(globeCenter);
      globePoints.forEach(function (point) {
        var worldPosition = point.position.clone();
        globeGroup.localToWorld(worldPosition);
        var surfaceNormal = worldPosition.clone().sub(globeCenter);
        var toCamera = cameraPosition.clone().sub(worldPosition);
        var isFacingCamera = surfaceNormal.dot(toCamera) > 0;
        var projected = worldPosition.project(camera);
        var left = (projected.x * 0.5 + 0.5) * globeCanvas.clientWidth;
        var top = (-projected.y * 0.5 + 0.5) * globeCanvas.clientHeight;
        point.element.style.left = left + 'px';
        point.element.style.top = top + 'px';
        point.element.style.opacity = isFacingCamera ? '1' : '0.38';
        point.element.style.pointerEvents = 'auto';
      });
      renderer.render(scene, camera);
      window.requestAnimationFrame(animateGlobe);
    };
    animateGlobe();
  }

})();
