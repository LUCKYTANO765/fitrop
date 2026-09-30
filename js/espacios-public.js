(function () {
  'use strict';
  const inventory=window.fitropStandInventory, $=id=>document.getElementById(id);
  const params=new URLSearchParams(location.search), storageKey='fitrop_checkout_token_v1';
  let sectorId=params.get('sector') || '',number=Number(params.get('stand')) || 0;
  let payment={enabled:false},order=null,token='',page='choose',busy=false,receiptRows=[],previewUrl='',polling=false,inventoryReady=false;
  const active=['awaiting_payment','pending_review','correction','approved'];
  if(params.get('nueva')==='1') { try { localStorage.removeItem(storageKey); } catch (_) {} }
  try { token=localStorage.getItem(storageKey) || ''; } catch (_) {}
  function keepToken(value) { token=value; try { if(value) localStorage.setItem(storageKey,value); else localStorage.removeItem(storageKey); } catch (_) {} }
  const randomToken=()=>Array.from(crypto.getRandomValues(new Uint8Array(32)),n=>n.toString(16).padStart(2,'0')).join('');
  const mapLink=(sector,stand)=>`index.html?sector=${encodeURIComponent(sector)}&stand=${stand}#croquis`;
  async function api(url,body) {
    let response;
    try { response=await fetch(url,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined,cache:'no-store'}); }
    catch (_) { throw new Error('No hay conexión. Tus datos siguen aquí; vuelve a intentarlo.'); }
    const data=await response.json().catch(()=>({}));
    if(!response.ok) throw Object.assign(new Error(data.error || 'No se pudo completar la operación. Inténtalo de nuevo.'),{status:response.status});
    return data;
  }
  function feedback(text='') { $('checkoutFeedback').textContent=text; $('checkoutFeedback').hidden=!text; }
  function resumeBanner() {
    $('resumeBanner').hidden=page!=='choose' || !order;
    if(!order)return;
    $('resumeBanner').querySelector('span').textContent=order.status==='confirmed'?'Tu comprobante de compra está disponible en este navegador.':active.includes(order.status)?'Tienes una compra en curso en este navegador.':'Puedes consultar tu última compra.';
    $('resumeOrder').textContent=order.status==='confirmed'?'Ver mi comprobante →':'Continuar mi compra →';
  }
  function show(next,focus=false) {
    page=next;
    for(const key of ['choose','pay','review','success']) $(`${key}Panel`).hidden=key!==next;
    document.querySelectorAll('[data-step]').forEach(el=>{
      if(el.dataset.step===(next==='success'?'review':next)) el.setAttribute('aria-current','step'); else el.removeAttribute('aria-current');
    });
    resumeBanner();
    if(focus) { $(`${next}Title`).focus({preventScroll:true}); $(`${next}Panel`).scrollIntoView({behavior:'smooth',block:'start'}); }
  }
  function summary(sector,stand,status) {
    const item=inventory.getSector(sector);
    if(!item || !stand) return;
    $('summaryCode').textContent=inventory.getCode(sector,stand);
    $('summarySector').textContent=item.name;
    $('summaryLocation').textContent=`Zona ${inventory.getZone(sector,stand)} · ${item.location}`;
    $('summaryStatus').textContent=status || inventory.labels[inventory.getStatus(sector,stand)];
    $('summaryMap').href=mapLink(sector,stand);
  }
  function selection() {
    if(page!=='choose') return;
    const sector=inventory.getSector(sectorId),grid=$('standChoices'); grid.replaceChildren();
    let available=0;
    for(const option of $('checkoutSector').options) {
      const item=inventory.getSector(option.value); if(!item)continue;
      const count=Array.from({length:item.stands},(_,i)=>inventory.getStatus(item.id,i+1)).filter(status=>status==='available').length;
      option.textContent=inventoryReady?`${item.name} · ${count} disponibles`:item.name;
    }
    if(sector) for(let n=1;n<=sector.stands;n++) {
      const status=inventory.getStatus(sector.id,n); if(status==='available') available++;
      if(inventoryReady && $('onlyAvailable').checked && status!=='available') continue;
      const label=inventoryReady?(status==='unassigned'?'Por habilitar':inventory.labels[status]):'Consultando…';
      const button=document.createElement('button'); button.type='button'; button.dataset.status=inventoryReady?status:'loading';button.dataset.stand=String(n);
      const caption=document.createElement('span'),numeral=document.createElement('strong'),state=document.createElement('small');
      caption.textContent='Puesto';numeral.textContent=String(n).padStart(2,'0');state.textContent=label;button.append(caption,numeral,state);
      button.setAttribute('aria-label',`Puesto ${n} · ${inventory.getCode(sector.id,n)} · ${label}`);
      button.setAttribute('aria-pressed',String(n===number)); button.disabled=!inventoryReady || status!=='available';
      button.addEventListener('click',()=>{number=n;feedback();selection();grid.querySelector(`[data-stand="${n}"]`)?.focus({preventScroll:true});}); grid.append(button);
    }
    $('standRange').textContent=sector?`${sector.name} · Puestos del 1 al ${sector.stands}`:'Selecciona un sector para ver sus números.';
    $('availabilityCount').textContent=!inventoryReady?'Consultando…':sector?`${available} disponibles de ${sector.stands}`:'Elige un sector';
    $('availabilityCount').dataset.available=String(inventoryReady && available>0);
    $('selectionNote').textContent=!inventoryReady?'Consultando la disponibilidad de los puestos…':sector ? available ? 'Los números verdes están disponibles. Pulsa el puesto que quieres comprar.' : 'No hay puestos disponibles para compra en este sector. Consulta el estado debajo de cada número o elige otro sector.' : 'Selecciona un sector para ver sus puestos.';
    if(inventoryReady && sector && !available && $('onlyAvailable').checked) $('selectionNote').textContent='No hay puestos disponibles en este sector. Pulsa “Ver todos los números” para consultar su estado.';
    $('showAllStands').hidden=!sector || !$('onlyAvailable').checked || available>0 || !inventoryReady;
    const valid=sector && Number.isInteger(number) && number>0 && number<=sector.stands;
    const availableSelection=inventoryReady && valid && inventory.getStatus(sector.id,number)==='available';
    $('buyerForm').hidden=!availableSelection;
    $('paymentUnavailable').hidden=payment.enabled;
    $('startCheckout').disabled=busy || !availableSelection || !payment.enabled;
    if(valid) { summary(sectorId,number); if(!availableSelection) $('selectionNote').textContent=`El puesto ${inventory.getCode(sectorId,number)} está ${inventory.labels[inventory.getStatus(sectorId,number)].toLowerCase()}. Elige uno disponible para continuar.`; }
    else { $('summaryCode').textContent='Por elegir'; $('summarySector').textContent=sector?.name || 'Aquí empieza tu próxima oportunidad.'; $('summaryLocation').textContent='Selecciona un puesto para conocer su ubicación.'; $('summaryStatus').textContent='Compra sin cuenta'; $('summaryMap').href='index.html#croquis'; }
  }
  function contacts() {
    for(const id of ['paymentContact','helpContact']) {
      $(id).hidden=!payment.whatsapp;
      if(payment.whatsapp) $(id).href=`https://wa.me/${payment.whatsapp}?text=${encodeURIComponent(`Hola FITROP, necesito ayuda con ${order?.id || (sectorId && number ? inventory.getCode(sectorId,number) : 'la compra de un puesto')}.`)}`;
    }
  }
  function payView(focus=false) {
    show('pay',focus); $('paymentHolder').textContent=payment.holder;
    $('changeStand').hidden=order.status!=='awaiting_payment';
    $('qrCard').hidden=!!payment.testMode || !payment.hasQr;
    $('testPaymentCard').hidden=!payment.testMode;
    if(payment.hasQr && !payment.testMode) $('paymentQr').src='/api/payment/qr';
    $('payStepLabel').textContent=payment.testMode?'Prueba de compra':'Paga con QR';
    $('payTitle').textContent=payment.testMode?'Prueba la compra de tu puesto':'Paga con el QR oficial';
    $('paymentLead').textContent=payment.testMode?'Recorre el proceso sin realizar un pago. Adjunta una imagen para probar la revisión manual.':'Realiza el pago acordado con la organización. Después envía una foto o captura de tu comprobante.';
    $('proofUploadLabel').textContent=payment.testMode?'Adjunta una imagen de prueba':'Adjunta tu comprobante';
    $('manualReviewLabel').textContent=payment.testMode?'La organización revisará la compra manualmente.':'FITROP revisará el pago personalmente.';
    if(payment.testMode) $('sendProof').textContent='Enviar imagen de prueba →';
    $('paymentSteps').innerHTML=payment.testMode?'<li>Adjunta una imagen de prueba.</li><li>La persona encargada revisará la compra desde el panel.</li><li>El puesto se confirma cuando el administrador lo apruebe manualmente y te entregue el código.</li>':'<li>Escanea el QR desde tu aplicación bancaria.</li><li>Comprueba el nombre del destinatario.</li><li>Guarda y adjunta el comprobante.</li>';
    $('holdNotice').textContent=order.status==='correction' ? `Revisión solicitada: ${order.reviewNote}` : payment.testMode ? `Este puesto queda guardado hasta las ${new Date(order.expiresAt).toLocaleTimeString('es-BO',{hour:'2-digit',minute:'2-digit'})}. Envía la imagen de prueba dentro de ese plazo.` : `Guardamos este puesto para ti hasta las ${new Date(order.expiresAt).toLocaleTimeString('es-BO',{hour:'2-digit',minute:'2-digit'})}. Envía tu comprobante dentro de ese plazo.`;
    summary(order.sectorId,order.stand,'Tu compra está en proceso'); contacts();
  }
  function success(result,focus=false) {
    const sector=inventory.getSector(result.sectorId), code=inventory.getCode(result.sectorId,result.stand);
    receiptRows=[['Referencia',result.reference || result.id],['Titular',result.buyerName || result.name],['Puesto',code],['Sector',sector.name],['Ubicación',sector.location],['Confirmación',new Date(result.confirmedAt).toLocaleString('es-BO')]];
    $('purchaseReceipt').replaceChildren();
    for(const [key,value] of receiptRows) { const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;$('purchaseReceipt').append(dt,dd); }
    $('successMap').href=mapLink(result.sectorId,result.stand);summary(result.sectorId,result.stand,'Confirmado a tu nombre'); show('success',focus);
  }
  function renderOrder(focus=false) {
    if(!order) return;
    contacts();
    if(order.status==='confirmed') { success(order,focus); return; }
    if(order.status==='awaiting_payment') {payView(focus);return;}
    const messages={
      pending_review:['Comprobante recibido','Estamos revisando tu pago','La persona encargada de FITROP verificará el pago. Cuando lo apruebe, te entregará un código por el medio acordado. Puedes cerrar esta página y volver desde este mismo navegador.'],
      correction:['Necesitamos una corrección','Revisa tu comprobante','La organización necesita que envíes otro comprobante. Consulta el motivo y adjunta la imagen correcta.'],
      approved:['Pago verificado','Tu pago fue aprobado','Introduce el código que te entregó la organización para confirmar tu puesto. Si aún no lo recibiste, contacta a FITROP.'],
      cancelled:['Compra cancelada','Esta compra fue cancelada','Revisa el motivo indicado por FITROP. Si ya realizaste un pago, contacta a la persona encargada con tu referencia.'],
      expired:['Plazo finalizado','El plazo para pagar terminó','El puesto volvió al inventario. Si ya pagaste, contacta a FITROP con tu comprobante antes de iniciar otra compra.']
    };
    const [badge,title,description]=messages[order.status] || messages.pending_review;
    $('reviewBadge').textContent=badge;$('reviewTitle').textContent=title;$('reviewDescription').textContent=description;
    $('reviewNote').textContent=order.reviewNote || '';$('reviewNote').hidden=!order.reviewNote;
    $('orderReference').textContent=order.id;$('correctProof').hidden=order.status!=='correction';
    $('otherStand').hidden=!['cancelled','expired'].includes(order.status);
    $('confirmCodeForm').hidden=['cancelled','expired','correction'].includes(order.status);
    summary(order.sectorId,order.stand,badge);show('review',focus);
  }
  async function refreshOrder(focus=false) {
    if(!token || polling) return;
    polling=true;
    try { const data=await api('/api/orders/status',{token});order=data.order;if(page==='pay' && order.status==='correction' && !focus)return;if(page!=='choose' || focus)renderOrder(focus);else resumeBanner(); }
    finally {polling=false;}
  }
  async function readImage(file) {
    if(!file || !['image/png','image/jpeg','image/webp'].includes(file.type) || file.size>3*1024*1024) throw new Error('Elige una imagen JPG, PNG o WEBP de hasta 3 MB.');
    return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('No se pudo leer el archivo.'));reader.readAsDataURL(file);});
  }
  inventory.sellableCatalog.forEach(sector=>{const option=document.createElement('option');option.value=sector.id;option.textContent=sector.name;$('checkoutSector').append(option);});
  if(!inventory.getSector(sectorId) || !inventory.sellableCatalog.some(s=>s.id===sectorId)) sectorId='';
  $('checkoutSector').value=sectorId;
  $('checkoutSector').addEventListener('change',()=>{sectorId=$('checkoutSector').value;number=0;feedback();selection();document.querySelector('.sector-tools').scrollIntoView({behavior:'smooth',block:'start'});});
  $('onlyAvailable').addEventListener('change',selection);
  $('showAllStands').addEventListener('click',()=>{$('onlyAvailable').checked=false;selection();});
  window.addEventListener('fitrop:inventory-change',selection);
  $('buyerForm').addEventListener('submit',async event=>{
    event.preventDefault(); if(busy)return;feedback();
    if(order && active.includes(order.status)) {renderOrder(true);return;}
    busy=true;selection();
    try {
      if(order){order=null;keepToken('');}
      if(!token) keepToken(randomToken());
      const data=await api('/api/orders/start',{token,sectorId,stand:number,name:$('buyerName').value.trim(),phone:$('buyerPhone').value.trim()});
      order=data.order;renderOrder(true);await inventory.refresh();
    }catch(error){feedback(error.message);if(error.status && !order)keepToken('');}
    finally{busy=false;selection();}
  });
  $('proofFile').addEventListener('change',async()=>{
    feedback();$('proofPreview').hidden=true;
    if(previewUrl) URL.revokeObjectURL(previewUrl);
    try {await readImage($('proofFile').files[0]);previewUrl=URL.createObjectURL($('proofFile').files[0]);$('proofPreview').src=previewUrl;$('proofPreview').hidden=false;}catch(error){$('proofFile').value='';feedback(error.message);}
  });
  $('proofForm').addEventListener('submit',async event=>{
    event.preventDefault();if(busy)return;busy=true;$('sendProof').disabled=true;feedback();
    try {const image=await readImage($('proofFile').files[0]);const data=await api('/api/orders/proof',{token,image});order=data.order;$('proofForm').reset();$('proofPreview').hidden=true;renderOrder(true);}
    catch(error){feedback(error.message);}
    finally{busy=false;$('sendProof').disabled=false;}
  });
  $('resumeOrder').addEventListener('click',()=>refreshOrder(true).catch(error=>feedback(error.message)));
  $('refreshOrder').addEventListener('click',()=>{feedback();refreshOrder().catch(error=>feedback(error.message));});
  $('correctProof').addEventListener('click',()=>payView(true));
  $('changeStand').addEventListener('click',async()=>{
    if(!window.confirm('Cambia de puesto solo si todavía no pagaste. ¿Volver a elegir?'))return;
    try{await api('/api/orders/cancel',{token});keepToken('');order=null;number=0;show('choose',true);await inventory.refresh();selection();}catch(error){feedback(error.message);}
  });
  $('otherStand').addEventListener('click',()=>{keepToken('');order=null;number=0;show('choose',true);inventory.refresh().then(selection);feedback();});
  function openCode(){ $('codeError').textContent='';$('codeDialog').showModal();$('standaloneCode').focus(); }
  $('openCode').addEventListener('click',openCode);$('closeCode').addEventListener('click',()=>$('codeDialog').close());
  async function redeem(event,inputId,isDialog) {
    event.preventDefault();const button=event.target.querySelector('button[type=submit]');button.disabled=true;feedback();$('codeError').textContent='';
    try {
      const result=await api('/api/redeem',{code:$(inputId).value.trim(),...(!isDialog && order ? {sectorId:order.sectorId,stand:order.stand}: {})});
      $(inputId).value='';if($('codeDialog').open)$('codeDialog').close();success(result,true);await inventory.refresh();
    }catch(error){if(isDialog)$('codeError').textContent=error.message;else feedback(error.message);}
    finally{button.disabled=false;}
  }
  $('standaloneCodeForm').addEventListener('submit',event=>redeem(event,'standaloneCode',true));
  $('confirmCodeForm').addEventListener('submit',event=>redeem(event,'confirmationCode',false));
  $('printReceipt').addEventListener('click',()=>window.print());
  $('newPurchase').addEventListener('click',()=>location.assign('espacios.html?nueva=1#solicitud'));
  $('downloadReceipt').addEventListener('click',()=>{
    const text=['FITROP 2026 — COMPROBANTE DE PUESTO CONFIRMADO','',...receiptRows.map(([key,value])=>`${key}: ${value}`),'','Pago verificado manualmente por la organización.','Este comprobante no es una factura fiscal.'].join('\r\n');
    const url=URL.createObjectURL(new Blob(['\ufeff',text],{type:'text/plain;charset=utf-8'})),link=document.createElement('a');link.href=url;link.download=`FITROP-${receiptRows[0]?.[1] || 'comprobante'}.txt`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  async function init(){
    if(!sectorId){sectorId=inventory.sellableCatalog[0].id;$('checkoutSector').value=sectorId;}
    selection();
    try {const result=await Promise.all([api('/api/payment'),inventory.refresh()]);payment=result[0];if(!result[1])throw new Error('No se pudo actualizar la disponibilidad. Recarga la página antes de continuar.');inventoryReady=true;
      if(!params.get('sector') && sectorId===inventory.sellableCatalog[0].id && !number){const firstAvailable=inventory.sellableCatalog.find(sector=>Array.from({length:sector.stands},(_,i)=>inventory.getStatus(sector.id,i+1)).includes('available'));if(firstAvailable){sectorId=firstAvailable.id;$('checkoutSector').value=sectorId;}}
      contacts();selection();}
    catch(error){feedback(error.message);}
    if(token)try{await refreshOrder();if(order && (!params.get('sector') || (order.sectorId===sectorId && order.stand===number)))renderOrder();}catch(error){if(error.status===404)keepToken('');else feedback(error.message);}
    if(params.has('manzana'))feedback('Este lote todavía no está habilitado para compra directa. Elige un puesto del inventario o consulta con FITROP.');
    if(['#activar','#reserva-qr'].includes(location.hash))openCode();
  }
  setInterval(()=>{if(document.visibilityState==='visible' && order && page!=='choose' && page!=='success')refreshOrder().catch(()=>{});},20000);
  window.addEventListener('hashchange',()=>{if(['#activar','#reserva-qr'].includes(location.hash) && !$('codeDialog').open)openCode();});
  init();
})();
