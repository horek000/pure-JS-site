import css from './subPage.css';
const wrapper = document.querySelector('.wrapper');
const btn3 = document.querySelector('[data-js="3"]');
const btn4 = document.querySelector('[data-js="4"]');
const btn5 = document.querySelector('[data-js="5"]');
let root = document.documentElement;
const remove = (e) => {
  const keyValue = e.target.getAttribute('data-key');
  console.log(keyValue);
  localStorage.removeItem(keyValue);
  e.target.parentNode.remove();
};

const render = () => {
  if (localStorage.length) {
    for (let x = 0; x < localStorage.length; x++) {
      const hero = JSON.parse(localStorage.getItem(localStorage.key(x)));
      const newDiv = document.createElement('div');
      const newImg = document.createElement('img');
      const newP = document.createElement('p');
      const newBtn = document.createElement('button');
      newBtn.setAttribute('data-key', localStorage.key(x));
      newDiv.setAttribute('class', 'card');
      wrapper.appendChild(newDiv);
      newDiv.appendChild(newImg);
      newDiv.appendChild(newP);
      newDiv.appendChild(newBtn);
      newP.textContent = hero.name;
      newImg.src = hero.url;
      newImg.setAttribute('alt', 'No image in database');
      newBtn.textContent = 'remove';
      newBtn.addEventListener('click', remove);
    }
  }
};

render();
btn3.addEventListener('click', () =>
  root.style.setProperty('--flexBasis', '26%')
);
btn4.addEventListener('click', () =>
  root.style.setProperty('--flexBasis', '21%')
);
btn5.addEventListener('click', () =>
  root.style.setProperty('--flexBasis', '16%')
);
