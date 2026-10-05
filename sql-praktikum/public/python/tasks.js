(function(root){const tasks=[
  {
    "id": 1,
    "title": "Стоимость покупки",
    "level": "Основы",
    "topic": "Переменные, словарь и return",
    "text": "Функция solve(data) получает словарь с целыми price и quantity. Верните стоимость покупки — их произведение. Оба числа неотрицательны.",
    "theory": [
      "def объявляет функцию. data — её аргумент. Отступы из четырёх пробелов выделяют тело функции.",
      "data[\"price\"] читает значение словаря по ключу. return возвращает результат; print только выводит текст."
    ],
    "starter": "def solve(data):\n    price = data[\"price\"]\n    # Получите количество и верните стоимость\n    return None",
    "solution": "def solve(data):\n    price = data[\"price\"]\n    quantity = data[\"quantity\"]\n    return price * quantity",
    "tests": [
      {
        "input": {
          "price": 150,
          "quantity": 3
        },
        "expected": 450
      },
      {
        "input": {
          "price": 90,
          "quantity": 0
        },
        "expected": 0
      },
      {
        "input": {
          "price": 0,
          "quantity": 7
        },
        "expected": 0
      },
      {
        "input": {
          "price": 1200,
          "quantity": 12
        },
        "expected": 14400
      }
    ],
    "hint": "Прочитайте price и quantity из data по соответствующим ключам.",
    "review": {
      "goal": "Переменные, словарь и return",
      "steps": [
        "Прочитайте price и quantity из data по соответствующим ключам.",
        "Умножьте цену на количество оператором *.",
        "Верните число через return."
      ],
      "code": "def solve(data):\n    price = data[\"price\"]\n    quantity = data[\"quantity\"]\n    return price * quantity",
      "mistakes": [
        "print(result) не заменяет return result.",
        "Не заключайте числовой результат в кавычки."
      ],
      "expected": "Время и дополнительная память: O(1). Проверьте нулевую цену и нулевое количество."
    }
  },
  {
    "id": 2,
    "title": "Чётное или нечётное",
    "level": "Основы",
    "topic": "Условия и остаток от деления",
    "text": "Дано целое число data. Верните строку \"even\", если оно чётное, иначе \"odd\". Ноль считается чётным.",
    "theory": [
      "Оператор % возвращает остаток от деления. == сравнивает значения.",
      "if выполняет блок при истинном условии; else — в противном случае."
    ],
    "starter": "def solve(data):\n    # Проверьте остаток от деления на 2\n    return None",
    "solution": "def solve(data):\n    if data % 2 == 0:\n        return \"even\"\n    return \"odd\"",
    "tests": [
      {
        "input": 8,
        "expected": "even"
      },
      {
        "input": 3,
        "expected": "odd"
      },
      {
        "input": 0,
        "expected": "even"
      },
      {
        "input": -7,
        "expected": "odd"
      },
      {
        "input": -4,
        "expected": "even"
      }
    ],
    "hint": "Проверьте data % 2 == 0.",
    "review": {
      "goal": "Условия и остаток от деления",
      "steps": [
        "Проверьте data % 2 == 0.",
        "В истинной ветке верните \"even\".",
        "Для остальных чисел верните \"odd\"; отдельная обработка отрицательных чисел не нужна."
      ],
      "code": "def solve(data):\n    if data % 2 == 0:\n        return \"even\"\n    return \"odd\"",
      "mistakes": [
        "Для сравнения нужен ==, а не =.",
        "Регистр и написание строк должны точно совпадать с условием."
      ],
      "expected": "Время O(1), память O(1). Обязательно проверьте 0 и отрицательное число."
    }
  },
  {
    "id": 3,
    "title": "Сумма от 1 до n",
    "level": "Основы",
    "topic": "Цикл for и накопитель",
    "text": "Дано целое data от 0 до 10000. Верните сумму целых чисел от 1 до data включительно. Для 0 верните 0.",
    "theory": [
      "range(start, stop) не включает stop. Чтобы включить n, используйте range(1, n + 1).",
      "Переменная-накопитель начинается с 0. Оператор += прибавляет к её текущему значению."
    ],
    "starter": "def solve(data):\n    total = 0\n    # Допишите цикл\n    return total",
    "solution": "def solve(data):\n    total = 0\n    for number in range(1, data + 1):\n        total += number\n    return total",
    "tests": [
      {
        "input": 4,
        "expected": 10
      },
      {
        "input": 0,
        "expected": 0
      },
      {
        "input": 1,
        "expected": 1
      },
      {
        "input": 100,
        "expected": 5050
      },
      {
        "input": 10000,
        "expected": 50005000
      }
    ],
    "hint": "Создайте total = 0 до цикла.",
    "review": {
      "goal": "Цикл for и накопитель",
      "steps": [
        "Создайте total = 0 до цикла.",
        "Переберите range(1, data + 1) и прибавляйте каждое число.",
        "Верните total после завершения цикла. Также допустима формула data * (data + 1) // 2."
      ],
      "code": "def solve(data):\n    total = 0\n    for number in range(1, data + 1):\n        total += number\n    return total",
      "mistakes": [
        "range(1, data) пропустит последнее число.",
        "return внутри цикла завершит функцию слишком рано."
      ],
      "expected": "Цикл: O(n) времени и O(1) памяти. Формула: O(1) времени."
    }
  },
  {
    "id": 4,
    "title": "Нормализация имени",
    "level": "Основы",
    "topic": "Строковые методы",
    "text": "Дана строка data с именем. Удалите пробелы по краям и приведите все буквы к нижнему регистру. Пробелы внутри строки сохраняйте.",
    "theory": [
      "Строки неизменяемы: strip() и lower() возвращают новую строку.",
      "Методы можно вызывать последовательно: data.strip().lower()."
    ],
    "starter": "def solve(data):\n    # Верните обработанную строку\n    return None",
    "solution": "def solve(data):\n    return data.strip().lower()",
    "tests": [
      {
        "input": "  ANNA  ",
        "expected": "anna"
      },
      {
        "input": "ИВАН",
        "expected": "иван"
      },
      {
        "input": "  Mary Jane ",
        "expected": "mary jane"
      },
      {
        "input": "   ",
        "expected": ""
      },
      {
        "input": "",
        "expected": ""
      }
    ],
    "hint": "Удалите только краевые пробелы с помощью strip().",
    "review": {
      "goal": "Строковые методы",
      "steps": [
        "Удалите только краевые пробелы с помощью strip().",
        "Примените lower() к результату.",
        "Верните новую строку, сохранив внутренние пробелы."
      ],
      "code": "def solve(data):\n    return data.strip().lower()",
      "mistakes": [
        "replace(\" \", \"\") удалит также пробелы внутри имени.",
        "Вызов метода без присваивания или return не изменяет исходную строку."
      ],
      "expected": "Время и память O(n), где n — длина строки. Проверьте пустую строку."
    }
  },
  {
    "id": 5,
    "title": "Фильтр положительных чисел",
    "level": "Практика",
    "topic": "Списки и генератор списка",
    "text": "Дан список целых чисел data. Верните новый список только из чисел строго больше нуля, сохранив исходный порядок и повторы.",
    "theory": [
      "Список хранит элементы в заданном порядке. append добавляет элемент в конец.",
      "Выражение [x for x in data if условие] создаёт новый отфильтрованный список."
    ],
    "starter": "def solve(data):\n    result = []\n    # Отберите числа больше нуля\n    return result",
    "solution": "def solve(data):\n    return [number for number in data if number > 0]",
    "tests": [
      {
        "input": [
          -2,
          0,
          3,
          1
        ],
        "expected": [
          3,
          1
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          -1,
          -2
        ],
        "expected": []
      },
      {
        "input": [
          2,
          2,
          0,
          5
        ],
        "expected": [
          2,
          2,
          5
        ]
      }
    ],
    "hint": "Переберите все элементы data.",
    "review": {
      "goal": "Списки и генератор списка",
      "steps": [
        "Переберите все элементы data.",
        "Оставьте элемент, только если number > 0.",
        "Верните список. Генератор списка сохраняет порядок обхода."
      ],
      "code": "def solve(data):\n    return [number for number in data if number > 0]",
      "mistakes": [
        "Условие >= 0 ошибочно включит ноль.",
        "Множество удалит повторы и не подходит для этого результата."
      ],
      "expected": "O(n) времени, O(k) памяти результата: k — количество положительных элементов."
    }
  },
  {
    "id": 6,
    "title": "Частоты слов",
    "level": "Практика",
    "topic": "Словарь-счётчик",
    "text": "Дан список строк data. Верните словарь: слово → число появлений. Слова чувствительны к регистру. Порядок ключей не важен.",
    "theory": [
      "Словарь сопоставляет ключи значениям. Ключи уникальны.",
      "counts.get(word, 0) возвращает текущее значение или 0, если ключ ещё отсутствует."
    ],
    "starter": "def solve(data):\n    counts = {}\n    # Подсчитайте каждое слово\n    return counts",
    "solution": "def solve(data):\n    counts = {}\n    for word in data:\n        counts[word] = counts.get(word, 0) + 1\n    return counts",
    "tests": [
      {
        "input": [
          "sql",
          "api",
          "sql"
        ],
        "expected": {
          "sql": 2,
          "api": 1
        }
      },
      {
        "input": [],
        "expected": {}
      },
      {
        "input": [
          "A",
          "a",
          "A"
        ],
        "expected": {
          "A": 2,
          "a": 1
        }
      },
      {
        "input": [
          "x"
        ],
        "expected": {
          "x": 1
        }
      }
    ],
    "hint": "Создайте пустой словарь counts.",
    "review": {
      "goal": "Словарь-счётчик",
      "steps": [
        "Создайте пустой словарь counts.",
        "Для каждого слова прочитайте текущий счётчик через get(word, 0).",
        "Запишите значение на единицу больше и верните словарь."
      ],
      "code": "def solve(data):\n    counts = {}\n    for word in data:\n        counts[word] = counts.get(word, 0) + 1\n    return counts",
      "mistakes": [
        "Прямое counts[word] до первого присваивания вызовет KeyError.",
        "Не приводите слова к нижнему регистру: условие различает A и a."
      ],
      "expected": "Ожидаемое время O(n), память O(k), где k — число различных слов."
    }
  },
  {
    "id": 7,
    "title": "Рейтинг участников",
    "level": "Практика",
    "topic": "Сортировка по нескольким ключам",
    "text": "Дан список словарей с name (строка) и score (целое). Верните имена по убыванию score; при равном score — по возрастанию name в стандартном порядке Python.",
    "theory": [
      "sorted возвращает отсортированный список. key задаёт значение, по которому сравнивают элементы.",
      "Кортеж сравнивается слева направо. Ключ (-score, name) совмещает убывание балла и возрастание имени."
    ],
    "starter": "def solve(data):\n    # Отсортируйте записи и верните список имён\n    return []",
    "solution": "def solve(data):\n    ordered = sorted(data, key=lambda person: (-person[\"score\"], person[\"name\"]))\n    return [person[\"name\"] for person in ordered]",
    "tests": [
      {
        "input": [
          {
            "name": "Bob",
            "score": 8
          },
          {
            "name": "Ann",
            "score": 8
          },
          {
            "name": "Zoe",
            "score": 10
          }
        ],
        "expected": [
          "Zoe",
          "Ann",
          "Bob"
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          {
            "name": "B",
            "score": -2
          },
          {
            "name": "A",
            "score": 0
          }
        ],
        "expected": [
          "A",
          "B"
        ]
      },
      {
        "input": [
          {
            "name": "Ann",
            "score": 1
          }
        ],
        "expected": [
          "Ann"
        ]
      }
    ],
    "hint": "Задайте ключ lambda person: (-person[\"score\"], person[\"name\"]).",
    "review": {
      "goal": "Сортировка по нескольким ключам",
      "steps": [
        "Задайте ключ lambda person: (-person[\"score\"], person[\"name\"]).",
        "Вызовите sorted(data, key=...) для получения упорядоченных записей.",
        "Выберите только name из каждой записи."
      ],
      "code": "def solve(data):\n    ordered = sorted(data, key=lambda person: (-person[\"score\"], person[\"name\"]))\n    return [person[\"name\"] for person in ordered]",
      "mistakes": [
        "reverse=True развернёт также порядок имён при равных баллах.",
        "Не возвращайте целые словари: нужны только имена."
      ],
      "expected": "O(n log n) времени и O(n) памяти. Проверьте равные и отрицательные баллы."
    }
  },
  {
    "id": 8,
    "title": "Безопасное преобразование",
    "level": "Практика",
    "topic": "Исключения и типы",
    "text": "Дан список строк data. Для каждой попробуйте int(text). Верните список успешно преобразованных целых чисел. Строки, для которых int вызывает ValueError, пропускайте.",
    "theory": [
      "int(\"12\") возвращает целое число; int(\"3.5\") вызывает ValueError.",
      "try/except позволяет обработать ожидаемую ошибку и продолжить цикл."
    ],
    "starter": "def solve(data):\n    result = []\n    # Преобразуйте строки, пропуская ValueError\n    return result",
    "solution": "def solve(data):\n    result = []\n    for text in data:\n        try:\n            result.append(int(text))\n        except ValueError:\n            pass\n    return result",
    "tests": [
      {
        "input": [
          "12",
          "oops",
          "-3",
          " 4 ",
          "2.5"
        ],
        "expected": [
          12,
          -3,
          4
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          "",
          "a"
        ],
        "expected": []
      },
      {
        "input": [
          "+7",
          "0",
          "01"
        ],
        "expected": [
          7,
          0,
          1
        ]
      }
    ],
    "hint": "Обрабатывайте каждую строку в отдельной итерации.",
    "review": {
      "goal": "Исключения и типы",
      "steps": [
        "Обрабатывайте каждую строку в отдельной итерации.",
        "В try вызовите int(text) и добавьте число в result.",
        "Перехватите только ValueError; pass пропустит ошибочную строку."
      ],
      "code": "def solve(data):\n    result = []\n    for text in data:\n        try:\n            result.append(int(text))\n        except ValueError:\n            pass\n    return result",
      "mistakes": [
        "isdigit() не покрывает отрицательные числа, знак + и пробелы.",
        "Общий try вокруг всего цикла оборвёт обработку после первой ошибки."
      ],
      "expected": "O(L) времени, где L — общая длина строк; O(n) памяти для результата."
    }
  },
  {
    "id": 9,
    "title": "Выручка по категориям",
    "level": "Сложные",
    "topic": "Агрегация записей",
    "text": "Дан список заказов: category (строка), price и quantity (неотрицательные целые), status. Учитывайте только status=\"paid\". Верните словарь category → сумма price * quantity. Категорию оплаченного заказа с нулевой суммой также включайте.",
    "theory": [
      "Агрегация объединяет несколько записей одной группы в одно значение.",
      "Сначала фильтруйте записи, затем рассчитывайте вклад и прибавляйте его в словарь."
    ],
    "starter": "def solve(data):\n    totals = {}\n    # Фильтрация, расчёт суммы, группировка\n    return totals",
    "solution": "def solve(data):\n    totals = {}\n    for order in data:\n        if order[\"status\"] != \"paid\":\n            continue\n        category = order[\"category\"]\n        amount = order[\"price\"] * order[\"quantity\"]\n        totals[category] = totals.get(category, 0) + amount\n    return totals",
    "tests": [
      {
        "input": [
          {
            "category": "books",
            "price": 100,
            "quantity": 2,
            "status": "paid"
          },
          {
            "category": "books",
            "price": 50,
            "quantity": 1,
            "status": "paid"
          },
          {
            "category": "games",
            "price": 900,
            "quantity": 1,
            "status": "cancelled"
          }
        ],
        "expected": {
          "books": 250
        }
      },
      {
        "input": [],
        "expected": {}
      },
      {
        "input": [
          {
            "category": "a",
            "price": 10,
            "quantity": 0,
            "status": "paid"
          }
        ],
        "expected": {
          "a": 0
        }
      },
      {
        "input": [
          {
            "category": "a",
            "price": 10,
            "quantity": 2,
            "status": "pending"
          }
        ],
        "expected": {}
      },
      {
        "input": [
          {
            "category": "a",
            "price": 5,
            "quantity": 2,
            "status": "paid"
          },
          {
            "category": "b",
            "price": 7,
            "quantity": 3,
            "status": "paid"
          }
        ],
        "expected": {
          "a": 10,
          "b": 21
        }
      }
    ],
    "hint": "Пропустите заказы с status, отличным от \"paid\".",
    "review": {
      "goal": "Агрегация записей",
      "steps": [
        "Пропустите заказы с status, отличным от \"paid\".",
        "Вычислите amount = price * quantity.",
        "Суммируйте amount по category через get(category, 0).",
        "Верните словарь; нулевую сумму оплаченного заказа не удаляйте."
      ],
      "code": "def solve(data):\n    totals = {}\n    for order in data:\n        if order[\"status\"] != \"paid\":\n            continue\n        category = order[\"category\"]\n        amount = order[\"price\"] * order[\"quantity\"]\n        totals[category] = totals.get(category, 0) + amount\n    return totals",
      "mistakes": [
        "Суммирование одной price игнорирует количество.",
        "Присваивание totals[category] = amount перезаписывает предыдущие заказы."
      ],
      "expected": "O(n) времени, O(k) памяти для k категорий оплаченных заказов."
    }
  },
  {
    "id": 10,
    "title": "Максимальная сумма окна",
    "level": "Сложные",
    "topic": "Скользящее окно",
    "text": "data содержит nums — список целых чисел и k — размер окна. Для 1 ≤ k ≤ len(nums) верните максимальную сумму k соседних элементов. Для недопустимого k верните None.",
    "theory": [
      "Окно фиксированной длины сдвигается на один элемент: убираем левый и добавляем новый правый.",
      "None означает отсутствие результата. При вводе JSON в редакторе ему соответствует null."
    ],
    "starter": "def solve(data):\n    nums, k = data[\"nums\"], data[\"k\"]\n    # Проверьте k и найдите лучшую сумму\n    return None",
    "solution": "def solve(data):\n    nums, k = data[\"nums\"], data[\"k\"]\n    if k < 1 or k > len(nums):\n        return None\n    current = sum(nums[:k])\n    best = current\n    for right in range(k, len(nums)):\n        current += nums[right] - nums[right - k]\n        best = max(best, current)\n    return best",
    "tests": [
      {
        "input": {
          "nums": [
            2,
            1,
            5,
            1,
            3,
            2
          ],
          "k": 3
        },
        "expected": 9
      },
      {
        "input": {
          "nums": [
            -5,
            -2,
            -3
          ],
          "k": 2
        },
        "expected": -5
      },
      {
        "input": {
          "nums": [],
          "k": 1
        },
        "expected": null
      },
      {
        "input": {
          "nums": [
            1,
            2
          ],
          "k": 0
        },
        "expected": null
      },
      {
        "input": {
          "nums": [
            4,
            2
          ],
          "k": 3
        },
        "expected": null
      },
      {
        "input": {
          "nums": [
            2,
            3
          ],
          "k": 2
        },
        "expected": 5
      }
    ],
    "hint": "Сначала проверьте границы k.",
    "review": {
      "goal": "Скользящее окно",
      "steps": [
        "Сначала проверьте границы k.",
        "Посчитайте сумму первого окна и присвойте её current и best.",
        "При сдвиге прибавляйте nums[right] и вычитайте nums[right - k].",
        "Обновляйте best через max и верните его."
      ],
      "code": "def solve(data):\n    nums, k = data[\"nums\"], data[\"k\"]\n    if k < 1 or k > len(nums):\n        return None\n    current = sum(nums[:k])\n    best = current\n    for right in range(k, len(nums)):\n        current += nums[right] - nums[right - k]\n        best = max(best, current)\n    return best",
      "mistakes": [
        "Начальное best = 0 неверно для полностью отрицательного списка.",
        "Нельзя выбирать произвольные k элементов: они должны быть соседними."
      ],
      "expected": "Эталон: O(n) времени, O(k) временной памяти из-за nums[:k]. Память можно сократить до O(1), вычислив первую сумму циклом. Проверяется результат, не конкретный алгоритм."
    }
  },
  {
    "id": 11,
    "title": "Проверка скобок",
    "level": "Сложные",
    "topic": "Стек и инвариант",
    "text": "Дана строка data только из символов ()[]{}. Верните True, если скобки сбалансированы и правильно вложены, иначе False. Пустая строка корректна.",
    "theory": [
      "Стек работает по принципу «последним вошёл — первым вышел». Для списка используйте append и pop.",
      "Закрывающая скобка должна соответствовать последней незакрытой открывающей."
    ],
    "starter": "def solve(data):\n    stack = []\n    # Сопоставьте пары и проверьте вложенность\n    return False",
    "solution": "def solve(data):\n    stack = []\n    pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    for char in data:\n        if char in \"([{\":\n            stack.append(char)\n        elif not stack or stack.pop() != pairs[char]:\n            return False\n    return not stack",
    "tests": [
      {
        "input": "([]{})",
        "expected": true
      },
      {
        "input": "([)]",
        "expected": false
      },
      {
        "input": "",
        "expected": true
      },
      {
        "input": ")",
        "expected": false
      },
      {
        "input": "(((",
        "expected": false
      },
      {
        "input": "{}[]()",
        "expected": true
      }
    ],
    "hint": "Запишите соответствия закрывающих скобок открывающим.",
    "review": {
      "goal": "Стек и инвариант",
      "steps": [
        "Запишите соответствия закрывающих скобок открывающим.",
        "Открывающие скобки кладите в стек.",
        "Для закрывающей сначала проверьте непустой стек, затем извлеките последнюю и сравните тип.",
        "В конце стек должен быть пустым."
      ],
      "code": "def solve(data):\n    stack = []\n    pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    for char in data:\n        if char in \"([{\":\n            stack.append(char)\n        elif not stack or stack.pop() != pairs[char]:\n            return False\n    return not stack",
      "mistakes": [
        "Одинаковое количество открывающих и закрывающих не гарантирует вложенность.",
        "Вызов pop на пустом списке вызывает IndexError."
      ],
      "expected": "O(n) времени и O(n) памяти в худшем случае. Верните boolean, не строку \"True\"."
    }
  },
  {
    "id": 12,
    "title": "Объединение интервалов",
    "level": "Сложные",
    "topic": "Сортировка и последовательное слияние",
    "text": "Дан список целочисленных интервалов [start, end], start ≤ end. Объедините пересекающиеся или касающиеся интервалы. Верните список объединённых интервалов по возрастанию начала.",
    "theory": [
      "После сортировки по началу достаточно сравнивать новый интервал с последним в результате.",
      "Если start ≤ конец последнего, обновите конец через max. Иначе начните новый интервал."
    ],
    "starter": "def solve(data):\n    merged = []\n    # Отсортируйте интервалы и объедините пересечения\n    return merged",
    "solution": "def solve(data):\n    merged = []\n    for start, end in sorted(data):\n        if not merged or start > merged[-1][1]:\n            merged.append([start, end])\n        else:\n            merged[-1][1] = max(merged[-1][1], end)\n    return merged",
    "tests": [
      {
        "input": [
          [
            1,
            3
          ],
          [
            2,
            6
          ],
          [
            8,
            10
          ],
          [
            10,
            12
          ]
        ],
        "expected": [
          [
            1,
            6
          ],
          [
            8,
            12
          ]
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          [
            5,
            7
          ],
          [
            1,
            9
          ],
          [
            2,
            3
          ]
        ],
        "expected": [
          [
            1,
            9
          ]
        ]
      },
      {
        "input": [
          [
            1,
            1
          ],
          [
            1,
            1
          ]
        ],
        "expected": [
          [
            1,
            1
          ]
        ]
      },
      {
        "input": [
          [
            -4,
            -2
          ],
          [
            0,
            1
          ],
          [
            -2,
            0
          ]
        ],
        "expected": [
          [
            -4,
            1
          ]
        ]
      },
      {
        "input": [
          [
            3,
            4
          ],
          [
            1,
            2
          ]
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            3,
            4
          ]
        ]
      }
    ],
    "hint": "Отсортируйте интервалы по началу (sorted также сравнит конец при равных началах).",
    "review": {
      "goal": "Сортировка и последовательное слияние",
      "steps": [
        "Отсортируйте интервалы по началу (sorted также сравнит конец при равных началах).",
        "Первый интервал или интервал после разрыва добавьте в merged.",
        "Если есть пересечение или касание, замените конец последнего интервала на max старого и нового концов.",
        "Верните merged; вложенные интервалы не должны уменьшать текущий конец."
      ],
      "code": "def solve(data):\n    merged = []\n    for start, end in sorted(data):\n        if not merged or start > merged[-1][1]:\n            merged.append([start, end])\n        else:\n            merged[-1][1] = max(merged[-1][1], end)\n    return merged",
      "mistakes": [
        "Без сортировки одного прохода недостаточно.",
        "Проверка start >= end ошибочно разделит касающиеся интервалы.",
        "Прямое присваивание нового конца может укоротить внешний интервал."
      ],
      "expected": "O(n log n) времени и O(n) памяти. Проверьте вложенные, касающиеся и одинаковые интервалы."
    }
  }
];root.PythonPractice={tasks};if(typeof module!=="undefined")module.exports={tasks};})(typeof globalThis!=="undefined"?globalThis:this);
