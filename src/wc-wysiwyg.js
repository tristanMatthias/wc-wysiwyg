import HTML from './wysiwyg.html';
import CSS from './wysiwyg.scss';
import buttons from './buttons.json';
import icons from 'origami-icons';


export default class WYSIWYG extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        // Add the default HTML tempate, icons and CSS
        this.shadowRoot.innerHTML = HTML;
        this.shadowRoot.innerHTML += icons;
        this.shadowRoot.innerHTML += `<style>${CSS}</style>`;

        // Set the design mode
        this._contents = this.shadowRoot.querySelector('#editor');
        this._contents.designMode = 'on';
        this._contents.contentEditable = true;

        // Add the buttons
        this._buttons = this.shadowRoot.querySelector('.buttons');
        buttons.forEach(({cmd, icon}) => {
            const b = document.createElement('button');
            b.id = `control-${cmd}`;

            // Add the icon
            if (icon) {
                const i = document.createElement('svg');
                const clone = this.shadowRoot.querySelector(`#zen-icon-${icon}`);
                i.setAttribute('viewBox', '0 0 40 40');
                Array.from(clone.children).forEach(c => i.appendChild(c));
                b.innerHTML = i.outerHTML;
                b.onclick = () => this.trigger(cmd);
                this._buttons.appendChild(b);
            }
        });


        this._contents.addEventListener('keydown', this._handleKey.bind(this));
        this._contents.addEventListener('focus', () => this._showButtons(true));
        this._contents.addEventListener('blur', () => this._showButtons(false));
        // this._contents.addEventListener('keyup', this._update.bind(this));
        // this._contents.addEventListener('click', this._update.bind(this));
    }

    get value() {
        return this._contents.innerHTML;
    }
    set value(v) {
        this._contents.innerHTML = v;
    }


    trigger(cmd) {
        document.execCommand(cmd);
    }


    _handleKey(e) {
        switch (e.code) {
            // Indent / outdent
            case 'Tab':
                this.trigger(e.shiftKey ? 'outdent' : 'indent');
                e.preventDefault();
                break;

            // Underline
            case 'KeyU':
                if (e.metaKey) {
                    this.trigger('underline');
                    e.preventDefault();
                }
                break;

            // Insert image
            case 'KeyI':
                if (e.metaKey && e.shiftKey) {
                    this.trigger('insertImage');
                    e.preventDefault();
                }
                break;

            // Align center
            case 'KeyC':
                if (e.metaKey && e.shiftKey) {
                    this.trigger('justifyCenter');
                    e.preventDefault();
                }
                break;

            // Align left
            case 'KeyL':
                if (e.metaKey && e.shiftKey) {
                    this.trigger('justifyLeft');
                    e.preventDefault();
                }
                break;

            // Align right
            case 'KeyR':
                if (e.metaKey && e.shiftKey) {
                    this.trigger('justifyRight');
                    e.preventDefault();
                }
                break;
        }
    }


    _showButtons(show) {
        this._buttons.classList.toggle('show', Boolean(show));
    }

    // _update(e) {
    //     console.log(this._contents.getSelection().getRangeAt(0).startContainer.parentElement);
    // }
}

window.customElements.define('wc-wysiwyg', WYSIWYG);
