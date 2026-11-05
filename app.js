const menu=document.querySelector('.menu');
const navigation=document.querySelector('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation?.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation?.classList.contains('open')){navigation.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.focus()}});

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;let count=0;
 document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=filter!=='All projects'&&card.dataset.category!==filter;if(!card.hidden)count++});
 const countTarget=document.querySelector('#result-count');if(countTarget)countTarget.textContent=`Showing ${count} concept project${count===1?'':'s'}`;
}));

document.querySelectorAll('[data-demo]').forEach(demo=>{
 const buttons=[...demo.querySelectorAll('[data-demo-choice]')];
 const output=demo.querySelector('[data-demo-result]');
 buttons.forEach(btn=>btn.addEventListener('click',()=>{
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
  if(output)output.textContent=btn.dataset.demoMessage||'Option selected. This is a visual demo only.';
 }));
});

const form=document.querySelector('#brief-form');
if(form){
 const params=new URLSearchParams(location.search);
 for(const [key,field] of [['project','project'],['package','budget']]){
  const value=params.get(key);const select=form.elements[field];
  if(value&&select?.options&&[...select.options].some(o=>o.value===value))select.value=value;
 }
 function brief(){return 'DYNAMIC WEBWORKS — NEW PROJECT INQUIRY\n\n'+[...new FormData(form)].map(([key,value])=>`${key.toUpperCase()}: ${value}`).join('\n\n')+'\n\nPlease contact me to discuss a quote and next steps.'}
 const status=document.querySelector('#form-status');
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const subject=encodeURIComponent('Website inquiry — '+String(form.elements.business?.value||'New project').slice(0,90));
  const message=encodeURIComponent(brief());
  if(status)status.textContent='Your email application should open. Please review the message and press Send. If nothing happens, use the copy button below and email us directly.';
  window.location.href='mailto:dynamicwebworksleads@gmail.com?subject='+subject+'&body='+message;
 });
 document.querySelector('#copy-brief')?.addEventListener('click',async()=>{
  if(!form.reportValidity())return;
  try{await navigator.clipboard.writeText(brief());if(status)status.textContent='Inquiry copied. Email it to dynamicwebworksleads@gmail.com.'}
  catch{if(status)status.textContent='Clipboard access was blocked. Open your email app and send the information to dynamicwebworksleads@gmail.com.'}
 });
}
