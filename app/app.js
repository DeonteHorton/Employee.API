
// work in progress
let clear = document.getElementById('clear');
let create = document.getElementById('create');
let getAll = document.getElementById('all-people');
let getRemoved = document.getElementById('people-removed');
let getID = document.getElementById('by-id');
let getFname = document.getElementById('by-fname');
let getLname = document.getElementById('by-lname');
let getGender = document.getElementById('by-gender');
let addEx_Employee = document.getElementById('add-e');
let removeEmployee = document.getElementById('delete-e');
let update = document.getElementById('update');
let output = document.getElementById('output');

const formatData = (data) => {
    output.innerHTML = '';
    output.innerHTML = '<thead><tr><th>ID</th><th>First Name</th><th>Last name</th><th>Phone</th><th>Email</th><th>Address</th><th>DOB</th><th>Gender</th><th>Time Employed</th><th>Updated Status</th><th>Time Fired</th></tr></thead>';
    data.forEach(people => {
        let el = document.createElement('tr');
        el.innerHTML = `<td>${people.id}</td> <td>${people.fname}</td> <td>${people.lname}</td> <td>${people.phone}</td><td>${people.email}</td><td>${people.address}</td><td>${people.dob}</td><td>${people.gender}</td><td>${people.created_at}</td><td>${people.updated_at}</td><td>${people.deleted_at}</td>`;
        output.appendChild(el);
    });
    clear.addEventListener('click',()=>{
        output.innerHTML = '';
    })
};

create.addEventListener('submit',(eve)=>{
   eve.preventDefault();
   let first_name = document.getElementById('first-name').value;
   let last_name = document.getElementById('last-name').value;
   let phone = document.getElementById('phone').value;
   let email = document.getElementById('email').value;
   let address = document.getElementById('address').value;
   let dob = document.getElementById('dob').value;
   let select = document.getElementById("sex");
   let sex = select.options[select.selectedIndex].value;

   const data = {
    "fname": first_name,
    "lname":last_name,
    "phone":phone,
    "email":email,
    "address":address,
    "dob":dob,
    "gender":sex,
    "created_at":""
   }
   fetch('http://localhost:3006/api/people/create',{
       method:'POST',
       headers: {
        'Content-Type': 'application/json',
      },
       body:JSON.stringify(data)
   })
   .then(repsonse => repsonse.json())
   .then(data => {
      output.innerHTML = `<pre>${JSON.stringify(data,undefined, 4)}</pre>`
      console.log(data)
   })

   setTimeout(()=>{
      output.innerHTML = '';
   },6000)
});

/* Work in progess */
// update.addEventListener('submit',(eve)=>{
//     eve.preventDefault();
//     let first_name = document.getElementById('update-fname').value;
//     let last_name = document.getElementById('update-lname').value;
//     let phone = document.getElementById('update-phone').value;
//     let email = document.getElementById('update-email').value;
//     let address = document.getElementById('update-address').value;
//     let dob = document.getElementById('update-dob').value;
//     let select = document.getElementById("update-sex");
//     let sex = select.options[select.selectedIndex].value;
//     let id = document.getElementById('employee-id').value;
 
//     const data = {
//      "fname": first_name,
//      "lname":last_name,
//      "phone":phone,
//      "email":email,
//      "address":address,
//      "dob":dob,
//      "gender":sex,
//      "id":id
//     }
//     fetch(`http://localhost:3006/api/people/update/${id}`,{
//         method:'POST',
//         headers: {
//          'Content-Type': 'application/json',
//        },
//         body:JSON.stringify(data)
//     })
//     .then(repsonse => repsonse.json())
//     .then(data => {
//        output.innerHTML = `<pre>${JSON.stringify(data,undefined, 4)}</pre>`
//        console.log(data)
//     })
 
//     setTimeout(()=>{
//        output.innerHTML = '';
//     },6000)
//  }) 
getAll.addEventListener('click',()=>{
    fetch('http://localhost:3006/api/people')
    .then(repsonse => repsonse.json())
    .then(data => {
        formatData(data)
    });
});
getRemoved.addEventListener('click',()=>{
    fetch('http://localhost:3006/api/people/removed')
    .then(repsonse => repsonse.json())
    .then(data => {
       formatData(data)
    });
});
getID.addEventListener('submit',(eve)=>{

    eve.preventDefault();
    let number = document.getElementById('number').value;
    fetch(`http://localhost:3006/api/people/by_id/${number}`)
    .then(repsonse => repsonse.json())
    .then(data => {
       formatData(data)
    });
    document.getElementById('number').value = '';
});
getFname.addEventListener('submit',(eve)=>{
    eve.preventDefault();
    let name = document.getElementById('fname').value;
    fetch(`http://localhost:3006/api/people/by_fname/${name}`)
    .then(repsonse => repsonse.json())
    .then(data => {
        formatData(data)
    });
    document.getElementById('fname').value = '';
});
getLname.addEventListener('submit',(eve)=>{
    eve.preventDefault();
    let name = document.getElementById('lname').value;
    fetch(`http://localhost:3006/api/people/by_lname/${name}`)
    .then(repsonse => repsonse.json())
    .then(data => {
        formatData(data)
    });
    document.getElementById('lname').value = '';

});
getGender.addEventListener('submit',(eve)=>{
    eve.preventDefault();
    let select = document.getElementById("gender");
    let gender = select.options[select.selectedIndex].value;
    fetch(`http://localhost:3006/api/people/gender/${gender}`)
        .then(repsonse => repsonse.json())
        .then(data => {
            formatData(data)
    });
});
addEx_Employee.addEventListener('submit',(eve)=>{
    eve.preventDefault();
    let id = document.getElementById('add').value;
    fetch(`http://localhost:3006/api/people/undelete/${id}`,{
        method:'POST'
    })
    .then(repsonse => repsonse.json())
    .then(data => {
        output.innerHTML = `<pre>${JSON.stringify(data,undefined, 4)}</pre>`
    });
    document.getElementById('add').value = '';
    setTimeout(()=>{
       output.innerHTML = '';
    },4000)
});
removeEmployee.addEventListener('submit',(eve)=>{
    eve.preventDefault();
    if (window.confirm('Are you sure about this')) {
        
        let id = document.getElementById('delete').value;
        fetch(`http://localhost:3006/api/people/delete/${id}`,{
            method:'POST'
        })
        .then(repsonse => repsonse.json())
        .then(data => {
            output.innerHTML = `<pre>${JSON.stringify(data,undefined, 4)}</pre>`
        });
        document.getElementById('delete').value = '';
        setTimeout(()=>{
           output.innerHTML = '';
        },4000)
    }
});
/* 
 Make a create employee 
 use textarea to 
 get object keys and values
 turn format into json and send to data base
 */


