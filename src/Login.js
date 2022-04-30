import React from 'react';

const Login = (props) => {
    const {email,setEmail,password,setPassword,handleLogin,error}=props;
    return(
        <section className='login'>
            <div className="loginContainer">
                <h1 style = {{color : "white"}}>Doctor's Login</h1>
                <label>Username</label>
                <input type='text'autoFocus required value={email} onChange={e =>setEmail(e.target.value)} />
                <label>Password</label>
                <input type = 'password' required value={password} onChange={e =>setPassword(e.target.value)} />
                <p className="errorMsg">{error}</p> 
                <div className="btnContainer">
                    <button onClick={handleLogin}>
                        Sign In
                    </button>
                    
                </div>
           </div>
        </section>
    )
}

export default Login;