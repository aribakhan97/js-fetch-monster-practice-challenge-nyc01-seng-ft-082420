const baseUrl = 'http://localhost:3000/monsters/'

document.addEventListener("DOMContentLoaded", () => {
    var currentPage = 1
    const getMonsters = (limit, page) => {
        var requestUrl = `${baseUrl}?_limit=${limit}&_page=${page}`
        return fetch (requestUrl)
        .then(response => response.json()) // turn response data in JSON object
    }

    const displayMonsters = (page) => {
        getMonsters(50, page)
        .then(data => {
            const monsterContainer = document.querySelector('#monster-container')
            monsterContainer.innerHTML= " "
            for (const monster of data){
                showOneMonster(monster, monsterContainer)
            }
        })
    }
    const showOneMonster = (monster, monsterContainer) => {
        const monsterDiv = document.createElement("div")
        monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
        `
        monsterContainer.append(monsterDiv)
    }
    const createMonster = () => {
        const createMonsterDiv = document.querySelector('#create-monster')
        const monsterForm = document.createElement("form")

        // name input
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.name = "name"
        nameInput.placeholder = "name..."
        nameInput.id = "monster_name"

        // age input
        const ageInput = document.createElement("input")
        ageInput.name = "age"
        ageInput.placeholder = "age..."
        ageInput.type = "number"
        ageInput.id = "monster_age"

        // description input
        const descriptionInput = document.createElement("input")
        descriptionInput.name = "description"
        descriptionInput.placeholder = "description..."
        descriptionInput.type = "text"
        descriptionInput.id = "monster_description"

        //create button

        const submitButton = document.createElement("button")
        submitButton.innerHTML = "submit"
        monsterForm.addEventListener("submit", e => handleFormSubmit(e))
        
        


        // append 

        monsterForm.append(nameInput) 
        monsterForm.append(ageInput)
        monsterForm.append(descriptionInput)
        monsterForm.append(submitButton) 


        createMonsterDiv.append(monsterForm)

        
    }

    const handleFormSubmit = (e) => {
        e.preventDefault() 
        e.target.name.value
        // get data from form
        const form = e.target
        const name = form.name.value
        const age = form.age.value
        const description = form.description.value 
        var monsterData = {name: name, age: age, description: description}

        const options = {
            method: "POST",
            headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
            body: JSON.stringify(monsterData)
            }
            fetch(baseUrl, options)
            .then(response => response.json())
            .then(data => console.log(data))
        // post data to database

        
    }

    const forwardButton = () => {
        var forward = document.querySelector('#forward')
        forward.addEventListener('click', e =>{
            currentPage += 1
            displayMonsters(currentPage)
        })
    }

    const backButton = () => {
        var back = document.querySelector('#back')
        back.addEventListener('click', e =>{
            if (currentPage > 0) {
                currentPage -= 1
            displayMonsters(currentPage)
            }
        })
    }

    displayMonsters(1)
    createMonster() 
    forwardButton()
    backButton()


})