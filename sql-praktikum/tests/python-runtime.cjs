const assert=require('node:assert/strict'),path=require('node:path');
const {tasks}=require('../public/python/tasks.js'),runner=require('../public/python/runner.js');
const runtime=process.env.PYODIDE_RUNTIME;if(!runtime)throw Error('Set PYODIDE_RUNTIME to a local Pyodide 0.29.3 full runtime directory.');
(async()=>{const {loadPyodide}=require(path.resolve(runtime,'pyodide.js'));const python=await loadPyodide({indexURL:path.resolve(runtime)+'/'});async function run(code,cases,check=true){const scope=python.toPy({payload:JSON.stringify({code,cases,check})});try{return JSON.parse(await python.runPythonAsync(runner,{globals:scope}))}finally{scope.destroy()}}
let total=0;for(const task of tasks){const results=await run(task.solution,task.tests);assert.ok(results.every(r=>r.passed),task.title+' '+JSON.stringify(results));assert.ok(task.review.steps.length>=3&&task.review.mistakes.length>=2);const wrong=await run('def solve(data):\n    return "incorrect"',task.tests);assert.ok(wrong.every(r=>!r.passed));total+=results.length;console.log('PASS',task.id,task.title)}
let r=await run('def solve(data):\n    print("hello")\n    return data',[{input:7,expected:7}]);assert.equal(r[0].stdout,'hello\n');assert.ok(r[0].passed);
r=await run('def solve(data):\n    print(data)',[{input:7,expected:7}]);assert.equal(r[0].passed,false,'print does not replace return');
r=await run('def solve(data):\n    return 1',[{input:null,expected:true}]);assert.equal(r[0].passed,false,'bool must not equal int');
r=await run('def solve(data):\n    return [3,2]',[{input:null,expected:[2,3]}]);assert.equal(r[0].passed,false,'list ordering');
r=await run('def solve(data):\n    return {"b":2,"a":1}',[{input:null,expected:{a:1,b:2}}]);assert.equal(r[0].passed,true,'dict order independent');
r=await run('def solve(data)\n return data',[{input:0}]);assert.match(r[0].error,/SyntaxError/);
r=await run('def solve(data):\n    return 1 / 0',[{input:0}]);assert.match(r[0].error,/ZeroDivisionError/);
r=await run('x = 1',[{input:0}]);assert.match(r[0].error,/solve/);
r=await run('def solve(data):\n    print("x" * 10000)\n    return 0',[{input:0,expected:0}]);assert.equal(r[0].stdout.length,6000);
r=await run('count = 0\ndef solve(data):\n    global count\n    count += 1\n    return count',[{input:0,expected:1},{input:0,expected:1}]);assert.ok(r.every(x=>x.passed),'fresh scope for each case');
console.log('PASS',tasks.length,'solutions,',total,'cases, incorrect answers, type rules, errors, bounded stdout and case isolation.');})().catch(e=>{console.error(e);process.exitCode=1});
