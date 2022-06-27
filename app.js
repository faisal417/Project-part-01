

// get elements

const productForm = document.getElementById('productForm');
const msg = document.querySelector('.msg');
const productList = document.querySelector('.productList');


//get all product ( Step -2 )
const getAllProduct = () =>{
    // get all ls data
    const data = readlsData('product');

    // Check, Is there any data in local host
    if(!data){
        productList.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">No product found</td>
            </tr>
        `
    }

    // If exist, Show all dat to list
    if (data) {
        //init value
        let list='';
        //loop for dat
        data.map((item, index)=>{
            list +=`
            <tr>
                <td>${index+1}</td>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.price*item.quantity} BDT</td>
                <td>
                <a class="btn btn-info btn-sm" href=""><i class="fas fa-eye"></i></a>
                <a class="btn btn-warning btn-sm" href=""><i class="fas fa-edit"></i></a>
                <a class="btn btn-danger btn-sm" href=""><i class="fas fa-trash"></i></a>
                </td>
                </tr>
            `;
        });
        productList.innerHTML = list;
    };
};

getAllProduct(); 


// submit product form (Step- 1)

productForm.onsubmit = (e) =>{
    e.preventDefault();

    // get form data from form data object
    let formData = new FormData(e.target);
    let productData = Object.fromEntries(formData.entries());
    let {name, image, price, quantity} = Object.fromEntries(formData.entries());



    // form validation

    if(!name || !image || !price || !quantity){
        msg.innerHTML = setAlert('All fields are required');
    }else{


        createLsData('product', productData)

        msg.innerHTML = setAlert('Data Stable','success');
        // e.target.reset();
        productForm.reset(); // We can use either of these two to reset data
        getAllProduct(); 
    }
}


