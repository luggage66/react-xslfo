// like  ReactDOMTextComponent: https://github.com/facebook/react/blob/e3131c1d55d6695c2f0966379535f88b813f912b/src/renderers/dom/stack/client/ReactDOMTextComponent.js


export default class ReactXSLFOTextComponent {
    constructor(text) {
        this._currentElement = text;
    }

    /**
    * Creates the markup for this text node. This node is not intended to have
    * any features besides containing text content.
    *
    * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
    * @return {string} Markup for this text node.
    * @internal
    */
    mountComponent(transaction, hostParent, hostContainerInfo, context) {
        // console.log('ReactXSLFOTextComponent.mountComponent()', ...arguments);

        return this._currentElement;
    }

    /**
    * Updates this component by updating the text content.
    *
    * @param {ReactText} nextText The next text content
    * @param {ReactReconcileTransaction} transaction
    * @internal
    */
    receiveComponent(nextText, transaction) {
        throw new Error("NotImplemented: ReactXSLFOTextComponent.receiveComponent()");

        if (nextText !== this._currentElement) {
            this._currentElement = nextText;
            //TODO: handle change
        }
    }

    getHostNode() {
        throw new Error("NotImplemented: ReactXSLFOTextComponent.getHost()");
    }

    unmountComponent() {
        throw new Error("NotImplemented: ReactXSLFOTextComponent.unmountComponent()");
    }
}
