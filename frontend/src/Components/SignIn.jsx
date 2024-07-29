// import React, { useState } from 'react'
// import { Link,useNavigate } from "react-router-dom";
// import  Axios  from 'axios'
// import './SignIn.css';

// export default function SignIn() {

//     const nav = useNavigate()
//     const [log,setlog] =useState();
//     const [loginSuccess, setLoginSuccess] = useState(false);

//     const loginChange = (e) => {
//       setlog({ ...log, [e.target.name]: e.target.value });
//     };
  
//     const Login = async (e) => {
//       e.preventDefault();
//       Axios.post('http://localhost:9000/api/register/login', log)
//         .then((result) => {
//           if (result.data.success === true) {
//             console.log(result.data.authtoken);
//             const auth = result.data.authtoken;
//             localStorage.setItem('Token', JSON.stringify(auth));
//             localStorage.setItem('Seller', JSON.stringify(result.data.seller));
//             // localStorage.setItem("Seller", sellerId);
//             setLoginSuccess(true);
//             setTimeout(() => {
//               nav('/');
//             }, 1000); 
//           } else {
//             console.log(result.data);
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     };

   
      

//   return (
//     <>
//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      // <img
      //   className="mx-auto h-10 w-auto"
      //   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      //   alt="Your Company"
      // />
      // <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      //   Sign in to your account
      // </h2>
//     </div>

//     <div className={`success-message ${loginSuccess ? 'show' : ''}`}>
//         <p>Login successful! Redirecting...</p>
//       </div>

//     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//       <form className="space-y-6" action="#" method="POST">
        // <div>
        //   <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        //     Email address
        //   </label>
        //   <div className="mt-2">
        //     <input
        //       id="email"
        //       name="email"
        //       type="email"
        //       autoComplete="email"
        //       onChange={loginChange}
        //       required
        //       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //     />
        //   </div>
        // </div>

        // <div>
        //   <div className="flex items-center justify-between">
        //     <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
        //       Password
        //     </label>
        //     <div className="text-sm">
        //       <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
        //         Forgot password?
        //       </a>
        //     </div>
        //   </div>
        //   <div className="mt-2">
        //     <input
        //       id="password"
        //       name="password"
        //       type="password"
        //       onChange={loginChange}
        //       autoComplete="current-password"
        //       required
        //       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //     />
        //   </div>
        // </div>

//         <div>
//           <button
//             type="submit"
//             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             onClick={Login}
//          >

//             Sign in
//           </button>
//         </div>
//       </form>

//       <p className="mt-10 text-center text-sm text-gray-500">
//         Not a member?{' '}

//         <Link to='/reg' >
//         <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
//          Register
//         </a>
//     </Link>
       
//       </p>
//     </div>
//   </div>
// </>
// )
// }

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './SignIn.css';

export default function SignIn() {
  const nav = useNavigate();
  const [log, setLog] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const loginChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
    clearErrors();
  };

  const validateForm = () => {
    const errors = {};

    if (!log.email) {
      errors.email = 'Email is required';
    }

    if (!log.password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
    setAuthError('');
  };

  const Login = async (e) => {
    e.preventDefault();
    clearErrors(); // Clear previous errors

    if (!validateForm()) {
      return;
    }

    Axios.post('http://localhost:9000/api/register/login', log)
      .then((result) => {
        if (result.data.success === true) {
          const auth = result.data.authtoken;
          localStorage.setItem('Token', JSON.stringify(auth));
          localStorage.setItem('Seller', JSON.stringify(result.data.seller));
          setLoginSuccess(true);
          setTimeout(() => {
            nav('/');
          }, 1000);
        } else {
          setAuthError(result.data.message || 'Login failed. Check your credentials.');
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthError('An error occurred while processing your request.');
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className={`success-message ${loginSuccess ? 'show' : ''}`}>
          <p>Login successful! Redirecting...</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {authError && <p className="text-sm text-red-500">{authError}</p>}

          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={loginChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
             
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={loginChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={Login}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/reg">
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register
              </a>
            </Link>
           
          </p>
          <p className="mt-1 text-center text-sm text-gray-500">
           {' '}
            <Link to="/adminlogin">
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Admin
              </a>
            </Link>
           
          </p>
        </div>
      </div>
    </>
  );
}
