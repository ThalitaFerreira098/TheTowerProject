const COMPONENT_MAP = {
    hero: { jsonKey: 'hero', htmlId: 'home' },
    modalidades: { jsonKey: 'modalidades', htmlId: 'modalidades' },
    tipodeaula: { jsonKey: 'tiposDeAulas', htmlId: 'tipos' },
    metodologia: { jsonKey: 'metodologia', htmlId: 'metodologia' },
    eventos: { jsonKey: 'eventos', htmlId: 'eventos' },
    planos: { jsonKey: 'planos', htmlId: 'planos' },
    sobre: { jsonKey: 'sobre', htmlId: 'sobre' },
    contato: { jsonKey: 'footer', htmlId: 'contato' },
    depoimentos: {jsonKey: 'depoimentos', htmlId: 'depoimentos'}
};

let siteData = {};

const BASE_PATH = './landingpage';

async function loadComponent(name, placeholderId, data) {
    try {
        const response = await fetch(`${BASE_PATH}/${name}.html`);
        
        if (!response.ok) throw new Error(`Erro ao carregar ${name} (404)`);
        const html = await response.text();
        
        const container = document.getElementById(placeholderId);
        if (container) {
            container.innerHTML = html;

            if (!document.querySelector(`link[href="${BASE_PATH}/styles/${name}.css"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `${BASE_PATH}/styles/${name}.css`;
                document.head.appendChild(link);
            }

        
            try {
                const module = await import(`./${name}.js`);
                if (module.init) {
                    module.init(data); 
                }
            } catch (jsError) {
                console.warn(`Aviso: Script para ${name} não encontrado.`, jsError);
            }
        }
    } catch (error) {
        console.error(`Erro fatal ao carregar o componente ${name}:`, error);
    }
}

async function startApp() {
    try {
        const resp = await fetch(`${BASE_PATH}/data.json`);
        siteData = await resp.json();

        for (const [componentName, map] of Object.entries(COMPONENT_MAP)) {
            const dataToPass = siteData[map.jsonKey];
            if (dataToPass) {
                await loadComponent(componentName, map.htmlId, dataToPass);
            } else {
                console.error(`Dados faltando no JSON para: ${componentName}`);
            }
        }

        initializeMenu();
        initializeAnimations();

    } catch (error) {
        console.error("Erro fatal ao iniciar o app:", error);
    }
}

function initializeAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, observerOptions);

    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-fade-in-up');
        animatedElements.forEach(el => observer.observe(el));
    }, 800); 
}

function initializeMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');
    if(toggle && menu) {
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        newToggle.addEventListener('click', () => menu.classList.toggle('active'));
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => menu.classList.remove('active'));
        });
    }
}

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if(window.scrollY > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', startApp);