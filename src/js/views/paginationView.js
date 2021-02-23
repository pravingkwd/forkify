import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   *
   * @param {*} handler
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  /**
   *
   */
  _generateMarkup() {
    const currentPage = this._data.page;

    // Page1 and there are other page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numPages);

    if (this._data.page === 1 && numPages > 1) {
      return `<button data-goto="${currentPage +
        1}"   class="btn--inline pagination__btn--next">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>${currentPage + 1}</span>
        </button>
        
            `;
    }

    // last page
    if (this._data.page === numPages && numPages > 1)
      return `    <button data-goto="${currentPage -
        1}" class="btn--inline pagination__btn--prev">
                  <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                  </svg>
                  <span>${currentPage - 1}</span>
              </button>
        `;
    //this._generateMarkupBtn(currentPage, 'prev', 'left');

    // Others Page
    if (this._data.page < numPages) {
      return `<button data-goto="${currentPage -
        1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${currentPage - 1}</span>
      </button>
      <button data-goto="${currentPage +
        1}" class="btn--inline pagination__btn--next">
        <span>${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    return '';
  }
  _generateMarkupBtn(currentPage, btndirection, icon) {
    console.log(btndirection);
    return `<button class="btn--inline pagination__btn--${btndirection}">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${icon}"></use>
    </svg>
    <span>${icon === 'left' ? currentPage - 1 : currentPage + 1}</span>
  </button>`;
  }
}

export default new PaginationView();
