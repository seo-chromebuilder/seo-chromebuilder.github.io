'use strict';
const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){closeMenu();menu.focus();}});
const form=document.querySelector('#contact-form'),submit=form.querySelector('[type="submit"]'),status=document.querySelector('#form-status');
const fields=[...form.querySelectorAll('input,select,textarea')];
function syncForm(){fields.forEach(field=>{field.setCustomValidity(field.value.trim()?'':'Please complete this field.');});submit.disabled=!fields.every(field=>field.validity.valid);}
form.addEventListener('input',()=>{syncForm();status.hidden=true;});
form.addEventListener('change',()=>{syncForm();status.hidden=true;});
window.addEventListener('pageshow',syncForm);
form.addEventListener('submit',event=>{event.preventDefault();syncForm();if(submit.disabled||!form.reportValidity())return;status.textContent='warning, not able to send, please try again.';status.hidden=false;status.focus();});
syncForm();
let category='All';const search=document.querySelector('#resource-search'),resources=[...document.querySelectorAll('.resource')];
function filterResources(){const term=search.value.trim().toLowerCase();let count=0;resources.forEach(r=>{r.hidden=!((category==='All'||r.dataset.category===category)&&r.textContent.toLowerCase().includes(term));if(!r.hidden)count++;});document.querySelector('#resource-count').textContent=`${count} resource${count===1?'':'s'}`;document.querySelector('#no-results').hidden=count>0;}
search.addEventListener('input',filterResources);document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filterResources();}));
document.querySelector('#year').textContent=new Date().getFullYear();
