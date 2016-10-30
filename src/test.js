import React from 'react';
import ReactXSLFO from './index';

class CustomComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        console.log('new CustomComponent()');
    }

    render() {
        return <block>{this.props.children}</block>;
    }
}

const tree = (<CustomComponent name="outer HLC">
    <CustomComponent name="inner HLC">
        <table></table>
    </CustomComponent>
</CustomComponent>);

// function CustomComponent(props) {
//     return <block>{props.children}</block>;
// }

ReactXSLFO.render(tree, process.stdout);
