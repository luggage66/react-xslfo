//see: https://github.com/facebook/react/blob/e3131c1d55d6695c2f0966379535f88b813f912b/src/renderers/dom/stack/server/ReactServerRenderingTransaction.js

import PooledClass from 'react/lib/PooledClass';
import Transaction from 'react/lib/Transaction';
import ReactInstrumentation from 'react/lib/ReactInstrumentation';
import ReactServerUpdateQueue from 'react/lib/ReactServerUpdateQueue';


/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS = [];

//HACK: bah
let __DEV__ = true;

if (__DEV__) {
  TRANSACTION_WRAPPERS.push({
    initialize: ReactInstrumentation.debugTool.onBeginFlush,
    close: ReactInstrumentation.debugTool.onEndFlush,
  });
}

var noopCallbackQueue = {
  enqueue: function() {},
};

//HACK Turn reacts transaction mixin into a 'class'
class ReactTransction {}
Object.assign(ReactTransction.prototype, Transaction.Mixin);

export default class ReactXSLFORenderingTransaction extends ReactTransction {
    constructor() {
        super();
        this.reinitializeTransaction();
        this.useCreateElement = false; //?
        this.updateQueue = new ReactServerUpdateQueue(this);
    }

    /**
    * @see Transaction
    * @abstract
    * @final
    * @return {array} Empty list of operation wrap procedures.
    */
    getTransactionWrappers() {
        return TRANSACTION_WRAPPERS;
    }

    /**
    * @return {object} The queue to collect `onDOMReady` callbacks with.
    */
    getReactMountReady() {
        return noopCallbackQueue;
    }

    /**
    * @return {object} The queue to collect React async events.
    */
    getUpdateQueue() {
        return this.updateQueue;
    }

    /**
    * `PooledClass` looks for this, and will invoke this before allowing this
    * instance to be reused.
    */
    destructor() {
    }

    checkpoint() {
    }

    rollback() {
    }
};

//reinitializeTransaction
//console.log(ReactXSLFORenderingTransaction.prototype);

PooledClass.addPoolingTo(ReactXSLFORenderingTransaction);
