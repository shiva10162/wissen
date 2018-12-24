console.log("-index.js-");

import 'bootstrap/scss/bootstrap.scss';



// template(s)

const template = document.createElement('template');
template.innerHTML = `
    <style>
        .alert{
            padding:20px;
            margin:5px;
        }
        .alert-info{
            background-color:#DEF;
        }
    </style>
    <div class="alert alert-info">
    <button>+</button>
    <p>0</p>
    <button>-</button>
    </div>
`

// custom element(s)

export class XCounter extends HTMLElement {
    static get observedAttributes() {
        return ["value"]
    }
    constructor() {
        super()

        this.root = this.attachShadow({ mode: 'open' })

        this.root.appendChild(template.content.cloneNode(true))

        this.valueElement = this.root.querySelector('p');
        this.incrementBtn = this.root.querySelectorAll('button')[0];
        this.decrementBtn = this.root.querySelectorAll('button')[1];

        this.incrementBtn.addEventListener('click', (e) => this.value++)
        this.decrementBtn.addEventListener('click', (e) => this.value--)

    }
    set value(value) {
        this._value = value
        this.valueElement.innerText = this._value;
        this.dispatchEvent(new CustomEvent('valueChange', { detail: this._value }))
    }
    get value() {
        return this._value;
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "value") {
            this._value = parseInt(newValue, 10)
        }
    }
}

customElements.define('x-counter', XCounter) //


const counter = document.querySelector('x-counter')
// counter.value = 10;
counter.addEventListener('valueChange', e => console.log(e.detail))