import React, { PureComponent } from "react";
import { Todo } from "../services/todo-storage";
import { AbilityContext } from "./Can";
import defineRulesFor from "../config/ability";
import { Form, Field } from "react-final-form";
import api from "./Axios";


type Props = {
  items: Todo[];
};
type State = {
  role: string;
};

// const hint =
//   'Admin - can do anything.\nMember can read everything and manage todos with assignee "me"';

export default class TodoFooter extends PureComponent<Props, State> {
 
  static contextType = AbilityContext;

  state = {
    role: " ",
  };

  get remaining() {
    return this.props.items.filter((item) => !item.completed).length;
  }

  // private _selectedIfRole(role: string) {
  //   return this.state.role === role ? "selected" : "";
  // }

   _setRole(role: string) {
    this.context.update(defineRulesFor(role));
    this.setState({ role });
  }

  onSubmit = async (values: string) =>  
  {
    
    async function login() {
      let res = await api.post("/users/signin", values);
      if (res.data.err) {
        console.log(res.data.err)
        return "0"
      } else {
        console.log(res.data.role)
        return(res.data.role)
      }
    }
    let role:any= await login()
    this._setRole(role)
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <b>{this.remaining}</b> left
        </span>{" "}
        <span className="">
          <b>{this.state.role}</b>
        </span>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{}}
          render={({ handleSubmit, form, submitting, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Field name="email" type="text" component="input" />
              <Field name="password" type="password" component="input" />
              <button type="submit">
                Submit
              </button>
            </form>
          )}
        />
        {/* <ul className="roles">
          <li className="help" title={hint}>Switch roles:</li>
          <li>
            <button type="button" className={this._selectedIfRole('admin')} onClick={this._setRole.bind(this, 'admin')}>
              Admin
            </button>
          </li>
          <li>
            <button type="button" className={this._selectedIfRole('member')} onClick={this._setRole.bind(this, 'member')}>
              Member
            </button>
          </li>
        </ul> */}
      </footer>
    );
  }
}
