const $=(s)=>document.querySelector(s);
const scenes=[...document.querySelectorAll('.hero-scene')],dots=[...document.querySelectorAll('#heroDots button')];let active=0,override=null;
function showSlide(index){active=(index+scenes.length)%scenes.length;scenes.forEach((el,i)=>el.classList.toggle('active',i===active));dots.forEach((el,i)=>el.classList.toggle('active',i===active));$('#heroCount').textContent=String(active+1).padStart(2,'0')+' / 0'+scenes.length;}
dots.forEach((el,i)=>el.addEventListener('click',()=>showSlide(i)));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{if(!override)showSlide(active+1)},7000);
$('#hamb')?.addEventListener('click',()=>{const nav=$('#nav');let opened=nav.classList.toggle('open');$('#hamb').setAttribute('aria-expanded',String(opened))});
$('#year').textContent=new Date().getFullYear();

if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){let o=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');o.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>o.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('show'));
