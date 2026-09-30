(function(){
  'use strict';
  const $=id=>document.getElementById(id),inventory=window.fitropStandInventory;
  const labels={awaiting_payment:'Esperando comprobante',pending_review:'Comprobante por revisar',correction:'Corrección solicitada',approved:'Pago aprobado · código pendiente de usar',confirmed:'Puesto confirmado',cancelled:'Cancelada',expired:'Plazo vencido'};
  const active=['awaiting_payment','pending_review','correction','approved'];
  let orders=[],settingsLoaded=false,qrPreviewUrl='';const issuedCodes=new Map();
  async function api(url,body){const response=await fetch(url,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined,cache:'no-store'});const data=await response.json();if(!response.ok)throw new Error(data.error || 'No se pudo completar la operación.');return data;}
  const line=(label,value)=>{const el=document.createElement('p'),strong=document.createElement('strong');strong.textContent=`${label}: `;el.append(strong,document.createTextNode(value || '—'));return el;};
  const button=(label,handler,primary=false)=>{const el=document.createElement('button');el.type='button';el.className=`sales-button ${primary?'primary':'secondary'}`;el.textContent=label;el.addEventListener('click',handler);return el;};
  async function reload(){document.dispatchEvent(new Event('fitrop:admin-checkout-change'));}
  function renderOrders(){
    const list=$('adminOrdersList'),filter=$('adminOrderFilter').value;list.replaceChildren();
    $('adminOrderCount').textContent=String(orders.filter(row=>row.status==='pending_review').length);
    const shown=orders.filter(row=>filter==='all' || (filter==='active'?active.includes(row.status):row.status===filter));
    if(!shown.length){const p=document.createElement('p');p.className='sales-empty';p.textContent='No hay compras con este estado.';list.append(p);return;}
    for(const row of shown){
      const card=document.createElement('article');card.className='order-admin-card';
      const h=document.createElement('h4');h.textContent=`${inventory.getCode(row.sectorId,row.stand)} · ${row.name}`;
      const status=document.createElement('span');status.className='status-pill';status.textContent=labels[row.status];
      card.append(h,status,line('Referencia',row.id),line('WhatsApp',row.phone),line('Creada',new Date(row.createdAt).toLocaleString('es-BO')));
      if(row.reviewNote)card.append(line('Revisión',row.reviewNote));
      if(row.hasProof){const proof=document.createElement('a');proof.href=`/api/admin/order-proof/${row.id}`;proof.target='_blank';proof.rel='noopener';proof.className='sales-button secondary';proof.textContent='Abrir comprobante ↗';card.append(proof);}
      const feedback=document.createElement('p');feedback.className='feedback';feedback.setAttribute('role','status');
      let verified;
      if(['pending_review','approved'].includes(row.status)){
        const label=document.createElement('label');label.className='sales-confirm';label.style.marginTop='18px';verified=document.createElement('input');verified.type='checkbox';label.append(verified,document.createTextNode('Verifiqué este pago en la cuenta receptora'));card.append(label);
        card.append(button(row.status==='approved'?'Reemitir código':'Aprobar pago y emitir código',()=>action('approve'),true));
      }
      const savedCode=issuedCodes.get(row.id);
      if(savedCode && row.status==='approved'){
        const code=document.createElement('strong');code.className='issued-code';code.textContent=savedCode;card.append(code);
        card.append(button('Copiar código',async()=>{try{await navigator.clipboard.writeText(savedCode);feedback.textContent='Código copiado. Entréguelo al comprador.';}catch(_){feedback.textContent='Seleccione y copie el código mostrado.';}}));
        const activation=["localhost","127.0.0.1","[::1]"].includes(location.hostname)?'Abre la página de FITROP y pulsa “Tengo un código” para confirmar tu puesto.':`Ingresa a ${location.origin}/espacios.html#activar para confirmar tu puesto.`;
        let phone=row.phone.replace(/\D/g,'');if(phone.length===8)phone=`591${phone}`;
        if(phone.length>=8){const link=document.createElement('a');link.className='sales-button secondary';link.href=`https://wa.me/${phone}?text=${encodeURIComponent(`Hola ${row.name}, te escribimos desde FITROP. Verificamos manualmente tu pago para el puesto ${inventory.getCode(row.sectorId,row.stand)}. Tu código es ${savedCode}. ${activation}`)}`;link.target='_blank';link.rel='noopener';link.textContent='Enviar código al WhatsApp del comprador ↗';link.title='Abre el número que el comprador registró. WhatsApp usará la cuenta iniciada en este dispositivo.';card.append(link);}
      }
      let note;
      if(active.includes(row.status)){
        const label=document.createElement('label');label.textContent='Motivo para corregir o cancelar';note=document.createElement('textarea');note.rows=2;note.maxLength=300;label.append(note);card.append(label);
        if(row.status==='pending_review')card.append(button('Solicitar otro comprobante',()=>action('correction')));
        card.append(button('Cancelar y liberar puesto',()=>action('cancel')));
      }
      card.append(feedback);list.append(card);
      async function action(action){
        feedback.textContent='';
        if(action==='approve' && !verified.checked){feedback.textContent='Confirme que verificó el pago en la cuenta receptora.';return;}
        if(action!=='approve' && !note.value.trim()){feedback.textContent='Escriba el motivo para el comprador.';return;}
        if(action==='cancel' && !window.confirm('¿Cancelar esta compra y liberar el puesto? Esta acción no devuelve un pago bancario.'))return;
        const controls=[...card.querySelectorAll('button')];controls.forEach(el=>el.disabled=true);
        try{const result=await api('/api/admin/orders/review',{id:row.id,action,note:note?.value.trim(),paymentVerified:verified?.checked===true});if(result.code)issuedCodes.set(row.id,result.code);else issuedCodes.delete(row.id);Object.assign(row,result.order);await reload();}
        catch(error){feedback.textContent=error.message;controls.forEach(el=>el.disabled=false);}
      }
    }
  }
  async function fileData(file){
    if(!['image/png','image/jpeg','image/webp'].includes(file.type) || file.size>3*1024*1024)throw new Error('Seleccione JPG, PNG o WEBP de hasta 3 MB.');
    return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('No se pudo leer la imagen.'));reader.readAsDataURL(file);});
  }
  $('adminPaymentQr').addEventListener('change',async()=>{
    const file=$('adminPaymentQr').files[0];if(!file)return;
    try{await fileData(file);if(qrPreviewUrl)URL.revokeObjectURL(qrPreviewUrl);qrPreviewUrl=URL.createObjectURL(file);$('adminQrPreview').src=qrPreviewUrl;$('adminQrPreview').hidden=false;$('adminPaymentMessage').textContent='Vista previa: guarde para publicar.';}
    catch(error){$('adminPaymentQr').value='';$('adminPaymentMessage').textContent=error.message;}
  });
  $('adminPaymentForm').addEventListener('submit',async event=>{
    event.preventDefault();const button=event.target.querySelector('button[type=submit]');button.disabled=true;$('adminPaymentMessage').textContent='Guardando…';
    try{const file=$('adminPaymentQr').files[0];await api('/api/admin/payment',{holder:$('adminPaymentHolder').value,whatsapp:$('adminPaymentWhatsapp').value,enabled:$('adminPaymentEnabled').checked,testMode:$('adminPaymentTestMode').checked,qrData:file?await fileData(file):undefined});$('adminPaymentQr').value='';settingsLoaded=false;await reload();$('adminPaymentMessage').textContent='Configuración guardada.';}
    catch(error){$('adminPaymentMessage').textContent=error.message;}
    finally{button.disabled=false;}
  });
  $('adminOrderFilter').addEventListener('change',renderOrders);$('adminRefreshOrders').addEventListener('click',reload);
  window.fitropCheckoutAdmin={
    render(data){orders=data.orders || [];renderOrders();if(!settingsLoaded){const settings=data.paymentSettings || {};$('adminPaymentHolder').value=settings.holder || '';$('adminPaymentWhatsapp').value=settings.whatsapp || '';$('adminPaymentEnabled').checked=!!settings.enabled;$('adminPaymentTestMode').checked=!!settings.testMode;$('adminQrPreview').hidden=!settings.hasQr;if(settings.hasQr)$('adminQrPreview').src=`/api/admin/payment/qr?t=${Date.now()}`;settingsLoaded=true;}},
    holder(key){return orders.find(row=>`${row.sectorId}:${row.stand}`===key && active.includes(row.status));}
  };
})();
