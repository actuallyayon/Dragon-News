"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      setAuthError("Google login failed");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (error) {
      setAuthError("Github login failed");
    }
  };

  const validateEmail = (emailStr) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailStr && !regex.test(emailStr)) {
      setEmailError("wrong / invalid address");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError || !email || !password) {
      setAuthError("Please fix the errors and fill all fields.");
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message || "Invalid email or password");
      } else {
        // Successful login
        router.push("/");
        // Force a reload to update the navbar session
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (err) {
      setAuthError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Login your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {authError && <div className="error-message" style={{ marginBottom: '15px' }}>{authError}</div>}

            <button type="submit" className="btn-auth">
              Login
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <hr style={{ flex: 1, borderColor: 'var(--border-color)' }} />
            <span style={{ padding: '0 10px', color: 'var(--text-secondary)' }}>OR</span>
            <hr style={{ flex: 1, borderColor: 'var(--border-color)' }} />
          </div>

          <button 
            type="button" 
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              marginBottom: '10px'
            }}
          >
            <Image src="/assets/google.svg" alt="Google" width={20} height={20} />
            Sign in with Google
          </button>

          <button 
            type="button" 
            onClick={handleGithubLogin}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              marginBottom: '20px'
            }}
          >
            <Image src="/assets/github.svg" alt="Github" width={20} height={20} />
            Sign in with Github
          </button>

          <p className="auth-redirect">
            Don't Have An Account? <Link href="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}
