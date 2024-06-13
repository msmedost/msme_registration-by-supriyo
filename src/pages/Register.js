import { useState, useEffect } from "react";
import axios from 'axios';

function Register({ onChange }) {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState('');
  const [Name, setName] = useState('');
  const [Gender, setGender] = useState('');
  const [Whno, setWhno] = useState('');
  const [Contact, setContact] = useState('+91');
  const [Email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [Group, setGroup] = useState('');
  const [BusinessName, setBusinessName] = useState('');
  const [Category, setCategory] = useState('');
  const [Nature, setNature] = useState('');
  const [Address, setAddress] = useState('');
  const [Pin, setPin] = useState('');
  const [Loc, setLoc] = useState('');
  const [City, setCity] = useState('');
  const [Link, setLink] = useState('');
  const [Disc,setDisc] = useState('');
  const [Desc,setDesc] = useState('');
  const [Logo, setLogo] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isDobValid, setIsDobValid] = useState(true);
  const [isValidPin, setIsValidPin] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDiscValid, setIsDiscValid] = useState(true);
  const [captchaError, setCaptchaError] = useState(false);
  const [linkError, setLinkError] = useState('');
  const [contactError, setContactError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  

  function generateCaptcha() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }
  function distortText(context, text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = context.measureText(text).width + 100;
    canvas.height = 30;
    ctx.font = 'bold 24px Arial';
    ctx.fillText(text, 10, 24);
  
    // Distort the text (example: add noise)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Add random noise to each pixel
      imageData.data[i] += Math.floor(Math.random() * 10 - 5);
      imageData.data[i + 1] += Math.floor(Math.random() * 10 - 5);
      imageData.data[i + 2] += Math.floor(Math.random() * 10 - 5);
    }
    ctx.putImageData(imageData, 0, 0);
  
    return canvas.toDataURL();
  }



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

  function handleInputChange(e) {
    setUserInput(e.target.value);
    onChange(e.target.value === captcha);
  }

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
    // Validate website link format
    if (!inputValue.match(/^https?:\/\/.*\..*$/)) {
      setLinkError('Website link must start with "http://" or "https://" and contain at least one period (.)');
    } else {
      setLinkError('');
    }
  };

  function handleRefresh() {
    setCaptcha(generateCaptcha());
    setUserInput('');
    setCaptchaError(false);
    onChange(false);
  }
  
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



  async function handleSubmit(e) {
    e.preventDefault();
    
    
    if (userInput !== captcha) {
      setCaptchaError(true);
      setTimeout(() => setCaptchaError(false), 5000); // Hide CAPTCHA error after 5 seconds
      return;
    }

    const fd = new FormData();
    fd.append("name", Name);
    fd.append("gender", Gender);
    fd.append("whno", Whno);
    fd.append("contact", Contact);
    fd.append("email", Email);
    fd.append("dob", DOB);
    fd.append("group", Group);
    fd.append("bName", BusinessName);
    fd.append("category", selectedCategory);
    fd.append("nature", Nature);
    fd.append("address", Address);
    fd.append("pin", Pin);
    fd.append("loc", Loc);
    fd.append("city", City);
    fd.append("link", Link);
    fd.append("disc",Disc);
    fd.append("desc",Desc);
    fd.append("logo", Logo);

    const resp = await fetch("http://localhost:2000/ins", {
      method: 'POST',
      body: fd,
    });
    const data = await resp.json();
    console.log(data);

    alert("Details submitted to the server");
    
    // Reset form fields
    setName('');
    setGender('');
    setWhno('');
    setContact('');
    setEmail('');
    setDOB('');
    setGroup('');
    setBusinessName('');
    setCategory('');
    setNature('');
    setAddress('');
    setPin('');
    setLoc('');
    setCity('');
    setLink('');
    setDesc('');
    setDisc('');
    setLogo(null);
    setCaptcha(generateCaptcha());
    setUserInput('');
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:2000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // useEffect(() => {
  //   let nameTimeout;
  //   if (!isNameValid) {
  //     nameTimeout = setTimeout(() => setIsNameValid(true), 5000);
  //   }
  //   return () => clearTimeout(nameTimeout);
  // }, [isNameValid]);

  // useEffect(() => {
  //   let emailTimeout;
  //   if (!isEmailValid) {
  //     emailTimeout = setTimeout(() => setIsEmailValid(true), 5000);
  //   }
  //   return () => clearTimeout(emailTimeout);
  // }, [isEmailValid]);

  // useEffect(() => {
  //   let dobTimeout;
  //   if (!isDobValid) {
  //     dobTimeout = setTimeout(() => setIsDobValid(true), 5000);
  //   }
  //   return () => clearTimeout(dobTimeout);
  // }, [isDobValid]);

  // useEffect(() => {
  //   let discTimeout;
  //   if (!isDiscValid) {
  //     discTimeout = setTimeout(() => setIsDiscValid(true), 5000);
  //   }
  //   return () => clearTimeout(discTimeout);
  // }, [isDiscValid]);

  // useEffect(() => {
  //   let pinTimeout;
  //   if (!isValidPin) {
  //     pinTimeout = setTimeout(() => setIsValidPin(true), 5000);
  //   }
  //   return () => clearTimeout(pinTimeout);
  // }, [isValidPin]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("dob").max = today;
  }, []);

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
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
        <link href="/assets/form.css" rel="stylesheet" />
        {/* <link rel="stylesheet" href="./style.css"/></link> */}
      </head>
      <div class="collapse" id="navbarToggleExternalContent">
  <div class="bg-dark p-4">
    <h5 class="text-white h4">Collapsed content</h5>
    <span class="text-muted">Registration page.</span>
  </div>
