import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello, You Commy Swine!</h1>
            <ul class="list-group">
                <div>
                    <Button outline color="primary">Groceries</Button>{' '}
                    <Button outline color="secondary">Clothes</Button>{' '}
                    <Button outline color="success">Electronics</Button>{' '}
                    <Button outline color="info">Jewelry</Button>{' '}
                    <Button outline color="warning">Instrumental</Button>{' '}
                    <Button outline color="danger">Home Appliances</Button>

                </div>
            </ul>
      </div>
    );
  }
}
