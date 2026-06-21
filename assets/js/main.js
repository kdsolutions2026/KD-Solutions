(function() {
            const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isMobileExperience = isCoarsePointer || isSmallScreen || reduceMotion;

            document.body.classList.toggle('mobile-stable', isMobileExperience);
            document.body.classList.add('loaded');
            document.body.classList.remove('loading');

            // ============ LENIS SMOOTH SCROLL ============
            let lenis = null;
            if (!isMobileExperience && typeof Lenis !== 'undefined') {
                lenis = new Lenis({
                    duration: 1.5,
                    easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
                    smoothWheel: true,
                    smoothTouch: false,
                    touchMultiplier: 2,
                });

                function raf(time) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }
                requestAnimationFrame(raf);
            } else {
                document.documentElement.style.scrollBehavior = 'smooth';
            }

            // ============ MOUSE GLOW ============
            const mouseGlow = document.getElementById('mouse-glow'); 

            let mouseX = window.innerWidth / 2; 

            let mouseY = window.innerHeight / 2; 

            let currentX = mouseX; 

            let currentY = mouseY; 

 

            document.addEventListener('mousemove', function(e) { 

                mouseX = e.clientX; 

                mouseY = e.clientY; 

            }); 

 

            function animateGlow() { 

                currentX += (mouseX - currentX) * 0.08; 

                currentY += (mouseY - currentY) * 0.08; 

                if (mouseGlow) { 

                    mouseGlow.style.left = currentX + 'px'; 

                    mouseGlow.style.top = currentY + 'px'; 

                } 

                requestAnimationFrame(animateGlow); 

            } 

            animateGlow(); 

 

            // ============ PARTICLES (tsParticles) ============ 

            if (!isMobileExperience && typeof tsParticles !== 'undefined') { 

                tsParticles.load('particleCanvas', { 

                    fpsLimit: 40, 

                    fullScreen: false, 

                    particles: { 

                        number: { value: 50, density: { enable: true } }, 

                        color: { value: ['#DE1600', '#B01200', '#ffffff'] }, 

                        opacity: { value: { min: 0.05, max: 0.35 }, animation: { enable: true, 

                                speed: 0.3 } }, 

                        size: { value: { min: 0.5, max: 2.2 } }, 

                        links: { enable: true, color: 'rgba(222,22,0,0.08)', distance: 150, 

                            opacity: 0.15 }, 

                        move: { enable: true, speed: 0.4, direction: 'none', outModes: 'bounce' }, 

                    }, 

                    interactivity: { 

                        events: { onHover: { enable: true, mode: 'grab' } }, 

                        modes: { grab: { distance: 200, links: { opacity: 0.3, color: '#DE1600' } } }, 

                    }, 

                    detectRetina: true, 

                }); 

            } 

 

            // ============ ORBS PARALLAX (GSAP) ============ 

            if (!isMobileExperience && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') { 

                gsap.registerPlugin(ScrollTrigger); 

                gsap.to('.bg-orb--1', { 

                    y: '8%', 

                    x: '5%', 

                    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', 

                        scrub: 1.2 } 

                }); 

                gsap.to('.bg-orb--2', { 

                    y: '-6%', 

                    x: '-4%', 

                    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', 

                        scrub: 1.2 } 

                }); 

                gsap.to('.bg-orb--3', { 

                    y: '10%', 

                    x: '-3%', 

                    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', 

                        scrub: 1.2 } 

                }); 

            } 

 

            // ============ REVEAL ON SCROLL ============ 

            const revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale'); 

            const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }; 

            const revealObserver = new IntersectionObserver(function(entries) { 

                entries.forEach(function(entry) { 

                    if (entry.isIntersecting) { 

                        entry.target.classList.add('visible'); 

                        revealObserver.unobserve(entry.target); 

                    } 

                }); 

            }, observerOptions); 

            revealElements.forEach(function(el) { revealObserver.observe(el); }); 

 

            // ============ 3D TILT EFFECT ============ 

            const tiltElements = document.querySelectorAll('[data-3d], #heroCard3D'); 

            if (!isMobileExperience) tiltElements.forEach(function(el) { 

                el.addEventListener('mousemove', function(e) { 

                    const rect = el.getBoundingClientRect(); 

                    const x = e.clientX - rect.left; 

                    const y = e.clientY - rect.top; 

                    const centerX = rect.width / 2; 

                    const centerY = rect.height / 2; 

                    const rotateY = ((x - centerX) / centerX) * 8; 

                    const rotateX = ((y - centerY) / centerY) * -8; 

                    el.style.transform = 

                        'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(8px)'; 

                    el.style.transition = 'transform 0.1s ease-out'; 

                }); 

                el.addEventListener('mouseleave', function() { 

                    el.style.transform = 

                    'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)'; 

                    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'; 

                }); 

            }); 

 

            // ============ IMAGE FALLBACKS ============
            document.querySelectorAll('.founder-card__photo').forEach(function(img) {
                img.addEventListener('error', function() {
                    const fallback = document.createElement('div');
                    fallback.className = 'founder-card__fallback is-visible';
                    fallback.textContent = (img.alt || '').includes('Kaleo') ? 'K' : 'A';
                    img.classList.add('is-hidden');
                    img.insertAdjacentElement('afterend', fallback);
                }, { once: true });
            });
            // ============ TYPING EFFECT ============
            const typingElement = document.getElementById('typingText');
            const words = ['crescer online.', 'ter resultados.', 'se destacar.', 'vender mais.'];

            if (typingElement) {
                if (reduceMotion) {
                    typingElement.textContent = words[0];
                    typingElement.classList.add('hero__typing--static');
                } else {
                    let wordIndex = 0;
                    let charIndex = 0;
                    let isDeleting = false;
                    let typingSpeed = 100;

                    function typeEffect() {
                        const currentWord = words[wordIndex];
                        if (isDeleting) {
                            typingElement.textContent = currentWord.substring(0, charIndex - 1);
                            charIndex--;
                            typingSpeed = 40;
                        } else {
                            typingElement.textContent = currentWord.substring(0, charIndex + 1);
                            charIndex++;
                            typingSpeed = 100;
                        }
                        if (!isDeleting && charIndex === currentWord.length) {
                            typingSpeed = 2000;
                            isDeleting = true;
                        } else if (isDeleting && charIndex === 0) {
                            isDeleting = false;
                            wordIndex = (wordIndex + 1) % words.length;
                            typingSpeed = 300;
                        }
                        setTimeout(typeEffect, typingSpeed);
                    }
                    setTimeout(typeEffect, 600);
                }
            }

 

            // ============ HEADER SCROLL ============ 

            const header = document.getElementById('header'); 

            window.addEventListener('scroll', function() { 

                if (window.scrollY > 40) header.classList.add('header--scrolled'); 

                else header.classList.remove('header--scrolled'); 

            }, { passive: true }); 

 

            // ============ NAV MOBILE ============ 

            const navToggle = document.getElementById('navToggle'); 

            const navLinks = document.getElementById('navLinks'); 

            navToggle.addEventListener('click', function() { 

                const isOpen = navLinks.classList.toggle('active'); 

                navToggle.setAttribute('aria-expanded', isOpen); 

                const icon = navToggle.querySelector('i'); 

                icon.classList.toggle('fa-bars', !isOpen); 

                icon.classList.toggle('fa-times', isOpen); 

            }); 

            navLinks.querySelectorAll('a').forEach(function(link) { 

                link.addEventListener('click', function() { 

                    navLinks.classList.remove('active'); 

                    navToggle.setAttribute('aria-expanded', 'false'); 

                    const icon = navToggle.querySelector('i'); 

                    icon.classList.add('fa-bars'); 

                    icon.classList.remove('fa-times'); 

                }); 

            }); 

 

            // ============ PORTFÓLIO ============ 

            const imageBasePath = 'assets/images/';
            const whatsappBudgetUrl = 'https://wa.me/5517988457667?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20KD-Solutions%20e%20gostaria%20de%20um%20projeto%20parecido.';
            function whatsappUrl(message) {
                return 'https://wa.me/5517988457667?text=' + encodeURIComponent(message);
            }

            function getSimilarProjectMessage(project) {
                if (project.categoria === 'dashboards') {
                    return 'Olá! Vim pelo site da KD-Solutions e gostaria de um dashboard parecido com o projeto "' + project.titulo + '". Podemos conversar?';
                }
                if (project.categoria === 'sistemas') {
                    return 'Olá! Vim pelo site da KD-Solutions e gostaria de um sistema parecido com o projeto "' + project.titulo + '". Podemos conversar?';
                }
                return 'Olá! Vim pelo site da KD-Solutions e gostaria de um site parecido com o projeto "' + project.titulo + '". Podemos conversar?';
            }

            const projetos = [ 

                { id: 1, titulo: 'Estoque Fort.Art', descricao: 'Sistema interno para controle de produtos, categorias, indicadores e alertas de baixo estoque.', 

                    categoria: 'sistemas', icone: '📦', techs: ['Sistema de estoque', 'Painel interno', 'Gestão de produtos'], 

                tag: 'Sistema', imagem: 'portfolio-estoque-fortart.jpg', url: 'https://contatokaleomiranda-netizen.github.io/Estoque-da-papelaria/' }, 

                { id: 2, titulo: 'Pousada Estrela da Manhã', descricao: 'Site institucional para apresentar a pousada, destacar seus espaços e direcionar reservas pelo WhatsApp.', 

                    categoria: 'sites', icone: '🏡', techs: ['Site institucional', 'Responsivo', 'WhatsApp'], tag: 'Site', imagem: 'portfolio-pousada.jpg', url: 'https://contatokaleomiranda-netizen.github.io/Pousada-Estrela-da-Manh-/' }, 

                { id: 3, titulo: 'Mayle Store', descricao: 'Loja online de moda feminina com vitrine de produtos, identidade visual e experiência responsiva.', 

                    categoria: 'sites', icone: '🛍️', techs: ['Loja online', 'Catálogo', 'Responsivo'], 

                tag: 'Site', imagem: 'portfolio-mayle-store.jpg', url: 'https://contatokaleomiranda-netizen.github.io/mayle-store/' }, 

                { id: 4, titulo: 'Fort.Art Papelaria e Presentes', descricao: 'Site para papelaria com apresentação da marca, produtos criativos e chamada para visita/contato.', 

                    categoria: 'sites', icone: '✏️', techs: ['Site institucional', 'Papelaria', 'Responsivo'], tag: 'Site', imagem: 'portfolio-fortart.jpg', url: 'https://fortart.com.br/' },

                { id: 5, titulo: 'Dashboard de Vendas', descricao: 'Painel de indicadores comerciais com visão de faturamento, pedidos, ticket médio, categorias e cidades.', 

                    categoria: 'dashboards', icone: '📊', techs: ['Power BI', 'Indicadores', 'Vendas'], tag: 'Dashboard', imagem: 'portfolio-dashboard-vendas.svg', url: '#contato', actionLabel: 'Orçar no formulário' },

                { id: 6, titulo: 'Painel Analítico 360', descricao: 'Dashboard multipágina para acompanhar vendas, clientes, produtos, canais e eficiência operacional.', 

                    categoria: 'dashboards', icone: '📈', techs: ['Power BI', 'BI 360', 'Análise gerencial'], tag: 'Dashboard', imagem: 'portfolio-dashboard-bi.svg', url: '#contato', actionLabel: 'Orçar no formulário' } 

            ]; 

            const portfolioGrid = document.getElementById('portfolioGrid'); 

 

            function renderizarPortfolio(filtro) { 

                const cat = filtro || 'todos'; 

                portfolioGrid.style.opacity = '0'; 

                setTimeout(function() { 

                    const filtrados = cat === 'todos' ? projetos : projetos.filter(function(p) { 

                        return p.categoria === cat; }); 

                    portfolioGrid.innerHTML = filtrados.map(function(p) { 

                        return '<div class="project-card reveal" data-3d>' + 

                            '<div class="project-card__img"><img class="project-card__shot" src="' + imageBasePath + p.imagem + '" alt="Prévia do projeto ' + p.titulo + '" loading="lazy" decoding="async" width="960" height="667"><span class="project-card__tag">' + p 

                            .tag + '</span></div>' + 

                            '<div class="project-card__info"><h3>' + p.titulo + '</h3><p>' + p 

                            .descricao + '</p><div class="project-card__techs">' + p.techs.map( 

                                function(t) { return '<span>' + t + '</span>'; }).join('') + 

                            '</div><div class="project-card__actions"><a class="project-card__link" href="' + p.url + '"' + (p.url.charAt(0) === '#' ? '' : ' target="_blank" rel="noopener noreferrer"') + '>' + (p.actionLabel || 'Ver projeto') + ' <i class="fas ' + (p.url.charAt(0) === '#' ? 'fa-arrow-down' : 'fa-arrow-up-right-from-square') + '" aria-hidden="true"></i></a><a class="project-card__link project-card__link--ghost" href="' + whatsappUrl(getSimilarProjectMessage(p)) + '" target="_blank" rel="noopener noreferrer">Quero parecido</a></div></div></div>'; 

                    }).join(''); 

                    portfolioGrid.style.opacity = '1'; 

                    document.querySelectorAll('.project-card.reveal').forEach(function(el) { 

                        revealObserver.observe(el); 

                    }); 

                    if (!isMobileExperience) document.querySelectorAll('.project-card[data-3d]').forEach(function(el) { 

                        el.addEventListener('mousemove', function(e) { 

                            const rect = el.getBoundingClientRect(); 

                            const x = e.clientX - rect.left; 

                            const y = e.clientY - rect.top; 

                            const cx = rect.width / 2; 

                            const cy = rect.height / 2; 

                            el.style.transform = 

                                'perspective(800px) rotateX(' + ((y - cy) / cy) * -6 + 

                                'deg) rotateY(' + ((x - cx) / cx) * 6 + 

                                'deg) translateZ(5px)'; 

                            el.style.transition = 'transform 0.1s ease-out'; 

                        }); 

                        el.addEventListener('mouseleave', function() { 

                            el.style.transform = 

                                'perspective(800px) rotateX(0) rotateY(0) translateZ(0)'; 

                            el.style.transition = 

                            'transform 0.5s cubic-bezier(0.16,1,0.3,1)'; 

                        }); 

                    }); 

                }, 200); 

            } 

 

            document.querySelectorAll('.filter-btn').forEach(function(btn) { 

                btn.addEventListener('click', function() { 

                    document.querySelectorAll('.filter-btn').forEach(function(b) { b 

                            .classList.remove('active'); }); 

                    btn.classList.add('active'); 

                    renderizarPortfolio(btn.getAttribute('data-filter')); 

                }); 

            }); 

            renderizarPortfolio('todos'); 

 

            // ============ FORMULÁRIO ============
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const accessKeyInput = document.getElementById('web3formsAccessKey');
                const configuredKey = window.KD_FORM_CONFIG && window.KD_FORM_CONFIG.web3formsAccessKey;
                if (accessKeyInput && configuredKey && configuredKey !== 'COLE_SUA_ACCESS_KEY_AQUI') {
                    accessKeyInput.value = configuredKey;
                }

                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const fb = document.getElementById('formFeedback');
                    const nome = document.getElementById('nome').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const msg = document.getElementById('mensagem').value.trim();
                    const key = accessKeyInput ? accessKeyInput.value.trim() : '';

                    if (!nome || !email || !msg || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        fb.textContent = 'Preencha nome, e-mail válido e mensagem para enviar.';
                        fb.style.color = '#ef4444';
                        return;
                    }

                    if (!key) {
                        fb.textContent = 'Formulário pronto. Falta colar a access_key do Web3Forms para ativar o envio ao Gmail.';
                        fb.style.color = '#f59e0b';
                        return;
                    }

                    if (submitButton) {
                        submitButton.disabled = true;
                        submitButton.textContent = 'Enviando...';
                    }
                    fb.textContent = 'Enviando sua solicitação...';
                    fb.style.color = '#4ade80';

                    try {
                        const formData = new FormData(contactForm);
                        const object = Object.fromEntries(formData);
                        object.name = nome;
                        object.email = email;
                        object.message = msg;

                        const response = await fetch('https://api.web3forms.com/submit', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            body: JSON.stringify(object),
                        });
                        const result = await response.json();

                        if (response.status !== 200 || !result.success) {
                            throw new Error(result.message || 'Falha no envio');
                        }

                        fb.textContent = 'Solicitação enviada com sucesso!';
                        fb.style.color = '#4ade80';
                        contactForm.reset();
                    } catch (error) {
                        fb.textContent = 'Não foi possível enviar agora. Verifique a access_key do Web3Forms ou tente novamente.';
                        fb.style.color = '#ef4444';
                    } finally {
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = 'Enviar orçamento por e-mail';
                        }
                    }
                });
            }

            // ============ CHATBOT ============
            const chatToggle = document.getElementById('chatToggle');
            const chatClose = document.getElementById('chatClose');
            const chatWindow = document.getElementById('chatWindow');
            const chatMessages = document.getElementById('chatMessages');
            const chatInput = document.getElementById('chatInput');
            const chatSendBtn = document.getElementById('chatSendBtn');
            const chatbot = document.getElementById('chatbot');

            function setChatOpen(open) {
                chatWindow.classList.toggle('active', open);
                chatWindow.setAttribute('aria-hidden', String(!open));
                chatToggle.setAttribute('aria-expanded', String(open));
                if (open) setTimeout(function() { chatInput.focus(); }, 80);
            }

            function addMessage(text, type) {
                const msg = document.createElement('div');
                msg.className = type === 'user' ? 'msg--user' : 'msg--bot';
                msg.textContent = text;
                chatMessages.appendChild(msg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function getBotResponse(q) {
                const lq = q.toLowerCase();
                if (lq.includes('orçamento') || lq.includes('orcamento') || lq.includes('preço') || lq.includes('custa')) {
                    return 'Perfeito. Você pode enviar o formulário de orçamento ou chamar direto no WhatsApp: +55 17 98845-7667.';
                }
                if (lq.includes('serviço') || lq.includes('site') || lq.includes('sistema') || lq.includes('landing')) {
                    return 'Criamos sites institucionais, landing pages, sistemas web, interfaces responsivas e soluções sob medida para empresas.';
                }
                if (lq.includes('prazo')) {
                    return 'Em geral: landing pages em 1 a 2 semanas, sites em 3 a 5 semanas e sistemas sob medida conforme escopo.';
                }
                if (lq.includes('whatsapp') || lq.includes('contato') || lq.includes('telefone')) {
                    return 'Nosso WhatsApp é +55 17 98845-7667 e o e-mail é comercial.kdsolutions@gmail.com.';
                }
                if (lq.includes('kaleo') || lq.includes('andré') || lq.includes('andre') || lq.includes('dono')) {
                    return 'A KD-Solutions é liderada por Kaleo e André, sócios proprietários e co-fundadores da empresa.';
                }
                return 'Boa! Me diga se você precisa de site, landing page ou sistema. Se preferir, envie o formulário e recebemos tudo por e-mail.';
            }

            function sendChat(text) {
                const txt = (text || chatInput.value).trim();
                if (!txt) return;
                addMessage(txt, 'user');
                chatInput.value = '';
                setTimeout(function() { addMessage(getBotResponse(txt), 'bot'); }, 450);
            }

            if (chatToggle && chatWindow) {
                chatToggle.addEventListener('click', function() { setChatOpen(!chatWindow.classList.contains('active')); });
                chatClose.addEventListener('click', function() { setChatOpen(false); });
                document.addEventListener('click', function(e) {
                    if (chatbot && !chatbot.contains(e.target) && chatWindow.classList.contains('active')) setChatOpen(false);
                });
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') setChatOpen(false);
                });
                chatSendBtn.addEventListener('click', function() { sendChat(); });
                chatInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendChat(); });
                document.querySelectorAll('[data-chat-question]').forEach(function(btn) {
                    btn.addEventListener('click', function() { sendChat(btn.getAttribute('data-chat-question')); });
                });
            }

            // ============ SMOOTH SCROLL PARA LINKS ============ 

            document.querySelectorAll('a[href^="#"]').forEach(function(a) { 

                a.addEventListener('click', function(e) { 

                    const id = this.getAttribute('href'); 

                    if (id === '#') return; 

                    const target = document.querySelector(id); 

                    if (target) { 

                        e.preventDefault(); 

                        if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.2 }); else window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - 72), behavior: isMobileExperience ? "auto" : "smooth" }); 

                    } 

                }); 

            }); 

 

        })();














