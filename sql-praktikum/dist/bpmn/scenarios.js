(function(root){
const scenarios=[
{id:'delivery',title:'От заявки до доставки',level:'Начальный',pattern:'sequence',area:'Логистика',story:'В магазин поступила заявка. Сотрудник проверяет заказ, затем собирает посылку и передаёт её курьеру. После передачи процесс завершается. Все действия выполняются последовательно.',tasks:['Проверить заказ','Собрать посылку','Передать курьеру'],hint:'Одно начальное событие, три задачи по порядку, одно конечное событие. Соедините их потоками управления.'},
{id:'support',title:'Обработка обращения',level:'Начальный',pattern:'sequence',area:'Поддержка',story:'Клиент отправил обращение в поддержку. Специалист регистрирует обращение, готовит ответ и отправляет ответ клиенту. На этом обработка завершена.',tasks:['Зарегистрировать обращение','Подготовить ответ','Отправить ответ'],hint:'Не нужны развилки: каждое действие запускается после предыдущего.'},
{id:'invoice',title:'Оплата счёта',level:'Начальный',pattern:'sequence',area:'Финансы',story:'Бухгалтер получил счёт. Он проверяет реквизиты, проводит оплату, затем сохраняет платёжное поручение. Процесс заканчивается после сохранения документа.',tasks:['Проверить реквизиты','Провести оплату','Сохранить поручение'],hint:'Используйте три задачи и два события. Подписи событий можно выбрать самостоятельно.'},
{id:'stock',title:'Есть ли товар на складе?',level:'Средний',pattern:'choice',area:'Продажи',story:'После получения заказа сотрудник проверяет наличие товара. Если товар есть, он резервирует товар, и процесс заканчивается. Если товара нет, сотрудник уведомляет клиента об отсутствии, и процесс тоже заканчивается. Выполняется только одна из двух веток.',tasks:['Проверить наличие','Зарезервировать товар','Уведомить клиента'],question:'Товар в наличии?',branches:['Да','Нет'],hint:'После проверки поставьте исключающий шлюз (ромб с X). «Да» ведёт к резервированию, «Нет» — к уведомлению. У каждой ветки своё конечное событие.'},
{id:'vacation',title:'Согласование отпуска',level:'Средний',pattern:'choice',area:'HR',story:'Сотрудник подал заявление на отпуск. Руководитель рассматривает заявление. Если отпуск согласован, кадровик оформляет приказ. Иначе руководитель отправляет отказ. После каждого из этих действий процесс завершается.',tasks:['Рассмотреть заявление','Оформить приказ','Отправить отказ'],question:'Отпуск согласован?',branches:['Да','Нет'],hint:'Выбор одного исхода моделируется исключающим шлюзом. Сделайте две подписанные ветки и два конечных события.'},
{id:'return',title:'Возврат покупки',level:'Средний',pattern:'choice',area:'Сервис',story:'Покупатель подал заявку на возврат. Сотрудник проверяет условия возврата. Если условия соблюдены, он возвращает деньги. В противном случае отправляет отказ. Оба исхода завершают процесс.',tasks:['Проверить условия','Вернуть деньги','Отправить отказ'],question:'Условия соблюдены?',branches:['Да','Нет'],hint:'Поставьте XOR-шлюз после проверки условий. Подпишите потоки «Да» и «Нет», а не сами задачи.'},
{id:'onboarding',title:'Первый день сотрудника',level:'Продвинутый',pattern:'parallel',area:'HR и IT',story:'После подтверждения выхода нового сотрудника HR регистрирует сотрудника. Затем одновременно IT настраивает доступ, а офис-менеджер готовит рабочее место. Только когда оба действия завершены, HR проводит вводную встречу. На этом процесс заканчивается.',tasks:['Зарегистрировать сотрудника','Настроить доступ','Подготовить рабочее место','Провести встречу'],hint:'Используйте два параллельных шлюза с +. Первый разделяет поток, второй ждёт обе ветки перед встречей.'},
{id:'publication',title:'Подготовка публикации',level:'Продвинутый',pattern:'parallel',area:'Редакция',story:'Редактор получает материал и утверждает тему. Затем одновременно корректор вычитывает текст, а дизайнер готовит обложку. Публиковать материал можно лишь после завершения обеих работ. Публикация завершает процесс.',tasks:['Утвердить тему','Вычитать текст','Подготовить обложку','Опубликовать материал'],hint:'Вычитка и обложка идут параллельно, поэтому нужен AND-шлюз разделения и AND-шлюз синхронизации.'}
];
scenarios.push(...[
  {
    "id": "expert-credit",
    "title": "Кредит: два уровня проверки",
    "area": "Финансовые процессы",
    "story": "Банк получает заявку и проверяет документы. Если документы неполные, запрашивает документы и завершает текущую заявку с исходом «Документы запрошены». Если документы полные, оценивает риск. При допустимом риске оформляет договор и завершает процесс с исходом «Кредит одобрен», иначе отправляет отказ и завершает процесс с исходом «Отказ отправлен». Решение о риске принимается только после успешной проверки документов.",
    "hint": "Нужны два XOR-шлюза. Вторая развилка находится только внутри положительной ветки первой. Не объединяйте три исхода в один конец.",
    "graph": {
      "nodes": [
        {
          "id": "s",
          "type": "start",
          "name": "Начало"
        },
        {
          "id": "docs",
          "type": "task",
          "name": "Проверить документы"
        },
        {
          "id": "g1",
          "type": "xor",
          "name": "Документы полные?"
        },
        {
          "id": "request",
          "type": "task",
          "name": "Запросить документы"
        },
        {
          "id": "risk",
          "type": "task",
          "name": "Оценить риск"
        },
        {
          "id": "g2",
          "type": "xor",
          "name": "Риск допустим?"
        },
        {
          "id": "contract",
          "type": "task",
          "name": "Оформить договор"
        },
        {
          "id": "reject",
          "type": "task",
          "name": "Отправить отказ"
        },
        {
          "id": "e1",
          "type": "end",
          "name": "Документы запрошены"
        },
        {
          "id": "e2",
          "type": "end",
          "name": "Кредит одобрен"
        },
        {
          "id": "e3",
          "type": "end",
          "name": "Отказ отправлен"
        }
      ],
      "edges": [
        [
          "s",
          "docs"
        ],
        [
          "docs",
          "g1"
        ],
        [
          "g1",
          "request",
          "Нет"
        ],
        [
          "request",
          "e1"
        ],
        [
          "g1",
          "risk",
          "Да"
        ],
        [
          "risk",
          "g2"
        ],
        [
          "g2",
          "contract",
          "Да"
        ],
        [
          "contract",
          "e2"
        ],
        [
          "g2",
          "reject",
          "Нет"
        ],
        [
          "reject",
          "e3"
        ]
      ]
    },
    "level": "Экспертный",
    "pattern": "graph",
    "tasks": [
      "Проверить документы",
      "Запросить документы",
      "Оценить риск",
      "Оформить договор",
      "Отправить отказ"
    ],
    "rules": "Один процесс без пулов и дорожек. Используйте указанные названия задач, шлюзов и конечных событий. Подпишите условные ветки «Да» / «Нет». Начальное событие можно назвать произвольно."
  },
  {
    "id": "expert-fulfillment",
    "title": "Оплата и параллельная отгрузка",
    "area": "Интернет-магазин",
    "story": "После получения заказа магазин проверяет оплату. Если оплаты нет, отменяет заказ и завершает процесс с исходом «Заказ отменён». Если оплата получена, одновременно собирает посылку и оформляет накладную. Отправлять заказ можно только после завершения обеих работ. После отправки процесс завершается с исходом «Заказ отправлен».",
    "hint": "Сначала XOR, затем в ветке «Да» пара AND-шлюзов. Отменённый заказ не должен попадать в синхронизацию или в отправку.",
    "graph": {
      "nodes": [
        {
          "id": "s",
          "type": "start",
          "name": "Начало"
        },
        {
          "id": "pay",
          "type": "task",
          "name": "Проверить оплату"
        },
        {
          "id": "paid",
          "type": "xor",
          "name": "Оплата получена?"
        },
        {
          "id": "cancel",
          "type": "task",
          "name": "Отменить заказ"
        },
        {
          "id": "split",
          "type": "and",
          "name": "Подготовка"
        },
        {
          "id": "pack",
          "type": "task",
          "name": "Собрать посылку"
        },
        {
          "id": "invoice",
          "type": "task",
          "name": "Оформить накладную"
        },
        {
          "id": "join",
          "type": "and",
          "name": "Готово к отправке"
        },
        {
          "id": "ship",
          "type": "task",
          "name": "Отправить заказ"
        },
        {
          "id": "ec",
          "type": "end",
          "name": "Заказ отменён"
        },
        {
          "id": "es",
          "type": "end",
          "name": "Заказ отправлен"
        }
      ],
      "edges": [
        [
          "s",
          "pay"
        ],
        [
          "pay",
          "paid"
        ],
        [
          "paid",
          "cancel",
          "Нет"
        ],
        [
          "cancel",
          "ec"
        ],
        [
          "paid",
          "split",
          "Да"
        ],
        [
          "split",
          "pack"
        ],
        [
          "split",
          "invoice"
        ],
        [
          "pack",
          "join"
        ],
        [
          "invoice",
          "join"
        ],
        [
          "join",
          "ship"
        ],
        [
          "ship",
          "es"
        ]
      ]
    },
    "level": "Экспертный",
    "pattern": "graph",
    "tasks": [
      "Проверить оплату",
      "Отменить заказ",
      "Собрать посылку",
      "Оформить накладную",
      "Отправить заказ"
    ],
    "rules": "Один процесс без пулов и дорожек. Используйте указанные названия задач, шлюзов и конечных событий. Подпишите условные ветки «Да» / «Нет». Начальное событие можно назвать произвольно."
  },
  {
    "id": "expert-review",
    "title": "Согласование с доработкой",
    "area": "Документооборот",
    "story": "Автор подготавливает документ и передаёт его на согласование. Согласующий проверяет документ. Если есть замечания, автор исправляет документ и передаёт его на повторную проверку; цикл повторяется до отсутствия замечаний. Когда замечаний нет, документ публикуется и процесс завершается. Перед проверкой объедините первый проход и повторную подачу отдельным XOR-шлюзом «Подача на проверку».",
    "hint": "XOR «Подача на проверку» объединяет альтернативные входы и не ждёт оба. Ветка «Да» у шлюза «Есть замечания?» возвращается после исправления к этому объединению. Ветка «Нет» ведёт к публикации.",
    "graph": {
      "nodes": [
        {
          "id": "s",
          "type": "start",
          "name": "Начало"
        },
        {
          "id": "prepare",
          "type": "task",
          "name": "Подготовить документ"
        },
        {
          "id": "merge",
          "type": "xor",
          "name": "Подача на проверку"
        },
        {
          "id": "review",
          "type": "task",
          "name": "Проверить документ"
        },
        {
          "id": "decision",
          "type": "xor",
          "name": "Есть замечания?"
        },
        {
          "id": "fix",
          "type": "task",
          "name": "Исправить документ"
        },
        {
          "id": "publish",
          "type": "task",
          "name": "Опубликовать документ"
        },
        {
          "id": "e",
          "type": "end",
          "name": "Документ опубликован"
        }
      ],
      "edges": [
        [
          "s",
          "prepare"
        ],
        [
          "prepare",
          "merge"
        ],
        [
          "merge",
          "review"
        ],
        [
          "review",
          "decision"
        ],
        [
          "decision",
          "fix",
          "Да"
        ],
        [
          "fix",
          "merge"
        ],
        [
          "decision",
          "publish",
          "Нет"
        ],
        [
          "publish",
          "e"
        ]
      ]
    },
    "level": "Экспертный",
    "pattern": "graph",
    "tasks": [
      "Подготовить документ",
      "Проверить документ",
      "Исправить документ",
      "Опубликовать документ"
    ],
    "rules": "Один процесс без пулов и дорожек. Используйте указанные названия задач, шлюзов и конечных событий. Подпишите условные ветки «Да» / «Нет». Начальное событие можно назвать произвольно."
  },
  {
    "id": "expert-onboarding",
    "title": "Адаптация с выбором оборудования",
    "area": "HR и IT",
    "story": "HR регистрирует сотрудника. Затем параллельно идут настройка доступа и подготовка техники. В ветке техники сначала проверяют наличие ноутбука: если он есть, выдают ноутбук, иначе закупают и настраивают ноутбук. Альтернативы объединяются XOR-шлюзом «Техника готова». После завершения настройки доступа и подготовки техники HR проводит вводную встречу. Процесс завершается только после встречи.",
    "hint": "Нужны AND-разделение и AND-объединение. Внутри одной параллельной ветки — XOR-развилка и XOR-объединение. Нельзя объединять альтернативы AND-шлюзом: он будет ждать ветку, которая не запускалась.",
    "graph": {
      "nodes": [
        {
          "id": "s",
          "type": "start",
          "name": "Начало"
        },
        {
          "id": "register",
          "type": "task",
          "name": "Зарегистрировать сотрудника"
        },
        {
          "id": "split",
          "type": "and",
          "name": "Запуск подготовки"
        },
        {
          "id": "access",
          "type": "task",
          "name": "Настроить доступ"
        },
        {
          "id": "stock",
          "type": "task",
          "name": "Проверить наличие ноутбука"
        },
        {
          "id": "choice",
          "type": "xor",
          "name": "Ноутбук есть?"
        },
        {
          "id": "give",
          "type": "task",
          "name": "Выдать ноутбук"
        },
        {
          "id": "buy",
          "type": "task",
          "name": "Закупить и настроить ноутбук"
        },
        {
          "id": "merge",
          "type": "xor",
          "name": "Техника готова"
        },
        {
          "id": "join",
          "type": "and",
          "name": "Подготовка завершена"
        },
        {
          "id": "meet",
          "type": "task",
          "name": "Провести встречу"
        },
        {
          "id": "e",
          "type": "end",
          "name": "Адаптация завершена"
        }
      ],
      "edges": [
        [
          "s",
          "register"
        ],
        [
          "register",
          "split"
        ],
        [
          "split",
          "access"
        ],
        [
          "split",
          "stock"
        ],
        [
          "stock",
          "choice"
        ],
        [
          "choice",
          "give",
          "Да"
        ],
        [
          "choice",
          "buy",
          "Нет"
        ],
        [
          "give",
          "merge"
        ],
        [
          "buy",
          "merge"
        ],
        [
          "merge",
          "join"
        ],
        [
          "access",
          "join"
        ],
        [
          "join",
          "meet"
        ],
        [
          "meet",
          "e"
        ]
      ]
    },
    "level": "Экспертный",
    "pattern": "graph",
    "tasks": [
      "Зарегистрировать сотрудника",
      "Настроить доступ",
      "Проверить наличие ноутбука",
      "Выдать ноутбук",
      "Закупить и настроить ноутбук",
      "Провести встречу"
    ],
    "rules": "Один процесс без пулов и дорожек. Используйте указанные названия задач, шлюзов и конечных событий. Подпишите условные ветки «Да» / «Нет». Начальное событие можно назвать произвольно."
  }
]);
const normalize=s=>String(s||'').toLowerCase().replace(/ё/g,'е').replace(/[\s.,!?;:]+/g,' ').trim();
function validateDiagram(nodes,flows,s){
 if(s.pattern==='graph')return validateGraph(nodes,flows,s);
 const checks=[];const add=(label,pass)=>checks.push({label,pass:!!pass});
 const starts=nodes.filter(n=>n.type==='start'),ends=nodes.filter(n=>n.type==='end'),activities=nodes.filter(n=>n.type==='task'),gateways=nodes.filter(n=>['xor','and'].includes(n.type));
 const incoming=n=>flows.filter(f=>f.target===n?.id),outgoing=n=>flows.filter(f=>f.source===n?.id),edge=(a,b)=>!!a&&!!b&&flows.some(f=>f.source===a.id&&f.target===b.id);
 const t=s.tasks.map(name=>activities.find(n=>normalize(n.name)===normalize(name)));
 add('Одно начальное событие и '+(s.pattern==='choice'?'два конечных события':'одно конечное событие'),starts.length===1&&ends.length===(s.pattern==='choice'?2:1));
 add('Все задачи названы по списку сценария',activities.length===s.tasks.length&&t.every(Boolean)&&new Set(t.map(n=>n?.id)).size===s.tasks.length);
 add('Начало ведёт к первой задаче',starts.length===1&&outgoing(starts[0]).length===1&&edge(starts[0],t[0])&&incoming(starts[0]).length===0);
 const reachable=(source,reverse=false)=>{const visited=new Set(source.map(n=>n.id)),queue=[...visited];while(queue.length){const id=queue.shift();for(const f of flows){const from=reverse?f.target:f.source,to=reverse?f.source:f.target;if(from===id&&!visited.has(to)){visited.add(to);queue.push(to)}}}return visited};
 const fromStart=reachable(starts),toEnd=reachable(ends,true);
 add('Все элементы лежат на пути от начала к завершению',nodes.length>0&&nodes.every(n=>fromStart.has(n.id)&&toEnd.has(n.id))&&ends.every(n=>outgoing(n).length===0));
 add('Использованы только задачи, события и нужные шлюзы',nodes.every(n=>['start','end','task','xor','and'].includes(n.type))&&flows.every(f=>nodes.some(n=>n.id===f.source)&&nodes.some(n=>n.id===f.target)));
 if(s.pattern==='sequence'){
 add('Три действия идут строго последовательно',gateways.length===0&&edge(t[0],t[1])&&edge(t[1],t[2])&&edge(t[2],ends[0])&&flows.length===4);
 }else if(s.pattern==='choice'){
 const g=gateways.find(n=>n.type==='xor');
 add('Один исключающий шлюз после проверки',gateways.length===1&&!!g&&edge(t[0],g)&&incoming(g).length===1&&outgoing(g).length===2);
 add('Каждая ветка ведёт к своему действию',edge(g,t[1])&&edge(g,t[2]));
 add('Потоки «Да» и «Нет» подписаны правильно',s.branches.every((label,i)=>flows.some(f=>f.source===g?.id&&f.target===t[i+1]?.id&&normalize(f.name)===normalize(label))));
 add('Каждый исход завершается отдельно',t.slice(1).every(n=>n&&outgoing(n).length===1&&ends.some(e=>edge(n,e)))&&ends.every(e=>incoming(e).length===1)&&flows.length===6);
 }else{
 const split=gateways.find(n=>n.type==='and'&&incoming(n).length===1&&outgoing(n).length===2),join=gateways.find(n=>n.type==='and'&&incoming(n).length===2&&outgoing(n).length===1);
 add('Два параллельных шлюза: разделение и объединение',gateways.length===2&&!!split&&!!join&&split!==join);
 add('Обе работы запускаются параллельно',edge(t[0],split)&&edge(split,t[1])&&edge(split,t[2]));
 add('Последнее действие ждёт завершения обеих веток',edge(t[1],join)&&edge(t[2],join)&&edge(join,t[3])&&edge(t[3],ends[0])&&flows.length===8);
 }
 return {checks,passed:checks.every(c=>c.pass)};
}

function validateGraph(nodes,flows,s){
 const checks=[],mapping=new Map();
 for(const expected of s.graph.nodes){
  const matches=nodes.filter(n=>n.type===expected.type&&(expected.type==='start'||normalize(n.name)===normalize(expected.name)));
  checks.push({label:(expected.type==='start'?'Одно начальное событие':({task:'Задача',xor:'XOR-шлюз',and:'AND-шлюз',end:'Конечное событие'}[expected.type])+': '+expected.name),pass:matches.length===1});
  if(matches.length===1)mapping.set(expected.id,matches[0].id);
 }
 checks.push({label:'Нет лишних или неподдерживаемых элементов',pass:nodes.length===s.graph.nodes.length&&mapping.size===s.graph.nodes.length&&new Set(mapping.values()).size===nodes.length});
 const required=s.graph.edges;
 for(const expected of s.graph.nodes){
  const targetEdges=required.filter(e=>e[0]===expected.id);
  const actual=flows.filter(f=>f.source===mapping.get(expected.id));
  const pass=mapping.has(expected.id)&&actual.length===targetEdges.length&&targetEdges.every(([a,b,label])=>mapping.has(b)&&actual.filter(f=>f.target===mapping.get(b)&&(!label||normalize(f.name)===normalize(label))).length===1);
  checks.push({label:'Исходящие потоки: '+expected.name,pass});
 }
 checks.push({label:'Все потоки соответствуют сценарию',pass:flows.length===required.length&&flows.every(f=>[...mapping.values()].includes(f.source)&&[...mapping.values()].includes(f.target))});
 return {checks,passed:checks.every(c=>c.pass)};
}

root.BPMNPractice={scenarios,validateDiagram};if(typeof module!=='undefined')module.exports=root.BPMNPractice;
})(typeof window==='undefined'?globalThis:window);
