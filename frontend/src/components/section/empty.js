import React from 'react';

export default class Empty extends React.Component
{
    render()
    {
        return <div>{ this.props.children }</div>;
    }
}