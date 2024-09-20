// Получаем ссылки на элементы DOM
const cartModal = document.querySelector('.cart-modal');
const openCartButton = document.querySelector('.open-cart-button');
const closeCartButton = document.querySelector('.close-cart-button');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalAmount = document.querySelector('.cart-total-amount');
const checkoutButton = document.querySelector('.checkout-button');

const header = document.querySelector('.header');
const burgerBtn = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
const contentGrids = document.querySelectorAll('.content__grid');
const cartItemsCount = document.querySelector('.header__cart-count');

// Массив для хранения товаров в корзине
let cartItems = [];

// Функция для открытия и закрытия модального окна корзины
function toggleCartModal() {
  cartModal.classList.toggle('visible');
  renderCartItems();
  updateCartTotal();
}

// Функция для отображения товаров в корзине
function renderCartItems() {
  cartItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    const itemElement = createCartItemElement(item);
    cartItemsContainer.appendChild(itemElement);
  });
}

// Функция для создания элемента товара в корзине
function createCartItemElement(item) {
  const itemElement = document.createElement('div');
  itemElement.classList.add('cart-item');

  itemElement.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
    <div class="cart-item-details">
      <h3 class="cart-item-name">${item.name}</h3>
      <p class="cart-item-price">${item.price.toFixed(2)} ₽</p>
    </div>
    <div class="cart-item-quantity">
      <button class="cart-item-decrease-button">-</button>
      <input type="number" class="cart-item-quantity-input" value="${item.quantity}" min="1">
      <button class="cart-item-increase-button">+</button>
      <button class="cart-item-remove-button">Удалить</button>
    </div>
  `;

  // Добавляем обработчики событий для количества и удаления
  const decreaseButton = itemElement.querySelector('.cart-item-decrease-button');
  const increaseButton = itemElement.querySelector('.cart-item-increase-button');
  const quantityInput = itemElement.querySelector('.cart-item-quantity-input');
  const removeButton = itemElement.querySelector('.cart-item-remove-button');

  decreaseButton.addEventListener('click', () => updateItemQuantity(item, -1));
  increaseButton.addEventListener('click', () => updateItemQuantity(item, 1));
  quantityInput.addEventListener('change', () => updateItemQuantity(item, parseInt(quantityInput.value) - item.quantity));
  removeButton.addEventListener('click', () => removeItemFromCart(item));

  return itemElement;
}

// Функция для обновления количества товара в корзине
function updateItemQuantity(item, change) {
  item.quantity = Math.max(1, item.quantity + change);
  renderCartItems();
  updateCartTotal();
}

// Функция для удаления товара из корзины
function removeItemFromCart(item) {
  const index = cartItems.indexOf(item);
  if (index !== -1) {
    cartItems.splice(index, 1);
    renderCartItems();
    updateCartTotal();
  }
}

// Функция для обновления общей суммы корзины
function updateCartTotal() {
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  cartTotalAmount.textContent = `${total.toFixed(2)} ₽`;
}

// Обработчики событий для кнопок
openCartButton.addEventListener('click', toggleCartModal);
closeCartButton.addEventListener('click', toggleCartModal);
checkoutButton.addEventListener('click', () => {
  // Логика для обработки оформления заказа
  console.log('Обработка оформления заказа...');
});

// Добавление кода для header и бургер-меню
window.addEventListener('scroll', () => {
  // Если пользователь прокрутил страницу вниз на 50 пикселей или больше
  if (window.pageYOffset >= 50) {
    // Добавляем класс 'scrolled' к элементу header
    header.classList.add('scrolled');
  } else {
    // Иначе удаляем класс 'scrolled'
    header.classList.remove('scrolled');
  }
});

// Добавляем обработчик клика по бургерному меню
burgerBtn.addEventListener('click', () => {
  // Переключаем класс 'active' для элемента nav
  nav.classList.toggle('active');
});

// Функция для создания карточки товара
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('content__item');

  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;

  const content = document.createElement('div');
  content.classList.add('content__item-content');

  const title = document.createElement('h3');
  title.textContent = product.name;

  const description = document.createElement('p');
  description.textContent = product.description;

  const priceAndWeight = document.createElement('p');
  priceAndWeight.classList.add('content__item-price-weight');
  priceAndWeight.textContent = `${product.price} ₽ / ${product.weight} г`;

  const action = document.createElement('div');
  action.classList.add('content__item-action');

  const button = document.createElement('button');
  button.textContent = 'Добавить в корзину';
  button.addEventListener('click', () => addToCart(product));

  action.appendChild(button);
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(priceAndWeight);
  content.appendChild(action);
  card.appendChild(img);
  card.appendChild(content);

  return card;
}

// Массив для хранения товаров в корзине
let cart_items = [];

// Функция для добавления товара в корзину
function addToCart(product) {
  // Проверяем, есть ли уже этот товар в корзине
  const existingItem = cartItems.find(item => item.name === product.name);
  if (existingItem) {
    // Если есть, увеличиваем количество
    existingItem.quantity += 1;
  } else {
    // Если нет, добавляем новый товар
    cartItems.push({
      ...product,
      quantity: 1
    });
  }
  updateCartCount();
  console.log(`Добавлен в корзину: ${product.name}`);
}

// Функция для обновления количества товаров в корзине
function updateCartCount() {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  cartItemsCount.textContent = totalItems;
}

// Функция для заполнения контента секций
function fillSectionContent() {
  contentGrids.forEach((grid, index) => {
    const sectionProducts = products.filter(product => product.type === ['roll', 'set', 'drink', 'snack'][index]);
    sectionProducts.forEach(product => {
      grid.appendChild(createProductCard(product));
    });
  });
}





// Вызываем функцию для заполнения контента секций
fillSectionContent();

// Начальная инициализация отображения корзины
renderCartItems();
updateCartTotal();
