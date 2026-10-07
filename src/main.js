import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=matchMedia('(pointer: fine)');
const dialog=document.querySelector('#detail-dialog');
const dialogContent=document.querySelector('#dialog-content');
const services={
 web:{title:'Your brand, beautifully online.',copy:'A thoughtful website brings your story, your services, and your next customer together. We focus on clear design, responsive layouts, and a useful experience on every screen.',items:['Brand-led website design','Responsive development','Content structure and navigation','Launch and handover'],plan:'Website'},
 apps:{title:'An idea people can use.',copy:'Turn a product idea into an experience that feels simple, purposeful, and easy to use. We help shape the first version around what matters most to your audience.',items:['User experience and interface design','Interactive prototypes','App and product development','Iteration around real feedback'],plan:'App or product'},
 software:{title:'Built around your business.',copy:'Some problems need a tool that fits the way you work. We help turn everyday friction into practical software, from internal dashboards to custom workflows.',items:['Workflow discovery','Custom tools and dashboards','Useful integrations','A clear development roadmap'],plan:'Custom software'}
};
const projects={
 timeless:{title:'Timeless Marketing',category:'MARKETING / WEBSITE DESIGN',copy:'A design exploration for a marketing agency: a bold visual identity, a clear services story, and a portfolio experience that gives the work room to speak.',image:'/images/timeless.png',alt:'Timeless Marketing website design'},
 nre:{title:'NRE Employment',category:'EMPLOYMENT / WEBSITE DESIGN',copy:'A corporate website direction for an employment agency. The experience puts clarity, accessible information, and a welcoming first impression at the centre.',image:'/images/nre.png',alt:'NRE employment agency website design'},
 sisterhood:{title:'Sisterhood',category:'COMMUNITY / DIGITAL EXPERIENCE',copy:'A community-focused website project with room for stories, people, and purpose. A warm visual direction supports a clear, approachable experience.',image:'/images/sisterhood.jpg',alt:'Photograph from the Sisterhood website project'}
};
function showDialog(markup){dialogContent.innerHTML=markup;dialog.showModal();}
document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>{const s=services[b.dataset.service];showDialog(`<p class="eyebrow">WHAT WE DO</p><h2>${s.title}</h2><p>${s.copy}</p><ul>${s.items.map(x=>`<li>${x}</li>`).join('')}</ul><a class="button lime dialog-plan" href="#contact" data-plan="${s.plan}">Explore a project</a>`);}));
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>{const p=projects[b.dataset.project];showDialog(`<p class="eyebrow">${p.category}</p><h2>${p.title}</h2><p>${p.copy}</p><img src="${p.image}" alt="${p.alt}"><a class="button lime dialog-plan" href="#contact">Have something in mind?</a>`);}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.addEventListener('click',event=>{const plan=event.target.closest('[data-plan],.dialog-plan');if(!plan)return;if(plan.dataset.plan)document.querySelector('#service-select').value=plan.dataset.plan;if(dialog.open)dialog.close();});
const menu=document.querySelector('.menu-toggle'),navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();});
const steps=[{label:'01 / LISTEN',title:'First, your world.',copy:'We start with your goals, your audience, and the problem worth solving.'},{label:'02 / CREATE',title:'Find the right direction.',copy:'We turn the idea into a clear visual direction and a useful experience, with room for your feedback.'},{label:'03 / BUILD',title:'Make it work beautifully.',copy:'We bring the design to life, refine the details, and prepare the experience for its next chapter.'}];
let stepIndex=0,stepTween;
function changeStep(direction){stepIndex=(stepIndex+direction+steps.length)%steps.length;const s=steps[stepIndex];const update=()=>{document.querySelector('#step-label').textContent=s.label;document.querySelector('#step-title').textContent=s.title;document.querySelector('#step-copy').textContent=s.copy;document.querySelector('#step-counter').textContent=`0${stepIndex+1} / 03`;};if(reducedMotion){update();return;}if(stepTween)stepTween.kill();gsap.set('.step-description',{opacity:1,y:0});stepTween=gsap.timeline().to('.step-description',{opacity:0,y:7,duration:.15}).call(update).to('.step-description',{opacity:1,y:0,duration:.45,ease:'power3.out'});}
document.querySelector('#step-prev').addEventListener('click',()=>changeStep(-1));document.querySelector('#step-next').addEventListener('click',()=>changeStep(1));
// Geometric pattern echoes the supplied reference without adding an invented endorsement.
const checker=document.querySelector('.checker-art');
const pattern=['00011010','10101001','01110110','00101101','00011010'];
pattern.forEach((row,y)=>[...row].forEach((value,x)=>{const tile=document.createElement('i');if(value==='1')tile.classList.add((x+y)%3===0?'purple':'filled');if((x+y)%7===0&&value==='1')tile.classList.add('round');checker.appendChild(tile);}));
// This prototype builds a real, downloadable brief. No external submission is implied.
document.querySelector('#brief-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const text=`SPARK DIGITAL — PROJECT BRIEF\n\nName: ${data.get('name').trim()}\nEmail: ${data.get('email').trim()}\nProject: ${data.get('service')}\n\nTHE IDEA\n${data.get('idea').trim()}\n\nPrepared in the Spark Digital website preview. This brief has not been submitted.\n`;const blob=new Blob([text],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='spark-digital-project-brief.txt';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#form-status').textContent='Your brief is ready. Check your downloads — nothing has been sent.';});

