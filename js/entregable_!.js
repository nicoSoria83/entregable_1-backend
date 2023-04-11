class TicketManager {

    #gain

    constructor() {
        this.events = []
        this.#gain = 0.15
    }

    getEvents() {
        console.log(this.events)
        return this.events
    }

    getEventById(event_id) {
        let one = this.events.find(each=> each.id === event_id)
        if (one) {
            console.log(one)
            return one
        }
        console.log('not found')
        return null
    }

    addEvent({ name,place,price,capacity,date }) {
        capacity = capacity ?? 50
        date = date ?? new Date()
        let id = 0
        if (this.events.length===0) {
            id = 1
        } else {
            let lastEvent = this.events[this.events.length-1] //el ultimo elemento tiene indice igual a la longitud del array MENOS 1
            id = lastEvent.id + 1
        }
        price = price + this.#gain * price
        let event = { name,place,price,capacity,date,id, participants: [] }
        //event.participants = []
        this.events.push(event)
    }

    addParticipant(event_id,user_id) {
        let found_event = this.getEventById(event_id)
        //console.log(found_event.participants)
        if (found_event) {
            if (found_event.capacity > found_event.participants.length) {
                let user = found_event.participants.includes(user_id)
                if (user) {
                    console.log(`el usuario ${user_id} ya se encuentra en la lista`)
                } else {
                    console.log('agregado usuario '+user_id)
                    found_event.participants.push(user_id)
                }
            } else {
                console.log('no hay mas capacidad')
            }
        }/*  else {
            console.log('no se encontró el evento '+event_id);
        } */
        return null
    }

    changeName(event_id,new_name) {
        let found_event = this.getEventById(event_id)
        found_event.name = new_name
            /*
            for (let each of this.events) {
                if (each.id === event_id) { 
                    return found_event      
                } else {                    
                    return each             
                }
            }
            */
        console.log('nombre cambiado')
    }

    editEvent(event_id,datos) {  //datos va a ser el objeto con las variables a modificar (puede ser solo name o puede name con place o pueden ser TODOS los campos)
        let found_event = this.getEventById(event_id)
        for (let propiedad in datos) {
            //console.log(propiedad)
            found_event[propiedad] = datos[propiedad]
        }
    }

    addNewEvent(event_id,new_place,new_date) {
        let found_event = { ...this.getEventById(event_id) }
        this.addEvent({
            name: found_event.name,
            place: new_place,
            price: found_event.price,
            capacity: found_event.capacity,
            date: new_date
        })
        console.log('se creo el nuevo evento')
    }

    deleteEvent(event_id) {
        this.events = this.events.filter(each => each.id !== event_id)
        console.log('evento eliminado')
    }

}

let ticket = new TicketManager()
ticket.addEvent({ name: 'alice in borderland', place: 'korea', price: 5,capacity: null, date: undefined })
ticket.addEvent({ name: 'hp', place: 'england', price: 10 })
ticket.addEvent({ name: 'pokemon', place: 'japon', price: 50,capacity: 2, date: new Date('07/09/2023') })
ticket.addEvent({ name: 'disney', place: 'miami', price: 100,capacity: 5000, date: new Date('07/20/2023') })
ticket.editEvent(1,{name: 'hola', place: 'rosario'})
ticket.getEventById(1)