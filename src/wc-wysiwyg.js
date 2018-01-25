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
        this._contents = this.shadowRoot.querySelector('iframe');
        this._contents.designMode = 'on';
        this.document.body.contentEditable = true;

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
            }
            b.onclick = () => this.trigger(cmd);
            this._buttons.appendChild(b);
        });


        this.document.addEventListener('keydown', this._handleKey.bind(this));
        this.document.addEventListener('keyup', this._update.bind(this));
        this.document.addEventListener('click', this._update.bind(this));
    }

    get document() {
        return this._contents.contentDocument;
    }

    get value() {
        return this._contents.contentDocument.body.innerHTML;
    }
    set value(v) {
        this._contents.contentDocument.body.innerHTML = v;
    }


    trigger(cmd) {
        this.document.execCommand(cmd);
    }


    _handleKey(e) {
        switch (e.code) {
            // Indent / outdent
            case 'Tab':
                this.trigger(e.shiftKey ? 'outdent' : 'indent');
                e.preventDefault();
                break;

            // Insert image
            case 'KeyI':
                if (e.metaKey) {
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

    // _update(e) {
    //     console.log(this.document.getSelection().getRangeAt(0).startContainer.parentElement);
    // }
}

window.customElements.define('wc-wysiwyg', WYSIWYG);
