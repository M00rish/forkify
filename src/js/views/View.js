import icons from 'url:../../img/icons.svg';

export default class view {
  _data;

  // Add the Markup
  clear() {
    this._parentElement.innerHTML = '';
  }

  // Render Recipe
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.RenderError();

    this._data = data;
    const markUp = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  // Spinner
  RenderSpinner = function () {
    const markUp = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
      </div>`;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  };

  RenderError(message = this._errorMsg) {
    const markUp = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
        `;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  RenderMessage(message = this._SuccesMsg) {
    const markUp = `
         <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
