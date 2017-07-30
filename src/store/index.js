import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        _loadEvents: [
            {
                src: 'https://media.timeout.com/images/103444978/image.jpg',
                id: 1,
                title: 'New York',
                date: '2017-07-19'
            },
            {
                src: 'http://www.touristsbook.com/boston/files/2015/02/Boston-Downtown-Skyline-Buidlings.jpg',
                id: 2,
                title: 'Boston',
                date: '2017-07-29'
            },
            {
                src: 'http://image.myvr.com/36072b4208f38136/f8d8a898d349dbd2/102-1downtown-los-angeles.jpg',
                id: 3,
                title: 'New Jersey',
                date: '2017-06-05'
            }
        ],
        _user: {
            id: '1234',
            registeredEvents: [1, 2]
        }
    },
    getters: {
        loadEvents(state) {
            return state._loadEvents.sort((eventA, eventB) => {
                return eventA.date > eventB.date
            })
        },
        featuredEvents(state) {
            return state._loadEvents.slice(0, 2)
        },
        loadSelectedEvent(state) {
            return (eventId) => {
                return state._loadEvents.find((myEvent) => {
                    console.log(myEvent, eventId);
                    return myEvent.id == eventId
                })
            };
        },
        user(state) {
            return state._user
        }
    },
    mutations: {},
    actions: {}
})
