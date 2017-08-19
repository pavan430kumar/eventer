import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import Router from '../router'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state, { expires: 1, secure: false })
        })
    ],
    state: {
        _loadEvents: [
            {
                imageUrl: 'http://image.myvr.com/36072b4208f38136/f8d8a898d349dbd2/102-1downtown-los-angeles.jpg',
                id: 3,
                title: 'New Jersey',
                location: 'test1',
                date: '2017-06-05',
                startTime: '',
                endTime: '',
                description: '',
            }
        ],
        _user: [
            // {
            //     userId: 1234,
            //     firstName: 'Pavan',
            //     lastName: 'Kumar',
            //     dob: 'Jun 5th, 1992',
            //     email: 'eventeradmin@example.com',
            //     workEmail: '',
            //     phone: '970-232-4991',
            //     workPhone: '',
            //     street: '35 Grimes Rd',
            //     apt: 'C213',
            //     city: 'RockyHill',
            //     state: 'CT',
            //     zipcode: '06067',
            //     profilePic: 'https://s-media-cache-ak0.pinimg.com/originals/5e/f4/79/5ef47920fc689db66b4c69be072771b6.jpg'
            // },
            // {
            //     userId: 4321,
            //     firstName: 'Shrath',
            //     lastName: 'Chandra',
            //     dob: 'Oct 21st, 1994',
            //     email: 'sharath@example.com',
            //     workEmail: '',
            //     phone: '829-712-3895',
            //     workPhone: '',
            //     street: 'Rezimental Bazar',
            //     apt: '9-3-761',
            //     city: 'Secunderabad',
            //     state: 'TG',
            //     zipcode: '500025',
            //     profilePic: ''
            // }
        ],
        _fireUser: null,
        _isLoading: false,
        _error: null
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
        },
        getIsLoading(state) {
            return state._isLoading
        },
        getError(state) {
            return state._error
        }
    },
    mutations: {
        getEvents(state, payload) {
            state._loadEvents = payload
        },
        createEvent(state, payload) {
            state._loadEvents.push(payload + 'mut')
        },
        getUserProfile(state, payload) {
            state._user.push(payload)
        },
        updateProfile(state, payload) {
            var userIndexKey = state._user.findIndex(user => {
                return user.userId === payload.userId
            })
            userIndexKey = (userIndexKey === -1) ? state._user.push(payload) : state._user[userIndexKey] = payload
        },
        setUser(state, payload) {
            state._fireUser = payload
        },
        setIsLoading(state, payload) {
            state._isLoading = payload
        },
        setError(state, payload) {
            state._error = payload
        },
        clearError(state) {
            state._error = null
        }
    },
    actions: {
        getEvents({ commit }) {
            commit('setIsLoading', true)
            firebase.database().ref('events').once('value')
                .then(
                data => {
                    const events = []
                    const obj = data.val()
                    for (let key in obj) {
                        events.push({
                            id: key,
                            title: obj[key].title,
                            location: obj[key].location,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            startTime: obj[key].startTime,
                            endTime: obj[key].endTime,
                            description: obj[key].description,
                            createdUser: obj[key].createdUser
                        })
                    }
                    commit('setIsLoading', false)
                    commit('getEvents', events)
                })
                .catch(
                err => { console.log(err) }
                )
        },
        createEvent({ commit, state }, payload) {
            var user = state._fireUser.userId
            const event = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                date: payload.date,
                startTime: payload.startTime,
                endTime: payload.endTime,
                description: payload.description,
                createdUser: user
            }
            firebase.database().ref('events').push(event)
                .then(
                data => {
                    var key = data.key
                    commit('createEvent', { ...event, id: key })
                })
                .catch(
                err => {
                    console.log(err)
                })
        },
        getUserProfile({ commit, state }) {
            const currentUserId = state._fireUser.userId
            firebase.database().ref('users').once('value')
                .then(
                data => {
                    const obj = data.val()
                    var currentUserProfile = null
                    for (let key in obj) {
                        if (key == currentUserId) {
                            currentUserProfile = obj[key]
                        }
                    }
                    if (currentUserProfile !== null) {
                        commit('getUserProfile', { ...currentUserProfile, userId: currentUserId })
                    }
                }
                )
                .catch(err => { console.log(err) })
        },
        updateProfile({ commit, state }, payload) {
            const updatedProfile = {
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
            const currentUserId = state._fireUser.userId
            console.log('firebase user Id' + currentUserId)
            var usersRef = firebase.database().ref('users')
            usersRef.child(currentUserId).set(updatedProfile)
                .then(
                data => {
                    commit('updateProfile', { ...updatedProfile, userId: currentUserId })
                    Router.push('/profile')
                })
                .catch(
                err => {
                    console.log(err)
                }
                )
        },
        signUpUser({ commit }, payload) {
            commit('setIsLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    commit('setIsLoading', false)
                    const newUser = {
                        userId: user.uid
                    }
                    commit('setUser', newUser)
                }
                )
                .catch(
                err => {
                    commit('setIsLoading', false)
                    commit('setError', err)
                    console.log(err, err.message)
                }
                )
        },
        signInUser({ commit }, payload) {
            commit('setIsLoading', true)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    commit('setIsLoading', false)
                    const newUser = {
                        userId: user.uid
                    }
                    commit('setUser', newUser)
                })
                .catch(
                err => {
                    commit('setIsLoading', false)
                    commit('setError', err)
                    console.log(err, err.message)
                })
        },
        signOutUser({ commit }) {
            commit('setIsLoading', true)
            firebase.auth().signOut().then(
                (x) => {
                    commit('setIsLoading', false)
                    Router.push('/signin')
                    commit('setUser', x)
                }
            )
        },
        clearError({ commit }) {
            commit('clearError')
        }
    }
})
