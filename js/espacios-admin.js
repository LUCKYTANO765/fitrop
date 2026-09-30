(function () {
  'use strict';
  const inventory=window.fitropStandInventory;
  if (!inventory) return;
  inventory.setAdminMode(true);
  const $=id => document.getElementById(id);
  const sectors=inventory.sellableCatalog;
  const params=new URLSearchParams(location.search);
  const initialSector=sectors.find(item => item.id===params.get('sector')) || sectors[0];
  const requestedNumber=Number(params.get('stand'));
  let selectedNumber=Number.isSafeInteger(requestedNumber) && requestedNumber>0 && requestedNumber<=initialSector.stands?requestedNumber:1;
  let selectedRequestId='';
  let requests=[],codes=[];
  function legacyData() {
    try { return { inventory:JSON.parse(localStorage.getItem('fitrop_stand_inventory_v2') || '{}'),
      requests:JSON.parse(localStorage.getItem('fitrop_stand_requests_v1') || '[]') }; }
    catch (_) { return { inventory:{},requests:[] }; }
  }
  function showLegacyImport() {
    const old=legacyData();
    const stands=Object.keys(old.inventory || {}).length,requests=Array.isArray(old.requests)?old.requests.length:0;
    $('legacyImport').hidden=!(stands || requests);
    $('legacyImportText').textContent=`Hay ${stands} fichas de puestos y ${requests} solicitudes guardadas antes en este navegador. Puede incorporarlas al servidor sin reemplazar registros existentes.`;
  }
  function option(value,label) { const el=document.createElement('option'); el.value=value; el.textContent=label; return el; }
  function textLine(label,value) {
    const p=document.createElement('p'),b=document.createElement('strong'); b.textContent=`${label}: `;
    p.append(b,document.createTextNode(String(value || '—'))); return p;
  }
  async function api(url,method='GET',body) {
    const response=await fetch(url,{ method,headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined,cache:'no-store' });
    const data=await response.json();
    if (!response.ok) throw new Error(data.error || 'No se pudo completar la operación');
    return data;
  }
  function message(value,error=false) {
    $('adminSaveMessage').textContent=value;
    $('adminSaveMessage').classList.toggle('error',error);
  }
  function currentSector() { return inventory.getSector($('adminSector').value); }
  function currentKey() { return `${currentSector().id}:${selectedNumber}`; }
  function renderRequests() {
    $('adminRequestCount').textContent=String(requests.length);
    const list=$('adminRequestsList'); list.replaceChildren();
    if (!requests.length) { const p=document.createElement('p'); p.className='sales-empty'; p.textContent='Todavía no hay solicitudes.'; list.append(p); return; }
    requests.forEach(row => {
      const card=document.createElement('article'); card.className='sales-request-item';
      const code=row.sectorId?inventory.getCode(row.sectorId,row.stand):`Manzana ${row.manzana} · Lote ${row.stand}`;
      const heading=document.createElement('h4'); heading.textContent=`${code} · ${row.name}`;
      card.append(heading,textLine('Teléfono',row.phone));
      if (row.organization) card.append(textLine('Organización',row.organization));
      if (row.email) card.append(textLine('Correo',row.email));
      if (row.notes) card.append(textLine('Comentario',row.notes));
      card.append(textLine('Registro',new Date(row.createdAt).toLocaleString('es-BO')));
      const actions=document.createElement('div'); actions.className='sales-request-actions';
      const select=document.createElement('select'); select.setAttribute('aria-label',`Estado de ${row.id}`);
      [['new','Nueva'],['contacted','Contactada'],['closed','Cerrada']].forEach(([value,label]) => select.append(option(value,label)));
      select.value=row.status || 'new';
      select.addEventListener('change',async () => {
        try { await api('/api/admin/request-status','POST',{ id:row.id,status:select.value }); row.status=select.value; }
        catch (error) { select.value=row.status; alert(error.message); }
      });
      const manage=document.createElement('button'); manage.type='button'; manage.textContent='Gestionar puesto';
      if (!row.sectorId) { manage.disabled=true; manage.textContent='Consulta de lote'; }
      else manage.addEventListener('click',() => {
        $('adminSector').value=row.sectorId; selectedNumber=Number(row.stand); selectedRequestId=row.id;
        $('adminSearch').value=''; renderInventory();
        $('adminBuyerName').value=row.name; $('adminOrganization').value=row.organization || ''; $('adminPhone').value=row.phone;
        $('adminStandForm').scrollIntoView({ behavior:'smooth',block:'center' });
      });
      actions.append(select,manage); card.append(actions); list.append(card);
    });
  }
  function renderForm() {
    const sector=currentSector(),number=selectedNumber,record=inventory.getRecord(sector.id,number);
    $('adminSelectedCode').textContent=inventory.getCode(sector.id,number);
    $('adminSelectedMeta').textContent=`${sector.name} · Zona ${inventory.getZone(sector.id,number)} · ${sector.location}`;
    $('adminMapLink').href=`index.html?sector=${sector.id}&stand=${number}#croquis`;
    $('adminStatus').value=record.status;
    $('adminBuyerName').value=record.buyerName;
    $('adminOrganization').value=record.organization;
    $('adminPhone').value=record.phone;
    $('adminNotes').value=record.notes;
    $('adminPaymentVerified').checked=false;
    $('adminIssuedCode').textContent='';
    const pending=codes.find(item => item.standKey===currentKey() && item.status==='issued');
    if (pending) $('adminIssuedCode').textContent='Ya hay un código emitido para este puesto. Generar otro anulará el anterior.';
    $('adminIssueCode').disabled=['reserved','sold','blocked'].includes(record.status);
    message('');
    const purchase=window.fitropCheckoutAdmin?.holder(currentKey());
    $('adminStandForm').querySelector('button[type=submit]').disabled=!!purchase;
    if(purchase){$('adminIssueCode').disabled=true;message(`Compra ${purchase.id} en proceso. Revísela en Pagos y compras.`);}
  }
  function renderInventory() {
    const sector=currentSector();
    if (selectedNumber<1 || selectedNumber>sector.stands) selectedNumber=1;
    const stats=inventory.summary(sectors,sector.id);
    $('adminStats').textContent=`${stats.total} puestos · ${stats.available} disponibles · ${stats.reserved} reservados · ${stats.sold} vendidos · ${stats.unassigned} por confirmar · ${stats.blocked} fuera de venta`;
    const search=$('adminSearch').value.toLocaleLowerCase('es').trim();
    const grid=$('adminStandGrid'); grid.replaceChildren();
    for (let number=1;number<=sector.stands;number++) {
      const record=inventory.getRecord(sector.id,number),code=inventory.getCode(sector.id,number);
      if (search && !`${number} ${code} ${record.buyerName} ${record.organization}`.toLocaleLowerCase('es').includes(search)) continue;
      const button=document.createElement('button'); button.type='button';
      const purchase=window.fitropCheckoutAdmin?.holder(`${sector.id}:${number}`);
      button.className=`sales-stand-chip status-${purchase?'pending':record.status}${number===selectedNumber?' selected':''}`;
      button.textContent=String(number); button.title=`${code} · ${inventory.labels[record.status]}${record.buyerName?` · ${record.buyerName}`:''}`;
      button.setAttribute('aria-label',button.title);
      button.addEventListener('click',() => { selectedNumber=number; selectedRequestId=''; renderInventory(); });
      grid.append(button);
    }
    if (!grid.children.length) { const p=document.createElement('p'); p.className='sales-empty'; p.textContent='Sin coincidencias.'; grid.append(p); }
    renderForm();
  }
  async function refresh() {
    const data=await api('/api/admin/state');
    requests=data.requests; codes=data.codes;
    window.fitropCheckoutAdmin?.render(data);
    for (const name of ['Facebook','X','Instagram','Youtube','Tiktok'])
      $(`social${name}`).value=(data.socialLinks || {})[name.toLowerCase()] || '';
    inventory.hydrate(data.inventory);
    renderRequests(); renderInventory();
  }
  function showAdmin(authenticated) {
    $('adminLogin').hidden=authenticated;
    $('adminDashboard').hidden=!authenticated;
    if (authenticated) { showLegacyImport(); refresh().catch(error => message(error.message,true)); }
  }
  sectors.forEach(item => $('adminSector').append(option(item.id,`${item.name} (${item.stands})`)));
  $('adminSector').value=initialSector.id;
  $('adminLoginForm').addEventListener('submit',async event => {
    event.preventDefault();
    try {
      await api('/api/admin/login','POST',{ password:$('adminPassword').value });
      $('adminPassword').value=''; $('adminLoginError').textContent=''; showAdmin(true);
    } catch (error) { $('adminLoginError').textContent=error.message; }
  });
  $('adminLogout').addEventListener('click',async () => { await api('/api/admin/logout','POST',{}); showAdmin(false); });
  $('adminSocialForm').addEventListener('submit',async event => {
    event.preventDefault();
    const feedback=$('adminSocialMessage'); feedback.textContent='Guardando…';
    try {
      await api('/api/admin/social-links','POST',Object.fromEntries(
        ['Facebook','X','Instagram','Youtube','Tiktok'].map(name => [name.toLowerCase(),$(`social${name}`).value.trim()])));
      feedback.textContent='Enlaces guardados y publicados.';
    } catch (error) { feedback.textContent=error.message; }
  });
  $('legacyImportButton').addEventListener('click',async () => {
    try {
      const result=await api('/api/admin/import-local','POST',legacyData());
      $('legacyImportMessage').textContent=`Importados: ${result.stands} puestos y ${result.requests} solicitudes.`;
      await refresh();
      $('legacyImportButton').disabled=true;
    } catch (error) { $('legacyImportMessage').textContent=error.message; }
  });
  $('adminSector').addEventListener('change',() => { selectedNumber=1; selectedRequestId=''; renderInventory(); });
  $('adminSearch').addEventListener('input',renderInventory);
  $('adminOpenSector').addEventListener('click',async()=>{
    const sector=currentSector();
    if(!window.confirm(`¿Habilitar para compra los puestos sin asignar de ${sector.name}? Se conservarán los puestos ocupados, bloqueados o con un comprador registrado.`))return;
    $('adminOpenSector').disabled=true;
    try { const result=await api('/api/admin/open-sector','POST',{sectorId:sector.id});await refresh();message(`${result.changed} puestos habilitados para compra.`); }
    catch(error){message(error.message,true);}
    finally{$('adminOpenSector').disabled=false;}
  });
  $('adminStandForm').addEventListener('submit',async event => {
    event.preventDefault();
    const sector=currentSector();
    try {
      await api('/api/admin/stand','POST',{ sectorId:sector.id,stand:selectedNumber,status:$('adminStatus').value,
        buyerName:$('adminBuyerName').value,organization:$('adminOrganization').value,
        phone:$('adminPhone').value,notes:$('adminNotes').value });
      await refresh(); message('Ficha guardada en el servidor.');
    } catch (error) { message(error.message,true); }
  });
  $('adminIssueCode').addEventListener('click',async () => {
    if (!$('adminPaymentVerified').checked) return message('Verifique el pago antes de emitir el código.',true);
    try {
      const sector=currentSector();
      const result=await api('/api/admin/issue-code','POST',{ sectorId:sector.id,stand:selectedNumber,
        buyerName:$('adminBuyerName').value,organization:$('adminOrganization').value,
        phone:$('adminPhone').value,requestId:selectedRequestId,paymentVerified:true });
      const issued=result.code;
      await refresh();
      $('adminIssuedCode').textContent=issued;
      message(`Código emitido para ${inventory.getCode(sector.id,selectedNumber)}. Entréguelo al comprador; solo se muestra ahora.`);
    } catch (error) { message(error.message,true); }
  });
  $('adminExport').addEventListener('click',() => {
    const keys=['sector','sectorId','number','code','zone','location','status','buyerName','organization','phone','notes','updatedAt'];
    const safe=value => { let item=String(value ?? ''); if (/^\s*[=+@-]/.test(item)) item=`'${item}`; return `"${item.replace(/"/g,'""')}"`; };
    const csv='\uFEFF'+[keys.join(','),...inventory.exportData().map(row => keys.map(key => safe(row[key])).join(','))].join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{ type:'text/csv;charset=utf-8' }));
    const a=document.createElement('a'); a.href=url; a.download='fitrop-puestos.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
  });
  api('/api/admin/session').then(data => showAdmin(data.authenticated)).catch(() => showAdmin(false));
  document.addEventListener('fitrop:admin-checkout-change',()=>refresh().catch(error=>message(error.message,true)));
})();
