document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. ÜST MENÜ KAYDIRMA EFEKTİ (STICKY HEADER)
    // ==========================================
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Sayfa yenilendiğinde kontrol et

    // ==========================================
    // 2. MOBİL NAVİGASYON (HAMBURGER MENÜ)
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('overflow-hidden'); // Menü açıkken arka plan kaymasını engelle
    };

    const closeMenu = () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.classList.remove('overflow-hidden');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ==========================================
    // 3. SCROLLSPY (KAYDIRIRKEN AKTİF SAYFA BAĞLANTISI)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    const scrollSpyOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });

    // ==========================================
    // 4. SCROLL REVEAL (KAYDIRIRKEN BELİRME ANİMASYONU)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animasyon bir kere çalışsın
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ==========================================
    // 6. İLETİŞİM FORMU DOĞRULAMA VE GÖNDERME
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const successResetBtn = document.getElementById('success-reset');
    
    // Girdiler ve Hata Alanları
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // E-posta Regex Doğrulama
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Hata durumunu yönet
    const setInvalid = (inputElement) => {
        const parent = inputElement.parentElement;
        parent.classList.add('invalid');
    };

    const setValid = (inputElement) => {
        const parent = inputElement.parentElement;
        parent.classList.remove('invalid');
    };

    // Canlı Giriş Kontrolleri
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== '') setValid(nameInput);
    });

    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value.trim())) setValid(emailInput);
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim() !== '') setValid(messageInput);
    });

    // Gönderme İşlemi
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;

        // İsim kontrolü
        if (nameInput.value.trim() === '') {
            setInvalid(nameInput);
            isFormValid = false;
        } else {
            setValid(nameInput);
        }

        // E-posta kontrolü
        if (!isValidEmail(emailInput.value.trim())) {
            setInvalid(emailInput);
            isFormValid = false;
        } else {
            setValid(emailInput);
        }

        // Mesaj kontrolü
        if (messageInput.value.trim() === '') {
            setInvalid(messageInput);
            isFormValid = false;
        } else {
            setValid(messageInput);
        }

        if (isFormValid) {
            // Formu gizle ve başarı ekranını göster
            contactForm.style.opacity = '0';
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'flex';
                // Animasyon için sınıfı tetikle
                setTimeout(() => {
                    formSuccess.classList.add('active');
                }, 50);
            }, 300);
        }
    });

    // Başarı Ekranı Sıfırlama
    successResetBtn.addEventListener('click', () => {
        formSuccess.classList.remove('active');
        setTimeout(() => {
            formSuccess.style.display = 'none';
            contactForm.reset();
            // Validasyon sınıflarını temizle
            setValid(nameInput);
            setValid(emailInput);
            setValid(messageInput);
            
            contactForm.style.display = 'flex';
            setTimeout(() => {
                contactForm.style.opacity = '1';
            }, 50);
        }, 300);
    });
});
