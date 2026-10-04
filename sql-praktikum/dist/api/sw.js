const runs=new Map();
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('message',e=>{if(e.data?.type==='configure'&&e.source?.id){runs.set(e.source.id,{tasks:e.data.tasks,custom:e.data.custom});e.ports[0]?.postMessage({ok:true})}});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(url.origin===self.location.origin&&url.pathname.startsWith('/api/runtime/'))event.respondWith(handle(event.request,runs.get(event.clientId)))});
async function handle(request,config){
 const json=(body,status=200)=>new Response(JSON.stringify(body,null,2),{status,headers:{'Content-Type':'application/json; charset=utf-8','X-Practice-State':encodeURIComponent(JSON.stringify(config?.tasks||[])),'X-Practice-Mode':'local-simulation'}});
 if(!config)return json({error:'sandbox_not_ready',message:'Перезапустите запрос из тренажёра.'},503);
 const url=new URL(request.url),path=decodeURIComponent(url.pathname.slice('/api/runtime'.length)).replace(/\/$/,'')||'/',method=request.method;
 let body=null;if(!['GET','HEAD'].includes(method)){const raw=await request.text();if(raw){try{body=JSON.parse(raw)}catch{return json({error:'invalid_json',message:'Некорректный JSON в теле запроса.'},400)}}}
 const custom=config.custom.find(e=>e.method===method&&matchPath(e.path,path));
 if(custom){if(custom.required?.length&&(!body||typeof body!=='object'||Array.isArray(body)||custom.required.some(k=>body[k]===undefined||body[k]===null||body[k]==='')))return json({error:'validation_error',message:'Заполните обязательные поля: '+custom.required.join(', ')},422);return json(custom.response,custom.status)}
 const match=path.match(/^\/tasks(?:\/(\d+))?$/);
 if(!match)return json({error:'not_found',message:'Эндпоинт не найден.'},404);
 const id=match[1]?Number(match[1]):null,task=config.tasks.find(t=>t.id===id);
 if(method==='GET'&&id===null){let items=config.tasks;if(url.searchParams.has('completed'))items=items.filter(t=>t.completed===(url.searchParams.get('completed')==='true'));return json({items,total:items.length})}
 if(method==='POST'&&id===null){if(!body||typeof body.title!=='string'||!body.title.trim())return json({error:'validation_error',message:'Поле title обязательно и должно быть непустой строкой.'},422);if(body.completed!==undefined&&typeof body.completed!=='boolean')return json({error:'validation_error',message:'completed должен быть boolean.'},422);const item={id:Math.max(0,...config.tasks.map(t=>t.id))+1,title:body.title.trim(),completed:body.completed??false};config.tasks.push(item);return json(item,201)}
 if(id!==null&&!task)return json({error:'not_found',message:'Задача не найдена.'},404);
 if(method==='GET'&&task)return json(task);
 if(['PUT','PATCH'].includes(method)&&task){if(!body||typeof body!=='object'||Array.isArray(body))return json({error:'validation_error',message:'Ожидается JSON-объект.'},422);if((method==='PUT'||'title'in body)&&(typeof body.title!=='string'||!body.title.trim()))return json({error:'validation_error',message:'title должен быть непустой строкой.'},422);if((method==='PUT'||'completed'in body)&&typeof body.completed!=='boolean')return json({error:'validation_error',message:'completed должен быть boolean.'},422);if(body.title!==undefined)task.title=body.title.trim();if(body.completed!==undefined)task.completed=body.completed;return json(task)}
 if(method==='DELETE'&&task){config.tasks=config.tasks.filter(t=>t.id!==id);return new Response(null,{status:204,headers:{'X-Practice-State':encodeURIComponent(JSON.stringify(config.tasks)),'X-Practice-Mode':'local-simulation'}})}
 return json({error:'method_not_allowed',message:'Метод не поддерживается для этого пути.'},405);
}
function matchPath(template,path){const a=template.split('/'),b=path.split('/');return a.length===b.length&&a.every((s,i)=>/^\{[a-zA-Z_][a-zA-Z0-9_]*\}$/.test(s)?!!b[i]:s===b[i])}
