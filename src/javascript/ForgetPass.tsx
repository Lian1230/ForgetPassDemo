import * as React from 'react';
import { RingLoader } from 'react-spinners';
import styled from 'styled-components';

const Section = styled.section`
  display: grid;
  justify-content: center;
`;

const reset = email => fetch('http://myneighby.herokuapp.com/api/v2/forgot-password', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    loginId: email,
  }),
})
  .then(res => res.json());

export class SignIn extends React.Component {
  public state = {
    email: '',
    warning: '',
    loading: null,
  };
  public render() {
    return (
      <Section>
        <RingLoader
          color={'#123abc'}
          loading={this.state.loading}
        />
        <h1>Forgot Password?</h1>
        <p>Please enter the email address registered on your account</p>
        {this.state.warning && <p>{this.state.warning}</p>}
        <label>
          Email Address
          <input
            value={this.state.email}
            onChange={evt => this.setState({ email: evt.target.value })}
          />
        </label>
        <button
          disabled={!this.state.email}
          type='button'
          onClick={() => !this.setState({ loading: true }) && reset(this.state.email)
            .then(res => {
              if (res.error) {
                this.setState({
                  warning: res.error ? res.error.message : res.message,
                });
                setTimeout(() => this.setState({ loading: false }), 1000);
              }
            })
          }
        > Reset Password
      </button >
      </Section >
    );
  }
}

export default SignIn;
