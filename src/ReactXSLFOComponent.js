// see: https://github.com/facebook/react/blob/e3131c1d55d6695c2f0966379535f88b813f912b/src/renderers/dom/stack/client/ReactDOMComponent.js

import ReactMultiChild from 'react/lib/ReactMultiChild';

export default class ReactXSLFOComponent {
    _currentElement;
    _renderedChildren = null;

    constructor(element) {
        this._currentElement = element;
        console.log('new ReactXSLFOComponent()', arguments);
    }

    receiveComponent() {
        console.log('ReactXSLFOComponent.receiveComponent()', ...arguments);
        throw new Error('ReactXSLFOComponent.receiveComponent() not implemented');
    }

    toJSON() {
        console.log('ReactXSLFOComponent.toJSON()', ...arguments);
        throw new Error('ReactXSLFOComponent.toJSON() not implemented');
    }

    mountComponent(transaction, hostParent, hostContainerInfo, context) {
        console.log('ReactXSLFOComponent.mountComponent()', this._currentElement, ...arguments);

        // mountChildren from ReactMultiChild. looks like it might need replaced for my use
        let tagName = this._currentElement.type;
        let tagContents = this.mountChildren(this._currentElement.props.children, transaction, context);

        return `<${tagName}>${tagContents}</${tagName}>`;
    }

    getHostNode() {
        console.log('ReactXSLFOComponent.getHostNode()', ...arguments);
        throw new Error('ReactXSLFOComponent.getHostNode() not implemented');
    }
    unmountComponent() {
        console.log('ReactXSLFOComponent.unmountComponent()', ...arguments);
        throw new Error('ReactXSLFOComponent.unmountComponent() not implemented');
    }
}

// Extending the component with the MultiChild mixin. For some reason..?

Object.assign(ReactXSLFOComponent.prototype, ReactMultiChild.Mixin);