if(!reducedMotion){
 gsap.timeline({defaults:{ease:'power3.out'}}).from('.header',{y:-15,opacity:0,duration:.85}).from('.hero-eyebrow',{y:14,opacity:0,duration:.7},.15).from('.hero h1>span',{y:60,opacity:0,stagger:.13,duration:1.15},.22).from('.hero-description,.hero-actions',{y:22,opacity:0,stagger:.12,duration:.85},.62).from('.platform',{y:75,opacity:0,duration:1.35},.4).from('.float-tile',{scale:.65,opacity:0,stagger:.055,duration:1.3},.5).from('.hero-bottom',{opacity:0,duration:1},1);
 document.querySelectorAll('.float-tile').forEach((tile,i)=>gsap.to(tile,{y:i%2?12:-12,rotation:'+=3',duration:3.7+i*.23,ease:'sine.inOut',repeat:-1,yoyo:true,delay:1.8+i*.1}));
 document.querySelectorAll('.section-heading,.services-top,.services-statement,.approach-top>div:first-child,.contact-copy').forEach(el=>gsap.from(el,{y:40,opacity:0,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
 document.querySelectorAll('.service-cards,.work-grid,.pricing-grid').forEach(group=>gsap.from(group.children,{y:55,opacity:0,stagger:.12,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:group,start:'top 87%',once:true}}));
 document.querySelectorAll('.quote-inner,#brief-form,.footer-top').forEach(group=>gsap.from(group.children,{y:24,opacity:0,stagger:.08,duration:.95,ease:'power3.out',scrollTrigger:{trigger:group,start:'top 87%',once:true}}));
 gsap.to('.checker-art',{y:50,rotation:6,ease:'none',scrollTrigger:{trigger:'.approach-intro',start:'top bottom',end:'bottom top',scrub:1.4}});
}


// One small spark follows the pointer; all native cursor behaviour is preserved.
const cursorSpark=document.querySelector('#cursor-spark');
const sparkIcon=cursorSpark.querySelector('img');
const sparkToggle=document.querySelector('#spark-toggle');
const follower={x:0,y:0,vx:0,vy:0};
const mouse={x:0,y:0};
let sparkEnabled=true,seenPointer=false,pointerActive=false;
try{sparkEnabled=localStorage.getItem('spark-cursor')!=='off';}catch{}
const setSpark=gsap.quickSetter(cursorSpark,'css');
function updateToggle(){
 sparkToggle.setAttribute('aria-pressed',String(sparkEnabled));
 sparkToggle.innerHTML=`<span><svg class="spark-symbol" aria-hidden="true" viewBox="0 0 100 100"><use href="/images/spark-symbol.svg#spark-star"></use></svg></span> Cursor spark: ${sparkEnabled?'on':'off'}`;
 if(!sparkEnabled)gsap.set(cursorSpark,{opacity:0});
}
updateToggle();
sparkToggle.addEventListener('click',()=>{
 sparkEnabled=!sparkEnabled;
 try{localStorage.setItem('spark-cursor',sparkEnabled?'on':'off');}catch{}
 updateToggle();
});
document.addEventListener('pointermove',event=>{
 if(event.pointerType==='touch'||!finePointer.matches||reducedMotion)return;
 mouse.x=event.clientX;mouse.y=event.clientY;pointerActive=true;
 if(!seenPointer){seenPointer=true;follower.x=mouse.x+12;follower.y=mouse.y+12;}
},{passive:true});
document.documentElement.addEventListener('pointerleave',()=>{pointerActive=false;gsap.set(cursorSpark,{opacity:0});});
window.addEventListener('blur',()=>{pointerActive=false;gsap.set(cursorSpark,{opacity:0});});
document.addEventListener('pointerdown',()=>{
 if(reducedMotion||!sparkEnabled||!finePointer.matches)return;
 gsap.killTweensOf(sparkIcon);
 gsap.timeline().to(sparkIcon,{scale:1.2,duration:.25,ease:'power2.out'}).to(sparkIcon,{scale:1,duration:.4,ease:'elastic.out(1,.5)'});
});
let previous=performance.now();
function followSpark(){
 const now=performance.now(),delta=Math.min((now-previous)/1000,.04);previous=now;
 if(reducedMotion||!finePointer.matches||document.hidden)return;
 const visible=sparkEnabled&&seenPointer&&pointerActive&&!dialog.open;
 const targetX=Math.max(3,Math.min(mouse.x+12,innerWidth-31));
 const targetY=Math.max(3,Math.min(mouse.y+12,innerHeight-31));
 // A critically damped spring adds acceleration and inertia without bouncing.
 // Exact integration keeps the same gentle response at different frame rates.
 const spring=11,decay=Math.exp(-spring*delta);
 for(const [axis,velocity,target] of [['x','vx',targetX],['y','vy',targetY]]){
  const offset=follower[axis]-target;
  const impulse=(follower[velocity]+spring*offset)*delta;
  follower[axis]=target+(offset+impulse)*decay;
  follower[velocity]=(follower[velocity]-spring*impulse)*decay;
 }
 setSpark({x:follower.x,y:follower.y,opacity:visible?1:0});
}
gsap.ticker.add(followSpark);
document.addEventListener('visibilitychange',()=>{previous=performance.now();});
window.sparkPreview={follower,reducedMotion};
