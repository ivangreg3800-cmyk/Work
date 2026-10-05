importScripts('/python/runner.js');
const indexURL='https://cdn.jsdelivr.net/pyodide/v0.29.3/full/';
let pyodide;
(async()=>{try{importScripts(indexURL+'pyodide.js');pyodide=await loadPyodide({indexURL});postMessage({type:'ready',version:pyodide.runPython('import sys; sys.version.split()[0]')})}catch(e){postMessage({type:'init-error',error:'Не удалось загрузить Python. Проверьте интернет-соединение и доступ к cdn.jsdelivr.net, затем повторите загрузку.'})}})();
onmessage=async({data})=>{if(!pyodide)return;let scope;try{scope=pyodide.toPy({payload:JSON.stringify(data)});const raw=await pyodide.runPythonAsync(PythonRunner,{globals:scope});postMessage({type:'result',id:data.id,results:JSON.parse(raw)})}catch(e){postMessage({type:'run-error',id:data.id,error:String(e.message||e).slice(0,5000)})}finally{scope?.destroy()}};
