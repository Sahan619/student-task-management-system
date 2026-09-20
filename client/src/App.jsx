import { useState } from "react";

function App() {
    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
    try {
      let url;
      let body;

      if(isLogin){
        url ="http://localhost:5000/api/auth/login";
        body = {email , password};



      }
      else{
        url = "http://localhost:5000/api/auth/register";
        body={name ,email ,password};
      }
    

    const response = await fetch(url ,{ 
      method :"POST" ,headers:{"Content-Type": "application/json",},
      body : JSON.stringify(body),}); 
      
    const data = await response.json();
    
    console.log(data);
    }
    catch (error){
      console.error("Error:", error);
    }};

    return (
        <div>
            <h1>Student Task Management System</h1>

            <h2>{isLogin ? "Login" : "Register"}</h2>

            <form onSubmit={handleSubmit}>

                {!isLogin && (
                    <div>
                        <label>Name</label>
                        <br />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                )}

                <br />

                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>

            <br />

            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
            </button>
        </div>
    );
}

export default App;