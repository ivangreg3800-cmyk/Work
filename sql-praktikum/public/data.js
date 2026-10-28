const seed = `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, city TEXT);
INSERT INTO customers VALUES (1,'Анна Смирнова','Москва'),(2,'Михаил Волков','Казань'),(3,'Мария Орлова','Москва'),(4,'Иван Петров','Санкт-Петербург'),(5,'Елена Соколова','Казань'),(6,'Алексей Морозов','Екатеринбург'),(7,'Ольга Белова','Москва'),(8,'Денис Ким','Новосибирск');
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1,'Механическая клавиатура','Аксессуары',7900),(2,'Монитор 27 дюймов','Электроника',24900),(3,'Ноутбук','Электроника',89000),(4,'Блокнот','Канцелярия',450),(5,'Настольная лампа','Дом',3200),(6,'Беспроводная мышь','Аксессуары',2400),(7,'Рюкзак','Аксессуары',4900),(8,'Кружка','Дом',900);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(id), product_id INTEGER REFERENCES products(id), quantity INTEGER, order_date TEXT, status TEXT);
INSERT INTO orders VALUES (1,1,3,1,'2025-03-01','delivered'),(2,2,1,2,'2025-03-02','delivered'),(3,1,6,1,'2025-03-04','delivered'),(4,3,2,1,'2025-03-05','shipped'),(5,4,4,5,'2025-03-06','delivered'),(6,5,5,2,'2025-03-07','cancelled'),(7,2,7,1,'2025-03-08','delivered'),(8,6,8,3,'2025-03-09','shipped'),(9,3,1,1,'2025-03-10','delivered'),(10,1,4,2,'2025-03-11','delivered'),(11,5,6,1,'2025-03-12','shipped'),(12,4,2,2,'2025-03-13','delivered');`;
const tasks = [
['Первый запрос','SELECT','Лёгкая','Выведите все столбцы и все строки таблицы customers.','SELECT * FROM customers;','Звёздочка * выбирает все столбцы таблицы.','SELECT *\nFROM customers;'],
['Только нужное','SELECT','Лёгкая','Выведите name и city всех покупателей, именно в этом порядке.','SELECT name, city FROM customers;','Перечислите нужные столбцы через запятую.'],
['Покупатели из Москвы','WHERE','Лёгкая',"Выведите все столбцы покупателей из города Москва.","SELECT * FROM customers WHERE city = 'Москва';","Текстовые значения заключают в одинарные кавычки."],
['Дорогие товары','WHERE','Лёгкая','Выведите name и price товаров дороже 5000 рублей.','SELECT name, price FROM products WHERE price > 5000;','Добавьте условие price > 5000 после WHERE.'],
['География клиентов','DISTINCT','Лёгкая','Выведите уникальные города покупателей: один столбец city.','SELECT DISTINCT city FROM customers;','DISTINCT удаляет повторяющиеся строки.'],
['От дорогого к дешёвому','ORDER BY','Лёгкая','Выведите name и price всех товаров по убыванию цены.','SELECT name, price FROM products ORDER BY price DESC;','DESC задаёт сортировку по убыванию.',null,true],
['Три доступных товара','LIMIT','Лёгкая','Выведите name и price трёх самых дешёвых товаров, от дешёвого к дорогому.','SELECT name, price FROM products ORDER BY price LIMIT 3;','Сначала отсортируйте по цене, затем ограничьте результат LIMIT 3.',null,true],
['Заказы в пути','WHERE','Лёгкая',"Выведите id и order_date заказов со статусом shipped.","SELECT id, order_date FROM orders WHERE status = 'shipped';","Статус хранится в столбце status."],
['Сколько покупателей?','COUNT','Средняя','Посчитайте всех покупателей. Назовите столбец total.','SELECT COUNT(*) AS total FROM customers;','COUNT(*) считает количество строк.'],
['Средний чек товара','AVG','Средняя','Найдите среднюю цену всех товаров. Назовите столбец average_price.','SELECT AVG(price) AS average_price FROM products;','Агрегатная функция AVG вычисляет среднее.'],
['Покупатели по городам','GROUP BY','Средняя','Для каждого города выведите city и число покупателей customer_count.','SELECT city, COUNT(*) AS customer_count FROM customers GROUP BY city;','Сгруппируйте строки по city и примените COUNT(*).'],
['Популярные города','HAVING','Средняя','Выведите city и customer_count только для городов, где больше одного покупателя.','SELECT city, COUNT(*) AS customer_count FROM customers GROUP BY city HAVING COUNT(*) > 1;','Для фильтрации после группировки используйте HAVING.'],
['Кто сделал заказ','JOIN','Средняя','Для каждого заказа выведите id заказа и name покупателя.','SELECT o.id, c.name FROM orders o JOIN customers c ON c.id = o.customer_id;','Свяжите customers.id с orders.customer_id.'],
['Стоимость заказа','JOIN','Средняя','Выведите id каждого заказа и его стоимость total: количество × цена товара.','SELECT o.id, o.quantity * p.price AS total FROM orders o JOIN products p ON p.id = o.product_id;','Цена хранится в products, количество — в orders.'],
['Без единого заказа','LEFT JOIN','Сложная','Выведите name покупателей, которые ещё не сделали ни одного заказа.','SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL;','LEFT JOIN сохраняет покупателей без заказов. У них o.id будет NULL.'],
['Выше средней цены','Подзапросы','Сложная','Выведите name и price товаров с ценой выше средней по всем товарам.','SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products);','Вычислите среднюю цену отдельным SELECT внутри условия.'],
['Выручка по категориям','GROUP BY','Сложная',"Выведите category и revenue: сумму quantity × price по каждой категории только для заказов delivered.","SELECT p.category, SUM(o.quantity * p.price) AS revenue FROM orders o JOIN products p ON p.id = o.product_id WHERE o.status = 'delivered' GROUP BY p.category;","Объедините заказы и товары, отфильтруйте статус и сгруппируйте по категории."],
['Рейтинг цен','Оконные функции','Сложная','Выведите name, price и price_rank — место товара по убыванию цены с помощью DENSE_RANK. Отсортируйте результат по price_rank.','SELECT name, price, DENSE_RANK() OVER (ORDER BY price DESC) AS price_rank FROM products ORDER BY price_rank;','Используйте DENSE_RANK() OVER (ORDER BY price DESC).',null,true]
].map((t,i)=>({id:i+1,title:t[0],topic:t[1],level:t[2],text:t[3],answer:t[4],hint:t[5],starter:t[6]||'SELECT\n  \nFROM '+(i<3||[4,8,10,11,14].includes(i)?'customers':i===7||i===12||i===13||i===16?'orders':'products')+';',ordered:!!t[7]}));
tasks.push(...[
  {
    "title": "Топ-2 товара в категории",
    "topic": "DENSE_RANK",
    "text": "Для каждой категории найдите товары с двумя наибольшими различными ценами. При равных ценах включайте все товары. Выведите category, name, price и price_rank. Сортируйте по category, затем price_rank, затем name.",
    "columns": [
      "category",
      "name",
      "price",
      "price_rank"
    ],
    "answer": "WITH ranked AS (\n  SELECT category, name, price,\n    DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank\n  FROM products\n)\nSELECT category, name, price, price_rank FROM ranked\nWHERE price_rank <= 2\nORDER BY category, price_rank, name;",
    "hint": "Сначала пронумеруйте цены внутри каждой категории через DENSE_RANK в CTE. Затем отфильтруйте ранг во внешнем SELECT.",
    "id": 19,
    "level": "Экспертная",
    "ordered": true,
    "starter": "-- DENSE_RANK\nSELECT\n  \nFROM orders;"
  },
  {
    "title": "Накопительная выручка",
    "topic": "SUM OVER",
    "text": "Сгруппируйте доставленные заказы (delivered) по дню. Выведите order_date, дневную выручку daily_revenue и накопительную выручку running_revenue. Выручка = quantity × price. Показывайте только дни с доставленными заказами, в порядке даты.",
    "columns": [
      "order_date",
      "daily_revenue",
      "running_revenue"
    ],
    "answer": "WITH daily AS (\n  SELECT o.order_date, SUM(o.quantity * p.price) AS daily_revenue\n  FROM orders o JOIN products p ON p.id = o.product_id\n  WHERE o.status = 'delivered' GROUP BY o.order_date\n)\nSELECT order_date, daily_revenue,\n  SUM(daily_revenue) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_revenue\nFROM daily ORDER BY order_date;",
    "hint": "Разделите задачу на две стадии: дневная агрегация в CTE и оконная сумма по уже сгруппированным дням.",
    "id": 20,
    "level": "Экспертная",
    "ordered": true,
    "starter": "-- SUM OVER\nSELECT\n  \nFROM orders;"
  },
  {
    "title": "Последний заказ каждого клиента",
    "topic": "ROW_NUMBER",
    "text": "Для каждого покупателя с заказами выведите customer_id, order_id, order_date и status только последнего заказа. Учитывайте все статусы. Если даты совпали, выбирайте больший id заказа. Сортируйте по customer_id.",
    "columns": [
      "customer_id",
      "order_id",
      "order_date",
      "status"
    ],
    "answer": "WITH ranked AS (\n  SELECT customer_id, id AS order_id, order_date, status,\n    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC, id DESC) AS rn\n  FROM orders\n)\nSELECT customer_id, order_id, order_date, status\nFROM ranked WHERE rn = 1 ORDER BY customer_id;",
    "hint": "ROW_NUMBER присваивает уникальный номер внутри группы. Для точного выбора добавьте id DESC после даты в сортировку окна.",
    "id": 21,
    "level": "Экспертная",
    "ordered": true,
    "starter": "-- ROW_NUMBER\nSELECT\n  \nFROM orders;"
  },
  {
    "title": "Пауза между заказами",
    "topic": "LAG",
    "text": "Для всех заказов выведите customer_id, order_id, order_date, previous_date и days_since_previous. Предыдущий заказ ищите у того же клиента по order_date, затем id. Разница дат — целое число дней. Для первого заказа оба последних поля должны быть NULL. Сортируйте по customer_id, order_date, order_id.",
    "columns": [
      "customer_id",
      "order_id",
      "order_date",
      "previous_date",
      "days_since_previous"
    ],
    "answer": "WITH history AS (\n  SELECT customer_id, id AS order_id, order_date,\n    LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, id) AS previous_date\n  FROM orders\n)\nSELECT customer_id, order_id, order_date, previous_date,\n  CAST(julianday(order_date) - julianday(previous_date) AS INTEGER) AS days_since_previous\nFROM history ORDER BY customer_id, order_date, order_id;",
    "hint": "LAG вернёт предыдущую дату. В SQLite разницу в днях можно вычислить через julianday; NULL сохранится автоматически.",
    "id": 22,
    "level": "Экспертная",
    "ordered": true,
    "starter": "-- LAG\nSELECT\n  \nFROM orders;"
  },
  {
    "title": "Клиент против среднего по городу",
    "topic": "CTE + JOIN",
    "text": "Посчитайте доставленную выручку каждого покупателя, включая 0 для покупателей без доставленных заказов. Затем оставьте покупателей с выручкой строго выше среднего по всем покупателям их города. Выведите customer_id, name, city, revenue и city_average (среднее округлите до 2 знаков). Сравнивайте с неокруглённым средним. Сортируйте по customer_id.",
    "columns": [
      "customer_id",
      "name",
      "city",
      "revenue",
      "city_average"
    ],
    "answer": "WITH totals AS (\n  SELECT c.id AS customer_id, c.name, c.city,\n    COALESCE(SUM(o.quantity * p.price), 0) AS revenue\n  FROM customers c\n  LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'delivered'\n  LEFT JOIN products p ON p.id = o.product_id\n  GROUP BY c.id, c.name, c.city\n), city_stats AS (\n  SELECT *, AVG(revenue) OVER (PARTITION BY city) AS city_average FROM totals\n)\nSELECT customer_id, name, city, revenue, ROUND(city_average, 2) AS city_average\nFROM city_stats WHERE revenue > city_average ORDER BY customer_id;",
    "hint": "Фильтр delivered поместите в ON, чтобы LEFT JOIN сохранил покупателей без покупок. Сначала найдите выручку клиентов, затем среднее по городу.",
    "id": 23,
    "level": "Экспертная",
    "ordered": true,
    "starter": "-- CTE + JOIN\nSELECT\n  \nFROM orders;"
  },
  {
    "title": "Доля категории в выручке",
    "topic": "Оконные агрегаты",
    "text": "Для каждой категории с доставленными заказами выведите category, revenue и revenue_pct — долю в общей доставленной выручке в процентах, округлённую до 2 знаков. Сортируйте по revenue по убыванию, затем по category.",
    "columns": [
      "category",
      "revenue",
      "revenue_pct"
    ],
    "answer": "WITH category_totals AS (\n  SELECT p.category, SUM(o.quantity * p.price) AS revenue\n  FROM orders o JOIN products p ON p.id = o.product_id\n  WHERE o.status = 'delivered' GROUP BY p.category\n)\nSELECT category, revenue,\n  ROUND(100.0 * revenue / SUM(revenue) OVER (), 2) AS revenue_pct\nFROM category_totals ORDER BY revenue DESC, category;",
    "hint": "SUM(revenue) OVER () даст общую выручку без потери строк категорий. Используйте 100.0, чтобы избежать целочисленного деления.",
    "id": 24,
    "level": "Экспертная",
    "ordered": true,
    "starter": "-- Оконные агрегаты\nSELECT\n  \nFROM orders;"
  },
  {
    "title": "Купили все товары категории",
    "topic": "Двойной NOT EXISTS",
    "text": "Найдите покупателей, у которых есть доставленные заказы на каждый товар категории «Электроника». Количество единиц не важно. Выведите customer_id и name, сортируя по customer_id.",
    "columns": [
      "customer_id",
      "name"
    ],
    "answer": "SELECT c.id AS customer_id, c.name\nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM products p\n  WHERE p.category = 'Электроника'\n    AND NOT EXISTS (\n      SELECT 1 FROM orders o\n      WHERE o.customer_id = c.id AND o.product_id = p.id AND o.status = 'delivered'\n    )\n)\nORDER BY customer_id;",
    "hint": "Условие «купил каждый товар» можно выразить как «нет товара, для которого нет доставленного заказа». На этой базе правильный ответ может быть пустым.",
    "id": 25,
    "level": "Экспертная",
    "ordered": true,
    "starter": "-- Двойной NOT EXISTS\nSELECT\n  \nFROM orders;"
  },
  {
    "title": "Календарь продаж без пропусков",
    "topic": "Рекурсивный CTE",
    "text": "Постройте календарь с 2025-03-01 по 2025-03-13 включительно. Выведите day и revenue — доставленную выручку за день. В дни без доставленных заказов верните 0. Сортируйте по day. Используйте WITH RECURSIVE как один из вариантов решения.",
    "columns": [
      "day",
      "revenue"
    ],
    "answer": "WITH RECURSIVE calendar(day) AS (\n  SELECT '2025-03-01'\n  UNION ALL\n  SELECT date(day, '+1 day') FROM calendar WHERE day < '2025-03-13'\n), daily AS (\n  SELECT o.order_date, SUM(o.quantity * p.price) AS revenue\n  FROM orders o JOIN products p ON p.id = o.product_id\n  WHERE o.status = 'delivered' GROUP BY o.order_date\n)\nSELECT c.day, COALESCE(d.revenue, 0) AS revenue\nFROM calendar c LEFT JOIN daily d ON d.order_date = c.day ORDER BY c.day;",
    "hint": "Рекурсивный CTE создаёт последовательность дат. Присоедините к ней дневную выручку через LEFT JOIN и замените NULL на 0.",
    "id": 26,
    "level": "Экспертная",
    "ordered": true,
    "starter": "-- Рекурсивный CTE\nSELECT\n  \nFROM orders;"
  }
]);
tasks.push(...[
  {
    "id": 27,
    "title": "Статусы заказов каждого клиента",
    "level": "Средняя",
    "topic": "CASE + LEFT JOIN",
    "text": "Для всех покупателей посчитайте число заказов каждого статуса. Верните customer_id, name, delivered_count, shipped_count, cancelled_count. Если заказов нет, все три счётчика равны 0. Сортируйте по customer_id. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "customer_id",
      "name",
      "delivered_count",
      "shipped_count",
      "cancelled_count"
    ],
    "answer": "SELECT c.id AS customer_id, c.name,\n       SUM(CASE WHEN o.status = 'delivered' THEN 1 ELSE 0 END) AS delivered_count,\n       SUM(CASE WHEN o.status = 'shipped' THEN 1 ELSE 0 END) AS shipped_count,\n       SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_count\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nGROUP BY c.id, c.name\nORDER BY c.id;",
    "hint": "Сохраните всех покупателей через LEFT JOIN, затем примените SUM(CASE WHEN … THEN 1 ELSE 0 END) для каждого статуса.",
    "starter": "-- CASE + LEFT JOIN\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Статусы заказов каждого клиента",
      [
        "Сохраните всех покупателей через LEFT JOIN, затем примените SUM(CASE WHEN … THEN 1 ELSE 0 END) для каждого статуса.",
        "Группируйте по идентификатору и имени: один покупатель должен дать одну строку.",
        "Для клиента без заказов условие CASE не выполняется, поэтому ELSE 0 сохраняет нулевые счётчики."
      ],
      [
        "COUNT(*) после LEFT JOIN даст 1 даже покупателю без заказов.",
        "Фильтр статуса в WHERE удалит часть покупателей и помешает посчитать остальные статусы."
      ]
    ]
  },
  {
    "id": 28,
    "title": "Доставленная выручка городов",
    "level": "Средняя",
    "topic": "JOIN + GROUP BY",
    "text": "Для каждого города из customers найдите доставленную выручку. Учитывайте только delivered и стоимость quantity × price. Верните city, revenue; для города без доставок — 0. Сортируйте по revenue по убыванию, затем по city. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "city",
      "revenue"
    ],
    "answer": "SELECT c.city, COALESCE(SUM(o.quantity * p.price), 0) AS revenue\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'delivered'\nLEFT JOIN products p ON p.id = o.product_id\nGROUP BY c.city\nORDER BY revenue DESC, c.city;",
    "hint": "Поставьте условие delivered в ON первого LEFT JOIN, чтобы города без доставок остались в результате.",
    "starter": "-- JOIN + GROUP BY\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Доставленная выручка городов",
      [
        "Поставьте условие delivered в ON первого LEFT JOIN, чтобы города без доставок остались в результате.",
        "Вторым LEFT JOIN добавьте цену товара и сгруппируйте строки по городу.",
        "Сложите quantity * price. COALESCE заменяет NULL от отсутствующих доставок на 0."
      ],
      [
        "INNER JOIN к products потеряет строки без заказов.",
        "Количество покупателей города нельзя умножать на выручку: каждая строка заказа уже принадлежит одному покупателю."
      ]
    ]
  },
  {
    "id": 29,
    "title": "Повторные доставленные покупки",
    "level": "Средняя",
    "topic": "HAVING + COUNT",
    "text": "Найдите покупателей минимум с двумя доставленными заказами. Верните customer_id, name, order_count. Сортируйте по order_count по убыванию, затем по customer_id. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "customer_id",
      "name",
      "order_count"
    ],
    "answer": "SELECT c.id AS customer_id, c.name, COUNT(o.id) AS order_count\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nWHERE o.status = 'delivered'\nGROUP BY c.id, c.name\nHAVING COUNT(o.id) >= 2\nORDER BY order_count DESC, c.id;",
    "hint": "Сначала отберите delivered в WHERE, затем примените HAVING COUNT(o.id) >= 2 к группам покупателей.",
    "starter": "-- HAVING + COUNT\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Повторные доставленные покупки",
      [
        "Сначала отберите delivered в WHERE, затем примените HAVING COUNT(o.id) >= 2 к группам покупателей.",
        "Считайте заказы, а не единицы товара: заказ с quantity = 5 всё равно один заказ.",
        "При равном числе заказов вторичная сортировка по customer_id делает результат однозначным."
      ],
      [
        "SUM(quantity) считает купленные единицы, а не заказы.",
        "Если применить условие только COUNT > 2, покупатели с двумя заказами исчезнут."
      ]
    ]
  },
  {
    "id": 30,
    "title": "Товары без доставленных продаж",
    "level": "Средняя",
    "topic": "LEFT JOIN + NULL",
    "text": "Найдите товары, у которых нет ни одного delivered-заказа. Отменённые и отправленные заказы не считаются доставленной продажей. Верните product_id, name, category. Сортируйте по product_id. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "product_id",
      "name",
      "category"
    ],
    "answer": "SELECT p.id AS product_id, p.name, p.category\nFROM products p\nLEFT JOIN orders o ON o.product_id = p.id AND o.status = 'delivered'\nWHERE o.id IS NULL\nORDER BY p.id;",
    "hint": "Соедините товары только с доставленными заказами, указав статус в ON. Затем отберите строки с o.id IS NULL.",
    "starter": "-- LEFT JOIN + NULL\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Товары без доставленных продаж",
      [
        "Соедините товары только с доставленными заказами, указав статус в ON. Затем отберите строки с o.id IS NULL.",
        "Товар может иметь shipped или cancelled, но всё равно подходить под условие отсутствия delivered.",
        "Проверяйте NULL у ключа заказа, а не у поля названия товара."
      ],
      [
        "WHERE status != delivered не находит отсутствие доставок: у товара могут быть заказы разных статусов.",
        "Отсутствие любых заказов — более узкое условие, чем отсутствие доставленных."
      ]
    ]
  },
  {
    "id": 31,
    "title": "Дороже средней цены своей категории",
    "level": "Сложная",
    "topic": "Коррелированный подзапрос",
    "text": "Выведите товары, цена которых строго выше средней цены в их собственной категории. Верните product_id, name, category, price. Сортируйте по product_id. Среднее перед сравнением не округляйте. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "product_id",
      "name",
      "category",
      "price"
    ],
    "answer": "SELECT p.id AS product_id, p.name, p.category, p.price\nFROM products p\nWHERE p.price > (\n  SELECT AVG(p2.price)\n  FROM products p2\n  WHERE p2.category = p.category\n)\nORDER BY p.id;",
    "hint": "Свяжите внутренний подзапрос с внешним товаром по category: среднее должно рассчитываться внутри категории.",
    "starter": "-- Коррелированный подзапрос\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Дороже средней цены своей категории",
      [
        "Свяжите внутренний подзапрос с внешним товаром по category: среднее должно рассчитываться внутри категории.",
        "Используйте отдельные псевдонимы p и p2, чтобы явно различать внешний товар и набор для среднего.",
        "В категории с одним товаром цена равна среднему; при строгом > такой товар не подходит."
      ],
      [
        "Среднее всей таблицы не заменяет среднее своей категории.",
        "Условие >= ошибочно включит товар из категории с единственным товаром."
      ]
    ]
  },
  {
    "id": 32,
    "title": "Все заказы доставлены",
    "level": "Сложная",
    "topic": "EXISTS + NOT EXISTS",
    "text": "Найдите покупателей, у которых есть хотя бы один заказ и все их заказы имеют статус delivered. Покупателей без заказов исключите. Верните customer_id, name, сортируйте по customer_id. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "customer_id",
      "name"
    ],
    "answer": "SELECT c.id AS customer_id, c.name\nFROM customers c\nWHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)\n  AND NOT EXISTS (\n    SELECT 1 FROM orders o\n    WHERE o.customer_id = c.id\n      AND (o.status <> 'delivered' OR o.status IS NULL)\n  )\nORDER BY c.id;",
    "hint": "Используйте два условия: EXISTS подтверждает наличие заказа, NOT EXISTS запрещает любой заказ с другим статусом.",
    "starter": "-- EXISTS + NOT EXISTS\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Все заказы доставлены",
      [
        "Используйте два условия: EXISTS подтверждает наличие заказа, NOT EXISTS запрещает любой заказ с другим статусом.",
        "Без первого EXISTS покупатели без заказов тоже удовлетворяли бы условию отсутствия недоставленных заказов.",
        "NULL не означает delivered: отдельная проверка IS NULL делает правило явным."
      ],
      [
        "Наличие хотя бы одной доставки не означает, что доставлены все заказы.",
        "Не забывайте исключить покупателей без заказов."
      ]
    ]
  },
  {
    "id": 33,
    "title": "Покупки в нескольких категориях",
    "level": "Сложная",
    "topic": "COUNT DISTINCT",
    "text": "Найдите покупателей, получивших доставленные заказы минимум из двух разных категорий товаров. Верните customer_id, name, category_count. Сортируйте по category_count по убыванию, затем по customer_id. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "customer_id",
      "name",
      "category_count"
    ],
    "answer": "SELECT c.id AS customer_id, c.name, COUNT(DISTINCT p.category) AS category_count\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nJOIN products p ON p.id = o.product_id\nWHERE o.status = 'delivered'\nGROUP BY c.id, c.name\nHAVING COUNT(DISTINCT p.category) >= 2\nORDER BY category_count DESC, c.id;",
    "hint": "Соедините покупателей, заказы и товары; считайте COUNT(DISTINCT p.category), а не число заказов.",
    "starter": "-- COUNT DISTINCT\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Покупки в нескольких категориях",
      [
        "Соедините покупателей, заказы и товары; считайте COUNT(DISTINCT p.category), а не число заказов.",
        "До группировки оставьте только доставленные заказы. Повторные покупки одной категории не увеличивают счётчик.",
        "HAVING отбирает покупателей минимум с двумя уникальными категориями."
      ],
      [
        "Покупка двух разных товаров одной категории всё равно даёт одну категорию.",
        "Без DISTINCT повторные заказы завышают показатель."
      ]
    ]
  },
  {
    "id": 34,
    "title": "Пары покупателей из одного города",
    "level": "Сложная",
    "topic": "SELF JOIN",
    "text": "Составьте все уникальные пары разных покупателей одного города. Верните customer_id_1, customer_id_2, city. В каждой паре первый id меньше второго; зеркальные пары и пары покупателя с самим собой исключите. Сортируйте по customer_id_1, затем customer_id_2. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "customer_id_1",
      "customer_id_2",
      "city"
    ],
    "answer": "SELECT a.id AS customer_id_1, b.id AS customer_id_2, a.city\nFROM customers a\nJOIN customers b ON b.city = a.city AND a.id < b.id\nORDER BY a.id, b.id;",
    "hint": "Соедините customers с самой собой под псевдонимами a и b. Условия: одинаковый город и a.id < b.id.",
    "starter": "-- SELF JOIN\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Пары покупателей из одного города",
      [
        "Соедините customers с самой собой под псевдонимами a и b. Условия: одинаковый город и a.id < b.id.",
        "Строгое неравенство одновременно исключает самосоединение и зеркальные пары.",
        "Для трёх покупателей Москвы получается три пары, а не шесть."
      ],
      [
        "Условие a.id != b.id оставляет зеркальные пары.",
        "DISTINCT не удалит пару (3,1) как дубль пары (1,3): это разные строки."
      ]
    ]
  },
  {
    "id": 35,
    "title": "Накопленные траты покупателя",
    "level": "Экспертная",
    "topic": "SUM OVER + PARTITION BY",
    "text": "Для каждого delivered-заказа выведите customer_id, order_id, order_date, order_total и cumulative_total — сумму доставленных покупок этого покупателя от первой до текущей включительно. Порядок внутри клиента: order_date, id. Итог сортируйте по customer_id, order_date, order_id. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "customer_id",
      "order_id",
      "order_date",
      "order_total",
      "cumulative_total"
    ],
    "answer": "WITH paid AS (\n  SELECT o.customer_id, o.id AS order_id, o.order_date,\n         o.quantity * p.price AS order_total\n  FROM orders o JOIN products p ON p.id = o.product_id\n  WHERE o.status = 'delivered'\n)\nSELECT customer_id, order_id, order_date, order_total,\n       SUM(order_total) OVER (\n         PARTITION BY customer_id ORDER BY order_date, order_id\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_total\nFROM paid\nORDER BY customer_id, order_date, order_id;",
    "hint": "Сначала получите стоимость delivered-заказов в CTE. Затем накопите SUM по отдельному окну каждого покупателя.",
    "starter": "-- SUM OVER + PARTITION BY\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Накопленные траты покупателя",
      [
        "Сначала получите стоимость delivered-заказов в CTE. Затем накопите SUM по отдельному окну каждого покупателя.",
        "PARTITION BY customer_id сбрасывает накопление при переходе к другому покупателю.",
        "Явная рамка ROWS от начала до текущей строки и сортировка по дате и id задают накопление по заказам.",
        "Внешний ORDER BY отдельно задаёт порядок итоговых строк."
      ],
      [
        "Без PARTITION BY покупатель получит чужие суммы.",
        "Рамка до UNBOUNDED FOLLOWING даст общий итог вместо накопленного."
      ]
    ]
  },
  {
    "id": 36,
    "title": "Выручка за три календарных дня",
    "level": "Экспертная",
    "topic": "Календарь + скользящее окно",
    "text": "Постройте даты с 2025-03-01 по 2025-03-13 включительно. Для каждой выведите day, daily_revenue и revenue_3d — delivered-выручку за текущий и два предыдущих календарных дня. Дни без продаж имеют 0. До 1 марта выручку считайте нулевой. Сортируйте по day. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "day",
      "daily_revenue",
      "revenue_3d"
    ],
    "answer": "WITH RECURSIVE calendar(day) AS (\n  SELECT '2025-03-01'\n  UNION ALL\n  SELECT date(day, '+1 day') FROM calendar WHERE day < '2025-03-13'\n), daily AS (\n  SELECT o.order_date AS day, SUM(o.quantity * p.price) AS revenue\n  FROM orders o JOIN products p ON p.id = o.product_id\n  WHERE o.status = 'delivered'\n  GROUP BY o.order_date\n), filled AS (\n  SELECT c.day, COALESCE(d.revenue, 0) AS daily_revenue\n  FROM calendar c LEFT JOIN daily d ON d.day = c.day\n)\nSELECT day, daily_revenue,\n       SUM(daily_revenue) OVER (\n         ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n       ) AS revenue_3d\nFROM filled\nORDER BY day;",
    "hint": "Сначала заполните все даты календаря и нулевые продажи, только затем вычисляйте скользящее окно.",
    "starter": "-- Календарь + скользящее окно\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Выручка за три календарных дня",
      [
        "Сначала заполните все даты календаря и нулевые продажи, только затем вычисляйте скользящее окно.",
        "На полном календаре одна строка равна одному дню, поэтому ROWS BETWEEN 2 PRECEDING AND CURRENT ROW охватывает ровно три календарных дня.",
        "Если считать окно только по дням с продажами, три строки могут охватывать значительно больший период.",
        "В первых двух строках окно естественно короче; это эквивалентно нулевой выручке до начала периода."
      ],
      [
        "Окно по исходным orders считает заказы, а не дни.",
        "INNER JOIN к календарю удалит пустые дни и исказит окно."
      ]
    ]
  },
  {
    "id": 37,
    "title": "Сессии покупок по перерывам",
    "level": "Экспертная",
    "topic": "LAG + CTE + SUM OVER",
    "text": "Используйте все заказы независимо от статуса. Внутри покупателя упорядочьте их по order_date, id. Первый заказ начинает сессию №1; новая сессия начинается, если прошло строго больше 3 дней с предыдущего заказа. Ровно 3 дня — та же сессия. Верните customer_id, session_no, start_date, end_date, order_count. Сортируйте по customer_id, session_no. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "customer_id",
      "session_no",
      "start_date",
      "end_date",
      "order_count"
    ],
    "answer": "WITH previous AS (\n  SELECT customer_id, id, order_date,\n         LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, id) AS prev_date\n  FROM orders\n), marked AS (\n  SELECT *, CASE WHEN prev_date IS NULL\n    OR julianday(order_date) - julianday(prev_date) > 3 THEN 1 ELSE 0 END AS is_new\n  FROM previous\n), numbered AS (\n  SELECT *, SUM(is_new) OVER (\n    PARTITION BY customer_id ORDER BY order_date, id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS session_no\n  FROM marked\n)\nSELECT customer_id, session_no, MIN(order_date) AS start_date,\n       MAX(order_date) AS end_date, COUNT(*) AS order_count\nFROM numbered\nGROUP BY customer_id, session_no\nORDER BY customer_id, session_no;",
    "hint": "Разделите решение на шаги: предыдущая дата через LAG, флаг начала сессии, накопительная сумма флагов, группировка по номеру сессии.",
    "starter": "-- LAG + CTE + SUM OVER\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Сессии покупок по перерывам",
      [
        "Разделите решение на шаги: предыдущая дата через LAG, флаг начала сессии, накопительная сумма флагов, группировка по номеру сессии.",
        "Для первого заказа prev_date равна NULL, поэтому он всегда получает флаг 1.",
        "Сравнивайте разность julianday со строгим > 3. Заказы 1 и 4 марта одного покупателя остаются в одной сессии.",
        "Оконные вычисления разнесены по CTE: нельзя напрямую вложить LAG внутрь SUM OVER в одном выражении.",
        "Сессия определяется перерывом между соседними заказами, а не длительностью от первой покупки сессии."
      ],
      [
        "Условие >= 3 неправильно разделит покупки с перерывом ровно три дня.",
        "Без PARTITION BY сессии будут объединять разных покупателей."
      ]
    ]
  },
  {
    "id": 38,
    "title": "Лидеры по выручке в каждом городе",
    "level": "Экспертная",
    "topic": "CTE + DENSE_RANK",
    "text": "Найдите покупателей с максимальной delivered-выручкой в каждом городе. При равенстве максимальной выручки верните всех лидеров. Покупателей с нулевой выручкой и города без доставок исключите. Верните city, customer_id, name, revenue. Сортируйте по city, затем customer_id. Выведите столбцы именно в указанном порядке.",
    "columns": [
      "city",
      "customer_id",
      "name",
      "revenue"
    ],
    "answer": "WITH totals AS (\n  SELECT c.id AS customer_id, c.name, c.city,\n         COALESCE(SUM(o.quantity * p.price), 0) AS revenue\n  FROM customers c\n  LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'delivered'\n  LEFT JOIN products p ON p.id = o.product_id\n  GROUP BY c.id, c.name, c.city\n), ranked AS (\n  SELECT *, DENSE_RANK() OVER (PARTITION BY city ORDER BY revenue DESC) AS place\n  FROM totals\n)\nSELECT city, customer_id, name, revenue\nFROM ranked\nWHERE place = 1 AND revenue > 0\nORDER BY city, customer_id;",
    "hint": "Сначала агрегируйте delivered-выручку до одной строки на покупателя, затем ранжируйте покупателей внутри города.",
    "starter": "-- CTE + DENSE_RANK\nSELECT\n  \nFROM customers;",
    "ordered": true,
    "review": [
      "Лидеры по выручке в каждом городе",
      [
        "Сначала агрегируйте delivered-выручку до одной строки на покупателя, затем ранжируйте покупателей внутри города.",
        "DENSE_RANK по revenue DESC присвоит место 1 всем покупателям с одинаковым максимумом.",
        "Не добавляйте customer_id внутрь оконного ORDER BY: он разделит равные суммы. Используйте id только во внешней сортировке.",
        "После ранжирования отберите место 1 и положительную выручку, исключая города без доставок."
      ],
      [
        "ROW_NUMBER вернёт только одного лидера при равенстве сумм.",
        "Ранжирование отдельных заказов ищет самый дорогой заказ, а не покупателя с максимальной суммой."
      ]
    ]
  }
]);
if(typeof module !== 'undefined') module.exports={seed,tasks};
