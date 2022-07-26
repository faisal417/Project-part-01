

// get elements

const productForm = document.getElementById('productForm');
const msg = document.querySelector('.msg');
const productList = document.querySelector('.productList');
// get elements for view single product
const singleProductData = document.querySelector('.singleProductData');
// get elements for update product
const productEditForm = document.querySelector('#productEditForm');


//get all product ( Step -2 )
const getAllProduct = () =>{
    // get all ls data
    const data = readlsData('product');

    //init value
    let list='';

    // Check, Is there any data in local host
    if(!data || data.length == 0){
        list = `
            <tr>
                <td colspan="7" class="text-center">No product found</td>
            </tr>
        `
    }

    // If exist, Show all dat to list
    if (data && data.length > 0) {
        //init value
        let finalAmount= 0;
        //loop for dat
        data.map((item, index)=>{
            finalAmount+=(item.price*item.quantity)
            list +=`
            <tr>
                <td>${index+1}</td>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.price*item.quantity} BDT</td>
                <td>
                <a class="btn btn-info btn-sm productView" data-bs-toggle="modal" productIndex=${index} href="#shopViewModal"><i class="fas fa-eye"></i></a>
                <a class="btn btn-warning btn-sm productEdit" data-bs-toggle="modal" productIndex=${index} href="#shopEditModal"><i class="fas fa-edit"></i></a>
                <a class="btn btn-danger btn-sm productDelete" data-bs-toggle="modal" productIndex=${index} href=""><i class="fas fa-trash"></i></a>
                </td>
                </tr>
            `;
        });

        list+=`
        <tr>
            <td colspan="6" class="text-end">Total Amount: ${finalAmount}</td>
            <td></td>
        </tr>
        `;

        
    };
    productList.innerHTML = list;
    
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

// view single product js start


productList.onclick=(e)=>{

    e.preventDefault();


    if(e.target.classList.contains('productView')){
        // get single product data Id
            let index = e.target.getAttribute('productIndex');
            let data = readlsData('product');

        // get data key
            const {name, image, price}=data[index];

        // send data to modal

            singleProductData.innerHTML=`
                <img class="shadow" src="${image}" alt="">
                <h3>${name}</h3>
                <p>Price: ${price} BDT</p>
            `;
        // view single product js end
    }

        // Update product js start


    if(e.target.classList.contains('productEdit')){
         // get single product data Id
            let index = e.target.getAttribute('productIndex');
            let data = readlsData('product');

        // get data key
            const {name, image, price, quantity}= data[index];


            productEditForm.innerHTML=`

            <div class="my-3">
                <input name="index" value="${index}" class="form-control" type="text">
            </div>

                <div class="my-3">
                <label for=""><strong>Product Name</strong></label>
                <input name="name" value="${name}" class="form-control" type="text">
                </div>

                <div class="my-3">
                    <label for=""><strong>Update Product Image</strong></label>
                    <input name="image" value="${image}" class="form-control" type="text">
                </div>

                <div class="my-3">
                    <img src="${image}" alt="">
                </div>

                <div class="my-3">
                    <label for=""><strong>Price</strong></label>
                    <input name="price" value="${price}" class="form-control" type="text">
                </div>

                <div class="my-3">
                    <label for=""><strong>Quantity</strong></label>
                    <input name="quantity" value="${quantity}" class="form-control" type="text">
                </div>

                <div class="my-3">
                    <input value="Update Now" class="btn btn-primary w-100" type="submit">
                </div>
            `;

    }
        // Update product js end

    // product Delete js start

    if(e.target.classList.contains('productDelete')){

        // get user confirmation
        let confirmation = confirm('Do you want to remove this product')

        if(confirmation){
            // get single product data index
            let index = e.target.getAttribute('productIndex');
            let data = readlsData('product');

            //delete index data
            data.splice(index, 1);

            //update latest data or product
            updataLsData('product', data);

            // Relode the latest product form or data
            getAllProduct();
        }else{
            alert('Your data safe')
        }
        

    }
    


    
}



// Update product submit js start

productEditForm.onsubmit=(e)=>{
    e.preventDefault();

    //get form from data object
    let formData=new FormData(e.target);
    let data=Object.fromEntries(formData.entries());
    let {name, image, price, quantity, index}=Object.fromEntries(formData.entries());

    // get all data
    let allData=readlsData('product');
    allData[index]={name, image, price, quantity}

    // Updata product data

    updataLsData('product', allData)
    getAllProduct();
}

// Update product submit js end