</div>


<div className="container" style={{ borderRadius: '8px', border: '2px solid darkblue' }}>
  {/* Content */}


      
      <h1 style={{textAlign: 'center', color: 'blue', fontSize: '55px', fontWeight: 'bold'}}>Registration Form</h1>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
            <div style={{ marginRight: '10px' }}>BUSINESS DETAILS </div>
            <div style={{ borderBottom: '2px solid blue', flex: '1', marginBottom: '0px' }} />
          </div>


        <form className="row" onSubmit={handleSubmit}>

          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="businessName" className="form-label">
                Business Name:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="businessName"
                placeholder="Business Name"
                value={BusinessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-2">
          <div className="field-container">
        <label htmlFor="businessCategorySelect" className="form-label">
          Business Category:<span style={{ color: 'red' }}>*</span>
        </label>
        <select
          className="form-select"
          id="businessCategorySelect"
          value={selectedCategory}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select</option>
          {categories.map(category => (
            <option key={category._id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
          </div>

          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="businessAddress" className="form-label">
                Business Address:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="businessAddress"
                placeholder="Business Address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <div className="field-container">
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
          </div>

          <div className="col-md-6 mb-2">
            <div className="field-container">
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
          </div>

          {/* <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="businessNatureSelect" className="form-label">
                Nature of Business:
              </label>
              <select className="form-select" id="businessNatureSelect" value={Nature} onChange={(e) => setNature(e.target.value)} required>
                <option value="">Select</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div> */}

          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="businessPincode" className="form-label">
                Pincode:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="pin"
                className={`form-control ${!isValidPin ? 'is-invalid' : ''}`}
                id="businessPincode"
                placeholder="Pincode"
                value={Pin}
                onChange={handlePinChange}
                required
              />
              {!isValidPin && <div className="invalid-feedback">Invalid Pincode. Please enter a 6-digit number.</div>}
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="businessCity" className="form-label">
                Business City:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="businessCity"
                placeholder="Business City"
                value={City}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          {/* <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="websiteLink" className="form-label">
                Website Link:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="websiteLink"
                placeholder="Website Link"
                value={Link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div> */}
      <div className="col-md-6 mb-2">
      <div className="field-container">
        <label htmlFor="websiteLink" className="form-label">
          Website Link:<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          className={`form-control ${linkError ? 'is-invalid' : ''}`}
          id="websiteLink"
          placeholder="Website Link"
          value={Link}
          onChange={handleLinkChange}
        />
        {linkError && <div className="invalid-feedback">{linkError}</div>}
      </div>
    </div>


          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="discount" className="form-label">
                Discount(percent):<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className={`form-control ${!isDiscValid ? 'is-invalid' : ''}`}
                id="discount"
                placeholder="Discount"
                value={Disc}
                onChange={handleDiscChange}
                required
              />
              {!isDiscValid && (
                <div className="invalid-feedback">Discount must be between 0 and 100</div>
              )}
            </div>
          </div>

          <div className="col-md-6 mb-2">
  <div className="field-container">
    <label htmlFor="discount" className="form-label">
      Offer Description:
    </label>
    <input
      type="text"
      className={`form-control ${!isDiscValid ? 'is-invalid' : ''}`}
      id="discount"
      placeholder="Enter description here"
      value={Desc}
      onChange={(e) => setDesc(e.target.value)} // Assuming you are using a state variable to manage the input value
      // required
    />
  </div>
</div>

          <div className="col-md-6 mb-2"></div>
          {/* <div className="col-md-6 mb-4"><h1>Details</h1></div> */}

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
            <div style={{ marginRight: '10px' }}>PERSONAL DETAILS </div>
            <div style={{ borderBottom: '2px solid blue', flex: '1', marginBottom: '0px' }} />
          </div>
          
          
          <div className="col-md-6 mb-2">
      <div className="field-container">
        <label htmlFor="contactNumber" className="form-label">
          Contact Number:
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
              <label htmlFor="whatsAppNumber" className="form-label">
                WhatsApp Number:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="whatsAppNumber"
                placeholder="WhatsApp Number"
                value={Whno}
                onChange={(e) => setWhno(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="contactEmail" className="form-label">
                Email:<span style={{ color: 'red' }}>*</span>
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

          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="fullName" className="form-label">
                Full Name:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className={`form-control ${!isNameValid ? 'is-invalid' : ''}`}
                id="fullName"
                placeholder="Full Name"
                value={Name}
                onChange={handleNameChange}
                required
              />
              {!isNameValid && <div className="invalid-feedback">Invalid name format. Please use only alphabets.</div>}
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <div className="field-container">
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
          </div>

          

          <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="logoUpload" className="form-label">
                Upload Logo:<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="file"
                className="form-control"
                id="logoUpload"
                onChange={(e) => setLogo(e.target.files[0])}
                required
              />
            </div>
          </div>

          {/* <div className="col-md-6 mb-2">
            <div className="field-container">
              <label htmlFor="businessGroup" className="form-label">
                Business Group:
              </label>
              <input
                type="text"
                className="form-control"
                id="businessGroup"
                placeholder="Business Group"
                value={Group}
                onChange={(e) => setGroup(e.target.value)}
                required
              />
            </div>
          </div> */}

          {/* <div className="col-md-6 mb-2"> */}
          <div className="field-container" style={{ overflow: 'hidden' }}>
  <label htmlFor="captcha" className="form-label">
    Enter Captcha:<span style={{ color: 'red' }}>*</span>
  </label>
  <input
    type="text"
    className="form-control"
    id="captcha"
    value={userInput}
    onChange={handleInputChange}
    required
  />
 
  {captchaError && <div className="invalid-feedback d-block">Invalid Captcha. Please try again.</div>}
  <p style={{ whiteSpace: 'nowrap' }}>
    <img
      src={distortText(document.createElement('canvas').getContext('2d'), captcha)}
      alt="Captcha"
      style={{ width: `${captcha.length * 100}px`, height: '40px', marginRight: '10px' }}
    />
    <button type="button" onClick={handleRefresh} style={{ marginLeft: '10px', float: 'right' }}>Refresh</button>
  </p>
</div>
          {/* </div> */}

          <div className="col-md-12 text-center">
            
            <button type="submit" className="btn btn-primary" disabled={!isNameValid || !isEmailValid || !isDobValid || !isValidPin || !isDiscValid || captchaError || linkError|| contactError}>Submit</button> 
            <a href="/update" style={{ color: '#FF6666' }}>To update existing click here!!</a>
          </div>

        </form>
      </div>
    </>
  );
}

export default Register;
