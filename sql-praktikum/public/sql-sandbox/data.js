(function(root){const tables={
customers:{title:'Покупатели',description:'8 покупателей из разных городов. id — уникальный идентификатор покупателя.',columns:[['id','INTEGER','PK','Идентификатор'],['name','TEXT','','Имя покупателя'],['city','TEXT','','Город']]},
products:{title:'Товары',description:'8 товаров: электроника, аксессуары, товары для дома и канцелярия.',columns:[['id','INTEGER','PK','Идентификатор'],['name','TEXT','','Название'],['category','TEXT','','Категория'],['price','INTEGER','','Цена, ₽']]},
orders:{title:'Заказы',description:'12 заказов с датами, статусами и количеством товара. У одного покупателя может быть несколько заказов.',columns:[['id','INTEGER','PK','Идентификатор'],['customer_id','INTEGER','FK → customers.id','Покупатель'],['product_id','INTEGER','FK → products.id','Товар'],['quantity','INTEGER','','Количество'],['order_date','TEXT','','Дата, YYYY-MM-DD'],['status','TEXT','','Статус']]}
};
const examples=[
{title:'Все покупатели',description:'Начните с просмотра таблицы и выберите нужные столбцы.',sql:'SELECT *\nFROM customers\nORDER BY id;'},
{title:'Фильтр и сортировка',description:'Товары от 1000 до 10000 рублей, начиная с самых дорогих.',sql:'SELECT name, category, price\nFROM products\nWHERE price BETWEEN 1000 AND 10000\nORDER BY price DESC;'},
{title:'Три таблицы через JOIN',description:'Добавьте к заказу имя покупателя, название товара и сумму.',sql:'SELECT o.id, c.name AS customer, p.name AS product,\n       o.quantity, p.price, o.quantity * p.price AS total\nFROM orders AS o\nJOIN customers AS c ON c.id = o.customer_id\nJOIN products AS p ON p.id = o.product_id\nORDER BY o.id;'},
{title:'Клиенты без заказов',description:'LEFT JOIN сохраняет покупателей, для которых нет заказа.',sql:'SELECT c.id, c.name, c.city\nFROM customers AS c\nLEFT JOIN orders AS o ON o.customer_id = c.id\nWHERE o.id IS NULL\nORDER BY c.id;'},
{title:'Выручка по категориям',description:'Суммируйте стоимость только доставленных заказов.',sql:"SELECT p.category,\n       SUM(o.quantity * p.price) AS revenue\nFROM orders AS o\nJOIN products AS p ON p.id = o.product_id\nWHERE o.status = 'delivered'\nGROUP BY p.category\nORDER BY revenue DESC;"},
{title:'CTE и ранжирование',description:'Соберите выручку по клиентам в CTE, затем присвойте места.',sql:"WITH revenue AS (\n  SELECT c.name, SUM(o.quantity * p.price) AS total\n  FROM customers AS c\n  JOIN orders AS o ON o.customer_id = c.id\n  JOIN products AS p ON p.id = o.product_id\n  WHERE o.status = 'delivered'\n  GROUP BY c.id, c.name\n)\nSELECT name, total,\n       DENSE_RANK() OVER (ORDER BY total DESC) AS place\nFROM revenue\nORDER BY place, name;"}
];const api={tables,examples};root.SQLSandboxData=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
