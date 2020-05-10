const app = document.querySelector('#app');

let users;

const createUserContainer = function(firstName,lastName,email,title) {
    const userContainer = document.createElement('li');
    // addint firstname
    const firstNameContainer = document.createElement('div')
    firstNameContainer.classList.add('firstName');
    firstNameContainer.append(document.createTextNode(firstName));
    userContainer.append(firstNameContainer)
    
    const lastNameContainer = document.createElement('div')
    lastNameContainer.classList.add('lastName')
    lastNameContainer.append(document.createTextNode(lastName))
    userContainer.append(lastNameContainer)

    const emailContainer = document.createElement('div')
    emailContainer.classList.add('email')
    emailContainer.append(document.createTextNode(email))
    userContainer.append(emailContainer)

    const titleContainer = document.createElement('div')
    titleContainer.classList.add('title')
    titleContainer.append(document.createTextNode(title))
    userContainer.append(titleContainer)

    return userContainer
}

// `<li class='${
//     i === pageNumber ? 'selected' : ''
//   }'><a href='#${i}'>${i + 1}</a></li>`;


createButtonsContainer = function(arr) {
    ButtonsContainer = document.createElement('li')
    ButtonsContainer.classList.add('buttonsList');
    arr.forEach((num, indexN) => {
        button = document.createElement('a')
        button.href = `#${num}`
        button.innerHTML = num
        button.addEventListener('hashchange', () => {
            const idx = window.location.hash.slice(1);
            console.log(idx);
            console.log(`TODO make another api call with ${idx}`)})
        ButtonsContainer.append(button)
        })  
    return ButtonsContainer;
    }

const render = function(data) {
    const ul = document.createElement('ul');
    count = data.count;
    pages = data.count/50;
    pagesL = []
    for(let i = 0; i<pages;i++) {
        pagesL.push(i+1)
    }
    app.append(createButtonsContainer(pagesL))
    users =  data.users; 
    for(let j = 0; j<users.length; j++) {
    // console.log(users[i])
        firstName = users[j].firstName
        lastName = users[j].lastName
        email = users[j].email
        // console.log(email)
        title = users[j].title            
        // console.log(title)
        ul.append(createUserContainer(firstName,lastName,email,title))
        app.append(ul)
    }
}

const fetchAndRender = () => {
    app.innerHTML = ""
    console.log(window.location.hash)
    const pageNumber = window.location.hash.slice(1) || '0';
    fetch(
      `https://acme-users-api-rev.herokuapp.com/api/users/${Math.max(pageNumber-1,0)}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        render(data);
      });
    }

window.addEventListener('hashchange', fetchAndRender);
fetchAndRender();


    // const ul = document.querySelector('ul');
    // const html = data.results.map( (person, idx) => {
    //   return `
    //     <li><a href='#${idx}'>${ person.name }</a></li>
    //   `;
    // }).join('');

