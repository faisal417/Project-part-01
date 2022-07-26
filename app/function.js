

// /*
// *Set Alert Function
// */
 
const setAlert=( msg, type='danger')=>{
    return `<p class="alert alert-${type} d-flex justify-content-between">
    ${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}
 
// /*
// *Email check
// */
 
const emailCheck = (email) => {
    let pattern=/^[a-z0-9\._]{1,}@[a-z0-9]{2,}\.[a-z]{2,5}$/;
    return pattern.test(email);
}
 
 /**
  * Phone check
  */

 
const phoneCheck = (phone) => {
    let pattern=/^( 01|8801|\+8801)[0-9]{9}$/;
    return pattern.test(phone);
}


// Product app individual function

/**
 * set value ls (Step- 1)
 */


const createLsData = (key, value) =>{
    // let data=[];
    // data.push(value);
    // localStorage.setItem(key, JSON.stringify(value));


    // init value
    let data = [];

    // check key exist or not
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
        
    }
    // push data to local storage
    data.push(value);
    // set data
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * get all local host data ( Step -2 )
 */

const readlsData = (key) =>{
    
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }else{
        return false;
    }
}


/**
 * Updata ls data (for updata product)
 */


const updataLsData=(key, array)=>{
    localStorage.setItem(key, JSON.stringify(array))
}