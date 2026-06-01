        let cartItems = [];
        let cartCount = 0;

        window.addToCart = function(button) {
            const card = button.closest('.dish-card');
            if (!card) return;
            
            const name = card.getAttribute('data-dish');
            const price = parseInt(card.getAttribute('data-price'));
            
            if (name && price) {
                cartItems.push({ name, price });
                cartCount++;
                const countSpan = document.getElementById('cartCount');
                if (countSpan) countSpan.innerText = cartCount;
                alert(`✅ ${name} добавлен в корзину!\nСумма: ${price}₽`);
                
                // Анимация кнопки
                button.style.transform = 'scale(0.9)';
                setTimeout(() => { button.style.transform = ''; }, 150);
            } else {
                console.error('У карточки нет атрибутов data-dish или data-price');
            }
        };

        const cartBtn = document.getElementById('cartButton');
        if (cartBtn) {
            cartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (cartItems.length === 0) {
                    alert('🛒 Корзина пуста');
                } else {
                    let msg = '🛒 ВАША КОРЗИНА:\n\n';
                    let total = 0;
                    cartItems.forEach((item, i) => {
                        msg += `${i+1}. ${item.name} — ${item.price}₽\n`;
                        total += item.price;
                    });
                    msg += `\nИТОГО: ${total}₽`;
                    alert(msg);
                }
            });
        }

        // ===== ПОИСК =====
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchButton');

        function performSearch() {
            const searchText = searchInput.value.toLowerCase().trim();
            const allCards = document.querySelectorAll('.dish-card');
            
            if (searchText === '') {
                allCards.forEach(card => card.style.display = '');
                return;
            }
            
            let found = 0;
            allCards.forEach(card => {
                const dishName = card.getAttribute('data-dish');
                if (dishName && dishName.toLowerCase().includes(searchText)) {
                    card.style.display = '';
                    found++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (found === 0) alert('😔 Ничего не найдено. Попробуйте: рамен, том ям, суши, моти');
        }

        if (searchBtn) searchBtn.addEventListener('click', performSearch);
        if (searchInput) searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });

        // ===== СЛАЙДЕР ГАЛЕРЕИ =====
        const track = document.getElementById('sliderTrack');
        const slides = document.querySelectorAll('.slider-slide');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        const dotsContainer = document.getElementById('sliderDots');
        
        if (track && slides.length > 0) {
            let currentIndex = 0;
            const totalSlides = slides.length;
            
            function createDots() {
                if (!dotsContainer) return;
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === currentIndex) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(i));
                    dotsContainer.appendChild(dot);
                }
            }
            
            function goToSlide(index) {
                if (index < 0) index = 0;
                if (index >= totalSlides) index = totalSlides - 1;
                currentIndex = index;
                const offset = -currentIndex * 100;
                track.style.transform = `translateX(${offset}%)`;
                
                document.querySelectorAll('.dot').forEach((dot, i) => {
                    if (i === currentIndex) dot.classList.add('active');
                    else dot.classList.remove('active');
                });
            }
            
            function nextSlide() {
                if (currentIndex < totalSlides - 1) goToSlide(currentIndex + 1);
                else goToSlide(0);
            }
            
            function prevSlide() {
                if (currentIndex > 0) goToSlide(currentIndex - 1);
                else goToSlide(totalSlides - 1);
            }
            
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            
            let autoSlide = setInterval(nextSlide, 5000);
            const sliderContainer = document.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
                sliderContainer.addEventListener('mouseleave', () => { autoSlide = setInterval(nextSlide, 5000); });
            }
            
            createDots();
            goToSlide(0);
        }