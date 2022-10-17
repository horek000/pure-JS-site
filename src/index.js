import css from './index.css';

class App {
  constructor() {
    this.body = document.querySelector('.tbody');
    this.downloadedData = [];
    this.selectedCharacted = '';
    this.navButtons = document.querySelectorAll('[data-js="navButton"]');
    this.houseValue = '';
    this.sortButtons = document.querySelectorAll('[data-js="sortButton"]');
    this.backdrop = document.querySelector('.backdrop');
    this.modalBtnAdd = document.querySelector('[data-js=modalAdd]');
    this.modalBtnClose = document.querySelector('[data-js=modalClose]');
  }
  init() {
    this.addListeners();
  }
  addListeners() {
    this.navButtons.forEach((el) =>
      el.addEventListener('click', this.fetchData.bind(this))
    );
    this.sortButtons.forEach((el) =>
      el.addEventListener('click', this.sortTable.bind(this))
    );
    this.body.addEventListener('click', this.modalRender.bind(this));
    this.backdrop.addEventListener('click', this.hideModal.bind(this));
    this.modalBtnAdd.addEventListener('click', this.adding.bind(this));
    this.modalBtnClose.addEventListener(
      'click',
      () => (this.backdrop.style.display = 'none')
    );
  }

  async fetchData(event) {
    try {
      const res = await fetch('https://hp-api.herokuapp.com/api/characters');
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      this.downloadedData = Object.entries(data).map(([key, value]) => ({
        id: key,
        character: value,
      }));
      this.houseValue = event.target.getAttribute('data-value');
      this.tableRender(this.downloadedData);
    } catch (e) {
      console.error(e);
    }
  }

  tableRender(data) {
    this.body.innerHTML = '';
    data.forEach((item) => {
      const {
        name,
        house,
        dateOfBirth,
        wizard,
        ancestry,
        hogwartsStudent,
        hogwartsStaff,
      } = item.character;
      const newTr = document.createElement(`tr`);
      newTr.setAttribute('data-key', item.id);
      newTr.setAttribute('class', 'democlass');
      this.body.appendChild(newTr);
      const htmlFrame = `<td>${name}</td> <td>${house}</td> <td>${dateOfBirth}</td>  <td>${wizard}</td>  <td>${ancestry}</td>`;
      if (this.houseValue === house) {
        newTr.innerHTML =
          htmlFrame +
          `<td>${
            hogwartsStudent ? 'Student' : hogwartsStaff ? 'Stuff' : 'Other'
          }</td>`;
      } else if (this.houseValue === 'all' && hogwartsStudent) {
        newTr.innerHTML = htmlFrame + `<td>Student</td>`;
      }
    });
  }

  sortTable(e) {
    const order = e.currentTarget.getAttribute('data-order');
    const dataKey = e.currentTarget.getAttribute('data-key');
    const sortArray = [...this.downloadedData];
    const compare_age = (a, b) => {
      if (
        a.character.dateOfBirth.split('-').reverse().join('') <
        b.character.dateOfBirth.split('-').reverse().join('')
      ) {
        return -1;
      }
      if (
        a.character.dateOfBirth.split('-').reverse().join('') <
        b.character.dateOfBirth.split('-').reverse().join('')
      ) {
        return 1;
      }
      return 0;
    };
    const compare_other = (a, b) => {
      if (
        a.character[dataKey].toLowerCase() < b.character[dataKey].toLowerCase()
      ) {
        return -1;
      }
      if (
        a.character[dataKey].toLowerCase() < b.character[dataKey].toLowerCase()
      ) {
        return 1;
      }
      return 0;
    };

    if (dataKey === 'age') {
      sortArray.sort(compare_age);
    } else {
      sortArray.sort(compare_other);
    }
    if (order === 'desc') {
      sortArray.reverse();
    }

    e.currentTarget.setAttribute(
      'data-order',
      order === 'asc' ? 'desc' : 'asc'
    );
    this.tableRender(sortArray);
  }

  modalRender(e) {
    this.backdrop.style.display = 'block';
    if (e.target !== e.currentTarget) {
      this.selectedCharacted = e.target.getAttribute('data-key');
      const {
        name,
        house,
        dateOfBirth,
        wizard,
        ancestry,
        hogwartsStudent,
        image,
        hogwartsStaff,
      } = this.downloadedData[this.selectedCharacted].character;
      const nameP = document.querySelector('[data-js="name"]');
      nameP.textContent = name;
      const houseP = document.querySelector('[data-js="house"]');
      houseP.textContent = house;
      const dateOfBirthP = document.querySelector('[data-js="dateOfBirth"]');
      dateOfBirthP.textContent = dateOfBirth;
      const wizardP = document.querySelector('[data-js="wizard"]');
      wizardP.textContent = wizard;
      const ancestryP = document.querySelector('[data-js="ancestry"]');
      ancestryP.textContent = ancestry;
      const hogwartsStudentP = document.querySelector(
        '[data-js="hogwartsStudent"]'
      );
      hogwartsStudentP.textContent = hogwartsStudent
        ? 'student'
        : hogwartsStaff
        ? 'Staff'
        : 'Other';
      const imageP = document.querySelector('[data-js="img"]');
      imageP.src = image;

      if (localStorage.length) {
        for (let x = 0; x < localStorage.length; x++) {
          if (localStorage.key(x) == this.selectedCharacted) {
            this.modalBtnAdd.textContent = 'remove';
            break;
          } else {
            this.modalBtnAdd.textContent = 'add';
          }
        }
      }
    }
  }
  adding() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == this.selectedCharacted) {
        localStorage.removeItem(this.selectedCharacted);
        this.modalBtnAdd.textContent = 'add';
        return;
      }
    }
    this.modalBtnAdd.textContent = 'remove';
    localStorage.setItem(
      this.selectedCharacted,
      JSON.stringify({
        name: this.downloadedData[this.selectedCharacted].character.name,
        url: this.downloadedData[this.selectedCharacted].character.image,
      })
    );
  }
  hideModal(e) {
    if (e.target === this.backdrop) {
      this.backdrop.style.display = 'none';
    }
  }
}

new App().init();
