var i, l,
    escKey = 27,
    gotLostLink = document.querySelector('.link-lost'),
    gotLostPopup = document.querySelector('.lost-popup'),
    mapLink = document.querySelector('.link-map'),
    mapPopup = document.querySelector('.map-popup'),
    addToCartLinks = document.querySelectorAll('.good-action-buy'),
    addToCartPopup = document.querySelector('.cart-popup'),
    closePopupBtns = document.querySelectorAll('.popup-close'),
    allPopups = document.querySelectorAll('.popup');

!!gotLostLink && gotLostLink.addEventListener('click', onGotLostLinkClick, false);
!!mapLink && mapLink.addEventListener('click', onMapLinkClick, false);

for (i = 0, l = closePopupBtns.length; i < l; i++) {
  closePopupBtns[i].addEventListener('click', onClosePopupBtnClick, false);
}

for (i = 0, l = addToCartLinks.length; i < l; i++) {
  addToCartLinks[i].addEventListener('click', onAddToCartLinkClick, false);
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode === escKey) {
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
}

function onClosePopupBtnClick(evt) {
  var target = evt.target,
      popup = getParentByClassName(target, 'popup');

      doClosePopup(popup);
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
