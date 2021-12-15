import icons from 'url:../../img/icons.svg';

export default class view {
  _data;

  // Add the Markup
  _Fill(markUp) {
    this._parentElement.innerHTML = '';
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

    this._Fill(markUp);
  };

  // Render Recipe
  render(data) {
    this._data = data;
    const markUp = this._generateMarkup();
    this._Fill(markUp);
  }

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

    this._Fill(markUp);
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

    this._Fill(markUp);
  }
}
