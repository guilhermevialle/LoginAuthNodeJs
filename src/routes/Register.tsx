import '../App.css';
import axios from 'axios';
import { z } from 'zod';
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formStyle = {
  padding: '2em',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '10px',
};

const UserDataSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

type UserDataType = z.infer<typeof UserDataSchema>;

interface formType {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
}

function App() {
  const notify = (text: string) =>
    toast(text, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'dark',
    });

  const [formData, setFormData] = useState<formType>({
    email: '',
    password: '',
    passwordCheck: '',
    username: '',
  });

  function requestValidatedUserData(data: UserDataType) {
    console.log({ data });
    axios({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: data,
    })
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
      });
  }

  function submitDataHandler(event: any) {
    event.preventDefault();
    const nodeList = event.currentTarget.querySelectorAll('input');

    nodeList.forEach((element: HTMLInputElement) => {
      const name = element.name;
      setFormData((prev: any) => {
        prev[name] = element.value;
        return prev;
      });
    });

    if (
      formData.password === formData.passwordCheck &&
      formData.username.length > 2 &&
      formData.email.length > 3 &&
      formData.password.length > 5
    ) {
      const validadeUserData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      try {
        const validatedUser = UserDataSchema.parse(validadeUserData);
        requestValidatedUserData(validatedUser);
      } catch (error) {
        console.error('User object is invalid:', error);
      }
    } else {
      notify('Please fill all fields!');
    }
  }

  return (
    <div className='App'>
      <h1>Register</h1>
      <div className='card'>
        <form
          style={formStyle}
          onSubmit={(event: any) => submitDataHandler(event)}
        >
          <input type='text' name='username' placeholder='username' />
          <input type='email' name='email' placeholder='email' />
          <input type='password' name='password' placeholder='password' />
          <input
            type='password'
            name='passwordCheck'
            placeholder='Confirm password'
          />
          <button>Register</button>
          <Link to={'/'}>
            <button>Go to Start</button>
          </Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
