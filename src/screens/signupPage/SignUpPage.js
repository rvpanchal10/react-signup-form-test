import React from 'react';
import { withRouter} from "react-router-dom";

import SignUpForm from './components/SignUpForm';

function SignUpPage(props) {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}

export default withRouter(SignUpPage);
