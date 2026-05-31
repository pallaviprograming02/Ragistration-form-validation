(function(){
  const form = document.getElementById('regForm');
  const success = document.getElementById('success');

  function showError(id, message){
    const el = document.getElementById(id);
    if(el) el.textContent = message || '';
  }

  function clearErrors(){
    ['firstNameError','lastNameError','emailError','passwordError','confirmPasswordError','phoneError','agreeError'].forEach(id=>{
      showError(id,'');
    });
    success.style.display = 'none';
    success.textContent = '';
  }

  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone){
    if(!phone) return true; // optional
    return /^\d{7,15}$/.test(phone.replace(/\s|\-|\(|\)/g,''));
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    clearErrors();
    let valid = true;

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const phone = form.phone.value.trim();
    const agree = form.agree.checked;

    if(!firstName){ showError('firstNameError','First name is required'); valid = false }
    if(!lastName){ showError('lastNameError','Last name is required'); valid = false }
    if(!email){ showError('emailError','Email is required'); valid = false }
    else if(!validateEmail(email)){ showError('emailError','Enter a valid email'); valid = false }
    if(!password){ showError('passwordError','Password is required'); valid = false }
    else if(password.length < 6){ showError('passwordError','Password must be at least 6 characters'); valid = false }
    if(!confirmPassword){ showError('confirmPasswordError','Please confirm your password'); valid = false }
    else if(password !== confirmPassword){ showError('confirmPasswordError','Passwords do not match'); valid = false }
    if(!validatePhone(phone)){ showError('phoneError','Enter a valid phone (7-15 digits)'); valid = false }
    if(!agree){ showError('agreeError','You must agree to the terms'); valid = false }

    if(!valid) return;

    success.textContent = 'Registration successful! (demo)';
    success.style.display = 'block';
    form.reset();
  });
})();
