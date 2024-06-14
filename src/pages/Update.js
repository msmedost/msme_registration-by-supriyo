import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Update() {
  const [Email, setEmail] = useState('');
  const [Contact, setContact] = useState('+91');
  const [contactError, setContactError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const navigate = useNavigate();

  const validateContact = (value) => {
    const contactRegex = /^\+91[0-9]{10}$/; // Regex for "+91" followed by 10 digits
    if (!contactRegex.test(value)) {
      setContactError('Contact number should start with +91 and contain 10 digits');
    } else {
      setContactError('');
    }
  };

  const handleContactChange = (e) => {
    const newValue = e.target.value;
    setContact(newValue);
    validateContact(newValue);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setFetchError(''); // Reset fetch error

    const fd = new FormData();
    fd.append("contact", Contact);
    fd.append("email", Email);

    try {
      const resp = await fetch("https://msmeserver.onrender.com/check", {
        method: 'POST',
        body: fd,
      });
     
      

      // if (!resp.ok) {
      //   throw new Error(`Network response was not ok: ${resp.statusText}`);
      // }

      const data = await resp.json();
      console.log(data);

      if (data.found) {
        navigate("/change", { state: { user: data.user } });
      } else {
        setUserNotFound(true);
      }

      setContact('');
      setEmail('');
    } catch (error) {
      console.error('Fetch error:', error);
      setFetchError(`Fetch error: ${error.message}`);
    }
  }

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bootstrap demo</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
        <link href="/assets/form.css" rel="stylesheet" />
      </head>
   
      <div className="container" style={{ borderRadius: '8px', border: '2px solid darkblue', marginTop: '5px', padding: '15px', maxWidth: '800px', width: '800px' }}>
        <h4>ENTER DETAILS TO LOG IN: </h4>
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="Phno" className="form-label">
                Phone Number:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className={`form-control ${contactError ? 'is-invalid' : ''}`}
                id="contactNumber"
                placeholder="Contact Number"
                value={Contact}
                onChange={handleContactChange}
              />
              {contactError && <div className="invalid-feedback">{contactError}</div>}
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="Phno" className="form-label">
                Email id:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="email"
                className={`form-control ${!isEmailValid ? 'is-invalid' : ''}`}
                id="contactEmail"
                placeholder="Email"
                value={Email}
                onChange={handleEmailChange}
                required
              />
              {!isEmailValid && <div className="invalid-feedback">Invalid email format. Please enter a valid email address.</div>}
            </div>
          </div>

          <div className="col-md-12 text-center">
            {userNotFound && <div className="text-danger mb-3">User not found. Please check your details.</div>}
            {fetchError && <div className="text-danger mb-3">{fetchError}</div>}
            <button type="submit" className="btn btn-primary" disabled={!isEmailValid || contactError}>Go</button>
          </div>
        </form>
      </div>
     
    </>
  );
}

export default Update;
