//
// import ReactElement from 'react/lib/ReactElement';
// import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
// import instantiateReactComponent from 'react/lib/instantiateReactComponent';
import * as ReactXSLFOInjection from './ReactXSLFOInjection';
import * as ReactXSLFOStackInjection from './ReactXSLFOStackInjection';
import ReactXSLFORenderingTransaction from './ReactXSLFORenderingTransaction'

import ReactReconciler from 'react/lib/ReactReconciler';
import instantiateReactComponent from 'react/lib/instantiateReactComponent';

ReactXSLFOInjection.inject();
ReactXSLFOStackInjection.inject();

// function renderToStream(element, stream) {
//     // Creating a root id & creating the screen
//     const id = ReactInstanceHandles.createReactRootID();
//
//     console.log(id);
//
//     // Mounting the app
//     const component = instantiateReactComponent(element);
//
//     console.log(component);
// }

function render(element) {
    let componentInstance = instantiateReactComponent(element, true);

    let transaction = ReactXSLFORenderingTransaction.getPooled();

    var markup = ReactReconciler.mountComponent(
        componentInstance,
        transaction,
        null,
        null, //ReactDOMContainerInfo(),
        null, //emptyObject,
        0 /* parentDebugID */
      );

    // console.log('componentInstance', componentInstance);
    console.log('markup', markup);
}


export default {
    render
};
