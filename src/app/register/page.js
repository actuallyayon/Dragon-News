"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";

export default function Register() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      setAuthError("Google sign up failed");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (error) {
      setAuthError("Github sign up failed");
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
    setAuthError("");
    setSuccessMessage("");

    if (emailError || !email || !password || !name) {
      setAuthError("Please fill all required fields correctly.");
      return;
    }

    if (!acceptedTerms) {
      setAuthError("You must accept the terms and conditions.");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoUrl || undefined,
      });

      if (error) {
        if (error.message?.toLowerCase().includes("exists") || error.code === "USER_ALREADY_EXISTS") {
          setAuthError("user already registered");
        } else {
          setAuthError(error.message || "Registration failed");
        }
      } else {
        setSuccessMessage("Registration successful!");
        // Wait a bit and redirect to home or login
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      setAuthError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: '600px' }}>
          <h2 className="auth-title">Register your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Photo URL</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
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

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                style={{ width: '20px', height: '20px' }}
              />
              <label htmlFor="terms" style={{ margin: 0, fontWeight: 'normal' }}>
                Accept Term & Conditions
              </label>
            </div>

            {authError && <div className="error-message" style={{ marginBottom: '15px' }}>{authError}</div>}
            {successMessage && <div className="success-message" style={{ marginBottom: '15px' }}>{successMessage}</div>}

            <button type="submit" className="btn-auth">
              Register
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
            Sign up with Google
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
            Sign up with Github
          </button>

          <p className="auth-redirect">
            Already Have An Account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
