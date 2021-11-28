/*!
 * stMODAL <https://github.com/passariello/stMODAL>
 *
 * Copyright (c) 2021, Dario Passariello.
 * Licensed under the Apache-2.0 License.
 */

/***********************************************************************/

window.alert = CustomAlert;
let template;
let showing = false;

function CustomAlert ( text , config ) {
  if ( !arguments.length ) return;

  config = getFinalConfig ( text , config );
  let dialog = new Dialog (config);
  dialog.show();
}

function Dialog ( settings ) {

  let _this = this;
  let modal = getTemplate();

  let content = modal.querySelector('.modal_content');
  let title = modal.querySelector('.modal_title');
  let close = modal.querySelector('.modal_btn-close');
  let yes = modal.querySelector('.modal_btn-yes');
  let body = modal.querySelector('.modal_body');
  let overlay = modal.querySelector('.overlay');

  content.style.width = settings.width + "px";
  content.style.height = settings.height + "px";
  content.style.marginLeft = -settings.width / 2 + "px";
  content.style.marginTop = -settings.height / 2 + "px";

  title.innerHTML = settings.title;
  body.innerHTML = settings.body;
  close.innerHTML = settings.btn_close;
  yes.innerHTML = settings.btn_yes;

  close.addEventListener( 'click', cancel );
  yes.addEventListener( 'click', confirm );

  if ("activeElement" in document) document.activeElement.blur();
    document.addEventListener ( "keydown", pressOps );

    if ( settings.has_overlay === true ) {
      overlay = document.createElement('DIV');
      modal.appendChild( overlay );
      overlay.className = 'overlay';
      overlay.addEventListener( 'click', cancel );
    }

  // CLOSE WITH ESC
  function pressOps ( e ) {
    yes.focus();
    if( e.key === 'Enter' ) confirm( e );
    if( e.key === 'Escape' ) cancel( e );
  }

  function cancel ( e ) {
    e.preventDefault();
    document.removeEventListener( "keydown" , pressOps );
    _this.hide();
    _this.setContext ( undefined );
  }

  function confirm ( e ) {
    e.preventDefault();
    document.removeEventListener( "keydown" , pressOps );
    _this.hide();
    _this.setContext ( undefined );
  }

  _this.modal = modal;
}

Dialog.prototype.setContext = function (context) {
  this.context = context;
};

Dialog.prototype.show = function () {
  if (showing) return;
  showing = true;
  document.querySelector('body').appendChild( this.modal );
};

Dialog.prototype.hide = function () {
  showing = false;
  this.modal.remove();
};

function getFinalConfig( text, config ) {

  let _defaults = {
    width: 450,
    height: 250,
    title: 'Alert',
    body: text,
    btn_yes: 'Ok',
    btn_close: '',
    has_overlay: true
  };

  if (typeof config === 'string') {
    _defaults.targets = config;
  } else if (typeof config === 'object') {
    Object.assign(_defaults, config);
  }

  if (typeof _defaults.targets === 'string') {
    _defaults.targets = document.querySelectorAll(_defaults.targets);
  } else if (typeof _defaults.targets === 'object' && ! _defaults.targets.length) {
    _defaults.targets = [_defaults.targets];
  }

  return _defaults;
}

function setupEvents (el, dialog) {
  el.addEventListener('click', function ( e ) {
    e.preventDefault();
    dialog.setContext(el);
    dialog.show();
  }, false);
}

function getTemplate() {
  if ( !template ) {
      template = document.createElement('DIV');
      template.className = 'modal';
      template.innerHTML = '';
      template.innerHTML = `
                          <div class="modal_content">
                            <div class="modal_header">
                              <img src="/assets/icons/exclamation-circle.svg"/>
                              <div class="modal_title"></div>
                              <button class="modal_btn-close"></button>
                            </div>
                            <div class="modal_body"></div>
                            <div class="modal_footer">
                              <button class="modal_btn-yes" autofocus></button>
                            </div>
                          </div>`;
  }

  return template.cloneNode(true);
}

function $warn() {
  if ( typeof window.console === 'object' && typeof console.warn === 'function' ) {
    console.warn.apply (console, arguments);
  }
}
