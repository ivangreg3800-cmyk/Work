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
if(typeof module !== 'undefined') module.exports={seed,tasks};
