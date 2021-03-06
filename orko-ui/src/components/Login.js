/*
 * Orko
 * Copyright © 2018-2019 Graham Crockford
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React, { Component } from "react"
import { Modal, Icon, Form, Button, Message } from "semantic-ui-react"
import FixedModal from "./primitives/FixedModal"
import authService from "../services/auth"
import { setXsrfToken } from "../services/fetchUtil"

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      secondFactor: ""
    }
  }

  onChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  onChangeSecondFactor = event => {
    this.setState({ secondFactor: event.target.value })
  }

  login = () => {
    authService
      .simpleLogin(this.state)
      .then(({ expiry, xsrf }) => {
        try {
          setXsrfToken(xsrf)
        } catch (error) {
          throw new Error("Malformed access token")
        }
        this.props.onSuccess({
          expiry
        })
      })
      .catch(error => this.props.onError(error.message))
  }

  render() {
    return (
      <FixedModal size="tiny" data-orko="loginModal">
        <Modal.Header>
          <Icon name="lock" />
          Login
        </Modal.Header>
        <Modal.Content>
          <Form error={this.props.error !== null} id="loginForm">
            <Message error header="Error" content={this.props.error} />
            <Form.Field>
              <label>Username</label>
              <div className="ui input">
                <input
                  data-orko="username"
                  type="text"
                  placeholder="Enter name"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  autoComplete="username"
                />
              </div>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <div className="ui input">
                <input
                  data-orko="password"
                  type="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  autoComplete="current-password"
                />
              </div>
            </Form.Field>
            <Form.Field>
              <label>Second factor</label>
              <div className="ui input">
                <input
                  data-orko="secondFactor"
                  type="text"
                  placeholder="Enter second factor"
                  value={this.state.secondFactor}
                  onChange={this.onChangeSecondFactor}
                />
              </div>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            data-orko="loginSubmit"
            type="submit"
            form="loginForm"
            onClick={this.login}
          >
            Login
          </Button>
        </Modal.Actions>
      </FixedModal>
    )
  }
}
