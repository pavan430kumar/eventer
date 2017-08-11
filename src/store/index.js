import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import Router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        _loadEvents: [
            {
                imageUrl: 'https://media.timeout.com/images/103444978/image.jpg',
                id: 1,
                location: 'test1',
                title: 'New York',
                date: '2017-07-19',
                startTime: '',
                endTime: '',
                description: ''
            },
            {
                imageUrl: 'http://www.touristsbook.com/boston/files/2015/02/Boston-Downtown-Skyline-Buidlings.jpg',
                id: 2,
                title: 'Boston',
                location: 'test1',
                date: '2017-07-29',
                startTime: '',
                endTime: '',
                description: ''
            },
            {
                imageUrl: 'http://image.myvr.com/36072b4208f38136/f8d8a898d349dbd2/102-1downtown-los-angeles.jpg',
                id: 3,
                title: 'New Jersey',
                location: 'test1',
                date: '2017-06-05',
                startTime: '',
                endTime: '',
                description: ''
            }
        ],
        _user: [
            {
                userId: 1234,
                firstName: 'Pavan',
                lastName: 'Kumar',
                dob: 'Jun 5th, 1992',
                email: 'eventeradmin@example.com',
                workEmail: '',
                phone: '970-232-4991',
                workPhone: '',
                street: '35 Grimes Rd',
                apt: 'C213',
                city: 'RockyHill',
                state: 'CT',
                zipcode: '06067',
                profilePic: 'https://s-media-cache-ak0.pinimg.com/originals/5e/f4/79/5ef47920fc689db66b4c69be072771b6.jpg'
            },
            {
                userId: 4321,
                firstName: 'Shrath',
                lastName: 'Chandra',
                dob: 'Oct 21st, 1994',
                email: 'sharath@example.com',
                workEmail: '',
                phone: '829-712-3895',
                workPhone: '',
                street: 'Rezimental Bazar',
                apt: '9-3-761',
                city: 'Secunderabad',
                state: 'TG',
                zipcode: '500025',
                profilePic: ''
            }
        ],
        _fireUser: null
    },
    getters: {
        loadEvents(state) {
            return state._loadEvents.sort((eventA, eventB) => {
                return eventA.date < eventB.date
            })
        },
        loadFeaturedEvents(state) {
            return state._loadEvents.slice(0, 2)
        },
        loadSelectedEvent(state) {
            return (eventId) => {
                return state._loadEvents.find((myEvent) => {
                    return myEvent.id == eventId
                })
            };
        },
        getUser(state) {
            return (userId) => {
                return state._user.find(user => {
                    return user.userId == userId
                })
            };
        },
        getFirebaseUser(state) {
            return state._fireUser
        }
    },
    mutations: {
        createEvent(state, payload) {
            state._loadEvents.push(payload)
        },
        updateProfile(state, payload) {
            console.log(payload)
            var user = state._user.find(user => {
                return user.userId == payload.userId
            })

            user.firstName = payload.firstName,
                user.lastName = payload.lastName,
                user.dob = payload.dob,
                user.email = payload.email,
                user.workEmail = payload.workEmail,
                user.phone = payload.phone,
                user.workPhone = payload.workPhone,
                user.apt = payload.apt,
                user.street = payload.street,
                user.city = payload.city,
                user.state = payload.state,
                user.zipcode = payload.zipcode,
                user.profilePic = payload.profilePic
        },
        setUser(state, payload) {
            state._fireUser = payload
        }
    },
    actions: {
        createEvent({ commit }, payload) {
            const event = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                date: payload.description,
                id: 10
            }
            //Reach out to firebase and store
            commit('createEvent', event)
        },
        updateProfile({ commit }, payload) {
            const updatedProfile = {
                userId: payload.userId,
                firstName: payload.firstName,
                lastName: payload.lastName,
                dob: payload.dob,
                email: payload.email,
                workEmail: payload.workEmail,
                phone: payload.phone,
                workPhone: payload.workPhone,
                street: payload.street,
                apt: payload.apt,
                city: payload.city,
                state: payload.state,
                zipcode: payload.zipcode,
                profilePic: payload.profilePic
            }
            //Reach out to firebase and store
            commit('updateProfile', updatedProfile)
        },
        signUpUser({ commit }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    const newUser = {
                        userId: user.uid
                    }
                    commit('setUser', newUser)
                }
                )
                .catch(
                err => {
                    console.log(err, err.message)
                }
                )
        },
        signInUser({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    const newUser = {
                        userId: user.uid
                    }
                    commit('setUser', newUser)
                })
                .catch(
                err => {
                    console.log(err, err.message)
                })
        },
        signOutUser({ commit }) {
            firebase.auth().signOut().then(
                (x) => {
                    Router.push('/signin')
                    commit('setUser', x)
                }
            )
        }
    }
})
