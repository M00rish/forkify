import icons from 'url:../../img/icons.svg';
import view from './View';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const Btn = e.target.closest('.btn--inline');
      if (!Btn) return;

      const GotoPage = +Btn.dataset.goto;
      handler(GotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
          <button data-goto="${curPage + 1}" 
          class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>`;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${curPage - 1}" 
        class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${curPage - 1}</span>
        </button>
         `;
    }
    //Other page
    if (curPage < numPages) {
      return `
      <button data-goto="${curPage - 1}" 
      class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${curPage - 1}</span>
        </button>
          <button data-goto="${curPage + 1}" 
          class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>`;
    }

    // page 1, and are No other pages
    return ``;
  }
}

export default new PaginationView();
