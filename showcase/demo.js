document.addEventListener('click',function(e){
 const choice=e.target.closest('[data-choice]');
 if(choice){const area=choice.closest('[data-demo-area]')||choice.parentElement;area.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===choice)));const out=area.querySelector('[data-demo-result]');if(out)out.textContent='Selected: '+choice.getAttribute('data-choice')+'. This is a visual preview only.';}
 const confirm=e.target.closest('[data-demo-confirm]');
 if(confirm){const area=confirm.closest('[data-demo-area]')||confirm.parentElement;const out=area.querySelector('[data-demo-result]');if(out)out.textContent=confirm.getAttribute('data-demo-confirm');}
 const compare=e.target.closest('[data-compare-toggle]');
 if(compare){const el=document.getElementById(compare.getAttribute('data-compare-toggle'));if(el){const after=el.classList.toggle('is-after');const lab=el.querySelector('[data-compare-label]');if(lab)lab.textContent=after?'ILLUSTRATIVE / AFTER VIEW':'ILLUSTRATIVE / BEFORE VIEW';}}
 const cart=e.target.closest('[data-addcart]');
 if(cart){const el=document.querySelector('[data-cart-count]');const n=Number(el?.textContent||0)+1;if(el)el.textContent=n;const feedback=document.querySelector('[data-cart-feedback]');if(feedback)feedback.textContent=cart.getAttribute('data-addcart')+' added to your demo bag ('+n+' items). No checkout or payment.';}
});