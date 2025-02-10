document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('img');
    const modalTitle = modal.querySelector('h3');
    const modalDesc = modal.querySelector('p');
    const modalDimensions = modal.querySelector('.dimensions');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    // Function to open modal with specific gallery item
    function openModal(item) {
        modalImg.src = item.dataset.image;
        modalTitle.textContent = item.dataset.title;
        modalDesc.textContent = item.dataset.desc;
        modalDimensions.textContent = item.dataset.dimensions;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Function to navigate to next/previous image
    function navigate(direction) {
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        openModal(galleryItems[currentIndex]);
    }

    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openModal(item);
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigate with arrow buttons
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
        }
    });
});