var KEYS = {
  ESC: 27
}

var i, l,
    savedName = localStorage.getItem("name"),
    savedEmail = localStorage.getItem("email"),
    gotLostLink = document.querySelector('.link-lost'),
    gotLostPopup = document.querySelector('.lost-popup'),
    mapLink = document.querySelector('.link-map'),
    mapPopup = document.querySelector('.map-popup'),
    addToCartLinks = document.querySelectorAll('.good-action-buy'),
    addToCartPopup = document.querySelector('.cart-popup'),
    closePopupBtns = document.querySelectorAll('.popup-close'),
    allPopups = document.querySelectorAll('.popup'),
    nameInput = document.querySelector('#form-name'),
    emailInput = document.querySelector('#form-email'),
    textArea = document.querySelector('#form-text'),
    form = document.querySelector('.lost-popup form');

!!gotLostLink && gotLostLink.addEventListener('click', onGotLostLinkClick, false);
!!mapLink && mapLink.addEventListener('click', onMapLinkClick, false);

!!form && form.addEventListener("submit", function(event) {
    if (!(nameInput.value && emailInput.value)) {
      event.preventDefault();
      gotLostPopup.classList.remove("popup-error");
      gotLostPopup.offsetWidth = gotLostPopup.offsetWidth;
      gotLostPopup.classList.add("popup-error");
    } else {
      localStorage.setItem("name", nameInput.value);
      localStorage.setItem("email", emailInput.value);
    }
  });

initServicesTabs();
initGallery();

function initServicesTabs() {
  var tabs = document.querySelectorAll('.services-list-item'),
      services = document.querySelector('.services-content-right').children;

  for (i = 0, l = tabs.length; i < l; i++) {
    tabs[i].addEventListener('click', onServicesTabClick, false);
  }

  function onServicesTabClick(evt) {
    evt.preventDefault();

    var target = evt.currentTarget,
        selector = evt.target.getAttribute('href');

    for (i = 0, l = services.length; i < l; i++) {
      services[i].classList.remove('active');
    }

    for (i = 0, l = tabs.length; i < l; i++) {
      tabs[i].classList.remove('active');
    }

    target.classList.add('active');
    document.querySelector(selector).classList.add('active');
  }

}

function initGallery() {
    if (document.querySelector('.gallery') === null) {
      return;
    }

    var
      galleryLeftBtn = document.querySelector('.gallery-btn-left'),
      galleryRightBtn = document.querySelector('.gallery-btn-right'),
      gallarySlidedBlock = document.querySelector('.slides-block');

    galleryLeftBtn.addEventListener('click', onGalleryLeftBtnClick, false);
    galleryRightBtn.addEventListener('click', onGalleryRightBtnClick, false);

    function onGalleryLeftBtnClick(evt) {
      goToNext('prev');
    }

    function onGalleryRightBtnClick(evt) {
      goToNext('next');
    }

    function goToNext(direction) {
      var current = document.querySelector('.slides-block .active'),
        next = direction === 'prev'
          ? current.previousElementSibling
          : current.nextElementSibling

      next = !!next
          ? next
          : direction === 'prev'
            ? gallarySlidedBlock.lastElementChild
            : gallarySlidedBlock.firstElementChild;

      current.classList.remove('active');
      next.classList.add('active');
    }
}

for (i = 0, l = closePopupBtns.length; i < l; i++) {
  closePopupBtns[i].addEventListener('click', onClosePopupBtnClick, false);
}

for (i = 0, l = addToCartLinks.length; i < l; i++) {
  addToCartLinks[i].addEventListener('click', onAddToCartLinkClick, false);
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode === KEYS.ESC) {
    for (i = 0, l = allPopups.length; i < l; i++) {
      doClosePopup(allPopups[i]);
    }
  }
});

function onAddToCartLinkClick(evt) {
  evt.preventDefault();
  addToCartPopup.classList.add('popup-show');
}

function onMapLinkClick(evt) {
  evt.preventDefault();
  mapPopup.classList.add('popup-show');
}

function onGotLostLinkClick(evt) {
  evt.preventDefault();
  gotLostPopup.classList.add('popup-show');
  if (!!savedName && !!savedEmail) {
    nameInput.value = savedName;
    emailInput.value = savedEmail;
    textArea.focus();
  } else {
    nameInput.focus();
  }
}

function onClosePopupBtnClick(evt) {
  var target = evt.target;

  doClosePopup( getParentByClassName(target, 'popup'));
}

function doClosePopup(popup) {
    !!popup &&
    popup.classList.contains("popup-show") &&
    popup.classList.remove('popup-show');
}

function getParentByClassName(node, className) {
  while (!(
    node === document ||
    node.classList.contains(className)
  )) {
    node = node.parentNode;
  }

  return node === document
    ? null
    : node;
}
