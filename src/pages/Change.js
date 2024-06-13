import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Change() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [Name, setName] = useState(user?.name || '');
  const [Gender, setGender] = useState(user?.gender || '');
  const [Whno, setWhno] = useState(user?.whno || '');
  const [Contact, setContact] = useState(user?.contact || '+91');
  const [Email, setEmail] = useState(user?.email || '');
  const [DOB, setDOB] = useState(user?.dob || '');
  // const [Group, setGroup] = useState(user?.group || '');
  const [BusinessName, setBusinessName] = useState(user?.businessName || '');
  const [Category, setCategory] = useState(user?.category || '');
  // const [Nature, setNature] = useState(user?.nature || '');
  const [Address, setAddress] = useState(user?.address || '');
  const [Pin, setPin] = useState(user?.pin || '');
  const [Loc, setLoc] = useState(user?.loc || '');
  const [City, setCity] = useState(user?.city || '');
  const [Link, setLink] = useState(user?.link || '');
  const [Disc, setDisc] = useState(user?.disc || '');
  const [Logo, setLogo] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isDobValid, setIsDobValid] = useState(true);
  const [isValidPin, setIsValidPin] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDiscValid, setIsDiscValid] = useState(true);
  const [linkError, setLinkError] = useState('');
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("dob").max = today;
  }, []);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const nameRegex = /^[a-zA-Z0-9.\s]+$/;
    setIsNameValid(nameRegex.test(value));
  };

  const handleDateChange = (e) => {
    const enteredDate = new Date(e.target.value);
    const currentDate = new Date();
    setIsDobValid(enteredDate <= currentDate);
    setDOB(e.target.value);
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    setPin(value);
    const pinRegex = /^\d{6}$/;
    setIsValidPin(pinRegex.test(value));
  };

  const handleDiscChange = (e) => {
    const value = e.target.value;
    setDisc(value);
    const discValue = parseFloat(value);
    setIsDiscValid(!isNaN(discValue) && discValue >= 0 && discValue <= 100);
  };

  const handleLinkChange = (e) => {
    const inputValue = e.target.value;
    setLink(inputValue);
    if (!inputValue.match(/^https?:\/\/.*\..*$/)) {
      setLinkError('Website link must start with "http://" or "https://" and contain at least one period (.)');
    } else {
      setLinkError('');
    }
  };

  const validateContact = (value) => {
    const contactRegex = /^\+91[0-9]{10}$/;
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

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", Name);
    fd.append("gender", Gender);
    fd.append("whno", Whno);
    fd.append("contact", Contact);
    fd.append("email", Email);
    fd.append("dob", DOB);
    
    fd.append("bName", BusinessName);
    fd.append("category", Category);
   
    fd.append("address", Address);
    fd.append("pin", Pin);
    fd.append("loc", Loc);
    fd.append("city", City);
    fd.append("link", Link);
    fd.append("disc", Disc);
    fd.append("logo", Logo);

    try {
      const resp = await fetch(`http://localhost:2000/update-form-data/${user._id}`, {
        method: 'PUT',
        body: fd,
      });

      if (resp.ok) {
        alert("Details updated successfully");
        navigate("/home");
      } else {
        const errorData = await resp.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Error updating details');
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

      <div className="container" style={{ borderRadius: '8px', border: '2px solid darkblue' }}>
        <h1 style={{textAlign: 'center', color: 'blue', fontSize: '55px', fontWeight: 'bold'}}>Update Registration Form</h1>
        
        <form className="row" onSubmit={handleSubmit}>
          {/* Business Details */}
          <div className="col-md-6 mb-2">
            <label htmlFor="businessName" className="form-label">
              Business Name:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="businessName"
              value={BusinessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="businessCategorySelect" className="form-label">
              Business Category:<span style={{ color: 'red' }}>*</span>
            </label>
            <select className="form-select" id="businessCategorySelect" value={Category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select</option>
              <option value="SALOON">SALOON</option>
              <option value="PHARMACY">PHARMACY</option>
              <option value="Hotels and Restaurants">Hotels and Restaurants</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="businessAddress" className="form-label">
              Business Address:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="businessAddress"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="localitySelect" className="form-label">
              Business Locality:<span style={{ color: 'red' }}>*</span>
            </label>
            <select className="form-select" id="localitySelect" value={Loc} onChange={(e) => setLoc(e.target.value)} required>
              <option value="">Select</option>
              <option value="North Kolkata">North Kolkata</option>
              <option value="South Kolkata">South Kolkata</option>
              <option value="Industrial area (South)">Industrial area (South)</option>
              <option value="Extended North (NewTown, Rajarhat)">Extended North (NewTown, Rajarhat)</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="dob" className="form-label">
              Business start date:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="date"
              className={`form-control ${!isDobValid ? 'is-invalid' : ''}`}
              id="dob"
              value={DOB}
              onChange={handleDateChange}
              required
            />
            {!isDobValid && <div className="invalid-feedback"> Date should be in the past.</div>}
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="businessPincode" className="form-label">
              Pincode:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${!isValidPin ? 'is-invalid' : ''}`}
              id="businessPincode"
              value={Pin}
              onChange={handlePinChange}
              required
            />
            {!isValidPin && <div className="invalid-feedback">Invalid Pincode. Please enter a 6-digit number.</div>}
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="businessCity" className="form-label">
              Business City:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="businessCity"
              value={City}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="websiteLink" className="form-label">
              Website Link:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${linkError ? 'is-invalid' : ''}`}
              id="websiteLink"
              value={Link}
              onChange={handleLinkChange}
              required
            />
            {linkError && <div className="invalid-feedback">{linkError}</div>}
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="discount" className="form-label">
              Discount(percent):<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${!isDiscValid ? 'is-invalid' : ''}`}
              id="discount"
              value={Disc}
              onChange={handleDiscChange}
              required
            />
            {!isDiscValid && (
              <div className="invalid-feedback">Discount must be between 0 and 100</div>
            )}
          </div>

          {/* Personal Details */}
          <div className="col-md-6 mb-2">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number:
            </label>
            <input
              type="text"
              className={`form-control ${contactError ? 'is-invalid' : ''}`}
              id="contactNumber"
              value={Contact}
              onChange={handleContactChange}
              required
            />
            {contactError && <div className="invalid-feedback">{contactError}</div>}
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="whatsAppNumber" className="form-label">
              WhatsApp Number:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="whatsAppNumber"
              value={Whno}
              onChange={(e) => setWhno(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="contactEmail" className="form-label">
              Email:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="email"
              className={`form-control ${!isEmailValid ? 'is-invalid' : ''}`}
              id="contactEmail"
              value={Email}
              onChange={handleEmailChange}
              required
            />
            {!isEmailValid && <div className="invalid-feedback">Invalid email format. Please enter a valid email address.</div>}
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="fullName" className="form-label">
              Full Name:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${!isNameValid ? 'is-invalid' : ''}`}
              id="fullName"
              value={Name}
              onChange={handleNameChange}
              required
            />
            {!isNameValid && <div className="invalid-feedback">Invalid name format. Please use only alphabets.</div>}
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="genderSelect" className="form-label">
              Gender:
            </label>
            <select className="form-select" id="genderSelect" value={Gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="logoUpload" className="form-label">
              Upload Logo:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="file"
              className="form-control"
              id="logoUpload"
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </div>

          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-primary" disabled={!isNameValid || !isEmailValid || !isDobValid || !isValidPin || !isDiscValid || linkError || contactError}>Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Change;
