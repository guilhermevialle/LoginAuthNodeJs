import '../App.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const formStyle = {
  padding: '2em',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '10px',
};

interface formType {
  emailOrUsername: string;
  password: string;
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailOrUsernameSchema = z
  .string()
  .regex(emailRegex, { message: 'Deve ser um email válido' })
  .or(
    z.string().max(50).min(3, { message: 'Deve ter pelo menos 3 caracteres' })
  );

const passwordSchema = z.string().min(6);

const userSchema = z.object({
  emailOrUsername: emailOrUsernameSchema,
  password: passwordSchema,
});

function App() {
  const [formData, setFormData] = useState<formType>({
    emailOrUsername: '',
    password: '',
  });

  const [authToken, setAuthToken] = useState<string | undefined>('');

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

    if (formData) {
      try {
        console.log({ formData });
        userSchema.parse(formData);

        axios({
          method: 'post',
          url: 'http://localhost:3000/login',
          data: formData,
        })
          .then((res) => {
            if (res.status == 201) {
              const token = res.data.token;
              localStorage.setItem('authToken', token);
              localStorage.setItem('isAuth', res.data.auth);
              console.log(token);
              setAuthToken(token);

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

              window.location.reload(false);
            }
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
      } catch (error) {
        toast.error('E-mail ou nome de usuario invalido.', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
      }
    }
  }

  return (
    <div className='App'>
      <h1>Login</h1>
      <div className='card'>
        <form style={formStyle} onSubmit={(event) => submitDataHandler(event)}>
          <input
            type='text'
            name='emailOrUsername'
            placeholder='Email or username'
          />
          <input type='password' name='password' placeholder='password' />
          <button>Login now</button>
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
